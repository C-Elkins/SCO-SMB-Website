import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDb } from '@/lib/db';
import { tech_sessions, tech_users } from '@/lib/schema';

const db = getDb();
import { eq, and, gt } from 'drizzle-orm';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('tech_session')?.value;

    if (!sessionToken) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    // Find valid session
    const sessions = await db
      .select({
        session: tech_sessions,
        user: tech_users,
      })
      .from(tech_sessions)
      .innerJoin(tech_users, eq(tech_sessions.user_id, tech_users.id))
      .where(
        and(
          eq(tech_sessions.session_token, sessionToken),
          gt(tech_sessions.expires_at, new Date())
        )
      )
      .limit(1);

    if (sessions.length === 0) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    const { user } = sessions[0];

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        company: user.company,
        role: user.role,
        avatar_url: user.avatar_url,
        bio: user.bio,
        specializations: user.specializations ? JSON.parse(user.specializations) : [],
        total_posts: user.total_posts,
        total_solutions: user.total_solutions,
        created_at: user.created_at,
        last_login: user.last_login,
      },
    });
  } catch (error) {
    console.error('Tech session check error:', error);
    return NextResponse.json({ authenticated: false, user: null });
  }
}
