import { NextResponse } from 'next/server';
import { getSql } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { getAdminSession } from '@/lib/auth';

export const revalidate = 0;

// POST - Reset tech user password
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin authentication
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const sql = getSql();

    const { id } = await params;
    const body = await request.json();
    const { password } = body;

    // Validate password
    if (!password || password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    // Hash new password
    const password_hash = await bcrypt.hash(password, 10);

    // Update ONLY tech_users password - DO NOT touch admin_sessions or cookies
    const updatedUser = await sql`
      UPDATE tech_users 
      SET password_hash = ${password_hash}
      WHERE id = ${id}
      RETURNING id, username, email
    `;

    if (updatedUser.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Invalidate all tech_sessions for this tech user (force them to re-login)
    await sql`
      DELETE FROM tech_sessions 
      WHERE user_id = ${id}
    `;

    return NextResponse.json({ 
      success: true,
      message: 'Password reset successfully. User must re-login.'
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 });
  }
}
