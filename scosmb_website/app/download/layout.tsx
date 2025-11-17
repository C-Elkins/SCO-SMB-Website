import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download SCO SMB - Secure Document Scanning Software",
  description: "Download the latest version of SCO SMB for Windows and macOS. Secure license-protected downloads with SHA512 verification for enterprise document scanning.",
  openGraph: {
    title: "Download SCO SMB - Enterprise Document Scanning Software",
    description: "Get the latest version of SCO SMB with secure license validation. Professional document scanning for Kyocera & Sharp printers.",
    images: [
      {
        url: "/screenshots/sco-smb-hero-dashboard.png",
        width: 1200,
        height: 630,
        alt: "SCO SMB Download Page",
      },
    ],
  },
  alternates: {
    canonical: "https://sco-smb-website.vercel.app/download",
  },
};

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}