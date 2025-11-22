'use client';

import { useState, useEffect } from 'react';
import { 
  Activity, 
  Key, 
  Users, 
  Download, 
  Settings, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Mail,
  Shield
} from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'key_created' | 'key_revoked' | 'key_deleted' | 'customer_added' | 'customer_deleted' | 'download' | 'setting_changed' | 'admin_action';
  description: string;
  user?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'keys' | 'customers' | 'system'>('all');

  useEffect(() => {
    fetchActivities();
    // Refresh every 30 seconds
    const interval = setInterval(fetchActivities, 30000);
    return () => clearInterval(interval);
  }, [filter]);

  const fetchActivities = async () => {
    try {
      const response = await fetch(`/api/admin/activities?filter=${filter}`, {
        credentials: 'include'
      });
      const data = await response.json();
      setActivities(data.activities || []);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'key_created': return <Key className="w-4 h-4 text-green-600" />;
      case 'key_revoked': return <XCircle className="w-4 h-4 text-orange-600" />;
      case 'key_deleted': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'customer_added': return <Users className="w-4 h-4 text-blue-600" />;
      case 'customer_deleted': return <Users className="w-4 h-4 text-red-600" />;
      case 'download': return <Download className="w-4 h-4 text-purple-600" />;
      case 'setting_changed': return <Settings className="w-4 h-4 text-gray-600" />;
      case 'admin_action': return <Shield className="w-4 h-4 text-indigo-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRelativeTime = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00A8B5]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#153B6B] flex items-center gap-2">
          <Activity className="w-6 h-6" />
          Live Activity Feed
        </h2>
        <div className="flex gap-2">
          {(['all', 'keys', 'customers', 'system'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                filter === f
                  ? 'bg-[#00A8B5] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Activity List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
        {activities.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Activity className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>No recent activity</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-full bg-gray-100">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    {activity.user && (
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {activity.user}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {getRelativeTime(activity.timestamp)}
                    </span>
                  </div>
                  {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                    <div className="mt-2 text-xs text-gray-600 bg-gray-50 rounded px-2 py-1 inline-block">
                      {Object.entries(activity.metadata).map(([key, value]) => (
                        <span key={key} className="mr-3">
                          <span className="font-medium">{key}:</span> {String(value)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Real-time indicator */}
      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        Live updates enabled
      </div>
    </div>
  );
}
