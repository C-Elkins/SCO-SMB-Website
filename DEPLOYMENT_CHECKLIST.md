# 🚀 Pre-Deployment SEO Checklist

**Date**: November 23, 2025  
**Target Deployment**: Production (sco-smb.com)

---

## ✅ Pre-Deployment Verification

### Build & Code Quality
- [x] Production build passes (`npm run build`)
- [x] No TypeScript errors
- [x] All new files created successfully
- [x] robots.txt sitemap URL uses correct domain (sco-smb.com)
- [x] sitemap.ts has valid changeFrequency values
- [x] JSON-LD schemas are well-formed
- [x] Hero component LCP optimization implemented

---

## 🧪 Post-Deployment Testing (Do After Deploy)

### 1. Sitemap Verification
```bash
# Test sitemap loads
curl https://sco-smb.com/sitemap.xml

# Should return XML with:
# - All page URLs
# - Priority values (0.3 to 1.0)
# - lastModified dates
# - changeFrequency values
```

**Expected Output**: XML sitemap with ~25 URLs

**✅ Pass Criteria**: 
- Status 200
- Valid XML structure
- All URLs use https://sco-smb.com (not vercel.app)

---

### 2. Robots.txt Verification
```bash
# Test robots.txt
curl https://sco-smb.com/robots.txt

# Should contain:
# Sitemap: https://sco-smb.com/sitemap.xml
# Host: https://sco-smb.com
```

**✅ Pass Criteria**:
- Sitemap URL is https://sco-smb.com/sitemap.xml
- No vercel.app references
- AI bots blocked (GPTBot, CCBot, etc.)

---

### 3. Rich Results Testing

**Test Tool**: https://search.google.com/test/rich-results

**Pages to Test**:
1. Homepage (`/`)
   - Should detect: Organization schema, SoftwareApplication schema
   - Expected: 2 valid items

2. Features (`/features`)
   - After adding schemas: Breadcrumb schema

3. Pricing (`/pricing`)
   - After adding schemas: Product schema, FAQ schema

**✅ Pass Criteria**:
- No errors
- Schemas detected correctly
- All required properties present

---

### 4. Schema Validation

**Test Tool**: https://validator.schema.org/

**How to Test**:
1. Visit https://sco-smb.com
2. View page source (Ctrl+U or Cmd+Option+U)
3. Find JSON-LD scripts (search for `application/ld+json`)
4. Copy JSON content
5. Paste into Schema validator
6. Check for errors

**✅ Pass Criteria**:
- Organization schema valid
- SoftwareApplication schema valid
- No missing required properties
- All URLs absolute (include https://sco-smb.com)

---

### 5. Page Speed Testing

**Test Tool**: https://pagespeed.web.dev/

**Pages to Test**:
1. Homepage (`/`)
2. Features (`/features`)
3. Download (`/download`)

**Target Scores**:
- Desktop: 95+
- Mobile: 90+

**Core Web Vitals Targets**:
- LCP: <2.5s (should improve with hero optimization)
- CLS: <0.1
- INP: <200ms

**✅ Pass Criteria**:
- LCP improved by 200-500ms vs before
- All Core Web Vitals in "Good" range
- No critical issues flagged

---

### 6. Mobile-Friendly Test

**Test Tool**: https://search.google.com/test/mobile-friendly

**Test URL**: https://sco-smb.com

**✅ Pass Criteria**:
- Page is mobile-friendly
- Text readable without zooming
- Content fits screen
- Links not too close together

---

### 7. Resource Hints Verification

**How to Test**:
1. Open https://sco-smb.com in Chrome
2. Open DevTools (F12)
3. Go to Network tab
4. Reload page
5. Check Timing section

**Look For**:
- Early DNS lookups for fonts.googleapis.com
- Preconnect to fonts.gstatic.com
- Hero image preloaded (priority: high)
- Prefetched /features and /trial

**✅ Pass Criteria**:
- Font loaded quickly (preconnect working)
- Hero image loads fast (preload working)
- No delayed resource warnings

---

### 8. Structured Data in Search Results

**Timeline**: 1-7 days after deployment

**How to Check**:
1. Search Google for: `site:sco-smb.com SCO SMB`
2. Look for rich snippets:
   - Star rating (4.8★)
   - Product information
   - Breadcrumbs (on docs pages)

**Note**: Rich results may take 1-7 days to appear in Google

---

## 🔍 Google Search Console Setup

### Immediate Actions After Deploy:

1. **Add Property**
   - Go to: https://search.google.com/search-console
   - Click "Add Property"
   - Enter: https://sco-smb.com
   - Verify ownership (DNS or HTML file)

2. **Submit Sitemap**
   - In Search Console, go to "Sitemaps"
   - Add sitemap URL: https://sco-smb.com/sitemap.xml
   - Click "Submit"

3. **Request Indexing**
   - Go to "URL Inspection"
   - Enter key URLs:
     - https://sco-smb.com/
     - https://sco-smb.com/features
     - https://sco-smb.com/download
     - https://sco-smb.com/trial
   - Click "Request Indexing" for each

4. **Enable Coverage Reports**
   - Check "Coverage" section weekly
   - Fix any errors that appear

---

## 📊 Monitoring Schedule

### Daily (First Week):
- [ ] Check Core Web Vitals in PageSpeed Insights
- [ ] Monitor sitemap submission status in Search Console
- [ ] Check for crawl errors

### Weekly (First Month):
- [ ] Review Search Console coverage report
- [ ] Check rich results appearance in search
- [ ] Monitor organic traffic in Analytics
- [ ] Review keyword rankings

### Monthly (Ongoing):
- [ ] Analyze top-performing pages
- [ ] Update meta descriptions based on CTR
- [ ] Add new pages to sitemap
- [ ] Review and update schema markup

---

## 🎯 Success Metrics to Track

### Week 1:
- [ ] Sitemap successfully crawled by Google
- [ ] No indexing errors in Search Console
- [ ] Rich snippets start appearing
- [ ] Core Web Vitals "Good" on all pages

### Month 1:
- [ ] +25% organic traffic
- [ ] 15-20 keywords in top 10
- [ ] 3-5 rich snippets active
- [ ] PageSpeed scores 90+

### Month 3:
- [ ] +50% organic traffic
- [ ] 25+ keywords in top 10
- [ ] 8-10 rich snippets active
- [ ] Domain authority +5-7 points

---

## 🚨 Troubleshooting

### Issue: Rich Results Not Showing
**Solution**: 
1. Test with Rich Results tool
2. Verify schema is valid
3. Wait 3-7 days for Google to process
4. Request re-indexing in Search Console

### Issue: Sitemap Not Crawled
**Solution**:
1. Check robots.txt allows crawling
2. Verify sitemap URL is correct
3. Re-submit in Search Console
4. Check for XML syntax errors

### Issue: LCP Still Slow
**Solution**:
1. Verify hero optimization deployed
2. Check image is preloaded
3. Test on real device/network
4. Consider further optimizations

### Issue: Pages Not Indexing
**Solution**:
1. Check robots.txt doesn't block
2. Verify canonical URLs correct
3. Check for noindex meta tags
4. Request indexing in Search Console

---

## 📋 Quick Reference

### Important URLs:
- **Production Site**: https://sco-smb.com
- **Sitemap**: https://sco-smb.com/sitemap.xml
- **Robots**: https://sco-smb.com/robots.txt

### Testing Tools:
- **Rich Results**: https://search.google.com/test/rich-results
- **Schema Validator**: https://validator.schema.org/
- **PageSpeed**: https://pagespeed.web.dev/
- **Mobile-Friendly**: https://search.google.com/test/mobile-friendly

### Monitoring:
- **Search Console**: https://search.google.com/search-console
- **Analytics**: (your GA4 property)
- **Ahrefs**: https://ahrefs.com/

---

## ✅ Final Checklist Before Going Live

- [x] Code committed to repository
- [x] Build passes locally
- [ ] Code reviewed (if team workflow)
- [ ] Merged to main branch
- [ ] Deployed to production
- [ ] Sitemap tested (post-deploy)
- [ ] robots.txt verified (post-deploy)
- [ ] Rich results tested (post-deploy)
- [ ] PageSpeed tested (post-deploy)
- [ ] Search Console configured (post-deploy)
- [ ] Sitemap submitted to Google (post-deploy)

---

## 🎉 Post-Launch Celebration Checklist

Once deployed and verified:
- [ ] Take "before" screenshot of PageSpeed scores
- [ ] Document baseline organic traffic
- [ ] Set calendar reminders for weekly checks
- [ ] Share success metrics with team
- [ ] Plan next content optimization phase

---

**Status**: Ready for Production Deployment ✅  
**Risk Level**: Low  
**Expected Impact**: High  
**Deployment Time**: ~10 minutes (build + deploy)  
**Testing Time**: ~30 minutes (post-deploy validation)

---

**🚀 You're ready to launch! Deploy with confidence.**
