export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <h1 className="text-4xl font-bold text-[#153B6B] mb-8">Privacy Policy</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 prose prose-blue max-w-none">
          <p className="text-gray-600 mb-6">Last updated: November 15, 2025</p>
          
          <h2 className="text-2xl font-semibold text-[#153B6B] mt-8 mb-4">Introduction</h2>
          <p>
            South Coast Office Supply (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use SCO SMB software.
          </p>
          
          <h2 className="text-2xl font-semibold text-[#153B6B] mt-8 mb-4">Information We Collect</h2>
          <ul>
            <li>Contact information (name, email) when you request a license key</li>
            <li>Download information (platform, version) for analytics</li>
            <li>License key usage data</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-[#153B6B] mt-8 mb-4">How We Use Your Information</h2>
          <ul>
            <li>To provide and maintain SCO SMB software</li>
            <li>To manage license keys and downloads</li>
            <li>To provide customer support</li>
            <li>To improve our products and services</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-[#153B6B] mt-8 mb-4">Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information. All data is encrypted in transit and at rest.
          </p>
          
          <h2 className="text-2xl font-semibold text-[#153B6B] mt-8 mb-4">Contact Us</h2>
          <p>
            For privacy-related questions, contact us at:<br />
            Email: support@southcoastoffice.com<br />
            Phone: (541) 267-5114
          </p>
        </div>
      </div>
    </div>
  );
}
