import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features - SCO SMB | Enterprise Scanning Solution',
  description: 'Explore the powerful features of SCO SMB including network scanner discovery, enterprise security, automatic organization, and more.',
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
