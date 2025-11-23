import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    console.log('=== Neon HTTP Database Connection Debug ===');
    
    const connectionString = process.env.DATABASE_URL;
    console.log('DATABASE_URL exists:', !!connectionString);
    console.log('Connection string length:', connectionString?.length);
    
    if (!connectionString) {
      return NextResponse.json({ error: 'No DATABASE_URL found' }, { status: 500 });
    }
    
    // Parse the URL to check components
    const url = new URL(connectionString);
    console.log('Host:', url.host);
    console.log('Username:', url.username);
    console.log('Database:', url.pathname.substring(1));
    console.log('SSL Mode:', url.searchParams.get('sslmode'));
    
    // Create Neon HTTP client
    console.log('Creating Neon HTTP client...');
    const sql = neon(connectionString);
    
    console.log('Testing connection with simple query...');
    const result = await sql`SELECT version() as version, current_database() as database`;
    
    console.log('Connection successful!');
    
    return NextResponse.json({
      success: true,
      driver: 'neon-http',
      database_info: {
        version: result[0].version,
        database: result[0].database,
        connection_host: url.host,
        ssl_mode: url.searchParams.get('sslmode')
      }
    });
  } catch (error) {
    const err = error as Error;
    console.error('=== Neon HTTP Connection Error ===');
    console.error('Error message:', err.message);
    console.error('Error code:', (err as any).code);
    console.error('Error stack:', err.stack);
    
    return NextResponse.json({ 
      error: 'Connection failed',
      details: err.message,
      code: (err as any).code,
      name: err.name
    }, { status: 500 });
  }
}