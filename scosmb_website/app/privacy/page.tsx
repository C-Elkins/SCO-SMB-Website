"use client";
import { Shield, Lock, Eye, Database, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-linear-to-br from-[#153B6B] via-[#1e4a7f] to-[#00A8B5]">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
        
        <div className="relative container-wide section max-w-5xl py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Shield className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight">
              Privacy <span className="text-[#00A8B5]">Policy</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your privacy and data security are our top priorities
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-wide section max-w-6xl py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          {/* Last Updated Banner */}
          <div className="bg-linear-to-r from-blue-50 to-teal-50 border-b border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-[#153B6B]">Privacy Policy</h2>
                <p className="text-sm text-gray-600">Last updated: November 16, 2025 • Effective immediately</p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 prose prose-blue max-w-none">
            {/* Introduction */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#153B6B] rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#153B6B] m-0">Introduction</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                South Coast Office Supply, Inc. (<strong>"Company,"</strong> <strong>"we,"</strong> <strong>"our,"</strong> or <strong>"us"</strong>) 
                respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our SCO SMB software application and related services 
                (collectively, the <strong>"Service"</strong>).
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                <p className="text-blue-800 text-sm mb-0">
                  <strong>Important:</strong> By using our Service, you consent to the collection and use of information 
                  in accordance with this Privacy Policy.
                </p>
              </div>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#00A8B5] rounded-lg flex items-center justify-center">
                  <Database className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#153B6B] m-0">Information We Collect</h2>
              </div>
              
              <h3 className="text-lg font-semibold text-[#153B6B] mt-6 mb-3">Personal Information</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Contact Information:</strong> Name, email address, phone number, company name</li>
                <li><strong>Billing Information:</strong> Payment details for license purchases (processed by secure third-party providers)</li>
                <li><strong>Support Communications:</strong> Messages, attachments, and correspondence through our support channels</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#153B6B] mt-6 mb-3">SCO SMB Software Data Collection</h3>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-green-800 font-semibold mb-2">Zero Data Collection Promise</p>
                    <p className="text-green-700 text-sm">
                      <strong>The SCO SMB Software does NOT collect or transmit any personal information or usage data.</strong> 
                      All scanned documents are stored locally on your computer, ensuring complete privacy and data security.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-[#153B6B] mt-6 mb-3">Website & Web Portal Data</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>License Validation:</strong> License key verification for downloads (not stored)</li>
                <li><strong>Download Analytics:</strong> Platform and version statistics (anonymized)</li>
                <li><strong>Support Communications:</strong> Messages and correspondence through our support channels</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#153B6B] mt-6 mb-3">Web Portal Information</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Session Data:</strong> Temporary cookies for login sessions (web portal only)</li>
                <li><strong>Access Logs:</strong> Basic server logs for security and performance (IP addresses, access times)</li>
                <li><strong>Browser Information:</strong> User agent, browser type for compatibility purposes</li>
              </ul>
            </section>

            {/* Contact Information */}
            <section className="mb-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#00A8B5] rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#153B6B] m-0">Contact Us</h2>
              </div>
              
              <p className="text-gray-700 mb-6">
                For privacy-related questions, concerns, or to exercise your rights, please contact us:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <Mail className="w-8 h-8 text-[#00A8B5] mx-auto mb-3" />
                  <h3 className="font-semibold text-[#153B6B] mb-2">Email</h3>
                  <a href="mailto:support@southcoastoffice.com" className="text-[#00A8B5] hover:text-[#008991]">
                    support@southcoastoffice.com
                  </a>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <Phone className="w-8 h-8 text-[#00A8B5] mx-auto mb-3" />
                  <h3 className="font-semibold text-[#153B6B] mb-2">Phone</h3>
                  <a href="tel:+15412675114" className="text-[#00A8B5] hover:text-[#008991]">
                    (541) 267-5114
                  </a>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <MapPin className="w-8 h-8 text-[#00A8B5] mx-auto mb-3" />
                  <h3 className="font-semibold text-[#153B6B] mb-2">Address</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    199 N Broadway<br />
                    Coos Bay, OR 97420
                  </p>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
