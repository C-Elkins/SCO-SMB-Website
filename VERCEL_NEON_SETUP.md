# Vercel + Neon Setup & Verification Guide

Complete step-by-step guide to configure your Vercel deployment with Neon Postgres, verify the setup, and troubleshoot common issues.

---

## Part 1: Neon Database Setup

### 1.1 Create Neon Project

1. Visit [neon.tech](https://neon.tech) and sign in
2. Click **New Project**
3. Configure:
   - **Project Name**: `scosmb-production` (or your preference)
   - **Region**: Choose closest to your Vercel region (you're using `iad1` - so select **US East**)
   - **Postgres Version**: Use default (latest stable)
4. Click **Create Project**

### 1.2 Get Connection String

After project creation:
1. Go to **Dashboard** → your project
2. Click **Connection Details** or **Connect**
3. Copy the **Connection String** (should look like):
   ```
   postgres://username:password@ep-xxx-yyy-zzz.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
4. **Save this securely** – you'll add it to Vercel in the next section

### 1.3 Run Database Migrations

You have two options to initialize the database schema:

#### Option A: Using Neon SQL Editor (Recommended for first-time setup)

1. In your Neon dashboard, click **SQL Editor**
2. Open your local `lib/migrations.sql` file
3. Copy the entire contents
4. Paste into the SQL Editor
5. Click **Run** to execute all table creations and indexes
6. Verify tables were created: Run `SELECT tablename FROM pg_tables WHERE schemaname = 'public';`

You should see:
- `license_keys`
- `download_logs`
- `admin_users`

#### Option B: Using Local Script (After environment is configured)

1. Add `DATABASE_URL` to your local `.env.local` file
2. Install dependencies: `npm install`
3. Run migration: `npm run db:migrate`
4. Check terminal output for success messages

### 1.4 Create Initial Admin User

Run this in Neon SQL Editor (replace with your values):

```sql
-- First, generate a bcrypt hash for your password locally:
-- node -e "console.log(require('bcryptjs').hashSync('YourSecurePassword', 10))"
-- Copy the output hash

INSERT INTO admin_users (username, password_hash, email, is_active)
VALUES (
  'admin',
  '$2a$10$PASTE_YOUR_BCRYPT_HASH_HERE',
  'admin@scosmb.com',
  true
);
```

To generate the bcrypt hash, run locally:
```bash
cd scosmb_website
node -e "console.log(require('bcryptjs').hashSync('YourActualPassword', 10))"
```

Copy the output (starts with `$2a$10$...`) and paste it in the SQL above.

---

## Part 2: Vercel Project Configuration

### 2.1 Link Local Project to Vercel

Run this in your `scosmb_website` directory:

```bash
npx vercel link --project-id=prj_wpSc88Nj0N3ACesX5R0AHWrOjbFQ
```

Follow the prompts:
- **Set up and link?** → Yes
- **Scope** → Select your account/team
- **Link to existing project?** → Yes
- Confirm project ID when shown

This creates `.vercel` directory with project metadata.

### 2.2 Add Environment Variables in Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Navigate to your project (SCO-SMB-Website or similar)
3. Click **Settings** → **Environment Variables**
4. Add each variable below:

| Variable Name | Value | Environments |
|---------------|-------|--------------|
| `DATABASE_URL` | Your Neon connection string | Production, Preview |
| `JWT_SECRET` | Generate: `openssl rand -base64 32` | Production, Preview |
| `PORTAL_PASSWORD` | Strong shared password for technician portal | Production, Preview |
| `GITHUB_TOKEN_DOWNLOADS` | Your GitHub PAT (repo:read scope) | Production, Preview |
| `NODE_ENV` | `production` | Production only |

**How to add**:
- Click **Add Variable**
- Paste Name and Value
- Check **Production** and **Preview**
- Click **Save**

**Important**: 
- For sensitive values, use Vercel's "Sensitive" toggle to hide them in logs
- Never commit `.env` files with real secrets to git

### 2.3 Generate Required Secrets

#### JWT Secret
```bash
openssl rand -base64 32
```
Copy output → use as `JWT_SECRET`

#### Portal Password
Choose a strong password (12+ characters, mixed case, numbers, symbols).
This is the shared password technicians use to access `/portal`.

#### GitHub Token
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Scopes needed: `repo` (for private repository access)
4. Copy token → use as `GITHUB_TOKEN_DOWNLOADS`

### 2.4 Verify vercel.json Configuration

Your `vercel.json` should already have:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

This is correct. The `iad1` region (US East) matches your Neon region for low latency.

---

## Part 3: Deploy to Vercel

### 3.1 Deploy from Git

If your repo is connected to Vercel:

```bash
git add .
git commit -m "Configure Vercel deployment with Neon database"
git push origin main
```

Vercel auto-deploys on push to `main`. Monitor at:
- Vercel dashboard → Deployments tab

### 3.2 Manual Deploy (Alternative)

```bash
cd scosmb_website
npx vercel --prod
```

Follow prompts to deploy. This uploads directly without git.

### 3.3 Watch Deployment Logs

1. Go to Vercel dashboard → Deployments
2. Click on the latest deployment
3. Check **Building** logs for compile errors
4. Check **Function Logs** after deployment for runtime errors

---

## Part 4: Verification Checklist

After deployment completes, test each endpoint:

### 4.1 API Endpoints

Replace `your-domain.vercel.app` with your actual Vercel domain.

#### Test Releases API
```bash
curl https://your-domain.vercel.app/api/releases/latest
```
**Expected**: JSON with release data or fallback message if token missing

#### Test Database Connection (via init-db API)
```bash
curl https://your-domain.vercel.app/api/init-db
```
**Expected**: `{"success": true, "message": "Database initialized"}` or error if DB unreachable

### 4.2 Web Pages

Visit in browser:

1. **Home**: `https://your-domain.vercel.app/`
   - Should load hero section, feature cards
   - Check for layout centering (no left-corner sticking)

2. **Download**: `https://your-domain.vercel.app/download`
   - License input form visible
   - Platform cards (Windows, macOS, Linux) rendered
   - Try entering test license key (should validate against DB)

3. **Portal**: `https://your-domain.vercel.app/portal`
   - Password prompt shown
   - Enter your `PORTAL_PASSWORD` → should authenticate and show releases

4. **Admin**: `https://your-domain.vercel.app/admin`
   - Username/password login form
   - Try logging in with admin credentials created in Neon
   - Should set JWT cookie and redirect (or show dashboard if implemented)

### 4.3 Database Connection Test

1. Go to `https://your-domain.vercel.app/api/init-db`
2. Should return success JSON
3. Check Vercel Function Logs for query execution logs

If errors, check:
- Environment variable `DATABASE_URL` is correct in Vercel
- Neon database is active (not paused)
- SSL mode is included in connection string (`?sslmode=require`)

### 4.4 Vercel Function Logs Inspection

1. Vercel dashboard → your project → **Logs**
2. Filter by **Errors** or **All**
3. Look for:
   - Database connection errors → fix `DATABASE_URL`
   - JWT errors → ensure `JWT_SECRET` is set
   - GitHub API errors → verify `GITHUB_TOKEN_DOWNLOADS` has correct scopes

---

## Part 5: Common Issues & Troubleshooting

### Issue: "Failed to connect to database"

**Causes**:
- `DATABASE_URL` not set in Vercel environment variables
- Neon database is paused (free tier auto-pauses after inactivity)
- SSL mode missing from connection string

**Fixes**:
1. Verify `DATABASE_URL` in Vercel Settings → Environment Variables
2. Go to Neon dashboard → wake database if paused
3. Ensure connection string ends with `?sslmode=require`
4. Redeploy after updating environment variables

### Issue: "Duplicate identifier" or build errors

**Causes**:
- TypeScript compile errors from duplicate code (like old admin login route duplication)

**Fixes**:
1. Check build logs in Vercel deployment details
2. Fix errors locally: `npm run build`
3. Push corrected code

### Issue: 500 error on `/api/releases/latest`

**Causes**:
- `GITHUB_TOKEN_DOWNLOADS` missing or invalid
- Token lacks `repo` scope for private repository

**Fixes**:
1. Verify token in Vercel environment variables
2. Test token locally: `curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/repos/YOUR_ORG/YOUR_REPO/releases/latest`
3. Regenerate token with correct scopes if needed
4. Redeploy

### Issue: Layout stuck in top-left corner

**Causes**:
- CSS conflicts from nested `w-full` and `max-w-*` classes
- Missing `container-custom` class application

**Fixes**:
- Already resolved in recent refactor
- Verify pages use `container-custom` instead of `max-w-7xl mx-auto px-6...`
- Check `globals.css` has `.container-custom` definition

### Issue: Admin login fails with correct credentials

**Causes**:
- `JWT_SECRET` not set in Vercel
- Password hash mismatch (bcrypt hash not generated correctly)

**Fixes**:
1. Verify `JWT_SECRET` in Vercel environment variables
2. Regenerate password hash: `node -e "console.log(require('bcryptjs').hashSync('Password', 10))"`
3. Update admin user in Neon SQL Editor with new hash
4. Test locally first with `.env.local` before pushing

### Issue: Portal password doesn't work

**Causes**:
- `PORTAL_PASSWORD` environment variable not set or mismatched

**Fixes**:
1. Check Vercel environment variables for `PORTAL_PASSWORD`
2. Ensure value matches what you're entering on `/portal`
3. No spaces or special encoding issues
4. Redeploy after updating

---

## Part 6: Post-Deployment Tasks

### 6.1 Custom Domain Setup (Optional)

1. Vercel dashboard → your project → **Settings** → **Domains**
2. Add your custom domain (e.g., `scosmb.com`)
3. Update DNS records as instructed by Vercel
4. Wait for DNS propagation (up to 48 hours, usually minutes)

### 6.2 Enable Analytics

1. Vercel dashboard → your project → **Analytics**
2. Enable **Web Analytics** or **Speed Insights**
3. Monitor page views, performance metrics

### 6.3 Set Up Cron Jobs (Optional)

For scheduled tasks (e.g., license key expiration cleanup):

1. Install Vercel Cron: Add `vercel.json` cron configuration
2. Create API route handler in `app/api/cron/`
3. Configure schedule in `vercel.json`

Example:
```json
{
  "crons": [{
    "path": "/api/cron/expire-licenses",
    "schedule": "0 0 * * *"
  }]
}
```

### 6.4 Monitor Database Usage

1. Neon dashboard → your project → **Monitoring**
2. Check:
   - Storage usage (free tier: 0.5 GB)
   - Compute hours (free tier: 100 hours/month)
3. Upgrade plan if approaching limits

---

## Part 7: Automation & CI/CD

### 7.1 Automatic Deployments

Your Vercel project is linked to GitHub. Any push to `main` triggers deployment.

**Workflow**:
1. Make changes locally
2. Test: `npm run dev`
3. Build: `npm run build` (verify no errors)
4. Commit: `git commit -am "Your change"`
5. Push: `git push origin main`
6. Vercel auto-deploys

### 7.2 Preview Deployments

Every pull request gets a unique preview URL:
1. Create feature branch: `git checkout -b feature/new-feature`
2. Push changes: `git push origin feature/new-feature`
3. Open PR on GitHub
4. Vercel comments with preview URL
5. Test preview before merging to `main`

### 7.3 Rollback Strategy

If a deployment breaks production:
1. Vercel dashboard → **Deployments**
2. Find last working deployment
3. Click **...** → **Promote to Production**
4. Instant rollback while you fix the issue locally

---

## Part 8: Security Best Practices

### 8.1 Environment Variable Management

- **Never** commit `.env` or `.env.local` to git (already in `.gitignore`)
- Rotate secrets quarterly:
  - `JWT_SECRET`
  - `GITHUB_TOKEN_DOWNLOADS`
  - `PORTAL_PASSWORD`
- Use Vercel's "Sensitive" toggle for all secrets

### 8.2 Database Security

- Neon databases are SSL-only by default
- Enable IP allowlist in Neon (Settings → IP Allow) if needed
- Use separate databases for production/preview environments

### 8.3 API Rate Limiting

Consider adding rate limiting to public APIs:
- `/api/releases/latest`
- `/api/validate-license`

Use middleware or Vercel Edge Config for rate limit tracking.

### 8.4 CORS Configuration

If you build a separate frontend, configure CORS in API routes:
```typescript
const headers = {
  'Access-Control-Allow-Origin': 'https://yourdomain.com',
  'Access-Control-Allow-Methods': 'GET, POST',
};
```

---

## Part 9: Quick Command Reference

### Local Development
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production (test locally)
npm run build

# Run production build locally
npm run start

# Run database migrations
npm run db:migrate
```

### Vercel CLI
```bash
# Link project
npx vercel link --project-id=prj_wpSc88Nj0N3ACesX5R0AHWrOjbFQ

# Deploy to preview
npx vercel

# Deploy to production
npx vercel --prod

# View logs
npx vercel logs

# List environment variables
npx vercel env ls
```

### Database Management
```bash
# Connect to Neon with psql (if installed)
psql "postgres://user:pass@host/db?sslmode=require"

# Generate bcrypt hash
node -e "console.log(require('bcryptjs').hashSync('password', 10))"

# Generate JWT secret
openssl rand -base64 32
```

---

## Part 10: Support & Resources

### Official Documentation
- [Vercel Docs](https://vercel.com/docs)
- [Neon Docs](https://neon.tech/docs)
- [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)

### Troubleshooting Resources
- Vercel Community: [vercel.com/community](https://vercel.com/community)
- Neon Discord: [neon.tech/discord](https://neon.tech/discord)
- Next.js GitHub Discussions

### Your Project Resources
- **Vercel Project ID**: `prj_wpSc88Nj0N3ACesX5R0AHWrOjbFQ`
- **GitHub Repo**: `C-Elkins/SCO-SMB-Website`
- **Neon Project**: (your project name from dashboard)

---

## Checklist Summary

Use this quick checklist to ensure everything is configured:

- [ ] Neon project created with US East region
- [ ] Database tables created via SQL Editor or migration script
- [ ] Admin user created in `admin_users` table
- [ ] `DATABASE_URL` added to Vercel environment variables
- [ ] `JWT_SECRET` generated and added to Vercel
- [ ] `PORTAL_PASSWORD` set in Vercel
- [ ] `GITHUB_TOKEN_DOWNLOADS` added to Vercel
- [ ] All environment variables applied to Production & Preview
- [ ] Vercel project linked locally with `vercel link`
- [ ] Code pushed to `main` branch (or manual deploy completed)
- [ ] Deployment succeeded (check Vercel dashboard)
- [ ] Home page loads correctly (responsive, centered)
- [ ] `/api/releases/latest` returns data
- [ ] `/download` page loads and license validation works
- [ ] `/portal` accepts correct password
- [ ] `/admin` login works with admin credentials
- [ ] No errors in Vercel Function Logs
- [ ] Custom domain added (optional)

---

**You're all set!** 🎉

If you encounter any issues, refer to the troubleshooting section or check Vercel Function Logs for detailed error messages.
