/**
 * Organization Schema - JSON-LD Structured Data
 * Helps search engines understand your business entity
 */

export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "South Coast Office",
    "legalName": "South Coast Office Equipment Company",
    "url": "https://sco-smb.com",
    "logo": "https://sco-smb.com/logos/sco-smb-logo.png",
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
      "https://github.com/C-Elkins/SCO-SMB-Website"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
