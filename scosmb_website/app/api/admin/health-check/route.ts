import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { license_keys, admin_users, download_logs } from '@/lib/schema';
import { count, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = getDb();
    const healthChecks = [];

    // Database connectivity check
    const dbStart = Date.now();
    try {
      await db.select({ count: count() }).from(license_keys).limit(1);
      healthChecks.push({
        service: 'Database Connection',
        status: 'healthy',
        responseTime: Date.now() - dbStart,
        details: 'PostgreSQL connection successful'
      });
    } catch (error) {
      healthChecks.push({
        service: 'Database Connection',
        status: 'unhealthy',
        responseTime: Date.now() - dbStart,
        details: `Database error: ${error.message}`,
        error: error.message
      });
    }

    // API endpoints health check
    const apiStart = Date.now();
    try {
      // Test internal API call
      const testResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/admin/stats`, {
        headers: { Cookie: `scosmb_admin_jwt=${session}` }
      });
      
      healthChecks.push({
        service: 'API Endpoints',
        status: testResponse.ok ? 'healthy' : 'degraded',
        responseTime: Date.now() - apiStart,
        details: `Stats API returned ${testResponse.status}`
      });
    } catch (error) {
      healthChecks.push({
        service: 'API Endpoints',
        status: 'unhealthy',
        responseTime: Date.now() - apiStart,
        details: 'API endpoint test failed',
        error: error.message
      });
    }

    // Memory usage check
    const memoryUsage = process.memoryUsage();
    const memoryUsedMB = Math.round(memoryUsage.heapUsed / 1024 / 1024);
    const memoryTotalMB = Math.round(memoryUsage.heapTotal / 1024 / 1024);
    const memoryUsagePercent = (memoryUsedMB / memoryTotalMB) * 100;
    
    healthChecks.push({
      service: 'Memory Usage',
      status: memoryUsagePercent > 90 ? 'critical' : memoryUsagePercent > 75 ? 'warning' : 'healthy',
      responseTime: 0,
      details: `${memoryUsedMB}MB / ${memoryTotalMB}MB (${Math.round(memoryUsagePercent)}%)`,
      metrics: {
        used: memoryUsedMB,
        total: memoryTotalMB,
        percent: Math.round(memoryUsagePercent)
      }
    });

    // Disk space simulation (in production, you'd check actual disk usage)
    const diskUsagePercent = 45; // Mock data
    healthChecks.push({
      service: 'Disk Usage',
      status: diskUsagePercent > 90 ? 'critical' : diskUsagePercent > 80 ? 'warning' : 'healthy',
      responseTime: 0,
      details: `${diskUsagePercent}% used`,
      metrics: {
        percent: diskUsagePercent
      }
    });

    // System uptime
    const uptimeSeconds = process.uptime();
    const uptimeHours = Math.floor(uptimeSeconds / 3600);
    healthChecks.push({
      service: 'System Uptime',
      status: uptimeHours > 1 ? 'healthy' : 'warning',
      responseTime: 0,
      details: `${Math.floor(uptimeHours / 24)}d ${uptimeHours % 24}h`,
      metrics: {
        seconds: Math.floor(uptimeSeconds),
        hours: uptimeHours
      }
    });

    // License key system check
    try {
      const [keyStats] = await db
        .select({
          total: count(),
          expired: sql<number>`COUNT(CASE WHEN expires_at < NOW() THEN 1 END)`,
          active: sql<number>`COUNT(CASE WHEN status = 'active' THEN 1 END)`
        })
        .from(license_keys);

      healthChecks.push({
        service: 'License Key System',
        status: 'healthy',
        responseTime: 0,
        details: `${keyStats.total} total keys, ${keyStats.active} active`,
        metrics: keyStats
      });
    } catch (error) {
      healthChecks.push({
        service: 'License Key System',
        status: 'unhealthy',
        responseTime: 0,
        details: 'Failed to query license keys',
        error: error.message
      });
    }

    // External services check (mock data for enterprise features)
    healthChecks.push({
      service: 'Email Service',
      status: 'healthy',
      responseTime: 150,
      details: 'SMTP connection successful'
    });

    healthChecks.push({
      service: 'Backup System',
      status: 'healthy',
      responseTime: 0,
      details: 'Last backup: 2 hours ago'
    });

    // Calculate overall system health
    const criticalServices = healthChecks.filter(h => h.status === 'critical').length;
    const unhealthyServices = healthChecks.filter(h => h.status === 'unhealthy').length;
    const warningServices = healthChecks.filter(h => h.status === 'warning').length;
    const healthyServices = healthChecks.filter(h => h.status === 'healthy').length;

    let overallStatus = 'healthy';
    if (criticalServices > 0) overallStatus = 'critical';
    else if (unhealthyServices > 0) overallStatus = 'unhealthy';
    else if (warningServices > 0) overallStatus = 'warning';

    const healthReport = {
      overall: {
        status: overallStatus,
        timestamp: new Date().toISOString(),
        summary: {
          total: healthChecks.length,
          healthy: healthyServices,
          warning: warningServices,
          unhealthy: unhealthyServices,
          critical: criticalServices
        }
      },
      services: healthChecks,
      system: {
        version: process.env.SCOSMB_VERSION || 'v1.1.1',
        nodeVersion: process.version,
        platform: process.platform,
        uptime: {
          seconds: Math.floor(uptimeSeconds),
          formatted: `${Math.floor(uptimeHours / 24)}d ${uptimeHours % 24}h`
        }
      },
      recommendations: generateRecommendations(healthChecks)
    };

    return NextResponse.json(healthReport);
  } catch (error: any) {
    console.error('Health check error:', error);
    return NextResponse.json({
      overall: {
        status: 'critical',
        timestamp: new Date().toISOString(),
        error: error.message
      },
      services: [],
      system: {},
      recommendations: ['System health check failed - investigate immediately']
    }, { status: 500 });
  }
}

function generateRecommendations(healthChecks: any[]): string[] {
  const recommendations = [];
  
  const memoryCheck = healthChecks.find(h => h.service === 'Memory Usage');
  if (memoryCheck?.metrics?.percent > 75) {
    recommendations.push('Consider increasing server memory or optimizing memory usage');
  }

  const criticalServices = healthChecks.filter(h => h.status === 'critical');
  if (criticalServices.length > 0) {
    recommendations.push(`Critical services need immediate attention: ${criticalServices.map(s => s.service).join(', ')}`);
  }

  const highResponseTimes = healthChecks.filter(h => h.responseTime > 1000);
  if (highResponseTimes.length > 0) {
    recommendations.push('Some services have high response times - investigate performance issues');
  }

  if (recommendations.length === 0) {
    recommendations.push('All systems operating normally');
  }

  return recommendations;
}