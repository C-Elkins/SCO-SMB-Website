'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
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

export default function Home() {
  const features = [
    {
      icon: <Network className="w-8 h-8" />,
      title: "Network Scanner Discovery",
      description: "Automatically find Kyocera & Sharp printers with real connection testing. No manual IP configuration needed."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "IP whitelisting, file validation, audit logging, and EXIF metadata stripping for complete protection."
    },
    {
      icon: <FolderTree className="w-8 h-8" />,
      title: "Automatic Organization",
      description: "Files sorted by date with custom naming patterns. Quick search and filter through scan history."
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Auto-Update System",
      description: "Secure updates via GitHub with SHA512 verification. You stay in control of installation."
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "Multi-Protocol Support",
      description: "FTP server, SMB folder watching, HTTP POST uploads. Choose the best protocol for your printers."
    },
    {
      icon: <History className="w-8 h-8" />,
      title: "Scan History",
      description: "Visual thumbnail grid with search and filter. Track all received documents with ease."
    },
    {
      icon: <Laptop className="w-8 h-8" />,
      title: "Cross-Platform",
      description: "macOS (Intel & Apple Silicon) and Windows 10/11 with professional installers."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Production Ready",
      description: "Built with Electron 28, React 18, and enterprise-grade logging for reliable performance."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#153B6B] to-[#00A8B5] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Enterprise Scanning Made Simple
              </h1>
              <p className="text-base md:text-lg mb-6 text-gray-100 leading-relaxed">
                Receive scans from Kyocera & Sharp printers directly to your computer. 
                No walking to the printer. Just press scan and go.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Link
                  href="/download"
                  className="inline-flex items-center justify-center px-6 py-3 text-base bg-white text-[#153B6B] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg"
                >
                  Download Now
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center justify-center px-6 py-3 text-base bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#153B6B] transition-all duration-200"
                >
                  See Features →
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <Image
                src="/screenshots/sco-smb-hero-dashboard.png"
                alt="SCO SMB Dashboard"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#153B6B] mb-3">
              Professional Features for Modern Offices
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need for enterprise-grade document scanning and management
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-[#00A8B5] mb-3">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#153B6B] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-[#153B6B] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Document Workflow?
            </h2>
            <p className="text-base md:text-lg mb-6 text-gray-200">
              Download SCO SMB today and experience professional scanning infrastructure
            </p>
            <Link
              href="/download"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#00A8B5] text-white font-semibold rounded-lg hover:bg-[#008c97] transition-all duration-200 shadow-lg"
            >
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
