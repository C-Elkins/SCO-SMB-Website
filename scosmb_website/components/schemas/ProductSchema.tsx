/**
 * Product Schema - JSON-LD Structured Data
 * Enhanced product information for e-commerce search features
 */

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
