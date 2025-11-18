'use client';

import { motion } from 'framer-motion';
import { Network, Shield, Settings, Check, AlertTriangle, Info, ExternalLink, Router } from 'lucide-react';
import Link from 'next/link';

export default function NetworkSetupPage() {
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
              <Network className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Network Configuration Guide
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Optimize your network setup for reliable and secure document scanning with SCO SMB
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom max-w-4xl">
          
          {/* Network Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Network Requirements</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Basic Requirements</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Local Network Access</h4>
                      <p className="text-gray-700 text-sm">Computer and printers must be on the same network segment</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">TCP/IP Connectivity</h4>
                      <p className="text-gray-700 text-sm">Standard IP networking with DHCP or static IP addresses</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Port Access</h4>
                      <p className="text-gray-700 text-sm">FTP port (21) or custom port must be accessible</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Firewall Configuration</h4>
                      <p className="text-gray-700 text-sm">Incoming connections allowed for SCO SMB application</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Recommended Setup</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <ul className="space-y-2 text-blue-800 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Static IP addresses for computers running SCO SMB
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Dedicated VLAN for print/scan traffic (enterprise)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Gigabit Ethernet for high-volume scanning
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Quality of Service (QoS) rules for scan traffic
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Network monitoring and logging enabled
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* IP Address Configuration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">IP Address Configuration</h2>
            
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-yellow-900 mb-2">Static IP Highly Recommended</h3>
                    <p className="text-yellow-800 text-sm">
                      While DHCP works for testing, static IP addresses prevent connection issues when DHCP leases expire 
                      and IP addresses change.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Static IP Setup */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Setting Up Static IP</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Windows Configuration:</h4>
                      <ol className="space-y-1 text-gray-700 text-sm">
                        <li>1. Control Panel → Network and Internet</li>
                        <li>2. Network and Sharing Center</li>
                        <li>3. Change adapter settings</li>
                        <li>4. Right-click network adapter → Properties</li>
                        <li>5. Select "Internet Protocol Version 4 (TCP/IPv4)"</li>
                        <li>6. Choose "Use the following IP address"</li>
                        <li>7. Enter IP, subnet mask, and gateway</li>
                      </ol>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">macOS Configuration:</h4>
                      <ol className="space-y-1 text-gray-700 text-sm">
                        <li>1. System Preferences → Network</li>
                        <li>2. Select your network interface</li>
                        <li>3. Configure IPv4: "Using DHCP with manual address"</li>
                        <li>4. Or choose "Manually" for full static setup</li>
                        <li>5. Enter IP address, subnet mask, router</li>
                        <li>6. Set DNS servers if needed</li>
                        <li>7. Click Apply</li>
                      </ol>
                    </div>
                  </div>
                </div>

                {/* DHCP Reservation */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">DHCP Reservation Alternative</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">Router-Based Reservation:</h4>
                      <p className="text-green-800 text-sm mb-3">
                        Configure your router to always assign the same IP to your computer's MAC address.
                      </p>
                      <ol className="space-y-1 text-green-800 text-sm">
                        <li>1. Access router admin interface</li>
                        <li>2. Find DHCP settings</li>
                        <li>3. Look for "DHCP Reservation" or "Static DHCP"</li>
                        <li>4. Add computer's MAC address</li>
                        <li>5. Assign desired IP address</li>
                        <li>6. Save and restart router if needed</li>
                      </ol>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Benefits:</h4>
                      <ul className="space-y-1 text-blue-800 text-sm">
                        <li>• Consistent IP without manual configuration</li>
                        <li>• Automatic DNS and gateway settings</li>
                        <li>• Easier to manage multiple computers</li>
                        <li>• No operating system configuration needed</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Firewall Configuration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Firewall Configuration</h2>
            
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-900 mb-2">Critical for Operation</h3>
                    <p className="text-red-800 text-sm">
                      Firewall configuration is the most common cause of connection issues. SCO SMB must be allowed 
                      to receive incoming connections on the configured FTP port.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Windows Firewall */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Windows Firewall</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Automatic Configuration:</h4>
                      <p className="text-gray-700 text-sm mb-2">
                        Windows should prompt to allow SCO SMB when first launched. If not:
                      </p>
                      <ol className="space-y-1 text-gray-700 text-sm">
                        <li>1. Windows Security → Firewall & network protection</li>
                        <li>2. Allow an app through firewall</li>
                        <li>3. Click "Change Settings" → "Allow another app"</li>
                        <li>4. Browse to SCO SMB executable</li>
                        <li>5. Check both "Private" and "Public" networks</li>
                        <li>6. Click OK</li>
                      </ol>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Advanced Rule Configuration:</h4>
                      <ol className="space-y-1 text-gray-700 text-sm">
                        <li>1. Windows Defender Firewall with Advanced Security</li>
                        <li>2. Inbound Rules → New Rule</li>
                        <li>3. Rule Type: Program</li>
                        <li>4. Browse to SCO SMB executable</li>
                        <li>5. Action: Allow the connection</li>
                        <li>6. Profile: All profiles checked</li>
                        <li>7. Name: "SCO SMB FTP Server"</li>
                      </ol>
                    </div>
                  </div>
                </div>

                {/* macOS Firewall */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">macOS Firewall</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">System Preferences Method:</h4>
                      <ol className="space-y-1 text-gray-700 text-sm">
                        <li>1. System Preferences → Security & Privacy</li>
                        <li>2. Firewall tab</li>
                        <li>3. Click lock icon to make changes</li>
                        <li>4. Firewall Options button</li>
                        <li>5. Click "+" to add SCO SMB</li>
                        <li>6. Set to "Allow incoming connections"</li>
                        <li>7. OK to save</li>
                      </ol>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Command Line Method:</h4>
                      <div className="bg-black rounded p-3 text-green-400 text-xs font-mono">
                        <div># Add application to firewall allowlist</div>
                        <div>sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /Applications/SCO-SMB.app</div>
                        <div># Enable incoming connections</div>
                        <div>sudo /usr/libexec/ApplicationFirewall/socketfilterfw --unblock /Applications/SCO-SMB.app</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Port Configuration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Port Configuration</h2>
            
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Default Port Configuration</h3>
                    <p className="text-blue-800 text-sm">
                      SCO SMB uses port 21 (standard FTP) by default. This can be changed in settings if needed 
                      for network security or to avoid conflicts.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Ports</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-300">
                          <th className="text-left py-2 font-semibold">Port</th>
                          <th className="text-left py-2 font-semibold">Protocol</th>
                          <th className="text-left py-2 font-semibold">Purpose</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="py-2">21</td>
                          <td className="py-2">TCP</td>
                          <td className="py-2">FTP Control (default)</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2">20</td>
                          <td className="py-2">TCP</td>
                          <td className="py-2">FTP Data (active mode)</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2">1024-65535</td>
                          <td className="py-2">TCP</td>
                          <td className="py-2">FTP Data (passive mode)</td>
                        </tr>
                        <tr>
                          <td className="py-2">Custom</td>
                          <td className="py-2">TCP</td>
                          <td className="py-2">User-defined FTP port</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Port Configuration</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">When to Use Custom Ports:</h4>
                      <ul className="space-y-1 text-gray-700 text-sm">
                        <li>• Port 21 is blocked by network policy</li>
                        <li>• Another FTP server is running on port 21</li>
                        <li>• Security policy requires non-standard ports</li>
                        <li>• Network segmentation requirements</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">To Change Port in SCO SMB:</h4>
                      <ol className="space-y-1 text-gray-700 text-sm">
                        <li>1. Open SCO SMB Settings</li>
                        <li>2. Navigate to "Network" tab</li>
                        <li>3. Change "FTP Port" value</li>
                        <li>4. Save and restart application</li>
                        <li>5. Update printer configurations</li>
                        <li>6. Update firewall rules</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enterprise Network Configuration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Router className="w-8 h-8 text-[#00A8B5]" />
              <h2 className="text-2xl font-bold text-[#153B6B]">Enterprise Network Configuration</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2">Enterprise Considerations</h3>
                    <p className="text-purple-800 text-sm">
                      Large organizations should work with their IT department to ensure proper network segmentation, 
                      security policies, and monitoring are in place for scan traffic.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* VLAN Configuration */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">VLAN Configuration</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Recommended VLAN Setup:</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <strong>Print VLAN:</strong> Dedicated VLAN for printers and MFPs
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <strong>User VLAN:</strong> VLAN for computers running SCO SMB
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <strong>Management VLAN:</strong> For printer web interfaces (optional)
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Inter-VLAN Routing:</h4>
                      <p className="text-gray-700 text-sm mb-2">
                        Configure firewall rules to allow:
                      </p>
                      <ul className="space-y-1 text-gray-700 text-sm">
                        <li>• Print VLAN → User VLAN on FTP port</li>
                        <li>• User VLAN → Print VLAN for discovery</li>
                        <li>• Management access as needed</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Network Security */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Network Security</h3>
                  <div className="space-y-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-900 mb-2">Security Considerations:</h4>
                      <ul className="space-y-1 text-red-800 text-sm">
                        <li>• FTP traffic is unencrypted</li>
                        <li>• Default configuration allows anonymous access</li>
                        <li>• Network segmentation is crucial</li>
                        <li>• Monitor and log scan traffic</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">Recommended Protections:</h4>
                      <ul className="space-y-1 text-green-800 text-sm">
                        <li>• Enable IP whitelisting in SCO SMB</li>
                        <li>• Use firewall rules to restrict access</li>
                        <li>• Implement network monitoring</li>
                        <li>• Regular security audits</li>
                        <li>• Consider VPN for remote access</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Troubleshooting Network Issues */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Network Troubleshooting</h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Common Issues */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Network Issues</h3>
                  <div className="space-y-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-900 mb-2">Cannot Connect to SCO SMB</h4>
                      <ul className="text-red-800 text-sm space-y-1">
                        <li>1. Verify SCO SMB is running</li>
                        <li>2. Check firewall settings</li>
                        <li>3. Confirm IP address is correct</li>
                        <li>4. Test with telnet [ip] [port]</li>
                        <li>5. Check network connectivity</li>
                      </ul>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-900 mb-2">Intermittent Connection Issues</h4>
                      <ul className="text-yellow-800 text-sm space-y-1">
                        <li>1. Check for DHCP IP changes</li>
                        <li>2. Verify network stability</li>
                        <li>3. Look at router logs</li>
                        <li>4. Check power management settings</li>
                        <li>5. Consider static IP configuration</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Diagnostic Tools */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Diagnostic Tools</h3>
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Network Testing Commands:</h4>
                      <div className="space-y-2 text-blue-800 text-sm">
                        <div className="bg-black rounded p-2 text-green-400 text-xs font-mono">
                          ping [printer-ip]
                        </div>
                        <div className="bg-black rounded p-2 text-green-400 text-xs font-mono">
                          telnet [computer-ip] 21
                        </div>
                        <div className="bg-black rounded p-2 text-green-400 text-xs font-mono">
                          nmap -p 21 [computer-ip]
                        </div>
                        <div className="bg-black rounded p-2 text-green-400 text-xs font-mono">
                          netstat -an | grep :21
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Built-in SCO SMB Tools:</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Network discovery scan</li>
                        <li>• Connection test utility</li>
                        <li>• Port availability checker</li>
                        <li>• Network configuration summary</li>
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
                <h3 className="text-lg font-semibold text-gray-900">Security & Configuration</h3>
                <div className="space-y-3">
                  <Link href="/docs/network/security" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Security Best Practices
                  </Link>
                  <Link href="/docs/network/ports" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Port Configuration Guide
                  </Link>
                  <Link href="/docs/network/enterprise" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Enterprise Network Setup
                  </Link>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Troubleshooting</h3>
                <div className="space-y-3">
                  <Link href="/docs/troubleshooting/connection" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Connection Issues
                  </Link>
                  <Link href="/docs/troubleshooting/performance" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Performance Optimization
                  </Link>
                  <Link href="/docs/troubleshooting/logs" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Log Analysis
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