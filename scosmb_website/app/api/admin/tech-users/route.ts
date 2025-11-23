import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { tech_users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { getAdminSession } from '@/lib/auth';

// GET - Fetch all tech users
export async function GET(request: Request) {
  try {
    // Verify admin authentication
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const db = getDb();

    const users = await db
      .select()
      .from(tech_users)
      .orderBy(tech_users.created_at);

    // Parse specializations from JSON string to array
    const parsedUsers = users.map(user => ({
      ...user,
      specializations: user.specializations ? JSON.parse(user.specializations as string) : []
    }));

    return NextResponse.json({ 
      users: parsedUsers 
    }, {
      headers: {
        'Cache-Control': 'private, max-age=60, stale-while-revalidate=120',
      }
    });
  } catch (error) {
    console.error('Error fetching tech users:', error);
    return NextResponse.json({ error: 'Failed to fetch tech users' }, { status: 500 });
  }
}

// POST - Create new tech user
export async function POST(request: Request) {
  try {
    // Verify admin authentication
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const db = getDb();

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
        username: username,
        email: email,
        password_hash: password_hash,
        full_name: full_name,
        company: company || null,
        phone: phone || null,
        role: role || 'technician',
        specializations: JSON.stringify(specializations || []),
        is_active: is_active !== undefined ? is_active : true,
      } as any)
      .returning();

    // Parse specializations back to array for response
    const userResponse = {
      ...newUser[0],
      specializations: newUser[0].specializations ? JSON.parse(newUser[0].specializations as string) : []
    };

    return NextResponse.json({ 
      success: true, 
      user: userResponse 
    });
  } catch (error) {
    console.error('Error creating tech user:', error);
    return NextResponse.json({ error: 'Failed to create tech user' }, { status: 500 });
  }
}
