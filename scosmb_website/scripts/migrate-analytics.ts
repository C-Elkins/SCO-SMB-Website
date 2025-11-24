#!/usr/bin/env node

/**
 * Run analytics database migrations
 * Usage: npm run db:migrate:analytics
 */

import { config } from 'dotenv';
import { getSql } from '../lib/db';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
config({ path: join(__dirname, '../.env.local') });

async function runMigrations() {
  try {
    console.log('🔄 Running analytics migrations...');
    
    const sql = getSql();
    const migrationSQL = readFileSync(join(__dirname, '../lib/migrations-analytics.sql'), 'utf-8');
    
    // Execute the migration
    await sql.unsafe(migrationSQL);
    
    console.log('✅ Analytics migrations completed successfully!');
    console.log('\nTables verified:');
    console.log('  - license_keys (with updated_at, last_used)');
    console.log('  - download_logs (with asset_name)');
    console.log('  - Analytics indexes created');
    console.log('  - analytics_summary view created');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();
