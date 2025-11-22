'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  ExternalLink,
  RefreshCw,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';

interface SentryIssue {
  id: string;
  title: string;
  culprit: string;
  count: string;
  userCount: number;
  firstSeen: string;
  lastSeen: string;
  level: string;
  status: string;
  permalink: string;
}

interface SentryStats {
  totalIssues: number;
  unresolvedIssues: number;
  resolvedIssues: number;
  affectedUsers: number;
  last24Hours: number;
}

export default function ErrorLogsPage() {
  const [stats, setStats] = useState<SentryStats>({
    totalIssues: 0,
    unresolvedIssues: 0,
    resolvedIssues: 0,
    affectedUsers: 0,
    last24Hours: 0,
  });
  const [unresolvedIssues, setUnresolvedIssues] = useState<SentryIssue[]>([]);
  const [resolvedIssues, setResolvedIssues] = useState<SentryIssue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'unresolved' | 'resolved'>('unresolved');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    fetchSentryData();
  }, []);

  const fetchSentryData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/sentry-stats');
      if (response.ok) {
        const data = await response.json();
        
        setUnresolvedIssues(data.issues || []);
        setResolvedIssues(data.resolvedIssues || []);
        
        const totalUsers = new Set([
          ...(data.issues || []).map((i: SentryIssue) => i.userCount),
          ...(data.resolvedIssues || []).map((i: SentryIssue) => i.userCount),
        ]).size;

        const last24h = (data.issues || []).filter((issue: SentryIssue) => {
          const lastSeen = new Date(issue.lastSeen);
          const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
          return lastSeen > dayAgo;
        }).length;

        setStats({
          totalIssues: (data.issues?.length || 0) + (data.resolvedIssues?.length || 0),
          unresolvedIssues: data.issues?.length || 0,
          resolvedIssues: data.resolvedIssues?.length || 0,
          affectedUsers: totalUsers,
          last24Hours: last24h,
        });
        
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Error fetching Sentry data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'error':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'info':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const currentIssues = activeTab === 'unresolved' ? unresolvedIssues : resolvedIssues;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container-wide py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/portal" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-[#153B6B]">Error Monitoring</h1>
                <p className="text-sm text-gray-600">Live crash analytics from Sentry</p>
              </div>
            </div>
            <button
              onClick={fetchSentryData}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="container-wide py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs text-gray-500">All Time</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalIssues}</h3>
            <p className="text-sm text-gray-600">Total Issues</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <XCircle className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.unresolvedIssues}</h3>
            <p className="text-sm text-gray-600">Unresolved</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.resolvedIssues}</h3>
            <p className="text-sm text-gray-600">Resolved</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                24h
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.last24Hours}</h3>
            <p className="text-sm text-gray-600">Recent Activity</p>
          </motion.div>
        </div>

        {/* Issues List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex items-center justify-between p-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('unresolved')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'unresolved'
                      ? 'bg-red-50 text-red-700 border-2 border-red-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <XCircle className="w-4 h-4 inline mr-2" />
                  Unresolved ({stats.unresolvedIssues})
                </button>
                <button
                  onClick={() => setActiveTab('resolved')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'resolved'
                      ? 'bg-green-50 text-green-700 border-2 border-green-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Resolved ({stats.resolvedIssues})
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Updated {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="w-12 h-12 border-4 border-[#00A8B5] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading error data...</p>
              </div>
            ) : currentIssues.length === 0 ? (
              <div className="p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {activeTab === 'unresolved' ? 'No Active Issues! 🎉' : 'No Resolved Issues Yet'}
                </h3>
                <p className="text-gray-600">
                  {activeTab === 'unresolved'
                    ? 'Everything is running smoothly'
                    : 'Resolved issues will appear here'}
                </p>
              </div>
            ) : (
              currentIssues.map((issue) => (
                <div key={issue.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getLevelColor(issue.level)}`}>
                          {issue.level.toUpperCase()}
                        </span>
                        {activeTab === 'resolved' && (
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 border border-green-200 rounded-full font-medium">
                            ✓ RESOLVED
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                        {issue.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 truncate">
                        {issue.culprit}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Activity className="w-4 h-4" />
                          {issue.count} events
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {issue.userCount} users
                        </span>
                        <span>First: {formatDate(issue.firstSeen)}</span>
                        <span>Last: {formatDate(issue.lastSeen)}</span>
                      </div>
                    </div>
                    <a
                      href={issue.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#00A8B5] text-white rounded-lg hover:bg-[#008c97] transition-colors flex items-center gap-2 shrink-0"
                    >
                      View in Sentry
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>Note:</strong> Error data is synced from Sentry in real-time. Technicians can view crash analytics
            to understand common issues and deployment problems. For detailed stack traces and debugging, click "View in Sentry".
          </p>
        </div>
      </div>
    </div>
  );
}
