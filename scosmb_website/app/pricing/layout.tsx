import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - Enterprise Document Scanning Solutions",
  description: "Get custom pricing for SCO SMB enterprise document scanning solution. Contact us for volume licensing, multi-site deployments, and industry-specific configurations.",
  openGraph: {
    title: "SCO SMB Pricing - Custom Enterprise Solutions",
    description: "Tailored pricing for your organization's document scanning needs. Volume discounts and enterprise features available.",
    images: [
      {
        url: "/screenshots/sco-smb-security-Enterprise-settings.png",
        width: 1200,
        height: 630,
        alt: "SCO SMB Enterprise Pricing",
      },
    ],
  },
  alternates: {
    canonical: "https://sco-smb-website.vercel.app/pricing",
  },
  robots: {
    index: false, // Don't index pricing page
    follow: true,
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}