import { NextResponse } from 'next/server';
import { getLatestRelease } from '@/lib/releases';

export async function GET() {
  try {
    const release = await getLatestRelease();
    return NextResponse.json(release, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });
  } catch (error) {
    console.error('Error loading release manifest:', error);
    return NextResponse.json({
      tag_name: 'unavailable',
      name: 'Release manifest unavailable',
      published_at: new Date().toISOString(),
      body: 'The release manifest could not be loaded. Ensure data/releases/latest.json exists and contains valid JSON.',
      assets: []
    }, { status: 500 });
  }
}
