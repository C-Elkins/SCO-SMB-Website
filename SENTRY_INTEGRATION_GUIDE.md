# Sentry Integration Setup Guide

This guide walks you through integrating Sentry crash analytics with your SCO SMB admin dashboard and Vercel deployment.

## 🎯 What This Integration Provides

### Public-Facing Features
- ✅ App health status badge (crash-free rate)
- ✅ Real-time stability metrics
- ✅ Confidence indicator for download page

### Admin Dashboard Features
- ✅ Full error details with stack traces
- ✅ User impact metrics
- ✅ Recent issue tracking
- ✅ 24-hour error statistics
- 🔒 Password-protected behind admin authentication

---

## 📋 Step-by-Step Setup

### Step 1: Get Sentry API Token

1. Go to [Sentry Settings → API → Auth Tokens](https://sentry.io/settings/account/api/auth-tokens/)
2. Click **"Create New Token"**
3. Configure the token:
   - **Name**: `SCO-SMB-Vercel-Integration`
   - **Scopes** (required - MUST CHECK ALL THREE):
     - ✅ `project:read` - Read project data
     - ✅ `event:read` - Read error events
     - ✅ `org:read` - Read organization info
   - ⚠️ **CRITICAL**: Without all 3 scopes, you'll get 403 Forbidden errors
4. Click **"Create Token"**
5. Copy your token (format: `sntryu_...`)

**Your Token**: 
```
sntryu_YOUR_TOKEN_HERE
```
*(Replace with your actual token from Sentry)*

---

### Step 2: Find Your Sentry Organization and Project Slugs

1. Go to your Sentry project dashboard
2. Look at the URL: `https://sentry.io/organizations/YOUR-ORG-SLUG/issues/?project=PROJECT-ID`
3. Note down:
   - **Organization slug**: The part after `/organizations/`
   - **Project slug**: Usually `sco-smb` (check in project settings)

---

### Step 3: Configure Vercel Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **SCO-SMB-Website** project
3. Navigate to **Settings → Environment Variables**
4. Add the following variables:

#### Variable 1: SENTRY_AUTH_TOKEN
- **Name**: `SENTRY_AUTH_TOKEN`
- **Value**: `sntryu_YOUR_TOKEN_HERE` *(paste your token from Step 1)*
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

#### Variable 2: SENTRY_ORG
- **Name**: `SENTRY_ORG`
- **Value**: `your-org-slug` (from Step 2)
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

#### Variable 3: SENTRY_PROJECT
- **Name**: `SENTRY_PROJECT`
- **Value**: `sco-smb` (or your project slug from Step 2)
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

5. Click **"Save"** for each variable

---

### Step 4: Deploy to Vercel

The integration is now complete! Deploy your changes:

```bash
# Commit the changes
git add .
git commit -m "Add Sentry integration to admin dashboard"
git push origin main
```

Vercel will automatically deploy with the new environment variables.

---

## 🧪 Testing the Integration

### Test Locally

1. Add environment variables to `.env.local`:
```bash
SENTRY_AUTH_TOKEN=sntryu_YOUR_TOKEN_HERE
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=sco-smb
```

2. Start the development server:
```bash
npm run dev
```

3. Test the API endpoint:
```bash
curl http://localhost:3000/api/sentry-stats
```

Expected response:
```json
{
  "crashFreeRate": "99.50%",
  "last24Hours": {
    "totalErrors": 12,
    "unresolvedIssues": 3
  },
  "recentIssues": [
    {
      "id": "123",
      "title": "TypeError: Cannot read property...",
      "count": 5,
      "level": "error",
      "lastSeen": "2025-11-21T10:30:00Z"
    }
  ],
  "timestamp": "2025-11-21T12:00:00Z"
}
```

### Test in Admin Dashboard

1. Navigate to `/admin` (password protected)
2. View the **Overview** tab
3. You should see the **"App Health & Crash Analytics"** section with:
   - Crash-free rate indicator
   - Last 24 hours error count
   - Active issues count
   - Recent issues list

---

## 🎨 Integration Points

### 1. Admin Dashboard (`/admin`)
**Location**: Overview tab
**Component**: `AppHealthStatus`
**Features**:
- Real-time crash-free rate
- Error statistics (24 hours)
- Active issues count
- Recent issue details with links to Sentry

### 2. API Endpoint
**Route**: `/api/sentry-stats`
**Method**: `GET`
**Cache**: 5 minutes
**Response**: JSON with sanitized metrics

### 3. Status Badge (Optional)
**Component**: `StatusBadge`
**Usage**: Can be added to any page
```tsx
import { StatusBadge } from '@/components/StatusBadge';

<StatusBadge />
```

---

## 🔒 Security Features

✅ **API Token stored securely** in Vercel environment variables  
✅ **No sensitive data exposed** to public API  
✅ **Admin-only access** to detailed metrics  
✅ **Rate limiting** via 5-minute cache  
✅ **No stack traces** in public endpoints  

---

## 📊 Metrics Explained

### Crash-Free Rate
- Percentage of sessions without crashes
- **99%+**: Excellent stability 🟢
- **95-99%**: Good stability 🟡
- **<95%**: Needs attention 🔴

### Total Errors (24h)
- Number of error events in last 24 hours
- Includes all severity levels

### Active Issues
- Number of unresolved issues
- Requires manual resolution in Sentry

---

## 🚀 Advanced Features (Optional)

### Embed Full Sentry Dashboard

For internal admin use, add iframe to admin dashboard:

```tsx
// In AdminDashboard.tsx, add new tab
{activeTab === 'sentry-full' && (
  <div className="bg-white rounded-xl shadow-sm border p-6">
    <h2 className="text-xl font-bold mb-4">Full Sentry Dashboard</h2>
    <iframe
      src={`https://sentry.io/organizations/${SENTRY_ORG}/issues/?project=${PROJECT_ID}&statsPeriod=24h`}
      width="100%"
      height="800px"
      className="border rounded-lg"
    />
  </div>
)}
```

### Add Email Alerts

Configure Sentry to send email alerts for critical errors:
1. Go to Sentry → Project Settings → Alerts
2. Create alert rule: "Send email when error count > 10 in 1 hour"
3. Add team email addresses

---

## 🐛 Troubleshooting

### Error: "Sentry token not configured"
- Check that `SENTRY_AUTH_TOKEN` is set in Vercel
- Verify the token is valid in Sentry settings
- Redeploy after adding environment variables

### Error: "Failed to fetch from Sentry"
- Verify `SENTRY_ORG` and `SENTRY_PROJECT` slugs are correct
- Check token has required scopes: `project:read`, `event:read`, `org:read`
- Test API directly: `curl -H "Authorization: Bearer YOUR_TOKEN" https://sentry.io/api/0/projects/ORG/PROJECT/issues/`

### No data showing
- Ensure your app is actually sending errors to Sentry
- Check Sentry project has received events in last 24 hours
- Verify API endpoint returns data: `/api/sentry-stats`

---

## 📚 Resources

- [Sentry API Documentation](https://docs.sentry.io/api/)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Next.js API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)

---

## ✅ Deployment Checklist

- [ ] Sentry API token created with correct scopes
- [ ] Organization and project slugs identified
- [ ] All 3 environment variables added to Vercel
- [ ] Variables applied to Production, Preview, Development
- [ ] Code committed and pushed to GitHub
- [ ] Vercel deployment successful
- [ ] `/api/sentry-stats` endpoint tested
- [ ] Admin dashboard shows health metrics
- [ ] Error counts updating correctly

---

**Status**: ✅ Integration Complete  
**Last Updated**: November 21, 2025  
**Version**: 1.0.0
