SCO SMB Enterprise Website – Ultra-Refined Master Prompt
Build a $100k-quality enterprise SaaS marketing + download + license management website for SCO SMB (South Coast Office Scan Manager). The site runs on Next.js, hosted on Vercel, using Neon Postgres for all data storage.
The final product must look and behave like a top-tier enterprise SaaS platform (Stripe, Atlassian, Vercel, Linear).
🏗️ Project Architecture (Mandatory)
Framework & Hosting
Framework: Next.js 14+ (App Router)
Deployment: Vercel
Database: Neon Serverless Postgres
ORM: Drizzle ORM or Prisma (developer may choose)
Authentication:
Admin dashboard → JWT stored in HttpOnly cookie
Technician portal → Single shared password stored as ENV
Download gate → License key database validation
Backend APIs (Next.js Route Handlers)
The site must include API routes for:
1. License Key System
/api/licenses/validate
/api/licenses/generate
/api/licenses/revoke
/api/licenses/list
/api/licenses/usage
2. Analytics
/api/analytics/download
/api/analytics/summary
3. Admin Authentication
/api/admin/login
/api/admin/logout
/api/admin/users
4. Technician Portal Auth
/api/portal/auth
5. GitHub Release Proxy
/api/releases/latest
/api/releases/archive
All API routes must:
Use Neon connection pooling best practices
Reject requests with invalid authentication
No CORS exposure when not needed
Return structured JSON with errors included
🔌 GitHub Private Release Integration
Integrate with a private GitHub repository:
C-Elkins/SCO-SMB
Use:
GitHub REST API
A GitHub App (recommended) or a classic personal token
Vercel Environment Variables for authentication
The site must:
Fetch the latest release + assets
Cache results (5 minutes recommended)
Serve downloads through a secure proxy route (never expose direct GitHub URLs)
Automatically detect platform (Windows, Mac Intel, Mac ARM)
🗄️ Database Schema (Neon Postgres)
Use this schema (improve as needed):
license_keys
(id, key_code, status, created_at, created_by, activated_at, expires_at, download_count, max_downloads, notes, customer_email, customer_name, customer_company)
download_logs
(id, license_key_id, download_date, platform, version, ip_address, user_agent, success)
admin_users
(id, username, password_hash, email, created_at, last_login, is_active)
portal_settings (optional)
(id, tech_portal_password_hash, updated_at)
📐 Global Design Language
Replicate a premium SaaS design system with:
Brand Colors
Navy Blue: #153B6B
Teal Accent: #00A8B5
Light Neutral: #E9ECEF
Dark Neutral: #2E2E2E
Success: #28a745
Warning: #fd7e14
Danger: #dc3545
Typography
Inter (400, 500, 600, 700)
Tight headings, generous leading, clean typography
Use ~8px spacing grid
Style Requirements
Framer Motion animations
Sticky header with scroll transition
Card-based design
Rounded corners (8–12px)
High-end enterprise polish (Stripe-level quality)
Performance optimized (images, lazy loading, dynamic imports)
📄 Required Pages & Functionality
Each page must load with enterprise polish, clean layout, and animations.
1. Home (/)
Fortune-500 grade hero section
Animated product mockup
GitHub dynamic release badge
Feature stripes
Enterprise trust section
CTA: Download + Request License
Smooth scroll + motion effects
2. Features (/features)
Animated feature cards
Protocol comparison table
Security highlights
Auto-update overview
Network discovery walkthrough
Screenshot sections
3. Download (/download) – License Key Gate
Before validation
License key input
Format validator
Inline error messaging
After validation
Release data rendered from /api/releases/latest
Download buttons (platform-aware)
Remaining download count
Changelog display (Markdown → HTML)
Previous 3 releases
Contact link for requesting license
Link to Technician Portal
4. Docs (/docs)
Side navigation layout (like Vercel Docs)
Sections:
Getting started
Printer setup (Kyocera, Sharp)
Troubleshooting
Security
IT deployment
Markdown-based content with auto-TOC
5. Security (/security)
Architecture diagram
Encryption & compliance
Data protection statement
Vulnerability reporting
6. Support (/support)
Contact form with spam protection
Searchable FAQ (powered by database or static JSON)
Phone, email, hours
7. About (/about)
Company details
Mission
Embedded map
Hours & contact
8. Contact (/contact)
Contact form
Map
Hours
Optional license request
9. Technician Portal (/portal)
Login via shared password
Unrestricted downloads
Beta builds
Full documentation
Setup checklists
Internal tools/scripts
10. Admin Dashboard (/admin)
Features:
Login/logout
License key management
Generate bulk keys
Revoke keys
Set expiration rules
Analytics dashboard (chart.js recommended)
Download logs viewer
Technician portal password editor
GitHub token management screen
🎨 Motion & Interaction Requirements
Use Framer Motion or CSS transitions for:
Page Load
Hero fade/slide
Header slide-down
CTA bounce
Scroll
Cards reveal
Counter animations
Subtle parallax images
Hover
CTA scale 1.05
Cards lift
Icons color-shift
Links underline animation
Micro-interactions
Form field glow
Success check animations
Scroll progress indicator
🧱 File & Project Structure
app/
  layout.tsx
  page.tsx
  features/page.tsx
  download/page.tsx
  docs/[slug]/page.tsx
  portal/page.tsx
  admin/page.tsx
  api/
    releases/latest/route.ts
    releases/archive/route.ts
    licenses/validate/route.ts
    licenses/generate/route.ts
    analytics/download/route.ts
components/
  Header.tsx
  Footer.tsx
  Hero.tsx
  LicenseKeyForm.tsx
  DownloadSection.tsx
  FeatureCard.tsx
  Admin/...
lib/
  github.ts
  db.ts (Neon)
  auth.ts
styles/
public/
🔑 Environment Variables (Required for Vercel)
NEON_DATABASE_URL=
GITHUB_TOKEN=
JWT_SECRET=
PORTAL_PASSWORD=
ADMIN_DEFAULT_USER=
ADMIN_DEFAULT_PASS=
📦 Deliverables
Your improved prompt must result in a system that delivers:
✔ A fully deployed enterprise Next.js site on Vercel
✔ Connected Neon Postgres database
✔ GitHub private release integration
✔ Smooth, premium UI/UX
✔ Security best practices
✔ Technician portal
✔ License key system
✔ Admin dashboard
✔ Enterprise-quality branding and interactions
If you want, I can also create:
✅ A version tailored for AI code generation (Copilot, Claude, or ChatGPT Code Interpreter)
✅ A version formatted as a Notion project brief
✅ A step-by-step build roadmap
✅ A developer onboarding guide
✅ A Vercel-ready repo structure with boilerplate code