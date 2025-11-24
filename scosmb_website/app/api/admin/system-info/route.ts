import { NextResponse } from 'next/server';
import { getSql } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const sql = getSql();

    // Get system metrics
    const totalKeys = await sql`SELECT COUNT(*) as count FROM license_keys` as any[];
    const activeKeys = await sql`SELECT COUNT(*) as count FROM license_keys WHERE status = 'active'` as any[];
    const totalAdmins = await sql`SELECT COUNT(*) as count FROM admin_users` as any[];
    const totalDownloads = await sql`SELECT COUNT(*) as count FROM download_logs` as any[];

    // Fetch latest version from GitHub releases
    let latestVersion = '1.0.0';
    try {
      const githubResponse = await fetch(
        'https://api.github.com/repos/C-Elkins/SCO-SMB/releases/latest',
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'SCO-SMB-Admin',
            ...(process.env.GITHUB_TOKEN && { 
              'Authorization': `Bearer ${process.env.GITHUB_TOKEN}` 
            })
          },
          next: { revalidate: 300 } // Cache for 5 minutes
        }
      );
      
      if (githubResponse.ok) {
        const releaseData = await githubResponse.json();
        latestVersion = releaseData.tag_name || releaseData.name || '1.0.0';
        console.log('GitHub release version:', latestVersion);
      } else {
        console.warn('GitHub API response:', githubResponse.status, await githubResponse.text());
        latestVersion = process.env.SCOSMB_VERSION || '1.0.0';
      }
    } catch (error) {
      console.error('Failed to fetch GitHub release:', error);
      // Fallback to environment variable or package.json version
      latestVersion = process.env.SCOSMB_VERSION || '1.0.0';
    }
    
    // Calculate system uptime (since server start)
    const uptimeSeconds = process.uptime();
    const uptimeHours = Math.floor(uptimeSeconds / 3600);
    const uptimeDays = Math.floor(uptimeHours / 24);
    
    // Get memory usage
    const memoryUsage = process.memoryUsage();
    const memoryUsedMB = Math.round(memoryUsage.heapUsed / 1024 / 1024);
    const memoryTotalMB = Math.round(memoryUsage.heapTotal / 1024 / 1024);
    
    // Get recent activity summary
    const recentKeys = await sql`
      SELECT COUNT(*) as count FROM license_keys 
      WHERE created_at > NOW() - INTERVAL '24 hours'
    ` as any[];
    
    const recentDownloads = await sql`
      SELECT COUNT(*) as count FROM download_logs 
      WHERE download_date > NOW() - INTERVAL '24 hours'
    ` as any[];

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
        totalKeys: parseInt(totalKeys[0]?.count) || 0,
        activeKeys: parseInt(activeKeys[0]?.count) || 0,
        totalAdmins: parseInt(totalAdmins[0]?.count) || 0,
        totalDownloads: parseInt(totalDownloads[0]?.count) || 0,
        keysToday: parseInt(recentKeys[0]?.count) || 0,
        downloadsToday: parseInt(recentDownloads[0]?.count) || 0
      },
      status: 'operational',
      lastUpdated: new Date().toISOString()
    };

    return NextResponse.json(systemInfo);
  } catch (error: unknown) {
    console.error('System info error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}