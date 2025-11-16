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
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Grant of License</h3>
                <p className="text-blue-700 text-sm mb-3">
                  South Coast Office grants you a <strong>non-exclusive, non-transferable license</strong> to:
                </p>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>• Install and use the Software on computers within your organization</li>
                  <li>• Make one copy of the Software for archival or backup purposes</li>
                  <li>• Use the Software in accordance with the documentation provided</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#153B6B] mb-3">License Restrictions</h3>
                <p className="text-gray-700 mb-4">You may <strong>NOT</strong>:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Reverse engineer, decompile, or disassemble the Software</li>
                      <li>• Rent, lease, or lend the Software</li>
                      <li>• Modify or create derivative works based on the Software</li>
                      <li>• Remove or alter copyright, trademark, or proprietary notices</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Use the Software for any illegal purpose</li>
                      <li>• Share license keys with unauthorized users</li>
                      <li>• Distribute, sell, or sublicense the Software</li>
                      <li>• Use beyond authorized device/organization limits</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-6">
                <h3 className="text-lg font-semibold text-green-800 mb-3">Ownership & Intellectual Property</h3>
                <p className="text-green-700 text-sm">
                  <strong>The Software is licensed, not sold.</strong> South Coast Office retains all right, title, and interest 
                  in and to the Software, including all intellectual property rights. This license does not grant you any 
                  rights to trademarks or service marks of South Coast Office.
                </p>
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
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Technical Support & Updates</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                  <div>
                    <p><strong>Support Availability:</strong></p>
                    <p>South Coast Office may provide technical support and software updates at its sole discretion.</p>
                    <p className="mt-2"><strong>Business Hours:</strong><br />Monday - Friday<br />8:00 AM - 4:00 PM PST</p>
                  </div>
                  <div>
                    <p><strong>Automatic Updates:</strong></p>
                    <p>Updates may be automatically installed to ensure optimal performance and security.</p>
                    <p className="mt-2"><strong>Support Channels:</strong></p>
                    <ul className="space-y-1">
                      <li>• Email: support@southcoastoffice.com</li>
                      <li>• Phone: (541) 267-5114</li>
                      <li>• Website: www.southcoastoffice.com</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-3">Privacy & Data Collection</h3>
                <p className="text-green-700 text-sm">
                  <strong>No Data Collection:</strong> The Software does NOT collect or transmit any personal information 
                  or usage data. All scanned documents are stored locally on your computer, ensuring complete privacy 
                  and data security.
                </p>
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
                <p className="text-yellow-700 text-sm mb-3">
                  <strong>THE SOFTWARE IS PROVIDED "AS IS"</strong> WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, 
                  INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, 
                  AND NONINFRINGEMENT.
                </p>
                <p className="text-yellow-700 text-sm">
                  SOUTH COAST OFFICE DOES NOT WARRANT THAT THE SOFTWARE WILL MEET YOUR REQUIREMENTS OR THAT THE 
                  OPERATION OF THE SOFTWARE WILL BE UNINTERRUPTED OR ERROR-FREE.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-red-800 mb-3">Limitation of Liability</h3>
                <p className="text-red-700 text-sm mb-3">
                  <strong>IN NO EVENT SHALL SOUTH COAST OFFICE BE LIABLE</strong> FOR ANY SPECIAL, INCIDENTAL, INDIRECT, 
                  OR CONSEQUENTIAL DAMAGES WHATSOEVER (INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF BUSINESS PROFITS, 
                  BUSINESS INTERRUPTION, LOSS OF BUSINESS INFORMATION, OR ANY OTHER PECUNIARY LOSS) ARISING OUT OF THE USE 
                  OF OR INABILITY TO USE THE SOFTWARE.
                </p>
                <p className="text-red-700 text-sm">
                  This limitation applies EVEN IF SOUTH COAST OFFICE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Termination</h3>
                <p className="text-gray-700 text-sm mb-3">
                  <strong>Automatic Termination:</strong> Your rights under this agreement will terminate automatically 
                  without notice if you fail to comply with any term of these Terms.
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Upon Termination:</strong> You must destroy all copies of the Software and cease all use immediately.
                </p>
              </div>
            </section>

            {/* Governing Law */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#153B6B] rounded-lg flex items-center justify-center">
                  <Scale className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#153B6B] m-0">Governing Law & Entire Agreement</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Governing Law</h3>
                  <p className="text-blue-700 text-sm">
                    These Terms shall be governed by and construed in accordance with the laws of the jurisdiction 
                    in which South Coast Office operates, without regard to conflict of law provisions.
                  </p>
                </div>
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Entire Agreement</h3>
                  <p className="text-blue-700 text-sm">
                    These Terms constitute the entire agreement between you and South Coast Office relating to the 
                    Software and supersede all prior communications, proposals, and representations.
                  </p>
                </div>
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
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <Mail className="w-8 h-8 text-[#00A8B5] mx-auto mb-3" />
                  <h3 className="font-semibold text-[#153B6B] mb-2">Email Support</h3>
                  <a href="mailto:support@southcoastoffice.com" className="text-[#00A8B5] hover:text-[#008991] block mb-2">
                    support@southcoastoffice.com
                  </a>
                  <p className="text-gray-600 text-xs">For technical support and EULA questions</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="w-8 h-8 bg-[#00A8B5] rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[#153B6B] mb-2">Official Website</h3>
                  <a href="https://www.southcoastoffice.com" className="text-[#00A8B5] hover:text-[#008991] block mb-2">
                    www.southcoastoffice.com
                  </a>
                  <p className="text-gray-600 text-xs">South Coast Office - Official Site</p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-linear-to-r from-blue-50 to-teal-50 rounded-xl border border-blue-200">
                <div className="text-center">
                  <p className="text-blue-800 font-semibold mb-2">Legal Agreement Acknowledgment</p>
                  <p className="text-blue-700 text-sm">
                    By using SCO SMB software, you acknowledge that you have read this Terms of Service agreement, 
                    understand it, and agree to be bound by its terms and conditions.
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