import { NextResponse } from 'next/server';
import { fetchLatestRelease } from '@/lib/github';

export const revalidate = 300; // Cache for 5 minutes

export async function GET() {
  try {
    const release = await fetchLatestRelease();
    
    if (!release) {
      return NextResponse.json(
        {
          tag_name: 'unavailable',
          name: 'Release unavailable',
          published_at: new Date().toISOString(),
          body: 'Unable to fetch release information from GitHub. Please check GITHUB_TOKEN configuration.',
          assets: []
        },
        { 
          status: 500,
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          }
        }
      );
    }

    return NextResponse.json(release, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });
  } catch (error) {
    console.error('Error fetching GitHub release:', error);
    return NextResponse.json(
      {
        tag_name: 'error',
        name: 'Error fetching release',
        published_at: new Date().toISOString(),
        body: 'An error occurred while fetching release information.',
        assets: []
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        }
      }
    );
  }
}
