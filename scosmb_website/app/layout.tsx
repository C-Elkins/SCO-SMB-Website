import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sco-smb-website.vercel.app'),
  title: {
    default: "SCO SMB - Enterprise Scanning Solution | South Coast Office",
    template: "%s | SCO SMB - Enterprise Scanning Solution"
  },
  description: "Professional document scanning for Kyocera & Sharp printers. Receive scans directly to your computer with automatic organization, security, and enterprise features. Zero configuration network discovery.",
  keywords: [
    "document scanning", "Kyocera scanner", "Sharp MFP", "FTP server", 
    "SMB scanning", "enterprise scanning", "network scanner", "automatic organization",
    "printer discovery", "secure scanning", "document management", "office automation",
    "scan to folder", "network printer", "document workflow", "enterprise security"
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
    url: "https://sco-smb-website.vercel.app",
    siteName: "SCO SMB - Enterprise Scanning Solution",
    title: "SCO SMB - Enterprise Scanning Solution | Professional Document Scanning",
    description: "Professional document scanning for Kyocera & Sharp printers. Receive scans directly to your computer with automatic organization, security, and enterprise features.",
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
    description: "Professional document scanning for Kyocera & Sharp printers with automatic organization and enterprise security.",
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
    canonical: "https://sco-smb-website.vercel.app",
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
        {/* PWA Meta Tags */}
        <meta name="theme-color" content="#153B6B" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SCO SMB" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/logos/sco-smb-logo-180.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logos/sco-smb-logo-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logos/sco-smb-logo-16.png" />
        
        {/* Performance Optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//vercel.com" />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body className={`${inter.variable} antialiased bg-white text-neutral-dark`}>        
        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "SCO SMB",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": ["macOS", "Windows"],
              "description": "Professional document scanning solution for Kyocera & Sharp printers with automatic network discovery, enterprise security, and automatic file organization.",
              "url": "https://sco-smb-website.vercel.app",
              "downloadUrl": "https://sco-smb-website.vercel.app/download",
              "author": {
                "@type": "Organization",
                "name": "South Coast Office",
                "url": "https://sco-smb-website.vercel.app"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "validFrom": "2024-01-01"
              },
              "featureList": [
                "Network Scanner Discovery",
                "Enterprise Security",
                "Automatic Organization",
                "Auto-Update System",
                "Multi-Protocol Support",
                "Scan History",
                "Cross-Platform Support"
              ],
              "screenshot": "https://sco-smb-website.vercel.app/screenshots/sco-smb-hero-dashboard.png"
            })
          }}
        />
        <Header />
        <main id="content" className="min-h-screen">
          {children}
        </main>
        <Footer />
        {/* Scroll progress bar */}
        <div id="scroll-progress" className="fixed top-0 left-0 h-1 bg-accent-teal z-60" style={{width:'0%'}} />
        <Script id="scroll-progress-script" strategy="afterInteractive">{`
          const bar = document.getElementById('scroll-progress');
          const onScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = progress + '%';
          };
          window.addEventListener('scroll', onScroll);
        `}</Script>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
