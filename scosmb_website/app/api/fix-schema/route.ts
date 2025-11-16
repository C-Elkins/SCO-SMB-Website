import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Drop the existing download_logs table
    await query('DROP TABLE IF EXISTS download_logs');
    
    // Recreate with correct schema
    await query(`
      CREATE TABLE download_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        license_key_id INTEGER REFERENCES license_keys(id),
        download_date TIMESTAMP DEFAULT NOW(),
        platform VARCHAR(50),
        version VARCHAR(20),
        ip_address VARCHAR(45),
        user_agent TEXT,
        success BOOLEAN DEFAULT true
      )
    `);
    
    // Recreate indexes
    await query('CREATE INDEX IF NOT EXISTS idx_license_key_id ON download_logs(license_key_id)');
    await query('CREATE INDEX IF NOT EXISTS idx_download_date ON download_logs(download_date)');
    
    return NextResponse.json({ success: true, message: 'Schema fixed successfully' });
  } catch (error) {
    console.error('Schema fix error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fix schema' }, { status: 500 });
  }
}