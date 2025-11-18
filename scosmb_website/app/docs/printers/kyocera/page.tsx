import { Metadata } from 'next'
import Link from 'next/link'
import { Server, Network, CheckCircle, Settings } from 'lucide-react'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = {
  title: 'Kyocera Printer Setup Guide - SCO SMB Documentation',
  description: 'Complete setup guide for Kyocera TASKalfa and ECOSYS printers with SCO SMB, including HTTP POST and FTP configuration.',
}

export default function KyoceraPrinterSetupPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <PageHeader
        title="<span class='text-[#00A8B5]'>Kyocera</span> Printer Setup Guide"
        subtitle="Complete setup guide for Kyocera TASKalfa, ECOSYS, and MZ series printers with SCO SMB, including HTTP POST and FTP configuration."
        icon="Printer"
        backLink={{
          href: "/docs",
          label: "Back to Documentation"
        }}
        badges={[
          "TASKalfa Series",
          "ECOSYS Compatible", 
          "HTTP POST & FTP"
        ]}
      />

      {/* Content */}
      <section className="py-20">
        <div className="container-wide">
          <div className="space-y-12">

        {/* Prerequisites */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
          <div className="flex">
            <div className="shrink-0">
              <Settings className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Prerequisites</h3>
              <p className="mt-1 text-sm text-blue-700">
                SCO SMB must be installed and running on your computer before configuring the printer.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Compatible Models */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Compatible Kyocera Models</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <h3 className="font-medium text-green-800 mb-2">TASKalfa Series</h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• TASKalfa 2552ci</li>
                    <li>• TASKalfa 3252ci</li>
                    <li>• TASKalfa 4052ci</li>
                    <li>• TASKalfa 5052ci</li>
                    <li>• TASKalfa 6052ci</li>
                  </ul>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded p-4">
                  <h3 className="font-medium text-blue-800 mb-2">ECOSYS Series</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• ECOSYS M3145dn</li>
                    <li>• ECOSYS M3645dn</li>
                    <li>• ECOSYS M6635cidn</li>
                    <li>• ECOSYS M8124cidn</li>
                    <li>• ECOSYS P4140dn</li>
                  </ul>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded p-4">
                  <h3 className="font-medium text-purple-800 mb-2">TASKalfa MZ Series</h3>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• TASKalfa MZ2554ci</li>
                    <li>• TASKalfa MZ3200i</li>
                    <li>• TASKalfa MZ4000i</li>
                    <li>• Plus newer models</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <strong>Note:</strong> This guide works with most Kyocera network-capable MFPs manufactured after 2010.
              </div>
            </section>

            {/* Method Selection */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Choose Configuration Method</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-green-300 rounded-lg p-4 bg-green-50">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <h3 className="font-semibold text-green-800">HTTP POST (Recommended)</h3>
                  </div>
                  <ul className="text-sm text-green-700 space-y-1 mb-4">
                    <li>• Works with all modern Kyocera models</li>
                    <li>• Simplest setup process</li>
                    <li>• Most reliable connection</li>
                    <li>• No credentials required</li>
                  </ul>
                  <div className="text-xs text-green-600">
                    ✓ Best for TASKalfa and ECOSYS series
                  </div>
                </div>

                <div className="border border-blue-300 rounded-lg p-4 bg-blue-50">
                  <div className="flex items-center mb-3">
                    <Server className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-blue-800">FTP (Compatibility)</h3>
                  </div>
                  <ul className="text-sm text-blue-700 space-y-1 mb-4">
                    <li>• Works with older models</li>
                    <li>• Requires username/password</li>
                    <li>• May need firewall configuration</li>
                    <li>• Good fallback option</li>
                  </ul>
                  <div className="text-xs text-blue-600">
                    Use if HTTP POST doesn't work
                  </div>
                </div>
              </div>
            </section>

            {/* HTTP POST Setup */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Network className="w-6 h-6 mr-2 text-green-600" />
                Method 1: HTTP POST Setup (Recommended)
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Step 1: Get Your Computer Information</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Open SCO SMB on your computer</li>
                    <li>Go to Settings → "Server Configuration" section</li>
                    <li>Note down these details:
                      <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mt-2">
                        <ul className="list-disc list-inside text-sm space-y-1">
                          <li><strong>Hostname:</strong> <code>COMPUTER-NAME.local</code> (recommended)</li>
                          <li><strong>IP Address:</strong> <code>192.168.1.xxx</code> (backup option)</li>
                          <li><strong>Port:</strong> <code>3001</code> (default)</li>
                        </ul>
                      </div>
                    </li>
                  </ol>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Step 2: Configure Kyocera Printer</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Access Printer Web Interface</h4>
                      <ol className="list-decimal list-inside space-y-2 text-gray-600">
                        <li>Find your printer's IP address (printed on network status page)</li>
                        <li>Open a web browser and navigate to: <code>http://[printer-ip]</code></li>
                        <li>Login with administrator credentials:
                          <ul className="list-disc list-inside ml-4 mt-1">
                            <li>Default: Username <code>admin</code>, Password <code>admin</code></li>
                            <li>Or check printer manual for defaults</li>
                          </ul>
                        </li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Create HTTP Destination</h4>
                      <ol className="list-decimal list-inside space-y-2 text-gray-600">
                        <li>Navigate to: <strong>Address Book</strong> or <strong>Destination List</strong></li>
                        <li>Click <strong>Add</strong> or <strong>New Entry</strong></li>
                        <li>Select <strong>URL</strong>, <strong>HTTP</strong>, or <strong>Web Service</strong> as destination type</li>
                        <li>Fill in the details:
                          <div className="bg-gray-50 rounded p-3 mt-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                              <div>
                                <strong>Name:</strong> <code>My PC - [Your Name]</code><br/>
                                <strong>URL:</strong> <code>http://[YOUR-IP]:3001/scan/upload</code><br/>
                                <strong>Method:</strong> <code>POST</code><br/>
                                <strong>File Format:</strong> <code>PDF</code>
                              </div>
                              <div>
                                <strong>Resolution:</strong> <code>300 DPI</code><br/>
                                <strong>Color Mode:</strong> <code>Auto</code><br/>
                                <strong>Authentication:</strong> <code>None</code><br/>
                                <strong>Port:</strong> <code>3001</code>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>Save the entry</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Step 3: Test the Setup</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Place a test document on the printer's scanner</li>
                    <li>Press <strong>SCAN</strong> on the printer touch panel</li>
                    <li>Select <strong>Send</strong> or <strong>Scan to Destination</strong></li>
                    <li>Choose your entry from the address book</li>
                    <li>Press <strong>START</strong> to begin scanning</li>
                    <li>Watch for success message on printer display</li>
                    <li>Check your scan folder on the computer for the new file</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* FTP Setup */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Server className="w-6 h-6 mr-2 text-blue-600" />
                Method 2: FTP Setup (Fallback Option)
              </h2>
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded p-4">
                  <h3 className="font-medium text-blue-800 mb-2">When to Use FTP Method</h3>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• HTTP POST method doesn't work with your model</li>
                    <li>• Older Kyocera printers (pre-2015)</li>
                    <li>• Printer firmware doesn't support HTTP scanning</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Step 1: Enable FTP Server in SCO SMB</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Open SCO SMB Settings</li>
                    <li>Scroll to <strong>FTP Server</strong> section</li>
                    <li>Toggle <strong>Enable FTP Server</strong> to ON</li>
                    <li>Note the credentials:
                      <ul className="list-disc list-inside ml-4 mt-1">
                        <li><strong>Username:</strong> <code>sco</code></li>
                        <li><strong>Password:</strong> <code>smb</code></li>
                        <li><strong>Port:</strong> <code>21</code></li>
                      </ul>
                    </li>
                    <li>Click <strong>Start FTP Server</strong> if not already running</li>
                  </ol>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Step 2: Configure Printer for FTP</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Access printer web interface or control panel</li>
                    <li>Navigate to <strong>Address Book</strong></li>
                    <li>Add new <strong>FTP</strong> destination:
                      <div className="bg-gray-50 rounded p-3 mt-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div>
                            <strong>Name:</strong> <code>[Your Name] - FTP</code><br/>
                            <strong>Protocol:</strong> <code>FTP</code><br/>
                            <strong>Host:</strong> <code>COMPUTER-NAME.local</code><br/>
                            <strong>Port:</strong> <code>21</code>
                          </div>
                          <div>
                            <strong>Path:</strong> <code>/</code><br/>
                            <strong>Username:</strong> <code>sco</code><br/>
                            <strong>Password:</strong> <code>smb</code><br/>
                            <strong>Passive Mode:</strong> <code>Enabled</code>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>Save the entry and test the connection</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Troubleshooting */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Troubleshooting Common Issues</h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded p-4">
                  <h3 className="font-medium text-red-600 mb-2">"Connection Failed" Error</h3>
                  <div className="text-gray-600 text-sm space-y-2">
                    <p><strong>Possible Causes:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Computer is asleep or turned off</li>
                      <li>SCO SMB is not running</li>
                      <li>Wrong IP address in printer settings</li>
                      <li>Firewall blocking the connection</li>
                    </ul>
                    <p><strong>Solutions:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Verify SCO SMB is running (check system tray)</li>
                      <li>Update printer with current computer IP address</li>
                      <li>Check Windows Firewall allows SCO SMB</li>
                      <li>Use hostname.local instead of IP address</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded p-4">
                  <h3 className="font-medium text-orange-600 mb-2">"URL Not Found" or "404" Error</h3>
                  <div className="text-gray-600 text-sm space-y-2">
                    <p><strong>Common Issues:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Wrong port number (should be 3001)</li>
                      <li>Incorrect URL path (should end with /scan/upload)</li>
                      <li>HTTP vs HTTPS confusion (use HTTP only)</li>
                    </ul>
                    <p><strong>Correct URL Format:</strong> <code>http://192.168.1.100:3001/scan/upload</code></p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded p-4">
                  <h3 className="font-medium text-blue-600 mb-2">Testing Connection</h3>
                  <div className="text-gray-600 text-sm">
                    <p>To test if SCO SMB is accessible from the printer:</p>
                    <ol className="list-decimal list-inside ml-4 mt-2 space-y-1">
                      <li>Open a web browser on any computer</li>
                      <li>Navigate to: <code>http://[your-computer-ip]:3001</code></li>
                      <li>You should see the SCO SMB web interface</li>
                      <li>If not accessible, check firewall settings</li>
                    </ol>
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
                  <div className="font-medium text-gray-800">HTTP Method</div>
                  <div className="text-gray-600">POST</div>
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
                  <div className="font-medium text-gray-800">FTP Credentials</div>
                  <div className="text-gray-600">sco / smb</div>
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
                  <Link href="/docs/installation/initial-setup" className="text-blue-600 hover:text-blue-800 block">
                    Initial Setup →
                  </Link>
                </li>
                <li>
                  <Link href="/docs/printers/sharp" className="text-blue-600 hover:text-blue-800 block">
                    Sharp Printer Setup →
                  </Link>
                </li>
                <li>
                  <Link href="/docs/network/firewall" className="text-blue-600 hover:text-blue-800 block">
                    Firewall Configuration →
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
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
              <p className="text-gray-600 text-sm mb-4">
                Need help with Kyocera printer setup? Our team specializes in office printer integration.
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

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Example URLs</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium text-gray-800">Using Hostname</div>
                  <div className="text-gray-600 font-mono text-xs break-all">
                    http://DESKTOP-ABC123.local:3001/scan/upload
                  </div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Using IP Address</div>
                  <div className="text-gray-600 font-mono text-xs">
                    http://192.168.1.100:3001/scan/upload
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
      </section>
    </div>
  )
}