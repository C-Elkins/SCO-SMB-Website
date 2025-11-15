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
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_REPO_OWNER || 'C-Elkins';
    const repo = process.env.GITHUB_REPO_NAME || 'SCO-SMB';
    
    if (!token) {
      return NextResponse.json({ 
        error: 'GitHub token not configured' 
      }, { status: 500 });
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
    
    // Parse assets by platform
    const assets = {
      macSilicon: {
        pkg: release.assets.find(a => a.name.includes('arm64') && a.name.endsWith('.pkg')),
        dmg: release.assets.find(a => a.name.includes('arm64') && a.name.endsWith('.dmg')),
      },
      macIntel: {
        pkg: release.assets.find(a => a.name.includes('x64') && a.name.endsWith('.pkg')),
        dmg: release.assets.find(a => a.name.includes('x64') && a.name.endsWith('.dmg')),
      },
      windows: {
        exe: release.assets.find(a => a.name.endsWith('.exe')),
      },
    };
    
    return NextResponse.json({
      version: release.tag_name,
      name: release.name,
      publishedAt: release.published_at,
      releaseNotes: release.body,
      assets,
    });
  } catch (error) {
    console.error('Error fetching GitHub release:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch latest release' 
    }, { status: 500 });
  }
}
