import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { tech_users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { getAdminSession } from '@/lib/auth';

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
    
    const db = getDb();

    const { id } = await params;
    const body = await request.json();
    const { password } = body;

    // Validate password
    if (!password || password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    // Hash new password
    const password_hash = await bcrypt.hash(password, 10);

    // Update password
    const updatedUser = await db
      .update(tech_users)
      .set({ 
        password_hash
      })
      .where(eq(tech_users.id, id))
      .returning();

    if (updatedUser.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 });
  }
}
