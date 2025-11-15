# Vercel Deployment Guide

## Quick Setup (5 minutes)

### 1. Push to GitHub
```bash
cd /Users/chaseelkins/Documents/SCOSMB-Website
git add .
git commit -m "Configure for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel

1. Go to https://vercel.com/signup
2. Sign up with GitHub (free)
3. Click "Add New Project"
4. Import `C-Elkins/SCO-SMB-Website`
5. Set Root Directory to `scosmb_website`
6. Click "Deploy" (it auto-detects Next.js)

### 3. Add Environment Variables

In Vercel dashboard → Settings → Environment Variables, add:

```
DATABASE_URL=your_postgresql_connection_string
GITHUB_TOKEN=your_github_personal_access_token
JWT_SECRET=any_random_secret_string_here
```

**Get these values:**

- **DATABASE_URL**: Use Vercel Postgres (free tier)
  - In Vercel dashboard → Storage → Create Database → Postgres
  - Copy the `POSTGRES_URL` they provide
  - OR use external: https://railway.app/new/postgres (free tier)

- **GITHUB_TOKEN**: 
  - Go to https://github.com/settings/tokens
  - Generate new token (classic)
  - Select scope: `public_repo`
  - Copy the token

- **JWT_SECRET**: Any random string
  - Example: `my-super-secret-key-12345`

### 4. Run Database Migrations

After DATABASE_URL is set:

```bash
# Connect to your database and run:
psql $DATABASE_URL -f lib/migrations.sql
```

Or use Vercel Postgres dashboard → SQL tab → paste migration SQL.

### 5. Create Admin User

```bash
# Generate password hash
node -e "console.log(require('bcryptjs').hashSync('YourPassword123', 10))"

# Then in database:
INSERT INTO admin_users (username, email, password_hash)
VALUES ('admin', 'admin@scosmb.com', 'PASTE_HASH_HERE');
```

### 6. Generate License Keys

```bash
cd scosmb_website
node -e "const {generateBulkKeys} = require('./lib/generateLicenseKey'); console.log(generateBulkKeys(10).join('\\n'))"
```

Then insert into database:
```sql
INSERT INTO license_keys (key, max_downloads, status)
VALUES ('SCO-XXXX-XXXX-XXXX', 3, 'active');
```

## Your Live URL

Vercel gives you: `https://sco-smb-website.vercel.app` (free)

### Add Custom Domain (Optional)

Buy domain from Namecheap/Google Domains → Vercel Settings → Domains → Add

---

## Free Tier Limits

✅ Unlimited deployments
✅ 100GB bandwidth/month
✅ Serverless functions (API routes work)
✅ 256MB Postgres database
✅ SSL certificates included
✅ Global CDN

## Cost: $0/month

Everything works 100% on free tier. Upgrade to Pro ($20/mo) only if you exceed 100GB bandwidth.
