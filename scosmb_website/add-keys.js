import { Pool } from '@neondatabase/serverless';
import { config } from 'dotenv';

config({ path: '.env.local' });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

function generateKeyCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const generateSegment = () => {
    let segment = '';
    for (let i = 0; i < 4; i++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return segment;
  };
  return `SCO-${generateSegment()}-${generateSegment()}-${generateSegment()}`;
}

async function addSampleKeys() {
  console.log('Adding sample license keys in SCO-XXXX-XXXX-XXXX format...');
  
  try {
    const keys = [
      { key_code: generateKeyCode(), max_downloads: 3, notes: 'Trial license key' },
      { key_code: generateKeyCode(), max_downloads: 10, notes: 'Enterprise license key' },
      { key_code: generateKeyCode(), max_downloads: 5, notes: 'Professional license key' }
    ];

    for (const key of keys) {
      await pool.query(`
        INSERT INTO license_keys (key_code, status, created_by, max_downloads, download_count, notes)
        VALUES ($1, 'unused', 'admin', $2, 0, $3)
      `, [key.key_code, key.max_downloads, key.notes]);
      
      console.log(`✅ Added: ${key.key_code} (${key.notes})`);
    }

    console.log('\n🎉 Sample license keys added successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await pool.end();
  }
}

addSampleKeys();