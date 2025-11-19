'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { 
  Download, Settings, Network, HelpCircle, ChevronDown, ChevronUp,
  Shield, FileText, Zap, MonitorSpeaker, Users, Database, AlertTriangle
} from 'lucide-react';
import { FAQSkeleton } from '@/components/LoadingSkeletons';

// Progressive loading for FAQ section
const FAQSection = dynamic(() => Promise.resolve(({ faqs, openFaq, setOpenFaq }: any) => (
  <div className="faq-accordion space-y-6">
    {faqs.map((faq: any, index: number) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
      >
        <button
          onClick={() => setOpenFaq(openFaq === index ? null : index)}
          className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-xl"
        >
          <span className="font-semibold text-gray-900">{faq.question}</span>
          {openFaq === index ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
        {openFaq === index && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-4"
          >
            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </motion.div>
    ))}
  </div>
)), {
  loading: () => <FAQSkeleton />,
  ssr: true
});

export default function DocsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const docSections = [
    {
      title: "Installation & Setup",
      icon: Download,
      description: "Get started with SCO SMB installation and initial configuration",
      guides: [
        { title: "Windows Installation Guide", href: "/docs/installation/windows", description: "Step-by-step Windows installation" },
        { title: "macOS Installation Guide", href: "/docs/installation/macos", description: "Complete macOS setup process" },
        { title: "First-Time Setup", href: "/docs/installation/first-time", description: "Initial configuration and license activation" },
        { title: "System Requirements", href: "/docs/installation/requirements", description: "Hardware and software requirements" }
      ]
    },
    {
      title: "Printer Configuration",
      icon: Settings,
      description: "Configure your network printers for seamless scanning",
      guides: [
        { title: "Kyocera Setup Guide", href: "/docs/printers/kyocera", description: "Complete Kyocera printer configuration" },
        { title: "Sharp MFP Configuration", href: "/docs/printers/sharp", description: "Sharp printer setup and optimization" },
        { title: "Generic Network Printer Setup", href: "/docs/printers/generic", description: "Configuration for other printer brands" },
        { title: "FTP vs SMB Protocol Guide", href: "/docs/printers/protocols", description: "Choosing the right protocol for your setup" }
      ]
    },
    {
      title: "Network & Security",
      icon: Shield,
      description: "Secure your scanning infrastructure and optimize network performance", 
      guides: [
        { title: "Network Configuration", href: "/docs/network/setup", description: "Network setup and firewall configuration" },
        { title: "Security Best Practices", href: "/docs/network/security", description: "IP whitelisting, authentication, and monitoring" },
        { title: "Enterprise Network Setup", href: "/docs/network/enterprise", description: "VLAN configuration and domain integration" },
        { title: "Port Configuration Guide", href: "/docs/network/ports", description: "Firewall and port configuration" }
      ]
    },
    {
      title: "Advanced Features",
      icon: Zap,
      description: "Unlock the full potential of SCO SMB with advanced features",
      guides: [
        { title: "Automatic File Organization", href: "/docs/features/organization", description: "Custom naming patterns and folder structure" },
        { title: "Audit Logging & Compliance", href: "/docs/features/audit", description: "Complete activity monitoring and reporting" },
        { title: "Backup & Recovery", href: "/docs/features/backup", description: "Data protection and disaster recovery" },
        { title: "Integration with Business Systems", href: "/docs/features/integration", description: "API access and third-party integrations" }
      ]
    },
    {
      title: "Troubleshooting",
      icon: AlertTriangle,
      description: "Solve common issues and optimize performance",
      guides: [
        { title: "Connection Issues", href: "/docs/troubleshooting/connection", description: "Printer discovery and network connectivity" },
        { title: "Performance Optimization", href: "/docs/troubleshooting/performance", description: "Speed up scanning and file processing" },
        { title: "Error Code Reference", href: "/docs/troubleshooting/errors", description: "Complete error code documentation" },
        { title: "Log Analysis", href: "/docs/troubleshooting/logs", description: "Reading and interpreting system logs" }
      ]
    },
    {
      title: "Industry Solutions",
      icon: Users,
      description: "Specialized configurations for different industries",
      guides: [
        { title: "Healthcare Document Compliance", href: "/docs/industry/healthcare", description: "HIPAA-compliant scanning setup" },
        { title: "Legal Firm Configuration", href: "/docs/industry/legal", description: "Secure document handling for legal practices" },
        { title: "Financial Services Setup", href: "/docs/industry/finance", description: "Banking and finance industry compliance" },
        { title: "Education Environment", href: "/docs/industry/education", description: "School and university deployment" }
      ]
    }
  ];

  const faqs = [
    {
      question: "How do I configure my Kyocera printer to send scans to SCO SMB?",
      answer: "Go to your printer's web interface, navigate to Scan Settings, and add a new destination. Set the protocol to FTP, enter your computer's IP address, port 21, and leave authentication blank for zero-config mode."
    },
    {
      question: "What ports does SCO SMB use?",
      answer: "By default, SCO SMB uses port 21 for FTP. You can customize this in Settings. Make sure your firewall allows incoming connections on this port."
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative bg-linear-to-br from-[#153B6B] via-[#1e4a7f] to-[#00A8B5] text-white pt-32 pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 left-10 w-60 h-60 bg-[#00A8B5]/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
          <div style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.03\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} className="absolute inset-0 opacity-40" />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [-15, 15, -15], rotate: [0, 90, 180] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-32 right-20 w-5 h-5 border-2 border-white/25 rotate-45"
          />
          <motion.div
            animate={{ y: [25, -25, 25], x: [-10, 10, -10] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-40 right-32 w-3 h-3 bg-white/15 rounded-full"
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
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight"
            >
              <span className="text-[#00A8B5]">Documentation</span> & Guides
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Everything you need to get started with SCO SMB. From installation to advanced configuration.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Comprehensive Setup Guide
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                Configuration Examples
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                Network Troubleshooting
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-20">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#153B6B] mb-4">
              Choose Your Guide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From basic installation to advanced enterprise configuration, we've got you covered.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {docSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#153B6B] to-[#00A8B5] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#153B6B]">
                      {section.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {section.description}
                  </p>
                  
                  <div className="space-y-3">
                    {section.guides.map((guide, guideIndex) => (
                      <Link
                        key={guide.href}
                        href={guide.href}
                        className="block p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-[#00A8B5]/20 group/guide"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#153B6B] group-hover/guide:text-[#00A8B5] transition-colors text-sm">
                              {guide.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {guide.description}
                            </p>
                          </div>
                          <div className="ml-2 opacity-0 group-hover/guide:opacity-100 transition-opacity">
                            <svg className="w-4 h-4 text-[#00A8B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="py-20 relative overflow-hidden bg-white">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-[#153B6B]/5 to-[#00A8B5]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-br from-[#00A8B5]/5 to-[#153B6B]/5 rounded-full blur-2xl"></div>
        
        <div className="container-wide relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
          <motion.div
            id="quick-start"
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
                  Log into your printer&apos;s web interface. Add a new scan destination with FTP protocol, your computer&apos;s IP address or Hostname shown in SCO SMB, and port 21. Save the settings.
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
            id="configuration"
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
                  <li>4. Enter computer IP or Hostname and port 21</li>
                  <li>5. Enter username and password found on your SCO SMB</li>
                  <li>6. Test connection</li>
                </ol>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-[#153B6B] mb-4">
                  Sharp Configuration
                </h3>
                <ol className="space-y-3 text-gray-600">
                  <li>1. Access MFP settings via web browser</li>
                  <li>2. Go to AddressBook&gt; New destination</li>
                  <li>3. Add new destination: FTP</li>
                  <li>4. Enter FTP server details</li>
                  <li>5. Configure file naming pattern</li>
                  <li>6. Save and test</li>
                </ol>
              </div>
            </div>
          </motion.div>

          {/* Network Setup */}
          <motion.div
            id="network"
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
                    Ensure your firewall allows incoming connections on port 21 (or your configured FTP port). On macOS, you may need to approve SCO SMB in System Preferences &gt; Security &amp; Privacy. On Windows, add an inbound rule for the SCO SMB application.
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
            id="faq"
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
              
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Quick Links */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100 sticky top-8"
                >
                  <h3 className="text-lg font-semibold text-[#153B6B] mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#00A8B5] rounded-full"></span>
                    Quick Navigation
                  </h3>
                  <nav className="space-y-2">
                    <a href="#quick-start" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#00A8B5] transition-colors p-2 rounded-lg hover:bg-[#00A8B5]/5">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      Quick Start Guide
                    </a>
                    <a href="#configuration" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#00A8B5] transition-colors p-2 rounded-lg hover:bg-[#00A8B5]/5">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      Configuration
                    </a>
                    <a href="#network" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#00A8B5] transition-colors p-2 rounded-lg hover:bg-[#00A8B5]/5">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      Network Setup
                    </a>
                    <a href="#faq" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#00A8B5] transition-colors p-2 rounded-lg hover:bg-[#00A8B5]/5">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      FAQ
                    </a>
                  </nav>
                </motion.div>
                
                {/* Tips Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-[#00A8B5]/10 to-[#153B6B]/10 rounded-xl p-6 border border-[#00A8B5]/20"
                >
                  <h3 className="text-lg font-semibold text-[#153B6B] mb-3 flex items-center gap-2">
                    💡 Pro Tips
                  </h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[#00A8B5] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Use static IP addresses for consistent printer connections</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[#00A8B5] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Test connections after configuration changes</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[#00A8B5] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Enable IP whitelisting for enhanced security</span>
                    </div>
                  </div>
                </motion.div>
                
                {/* Support Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100"
                >
                  <h3 className="text-lg font-semibold text-[#153B6B] mb-3 flex items-center gap-2">
                    🆘 Need Help?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Our support team is ready to assist you with setup and troubleshooting.
                  </p>
                  <div className="space-y-2">
                    <a href="/support" className="block w-full text-center bg-[#00A8B5] text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-[#008c97] transition-colors">
                      Contact Support
                    </a>
                    <a href="https://github.com/C-Elkins/SCO-SMB" target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-[#153B6B] text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-[#0f2a4d] transition-colors">
                      View GitHub
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
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
