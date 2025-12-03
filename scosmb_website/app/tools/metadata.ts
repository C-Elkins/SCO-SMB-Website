import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Business Tools - ROI Calculator & More | SCO SMB',
  description: 'Free interactive business tools: ROI Calculator, Document Volume Calculator, Network Bandwidth Calculator, and File Naming Pattern Generator. Plan your document scanning infrastructure.',
  keywords: [
    'ROI calculator',
    'document scanning calculator',
    'network bandwidth calculator',
    'file naming tool',
    'business productivity tools',
    'document management tools',
    'scanning volume calculator',
    'free business tools',
  ],
  openGraph: {
    title: 'Free Business Tools | SCO SMB',
    description: 'Calculate ROI, estimate document volume, check network bandwidth, and design file naming patterns with our free interactive tools.',
    url: 'https://sco-smb.com/tools',
    images: [
      {
        url: '/screenshots/sco-smb-tools.png',
        width: 1200,
        height: 630,
        alt: 'SCO SMB Free Business Tools',
      },
    ],
  },
  alternates: {
    canonical: 'https://sco-smb.com/tools',
  },
};
