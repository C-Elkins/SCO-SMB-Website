# SCO SMB Enterprise Website - Master Prompt

**Project Goal:** Create a $100,000 enterprise-grade marketing and download website for SCO SMB (South Coast Office Scan Manager) with license key management, technician portal, and dynamic GitHub release integration.

---

## 🎯 Project Overview

Build a premium, enterprise-grade website for **SCO SMB** (South Coast Office Scan Manager) - a professional document scanning solution for Kyocera and Sharp network printers. The website should feel like a Fortune 500 product site with smooth animations, modern design, seamless GitHub integration, and a complete license key management system.

**Target Audience:** IT managers, enterprise decision-makers, South Coast Office employees, authorized technicians  
**Tone:** Professional, trustworthy, enterprise-ready, innovative  
**Experience Level:** Premium SaaS product website (think Atlassian, Stripe, Vercel)

**Key Features:**
- 🔐 License key validation system for end-user downloads
- 👨‍💻 Dedicated technician portal with unrestricted access
- 🔑 Admin dashboard for license key generation/management
- 📊 Download analytics and license usage tracking

---

## 📋 Required Pages & Structure

### 1. **Home Page** (`/`)
- Hero section with compelling headline and animated product screenshot
- Value proposition (3 key benefits with icons)
- "Download Now" CTA with platform detection (Mac/Windows)
- Feature showcase (6-8 features with animations on scroll)
- Trusted by section (enterprise logos if available)
- Latest release info dynamically pulled from GitHub
- Call-to-action for free download

### 2. **Features** (`/features`)
- Detailed feature breakdown with animations
- Protocol comparison (FTP vs SMB vs HTTP)
- Security features highlight
- Auto-update system explanation
- Network scanner discovery
- Scan history management
- Screenshots/demo videos

### 3. **Download** (`/download`) 🔐 **REQUIRES LICENSE KEY**
- **License Key Validation Form** (required before download)
  - Input field for license key
  - Real-time validation against database
  - Error messages for invalid/expired/already-used keys
  - Success state reveals download buttons
- **Dynamic GitHub Integration** (fetch latest release from private repo)
- Platform auto-detection (Mac Intel, Mac Silicon, Windows)
- Version number and release date displayed
- Changelog/release notes from GitHub
- System requirements
- Installation instructions with expandable steps
- Previous versions archive (last 3 releases)
- Link to request license key (contact form)
- "Are you a technician?" link to portal

### 4. **Documentation** (`/docs`)
- Getting started guide
- IT admin setup guide
- Printer configuration (Kyocera & Sharp)
- Troubleshooting FAQ (from HelpCenter.jsx)
- Network configuration
- Security best practices
- Video tutorials (placeholder for now)

### 5. **Security** (`/security`)
- Security architecture overview
- Compliance features (from SECURITY.md)
- Enterprise-grade features
- Encryption details
- Audit logging
- Vulnerability reporting process

### 6. **Support** (`/support`)
- Contact form with validation
- FAQ searchable interface (from HelpCenter.jsx)
- Phone, email, website links
- Office hours
- Response time guarantees

### 7. **About** (`/about`)
- Company information (South Coast Office Supply)
- Mission statement
- Team (optional)
- Location with embedded Google Map
- Office hours

### 8. **Contact** (`/contact`)
- Contact form (email, phone, subject, message)
- Office location card
- Interactive Google Map
- Business hours
- Social media links (if available)
- License key request option

### 9. **Technician Portal** (`/portal`) 👨‍💻 **NO LICENSE KEY REQUIRED**
- **Password-protected access** (single shared password for all technicians)
- Clean, minimal design focused on function
- Unrestricted download section:
  - Latest release downloads (all platforms)
  - Previous versions archive (last 10 releases)
  - Beta/development builds (if available)
  - No license key validation
- Documentation hub:
  - Complete technical documentation
  - Printer configuration guides
  - Network setup instructions
  - Troubleshooting flowcharts
  - PDF downloads of all guides
- Quick links:
  - GitHub repository (for authorized techs)
  - Admin dashboard
  - Main customer site
- Technician resources:
  - Installation best practices
  - Common issues database
  - Customer setup checklist
  - Support scripts/tools

### 10. **Admin Dashboard** (`/admin`) 🔑 **PROTECTED**
- **Secure login** (admin-only authentication)
- **License Key Management:**
  - Generate new license keys (single or batch)
  - View all license keys (table with search/filter)
  - Key status (unused, active, expired, revoked)
  - Revoke/expire keys manually
  - Set expiration dates (optional)
  - Export key list (CSV/Excel)
- **Download Analytics:**
  - Total downloads (by platform, by version)
  - Downloads per license key
  - Geographic distribution (if IP tracking enabled)
  - Download trends (chart)
  - Most popular version
- **License Key Settings:**
  - Key format customization (e.g., `SCO-XXXX-XXXX-XXXX`)
  - Expiration policy (days until expiration)
  - Single-use vs multi-use keys toggle
  - Maximum downloads per key
- **User Management:**
  - Admin user accounts (if multi-admin)
  - Activity log (who generated keys, when)
  - Password changes
- **System Settings:**
  - GitHub API token management
  - Email notification settings
  - Portal password management
  - Backup/restore license database

---

## 🎨 Design Requirements

### Brand Identity

**Colors:**
- Primary Navy Blue: `#153B6B` - Headers, primary buttons, accent elements
- Accent Teal: `#00A8B5` - Highlights, icons, hover states, interactive elements
- Neutral Light: `#E9ECEF` - Backgrounds, inactive states, subtle containers
- Neutral Dark: `#2E2E2E` - Body text, high-contrast elements
- White: `#FFFFFF` - Primary background
- Success Green: `#28a745` - Download buttons, success states
- Warning Orange: `#fd7e14` - Important notices
- Danger Red: `#dc3545` - Errors, critical alerts

**Typography:**
- **Primary Font:** Inter (Google Fonts)
- **Fallback:** -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu
- **Font Weights:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Headings:** 700 weight, tight letter-spacing
- **Body:** 400 weight, 1.6 line-height

**Design Principles:**
- ✅ Flat, modern design (NO gradients unless subtle)
- ✅ Clean, professional, enterprise-ready aesthetic
- ✅ Consistent 8px grid system for spacing
- ✅ Generous whitespace
- ✅ Card-based layouts with subtle shadows
- ✅ Rounded corners (8-12px border-radius)
- ✅ Professional icons (use Lucide React or Heroicons)

### Header Design

**Requirements:**
- Fixed/sticky header on scroll with smooth transition
- Logo on left (SVG format)
- Navigation menu on right (Home, Features, Download, Docs, Support, Contact)
- Mobile hamburger menu with smooth slide-in animation
- Subtle shadow on scroll
- Height: 70px desktop, 60px mobile
- Background: White with 0.95 opacity when scrolled
- Active page indicator (underline or highlight)

**Example Structure:**
```
[Logo: SCO SMB]                    [Home] [Features] [Download] [Docs] [Support] [Contact]
```

### Footer Design

**Requirements:**
- 4-column layout on desktop, stacked on mobile
- Company info, quick links, resources, contact
- Social media icons (if available)
- Copyright notice
- Privacy policy & Terms of Service links (placeholders)
- Newsletter signup (optional)
- Background: `#2E2E2E` (dark)
- Text: `#E9ECEF` (light)
- Links with hover effect (teal accent)

**Example Structure:**
```
[SCO SMB Logo]          [Quick Links]           [Resources]         [Contact]
About SCO SMB            Home                    Documentation       Email: support@...
Enterprise scanning      Features                GitHub Repo         Phone: (541) 267-5114
for modern offices       Download                Security            Address: 199 N Broadway
                         Support                 Release Notes                Coos Bay, OR

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
© 2025 South Coast Office Supply. All rights reserved. | Privacy Policy | Terms of Service
```

---

## ✨ Animation & Interaction Requirements

### Smooth Scrolling
- Implement `scroll-behavior: smooth` globally
- Offset for fixed header when using anchor links
- Smooth scroll to top button (appears after scrolling 500px)

### Lazy Loading
- Images lazy load with blur-up placeholder
- Intersection Observer API for scroll animations
- Code-split routes with React.lazy() or Next.js dynamic imports

### Animations (Use Framer Motion or CSS transitions)

**On Page Load:**
- Hero section: Fade in + slide up (stagger children)
- Header: Slide down from top
- CTA buttons: Scale in with bounce

**On Scroll (Intersection Observer):**
- Feature cards: Fade in + slide up when 50% visible
- Statistics counters: Animate numbers counting up
- Screenshots: Parallax effect (subtle)
- Section titles: Fade in from left

**Hover States:**
- Buttons: Scale 1.05, shadow increase, background darken
- Cards: Lift (translateY -4px), shadow increase
- Links: Color transition to teal, underline animation
- Images: Slight zoom (scale 1.03)

**Micro-interactions:**
- Download button: Success checkmark animation after click
- Form inputs: Border glow on focus
- Menu items: Smooth color transition
- Scroll progress bar at top of page

**Performance:**
- Use `will-change` sparingly
- Hardware-accelerated transforms (translate3d, scale)
- Debounce scroll events
- Request Animation Frame for smooth 60fps

---

## 🔐 License Key System Implementation

### Overview

The license key system controls access to downloads for end users while allowing unrestricted access for technicians. This prevents unauthorized distribution while maintaining ease of use for authorized personnel.

### Database Schema

**License Keys Table:**
```sql
CREATE TABLE license_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key_code VARCHAR(50) UNIQUE NOT NULL,  -- e.g., "SCO-A1B2-C3D4-E5F6"
  status VARCHAR(20) NOT NULL,            -- 'unused', 'active', 'expired', 'revoked'
  created_at TIMESTAMP DEFAULT NOW(),
  created_by VARCHAR(100),                -- Admin who generated it
  activated_at TIMESTAMP NULL,            -- When first used
  expires_at TIMESTAMP NULL,              -- Optional expiration
  download_count INTEGER DEFAULT 0,
  max_downloads INTEGER DEFAULT 3,        -- How many times can be used
  notes TEXT,                             -- Internal notes
  customer_email VARCHAR(255),            -- Optional: who it was issued to
  customer_name VARCHAR(255),
  customer_company VARCHAR(255)
);

CREATE INDEX idx_key_code ON license_keys(key_code);
CREATE INDEX idx_status ON license_keys(status);
```

**Download Logs Table:**
```sql
CREATE TABLE download_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_key_id UUID REFERENCES license_keys(id),
  download_date TIMESTAMP DEFAULT NOW(),
  platform VARCHAR(50),                   -- 'mac-intel', 'mac-silicon', 'windows'
  version VARCHAR(20),                    -- '1.1.1'
  ip_address VARCHAR(45),                 -- IPv4 or IPv6
  user_agent TEXT,
  success BOOLEAN DEFAULT true
);

CREATE INDEX idx_license_key_id ON download_logs(license_key_id);
CREATE INDEX idx_download_date ON download_logs(download_date);
```

**Admin Users Table:**
```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,   -- bcrypt hashed
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);
```

### License Key Generation

**Format:** `SCO-XXXX-XXXX-XXXX` (customizable)

**Generation Algorithm:**
```javascript
// utils/generateLicenseKey.js
import crypto from 'crypto';

export function generateLicenseKey() {
  const segments = 3; // Number of segments after "SCO-"
  const segmentLength = 4; // Characters per segment
  
  let key = 'SCO';
  
  for (let i = 0; i < segments; i++) {
    const randomBytes = crypto.randomBytes(2);
    const segment = randomBytes.toString('hex').toUpperCase().slice(0, segmentLength);
    key += `-${segment}`;
  }
  
  return key; // Returns: SCO-A1B2-C3D4-E5F6
}

export function generateBulkKeys(count) {
  const keys = new Set();
  
  while (keys.size < count) {
    keys.add(generateLicenseKey());
  }
  
  return Array.from(keys);
}
```

### License Key Validation Flow

**User Flow:**
1. User visits `/download` page
2. Sees license key input form with instructions
3. Enters license key (e.g., `SCO-A1B2-C3D4-E5F6`)
4. Frontend sends key to API: `POST /api/validate-license`
5. API validates key against database:
   - Check if key exists
   - Check if status is 'unused' or 'active'
   - Check if not expired
   - Check if download limit not exceeded
6. If valid:
   - Update key status to 'active' (if first use)
   - Increment download_count
   - Log download attempt
   - Return success + download links
7. If invalid:
   - Return specific error message
   - Log failed attempt

**API Endpoint:**
```javascript
// app/api/validate-license/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  const { licenseKey, platform } = await request.json();
  
  // Validate format
  if (!/^SCO-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(licenseKey)) {
    return NextResponse.json({ 
      valid: false, 
      error: 'Invalid license key format' 
    }, { status: 400 });
  }
  
  // Check database
  const result = await query(
    'SELECT * FROM license_keys WHERE key_code = $1',
    [licenseKey]
  );
  
  if (result.rows.length === 0) {
    return NextResponse.json({ 
      valid: false, 
      error: 'License key not found' 
    }, { status: 404 });
  }
  
  const key = result.rows[0];
  
  // Check status
  if (key.status === 'revoked') {
    return NextResponse.json({ 
      valid: false, 
      error: 'This license key has been revoked' 
    }, { status: 403 });
  }
  
  if (key.status === 'expired') {
    return NextResponse.json({ 
      valid: false, 
      error: 'This license key has expired' 
    }, { status: 403 });
  }
  
  // Check expiration date
  if (key.expires_at && new Date(key.expires_at) < new Date()) {
    await query(
      'UPDATE license_keys SET status = $1 WHERE id = $2',
      ['expired', key.id]
    );
    return NextResponse.json({ 
      valid: false, 
      error: 'This license key has expired' 
    }, { status: 403 });
  }
  
  // Check download limit
  if (key.download_count >= key.max_downloads) {
    return NextResponse.json({ 
      valid: false, 
      error: `Download limit reached (${key.max_downloads} max)` 
    }, { status: 403 });
  }
  
  // Valid! Update database
  if (key.status === 'unused') {
    await query(
      'UPDATE license_keys SET status = $1, activated_at = NOW() WHERE id = $2',
      ['active', key.id]
    );
  }
  
  await query(
    'UPDATE license_keys SET download_count = download_count + 1 WHERE id = $1',
    [key.id]
  );
  
  // Log download
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip');
  const userAgent = request.headers.get('user-agent');
  
  await query(
    `INSERT INTO download_logs (license_key_id, platform, ip_address, user_agent) 
     VALUES ($1, $2, $3, $4)`,
    [key.id, platform, ip, userAgent]
  );
  
  return NextResponse.json({ 
    valid: true,
    message: 'License key validated successfully',
    downloadsRemaining: key.max_downloads - key.download_count - 1
  });
}
```

### Technician Portal Authentication

**Simple password-based access** (no user accounts needed for techs):

```javascript
// app/api/portal/auth/route.ts
export async function POST(request: NextRequest) {
  const { password } = await request.json();
  
  // Check against environment variable
  if (password === process.env.PORTAL_PASSWORD) {
    // Set secure cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set('portal_auth', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return response;
  }
  
  return NextResponse.json({ 
    success: false, 
    error: 'Invalid password' 
  }, { status: 401 });
}
```

### Admin Dashboard Authentication

**Secure login with JWT:**

```javascript
// app/api/admin/login/route.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  
  const result = await query(
    'SELECT * FROM admin_users WHERE username = $1 AND is_active = true',
    [username]
  );
  
  if (result.rows.length === 0) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  
  const user = result.rows[0];
  const validPassword = await bcrypt.compare(password, user.password_hash);
  
  if (!validPassword) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  
  // Update last login
  await query('UPDATE admin_users SET last_login = NOW() WHERE id = $1', [user.id]);
  
  // Generate JWT
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET!,
    { expiresIn: '8h' }
  );
  
  const response = NextResponse.json({ success: true, username: user.username });
  response.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 8, // 8 hours
  });
  
  return response;
}
```

### Download Page UI/UX

**Before License Key Entry:**
```jsx
<div className="license-key-form">
  <h2>Enter Your License Key</h2>
  <p>You need a valid license key to download SCO SMB. Don't have one? <a href="/contact?subject=license">Request a key</a></p>
  
  <input
    type="text"
    placeholder="SCO-XXXX-XXXX-XXXX"
    value={licenseKey}
    onChange={(e) => setLicenseKey(e.target.value.toUpperCase())}
    maxLength={19}
  />
  
  <button onClick={validateKey}>Validate Key</button>
  
  <p className="technician-link">
    Are you a technician? <a href="/portal">Access the Technician Portal</a>
  </p>
</div>
```

**After Successful Validation:**
```jsx
<div className="download-success">
  <div className="success-message">
    ✅ License key validated! You have {downloadsRemaining} downloads remaining.
  </div>
  
  <div className="download-buttons">
    <h3>Choose Your Platform:</h3>
    
    {/* Mac Silicon */}
    <a href={macSiliconUrl} className="download-btn">
      🍎 Download for Mac (Apple Silicon)
      <span className="file-info">PKG Installer • 135MB</span>
    </a>
    
    {/* Mac Intel */}
    <a href={macIntelUrl} className="download-btn">
      🍎 Download for Mac (Intel)
      <span className="file-info">PKG Installer • 140MB</span>
    </a>
    
    {/* Windows */}
    <a href={windowsUrl} className="download-btn">
      🪟 Download for Windows
      <span className="file-info">EXE Installer • 99MB</span>
    </a>
  </div>
</div>
```

### Admin Dashboard Features

**License Key Generation UI:**
```jsx
<div className="generate-keys">
  <h3>Generate License Keys</h3>
  
  <label>
    Number of Keys:
    <input type="number" min="1" max="100" value={keyCount} />
  </label>
  
  <label>
    Max Downloads per Key:
    <input type="number" min="1" max="10" value={maxDownloads} />
  </label>
  
  <label>
    Expiration (Optional):
    <input type="date" value={expirationDate} />
  </label>
  
  <label>
    Customer Info (Optional):
    <input type="text" placeholder="Customer Name" />
    <input type="email" placeholder="Customer Email" />
    <input type="text" placeholder="Company Name" />
  </label>
  
  <button onClick={generateKeys}>Generate {keyCount} Key(s)</button>
  
  {/* Display generated keys */}
  <div className="generated-keys">
    {keys.map(key => (
      <div key={key} className="key-item">
        <code>{key}</code>
        <button onClick={() => copyToClipboard(key)}>Copy</button>
      </div>
    ))}
  </div>
</div>
```

**License Key Management Table:**
```jsx
<table className="keys-table">
  <thead>
    <tr>
      <th>License Key</th>
      <th>Status</th>
      <th>Created</th>
      <th>Downloads</th>
      <th>Customer</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {licenseKeys.map(key => (
      <tr key={key.id}>
        <td><code>{key.key_code}</code></td>
        <td><span className={`status ${key.status}`}>{key.status}</span></td>
        <td>{formatDate(key.created_at)}</td>
        <td>{key.download_count} / {key.max_downloads}</td>
        <td>{key.customer_name || 'N/A'}</td>
        <td>
          <button onClick={() => viewDetails(key.id)}>View</button>
          <button onClick={() => revokeKey(key.id)}>Revoke</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
```

---

## 🔌 GitHub API Integration

### Requirements

**Fetch Latest Release from Private GitHub Repo:**
- Repository: `C-Elkins/SCO-SMB` (private)
- Use GitHub REST API with Personal Access Token (classic)
- Endpoint: `https://api.github.com/repos/C-Elkins/SCO-SMB/releases/latest`
- Authentication: Bearer token (stored in environment variable)

**Data to Display:**
- Version number (e.g., "v1.1.1")
- Release date (formatted: "November 14, 2025")
- Release notes/changelog (Markdown to HTML)
- Download links for all assets:
  - Mac Intel PKG & DMG
  - Mac Silicon PKG & DMG
  - Windows EXE
- File sizes
- Download counts (if available)

**Implementation:**
```javascript
// Example API call (use environment variable for token)
const response = await fetch('https://api.github.com/repos/C-Elkins/SCO-SMB/releases/latest', {
  headers: {
    'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json'
  }
});

const release = await response.json();

// Expected assets:
// - SCO SMB-{version}-arm64.pkg (Mac Silicon PKG)
// - SCO SMB-{version}-arm64.dmg (Mac Silicon DMG)
// - SCO SMB-{version}-x64.pkg (Mac Intel PKG)
// - SCO SMB-{version}-x64.dmg (Mac Intel DMG)
// - SCO SMB-Setup-{version}.exe (Windows)
```

**Platform Auto-Detection:**
```javascript
function detectPlatform() {
  const userAgent = navigator.userAgent.toLowerCase();
  const platform = navigator.platform.toLowerCase();
  
  if (platform.includes('mac')) {
    // Detect Apple Silicon vs Intel (approximate)
    // Note: Can't detect perfectly from browser, so offer both
    return 'mac'; // Show both Mac options
  } else if (platform.includes('win')) {
    return 'windows';
  }
  return 'unknown';
}
```

**Caching Strategy:**
- Cache GitHub API response for 5 minutes (reduce API calls)
- Use SWR (stale-while-revalidate) pattern
- Display cached version while fetching fresh data
- Handle API rate limits gracefully (fallback to manual links)

---

## 📦 Tech Stack Recommendations

### Option 1: Next.js (Recommended for this project)
**Why:** SSR/SSG, API routes for GitHub proxy, image optimization, built-in routing

**Stack:**
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + CSS Modules (for complex components)
- **Animations:** Framer Motion
- **Icons:** Lucide React or Heroicons
- **Forms:** React Hook Form + Zod validation
- **Markdown:** react-markdown (for release notes)
- **Deployment:** Vercel (easiest) or Netlify

**Folder Structure:**
```
sco-smb-website/
├── app/
│   ├── page.tsx                 # Home
│   ├── features/page.tsx
│   ├── download/page.tsx
│   ├── docs/page.tsx
│   ├── security/page.tsx
│   ├── support/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── layout.tsx               # Root layout (header/footer)
│   └── api/
│       └── releases/route.ts    # GitHub API proxy
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── FeatureCard.tsx
│   ├── DownloadButton.tsx
│   ├── FAQAccordion.tsx
│   └── ContactForm.tsx
├── lib/
│   ├── github.ts                # GitHub API functions
│   └── utils.ts
├── public/
│   ├── logos/                   # Move SCO-Logos here
│   ├── screenshots/
│   └── icons/
└── .env.local                   # GITHUB_TOKEN
```

### Option 2: React + Vite (Alternative)
**Why:** Simpler, faster build times, more control

**Stack:**
- **Framework:** React 18 + Vite 5
- **Routing:** React Router 6
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Deployment:** Netlify or Cloudflare Pages

---

## 📂 Assets to Prepare & Move

### From `SCO-Logos/` Directory

**Current Status:** Logo folders (banners, icons, wordmarks) are EMPTY  
**Action Required:** You need to create/add logos before starting the website

**Required Assets:**

1. **Primary Logo (SVG preferred)**
   - `Logo-1.svg` ✅ (exists - use this)
   - For header, footer, social sharing
   - Transparent background
   - Sizes: SVG (scalable) + PNG fallback (512x512)

2. **Logo Variants Needed:**
   - Light version (for dark backgrounds)
   - Dark version (for light backgrounds) ✅ (`dark-logo.png` exists)
   - Favicon (16x16, 32x32, 48x48, ICO format)
   - Social sharing image (1200x630 for Open Graph)

3. **Icons to Move:**
   - ✅ `Dashboard-icon.svg`
   - ✅ `Desktop-icon.png`
   - ✅ `folder-icon.svg`
   - ✅ `settings-icon.svg`
   - Convert these to React components or use as static assets

4. **Screenshots Needed (Create These):**
   - Dashboard screenshot (1920x1080)
   - Settings page screenshot
   - Scan history screenshot
   - Printer configuration screenshot
   - Take these from the running app!

5. **Banner/Hero Images:**
   - Create a hero banner showing the app in action (1920x800)
   - Or use product mockup on a gradient background
   - Feature showcase images (800x600 each)

**Move these files to website project:**

✅ **ALREADY MOVED** to `/Users/chaseelkins/Documents/SCOSMB-Website/assets/`:

```bash
SCOSMB-Website/assets/
├── logos/
│   ├── sco-smb-logo-primary.svg      # ✅ Main logo (from Logo-1.svg)
│   ├── sco-smb-logo-dark.png         # ✅ Dark version (from dark-logo.png)
│   ├── sco-smb-logo-light.svg        # TODO: Create white version for dark backgrounds
│   ├── favicon.ico                   # TODO: Create from Logo-1.svg
│   └── og-image.png                  # TODO: Create 1200x630 social sharing image
│
└── screenshots/                      # Save your 8 screenshots here with these exact names:
    ├── sco-smb-hero-dashboard.png        # Dashboard with gradient hero section
    ├── sco-smb-dashboard-detail.png      # Dashboard with cards/stats
    ├── sco-smb-security-settings.png     # Security settings page
    ├── sco-smb-scan-history.png          # Scan history with thumbnails
    ├── sco-smb-ftp-server.png            # FTP server configuration
    ├── sco-smb-general-settings.png      # General settings page
    ├── sco-smb-splash-screen.png         # App splash screen with loading
    └── sco-smb-logo-illustration.png     # Logo with businessman illustration
```

**See:** `SCOSMB-Website/assets/screenshot-naming-guide.md` for details

---

## 📝 Content to Extract from Project Files

### From `README.md`
- App description and value proposition
- Key features list
- System requirements
- Installation instructions
- Platform download links (template)
- Troubleshooting section

### From `docs/SECURITY.md`
- Security features overview
- Threat model
- Security controls matrix
- Compliance standards (GDPR, HIPAA, ISO 27001, SOC 2)
- Encryption details
- Audit logging capabilities

### From `CHANGELOG-v1.1.1.md`
- What's new section
- Recent features
- Version history
- Technical improvements

### From `app/renderer/src/components/HelpCenter.jsx`
- Complete FAQ content (already extracted)
- Troubleshooting guides
- Contact information
- Support resources

### Company Information (for Contact/About pages)
```
Company: South Coast Office Supply
Address: 199 N Broadway, Coos Bay, OR 97420
Phone: (541) 267-5114
Email: Support@southcoastoffice.com
Website: https://southcoastoffice.com
Hours: Mon-Fri, 8 AM - 4 PM PST
Google Maps: https://www.google.com/maps/search/?api=1&query=199+N+Broadway+Coos+Bay+OR+97420
```

---

## 🔒 Environment Variables Needed

Create `.env.local`:

```bash
# GitHub API (for fetching releases)
GITHUB_TOKEN=ghp_your_personal_access_token_here
GITHUB_REPO_OWNER=C-Elkins
GITHUB_REPO_NAME=SCO-SMB

# Database (PostgreSQL recommended, or MySQL/SQLite for dev)
DATABASE_URL=postgresql://user:password@localhost:5432/scosmb_website
# Alternative for development:
# DATABASE_URL=sqlite://./dev.db

# License Key System
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars
PORTAL_PASSWORD=TechPortal2025!  # Shared password for technician portal

# Contact Form (email service)
SENDGRID_API_KEY=your_sendgrid_key  # Or use Resend, Postmark
CONTACT_EMAIL=support@southcoastoffice.com
FROM_EMAIL=noreply@scosmb.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Google Analytics

# Admin Default Account (for first-time setup)
ADMIN_DEFAULT_USERNAME=admin
ADMIN_DEFAULT_PASSWORD=ChangeMe123!  # Change immediately after first login

# App Settings
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://scosmb.com
```

**Database Setup:**

```bash
# Using PostgreSQL (recommended for production)
# Install: brew install postgresql (Mac) or apt-get install postgresql (Linux)

# Create database
createdb scosmb_website

# Run migrations (see database/migrations/ folder in project)
npm run db:migrate

# For development, SQLite works fine:
DATABASE_URL=sqlite://./dev.db
```

**GitHub Token Setup:**

1. Go to: <https://github.com/settings/tokens>
2. Generate new token (classic)
3. Select scopes: `repo` (full access to private repos)
4. Copy token and add to `.env.local`
5. Never commit this file (add to `.gitignore`)

---

## 📱 Responsive Design Breakpoints

```css
/* Mobile First Approach */
/* Mobile: 320px - 767px (default, no media query) */

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1440px) { }

/* Ultra-wide */
@media (min-width: 1920px) { }
```

**Key Responsive Considerations:**
- Hamburger menu on mobile (<768px)
- Stacked cards/features on mobile
- 2-column layout on tablet
- 3-4 column layout on desktop
- Hero text size scales (clamp() function)
- Touch-friendly tap targets (44px minimum on mobile)

---

## ⚡ Performance Targets

**Lighthouse Scores:**
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

**Core Web Vitals:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Optimization Strategies:**
- Image optimization (WebP format, lazy loading)
- Code splitting (dynamic imports)
- Font loading optimization (font-display: swap)
- Minimize JavaScript bundle size
- Server-side rendering (Next.js)
- CDN for static assets

---

## 🧪 SEO Requirements

### Meta Tags (Every Page)
```html
<title>SCO SMB - Enterprise Scanning Solution | South Coast Office</title>
<meta name="description" content="Professional document scanning for Kyocera & Sharp printers. Receive scans directly to your computer with automatic organization, security, and enterprise features." />
<meta name="keywords" content="document scanning, Kyocera scanner, Sharp MFP, FTP server, SMB scanning, enterprise scanning, network scanner" />

<!-- Open Graph (Social Sharing) -->
<meta property="og:title" content="SCO SMB - Enterprise Scanning Solution" />
<meta property="og:description" content="Professional document scanning for network printers" />
<meta property="og:image" content="/logos/og-image.png" />
<meta property="og:url" content="https://scosmb.com" />
<meta property="og:type" content="website" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="SCO SMB - Enterprise Scanning" />
<meta name="twitter:description" content="Professional scanning solution" />
<meta name="twitter:image" content="/logos/og-image.png" />

<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="/logos/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/logos/apple-touch-icon.png" />
```

### Structured Data (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SCO SMB",
  "operatingSystem": "macOS 10.13+, Windows 10+",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "127"
  }
}
```

---

## 📋 Feature Showcase Content

**6-8 Key Features to Highlight:**

1. **📡 Network Scanner Discovery**
   - Automatically find Kyocera & Sharp printers
   - Real connection testing with ping & port scan
   - No manual IP configuration needed

2. **🔐 Enterprise Security**
   - IP whitelisting & rate limiting
   - File validation & quarantine system
   - Audit logging with tamper-evident logs
   - EXIF metadata stripping

3. **📁 Automatic Organization**
   - Files sorted by date (YYYY/MM/)
   - Custom naming patterns
   - Scan history with thumbnails
   - Quick search & filter

4. **🔄 Auto-Update System**
   - Secure updates via GitHub Releases
   - SHA512 checksum verification
   - User control over installation
   - Background downloads

5. **🌐 Multi-Protocol Support**
   - FTP server (zero-config)
   - SMB folder watching
   - HTTP POST uploads
   - Choose best protocol for your printers

6. **📊 Scan History**
   - Visual thumbnail grid
   - Search & filter scans
   - Open, rename, delete from app
   - Track all received documents

7. **🖥️ Cross-Platform**
   - macOS (Intel & Apple Silicon)
   - Windows 10/11
   - Professional PKG & NSIS installers
   - Consistent experience

8. **⚡ Production Ready**
   - Electron 28 + React 18
   - Winston logging with rotation
   - Prisma database ORM
   - Built for enterprise use

---

## 🎬 Hero Section Examples

### Option 1: Product-Focused
```
Headline: Enterprise Scanning Made Simple
Subheadline: Receive scans from Kyocera & Sharp printers directly to your computer. No walking to the printer. Just press scan and go.

CTA: Download for Mac | Download for Windows
Secondary CTA: View Documentation →

[Hero Image: Dashboard screenshot with subtle parallax]
```

### Option 2: Benefit-Focused
```
Headline: Stop Walking to the Printer
Subheadline: SCO SMB receives scans directly to your computer with automatic organization, security, and zero-config setup for Kyocera printers.

CTA: Get Started Free
Secondary CTA: See Features →

[Hero Image: Split screen - printer + computer receiving scan]
```

### Option 3: Enterprise-Focused
```
Headline: Professional Scanning Infrastructure for Modern Offices
Subheadline: Enterprise-grade document management with FTP, SMB, and HTTP support. Secure, auditable, and ready for your IT requirements.

CTA: Download v1.1.1
Secondary CTA: Read Security Docs →

[Hero Image: Network diagram showing printer → app flow]
```

---

## 📧 Contact Form Implementation

**Fields:**
- Name (required, text)
- Email (required, email validation)
- Company (optional, text)
- Subject (required, dropdown: General Inquiry, Technical Support, Sales, Partnership)
- Message (required, textarea, 500 char max)
- Checkbox: "I agree to the privacy policy"

**Validation:**
- Client-side: React Hook Form + Zod
- Server-side: Validate again in API route
- reCAPTCHA v3 (optional, prevent spam)

**Submission:**
- Send via SendGrid/Resend/Postmark API
- Show success message
- Clear form after submission
- Email notification to support@southcoastoffice.com

---

## 🚀 Deployment Checklist

### Pre-Launch
- [ ] All images optimized (WebP, lazy loading)
- [ ] GitHub API working with token
- [ ] Download links tested (all platforms)
- [ ] Contact form sending emails
- [ ] SEO meta tags on all pages
- [ ] Favicon and social sharing images
- [ ] SSL certificate configured
- [ ] Custom domain setup
- [ ] Analytics installed (GA4)
- [ ] Performance: Lighthouse 95+ scores
- [ ] Mobile responsive on all pages
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)

### Post-Launch
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor GitHub API rate limits
- [ ] Set up uptime monitoring
- [ ] Track download metrics
- [ ] Collect user feedback
- [ ] A/B test CTAs

---

## 🎯 Success Metrics

**Track These KPIs:**
- Downloads per month (Mac vs Windows)
- Bounce rate (target: <40%)
- Average session duration (target: >2 minutes)
- Conversion rate (visitor → download) (target: >15%)
- Contact form submissions
- Documentation page views
- Mobile vs desktop traffic

---

## 🎨 Design Inspiration

**Reference these enterprise SaaS websites:**
- Stripe.com (clean, modern, great animations)
- Vercel.com (smooth scrolling, card interactions)
- Linear.app (sophisticated animations, dark mode)
- Tailwind UI components (pre-built sections)
- Shadcn UI (component library)

**Avoid These Mistakes:**
- ❌ Too many animations (distracting)
- ❌ Slow loading times
- ❌ Unclear CTAs
- ❌ Missing download links
- ❌ Broken GitHub integration
- ❌ Non-responsive design
- ❌ Poor accessibility (keyboard nav, screen readers)

---

## 📦 Deliverables Summary

When complete, the website should have:

1. ✅ **8 fully functional pages** (Home, Features, Download, Docs, Security, Support, About, Contact)
2. ✅ **Dynamic GitHub integration** (auto-fetch latest release)
3. ✅ **Platform detection** (Mac/Windows downloads)
4. ✅ **Smooth animations** (Framer Motion throughout)
5. ✅ **Lazy loading images** (Intersection Observer)
6. ✅ **Enterprise design** (professional, clean, modern)
7. ✅ **Responsive** (mobile, tablet, desktop optimized)
8. ✅ **SEO optimized** (meta tags, structured data, sitemap)
9. ✅ **Performance** (Lighthouse 95+, Core Web Vitals green)
10. ✅ **Contact form** (working email integration)
11. ✅ **Professional header/footer** (navigation, links, social)
12. ✅ **Accessibility** (WCAG 2.1 AA compliant)

---

## 🔧 Implementation Steps

**Phase 1: Setup (Day 1)**
1. Create Next.js project: `npx create-next-app@latest sco-smb-website`
2. Install dependencies: Tailwind, Framer Motion, Lucide icons, React Hook Form, Zod
3. Set up folder structure (app/, components/, lib/, public/)
4. Configure environment variables (.env.local with GitHub token)
5. Copy logos and create screenshots from SCO SMB app

**Phase 2: Core Pages (Days 2-3)**
1. Build Header and Footer components (reusable)
2. Create Home page with hero section
3. Build Download page with GitHub API integration
4. Test platform detection and download links

**Phase 3: Content Pages (Days 4-5)**
1. Features page with animated cards
2. Documentation page (FAQ, guides)
3. Security page (from SECURITY.md)
4. Support page with contact form

**Phase 4: Polish (Days 6-7)**
1. Add animations throughout (Framer Motion)
2. Implement lazy loading (images, components)
3. Smooth scrolling behavior
4. Mobile responsive adjustments
5. Accessibility audit (keyboard nav, ARIA labels)

**Phase 5: Launch (Day 8)**
1. Performance optimization (Lighthouse audit)
2. SEO meta tags and structured data
3. Deploy to Vercel/Netlify
4. Custom domain setup
5. SSL certificate
6. Analytics integration
7. Monitor and iterate

---

## 🎁 Bonus Features (If Time Permits)

- [ ] Dark mode toggle
- [ ] Interactive printer setup wizard
- [ ] Video demo on homepage
- [ ] Customer testimonials section
- [ ] Blog/changelog RSS feed
- [ ] Search functionality (docs)
- [ ] Live chat widget (Intercom/Crisp)
- [ ] Download analytics dashboard
- [ ] Newsletter signup (Mailchimp)
- [ ] Multi-language support (i18n)

---

## ⚠️ Important Notes

**GitHub Token Security:**
- Never expose GitHub token in client-side code
- Use Next.js API routes to proxy GitHub requests
- Store token in environment variables only
- Add `.env.local` to `.gitignore`

**Assets Reminder:**
- SCO-Logos folders are currently EMPTY
- You MUST create/add logos before starting
- Take screenshots from the running SCO SMB app
- Create social sharing images (1200x630 OG image)

**Private Repo Access:**
- Website needs GitHub token to fetch releases
- Set up token with `repo` scope
- Test API calls before deploying
- Handle rate limits (5000 requests/hour for authenticated)

---

## 📞 Ready to Start?

**When starting the new project, provide this prompt along with:**

1. ✅ This master prompt document
2. ✅ Logo files (create them first!)
3. ✅ Screenshots from SCO SMB app
4. ✅ Content from README.md, SECURITY.md, CHANGELOG.md
5. ✅ FAQ content from HelpCenter.jsx
6. ✅ Company contact information
7. ✅ GitHub Personal Access Token

**Example starting message:**
```
"I need you to build an enterprise-grade website for my scanning software SCO SMB. 
I've attached the master prompt (WEBSITE_MASTER_PROMPT.md) with all requirements. 
Use Next.js 14, Tailwind CSS, and Framer Motion. The website should dynamically 
fetch the latest release from our private GitHub repo (C-Elkins/SCO-SMB) and 
provide download links. Make it feel like a $100,000 professional SaaS product 
website with smooth animations, lazy loading, and a clean enterprise design."
```

---

**End of Master Prompt**

Good luck building your $100,000 enterprise website! 🚀
