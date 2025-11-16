import { config } from 'dotenv';
import { Pool } from '@neondatabase/serverless';

config({ path: '.env.local' });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function align() {
  console.log('🔧 Aligning database schema...\n');
  
  try {
    // Add is_active to admin_users if missing
    console.log('Adding is_active to admin_users...');
    await pool.query(`
      ALTER TABLE admin_users 
      ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
    `);
    console.log('✅ admin_users updated');
    
    // Check if license_keys needs restructuring
    const licenseKeysCols = await pool.query(`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name = 'license_keys';
    `);
    
    const colNames = licenseKeysCols.rows.map((r: { column_name: string }) => r.column_name);
    
    if (!colNames.includes('key_code')) {
      console.log('\n⚠️  license_keys uses old schema (key instead of key_code)');
      console.log('Renaming key → key_code and adjusting types...');
      
      await pool.query(`ALTER TABLE license_keys RENAME COLUMN key TO key_code;`);
      await pool.query(`ALTER TABLE license_keys ALTER COLUMN key_code TYPE VARCHAR(50);`);
      console.log('✅ key_code column renamed and resized');
    }
    
    // Add missing columns to license_keys
    const requiredCols = [
      { name: 'created_by', sql: 'VARCHAR(100)' },
      { name: 'activated_at', sql: 'TIMESTAMP NULL' },
      { name: 'notes', sql: 'TEXT' },
      { name: 'customer_name', sql: 'VARCHAR(255)' },
      { name: 'customer_company', sql: 'VARCHAR(255)' }
    ];
    
    for (const col of requiredCols) {
      if (!colNames.includes(col.name)) {
        console.log(`Adding ${col.name} to license_keys...`);
        await pool.query(`ALTER TABLE license_keys ADD COLUMN ${col.name} ${col.sql};`);
      }
    }
    console.log('✅ license_keys columns aligned');
    
    // Align download_logs
    console.log('\nAligning download_logs table...');
    const dlCols = await pool.query(`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name = 'download_logs';
    `);
    const dlColNames = dlCols.rows.map((r: { column_name: string }) => r.column_name);
    
    if (dlColNames.includes('license_key') && !dlColNames.includes('license_key_id')) {
      console.log('Renaming license_key → license_key_id...');
      await pool.query(`ALTER TABLE download_logs RENAME COLUMN license_key TO license_key_id;`);
      // Convert to UUID if needed (assuming it's already UUID or can be cast)
      await pool.query(`ALTER TABLE download_logs ALTER COLUMN license_key_id TYPE UUID USING license_key_id::uuid;`);
    }
    
    if (dlColNames.includes('download_time') && !dlColNames.includes('download_date')) {
      console.log('Renaming download_time → download_date...');
      await pool.query(`ALTER TABLE download_logs RENAME COLUMN download_time TO download_date;`);
    }
    
    // Add missing columns
    if (!dlColNames.includes('version')) {
      await pool.query(`ALTER TABLE download_logs ADD COLUMN version VARCHAR(50);`);
    }
    if (!dlColNames.includes('ip_address')) {
      await pool.query(`ALTER TABLE download_logs ADD COLUMN ip_address VARCHAR(45);`);
    }
    if (!dlColNames.includes('user_agent')) {
      await pool.query(`ALTER TABLE download_logs ADD COLUMN user_agent TEXT;`);
    }
    if (!dlColNames.includes('success')) {
      await pool.query(`ALTER TABLE download_logs ADD COLUMN success BOOLEAN DEFAULT true;`);
    }
    console.log('✅ download_logs aligned');
    
    // Create indexes if missing
    console.log('\nCreating indexes...');
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_key_code ON license_keys(key_code);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_status ON license_keys(status);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_license_key_id ON download_logs(license_key_id);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_download_date ON download_logs(download_date);`);
    console.log('✅ Indexes created');
    
    console.log('\n🎉 Schema alignment complete!');
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

align();
