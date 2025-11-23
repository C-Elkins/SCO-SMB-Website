import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { admin_users } from '@/lib/schema';
import { getAdminSession } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { username, email, password, role = 'admin' } = await request.json();
    
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
    
    return NextResponse.json({ 
      success: true, 
      message: 'Admin user created successfully' 
    });
  } catch (error: any) {
    console.error('Error creating admin user:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}