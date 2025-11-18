import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation & Guides - Complete Setup & Configuration",
  description: "Complete documentation for SCO SMB including installation guides, printer configuration for Kyocera & Sharp, network setup, troubleshooting, and FAQ.",
  openGraph: {
    title: "SCO SMB Documentation - Setup & Configuration Guides",
    description: "Step-by-step guides for setting up SCO SMB with Kyocera & Sharp printers, network configuration, and troubleshooting.",
    images: [
      {
        url: "/screenshots/sco-smb-security-settings.png",
        width: 1200,
        height: 630,
        alt: "SCO SMB Documentation and Setup Guides",
      },
    ],
  },
  alternates: {
    canonical: "https://sco-smb-website.vercel.app/docs",
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}