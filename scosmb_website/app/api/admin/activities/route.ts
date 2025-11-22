import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(_request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Mock activities data - replace with actual audit logs when audit_logs table exists
    const formattedActivities: Array<Record<string, unknown>> = [];

    return NextResponse.json({ activities: formattedActivities });

  } catch (error) {
    console.error('Activities fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}
