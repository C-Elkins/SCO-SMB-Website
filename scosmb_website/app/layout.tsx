import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SCO SMB - Enterprise Scanning Solution | South Coast Office",
  description: "Professional document scanning for Kyocera & Sharp printers. Receive scans directly to your computer with automatic organization, security, and enterprise features.",
  keywords: ["document scanning", "Kyocera scanner", "Sharp MFP", "FTP server", "SMB scanning", "enterprise scanning", "network scanner"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main className="pt-[70px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
