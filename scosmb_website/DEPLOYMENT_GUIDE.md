# Deployment & Testing Guide

## 🚀 Quick Deployment Steps

### 1. Pre-Deployment Checklist
```bash
# Navigate to project directory
cd /Users/chaseelkins/Documents/SCOSMB-Website/scosmb_website

# Install dependencies (if needed)
npm install

# Run type check
npm run type-check  # or: npx tsc --noEmit

# Build the project
npm run build

# Test production build locally
npm start
```

### 2. Verify Local Build
Open browser to `http://localhost:3000` and check:
- [ ] Homepage loads correctly
- [ ] Tools page shows all 4 calculators
- [ ] Sliders are interactive
- [ ] Favicon appears in browser tab
- [ ] Test routes:
  - http://localhost:3000/icon (should show 32x32 favicon PNG)
  - http://localhost:3000/apple-icon (should show 180x180 PNG)
  - http://localhost:3000/opengraph-image (should show 1200x630 PNG)

### 3. Mobile Testing (Before Deploy)
Use Chrome DevTools Device Emulation:
1. Open DevTools (F12)
2. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
3. Test these devices:
   - iPhone SE (375x667)
   - iPhone 12 Pro (390x844)
   - iPad Air (820x1180)
   - Galaxy S20 (360x800)

Check:
- [ ] Sliders work with mouse drag
- [ ] Buttons are easy to click
- [ ] Text is readable (no tiny fonts)
- [ ] No horizontal scroll
- [ ] Grid layouts stack properly on mobile

### 4. Deploy to Vercel
```bash
# If using Vercel CLI
vercel --prod

# Or push to main branch (if auto-deploy is configured)
git add .
git commit -m "SEO & mobile optimization: favicon, metadata, touch controls"
git push origin main
```

### 5. Post-Deployment Verification (Critical)

#### A. Favicon Check
```bash
# Test these URLs in browser (replace with your domain):
https://sco-smb.com/icon
https://sco-smb.com/apple-icon
https://sco-smb.com/opengraph-image
```

Expected results:
- `/icon` → Returns 32x32 PNG with "SCO" text on brand gradient
- `/apple-icon` → Returns 180x180 PNG with "SCO SMB" text
- `/opengraph-image` → Returns 1200x630 PNG with brand design

#### B. Mobile Responsiveness
Test on real devices if possible:
- [ ] iPhone (any model)
- [ ] Android phone
- [ ] Tablet

Or use online tools:
- BrowserStack: https://www.browserstack.com/
- LambdaTest: https://www.lambdatest.com/
- Responsively App: https://responsively.app/

#### C. SEO Verification

**Google Search Console:**
1. Go to: https://search.google.com/search-console
2. Submit sitemap: https://sco-smb.com/sitemap.xml
3. Request indexing for homepage and /tools page
4. Check "URL Inspection" tool for both pages

**PageSpeed Insights:**
1. Visit: https://pagespeed.web.dev/
2. Test: https://sco-smb.com
3. Test: https://sco-smb.com/tools
4. Target: 90+ mobile, 95+ desktop

**Rich Results Test:**
1. Visit: https://search.google.com/test/rich-results
2. Test homepage URL
3. Verify Organization and SoftwareApplication schemas detected
4. Test tools page URL
5. Verify WebPage schema with ItemList detected

**OpenGraph Preview:**
- Facebook: https://developers.facebook.com/tools/debug/
  - Enter: https://sco-smb.com
  - Click "Scrape Again" to refresh
  - Verify OG image appears
- Twitter: https://cards-dev.twitter.com/validator
  - Enter: https://sco-smb.com
  - Verify card preview shows correctly

#### D. Lighthouse Audit
```bash
# Run Lighthouse from Chrome DevTools:
# 1. Open https://sco-smb.com in Chrome
# 2. Open DevTools (F12)
# 3. Go to "Lighthouse" tab
# 4. Select "Mobile" device
# 5. Check all categories
# 6. Click "Analyze page load"
```

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

Repeat for Desktop mode.

### 6. Monitor for Issues

#### First 24 Hours
- [ ] Check error logs in Vercel dashboard
- [ ] Monitor Google Search Console for crawl errors
- [ ] Test favicon appears in various browsers:
  - Chrome (Windows/Mac)
  - Safari (Mac/iOS)
  - Firefox (Windows/Mac)
  - Edge (Windows)
- [ ] Verify mobile experience on real devices

#### First Week
- [ ] Check Google Search Console for indexing status
- [ ] Monitor "Coverage" report for any errors
- [ ] Verify sitemap is being processed
- [ ] Check "Mobile Usability" report
- [ ] Monitor Core Web Vitals

#### First Month
- [ ] Track search impressions growth
- [ ] Monitor click-through rate from search
- [ ] Check average position for key terms:
  - "SCO SMB"
  - "document scanning software"
  - "Kyocera scanning software"
  - "Sharp printer scanning"
- [ ] Review user behavior in analytics
- [ ] Collect user feedback on mobile experience

## 🐛 Troubleshooting

### Favicon Not Showing
**Problem:** Browser tab doesn't show favicon

**Solutions:**
1. Clear browser cache: Ctrl+Shift+Delete
2. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. Check /icon route directly: https://sco-smb.com/icon
4. Verify build output includes icon route
5. Check Vercel function logs for errors
6. Wait 5-10 minutes for CDN propagation

### Mobile Sliders Not Working
**Problem:** Can't drag sliders on mobile

**Solutions:**
1. Check CSS: `touch-action: pan-x` is applied
2. Verify thumb size is 32px on mobile
3. Test in real device (simulators can be buggy)
4. Check if JavaScript is blocked
5. Verify no CSS `pointer-events: none` on sliders

### Metadata Not Showing in Social Shares
**Problem:** OpenGraph image doesn't appear when sharing

**Solutions:**
1. Test /opengraph-image route directly
2. Use Facebook Sharing Debugger to scrape again
3. Verify image is 1200x630 and < 8MB
4. Check meta tags in page source (View Page Source)
5. Wait 24 hours for social media caches to clear
6. Add `og:image:width` and `og:image:height` if needed

### Search Console Errors
**Problem:** "Page not indexed" or crawl errors

**Solutions:**
1. Request manual indexing via URL Inspection
2. Check robots.txt: https://sco-smb.com/robots.txt
3. Verify sitemap is valid XML
4. Check for canonical URL conflicts
5. Ensure no "noindex" meta tags accidentally added
6. Wait 3-7 days for Google to recrawl

### Performance Issues
**Problem:** Lighthouse score below 90

**Solutions:**
1. Check for large images (should be optimized)
2. Verify animations use `transform` not `top/left`
3. Check for layout shifts (CLS)
4. Ensure critical CSS is loaded first
5. Verify JavaScript bundles are code-split
6. Check Time to Interactive (TTI)

### Mobile Layout Broken
**Problem:** Content overflows or stacks incorrectly

**Solutions:**
1. Verify viewport meta tag is present
2. Check responsive utility classes (md:, sm:)
3. Test grid-cols-1 on mobile
4. Ensure no fixed widths in pixels
5. Check safe area insets for notched devices
6. Verify font sizes are appropriate (16px minimum)

## 📞 Support Resources

### Documentation
- Next.js Metadata: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Next.js ImageResponse: https://nextjs.org/docs/app/api-reference/functions/image-response
- Vercel Deployment: https://vercel.com/docs/deployments/overview

### Testing Tools
- Google Search Console: https://search.google.com/search-console
- PageSpeed Insights: https://pagespeed.web.dev/
- Rich Results Test: https://search.google.com/test/rich-results
- Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
- Lighthouse CI: https://github.com/GoogleChrome/lighthouse-ci

### Community
- Next.js Discussions: https://github.com/vercel/next.js/discussions
- Vercel Discord: https://vercel.com/discord
- Web.dev: https://web.dev/

## ✅ Deployment Complete Checklist

Before marking as complete, verify:
- [ ] Build completes without errors
- [ ] All TypeScript checks pass
- [ ] Favicon loads at /icon route
- [ ] Apple icon loads at /apple-icon route
- [ ] OG image loads at /opengraph-image route
- [ ] Homepage metadata is correct
- [ ] Tools page metadata is correct
- [ ] Sitemap includes all pages
- [ ] Robots.txt is correct
- [ ] Mobile layout works on 3+ screen sizes
- [ ] Sliders work on touch devices
- [ ] All links work correctly
- [ ] No console errors in browser
- [ ] Google Search Console sitemap submitted
- [ ] OpenGraph images verified in Facebook debugger
- [ ] Lighthouse mobile score 90+
- [ ] Lighthouse desktop score 95+

## 🎯 Success Criteria

### Immediate (Day 1)
- ✅ Site deploys successfully
- ✅ No 404 errors
- ✅ Favicon appears in browser
- ✅ Mobile layout renders correctly
- ✅ All calculators functional

### Short Term (Week 1)
- ✅ Google indexes homepage
- ✅ Google indexes /tools page
- ✅ Sitemap processed in Search Console
- ✅ No mobile usability issues
- ✅ Core Web Vitals pass

### Medium Term (Month 1)
- ✅ Favicon appears in Google search results
- ✅ Rich snippets appear (ratings, etc.)
- ✅ Mobile traffic increases
- ✅ Bounce rate improves
- ✅ Tools page ranking for keywords

## 📈 Expected Timeline

| Milestone | Expected Time |
|-----------|--------------|
| Deployment complete | Immediate |
| Favicon in browser | Immediate |
| Mobile layout working | Immediate |
| Google crawls site | 1-3 days |
| Pages indexed | 3-7 days |
| Favicon in search results | 7-14 days |
| Rich results appear | 14-30 days |
| Ranking improvements | 30-90 days |

Remember: SEO is a long-term game. Don't panic if changes aren't immediate!
