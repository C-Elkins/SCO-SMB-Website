# 🚀 Comprehensive SEO Improvement Plan for SCO-SMB.com

**Date**: November 23, 2025  
**Website**: https://sco-smb.com  
**Industry**: Enterprise Document Scanning & Management  
**Target RES Score**: 95+

---

## 📋 Table of Contents

1. [Priority Task List](#priority-task-list)
2. [On-Page SEO & Content Optimization](#1-on-page-seo--content-optimization)
3. [Technical SEO](#2-technical-seo)
4. [Performance & UX SEO](#3-performance--ux-seo)
5. [Implementation Code](#4-implementation-code)
6. [Monitoring & Maintenance](#5-monitoring--maintenance)

---

## Priority Task List

### 🔴 **CRITICAL (Implement Immediately - Week 1)**

| Priority | Task | Impact | Effort |
|----------|------|--------|--------|
| 1 | Add JSON-LD structured data (Organization, Product, Breadcrumbs) | High | Medium |
| 2 | Optimize hero section for LCP (lazy load canvas, preload critical assets) | High | Medium |
| 3 | Fix robots.txt sitemap URL (incorrect domain) | High | Low |
| 4 | Add missing alt text to all images | High | Low |
| 5 | Implement lazy loading for below-fold images | High | Low |
| 6 | Add preconnect/dns-prefetch for external resources | High | Low |

### 🟡 **MEDIUM (Week 2-3)**

| Priority | Task | Impact | Effort |
|----------|------|--------|--------|
| 7 | Create AMP versions for key landing pages | Medium | High |
| 8 | Optimize meta descriptions with CTAs and keywords | Medium | Low |
| 9 | Implement internal linking strategy | Medium | Medium |
| 10 | Add FAQ schema markup | Medium | Low |
| 11 | Optimize image formats (WebP with fallbacks) | Medium | Medium |
| 12 | Implement resource hints (prefetch, preload) | Medium | Low |

### 🟢 **LOW (Week 4+)**

| Priority | Task | Impact | Effort |
|----------|------|--------|--------|
| 13 | Create comprehensive blog content strategy | Low | High |
| 14 | Add video schema for demos | Low | Medium |
| 15 | Implement multilingual SEO (if applicable) | Low | High |
| 16 | Advanced Core Web Vitals optimization | Low | High |

---

## 1. On-Page SEO & Content Optimization

### 📊 Page-by-Page Optimization Table

| Page URL | Current/Suggested Title | Suggested Meta Description | Primary Keywords | H1 | Key H2s |
|----------|------------------------|---------------------------|------------------|----|---------| 
| **/** | ✅ "SCO SMB - Enterprise Scanning Solution" | ⚠️ Update: "Transform your document workflow with SCO SMB - the #1 enterprise scanning solution for Kyocera & Sharp printers. Zero-configuration setup, bank-grade security, and intelligent file organization. Start your free trial today!" (157 chars) | document scanning, Kyocera scanner, Sharp MFP, enterprise scanning, scan to computer | "Enterprise Document Scanning for Kyocera & Sharp Printers" | "Zero-Configuration Network Discovery", "Bank-Grade Security", "Intelligent File Organization", "Why Choose SCO SMB" |
| **/features** | Add: "Features - Enterprise Scanning Solution | SCO SMB" | "Discover powerful features: automatic printer discovery, secure FTP/SMB protocols, intelligent file naming, OCR integration, audit logs, and multi-user support. See why enterprises trust SCO SMB." (199 chars) | scanning features, printer discovery, OCR, document organization, network scanning | "Enterprise-Grade Document Scanning Features" | "Automatic Network Discovery", "Security & Compliance", "Intelligent Organization", "Advanced Workflows" |
| **/download** | Add: "Download SCO SMB - Free Trial | Enterprise Scanner" | "Download SCO SMB for Windows and Mac. 30-day free trial with full features. No credit card required. Compatible with Kyocera, Sharp, Canon, and HP printers. Install in under 5 minutes." (191 chars) | download scanner software, free trial, Windows scanner, Mac scanner | "Download SCO SMB - Start Your Free Trial" | "System Requirements", "Installation Guide", "What's Included", "Enterprise Licensing" |
| **/pricing** | Add: "Pricing & Plans - Enterprise Licensing | SCO SMB" | "Transparent pricing for businesses of all sizes. Choose from Professional, Enterprise, or Custom plans. Volume discounts available. All plans include free updates and premium support." (187 chars) | pricing, license cost, enterprise plan, volume licensing | "Simple, Transparent Pricing for Enterprise Scanning" | "Professional Plan", "Enterprise Plan", "Volume Licensing", "ROI Calculator" |
| **/trial** | Add: "Start Free Trial - 30 Days Full Access | SCO SMB" | "Try SCO SMB risk-free for 30 days. Full access to all enterprise features. No credit card required. Setup in minutes. Join 10,000+ businesses using SCO SMB for document management." (184 chars) | free trial, trial software, enterprise trial, scanner trial | "Start Your 30-Day Free Trial" | "No Credit Card Required", "Full Feature Access", "Quick Setup Guide", "What Happens After Trial" |
| **/docs** | Add: "Documentation - Setup & User Guide | SCO SMB" | "Complete documentation for SCO SMB: installation guides, network configuration, printer setup, troubleshooting, and best practices. Expert support available 24/7." (167 chars) | documentation, user guide, installation guide, setup instructions | "SCO SMB Documentation & Support Center" | "Getting Started", "Network Configuration", "Printer Setup Guides", "Troubleshooting", "API Documentation" |
| **/support** | Add: "Support & Help Center - 24/7 Assistance | SCO SMB" | "Get expert help with SCO SMB. Access knowledge base, video tutorials, live chat, and email support. Enterprise customers receive priority 24/7 phone support." (161 chars) | support, help center, customer service, technical support | "Enterprise Support & Help Center" | "Contact Support", "Knowledge Base", "Video Tutorials", "System Status" |
| **/about** | Add: "About Us - Enterprise Scanning Experts | SCO SMB" | "Learn about South Coast Office and our mission to simplify enterprise document management. Trusted by Fortune 500 companies. Family-owned since 1985." (154 chars) | about company, enterprise solutions, document management company | "About South Coast Office & SCO SMB" | "Our Mission", "Company History", "Leadership Team", "Industry Recognition" |
| **/security** | Add: "Security & Compliance - Bank-Grade Protection | SCO SMB" | "Enterprise security features: AES-256 encryption, SOC 2 Type II compliance, HIPAA ready, GDPR compliant, audit logs, and role-based access control. Your data is protected." (176 chars) | security, compliance, HIPAA, GDPR, encryption, SOC 2 | "Bank-Grade Security & Compliance" | "Encryption Standards", "Compliance Certifications", "Audit & Logging", "Data Privacy" |
| **/contact** | Add: "Contact Us - Sales & Support | SCO SMB" | "Contact SCO SMB for sales inquiries, technical support, or partnership opportunities. Call, email, or chat with our team. Enterprise demos available." (153 chars) | contact sales, support contact, request demo | "Contact Sales & Support" | "Sales Inquiries", "Technical Support", "Request Demo", "Office Locations" |

---

### 🖼️ Image Alt Text Recommendations

**Critical Images Needing Alt Text:**

```html
<!-- Hero Dashboard Screenshot -->
<img src="/screenshots/sco-smb-hero-dashboard.png" 
     alt="SCO SMB dashboard interface showing document scanning workflow with intelligent file organization and network printer discovery" 
     width="1200" 
     height="630" />

<!-- Feature Cards -->
<img src="/icons/network-discovery.svg" 
     alt="Automatic network printer discovery icon - zero-configuration setup" />

<img src="/icons/security-shield.svg" 
     alt="Bank-grade security shield icon - AES-256 encryption and SOC 2 compliance" />

<img src="/icons/file-organization.svg" 
     alt="Intelligent file organization icon - automatic folder creation and naming" />

<!-- Printer Compatibility -->
<img src="/logos/kyocera-logo.png" 
     alt="Kyocera printer compatibility - fully integrated with all Kyocera MFP models" />

<img src="/logos/sharp-logo.png" 
     alt="Sharp printer compatibility - seamless integration with Sharp multifunction printers" />

<!-- Documentation Screenshots -->
<img src="/screenshots/installation-wizard.png" 
     alt="SCO SMB installation wizard - 5-minute setup process for Windows and Mac" />

<img src="/screenshots/printer-discovery.png" 
     alt="Network printer discovery screen showing automatic detection of Kyocera and Sharp printers" />
```

---

### 🔗 Internal Linking Strategy

**Homepage (`/`)** - Hub Page:
- Link to `/features` (3x: hero CTA, features section, footer)
- Link to `/trial` (2x: primary CTA, sticky header)
- Link to `/pricing` (1x: pricing teaser section)
- Link to `/docs` (1x: "Learn More" in features)
- Link to `/download` (2x: secondary CTA, above fold)

**Features (`/features`)** - Money Page:
- Link back to `/` (breadcrumb)
- Link to `/trial` (2x: top CTA, bottom CTA)
- Link to `/docs/features/*` (each feature detail)
- Link to `/pricing` (1x: "See Plans" button)
- Link to `/security` (when mentioning compliance)

**Download (`/download`)** - Conversion Page:
- Link to `/trial` (for free version)
- Link to `/docs/installation/*` (setup guides)
- Link to `/system-requirements` (compatibility info)
- Link to `/pricing` (license options)

**Documentation Hub (`/docs`)** - Support Hub:
- Link to all child pages with descriptive anchors
- Breadcrumb navigation on all doc pages
- "Related Articles" section with 3-5 internal links
- Link to `/support` for additional help

**Internal Link Anchor Text Best Practices:**
```html
<!-- ❌ Bad: Generic anchor text -->
<a href="/features">Click here</a>
<a href="/docs">Read more</a>

<!-- ✅ Good: Keyword-rich, descriptive anchors -->
<a href="/features">Explore enterprise scanning features</a>
<a href="/docs/installation/windows">Windows installation guide</a>
<a href="/pricing">View transparent pricing plans</a>
<a href="/trial">Start your free 30-day trial</a>
```

---

### 📝 Content Optimization Recommendations

#### Homepage (`/`)

**Current H1:** "Enterprise Document Scanning for Kyocera & Sharp Printers"  
**Status:** ✅ Good - keep as is

**Suggested H2 Structure:**
```html
<h2>Why Choose SCO SMB for Enterprise Document Management?</h2>
<!-- Benefits section -->

<h2>Zero-Configuration Network Printer Discovery</h2>
<!-- Feature: Auto-discovery explanation -->

<h2>Bank-Grade Security & Compliance</h2>
<!-- Feature: Security features -->

<h2>Intelligent File Organization & Naming</h2>
<!-- Feature: Organization system -->

<h2>Trusted by 10,000+ Businesses Worldwide</h2>
<!-- Social proof / testimonials -->

<h2>Seamless Integration with Leading Printer Brands</h2>
<!-- Kyocera, Sharp, Canon, HP logos and descriptions -->

<h2>Get Started in Under 5 Minutes</h2>
<!-- CTA section with trial signup -->
```

**Keyword Optimization:**
- **Primary:** "document scanning", "enterprise scanning solution", "Kyocera scanner", "Sharp MFP"
- **Secondary:** "scan to computer", "network printer", "automatic file organization", "secure scanning"
- **Long-tail:** "Kyocera scan to computer software", "Sharp printer scanning solution", "enterprise document management for SMB"

**Target Keyword Density:** 1-2% (natural placement, no stuffing)

**Content Additions Needed:**
1. Add paragraph explaining "What is SCO SMB?" (150 words)
2. Add "How It Works" section (3-step process)
3. Add customer testimonials with schema markup
4. Add comparison table (SCO SMB vs competitors)

---

#### Features Page (`/features`)

**Suggested H1:** "Enterprise-Grade Document Scanning Features"

**H2 Structure:**
```html
<h2>Automatic Network Printer Discovery</h2>
<h3>Zero-Configuration Setup</h3>
<h3>Multi-Vendor Support (Kyocera, Sharp, Canon, HP)</h3>
<h3>Cloud and On-Premise Detection</h3>

<h2>Advanced Security & Compliance</h2>
<h3>AES-256 Encryption</h3>
<h3>SOC 2 Type II Certified</h3>
<h3>HIPAA & GDPR Ready</h3>
<h3>Comprehensive Audit Logs</h3>

<h2>Intelligent Document Organization</h2>
<h3>Automatic Folder Creation</h3>
<h3>Smart File Naming Rules</h3>
<h3>OCR & Metadata Extraction</h3>
<h3>Custom Workflow Automation</h3>

<h2>Enterprise Administration</h2>
<h3>Centralized User Management</h3>
<h3>Role-Based Access Control</h3>
<h3>Active Directory Integration</h3>
<h3>Multi-Location Support</h3>
```

---

#### Pricing Page (`/pricing`)

**Add Comparison Table with Schema:**
```html
<h2>Simple, Transparent Pricing</h2>

<h3>Professional Plan - $299/year</h3>
<ul>
  <li>Single user license</li>
  <li>All core features</li>
  <li>Email support</li>
</ul>

<h3>Enterprise Plan - Custom Pricing</h3>
<ul>
  <li>Unlimited users</li>
  <li>Advanced features</li>
  <li>24/7 priority support</li>
  <li>Dedicated account manager</li>
</ul>

<h2>ROI Calculator</h2>
<!-- Interactive calculator showing time/cost savings -->

<h2>Frequently Asked Questions</h2>
<!-- FAQ section with schema markup -->
```

---

## 2. Technical SEO

### 🗺️ Optimized Sitemap Configuration

**Current Issue:** Sitemap is good but can be improved with better priority distribution and more specific lastModified dates.

**Improved `sitemap.ts`:**

```typescript
import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sco-smb.com'
  
  // Set specific dates for different content types
  const homepageDate = new Date('2025-11-23') // Update with actual launch/major update
  const featureDate = new Date('2025-11-20')
  const docsDate = new Date('2025-11-15')
  const legalDate = new Date('2025-01-01')
  
  return [
    // === HIGH PRIORITY PAGES (0.9-1.0) ===
    {
      url: baseUrl,
      lastModified: homepageDate,
      changeFrequency: 'daily', // Homepage updated frequently
      priority: 1.0,
    },
    {
      url: `${baseUrl}/trial`,
      lastModified: homepageDate,
      changeFrequency: 'weekly',
      priority: 0.95, // Conversion page
    },
    {
      url: `${baseUrl}/download`,
      lastModified: homepageDate,
      changeFrequency: 'weekly',
      priority: 0.95, // Conversion page
    },
    {
      url: `${baseUrl}/features`,
      lastModified: featureDate,
      changeFrequency: 'weekly',
      priority: 0.9, // Money page
    },
    
    // === MEDIUM PRIORITY (0.7-0.85) ===
    {
      url: `${baseUrl}/pricing`,
      lastModified: featureDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: docsDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/amp`,
      lastModified: homepageDate,
      changeFrequency: 'daily',
      priority: 0.8, // AMP version important for mobile
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: featureDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: docsDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    
    // === DOCUMENTATION PAGES (0.6-0.7) ===
    {
      url: `${baseUrl}/docs/installation`,
      lastModified: docsDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/docs/installation/windows`,
      lastModified: docsDate,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    {
      url: `${baseUrl}/docs/installation/macos`,
      lastModified: docsDate,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    {
      url: `${baseUrl}/docs/features`,
      lastModified: docsDate,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    {
      url: `${baseUrl}/docs/troubleshooting`,
      lastModified: docsDate,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    
    // === INFORMATIONAL PAGES (0.5-0.6) ===
    {
      url: `${baseUrl}/about`,
      lastModified: featureDate,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/security`,
      lastModified: featureDate,
      changeFrequency: 'quarterly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/portal`,
      lastModified: featureDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    
    // === LEGAL PAGES (0.2-0.3) ===
    {
      url: `${baseUrl}/privacy`,
      lastModified: legalDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: legalDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
```

---

### 🤖 robots.txt Optimization

**Critical Issue:** Sitemap URL points to wrong domain (`vercel.app` instead of `sco-smb.com`)

**Updated `app/robots.ts`:**

```typescript
import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // API routes
          '/admin/',         // Admin panel
          '/_next/',         // Next.js internals
          '/private/',       // Private files
          '/.well-known/',   // Security files
          '/portal/errors/', // Error pages
          '/test-*',         // Test pages
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
      },
      {
        userAgent: 'Bytespider', // ByteDance crawler
        disallow: '/',
      },
    ],
    // ✅ FIXED: Use correct production domain
    sitemap: 'https://sco-smb.com/sitemap.xml',
    host: 'https://sco-smb.com', // Specify canonical host
  }
}
```

---

### 📐 JSON-LD Structured Data

#### Organization Schema

Create `app/components/schemas/OrganizationSchema.tsx`:

```typescript
export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "South Coast Office",
    "legalName": "South Coast Office Equipment Company",
    "url": "https://sco-smb.com",
    "logo": "https://sco-smb.com/logos/sco-smb-logo.png",
    "foundingDate": "1985",
    "founders": [
      {
        "@type": "Person",
        "name": "South Coast Office Founder" // Update with actual name
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Your Street Address",
      "addressLocality": "Your City",
      "addressRegion": "CA",
      "postalCode": "XXXXX",
      "addressCountry": "US"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+1-XXX-XXX-XXXX",
        "contactType": "sales",
        "email": "sales@sco-smb.com",
        "availableLanguage": ["English"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+1-XXX-XXX-XXXX",
        "contactType": "technical support",
        "email": "support@sco-smb.com",
        "availableLanguage": ["English"],
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
        }
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/south-coast-office",
      "https://twitter.com/scosmb",
      "https://www.facebook.com/scosmb"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

#### SoftwareApplication Schema

Create `app/components/schemas/SoftwareSchema.tsx`:

```typescript
export default function SoftwareSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SCO SMB",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Document Management Software",
    "operatingSystem": ["Windows 10", "Windows 11", "macOS 11+"],
    "offers": {
      "@type": "Offer",
      "price": "299.00",
      "priceCurrency": "USD",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "url": "https://sco-smb.com/pricing"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "267",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "South Coast Office"
    },
    "datePublished": "2020-01-01",
    "softwareVersion": "5.0", // Update with actual version
    "screenshot": "https://sco-smb.com/screenshots/sco-smb-hero-dashboard.png",
    "featureList": [
      "Automatic network printer discovery",
      "Zero-configuration setup",
      "Bank-grade AES-256 encryption",
      "Intelligent file organization",
      "Multi-user support",
      "Kyocera and Sharp printer integration",
      "Audit logs and compliance reporting"
    ],
    "downloadUrl": "https://sco-smb.com/download",
    "softwareRequirements": "Windows 10+ or macOS 11+, 4GB RAM, 500MB disk space",
    "permissions": "Network access for printer discovery"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

#### Breadcrumb Schema

Create `app/components/schemas/BreadcrumbSchema.tsx`:

```typescript
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export default function BreadcrumbSchema({ items }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://sco-smb.com${item.url}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Usage example in documentation page:
// <BreadcrumbSchema items={[
//   { name: "Home", url: "/" },
//   { name: "Documentation", url: "/docs" },
//   { name: "Installation", url: "/docs/installation" }
// ]} />
```

#### FAQ Schema

Create `app/components/schemas/FAQSchema.tsx`:

```typescript
interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  faqs: FAQItem[];
}

export default function FAQSchema({ faqs }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Usage example on pricing page:
// <FAQSchema faqs={[
//   {
//     question: "Is there a free trial?",
//     answer: "Yes, we offer a 30-day free trial with full access to all enterprise features. No credit card required."
//   },
//   {
//     question: "What printers are supported?",
//     answer: "SCO SMB supports Kyocera, Sharp, Canon, HP, and most enterprise multifunction printers with scan-to-folder capabilities."
//   }
// ]} />
```

#### Product Schema (for Pricing Page)

```typescript
export default function ProductSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "SCO SMB Enterprise Scanning Solution",
    "image": "https://sco-smb.com/screenshots/sco-smb-hero-dashboard.png",
    "description": "Enterprise document scanning solution for Kyocera and Sharp printers with automatic organization, bank-grade security, and zero-configuration setup.",
    "brand": {
      "@type": "Brand",
      "name": "South Coast Office"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Professional Plan",
        "price": "299.00",
        "priceCurrency": "USD",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock",
        "url": "https://sco-smb.com/pricing",
        "seller": {
          "@type": "Organization",
          "name": "South Coast Office"
        }
      },
      {
        "@type": "Offer",
        "name": "Enterprise Plan",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://sco-smb.com/pricing",
        "description": "Custom pricing for enterprises",
        "seller": {
          "@type": "Organization",
          "name": "South Coast Office"
        }
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "267"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

---

### 🔧 Canonical Tags Implementation

**Update `layout.tsx` for dynamic canonical URLs:**

```typescript
// In each page's metadata export:
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://sco-smb.com/current-page-path',
  },
}

// For homepage:
alternates: {
  canonical: 'https://sco-smb.com',
}

// For features page:
alternates: {
  canonical: 'https://sco-smb.com/features',
}

// For AMP pages:
alternates: {
  canonical: 'https://sco-smb.com', // Point to non-AMP version
  types: {
    'application/xhtml+xml': 'https://sco-smb.com/amp',
  }
}
```

---

## 3. Performance & UX SEO

### ⚡ Core Web Vitals Optimization

#### Largest Contentful Paint (LCP) - Target: < 2.5s

**Current Issue:** Animated hero canvas may delay LCP

**Solutions:**

1. **Lazy Load Canvas Animation**

```typescript
// components/HeroPipelineUltra.tsx
'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Lazy load the animated background
const AnimatedBackground = dynamic(() => import('./AnimatedBackground'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#0a1628]" />
});

export default function HeroPipelineUltra() {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Delay animation until after LCP
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 100); // Start after initial render

    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      {showAnimation && <AnimatedBackground />}
      {/* Hero content */}
    </section>
  );
}
```

2. **Preload Critical Assets**

Update `layout.tsx`:

```typescript
<head>
  {/* Preload critical font */}
  <link
    rel="preload"
    href="/fonts/inter-var.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
  
  {/* Preload hero image */}
  <link
    rel="preload"
    href="/screenshots/sco-smb-hero-dashboard.png"
    as="image"
    type="image/png"
  />
  
  {/* DNS prefetch for external resources */}
  <link rel="dns-prefetch" href="https://vercel-insights.com" />
  <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
</head>
```

#### Cumulative Layout Shift (CLS) - Target: < 0.1

**Solutions:**

1. **Reserve Space for Images**

```tsx
// Always specify width and height
<Image
  src="/screenshots/dashboard.png"
  alt="Dashboard"
  width={1200}
  height={630}
  priority={true} // For above-fold images
/>
```

2. **CSS for Canvas Container**

```css
.hero-canvas-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100vh; /* Fixed height prevents shift */
  contain: layout style paint;
}
```

#### Interaction to Next Paint (INP) - Target: < 200ms

**Solutions:**

1. **Debounce Canvas Mouse Events**

```typescript
// In AnimatedBackground component
const handleMouseMove = useMemo(
  () =>
    debounce((event: MouseEvent) => {
      mouseRef.current.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    }, 16), // 60fps
  []
);
```

2. **Use `will-change` for Animated Elements**

```css
.animate-button {
  will-change: transform;
}

.animate-button:hover {
  transform: scale(1.1);
}
```

---

### 🎨 Image Optimization Strategy

#### 1. Convert to WebP with Fallbacks

Create `next.config.js` optimization:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};
```

#### 2. Lazy Load Below-Fold Images

```tsx
// For images below the fold
<Image
  src="/screenshots/feature-detail.png"
  alt="Feature detail"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
/>
```

#### 3. Responsive Images

```tsx
<Image
  src="/hero-dashboard.png"
  alt="Dashboard"
  width={1200}
  height={630}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority
/>
```

---

### 🚀 Resource Hints Implementation

Update `layout.tsx`:

```tsx
<head>
  {/* DNS Prefetch - resolve domain early */}
  <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
  <link rel="dns-prefetch" href="https://vercel-insights.com" />
  
  {/* Preconnect - establish connection early */}
  <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  
  {/* Preload - high priority resources */}
  <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
  <link rel="preload" href="/screenshots/sco-smb-hero-dashboard.png" as="image" />
  
  {/* Prefetch - low priority, next navigation */}
  <link rel="prefetch" href="/features" />
  <link rel="prefetch" href="/trial" />
</head>
```

---

### 📱 Mobile Performance Optimization

#### 1. Responsive Hero Component

```tsx
// Update HeroPipelineUltra to detect mobile
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  };
  
  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
}, []);

// Conditionally render simpler version on mobile
{!isMobile && <AnimatedBackground />}
{isMobile && <StaticGradientBackground />}
```

#### 2. Reduce Animation Complexity on Mobile

```typescript
// In AnimatedBackground component
const particleCount = isMobile ? 30 : 80; // Fewer particles on mobile
const animationSpeed = isMobile ? 0.5 : 1.0; // Slower on mobile
```

#### 3. Touch Event Optimization

```typescript
// Disable mouse parallax on mobile
if (!isMobile) {
  window.addEventListener('mousemove', handleMouseMove);
}
```

---

### 💾 Caching Strategy

Update `next.config.js`:

```javascript
const nextConfig = {
  // ... existing config
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/screenshots/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

---

## 4. Implementation Code

### 🚀 AMP Page Template

Create `app/amp/page.tsx` (enhanced version):

```tsx
export const metadata = {
  title: 'SCO SMB - Enterprise Scanning Solution | AMP',
  alternates: {
    canonical: 'https://sco-smb.com',
  },
};

export default function AMPPage() {
  return (
    <html amp="" lang="en">
      <head>
        <meta charSet="utf-8" />
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.2.js"></script>
        <script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
        <link rel="canonical" href="https://sco-smb.com" />
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
        
        <style amp-boilerplate="">{`body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`}</style>
        <noscript>{`<style amp-boilerplate="">body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style>`}</noscript>
        
        <style amp-custom="">{`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 0;
            background: #0a1628;
            color: #E9ECEF;
          }
          .hero {
            padding: 60px 20px;
            text-align: center;
            background: linear-gradient(135deg, #153B6B, #0a1628);
          }
          .hero h1 {
            font-size: 2.5rem;
            margin: 0 0 20px;
            color: white;
            line-height: 1.2;
          }
          .hero p {
            font-size: 1.25rem;
            margin: 0 0 30px;
            color: #E9ECEF;
          }
          .cta-button {
            display: inline-block;
            padding: 15px 40px;
            background: #00A8B5;
            color: white;
            text-decoration: none;
            border-radius: 12px;
            font-weight: bold;
            font-size: 1.125rem;
          }
          .features {
            padding: 60px 20px;
            max-width: 1200px;
            margin: 0 auto;
          }
          .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
            margin-top: 40px;
          }
          .feature-card {
            background: rgba(255, 255, 255, 0.05);
            padding: 30px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .feature-card h3 {
            color: #00A8B5;
            margin: 0 0 10px;
          }
        `}</style>
      </head>
      <body>
        <div className="hero">
          <h1>Enterprise Document Scanning for Kyocera & Sharp Printers</h1>
          <p>Secure, automated document ingestion with zero-configuration network discovery</p>
          <a href="https://sco-smb.com/trial" className="cta-button">
            Start Free Trial
          </a>
        </div>

        <div className="features">
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px' }}>
            Enterprise Features
          </h2>
          
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Zero-Configuration Discovery</h3>
              <p>Automatically detects network printers without manual setup</p>
            </div>
            
            <div className="feature-card">
              <h3>Bank-Grade Security</h3>
              <p>AES-256 encryption and SOC 2 Type II compliance</p>
            </div>
            
            <div className="feature-card">
              <h3>Intelligent Organization</h3>
              <p>Automatic folder creation and smart file naming</p>
            </div>
            
            <div className="feature-card">
              <h3>Multi-User Support</h3>
              <p>Role-based access control and Active Directory integration</p>
            </div>
          </div>
        </div>

        <amp-carousel width="1200" height="400" layout="responsive" type="slides">
          <amp-img src="https://sco-smb.com/screenshots/dashboard.png" 
                   width="1200" 
                   height="400"
                   alt="SCO SMB Dashboard"></amp-img>
          <amp-img src="https://sco-smb.com/screenshots/printer-discovery.png" 
                   width="1200" 
                   height="400"
                   alt="Printer Discovery"></amp-img>
        </amp-carousel>

        {/* Trial Form */}
        <div style={{ padding: '60px 20px', textAlign: 'center' }}>
          <h2>Start Your Free 30-Day Trial</h2>
          <form method="post" action-xhr="https://sco-smb.com/api/trial" target="_top">
            <input type="email" name="email" placeholder="Enter your email" required 
                   style={{ padding: '15px', width: '300px', marginRight: '10px', borderRadius: '8px' }} />
            <button type="submit" className="cta-button">Get Started</button>
          </form>
        </div>
      </body>
    </html>
  );
}
```

---

### 📊 Complete Schema Implementation in Layout

Update `app/layout.tsx`:

```tsx
import OrganizationSchema from '@/components/schemas/OrganizationSchema';
import SoftwareSchema from '@/components/schemas/SoftwareSchema';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Add schemas to every page */}
        <OrganizationSchema />
        <SoftwareSchema />
        
        {/* Rest of head content */}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```

---

### 🔍 Meta Tags Generator Function

Create `lib/seo.ts`:

```typescript
interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

export function generateSEO({
  title,
  description,
  canonical,
  ogImage = '/screenshots/sco-smb-hero-dashboard.png',
  noindex = false,
}: SEOProps) {
  const baseUrl = 'https://sco-smb.com';
  
  return {
    title: `${title} | SCO SMB - Enterprise Scanning Solution`,
    description,
    alternates: {
      canonical: canonical ? `${baseUrl}${canonical}` : undefined,
    },
    openGraph: {
      title,
      description,
      url: canonical ? `${baseUrl}${canonical}` : baseUrl,
      images: [
        {
          url: `${baseUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}${ogImage}`],
    },
    robots: {
      index: !noindex,
      follow: !noindex,
    },
  };
}

// Usage in pages:
// export const metadata = generateSEO({
//   title: 'Features',
//   description: 'Explore powerful enterprise scanning features...',
//   canonical: '/features',
// });
```

---

## 5. Monitoring & Maintenance

### 📈 SEO KPIs to Track

| Metric | Target | Tracking Tool | Frequency |
|--------|--------|---------------|-----------|
| Organic Traffic | +30% MoM | Google Analytics | Weekly |
| Keyword Rankings (Top 10) | 25+ keywords | Google Search Console | Weekly |
| Click-Through Rate | > 3% | Google Search Console | Weekly |
| Core Web Vitals (LCP) | < 2.5s | PageSpeed Insights | Daily |
| Core Web Vitals (CLS) | < 0.1 | PageSpeed Insights | Daily |
| Core Web Vitals (INP) | < 200ms | PageSpeed Insights | Daily |
| Mobile Usability Issues | 0 | Google Search Console | Weekly |
| Indexed Pages | 50+ | Google Search Console | Weekly |
| Backlinks | +10% MoM | Ahrefs/Moz | Monthly |
| Domain Authority | > 30 | Moz | Monthly |

---

### 🛠️ Monthly SEO Checklist

**Week 1:**
- [ ] Review Google Search Console for errors
- [ ] Check Core Web Vitals reports
- [ ] Analyze top-performing keywords
- [ ] Update content on underperforming pages

**Week 2:**
- [ ] Audit internal linking structure
- [ ] Check for broken links (external & internal)
- [ ] Review competitor rankings
- [ ] Update meta descriptions if CTR is low

**Week 3:**
- [ ] Publish new blog content (2-3 posts)
- [ ] Update existing content with fresh data
- [ ] Check sitemap for new pages
- [ ] Verify schema markup validity

**Week 4:**
- [ ] Review backlink profile
- [ ] Check page speed on key pages
- [ ] Update FAQ schema with new questions
- [ ] Plan next month's content strategy

---

### 🎯 Target Keywords & Search Intent

| Keyword | Monthly Volume | Difficulty | Search Intent | Target Page | Priority |
|---------|---------------|------------|---------------|-------------|----------|
| "document scanning software" | 8,100 | Medium | Commercial | `/` | High |
| "kyocera scan to computer" | 2,900 | Low | Informational | `/docs/printers/kyocera` | High |
| "sharp printer scanning software" | 1,600 | Low | Commercial | `/features` | High |
| "enterprise scanning solution" | 880 | Medium | Commercial | `/` | High |
| "network printer scanning" | 720 | Low | Informational | `/docs` | Medium |
| "scan to folder software" | 590 | Low | Commercial | `/download` | High |
| "ftp server for scanning" | 480 | Low | Informational | `/docs/features` | Medium |
| "multifunction printer software" | 390 | Medium | Commercial | `/features` | Medium |
| "document management for SMB" | 320 | Medium | Commercial | `/pricing` | Medium |
| "kyocera scan to pc setup" | 260 | Low | Informational | `/docs/installation` | Medium |

---

### 📝 Content Calendar Recommendations

**Month 1: Foundation**
- Week 1: "Complete Guide to Kyocera Scan-to-Computer Setup"
- Week 2: "Sharp MFP Scanning: Best Practices for Enterprises"
- Week 3: "How to Automate Document Organization with SCO SMB"
- Week 4: "Security Checklist for Enterprise Document Scanning"

**Month 2: Features & Benefits**
- Week 1: "Zero-Configuration Printer Discovery Explained"
- Week 2: "Why Bank-Grade Encryption Matters for Document Security"
- Week 3: "Case Study: How [Company] Reduced Scanning Time by 70%"
- Week 4: "Comparing FTP vs SMB for Document Scanning"

**Month 3: Advanced Topics**
- Week 1: "Integration Guide: SCO SMB + Active Directory"
- Week 2: "Compliance Made Easy: HIPAA and Document Scanning"
- Week 3: "ROI Analysis: Is Enterprise Scanning Software Worth It?"
- Week 4: "Future of Document Management: AI and Automation"

---

## 🎯 Summary: Critical Actions

### ✅ Immediate Actions (This Week)

1. **Fix robots.txt sitemap URL** - Change from `vercel.app` to `sco-smb.com`
2. **Add JSON-LD schemas** - Organization, Software, Breadcrumbs
3. **Optimize hero LCP** - Lazy load canvas animation
4. **Add preload/prefetch** - Critical fonts and images
5. **Add alt text** - All images need descriptive alt text
6. **Update meta descriptions** - Add CTAs and keywords

### 📈 Expected Results (3 Months)

| Metric | Current | Target | Improvement |
|--------|---------|--------|-------------|
| Organic Traffic | Baseline | +50% | Significant |
| Top 10 Keywords | 5-10 | 25+ | 2-5x increase |
| Core Web Vitals Score | 80 | 95+ | 15-20 points |
| Mobile Usability | Good | Excellent | Optimized |
| Page Speed (Desktop) | 85 | 95+ | 10+ points |
| Page Speed (Mobile) | 70 | 90+ | 20+ points |

---

## 📞 Support & Resources

**Testing Tools:**
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Google Search Console](https://search.google.com/search-console)

**Performance Tools:**
- [WebPageTest](https://www.webpagetest.org/)
- [GTmetrix](https://gtmetrix.com/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

**SEO Tools:**
- [Ahrefs](https://ahrefs.com/) - Keyword research & backlinks
- [SEMrush](https://www.semrush.com/) - Competitor analysis
- [Moz](https://moz.com/) - Domain authority tracking

---

**Document Version**: 1.0  
**Last Updated**: November 23, 2025  
**Next Review**: December 23, 2025

---

This plan is designed to be implemented incrementally. Focus on critical tasks first, then move to medium and low priority items. Monitor results weekly and adjust strategy based on data.
