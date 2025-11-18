import { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Settings, CheckCircle, AlertTriangle, Download } from 'lucide-react'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = {
  title: 'macOS Installation Guide - SCO SMB Documentation',
  description: 'Complete step-by-step guide for installing SCO SMB on macOS systems, including security settings and initial setup.',
}

export default function MacOSInstallationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <PageHeader
        title="macOS <span class='text-[#00A8B5]'>Installation</span>"
        subtitle="Complete step-by-step guide for installing SCO SMB on macOS systems (Intel and Apple Silicon), including security settings and initial setup."
        icon="Apple"
        backLink={{
          href: "/docs",
          label: "Back to Documentation"
        }}
        badges={[
          "Intel & Apple Silicon",
          "Gatekeeper Compatible",
          "Security Permissions"
        ]}
      />

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-12">

        {/* Quick Info */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <Shield className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Gatekeeper & Security Settings</h3>
              <p className="mt-1 text-sm text-blue-700">
                macOS may require additional security permissions for network scanning features.
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
                      macOS 10.13 (High Sierra) or later
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
                      Intel x64 OR Apple Silicon (M1/M2/M3/M4)
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Administrator privileges for installation
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Architecture Support</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded p-3">
                      <h4 className="font-medium text-gray-800">Intel Macs</h4>
                      <p className="text-sm text-gray-600">Use x64 installer</p>
                      <p className="text-xs text-gray-500">MacBook Pro/Air (2019 and earlier), iMac, Mac Pro</p>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <h4 className="font-medium text-gray-800">Apple Silicon</h4>
                      <p className="text-sm text-gray-600">Use ARM64 installer</p>
                      <p className="text-xs text-gray-500">M1, M2, M3, M4 Macs (2020+)</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Determine Architecture */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Determine Your Mac Architecture</h2>
              <div className="space-y-4">
                <p className="text-gray-600">Before downloading, you need to know which type of Mac you have:</p>
                
                <div className="bg-blue-50 border border-blue-200 rounded p-4">
                  <h3 className="font-medium text-blue-800 mb-2">Quick Check Method</h3>
                  <ol className="list-decimal list-inside space-y-2 text-blue-700">
                    <li>Click the Apple menu (🍎) in the top-left corner</li>
                    <li>Select "About This Mac"</li>
                    <li>Look at the "Chip" or "Processor" line:</li>
                  </ol>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white border rounded p-3">
                      <p className="font-medium text-green-700">Apple Silicon</p>
                      <p className="text-sm text-gray-600">Shows "Apple M1", "Apple M2", "Apple M3", or "Apple M4"</p>
                      <p className="text-xs text-blue-600 mt-1">→ Download ARM64 version</p>
                    </div>
                    <div className="bg-white border rounded p-3">
                      <p className="font-medium text-blue-700">Intel Mac</p>
                      <p className="text-sm text-gray-600">Shows "Intel Core i5", "Intel Core i7", etc.</p>
                      <p className="text-xs text-blue-600 mt-1">→ Download x64 version</p>
                    </div>
                  </div>
                </div>
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
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Step 1: Download Correct Installer</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Visit the <Link href="/download" className="text-blue-600 hover:text-blue-800">SCO SMB download page</Link></li>
                    <li>Download the correct version for your Mac:
                      <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li><strong>Apple Silicon:</strong> <code className="bg-gray-100 px-2 py-1 rounded">SCO-SMB-arm64.dmg</code></li>
                        <li><strong>Intel Mac:</strong> <code className="bg-gray-100 px-2 py-1 rounded">SCO-SMB-x64.dmg</code></li>
                      </ul>
                    </li>
                    <li>Save to Downloads folder</li>
                  </ol>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Step 2: Mount and Install</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Double-click the downloaded <code className="bg-gray-100 px-2 py-1 rounded">.dmg</code> file</li>
                    <li>A new window opens showing the SCO SMB installer</li>
                    <li>Drag the "SCO SMB" application to the "Applications" folder</li>
                    <li>Wait for the copy process to complete</li>
                    <li>Eject the disk image when finished</li>
                  </ol>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Step 3: Handle Gatekeeper Security</h3>
                  <div className="bg-orange-50 border border-orange-200 rounded p-3 mb-3">
                    <div className="flex">
                      <AlertTriangle className="h-5 w-5 text-orange-400 mr-2 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-orange-800">First Launch Security Warning</h4>
                        <p className="text-orange-700 text-sm">
                          macOS will likely block the app on first launch since it's not from the App Store.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-800">Method 1: Direct Launch (Recommended)</h4>
                      <ol className="list-decimal list-inside space-y-2 text-gray-600 mt-2">
                        <li>Go to Applications folder</li>
                        <li>Right-click (or Control-click) on "SCO SMB"</li>
                        <li>Select "Open" from the context menu</li>
                        <li>Click "Open" in the security dialog that appears</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-800">Method 2: System Preferences (If Method 1 doesn't work)</h4>
                      <ol className="list-decimal list-inside space-y-2 text-gray-600 mt-2">
                        <li>Try to launch SCO SMB normally (it will be blocked)</li>
                        <li>Open System Preferences → Security & Privacy</li>
                        <li>Click the "General" tab</li>
                        <li>Look for a message about SCO SMB being blocked</li>
                        <li>Click "Open Anyway"</li>
                        <li>Confirm by clicking "Open" in the dialog</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Step 4: Grant Network Permissions</h3>
                  <p className="text-gray-600 mb-3">SCO SMB needs network access to receive scans from printers:</p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>When SCO SMB first starts, macOS may prompt for network access</li>
                    <li>Click "Allow" to permit incoming network connections</li>
                    <li>If you miss this prompt, you can enable it later in:
                      <ul className="list-disc list-inside ml-4 mt-2">
                        <li><strong>macOS Ventura+:</strong> System Settings → Privacy & Security → Firewall → Options</li>
                        <li><strong>Older macOS:</strong> System Preferences → Security & Privacy → Firewall → Firewall Options</li>
                      </ul>
                    </li>
                    <li>Find "SCO SMB" in the list and ensure it's set to "Allow incoming connections"</li>
                  </ol>
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
                    <li>Look for SCO SMB icon in the menu bar (top-right corner)</li>
                    <li>If not visible, launch from Applications folder</li>
                    <li>The main dashboard should open automatically</li>
                    <li>Verify server status shows "Running" on port 3001</li>
                  </ol>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Set Launch at Login (Optional)</h3>
                  <p className="text-gray-600 mb-2">To automatically start SCO SMB when you log in:</p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li><strong>macOS Ventura+:</strong> System Settings → General → Login Items & Extensions</li>
                    <li><strong>Older macOS:</strong> System Preferences → Users & Groups → Login Items</li>
                    <li>Click the "+" button</li>
                    <li>Navigate to Applications and select "SCO SMB"</li>
                    <li>Click "Add"</li>
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

            {/* Troubleshooting */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Common Installation Issues</h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded p-4">
                  <h3 className="font-medium text-gray-800 mb-2">"SCO SMB" can't be opened because it is from an unidentified developer</h3>
                  <p className="text-gray-600 text-sm mb-2">This is normal for apps not downloaded from the App Store.</p>
                  <p className="text-blue-600 text-sm"><strong>Solution:</strong> Use the right-click → Open method described in Step 3 above.</p>
                </div>

                <div className="border border-gray-200 rounded p-4">
                  <h3 className="font-medium text-gray-800 mb-2">App launches but can't receive scans</h3>
                  <p className="text-gray-600 text-sm mb-2">Network permissions may not be granted.</p>
                  <p className="text-blue-600 text-sm"><strong>Solution:</strong> Check Firewall settings and ensure SCO SMB is allowed incoming connections.</p>
                </div>

                <div className="border border-gray-200 rounded p-4">
                  <h3 className="font-medium text-gray-800 mb-2">Wrong architecture downloaded</h3>
                  <p className="text-gray-600 text-sm mb-2">App won't launch or runs slowly (Intel app on Apple Silicon).</p>
                  <p className="text-blue-600 text-sm"><strong>Solution:</strong> Download the correct version for your Mac type and reinstall.</p>
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
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Download Links</h3>
              <div className="space-y-3">
                <a 
                  href="https://github.com/C-Elkins/SCO-SMB/releases/latest" 
                  className="block p-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Apple Silicon</p>
                      <p className="text-sm text-gray-600">M1, M2, M3, M4 Macs</p>
                    </div>
                    <Download className="w-4 h-4 text-blue-600" />
                  </div>
                </a>
                <a 
                  href="https://github.com/C-Elkins/SCO-SMB/releases/latest" 
                  className="block p-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Intel Mac</p>
                      <p className="text-sm text-gray-600">Pre-2020 Macs</p>
                    </div>
                    <Download className="w-4 h-4 text-blue-600" />
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
              <p className="text-gray-600 text-sm mb-4">
                Need help with macOS installation? Our support team is here to assist.
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
                <p><strong>Compatibility:</strong> macOS 10.13+</p>
                <p><strong>Architectures:</strong> Intel x64, Apple Silicon ARM64</p>
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