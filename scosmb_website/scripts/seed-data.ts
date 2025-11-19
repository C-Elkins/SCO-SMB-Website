import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as bcrypt from 'bcryptjs';
import * as schema from '../lib/schema';
import * as dotenv from 'dotenv';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

dotenv.config({ path: '.env.local' });

// Setup WebSocket for local
neonConfig.webSocketConstructor = require('ws');

const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const pool = new Pool({ connectionString });
const db = drizzle(pool, { schema });

async function seedDatabase() {
  console.log('Seeding database...');

  try {
    // Create admin users
    const adminPassword = await bcrypt.hash('admin123', 10);
    const techPassword = await bcrypt.hash('tech123', 10);

    const adminUsers = await db.insert(schema.admin_users).values([
      {
        username: 'admin',
        password_hash: adminPassword,
        email: 'admin@scosmb.com',
        role: 'admin',
        is_active: true,
      },
      {
        username: 'tech',
        password_hash: techPassword,
        email: 'tech@scosmb.com',
        role: 'admin',
        is_active: true,
      },
    ]).returning();

    console.log(`Created ${adminUsers.length} admin users`);

    // Create license keys
    const licenseKeys = await db.insert(schema.license_keys).values([
      {
        key_code: 'SCOSMB-TRIAL-001',
        status: 'unused',
        created_by: 'admin',
        max_downloads: 3,
        download_count: 0,
        notes: 'Trial license key',
      },
      {
        key_code: 'SCOSMB-ENT-001',
        status: 'unused',
        created_by: 'admin',
        max_downloads: 10,
        download_count: 0,
        notes: 'Enterprise license key',
      },
      {
        key_code: 'SCOSMB-PRO-001',
        status: 'unused',
        created_by: 'admin',
        max_downloads: 5,
        download_count: 0,
        notes: 'Professional license key',
      },
    ]).returning();

    console.log(`Created ${licenseKeys.length} license keys`);

    // Create system settings
    const systemSettings = await db.insert(schema.system_settings).values([
      {
        key: 'app_version',
        value: '1.0.0',
        updated_by: 'system',
      },
    ]).returning();

    console.log(`Created ${systemSettings.length} system settings`);

    console.log('\nDatabase seeded successfully!');
    console.log('\nDefault credentials:');
    console.log('  Admin: username=admin, password=admin123');
    console.log('  Tech:  username=tech, password=tech123');
    console.log('\nIMPORTANT: Change these passwords immediately!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

seedDatabase()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
