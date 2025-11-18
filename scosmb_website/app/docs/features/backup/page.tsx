'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Shield, Database, Cloud, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';

export default function BackupRecoveryPage() {
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
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight"
            >
              <span className="text-[#00A8B5]">Backup</span> & Recovery
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Comprehensive data protection and disaster recovery solutions to ensure your scanned documents and system configurations are never lost.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                3-2-1 Backup Rule
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                Cloud Integration
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                Real-time Sync
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-12">
            
            {/* Backup Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-8 h-8 text-[#00A8B5]" />
                <h2 className="text-2xl font-bold text-[#153B6B]">Automated Backup System</h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-gray-600">
                  SCO SMB includes a comprehensive backup system that automatically protects your scanned documents, 
                  system configurations, audit logs, and user data with multiple redundancy options.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <div className="w-16 h-16 bg-[#00A8B5] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Database className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-[#153B6B] mb-2">Local Backup</h4>
                    <p className="text-sm text-gray-600">Automatic local storage backup with configurable retention</p>
                  </div>
                  
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Cloud className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-[#153B6B] mb-2">Cloud Backup</h4>
                    <p className="text-sm text-gray-600">Secure cloud storage integration with major providers</p>
                  </div>
                  
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <RefreshCw className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-[#153B6B] mb-2">Real-time Sync</h4>
                    <p className="text-sm text-gray-600">Continuous synchronization to prevent data loss</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Backup Configuration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-[#00A8B5]" />
                <h2 className="text-2xl font-bold text-[#153B6B]">Backup Configuration</h2>
              </div>
              
              <div className="space-y-6">
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold text-[#153B6B] mb-3">Setting Up Backups</h3>
                  <p className="text-gray-600 mb-4">
                    Configure your backup preferences in the SCO SMB settings to ensure comprehensive data protection.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-[#153B6B] mb-4">Configuration Steps</h4>
                  <ol className="space-y-3 text-gray-700">
                    <li><strong>1.</strong> Open SCO SMB Settings → Backup & Recovery</li>
                    <li><strong>2.</strong> Enable automatic backup (recommended)</li>
                    <li><strong>3.</strong> Select backup destinations (local, cloud, or both)</li>
                    <li><strong>4.</strong> Configure backup schedule (hourly, daily, or custom)</li>
                    <li><strong>5.</strong> Set retention policies for different data types</li>
                    <li><strong>6.</strong> Enable encryption for sensitive data</li>
                    <li><strong>7.</strong> Test backup and recovery process</li>
                  </ol>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 border-l-4 border-[#00A8B5] p-4">
                    <h4 className="font-semibold text-[#153B6B] mb-3">What Gets Backed Up</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• All scanned documents and files</li>
                      <li>• System configuration settings</li>
                      <li>• User preferences and custom rules</li>
                      <li>• Audit logs and activity history</li>
                      <li>• Printer and network configurations</li>
                      <li>• License and activation data</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 border-l-4 border-green-400 p-4">
                    <h4 className="font-semibold text-green-800 mb-3">Backup Schedules</h4>
                    <ul className="space-y-1 text-green-700 text-sm">
                      <li>• <strong>Real-time:</strong> Immediate backup of new scans</li>
                      <li>• <strong>Hourly:</strong> Configuration and log backups</li>
                      <li>• <strong>Daily:</strong> Complete system state backup</li>
                      <li>• <strong>Weekly:</strong> Full archive with verification</li>
                      <li>• <strong>Custom:</strong> User-defined schedules</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Cloud Integration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Cloud className="w-8 h-8 text-[#00A8B5]" />
                <h2 className="text-2xl font-bold text-[#153B6B]">Cloud Storage Integration</h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-gray-600">
                  Securely backup your data to leading cloud storage providers with end-to-end encryption 
                  and automated synchronization.
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-sm">AWS</span>
                    </div>
                    <h4 className="font-semibold text-[#153B6B] text-sm">Amazon S3</h4>
                    <p className="text-xs text-gray-600 mt-1">Enterprise-grade storage</p>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-sm">GCP</span>
                    </div>
                    <h4 className="font-semibold text-[#153B6B] text-sm">Google Cloud</h4>
                    <p className="text-xs text-gray-600 mt-1">Scalable cloud storage</p>
                  </div>
                  
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-xs">Azure</span>
                    </div>
                    <h4 className="font-semibold text-[#153B6B] text-sm">Microsoft Azure</h4>
                    <p className="text-xs text-gray-600 mt-1">Enterprise integration</p>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-xs">S3</span>
                    </div>
                    <h4 className="font-semibold text-[#153B6B] text-sm">S3 Compatible</h4>
                    <p className="text-xs text-gray-600 mt-1">MinIO, Wasabi, etc.</p>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-2">Security Features</h4>
                      <ul className="text-yellow-700 text-sm space-y-1">
                        <li>• Client-side encryption before upload</li>
                        <li>• Zero-knowledge architecture</li>
                        <li>• Secure key management with HSM support</li>
                        <li>• Compliance with SOC 2, ISO 27001</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Disaster Recovery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <RefreshCw className="w-8 h-8 text-[#00A8B5]" />
                <h2 className="text-2xl font-bold text-[#153B6B]">Disaster Recovery</h2>
              </div>
              
              <div className="space-y-6">
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold text-[#153B6B] mb-3">Recovery Procedures</h3>
                  <p className="text-gray-600 mb-4">
                    SCO SMB includes comprehensive disaster recovery capabilities to minimize downtime 
                    and ensure business continuity in case of system failures.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <h4 className="font-semibold text-red-800 mb-3">Emergency Recovery</h4>
                    <ol className="space-y-2 text-red-700 text-sm">
                      <li><strong>1.</strong> Install SCO SMB on replacement system</li>
                      <li><strong>2.</strong> Run recovery wizard from backup location</li>
                      <li><strong>3.</strong> Select most recent backup to restore</li>
                      <li><strong>4.</strong> Verify data integrity and completeness</li>
                      <li><strong>5.</strong> Update printer configurations if needed</li>
                      <li><strong>6.</strong> Test full system functionality</li>
                    </ol>
                  </div>
                  
                  <div className="bg-green-50 border-l-4 border-green-400 p-4">
                    <h4 className="font-semibold text-green-800 mb-3">Recovery Time Objectives</h4>
                    <ul className="space-y-2 text-green-700 text-sm">
                      <li>• <strong>RTO:</strong> 15 minutes for basic functionality</li>
                      <li>• <strong>RPO:</strong> Less than 1 hour data loss maximum</li>
                      <li>• <strong>Full Recovery:</strong> Complete within 2 hours</li>
                      <li>• <strong>Verification:</strong> Automated integrity checks</li>
                      <li>• <strong>Rollback:</strong> Previous state if issues occur</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-[#153B6B] mb-3">Recovery Testing</h4>
                  <p className="text-gray-700 mb-4">
                    Regular recovery testing ensures your backup system works when you need it most:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-blue-800 font-bold">🔄</span>
                      </div>
                      <p className="text-sm font-medium text-blue-800">Monthly</p>
                      <p className="text-xs text-blue-600">Automated tests</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-blue-800 font-bold">🧪</span>
                      </div>
                      <p className="text-sm font-medium text-blue-800">Quarterly</p>
                      <p className="text-xs text-blue-600">Full DR drills</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-blue-800 font-bold">📊</span>
                      </div>
                      <p className="text-sm font-medium text-blue-800">Annual</p>
                      <p className="text-xs text-blue-600">Business continuity</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Backup Best Practices */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-8 h-8 text-[#00A8B5]" />
                <h2 className="text-2xl font-bold text-[#153B6B]">Best Practices</h2>
              </div>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-[#153B6B]">3-2-1 Backup Rule</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-[#00A8B5] rounded-full flex items-center justify-center text-white font-bold">
                          3
                        </div>
                        <span className="text-gray-700 text-sm">Keep 3 copies of important data</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-[#153B6B] rounded-full flex items-center justify-center text-white font-bold">
                          2
                        </div>
                        <span className="text-gray-700 text-sm">Store on 2 different media types</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                          1
                        </div>
                        <span className="text-gray-700 text-sm">Keep 1 copy offsite</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-[#153B6B]">Security Considerations</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Always encrypt backups with strong passwords</li>
                      <li>• Use separate credentials for backup storage</li>
                      <li>• Regularly rotate encryption keys</li>
                      <li>• Monitor backup integrity and completeness</li>
                      <li>• Test recovery procedures regularly</li>
                      <li>• Maintain offline backup copies</li>
                      <li>• Document recovery procedures</li>
                      <li>• Train staff on emergency recovery</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="font-semibold text-green-800 mb-3">Monitoring & Alerts</h4>
                  <p className="text-green-700 mb-3">
                    SCO SMB provides comprehensive monitoring of your backup system:
                  </p>
                  <ul className="grid md:grid-cols-2 gap-2 text-green-700 text-sm">
                    <li>• Backup success/failure notifications</li>
                    <li>• Storage capacity monitoring</li>
                    <li>• Data integrity verification alerts</li>
                    <li>• Recovery time tracking</li>
                    <li>• Compliance reporting</li>
                    <li>• Performance metrics</li>
                  </ul>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}