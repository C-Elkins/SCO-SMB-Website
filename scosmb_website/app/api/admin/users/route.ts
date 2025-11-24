import { NextRequest, NextResponse } from 'next/server';
import { getSql } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export const revalidate = 0;

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const sql = getSql();
    const users = await sql`
      SELECT id, username, email, role, created_at, last_login, is_active
      FROM admin_users
      ORDER BY created_at DESC
      LIMIT 100
    `;
    
    return NextResponse.json({ users }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, private, max-age=0',
      }
    });
  } catch (error: any) {
    console.error('Failed to fetch admin users:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const { username, password, email, role = 'admin' } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }
    
    const sql = getSql();
    
    // Check if username already exists
    const existing = await sql`SELECT id FROM admin_users WHERE username = ${username}` as unknown[];
    if (existing.length > 0) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 409 });
    }
    
    // Hash password and create user
    const password_hash = await bcrypt.hash(password, 12);
    await sql`
      INSERT INTO admin_users (username, password_hash, email, role, is_active)
      VALUES (${username}, ${password_hash}, ${email}, ${role}, true)
    `;
    
    return NextResponse.json({ success: true, message: 'Admin user created successfully' });
  } catch (error: any) {
    console.error('Failed to create admin user:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
