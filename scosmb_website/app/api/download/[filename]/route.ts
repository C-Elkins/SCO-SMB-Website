import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSql } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    
    // Get the latest release from GitHub (with auth for private repos)
    const releaseResponse = await fetch(
      'https://api.github.com/repos/C-Elkins/SCO-SMB/releases/latest',
      {
        headers: {
          'Accept': 'application/vnd.github+json',
          'User-Agent': 'SCO-SMB-Website',
          ...(GITHUB_TOKEN && { 'Authorization': `Bearer ${GITHUB_TOKEN}` }),
        },
        next: { revalidate: 300 } // Cache for 5 minutes
      }
    );

    if (!releaseResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch release information' },
        { status: 500 }
      );
    }

    const release = await releaseResponse.json();
    const asset = release.assets?.find((a: any) => a.name === filename);

    if (!asset) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // Log the download
    try {
      const sql = getSql();
      const cookieStore = await cookies();
      const sessionCookie = cookieStore.get('session')?.value;
      
      let userId = null;
      if (sessionCookie) {
        // Try to get user from session if logged in
        const sessions = await sql`
          SELECT user_id FROM sessions WHERE session_token = ${sessionCookie} LIMIT 1
        ` as any[];
        if (sessions.length > 0) {
          userId = sessions[0].user_id;
        }
      }

      // Log download
      await sql`
        INSERT INTO download_logs (
          user_id, 
          filename, 
          platform, 
          ip_address, 
          user_agent,
          success
        ) VALUES (
          ${userId},
          ${filename},
          ${detectPlatform(filename)},
          ${request.headers.get('x-forwarded-for') || 'unknown'},
          ${request.headers.get('user-agent') || 'unknown'},
          ${true}
        )
      `;
    } catch (logError) {
      console.error('Failed to log download:', logError);
      // Continue with download even if logging fails
    }

    // For private repos, we need to proxy the download with authentication
    const fileResponse = await fetch(asset.url, {
      headers: {
        'Accept': 'application/octet-stream',
        ...(GITHUB_TOKEN && { 'Authorization': `Bearer ${GITHUB_TOKEN}` }),
        'User-Agent': 'SCO-SMB-Website',
      },
    });

    if (!fileResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to download file from GitHub' },
        { status: 500 }
      );
    }

    // Stream the file to the user
    return new NextResponse(fileResponse.body, {
      headers: {
        'Content-Type': asset.content_type || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': asset.size.toString(),
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Download failed' },
      { status: 500 }
    );
  }
}

function detectPlatform(filename: string): string {
  const lower = filename.toLowerCase();
  if (lower.includes('mac') || lower.includes('darwin')) {
    if (lower.includes('arm64')) return 'macOS ARM64';
    return 'macOS Intel';
  }
  if (lower.includes('win') || lower.includes('windows')) {
    return 'Windows';
  }
  if (lower.includes('linux')) {
    return 'Linux';
  }
  return 'Unknown';
}
