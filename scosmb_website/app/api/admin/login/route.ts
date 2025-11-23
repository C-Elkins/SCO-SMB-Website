import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/db';
import { admin_users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
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
    const db = getDb();
    const rows = await db.select().from(admin_users).where(eq(admin_users.username, username));
    const user = rows[0];
    if (!user || !user.is_active) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    // Update last login
    await db.update(admin_users).set({ last_login: new Date() } as any).where(eq(admin_users.id, user.id));
    const response = NextResponse.json({ success: true, username: user.username });
    return setAdminSession(response, { userId: user.id, username: user.username });
  } catch (error) {
    console.error('[Admin Login] Error:', error);
    console.error('[Admin Login] Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      DATABASE_URL_exists: !!process.env.DATABASE_URL
    });
    return NextResponse.json({ 
      error: 'An error occurred during login',
      details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : undefined
    }, { status: 500 });
  }
}
