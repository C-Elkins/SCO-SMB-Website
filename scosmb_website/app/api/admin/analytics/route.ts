import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getSql } from '@/lib/db';

export const runtime = 'nodejs';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const sql = getSql();
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '30d';

    // Calculate date ranges
    const now = new Date();
    const startDate = new Date();
    const lastPeriodStart = new Date();
    
    switch (range) {
      case '7d':
        startDate.setDate(now.getDate() - 7);
        lastPeriodStart.setDate(now.getDate() - 14);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        lastPeriodStart.setDate(now.getDate() - 60);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        lastPeriodStart.setDate(now.getDate() - 180);
        break;
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1);
        lastPeriodStart.setFullYear(now.getFullYear() - 2);
        break;
    }

    // Get download stats
    const totalDownloadsResult = await sql`
      SELECT COALESCE(SUM(download_count), 0) as total FROM license_keys
    ` as any[];
    
    const currentPeriodDownloads = await sql`
      SELECT COUNT(*) as count FROM download_logs
      WHERE download_date >= ${startDate.toISOString()}
    ` as any[];
    
    const lastPeriodDownloads = await sql`
      SELECT COUNT(*) as count FROM download_logs
      WHERE download_date >= ${lastPeriodStart.toISOString()} 
        AND download_date < ${startDate.toISOString()}
    ` as any[];

    // Calculate growth
    const currentCount = parseInt(currentPeriodDownloads[0]?.count) || 0;
    const lastCount = parseInt(lastPeriodDownloads[0]?.count) || 0;
    const growth = lastCount > 0 ? ((currentCount - lastCount) / lastCount) * 100 : 0;

    // Get key stats
    const totalKeys = await sql`SELECT COUNT(*) as count FROM license_keys` as any[];
    const activeKeys = await sql`SELECT COUNT(*) as count FROM license_keys WHERE status = 'active'` as any[];
    const revokedKeys = await sql`SELECT COUNT(*) as count FROM license_keys WHERE status = 'revoked'` as any[];
    const unusedKeys = await sql`SELECT COUNT(*) as count FROM license_keys WHERE status = 'unused'` as any[];

    // Get platform statistics
    const platformStats = await sql`
      SELECT 
        platform,
        COUNT(*) as count
      FROM download_logs
      WHERE platform IS NOT NULL
      GROUP BY platform
    ` as any[];

    const totalPlatformDownloads = platformStats.reduce((sum: number, item: any) => sum + parseInt(item.count), 0);
    const platformData = {
      windows: Math.round(((platformStats.find((p: any) => p.platform?.toLowerCase()?.includes('windows'))?.count || 0) / Math.max(totalPlatformDownloads, 1)) * 100),
      mac: Math.round(((platformStats.find((p: any) => p.platform?.toLowerCase()?.includes('mac'))?.count || 0) / Math.max(totalPlatformDownloads, 1)) * 100),
      linux: Math.round(((platformStats.find((p: any) => p.platform?.toLowerCase()?.includes('linux'))?.count || 0) / Math.max(totalPlatformDownloads, 1)) * 100)
    };

    // Get monthly trends for the last 6 months
    const monthlyTrends = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date();
      monthStart.setMonth(monthStart.getMonth() - i, 1);
      monthStart.setHours(0, 0, 0, 0);
      
      const monthEnd = new Date(monthStart);
      monthEnd.setMonth(monthEnd.getMonth() + 1);
      
      const monthlyDownloads = await sql`
        SELECT COUNT(*) as count FROM download_logs
        WHERE download_date >= ${monthStart.toISOString()}
          AND download_date < ${monthEnd.toISOString()}
      ` as any[];
      
      const monthlyKeys = await sql`
        SELECT COUNT(*) as count FROM license_keys
        WHERE created_at >= ${monthStart.toISOString()}
          AND created_at < ${monthEnd.toISOString()}
      ` as any[];

      monthlyTrends.push({
        month: monthStart.toLocaleDateString('en-US', { month: 'short' }),
        downloads: parseInt(monthlyDownloads[0]?.count) || 0,
        keysGenerated: parseInt(monthlyKeys[0]?.count) || 0
      });
    }

    // Get top customers by download count
    const topCustomers = await sql`
      SELECT 
        customer_name,
        customer_email,
        customer_company,
        SUM(download_count) as downloads,
        COUNT(*) as keys
      FROM license_keys
      WHERE customer_name IS NOT NULL AND customer_name != ''
      GROUP BY customer_name, customer_email, customer_company
      ORDER BY SUM(download_count) DESC
      LIMIT 5
    ` as any[];

    // Get recent activity
    const recentKeyActivity = await sql`
      SELECT 
        key_code,
        status,
        customer_name,
        customer_email,
        created_at
      FROM license_keys
      ORDER BY created_at DESC
      LIMIT 5
    ` as any[];

    const recentDownloadActivity = await sql`
      SELECT 
        platform,
        download_date,
        success
      FROM download_logs
      ORDER BY download_date DESC
      LIMIT 5
    ` as any[];

    // Format recent activity
    const recentActivity = [
      ...recentDownloadActivity.map((activity: any) => ({
        type: 'download' as const,
        description: `Software downloaded on ${activity.platform || 'Unknown platform'}`,
        timestamp: formatTimeAgo(activity.download_date)
      })),
      ...recentKeyActivity.map((activity: any) => ({
        type: activity.status === 'revoked' ? 'key_revoked' as const : 'key_generated' as const,
        description: activity.status === 'revoked' 
          ? `License key ${activity.key_code} revoked`
          : `New license key generated${activity.customer_name ? ` for ${activity.customer_name}` : ''}`,
        timestamp: formatTimeAgo(activity.created_at)
      }))
    ].sort((a, b) => {
      // Sort by timestamp string (more recent first)
      return b.timestamp.localeCompare(a.timestamp);
    }).slice(0, 8);

    const analyticsData = {
      downloadStats: {
        total: parseInt(totalDownloadsResult[0]?.total) || 0,
        thisMonth: currentCount,
        lastMonth: lastCount,
        growth: Math.round(growth * 10) / 10
      },
      platformStats: platformData,
      keyStats: {
        totalKeys: parseInt(totalKeys[0]?.count) || 0,
        activeKeys: parseInt(activeKeys[0]?.count) || 0,
        revokedKeys: parseInt(revokedKeys[0]?.count) || 0,
        unusedKeys: parseInt(unusedKeys[0]?.count) || 0
      },
      monthlyTrends,
      topCustomers: topCustomers.map((customer: any) => ({
        name: customer.customer_name || customer.customer_company || 'Unknown',
        email: customer.customer_email || '',
        downloads: parseInt(customer.downloads) || 0,
        keys: parseInt(customer.keys) || 0
      })),
      recentActivity
    };

    function formatTimeAgo(date: Date | string | null): string {
      if (!date) return 'Unknown time';
      const now = new Date();
      const past = new Date(date);
      const diffMs = now.getTime() - past.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
      if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }

    return NextResponse.json(analyticsData);
  } catch (error: unknown) {
    console.error('Analytics fetch error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
