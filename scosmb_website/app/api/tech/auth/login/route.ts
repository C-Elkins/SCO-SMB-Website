import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { tech_users, tech_sessions, tech_activity_logs } from '@/lib/schema';

const db = getDb();
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const users = await db
      .select()
      .from(tech_users)
      .where(eq(tech_users.username, username))
      .limit(1);

    if (users.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const user = users[0];

    if (!user.is_active) {
      return NextResponse.json(
        { success: false, error: 'Account is inactive' },
        { status: 403 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate session token
    const sessionToken = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    // Create session
    await db.insert(tech_sessions).values({
      user_id: user.id,
      session_token: sessionToken,
      ip_address: request.headers.get('x-forwarded-for') || 'unknown',
      user_agent: request.headers.get('user-agent') || 'unknown',
      expires_at: expiresAt,
    });

    // Update last login
    await db
      .update(tech_users)
      .set({ last_login: new Date() })
      .where(eq(tech_users.id, user.id));

    // Log activity
    await db.insert(tech_activity_logs).values({
      user_id: user.id,
      action: 'tech_login',
      details: JSON.stringify({ username, timestamp: new Date().toISOString() }),
      ip_address: request.headers.get('x-forwarded-for') || 'unknown',
    });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('tech_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        avatar_url: user.avatar_url,
      },
    });
  } catch (error) {
    console.error('Tech login error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error during login' },
      { status: 500 }
    );
  }
}
