'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Lock, FileCheck, Eye, AlertTriangle, CheckCircle } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative bg-linear-to-br from-[#153B6B] via-[#1e4a7f] to-[#00A8B5] text-white pt-32 pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-16 left-16 w-36 h-36 bg-white/5 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-32 right-24 w-52 h-52 bg-[#00A8B5]/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2.5s' }} />
          <div className="absolute bottom-24 left-32 w-44 h-44 bg-white/8 rounded-full blur-xl animate-pulse" style={{ animationDelay: '5s' }} />
          <div style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"80\" height=\"80\" viewBox=\"0 0 80 80\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.02\"%3E%3Cpath d=\"M40 40l20-20v20h20L60 60H40V40zm-20 0L0 20v20h20l20 20H20V40z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} className="absolute inset-0 opacity-40" />
        </div>
        
        {/* Security-themed Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [-18, 18, -18], rotate: [0, 45, 90] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-28 right-16 w-6 h-6 border-2 border-white/20 rotate-45"
          />
          <motion.div
            animate={{ y: [22, -22, 22], rotate: [360, 270, 180] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-36 left-20 w-4 h-4 bg-white/12 rounded-full"
          />
          <motion.div
            animate={{ x: [-12, 12, -12], y: [8, -8, 8] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 right-1/3 w-7 h-7 border border-[#00A8B5]/25 rounded-full"
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
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight"
            >
              <span className="text-[#00A8B5]">Enterprise-Grade</span>
              <br />
              Security
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Built with security-first design principles for modern enterprises
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Security-First Design
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                Enterprise-Grade Controls
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                Zero Trust Architecture
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 card-depth group"
            >
              <div className="w-14 h-14 bg-linear-to-br from-[#00A8B5] to-[#008c97] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#153B6B] mb-4">
                IP Whitelisting
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Control exactly which IP addresses can send scans to your system. Prevent unauthorized access from unknown sources.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#00A8B5] font-bold">✓</span>
                  <span>Allow/block specific IPs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00A8B5] font-bold">✓</span>
                  <span>CIDR range support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00A8B5] font-bold">✓</span>
                  <span>Dynamic blocklist</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00A8B5] font-bold">✓</span>
                  <span>Rate limiting per IP</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 card-depth group"
            >
              <div className="w-14 h-14 bg-linear-to-br from-[#00A8B5] to-[#008c97] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <FileCheck className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#153B6B] mb-4">
                File Validation
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Comprehensive file validation and quarantine system to protect against malicious uploads.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2"><span className="text-[#00A8B5] font-bold">✓</span><span>MIME type validation</span></li>
                <li className="flex items-start gap-2"><span className="text-[#00A8B5] font-bold">✓</span><span>File size limits</span></li>
                <li className="flex items-start gap-2"><span className="text-[#00A8B5] font-bold">✓</span><span>Extension verification</span></li>
                <li className="flex items-start gap-2"><span className="text-[#00A8B5] font-bold">✓</span><span>Quarantine suspicious files</span></li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 card-depth group"
            >
              <div className="w-14 h-14 bg-linear-to-br from-[#00A8B5] to-[#008c97] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#153B6B] mb-4">
                Audit Logging
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Tamper-evident audit logs track all system activities for compliance and security monitoring.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2"><span className="text-[#00A8B5] font-bold">✓</span><span>All events logged</span></li>
                <li className="flex items-start gap-2"><span className="text-[#00A8B5] font-bold">✓</span><span>Tamper-evident design</span></li>
                <li className="flex items-start gap-2"><span className="text-[#00A8B5] font-bold">✓</span><span>Log rotation & retention</span></li>
                <li className="flex items-start gap-2"><span className="text-[#00A8B5] font-bold">✓</span><span>Export for SIEM systems</span></li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 card-depth group"
            >
              <div className="w-14 h-14 bg-linear-to-br from-[#00A8B5] to-[#008c97] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Lock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#153B6B] mb-4">
                Data Privacy
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                EXIF metadata stripping ensures document privacy and prevents information leakage.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2"><span className="text-[#00A8B5] font-bold">✓</span><span>EXIF metadata removal</span></li>
                <li className="flex items-start gap-2"><span className="text-[#00A8B5] font-bold">✓</span><span>GPS data stripping</span></li>
                <li className="flex items-start gap-2"><span className="text-[#00A8B5] font-bold">✓</span><span>Timestamp sanitization</span></li>
                <li className="flex items-start gap-2"><span className="text-[#00A8B5] font-bold">✓</span><span>Camera info removal</span></li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 card-depth group"
            >
              <div className="w-14 h-14 bg-linear-to-br from-[#00A8B5] to-[#008c97] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <AlertTriangle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#153B6B] mb-4">
                Vulnerability Reporting
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Responsible disclosure program for security researchers to report vulnerabilities.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2"><span className="text-[#00A8B5] font-bold">✓</span><span>Secure reporting channel</span></li>
                <li className="flex items-start gap-2"><span className="text-[#00A8B5] font-bold">✓</span><span>Rapid response team</span></li>
                <li className="flex items-start gap-2"><span className="text-[#00A8B5] font-bold">✓</span><span>Coordinated disclosure</span></li>
                <li className="flex items-start gap-2"><span className="text-[#00A8B5] font-bold">✓</span><span>Recognition program</span></li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 card-depth group"
            >
              <div className="w-14 h-14 bg-linear-to-br from-[#00A8B5] to-[#008c97] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#153B6B] mb-4">
                Security Standards
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Built with security best practices and enterprise-grade controls to support your compliance needs.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2"><span className="text-[#00A8B5] font-bold">✓</span><span>Privacy-focused architecture</span></li>
                <li className="flex items-start gap-2"><span className="text-[#00A8B5] font-bold">✓</span><span>Healthcare-friendly security</span></li>
                <li className="flex items-start gap-2"><span className="text-[#00A8B5] font-bold">✓</span><span>Industry standard encryption</span></li>
                <li className="flex items-start gap-2"><span className="text-[#00A8B5] font-bold">✓</span><span>Comprehensive audit logging</span></li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Controls Matrix */}
      <section className="py-20 bg-white">
        <div className="container-custom">
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
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
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
              className="inline-flex items-center justify-center px-10 py-4 bg-linear-to-r from-[#00A8B5] to-[#008c97] text-white font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl press-scale"
            >
              Report Vulnerability
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
