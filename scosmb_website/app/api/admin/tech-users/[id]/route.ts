import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { tech_users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { getAdminSession } from '@/lib/auth';

// PUT - Update tech user
export async function PUT(
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
    const { username, email, password, full_name, company, phone, role, specializations, is_active } = body;

    // Build update object
    const updateData: Record<string, unknown> = {};

    if (email !== undefined) updateData.email = email;
    if (full_name !== undefined) updateData.full_name = full_name;
    if (company !== undefined) updateData.company = company;
    if (phone !== undefined) updateData.phone = phone;
    if (role !== undefined) updateData.role = role;
    if (specializations !== undefined) updateData.specializations = JSON.stringify(specializations);
    if (is_active !== undefined) updateData.is_active = is_active;

    // If password is provided, hash it
    if (password && password.length >= 8) {
      updateData.password_hash = await bcrypt.hash(password, 10);
    }

    // Update user
    const updatedUser = await db
      .update(tech_users)
      .set(updateData)
      .where(eq(tech_users.id, id))
      .returning();

    if (updatedUser.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Parse specializations back to array for response
    const userResponse = {
      ...updatedUser[0],
      specializations: updatedUser[0].specializations ? JSON.parse(updatedUser[0].specializations as string) : []
    };

    return NextResponse.json({ 
      success: true, 
      user: userResponse 
    });
  } catch (error) {
    console.error('Error updating tech user:', error);
    return NextResponse.json({ error: 'Failed to update tech user' }, { status: 500 });
  }
}

// DELETE - Delete tech user
export async function DELETE(
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

    // Delete user (cascade will handle related data)
    const deletedUser = await db
      .delete(tech_users)
      .where(eq(tech_users.id, id))
      .returning();

    if (deletedUser.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting tech user:', error);
    return NextResponse.json({ error: 'Failed to delete tech user' }, { status: 500 });
  }
}
