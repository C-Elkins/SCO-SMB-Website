'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Download, Book, Wrench, GitBranch, Shield } from 'lucide-react';

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-linear-to-br from-[#153B6B] to-[#00A8B5] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Wrench className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Technician Portal
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
              Unrestricted access for authorized service technicians
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portal Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <Download className="w-12 h-12 text-[#00A8B5] mb-4" />
              <h3 className="text-xl font-semibold text-[#153B6B] mb-2">
                Unrestricted Downloads
              </h3>
              <p className="text-gray-600">
                Access all versions including latest releases, beta builds, and development versions. No license key required.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <Book className="w-12 h-12 text-[#00A8B5] mb-4" />
              <h3 className="text-xl font-semibold text-[#153B6B] mb-2">
                Complete Documentation
              </h3>
              <p className="text-gray-600">
                Full technical documentation, troubleshooting guides, and internal knowledge base articles.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <GitBranch className="w-12 h-12 text-[#00A8B5] mb-4" />
              <h3 className="text-xl font-semibold text-[#153B6B] mb-2">
                Development Builds
              </h3>
              <p className="text-gray-600">
                Early access to beta versions and experimental features for testing and evaluation.
              </p>
            </motion.div>
          </div>

          {/* Download Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">
              Download SCO SMB (All Versions)
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-[#153B6B]">Latest Release (v1.1.1)</h3>
                    <p className="text-sm text-gray-600">Production stable version</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-[#153B6B] text-white rounded-lg hover:bg-[#0f2a4d] transition-colors">
                      Mac (Intel)
                    </button>
                    <button className="px-4 py-2 bg-[#153B6B] text-white rounded-lg hover:bg-[#0f2a4d] transition-colors">
                      Mac (Silicon)
                    </button>
                    <button className="px-4 py-2 bg-[#153B6B] text-white rounded-lg hover:bg-[#0f2a4d] transition-colors">
                      Windows
                    </button>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-[#153B6B]">Previous Versions</h3>
                    <p className="text-sm text-gray-600">Archive of past releases (v1.0.0 - v1.1.0)</p>
                  </div>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                    View Archive
                  </button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 bg-yellow-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-[#153B6B]">Beta Builds</h3>
                    <p className="text-sm text-gray-600">Experimental features - for testing only</p>
                  </div>
                  <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                    Download Beta
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
              <Shield className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Technician Note</h4>
                <p className="text-sm text-blue-800">
                  All downloads bypass license validation. Use responsibly and only for authorized service calls.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">
              Technician Resources
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border border-gray-200 rounded-lg hover:border-[#00A8B5] transition-colors">
                <h3 className="font-semibold text-[#153B6B] mb-2">Installation Best Practices</h3>
                <p className="text-gray-600 mb-3">
                  Step-by-step guides for clean installations, upgrades, and troubleshooting common deployment issues.
                </p>
                <Link href="/docs" className="text-[#00A8B5] font-medium hover:underline">
                  View Guide →
                </Link>
              </div>

              <div className="p-6 border border-gray-200 rounded-lg hover:border-[#00A8B5] transition-colors">
                <h3 className="font-semibold text-[#153B6B] mb-2">Common Issues Database</h3>
                <p className="text-gray-600 mb-3">
                  Known issues, solutions, and workarounds for frequently encountered problems in the field.
                </p>
                <Link href="/support" className="text-[#00A8B5] font-medium hover:underline">
                  View Issues →
                </Link>
              </div>

              <div className="p-6 border border-gray-200 rounded-lg hover:border-[#00A8B5] transition-colors">
                <h3 className="font-semibold text-[#153B6B] mb-2">Customer Setup Checklist</h3>
                <p className="text-gray-600 mb-3">
                  Comprehensive checklist to ensure proper setup and configuration for end customers.
                </p>
                <a href="#" className="text-[#00A8B5] font-medium hover:underline">
                  Download PDF →
                </a>
              </div>

              <div className="p-6 border border-gray-200 rounded-lg hover:border-[#00A8B5] transition-colors">
                <h3 className="font-semibold text-[#153B6B] mb-2">Support Scripts & Tools</h3>
                <p className="text-gray-600 mb-3">
                  Diagnostic scripts, configuration templates, and automation tools for faster deployments.
                </p>
                <a 
                  href="https://github.com/C-Elkins/SCO-SMB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00A8B5] font-medium hover:underline"
                >
                  View on GitHub →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-[#153B6B] mb-8">
              Quick Links
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/C-Elkins/SCO-SMB"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#153B6B] text-white font-semibold rounded-lg hover:bg-[#0f2a4d] transition-all duration-200"
              >
                GitHub Repository
              </a>
              <Link
                href="/admin"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#00A8B5] text-white font-semibold rounded-lg hover:bg-[#008c97] transition-all duration-200"
              >
                Admin Dashboard
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-200"
              >
                Main Website
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
