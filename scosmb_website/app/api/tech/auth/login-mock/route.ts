import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

// Mock user data for demo purposes (until database is fixed)
const DEMO_USERS = [
  {
    id: 'demo-user-1',
    username: 'tech_demo',
    email: 'demo@example.com',
    password_hash: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // bcrypt hash of 'tech123'
    full_name: 'Demo Technician',
    company: 'SCO Demo Corp',
    role: 'technician',
    avatar_url: null,
    bio: 'Experienced technician specializing in printer setup and network troubleshooting.',
    specializations: ['printer-setup', 'network-issues', 'hardware-troubleshooting'],
    total_posts: 15,
    total_solutions: 8,
    created_at: new Date('2024-01-15'),
    last_login: new Date(),
    is_active: true
  }
];

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }

    console.log('Mock login attempt for:', username);

    // Find user in mock data
    const user = DEMO_USERS.find(u => u.username === username);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (!user.is_active) {
      return NextResponse.json(
        { success: false, error: 'Account is inactive' },
        { status: 403 }
      );
    }

    // Verify password (using bcrypt for the demo user, plain text check for others)
    let isValidPassword = false;
    if (username === 'tech_demo' && password === 'tech123') {
      isValidPassword = true;
    } else {
      isValidPassword = await bcrypt.compare(password, user.password_hash);
    }

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate session token
    const sessionToken = crypto.randomUUID();

    // Set cookie (in a real app, we'd store this in database)
    const cookieStore = await cookies();
    cookieStore.set('tech_session_mock', JSON.stringify({
      token: sessionToken,
      userId: user.id,
      expires: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    console.log('Mock login successful for:', username);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        company: user.company,
        role: user.role,
        avatar_url: user.avatar_url,
        bio: user.bio,
        specializations: user.specializations,
        total_posts: user.total_posts,
        total_solutions: user.total_solutions,
        created_at: user.created_at,
        last_login: user.last_login
      },
    });
  } catch (error) {
    console.error('Mock login error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error during login' },
      { status: 500 }
    );
  }
}