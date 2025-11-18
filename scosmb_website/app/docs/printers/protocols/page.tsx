'use client';

import { motion } from 'framer-motion';
import { Network, Shield, Zap, Check, AlertTriangle, Info, ExternalLink, Server } from 'lucide-react';
import Link from 'next/link';

export default function ProtocolsGuidePage() {
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
              <Server className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              FTP vs SMB Protocol Guide
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Understanding the differences and choosing the right protocol for your network scanning setup
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom max-w-4xl">
          
          {/* Protocol Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Protocol Comparison Overview</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* FTP Card */}
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <Network className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-green-900">FTP Protocol</h3>
                </div>
                
                <div className="space-y-4">
                  <p className="text-green-800">
                    File Transfer Protocol - The recommended and default protocol for SCO SMB.
                  </p>
                  
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">Advantages:</h4>
                    <ul className="space-y-1 text-green-800 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        Zero-configuration setup
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        No authentication required
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        Works across all networks
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        Universal printer support
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        Excellent performance
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">Best For:</h4>
                    <ul className="space-y-1 text-green-800 text-sm">
                      <li>• Small to medium businesses</li>
                      <li>• Quick setup requirements</li>
                      <li>• Most Kyocera and Sharp printers</li>
                      <li>• Mixed vendor environments</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* SMB Card */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900">SMB Protocol</h3>
                </div>
                
                <div className="space-y-4">
                  <p className="text-blue-800">
                    Server Message Block - File sharing protocol commonly used in Windows networks.
                  </p>
                  
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Advantages:</h4>
                    <ul className="space-y-1 text-blue-800 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-blue-600" />
                        Native Windows integration
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-blue-600" />
                        Domain authentication support
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-blue-600" />
                        Better security options
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-blue-600" />
                        Enterprise-friendly
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-blue-600" />
                        Supports permissions
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Best For:</h4>
                    <ul className="space-y-1 text-blue-800 text-sm">
                      <li>• Enterprise environments</li>
                      <li>• Windows-dominated networks</li>
                      <li>• When authentication is required</li>
                      <li>• Compliance requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Decision Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Which Protocol Should You Choose?</h2>
            
            <div className="space-y-6">
              {/* Quick Decision Guide */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Decision Guide</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">Choose FTP if:</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        You want the simplest possible setup
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        You have Kyocera or Sharp printers
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        You're in a small to medium business
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        You don't need user authentication
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        You have mixed operating systems
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Choose SMB if:</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        You're in an enterprise environment
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        You need user authentication/permissions
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        You have compliance requirements
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        Your network blocks FTP traffic
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        You're using Windows exclusively
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Technical Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Feature</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-900">FTP</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-blue-900">SMB</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Setup Complexity</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-700">Very Easy</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-blue-700">Moderate</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Authentication</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-700">None Required</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-blue-700">Username/Password</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Security</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-700">Basic</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-blue-700">Advanced</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Performance</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-700">Excellent</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-blue-700">Good</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Firewall Friendliness</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-700">Good</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-blue-700">Excellent</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Cross-Platform Support</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-700">Universal</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-blue-700">Windows-focused</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Printer Compatibility</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-700">Excellent</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-blue-700">Good</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Enterprise Features</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-700">Limited</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-blue-700">Full</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* FTP Setup Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Network className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-bold text-[#153B6B]">FTP Protocol Setup</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2">FTP is the Default Protocol</h3>
                    <p className="text-green-800 text-sm">
                      SCO SMB automatically starts an FTP server when launched. No additional configuration is required 
                      for basic operation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">SCO SMB Configuration</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Default Settings:</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li><strong>Port:</strong> 21 (standard FTP port)</li>
                        <li><strong>Authentication:</strong> Anonymous/None</li>
                        <li><strong>Passive Mode:</strong> Enabled</li>
                        <li><strong>Root Directory:</strong> Scan destination folder</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Customization Options:</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Change FTP port (Settings → Network)</li>
                        <li>• Enable IP whitelisting</li>
                        <li>• Custom welcome message</li>
                        <li>• Transfer mode settings</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Printer Configuration</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Typical Settings:</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li><strong>Protocol:</strong> FTP</li>
                        <li><strong>Server:</strong> Computer IP or hostname</li>
                        <li><strong>Port:</strong> 21</li>
                        <li><strong>Username:</strong> (leave blank)</li>
                        <li><strong>Password:</strong> (leave blank)</li>
                        <li><strong>Directory:</strong> / (root)</li>
                        <li><strong>Passive Mode:</strong> Yes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SMB Setup Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-[#153B6B]">SMB Protocol Setup</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">SMB Requires Additional Setup</h3>
                    <p className="text-blue-800 text-sm">
                      Unlike FTP, SMB requires creating a shared folder and enabling SMB monitoring in SCO SMB settings.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Shared Folder</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Windows:</h4>
                        <ol className="space-y-1 text-gray-700">
                          <li>1. Create a folder (e.g., "SCO_SMB_Scans")</li>
                          <li>2. Right-click → Properties → Sharing</li>
                          <li>3. Click "Share" and add "Everyone"</li>
                          <li>4. Set permissions to "Read/Write"</li>
                          <li>5. Note the network path (\\\\computer\\folder)</li>
                        </ol>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">macOS:</h4>
                        <ol className="space-y-1 text-gray-700">
                          <li>1. Create a folder</li>
                          <li>2. System Preferences → Sharing</li>
                          <li>3. Enable "File Sharing"</li>
                          <li>4. Add your folder to shared folders</li>
                          <li>5. Set appropriate permissions</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Enable SMB Monitoring in SCO SMB</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <ol className="space-y-2 text-gray-700 text-sm">
                        <li>1. Open SCO SMB settings</li>
                        <li>2. Navigate to "Protocols" tab</li>
                        <li>3. Enable "SMB/CIFS Monitoring"</li>
                        <li>4. Add the path to your shared folder</li>
                        <li>5. Set monitoring interval (default: 5 seconds)</li>
                        <li>6. Save settings and restart if needed</li>
                      </ol>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Configure Printer</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Printer SMB Settings:</h4>
                      <ul className="space-y-1 text-gray-700 text-sm">
                        <li><strong>Protocol:</strong> SMB/CIFS</li>
                        <li><strong>Server:</strong> Computer IP or hostname</li>
                        <li><strong>Share Name:</strong> Your shared folder name</li>
                        <li><strong>Username:</strong> Your computer username</li>
                        <li><strong>Password:</strong> Your computer password</li>
                        <li><strong>Domain:</strong> Your domain (if applicable)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Performance & Security Considerations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-[#00A8B5]" />
              <h2 className="text-2xl font-bold text-[#153B6B]">Performance & Security</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Performance Comparison</h3>
                <div className="space-y-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">FTP Performance</h4>
                    <ul className="text-green-800 text-sm space-y-1">
                      <li>• Direct file transfer to SCO SMB</li>
                      <li>• No file system polling required</li>
                      <li>• Immediate processing</li>
                      <li>• Lower CPU usage</li>
                      <li>• Better for high-volume scanning</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">SMB Performance</h4>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• Files written to shared folder first</li>
                      <li>• Requires periodic folder monitoring</li>
                      <li>• Slight processing delay</li>
                      <li>• Higher resource usage</li>
                      <li>• Good for moderate volume</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Security Comparison</h3>
                <div className="space-y-3">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-900 mb-2">FTP Security</h4>
                    <ul className="text-yellow-800 text-sm space-y-1">
                      <li>• Anonymous access by default</li>
                      <li>• IP whitelisting available</li>
                      <li>• Unencrypted transmission</li>
                      <li>• Port-based access control</li>
                      <li>• Simple but effective for LANs</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-900 mb-2">SMB Security</h4>
                    <ul className="text-purple-800 text-sm space-y-1">
                      <li>• Username/password authentication</li>
                      <li>• Domain integration possible</li>
                      <li>• File-level permissions</li>
                      <li>• Encrypted authentication</li>
                      <li>• Better audit trail</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Troubleshooting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Common Issues & Solutions</h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* FTP Issues */}
                <div>
                  <h3 className="text-lg font-semibold text-green-900 mb-4">FTP Protocol Issues</h3>
                  <div className="space-y-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-900 mb-2">Connection Refused</h4>
                      <ul className="text-red-800 text-sm space-y-1">
                        <li>• Check if SCO SMB is running</li>
                        <li>• Verify firewall allows port 21</li>
                        <li>• Ensure correct IP address</li>
                        <li>• Try different port number</li>
                      </ul>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-900 mb-2">Passive Mode Issues</h4>
                      <ul className="text-yellow-800 text-sm space-y-1">
                        <li>• Enable passive mode on printer</li>
                        <li>• Check firewall data port range</li>
                        <li>• Try active mode if available</li>
                        <li>• Configure NAT/router settings</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* SMB Issues */}
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">SMB Protocol Issues</h3>
                  <div className="space-y-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-900 mb-2">Access Denied</h4>
                      <ul className="text-red-800 text-sm space-y-1">
                        <li>• Verify username/password</li>
                        <li>• Check folder permissions</li>
                        <li>• Enable file sharing service</li>
                        <li>• Try different SMB version</li>
                      </ul>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-900 mb-2">Files Not Detected</h4>
                      <ul className="text-yellow-800 text-sm space-y-1">
                        <li>• Check monitoring is enabled</li>
                        <li>• Verify folder path is correct</li>
                        <li>• Adjust monitoring interval</li>
                        <li>• Check file permissions</li>
                      </ul>
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
                  <Link href="/docs/network/security" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Security Best Practices
                  </Link>
                  <Link href="/docs/network/ports" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Port Configuration
                  </Link>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Printer Setup</h3>
                <div className="space-y-3">
                  <Link href="/docs/printers/kyocera" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Kyocera Configuration
                  </Link>
                  <Link href="/docs/printers/sharp" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Sharp MFP Setup
                  </Link>
                  <Link href="/docs/printers/generic" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Generic Network Printers
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