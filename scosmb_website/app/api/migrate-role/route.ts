import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    const db = getDb();
    
    // Add role column to existing admin_users table
    await db.execute(sql`
      ALTER TABLE admin_users 
      ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'admin'
    `);
    
    console.log('✅ Role column added to admin_users table');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Role column added successfully' 
    });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { error: 'Migration failed', details: error },
      { status: 500 }
    );
  }
}