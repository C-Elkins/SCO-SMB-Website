import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Lazy initialization to allow env vars to load first
let db: NeonHttpDatabase<typeof schema> | null = null;
let sql: ReturnType<typeof neon> | null = null;

function getSql() {
  if (!sql) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    sql = neon(connectionString);
  }
  return sql;
}

export function getDb() {
  if (!db) {
    db = drizzle(getSql(), { schema });
  }
  return db;
}

// Export getSql for direct access to Neon HTTP client
export { getSql };

export async function query(text: string, params: unknown[] = []) {
  const start = Date.now();
  const sqlClient = getSql();
  
  // Use the new Neon HTTP query method
  const res = await sqlClient.query(text, params);
  const duration = Date.now() - start;
  console.log('executed query', { text, duration, rows: (res as any[]).length });
  return { rows: res, rowCount: (res as any[]).length };
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

    // Create tech portal tables
    await query(`
      CREATE TABLE IF NOT EXISTS tech_users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        phone VARCHAR(50),
        role VARCHAR(20) DEFAULT 'technician',
        avatar_url TEXT,
        bio TEXT,
        specializations TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP,
        total_posts INTEGER DEFAULT 0,
        total_solutions INTEGER DEFAULT 0
      );
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS tech_sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES tech_users(id) ON DELETE CASCADE,
        session_token VARCHAR(255) UNIQUE NOT NULL,
        ip_address VARCHAR(45),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP NOT NULL,
        last_activity TIMESTAMP
      );
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS tech_blog_posts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        author_id UUID REFERENCES tech_users(id) ON DELETE CASCADE NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        category VARCHAR(50) NOT NULL,
        tags TEXT,
        severity VARCHAR(20),
        status VARCHAR(20) DEFAULT 'open',
        affected_versions TEXT,
        related_printers TEXT,
        views INTEGER DEFAULT 0,
        likes INTEGER DEFAULT 0,
        is_pinned BOOLEAN DEFAULT false,
        is_solution BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        resolved_at TIMESTAMP,
        resolved_by UUID REFERENCES tech_users(id)
      );
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS tech_activity_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES tech_users(id) ON DELETE CASCADE,
        action VARCHAR(100) NOT NULL,
        details TEXT,
        ip_address VARCHAR(45),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create tech portal indexes
    await query(`CREATE INDEX IF NOT EXISTS idx_tech_users_username ON tech_users(username);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_tech_users_email ON tech_users(email);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_tech_sessions_token ON tech_sessions(session_token);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_tech_sessions_user_id ON tech_sessions(user_id);`);

    // Create default tech user if none exists
    const techUserCheck = await query(`SELECT COUNT(*) FROM tech_users WHERE username = 'tech_demo'`);
    if (parseInt(techUserCheck.rows[0].count) === 0) {
      const bcrypt = require('bcryptjs');
      const defaultPassword = 'tech123';
      const passwordHash = await bcrypt.hash(defaultPassword, 12);
      
      await query(`
        INSERT INTO tech_users (username, email, password_hash, full_name, role, specializations, is_active)
        VALUES ('tech_demo', 'demo@example.com', $1, 'Demo Technician', 'technician', $2, true)
      `, [passwordHash, JSON.stringify(['printer-setup', 'network-issues'])]);
      
      console.log('✅ Default tech user created: tech_demo/tech123');
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

    console.log('✅ Database tables initialized including tech portal');
    return true;
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    return false;
  }
}

