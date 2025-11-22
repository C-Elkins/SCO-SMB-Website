import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const SENTRY_AUTH_TOKEN = process.env.SENTRY_AUTH_TOKEN;
  const SENTRY_ORG = process.env.SENTRY_ORG || 'your-org-slug'; // Set this in Vercel
  const SENTRY_PROJECT = process.env.SENTRY_PROJECT || 'sco-smb'; // Set this in Vercel

  if (!SENTRY_AUTH_TOKEN) {
    return NextResponse.json(
      { error: 'Sentry token not configured' }, 
      { status: 500 }
    );
  }

  try {
    // Fetch project stats from Sentry API
    const statsUrl = `https://sentry.io/api/0/projects/${SENTRY_ORG}/${SENTRY_PROJECT}/stats/`;
    const issuesUrl = `https://sentry.io/api/0/projects/${SENTRY_ORG}/${SENTRY_PROJECT}/issues/`;

    // Get stats for last 24 hours
    const statsParams = new URLSearchParams({
      stat: 'received', // Events received
      since: Math.floor((Date.now() - 24 * 60 * 60 * 1000) / 1000).toString(), // 24h ago
      until: Math.floor(Date.now() / 1000).toString() // Now
    });

    const [statsResponse, issuesResponse] = await Promise.all([
      fetch(`${statsUrl}?${statsParams}`, {
        headers: {
          'Authorization': `Bearer ${SENTRY_AUTH_TOKEN}`,
          'Content-Type': 'application/json'
        },
        next: { revalidate: 300 } // Cache for 5 minutes
      }),
      fetch(`${issuesUrl}?query=is:unresolved&limit=10`, {
        headers: {
          'Authorization': `Bearer ${SENTRY_AUTH_TOKEN}`,
          'Content-Type': 'application/json'
        },
        next: { revalidate: 300 }
      })
    ]);

    if (!statsResponse.ok || !issuesResponse.ok) {
      console.error('Sentry API error:', {
        stats: statsResponse.status,
        issues: issuesResponse.status
      });
      throw new Error('Failed to fetch from Sentry');
    }

    const stats = await statsResponse.json();
    const issues = await issuesResponse.json();

    // Calculate metrics
    const totalEvents = Array.isArray(stats) 
      ? stats.reduce((sum: number, point: any) => sum + (point[1] || 0), 0)
      : 0;
    
    // Calculate crash-free rate (simplified - adjust based on your needs)
    const crashFreeRate = totalEvents > 0 
      ? ((1 - Math.min(totalEvents / 10000, 1)) * 100).toFixed(2)
      : '100.00';

    // Return sanitized public data
    return NextResponse.json({
      crashFreeRate: `${crashFreeRate}%`,
      last24Hours: {
        totalErrors: totalEvents,
        unresolvedIssues: Array.isArray(issues) ? issues.length : 0
      },
      recentIssues: Array.isArray(issues) 
        ? issues.slice(0, 5).map((issue: any) => ({
            id: issue.id,
            title: issue.title,
            count: issue.count,
            level: issue.level,
            firstSeen: issue.firstSeen,
            lastSeen: issue.lastSeen,
            permalink: issue.permalink
            // Don't include: stack traces, user data, file paths
          }))
        : [],
      timestamp: new Date().toISOString()
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });

  } catch (error) {
    console.error('Sentry API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Sentry data' }, 
      { status: 500 }
    );
  }
}
