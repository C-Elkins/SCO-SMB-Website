import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Business Tools - ROI Calculator & More | SCO SMB',
  description: 'Free interactive business tools for planning your document scanning infrastructure. Calculate ROI, estimate document volumes, check network bandwidth requirements, and design file naming patterns. Perfect for IT managers and business decision makers.',
  keywords: [
    'ROI calculator',
    'document scanning calculator',
    'network bandwidth calculator',
    'file naming tool',
    'business productivity tools',
    'scanning volume calculator',
    'document management tools',
    'IT planning tools',
  ],
  openGraph: {
    title: 'Free Business Tools - ROI Calculator & More | SCO SMB',
    description: 'Free interactive business tools: ROI Calculator, Document Volume Calculator, Network Bandwidth Calculator, and File Naming Pattern Generator. Plan your document scanning infrastructure.',
    url: 'https://sco-smb.com/tools',
    siteName: 'SCO SMB',
    images: [
      {
        url: 'https://sco-smb.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'SCO SMB - Enterprise Document Scanning Solution',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Business Tools - ROI Calculator & More | SCO SMB',
    description: 'Free interactive business tools for planning your document scanning infrastructure.',
    images: ['https://sco-smb.com/opengraph-image'],
  },
  alternates: {
    canonical: 'https://sco-smb.com/tools',
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Free Business Tools - ROI Calculator & More",
            "description": "Free interactive business tools for planning your document scanning infrastructure. Calculate ROI, estimate document volumes, check network bandwidth requirements, and design file naming patterns.",
            "url": "https://sco-smb.com/tools",
            "isPartOf": {
              "@type": "WebSite",
              "name": "SCO SMB",
              "url": "https://sco-smb.com"
            },
            "mainEntity": {
              "@type": "ItemList",
              "name": "Business Planning Tools",
              "description": "Free interactive calculators and tools for document scanning infrastructure planning",
              "numberOfItems": 4,
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "item": {
                    "@type": "SoftwareApplication",
                    "name": "ROI Calculator",
                    "description": "Calculate return on investment and cost savings with automated document scanning",
                    "applicationCategory": "BusinessApplication",
                    "offers": {
                      "@type": "Offer",
                      "price": "0",
                      "priceCurrency": "USD"
                    }
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "item": {
                    "@type": "SoftwareApplication",
                    "name": "Document Volume Calculator",
                    "description": "Estimate scanning volume and infrastructure requirements based on your team size",
                    "applicationCategory": "BusinessApplication",
                    "offers": {
                      "@type": "Offer",
                      "price": "0",
                      "priceCurrency": "USD"
                    }
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "item": {
                    "@type": "SoftwareApplication",
                    "name": "Network Bandwidth Calculator",
                    "description": "Check if your network infrastructure can handle your scanning volume",
                    "applicationCategory": "BusinessApplication",
                    "offers": {
                      "@type": "Offer",
                      "price": "0",
                      "priceCurrency": "USD"
                    }
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "item": {
                    "@type": "SoftwareApplication",
                    "name": "File Naming Pattern Generator",
                    "description": "Design and preview file naming patterns for automated document organization",
                    "applicationCategory": "BusinessApplication",
                    "offers": {
                      "@type": "Offer",
                      "price": "0",
                      "priceCurrency": "USD"
                    }
                  }
                }
              ]
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "item": {
                    "@id": "https://sco-smb.com",
                    "name": "Home"
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "item": {
                    "@id": "https://sco-smb.com/tools",
                    "name": "Business Tools"
                  }
                }
              ]
            }
          })
        }}
      />
      {children}
    </>
  );
}
