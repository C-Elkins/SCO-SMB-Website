'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Shield, Network, Server, AlertCircle } from 'lucide-react';

export default function PortConfigurationPage() {
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
              <Network className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight"
            >
              <span className="text-[#00A8B5]">Port</span> Configuration Guide
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Configure firewall and port settings for secure and reliable SCO SMB operation in your network environment.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Firewall Rules
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                Port Security
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                Network Access
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-12">
            
            {/* Default Ports */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Server className="w-8 h-8 text-[#00A8B5]" />
                <h2 className="text-2xl font-bold text-[#153B6B]">Default Port Configuration</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-[#00A8B5] p-6">
                  <h3 className="text-lg font-semibold text-[#153B6B] mb-4">Primary Ports Used by SCO SMB</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-[#00A8B5] rounded-full flex items-center justify-center text-white font-bold text-sm">
                          21
                        </div>
                        <h4 className="font-semibold text-[#153B6B]">FTP Port (Default)</h4>
                      </div>
                      <ul className="space-y-1 text-gray-700 text-sm">
                        <li>• Primary scanning protocol</li>
                        <li>• Incoming connections from printers</li>
                        <li>• Can be customized in settings</li>
                        <li>• Requires firewall inbound rule</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-[#153B6B] rounded-full flex items-center justify-center text-white font-bold text-sm">
                          445
                        </div>
                        <h4 className="font-semibold text-[#153B6B]">SMB Port (Optional)</h4>
                      </div>
                      <ul className="space-y-1 text-gray-700 text-sm">
                        <li>• SMB/CIFS protocol support</li>
                        <li>• Windows file sharing</li>
                        <li>• Used for folder monitoring</li>
                        <li>• Usually already open on Windows</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-2">Port Customization</h4>
                      <p className="text-yellow-700 text-sm">
                        You can change the default FTP port in SCO SMB settings. If you use a non-standard port, 
                        make sure to update your printer configurations accordingly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Windows Firewall */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-[#00A8B5]" />
                <h2 className="text-2xl font-bold text-[#153B6B]">Windows Firewall Configuration</h2>
              </div>
              
              <div className="space-y-6">
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold text-[#153B6B] mb-3">Automatic Configuration</h3>
                  <p className="text-gray-600 mb-4">
                    SCO SMB automatically attempts to create Windows Firewall rules during installation. 
                    If this fails, you can configure manually using these steps:
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-[#153B6B] mb-4">Manual Firewall Rule Creation</h4>
                  <ol className="space-y-3 text-gray-700">
                    <li><strong>1.</strong> Open Windows Defender Firewall with Advanced Security</li>
                    <li><strong>2.</strong> Click "Inbound Rules" in the left panel</li>
                    <li><strong>3.</strong> Click "New Rule..." in the right panel</li>
                    <li><strong>4.</strong> Select "Port" and click Next</li>
                    <li><strong>5.</strong> Select "TCP" and enter port number (21 by default)</li>
                    <li><strong>6.</strong> Select "Allow the connection" and click Next</li>
                    <li><strong>7.</strong> Select all profiles (Domain, Private, Public) and click Next</li>
                    <li><strong>8.</strong> Name the rule "SCO SMB FTP" and click Finish</li>
                  </ol>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-[#153B6B] mb-2">PowerShell Command</h4>
                  <p className="text-gray-600 text-sm mb-3">Alternatively, create the rule using PowerShell (run as Administrator):</p>
                  <div className="bg-gray-900 rounded p-3 text-green-400 text-sm font-mono overflow-x-auto">
                    New-NetFirewallRule -DisplayName "SCO SMB FTP" -Direction Inbound -Protocol TCP -LocalPort 21 -Action Allow
                  </div>
                </div>
              </div>
            </motion.div>

            {/* macOS Firewall */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-[#00A8B5]" />
                <h2 className="text-2xl font-bold text-[#153B6B]">macOS Firewall Configuration</h2>
              </div>
              
              <div className="space-y-6">
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold text-[#153B6B] mb-3">Built-in Firewall</h3>
                  <p className="text-gray-600 mb-4">
                    macOS has a built-in application firewall that may block SCO SMB connections. 
                    Configure it to allow SCO SMB:
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-[#153B6B] mb-4">System Preferences Configuration</h4>
                  <ol className="space-y-3 text-gray-700">
                    <li><strong>1.</strong> Open System Preferences → Security & Privacy</li>
                    <li><strong>2.</strong> Click the "Firewall" tab</li>
                    <li><strong>3.</strong> Click the lock icon and enter your password</li>
                    <li><strong>4.</strong> Click "Firewall Options..."</li>
                    <li><strong>5.</strong> Find "SCO SMB" in the list or click "+" to add it</li>
                    <li><strong>6.</strong> Set to "Allow incoming connections"</li>
                    <li><strong>7.</strong> Click OK to save changes</li>
                  </ol>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-[#153B6B] mb-2">Terminal Command</h4>
                  <p className="text-gray-600 text-sm mb-3">Add firewall rule via command line:</p>
                  <div className="bg-gray-900 rounded p-3 text-green-400 text-sm font-mono overflow-x-auto">
                    sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /Applications/SCO\ SMB.app --unblockapp /Applications/SCO\ SMB.app
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enterprise Firewalls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Network className="w-8 h-8 text-[#00A8B5]" />
                <h2 className="text-2xl font-bold text-[#153B6B]">Enterprise Network Firewalls</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Network Administrator Coordination</h4>
                  <p className="text-orange-700 text-sm">
                    In enterprise environments, coordinate with your network administrator to configure 
                    network firewalls and security appliances.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-[#153B6B] mb-3">Required Rules</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• <strong>Inbound:</strong> Printers → Workstations (FTP port)</li>
                      <li>• <strong>Outbound:</strong> Workstations → Printers (HTTP/HTTPS)</li>
                      <li>• <strong>DNS:</strong> Hostname resolution both directions</li>
                      <li>• <strong>ICMP:</strong> Ping for connectivity testing</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-[#153B6B] mb-3">Security Considerations</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Restrict source IPs to known printers</li>
                      <li>• Use non-standard ports when possible</li>
                      <li>• Implement intrusion detection</li>
                      <li>• Regular security audits</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-[#153B6B] mb-3">Sample Firewall Rules</h4>
                  <div className="bg-gray-900 rounded p-4 text-green-400 text-sm font-mono overflow-x-auto">
{`# Palo Alto / pfSense style rules
allow tcp from printer_network to workstation_network port 21
allow tcp from workstation_network to printer_network port 80,443
allow udp from any to dns_servers port 53

# Cisco ASA style rules  
access-list inside_access_in permit tcp printer_subnet workstation_subnet eq 21
access-list inside_access_in permit tcp workstation_subnet printer_subnet eq www
access-list inside_access_in permit tcp workstation_subnet printer_subnet eq https`}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testing Connectivity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-8 h-8 text-[#00A8B5]" />
                <h2 className="text-2xl font-bold text-[#153B6B]">Testing Port Configuration</h2>
              </div>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-[#153B6B] mb-3">Windows Testing</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Test FTP port is open:</p>
                        <div className="bg-gray-900 rounded p-2 text-green-400 text-xs font-mono">
                          netstat -an | findstr :21
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Test from printer network:</p>
                        <div className="bg-gray-900 rounded p-2 text-green-400 text-xs font-mono">
                          telnet workstation_ip 21
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-[#153B6B] mb-3">macOS Testing</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Test FTP port is open:</p>
                        <div className="bg-gray-900 rounded p-2 text-green-400 text-xs font-mono">
                          netstat -an | grep :21
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Test from printer network:</p>
                        <div className="bg-gray-900 rounded p-2 text-green-400 text-xs font-mono">
                          nc -zv workstation_ip 21
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Built-in Connection Test</h4>
                  <p className="text-green-700 text-sm">
                    SCO SMB includes a built-in connection test feature. Use the "Test Connection" button 
                    in the printer configuration dialog to verify connectivity from your workstation to the printer.
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