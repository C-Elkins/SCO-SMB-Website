-- License Keys Table
CREATE TABLE IF NOT EXISTS license_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key_code VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'unused',
  created_at TIMESTAMP DEFAULT NOW(),
  created_by VARCHAR(100),
  activated_at TIMESTAMP NULL,
  expires_at TIMESTAMP NULL,
  download_count INTEGER DEFAULT 0,
  max_downloads INTEGER DEFAULT 3,
  notes TEXT,
  customer_email VARCHAR(255),
  customer_name VARCHAR(255),
  customer_company VARCHAR(255)
);

CREATE INDEX IF NOT EXISTS idx_key_code ON license_keys(key_code);
CREATE INDEX IF NOT EXISTS idx_status ON license_keys(status);

-- Download Logs Table
CREATE TABLE IF NOT EXISTS download_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_key_id INTEGER REFERENCES license_keys(id),
  download_date TIMESTAMP DEFAULT NOW(),
  platform VARCHAR(50),
  version VARCHAR(20),
  ip_address VARCHAR(45),
  user_agent TEXT,
  success BOOLEAN DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_license_key_id ON download_logs(license_key_id);
CREATE INDEX IF NOT EXISTS idx_download_date ON download_logs(download_date);

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  role VARCHAR(50) DEFAULT 'admin'
);

-- Portal Settings Table
CREATE TABLE IF NOT EXISTS portal_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tech_portal_password_hash VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System Settings Table
CREATE TABLE IF NOT EXISTS system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_by UUID REFERENCES admin_users(id),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_settings_key ON system_settings(key);

-- Customers Table
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  point_of_contact VARCHAR(255),
  address TEXT,
  notes TEXT,
  total_spent INTEGER DEFAULT 0,
  monthly_rate INTEGER DEFAULT 0,
  num_computers INTEGER DEFAULT 0,
  num_keys_needed INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  last_activity TIMESTAMP
);

-- Tech Users Table
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
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  total_posts INTEGER DEFAULT 0,
  total_solutions INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_tech_username ON tech_users(username);
CREATE INDEX IF NOT EXISTS idx_tech_email ON tech_users(email);

-- Tech Blog Posts Table
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
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP,
  resolved_by UUID REFERENCES tech_users(id)
);

CREATE INDEX IF NOT EXISTS idx_tech_posts_author ON tech_blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_tech_posts_category ON tech_blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_tech_posts_status ON tech_blog_posts(status);

-- Tech Blog Comments Table
CREATE TABLE IF NOT EXISTS tech_blog_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES tech_blog_posts(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES tech_users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  is_solution BOOLEAN DEFAULT false,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tech_comments_post ON tech_blog_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_tech_comments_author ON tech_blog_comments(author_id);

-- Tech Sessions Table
CREATE TABLE IF NOT EXISTS tech_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES tech_users(id) ON DELETE CASCADE NOT NULL,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tech_sessions_token ON tech_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_tech_sessions_user ON tech_sessions(user_id);

-- Tech Activity Logs Table
CREATE TABLE IF NOT EXISTS tech_activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES tech_users(id) ON DELETE CASCADE,
  action VARCHAR(100) NOT NULL,
  details TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tech_activity_user ON tech_activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_tech_activity_action ON tech_activity_logs(action);
