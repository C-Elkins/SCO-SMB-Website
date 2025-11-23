import { NextResponse } from 'next/server';
import { Pool } from '@neondatabase/serverless';

export async function GET() {
  try {
    console.log('Testing database connection...');
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
    console.log('NEON_DATABASE_URL exists:', !!process.env.NEON_DATABASE_URL);
    
    const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
    console.log('Using connection string:', connectionString?.substring(0, 30) + '...');
    
    if (!connectionString) {
      return NextResponse.json({ error: 'No DATABASE_URL found' }, { status: 500 });
    }

    const pool = new Pool({ connectionString });
    
    // Try a simple query
    const result = await pool.query('SELECT NOW() as current_time');
    
    console.log('Database connection successful');
    
    return NextResponse.json({
      success: true,
      current_time: result.rows[0].current_time,
      connection_info: {
        has_database_url: !!process.env.DATABASE_URL,
        has_neon_url: !!process.env.NEON_DATABASE_URL,
        using_url: connectionString ? 'found' : 'missing'
      }
    });
  } catch (error) {
    console.error('Database connection test failed:', error);
    return NextResponse.json({ 
      error: 'Connection failed',
      details: error.message,
      code: error.code 
    }, { status: 500 });
  }
}