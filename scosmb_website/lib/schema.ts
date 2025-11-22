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

export const customers = pgTable('customers', {
  id: uuid('id').primaryKey().defaultRandom(),
  company: varchar('company', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 50 }),
  point_of_contact: varchar('point_of_contact', { length: 255 }),
  address: text('address'),
  notes: text('notes'),
  total_spent: integer('total_spent').default(0),
  monthly_rate: integer('monthly_rate').default(0),
  num_computers: integer('num_computers').default(0),
  num_keys_needed: integer('num_keys_needed').default(0),
  status: varchar('status', { length: 20 }).default('active'),
  created_at: timestamp('created_at').defaultNow(),
  last_activity: timestamp('last_activity'),
});

// Tech Portal Tables
export const tech_users = pgTable('tech_users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password_hash: varchar('password_hash', { length: 255 }).notNull(),
  full_name: varchar('full_name', { length: 255 }).notNull(),
  company: varchar('company', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  role: varchar('role', { length: 20 }).default('technician'), // technician, senior_tech, manager
  avatar_url: text('avatar_url'),
  bio: text('bio'),
  specializations: text('specializations'), // JSON array of specializations
  is_active: boolean('is_active').default(true),
  created_at: timestamp('created_at').defaultNow(),
  last_login: timestamp('last_login'),
  total_posts: integer('total_posts').default(0),
  total_solutions: integer('total_solutions').default(0),
});

export const tech_blog_posts = pgTable('tech_blog_posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  author_id: uuid('author_id').references(() => tech_users.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  category: varchar('category', { length: 50 }).notNull(), // issue, fix, tip, guide, question
  tags: text('tags'), // JSON array of tags
  severity: varchar('severity', { length: 20 }), // low, medium, high, critical (for issues)
  status: varchar('status', { length: 20 }).default('open'), // open, resolved, closed
  affected_versions: text('affected_versions'), // JSON array
  related_printers: text('related_printers'), // JSON array
  views: integer('views').default(0),
  likes: integer('likes').default(0),
  is_pinned: boolean('is_pinned').default(false),
  is_solution: boolean('is_solution').default(false),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
  resolved_at: timestamp('resolved_at'),
  resolved_by: uuid('resolved_by').references(() => tech_users.id),
});

export const tech_blog_comments = pgTable('tech_blog_comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  post_id: uuid('post_id').references(() => tech_blog_posts.id, { onDelete: 'cascade' }).notNull(),
  author_id: uuid('author_id').references(() => tech_users.id, { onDelete: 'cascade' }).notNull(),
  content: text('content').notNull(),
  is_solution: boolean('is_solution').default(false),
  likes: integer('likes').default(0),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const tech_sessions = pgTable('tech_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').references(() => tech_users.id, { onDelete: 'cascade' }).notNull(),
  session_token: varchar('session_token', { length: 255 }).notNull().unique(),
  ip_address: varchar('ip_address', { length: 45 }),
  user_agent: text('user_agent'),
  expires_at: timestamp('expires_at').notNull(),
  created_at: timestamp('created_at').defaultNow(),
});

export const tech_activity_logs = pgTable('tech_activity_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').references(() => tech_users.id, { onDelete: 'cascade' }),
  action: varchar('action', { length: 100 }).notNull(),
  details: text('details'), // JSON object with action details
  ip_address: varchar('ip_address', { length: 45 }),
  created_at: timestamp('created_at').defaultNow(),
});
