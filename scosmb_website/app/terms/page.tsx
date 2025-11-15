export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[#153B6B] mb-8">Terms of Service</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 prose prose-blue max-w-none">
          <p className="text-gray-600 mb-6">Last updated: November 15, 2025</p>
          
          <h2 className="text-2xl font-semibold text-[#153B6B] mt-8 mb-4">Agreement to Terms</h2>
          <p>
            By downloading and using SCO SMB software, you agree to be bound by these Terms of Service.
          </p>
          
          <h2 className="text-2xl font-semibold text-[#153B6B] mt-8 mb-4">License</h2>
          <p>
            SCO SMB is proprietary software owned by South Coast Office Supply. Your license key grants you the right to use the software on your designated devices.
          </p>
          
          <h2 className="text-2xl font-semibold text-[#153B6B] mt-8 mb-4">Restrictions</h2>
          <ul>
            <li>You may not distribute license keys to unauthorized users</li>
            <li>You may not reverse engineer or decompile the software</li>
            <li>You may not use the software for illegal purposes</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-[#153B6B] mt-8 mb-4">Support</h2>
          <p>
            We provide technical support via email and phone during business hours (Mon-Fri, 8 AM - 4 PM PST).
          </p>
          
          <h2 className="text-2xl font-semibold text-[#153B6B] mt-8 mb-4">Warranty Disclaimer</h2>
          <p>
            SCO SMB is provided &quot;as is&quot; without warranty of any kind. We do not guarantee uninterrupted or error-free operation.
          </p>
          
          <h2 className="text-2xl font-semibold text-[#153B6B] mt-8 mb-4">Limitation of Liability</h2>
          <p>
            South Coast Office Supply shall not be liable for any indirect, incidental, or consequential damages arising from use of the software.
          </p>
          
          <h2 className="text-2xl font-semibold text-[#153B6B] mt-8 mb-4">Contact</h2>
          <p>
            Questions about these terms? Contact us:<br />
            Email: support@southcoastoffice.com<br />
            Phone: (541) 267-5114<br />
            Address: 199 N Broadway, Coos Bay, OR 97420
          </p>
        </div>
      </div>
    </div>
  );
}
