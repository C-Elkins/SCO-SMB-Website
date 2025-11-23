import { NextResponse } from 'next/server';
import { getSql } from '@/lib/db';

export async function GET() {
  try {
    // Check environment
    const hasDbUrl = !!process.env.DATABASE_URL;
    const dbUrlPreview = process.env.DATABASE_URL?.substring(0, 30) + '...' || 'MISSING';
    
    if (!hasDbUrl) {
      return NextResponse.json({
        status: 'error',
        message: 'DATABASE_URL not configured',
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    // Test database connection
    const sql = getSql();
    const result = await sql`SELECT 
      current_database() as database,
      current_user as user,
      version() as version,
      NOW() as server_time
    `;

    // Test admin_users table
    const adminCheck = await sql`SELECT COUNT(*) as count FROM admin_users WHERE is_active = true`;
    
    return NextResponse.json({
      status: 'healthy',
      database: {
        connected: true,
        database_name: result[0].database,
        user: result[0].user,
        server_time: result[0].server_time,
        active_admins: adminCheck[0].count
      },
      environment: {
        node_env: process.env.NODE_ENV,
        has_database_url: hasDbUrl,
        database_url_preview: dbUrlPreview
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('[Health Check] Error:', error);
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
      error_type: error instanceof Error ? error.constructor.name : 'Unknown',
      stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined,
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
