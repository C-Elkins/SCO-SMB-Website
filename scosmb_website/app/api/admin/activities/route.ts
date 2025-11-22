import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { audit_logs, license_keys, customers } from '@/lib/schema';
import { verifyAdmin } from '@/lib/auth';
import { desc, and, gte, or, like, eq } from 'drizzle-orm';
import { sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const adminCheck = await verifyAdmin(request);
    if (!adminCheck.valid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const filter = searchParams.get('filter') || 'all';
    const limit = parseInt(searchParams.get('limit') || '50');

    // Get recent audit logs
    let activities = await db
      .select()
      .from(audit_logs)
      .orderBy(desc(audit_logs.created_at))
      .limit(limit);

    // Filter based on type
    if (filter !== 'all') {
      activities = activities.filter(log => {
        if (filter === 'keys') {
          return log.action.includes('key_') || log.action.includes('license');
        }
        if (filter === 'customers') {
          return log.action.includes('customer');
        }
        if (filter === 'system') {
          return log.action.includes('setting') || log.action.includes('admin');
        }
        return true;
      });
    }

    // Format activities for display
    const formattedActivities = activities.map(log => ({
      id: log.id,
      type: log.action as any,
      description: log.details || formatActionDescription(log.action, log.metadata),
      user: log.admin_email,
      timestamp: log.created_at,
      metadata: log.metadata || {}
    }));

    return NextResponse.json({ activities: formattedActivities });

  } catch (error) {
    console.error('Activities fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}

function formatActionDescription(action: string, metadata: any): string {
  const descriptions: Record<string, string> = {
    'key_created': `New license key created for ${metadata?.customer || 'customer'}`,
    'key_revoked': `License key revoked: ${metadata?.key?.substring(0, 8)}...`,
    'key_deleted': `License key permanently deleted`,
    'customer_added': `New customer added: ${metadata?.name || 'Unknown'}`,
    'customer_deleted': `Customer removed from system`,
    'setting_changed': `System setting updated: ${metadata?.setting}`,
    'admin_action': `Admin performed: ${metadata?.action}`,
    'download': `Software downloaded by ${metadata?.email || 'user'}`
  };

  return descriptions[action] || action.replace(/_/g, ' ');
}
