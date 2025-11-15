'use client';

import { motion } from 'framer-motion';
import { Building2, Users, Target, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#153B6B] to-[#00A8B5] text-white py-32 md:py-40">
        <div className="w-full mx-auto px-8 lg:px-16 xl:px-24" style={{ maxWidth: '1600px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About South Coast Office
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
              Serving the Oregon coast with professional office solutions since 1973
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-32 md:py-40">
        <div className="w-full mx-auto px-8 lg:px-16 xl:px-24" style={{ maxWidth: '1600px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#153B6B] mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  South Coast Office Supply has been the trusted partner for businesses along the Oregon coast for over 50 years. We specialize in providing comprehensive office solutions, from supplies to cutting-edge technology.
                </p>
                <p>
                  Our commitment to innovation led us to develop SCO SMB, a professional scanning solution designed specifically for modern offices using Kyocera and Sharp network printers. We saw the need for enterprise-grade document management that actually works in real-world office environments.
                </p>
                <p>
                  Today, we continue to serve businesses throughout Coos Bay and the surrounding areas with personalized service and innovative solutions that make office work more efficient and productive.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-[#153B6B] mb-6">Company Details</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#153B6B] mb-1">Founded</h4>
                  <p className="text-gray-600">1973</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#153B6B] mb-1">Location</h4>
                  <p className="text-gray-600">Coos Bay, Oregon</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#153B6B] mb-1">Specialization</h4>
                  <p className="text-gray-600">Office supplies, technology solutions, document management</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#153B6B] mb-1">Service Area</h4>
                  <p className="text-gray-600">Oregon Coast and surrounding regions</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg text-center"
            >
              <Building2 className="w-12 h-12 text-[#00A8B5] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#153B6B] mb-2">
                Local Expertise
              </h3>
              <p className="text-gray-600">
                Deep understanding of local business needs and challenges
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-lg shadow-lg text-center"
            >
              <Users className="w-12 h-12 text-[#00A8B5] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#153B6B] mb-2">
                Customer First
              </h3>
              <p className="text-gray-600">
                Personalized service and support for every client
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-lg text-center"
            >
              <Target className="w-12 h-12 text-[#00A8B5] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#153B6B] mb-2">
                Innovation
              </h3>
              <p className="text-gray-600">
                Developing modern solutions for traditional office challenges
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-lg shadow-lg text-center"
            >
              <Award className="w-12 h-12 text-[#00A8B5] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#153B6B] mb-2">
                Quality
              </h3>
              <p className="text-gray-600">
                Enterprise-grade products and services you can trust
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-32 md:py-40 bg-white">
        <div className="w-full mx-auto px-8 lg:px-16 xl:px-24" style={{ maxWidth: '1600px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#153B6B] mb-4">
              Visit Our Office
            </h2>
            <p className="text-xl text-gray-600">
              Stop by and see us in beautiful Coos Bay, Oregon
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="bg-gray-100 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-[#153B6B] mb-6">Office Information</h3>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h4 className="font-semibold text-[#153B6B] mb-1">Address</h4>
                  <p>
                    South Coast Office Supply<br />
                    199 N Broadway<br />
                    Coos Bay, OR 97420
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#153B6B] mb-1">Phone</h4>
                  <p>
                    <a href="tel:+15412675114" className="text-[#00A8B5] hover:underline">
                      (541) 267-5114
                    </a>
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#153B6B] mb-1">Email</h4>
                  <p>
                    <a href="mailto:support@southcoastoffice.com" className="text-[#00A8B5] hover:underline">
                      support@southcoastoffice.com
                    </a>
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#153B6B] mb-1">Hours</h4>
                  <p>
                    Monday - Friday: 8:00 AM - 4:00 PM PST<br />
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg overflow-hidden h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2919.4!2d-124.2178!3d43.3665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54c38f7c1c1c1c1c%3A0x1c1c1c1c1c1c1c1c!2s199%20N%20Broadway%2C%20Coos%20Bay%2C%20OR%2097420!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
