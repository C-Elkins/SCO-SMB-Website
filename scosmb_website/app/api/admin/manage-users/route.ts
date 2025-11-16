import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { admin_users } from '@/lib/schema';
import { getAdminSession } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

// Get all admin users
export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const db = getDb();
    const users = await db.select({
      id: admin_users.id,
      username: admin_users.username,
      email: admin_users.email,
      is_active: admin_users.is_active,
      created_at: admin_users.created_at,
      last_login: admin_users.last_login
    }).from(admin_users);
    
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// Delete admin user
export async function DELETE(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');
    const username = searchParams.get('username');
    
    if (!userId && !username) {
      return NextResponse.json({ error: 'User ID or username required' }, { status: 400 });
    }
    
    const db = getDb();
    
    // Prevent deleting yourself
    if (session.username === username) {
      return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 });
    }
    
    // Delete by ID or username
    const whereClause = userId ? eq(admin_users.id, userId) : eq(admin_users.username, username!);
    const result = await db.delete(admin_users).where(whereClause);
    
    return NextResponse.json({ 
      success: true, 
      message: `User ${username || userId} deleted successfully` 
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}

// Update admin user password
export async function PATCH(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const { userId, username, newPassword, email } = await request.json();
    
    if (!userId && !username) {
      return NextResponse.json({ error: 'User ID or username required' }, { status: 400 });
    }
    
    const db = getDb();
    const whereClause = userId ? eq(admin_users.id, userId) : eq(admin_users.username, username!);
    
    const updateData: any = {};
    
    if (newPassword) {
      updateData.password_hash = await bcrypt.hash(newPassword, 12);
    }
    
    if (email !== undefined) {
      updateData.email = email;
    }
    
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No update data provided' }, { status: 400 });
    }
    
    await db.update(admin_users).set(updateData).where(whereClause);
    
    return NextResponse.json({ 
      success: true, 
      message: `User ${username || userId} updated successfully` 
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}