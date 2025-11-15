import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    if (!username || !password) {
      return NextResponse.json({ 
        error: 'Username and password are required' 
      }, { status: 400 });
    }
    
    const result = await query(
      'SELECT * FROM admin_users WHERE username = $1 AND is_active = true',
      [username]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json({ 
        error: 'Invalid credentials' 
      }, { status: 401 });
    }
    
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!validPassword) {
      return NextResponse.json({ 
        error: 'Invalid credentials' 
      }, { status: 401 });
    }
    
    // Update last login
    await query('UPDATE admin_users SET last_login = NOW() WHERE id = $1', [user.id]);
    
    // Generate JWT
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET not configured');
    }
    
    const token = jwt.sign(
      { id: user.id, username: user.username },
      jwtSecret,
      { expiresIn: '8h' }
    );
    
    const response = NextResponse.json({ 
      success: true, 
      username: user.username 
    });
    
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 8, // 8 hours
    });
    
    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ 
      error: 'An error occurred during login' 
    }, { status: 500 });
  }
}
