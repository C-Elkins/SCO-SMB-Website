'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Phone, MessageCircle, Book, FileQuestion, Users } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-linear-to-br from-[#153B6B] to-[#00A8B5] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Support & Help Center
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
              We&apos;re here to help you get the most out of SCO SMB
            </p>
          </motion.div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#00A8B5] rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#153B6B] mb-2">
                Phone Support
              </h3>
              <p className="text-gray-600 mb-4">
                Speak directly with our support team
              </p>
              <a
                href="tel:+15412675114"
                className="text-[#00A8B5] font-semibold hover:underline text-lg"
              >
                (541) 267-5114
              </a>
              <p className="text-sm text-gray-500 mt-2">
                Mon-Fri, 8 AM - 4 PM PST
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#00A8B5] rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#153B6B] mb-2">
                Email Support
              </h3>
              <p className="text-gray-600 mb-4">
                Get detailed help via email
              </p>
              <a
                href="mailto:support@southcoastoffice.com"
                className="text-[#00A8B5] font-semibold hover:underline break-all"
              >
                support@southcoastoffice.com
              </a>
              <p className="text-sm text-gray-500 mt-2">
                Response within 24 hours
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#00A8B5] rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#153B6B] mb-2">
                Contact Form
              </h3>
              <p className="text-gray-600 mb-4">
                Submit a detailed support request
              </p>
              <Link
                href="/contact"
                className="inline-block text-[#00A8B5] font-semibold hover:underline"
              >
                Send Message
              </Link>
              <p className="text-sm text-gray-500 mt-2">
                Detailed inquiries welcome
              </p>
            </motion.div>
          </div>

          {/* Self-Help Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-[#153B6B] mb-8 text-center">
              Self-Help Resources
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Link href="/docs" className="group">
                <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <Book className="w-12 h-12 text-[#00A8B5] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-semibold text-[#153B6B] mb-2">
                    Documentation
                  </h3>
                  <p className="text-gray-600">
                    Complete guides for setup, configuration, and troubleshooting. Step-by-step instructions for Kyocera and Sharp printers.
                  </p>
                </div>
              </Link>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <FileQuestion className="w-12 h-12 text-[#00A8B5] mb-4" />
                <h3 className="text-2xl font-semibold text-[#153B6B] mb-2">
                  FAQ
                </h3>
                <p className="text-gray-600 mb-4">
                  Quick answers to common questions about SCO SMB functionality, network setup, and printer configuration.
                </p>
                <Link href="/docs#faq" className="text-[#00A8B5] font-semibold hover:underline">
                  View FAQs →
                </Link>
              </div>

              <a 
                href="https://github.com/C-Elkins/SCO-SMB"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <svg className="w-12 h-12 text-[#00A8B5] mb-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-2xl font-semibold text-[#153B6B] mb-2">
                    GitHub Repository
                  </h3>
                  <p className="text-gray-600">
                    View source code, report issues, and contribute to the project. Open source and community-driven.
                  </p>
                </div>
              </a>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <Users className="w-12 h-12 text-[#00A8B5] mb-4" />
                <h3 className="text-2xl font-semibold text-[#153B6B] mb-2">
                  Technician Portal
                </h3>
                <p className="text-gray-600 mb-4">
                  Authorized technicians can access advanced documentation and unrestricted downloads.
                </p>
                <Link href="/portal" className="text-[#00A8B5] font-semibold hover:underline">
                  Access Portal →
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Support Expectations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">
              What to Expect
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-[#153B6B] mb-3">Response Times</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00A8B5] mt-1">•</span>
                    <span><strong>Phone:</strong> Immediate during business hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00A8B5] mt-1">•</span>
                    <span><strong>Email:</strong> Within 24 hours on weekdays</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00A8B5] mt-1">•</span>
                    <span><strong>Contact Form:</strong> Within 24-48 hours</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-[#153B6B] mb-3">Support Coverage</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00A8B5] mt-1">•</span>
                    <span>Installation and setup assistance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00A8B5] mt-1">•</span>
                    <span>Printer configuration guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00A8B5] mt-1">•</span>
                    <span>Network troubleshooting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00A8B5] mt-1">•</span>
                    <span>Feature usage help</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00A8B5] mt-1">•</span>
                    <span>Bug reporting and fixes</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
