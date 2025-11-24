import { NextResponse } from 'next/server';
import { getSql } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export const revalidate = 0;

export async function GET(request: Request) {
  // Check admin authentication
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized - Admin access required' },
      {
        status: 401,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, private, max-age=0',
        },
      }
    );
  }
  
  try {
    const sql = getSql();
    
    // Get current date for monthly stats
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Query all stats from Neon database using raw SQL
    const [
      totalKeysResult,
      activeKeysResult,
      revokedKeysResult,
      totalDownloadsResult,
      monthlyDownloadsResult,
      activeAdminsResult
    ] = await Promise.all([
      // Total keys
      sql`SELECT COUNT(*)::int as count FROM license_keys`,
      
      // Active keys
      sql`SELECT COUNT(*)::int as count FROM license_keys WHERE status = 'active'`,
      
      // Revoked keys
      sql`SELECT COUNT(*)::int as count FROM license_keys WHERE status = 'revoked'`,
      
      // Total downloads (sum of all download_count)
      sql`SELECT COALESCE(SUM(download_count), 0)::int as total FROM license_keys`,
      
      // Monthly downloads from download_logs table
      sql`SELECT COUNT(*)::int as count FROM download_logs WHERE download_date >= ${startOfMonth}`,
      
      // Active admin users
      sql`SELECT COUNT(*)::int as count FROM admin_users WHERE is_active = true`
    ]);

    const stats = {
      totalKeys: Number(totalKeysResult[0]?.count) || 0,
      activeKeys: Number(activeKeysResult[0]?.count) || 0,
      revokedKeys: Number(revokedKeysResult[0]?.count) || 0,
      totalDownloads: Number(totalDownloadsResult[0]?.total) || 0,
      monthlyDownloads: Number(monthlyDownloadsResult[0]?.count) || 0,
      activeAdmins: Number(activeAdminsResult[0]?.count) || 0
    };

    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, private, max-age=0',
      },
    });
  } catch (error: any) {
    console.error('Stats fetch error:', error);
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, private, max-age=0',
        },
      }
    );
  }
}