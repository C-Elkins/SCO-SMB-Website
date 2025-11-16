import { NextResponse } from 'next/server';
import getPool from '@/lib/db';
import { generateLicenseKey } from '@/lib/generateLicenseKey';

export async function POST() {
  try {
    const pool = getPool();
    const client = await pool.connect();
    
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
      const result = await client.query(
        `INSERT INTO license_keys (key_code, customer_email, status, expires_at, created_at) 
         VALUES ($1, $2, $3, $4, NOW()) 
         RETURNING *`,
        [testKey.key, testKey.email, testKey.is_active ? 'active' : 'inactive', testKey.expires_at]
      );
      insertedKeys.push(result.rows[0]);
    }

    client.release();

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
    const pool = getPool();
    const client = await pool.connect();
    
    const result = await client.query(
      'SELECT * FROM license_keys ORDER BY created_at DESC'
    );

    client.release();

    return NextResponse.json({
      success: true,
      keys: result.rows
    });

  } catch (error) {
    console.error('Error fetching keys:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch keys' },
      { status: 500 }
    );
  }
}