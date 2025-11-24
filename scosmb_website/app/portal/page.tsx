'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Wrench, Loader2 } from 'lucide-react';

// Lazy load TechDashboard for better INP
const TechDashboard = lazy(() => import('@/components/TechDashboard'));

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

export default function PortalPage() {
  const [user, setUser] = useState<TechUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    checkSession();
    
    // Clear session when user navigates away from portal
    const handleBeforeUnload = () => {
      // Only clear if navigating to non-portal pages
      const currentPath = window.location.pathname;
      if (!currentPath.startsWith('/portal')) {
        // Session will be validated on next portal visit
        fetch('/api/tech/auth/logout', { 
          method: 'POST',
          credentials: 'include',
          keepalive: true // Ensure request completes even if page is closing
        }).catch(() => {}); // Ignore errors on page unload
      }
    };

    // Listen for navigation away from portal
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const checkSession = async () => {
    try {
      const response = await fetch('/api/tech/auth/session', {
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      const data = await response.json();
      
      console.log('Session check response:', data); // Debug log
      
      if (data.authenticated && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Session check error:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    console.log('Attempting login with:', formData.username); // Debug log

    try {
      const response = await fetch('/api/tech/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username: formData.username, password: formData.password }),
      });

      const data = await response.json();
      console.log('Login response:', data); // Debug log

      if (data.success && data.user) {
        setUser(data.user);
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#153B6B] to-[#00A8B5] flex items-center justify-center">
        <div className="text-white text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
          <p className="text-lg">Loading Tech Portal...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-[#00A8B5]" />
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      }>
        <TechDashboard user={user} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#153B6B] via-[#1e4a7f] to-[#00A8B5] flex items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#153B6B] to-[#00A8B5] p-8 text-white text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Technician Portal</h1>
            <p className="text-white/80 text-sm">
              Sign in to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">Username *</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent transition-all"
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 bg-gradient-to-r from-[#153B6B] to-[#00A8B5] text-white font-semibold py-4 rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-white/80 mb-3">Accounts are created by administrators only</p>
          <a href="/" className="text-sm text-white hover:underline font-medium">← Back to Main Website</a>
        </div>
      </motion.div>
    </div>
  );
}
