import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSql } from '@/lib/db';

export const revalidate = 0;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('tech_session')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { authenticated: false, user: null },
        {
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, private, max-age=0',
          },
        }
      );
    }

    // Find valid session with user data
    const sql = getSql();
    const sessionResult = await sql`
      SELECT 
        u.id, u.username, u.email, u.full_name, u.company, u.role, 
        u.avatar_url, u.bio, u.specializations, u.total_posts, 
        u.total_solutions, u.created_at, u.last_login
      FROM tech_sessions s
      INNER JOIN tech_users u ON s.user_id = u.id
      WHERE s.session_token = ${sessionToken} AND s.expires_at > CURRENT_TIMESTAMP
      LIMIT 1
    `;

    if ((sessionResult as any[]).length === 0) {
      return NextResponse.json(
        { authenticated: false, user: null },
        {
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, private, max-age=0',
          },
        }
      );
    }

    const user = sessionResult[0];

    return NextResponse.json(
      {
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
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, private, max-age=0',
        },
      }
    );
  } catch (error) {
    console.error('Tech session check error:', error);
    return NextResponse.json(
      { authenticated: false, user: null },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, private, max-age=0',
        },
      }
    );
  }
}
