'use client';

import { motion } from 'framer-motion';
import { Settings, Network, Shield, Check, AlertTriangle, Info, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function FirstTimeSetupPage() {
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
              <Settings className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              First-Time Setup Guide
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Complete initial configuration and get your SCO SMB system up and running
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
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Before You Begin</h3>
                <p className="text-blue-800">
                  This guide assumes you have already installed SCO SMB on your system. If you haven't, please complete the 
                  <Link href="/docs/installation/windows" className="text-blue-600 hover:text-blue-800 underline mx-1">Windows</Link> 
                  or 
                  <Link href="/docs/installation/macos" className="text-blue-600 hover:text-blue-800 underline mx-1">macOS</Link> 
                  installation first.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Step 1: Launch Application */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-[#153B6B] to-[#00A8B5] rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <h2 className="text-2xl font-bold text-[#153B6B]">Launch SCO SMB</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700">
                After installation, launch SCO SMB from your Applications folder (macOS) or Start Menu (Windows). 
                The application will open and display the main dashboard.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">What You'll See:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Main dashboard with connection status
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Your computer's IP address and hostname
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    "Discover Scanners" button
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Settings menu in the top-right corner
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Step 2: License Activation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-[#153B6B] to-[#00A8B5] rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <h2 className="text-2xl font-bold text-[#153B6B]">License Activation</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700">
                SCO SMB requires a valid license for full functionality. You can use the free trial for initial testing.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-900 mb-3">Free Trial</h3>
                  <p className="text-green-800 mb-4">
                    Start with a 30-day free trial to test all features with your printers.
                  </p>
                  <ul className="space-y-2 text-green-700 text-sm">
                    <li>• Full feature access</li>
                    <li>• Up to 3 printers</li>
                    <li>• 1000 scans per month</li>
                    <li>• Email support</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3">Licensed Version</h3>
                  <p className="text-blue-800 mb-4">
                    Enter your license key for unlimited access and enterprise features.
                  </p>
                  <ul className="space-y-2 text-blue-700 text-sm">
                    <li>• Unlimited printers</li>
                    <li>• Unlimited scans</li>
                    <li>• Priority support</li>
                    <li>• Advanced security features</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">To Activate:</h3>
                <ol className="space-y-2 text-gray-700">
                  <li>1. Click "Settings" in the top-right corner</li>
                  <li>2. Navigate to "License" tab</li>
                  <li>3. Enter your license key or start free trial</li>
                  <li>4. Click "Activate" to confirm</li>
                </ol>
              </div>
            </div>
          </motion.div>

          {/* Step 3: Initial Configuration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-[#153B6B] to-[#00A8B5] rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <h2 className="text-2xl font-bold text-[#153B6B]">Initial Configuration</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Essential Settings</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-[#00A8B5] pl-4">
                    <h4 className="font-semibold text-gray-900">Scan Destination</h4>
                    <p className="text-gray-700 text-sm">
                      Choose where scans will be saved. Default: Documents/SCO SMB Scans/
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-[#00A8B5] pl-4">
                    <h4 className="font-semibold text-gray-900">File Organization</h4>
                    <p className="text-gray-700 text-sm">
                      Enable automatic date-based folder organization (YYYY/MM/DD structure)
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-[#00A8B5] pl-4">
                    <h4 className="font-semibold text-gray-900">FTP Port</h4>
                    <p className="text-gray-700 text-sm">
                      Default port 21. Change if needed for your network configuration.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-1">Network Considerations</h4>
                    <p className="text-yellow-800 text-sm">
                      Ensure your firewall allows incoming connections on the FTP port. You may need to add an exception for SCO SMB.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step 4: Scanner Discovery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-[#153B6B] to-[#00A8B5] rounded-full flex items-center justify-center text-white font-bold">
                4
              </div>
              <h2 className="text-2xl font-bold text-[#153B6B]">Discover Your Printers</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700">
                SCO SMB can automatically discover compatible network printers on your local network.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Automatic Discovery</h3>
                  <ol className="space-y-2 text-gray-700 text-sm">
                    <li>1. Click "Discover Scanners" button</li>
                    <li>2. Wait for the network scan to complete</li>
                    <li>3. Review discovered printers</li>
                    <li>4. Select printers to configure</li>
                  </ol>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Manual Addition</h3>
                  <ol className="space-y-2 text-gray-700 text-sm">
                    <li>1. Click "Add Printer Manually"</li>
                    <li>2. Enter printer IP address</li>
                    <li>3. Select printer brand/model</li>
                    <li>4. Test connection</li>
                  </ol>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">Supported Brands:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-green-800 text-sm">
                  <div>• Kyocera</div>
                  <div>• Sharp</div>
                  <div>• Canon</div>
                  <div>• HP</div>
                  <div>• Ricoh</div>
                  <div>• Xerox</div>
                  <div>• Brother</div>
                  <div>• Konica Minolta</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step 5: Test Your Setup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-[#153B6B] to-[#00A8B5] rounded-full flex items-center justify-center text-white font-bold">
                5
              </div>
              <h2 className="text-2xl font-bold text-[#153B6B]">Test Your Setup</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700">
                Once configured, test your setup to ensure everything is working correctly.
              </p>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Testing Process:</h3>
                  <ol className="space-y-2 text-gray-700">
                    <li>1. Place a test document on your printer</li>
                    <li>2. Navigate to "Scan to Network" or "Scan to FTP" on printer</li>
                    <li>3. Select the SCO SMB destination you configured</li>
                    <li>4. Press "Start" to begin scanning</li>
                    <li>5. Check SCO SMB interface for the incoming scan</li>
                    <li>6. Verify the file appears in your designated folder</li>
                  </ol>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-green-900 mb-1">Success Indicators</h4>
                      <ul className="text-green-800 text-sm space-y-1">
                        <li>• Scan appears in SCO SMB interface</li>
                        <li>• File is saved to designated folder</li>
                        <li>• No error messages displayed</li>
                        <li>• File opens correctly</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-[#153B6B]/5 to-[#00A8B5]/5 rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Next Steps</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Advanced Configuration</h3>
                <div className="space-y-3">
                  <Link href="/docs/network/setup" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Network Security Setup
                  </Link>
                  <Link href="/docs/features/organization" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    File Organization Rules
                  </Link>
                  <Link href="/docs/features/audit" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Audit Logging Setup
                  </Link>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Printer-Specific Guides</h3>
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