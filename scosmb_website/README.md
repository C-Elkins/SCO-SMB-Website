# SCO-SMB Website

Enterprise-grade web platform for SCO-SMB software distribution, licensing, and customer portal built with Next.js, Neon Postgres, and Vercel.

⭐ **SEO Optimized**: Comprehensive SEO implementation with JSON-LD schemas, optimized Core Web Vitals, and strategic resource hints for maximum search visibility.

## Features

- **Public Download Portal** with license key validation
- **Technician Portal** for authenticated access to all releases
- **Admin Dashboard** for license key management and analytics
- **GitHub Integration** for automated release distribution
- **Neon Postgres** for license storage and audit logs
- **Modern UI** with Tailwind CSS, Framer Motion, and responsive design
- **SEO Optimized** with structured data, optimized meta tags, and Core Web Vitals

## Tech Stack

- **Framework**: Next.js 16 (App Router with Turbopack, React Server Components)
- **Database**: Neon Postgres (serverless)
- **Deployment**: Vercel
- **Styling**: Tailwind CSS v4
- **Auth**: bcrypt + JWT (admin), shared password (portal)
- **Icons**: Lucide React
- **SEO**: JSON-LD structured data, optimized sitemaps, Core Web Vitals optimization
- **Performance**: Canvas-based animations, lazy loading, strategic resource hints

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Neon Postgres database (free tier available at [neon. Tech](https://neon.tech))
- GitHub Personal Access Token (for private repo releases)
- Vercel account (for deployment)

### Local Development

1. **Clone and install dependencies**:

   ```bash
   cd scosmb_website
   npm install
   ```

2. **Configure environment variables**:

   Copy `.env.example` to `.env.local` and fill in your credentials:

   ```bash
   cp .env.example .env.local
   ```

   Required variables:
   - `DATABASE_URL` – Neon Postgres connection string
   - `JWT_SECRET` – Random secret for admin sessions
   - `PORTAL_PASSWORD` – Shared password for technician portal
   - `GITHUB_TOKEN_DOWNLOADS` – GitHub token with `repo:read` scope for private releases

3. **Run database migrations**:

   ```bash
   npm run db:migrate
   ```

4. **Start development server**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the site.

## Database Setup (Neon)

1. Create a Neon project at [neon. Tech](https://neon.tech)
2. Copy the connection string from your Neon dashboard
3. Add it to your `.env.local` as `DATABASE_URL`
4. Run migrations:

   ```bash
   npm run db:migrate
   ```

The migration creates three tables:

- `license_keys` – License key records with usage tracking
- `download_logs` – Audit trail of all downloads
- `admin_users` – Admin credentials (bcrypt hashed passwords)

### Creating an Admin User

Run this SQL in your Neon SQL Editor (replace values):

```sql
INSERT INTO admin_users (username, password_hash, email, is_active)
VALUES (
  'admin',
  '$2a$10$YOUR_BCRYPT_HASH_HERE',
  'admin@scosmb.com',
  true
);
```

To generate a bcrypt hash for your password, use:

```bash
node -e "console.log(require('bcryptjs').hashSync('YourPassword', 10))"
```

## Deployment (Vercel)

### Initial Setup

1. **Link to Vercel project**:

   ```bash
   npx vercel link --project-id=prj_wpSc88Nj0N3ACesX5R0AHWrOjbFQ
   ```

2. **Add environment variables** in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.example`
   - Apply to **Production** and **Preview** environments

3. **Deploy**:

   ```bash
   git add .
   git commit -m "Deploy to production"
   git push origin main
   ```

   Vercel auto-deploys on every push to `main`.

### Manual Deploy

```bash
npx vercel --prod
```

### Post-Deployment Verification

After deployment, test these endpoints:

- `https://sco-smb.com/api/releases/latest` – Should return latest release or fallback
- `https://sco-smb.com/download` – License validation form
- `https://sco-smb.com/portal` – Technician login
- `https://sco-smb.com/admin` – Admin login
- `https://sco-smb.com/sitemap.xml` – XML sitemap (verify correct domain)
- `https://sco-smb.com/robots.txt` – Robots.txt (verify sitemap URL)

Check Vercel Function Logs for any runtime errors.

### SEO Validation

Test SEO implementation after deployment:

1. **Rich Results Test**: <https://search.google.com/test/rich-results>
   - Test homepage for Organization & Software schemas

2. **Schema Validator**: <https://validator.schema.org/>
   - Validate JSON-LD from page source

3. **PageSpeed Insights**: <https://pagespeed.web.dev/>
   - Verify LCP <2.5s and 90+ scores

4. **Mobile-Friendly Test**: <https://search.google.com/test/mobile-friendly>

5. **Google Search Console**:
   - Submit sitemap: `https://sco-smb.com/sitemap.xml`
   - Request indexing for key pages

## Project Structure

```text
scosmb_website/
├── app/                  # Next.js App Router pages
│   ├── api/             # API routes (auth, releases, validation)
│   ├── admin/           # Admin dashboard
│   ├── portal/          # Technician portal
│   ├── download/        # Public download page
│   ├── robots.ts        # SEO: Robots.txt with sitemap
│   └── sitemap.ts       # SEO: XML sitemap with priorities
├── components/          # React components
│   ├── schemas/         # JSON-LD structured data components
│   ├── HeroPipelineUltra.jsx  # Premium animated hero
│   └── ...              # Headers, footers, features
├── lib/                 # Utilities
│   ├── seo.ts           # SEO utility functions & metadata presets
│   ├── db.ts            # Database client
│   └── ...              # Auth, license utilities
├── public/              # Static assets (logos, screenshots)
├── hooks/               # Custom React hooks
└── scripts/             # Database migration scripts
```

## Available Scripts

- `npm run dev` – Start local development server
- `npm run build` – Build for production (with SEO validation)
- `npm run start` – Start production server locally
- `npm run lint` – Run ESLint
- `npm run db:migrate` – Run database migrations

## SEO Features

### Implemented Optimizations

✅ **Structured Data (JSON-LD)**

- Organization schema (company info, contact points)
- SoftwareApplication schema (product details, ratings)
- Breadcrumb navigation for documentation
- FAQ schema for rich snippets
- Product schema for pricing pages

✅ **Performance Optimization**

- LCP optimized hero section (lazy-loaded Canvas animation)
- Strategic resource hints (preload, dns-prefetch, preconnect, prefetch)
- Optimized sitemap with priority distribution (1.0 → 0.3)
- Enhanced metadata with comprehensive OpenGraph & Twitter cards

✅ **Technical SEO**

- Fixed robots.txt sitemap URL (production domain)
- Optimized meta descriptions (150-160 chars with CTAs)
- Canonical URLs on all pages
- Mobile-optimized responsive design
- Core Web Vitals compliant

### SEO Utilities

Use the SEO utility library for consistent metadata across pages:

```tsx
import { generateSEO, PAGE_METADATA } from '@/lib/seo';

// Quick setup with presets
export const metadata = generateSEO({
  ...PAGE_METADATA.features,
  canonical: '/features',
});

// Custom metadata
export const metadata = generateSEO({
  title: 'My Page',
  description: 'Optimized description...',
  canonical: '/my-page',
  keywords: ['keyword1', 'keyword2'],
});
```

### Schema Components

Add structured data to any page:

```tsx
import FAQSchema from '@/components/schemas/FAQSchema';
import BreadcrumbSchema from '@/components/schemas/BreadcrumbSchema';

export default function Page() {
  return (
    <>
      <FAQSchema faqs={[
        { question: "...", answer: "..." }
      ]} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Docs", url: "/docs" }
      ]} />
      {/* Page content */}
    </>
  );
}
```

### Expected SEO Impact (90 Days)

| Metric | Target | Status |
|--------|--------|--------|
| Organic Traffic | +50% | 🎯 Tracking |
| Keywords (Top 10) | 25+ | 🎯 Tracking |
| LCP | <2.5s | ✅ Optimized |
| PageSpeed Score | 95+ | ✅ Target |
| Rich Snippets | 8-10 | ✅ Enabled |

### SEO Documentation

Comprehensive guides available in project root:

- `COMPREHENSIVE_SEO_PLAN.md` - Full 70K+ char strategy
- `SEO_IMPLEMENTATION_COMPLETE.md` - Technical details
- `SEO_EXECUTIVE_SUMMARY.md` - High-level overview
- `DEPLOYMENT_CHECKLIST.md` - Post-deploy validation steps

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Neon Postgres connection string | `postgres://user:pass@host/db?sslmode=require` |
| `JWT_SECRET` | Secret for admin JWT signing | `your-long-random-secret-string` |
| `PORTAL_PASSWORD` | Shared password for portal access | `strong-portal-password` |
| `GITHUB_TOKEN_DOWNLOADS` | GitHub PAT for private releases | `ghp_xxxxxxxxxxxxx` |
| `NODE_ENV` | Runtime environment (auto-set by Vercel) | `production` |

## Performance Metrics

Current performance targets:

- **LCP**: <2.5s (optimized with lazy-loaded Canvas hero)
- **CLS**: <0.1 (reserved space for all dynamic content)
- **INP**: <200ms (debounced interactions)
- **Build Time**: ~6s with Turbopack
- **Bundle Size**: Optimized with code splitting

## Learn More

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Neon Serverless Postgres](https://neon.tech/docs)
- [Vercel Deployment](https://vercel.com/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)

### SEO Resources

- [Google Search Console](https://search.google.com/search-console)
- [Schema.org Documentation](https://schema.org/)
- [Core Web Vitals Guide](https://web.dev/vitals/)

---

**Last Updated**: November 23, 2025  
**SEO Status**: ✅ Optimized & Production Ready  
**Performance**: ✅ Core Web Vitals Compliant
