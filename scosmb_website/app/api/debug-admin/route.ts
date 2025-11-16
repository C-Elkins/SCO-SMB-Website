import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { admin_users } from '@/lib/schema';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const db = getDb();
    const users = await db.select({
      id: admin_users.id,
      username: admin_users.username,
      email: admin_users.email,
      is_active: admin_users.is_active,
      created_at: admin_users.created_at,
      last_login: admin_users.last_login
    }).from(admin_users);
    
    return NextResponse.json({ 
      success: true,
      users: users,
      message: `Found ${users.length} admin users`
    });
  } catch (error) {
    console.error('Error fetching admin users:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    const db = getDb();
    const users = await db.select().from(admin_users);
    
    const results = [];
    for (const user of users) {
      const isMatch = await bcrypt.compare(password, user.password_hash);
      results.push({
        username: user.username,
        email: user.email,
        is_active: user.is_active,
        passwordMatch: isMatch
      });
    }
    
    return NextResponse.json({ 
      success: true,
      testUsername: username,
      testPassword: password,
      results: results
    });
  } catch (error) {
    console.error('Error testing admin login:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}