import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Mock user data matching the login mock
const DEMO_USERS = {
  'demo-user-1': {
    id: 'demo-user-1',
    username: 'tech_demo',
    email: 'demo@example.com',
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
};

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('tech_session_mock')?.value;

    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    try {
      const sessionData = JSON.parse(sessionCookie);
      
      // Check if session is expired
      if (Date.now() > sessionData.expires) {
        return NextResponse.json({ authenticated: false, user: null });
      }

      // Get user data
      const user = DEMO_USERS[sessionData.userId];
      
      if (!user) {
        return NextResponse.json({ authenticated: false, user: null });
      }

      console.log('Mock session check successful for:', user.username);

      return NextResponse.json({
        authenticated: true,
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
          last_login: user.last_login,
        },
      });
    } catch (parseError) {
      console.error('Failed to parse session cookie:', parseError);
      return NextResponse.json({ authenticated: false, user: null });
    }
  } catch (error) {
    console.error('Mock session check error:', error);
    return NextResponse.json({ authenticated: false, user: null });
  }
}