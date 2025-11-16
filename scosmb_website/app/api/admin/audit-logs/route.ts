import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { license_keys, admin_users, download_logs } from '@/lib/schema';
import { desc, eq, sql, and, gte } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const action = searchParams.get('action') || 'all';
    const dateRange = searchParams.get('dateRange') || '7d';

    // Calculate date filter
    let dateFilter = new Date();
    switch (dateRange) {
      case '24h':
        dateFilter.setHours(dateFilter.getHours() - 24);
        break;
      case '7d':
        dateFilter.setDate(dateFilter.getDate() - 7);
        break;
      case '30d':
        dateFilter.setDate(dateFilter.getDate() - 30);
        break;
      case '90d':
        dateFilter.setDate(dateFilter.getDate() - 90);
        break;
    }

    const db = getDb();

    // Get key-related audit events
    const keyEvents = await db
      .select({
        id: license_keys.id,
        action: sql<string>`CASE 
          WHEN ${license_keys.status} = 'revoked' THEN 'key_revoked'
          ELSE 'key_created'
        END`,
        details: sql<string>`json_build_object(
          'key_code', ${license_keys.key_code},
          'customer_name', ${license_keys.customer_name},
          'customer_email', ${license_keys.customer_email},
          'status', ${license_keys.status}
        )`,
        user: license_keys.created_by,
        timestamp: license_keys.created_at,
        ip_address: sql<string>`NULL`,
        user_agent: sql<string>`NULL`
      })
      .from(license_keys)
      .where(gte(license_keys.created_at, dateFilter))
      .orderBy(desc(license_keys.created_at))
      .limit(Math.floor(limit / 2));

    // Get download audit events
    const downloadEvents = await db
      .select({
        id: download_logs.id,
        action: sql<string>`'download'`,
        details: sql<string>`json_build_object(
          'platform', ${download_logs.platform},
          'version', ${download_logs.version},
          'success', ${download_logs.success}
        )`,
        user: sql<string>`'system'`,
        timestamp: download_logs.download_date,
        ip_address: download_logs.ip_address,
        user_agent: download_logs.user_agent
      })
      .from(download_logs)
      .where(gte(download_logs.download_date, dateFilter))
      .orderBy(desc(download_logs.download_date))
      .limit(Math.floor(limit / 2));

    // Get login audit events (from admin_users table)
    const loginEvents = await db
      .select({
        id: admin_users.id,
        action: sql<string>`'admin_login'`,
        details: sql<string>`json_build_object(
          'username', ${admin_users.username},
          'role', ${admin_users.role}
        )`,
        user: admin_users.username,
        timestamp: admin_users.last_login,
        ip_address: sql<string>`NULL`,
        user_agent: sql<string>`NULL`
      })
      .from(admin_users)
      .where(and(
        sql`${admin_users.last_login} IS NOT NULL`,
        gte(admin_users.last_login, dateFilter)
      ))
      .orderBy(desc(admin_users.last_login))
      .limit(10);

    // Combine and sort all events
    const allEvents = [
      ...keyEvents.map(event => ({
        ...event,
        category: 'license_management' as const
      })),
      ...downloadEvents.map(event => ({
        ...event,
        category: 'downloads' as const
      })),
      ...loginEvents.map(event => ({
        ...event,
        category: 'authentication' as const
      }))
    ].sort((a, b) => 
      new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime()
    ).slice(0, limit);

    // Get audit statistics
    const stats = {
      totalEvents: allEvents.length,
      keyEvents: keyEvents.length,
      downloadEvents: downloadEvents.length,
      loginEvents: loginEvents.length,
      timeRange: dateRange
    };

    return NextResponse.json({
      events: allEvents,
      stats,
      pagination: {
        limit,
        offset,
        hasMore: allEvents.length === limit
      }
    });
  } catch (error: any) {
    console.error('Audit log error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}