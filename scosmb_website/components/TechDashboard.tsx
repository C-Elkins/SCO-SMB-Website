'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  LogOut,
  Bell,
  Settings,
  TrendingUp,
  Download,
  FileText,
  AlertTriangle,
  CheckCircle,
  Activity,
  Users,
  BookOpen,
  Wrench,
  MessageSquare,
  BarChart3,
  Shield,
  Clock,
  Eye,
  ThumbsUp,
  ExternalLink,
} from 'lucide-react';

interface TechUser {
  id: string;
  username: string;
  email: string;
  full_name: string;
  company?: string;
  role: string;
  avatar_url?: string;
  bio?: string;
  specializations: string[];
  total_posts: number;
  total_solutions: number;
  created_at: string;
  last_login?: string;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  severity?: string;
  status: string;
  views: number;
  likes: number;
  is_pinned: boolean;
  created_at: string;
  author: {
    username: string;
    full_name: string;
    avatar_url?: string;
  };
}

interface DashboardStats {
  totalPosts: number;
  openIssues: number;
  resolvedToday: number;
  activeTechs: number;
}

export default function TechDashboard({ user }: { user: TechUser }) {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    openIssues: 0,
    resolvedToday: 0,
    activeTechs: 0,
  });
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch blog posts
      const postsRes = await fetch('/api/tech/blog?limit=10');
      if (postsRes.ok) {
        const data = await postsRes.json();
        setRecentPosts(data.posts || []);

        // Calculate stats
        const posts = data.posts || [];
        setStats({
          totalPosts: posts.length,
          openIssues: posts.filter((p: BlogPost) => p.status === 'open' && p.category === 'issue').length,
          resolvedToday: posts.filter((p: BlogPost) => {
            const today = new Date().toDateString();
            return p.status === 'resolved' && new Date(p.created_at).toDateString() === today;
          }).length,
          activeTechs: new Set(posts.map((p: BlogPost) => p.author.username)).size,
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/tech/auth/logout', { method: 'POST' });
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'issue':
        return <AlertTriangle className="w-4 h-4" />;
      case 'fix':
        return <CheckCircle className="w-4 h-4" />;
      case 'guide':
        return <BookOpen className="w-4 h-4" />;
      case 'tip':
        return <Wrench className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'issue':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'fix':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'guide':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'tip':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-x-hidden">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-shrink">
              <div className="w-10 h-10 bg-gradient-to-br from-[#153B6B] to-[#00A8B5] rounded-xl flex items-center justify-center flex-shrink-0">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block min-w-0">
                <h1 className="text-lg font-bold text-[#153B6B] truncate">Tech Portal</h1>
                <p className="text-xs text-gray-500 truncate">SCO SMB Dashboard</p>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                </button>
                
                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-[#153B6B] to-[#00A8B5]">
                        <h3 className="font-semibold text-white">Notifications</h3>
                        <p className="text-xs text-white/80">Stay updated with your activity</p>
                      </div>
                      <div className="p-8 text-center">
                        <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-sm text-gray-500 font-medium">No notifications yet</p>
                        <p className="text-xs text-gray-400 mt-1">We'll notify you when there's something new</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-gray-200">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-semibold text-gray-900 truncate max-w-[150px]">{user.full_name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-[#153B6B] to-[#00A8B5] rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {user.full_name.charAt(0)}
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#153B6B] mb-2 break-words">
            Welcome back, {user.full_name.split(' ')[0]}! 👋
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Here's what's happening in the field today
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalPosts}</h3>
            <p className="text-sm text-gray-600">Total Knowledge Base Posts</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                Active
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.openIssues}</h3>
            <p className="text-sm text-gray-600">Open Issues</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.resolvedToday}</h3>
            <p className="text-sm text-gray-600">Resolved Today</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <Activity className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.activeTechs}</h3>
            <p className="text-sm text-gray-600">Active Technicians</p>
          </motion.div>
        </div>

        {/* Quick Access Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Common Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg"
          >
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#00A8B5]" />
              Common Tasks
            </h3>
            <div className="space-y-2">
              <a href="/portal/blog/new" className="flex items-center justify-between p-3 bg-gradient-to-r from-[#153B6B] to-[#00A8B5] text-white rounded-lg hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5" />
                  <span className="font-medium">Report Issue</span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="/portal/blog" className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-gray-700" />
                  <span className="font-medium text-gray-900">Search Knowledge Base</span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="/portal/downloads" className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group">
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-gray-700" />
                  <span className="font-medium text-gray-900">Download Software</span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="/docs" className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-700" />
                  <span className="font-medium text-gray-900">View Documentation</span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-[#153B6B] to-[#00A8B5] rounded-2xl p-6 text-white shadow-lg"
          >
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Quick Resources
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors cursor-pointer">
                <BookOpen className="w-5 h-5" />
                <div>
                  <p className="font-medium text-sm">Installation Guides</p>
                  <p className="text-xs text-white/70">Step-by-step setup instructions</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors cursor-pointer">
                <AlertTriangle className="w-5 h-5" />
                <div>
                  <p className="font-medium text-sm">Troubleshooting</p>
                  <p className="text-xs text-white/70">Common issues and solutions</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors cursor-pointer">
                <Users className="w-5 h-5" />
                <div>
                  <p className="font-medium text-sm">Contact Support</p>
                  <p className="text-xs text-white/70">Get help from the team</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg"
          >
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" />
              System Status
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Portal Status</span>
                  <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                    <CheckCircle className="w-3 h-3" />
                    Operational
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">API Services</span>
                  <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                    <CheckCircle className="w-3 h-3" />
                    Online
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-600">
                  <p className="flex justify-between py-1">
                    <span>Last Update:</span>
                    <span className="font-medium">{new Date().toLocaleTimeString()}</span>
                  </p>
                  <p className="flex justify-between py-1">
                    <span>Uptime:</span>
                    <span className="font-medium text-green-600">99.9%</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Recent Posts */}
          <div className="lg:col-span-2 min-w-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                      <p className="text-sm text-gray-500">Latest posts from the team</p>
                    </div>
                  </div>
                  <a
                    href="/portal/blog"
                    className="text-sm font-medium text-[#00A8B5] hover:underline flex items-center gap-1"
                  >
                    View All <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {isLoading ? (
                  <div className="p-8 text-center text-gray-500">Loading...</div>
                ) : recentPosts.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">No posts yet</div>
                ) : (
                  recentPosts.slice(0, 5).map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-gray-700 font-semibold">
                          {post.author.full_name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0 overflow-hidden">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(post.category)}`}>
                              {getCategoryIcon(post.category)}
                              {post.category}
                            </span>
                            {post.is_pinned && (
                              <span className="text-xs text-yellow-600">📌 Pinned</span>
                            )}
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-1 truncate break-words">
                            {post.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2 break-words">
                            {post.content}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{post.author.full_name}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {post.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" />
                              {post.likes}
                            </span>
                            <span>•</span>
                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 min-w-0">
            {/* User Profile Card */}
            <div className="bg-gradient-to-br from-[#153B6B] to-[#00A8B5] rounded-2xl p-6 text-white shadow-lg overflow-hidden">
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                  {user.full_name.charAt(0)}
                </div>
                <h3 className="font-bold text-lg">{user.full_name}</h3>
                <p className="text-white/80 text-sm">@{user.username}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                <div className="text-center">
                  <p className="text-2xl font-bold">{user.total_posts}</p>
                  <p className="text-xs text-white/80">Posts</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{user.total_solutions}</p>
                  <p className="text-xs text-white/80">Solutions</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#00A8B5]" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <a
                  href="/portal/blog/new"
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#153B6B] to-[#00A8B5] text-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span className="font-medium">New Post</span>
                </a>
                <a
                  href="/portal/blog"
                  className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <BookOpen className="w-5 h-5 text-gray-700" />
                  <span className="font-medium text-gray-900">Knowledge Base</span>
                </a>
                <a
                  href="/portal/downloads"
                  className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Download className="w-5 h-5 text-gray-700" />
                  <span className="font-medium text-gray-900">Downloads</span>
                </a>
                <a
                  href="/portal/errors"
                  className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <AlertTriangle className="w-5 h-5 text-gray-700" />
                  <span className="font-medium text-gray-900">Error Logs</span>
                </a>
                <a
                  href="/docs"
                  className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FileText className="w-5 h-5 text-gray-700" />
                  <span className="font-medium text-gray-900">Documentation</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
