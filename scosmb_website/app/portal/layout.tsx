import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Portal - SCO SMB",
  description: "Technician Portal for SCO SMB Enterprise Scanning Solution",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}