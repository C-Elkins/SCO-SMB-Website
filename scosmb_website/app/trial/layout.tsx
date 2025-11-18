import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Trial - SCO SMB | Enterprise Document Scanner Software',
  description: 'Start your free trial of SCO SMB enterprise document scanner software. Experience advanced network discovery, automatic file organization, and secure document processing - no credit card required.',
  keywords: 'free trial, document scanner software, enterprise trial, network scanner, automatic document processing, business trial software',
  alternates: {
    canonical: '/trial'
  },
  robots: {
    index: false, // Don't index trial page to keep it internal
    follow: true
  },
  openGraph: {
    title: 'Start Your Free Trial - SCO SMB Enterprise Scanner',
    description: 'Experience the power of SCO SMB with a risk-free trial. Advanced document scanning and organization for your business.',
    type: 'website',
    url: '/trial'
  }
};

export default function TrialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}