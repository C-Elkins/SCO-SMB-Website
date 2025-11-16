import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { license_keys, download_logs, admin_users } from '@/lib/schema';
import { getAdminSession } from '@/lib/auth';
import { eq, count, sum, gte, sql, desc } from 'drizzle-orm';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '30d';

    // Calculate date ranges
    const now = new Date();
    let startDate = new Date();
    let lastPeriodStart = new Date();
    
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

    const db = getDb();

    // Get download stats
    const [totalDownloads] = await db
      .select({ total: sum(license_keys.download_count) })
      .from(license_keys);

    const [currentPeriodDownloads] = await db
      .select({ count: count() })
      .from(license_keys)
      .where(gte(license_keys.created_at, startDate));

    const [lastPeriodDownloads] = await db
      .select({ count: count() })
      .from(license_keys)
      .where(gte(license_keys.created_at, lastPeriodStart));

    // Calculate growth
    const currentCount = currentPeriodDownloads?.count || 0;
    const lastCount = lastPeriodDownloads?.count || 0;
    const growth = lastCount > 0 ? ((currentCount - lastCount) / lastCount) * 100 : 0;

    // Get key stats
    const [totalKeys] = await db.select({ count: count() }).from(license_keys);
    const [activeKeys] = await db.select({ count: count() }).from(license_keys).where(eq(license_keys.status, 'active'));
    const [revokedKeys] = await db.select({ count: count() }).from(license_keys).where(eq(license_keys.status, 'revoked'));
    const [unusedKeys] = await db.select({ count: count() }).from(license_keys).where(eq(license_keys.status, 'unused'));

    // Get real platform statistics from download_logs
    const platformStats = await db
      .select({
        platform: download_logs.platform,
        count: count()
      })
      .from(download_logs)
      .groupBy(download_logs.platform)
      .orderBy(desc(count()));

    // Convert to percentages
    const totalPlatformDownloads = platformStats.reduce((sum, item) => sum + item.count, 0);
    const platformData = {
      windows: Math.round(((platformStats.find(p => p.platform?.toLowerCase()?.includes('windows'))?.count || 0) / Math.max(totalPlatformDownloads, 1)) * 100),
      mac: Math.round(((platformStats.find(p => p.platform?.toLowerCase()?.includes('mac'))?.count || 0) / Math.max(totalPlatformDownloads, 1)) * 100),
      linux: Math.round(((platformStats.find(p => p.platform?.toLowerCase()?.includes('linux'))?.count || 0) / Math.max(totalPlatformDownloads, 1)) * 100)
    };

    // Get monthly trends for the last 6 months
    const monthlyTrends = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date();
      monthStart.setMonth(monthStart.getMonth() - i, 1);
      monthStart.setHours(0, 0, 0, 0);
      
      const monthEnd = new Date(monthStart);
      monthEnd.setMonth(monthEnd.getMonth() + 1);
      
      const [monthlyDownloads] = await db
        .select({ count: count() })
        .from(download_logs)
        .where(sql`download_date >= ${monthStart} AND download_date < ${monthEnd}`);
      
      const [monthlyKeys] = await db
        .select({ count: count() })
        .from(license_keys)
        .where(sql`created_at >= ${monthStart} AND created_at < ${monthEnd}`);

      monthlyTrends.push({
        month: monthStart.toLocaleDateString('en-US', { month: 'short' }),
        downloads: monthlyDownloads?.count || 0,
        keysGenerated: monthlyKeys?.count || 0
      });
    }

    // Get top customers by download count and key usage
    const topCustomers = await db
      .select({
        name: license_keys.customer_name,
        email: license_keys.customer_email,
        company: license_keys.customer_company,
        downloads: sum(license_keys.download_count),
        keys: count()
      })
      .from(license_keys)
      .where(sql`customer_name IS NOT NULL AND customer_name != ''`)
      .groupBy(license_keys.customer_name, license_keys.customer_email, license_keys.customer_company)
      .orderBy(desc(sum(license_keys.download_count)))
      .limit(5);

    // Get recent activity
    const recentKeyActivity = await db
      .select({
        key_code: license_keys.key_code,
        status: license_keys.status,
        customer_name: license_keys.customer_name,
        customer_email: license_keys.customer_email,
        created_at: license_keys.created_at,
        created_by: license_keys.created_by
      })
      .from(license_keys)
      .orderBy(desc(license_keys.created_at))
      .limit(10);

    const recentDownloadActivity = await db
      .select({
        platform: download_logs.platform,
        download_date: download_logs.download_date,
        success: download_logs.success
      })
      .from(download_logs)
      .orderBy(desc(download_logs.download_date))
      .limit(5);

    // Format recent activity
    const recentActivity = [
      ...recentDownloadActivity.map(activity => ({
        type: 'download' as const,
        description: `Software downloaded on ${activity.platform || 'Unknown platform'}`,
        timestamp: formatTimeAgo(activity.download_date)
      })),
      ...recentKeyActivity.slice(0, 5).map(activity => ({
        type: activity.status === 'revoked' ? 'key_revoked' as const : 'key_generated' as const,
        description: activity.status === 'revoked' 
          ? `License key ${activity.key_code} revoked`
          : `New license key generated${activity.customer_name ? ` for ${activity.customer_name}` : ''}`,
        timestamp: formatTimeAgo(activity.created_at)
      }))
    ].sort((a, b) => a.timestamp.localeCompare(b.timestamp)).slice(0, 8);

    const analyticsData = {
      downloadStats: {
        total: totalDownloads?.total || 0,
        thisMonth: currentCount,
        lastMonth: lastCount,
        growth: Math.round(growth * 10) / 10
      },
      platformStats: platformData,
      keyStats: {
        totalKeys: totalKeys?.count || 0,
        activeKeys: activeKeys?.count || 0,
        revokedKeys: revokedKeys?.count || 0,
        unusedKeys: unusedKeys?.count || 0
      },
      monthlyTrends,
      topCustomers: topCustomers.map(customer => ({
        name: customer.name || customer.company || 'Unknown',
        email: customer.email || '',
        downloads: Number(customer.downloads) || 0,
        keys: customer.keys || 0
      })),
      recentActivity
    };

    // Helper function to format time ago
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
  } catch (error: any) {
    console.error('Analytics fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}