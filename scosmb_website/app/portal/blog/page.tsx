'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  BookOpen,
  Wrench,
  MessageSquare,
  Eye,
  ThumbsUp,
  Clock,
  Filter,
  Search,
  Plus,
} from 'lucide-react';
import Link from 'next/link';

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
  updated_at: string;
  author: {
    username: string;
    full_name: string;
    avatar_url?: string;
    role: string;
  };
}

export default function BlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/tech/blog?limit=100');
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
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

  const getSeverityBadge = (severity?: string) => {
    if (!severity) return null;
    const colors = {
      low: 'bg-blue-50 text-blue-700 border-blue-200',
      medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      high: 'bg-orange-50 text-orange-700 border-orange-200',
      critical: 'bg-red-50 text-red-700 border-red-200',
    };
    return (
      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${colors[severity as keyof typeof colors]}`}>
        {severity.toUpperCase()}
      </span>
    );
  };

  const filteredPosts = posts.filter((post) => {
    if (filter !== 'all' && post.category !== filter) return false;
    if (searchTerm && !post.title.toLowerCase().includes(searchTerm.toLowerCase()) && !post.content.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container-wide py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link href="/portal" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-[#153B6B]">Knowledge Base</h1>
                <p className="text-sm text-gray-600">Community solutions and guides</p>
              </div>
            </div>
            <Link
              href="/portal/blog/new"
              className="px-4 py-2 bg-gradient-to-r from-[#153B6B] to-[#00A8B5] text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 font-medium"
            >
              <Plus className="w-4 h-4" />
              New Post
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {['all', 'issue', 'fix', 'guide', 'tip', 'question'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    filter === cat
                      ? 'bg-[#00A8B5] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container-wide py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-[#00A8B5] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filter !== 'all' ? 'Try adjusting your filters' : 'Be the first to contribute!'}
            </p>
            <Link
              href="/portal/blog/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#00A8B5] text-white rounded-lg hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              Create First Post
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all overflow-hidden cursor-pointer"
                onClick={() => router.push(`/portal/blog/${post.id}`)}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="shrink-0 w-12 h-12 bg-gradient-to-br from-[#153B6B] to-[#00A8B5] rounded-lg flex items-center justify-center text-white font-semibold text-lg">
                      {post.author.full_name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(post.category)}`}>
                          {getCategoryIcon(post.category)}
                          {post.category}
                        </span>
                        {post.severity && getSeverityBadge(post.severity)}
                        {post.is_pinned && (
                          <span className="text-xs px-2 py-0.5 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full">
                            📌 Pinned
                          </span>
                        )}
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                          post.status === 'open' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          post.status === 'resolved' ? 'bg-green-50 text-green-700 border-green-200' :
                          'bg-gray-50 text-gray-700 border-gray-200'
                        }`}>
                          {post.status}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-[#00A8B5] transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 line-clamp-2 mb-3">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="font-medium text-gray-700">{post.author.full_name}</span>
                        <span className="capitalize text-xs bg-gray-100 px-2 py-0.5 rounded">
                          {post.author.role}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {post.likes}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
