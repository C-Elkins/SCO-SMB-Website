import { NextResponse } from 'next/server';
import { fetchLatestRelease } from '@/lib/github';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('Fetching latest release from GitHub API...');
    const githubRelease = await fetchLatestRelease();

    if (!githubRelease) {
      console.error('Failed to fetch release from GitHub API');
      return NextResponse.json({
        tag_name: 'unavailable',
        name: 'Release unavailable',
        published_at: new Date().toISOString(),
        body: 'Could not fetch the latest release from GitHub. Please check your GITHUB_TOKEN environment variable.',
        assets: [],
      }, { status: 500 });
    }

    console.log('Successfully fetched release:', githubRelease.tag_name);

    const transformedAssets = githubRelease.assets.map(asset => ({
      name: asset.name,
      browser_download_url: asset.browser_download_url,
      size: asset.size,
      download_count: asset.download_count,
      file: asset.name,
    }));

    const response = {
      tag_name: githubRelease.tag_name,
      name: githubRelease.name,
      published_at: githubRelease.published_at,
      body: githubRelease.body,
      assets: transformedAssets,
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error fetching release from GitHub:', error);
    return NextResponse.json({
      tag_name: 'unavailable',
      name: 'Release unavailable',
      published_at: new Date().toISOString(),
      body: 'An error occurred while fetching the latest release.',
      assets: [],
    }, { status: 500 });
  }
}