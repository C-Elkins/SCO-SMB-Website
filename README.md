# SCO SMB Website Project

**Enterprise-grade marketing website with license key management system**

---

## 📁 Project Structure

```
SCOSMB-Website/
├── WEBSITE_MASTER_PROMPT.md      # Complete implementation guide
├── README.md                      # This file
├── assets/                        # Assets ready to use
│   ├── logos/
│   │   ├── sco-smb-logo-primary.svg   ✅ Main logo
│   │   └── sco-smb-logo-dark.png      ✅ Dark version
│   └── screenshots/               # Save 8 screenshots here
│       └── screenshot-naming-guide.md  # Naming instructions
└── (Next.js project will be created here)
```

---

## 🚀 Quick Start

### 1. Review the Master Prompt

Open `WEBSITE_MASTER_PROMPT.md` - this contains EVERYTHING you need:
- Complete page structure (10 pages)
- License key system implementation
- Technician portal (password-protected)
- Admin dashboard (key generation & analytics)
- GitHub API integration
- Database schema
- UI/UX designs
- Code examples

### 2. Save Your Screenshots

Place 8 screenshots in `assets/screenshots/` with these exact names:
- `sco-smb-hero-dashboard.png`
- `sco-smb-dashboard-detail.png`
- `sco-smb-security-settings.png`
- `sco-smb-scan-history.png`
- `sco-smb-ftp-server.png`
- `sco-smb-general-settings.png`
- `sco-smb-splash-screen.png`
- `sco-smb-logo-illustration.png`

See: `assets/screenshot-naming-guide.md`

### 3. Create Next.js Project

```bash
npx create-next-app@latest .
# Choose: Yes to TypeScript, Yes to Tailwind, Yes to App Router

# Install dependencies
npm install framer-motion lucide-react react-hook-form zod @hookform/resolvers
npm install pg bcryptjs jsonwebtoken
npm install -D @types/bcryptjs @types/jsonwebtoken
```

### 4. Set Up Database

```bash
# Install PostgreSQL (Mac)
brew install postgresql
brew services start postgresql

# Create database
createdb scosmb_website

# Add to .env.local
DATABASE_URL=postgresql://localhost:5432/scosmb_website
```

### 5. Configure Environment Variables

Create `.env.local`:

```bash
# GitHub API
GITHUB_TOKEN=ghp_your_token_here
GITHUB_REPO_OWNER=C-Elkins
GITHUB_REPO_NAME=SCO-SMB

# Database
DATABASE_URL=postgresql://localhost:5432/scosmb_website

# License Key System
JWT_SECRET=your_super_secret_key_min_32_chars
PORTAL_PASSWORD=TechPortal2025!

# Email
SENDGRID_API_KEY=your_sendgrid_key
CONTACT_EMAIL=support@southcoastoffice.com

# Admin
ADMIN_DEFAULT_USERNAME=admin
ADMIN_DEFAULT_PASSWORD=ChangeMe123!
```

### 6. Start Building

Follow the implementation steps in `WEBSITE_MASTER_PROMPT.md`:
- Phase 1: Setup & database (Day 1)
- Phase 2: License key system (Days 2-3)
- Phase 3: Core pages (Days 4-5)
- Phase 4: Technician portal & admin (Days 6-7)
- Phase 5: Polish & deploy (Day 8)

---

## 🔑 Key Features

### For End Users
- ✅ License key validation required for downloads
- ✅ Platform auto-detection (Mac Intel/Silicon, Windows)
- ✅ Latest release from GitHub (dynamic)
- ✅ Professional marketing pages

### For Technicians (`/portal`)
- ✅ Password-protected (no license key needed)
- ✅ Unrestricted downloads (all versions)
- ✅ Complete documentation access
- ✅ Beta builds & tools

### For Admins (`/admin`)
- ✅ Generate license keys (single or batch)
- ✅ View/manage all keys
- ✅ Download analytics
- ✅ Revoke/expire keys
- ✅ Usage tracking

---

## 📋 Pages

1. **Home** - Hero, features, CTA
2. **Features** - Detailed feature showcase
3. **Download** - License key validation + downloads 🔐
4. **Documentation** - Guides, FAQ, tutorials
5. **Security** - Enterprise security features
6. **Support** - Contact form, FAQ
7. **About** - Company info
8. **Contact** - Contact form, location, map
9. **Technician Portal** - No license key required 👨‍💻
10. **Admin Dashboard** - Key management 🔑

---

## 🎨 Design System

**Colors:**
- Primary Navy: `#153B6B`
- Accent Teal: `#00A8B5`
- Neutral Light: `#E9ECEF`
- Neutral Dark: `#2E2E2E`

**Typography:**
- Font: Inter (Google Fonts)
- Weights: 400, 500, 600, 700

**Components:**
- Smooth scrolling
- Lazy loading images
- Framer Motion animations
- Mobile-first responsive
- Accessibility (WCAG 2.1 AA)

---

## 📊 Database Schema

### Tables
1. **license_keys** - Generated keys, status, usage
2. **download_logs** - Track all downloads
3. **admin_users** - Admin authentication

See full schema in `WEBSITE_MASTER_PROMPT.md` section "🔐 License Key System Implementation"

---

## 🚀 Deployment

**Recommended:** Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Connect PostgreSQL database (Vercel Postgres or external)
```

---

## 📞 Support

**Company:** South Coast Office Supply  
**Email:** support@southcoastoffice.com  
**Phone:** (541) 267-5114  
**Address:** 199 N Broadway, Coos Bay, OR 97420

---

## 📝 Next Steps

1. ✅ Assets ready (logos copied)
2. ⏳ Save screenshots (8 total)
3. ⏳ Create Next.js project
4. ⏳ Set up database
5. ⏳ Implement license key system
6. ⏳ Build pages
7. ⏳ Deploy

**Ready to start? Open `WEBSITE_MASTER_PROMPT.md` and begin!**
