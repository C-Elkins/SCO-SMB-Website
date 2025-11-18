import { Metadata } from 'next'
import Link from 'next/link'
import { Monitor, HardDrive, Cpu, Network, Shield, CheckCircle, AlertTriangle } from 'lucide-react'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = {
  title: 'System Requirements - SCO SMB Documentation',
  description: 'Complete system requirements and compatibility information for SCO SMB installation on Windows and macOS.',
}

export default function SystemRequirementsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <PageHeader
        title="<span class='text-[#00A8B5]'>System</span> Requirements"
        subtitle="Complete system requirements and compatibility information for SCO SMB installation on Windows and macOS."
        icon="Monitor"
        backLink={{
          href: "/docs",
          label: "Back to Documentation"
        }}
        badges={[
          "Windows 10/11",
          "macOS Compatible", 
          "Minimum Hardware"
        ]}
      />

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Windows Requirements */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Monitor className="w-6 h-6 mr-2 text-blue-600" />
                Windows Requirements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Minimum Requirements</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      Windows 10 (64-bit) or later
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      4GB RAM
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      500MB disk space
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      x64 processor
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      Administrator privileges
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Recommended Specifications</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                      Windows 11 (latest version)
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                      8GB RAM or more
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                      1GB free disk space
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                      Modern multi-core CPU
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                      SSD storage
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded p-4">
                <h4 className="font-medium text-blue-800 mb-2">Supported Windows Versions</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="text-center">
                    <div className="text-green-600 font-medium">✓ Windows 10</div>
                    <div className="text-gray-600">Version 1903+</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-600 font-medium">✓ Windows 11</div>
                    <div className="text-gray-600">All versions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-red-600 font-medium">✗ Windows 8.1</div>
                    <div className="text-gray-600">Not supported</div>
                  </div>
                  <div className="text-center">
                    <div className="text-red-600 font-medium">✗ Windows 7</div>
                    <div className="text-gray-600">Not supported</div>
                  </div>
                </div>
              </div>
            </section>

            {/* macOS Requirements */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Cpu className="w-6 h-6 mr-2 text-blue-600" />
                macOS Requirements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Minimum Requirements</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      macOS 10.13 (High Sierra) or later
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      4GB RAM
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      500MB disk space
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      Intel x64 OR Apple Silicon
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      Administrator privileges
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Recommended Specifications</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                      macOS 12 (Monterey) or later
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                      8GB RAM or more
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                      1GB free disk space
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                      Apple Silicon (M1/M2/M3/M4)
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                      SSD storage
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <h4 className="font-medium text-green-800 mb-2">Apple Silicon Support</h4>
                  <p className="text-green-700 text-sm">
                    SCO SMB includes native Apple Silicon (ARM64) builds for optimal performance on M1, M2, M3, and M4 Macs.
                    Intel builds are also available for older Macs.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded p-4">
                  <h4 className="font-medium text-blue-800 mb-2">Supported macOS Versions</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="text-center">
                      <div className="text-green-600 font-medium">✓ Sonoma</div>
                      <div className="text-gray-600">macOS 14</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-600 font-medium">✓ Ventura</div>
                      <div className="text-gray-600">macOS 13</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-600 font-medium">✓ Monterey</div>
                      <div className="text-gray-600">macOS 12</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-600 font-medium">✓ Big Sur</div>
                      <div className="text-gray-600">macOS 11</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Network Requirements */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Network className="w-6 h-6 mr-2 text-blue-600" />
                Network Requirements
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Essential Network Configuration</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      Computer and printer must be on the same network
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      Port 3001 must be accessible (TCP)
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      Firewall exceptions required for SCO SMB
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      Static IP or DHCP reservation recommended
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded p-4">
                  <h4 className="font-medium text-gray-800 mb-3">Required Ports</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-white rounded border">
                      <div className="text-lg font-semibold text-blue-600">3001</div>
                      <div className="text-sm text-gray-600">HTTP Server</div>
                      <div className="text-xs text-gray-500">Primary scanning protocol</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded border">
                      <div className="text-lg font-semibold text-green-600">21</div>
                      <div className="text-sm text-gray-600">FTP Server</div>
                      <div className="text-xs text-gray-500">Kyocera compatibility</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded border">
                      <div className="text-lg font-semibold text-orange-600">1024-1048</div>
                      <div className="text-sm text-gray-600">FTP Passive</div>
                      <div className="text-xs text-gray-500">Data transfer range</div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Corporate Network Considerations</h4>
                      <ul className="text-yellow-700 text-sm mt-2 space-y-1">
                        <li>• VPN connections may interfere with printer discovery</li>
                        <li>• Corporate firewalls may block required ports</li>
                        <li>• VLAN isolation may prevent printer communication</li>
                        <li>• Contact IT support for network configuration assistance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Storage Requirements */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <HardDrive className="w-6 h-6 mr-2 text-blue-600" />
                Storage Requirements
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Application Storage</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                      <strong>500MB minimum</strong> for application installation
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                      <strong>1GB recommended</strong> for optimal performance
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                      Additional space needed for scanned documents
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Document Storage Planning</h3>
                  <div className="bg-gray-50 rounded p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Estimated Storage Usage</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium text-gray-700">Document Type</div>
                        <ul className="space-y-1 text-gray-600 mt-1">
                          <li>• Single page letter: ~200KB</li>
                          <li>• 10-page document: ~2MB</li>
                          <li>• Color brochure: ~5-10MB</li>
                          <li>• High-res photo: ~15-20MB</li>
                        </ul>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">Storage Recommendations</div>
                        <ul className="space-y-1 text-gray-600 mt-1">
                          <li>• Light use: 10GB free space</li>
                          <li>• Medium use: 50GB free space</li>
                          <li>• Heavy use: 200GB+ free space</li>
                          <li>• Archive storage: External drive</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Security Requirements */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-blue-600" />
                Security Requirements
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">User Permissions</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                      <strong>Administrator privileges required</strong> for installation
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                      Standard user account sufficient for daily operation
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                      Network access permissions for printer communication
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Firewall Configuration</h3>
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded p-3">
                      <h4 className="font-medium text-green-800">Windows Firewall</h4>
                      <p className="text-green-700 text-sm mt-1">
                        Automatic configuration during installation. Manual setup available if needed.
                      </p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded p-3">
                      <h4 className="font-medium text-blue-800">macOS Firewall</h4>
                      <p className="text-blue-700 text-sm mt-1">
                        User prompt for network access permissions on first launch.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded p-4">
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 text-orange-400 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-800">Antivirus Considerations</h4>
                      <p className="text-orange-700 text-sm mt-1">
                        Some antivirus software may interfere with network scanning. Add SCO SMB to exclusions if needed.
                        Common paths to exclude:
                      </p>
                      <ul className="text-orange-700 text-sm mt-2 space-y-1">
                        <li>• Windows: <code>C:\Program Files\SCO SMB\</code></li>
                        <li>• macOS: <code>/Applications/SCO SMB.app</code></li>
                        <li>• Scan folders and temporary directories</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Installation Guides</h3>
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
                  <Link href="/docs/installation/initial-setup" className="text-blue-600 hover:text-blue-800 block">
                    Initial Setup →
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Compatibility Check</h3>
              <div className="space-y-3">
                <div className="p-3 border border-gray-200 rounded">
                  <h4 className="font-medium text-gray-800 mb-1">Check Windows Version</h4>
                  <p className="text-sm text-gray-600">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Win + R</kbd>, type <code>winver</code></p>
                </div>
                <div className="p-3 border border-gray-200 rounded">
                  <h4 className="font-medium text-gray-800 mb-1">Check macOS Version</h4>
                  <p className="text-sm text-gray-600">Apple menu → About This Mac</p>
                </div>
                <div className="p-3 border border-gray-200 rounded">
                  <h4 className="font-medium text-gray-800 mb-1">Check Available RAM</h4>
                  <p className="text-sm text-gray-600">Task Manager (Win) or Activity Monitor (Mac)</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
              <p className="text-gray-600 text-sm mb-4">
                Questions about system compatibility? Our support team can help verify your setup.
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