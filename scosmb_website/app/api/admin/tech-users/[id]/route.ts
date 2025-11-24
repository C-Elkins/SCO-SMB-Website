import { NextResponse } from 'next/server';
import { getSql } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { getAdminSession } from '@/lib/auth';

export const revalidate = 0;

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
    
    const sql = getSql();

    const { id } = await params;
    const body = await request.json();
    const { email, password, full_name, company, phone, role, specializations, is_active } = body;

    // Build update list
    const updates: { column: string; value: any }[] = [];

    if (email !== undefined) updates.push({ column: 'email', value: email });
    if (full_name !== undefined) updates.push({ column: 'full_name', value: full_name });
    if (company !== undefined) updates.push({ column: 'company', value: company });
    if (phone !== undefined) updates.push({ column: 'phone', value: phone });
    if (role !== undefined) updates.push({ column: 'role', value: role });
    if (specializations !== undefined) updates.push({ column: 'specializations', value: JSON.stringify(specializations) });
    if (is_active !== undefined) updates.push({ column: 'is_active', value: is_active });

    // If password is provided, hash it
    if (password && password.length >= 8) {
      const password_hash = await bcrypt.hash(password, 10);
      updates.push({ column: 'password_hash', value: password_hash });
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    // Execute individual updates
    for (const { column, value } of updates) {
      await sql`UPDATE tech_users SET ${sql.unsafe(column)} = ${value} WHERE id = ${id}`;
    }

    // Fetch the updated user
    const updatedUser = await sql`
      SELECT * FROM tech_users WHERE id = ${id}
    ` as any[];

    if (updatedUser.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Parse specializations back to array for response
    const userResponse = {
      ...updatedUser[0],
      specializations: updatedUser[0].specializations ? JSON.parse(updatedUser[0].specializations) : []
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
    
    const sql = getSql();

    const { id } = await params;

    // Delete user (cascade will handle related sessions/data)
    const deletedUser = await sql`
      DELETE FROM tech_users
      WHERE id = ${id}
      RETURNING id
    ` as any[];

    if (deletedUser.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting tech user:', error);
    return NextResponse.json({ error: 'Failed to delete tech user' }, { status: 500 });
  }
}
