import { Metadata } from 'next'
import Link from 'next/link'
import { Download, Shield, Settings, CheckCircle, AlertTriangle } from 'lucide-react'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = {
  title: 'Windows Installation Guide - SCO SMB Documentation',
  description: 'Complete step-by-step guide for installing SCO SMB on Windows 10/11 systems, including firewall configuration and initial setup.',
}

export default function WindowsInstallationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <PageHeader
        title="Windows <span class='text-[#00A8B5]'>Installation</span>"
        subtitle="Complete step-by-step guide for installing SCO SMB on Windows 10/11 systems, including firewall configuration and initial setup."
        icon="Download"
        backLink={{
          href: "/docs",
          label: "Back to Documentation"
        }}
        badges={[
          "Windows 10/11 Compatible",
          "Firewall Configuration",
          "Security Setup"
        ]}
      />

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">

        {/* Quick Info */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <Shield className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Administrator Privileges Required</h3>
              <p className="mt-1 text-sm text-blue-700">
                This installation requires administrator privileges for automatic firewall configuration.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* System Requirements */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Settings className="w-6 h-6 mr-2 text-blue-600" />
                System Requirements
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Minimum Requirements</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Windows 10 (64-bit) or later
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      4GB RAM minimum (8GB recommended)
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      500MB free disk space
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      x64 processor
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Administrator privileges for installation
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Network Requirements</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Active network connection
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Access to printer's IP address
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Port 3001 available (not used by other applications)
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Pre-Installation */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pre-Installation Checklist</h2>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">Verify computer meets minimum requirements</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">Check network connectivity to printer</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">Obtain installer from latest release</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">Verify administrator credentials</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">Note printer IP address and model</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">Backup any existing scan configurations</span>
                </label>
              </div>
            </section>

            {/* Installation Steps */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Download className="w-6 h-6 mr-2 text-blue-600" />
                Installation Process
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Step 1: Download Installer</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Visit the <a href="https://github.com/C-Elkins/SCO-SMB/releases/latest" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">latest release page</a></li>
                    <li>Download <code className="bg-gray-100 px-2 py-1 rounded">SCO SMB-Setup-1.1.1.exe</code></li>
                    <li>Save to a location you can easily find (Downloads folder)</li>
                  </ol>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Step 2: Run the Installer</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Right-click <code className="bg-gray-100 px-2 py-1 rounded">SCO SMB-Setup-1.1.1.exe</code> and select "Run as administrator"</li>
                    <li>If Windows SmartScreen appears, click "More info" → "Run anyway"</li>
                    <li>When User Account Control prompts, click "Yes" to allow installation</li>
                  </ol>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Step 3: Installation Wizard</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li><strong>Welcome Screen:</strong> Click "Next"</li>
                    <li><strong>License Agreement:</strong> Review and accept the EULA, click "Next"</li>
                    <li><strong>Installation Location:</strong> Default path is recommended (C:\Program Files\SCO SMB), click "Next"</li>
                    <li><strong>Start Menu Folder:</strong> Default "SCO SMB" is fine, click "Next"</li>
                    <li><strong>Additional Tasks:</strong>
                      <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li>✅ Create desktop shortcut (recommended)</li>
                        <li>✅ Run SCO SMB on Windows startup (recommended for end users)</li>
                      </ul>
                    </li>
                    <li>Click "Next"</li>
                    <li><strong>Ready to Install:</strong> Click "Install"</li>
                    <li>Wait for installation (1-2 minutes)</li>
                    <li><strong>Completion:</strong> Keep "Launch SCO SMB" checked, click "Finish"</li>
                  </ol>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Step 4: Windows Firewall Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-800">Automatic Configuration (Recommended)</h4>
                      <p className="text-gray-600 mt-1">On first launch, Windows Defender Firewall will prompt:</p>
                      <ol className="list-decimal list-inside space-y-2 text-gray-600 mt-2">
                        <li>Windows shows: "Windows Defender Firewall has blocked some features of SCO SMB"</li>
                        <li>✅ Check "Private networks" (required for LAN printers)</li>
                        <li>✅ Check "Public networks" (optional, for guest Wi-Fi)</li>
                        <li>Click "Allow access"</li>
                      </ol>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                      <div className="flex">
                        <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-800">Manual Firewall Configuration</h4>
                          <p className="text-yellow-700 text-sm mt-1">
                            If automatic configuration fails, you may need to manually configure Windows Firewall:
                          </p>
                          <ol className="list-decimal list-inside text-sm text-yellow-700 mt-2 space-y-1">
                            <li>Press Windows Key + R, type <code>wf.msc</code>, press Enter</li>
                            <li>Click "Inbound Rules" → "New Rule..."</li>
                            <li>Select "Port" → TCP → Specific local ports: <code>3001</code></li>
                            <li>Allow the connection for all profiles</li>
                            <li>Name: "SCO SMB HTTP Server"</li>
                            <li>Repeat for FTP: Port <code>21</code> and passive ports <code>1024-1048</code></li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Post-Installation */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Post-Installation Setup</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Verify Installation</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Look for SCO SMB icon in system tray (bottom-right corner)</li>
                    <li>If not visible, launch from Start Menu → SCO SMB</li>
                    <li>The main dashboard should open automatically</li>
                    <li>Verify server status shows "Running" on port 3001</li>
                  </ol>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded p-4">
                  <h3 className="font-medium text-blue-800 mb-2">Next Steps</h3>
                  <p className="text-blue-700 text-sm">
                    Installation is complete! Now you need to configure your scan folder and set up printer connections.
                  </p>
                  <div className="mt-3 space-x-4">
                    <Link href="/docs/installation/initial-setup" className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Initial Setup Guide →
                    </Link>
                    <Link href="/docs/printers" className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Printer Configuration →
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/docs/installation/macos" className="text-blue-600 hover:text-blue-800 block">
                    macOS Installation →
                  </Link>
                </li>
                <li>
                  <Link href="/docs/installation/requirements" className="text-blue-600 hover:text-blue-800 block">
                    System Requirements →
                  </Link>
                </li>
                <li>
                  <Link href="/docs/installation/initial-setup" className="text-blue-600 hover:text-blue-800 block">
                    Initial Setup →
                  </Link>
                </li>
                <li>
                  <Link href="/docs/troubleshooting/common-issues" className="text-blue-600 hover:text-blue-800 block">
                    Common Issues →
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
              <p className="text-gray-600 text-sm mb-4">
                Need help with installation? Our support team is here to assist.
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
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Version Info</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Latest Version:</strong> 1.1.1</p>
                <p><strong>Release Date:</strong> January 2025</p>
                <p><strong>File Size:</strong> ~191 MB</p>
                <p><strong>Compatibility:</strong> Windows 10/11 (64-bit)</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>
    </div>
  )
}