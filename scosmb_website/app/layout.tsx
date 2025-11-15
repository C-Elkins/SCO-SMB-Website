import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SCO SMB - Enterprise Scanning Solution | South Coast Office",
  description: "Professional document scanning for Kyocera & Sharp printers. Receive scans directly to your computer with automatic organization, security, and enterprise features.",
  keywords: ["document scanning", "Kyocera scanner", "Sharp MFP", "FTP server", "SMB scanning", "enterprise scanning", "network scanner"],
  openGraph: {
    title: "SCO SMB - Enterprise Scanning Solution",
    description: "Professional document scanning for network printers",
    type: "website",
    url: "https://sco-smb-website.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased bg-white text-neutral-dark`}>        
        <Header />
        <main id="content" className="min-h-screen">
          {children}
        </main>
        <Footer />
        {/* Scroll progress bar */}
        <div id="scroll-progress" className="fixed top-0 left-0 h-1 bg-accent-teal z-60" style={{width:'0%'}} />
        <Script id="scroll-progress-script" strategy="afterInteractive">{`
          const bar = document.getElementById('scroll-progress');
          const onScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = progress + '%';
          };
          window.addEventListener('scroll', onScroll);
        `}</Script>
      </body>
    </html>
  );
}
