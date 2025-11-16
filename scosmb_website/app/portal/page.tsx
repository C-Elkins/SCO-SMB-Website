'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Download, Book, Wrench, GitBranch, Shield, LogIn, Globe, Check, ExternalLink } from 'lucide-react';

export default function PortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/portal/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
      } else {
        setError(data.error || 'Invalid access code');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#153B6B] to-[#00A8B5] flex items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            {/* Logo/Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-linear-to-br from-[#153B6B] to-[#00A8B5] rounded-2xl flex items-center justify-center">
                <Wrench className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-[#153B6B] text-center mb-2">
              Technician Portal
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Enter access code for authorized technicians
            </p>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Access Code
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent transition-all"
                  placeholder="Enter technician access code"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-linear-to-r from-[#153B6B] to-[#00A8B5] text-white font-semibold py-4 rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Access Portal
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-500 mb-3">
                For authorized service technicians only
              </p>
              <Link href="/download" className="text-sm text-[#00A8B5] hover:underline font-medium">
                Customer? Go to Downloads →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-linear-to-br from-[#153B6B] via-[#1e4a7f] to-[#00A8B5]">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
        
        <div className="relative container-wide section max-w-5xl py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            {/* Status Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Authorized Access Portal
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                Technician Tools & Resources
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                No License Required
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight">
              <span className="text-[#00A8B5]">Technician</span> Portal
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Unrestricted access to downloads, documentation, and service tools for authorized technicians
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <Wrench className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">Service Tools</div>
                <div className="text-white/70 text-sm">Diagnostic & Installation</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <Download className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">All Versions</div>
                <div className="text-white/70 text-sm">Current & Previous</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <Book className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">Documentation</div>
                <div className="text-white/70 text-sm">Complete Tech Docs</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Portal Features */}
      <section className="py-20">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#153B6B] mb-4">
              Technician Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for efficient installations and service calls
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:border-[#00A8B5] transition-all duration-300"
            >
              <div className="w-16 h-16 bg-linear-to-br from-[#153B6B] to-[#00A8B5] rounded-2xl flex items-center justify-center mb-6">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#153B6B] mb-3">
                Instant Downloads
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Access current and previous releases instantly. No license validation required for technician installations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:border-[#00A8B5] transition-all duration-300"
            >
              <div className="w-16 h-16 bg-linear-to-br from-[#153B6B] to-[#00A8B5] rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#153B6B] mb-3">
                Technical Documentation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Complete installation guides, troubleshooting procedures, and technical specifications for field service.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:border-[#00A8B5] transition-all duration-300"
            >
              <div className="w-16 h-16 bg-linear-to-br from-[#153B6B] to-[#00A8B5] rounded-2xl flex items-center justify-center mb-6">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#153B6B] mb-3">
                Service Tools
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Diagnostic scripts, configuration templates, and automation tools for faster client deployments.
              </p>
            </motion.div>
          </div>

          {/* Download Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-linear-to-br from-[#153B6B] to-[#00A8B5] rounded-xl flex items-center justify-center">
                <Download className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#153B6B]">
                  SCO SMB Downloads
                </h2>
                <p className="text-gray-600">No license key required for technicians</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="border-2 border-[#00A8B5] bg-linear-to-br from-teal-50 to-blue-50 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-[#153B6B]">Latest Release (v1.1.1)</h3>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">RECOMMENDED</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Production stable version • Released November 15, 2025</p>
                    <div className="text-xs text-gray-500">All platforms • Direct GitHub download</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <a 
                      href="https://github.com/C-Elkins/SCO-SMB/releases/download/v1.1.1/SCO.SMB-1.1.1-arm64.dmg"
                      className="px-4 py-2 bg-[#153B6B] text-white rounded-lg hover:bg-[#0f2a4d] transition-colors text-sm font-medium text-center"
                    >
                      Mac (Apple Silicon)
                    </a>
                    <a 
                      href="https://github.com/C-Elkins/SCO-SMB/releases/download/v1.1.1/SCO.SMB-1.1.1-x64.dmg"
                      className="px-4 py-2 bg-[#153B6B] text-white rounded-lg hover:bg-[#0f2a4d] transition-colors text-sm font-medium text-center"
                    >
                      Mac (Intel)
                    </a>
                    <a 
                      href="https://github.com/C-Elkins/SCO-SMB/releases/download/v1.1.1/SCO.SMB-Setup-1.1.1.exe"
                      className="px-4 py-2 bg-[#153B6B] text-white rounded-lg hover:bg-[#0f2a4d] transition-colors text-sm font-medium text-center"
                    >
                      Windows
                    </a>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-6 bg-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-[#153B6B] mb-1">Previous Versions</h3>
                    <p className="text-sm text-gray-600">Legacy releases for compatibility testing</p>
                  </div>
                  <a 
                    href="https://github.com/C-Elkins/SCO-SMB/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View All Releases
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <Shield className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-900 mb-1">⚠️ Technician Access Warning</h4>
                <p className="text-sm text-red-800">
                  <strong>IMPORTANT:</strong> Downloads bypass license validation. For authorized service calls only. Customer installations require valid license keys.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Reference Guides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-linear-to-br from-[#153B6B] to-[#00A8B5] rounded-xl flex items-center justify-center">
                <Book className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#153B6B]">
                  Quick Reference Guides
                </h2>
                <p className="text-gray-600">Essential resources for field service</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border border-gray-200 rounded-xl hover:border-[#00A8B5] hover:shadow-lg transition-all duration-300 bg-linear-to-br from-white to-gray-50">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Wrench className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-[#153B6B] mb-2">Installation Best Practices</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  Step-by-step guides for clean installations, upgrades, and troubleshooting common deployment issues.
                </p>
                <Link href="/docs" className="text-[#00A8B5] font-medium hover:underline text-sm flex items-center gap-1">
                  View Installation Guide <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              <div className="p-6 border border-gray-200 rounded-xl hover:border-[#00A8B5] hover:shadow-lg transition-all duration-300 bg-linear-to-br from-white to-gray-50">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-semibold text-[#153B6B] mb-2">Common Issues Database</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  Known issues, solutions, and workarounds for frequently encountered problems in the field.
                </p>
                <Link href="/support" className="text-[#00A8B5] font-medium hover:underline text-sm flex items-center gap-1">
                  View Support Database <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              <div className="p-6 border border-gray-200 rounded-xl hover:border-[#00A8B5] hover:shadow-lg transition-all duration-300 bg-linear-to-br from-white to-gray-50">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-[#153B6B] mb-2">Service Checklist</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  Comprehensive checklist to ensure proper setup and configuration for customer deployments.
                </p>
                <a href="#" className="text-[#00A8B5] font-medium hover:underline text-sm flex items-center gap-1">
                  Download Checklist <Download className="w-3 h-3" />
                </a>
              </div>

              <div className="p-6 border border-gray-200 rounded-xl hover:border-[#00A8B5] hover:shadow-lg transition-all duration-300 bg-linear-to-br from-white to-gray-50">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <GitBranch className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-[#153B6B] mb-2">Diagnostic Tools</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  Diagnostic scripts, configuration templates, and automation tools for faster deployments.
                </p>
                <a 
                  href="https://github.com/C-Elkins/SCO-SMB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00A8B5] font-medium hover:underline text-sm flex items-center gap-1"
                >
                  View on GitHub <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 bg-linear-to-br from-gray-50 to-white">
        <div className="container-wide max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-[#153B6B] mb-4">
              Additional Resources
            </h2>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
              Access the source code, admin dashboard, and return to the main website
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="https://github.com/C-Elkins/SCO-SMB"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-[#153B6B] hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gray-100 group-hover:bg-[#153B6B] rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <GitBranch className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-[#153B6B] mb-2">GitHub Repository</h3>
                <p className="text-gray-600 text-sm">Access source code and contribute to development</p>
              </a>
              
              <Link
                href="/admin"
                className="group p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-[#00A8B5] hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gray-100 group-hover:bg-[#00A8B5] rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <Shield className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-[#153B6B] mb-2">Admin Dashboard</h3>
                <p className="text-gray-600 text-sm">Manage licenses, users, and system settings</p>
              </Link>

              <Link
                href="/"
                className="group p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gray-100 group-hover:bg-gray-300 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <ExternalLink className="w-6 h-6 text-gray-600 group-hover:text-gray-700 transition-colors" />
                </div>
                <h3 className="font-semibold text-[#153B6B] mb-2">Main Website</h3>
                <p className="text-gray-600 text-sm">Return to the customer-facing website</p>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
