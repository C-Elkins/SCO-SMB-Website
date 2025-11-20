'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Network, 
  Shield, 
  FolderTree, 
  RefreshCw, 
  Server, 
  History,
  Settings,
  Lock,
  Monitor,
  Zap,
  Globe,
  Database
} from 'lucide-react';
import { EnhancedFeatureCard, FeatureGrid } from '@/components/EnhancedFeatureCard';
import { useScrollReveal, useParallax } from '@/lib/useScrollReveal';

export default function FeaturesPage() {
  const heroParallax = useParallax(0.1);
  const { ref: featuresRef, isRevealed: featuresRevealed } = useScrollReveal({ threshold: 0.2 });
  
  // Create hooks for each feature outside the render loop
  const featureHooks = Array.from({ length: 6 }, () => ({
    scrollReveal: useScrollReveal({ threshold: 0.3 }),
    parallax: useParallax(0.05)
  }));
  
  const features = [
    {
      icon: <Network className="w-12 h-12" />,
      title: "Network Scanner Discovery",
      description: "Automatically find Kyocera & Sharp printers on your network with real connection testing. Our discovery system uses ping and port scanning to verify printers are actually accessible before adding them.",
      benefits: [
        "Zero-configuration for Kyocera printers",
        "Real-time connection testing",
        "Automatic printer model detection",
        "Manual IP entry for edge cases"
      ],
      image: "/screenshots/sco-smb-security-settings.png"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Enterprise Security",
      description: "Built for enterprise environments with comprehensive security features including IP whitelisting, file validation, and complete audit logging.",
      benefits: [
        "IP whitelisting & rate limiting",
        "File validation & quarantine system",
        "Tamper-evident audit logs",
        "EXIF metadata stripping for privacy"
      ],
      image: "/screenshots/sco-smb-security-Enterprise-settings.png"
    },
    {
      icon: <FolderTree className="w-12 h-12" />,
      title: "Automatic Organization",
      description: "Scans are automatically organized by date in YYYY/MM/ folder structure. Custom naming patterns ensure files are easy to find.",
      benefits: [
        "Automatic date-based folders",
        "Custom file naming patterns",
        "Thumbnail previews",
        "Quick search and filter"
      ],
      image: "/screenshots/sco-smb-scan-history.png"
    },
    {
      icon: <RefreshCw className="w-12 h-12" />,
      title: "Auto-Update System",
      description: "Stay current with automatic updates from GitHub Releases. SHA512 checksum verification ensures download integrity.",
      benefits: [
        "Automatic update checking",
        "SHA512 checksum verification",
        "User control over installation",
        "Background downloads"
      ],
      image: "/screenshots/sco-smb-hero-dashboard.png"
    },
    {
      icon: <Server className="w-12 h-12" />,
      title: "Multi-Protocol Support",
      description: "Choose the best protocol for your printers: FTP server, SMB folder watching, or HTTP POST uploads.",
      benefits: [
        "Zero-config FTP server",
        "SMB folder monitoring",
        "HTTP POST endpoint",
        "Protocol auto-detection"
      ],
      image: "/screenshots/sco-smb-ftp-server.png"
    },
    {
      icon: <History className="w-12 h-12" />,
      title: "Scan History",
      description: "Visual thumbnail grid showing all received scans with powerful search and filtering capabilities.",
      benefits: [
        "Thumbnail preview grid",
        "Search by filename or date",
        "Filter by type or size",
        "Quick open, rename, delete"
      ],
      image: "/screenshots/sco-smb-scan-history.png"
    }
  ];

  const additionalFeatures = [
    {
      icon: Settings,
      title: 'Easy Configuration',
      description: 'Intuitive settings panel for all configuration options. No command line required.',
      benefits: [
        'Drag-and-drop printer setup',
        'Visual protocol selection',
        'One-click security toggles',
        'Real-time configuration validation'
      ],
      technicalDetails: 'Modern GUI built with React and Electron, providing native OS integration with automatic settings persistence and real-time validation feedback.'
    },
    {
      icon: Lock,
      title: 'Secure by Default',
      description: 'All security features enabled by default with audit logging for every critical action.',
      benefits: [
        'Zero-trust security model',
        'Encrypted local storage',
        'Tamper-evident logging',
        'Automatic security updates'
      ],
      technicalDetails: 'Military-grade AES-256 encryption for all local data, with SHA-512 checksums for file integrity and comprehensive audit trails that cannot be modified or deleted.'
    },
    {
      icon: RefreshCw,
      title: 'Always Current',
      description: 'Automatic update notifications sourced from GitHub Releases with checksum verification.',
      benefits: [
        'Silent background updates',
        'Rollback protection',
        'Beta channel access',
        'Update scheduling control'
      ],
      technicalDetails: 'GitHub Actions-powered CI/CD pipeline with automated security scanning, code signing, and delta updates to minimize bandwidth usage while ensuring authenticity.'
    },
    {
      icon: Monitor,
      title: 'Real-Time Monitoring',
      description: 'Live dashboard showing scanner status, recent activities, and system health metrics.',
      benefits: [
        'Live printer connection status',
        'Scan activity monitoring',
        'Storage usage tracking',
        'Performance metrics display'
      ],
      technicalDetails: 'WebSocket-based real-time updates with efficient data streaming, providing sub-second status updates and historical trend analysis for optimal system maintenance.'
    },
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Optimized for speed with concurrent scanning support and efficient file processing.',
      benefits: [
        'Parallel scan processing',
        'Memory-efficient operation',
        'Fast file transfers',
        'Background compression'
      ],
      technicalDetails: 'Multi-threaded architecture with async I/O operations, intelligent memory management, and hardware-accelerated image processing for maximum throughput.'
    },
    {
      icon: Globe,
      title: 'Multi-Location Support',
      description: 'Perfect for organizations with multiple offices or distributed scanning needs.',
      benefits: [
        'Centralized management',
        'Remote configuration',
        'Location-based routing',
        'Unified reporting'
      ],
      technicalDetails: 'Cloud-ready architecture with secure API endpoints, encrypted communication channels, and role-based access control for enterprise-scale deployments.'
    },
    {
      icon: Database,
      title: 'Data Management',
      description: 'Comprehensive data handling with backup, archival, and retention policies.',
      benefits: [
        'Automated backups',
        'Retention policy enforcement',
        'Data export capabilities',
        'Archive management'
      ],
      technicalDetails: 'SQLite-based local storage with optional PostgreSQL integration, featuring ACID compliance, automatic vacuum operations, and configurable retention policies.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="hero-section relative bg-linear-to-br from-[#153B6B] via-[#1e4a7f] to-[#00A8B5] text-white pt-32 pb-20 overflow-hidden">
        {/* Animated Background Elements with Parallax */}
        <div 
          className="absolute inset-0 smooth-parallax"
          style={{ transform: heroParallax.transform }}
        >
          <motion.div 
            className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl" 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-40 right-20 w-48 h-48 bg-[#00A8B5]/20 rounded-full blur-2xl" 
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div 
            className="absolute bottom-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-xl" 
            animate={{ 
              scale: [1, 1.08, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />
          <div style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.03\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} className="absolute inset-0 opacity-40" />
        </div>
        
        {/* Floating Geometric Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-10 w-6 h-6 border-2 border-white/20 rotate-45"
          />
          <motion.div
            animate={{ y: [20, -20, 20], rotate: [360, 180, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-32 left-16 w-4 h-4 bg-white/10 rounded-full"
          />
          <motion.div
            animate={{ x: [-10, 10, -10], y: [10, -10, 10] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 right-1/4 w-8 h-8 border border-[#00A8B5]/30 rounded-full"
          />
        </div>

        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-8 shadow-2xl"
            >
              <Settings className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight"
            >
              Powerful Features for
              <br />
              <span className="text-[#00A8B5]">Professional Scanning</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Everything you need for enterprise-grade document scanning and management
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Enterprise Ready
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                Cross-Platform
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                Secure by Design
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Detail */}
      <section ref={featuresRef} className="content-section py-20 md:py-28 bg-white">
        <div className="container-wide">
          <div className="space-y-24">
            {features.map((feature, index) => {
              const { ref: featureRef, isRevealed } = featureHooks[index].scrollReveal;
              const featureParallax = featureHooks[index].parallax;
              
              return (
                <motion.div
                  key={index}
                  ref={featureRef}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ 
                    opacity: isRevealed ? 1 : 0, 
                    y: isRevealed ? 0 : 40 
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2,
                    ease: "easeOut"
                  }}
                  className={`grid md:grid-cols-2 gap-12 items-center smooth-parallax relative ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                  style={{ 
                    transform: featureParallax.transform,
                    zIndex: 10 - index,
                    marginBottom: '6rem'
                  }}
                >
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="text-[#00A8B5] mb-4">{feature.icon}</div>
                  <h2 className="text-3xl font-bold text-[#153B6B] mb-4">
                    {feature.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#00A8B5] flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-xl w-full"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="content-section py-32 md:py-40 bg-white">
        <div className="w-full mx-auto px-8 lg:px-16 xl:px-24" style={{ maxWidth: '1600px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#153B6B] mb-4">
              More Features
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {additionalFeatures.slice(0, 6).map((feature, index) => (
              <EnhancedFeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
                gradient={index % 2 === 0 ? "from-[#153B6B] to-[#00A8B5]" : "from-[#00A8B5] to-[#153B6B]"}
              />
            ))}
          </div>

          {additionalFeatures.length > 6 && (
            <div className="mt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {additionalFeatures.slice(6).map((feature, index) => (
                  <EnhancedFeatureCard
                    key={feature.title}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    delay={(index + 6) * 0.1}
                    gradient={index % 2 === 0 ? "from-[#153B6B] to-[#00A8B5]" : "from-[#00A8B5] to-[#153B6B]"}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
