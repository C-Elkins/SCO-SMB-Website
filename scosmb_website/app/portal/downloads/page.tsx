'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Download,
  Calendar,
  Monitor,
  Package,
  ExternalLink,
  TrendingUp,
  Users,
} from 'lucide-react';
import Link from 'next/link';

interface Release {
  tag_name: string;
  published_at: string;
  assets: Array<{
    name: string;
    browser_download_url: string;
    size: number;
    download_count: number;
  }>;
}

export default function DownloadsPage() {
  const [release, setRelease] = useState<Release | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReleaseData();
  }, []);

  const fetchReleaseData = async () => {
    try {
      const response = await fetch('/api/releases/latest');
      if (response.ok) {
        const data = await response.json();
        setRelease(data);
      }
    } catch (error) {
      console.error('Error fetching release:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getPlatformIcon = (filename: string) => {
    if (filename.includes('arm64') || filename.includes('x64')) {
      return '🍎';
    }
    if (filename.includes('.exe')) {
      return '🪟';
    }
    return '📦';
  };

  const getPlatformName = (filename: string) => {
    const lower = filename.toLowerCase();
    if (lower.includes('arm64')) return 'macOS (Apple Silicon)';
    if (lower.includes('x64') && lower.includes('.dmg')) return 'macOS (Intel)';
    if (lower.includes('.exe')) return 'Windows';
    return 'Universal';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container-wide py-4">
          <div className="flex items-center gap-4">
            <Link href="/portal" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#153B6B]">Downloads</h1>
              <p className="text-sm text-gray-600">Latest SCO SMB releases</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-wide py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-[#00A8B5] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading release data...</p>
          </div>
        ) : !release ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No releases found</h3>
            <p className="text-gray-600">Check back later for new releases</p>
          </div>
        ) : (
          <>
            {/* Release Header */}
            <div className="bg-gradient-to-br from-[#153B6B] to-[#00A8B5] rounded-2xl p-8 text-white mb-8 shadow-xl">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                      Latest Release
                    </span>
                    <span className="text-sm font-medium bg-green-500/20 px-3 py-1 rounded-full">
                      ✓ Production Ready
                    </span>
                  </div>
                  <h2 className="text-4xl font-bold mb-2">{release.tag_name}</h2>
                  <div className="flex items-center gap-4 text-white/80">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Released {formatDate(release.published_at)}
                    </span>
                    <span className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      {release.assets.length} assets
                    </span>
                  </div>
                </div>
                <a
                  href="https://github.com/C-Elkins/SCO-SMB/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-colors flex items-center gap-2"
                >
                  All Releases
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
                <div>
                  <div className="text-2xl font-bold mb-1">
                    {release.assets.reduce((sum, a) => sum + a.download_count, 0)}
                  </div>
                  <div className="text-sm text-white/80">Total Downloads</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">{release.assets.length}</div>
                  <div className="text-sm text-white/80">Available Platforms</div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">
                    {formatBytes(release.assets.reduce((sum, a) => sum + a.size, 0))}
                  </div>
                  <div className="text-sm text-white/80">Total Size</div>
                </div>
              </div>
            </div>

            {/* Download Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {release.assets.map((asset) => (
                <motion.div
                  key={asset.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="p-6">
                    <div className="text-4xl mb-4">{getPlatformIcon(asset.name)}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {getPlatformName(asset.name)}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 truncate">{asset.name}</p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">File Size</span>
                        <span className="font-medium text-gray-900">{formatBytes(asset.size)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Downloads</span>
                        <span className="font-medium text-gray-900 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-green-500" />
                          {asset.download_count.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <a
                      href={asset.browser_download_url}
                      className="w-full px-4 py-3 bg-gradient-to-r from-[#153B6B] to-[#00A8B5] text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Technician Note */}
            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center shrink-0">
                  <Monitor className="w-5 h-5 text-yellow-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">📋 Technician Access</h4>
                  <p className="text-sm text-yellow-800 leading-relaxed">
                    <strong>No license key required for technician installations.</strong> These downloads are for
                    authorized service technicians performing installations and maintenance. Customer deployments
                    require valid license keys. Downloads are tracked for compliance purposes.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Resources */}
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#00A8B5]" />
                  Previous Versions
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Need an older version for compatibility testing or rollback?
                </p>
                <a
                  href="https://github.com/C-Elkins/SCO-SMB/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#00A8B5] hover:underline font-medium"
                >
                  View All Releases
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#00A8B5]" />
                  Installation Guides
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Step-by-step installation guides for all platforms
                </p>
                <Link
                  href="/docs/installation"
                  className="inline-flex items-center gap-2 text-[#00A8B5] hover:underline font-medium"
                >
                  View Documentation
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
