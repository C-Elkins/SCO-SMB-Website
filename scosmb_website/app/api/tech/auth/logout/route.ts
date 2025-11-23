import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSql } from '@/lib/db';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('tech_session')?.value;

    if (sessionToken) {
      // Delete session from database
      const sql = getSql();
      await sql`DELETE FROM tech_sessions WHERE session_token = ${sessionToken}`;
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
