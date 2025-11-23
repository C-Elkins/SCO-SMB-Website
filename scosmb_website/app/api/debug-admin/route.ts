import { NextResponse } from 'next/server';
import { getSql } from '@/lib/db';

export async function GET() {
  try {
    const sql = getSql();
    const users = await sql`
      SELECT id, username, email, is_active, created_at, last_login
      FROM admin_users
      ORDER BY created_at ASC
    ` as Array<{id: string, username: string, email: string, is_active: boolean, created_at: string, last_login: string | null}>;
    
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
    
    const sql = getSql();
    const users = await sql`SELECT * FROM admin_users` as Array<{username: string, email: string, is_active: boolean, password_hash: string}>;
    
    const bcrypt = require('bcryptjs');
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