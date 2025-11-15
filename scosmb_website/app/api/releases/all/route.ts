import { NextResponse } from 'next/server';
import { fetchAllReleases } from '@/lib/github';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const releases = await fetchAllReleases(10);

    if (!releases || releases.length === 0) {
      return NextResponse.json(
        { error: 'Failed to fetch releases' },
        { status: 500 }
      );
    }

    return NextResponse.json(releases);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
