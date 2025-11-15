/**
 * GitHub API Integration for fetching releases from private repo
 */

export interface GitHubAsset {
  name: string;
  browser_download_url: string;
  size: number;
  download_count: number;
  content_type: string;
}

export interface GitHubRelease {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  assets: GitHubAsset[];
  html_url: string;
}

const GITHUB_API_BASE = 'https://api.github.com';

export async function fetchLatestRelease(): Promise<GitHubRelease | null> {
  const owner = process.env.GITHUB_REPO_OWNER || 'C-Elkins';
  const repo = process.env.GITHUB_REPO_NAME || 'SCO-SMB';
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.error('GITHUB_TOKEN not set in environment variables');
    return null;
  }

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/releases/latest`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const release = await response.json();
    return release;
  } catch (error) {
    console.error('Error fetching GitHub release:', error);
    return null;
  }
}

export async function fetchAllReleases(limit = 10): Promise<GitHubRelease[]> {
  const owner = process.env.GITHUB_REPO_OWNER || 'C-Elkins';
  const repo = process.env.GITHUB_REPO_NAME || 'SCO-SMB';
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.error('GITHUB_TOKEN not set in environment variables');
    return [];
  }

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/releases?per_page=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status} ${response.statusText}`);
      return [];
    }

    const releases = await response.json();
    return releases;
  } catch (error) {
    console.error('Error fetching GitHub releases:', error);
    return [];
  }
}

export function getDownloadUrlByPlatform(assets: GitHubAsset[], platform: 'mac-intel' | 'mac-silicon' | 'windows'): string | null {
  const patterns = {
    'mac-intel': /x64\.(pkg|dmg)$/i,
    'mac-silicon': /arm64\.(pkg|dmg)$/i,
    'windows': /\.exe$/i,
  };

  const pattern = patterns[platform];
  const asset = assets.find((a) => pattern.test(a.name));
  
  return asset ? asset.browser_download_url : null;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatReleaseDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
