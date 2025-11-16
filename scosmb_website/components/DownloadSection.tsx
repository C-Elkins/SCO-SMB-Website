"use client";
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

export interface ReleaseAsset {
  name: string;
  size: number;
  download_count: number;
  browser_download_url: string;
}

export interface Release {
  tag_name: string;
  name: string;
  published_at: string;
  body: string;
  assets: ReleaseAsset[];
}

interface DownloadSectionProps {
  release?: Release | null;
  className?: string;
  showNotes?: boolean;
}

function detectPlatform(): string {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (/Windows/.test(ua)) return 'windows';
  if (/Macintosh/.test(ua) && /ARM/.test(ua)) return 'mac-arm';
  if (/Macintosh/.test(ua)) return 'mac-intel';
  return 'unknown';
}

export function DownloadSection({ release: releaseProp = null, className, showNotes = true }: DownloadSectionProps) {
  const [release, setRelease] = useState<Release | null>(releaseProp);
  const [loading, setLoading] = useState(!releaseProp);
  const [error, setError] = useState<string | null>(null);
  const platform = detectPlatform();

  useEffect(() => {
    if (releaseProp) {
      setRelease(releaseProp);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await fetch('/api/releases/latest');
        if (!res.ok) throw new Error('Unable to load release');
        setRelease(await res.json());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    })();
  }, [releaseProp]);

  if (loading) {
    return (
      <div className={clsx('rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 text-sm text-neutral-500', className)}>
        Loading latest release…
      </div>
    );
  }

  if (error || !release) {
    return (
      <div className={clsx('rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700', className)}>
        {error || 'Release unavailable'}
      </div>
    );
  }

  const formatSize = (bytes: number) => `${Math.max(bytes / (1024 * 1024), 0.1).toFixed(1)} MB`;

  const getPlatformIcon = (filename: string) => {
    if (filename.toLowerCase().includes('mac') || filename.toLowerCase().includes('darwin')) {
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      );
    } else if (filename.toLowerCase().includes('win') || filename.toLowerCase().includes('windows')) {
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>
        </svg>
      );
    } else if (filename.toLowerCase().includes('linux')) {
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.84-.41 1.684-.287 2.489a.424.424 0 00.04.12c.861.627 1.615.911 2.816.7 1.021-.179 1.907-.267 2.912-.267 1.013 0 1.904.095 2.91.267 1.206.209 1.942-.075 2.815-.7.014-.038.026-.076.037-.118.123-.804-.009-1.649-.287-2.489-.589-1.771-1.831-3.47-2.715-4.521-.75-1.067-.975-1.928-1.05-3.02-.066-1.491 1.055-5.965-3.169-6.298-.165-.013-.325-.021-.48-.021z"/>
        </svg>
      );
    }
    return (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    );
  };

  const isPlatformRecommended = (filename: string) => {
    const lower = filename.toLowerCase();
    if (platform === 'mac-arm' && (lower.includes('arm64') || (lower.includes('arm') && lower.includes('.dmg')))) return true;
    if (platform === 'mac-intel' && (lower.includes('x64') || (lower.includes('.dmg') && !lower.includes('arm')))) return true;
    if (platform === 'windows' && (lower.includes('.exe') || lower.includes('win'))) return true;
    return false;
  };

  return (
    <div className={clsx('space-y-6', className)}>
      {/* Platform Detection Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <div>
            <p className="font-medium text-blue-900 text-sm">Platform Detection</p>
            <p className="text-blue-700 text-xs">
              Detected: <span className="font-semibold">{platform}</span> - Recommended downloads are highlighted
            </p>
          </div>
        </div>
      </div>

      {/* Download Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {release.assets.map((asset) => {
          const isRecommended = isPlatformRecommended(asset.name);
          return (
            <a
              key={asset.name}
              href={asset.browser_download_url}
              className={clsx(
                "group relative rounded-xl border-2 p-6 text-left transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
                isRecommended 
                  ? "border-[#00A8B5] bg-gradient-to-br from-teal-50 to-blue-50 hover:border-[#008991]" 
                  : "border-gray-200 bg-white hover:border-[#00A8B5] hover:bg-gray-50"
              )}
            >
              {isRecommended && (
                <div className="absolute -top-2 -right-2 bg-[#00A8B5] text-white px-2 py-1 rounded-lg text-xs font-semibold">
                  Recommended
                </div>
              )}
              
              <div className="flex items-start gap-4">
                <div className={clsx(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  isRecommended ? "bg-[#00A8B5] text-white" : "bg-gray-100 group-hover:bg-[#153B6B] group-hover:text-white"
                )}>
                  {getPlatformIcon(asset.name)}
                </div>
                
                <div className="flex-1">
                  <div className={clsx(
                    "font-semibold text-base mb-1",
                    isRecommended ? "text-[#153B6B]" : "text-gray-900"
                  )}>
                    {asset.name}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                      </svg>
                      {formatSize(asset.size)}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7,10 12,15 17,10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      {asset.download_count.toLocaleString()} downloads
                    </span>
                  </div>
                </div>
                
                <div className={clsx(
                  "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                  isRecommended ? "bg-[#00A8B5] text-white" : "bg-gray-100 group-hover:bg-[#153B6B] group-hover:text-white"
                )}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7,10 12,15 17,10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {showNotes && release.body && (
        <details className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
          <summary className="cursor-pointer font-semibold text-[#153B6B] p-4 hover:bg-gray-100 transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
            </svg>
            Release Notes
          </summary>
          <div className="border-t border-gray-200 p-4 bg-white">
            <pre className="max-h-64 overflow-auto whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
              {release.body}
            </pre>
          </div>
        </details>
      )}
    </div>
  );
}
