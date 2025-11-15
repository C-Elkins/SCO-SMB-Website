'use client';

import { motion } from 'framer-motion';
import { Key, BarChart3, Users, Settings, Database, Download } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#153B6B] to-[#00A8B5] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Key className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Admin Dashboard
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
              License key management and analytics
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <Key className="w-12 h-12 text-[#00A8B5] mb-4" />
              <h3 className="text-xl font-semibold text-[#153B6B] mb-2">
                License Key Generation
              </h3>
              <p className="text-gray-600">
                Generate single or bulk license keys with custom settings, expiration dates, and download limits.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <Database className="w-12 h-12 text-[#00A8B5] mb-4" />
              <h3 className="text-xl font-semibold text-[#153B6B] mb-2">
                Key Management
              </h3>
              <p className="text-gray-600">
                View, search, filter, revoke, and manage all generated license keys from a centralized dashboard.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <BarChart3 className="w-12 h-12 text-[#00A8B5] mb-4" />
              <h3 className="text-xl font-semibold text-[#153B6B] mb-2">
                Download Analytics
              </h3>
              <p className="text-gray-600">
                Track download statistics, platform distribution, and usage trends with detailed charts and reports.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <Users className="w-12 h-12 text-[#00A8B5] mb-4" />
              <h3 className="text-xl font-semibold text-[#153B6B] mb-2">
                User Management
              </h3>
              <p className="text-gray-600">
                Manage admin accounts, track activity logs, and control access to the dashboard.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <Download className="w-12 h-12 text-[#00A8B5] mb-4" />
              <h3 className="text-xl font-semibold text-[#153B6B] mb-2">
                Export & Reports
              </h3>
              <p className="text-gray-600">
                Export license keys and download logs to CSV/Excel for external analysis and record-keeping.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <Settings className="w-12 h-12 text-[#00A8B5] mb-4" />
              <h3 className="text-xl font-semibold text-[#153B6B] mb-2">
                System Settings
              </h3>
              <p className="text-gray-600">
                Configure key format, expiration policies, download limits, and portal passwords.
              </p>
            </motion.div>
          </div>

          {/* Sample Dashboard UI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">
              Generate License Keys
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Keys
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  defaultValue="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Downloads per Key
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  defaultValue="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiration Date (Optional)
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Email (Optional)
                </label>
                <input
                  type="email"
                  placeholder="customer@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                  disabled
                />
              </div>
            </div>

            <button
              disabled
              className="w-full bg-[#00A8B5] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#008c97] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Generate Keys (Demo Only)
            </button>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Demo Mode</h4>
              <p className="text-sm text-blue-800">
                This is a demo interface. Full admin functionality requires backend infrastructure. 
                In production, this dashboard would connect to the PostgreSQL database to generate and manage license keys.
              </p>
            </div>
          </motion.div>

          {/* Sample Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6 mb-12"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-3xl font-bold text-[#153B6B] mb-2">--</div>
              <div className="text-sm text-gray-600">Total Keys Generated</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-3xl font-bold text-[#00A8B5] mb-2">--</div>
              <div className="text-sm text-gray-600">Active Keys</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">--</div>
              <div className="text-sm text-gray-600">Total Downloads</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">--</div>
              <div className="text-sm text-gray-600">Downloads This Month</div>
            </div>
          </motion.div>

          {/* Key Features List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">
              Admin Dashboard Capabilities
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-[#153B6B] mb-3">License Key Operations</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00A8B5] mt-1">✓</span>
                    <span>Generate single or batch license keys</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00A8B5] mt-1">✓</span>
                    <span>Set custom expiration dates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00A8B5] mt-1">✓</span>
                    <span>Configure download limits per key</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00A8B5] mt-1">✓</span>
                    <span>Revoke or expire keys instantly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00A8B5] mt-1">✓</span>
                    <span>Search and filter key database</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-[#153B6B] mb-3">Analytics & Reporting</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00A8B5] mt-1">✓</span>
                    <span>Platform distribution charts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00A8B5] mt-1">✓</span>
                    <span>Download trends over time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00A8B5] mt-1">✓</span>
                    <span>Most popular versions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00A8B5] mt-1">✓</span>
                    <span>Geographic distribution (IP-based)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00A8B5] mt-1">✓</span>
                    <span>Export to CSV/Excel</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
