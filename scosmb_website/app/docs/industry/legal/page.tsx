import { Metadata } from 'next'
import Link from 'next/link'
import { Scale, Shield, FileText } from 'lucide-react'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = {
  title: 'Legal Industry Guide - SCO SMB Documentation',
  description: 'Document management solutions for law firms with client confidentiality, litigation support, and regulatory compliance features.',
}

export default function LegalIndustryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <PageHeader
        title="<span class='text-[#00A8B5]'>Legal</span> Industry Solutions"
        subtitle="Document management solutions for law firms with client confidentiality, litigation support, and regulatory compliance features."
        icon="Scale"
        backLink={{
          href: "/docs",
          label: "Back to Documentation"
        }}
      />

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
        <div className="max-w-4xl mx-auto">
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <Shield className="w-8 h-8 mr-3 text-blue-600" />
              Legal Document Management
            </h2>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-600 mb-6">
                SCO SMB provides specialized document management solutions for legal practices, ensuring client confidentiality, 
                litigation support, and regulatory compliance.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Features for Legal Practices:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Client-attorney privilege protection</li>
                <li>Document version control and audit trails</li>
                <li>Secure client communication</li>
                <li>Litigation document organization</li>
                <li>Regulatory compliance tracking</li>
              </ul>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">Coming Soon</h4>
                <p className="text-blue-700">
                  Detailed implementation guides and best practices for legal document management are being developed.
                </p>
              </div>
            </div>
          </section>
        </div>
        </div>
      </section>
    </div>
  )
}