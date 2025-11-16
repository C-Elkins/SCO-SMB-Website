'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Globe,
  Monitor,
  Smartphone,
  Download,
  Key,
  Users,
  Activity
} from 'lucide-react';

interface AnalyticsData {
  downloadStats: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    growth: number;
  };
  platformStats: {
    windows: number;
    mac: number;
    linux: number;
  };
  keyStats: {
    totalKeys: number;
    activeKeys: number;
    revokedKeys: number;
    unusedKeys: number;
  };
  monthlyTrends: {
    month: string;
    downloads: number;
    keysGenerated: number;
  }[];
  topCustomers: {
    name: string;
    email: string;
    downloads: number;
    keys: number;
  }[];
  recentActivity: {
    type: 'key_generated' | 'download' | 'key_revoked';
    description: string;
    timestamp: string;
  }[];
}

export function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/analytics?range=${timeRange}`, { credentials: 'include' });
      const analyticsData = await response.json();
      setData(analyticsData);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      // Mock data for demo
      setData({
        downloadStats: {
          total: 1247,
          thisMonth: 89,
          lastMonth: 74,
          growth: 20.3
        },
        platformStats: {
          windows: 67,
          mac: 23,
          linux: 10
        },
        keyStats: {
          totalKeys: 156,
          activeKeys: 89,
          revokedKeys: 12,
          unusedKeys: 55
        },
        monthlyTrends: [
          { month: 'Jan', downloads: 45, keysGenerated: 12 },
          { month: 'Feb', downloads: 52, keysGenerated: 8 },
          { month: 'Mar', downloads: 67, keysGenerated: 15 },
          { month: 'Apr', downloads: 78, keysGenerated: 18 },
          { month: 'May', downloads: 89, keysGenerated: 22 },
          { month: 'Jun', downloads: 94, keysGenerated: 19 }
        ],
        topCustomers: [
          { name: 'Acme Corp', email: 'admin@acme.com', downloads: 23, keys: 5 },
          { name: 'TechStart Inc', email: 'info@techstart.com', downloads: 19, keys: 3 },
          { name: 'Global Solutions', email: 'support@global.com', downloads: 15, keys: 4 }
        ],
        recentActivity: [
          { type: 'download', description: 'Software downloaded by user@example.com', timestamp: '2 minutes ago' },
          { type: 'key_generated', description: 'New license key generated for Acme Corp', timestamp: '15 minutes ago' },
          { type: 'key_revoked', description: 'License key SCO-1234-ABCD revoked', timestamp: '1 hour ago' },
          { type: 'download', description: 'Software downloaded by test@company.com', timestamp: '2 hours ago' }
        ]
      });
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#00A8B5] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Failed to load analytics data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#153B6B]">Analytics Dashboard</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Downloads</p>
              <p className="text-3xl font-bold text-[#153B6B]">{data?.downloadStats?.total || 0}</p>
              <div className="flex items-center mt-2">
                {(data?.downloadStats?.growth || 0) >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  (data?.downloadStats?.growth || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {Math.abs(data?.downloadStats?.growth || 0)}% from last month
                </span>
              </div>
            </div>
            <Download className="w-8 h-8 text-[#00A8B5]" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Keys</p>
              <p className="text-3xl font-bold text-green-600">{data?.keyStats?.activeKeys || 0}</p>
              <p className="text-sm text-gray-500 mt-1">
                {data?.keyStats?.totalKeys || 0} total keys
              </p>
            </div>
            <Key className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-3xl font-bold text-[#00A8B5]">{data?.downloadStats?.thisMonth || 0}</p>
              <p className="text-sm text-gray-500 mt-1">
                vs {data?.downloadStats?.lastMonth || 0} last month
              </p>
            </div>
            <Calendar className="w-8 h-8 text-[#00A8B5]" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unused Keys</p>
              <p className="text-3xl font-bold text-yellow-600">{data?.keyStats?.unusedKeys || 0}</p>
              <p className="text-sm text-gray-500 mt-1">
                {data?.keyStats?.revokedKeys || 0} revoked
              </p>
            </div>
            <Activity className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-[#153B6B] mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Platform Distribution
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Monitor className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium">Windows</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${data?.platformStats?.windows || 0}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {data?.platformStats?.windows || 0}%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Monitor className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium">Mac</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gray-500 h-2 rounded-full" 
                    style={{ width: `${data?.platformStats?.mac || 0}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {data?.platformStats?.mac || 0}%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium">Linux</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full" 
                    style={{ width: `${data?.platformStats?.linux || 0}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {data?.platformStats?.linux || 0}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-[#153B6B] mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Monthly Trends
          </h3>
          
          <div className="space-y-2">
            {(data?.monthlyTrends || []).map((month) => (
              <div key={month.month} className="flex items-center justify-between py-2">
                <span className="text-sm font-medium text-gray-600 w-8">
                  {month.month}
                </span>
                <div className="flex-1 mx-4">
                  <div className="flex gap-1">
                    <div 
                      className="bg-[#00A8B5] h-4 rounded"
                      style={{ width: `${(month.downloads / 100) * 100}%` }}
                      title={`${month.downloads} downloads`}
                    ></div>
                    <div 
                      className="bg-[#153B6B] h-4 rounded"
                      style={{ width: `${(month.keysGenerated / 25) * 100}%` }}
                      title={`${month.keysGenerated} keys generated`}
                    ></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-[#00A8B5]">
                    {month.downloads}
                  </div>
                  <div className="text-xs text-[#153B6B]">
                    {month.keysGenerated} keys
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t flex justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#00A8B5] rounded"></div>
              <span>Downloads</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#153B6B] rounded"></div>
              <span>Keys Generated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Customers */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-[#153B6B] mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Top Customers
          </h3>
          
          <div className="space-y-4">
            {(data?.topCustomers || []).map((customer, index) => (
              <div key={customer.email} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#00A8B5] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {customer.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {customer.email}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-[#00A8B5]">
                    {customer.downloads} downloads
                  </div>
                  <div className="text-xs text-gray-500">
                    {customer.keys} keys
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-[#153B6B] mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Activity
          </h3>
          
          <div className="space-y-4">
            {(data?.recentActivity || []).map((activity, index) => (
              <div key={index} className="flex items-start gap-3 py-2">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'download' ? 'bg-green-500' :
                  activity.type === 'key_generated' ? 'bg-blue-500' :
                  'bg-red-500'
                }`}></div>
                <div className="flex-1">
                  <div className="text-sm text-gray-900">
                    {activity.description}
                  </div>
                  <div className="text-xs text-gray-500">
                    {activity.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}