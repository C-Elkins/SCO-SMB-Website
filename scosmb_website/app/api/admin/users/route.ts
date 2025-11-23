import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { admin_users } from '@/lib/schema';
import { getAdminSession } from '@/lib/auth';
import { eq, desc } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const db = getDb();
  const users = await db
    .select({
      id: admin_users.id,
      username: admin_users.username,
      email: admin_users.email,
      role: admin_users.role,
      created_at: admin_users.created_at,
      last_login: admin_users.last_login,
      is_active: admin_users.is_active
    })
    .from(admin_users)
    .orderBy(desc(admin_users.created_at))
    .limit(100);
  
  return NextResponse.json({ users });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { username, password, email, role = 'admin' } = await req.json();
  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
  }
  
  const db = getDb();
  
  // Check if username already exists
  const existing = await db.select().from(admin_users).where(eq(admin_users.username, username));
  if (existing.length) {
    return NextResponse.json({ error: 'Username already exists' }, { status: 409 });
  }
  
  // Hash password and create user
  const password_hash = await bcrypt.hash(password, 12);
  await db.insert(admin_users).values({ 
    username: username, 
    password_hash: password_hash, 
    email: email,
    role: role,
    is_active: true
  } as any);
  
  return NextResponse.json({ success: true, message: 'Admin user created successfully' });
}
