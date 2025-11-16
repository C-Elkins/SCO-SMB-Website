import { pgTable, text, uuid, integer, timestamp, varchar, boolean } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const license_keys = pgTable('license_keys', {
  id: uuid('id').primaryKey().defaultRandom(),
  key_code: varchar('key_code', { length: 50 }).notNull().unique(),
  status: varchar('status', { length: 20 }).notNull().default('unused'),
  created_at: timestamp('created_at').defaultNow(),
  created_by: varchar('created_by', { length: 100 }),
  activated_at: timestamp('activated_at'),
  expires_at: timestamp('expires_at'),
  download_count: integer('download_count').default(0),
  max_downloads: integer('max_downloads').default(3),
  notes: text('notes'),
  customer_email: varchar('customer_email', { length: 255 }),
  customer_name: varchar('customer_name', { length: 255 }),
  customer_company: varchar('customer_company', { length: 255 }),
});

export const download_logs = pgTable('download_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  license_key_id: uuid('license_key_id').references(() => license_keys.id, { onDelete: 'cascade' }),
  download_date: timestamp('download_date').defaultNow(),
  platform: varchar('platform', { length: 50 }),
  version: varchar('version', { length: 20 }),
  ip_address: varchar('ip_address', { length: 45 }),
  user_agent: text('user_agent'),
  success: boolean('success').default(true),
});

export const admin_users = pgTable('admin_users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  password_hash: varchar('password_hash', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  role: varchar('role', { length: 20 }).default('admin'),
  created_at: timestamp('created_at').defaultNow(),
  last_login: timestamp('last_login'),
  is_active: boolean('is_active').default(true),
});

export const portal_settings = pgTable('portal_settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  tech_portal_password_hash: varchar('tech_portal_password_hash', { length: 255 }),
  updated_at: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const system_settings = pgTable('system_settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  key: varchar('key', { length: 100 }).notNull().unique(),
  value: text('value').notNull(),
  updated_by: varchar('updated_by', { length: 100 }),
  updated_at: timestamp('updated_at').defaultNow(),
  created_at: timestamp('created_at').defaultNow(),
});
