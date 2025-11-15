import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2E2E2E] text-[#E9ECEF] pt-16 pb-8 w-full">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Company Info */}
          <div>
            <Image
              src="/logos/sco-smb-logo-primary.svg"
              alt="SCO SMB"
              width={120}
              height={30}
              className="mb-4 brightness-0 invert"
            />
            <p className="text-sm leading-relaxed">
              Enterprise scanning solution for modern offices. Professional document management for Kyocera and Sharp network printers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#00A8B5] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-[#00A8B5] transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/download" className="hover:text-[#00A8B5] transition-colors">
                  Download
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-[#00A8B5] transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs" className="hover:text-[#00A8B5] transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-[#00A8B5] transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/portal" className="hover:text-[#00A8B5] transition-colors">
                  Technician Portal
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/C-Elkins/SCO-SMB" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#00A8B5] transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:support@southcoastoffice.com" className="hover:text-[#00A8B5] transition-colors">
                  support@southcoastoffice.com
                </a>
              </li>
              <li>
                <a href="tel:+15412675114" className="hover:text-[#00A8B5] transition-colors">
                  (541) 267-5114
                </a>
              </li>
              <li className="text-sm">
                199 N Broadway<br />
                Coos Bay, OR 97420
              </li>
              <li className="text-sm text-gray-400">
                Mon-Fri, 8 AM - 4 PM PST
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© {currentYear} South Coast Office Supply. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-[#00A8B5] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[#00A8B5] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
