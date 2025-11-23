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
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'An error occurred during login' }, { status: 500 });
  }
}
