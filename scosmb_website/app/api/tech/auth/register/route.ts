import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { tech_users, tech_activity_logs } from '@/lib/schema';

const db = getDb();
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { username, email, password, full_name, company, phone } = await request.json();

    // Validation
    if (!username || !email || !password || !full_name) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Check if username exists
    const existingUsername = await db
      .select()
      .from(tech_users)
      .where(eq(tech_users.username, username))
      .limit(1);

    if (existingUsername.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Username already exists' },
        { status: 409 }
      );
    }

    // Check if email exists
    const existingEmail = await db
      .select()
      .from(tech_users)
      .where(eq(tech_users.email, email))
      .limit(1);

    if (existingEmail.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Create user
    const newUsers = await db
      .insert(tech_users)
      .values({
        username,
        email,
        password_hash,
        full_name,
        company: company || null,
        phone: phone || null,
        role: 'technician',
      })
      .returning();

    const newUser = newUsers[0];

    // Log activity
    await db.insert(tech_activity_logs).values({
      user_id: newUser.id,
      action: 'tech_registration',
      details: JSON.stringify({
        username,
        email,
        timestamp: new Date().toISOString(),
      }),
      ip_address: request.headers.get('x-forwarded-for') || 'unknown',
    });

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        full_name: newUser.full_name,
      },
    });
  } catch (error) {
    console.error('Tech registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error during registration' },
      { status: 500 }
    );
  }
}
