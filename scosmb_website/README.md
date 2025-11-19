# SCO-SMB Website

Enterprise-grade web platform for SCO-SMB software distribution, licensing, and customer portal built with Next.js, Neon Postgres, and Vercel.

## Features

- **Public Download Portal** with license key validation
- **Technician Portal** for authenticated access to all releases
- **Admin Dashboard** for license key management and analytics
- **GitHub Integration** for automated release distribution
- **Neon Postgres** for license storage and audit logs
- **Modern UI** with Tailwind CSS, Framer Motion, and responsive design

## Tech Stack

- **Framework**: Next.js 15 (App Router, React Server Components)
- **Database**: Neon Postgres (serverless)
- **Deployment**: Vercel
- **Styling**: Tailwind CSS v4
- **Auth**: bcrypt + JWT (admin), shared password (portal)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Neon Postgres database (free tier available at [neon.tech](https://neon.tech))
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

1. Create a Neon project at [neon.tech](https://neon.tech)
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

- `https://your-domain.vercel.app/api/releases/latest` – Should return latest release or fallback
- `https://your-domain.vercel.app/download` – License validation form
- `https://your-domain.vercel.app/portal` – Technician login
- `https://your-domain.vercel.app/admin` – Admin login

Check Vercel Function Logs for any runtime errors.

## Project Structure

```text
scosmb_website/
├── app/                  # Next.js App Router pages
│   ├── api/             # API routes (auth, releases, validation)
│   ├── admin/           # Admin dashboard
│   ├── portal/          # Technician portal
│   └── download/        # Public download page
├── components/          # React components (Header, Footer)
├── lib/                 # Utilities (db, auth, license)
├── public/              # Static assets (logos, screenshots)
└── scripts/             # Database migration scripts
```

## Available Scripts

- `npm run dev` – Start local development server
- `npm run build` – Build for production
- `npm run start` – Start production server locally
- `npm run lint` – Run ESLint
- `npm run db:migrate` – Run database migrations

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Neon Postgres connection string | `postgres://user:pass@host/db?sslmode=require` |
| `JWT_SECRET` | Secret for admin JWT signing | `your-long-random-secret-string` |
| `PORTAL_PASSWORD` | Shared password for portal access | `strong-portal-password` |
| `GITHUB_TOKEN_DOWNLOADS` | GitHub PAT for private releases | `ghp_xxxxxxxxxxxxx` |
| `NODE_ENV` | Runtime environment (auto-set by Vercel) | `production` |

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Neon Serverless Postgres](https://neon.tech/docs)
- [Vercel Deployment](https://vercel.com/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
# Deploy trigger Wed Nov 19 15:02:49 CST 2025
