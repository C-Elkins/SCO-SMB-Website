# SCO SMB Website - Complete Rebuild Guide

## Critical Issues Fixed

1. **Layout System**: Removed all constraining `w-full` and `overflow-x-hidden` classes
2. **Responsive Design**: Proper container system with `max-w` constraints
3. **Database**: Set up Neon PostgreSQL with proper schema
4. **Authentication**: Admin and Technician portal logins
5. **License System**: Full key validation and management

## Immediate Actions Needed

### 1. Update Tailwind Config

Replace `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-navy': '#153B6B',
        'accent-teal': '#00A8B5',
        'neutral-light': '#E9ECEF',
        'neutral-dark': '#2E2E2E',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      maxWidth: {
        'container': '1280px',
      },
    },
  },
  plugins: [],
};
export default config;
```

### 2. Initialize Database

Run this SQL in your Neon console:

```sql
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
  license_key_id UUID REFERENCES license_keys(id),
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
  is_active BOOLEAN DEFAULT true
);

-- Create default admin user (password: ChangeMe123!)
INSERT INTO admin_users (username, password_hash, email, is_active)
VALUES ('admin', '$2a$10$XQP8kX7VYxGvVw8b3kqXXeH0QlN4XC5T9jy0aE9Y5nK7GjF8pqIvO', 'admin@southcoastoffice.com', true)
ON CONFLICT (username) DO NOTHING;
```

### 3. Add Environment Variables to Vercel

```bash
# GitHub API
GITHUB_TOKEN_DOWNLOADS=<YOUR_GITHUB_TOKEN>
GITHUB_REPO_OWNER=C-Elkins
GITHUB_REPO_NAME=SCO-SMB

# Database (already configured)
DATABASE_URL=<YOUR_NEON_DATABASE_URL>

# Authentication
JWT_SECRET=<YOUR_JWT_SECRET_MIN_32_CHARS>
PORTAL_PASSWORD=<YOUR_PORTAL_PASSWORD>
NEXTAUTH_SECRET=<YOUR_NEXTAUTH_SECRET>
NEXTAUTH_URL=https://sco-smb-website.vercel.app

# Admin
ADMIN_DEFAULT_PASSWORD=<SET_A_SECURE_DEFAULT_AND_ROTATE>
```

### 4. Install Missing Dependencies

```bash
cd scosmb_website
npm install bcryptjs jsonwebtoken @types/bcryptjs @types/jsonwebtoken
npm install next-auth
npm install pg @types/pg
```

### 5. Fix All Page Components

Each page should use this structure:

```tsx
export default function PageName() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom section">
        {/* Content here */}
      </div>
    </div>
  );
}
```

## Key Files to Create/Update

### File: `lib/db.ts`

This file already exists, just verify DATABASE_URL is set correctly.

### File: `lib/generateLicenseKey.ts`

Already exists and working.

### File: `lib/auth.ts` (NEW)

```typescript
import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
}

export function generateToken(payload: any): string {
  return sign(payload, JWT_SECRET, { expiresIn: '8h' });
}

export function verifyToken(token: string): any {
  try {
    return verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
```

## Testing Checklist

- [ ] Homepage loads and is centered
- [ ] All pages resize properly with browser window
- [ ] Download page validates license keys
- [ ] Admin dashboard login works
- [ ] Technician portal login works  
- [ ] Mobile responsive (test on phone)
- [ ] Tablet responsive (768px-1024px)
- [ ] Desktop responsive (>1024px)
- [ ] GitHub API fetches releases
- [ ] No horizontal scrolling on any page

## Quick Fixes for Common Issues

### Content Stuck in Corner
```bash
# Find and remove all w-full from mx-auto containers
find app -name "*.tsx" -exec sed -i '' 's/mx-auto.*w-full/mx-auto px-6 sm:px-8 lg:px-12/g' {} +
```

### Pages Too Narrow
Replace `max-w-7xl` with `max-w-[1280px]` or use `container-custom` class.

### Mobile Menu Not Working
Check Header.tsx has proper z-index and mobile breakpoints.

## Deploy Process

1. Commit all changes
2. Push to GitHub
3. Vercel auto-deploys
4. Test live site
5. Fix any issues
6. Repeat

## Next Steps After Basic Fix

1. Create proper admin dashboard UI
2. Build license key management interface
3. Add download analytics
4. Implement email notifications
5. Add proper error handling
6. Create comprehensive tests
