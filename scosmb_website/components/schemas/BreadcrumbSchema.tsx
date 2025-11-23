/**
 * Breadcrumb Schema - JSON-LD Structured Data
 * Shows navigation hierarchy in search results
 */

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

// Usage example:
// <BreadcrumbSchema items={[
//   { name: "Home", url: "/" },
//   { name: "Documentation", url: "/docs" },
//   { name: "Installation", url: "/docs/installation" }
// ]} />
