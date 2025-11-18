'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, AlertTriangle, Check, Info, ExternalLink, Users } from 'lucide-react';
import Link from 'next/link';

export default function NetworkSecurityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#153B6B] via-[#1e4a7f] to-[#00A8B5] text-white pt-32 pb-8">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Security Best Practices
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Secure your scanning infrastructure and protect sensitive documents
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom max-w-4xl">
          
          {/* Security Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Security Overview</h2>
            
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-900 mb-2">Security Considerations</h3>
                    <p className="text-red-800 text-sm">
                      SCO SMB uses FTP protocol for maximum compatibility, which transmits data unencrypted. 
                      Implement proper network security measures to protect sensitive documents.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Access Control</h3>
                  <p className="text-blue-800 text-sm">
                    Control who can send scans to your system using IP whitelisting and network segmentation.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Monitoring</h3>
                  <p className="text-green-800 text-sm">
                    Track all scanning activity with comprehensive audit logging and real-time monitoring.
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Compliance</h3>
                  <p className="text-purple-800 text-sm">
                    Meet industry compliance requirements with proper security controls and documentation.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* IP Whitelisting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-[#153B6B]">IP Whitelisting</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2">Recommended Security Feature</h3>
                    <p className="text-green-800 text-sm">
                      IP whitelisting ensures only authorized printers can send scans to your system. This is 
                      the most effective way to secure your SCO SMB installation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Configuration Steps */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Enabling IP Whitelisting</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Configuration Steps:</h4>
                      <ol className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                          <div>Open SCO SMB Settings</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                          <div>Navigate to "Security" tab</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                          <div>Enable "IP Whitelist" option</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                          <div>Add printer IP addresses</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                          <div>Save settings and test connections</div>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>

                {/* Best Practices */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">IP Whitelist Best Practices</h3>
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Recommended Approach:</h4>
                      <ul className="space-y-2 text-blue-800 text-sm">
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>Use static IP addresses for printers</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>Document all whitelisted IPs</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>Regular audit of allowed addresses</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>Remove decommissioned printers</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>Use subnet ranges for large deployments</div>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-900 mb-2">Important Notes:</h4>
                      <ul className="space-y-1 text-yellow-800 text-sm">
                        <li>• Whitelist blocks ALL non-listed IPs</li>
                        <li>• Test after enabling to avoid lockouts</li>
                        <li>• Keep backup list of authorized IPs</li>
                        <li>• Consider subnet masks for ranges</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Network Segmentation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Network Segmentation</h2>
            
            <div className="space-y-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2">Enterprise Security Strategy</h3>
                    <p className="text-purple-800 text-sm">
                      Network segmentation isolates scan traffic from other network activities, reducing attack surface 
                      and improving compliance with security frameworks.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* VLAN Strategy */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">VLAN Strategy</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Recommended VLAN Design:</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-500 rounded flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">P</div>
                          <div>
                            <div className="font-semibold text-gray-900">Print VLAN (192.168.10.0/24)</div>
                            <div className="text-gray-700 text-sm">All network printers and MFPs</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-green-500 rounded flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">U</div>
                          <div>
                            <div className="font-semibold text-gray-900">User VLAN (192.168.20.0/24)</div>
                            <div className="text-gray-700 text-sm">Computers running SCO SMB</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-orange-500 rounded flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">M</div>
                          <div>
                            <div className="font-semibold text-gray-900">Management VLAN (192.168.30.0/24)</div>
                            <div className="text-gray-700 text-sm">Administrative access and monitoring</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Required Firewall Rules:</h4>
                      <ul className="space-y-1 text-blue-800 text-sm">
                        <li>• Print VLAN → User VLAN: Port 21 (FTP)</li>
                        <li>• User VLAN → Print VLAN: Ports 80,443 (Web UI)</li>
                        <li>• Management VLAN → All: Administrative access</li>
                        <li>• Block all other inter-VLAN traffic</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Firewall Rules */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Firewall Configuration</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Essential Rules:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="bg-green-100 border border-green-300 rounded p-2">
                          <div className="font-semibold text-green-900">ALLOW: Printer → SCO SMB</div>
                          <div className="text-green-800">Source: Print VLAN, Destination: User VLAN, Port: 21</div>
                        </div>
                        
                        <div className="bg-blue-100 border border-blue-300 rounded p-2">
                          <div className="font-semibold text-blue-900">ALLOW: Management Access</div>
                          <div className="text-blue-800">Source: Management VLAN, Destination: Any, Ports: 80,443</div>
                        </div>
                        
                        <div className="bg-red-100 border border-red-300 rounded p-2">
                          <div className="font-semibold text-red-900">DENY: All Other Traffic</div>
                          <div className="text-red-800">Default deny rule for inter-VLAN communication</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-900 mb-2">Additional Considerations:</h4>
                      <ul className="space-y-1 text-yellow-800 text-sm">
                        <li>• Log all denied connection attempts</li>
                        <li>• Monitor for unusual traffic patterns</li>
                        <li>• Regular review of firewall logs</li>
                        <li>• Automated alerting for violations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Audit Logging */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-bold text-[#153B6B]">Audit Logging & Monitoring</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2">Comprehensive Activity Tracking</h3>
                    <p className="text-green-800 text-sm">
                      SCO SMB provides detailed audit logging to track all scanning activities, connection attempts, 
                      and system events for security and compliance purposes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Logging Features */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Logging</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Logged Events:</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>All incoming scan connections</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>File uploads and processing</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>Failed connection attempts</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>Security violations (IP whitelist)</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>System configuration changes</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>Application start/stop events</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Log Configuration */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Log Configuration</h3>
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Configuration Options:</h4>
                      <ul className="space-y-2 text-blue-800 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <div><strong>Log Level:</strong> Info, Warning, Error, Debug</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <div><strong>Retention:</strong> 30, 90, 365 days or custom</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <div><strong>Format:</strong> Text, JSON, or structured</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <div><strong>Location:</strong> Local files or remote syslog</div>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Sample Log Entry:</h4>
                      <div className="bg-black rounded p-3 text-green-400 text-xs font-mono">
                        <div>2024-01-15 14:32:15 [INFO] Connection from 192.168.10.25</div>
                        <div>2024-01-15 14:32:16 [INFO] File received: invoice_001.pdf (2.3MB)</div>
                        <div>2024-01-15 14:32:16 [INFO] File processed successfully</div>
                        <div>2024-01-15 14:32:17 [INFO] Connection closed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Compliance Considerations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-purple-600" />
              <h2 className="text-2xl font-bold text-[#153B6B]">Compliance Considerations</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* HIPAA */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">HIPAA Compliance</h3>
                  <ul className="space-y-2 text-blue-800 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>Enable comprehensive audit logging</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>Implement IP whitelisting</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>Network segmentation required</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>Regular security assessments</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>Document all configurations</div>
                    </li>
                  </ul>
                </div>

                {/* SOX */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">SOX Compliance</h3>
                  <ul className="space-y-2 text-green-800 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>Maintain detailed audit trails</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>Implement access controls</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>Document security procedures</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>Regular compliance reviews</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>Change management process</div>
                    </li>
                  </ul>
                </div>

                {/* ISO 27001 */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-900 mb-4">ISO 27001</h3>
                  <ul className="space-y-2 text-purple-800 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>Risk assessment and management</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>Information security policies</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>Incident response procedures</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>Continuous monitoring</div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>Regular security training</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Security Checklist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Security Implementation Checklist</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic Security */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Security (All Deployments)</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Enable IP Whitelisting</div>
                      <div className="text-gray-700 text-sm">Restrict access to known printer IP addresses</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Configure Firewall</div>
                      <div className="text-gray-700 text-sm">Allow SCO SMB through host firewall</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Enable Audit Logging</div>
                      <div className="text-gray-700 text-sm">Track all scanning activities</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Use Static IP Addresses</div>
                      <div className="text-gray-700 text-sm">Prevent IP changes from breaking security</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Regular Security Updates</div>
                      <div className="text-gray-700 text-sm">Keep SCO SMB and OS updated</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enterprise Security */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Enterprise Security (Recommended)</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Network Segmentation</div>
                      <div className="text-gray-700 text-sm">Isolate print traffic with VLANs</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Centralized Logging</div>
                      <div className="text-gray-700 text-sm">Forward logs to SIEM system</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Network Monitoring</div>
                      <div className="text-gray-700 text-sm">Monitor for suspicious activities</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Access Control Documentation</div>
                      <div className="text-gray-700 text-sm">Document all security configurations</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Regular Security Audits</div>
                      <div className="text-gray-700 text-sm">Periodic review of security posture</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-[#153B6B]/5 to-[#00A8B5]/5 rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Related Documentation</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Network Configuration</h3>
                <div className="space-y-3">
                  <Link href="/docs/network/setup" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Network Setup Guide
                  </Link>
                  <Link href="/docs/network/enterprise" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Enterprise Network Setup
                  </Link>
                  <Link href="/docs/network/ports" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Port Configuration
                  </Link>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Industry Compliance</h3>
                <div className="space-y-3">
                  <Link href="/docs/industry/healthcare" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Healthcare HIPAA Compliance
                  </Link>
                  <Link href="/docs/industry/finance" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Financial Services Setup
                  </Link>
                  <Link href="/docs/features/audit" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Audit Logging Features
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}