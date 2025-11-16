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
