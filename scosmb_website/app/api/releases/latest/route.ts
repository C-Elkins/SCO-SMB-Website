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

export async function GET(request: Request) {
  try {
    const token = process.env.GITHUB_TOKEN_DOWNLOADS || process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_REPO_OWNER || 'C-Elkins';
    const repo = process.env.GITHUB_REPO_NAME || 'SCO-SMB';
    
    // Add timestamp for debugging deployment and caching issues
    const deploymentTime = new Date().toISOString();
    
    console.log('GitHub API Request - Full Debug:', {
      timestamp: deploymentTime,
      hasToken: !!token,
      tokenPrefix: token ? token.substring(0, 12) + '...' : 'MISSING',
      tokenSuffix: token ? '...' + token.substring(token.length - 4) : 'MISSING',
      owner,
      repo,
      url: `https://api.github.com/repos/${owner}/${repo}/releases/latest`,
      allEnvVars: {
        GITHUB_TOKEN_DOWNLOADS: !!process.env.GITHUB_TOKEN_DOWNLOADS,
        GITHUB_TOKEN: !!process.env.GITHUB_TOKEN,
        GITHUB_REPO_OWNER: process.env.GITHUB_REPO_OWNER,
        GITHUB_REPO_NAME: process.env.GITHUB_REPO_NAME
      }
    });
    
    if (!token) {
      console.error('GitHub token not configured. Please set GITHUB_TOKEN_DOWNLOADS environment variable in Vercel.');
      return NextResponse.json({
        tag_name: 'v1.0.0',
        name: `Version 1.0.0 - No Token Found (${deploymentTime.substring(11, 19)})`,
        published_at: new Date().toISOString(),
        body: `⚠️ **GitHub Integration Not Configured** (${deploymentTime})\n\nToken not found in environment variables.\n\nDebugging info:\n- GITHUB_TOKEN_DOWNLOADS: ${!!process.env.GITHUB_TOKEN_DOWNLOADS}\n- GITHUB_TOKEN: ${!!process.env.GITHUB_TOKEN}\n- Expected repo: C-Elkins/SCO-SMB\n\nPlease:\n1. Verify GITHUB_TOKEN_DOWNLOADS is set in Vercel\n2. Redeploy the application\n3. Check this error shows updated timestamp`,
        assets: []
      });
    }
    
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases/latest`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'SCO-SMB-Website'
        },
        // Reduce cache time for debugging and add cache busting
        next: { revalidate: 60 },
        cache: 'no-store' // Temporarily disable caching for debugging
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
        name: `Version 1.0.0 - API Error ${response.status} (${deploymentTime.substring(11, 19)})`,
        published_at: new Date().toISOString(),
        body: `⚠️ **GitHub API Error ${response.status}** (${deploymentTime})\n\n${response.statusText}\n\n**Debug Info:**\n- Token: ${token.substring(0, 12)}...${token.substring(token.length - 4)}\n- Repo: ${owner}/${repo}\n- Error: ${errorText}\n\n**Possible issues:**\n- Token doesn't have access to private repo C-Elkins/SCO-SMB\n- Token has expired or is invalid\n- Repository name/owner is incorrect\n- Rate limit exceeded`,
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
