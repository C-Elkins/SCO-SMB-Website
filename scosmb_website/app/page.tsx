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
      <section className="relative bg-primary-navy text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,168,181,0.25),transparent_70%)]" />
        <div className="container-custom section-hero relative">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-balance">
                Enterprise Scanning Infrastructure for Modern Offices
              </h1>
              <p className="text-base md:text-lg mb-6 text-gray-100 leading-relaxed">
                Receive scans from Kyocera & Sharp printers directly to your computer—no manual IP setup, no walking to the device. Secure, organized, automatic.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Link
                  href="/download"
                  className="btn btn-primary bg-white text-primary-navy hover:bg-neutral-light shadow-lg px-8 py-4 text-base"
                >
                  Download Now
                </Link>
                <Link
                  href="/features"
                  className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-navy px-8 py-4 text-base"
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
                className="rounded-lg shadow-2xl w-full"
                style={{ height: 'auto' }}
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-primary-navy mb-4 text-balance">
              Professional Features Built for Enterprise Reliability
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              SCO SMB delivers secure, automated document ingestion with network discovery, multi-protocol flexibility, and deep auditability.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card hover:-translate-y-1 transition-transform"
              >
                <div className="text-accent-teal mb-3">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-primary-navy mb-2">
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
      <section className="section bg-primary-navy text-white">
        <div className="container-custom max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-balance">
              Ready to Transform Your Document Workflow?
            </h2>
            <p className="text-base md:text-lg mb-10 text-gray-200 max-w-2xl mx-auto">
              Download SCO SMB today and experience secure, automated, enterprise-grade scanning infrastructure built for mixed Kyocera & Sharp fleets.
            </p>
            <Link
              href="/download"
              className="btn btn-primary px-8 py-4 shadow-lg"
            >
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
