'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Suspense, lazy, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FeatureCardOptimized, FeatureGridOptimized } from '@/components/FeatureCardOptimized';
import { EnhancedFeatureCard, FeatureGrid } from '@/components/EnhancedFeatureCard';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  Network,
  Shield,
  FolderTree,
  RefreshCw,
  Server,
  History,
  Laptop,
  Zap
} from 'lucide-react';

// Performance monitoring - non-blocking, idle callback
if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
  requestIdleCallback(() => {
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      onCLS(console.log);
      onFCP(console.log);
      onLCP(console.log);
      onTTFB(console.log);
      onINP(console.log);
    });
  }, { timeout: 5000 });
}

// Lazy load Hero component with performance hint
const Hero = lazy(() =>
  import('../components/HeroUltraOptimized' /* webpackChunkName: "hero", webpackPrefetch: true */)
);

// Loading components
function HeroSkeleton() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      <div className="animate-pulse text-center">
        <div className="h-16 bg-slate-600/20 rounded-lg mb-6 mx-auto max-w-md"></div>
        <div className="h-8 bg-slate-600/20 rounded-lg mb-8 mx-auto max-w-lg"></div>
        <div className="flex gap-4 justify-center">
          <div className="h-12 w-32 bg-slate-600/20 rounded-lg"></div>
          <div className="h-12 w-32 bg-slate-600/20 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

function FeatureCardSkeleton() {
  return (
    <div className="animate-pulse bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
      <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
      <div className="space-y-1">
        <div className="h-3 bg-gray-200 rounded w-4/5"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );
}

export default function Home() {
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Detect device capabilities and user preferences
  useEffect(() => {
    const checkCapabilities = () => {
      const memory = (navigator as any)?.deviceMemory || 4;
      const cores = navigator.hardwareConcurrency || 4;
      const connection = (navigator as any)?.connection;
      
      const isLowEnd = memory < 4 || cores < 4 || 
        (connection && ['slow-2g', '2g', '3g'].includes(connection.effectiveType));
      
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      setIsLowEndDevice(isLowEnd);
      setReducedMotion(prefersReducedMotion || isLowEnd);
      
      // Set CSS custom properties for adaptive styling
      document.documentElement.style.setProperty('--low-end-device', isLowEnd ? '1' : '0');
      document.documentElement.style.setProperty('--reduced-motion', (prefersReducedMotion || isLowEnd) ? '1' : '0');
    };
    
    checkCapabilities();
  }, []);
  
  const features = [
    {
      icon: Network,
      title: 'Network Scanner Discovery',
      description: 'Automatically find Kyocera & Sharp printers with real connection testing. No manual IP configuration needed.',
      benefits: ['Ping-based connection validation', 'SNMP device identification', 'Automatic protocol detection', 'Network topology mapping'],
      technicalDetails: 'Advanced discovery engine scans network ranges and validates printer connections using ICMP, SNMP, and custom protocols to ensure reliable device identification.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'IP whitelisting, file validation, audit logging, and EXIF metadata stripping for complete protection.',
      benefits: ['EXIF metadata removal', 'File type validation', 'Comprehensive audit trails', 'IP-based access control'],
      technicalDetails: 'Military-grade security with SHA-512 verification, complete audit logging, and metadata sanitization to meet enterprise compliance requirements.'
    },
    {
      icon: FolderTree,
      title: 'Automatic Organization',
      description: 'Files sorted by date with custom naming patterns. Quick search and filter through scan history.',
      benefits: ['Date-based folder structure', 'Custom naming templates', 'Full-text search capability', 'Advanced filtering options'],
      technicalDetails: 'Intelligent file organization system with customizable templates, OCR integration for searchability, and automated categorization based on content analysis.'
    },
    {
      icon: RefreshCw,
      title: 'Auto-Update System',
      description: 'Secure updates via GitHub with SHA512 verification. You stay in control of installation.',
      benefits: ['GitHub-backed distribution', 'Cryptographic verification', 'Rollback capabilities', 'Update scheduling control'],
      technicalDetails: 'Secure update pipeline with code signing, hash verification, and staged deployment to ensure system integrity and minimize downtime.'
    },
    {
      icon: Server,
      title: 'Multi-Protocol Support',
      description: 'FTP server, SMB folder watching, HTTP POST uploads. Choose the best protocol for your printers.',
      benefits: ['FTP/FTPS server built-in', 'SMB folder monitoring', 'HTTP/HTTPS endpoints', 'Email integration support'],
      technicalDetails: 'Comprehensive protocol stack supporting FTP, FTPS, SMB, HTTP/HTTPS, and email protocols with configurable security parameters for each transport method.'
    },
    {
      icon: History,
      title: 'Scan History',
      description: 'Visual thumbnail grid with search and filter. Track all received documents with ease.',
      benefits: ['Visual thumbnail previews', 'Advanced search filters', 'Batch operations support', 'Export capabilities'],
      technicalDetails: 'Sophisticated document management system with thumbnail generation, metadata indexing, and powerful search capabilities for efficient document retrieval.'
    },
    {
      icon: Laptop,
      title: 'Cross-Platform',
      description: 'macOS (Intel & Apple Silicon) and Windows 10/11 with professional installers.',
      benefits: ['Universal macOS binaries', 'Windows MSI installers', 'System service integration', 'Auto-start capabilities'],
      technicalDetails: 'Native platform integration with system services, startup automation, and optimized performance for both Intel and ARM architectures.'
    },
    {
      icon: Zap,
      title: 'Production Ready',
      description: 'Built with Electron 28, React 18, and enterprise-grade logging for reliable performance.',
      benefits: ['Enterprise logging system', 'Performance monitoring', 'Error tracking & recovery', 'Scalable architecture'],
      technicalDetails: 'Production-hardened architecture with comprehensive telemetry, automatic error recovery, and enterprise-grade monitoring for 24/7 operation reliability.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full viewport */}
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>

      {/* Product Preview */}
      <section className="content-section py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Suspense fallback={<div className="space-y-8 opacity-0 animate-fade-in"></div>}>
              <motion.div
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={reducedMotion ? { duration: 0 } : { duration: 0.8 }}
                className="space-y-8"
              >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Secure scanning infrastructure for{' '}
                <span className="text-gradient-primary">mixed printer fleets</span>
              </h2>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-sm font-medium text-gray-700 shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Purpose-Built for Enterprise
              </div>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Receive scans directly to secure desktop queues, automatically organize files, and enforce security policy without touching the printer. SCO SMB keeps technicians in control with audit logging, key-based downloads, and GitHub-backed updates.
              </p>

              {/* Key Benefits */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Zero Configuration</h4>
                    <p className="text-sm text-gray-600">Auto-discover network printers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Enterprise Security</h4>
                    <p className="text-sm text-gray-600">Complete audit trails & validation</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/download" className="btn btn-primary btn-lg group">
                  <span>Download Free</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12" />
                  </svg>
                </Link>
                <Link href="/docs" className="btn btn-secondary btn-lg">
                  View Documentation
                </Link>
              </div>
              </motion.div>
            </Suspense>

            <Suspense fallback={<div className="relative opacity-0 animate-fade-in"></div>}>
              <motion.div
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 50 }}
                whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={reducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2 }}
                className="relative"
              >
              {/* Background decorations */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-3xl blur-2xl" />
              <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-full blur-2xl" />
              
              {/* Main image container */}
              <div className="relative bg-white rounded-2xl p-2 shadow-2xl border border-gray-200">
                <Image
                  src="/screenshots/sco-smb-hero-dashboard.png"
                  alt="SCO SMB dashboard preview showing scan management interface"
                  width={600}
                  height={400}
                  className="rounded-xl w-full"
                  style={{ width: '100%', height: 'auto' }}
                  priority={!isLowEndDevice}
                  loading={isLowEndDevice ? 'lazy' : 'eager'}
                  quality={isLowEndDevice ? 75 : 90}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                
                {/* Floating UI elements */}
                <div
                  className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg border border-gray-200 animate-slide-up"
                  style={{ animationDelay: '1s' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Auto-Discovery Active</p>
                      <p className="text-xs text-gray-500">3 printers found</p>
                    </div>
                  </div>
                </div>
              </div>
              </motion.div>
            </Suspense>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="content-section py-24 md:py-32 bg-white">
        <div className="container-wide">
          <Suspense fallback={<div className="text-center mb-24 opacity-0 animate-fade-in"></div>}>
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.8 }}
              className="text-center mb-24"
            >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-sm font-medium text-gray-700 mb-6 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Enterprise Features
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Professional scanning infrastructure built for{' '}
              <span className="text-gradient-primary">enterprise reliability</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              SCO SMB delivers secure, automated document ingestion with network discovery, multi-protocol flexibility, and deep auditability for mixed printer environments.
            </p>
            </motion.div>
          </Suspense>

          <Suspense fallback={
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {Array(8).fill(0).map((_, i) => <FeatureCardSkeleton key={i} />)}
            </div>
          }>
            <FeatureGrid>
              {features.slice(0, 4).map((feature, index) => (
                <EnhancedFeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 0.1}
                  gradient={index % 2 === 0 ? "from-[#153B6B] to-[#00A8B5]" : "from-[#00A8B5] to-[#153B6B]"}
                />
              ))}
            </FeatureGrid>

            <div className="mt-12">
              <FeatureGrid>
                {features.slice(4).map((feature, index) => (
                  <EnhancedFeatureCard
                    key={feature.title}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    delay={(index + 4) * 0.1}
                    gradient={index % 2 === 0 ? "from-[#153B6B] to-[#00A8B5]" : "from-[#00A8B5] to-[#153B6B]"}
                  />
                ))}
              </FeatureGrid>
            </div>
          </Suspense>
        </div>
      </section>

      {/* CTA Section */}
      <section className="content-section section-padding bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
        </div>

        <div className="container-wide max-w-6xl text-center relative">
          <Suspense fallback={<div className="space-y-8 opacity-0 animate-fade-in"></div>}>
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.8 }}
              className="space-y-8"
            >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium text-white mb-16 mt-8 shadow-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Ready to Deploy
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight text-white">
              Transform Your{' '}
              <span className="text-white">Document Workflow</span>
            </h2>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12">
              Download SCO SMB today and experience secure, automated, enterprise-grade scanning infrastructure built for mixed Kyocera & Sharp fleets. Join organizations worldwide who trust our solution.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">99.9%</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-gray-400">Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">256-bit</div>
                <div className="text-sm text-gray-400">Encryption</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">Zero</div>
                <div className="text-sm text-gray-400">Config</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                href="/trial"
                className="btn btn-primary btn-lg group shadow-2xl shadow-blue-500/25"
              >
                <span>Start Free Trial</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="btn btn-ghost btn-lg text-white border-white/30 hover:bg-white/10"
              >
                Contact Sales
              </Link>
            </div>

            <p className="text-sm text-gray-400 mt-8">
              Free 30-day trial • No credit card required • Full feature access
            </p>
            </motion.div>
          </Suspense>
        </div>
      </section>
    </div>
  );
}
