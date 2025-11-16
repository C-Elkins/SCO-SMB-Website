import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { license_keys, admin_users, download_logs } from '@/lib/schema';
import { count, sql, eq } from 'drizzle-orm';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = getDb();
    
    // Get system metrics
    const [totalKeys] = await db.select({ count: count() }).from(license_keys);
    const [activeKeys] = await db.select({ count: count() }).from(license_keys).where(eq(license_keys.status, 'active'));
    const [totalAdmins] = await db.select({ count: count() }).from(admin_users);
    const [totalDownloads] = await db.select({ count: count() }).from(download_logs);
    
    // Get latest version from environment or database
    const latestVersion = process.env.SCOSMB_VERSION || 'v1.1.1';
    
    // Calculate system uptime (since server start)
    const uptimeSeconds = process.uptime();
    const uptimeHours = Math.floor(uptimeSeconds / 3600);
    const uptimeDays = Math.floor(uptimeHours / 24);
    
    // Get memory usage
    const memoryUsage = process.memoryUsage();
    const memoryUsedMB = Math.round(memoryUsage.heapUsed / 1024 / 1024);
    const memoryTotalMB = Math.round(memoryUsage.heapTotal / 1024 / 1024);
    
    // Get recent activity summary
    const recentKeys = await db
      .select({ count: count() })
      .from(license_keys)
      .where(sql`created_at > NOW() - INTERVAL '24 hours'`);
    
    const recentDownloads = await db
      .select({ count: count() })
      .from(download_logs)
      .where(sql`download_date > NOW() - INTERVAL '24 hours'`);

    const systemInfo = {
      version: latestVersion,
      uptime: {
        seconds: Math.floor(uptimeSeconds),
        hours: uptimeHours,
        days: uptimeDays,
        formatted: uptimeDays > 0 ? `${uptimeDays}d ${uptimeHours % 24}h` : `${uptimeHours}h`
      },
      performance: {
        memoryUsed: memoryUsedMB,
        memoryTotal: memoryTotalMB,
        memoryUsagePercent: Math.round((memoryUsedMB / memoryTotalMB) * 100),
        nodeVersion: process.version,
        platform: process.platform
      },
      statistics: {
        totalKeys: totalKeys?.count || 0,
        activeKeys: activeKeys?.count || 0,
        totalAdmins: totalAdmins?.count || 0,
        totalDownloads: totalDownloads?.count || 0,
        keysToday: recentKeys[0]?.count || 0,
        downloadsToday: recentDownloads[0]?.count || 0
      },
      status: 'operational', // This could be enhanced with actual health checks
      lastUpdated: new Date().toISOString()
    };

    return NextResponse.json(systemInfo);
  } catch (error: any) {
    console.error('System info error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}