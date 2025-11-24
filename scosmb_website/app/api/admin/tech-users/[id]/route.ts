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

    // Build update clauses dynamically
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (email !== undefined) {
      updates.push(`email = $${paramIndex++}`);
      values.push(email);
    }
    if (full_name !== undefined) {
      updates.push(`full_name = $${paramIndex++}`);
      values.push(full_name);
    }
    if (company !== undefined) {
      updates.push(`company = $${paramIndex++}`);
      values.push(company);
    }
    if (phone !== undefined) {
      updates.push(`phone = $${paramIndex++}`);
      values.push(phone);
    }
    if (role !== undefined) {
      updates.push(`role = $${paramIndex++}`);
      values.push(role);
    }
    if (specializations !== undefined) {
      updates.push(`specializations = $${paramIndex++}`);
      values.push(JSON.stringify(specializations));
    }
    if (is_active !== undefined) {
      updates.push(`is_active = $${paramIndex++}`);
      values.push(is_active);
    }

    // If password is provided, hash it
    if (password && password.length >= 8) {
      const password_hash = await bcrypt.hash(password, 10);
      updates.push(`password_hash = $${paramIndex++}`);
      values.push(password_hash);
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    // Add ID to values array
    values.push(id);

    // Build and execute query
    const query = `
      UPDATE tech_users 
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const updatedUser = await sql.unsafe(query, values);

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
    `;

    if (deletedUser.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting tech user:', error);
    return NextResponse.json({ error: 'Failed to delete tech user' }, { status: 500 });
  }
}
