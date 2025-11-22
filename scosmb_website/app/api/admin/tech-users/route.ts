import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { tech_users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

// GET - Fetch all tech users
export async function GET(request: Request) {
  try {
    const db = getDb();
    
    // Verify admin authentication
    const cookie = request.headers.get('cookie');
    if (!cookie?.includes('admin_session')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const users = await db
      .select()
      .from(tech_users)
      .orderBy(tech_users.created_at);

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching tech users:', error);
    return NextResponse.json({ error: 'Failed to fetch tech users' }, { status: 500 });
  }
}

// POST - Create new tech user
export async function POST(request: Request) {
  try {
    const db = getDb();
    
    // Verify admin authentication
    const cookie = request.headers.get('cookie');
    if (!cookie?.includes('admin_session')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { username, email, password, full_name, company, phone, role, specializations, is_active } = body;

    // Validate required fields
    if (!username || !email || !password || !full_name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if username already exists
    const existingUser = await db
      .select()
      .from(tech_users)
      .where(eq(tech_users.username, username))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
    }

    // Check if email already exists
    const existingEmail = await db
      .select()
      .from(tech_users)
      .where(eq(tech_users.email, email))
      .limit(1);

    if (existingEmail.length > 0) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await db
      .insert(tech_users)
      .values({
        username,
        email,
        password_hash,
        full_name,
        company: company || null,
        phone: phone || null,
        role: role || 'technician',
        specializations: specializations || [],
        is_active: is_active !== undefined ? is_active : true,
      })
      .returning();

    return NextResponse.json({ 
      success: true, 
      user: newUser[0] 
    });
  } catch (error) {
    console.error('Error creating tech user:', error);
    return NextResponse.json({ error: 'Failed to create tech user' }, { status: 500 });
  }
}
