'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Settings, Network, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function DocsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I configure my Kyocera printer to send scans to SCO SMB?",
      answer: "Go to your printer's web interface, navigate to Scan Settings, and add a new destination. Set the protocol to FTP, enter your computer's IP address, port 2121, and leave authentication blank for zero-config mode."
    },
    {
      question: "What ports does SCO SMB use?",
      answer: "By default, SCO SMB uses port 2121 for FTP. You can customize this in Settings. Make sure your firewall allows incoming connections on this port."
    },
    {
      question: "Why isn't my printer showing up in scanner discovery?",
      answer: "Ensure your printer is on the same network as your computer. Check that the printer's web interface is accessible. For Sharp printers, you may need to manually add the IP address."
    },
    {
      question: "How do I enable IP whitelisting?",
      answer: "Go to Settings > Security > IP Whitelist. Add the IP addresses of your printers. Only scans from these IPs will be accepted."
    },
    {
      question: "Where are my scans saved?",
      answer: "By default, scans are saved in your Documents folder under 'SCO SMB Scans' with automatic date-based organization (YYYY/MM/). You can change this location in Settings > General."
    },
    {
      question: "How do I update SCO SMB?",
      answer: "The app automatically checks for updates on startup. When a new version is available, you'll see a notification. Click 'Download Update' to get the latest version. Updates are verified with SHA512 checksums for security."
    },
    {
      question: "Can I use SMB protocol instead of FTP?",
      answer: "Yes! Enable SMB monitoring in Settings > Protocols. Point your printer to a shared folder, and SCO SMB will monitor it for new scans."
    },
    {
      question: "What file formats are supported?",
      answer: "SCO SMB supports PDF, JPEG, PNG, and TIFF files. The app validates file types and quarantines any suspicious uploads."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#153B6B] to-[#00A8B5] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Documentation
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
              Everything you need to get started with SCO SMB
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <Download className="w-8 h-8 text-[#00A8B5]" />
              <h2 className="text-3xl font-bold text-[#153B6B]">
                Quick Start Guide
              </h2>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
              <div className="border-l-4 border-[#00A8B5] pl-6">
                <h3 className="text-xl font-semibold text-[#153B6B] mb-2">
                  Step 1: Download and Install
                </h3>
                <p className="text-gray-600">
                  Download the appropriate installer for your platform (Mac or Windows) from the download page. Run the installer and follow the prompts. The app will launch automatically after installation.
                </p>
              </div>

              <div className="border-l-4 border-[#00A8B5] pl-6">
                <h3 className="text-xl font-semibold text-[#153B6B] mb-2">
                  Step 2: Discover Your Printers
                </h3>
                <p className="text-gray-600">
                  Click the &quot;Discover Scanners&quot; button in the app. SCO SMB will automatically find Kyocera and Sharp printers on your network. For Kyocera printers, zero-configuration setup is enabled by default.
                </p>
              </div>

              <div className="border-l-4 border-[#00A8B5] pl-6">
                <h3 className="text-xl font-semibold text-[#153B6B] mb-2">
                  Step 3: Configure Printer Settings
                </h3>
                <p className="text-gray-600">
                  Log into your printer&apos;s web interface. Add a new scan destination with FTP protocol, your computer&apos;s IP address shown in SCO SMB, and port 2121. Save the settings.
                </p>
              </div>

              <div className="border-l-4 border-[#00A8B5] pl-6">
                <h3 className="text-xl font-semibold text-[#153B6B] mb-2">
                  Step 4: Send Your First Scan
                </h3>
                <p className="text-gray-600">
                  Place a document on your printer, select &quot;Scan to FTP&quot; (or your configured destination), and press Start. The scan will appear in SCO SMB within seconds!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Configuration Guides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <Settings className="w-8 h-8 text-[#00A8B5]" />
              <h2 className="text-3xl font-bold text-[#153B6B]">
                Configuration Guides
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-[#153B6B] mb-4">
                  Kyocera Configuration
                </h3>
                <ol className="space-y-3 text-gray-600">
                  <li>1. Access printer web interface (http://printer-ip)</li>
                  <li>2. Navigate to Scan &gt; Destinations</li>
                  <li>3. Add new destination: FTP</li>
                  <li>4. Enter computer IP and port 2121</li>
                  <li>5. Leave username/password blank</li>
                  <li>6. Test connection</li>
                </ol>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-[#153B6B] mb-4">
                  Sharp Configuration
                </h3>
                <ol className="space-y-3 text-gray-600">
                  <li>1. Access MFP settings via web browser</li>
                  <li>2. Go to Scan Settings &gt; Network Folder</li>
                  <li>3. Add new network folder</li>
                  <li>4. Enter FTP server details</li>
                  <li>5. Configure file naming pattern</li>
                  <li>6. Save and test</li>
                </ol>
              </div>
            </div>
          </motion.div>

          {/* Network Setup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <Network className="w-8 h-8 text-[#00A8B5]" />
              <h2 className="text-3xl font-bold text-[#153B6B]">
                Network Configuration
              </h2>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#153B6B] mb-2">
                    Firewall Setup
                  </h3>
                  <p className="text-gray-600">
                    Ensure your firewall allows incoming connections on port 2121 (or your configured FTP port). On macOS, you may need to approve SCO SMB in System Preferences &gt; Security &amp; Privacy. On Windows, add an inbound rule for the SCO SMB application.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#153B6B] mb-2">
                    Static IP Recommendation
                  </h3>
                  <p className="text-gray-600">
                    For consistent operation, assign a static IP address to your computer or configure a DHCP reservation in your router. This prevents the printer from losing connection if your IP changes.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#153B6B] mb-2">
                    Enterprise Networks
                  </h3>
                  <p className="text-gray-600">
                    In enterprise environments, work with your IT department to ensure proper VLAN access between printers and computers running SCO SMB. Enable IP whitelisting in Settings &gt; Security for additional protection.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-8 h-8 text-[#00A8B5]" />
              <h2 className="text-3xl font-bold text-[#153B6B]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 last:border-b-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-[#153B6B] pr-8">
                      {faq.question}
                    </span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-[#00A8B5] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#00A8B5] shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-[#153B6B] mb-4">
              Need More Help?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our support team is ready to assist you with any questions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/support"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#00A8B5] text-white font-semibold rounded-lg hover:bg-[#008c97] transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Contact Support
              </a>
              <a
                href="https://github.com/C-Elkins/SCO-SMB"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#153B6B] text-white font-semibold rounded-lg hover:bg-[#0f2a4d] transition-all duration-200"
              >
                View on GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
