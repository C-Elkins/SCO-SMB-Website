# SCO SMB Website

**🌐 Official website for SCO SMB - Enterprise printer connectivity solution**

**Live Site:** [https://sco-smb-website.vercel.app](https://sco-smb-website.vercel.app) | **Company:** [South Coast Office Supply](https://southcoastoffice.com)

---

## 🎯 About This Project

This is the **public marketing website** for SCO SMB software, featuring:

- 🔐 **Secure License System** - Validated downloads with GitHub integration
- 👨‍💻 **Technician Portal** - Unrestricted access for IT professionals  
- 🛡️ **Admin Dashboard** - License key management and analytics
- 📱 **Responsive Design** - Professional enterprise UI/UX
- ⚡ **Next.js 15** - Production-ready with TypeScript

**Note:** This repository contains only the **website code**. The actual SCO SMB software is stored in a separate private repository.

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

## 🚀 Architecture Overview

### Tech Stack
- **Framework:** Next.js 15 with App Router
- **Database:** PostgreSQL (Neon/Vercel Postgres)
- **Styling:** Tailwind CSS with custom design system
- **Authentication:** JWT-based admin system
- **Deployment:** Vercel with automatic deployments
- **APIs:** GitHub integration for software releases

### Key Components
- **License Validation System** - Secure key verification before downloads
- **GitHub Integration** - Pulls latest releases from private SCO-SMB repository
- **Admin Panel** - Complete license key management with analytics
- **Technician Portal** - Password-protected unrestricted access
- **Email System** - Contact forms with Resend integration

## 🔧 Configuration Required

### Environment Variables (Vercel)

**Critical for GitHub Integration:**
```bash
GITHUB_TOKEN_DOWNLOADS=ghp_xxxxx  # Personal Access Token with repo access
GITHUB_REPO_OWNER=C-Elkins
GITHUB_REPO_NAME=SCO-SMB
```

**Database & Authentication:**
```bash
DATABASE_URL=postgresql://...     # Neon/Vercel Postgres URL
JWT_SECRET=your_jwt_secret_key    # Min 32 chars
ADMIN_USERNAME=admin_user
ADMIN_PASSWORD=secure_password
```

**Optional Services:**
```bash
RESEND_API_KEY=re_xxxxx          # Email service
PORTAL_PASSWORD=TechPortal2025!   # Technician portal
```

### GitHub Token Setup

1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Create new token with `repo` access to `C-Elkins/SCO-SMB` repository
3. Add as `GITHUB_TOKEN_DOWNLOADS` in Vercel environment variables
4. Redeploy application

**Without this token, the download page will show mock data instead of real releases.**

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

## 🚀 Deployment Status

✅ **Successfully deployed to Vercel**  
✅ **Database connected and operational**  
✅ **Admin panel with 8 license keys generated**  
✅ **TypeScript compilation resolved**  
⚠️ **GitHub integration requires token configuration**

### Current Status
- Website is live and fully functional
- License key system operational with real database
- Admin dashboard working with enterprise features
- Download page shows placeholder data until GitHub token is configured

### Next Actions Needed
1. **Configure GitHub Token** in Vercel environment variables
2. **Test download functionality** with real private repo data
3. **Add production content** (screenshots, final copy)
4. **Set up monitoring** and analytics

---

## 📞 Company Information

**South Coast Office Supply**  
📧 support@southcoastoffice.com  
📞 (541) 267-5114  
📍 199 N Broadway, Coos Bay, OR 97420

---

## 📋 Development Notes

This website was built with enterprise-grade features including:
- Comprehensive admin dashboard with real-time metrics
- System maintenance and monitoring panels
- Functional edit/eye buttons with database operations
- Password management with bcrypt hashing
- Real data persistence using PostgreSQL
- Professional UI matching enterprise standards

**For development questions or GitHub token configuration, contact the development team.**
