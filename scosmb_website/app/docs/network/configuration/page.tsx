import { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = {
  title: 'Network Configuration - SCO SMB Documentation',
  description: 'Complete network setup and configuration guide for SCO SMB deployment.',
}

export default function NetworkConfigurationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Network <span class='text-[#00A8B5]'>Configuration</span>"
        subtitle="Complete network setup and configuration guide for SCO SMB deployment."
        icon="Network"
        backLink={{
          href: "/docs",
          label: "Back to Documentation"
        }}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Network Configuration Guide</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-600 mb-6">
                This guide covers the essential network configuration steps for SCO SMB.
              </p>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">Documentation In Progress</h4>
                <p className="text-blue-700">
                  Detailed network configuration instructions are being developed.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}