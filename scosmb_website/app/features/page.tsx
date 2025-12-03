'use client';

import React from 'react';
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
  const [activeTab, setActiveTab] = React.useState(0);
  const { ref: featuresRef, isRevealed: featuresRevealed } = useScrollReveal({ threshold: 0.2 });
  
  const features = [
    {
      icon: <Monitor className="w-12 h-12" />,
      title: "Modern Dashboard (v1.2.1)",
      description: "Redesigned main dashboard with real-time status monitoring, quick actions, and system health indicators. Clean, intuitive interface shows everything at a glance.",
      benefits: [
        "Real-time printer connection status",
        "Quick action buttons",
        "Recent scan activity feed",
        "System health indicators"
      ],
      image: "/screenshots/v1.2.1-main-dashboard.png"
    },
    {
      icon: <History className="w-12 h-12" />,
      title: "Enhanced Scan History",
      description: "Visual thumbnail grid showing all received scans with powerful search and filtering capabilities. New in v1.2.1: improved performance and batch operations.",
      benefits: [
        "Thumbnail preview grid",
        "Search by filename or date",
        "Batch operations support",
        "Quick open, rename, delete"
      ],
      image: "/screenshots/v1.2.1-scan-history.png"
    },
    {
      icon: <Settings className="w-12 h-12" />,
      title: "Comprehensive Settings",
      description: "Easy-to-use settings interface for all configuration options. No command line required. New tabbed layout in v1.2.1 for better organization.",
      benefits: [
        "Tabbed settings interface",
        "Real-time validation",
        "Import/Export configurations",
        "Dark mode support"
      ],
      image: "/screenshots/v1.2.1-settings.png"
    },
    {
      icon: <Network className="w-12 h-12" />,
      title: "Smart Scanner Setup",
      description: "Automatically discover Kyocera & Sharp printers on your network with real connection testing. v1.2.1 adds improved discovery algorithm and better error handling.",
      benefits: [
        "Zero-configuration for Kyocera printers",
        "Real-time connection testing",
        "Automatic printer model detection",
        "Enhanced network diagnostics"
      ],
      image: "/screenshots/v1.2.1-scanner-setup.png"
    },
    {
      icon: <FolderTree className="w-12 h-12" />,
      title: "Intelligent File Organization",
      description: "Scans are automatically organized by date in YYYY/MM/ folder structure. v1.2.1 introduces custom naming patterns and advanced rules.",
      benefits: [
        "Automatic date-based folders",
        "Custom file naming patterns",
        "Rule-based organization",
        "Duplicate detection"
      ],
      image: "/screenshots/v1.2.1-file-organization.png"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Enterprise Security (New!)",
      description: "Built for enterprise environments with comprehensive security features including IP whitelisting, file validation, and complete audit logging.",
      benefits: [
        "IP whitelisting & rate limiting",
        "File validation & quarantine system",
        "Tamper-evident audit logs",
        "Advanced authentication options"
      ],
      image: "/screenshots/v1.2.1-security.png"
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
      <section className="relative bg-linear-to-br from-[#153B6B] via-[#1e4a7f] to-[#00A8B5] text-white pt-32 pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 left-10 w-60 h-60 bg-[#00A8B5]/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
          <div style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.03\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} className="absolute inset-0 opacity-40" />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [-15, 15, -15], rotate: [0, 90, 180] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-32 right-20 w-5 h-5 border-2 border-white/25 rotate-45"
          />
          <motion.div
            animate={{ y: [25, -25, 25], x: [-10, 10, -10] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-40 right-32 w-3 h-3 bg-white/15 rounded-full"
          />
        </div>

        <div className="container-custom relative z-10">
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
              Powerful <span className="text-[#00A8B5]">Features</span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white mb-6"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              New in v1.2.1
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Everything you need for enterprise-grade document scanning and management.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Enterprise Security
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                Cross-Platform Support
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                Auto Organization
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features - Tabbed Interface */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-16">
            {features.map((feature, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveTab(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                  activeTab === index
                    ? 'bg-linear-to-r from-[#00A8B5] to-[#008c97] text-white shadow-xl hover:shadow-2xl'
                    : 'glass text-gray-700 hover:bg-white/80 border border-gray-200'
                }`}
              >
                {feature.title.replace(' (v1.2.1)', '').replace(' (New!)', '')}
              </motion.button>
            ))}
          </div>

          {/* Active Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-12 items-start"
          >
            {/* Left: Info */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <div className="w-16 h-16 bg-linear-to-br from-[#00A8B5] to-[#008c97] rounded-2xl flex items-center justify-center text-white shadow-lg hover-lift">
                  {features[activeTab].icon}
                </div>
                <h2 className="text-3xl font-bold text-[#153B6B]">
                  {features[activeTab].title}
                </h2>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-gray-600 leading-relaxed"
              >
                {features[activeTab].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4 pt-4"
              >
                {features[activeTab].benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-start gap-3 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-linear-to-br from-[#00A8B5] to-[#008c97] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right: Screenshot */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden hover-lift card-depth">
                <Image
                  src={features[activeTab].image}
                  alt={features[activeTab].title}
                  width={600}
                  height={400}
                  className="w-full"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </motion.div>
          </motion.div>
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
