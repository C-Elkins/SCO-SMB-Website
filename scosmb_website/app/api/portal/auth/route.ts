import { NextRequest, NextResponse } from 'next/server';
import { validatePortalPassword, setPortalSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (!password) return NextResponse.json({ success: false, error: 'Password required' }, { status: 400 });
  try {
    const ok = await validatePortalPassword(password);
    if (!ok) return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
    const response = NextResponse.json({ success: true });
    return setPortalSession(response);
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
