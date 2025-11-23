/**
 * SEO Utility Functions
 * Helpers for generating optimized metadata across pages
 */

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  keywords?: string[];
}

/**
 * Generate comprehensive SEO metadata for any page
 * @param props - SEO configuration object
 * @returns Next.js Metadata object
 */
export function generateSEO({
  title,
  description,
  canonical,
  ogImage = '/screenshots/sco-smb-hero-dashboard.png',
  noindex = false,
  keywords = [],
}: SEOProps) {
  const baseUrl = 'https://sco-smb.com';
  const fullTitle = `${title} | SCO SMB - Enterprise Scanning Solution`;
  
  return {
    title: fullTitle,
    description,
    keywords: [
      'document scanning',
      'Kyocera scanner',
      'Sharp MFP',
      'enterprise scanning',
      ...keywords,
    ],
    alternates: {
      canonical: canonical ? `${baseUrl}${canonical}` : undefined,
    },
    openGraph: {
      title,
      description,
      url: canonical ? `${baseUrl}${canonical}` : baseUrl,
      siteName: 'SCO SMB - Enterprise Scanning Solution',
      images: [
        {
          url: `${baseUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${baseUrl}${ogImage}`],
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Generate image alt text following SEO best practices
 * @param context - Description of what the image shows
 * @param keywords - Relevant keywords to include naturally
 */
export function generateAltText(context: string, keywords: string[] = []): string {
  const keywordPhrase = keywords.length > 0 ? ` - ${keywords.join(', ')}` : '';
  return `${context}${keywordPhrase}`;
}

/**
 * Format meta description with optimal length (150-160 chars)
 * Adds CTA if space permits
 */
export function formatMetaDescription(description: string, cta?: string): string {
  const maxLength = 158;
  const ctaText = cta || 'Learn more.';
  
  if (description.length + ctaText.length + 1 <= maxLength) {
    return `${description} ${ctaText}`;
  }
  
  if (description.length <= maxLength) {
    return description;
  }
  
  return description.substring(0, maxLength - 3) + '...';
}

/**
 * Generate breadcrumb structure for schema markup
 */
export function generateBreadcrumbs(items: Array<{ name: string; url: string }>) {
  return items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `https://sco-smb.com${item.url}`,
  }));
}

/**
 * Common SEO keywords by category
 */
export const SEO_KEYWORDS = {
  scanning: [
    'document scanning',
    'network scanner',
    'scan to computer',
    'scan to folder',
    'enterprise scanning',
  ],
  printers: [
    'Kyocera scanner',
    'Sharp MFP',
    'multifunction printer',
    'network printer',
    'printer discovery',
  ],
  features: [
    'automatic organization',
    'secure scanning',
    'OCR',
    'document management',
    'workflow automation',
  ],
  protocols: [
    'FTP server',
    'SMB scanning',
    'network protocols',
    'file transfer',
  ],
  security: [
    'enterprise security',
    'AES-256 encryption',
    'audit logs',
    'compliance',
    'HIPAA',
    'GDPR',
  ],
};

/**
 * Page-specific metadata presets
 */
export const PAGE_METADATA = {
  home: {
    title: 'SCO SMB - Enterprise Scanning Solution',
    description: formatMetaDescription(
      'Transform your document workflow with SCO SMB - the #1 enterprise scanning solution for Kyocera & Sharp printers. Zero-configuration setup, bank-grade security, and intelligent file organization.',
      'Start your free trial today!'
    ),
    keywords: [...SEO_KEYWORDS.scanning, ...SEO_KEYWORDS.printers],
  },
  features: {
    title: 'Features - Enterprise Scanning Solution',
    description: formatMetaDescription(
      'Discover powerful features: automatic printer discovery, secure FTP/SMB protocols, intelligent file naming, OCR integration, audit logs, and multi-user support.',
      'See why enterprises trust SCO SMB.'
    ),
    keywords: [...SEO_KEYWORDS.features, ...SEO_KEYWORDS.protocols],
  },
  download: {
    title: 'Download SCO SMB - Free Trial',
    description: formatMetaDescription(
      'Download SCO SMB for Windows and Mac. 30-day free trial with full features. No credit card required. Compatible with Kyocera, Sharp, Canon, and HP printers.',
      'Install in under 5 minutes.'
    ),
    keywords: ['download scanner software', 'free trial', 'Windows scanner', 'Mac scanner'],
  },
  pricing: {
    title: 'Pricing & Plans - Enterprise Licensing',
    description: formatMetaDescription(
      'Transparent pricing for businesses of all sizes. Choose from Professional, Enterprise, or Custom plans. Volume discounts available.',
      'All plans include free updates and premium support.'
    ),
    keywords: ['pricing', 'license cost', 'enterprise plan', 'volume licensing'],
  },
  trial: {
    title: 'Start Free Trial - 30 Days Full Access',
    description: formatMetaDescription(
      'Try SCO SMB risk-free for 30 days. Full access to all enterprise features. No credit card required. Setup in minutes.',
      'Join 10,000+ businesses using SCO SMB.'
    ),
    keywords: ['free trial', 'trial software', 'enterprise trial'],
  },
  docs: {
    title: 'Documentation - Setup & User Guide',
    description: formatMetaDescription(
      'Complete documentation for SCO SMB: installation guides, network configuration, printer setup, troubleshooting, and best practices.',
      'Expert support available 24/7.'
    ),
    keywords: ['documentation', 'user guide', 'installation guide', 'setup instructions'],
  },
  support: {
    title: 'Support & Help Center - 24/7 Assistance',
    description: formatMetaDescription(
      'Get expert help with SCO SMB. Access knowledge base, video tutorials, live chat, and email support.',
      'Enterprise customers receive priority 24/7 phone support.'
    ),
    keywords: ['support', 'help center', 'customer service', 'technical support'],
  },
  security: {
    title: 'Security & Compliance - Bank-Grade Protection',
    description: formatMetaDescription(
      'Enterprise security features: AES-256 encryption, SOC 2 Type II compliance, HIPAA ready, GDPR compliant, audit logs, and role-based access control.',
      'Your data is protected.'
    ),
    keywords: SEO_KEYWORDS.security,
  },
  contact: {
    title: 'Contact Us - Sales & Support',
    description: formatMetaDescription(
      'Contact SCO SMB for sales inquiries, technical support, or partnership opportunities. Call, email, or chat with our team.',
      'Enterprise demos available.'
    ),
    keywords: ['contact sales', 'support contact', 'request demo'],
  },
};
