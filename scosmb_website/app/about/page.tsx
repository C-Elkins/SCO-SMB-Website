'use client';

import { motion } from 'framer-motion';
import { Building2, Users, Target, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative bg-linear-to-br from-[#153B6B] via-[#1e4a7f] to-[#00A8B5] text-white pt-32 pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 left-10 w-60 h-60 bg-[#00A8B5]/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
          <div style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.04\"%3E%3Cpath d=\"M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} className="absolute inset-0 opacity-30" />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [-15, 15, -15], rotate: [0, 90, 180] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-32 right-20 w-5 h-5 border-2 border-white/25 rotate-45"
          />
          <motion.div
            animate={{ y: [25, -25, 25], x: [-10, 10, -10] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-40 right-32 w-3 h-3 bg-white/15 rounded-full"
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-8 shadow-2xl"
            >
              <Building2 className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight"
            >
              About <span className="text-[#00A8B5]">South Coast Office</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Serving the Oregon coast with professional office solutions since
              <span className="text-[#00A8B5] font-semibold"> 1973</span>
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                50+ Years Experience
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                Local Oregon Business
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-10 md:py-14">
        <div className="container-custom">
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
                  <a href="https://southcoastoffice.com" target="_blank" rel="noopener noreferrer" className="text-[#00A8B5] hover:underline font-semibold">South Coast Office Supply</a> has been the trusted partner for businesses along the Oregon coast for over 50 years. We specialize in providing comprehensive office solutions, from supplies to cutting-edge technology.
                </p>
                <p>
                  Our commitment to innovation led us to develop SCO SMB, a professional scanning solution designed specifically for modern offices using Kyocera and Sharp network printers. We saw the need for enterprise-grade document management that actually works in real-world office environments.
                </p>
                <p>
                  Today, we continue to serve businesses throughout Coos Bay and the surrounding areas with personalized service and innovative solutions that make office work more efficient and productive. Visit <a href="https://southcoastoffice.com" target="_blank" rel="noopener noreferrer" className="text-[#00A8B5] hover:underline font-semibold">southcoastoffice.com</a> to learn more about our full range of office products and services.
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
      <section className="py-10 md:py-14 bg-white">
        <div className="container-custom">
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
