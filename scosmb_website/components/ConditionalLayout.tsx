'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Don't render Header/Footer for portal routes
  const isPortalRoute = pathname?.startsWith('/portal');
  
  if (isPortalRoute) {
    return (
      <main id="content" className="min-h-screen">
        {children}
      </main>
    );
  }
  
  return (
    <>
      <Header />
      <main id="content" className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}