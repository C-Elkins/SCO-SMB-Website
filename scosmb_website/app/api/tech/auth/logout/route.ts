import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDb } from '@/lib/db';
import { tech_sessions } from '@/lib/schema';

const db = getDb();
import { eq } from 'drizzle-orm';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('tech_session')?.value;

    if (sessionToken) {
      // Delete session from database
      await db.delete(tech_sessions).where(eq(tech_sessions.session_token, sessionToken));
    }

    // Clear cookie
    cookieStore.delete('tech_session');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Tech logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error during logout' },
      { status: 500 }
    );
  }
}
