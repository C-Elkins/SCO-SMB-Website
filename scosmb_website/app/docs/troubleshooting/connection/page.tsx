'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Network, Settings, Check, Info, ExternalLink, Zap, Router } from 'lucide-react';
import Link from 'next/link';

export default function ConnectionTroubleshootingPage() {
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
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Connection Issues
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Diagnose and resolve printer discovery and network connectivity problems
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom max-w-4xl">
          
          {/* Quick Diagnostics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Quick Connection Diagnostics</h2>
            
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">First Steps Checklist</h3>
                    <p className="text-blue-800 text-sm">
                      Before diving into complex troubleshooting, verify these basic requirements are met.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Basic Checks */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Connectivity Checks</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">SCO SMB Running</h4>
                        <p className="text-gray-700 text-sm">Verify SCO SMB application is launched and running</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Same Network</h4>
                        <p className="text-gray-700 text-sm">Printer and computer on same network/subnet</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Firewall Settings</h4>
                        <p className="text-gray-700 text-sm">SCO SMB allowed through firewall</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Printer Web Access</h4>
                        <p className="text-gray-700 text-sm">Can access printer's web interface</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Tests */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Network Tests</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Command Line Tests:</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Ping Printer:</div>
                        <div className="bg-black rounded p-2 text-green-400 text-xs font-mono">
                          ping [printer-ip]
                        </div>
                      </div>
                      
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Test FTP Port:</div>
                        <div className="bg-black rounded p-2 text-green-400 text-xs font-mono">
                          telnet [computer-ip] 21
                        </div>
                      </div>
                      
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Check Port Status:</div>
                        <div className="bg-black rounded p-2 text-green-400 text-xs font-mono">
                          netstat -an | grep :21
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Common Connection Problems */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Common Connection Problems</h2>
            
            <div className="space-y-8">
              {/* Problem 1: Cannot Connect to SCO SMB */}
              <div className="border border-red-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-red-900">Cannot Connect to SCO SMB</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Symptoms:</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Printer shows "Connection failed" or "FTP error"</li>
                      <li>• Timeout errors when scanning</li>
                      <li>• No response from computer</li>
                      <li>• Scans never appear in SCO SMB</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Solutions:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="font-semibold text-green-900 mb-1">1. Check Firewall</div>
                        <div className="text-green-800">Allow SCO SMB through Windows/macOS firewall</div>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="font-semibold text-blue-900 mb-1">2. Verify IP Address</div>
                        <div className="text-blue-800">Ensure printer has correct computer IP/hostname</div>
                      </div>
                      
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <div className="font-semibold text-purple-900 mb-1">3. Test Port</div>
                        <div className="text-purple-800">Use telnet to verify port 21 is accessible</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Problem 2: Printer Not Discovered */}
              <div className="border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Network className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-yellow-900">Printer Not Discovered</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Symptoms:</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• "Discover Scanners" finds no printers</li>
                      <li>• Known printers don't appear in list</li>
                      <li>• Network scan times out</li>
                      <li>• Only some printers discovered</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Solutions:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="font-semibold text-green-900 mb-1">1. Network Subnet</div>
                        <div className="text-green-800">Verify computer and printers on same subnet</div>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="font-semibold text-blue-900 mb-1">2. Manual Addition</div>
                        <div className="text-blue-800">Add printer manually by IP address</div>
                      </div>
                      
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <div className="font-semibold text-purple-900 mb-1">3. SNMP Settings</div>
                        <div className="text-purple-800">Enable SNMP on printer for discovery</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Problem 3: Intermittent Connections */}
              <div className="border border-orange-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <Router className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-orange-900">Intermittent Connection Issues</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Symptoms:</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Sometimes works, sometimes doesn't</li>
                      <li>• Connection drops during scanning</li>
                      <li>• Works after restarting SCO SMB</li>
                      <li>• Network timeouts occur randomly</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Solutions:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="font-semibold text-green-900 mb-1">1. Static IP</div>
                        <div className="text-green-800">Use static IP addresses instead of DHCP</div>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="font-semibold text-blue-900 mb-1">2. Power Management</div>
                        <div className="text-blue-800">Disable network adapter sleep mode</div>
                      </div>
                      
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <div className="font-semibold text-purple-900 mb-1">3. Network Stability</div>
                        <div className="text-purple-800">Check for network congestion/interference</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Advanced Troubleshooting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Advanced Network Troubleshooting</h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Network Analysis */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Network Analysis Tools</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Windows Tools:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="bg-black rounded p-2 text-green-400 text-xs font-mono">
                          ipconfig /all
                        </div>
                        <div className="text-gray-700">Check network configuration</div>
                        
                        <div className="bg-black rounded p-2 text-green-400 text-xs font-mono">
                          arp -a
                        </div>
                        <div className="text-gray-700">View ARP table for network devices</div>
                        
                        <div className="bg-black rounded p-2 text-green-400 text-xs font-mono">
                          nmap -sn 192.168.1.0/24
                        </div>
                        <div className="text-gray-700">Scan network for active devices</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* macOS Tools */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">macOS Analysis</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Terminal Commands:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="bg-black rounded p-2 text-green-400 text-xs font-mono">
                          ifconfig
                        </div>
                        <div className="text-gray-700">Display network interface configuration</div>
                        
                        <div className="bg-black rounded p-2 text-green-400 text-xs font-mono">
                          netstat -rn
                        </div>
                        <div className="text-gray-700">Show routing table</div>
                        
                        <div className="bg-black rounded p-2 text-green-400 text-xs font-mono">
                          lsof -i :21
                        </div>
                        <div className="text-gray-700">Check what's using port 21</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enterprise Network Issues */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">Enterprise Network Considerations</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-purple-900 mb-2">Common Enterprise Issues:</h4>
                    <ul className="space-y-1 text-purple-800 text-sm">
                      <li>• VLAN segmentation blocking traffic</li>
                      <li>• Corporate firewall blocking FTP</li>
                      <li>• Proxy servers interfering</li>
                      <li>• Network access control (NAC) issues</li>
                      <li>• Group policy restrictions</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-purple-900 mb-2">Solutions:</h4>
                    <ul className="space-y-1 text-purple-800 text-sm">
                      <li>• Work with IT department for VLAN rules</li>
                      <li>• Request firewall exceptions</li>
                      <li>• Use alternative ports if needed</li>
                      <li>• Configure network policies</li>
                      <li>• Consider SMB protocol alternative</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step-by-Step Diagnostic Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Complete Diagnostic Process</h2>
            
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Systematic Approach</h3>
                    <p className="text-blue-800 text-sm">
                      Follow this step-by-step process to systematically identify and resolve connection issues.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Verify Basic Connectivity</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-semibold text-gray-900 mb-2">Tests to Perform:</div>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Ping printer from computer</li>
                            <li>• Access printer web interface</li>
                            <li>• Verify SCO SMB is running</li>
                            <li>• Check firewall status</li>
                          </ul>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 mb-2">Expected Results:</div>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Ping successful (&lt; 5ms response)</li>
                            <li>• Web interface loads</li>
                            <li>• SCO SMB shows "Listening on port 21"</li>
                            <li>• Firewall allows SCO SMB</li>
                          </ul>
                        </div>
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Test FTP Connection</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-3 text-sm">
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">From Printer Network:</div>
                          <div className="bg-black rounded p-2 text-green-400 text-xs font-mono">
                            telnet [computer-ip] 21
                          </div>
                          <div className="text-gray-700 mt-1">Should see "220 SCO SMB FTP Server Ready"</div>
                        </div>
                        
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">Alternative Test:</div>
                          <div className="bg-black rounded p-2 text-green-400 text-xs font-mono">
                            ftp [computer-ip]
                          </div>
                          <div className="text-gray-700 mt-1">Try anonymous login</div>
                        </div>
                      </div>
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyze Network Configuration</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-semibold text-gray-900 mb-2">Check Network Settings:</div>
                          <ul className="space-y-1 text-gray-700">
                            <li>• IP address and subnet mask</li>
                            <li>• Default gateway</li>
                            <li>• DNS servers</li>
                            <li>• DHCP vs static configuration</li>
                          </ul>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 mb-2">Look For:</div>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Different subnets</li>
                            <li>• VLAN isolation</li>
                            <li>• Routing issues</li>
                            <li>• IP conflicts</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      4
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Test Actual Scan</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-2 text-sm">
                        <div>
                          <div className="font-semibold text-gray-900">Perform Test Scan:</div>
                          <ol className="space-y-1 text-gray-700 mt-1">
                            <li>1. Place test document on printer</li>
                            <li>2. Select "Scan to Network" or configured destination</li>
                            <li>3. Monitor SCO SMB for incoming connection</li>
                            <li>4. Check for error messages on printer display</li>
                            <li>5. Verify file appears in destination folder</li>
                          </ol>
                        </div>
                      </div>
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
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-[#153B6B]/5 to-[#00A8B5]/5 rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Related Troubleshooting</h2>
            
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
                  <Link href="/docs/printers/protocols" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    FTP vs SMB Protocol Guide
                  </Link>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Additional Troubleshooting</h3>
                <div className="space-y-3">
                  <Link href="/docs/troubleshooting/performance" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Performance Optimization
                  </Link>
                  <Link href="/docs/troubleshooting/logs" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Log Analysis Guide
                  </Link>
                  <Link href="/docs/troubleshooting/errors" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Error Code Reference
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