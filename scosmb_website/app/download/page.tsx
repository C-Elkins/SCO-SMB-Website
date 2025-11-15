'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Check, X, Loader2 } from 'lucide-react';
import { formatBytes, formatDate, detectPlatform } from '@/lib/utils';

interface Asset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface Release {
  version: string;
  publishedAt: string;
  releaseNotes: string;
  assets: {
    macSilicon: { pkg?: Asset; dmg?: Asset };
    macIntel: { pkg?: Asset; dmg?: Asset };
    windows: { exe?: Asset };
  };
}

export default function DownloadPage() {
  const [licenseKey, setLicenseKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [error, setError] = useState('');
  const [downloadsRemaining, setDownloadsRemaining] = useState(0);
  const [release, setRelease] = useState<Release | null>(null);
  const [platform, setPlatform] = useState('');

  useEffect(() => {
    setPlatform(detectPlatform());
    fetchLatestRelease();
  }, []);

  const fetchLatestRelease = async () => {
    try {
      const response = await fetch('/api/releases/latest');
      if (response.ok) {
        const data = await response.json();
        setRelease(data);
      }
    } catch (error) {
      console.error('Error fetching release:', error);
    }
  };

  const validateLicenseKey = async () => {
    setIsValidating(true);
    setError('');

    try {
      const response = await fetch('/api/validate-license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseKey, platform }),
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
    
    // Auto-format as user types
    if (value.length > 0 && !value.startsWith('SCO-')) {
      value = 'SCO-' + value.replace(/^SCO-/, '');
    }
    
    // Limit length
    if (value.length <= 19) {
      setLicenseKey(value);
    }
  };

  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 md:py-24">
      <div className="w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#153B6B] mb-6 text-center">
            Download SCO SMB
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 text-center mb-16">
            Enter your license key to download the latest version
          </p>

          {!isValidated ? (
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-[#153B6B] mb-4">
                Enter Your License Key
              </h2>
              <p className="text-gray-600 mb-6">
                You need a valid license key to download SCO SMB. Don&apos;t have one?{' '}
                <a href="/contact?subject=license" className="text-[#00A8B5] hover:underline font-medium">
                  Request a key
                </a>
              </p>

              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="SCO-XXXX-XXXX-XXXX"
                    value={licenseKey}
                    onChange={handleKeyChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent text-lg font-mono"
                    maxLength={25}
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                    <X className="w-5 h-5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  onClick={validateLicenseKey}
                  disabled={isValidating || licenseKey.length < 19}
                  className="w-full bg-[#00A8B5] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#008c97] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {isValidating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Validating...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Validate Key
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  Are you a technician?{' '}
                  <a href="/portal" className="text-[#00A8B5] hover:underline font-medium">
                    Access the Technician Portal
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                  <div className="flex items-center gap-3 mb-6 text-green-600 bg-green-50 p-4 rounded-lg">
                <Check className="w-6 h-6 shrink-0" />
                <div>
                  <p className="font-semibold">License key validated!</p>
                  <p className="text-sm">You have {downloadsRemaining} downloads remaining.</p>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-[#153B6B] mb-6">
                Choose Your Platform
              </h2>

              <div className="space-y-4">
                {/* Mac Silicon */}
                {release?.assets.macSilicon.pkg && (
                  <div className="border border-gray-200 rounded-lg p-6 hover:border-[#00A8B5] transition-colors">
                    <h3 className="text-lg font-semibold text-[#153B6B] mb-2">
                      🍎 macOS (Apple Silicon)
                    </h3>
                    <p className="text-gray-600 mb-4">
                      For Mac computers with M1, M2, or M3 chips
                    </p>
                    <button
                      onClick={() => handleDownload(
                        release.assets.macSilicon.pkg?.browser_download_url || ''
                      )}
                      className="w-full bg-[#153B6B] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#0f2a4d] transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Download PKG ({formatBytes(release.assets.macSilicon.pkg?.size || 0)})
                    </button>
                  </div>
                )}

                {/* Mac Intel */}
                {release?.assets.macIntel.pkg && (
                  <div className="border border-gray-200 rounded-lg p-6 hover:border-[#00A8B5] transition-colors">
                    <h3 className="text-lg font-semibold text-[#153B6B] mb-2">
                      🍎 macOS (Intel)
                    </h3>
                    <p className="text-gray-600 mb-4">
                      For Mac computers with Intel processors
                    </p>
                    <button
                      onClick={() => handleDownload(
                        release.assets.macIntel.pkg?.browser_download_url || ''
                      )}
                      className="w-full bg-[#153B6B] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#0f2a4d] transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Download PKG ({formatBytes(release.assets.macIntel.pkg?.size || 0)})
                    </button>
                  </div>
                )}

                {/* Windows */}
                {release?.assets.windows.exe && (
                  <div className="border border-gray-200 rounded-lg p-6 hover:border-[#00A8B5] transition-colors">
                    <h3 className="text-lg font-semibold text-[#153B6B] mb-2">
                      🪟 Windows
                    </h3>
                    <p className="text-gray-600 mb-4">
                      For Windows 10 and Windows 11
                    </p>
                    <button
                      onClick={() => handleDownload(
                        release.assets.windows.exe?.browser_download_url || ''
                      )}
                      className="w-full bg-[#153B6B] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#0f2a4d] transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Download EXE ({formatBytes(release.assets.windows.exe?.size || 0)})
                    </button>
                  </div>
                )}
              </div>

              {release && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-[#153B6B] mb-2">
                    Version {release.version}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Released on {formatDate(release.publishedAt)}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* System Requirements */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-[#153B6B] mb-4">
              System Requirements
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-[#153B6B] mb-2">macOS</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• macOS 10.13 or later</li>
                  <li>• 100 MB free disk space</li>
                  <li>• Network access to printers</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#153B6B] mb-2">Windows</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Windows 10 or later</li>
                  <li>• 100 MB free disk space</li>
                  <li>• Network access to printers</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
