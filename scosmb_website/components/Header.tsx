'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
      
      // Scroll progress
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled_percent = (winScroll / height) * 100;
      setScrollProgress(scrolled_percent);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pathname = usePathname();
  const navLinks = [
    { name: 'Features', href: '/features' },
    { name: 'Docs', href: '/docs' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Security', href: '/security' },
    { name: 'Support', href: '/support' },
  ];

  return (
    <>
      {/* Scroll Progress */}
      <div 
        className="scroll-indicator"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />
      
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100' 
            : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="container-wide">
          <div className={`flex justify-between items-center transition-all duration-300 ${
            isScrolled ? 'py-4' : 'py-6'
          }`}>
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 shrink-0 group">
              <div className="relative">
                <Image
                  src="/logos/sco-smb-logo-primary.svg"
                  alt="SCO SMB Enterprise"
                  width={220}
                  height={60}
                  priority
                  className={`transition-all duration-300 ${
                    isScrolled ? 'h-12 w-auto' : 'h-14 w-auto'
                  }`}
                  style={{ width: 'auto' }}
                  onError={(e) => {
                    console.log('SVG failed, falling back to PNG');
                    e.currentTarget.src = '/logos/sco-smb-logo.png';
                  }}
                />
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">Enterprise</div>
                <div className="text-xs text-gray-500">Document Scanning</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2 ml-auto mr-8">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 group ${
                      active 
                        ? 'text-blue-900 bg-gradient-to-r from-blue-50 to-teal-50 shadow-sm border border-blue-200' 
                        : 'text-gray-700 hover:text-blue-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:shadow-md'
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {active && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-blue-100/80 to-teal-100/80 rounded-xl border border-blue-300/50 shadow-lg"
                        style={{ zIndex: -1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/0 to-teal-600/0 group-hover:from-blue-600/5 group-hover:to-teal-600/5 transition-all duration-300" />
                  </Link>
                );
              })}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/contact" className="btn btn-secondary btn-sm">
                Contact
              </Link>
              <Link href="/download" className="btn btn-primary btn-sm">
                Download
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-blue-900 hover:bg-gray-50 transition-all duration-200"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200"
            >
              <nav className="container-custom py-6 space-y-2">
                {navLinks.map((link, index) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                          active 
                            ? 'bg-gray-100 text-blue-900' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-blue-900'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
                
                {/* Mobile CTA */}
                <motion.div 
                  className="pt-4 border-t border-gray-200 space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn btn-secondary w-full"
                  >
                    Contact Sales
                  </Link>
                  <Link
                    href="/download"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn btn-primary w-full"
                  >
                    Download Now
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
