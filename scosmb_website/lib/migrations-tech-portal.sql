-- Tech Portal Database Migrations
-- Run this after deploying the schema changes

-- Tech Users Table
CREATE TABLE IF NOT EXISTS tech_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  phone VARCHAR(50),
  role VARCHAR(20) DEFAULT 'technician',
  avatar_url TEXT,
  bio TEXT,
  specializations TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  total_posts INTEGER DEFAULT 0,
  total_solutions INTEGER DEFAULT 0
);

-- Tech Blog Posts Table
CREATE TABLE IF NOT EXISTS tech_blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES tech_users(id) ON DELETE CASCADE,
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
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP,
  resolved_by UUID REFERENCES tech_users(id)
);

-- Tech Blog Comments Table
CREATE TABLE IF NOT EXISTS tech_blog_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES tech_blog_posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES tech_users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_solution BOOLEAN DEFAULT false,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tech Sessions Table
CREATE TABLE IF NOT EXISTS tech_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES tech_users(id) ON DELETE CASCADE,
  session_token VARCHAR(255) NOT NULL UNIQUE,
  ip_address VARCHAR(45),
  user_agent TEXT,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tech Activity Logs Table
CREATE TABLE IF NOT EXISTS tech_activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES tech_users(id) ON DELETE CASCADE,
  action VARCHAR(100) NOT NULL,
  details TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_tech_blog_posts_author ON tech_blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_tech_blog_posts_category ON tech_blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_tech_blog_posts_status ON tech_blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_tech_blog_posts_created ON tech_blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tech_blog_comments_post ON tech_blog_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_tech_sessions_token ON tech_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_tech_sessions_user ON tech_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_tech_activity_logs_user ON tech_activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_tech_activity_logs_created ON tech_activity_logs(created_at DESC);

-- Insert sample tech user (password: tech123)
-- Note: This is a bcrypt hash of "tech123" - you should change this in production
INSERT INTO tech_users (username, email, password_hash, full_name, company, role, specializations)
VALUES (
  'tech_demo',
  'tech@scosmb.com',
  '$2a$10$rOBYvFQlJfN8YxUqXk5QXOqVxMZV8w3LQGBYqhXZYvKZQxYQx4ZYe',
  'Demo Technician',
  'SCO SMB',
  'technician',
  '["Kyocera", "Sharp", "Network Setup", "FTP/SMB"]'
) ON CONFLICT (username) DO NOTHING;

-- Insert sample blog posts
INSERT INTO tech_blog_posts (author_id, title, content, category, tags, severity, status, affected_versions, related_printers)
SELECT 
  id,
  'Kyocera FTP Port 21 Connection Issues',
  'When configuring Kyocera printers for FTP scanning, port 21 may be blocked by corporate firewalls. Solution: Work with network admin to whitelist port 21, or use SMB protocol as alternative.',
  'fix',
  '["kyocera", "ftp", "firewall", "port-21"]',
  'medium',
  'resolved',
  '["v1.0", "v1.1", "v1.2"]',
  '["Kyocera TASKalfa", "Kyocera ECOSYS"]'
FROM tech_users WHERE username = 'tech_demo' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO tech_blog_posts (author_id, title, content, category, tags, severity, status, affected_versions, related_printers)
SELECT 
  id,
  'Sharp MFP Scan-to-Folder Quick Setup Guide',
  'Quick setup guide for Sharp MFPs:\n1. Create Windows share folder\n2. Set permissions (Everyone - Full Control)\n3. On Sharp: Address Book > New > SMB\n4. Enter \\\\SERVER\\Share format\n5. Test with manual scan\n\nCommon pitfall: Use server hostname, not IP, for better reliability.',
  'guide',
  '["sharp", "smb", "setup", "best-practices"]',
  NULL,
  'open',
  '["all"]',
  '["Sharp MX Series"]'
FROM tech_users WHERE username = 'tech_demo' LIMIT 1
ON CONFLICT DO NOTHING;

-- Insert sample activity log
INSERT INTO tech_activity_logs (user_id, action, details)
SELECT 
  id,
  'tech_portal_first_login',
  '{"message": "Initial tech portal setup completed", "version": "2.0"}'
FROM tech_users WHERE username = 'tech_demo' LIMIT 1
ON CONFLICT DO NOTHING;
