import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    
    // Check if any tech users exist using Neon HTTP tagged template
    const result = await sql`
      SELECT id, username, full_name, is_active, created_at 
      FROM tech_users 
      ORDER BY created_at DESC
    `;

    return NextResponse.json({
      count: result.length,
      users: result.map(u => ({
        id: u.id,
        username: u.username,
        full_name: u.full_name,
        is_active: u.is_active,
        created_at: u.created_at
      }))
    });
  } catch (error) {
    const err = error as Error;
    console.error('Debug tech users error:', error);
    return NextResponse.json({ 
      error: 'Database error',
      details: err.message 
    }, { status: 500 });
  }
}

export async function POST() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    
    // Check if test user already exists
    const existingUser = await sql`
      SELECT COUNT(*) FROM tech_users WHERE username = 'tech_demo'
    `;
    
    if (parseInt(existingUser[0].count) === 0) {
      const hashedPassword = await bcrypt.hash('tech123', 10);
      
      const result = await sql`
        INSERT INTO tech_users (username, email, password_hash, full_name, role, specializations, is_active)
        VALUES (${('tech_demo')}, ${'demo@example.com'}, ${hashedPassword}, ${'Demo Technician'}, ${'technician'}, ${JSON.stringify(['printer-setup', 'network-issues'])}, ${true})
        RETURNING id, username, full_name
      `;

      return NextResponse.json({
        message: 'Test user created',
        user: result[0]
      });
    } else {
      return NextResponse.json({
        message: 'Test user already exists',
        username: 'tech_demo'
      });
    }
  } catch (error) {
    const err = error as Error;
    console.error('Create test user error:', error);
    return NextResponse.json({ 
      error: 'Database error',
      details: err.message 
    }, { status: 500 });
  }
}