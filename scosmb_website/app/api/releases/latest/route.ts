import { NextResponse } from 'next/server';

interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  body: string;
  assets: Array<{
    name: string;
    browser_download_url: string;
    size: number;
    download_count: number;
  }>;
}

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN_DOWNLOADS || process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_REPO_OWNER || 'C-Elkins';
    const repo = process.env.GITHUB_REPO_NAME || 'SCO-SMB';
    
    if (!token) {
      console.error('GitHub token not configured. Please set GITHUB_TOKEN_DOWNLOADS environment variable in Vercel.');
      // Return mock data when token is missing - shows need for configuration
      return NextResponse.json({
        tag_name: 'v1.0.0',
        name: 'Version 1.0.0 - Configuration Required',
        published_at: new Date().toISOString(),
        body: '⚠️ **GitHub Integration Not Configured**\n\nTo display real release data from your private SCO-SMB repository:\n\n1. Go to Vercel Dashboard → Settings → Environment Variables\n2. Add `GITHUB_TOKEN_DOWNLOADS` with a GitHub Personal Access Token\n3. Ensure the token has access to the private `C-Elkins/SCO-SMB` repository\n4. Redeploy the application\n\nContact the development team if you need assistance setting this up.',
        assets: []
      });
    }
    
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases/latest`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        },
        next: { revalidate: 300 } // Cache for 5 minutes
      }
    );
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const release: GitHubRelease = await response.json();
    
    // Return the full release object with assets array intact
    return NextResponse.json(release);
  } catch (error) {
    console.error('Error fetching GitHub release:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch latest release' 
    }, { status: 500 });
  }
}
