# 🚀 Quick Vercel Setup - Sentry Integration

## Add These 3 Environment Variables to Vercel:

### 1. SENTRY_AUTH_TOKEN
```
sntryu_YOUR_TOKEN_HERE
```
*(Paste your actual token from Sentry - see Step 1 in full guide)*

**⚠️ IMPORTANT: Token must have these scopes:**
- `project:read` ✅
- `event:read` ✅  
- `org:read` ✅

**Environments**: Production ✅ | Preview ✅ | Development ✅

---

### 2. SENTRY_ORG
```
your-org-slug
```
*(Find this in your Sentry URL after /organizations/)*

**Environments**: Production ✅ | Preview ✅ | Development ✅

---

### 3. SENTRY_PROJECT
```
electron
```
*(Your Sentry project slug from project settings)*

**Environments**: Production ✅ | Preview ✅ | Development ✅

---

## How to Add in Vercel:

1. Go to: https://vercel.com/dashboard
2. Click your **SCO-SMB-Website** project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Paste each variable name and value
6. Select all three environments (Production, Preview, Development)
7. Click **Save**
8. Repeat for all 3 variables

---

## After Adding Variables:

**Option 1**: Redeploy automatically
- Just push any commit to GitHub
- Vercel will redeploy with new variables

**Option 2**: Manual redeploy
- Go to Deployments tab in Vercel
- Click "..." on latest deployment
- Select "Redeploy"

---

## Test It Works:

Visit: `https://your-domain.com/api/sentry-stats`

Should see JSON response like:
```json
{
  "crashFreeRate": "99.50%",
  "last24Hours": { "totalErrors": 12, "unresolvedIssues": 3 },
  "recentIssues": [...]
}
```

---

## 🐛 Troubleshooting

### Error 403: Forbidden
**Problem**: Token doesn't have required permissions  
**Solution**: 
1. Go to [Sentry Auth Tokens](https://sentry.io/settings/account/api/auth-tokens/)
2. Delete the old token
3. Create a NEW token with these scopes:
   - ✅ `project:read`
   - ✅ `event:read`
   - ✅ `org:read`
4. Update `SENTRY_AUTH_TOKEN` in Vercel
5. Redeploy

### Wrong org/project slug
**Problem**: HTTP 404 or "project not found"  
**Solution**:
- Check your Sentry URL: `https://sentry.io/organizations/YOUR-ORG-SLUG/issues/?project=PROJECT-ID`
- Update `SENTRY_ORG` in Vercel to match the org slug from URL
- Verify `SENTRY_PROJECT` matches your project slug (check project settings)

---

✅ **Done!** Your admin dashboard now shows Sentry crash analytics.
