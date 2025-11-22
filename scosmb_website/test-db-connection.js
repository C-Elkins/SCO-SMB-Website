import { Pool } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL;

console.log('Testing database connection...');
console.log('Connection string exists:', !!connectionString);
console.log('Connection string preview:', connectionString ? connectionString.substring(0, 30) + '...' : 'MISSING');

async function testConnection() {
  try {
    const pool = new Pool({ connectionString });
    
    // Test basic query
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully!');
    console.log('Current time from DB:', result.rows[0].now);
    
    // Check for tech_users table
    const tableCheck = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    
    console.log('\n📊 Tables in database:');
    tableCheck.rows.forEach(row => console.log('  -', row.table_name));
    
    // Check tech_users table specifically
    const techUsersCheck = await pool.query(`
      SELECT COUNT(*) as count FROM tech_users;
    `);
    console.log('\n👥 Tech users count:', techUsersCheck.rows[0].count);
    
    // Check admin_users table
    const adminCheck = await pool.query(`
      SELECT COUNT(*) as count FROM admin_users;
    `);
    console.log('👤 Admin users count:', adminCheck.rows[0].count);
    
    await pool.end();
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
  }
}

testConnection();
