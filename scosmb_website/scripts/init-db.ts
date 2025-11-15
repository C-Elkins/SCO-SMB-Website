import { config } from 'dotenv';
import { query } from '../lib/db';
import fs from 'fs';
import path from 'path';

// Load .env.local or .env file
config({ path: '.env.local' });
config({ path: '.env' });

async function run() {
  console.log('🔧 Starting database migration...');
  console.log('📍 DATABASE_URL:', process.env.DATABASE_URL ? 'Set ✓' : 'Missing ✗');
  
  const filePath = path.join(process.cwd(), 'lib', 'migrations.sql');
  const sql = fs.readFileSync(filePath, 'utf8');
  // Split statements on semicolons that end lines (basic splitter)
  const statements = sql
    .split(/;\s*\n/) // keep last newline
    .map(s => s.trim())
    .filter(s => s.length > 0);

  for (const stmt of statements) {
    try {
      await query(stmt);
      console.log('✅ Executed statement');
    } catch (err) {
      console.error('❌ Error executing statement:', stmt.substring(0, 60) + '...', err);
      process.exit(1);
    }
  }
  console.log('🎉 Migration complete');
  process.exit(0);
}

run().catch(err => {
  console.error('Fatal migration error', err);
  process.exit(1);
});
