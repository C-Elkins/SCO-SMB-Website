/**
 * FAQ Schema - JSON-LD Structured Data
 * Enables rich snippets with FAQ answers in search results
 */

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

// Usage example:
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
