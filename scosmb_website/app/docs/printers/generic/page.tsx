'use client';

import { motion } from 'framer-motion';
import { Network, Settings, Shield, Check, AlertTriangle, Info, ExternalLink, Printer } from 'lucide-react';
import Link from 'next/link';

export default function GenericPrinterSetupPage() {
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
              <Printer className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Generic Network Printer Setup
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Configure any brand network printer for seamless scanning with SCO SMB
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom max-w-4xl">
          
          {/* Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12"
          >
            <div className="flex items-start gap-3">
              <Info className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Universal Compatibility</h3>
                <p className="text-blue-800">
                  While SCO SMB has optimized configurations for Kyocera and Sharp printers, it works with virtually any 
                  network-capable multifunction printer that supports FTP or SMB protocols. This guide covers configuration 
                  for Canon, HP, Ricoh, Xerox, Brother, Konica Minolta, and other brands.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Supported Brands */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Supported Printer Brands</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-3">Fully Tested</h3>
                <ul className="space-y-2 text-green-800 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Kyocera (all models)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Sharp MFPs
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Canon imageRUNNER
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    HP LaserJet MFP
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-3">Compatible</h3>
                <ul className="space-y-2 text-blue-800 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    Ricoh/Savin
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    Xerox WorkCentre
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    Brother MFC Series
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    Konica Minolta
                  </li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-900 mb-3">Requirements</h3>
                <ul className="space-y-2 text-yellow-800 text-sm">
                  <li>• Network connectivity</li>
                  <li>• FTP or SMB support</li>
                  <li>• Web-based admin panel</li>
                  <li>• Scan-to-network capability</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Universal Setup Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Universal Setup Process</h2>
            
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#153B6B] to-[#00A8B5] rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Access Printer Web Interface</h3>
                  <p className="text-gray-700 mb-4">
                    Find your printer's IP address and access its web-based configuration panel.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Finding the IP Address:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Print a network configuration page from the printer panel</li>
                      <li>• Check your router's DHCP client list</li>
                      <li>• Use the printer's display panel to view network settings</li>
                      <li>• Try SCO SMB's "Discover Scanners" feature</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#153B6B] to-[#00A8B5] rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Navigate to Scan Settings</h3>
                  <p className="text-gray-700 mb-4">
                    Location varies by brand, but typically found under these menu paths:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Common Locations:</h4>
                      <ul className="space-y-1 text-gray-700 text-sm">
                        <li>• Scan → Destinations</li>
                        <li>• Network → Scan Settings</li>
                        <li>• Address Book → New Entry</li>
                        <li>• Function Settings → Scan</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Look For:</h4>
                      <ul className="space-y-1 text-gray-700 text-sm">
                        <li>• "Add Destination"</li>
                        <li>• "Network Folder"</li>
                        <li>• "FTP Settings"</li>
                        <li>• "Scan to Network"</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#153B6B] to-[#00A8B5] rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Configure FTP Destination</h3>
                  <p className="text-gray-700 mb-4">
                    Add SCO SMB as a scan destination using these universal settings:
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-3">Universal FTP Settings:</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="space-y-2">
                          <div><strong>Protocol:</strong> FTP</div>
                          <div><strong>Server/Host:</strong> [Your Computer's IP]</div>
                          <div><strong>Port:</strong> 21 (default)</div>
                          <div><strong>Username:</strong> (leave blank or "anonymous")</div>
                        </div>
                      </div>
                      <div>
                        <div className="space-y-2">
                          <div><strong>Password:</strong> (leave blank)</div>
                          <div><strong>Path/Directory:</strong> / (root)</div>
                          <div><strong>Passive Mode:</strong> Yes/Enabled</div>
                          <div><strong>Authentication:</strong> None/Anonymous</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#153B6B] to-[#00A8B5] rounded-full flex items-center justify-center text-white font-bold">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Test Connection</h3>
                  <p className="text-gray-700 mb-4">
                    Most printers have a "Test Connection" or "Check Connection" button. Use this to verify the setup.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-green-900 mb-1">Success Indicators</h4>
                        <ul className="text-green-800 text-sm space-y-1">
                          <li>• "Connection successful" message</li>
                          <li>• "FTP server reachable" confirmation</li>
                          <li>• No error codes displayed</li>
                          <li>• Test scan completes successfully</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Brand-Specific Notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Brand-Specific Configuration Notes</h2>
            
            <div className="space-y-6">
              {/* Canon */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-red-500 rounded text-white text-sm font-bold flex items-center justify-center">
                    C
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Canon imageRUNNER</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Web Interface:</strong> http://printer-ip/</p>
                    <p className="text-gray-700 mb-2"><strong>Menu Path:</strong> Settings → Send Settings → File Server</p>
                    <p className="text-gray-700 mb-2"><strong>Protocol:</strong> Select "FTP"</p>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Special Notes:</strong></p>
                    <ul className="text-gray-600 space-y-1">
                      <li>• May require login credentials</li>
                      <li>• Check "Anonymous Login" if available</li>
                      <li>• Some models need port explicitly set</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* HP */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded text-white text-sm font-bold flex items-center justify-center">
                    HP
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">HP LaserJet MFP</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Web Interface:</strong> HP Web Jetadmin</p>
                    <p className="text-gray-700 mb-2"><strong>Menu Path:</strong> Scan/Digital Send → Network Folder</p>
                    <p className="text-gray-700 mb-2"><strong>Protocol:</strong> FTP</p>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Special Notes:</strong></p>
                    <ul className="text-gray-600 space-y-1">
                      <li>• HP printers often use different terminology</li>
                      <li>• Look for "Digital Send" settings</li>
                      <li>• May require quick set setup</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Ricoh */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-green-600 rounded text-white text-sm font-bold flex items-center justify-center">
                    R
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Ricoh/Savin</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Web Interface:</strong> Web Image Monitor</p>
                    <p className="text-gray-700 mb-2"><strong>Menu Path:</strong> Address Book → Program/Change</p>
                    <p className="text-gray-700 mb-2"><strong>Type:</strong> Folder (FTP)</p>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Special Notes:</strong></p>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Uses "Folder" terminology for FTP</li>
                      <li>• May need to set transfer method to FTP</li>
                      <li>• Check passive mode setting</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Xerox */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-purple-600 rounded text-white text-sm font-bold flex items-center justify-center">
                    X
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Xerox WorkCentre</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Web Interface:</strong> CentreWare Internet Services</p>
                    <p className="text-gray-700 mb-2"><strong>Menu Path:</strong> Address Book → Individual</p>
                    <p className="text-gray-700 mb-2"><strong>Protocol:</strong> FTP</p>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2"><strong>Special Notes:</strong></p>
                    <ul className="text-gray-600 space-y-1">
                      <li>• May require "Network Services" to be enabled</li>
                      <li>• Check FTP client settings</li>
                      <li>• Some models need explicit passive mode</li>
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
            transition={{ delay: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Common Issues & Solutions</h2>
            
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-900 mb-2">Connection Failed</h3>
                    <ul className="text-red-800 text-sm space-y-1">
                      <li>• Verify SCO SMB is running and listening on the correct port</li>
                      <li>• Check firewall settings on your computer</li>
                      <li>• Ensure printer and computer are on the same network</li>
                      <li>• Try using computer hostname instead of IP address</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-yellow-900 mb-2">Authentication Required</h3>
                    <ul className="text-yellow-800 text-sm space-y-1">
                      <li>• Some printers require credentials even for FTP</li>
                      <li>• Try using "anonymous" as both username and password</li>
                      <li>• Check if "Anonymous Login" option is available</li>
                      <li>• Consult printer manual for default FTP credentials</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Protocol Not Supported</h3>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• If FTP is not available, try SMB/CIFS protocol</li>
                      <li>• Enable SMB monitoring in SCO SMB settings</li>
                      <li>• Create a shared folder for the printer to access</li>
                      <li>• Some older printers only support SMB v1</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-[#153B6B]/5 to-[#00A8B5]/5 rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Additional Resources</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Network Configuration</h3>
                <div className="space-y-3">
                  <Link href="/docs/network/setup" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Network Security Setup
                  </Link>
                  <Link href="/docs/network/ports" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Firewall Configuration
                  </Link>
                  <Link href="/docs/printers/protocols" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    FTP vs SMB Protocol Guide
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
                  <Link href="/docs/troubleshooting/logs" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Log Analysis
                  </Link>
                  <Link href="/support" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Contact Support
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