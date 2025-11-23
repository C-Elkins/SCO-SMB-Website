import { NextResponse } from 'next/server';
import { getSql } from '@/lib/db';


export async function POST() {
  try {
    const sql = getSql();
    
    // Create test license keys
    const testKeys = [
      {
        key: 'SCO-TEST-1234-ABCD',
        email: 'test1@example.com',
        is_active: true,
        expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year from now
      },
      {
        key: 'SCO-DEMO-5678-EFGH',
        email: 'test2@example.com', 
        is_active: true,
        expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      },
      {
        key: 'SCO-SAMPLE-9999-WXYZ',
        email: 'test3@example.com',
        is_active: false, // Inactive key for testing
        expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      }
    ];

    const insertedKeys = [];
    
    for (const testKey of testKeys) {
      const result = await sql`INSERT INTO license_keys (key_code, customer_email, status, expires_at, created_at) 
         VALUES (${testKey.key}, ${testKey.email}, ${testKey.is_active ? 'active' : 'inactive'}, ${testKey.expires_at}, NOW()) 
         RETURNING *`;
      insertedKeys.push((result as any[])[0]);
    }

    return NextResponse.json({
      success: true,
      message: 'Test license keys created successfully',
      keys: insertedKeys
    });

  } catch (error) {
    console.error('Error creating test keys:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create test keys' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const sql = getSql();
    
    const result = await sql`SELECT * FROM license_keys ORDER BY created_at DESC`;

    return NextResponse.json({
      success: true,
      keys: result
    });

  } catch (error) {
    console.error('Error fetching keys:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch keys' },
      { status: 500 }
    );
  }
}