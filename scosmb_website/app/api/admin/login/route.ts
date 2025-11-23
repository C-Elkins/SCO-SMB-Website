import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getSql } from '@/lib/db';
import { setAdminSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }
    
    // Check DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      console.error('[Admin Login] DATABASE_URL environment variable is not configured');
      return NextResponse.json(
        { error: 'Database configuration error. Please contact support.' },
        { status: 500 }
      );
    }
    
    console.log('[Admin Login] Attempting login for username:', username);
    
    // Use direct SQL query instead of Drizzle ORM to avoid schema issues
    const sql = getSql();
    const userResult = await sql`
      SELECT id, username, email, password_hash, role, is_active
      FROM admin_users
      WHERE username = ${username}
      LIMIT 1
    ` as any[];
    
    if (userResult.length === 0) {
      console.log('[Admin Login] User not found:', username);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    const user = userResult[0] as any;
    
    if (!user.is_active) {
      console.log('[Admin Login] User is inactive:', username);
      return NextResponse.json({ error: 'Account is inactive' }, { status: 401 });
    }
    
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      console.log('[Admin Login] Invalid password for user:', username);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    // Update last login
    await sql`
      UPDATE admin_users 
      SET last_login = NOW() 
      WHERE id = ${user.id}
    `;
    
    console.log('[Admin Login] Login successful for user:', username);
    const response = NextResponse.json({ success: true, username: user.username });
    return setAdminSession(response, { userId: user.id, username: user.username });
  } catch (error) {
    console.error('[Admin Login] Error:', error);
    console.error('[Admin Login] Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
      stack: error instanceof Error ? error.stack : undefined,
      DATABASE_URL_exists: !!process.env.DATABASE_URL,
      JWT_SECRET_exists: !!process.env.JWT_SECRET
    });
    return NextResponse.json({ 
      error: 'An error occurred during login',
      details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : undefined
    }, { status: 500 });
  }
}
