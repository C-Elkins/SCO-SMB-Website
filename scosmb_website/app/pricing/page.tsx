'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Check, Building, Users, Shield, Phone, Mail, 
  Calendar, ArrowRight, Star, Award, Target
} from 'lucide-react';
import { PricingCardSkeleton } from '@/components/LoadingSkeletons';

export default function PricingPage() {
  const router = useRouter();

  const industries = [
    {
      name: "Healthcare",
      icon: Shield,
      description: "Secure document scanning solution designed for healthcare environments",
      features: ["Enhanced security", "Encrypted transmission", "Patient data handling", "Audit logging"]
    },
    {
      name: "Legal",
      icon: Award,
      description: "Professional document handling for law firms and legal professionals",
      features: ["Client confidentiality", "Case file organization", "Evidence handling", "Document retention"]
    },
    {
      name: "Financial",
      icon: Target,
      description: "Secure document processing for financial institutions and accounting firms",
      features: ["Enhanced security", "Financial data protection", "Transaction records", "Secure transmission"]
    },
    {
      name: "Education", 
      icon: Users,
      description: "Document management solution for schools and educational institutions",
      features: ["Student privacy focus", "Administrative records", "Multi-location support", "Secure processing"]
    }
  ];

  const handleContactSubmit = async (planType: string) => {
    // Track pricing inquiry - simplified for ESLint
    try {
      // Analytics tracking can go here
    } catch (error) {
      console.log('Analytics tracking error:', error);
    }
    
    // Use Next.js router for SPA navigation
    const subject = encodeURIComponent(`Pricing Inquiry - ${planType.charAt(0).toUpperCase() + planType.slice(1)} Plan`);
    const message = encodeURIComponent(`I'm interested in learning more about the ${planType} plan for my organization.`);
    await router.push(`/contact?subject=${subject}&message=${message}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#153B6B] via-[#1e4a7f] to-[#00A8B5] text-white pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 left-10 w-60 h-60 bg-[#00A8B5]/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
          <div style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.03\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} className="absolute inset-0 opacity-40" />
        </div>

        <div className="container-wide relative z-10">
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
              <Building className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight"
            >
              Enterprise <span className="text-[#00A8B5]">Pricing</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Tailored solutions for your organization&apos;s document scanning needs. Volume discounts and custom configurations available.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Custom Pricing
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                Volume Discounts
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                Industry Solutions
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Simple Pricing Message */}
      <section className="py-20">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#153B6B] mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We offer a flat-rate licensing model that scales with your organization. No hidden fees, no complicated tiers - just straightforward pricing based on your needs.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl border border-gray-200 p-12 text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#153B6B] to-[#00A8B5] rounded-full flex items-center justify-center mx-auto mb-8">
                <Building className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-[#153B6B] mb-4">
                Custom Pricing for Your Organization
              </h3>
              
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Our pricing is based on your specific requirements, number of users, and deployment needs. Get a personalized quote that fits your budget and scale.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-[#153B6B] mb-2">Flat Rate Licensing</h4>
                  <p className="text-sm text-gray-600">No per-user fees or hidden costs</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-[#153B6B] mb-2">Scalable Solution</h4>
                  <p className="text-sm text-gray-600">Grows with your organization</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-[#153B6B] mb-2">Full Support</h4>
                  <p className="text-sm text-gray-600">Includes setup and ongoing support</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleContactSubmit('pricing-inquiry')}
                  className="bg-linear-to-r from-[#00A8B5] to-[#008c97] text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 press-scale"
                >
                  Get Your Quote
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => window.location.href = '/trial'}
                  className="bg-white text-[#153B6B] px-10 py-4 rounded-full font-bold border-2 border-[#153B6B] hover:bg-[#153B6B] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl press-scale"
                >
                  Start Free Trial
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-20 bg-white">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#153B6B] mb-4">
              Industry-Focused Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized configurations and security features tailored for different industry needs and requirements.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#153B6B] to-[#00A8B5] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <industry.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#153B6B]">
                    {industry.name}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {industry.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  {industry.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#00A8B5] rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleContactSubmit(industry.name.toLowerCase())}
                  className="w-full text-center text-[#00A8B5] font-semibold text-sm hover:text-[#008c97] transition-colors"
                >
                  Learn More →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-[#153B6B] mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Contact our sales team for a personalized quote and demonstration of SCO SMB in your environment.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#00A8B5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#153B6B] mb-2">Schedule a Call</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Speak directly with our sales team about your requirements
                </p>
                <button
                  onClick={() => handleContactSubmit('phone-consultation')}
                  className="text-[#00A8B5] font-semibold hover:text-[#008c97] transition-colors"
                >
                  Book Consultation
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#153B6B] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#153B6B] mb-2">Email Quote</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get a detailed written proposal for your organization
                </p>
                <button
                  onClick={() => handleContactSubmit('email-quote')}
                  className="text-[#00A8B5] font-semibold hover:text-[#008c97] transition-colors"
                >
                  Request Quote
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#153B6B] to-[#00A8B5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#153B6B] mb-2">Live Demo</h3>
                <p className="text-gray-600 text-sm mb-4">
                  See SCO SMB in action with a personalized demonstration
                </p>
                <button
                  onClick={() => handleContactSubmit('live-demo')}
                  className="text-[#00A8B5] font-semibold hover:text-[#008c97] transition-colors"
                >
                  Schedule Demo
                </button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <button
                onClick={() => handleContactSubmit('general-inquiry')}
                className="inline-flex items-center gap-2 bg-linear-to-r from-[#00A8B5] to-[#008c97] text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl press-scale"
              >
                Contact Sales Team
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#00A8B5]" />
                <span className="text-sm font-medium">Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#00A8B5]" />
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#00A8B5]" />
                <span className="text-sm font-medium">99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#00A8B5]" />
                <span className="text-sm font-medium">Industry Compliant</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}