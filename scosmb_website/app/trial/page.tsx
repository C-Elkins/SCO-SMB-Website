'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, CheckCircle, Clock, Shield, Users, 
  ArrowRight, Star, Award, Target, Building
} from 'lucide-react';

export default function TrialPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    employees: '',
    useCase: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const trialFeatures = [
    {
      icon: Download,
      title: "Full Feature Access",
      description: "Complete access to all enterprise features for 30 days"
    },
    {
      icon: Shield,
      title: "No Credit Card Required",
      description: "Start your trial instantly without any payment information"
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Get help from our technical team during your trial period"
    },
    {
      icon: Clock,
      title: "30-Day Trial",
      description: "Full month to evaluate SCO SMB in your environment"
    }
  ];

  const includedFeatures = [
    "Network scanner auto-discovery",
    "Automatic file organization",
    "Multi-protocol support (FTP/SMB/WebDAV)",
    "Cross-platform compatibility",
    "Advanced security features",
    "Audit logging and reporting",
    "Custom naming patterns",
    "Multi-user environments",
    "Technical support during trial"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/trial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        // Track trial request for analytics
        console.log('Free trial requested successfully:', formData);
      } else {
        console.error('Trial submission error:', result.error);
        alert('There was an error submitting your trial request. Please try again or contact support.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('There was a network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
        <div className="max-w-2xl mx-auto text-center px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-[#153B6B] mb-4"
          >
            Trial Request Submitted!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 mb-8"
          >
            Thank you for your interest in SCO SMB! Our team will contact you within 24 hours with your trial download link and setup instructions.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg p-6 shadow-lg mb-8"
          >
            <h3 className="text-lg font-semibold text-[#153B6B] mb-4">What happens next?</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#00A8B5] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <p className="text-gray-700">You&apos;ll receive an email with download links and installation instructions</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#00A8B5] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <p className="text-gray-700">Our technical team will schedule a setup call to ensure smooth installation</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#00A8B5] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <p className="text-gray-700">You&apos;ll have 30 days of full access with dedicated support</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => window.location.href = '/docs'}
              className="px-6 py-3 bg-white text-[#153B6B] border border-[#153B6B] rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Browse Documentation
            </button>
            <button
              onClick={() => window.location.href = '/contact'}
              className="px-6 py-3 bg-[#00A8B5] text-white rounded-lg font-semibold hover:bg-[#008c97] transition-colors"
            >
              Contact Support
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-8 shadow-2xl"
              >
                <Star className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight"
              >
                Start Your <span className="text-[#00A8B5]">Free Trial</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed font-light"
              >
                Experience the full power of SCO SMB enterprise document scanner software with a risk-free 30-day trial.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-2 gap-4"
              >
                {trialFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{feature.title}</p>
                      <p className="text-white/70 text-xs">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-[#153B6B] mb-6 text-center">
                Get Started Today
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent transition-colors"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent transition-colors"
                    placeholder="john.smith@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent transition-colors"
                    placeholder="Your Company Inc."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="employees" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Size
                    </label>
                    <select
                      id="employees"
                      name="employees"
                      value={formData.employees}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent transition-colors"
                    >
                      <option value="">Select size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-1000">201-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="useCase" className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Use Case
                  </label>
                  <textarea
                    id="useCase"
                    name="useCase"
                    rows={3}
                    value={formData.useCase}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us about your document scanning needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#00A8B5] text-white py-4 px-6 rounded-lg font-semibold hover:bg-[#008c97] transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Start Free Trial
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By submitting this form, you agree to our terms of service and privacy policy. No credit card required.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What&apos;s Included */}
      <section className="py-20 bg-white">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#153B6B] mb-4">
              What&apos;s Included in Your Trial
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get full access to all enterprise features with no limitations during your 30-day trial period.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {includedFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-gray-50">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#153B6B] mb-4">
              Trusted by Businesses Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              Join hundreds of organizations that have streamlined their document processes with SCO SMB.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#00A8B5] rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#153B6B] mb-2">500+</h3>
              <p className="text-gray-600">Enterprise Customers</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#153B6B] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#153B6B] mb-2">99.9%</h3>
              <p className="text-gray-600">Customer Satisfaction</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#153B6B] to-[#00A8B5] rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#153B6B] mb-2">85%</h3>
              <p className="text-gray-600">Convert to Full License</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#153B6B] text-white">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Your Document Workflow?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Don&apos;t let manual document processing slow down your business. Start your free trial today.
            </p>
            <button
              onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-[#00A8B5] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#008c97] transition-colors shadow-lg hover:shadow-xl"
            >
              Start Your Free Trial
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}