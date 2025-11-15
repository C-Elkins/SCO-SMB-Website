import { NextRequest, NextResponse } from 'next/server';
import { generatePortalToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const portalPassword = process.env.PORTAL_PASSWORD;

  if (!portalPassword) {
    return NextResponse.json({ success: false, error: 'Portal password not configured' }, { status: 500 });
  }

  if (password !== portalPassword) {
    return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
  }

  const token = generatePortalToken();
  const res = NextResponse.json({ success: true });
  res.cookies.set('portal_auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    const portalPassword = process.env.PORTAL_PASSWORD || 'TechPortal2025!';

    if (password === portalPassword) {
      const response = NextResponse.json({ success: true });
      
      response.cookies.set('portal_auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Invalid password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Portal auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
