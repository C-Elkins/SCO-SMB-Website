import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Enterprise Features - Network Discovery & Security",
  description: "Discover SCO SMB's powerful features: automatic network scanner discovery, enterprise security, file organization, auto-updates, multi-protocol support, and scan history management.",
  openGraph: {
    title: "SCO SMB Features - Enterprise Document Scanning Capabilities",
    description: "Network scanner discovery, enterprise security, automatic organization, and more professional features for Kyocera & Sharp printers.",
    images: [
      {
        url: "/screenshots/sco-smb-security-Enterprise-settings.png",
        width: 1200,
        height: 630,
        alt: "SCO SMB Enterprise Security Features",
      },
    ],
  },
  alternates: {
    canonical: "https://sco-smb-website.vercel.app/features",
  },
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
