import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { tech_users } from '@/lib/schema';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const db = getDb();
    
    // Check if any tech users exist
    const users = await db.select({
      id: tech_users.id,
      username: tech_users.username,
      full_name: tech_users.full_name,
      is_active: tech_users.is_active,
      created_at: tech_users.created_at
    }).from(tech_users);

    return NextResponse.json({
      count: users.length,
      users: users.map(u => ({
        id: u.id,
        username: u.username,
        full_name: u.full_name,
        is_active: u.is_active,
        created_at: u.created_at
      }))
    });
  } catch (error) {
    console.error('Debug tech users error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const db = getDb();
    
    // Create a test user if none exist
    const existingUsers = await db.select().from(tech_users).limit(1);
    
    if (existingUsers.length === 0) {
      const hashedPassword = await bcrypt.hash('tech123', 10);
      
      const newUser = await db.insert(tech_users).values({
        username: 'tech_demo',
        email: 'demo@example.com',
        password_hash: hashedPassword,
        full_name: 'Demo Technician',
        role: 'technician',
        specializations: JSON.stringify(['printer-setup', 'network-issues']),
        is_active: true
      }).returning();

      return NextResponse.json({
        message: 'Test user created',
        user: {
          username: newUser[0].username,
          full_name: newUser[0].full_name
        }
      });
    } else {
      return NextResponse.json({
        message: 'Users already exist',
        count: existingUsers.length
      });
    }
  } catch (error) {
    console.error('Create test user error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}