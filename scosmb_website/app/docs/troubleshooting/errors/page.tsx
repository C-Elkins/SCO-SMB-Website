'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Search, Info, ExternalLink, Code, Bug, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ErrorCodeReferencePage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const errorCodes = [
    {
      code: 'FTP_001',
      severity: 'critical',
      title: 'Connection Refused',
      description: 'Unable to establish FTP connection to the computer',
      causes: ['Firewall blocking connection', 'SCO SMB not running', 'Incorrect IP address'],
      solutions: ['Check firewall settings', 'Restart SCO SMB application', 'Verify computer IP address']
    },
    {
      code: 'FTP_002',
      severity: 'major',
      title: 'Authentication Failed',
      description: 'FTP login credentials rejected',
      causes: ['Incorrect username/password', 'User account disabled', 'Permission restrictions'],
      solutions: ['Verify login credentials', 'Check user account status', 'Review folder permissions']
    },
    {
      code: 'FTP_003',
      severity: 'major',
      title: 'Transfer Timeout',
      description: 'File transfer exceeded timeout limit',
      causes: ['Network congestion', 'Large file size', 'Slow connection'],
      solutions: ['Reduce file size/quality', 'Check network speed', 'Increase timeout settings']
    },
    {
      code: 'NET_001',
      severity: 'critical',
      title: 'Network Unreachable',
      description: 'Cannot reach the destination network',
      causes: ['Router/switch failure', 'Network cable disconnected', 'VLAN configuration issue'],
      solutions: ['Check physical connections', 'Verify network configuration', 'Contact network administrator']
    },
    {
      code: 'NET_002',
      severity: 'major',
      title: 'DNS Resolution Failed',
      description: 'Unable to resolve hostname to IP address',
      causes: ['DNS server unavailable', 'Incorrect hostname', 'Network configuration error'],
      solutions: ['Use IP address instead', 'Check DNS settings', 'Verify hostname spelling']
    },
    {
      code: 'SCAN_001',
      severity: 'minor',
      title: 'Scanner Busy',
      description: 'Scanner is currently processing another job',
      causes: ['Previous scan still processing', 'Scanner in use by another user', 'System overload'],
      solutions: ['Wait for current job to complete', 'Check scanner status', 'Restart scanner if needed']
    },
    {
      code: 'SCAN_002',
      severity: 'major',
      title: 'Document Jam',
      description: 'Physical document jam detected in scanner',
      causes: ['Paper jam in feed mechanism', 'Damaged document', 'Foreign object in scanner'],
      solutions: ['Clear paper jam carefully', 'Remove damaged documents', 'Clean scanner feed path']
    },
    {
      code: 'FILE_001',
      severity: 'major',
      title: 'Disk Space Full',
      description: 'Insufficient disk space for file operations',
      causes: ['Hard drive full', 'Large temporary files', 'Log files consuming space'],
      solutions: ['Free up disk space', 'Clean temporary files', 'Archive old documents']
    },
    {
      code: 'AUTH_001',
      severity: 'critical',
      title: 'License Invalid',
      description: 'Software license validation failed',
      causes: ['Expired license', 'Corrupted license file', 'License server unavailable'],
      solutions: ['Renew license', 'Reinstall license file', 'Contact support']
    }
  ];

  const filteredErrors = errorCodes.filter(error =>
    error.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    error.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    error.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'major': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'minor': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

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
            <Link href="/docs" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Documentation
            </Link>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-8 shadow-2xl"
            >
              <AlertTriangle className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight"
            >
              Error Code <span className="text-[#00A8B5]">Reference</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Comprehensive reference guide for troubleshooting common error codes and resolving system issues.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Searchable Database
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                Common Solutions
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                Expert Support
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container-wide">
          <div className="space-y-12">

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search error codes, titles, or descriptions..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Found {filteredErrors.length} error codes
              </p>
            </motion.div>

            {/* Error Codes Grid */}
            <div className="grid gap-6">
              {filteredErrors.map((error, index) => (
                <motion.div
                  key={error.code}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6 border border-gray-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(error.severity)}`}>
                        {error.code}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 text-center capitalize">
                        {error.severity}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{error.title}</h3>
                      <p className="text-gray-600 mb-4">{error.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                            <Bug className="w-4 h-4 mr-2 text-orange-500" />
                            Common Causes
                          </h4>
                          <ul className="space-y-1">
                            {error.causes.map((cause, causeIndex) => (
                              <li key={causeIndex} className="text-sm text-gray-600 flex items-start">
                                <span className="text-orange-400 mr-2">•</span>
                                {cause}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                            <Shield className="w-4 h-4 mr-2 text-green-500" />
                            Solutions
                          </h4>
                          <ul className="space-y-1">
                            {error.solutions.map((solution, solutionIndex) => (
                              <li key={solutionIndex} className="text-sm text-gray-600 flex items-start">
                                <span className="text-green-400 mr-2">•</span>
                                {solution}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-blue-50 border border-blue-200 rounded-lg p-6"
            >
              <div className="flex items-start gap-3">
                <Info className="w-6 h-6 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Need Additional Help?</h3>
                  <p className="text-blue-700 mb-4">
                    If you encounter an error code not listed here or need additional assistance, 
                    our support team is ready to help.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link 
                      href="/support" 
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Contact Support
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <Link 
                      href="/docs/troubleshooting" 
                      className="inline-flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                      Troubleshooting Guide
                      <Code className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}