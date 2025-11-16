import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    // Check the structure of license_keys table
    const tableInfo = await query(`
      SELECT column_name, data_type, is_nullable, column_default 
      FROM information_schema.columns 
      WHERE table_name = 'license_keys' 
      ORDER BY ordinal_position
    `);
    
    // Get all license keys
    const keys = await query('SELECT * FROM license_keys LIMIT 10');
    
    return NextResponse.json({ 
      success: true,
      table_structure: tableInfo.rows,
      license_keys: keys.rows
    });
  } catch (error) {
    console.error('Error checking database:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}