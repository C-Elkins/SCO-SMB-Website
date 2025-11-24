import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';

export const runtime = 'nodejs';
export const revalidate = 0;

// Simplified analytics endpoint - returns mock data until full implementation
export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Return basic analytics data
    const analyticsData = {
      downloadStats: {
        total: 1250,
        thisMonth: 145,
        lastMonth: 132,
        growth: 9.8
      },
      platformStats: {
        windows: 65,
        mac: 30,
        linux: 5
      },
      keyStats: {
        totalKeys: 50,
        activeKeys: 42,
        revokedKeys: 5,
        unusedKeys: 3
      },
      monthlyTrends: [
        { month: 'Jun', downloads: 85, keysGenerated: 8 },
        { month: 'Jul', downloads: 92, keysGenerated: 10 },
        { month: 'Aug', downloads: 108, keysGenerated: 12 },
        { month: 'Sep', downloads: 125, keysGenerated: 11 },
        { month: 'Oct', downloads: 132, keysGenerated: 9 },
        { month: 'Nov', downloads: 145, keysGenerated: 13 }
      ],
      topCustomers: [],
      recentActivity: []
    };

    return NextResponse.json(analyticsData);
  } catch (error: unknown) {
    console.error('Analytics fetch error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
