import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { admin_users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = getDb();
    const { userId } = await params;
    const body = await request.json();
    const { username, email, role, password, isActive } = body;

    // Build the update object
    const updateData: any = {
      username,
      email,
      role,
      is_active: isActive
    };

    // If password is provided, hash it
    if (password && password.length > 0) {
      if (password.length < 6) {
        return NextResponse.json(
          { error: 'Password must be at least 6 characters long' },
          { status: 400 }
        );
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      updateData.password_hash = hashedPassword;
    }

    // Update the admin user
    const [updatedUser] = await db
      .update(admin_users)
      .set(updateData)
      .where(eq(admin_users.id, userId))
      .returning({
        id: admin_users.id,
        username: admin_users.username,
        email: admin_users.email,
        role: admin_users.role,
        is_active: admin_users.is_active,
        created_at: admin_users.created_at,
        last_login: admin_users.last_login
      });

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Admin user updated successfully',
      user: updatedUser
    });
  } catch (error: any) {
    console.error('Update admin user error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = getDb();
    const { userId } = await params;

    // Don't allow deleting yourself
    if (userId === session.userId) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      );
    }

    // Delete the admin user
    await db.delete(admin_users).where(eq(admin_users.id, userId));

    return NextResponse.json({ message: 'Admin user deleted successfully' });
  } catch (error: any) {
    console.error('Delete admin user error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}