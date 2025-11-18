import { Metadata } from 'next'
import Link from 'next/link'
import { Network, CheckCircle, AlertTriangle, Settings, Monitor } from 'lucide-react'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = {
  title: 'Sharp Printer Setup Guide - SCO SMB Documentation',
  description: 'Complete setup guide for Sharp MX series printers with SCO SMB using WSD and HTTP POST protocols.',
}

export default function SharpPrinterSetupPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <PageHeader
        title="<span class='text-[#00A8B5]'>Sharp</span> Printer Setup Guide"
        subtitle="Complete setup guide for Sharp MX and BP series multifunction printers."
        icon="Printer"
        backLink={{
          href: "/docs",
          label: "Back to Documentation"
        }}
        badges={[
          "WSD Protocol",
          "HTTP POST",
          "MX Series Support"
        ]}
      />

      <div className="container mx-auto px-4 pb-8">

        {/* Prerequisites */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <Settings className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Prerequisites</h3>
              <p className="mt-1 text-sm text-blue-700">
                SCO SMB must be installed and running. Sharp printers use WSD (Web Services on Devices) protocol.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Compatible Models */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Compatible Sharp Models</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-orange-50 border border-orange-200 rounded p-4">
                  <h3 className="font-medium text-orange-800 mb-2">MX Series</h3>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Sharp MX-2630N</li>
                    <li>• Sharp MX-3070N</li>
                    <li>• Sharp MX-4070N</li>
                    <li>• Sharp MX-5070N</li>
                    <li>• Sharp MX-6070N</li>
                    <li>• Plus newer MX models</li>
                  </ul>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded p-4">
                  <h3 className="font-medium text-blue-800 mb-2">BP Series</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Sharp BP-70C65</li>
                    <li>• Sharp BP-50C65</li>
                    <li>• Sharp BP-50C55</li>
                    <li>• Sharp BP-70C55</li>
                    <li>• Plus newer BP models</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <strong>Note:</strong> Most Sharp network MFPs manufactured after 2015 support the required protocols.
              </div>
            </section>

            {/* Protocol Information */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sharp Protocol Support</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-green-300 rounded-lg p-4 bg-green-50">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <h3 className="font-semibold text-green-800">HTTP POST (Primary)</h3>
                  </div>
                  <ul className="text-sm text-green-700 space-y-1 mb-4">
                    <li>• Standard web upload protocol</li>
                    <li>• Works with all modern Sharp MFPs</li>
                    <li>• Simple URL-based configuration</li>
                    <li>• Most reliable method</li>
                  </ul>
                </div>

                <div className="border border-blue-300 rounded-lg p-4 bg-blue-50">
                  <div className="flex items-center mb-3">
                    <Network className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-blue-800">WSD Protocol</h3>
                  </div>
                  <ul className="text-sm text-blue-700 space-y-1 mb-4">
                    <li>• Sharp's proprietary scan-to-PC protocol</li>
                    <li>• Auto-discovery of computers</li>
                    <li>• Built into SCO SMB</li>
                    <li>• Good fallback option</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* HTTP Setup */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Network className="w-6 h-6 mr-2 text-green-600" />
                Method 1: HTTP POST Setup (Recommended)
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Step 1: Gather Computer Information</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Open SCO SMB on your computer</li>
                    <li>Navigate to Settings → "Server Configuration"</li>
                    <li>Note these details:
                      <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mt-2">
                        <ul className="list-disc list-inside text-sm space-y-1">
                          <li><strong>Hostname:</strong> <code>COMPUTER-NAME.local</code></li>
                          <li><strong>IP Address:</strong> <code>192.168.1.xxx</code></li>
                          <li><strong>Port:</strong> <code>3001</code></li>
                        </ul>
                      </div>
                    </li>
                  </ol>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Step 2: Access Sharp Printer Settings</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Press <strong>Settings</strong> on the Sharp printer touch panel</li>
                    <li>Navigate to <strong>Network</strong> → <strong>Scan Destinations</strong></li>
                    <li>Or access via web browser: <code>http://[printer-ip]</code></li>
                    <li>Login with administrator credentials if prompted</li>
                  </ol>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Step 3: Add HTTP Upload Destination</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Select <strong>Add</strong> or <strong>New Destination</strong></li>
                    <li>Choose <strong>HTTP Upload</strong> as the destination type</li>
                    <li>Fill in the destination details:
                      <div className="bg-gray-50 rounded p-3 mt-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div>
                            <strong>Name:</strong> <code>[Your Name] - PC</code><br/>
                            <strong>URL:</strong> <code>http://COMPUTER-NAME.local:3001/scan/upload</code><br/>
                            <strong>Port:</strong> <code>3001</code><br/>
                            <strong>Method:</strong> <code>POST</code>
                          </div>
                          <div>
                            <strong>File Format:</strong> <code>PDF</code><br/>
                            <strong>Resolution:</strong> <code>300 DPI</code><br/>
                            <strong>Color Mode:</strong> <code>Auto</code><br/>
                            <strong>Authentication:</strong> <code>None</code>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>Save the destination</li>
                  </ol>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Step 4: Test the Connection</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Place a test document on the scanner</li>
                    <li>Press <strong>SCAN</strong> on the printer</li>
                    <li>Select your destination from the list</li>
                    <li>Choose scan settings (color, resolution) if prompted</li>
                    <li>Press <strong>START</strong> to scan</li>
                    <li>Verify the scan appears in your SCO SMB scan folder</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* WSD Setup */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Monitor className="w-6 h-6 mr-2 text-blue-600" />
                Method 2: WSD Protocol (Alternative)
              </h2>
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded p-4">
                  <h3 className="font-medium text-blue-800 mb-2">About WSD Protocol</h3>
                  <p className="text-blue-700 text-sm">
                    WSD (Web Services on Devices) is Sharp's proprietary protocol for scan-to-PC functionality. 
                    SCO SMB includes a WSD server that Sharp printers can auto-discover on the network.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Step 1: Ensure WSD is Enabled</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Open SCO SMB Settings</li>
                    <li>Check that <strong>WSD Server</strong> is enabled (enabled by default)</li>
                    <li>Note your computer's network name</li>
                  </ol>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Step 2: Configure Sharp Printer</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Press <strong>Settings</strong> on the Sharp printer</li>
                    <li>Navigate to <strong>Network</strong> → <strong>Scan to PC</strong></li>
                    <li>Select <strong>Auto Discovery</strong> or <strong>Search for PCs</strong></li>
                    <li>Your computer should appear in the list automatically</li>
                    <li>Select your computer and save the configuration</li>
                  </ol>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">WSD Limitations</h4>
                      <ul className="text-yellow-700 text-sm mt-1 space-y-1">
                        <li>• May not work on all network configurations</li>
                        <li>• Auto-discovery can be inconsistent</li>
                        <li>• Less reliable than HTTP POST method</li>
                        <li>• Use HTTP POST method if WSD fails</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Troubleshooting */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Troubleshooting Sharp Printers</h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded p-4">
                  <h3 className="font-medium text-red-600 mb-2">Scanner Not Found / Auto-Discovery Failed</h3>
                  <div className="text-gray-600 text-sm space-y-2">
                    <p><strong>Common Causes:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>WSD protocol blocked by firewall</li>
                      <li>Computer and printer on different VLANs</li>
                      <li>Network discovery disabled</li>
                    </ul>
                    <p><strong>Solutions:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Use HTTP POST method instead</li>
                      <li>Check Windows Network Discovery settings</li>
                      <li>Ensure both devices are on same network segment</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded p-4">
                  <h3 className="font-medium text-orange-600 mb-2">HTTP Upload Failed</h3>
                  <div className="text-gray-600 text-sm space-y-2">
                    <p><strong>Check These Items:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>URL format: <code>http://[ip]:3001/scan/upload</code></li>
                      <li>Port 3001 is correct (not 80 or 443)</li>
                      <li>Use HTTP, not HTTPS</li>
                      <li>Computer hostname resolution working</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded p-4">
                  <h3 className="font-medium text-blue-600 mb-2">Network Configuration Tips</h3>
                  <div className="text-gray-600 text-sm">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Use static IP or DHCP reservation for computer</li>
                      <li>Prefer hostname.local over IP addresses</li>
                      <li>Ensure both devices on same subnet</li>
                      <li>Test connectivity with ping command</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Reference</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium text-gray-800">Primary Protocol</div>
                  <div className="text-gray-600">HTTP POST</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Backup Protocol</div>
                  <div className="text-gray-600">WSD</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Default Port</div>
                  <div className="text-gray-600">3001</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">URL Path</div>
                  <div className="text-gray-600">/scan/upload</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Recommended Format</div>
                  <div className="text-gray-600">PDF</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Related Guides</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/docs/printers/kyocera" className="text-blue-600 hover:text-blue-800 block">
                    Kyocera Setup →
                  </Link>
                </li>
                <li>
                  <Link href="/docs/printers/canon-hp" className="text-blue-600 hover:text-blue-800 block">
                    Canon/HP Setup →
                  </Link>
                </li>
                <li>
                  <Link href="/docs/network/configuration" className="text-blue-600 hover:text-blue-800 block">
                    Network Config →
                  </Link>
                </li>
                <li>
                  <Link href="/docs/troubleshooting/printer-issues" className="text-blue-600 hover:text-blue-800 block">
                    Printer Troubleshooting →
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sharp Specific Features</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div>
                  <div className="font-medium text-gray-800">OSA Platform</div>
                  <div>Some Sharp models support enhanced OSA scanning features</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Auto Color Detection</div>
                  <div>Sharp printers can automatically detect document color</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Duplex Scanning</div>
                  <div>Automatic double-sided document scanning</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
              <p className="text-gray-600 text-sm mb-4">
                Need help with Sharp printer setup? Our team has extensive experience with Sharp MFP integration.
              </p>
              <div className="space-y-2">
                <a href="mailto:support@southcoastoffice.com" className="block text-blue-600 hover:text-blue-800 text-sm">
                  support@southcoastoffice.com
                </a>
                <Link href="/support" className="block text-blue-600 hover:text-blue-800 text-sm">
                  Contact Support →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}