"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, ChevronUp, Package, Download, Shield, Clock, Users, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LicenseKeyForm } from '@/components/LicenseKeyForm';
import { DownloadSection } from '@/components/DownloadSection';
import type { Release as LatestRelease } from '@/components/DownloadSection';

export default function DownloadPage() {
  const [isValidated, setIsValidated] = useState(false);
  const [downloadsRemaining, setDownloadsRemaining] = useState<number | null>(null);
  const [release, setRelease] = useState<LatestRelease | null>(null);
  const [isLoadingRelease, setIsLoadingRelease] = useState(true);
  const [showReleaseNotes, setShowReleaseNotes] = useState(false);

  useEffect(() => {
    fetchLatestRelease();
  }, []);

  const fetchLatestRelease = async () => {
    setIsLoadingRelease(true);
    try {
      const response = await fetch('/api/releases/latest');
      if (response.ok) {
        const data = await response.json();
        setRelease(data);
      }
    } catch (error) {
      console.error('Error fetching release:', error);
    } finally {
      setIsLoadingRelease(false);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const remainingMessage = downloadsRemaining === null
    ? 'Unlimited downloads remaining.'
    : `You have ${downloadsRemaining} download${downloadsRemaining !== 1 ? 's' : ''} remaining.`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-[#153B6B] via-[#1e4a7f] to-[#00A8B5] text-white pt-32 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            {/* Status Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Secure Download Portal
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                License Validated Downloads
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Latest Version Available
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight">
              Download <span className="text-[#00A8B5]">SCO SMB</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              {isLoadingRelease 
                ? 'Loading latest release information...' 
                : `Get the latest version ${release?.tag_name || 'N/A'} • Released ${release ? formatDate(release.published_at) : ''}`}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">Secure</div>
                <div className="text-white/70 text-sm">License Protected</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <Download className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">Fast</div>
                <div className="text-white/70 text-sm">Direct Download</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">Updated</div>
                <div className="text-white/70 text-sm">Latest Release</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-wide section max-w-6xl py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >

          {!isValidated ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* License Key Form */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-linear-to-br from-[#153B6B] to-[#00A8B5] rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#153B6B]">
                        License Validation
                      </h2>
                      <p className="text-gray-500">Secure access to your software</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-blue-900 mb-1">Secure License System</p>
                        <p className="text-blue-700 text-sm">
                          Your license key validates your purchase and ensures you receive authentic software updates.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <LicenseKeyForm
                      endpoint="/api/validate-license"
                      placeholder="SCO-XXXX-XXXX-XXXX"
                      submitLabel="Validate License Key"
                      buildPayload={(key) => ({
                        licenseKey: key,
                        platform: 'web',
                        version: release?.tag_name || 'latest'
                      })}
                      onValidated={(data) => {
                        setIsValidated(true);
                        if (typeof data.downloadsRemaining === 'number') {
                          setDownloadsRemaining(Math.max(0, data.downloadsRemaining));
                        } else if (typeof data.remaining === 'number') {
                          setDownloadsRemaining(Math.max(0, data.remaining));
                        } else {
                          setDownloadsRemaining(null);
                        }
                      }}
                    />
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                      <div className="text-center sm:text-left">
                        <p className="text-sm text-gray-600 mb-1">
                          Don&apos;t have a license key?
                        </p>
                        <a href="/contact?subject=license" className="text-[#00A8B5] hover:text-[#008991] font-medium transition-colors inline-flex items-center gap-1">
                          Request a License Key
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <div className="text-center sm:text-right">
                        <p className="text-sm text-gray-600 mb-1">
                          Are you a technician?
                        </p>
                        <a href="/portal" className="text-[#00A8B5] hover:text-[#008991] font-medium transition-colors inline-flex items-center gap-1">
                          Technician Portal
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                {/* Release Info */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                >
                  <h3 className="font-bold text-[#153B6B] mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Latest Release
                  </h3>
                  {isLoadingRelease ? (
                    <div className="animate-pulse space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <div className="font-semibold text-gray-900">{release?.tag_name || 'N/A'}</div>
                        <div className="text-sm text-gray-500">{release ? formatDate(release.published_at) : 'Release date unavailable'}</div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {release?.assets?.length || 0} platform{(release?.assets?.length || 0) !== 1 ? 's' : ''} available
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Security Notice */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-linear-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200"
                >
                  <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Secure Downloads
                  </h3>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Authenticated access only</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Download tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Verified software integrity</span>
                    </li>
                  </ul>
                </motion.div>

                {/* Support */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                >
                  <h3 className="font-bold text-[#153B6B] mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Need Help?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Our support team is here to help with license issues or download problems.
                  </p>
                  <a href="/support" className="inline-flex items-center gap-2 text-[#00A8B5] hover:text-[#008991] font-medium text-sm transition-colors">
                    Contact Support
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Success Banner */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-linear-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-xl"
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-4 mb-4"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Check className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-1">License Validated Successfully!</h2>
                    <p className="text-green-100">{remainingMessage}</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Download Options */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Download Section */}
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-linear-to-br from-[#153B6B] to-[#00A8B5] rounded-xl flex items-center justify-center">
                        <Download className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-[#153B6B]">
                          Choose Your Platform
                        </h2>
                        <p className="text-gray-500">
                          Select the version for your operating system
                        </p>
                      </div>
                    </div>

                    <DownloadSection release={release} showNotes={false} />
                  </motion.div>

                  {/* Release Notes */}
                  {release && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mt-6"
                    >
                      <button
                        onClick={() => setShowReleaseNotes((prev) => !prev)}
                        className="flex items-center justify-between w-full text-left group hover:bg-gray-50 p-4 rounded-xl transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-[#153B6B] group-hover:text-white transition-colors">
                            <Package className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-[#153B6B] group-hover:text-[#00A8B5] transition-colors">
                              Version {release.tag_name} Release Notes
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              Released on {formatDate(release.published_at)}
                            </p>
                          </div>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-2 group-hover:bg-[#153B6B] transition-colors">
                          {showReleaseNotes ? (
                            <ChevronUp className="w-5 h-5 text-gray-600 group-hover:text-white" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-600 group-hover:text-white" />
                          )}
                        </div>
                      </button>

                      <AnimatePresence>
                        {showReleaseNotes && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-6 pt-6 border-t border-gray-200"
                          >
                            <div className="bg-gray-50 rounded-xl p-6 prose prose-sm max-w-none">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {release.body}
                              </ReactMarkdown>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </div>

                {/* Download Info Sidebar */}
                <div className="space-y-6">
                  {/* Download Stats */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                  >
                    <h3 className="font-bold text-[#153B6B] mb-4 flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Release Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Version</div>
                        <div className="font-semibold text-gray-900">{release?.tag_name || 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Release Date</div>
                        <div className="font-semibold text-gray-900">{release ? formatDate(release.published_at) : 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Platforms</div>
                        <div className="font-semibold text-gray-900">{release?.assets?.length || 0} available</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Quick Links */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                  >
                    <h3 className="font-bold text-[#153B6B] mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Quick Links
                    </h3>
                    <div className="space-y-3">
                      <a href="/docs" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008991] font-medium text-sm transition-colors p-2 hover:bg-gray-50 rounded-lg">
                        <ExternalLink className="w-4 h-4" />
                        Setup Documentation
                      </a>
                      <a href="/support" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008991] font-medium text-sm transition-colors p-2 hover:bg-gray-50 rounded-lg">
                        <ExternalLink className="w-4 h-4" />
                        Technical Support
                      </a>
                      <a href="/portal" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008991] font-medium text-sm transition-colors p-2 hover:bg-gray-50 rounded-lg">
                        <ExternalLink className="w-4 h-4" />
                        Technician Portal
                      </a>
                    </div>
                  </motion.div>

                  {/* License Info */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-linear-to-br from-blue-50 to-teal-50 rounded-2xl p-6 border border-blue-200"
                  >
                    <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Your License
                    </h3>
                    <div className="space-y-2 text-sm text-blue-700">
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="font-semibold text-green-600">Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Downloads:</span>
                        <span className="font-semibold">{remainingMessage}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          )}

          {/* System Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isValidated ? 0.7 : 0.2 }}
            className="mt-12"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-linear-to-br from-[#153B6B] to-[#00A8B5] rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#153B6B]">
                    System Requirements
                  </h2>
                  <p className="text-gray-500">
                    Ensure your system meets these minimum requirements
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                      {/* Apple Logo SVG */}
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                    </div>
                    <h3 className="font-bold text-[#153B6B] text-lg">macOS</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">macOS 10.13 (High Sierra) or later</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">100 MB free disk space</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">Network access to printers</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#0078D4] rounded-lg flex items-center justify-center">
                      {/* Windows Logo SVG */}
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>
                      </svg>
                    </div>
                    <h3 className="font-bold text-[#153B6B] text-lg">Windows</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">Windows 10 or Windows 11</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">100 MB free disk space</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">Network access to printers</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="bg-linear-to-r from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="font-bold text-[#153B6B] mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Installation Notes
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#00A8B5] rounded-full mt-2 shrink-0"></div>
                      <span>Administrator privileges required for installation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#00A8B5] rounded-full mt-2 shrink-0"></div>
                      <span>Automatic updates available with active license</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#00A8B5] rounded-full mt-2 shrink-0"></div>
                      <span>Compatible with most printer manufacturers</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
