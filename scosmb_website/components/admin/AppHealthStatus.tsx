'use client';

import { useState, useEffect } from 'react';
import { Activity, AlertCircle, CheckCircle, Clock, TrendingDown } from 'lucide-react';

interface SentryData {
  crashFreeRate: string;
  last24Hours: {
    totalErrors: number;
    unresolvedIssues: number;
  };
  recentIssues: Array<{
    id: string;
    title: string;
    count: number;
    level: string;
    firstSeen: string;
    lastSeen: string;
    permalink?: string;
  }>;
  timestamp: string;
}

export function AppHealthStatus() {
  const [data, setData] = useState<SentryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSentryData() {
      try {
        const response = await fetch('/api/sentry-stats');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
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
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-center gap-3 text-red-800">
          <AlertCircle className="w-5 h-5" />
          <span className="font-medium">Error loading status: {error}</span>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
      </div>

      {/* Recent Issues */}
      {data.recentIssues.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Issues</h3>
          <div className="space-y-3">
            {data.recentIssues.map((issue) => (
              <div 
                key={issue.id} 
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate mb-2">
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
                      <span>{issue.count} occurrences</span>
                      <span>Last: {new Date(issue.lastSeen).toLocaleString()}</span>
                    </div>
                  </div>
                  {issue.permalink && (
                    <a
                      href={issue.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap"
                    >
                      View →
                    </a>
                  )}
                </div>
              </div>
            ))}
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
