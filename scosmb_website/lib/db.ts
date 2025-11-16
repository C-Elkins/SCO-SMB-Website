import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/node-postgres';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

// For local development with WebSocket
if (typeof WebSocket === 'undefined') {
  const ws = require('ws');
  neonConfig.webSocketConstructor = ws;
}

// Lazy pool initialization to allow env vars to load first
let pool: Pool | null = null;
let db: NodePgDatabase<typeof schema> | null = null;

function getPool() {
  if (!pool) {
    const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    pool = new Pool({ connectionString });
  }
  return pool;
}

export function getDb() {
  if (!db) {
    db = drizzle(getPool(), { schema });
  }
  return db;
}

export async function query(text: string, params?: unknown[]) {
  const start = Date.now();
  const res = await getPool().query(text, params);
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

export async function initDatabase() {
  try {
    // Create license_keys table
    await query(`
      CREATE TABLE IF NOT EXISTS license_keys (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        key_code VARCHAR(19) UNIQUE NOT NULL,
        status VARCHAR(20) DEFAULT 'unused',
        created_by VARCHAR(255) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        activated_at TIMESTAMP,
        expires_at TIMESTAMP,
        download_count INTEGER DEFAULT 0,
        max_downloads INTEGER DEFAULT 3,
        notes TEXT,
        customer_email VARCHAR(255),
        customer_name VARCHAR(255),
        customer_company VARCHAR(255)
      );
    `);

    // Create download_logs table
    await query(`
      CREATE TABLE IF NOT EXISTS download_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        license_key_id UUID REFERENCES license_keys(id) ON DELETE CASCADE,
        download_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        platform VARCHAR(50),
        version VARCHAR(50),
        ip_address VARCHAR(45),
        user_agent TEXT,
        success BOOLEAN DEFAULT true
      );
    `);

    // Create admin_users table
    await query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP,
        is_active BOOLEAN DEFAULT true
      );
    `);

    // Create portal_settings table
    await query(`
      CREATE TABLE IF NOT EXISTS portal_settings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tech_portal_password_hash VARCHAR(255),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes
    await query(`CREATE INDEX IF NOT EXISTS idx_license_keys_key_code ON license_keys(key_code);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_license_keys_status ON license_keys(status);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_download_logs_license_key_id ON download_logs(license_key_id);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);`);

    // Check if default admin user exists, if not create one
    const adminCheck = await query(`SELECT COUNT(*) FROM admin_users WHERE username = 'admin'`);
    if (parseInt(adminCheck.rows[0].count) === 0) {
      const bcrypt = require('bcryptjs');
      const defaultPassword = 'admin123'; // Change this in production!
      const passwordHash = await bcrypt.hash(defaultPassword, 12);
      
      await query(`
        INSERT INTO admin_users (username, password_hash, email, is_active)
        VALUES ('admin', $1, 'admin@southcoastoffice.com', true)
      `, [passwordHash]);
      
      console.log('✅ Default admin user created: admin/admin123');
    }

    // Set default tech portal password if not exists
    const portalCheck = await query(`SELECT COUNT(*) FROM portal_settings`);
    if (parseInt(portalCheck.rows[0].count) === 0) {
      const bcrypt = require('bcryptjs');
      const techPassword = 'tech2024'; // Default tech portal password
      const techPasswordHash = await bcrypt.hash(techPassword, 12);
      
      await query(`
        INSERT INTO portal_settings (tech_portal_password_hash)
        VALUES ($1)
      `, [techPasswordHash]);
      
      console.log('✅ Default tech portal password set: tech2024');
    }

    console.log('✅ Database tables initialized');
    return true;
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    return false;
  }
}

export default getPool;

