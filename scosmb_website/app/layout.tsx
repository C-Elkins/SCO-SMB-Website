import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./animations.css";
import CriticalStyles from "@/components/CriticalStyles";
import ClientInitializer from "@/components/ClientInitializer";
import ConditionalLayout from "@/components/ConditionalLayout";
import Script from "next/script";
// Analytics removed due to 404 issues
import { SpeedInsights } from "@vercel/speed-insights/next";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import ScrollProgressIndicator from "@/components/ScrollProgressIndicator";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
  adjustFontFallback: false
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sco-smb.com'),
  title: {
    default: "SCO SMB - Enterprise Scanning Solution | South Coast Office",
    template: "%s | SCO SMB - Enterprise Scanning Solution"
  },
  description: "Transform your office productivity with SCO SMB by South Coast Office - the leading enterprise document scanning solution for Kyocera & Sharp multifunction printers. Experience seamless scan-to-computer workflows with automatic file organization, bank-grade security, and zero-configuration network discovery. Trusted by businesses worldwide for efficient document management and workflow automation.",
  keywords: [
    "South Coast Office", "South Coast Office Supply", "SCO SMB", "southcoastoffice.com",
    "document scanning", "Kyocera scanner", "Sharp MFP", "FTP server", 
    "SMB scanning", "enterprise scanning", "network scanner", "automatic organization",
    "printer discovery", "secure scanning", "document management", "office automation",
    "scan to folder", "network printer", "document workflow", "enterprise security",
    "Coos Bay Oregon", "office equipment supplier"
  ],
  authors: [{ name: "South Coast Office" }],
  creator: "South Coast Office",
  publisher: "South Coast Office",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sco-smb.com",
    siteName: "SCO SMB - Enterprise Scanning Solution",
    title: "SCO SMB - Enterprise Scanning Solution | Professional Document Scanning",
    description: "Revolutionize your document workflow with SCO SMB's enterprise scanning solution. Instantly receive scans from Kyocera & Sharp printers directly to your computer with intelligent organization, military-grade security, and effortless setup. Join thousands of businesses optimizing their document processes.",
    images: [
      {
        url: "/screenshots/sco-smb-hero-dashboard.png",
        width: 1200,
        height: 630,
        alt: "SCO SMB Dashboard - Enterprise Document Scanning Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SCO SMB - Enterprise Scanning Solution",
    description: "Enterprise document scanning made simple. Seamlessly connect Kyocera & Sharp printers to your workflow with intelligent organization, robust security, and instant setup. Boost productivity today.",
    images: ["/screenshots/sco-smb-hero-dashboard.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: "https://sco-smb.com",
  },
  icons: {
    icon: [
      { url: '/logos/sco-smb-logo-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/logos/sco-smb-logo-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/logos/sco-smb-icon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/logos/sco-smb-logo-180.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/logos/sco-smb-logo-32.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        {/* Critical CSS inlined */}
        <CriticalStyles />
        {/* PWA Meta Tags */}
        <meta name="theme-color" content="#153B6B" />
        
        {/* Critical CSS for instant rendering */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @font-face{font-family:'Inter';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2) format('woff2')}
            body{margin:0;padding:0;font-family:var(--font-inter),system-ui,-apple-system,sans-serif;font-display:swap}
            .hero-skeleton{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#153B6B 0%,#1e4a7f 50%,#00A8B5 100%)}
            .animate-pulse{animation:pulse 2s cubic-bezier(0.4,0,0.6,1) infinite}
            @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
            .animate-fade-in{animation:fadeIn 0.8s ease-out}
            @keyframes fadeIn{0%{opacity:0;transform:translateY(30px)}100%{opacity:1;transform:translateY(0)}}
            .animate-slide-up{animation:slideUp 0.5s ease-out both}
            @keyframes slideUp{0%{opacity:0;transform:translateY(20px)}100%{opacity:1;transform:translateY(0)}}
            .btn{display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;padding:0.75rem 1.5rem;border-radius:0.5rem;font-weight:600;transition:all 0.2s;text-decoration:none}
            .btn-primary{background:linear-gradient(135deg,#2196F3 0%,#00A8B5 100%);color:white}
            .btn-primary:hover{transform:translateY(-1px);box-shadow:0 10px 25px rgba(33,150,243,0.3)}
            @media (prefers-reduced-motion:reduce){*{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important}}
          `
        }} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SCO SMB" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/logos/sco-smb-logo-180.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logos/sco-smb-logo-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logos/sco-smb-logo-16.png" />
        
        {/* DNS Prefetch - Early DNS resolution for external domains */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preconnect - Establish early connections for critical third parties */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload - High priority critical assets */}
        <link rel="preload" href="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Prefetch - Low priority next navigation targets */}
        <link rel="prefetch" href="/features" as="document" />
        <link rel="prefetch" href="/trial" as="document" />
        <link rel="prefetch" href="/download" as="document" />
        
        {/* AMP alternate */}
        <link rel="amphtml" href="https://sco-smb.com/amp" />
        
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Security headers are now set in next.config.js HTTP headers */}
      </head>
      <body className={`${inter.variable} antialiased bg-white text-neutral-dark`}>
        <ScrollProgressIndicator />
        
        {/* Enhanced JSON-LD Structured Data - Organization Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://sco-smb.com/#organization",
              "name": "South Coast Office",
              "legalName": "South Coast Office Equipment Company",
              "url": "https://sco-smb.com",
              "logo": "https://sco-smb.com/logos/sco-smb-logo-180.png",
              "foundingDate": "1985",
              "description": "Leading provider of enterprise document scanning and management solutions for Kyocera and Sharp printers.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Orange County",
                "addressRegion": "CA",
                "addressCountry": "US"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+1-XXX-XXX-XXXX",
                  "contactType": "sales",
                  "email": "sales@sco-smb.com",
                  "availableLanguage": ["English"],
                  "areaServed": "US"
                },
                {
                  "@type": "ContactPoint",
                  "telephone": "+1-XXX-XXX-XXXX",
                  "contactType": "technical support",
                  "email": "support@sco-smb.com",
                  "availableLanguage": ["English"],
                  "areaServed": "US",
                  "hoursAvailable": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    "opens": "00:00",
                    "closes": "23:59"
                  }
                }
              ],
              "sameAs": [
                "https://www.linkedin.com/company/south-coast-office",
                "https://github.com/C-Elkins/SCO-SMB-Website"
              ]
            })
          }}
        />
        
        {/* Software Application Schema */}
        <Script
          id="software-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "@id": "https://sco-smb.com/#software",
              "name": "SCO SMB",
              "alternateName": "SCO SMB Enterprise Scanning Solution",
              "applicationCategory": "BusinessApplication",
              "applicationSubCategory": "Document Management Software",
              "operatingSystem": ["Windows 10", "Windows 11", "macOS 11+"],
              "description": "Advanced enterprise document scanning solution designed for Kyocera & Sharp multifunction printers. Features intelligent network discovery, military-grade security protocols, automated file organization, and seamless workflow integration.",
              "url": "https://sco-smb.com",
              "downloadUrl": "https://sco-smb.com/download",
              "installUrl": "https://sco-smb.com/download",
              "softwareVersion": "5.0",
              "releaseNotes": "https://sco-smb.com/docs/release-notes",
              "fileSize": "45MB",
              "screenshot": "https://sco-smb.com/screenshots/sco-smb-hero-dashboard.png",
              "softwareRequirements": "Windows 10+ or macOS 11+, 4GB RAM, 500MB disk space",
              "permissions": "Network access for printer discovery",
              "featureList": [
                "Automatic network printer discovery",
                "Zero-configuration setup",
                "Bank-grade AES-256 encryption",
                "Intelligent file organization",
                "Multi-user support",
                "Kyocera and Sharp printer integration",
                "Audit logs and compliance reporting",
                "FTP and SMB protocol support",
                "OCR and metadata extraction",
                "Active Directory integration"
              ],
              "author": {
                "@type": "Organization",
                "@id": "https://sco-smb.com/#organization"
              },
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
              }
            })
          }}
        />
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        {/* Scroll progress bar - GPU-accelerated with passive listener */}
        <div id="scroll-progress" className="fixed top-0 left-0 h-1 bg-accent-teal z-60" style={{transform: 'scaleX(0)', transformOrigin: 'left', willChange: 'transform'}} />
        <Script id="scroll-progress-script" strategy="afterInteractive">{`
          const bar = document.getElementById('scroll-progress');
          let rafId = null;

          const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) : 0;
            bar.style.transform = 'scaleX(' + progress + ')';
            rafId = null;
          };

          const onScroll = () => {
            if (rafId === null) {
              rafId = requestAnimationFrame(updateProgress);
            }
          };

          window.addEventListener('scroll', onScroll, { passive: true });
        `}</Script>
        <ClientInitializer />
        {/* Analytics temporarily disabled */}
        <SpeedInsights />
        <PerformanceMonitor />
        {/* Optimized Service Worker Registration */}
        <Script id="sw-registration" strategy="afterInteractive">{`
          (function() {
            if (!('serviceWorker' in navigator)) return;
            
            const registerSW = () => {
              navigator.serviceWorker.register('/sw-optimized.js', {
                scope: '/',
                updateViaCache: 'none'
              }).then(reg => {
                console.log('SW registered');
                // Update check every 24h
                setInterval(() => reg.update(), 86400000);
              }).catch(err => console.log('SW failed', err));
            };
            
            if ('requestIdleCallback' in window) {
              requestIdleCallback(registerSW, { timeout: 3000 });
            } else {
              setTimeout(registerSW, 1000);
            }
          })();
        `}</Script>
        {/* Core Web Vitals Monitoring */}
        <Script id="web-vitals" strategy="worker">{`
          (function() {
            if (!('PerformanceObserver' in window)) return;
            
            const initVitals = () => {
              const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                  const { entryType, startTime, processingStart, value, hadRecentInput } = entry;
                  if (entryType === 'largest-contentful-paint') {
                    console.log('LCP:', startTime + 'ms');
                  } else if (entryType === 'first-input') {
                    console.log('FID:', (processingStart - startTime) + 'ms');
                  } else if (entryType === 'layout-shift' && !hadRecentInput) {
                    console.log('CLS:', value);
                  }
                });
              });
              observer.observe({entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']});
            };
            
            if ('requestIdleCallback' in window) {
              requestIdleCallback(initVitals, { timeout: 2000 });
            } else {
              setTimeout(initVitals, 500);
            }
          })();
        `}</Script>
      </body>
    </html>
  );
}
