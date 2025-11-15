'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Lock, FileCheck, Eye, AlertTriangle, CheckCircle } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#153B6B] to-[#00A8B5] text-white py-32 md:py-40">
        <div className="w-full mx-auto px-8 lg:px-16 xl:px-24" style={{ maxWidth: '1600px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Enterprise-Grade Security
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
              Built with security-first design principles for modern enterprises
            </p>
          </motion.div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <Shield className="w-12 h-12 text-[#00A8B5] mb-4" />
              <h3 className="text-2xl font-semibold text-[#153B6B] mb-4">
                IP Whitelisting
              </h3>
              <p className="text-gray-600 mb-4">
                Control exactly which IP addresses can send scans to your system. Prevent unauthorized access from unknown sources.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Allow/block specific IPs</li>
                <li>• CIDR range support</li>
                <li>• Dynamic blocklist</li>
                <li>• Rate limiting per IP</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <FileCheck className="w-12 h-12 text-[#00A8B5] mb-4" />
              <h3 className="text-2xl font-semibold text-[#153B6B] mb-4">
                File Validation
              </h3>
              <p className="text-gray-600 mb-4">
                Comprehensive file validation and quarantine system to protect against malicious uploads.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• MIME type validation</li>
                <li>• File size limits</li>
                <li>• Extension verification</li>
                <li>• Quarantine suspicious files</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <Eye className="w-12 h-12 text-[#00A8B5] mb-4" />
              <h3 className="text-2xl font-semibold text-[#153B6B] mb-4">
                Audit Logging
              </h3>
              <p className="text-gray-600 mb-4">
                Tamper-evident audit logs track all system activities for compliance and security monitoring.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• All events logged</li>
                <li>• Tamper-evident design</li>
                <li>• Log rotation & retention</li>
                <li>• Export for SIEM systems</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <Lock className="w-12 h-12 text-[#00A8B5] mb-4" />
              <h3 className="text-2xl font-semibold text-[#153B6B] mb-4">
                Data Privacy
              </h3>
              <p className="text-gray-600 mb-4">
                EXIF metadata stripping ensures document privacy and prevents information leakage.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• EXIF metadata removal</li>
                <li>• GPS data stripping</li>
                <li>• Timestamp sanitization</li>
                <li>• Camera info removal</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <AlertTriangle className="w-12 h-12 text-[#00A8B5] mb-4" />
              <h3 className="text-2xl font-semibold text-[#153B6B] mb-4">
                Vulnerability Reporting
              </h3>
              <p className="text-gray-600 mb-4">
                Responsible disclosure program for security researchers to report vulnerabilities.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Secure reporting channel</li>
                <li>• Rapid response team</li>
                <li>• Coordinated disclosure</li>
                <li>• Recognition program</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <CheckCircle className="w-12 h-12 text-[#00A8B5] mb-4" />
              <h3 className="text-2xl font-semibold text-[#153B6B] mb-4">
                Compliance Ready
              </h3>
              <p className="text-gray-600 mb-4">
                Built to support enterprise compliance requirements and industry standards.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• GDPR considerations</li>
                <li>• HIPAA-friendly design</li>
                <li>• ISO 27001 aligned</li>
                <li>• SOC 2 ready architecture</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Controls Matrix */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#153B6B] mb-4">
              Comprehensive Security Controls
            </h2>
            <p className="text-xl text-gray-600">
              Multi-layered security approach for complete protection
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-[#153B6B] text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Security Control</th>
                  <th className="px-6 py-4 text-left">Implementation</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-medium text-[#153B6B]">Network Security</td>
                  <td className="px-6 py-4 text-gray-600">IP whitelisting, rate limiting, port filtering</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-[#153B6B]">File Security</td>
                  <td className="px-6 py-4 text-gray-600">MIME validation, size limits, quarantine system</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-[#153B6B]">Audit & Logging</td>
                  <td className="px-6 py-4 text-gray-600">Comprehensive event logging with Winston</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-[#153B6B]">Data Privacy</td>
                  <td className="px-6 py-4 text-gray-600">EXIF stripping, metadata sanitization</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-[#153B6B]">Update Security</td>
                  <td className="px-6 py-4 text-gray-600">SHA512 checksum verification, signed updates</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Report Vulnerability */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AlertTriangle className="w-16 h-16 text-[#00A8B5] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-[#153B6B] mb-4">
              Found a Security Issue?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We take security seriously. If you&apos;ve discovered a vulnerability, please report it responsibly.
            </p>
            <Link
              href="/contact?subject=security"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#00A8B5] text-white font-semibold rounded-lg hover:bg-[#008c97] transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Report Vulnerability
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
