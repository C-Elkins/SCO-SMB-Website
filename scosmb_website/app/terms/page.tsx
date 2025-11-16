"use client";
import { FileText, Shield, AlertTriangle, Scale, Users, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TermsPage() {
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
                <FileText className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight">
              Terms of <span className="text-[#00A8B5]">Service</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Legal terms governing your use of SCO SMB software
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
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-[#153B6B]">Terms of Service Agreement</h2>
                <p className="text-sm text-gray-600">Last updated: November 16, 2025 • Effective immediately</p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 prose prose-blue max-w-none">
            {/* Agreement to Terms */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#153B6B] rounded-lg flex items-center justify-center">
                  <Scale className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#153B6B] m-0">Agreement to Terms</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms of Service (<strong>"Terms"</strong>) constitute a legally binding agreement between you 
                (<strong>"User,"</strong> <strong>"you,"</strong> or <strong>"your"</strong>) and South Coast Office Supply, Inc. 
                (<strong>"Company,"</strong> <strong>"we,"</strong> <strong>"our,"</strong> or <strong>"us"</strong>) regarding your use of 
                the SCO SMB software application and related services (collectively, the <strong>"Service"</strong>).
              </p>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-red-800 font-semibold mb-2">Important Legal Notice</p>
                    <p className="text-red-700 text-sm mb-0">
                      By downloading, installing, or using the Service, you acknowledge that you have read, understood, 
                      and agree to be bound by these Terms. If you do not agree, you may not use the Service.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* License Grant */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#00A8B5] rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#153B6B] m-0">License Grant and Restrictions</h2>
              </div>
              
              <p className="text-gray-700 mb-4">
                SCO SMB is proprietary software owned by South Coast Office Supply, Inc. Subject to your compliance with these 
                Terms and payment of applicable fees, we grant you a limited, non-exclusive, non-transferable, revocable license to 
                install and use the Software on your authorized devices.
              </p>

              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-700 mb-4">You agree <strong>NOT</strong> to:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Copy, modify, or create derivative works</li>
                      <li>• Reverse engineer, decompile, or disassemble</li>
                      <li>• Distribute, sell, lease, or sublicense</li>
                      <li>• Remove copyright or proprietary notices</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Share license keys with unauthorized users</li>
                      <li>• Use for illegal or unauthorized purposes</li>
                      <li>• Attempt to bypass security measures</li>
                      <li>• Use beyond authorized device limits</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Support Services */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#153B6B] m-0">Support Services</h2>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Technical Support</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                  <div>
                    <p><strong>Business Hours:</strong></p>
                    <p>Monday - Friday<br />8:00 AM - 4:00 PM PST</p>
                  </div>
                  <div>
                    <p><strong>Support Channels:</strong></p>
                    <ul className="space-y-1">
                      <li>• Email: support@southcoastoffice.com</li>
                      <li>• Phone: (541) 267-5114</li>
                      <li>• Web Portal: Technical documentation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Disclaimers */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#153B6B] m-0">Disclaimers and Limitation of Liability</h2>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">Warranty Disclaimer</h3>
                <p className="text-yellow-700 text-sm">
                  SCO SMB is provided "as is" without warranty of any kind. We do not guarantee uninterrupted, 
                  error-free, or completely secure operation.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-3">Limitation of Liability</h3>
                <p className="text-red-700 text-sm">
                  South Coast Office Supply shall not be liable for any indirect, incidental, or consequential 
                  damages arising from use of the software. Our total liability shall not exceed the amount 
                  paid for the software license.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#00A8B5] rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#153B6B] m-0">Contact Information</h2>
              </div>
              
              <p className="text-gray-700 mb-6">
                For questions about these Terms, please contact us:
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
                    South Coast Office Supply, Inc.<br />
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