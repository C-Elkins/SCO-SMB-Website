'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, Wrench, Loader2 } from 'lucide-react';
import TechDashboard from '@/components/TechDashboard';

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
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    full_name: '',
    company: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const response = await fetch('/api/tech/auth/session');
      const data = await response.json();
      
      if (data.authenticated && data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('Session check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const endpoint = isLogin ? '/api/tech/auth/login' : '/api/tech/auth/register';
      const body = isLogin
        ? { username: formData.username, password: formData.password }
        : formData;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        if (isLogin) {
          setUser(data.user);
        } else {
          setIsLogin(true);
          setError('');
          alert('Account created! Please log in.');
        }
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (error) {
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
    return <TechDashboard user={user} />;
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
              {isLogin ? 'Sign in to access your dashboard' : 'Create your technician account'}
            </p>
          </div>

          <div className="flex border-b border-gray-200">
            <button
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`flex-1 py-4 text-center font-semibold transition-colors ${isLogin ? 'text-[#00A8B5] border-b-2 border-[#00A8B5] bg-blue-50' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <LogIn className="w-5 h-5 inline mr-2" />
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`flex-1 py-4 text-center font-semibold transition-colors ${!isLogin ? 'text-[#00A8B5] border-b-2 border-[#00A8B5] bg-blue-50' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <UserPlus className="w-5 h-5 inline mr-2" />
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {!isLogin && (
                <div>
                  <label htmlFor="full_name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input type="text" id="full_name" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent transition-all" placeholder="John Doe" required={!isLogin} />
                </div>
              )}

              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">Username *</label>
                <input type="text" id="username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent transition-all" placeholder="techuser" required />
              </div>

              {!isLogin && (
                <>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input type="email" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent transition-all" placeholder="tech@company.com" required={!isLogin} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                      <input type="text" id="company" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent transition-all" placeholder="Acme Corp" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                      <input type="tel" id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent transition-all" placeholder="(555) 123-4567" />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
                <input type="password" id="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent transition-all" placeholder={isLogin ? 'Enter your password' : 'Min. 8 characters'} required />
                {!isLogin && <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters</p>}
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full mt-6 bg-gradient-to-r from-[#153B6B] to-[#00A8B5] text-white font-semibold py-4 rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 animate-spin" />{isLogin ? 'Signing in...' : 'Creating account...'}</>
              ) : (
                <>{isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}{isLogin ? 'Sign In' : 'Create Account'}</>
              )}
            </button>

            {isLogin && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Demo Account: <code className="bg-gray-100 px-2 py-1 rounded">tech_demo</code> / <code className="bg-gray-100 px-2 py-1 rounded">tech123</code>
                </p>
              </div>
            )}
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-white/80 mb-3">Need help? Contact your administrator</p>
          <a href="/" className="text-sm text-white hover:underline font-medium">← Back to Main Website</a>
        </div>
      </motion.div>
    </div>
  );
}
