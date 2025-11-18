'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, FileText, Clock, Database, Shield, CheckCircle } from 'lucide-react';

export default function AuditLoggingPage() {
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
              <FileText className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight"
            >
              <span className="text-[#00A8B5]">Audit</span> Logging & Compliance
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Complete activity monitoring, compliance reporting, and audit trail features for enterprise environments requiring detailed documentation of all scanning activities.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                HIPAA Compliant
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                SIEM Integration
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                Real-time Monitoring
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-12">
            
            {/* Audit Logging Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-8 h-8 text-[#00A8B5]" />
                <h2 className="text-2xl font-bold text-[#153B6B]">Comprehensive Activity Logging</h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-gray-600">
                  SCO SMB automatically logs all scanning activities, user actions, and system events to provide 
                  a complete audit trail for compliance and security monitoring purposes.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 border-l-4 border-[#00A8B5] p-4">
                    <h4 className="font-semibold text-[#153B6B] mb-3">What Gets Logged</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• All incoming scan files with timestamps</li>
                      <li>• Source printer IP addresses and hostnames</li>
                      <li>• File names, sizes, and formats</li>
                      <li>• User access to scanned documents</li>
                      <li>• System configuration changes</li>
                      <li>• Authentication attempts and failures</li>
                      <li>• Error conditions and system alerts</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 border-l-4 border-green-400 p-4">
                    <h4 className="font-semibold text-green-800 mb-3">Compliance Benefits</h4>
                    <ul className="space-y-2 text-green-700 text-sm">
                      <li>• HIPAA compliance for healthcare</li>
                      <li>• SOX compliance for financial services</li>
                      <li>• GDPR compliance for data protection</li>
                      <li>• ISO 27001 security standards</li>
                      <li>• Legal discovery requirements</li>
                      <li>• Internal audit requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Log Configuration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-[#00A8B5]" />
                <h2 className="text-2xl font-bold text-[#153B6B]">Audit Log Configuration</h2>
              </div>
              
              <div className="space-y-6">
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold text-[#153B6B] mb-3">Enabling Audit Logging</h3>
                  <p className="text-gray-600 mb-4">
                    Audit logging is enabled by default in SCO SMB. You can configure the level of detail 
                    and retention policies in the application settings.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-[#153B6B] mb-4">Configuration Steps</h4>
                  <ol className="space-y-3 text-gray-700">
                    <li><strong>1.</strong> Open SCO SMB Settings → Security → Audit Logging</li>
                    <li><strong>2.</strong> Select logging level (Basic, Detailed, or Comprehensive)</li>
                    <li><strong>3.</strong> Configure log retention period (30 days to 7 years)</li>
                    <li><strong>4.</strong> Set log file size limits and rotation policy</li>
                    <li><strong>5.</strong> Configure remote syslog server (optional)</li>
                    <li><strong>6.</strong> Enable log file encryption for sensitive data</li>
                  </ol>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-[#00A8B5] mb-2">Basic</div>
                    <p className="text-sm text-gray-600">Essential security events and scan activities</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600 mb-2">Detailed</div>
                    <p className="text-sm text-gray-600">Comprehensive activity tracking with user context</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-2">Full</div>
                    <p className="text-sm text-gray-600">Complete forensic-level logging with file hashes</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Log Analysis & Reporting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-8 h-8 text-[#00A8B5]" />
                <h2 className="text-2xl font-bold text-[#153B6B]">Log Analysis & Reporting</h2>
              </div>
              
              <div className="space-y-6">
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold text-[#153B6B] mb-3">Built-in Reporting Tools</h3>
                  <p className="text-gray-600 mb-4">
                    SCO SMB includes powerful reporting tools to generate compliance reports and analyze usage patterns.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-[#153B6B] mb-3">Available Reports</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• <strong>Usage Summary:</strong> Scanning volume by time period</li>
                      <li>• <strong>User Activity:</strong> Individual user scanning patterns</li>
                      <li>• <strong>Printer Analytics:</strong> Device usage and performance</li>
                      <li>• <strong>Security Events:</strong> Failed attempts and anomalies</li>
                      <li>• <strong>Compliance Report:</strong> Formatted for auditors</li>
                      <li>• <strong>Data Retention:</strong> File lifecycle tracking</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-[#153B6B] mb-3">Export Formats</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• <strong>PDF:</strong> Executive summaries and compliance reports</li>
                      <li>• <strong>CSV:</strong> Raw data for spreadsheet analysis</li>
                      <li>• <strong>JSON:</strong> Structured data for API integration</li>
                      <li>• <strong>XML:</strong> System integration and SIEM tools</li>
                      <li>• <strong>Syslog:</strong> Real-time streaming to log servers</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-[#153B6B] mb-3">Sample Log Entry</h4>
                  <div className="bg-gray-900 rounded p-4 text-green-400 text-sm font-mono overflow-x-auto">
{`{
  "timestamp": "2024-11-17T14:30:45.123Z",
  "event_type": "scan_received",
  "source_ip": "192.168.1.100",
  "source_hostname": "printer-01.company.com",
  "filename": "invoice_2024_001.pdf",
  "file_size": 245760,
  "file_hash": "sha256:a1b2c3d4...",
  "user_accessed": [],
  "quarantine_status": "clean",
  "retention_until": "2031-11-17T14:30:45.123Z"
}`}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Compliance Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-8 h-8 text-[#00A8B5]" />
                <h2 className="text-2xl font-bold text-[#153B6B]">Industry Compliance</h2>
              </div>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <h4 className="font-semibold text-red-800 mb-3">HIPAA Compliance</h4>
                    <ul className="space-y-1 text-red-700 text-sm">
                      <li>• Encrypted audit logs</li>
                      <li>• Access control logging</li>
                      <li>• PHI handling documentation</li>
                      <li>• User authentication tracking</li>
                      <li>• Minimum necessary principle enforcement</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                    <h4 className="font-semibold text-blue-800 mb-3">SOX Compliance</h4>
                    <ul className="space-y-1 text-blue-700 text-sm">
                      <li>• Financial document tracking</li>
                      <li>• Change management logging</li>
                      <li>• Segregation of duties enforcement</li>
                      <li>• Retention policy compliance</li>
                      <li>• Independent audit trail verification</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="font-semibold text-green-800 mb-3">Automated Compliance Reporting</h4>
                  <p className="text-green-700 mb-4">
                    Generate compliance reports automatically on scheduled intervals:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-green-800 font-bold">📊</span>
                      </div>
                      <p className="text-sm font-medium text-green-800">Daily</p>
                      <p className="text-xs text-green-600">Activity summaries</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-green-800 font-bold">📈</span>
                      </div>
                      <p className="text-sm font-medium text-green-800">Monthly</p>
                      <p className="text-xs text-green-600">Compliance reports</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-green-800 font-bold">📋</span>
                      </div>
                      <p className="text-sm font-medium text-green-800">Quarterly</p>
                      <p className="text-xs text-green-600">Audit packages</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Integration Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-8 h-8 text-[#00A8B5]" />
                <h2 className="text-2xl font-bold text-[#153B6B]">Integration with Security Systems</h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-gray-600">
                  Integrate SCO SMB audit logs with your existing security information and event management (SIEM) 
                  systems for centralized monitoring and alerting.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-[#153B6B] mb-3">Supported Integrations</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• <strong>Splunk:</strong> Direct log forwarding via HTTP Event Collector</li>
                      <li>• <strong>IBM QRadar:</strong> Syslog integration with custom DSM</li>
                      <li>• <strong>Microsoft Sentinel:</strong> Azure Log Analytics integration</li>
                      <li>• <strong>Elastic SIEM:</strong> Elasticsearch log shipping</li>
                      <li>• <strong>Generic Syslog:</strong> RFC3164/RFC5424 compatible</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-[#153B6B] mb-3">Alert Configuration</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Failed authentication attempts</li>
                      <li>• Unusual scanning patterns</li>
                      <li>• Large file transfers</li>
                      <li>• After-hours activity</li>
                      <li>• Configuration changes</li>
                      <li>• System errors and warnings</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Enterprise Support</h4>
                  <p className="text-yellow-700 text-sm">
                    Contact our enterprise support team for assistance with SIEM integration, custom reporting 
                    requirements, and compliance consulting services.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}