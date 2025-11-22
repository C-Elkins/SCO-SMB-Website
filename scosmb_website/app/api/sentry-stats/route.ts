import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const SENTRY_AUTH_TOKEN = process.env.SENTRY_AUTH_TOKEN;
  const SENTRY_ORG = process.env.SENTRY_ORG || 'south-coast-office-smb';
  const SENTRY_PROJECT = process.env.SENTRY_PROJECT || 'electron';

  // Better error messages for debugging
  if (!SENTRY_AUTH_TOKEN) {
    return NextResponse.json(
      { 
        error: 'Sentry token not configured',
        message: 'SENTRY_AUTH_TOKEN environment variable is missing. Add it to Vercel environment variables.',
        configured: {
          token: false,
          org: !!SENTRY_ORG && SENTRY_ORG !== 'your-org-slug',
          project: !!SENTRY_PROJECT
        }
      }, 
      { status: 500 }
    );
  }

  if (SENTRY_ORG === 'your-org-slug') {
    return NextResponse.json(
      { 
        error: 'Sentry organization not configured',
        message: 'SENTRY_ORG environment variable needs to be set to your actual Sentry organization slug.'
      }, 
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

    const [statsResponse, issuesResponse, resolvedIssuesResponse] = await Promise.all([
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
      }),
      fetch(`${issuesUrl}?query=is:resolved&limit=20`, {
        headers: {
          'Authorization': `Bearer ${SENTRY_AUTH_TOKEN}`,
          'Content-Type': 'application/json'
        },
        next: { revalidate: 300 }
      })
    ]);

    if (!statsResponse.ok || !issuesResponse.ok || !resolvedIssuesResponse.ok) {
      const statsError = !statsResponse.ok ? await statsResponse.text() : null;
      const issuesError = !issuesResponse.ok ? await issuesResponse.text() : null;
      const resolvedError = !resolvedIssuesResponse.ok ? await resolvedIssuesResponse.text() : null;
      
      console.error('Sentry API error:', {
        stats: { status: statsResponse.status, error: statsError },
        issues: { status: issuesResponse.status, error: issuesError },
        resolved: { status: resolvedIssuesResponse.status, error: resolvedError },
        org: SENTRY_ORG,
        project: SENTRY_PROJECT
      });
      
      return NextResponse.json(
        { 
          error: 'Failed to fetch from Sentry API',
          message: `HTTP ${!statsResponse.ok ? statsResponse.status : !issuesResponse.ok ? issuesResponse.status : resolvedIssuesResponse.status}. Check that SENTRY_ORG and SENTRY_PROJECT are correct and your token has the required permissions.`,
          details: {
            statsStatus: statsResponse.status,
            issuesStatus: issuesResponse.status,
            resolvedStatus: resolvedIssuesResponse.status,
            org: SENTRY_ORG,
            project: SENTRY_PROJECT
          }
        }, 
        { status: 500 }
      );
    }

    const stats = await statsResponse.json();
    const issues = await issuesResponse.json();
    const resolvedIssues = await resolvedIssuesResponse.json();

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
        unresolvedIssues: Array.isArray(issues) ? issues.length : 0,
        resolvedIssues: Array.isArray(resolvedIssues) ? resolvedIssues.length : 0
      },
      recentIssues: Array.isArray(issues) 
        ? issues.slice(0, 5).map((issue: any) => ({
            id: issue.id,
            title: issue.title,
            count: issue.count,
            level: issue.level,
            firstSeen: issue.firstSeen,
            lastSeen: issue.lastSeen,
            permalink: issue.permalink,
            status: 'unresolved'
            // Don't include: stack traces, user data, file paths
          }))
        : [],
      resolvedIssues: Array.isArray(resolvedIssues)
        ? resolvedIssues.slice(0, 10).map((issue: any) => ({
            id: issue.id,
            title: issue.title,
            count: issue.count,
            level: issue.level,
            firstSeen: issue.firstSeen,
            lastSeen: issue.lastSeen,
            resolvedAt: issue.statusDetails?.inCommit ? new Date(issue.statusDetails.inCommit.dateCreated).toISOString() : issue.lastSeen,
            permalink: issue.permalink,
            status: 'resolved'
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
      { 
        error: 'Failed to fetch Sentry data',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        help: 'Ensure SENTRY_AUTH_TOKEN, SENTRY_ORG, and SENTRY_PROJECT are correctly set in Vercel environment variables.'
      }, 
      { status: 500 }
    );
  }
}
