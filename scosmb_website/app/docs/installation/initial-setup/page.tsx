import { Metadata } from 'next'
import Link from 'next/link'
import { Settings, Server, Shield, CheckCircle, AlertTriangle, Play } from 'lucide-react'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = {
  title: 'Initial Setup Guide - SCO SMB Documentation',
  description: 'Complete initial setup and configuration guide for SCO SMB after installation, including folder setup and server configuration.',
}

export default function InitialSetupPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <PageHeader
        title="<span class='text-[#00A8B5]'>Initial</span> Setup Guide"
        subtitle="Complete setup and configuration guide for SCO SMB after installation, including folder setup and server configuration."
        icon="Play"
        backLink={{
          href: "/docs",
          label: "Back to Documentation"
        }}
        badges={[
          "Quick Setup",
          "Configuration",
          "Getting Started"
        ]}
      />

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">

        {/* Prerequisites */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <Shield className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Prerequisites</h3>
              <p className="mt-1 text-sm text-blue-700">
                Complete installation of SCO SMB and verify the application launches successfully.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* First Launch */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Play className="w-6 h-6 mr-2 text-blue-600" />
                First Launch
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Launch SCO SMB</h3>
                  <div className="space-y-2 text-gray-600">
                    <p><strong>Windows:</strong> Look for the SCO SMB icon in the system tray (bottom-right corner) or launch from Start Menu</p>
                    <p><strong>macOS:</strong> Look for the SCO SMB icon in the menu bar (top-right corner) or launch from Applications folder</p>
                    <p>If the app doesn't start automatically, double-click the desktop shortcut or find it in your applications.</p>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <h3 className="font-medium text-green-800 mb-2">✓ Verify Server Status</h3>
                  <p className="text-green-700 text-sm">
                    The main dashboard should open and show "Server Status: Running" on port 3001. 
                    If the server is not running, click the "Start Server" button.
                  </p>
                </div>
              </div>
            </section>

            {/* Basic Configuration */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Settings className="w-6 h-6 mr-2 text-blue-600" />
                Basic Configuration
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Step 1: Configure Scan Folder</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Open the SCO SMB dashboard</li>
                    <li>Click the "Settings" button or ⚙️ gear icon</li>
                    <li>In the "File Management" section, set your <strong>Default Scan Folder</strong>:
                      <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li><strong>Windows:</strong> <code>C:\Users\[YourName]\Documents\Scans</code></li>
                        <li><strong>macOS:</strong> <code>/Users/[YourName]/Documents/Scans</code></li>
                        <li><strong>Custom:</strong> Choose any folder you prefer</li>
                      </ul>
                    </li>
                    <li>Click "Browse" to select a different folder if desired</li>
                    <li>The folder will be created automatically if it doesn't exist</li>
                  </ol>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Step 2: Set File Preferences</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-800">File Format</h4>
                      <ul className="list-disc list-inside text-gray-600 ml-4">
                        <li><strong>PDF (Recommended):</strong> Best for documents, searchable text</li>
                        <li><strong>JPEG:</strong> Good for photos, smaller file size</li>
                        <li><strong>PNG:</strong> Lossless quality, larger files</li>
                        <li><strong>TIFF:</strong> High quality, archival format</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-800">File Naming Pattern</h4>
                      <div className="bg-gray-50 rounded p-3 text-sm">
                        <p className="font-medium text-gray-800 mb-2">Choose from these patterns:</p>
                        <ul className="space-y-1 text-gray-600">
                          <li>• <code>{`{date}_{time}`}</code> → <code>2025-01-20_14-30-00.pdf</code></li>
                          <li>• <code>{`{custom}_{date}_{time}`}</code> → <code>Invoice_2025-01-20_14-30-00.pdf</code></li>
                          <li>• <code>{`{date}_{custom}`}</code> → <code>2025-01-20_Contract.pdf</code></li>
                        </ul>
                        <p className="text-gray-500 mt-2">You can add custom text to make files easier to identify.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Step 3: Note Your Computer Information</h3>
                  <p className="text-gray-600 mb-3">You'll need this information to configure your printer:</p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                    <h4 className="font-medium text-yellow-800 mb-2">Important Network Details</h4>
                    <ol className="list-decimal list-inside space-y-2 text-yellow-700 text-sm">
                      <li>In Settings → "Server Configuration" section, note:
                        <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                          <li><strong>Hostname:</strong> e.g., <code>COMPUTER-NAME.local</code> (recommended)</li>
                          <li><strong>IP Address:</strong> e.g., <code>192.168.1.100</code> (fallback)</li>
                          <li><strong>HTTP Port:</strong> <code>3001</code> (default)</li>
                        </ul>
                      </li>
                      <li><strong>Write these down</strong> - you'll enter them in your printer's address book</li>
                    </ol>
                  </div>
                </div>
              </div>
            </section>

            {/* Next Steps */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Next Steps</h2>
              <div className="bg-green-50 border border-green-200 rounded p-4">
                <h3 className="font-medium text-green-800 mb-2">✓ Setup Complete!</h3>
                <p className="text-green-700 text-sm mb-3">
                  Your SCO SMB installation is now configured and ready to receive scans. 
                  The next step is to configure your printer to send scans to this computer.
                </p>
                <div className="space-x-4">
                  <Link href="/docs/printers" className="inline-flex items-center text-green-600 hover:text-green-800 text-sm font-medium">
                    Printer Setup Guide →
                  </Link>
                  <Link href="/docs/troubleshooting/common-issues" className="inline-flex items-center text-green-600 hover:text-green-800 text-sm font-medium">
                    Troubleshooting →
                  </Link>
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
                  <Link href="/docs/installation/windows" className="text-blue-600 hover:text-blue-800 block">
                    Windows Installation →
                  </Link>
                </li>
                <li>
                  <Link href="/docs/installation/macos" className="text-blue-600 hover:text-blue-800 block">
                    macOS Installation →
                  </Link>
                </li>
                <li>
                  <Link href="/docs/printers/kyocera" className="text-blue-600 hover:text-blue-800 block">
                    Kyocera Setup →
                  </Link>
                </li>
                <li>
                  <Link href="/docs/printers/sharp" className="text-blue-600 hover:text-blue-800 block">
                    Sharp Setup →
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Default Settings</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium text-gray-800">HTTP Port</div>
                  <div className="text-gray-600">3001</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">FTP Credentials</div>
                  <div className="text-gray-600">sco / smb</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">File Format</div>
                  <div className="text-gray-600">PDF (recommended)</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Scan Folder</div>
                  <div className="text-gray-600">Documents/Scans</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
              <p className="text-gray-600 text-sm mb-4">
                Need help with initial setup? Our support team is here to assist.
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
      </section>
    </div>
  )
}