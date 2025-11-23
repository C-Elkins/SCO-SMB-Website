/**
 * SoftwareApplication Schema - JSON-LD Structured Data
 * Helps search engines understand your software product
 */

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
    "softwareVersion": "5.0",
    "screenshot": "https://sco-smb.com/screenshots/sco-smb-hero-dashboard.png",
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
