import { NextResponse } from 'next/server';
import { getSql } from '@/lib/db';
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
    const sql = getSql();
    const userResult = await sql`
      SELECT id, username, email, password_hash, full_name, role, avatar_url, is_active
      FROM tech_users 
      WHERE username = ${username}
      LIMIT 1
    `;

    if ((userResult as any[]).length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const user = userResult[0];

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
    await sql`
      INSERT INTO tech_sessions (user_id, session_token, ip_address, user_agent, expires_at)
      VALUES (${user.id}, ${sessionToken}, ${request.headers.get('x-forwarded-for') || 'unknown'}, ${request.headers.get('user-agent') || 'unknown'}, ${expiresAt})
    `;

    // Update last login
    await sql`
      UPDATE tech_users 
      SET last_login = CURRENT_TIMESTAMP 
      WHERE id = ${user.id}
    `;

    // Log activity
    await sql`
      INSERT INTO tech_activity_logs (user_id, action, details, ip_address)
      VALUES (${user.id}, ${'tech_login'}, ${JSON.stringify({ username, timestamp: new Date().toISOString() })}, ${request.headers.get('x-forwarded-for') || 'unknown'})
    `;

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
