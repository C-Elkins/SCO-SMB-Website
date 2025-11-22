'use client';

import { useState, useEffect } from 'react';
import { Activity, AlertCircle, CheckCircle, Clock, TrendingDown } from 'lucide-react';

interface SentryIssue {
  id: string;
  title: string;
  count: number;
  level: string;
  firstSeen: string;
  lastSeen: string;
  permalink?: string;
  status: 'resolved' | 'unresolved';
  resolvedAt?: string;
}

interface SentryData {
  crashFreeRate: string;
  last24Hours: {
    totalErrors: number;
    unresolvedIssues: number;
    resolvedIssues: number;
  };
  recentIssues: SentryIssue[];
  resolvedIssues: SentryIssue[];
  timestamp: string;
}

export function AppHealthStatus() {
  const [data, setData] = useState<SentryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showResolved, setShowResolved] = useState(false);

  useEffect(() => {
    async function fetchSentryData() {
      try {
        const response = await fetch('/api/sentry-stats');
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(errorData.message || errorData.error || `HTTP ${response.status}`);
        }
        const data = await response.json();
        
        // Check if response contains an error (even with 200 status)
        if (data.error) {
          throw new Error(data.message || data.error);
        }
        
        setData(data);
        setError(null);
      } catch (err) {
        console.error('Sentry fetch error:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchSentryData();
    // Refresh every 5 minutes
    const interval = setInterval(fetchSentryData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start gap-3 text-yellow-800">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-medium mb-2">Sentry Integration Not Configured</p>
            <p className="text-sm text-yellow-700 mb-3">{error}</p>
            <div className="text-xs text-yellow-700 bg-yellow-100 p-3 rounded">
              <p className="font-semibold mb-2">📋 Setup Checklist:</p>
              <ol className="list-decimal list-inside space-y-1 mb-3">
                <li>Get Sentry API token from <a href="https://sentry.io/settings/account/api/auth-tokens/" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-900">Sentry Settings</a></li>
                <li>Add <code className="bg-yellow-200 px-1 rounded font-mono">SENTRY_AUTH_TOKEN</code> to Vercel env variables</li>
                <li>Add <code className="bg-yellow-200 px-1 rounded font-mono">SENTRY_ORG</code> (find in Sentry URL)</li>
                <li>Add <code className="bg-yellow-200 px-1 rounded font-mono">SENTRY_PROJECT</code> (e.g., sco-smb)</li>
                <li>Redeploy your Vercel project</li>
              </ol>
              <p className="text-xs">📖 See <code className="bg-yellow-200 px-1 rounded">VERCEL_SENTRY_SETUP.md</code> for detailed instructions.</p>
            </div>
            <div className="mt-3 pt-3 border-t border-yellow-200">
              <p className="text-xs text-yellow-600">
                <strong>Note:</strong> The admin dashboard will work without Sentry. This feature provides crash analytics and error monitoring.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const crashFree = parseFloat(data.crashFreeRate);
  const statusColor = crashFree >= 99 
    ? 'green' 
    : crashFree >= 95 
    ? 'yellow' 
    : 'red';

  return (
    <div className="space-y-6">
      {/* Main Health Card */}
      <div className={`rounded-xl p-8 text-white ${
        statusColor === 'green' 
          ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
          : statusColor === 'yellow'
          ? 'bg-gradient-to-br from-yellow-500 to-orange-500'
          : 'bg-gradient-to-br from-red-500 to-rose-600'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Activity className="w-6 h-6" />
            SCO SMB App Health
          </h2>
          {statusColor === 'green' && <CheckCircle className="w-8 h-8" />}
          {statusColor === 'yellow' && <AlertCircle className="w-8 h-8" />}
          {statusColor === 'red' && <TrendingDown className="w-8 h-8" />}
        </div>
        
        <div className="text-center py-4">
          <div className="text-6xl font-black mb-2">{data.crashFreeRate}</div>
          <div className="text-lg opacity-90">Crash-Free Rate</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600 text-sm font-medium">Errors (24h)</span>
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {data.last24Hours.totalErrors}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600 text-sm font-medium">Active Issues</span>
            <Clock className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {data.last24Hours.unresolvedIssues}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600 text-sm font-medium">Issues Resolved</span>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {data.last24Hours.resolvedIssues}
          </div>
          {data.last24Hours.resolvedIssues > 0 && (
            <a
              href={`https://sentry.io/organizations/${process.env.NEXT_PUBLIC_SENTRY_ORG || 'south-coast-office-smb'}/issues/?query=is:resolved`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-green-600 hover:text-green-700 font-medium mt-2 inline-block"
            >
              View all resolved →
            </a>
          )}
        </div>
      </div>

      {/* Issues Tabs */}
      {(data.recentIssues.length > 0 || data.resolvedIssues.length > 0) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Tab Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-4 border-b border-gray-200">
              <button
                onClick={() => setShowResolved(false)}
                className={`pb-3 px-4 font-semibold transition-colors relative ${
                  !showResolved
                    ? 'text-[#00A8B5] border-b-2 border-[#00A8B5]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Active Issues
                {data.recentIssues.length > 0 && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                    {data.recentIssues.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setShowResolved(true)}
                className={`pb-3 px-4 font-semibold transition-colors relative ${
                  showResolved
                    ? 'text-[#00A8B5] border-b-2 border-[#00A8B5]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Resolved Issues
                {data.resolvedIssues.length > 0 && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    {data.resolvedIssues.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Issues List */}
          <div className="space-y-3">
            {!showResolved ? (
              // Active Issues
              data.recentIssues.length > 0 ? (
                data.recentIssues.map((issue) => (
                  <div 
                    key={issue.id} 
                    className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 mb-2">
                          {issue.title}
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            issue.level === 'error' 
                              ? 'bg-red-100 text-red-700' 
                              : issue.level === 'warning'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {issue.level}
                          </span>
                          <span className="inline-flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {issue.count} occurrences
                          </span>
                          <span className="inline-flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            Last: {new Date(issue.lastSeen).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      {issue.permalink && (
                        <a
                          href={issue.permalink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap flex items-center gap-1"
                        >
                          Details →
                        </a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" />
                  <p>No active issues! 🎉</p>
                </div>
              )
            ) : (
              // Resolved Issues
              data.resolvedIssues.length > 0 ? (
                data.resolvedIssues.map((issue) => (
                  <div 
                    key={issue.id} 
                    className="border border-green-200 bg-green-50 rounded-lg p-4 hover:border-green-300 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          {issue.title}
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            issue.level === 'error' 
                              ? 'bg-red-100 text-red-700' 
                              : issue.level === 'warning'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {issue.level}
                          </span>
                          <span>{issue.count} total occurrences</span>
                          <span className="text-green-700 font-medium">
                            ✓ Resolved {issue.resolvedAt ? new Date(issue.resolvedAt).toLocaleDateString() : 'recently'}
                          </span>
                        </div>
                      </div>
                      {issue.permalink && (
                        <a
                          href={issue.permalink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-700 text-sm font-medium whitespace-nowrap flex items-center gap-1"
                        >
                          Details →
                        </a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No resolved issues in recent history</p>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Timestamp */}
      <div className="text-center text-sm text-gray-500">
        Last updated: {new Date(data.timestamp).toLocaleString()}
      </div>
    </div>
  );
}
