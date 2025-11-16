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
    
    console.log('GitHub API Request:', {
      hasToken: !!token,
      tokenPrefix: token ? token.substring(0, 8) + '...' : 'none',
      owner,
      repo,
      url: `https://api.github.com/repos/${owner}/${repo}/releases/latest`
    });
    
    if (!token) {
      console.error('GitHub token not configured. Please set GITHUB_TOKEN_DOWNLOADS environment variable in Vercel.');
      return NextResponse.json({
        tag_name: 'v1.0.0',
        name: 'Version 1.0.0 - Configuration Required',
        published_at: new Date().toISOString(),
        body: '⚠️ **GitHub Integration Not Configured**\n\nToken not found in environment variables.\n\nPlease check:\n1. GITHUB_TOKEN_DOWNLOADS is set in Vercel\n2. Token has repo access to C-Elkins/SCO-SMB\n3. Application has been redeployed after adding the token',
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
    
    console.log('GitHub API Response:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API Error Details:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      
      // Return helpful error info instead of generic error
      return NextResponse.json({
        tag_name: 'v1.0.0',
        name: `Version 1.0.0 - API Error ${response.status}`,
        published_at: new Date().toISOString(),
        body: `⚠️ **GitHub API Error ${response.status}**\n\n${response.statusText}\n\nPossible issues:\n- Token doesn't have access to private repo C-Elkins/SCO-SMB\n- Token has expired or is invalid\n- Repository name/owner is incorrect\n- Rate limit exceeded\n\nCheck Vercel Function logs for more details.`,
        assets: []
      });
    }
    
    const release: GitHubRelease = await response.json();
    
    console.log('GitHub Release Data:', {
      tag_name: release.tag_name,
      name: release.name,
      assetsCount: release.assets?.length || 0,
      published_at: release.published_at
    });
    
    return NextResponse.json(release);
  } catch (error) {
    console.error('Error fetching GitHub release:', error);
    return NextResponse.json({
      tag_name: 'v1.0.0', 
      name: 'Version 1.0.0 - Network Error',
      published_at: new Date().toISOString(),
      body: `⚠️ **Network/Connection Error**\n\nFailed to connect to GitHub API.\n\nError: ${error instanceof Error ? error.message : 'Unknown error'}\n\nCheck your internet connection and GitHub status.`,
      assets: []
    }, { status: 500 });
  }
}
