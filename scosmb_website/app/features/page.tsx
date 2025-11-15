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
  Lock
} from 'lucide-react';

export default function FeaturesPage() {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#153B6B] to-[#00A8B5] text-white py-20 md:py-28">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Features for Professional Scanning
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
              Everything you need for enterprise-grade document scanning and management
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Detail */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <div className="space-y-24">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
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
                    className="rounded-lg shadow-xl"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-32 md:py-40 bg-white">
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

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-gray-200">
              <Settings className="w-10 h-10 text-[#00A8B5] mb-4" />
              <h3 className="text-xl font-semibold text-[#153B6B] mb-2">
                Easy Configuration
              </h3>
              <p className="text-gray-600">
                Intuitive settings panel for all configuration options. No command line required.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-gray-200">
              <Lock className="w-10 h-10 text-[#00A8B5] mb-4" />
              <h3 className="text-xl font-semibold text-[#153B6B] mb-2">
                Secure by Default
              </h3>
              <p className="text-gray-600">
                All security features enabled out of the box. No configuration needed for basic security.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-gray-200">
              <RefreshCw className="w-10 h-10 text-[#00A8B5] mb-4" />
              <h3 className="text-xl font-semibold text-[#153B6B] mb-2">
                Always Current
              </h3>
              <p className="text-gray-600">
                Automatic update notifications keep you on the latest version with new features and fixes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
