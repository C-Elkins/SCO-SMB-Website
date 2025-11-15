import { Pool, neonConfig } from '@neondatabase/serverless';

// For local development with WebSocket
if (typeof WebSocket === 'undefined') {
  const ws = require('ws');
  neonConfig.webSocketConstructor = ws;
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function query(text: string, params?: unknown[]) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('executed query', { text, duration, rows: res.rowCount });
  return res;
}

export interface LicenseKey {
  id: string;
  key: string;
  customer_name?: string;
  customer_email?: string;
  status: 'active' | 'inactive' | 'expired';
  max_downloads: number;
  download_count: number;
  expires_at?: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface DownloadLog {
  id: string;
  license_key_id: string;
  platform: string;
  version: string;
  ip_address?: string;
  downloaded_at: Date;
}

// Initialize database tables
export async function initDatabase() {
  try {
    // Create license_keys table
    await query(`
      CREATE TABLE IF NOT EXISTS license_keys (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        key VARCHAR(19) UNIQUE NOT NULL,
        customer_name VARCHAR(255),
        customer_email VARCHAR(255),
        status VARCHAR(20) DEFAULT 'active',
        max_downloads INTEGER DEFAULT 5,
        download_count INTEGER DEFAULT 0,
        expires_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create download_logs table
    await query(`
      CREATE TABLE IF NOT EXISTS download_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        license_key_id UUID REFERENCES license_keys(id) ON DELETE CASCADE,
        platform VARCHAR(50),
        version VARCHAR(50),
        ip_address VARCHAR(45),
        downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes
    await query(`CREATE INDEX IF NOT EXISTS idx_license_keys_key ON license_keys(key);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_download_logs_license_key_id ON download_logs(license_key_id);`);

    console.log('✅ Database tables initialized');
    return true;
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    return false;
  }
}

export default pool;

