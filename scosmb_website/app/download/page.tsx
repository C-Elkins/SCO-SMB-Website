'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Check, X, Loader2, ChevronDown, ChevronUp, Calendar, Package } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface GitHubAsset {
  name: string;
  browser_download_url: string;
  size: number;
  download_count: number;
}

interface GitHubRelease {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  assets: GitHubAsset[];
}

export default function DownloadPage() {
  const [licenseKey, setLicenseKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [error, setError] = useState('');
  const [downloadsRemaining, setDownloadsRemaining] = useState(0);
  const [release, setRelease] = useState<GitHubRelease | null>(null);
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

  const validateLicenseKey = async () => {
    setIsValidating(true);
    setError('');

    try {
      const response = await fetch('/api/validate-license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          licenseKey, 
          platform: 'web',
          version: release?.tag_name || 'latest'
        }),
      });

      const data = await response.json();

      if (data.valid) {
        setIsValidated(true);
        setDownloadsRemaining(data.downloadsRemaining);
      } else {
        setError(data.error || 'Invalid license key');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, '');
    
    if (value.length > 0 && !value.startsWith('SCO-')) {
      value = 'SCO-' + value.replace(/^SCO-/, '');
    }
    
    if (value.length <= 19) {
      setLicenseKey(value);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getAssetsByPlatform = () => {
    if (!release) return { macSilicon: null, macIntel: null, windows: null };

    return {
      macSilicon: release.assets.find(a => /arm64\.(pkg|dmg)$/i.test(a.name)),
      macIntel: release.assets.find(a => /x64\.(pkg|dmg)$/i.test(a.name)),
      windows: release.assets.find(a => /\.exe$/i.test(a.name)),
    };
  };

  const assets = getAssetsByPlatform();

  return (
    <div className="min-h-screen bg-gray-50 py-24 md:py-32">
      <div className="w-full mx-auto px-8 lg:px-16 xl:px-24" style={{ maxWidth: '1400px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#153B6B] mb-6 text-center">
            Download SCO SMB
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 text-center mb-16">
            {isLoadingRelease ? 'Loading latest release...' : `Version ${release?.tag_name || 'N/A'} • ${release ? formatDate(release.published_at) : ''}`}
          </p>

          {!isValidated ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-lg p-8 md:p-10 mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-[#153B6B] mb-4">
                Enter Your License Key
              </h2>
              <p className="text-gray-600 mb-8">
                You need a valid license key to download SCO SMB. Don&apos;t have one?{' '}
                <a href="/contact?subject=license" className="text-[#00A8B5] hover:underline font-medium transition-colors">
                  Request a key
                </a>
              </p>

              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="SCO-XXXX-XXXX-XXXX"
                    value={licenseKey}
                    onChange={handleKeyChange}
                    onKeyPress={(e) => e.key === 'Enter' && validateLicenseKey()}
                    className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent text-lg font-mono transition-all"
                    maxLength={19}
                    disabled={isValidating}
                  />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-lg border border-red-200"
                    >
                      <X className="w-5 h-5 shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={validateLicenseKey}
                  disabled={isValidating || licenseKey.length < 19}
                  className="w-full bg-[#00A8B5] text-white font-semibold py-4 px-8 rounded-lg hover:bg-[#008c97] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3 text-lg shadow-md hover:shadow-lg"
                >
                  {isValidating ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Validating...
                    </>
                  ) : (
                    <>
                      <Check className="w-6 h-6" />
                      Validate License Key
                    </>
                  )}
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-500">
                  Are you a technician?{' '}
                  <a href="/portal" className="text-[#00A8B5] hover:underline font-medium transition-colors">
                    Access the Technician Portal
                  </a>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-lg p-8 md:p-10 mb-8"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-8 text-green-600 bg-green-50 p-4 rounded-lg border border-green-200"
              >
                <Check className="w-6 h-6 shrink-0" />
                <div>
                  <p className="font-semibold text-lg">License key validated!</p>
                  <p className="text-sm">You have {downloadsRemaining} download{downloadsRemaining !== 1 ? 's' : ''} remaining.</p>
                </div>
              </motion.div>

              <h2 className="text-2xl md:text-3xl font-semibold text-[#153B6B] mb-6">
                Choose Your Platform
              </h2>

              <div className="space-y-4">
                {assets.macSilicon && (
                  <motion.a
                    href={assets.macSilicon.browser_download_url}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.02 }}
                    className="block border-2 border-gray-200 rounded-lg p-6 hover:border-[#00A8B5] hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-[#153B6B] mb-2 group-hover:text-[#00A8B5] transition-colors">
                          🍎 macOS (Apple Silicon)
                        </h3>
                        <p className="text-gray-600 mb-2">
                          For Mac computers with M1, M2, M3, or M4 chips
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatFileSize(assets.macSilicon.size)} • {assets.macSilicon.name}
                        </p>
                      </div>
                      <Download className="w-8 h-8 text-[#00A8B5] shrink-0" />
                    </div>
                  </motion.a>
                )}

                {assets.macIntel && (
                  <motion.a
                    href={assets.macIntel.browser_download_url}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="block border-2 border-gray-200 rounded-lg p-6 hover:border-[#00A8B5] hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-[#153B6B] mb-2 group-hover:text-[#00A8B5] transition-colors">
                          🍎 macOS (Intel)
                        </h3>
                        <p className="text-gray-600 mb-2">
                          For Mac computers with Intel processors
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatFileSize(assets.macIntel.size)} • {assets.macIntel.name}
                        </p>
                      </div>
                      <Download className="w-8 h-8 text-[#00A8B5] shrink-0" />
                    </div>
                  </motion.a>
                )}

                {assets.windows && (
                  <motion.a
                    href={assets.windows.browser_download_url}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    className="block border-2 border-gray-200 rounded-lg p-6 hover:border-[#00A8B5] hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-[#153B6B] mb-2 group-hover:text-[#00A8B5] transition-colors">
                          🪟 Windows
                        </h3>
                        <p className="text-gray-600 mb-2">
                          For Windows 10 and Windows 11
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatFileSize(assets.windows.size)} • {assets.windows.name}
                        </p>
                      </div>
                      <Download className="w-8 h-8 text-[#00A8B5] shrink-0" />
                    </div>
                  </motion.a>
                )}
              </div>

              {release && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <button
                    onClick={() => setShowReleaseNotes(!showReleaseNotes)}
                    className="flex items-center justify-between w-full text-left group"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-[#153B6B] group-hover:text-[#00A8B5] transition-colors">
                        Version {release.tag_name} Release Notes
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Released on {formatDate(release.published_at)}
                      </p>
                    </div>
                    {showReleaseNotes ? (
                      <ChevronUp className="w-6 h-6 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </button>

                  <AnimatePresence>
                    {showReleaseNotes && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 prose prose-sm max-w-none"
                      >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {release.body}
                        </ReactMarkdown>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          )}

          {/* System Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-semibold text-[#153B6B] mb-6 flex items-center gap-2">
              <Package className="w-6 h-6" />
              System Requirements
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-[#153B6B] mb-3 text-lg">macOS</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>macOS 10.13 (High Sierra) or later</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>100 MB free disk space</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>Network access to printers</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#153B6B] mb-3 text-lg">Windows</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>Windows 10 or Windows 11</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>100 MB free disk space</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>Network access to printers</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
