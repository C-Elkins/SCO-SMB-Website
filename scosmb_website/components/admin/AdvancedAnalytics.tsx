'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Users, 
  Key, 
  Download,
  Calendar,
  Clock,
  DollarSign,
  BarChart3
} from 'lucide-react';

interface AnalyticsData {
  revenue: {
    total: number;
    monthly: number;
    growth: number;
  };
  keys: {
    total: number;
    active: number;
    growth: number;
  };
  customers: {
    total: number;
    active: number;
    growth: number;
  };
  downloads: {
    total: number;
    today: number;
    growth: number;
  };
  timeline: Array<{
    date: string;
    keys: number;
    downloads: number;
    revenue: number;
  }>;
}

export function AdvancedAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    fetchAnalytics();
  }, [timeframe]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/admin/analytics?range=${timeframe}`, {
        credentials: 'include'
      });
      const data = await response.json();
      
      // Transform API response to match expected format
      const transformedData: AnalyticsData = {
        revenue: {
          total: 0, // TODO: Calculate from customer monthly_rate * months
          monthly: 0,
          growth: 0
        },
        keys: {
          total: data.keyStats?.totalKeys || 0,
          active: data.keyStats?.activeKeys || 0,
          growth: 0
        },
        customers: {
          total: data.topCustomers?.length || 0,
          active: data.topCustomers?.length || 0,
          growth: 0
        },
        downloads: {
          total: data.downloadStats?.total || 0,
          today: data.downloadStats?.thisMonth || 0,
          growth: data.downloadStats?.growth || 0
        },
        timeline: data.monthlyTrends?.map((trend: any) => ({
          date: trend.month || new Date().toISOString(),
          keys: trend.keysGenerated || 0,
          downloads: trend.downloads || 0,
          revenue: 0
        })) || []
      };
      
      setAnalytics(transformedData);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      // Set default empty data on error
      setAnalytics({
        revenue: { total: 0, monthly: 0, growth: 0 },
        keys: { total: 0, active: 0, growth: 0 },
        customers: { total: 0, active: 0, growth: 0 },
        downloads: { total: 0, today: 0, growth: 0 },
        timeline: []
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00A8B5]"></div>
      </div>
    );
  }

  if (!analytics) return null;

  const MetricCard = ({ 
    icon: Icon, 
    title, 
    value, 
    subtitle, 
    growth, 
    color 
  }: { 
    icon: any; 
    title: string; 
    value: string | number; 
    subtitle: string; 
    growth: number; 
    color: string;
  }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          growth >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {growth >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {Math.abs(growth)}%
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{title}</div>
      <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Timeframe Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#153B6B]">Advanced Analytics</h2>
        <div className="flex gap-2">
          {(['7d', '30d', '90d'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeframe === tf
                  ? 'bg-[#00A8B5] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tf === '7d' ? '7 Days' : tf === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={DollarSign}
          title="Total Revenue"
          value={`$${(analytics.revenue?.total || 0).toLocaleString()}`}
          subtitle={`$${(analytics.revenue?.monthly || 0).toLocaleString()}/month`}
          growth={analytics.revenue?.growth || 0}
          color="from-green-500 to-emerald-600"
        />
        <MetricCard
          icon={Key}
          title="License Keys"
          value={analytics.keys?.total || 0}
          subtitle={`${analytics.keys?.active || 0} active`}
          growth={analytics.keys?.growth || 0}
          color="from-blue-500 to-indigo-600"
        />
        <MetricCard
          icon={Users}
          title="Customers"
          value={analytics.customers?.total || 0}
          subtitle={`${analytics.customers?.active || 0} active`}
          growth={analytics.customers?.growth || 0}
          color="from-purple-500 to-pink-600"
        />
        <MetricCard
          icon={Download}
          title="Downloads"
          value={analytics.downloads?.total || 0}
          subtitle={`${analytics.downloads?.today || 0} today`}
          growth={analytics.downloads?.growth || 0}
          color="from-orange-500 to-red-600"
        />
      </div>

      {/* Timeline Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-[#153B6B] mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Activity Timeline
        </h3>
        <div className="space-y-3">
          {(analytics.timeline || []).slice(0, 10).map((day, index) => {
            const maxValue = Math.max(...(analytics.timeline || []).map(d => (d.keys || 0) + (d.downloads || 0)), 1);
            const percentage = (((day.keys || 0) + (day.downloads || 0)) / maxValue) * 100;
            
            return (
              <div key={index} className="flex items-center gap-4">
                <div className="text-sm text-gray-600 w-24">
                  {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="flex-1">
                  <div className="h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-[#00A8B5] to-[#153B6B] transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                    <div className="absolute inset-0 flex items-center px-3 text-xs font-medium text-gray-700">
                      {day.keys || 0} keys • {day.downloads || 0} downloads • ${day.revenue || 0}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
