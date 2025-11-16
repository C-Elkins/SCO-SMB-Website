'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Key, 
  Users, 
  BarChart3, 
  Download, 
  Settings, 
  Plus, 
  Search,

  RefreshCw,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  X,
  UserCog,
  Shield,
  Save,
  Trash2,



} from 'lucide-react';
import { AdminAnalytics } from './AdminAnalytics';
import { EnterpriseSettingsPanel } from './EnterpriseSettingsPanel';

interface DashboardStats {
  totalKeys: number;
  activeKeys: number;
  totalDownloads: number;
  monthlyDownloads: number;
  activeAdmins: number;
  revokedKeys: number;
}

interface LicenseKey {
  id: string;
  key_code: string;
  status: 'unused' | 'active' | 'expired' | 'revoked';
  download_count: number;
  max_downloads: number;
  customer_email?: string;
  customer_name?: string;
  customer_company?: string;
  created_at: string;
  expires_at?: string;
  last_used?: string;
}

interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'super_admin';
  created_at: string;
  last_login?: string;
  is_active: boolean;
}

type TabType = 'overview' | 'keys' | 'admins' | 'analytics' | 'settings';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [stats, setStats] = useState<DashboardStats>({
    totalKeys: 0,
    activeKeys: 0,
    totalDownloads: 0,
    monthlyDownloads: 0,
    activeAdmins: 0,
    revokedKeys: 0
  });
  const [licenseKeys, setLicenseKeys] = useState<LicenseKey[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Key generation form state
  const [keyGenForm, setKeyGenForm] = useState({
    count: 1,
    max_downloads: 3,
    customer_email: '',
    customer_name: '',
    customer_company: '',
    expires_at: ''
  });

  // Admin creation form state
  const [adminForm, setAdminForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'admin' as 'admin' | 'super_admin'
  });

  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [selectedKey, setSelectedKey] = useState<LicenseKey | null>(null);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, keysRes, adminsRes] = await Promise.all([
        fetch('/api/admin/stats', { credentials: 'include' }),
        fetch('/api/admin/keys', { credentials: 'include' }),
        fetch('/api/admin/users', { credentials: 'include' })
      ]);

      const [statsData, keysData, adminsData] = await Promise.all([
        statsRes.json(),
        keysRes.json(),
        adminsRes.json()
      ]);

      setStats(statsData);
      setLicenseKeys(keysData.keys || []);
      setAdminUsers(adminsData.users || []);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateKeys = async () => {
    try {
      const response = await fetch('/api/admin/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(keyGenForm)
      });

      if (response.ok) {
        setShowKeyModal(false);
        setKeyGenForm({
          count: 1,
          max_downloads: 3,
          customer_email: '',
          customer_name: '',
          customer_company: '',
          expires_at: ''
        });
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Failed to generate keys:', error);
    }
  };

  const createAdmin = async () => {
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(adminForm)
      });

      if (response.ok) {
        setShowAdminModal(false);
        setAdminForm({
          username: '',
          email: '',
          password: '',
          role: 'admin'
        });
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Failed to create admin:', error);
    }
  };

  const handleAdminUserSave = async (e: React.FormEvent, userId: number) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const username = formData.get('username') as string;
      const email = formData.get('email') as string;
      const role = formData.get('role') as string;
      const isActive = formData.get('isActive') === 'on';
      const password = formData.get('password') as string;
      const confirmPassword = formData.get('confirmPassword') as string;

      // Validate passwords if provided
      if (password && password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      if (password && password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
      }

      const updateData = {
        username,
        email,
        role,
        isActive,
        ...(password && { password })
      };

      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        await response.json();
        setSelectedAdmin(null);
        fetchDashboardData();
        alert('Admin user updated successfully!');
      } else {
        const error = await response.json();
        alert(`Failed to update admin user: ${error.error}`);
      }
    } catch (error) {
      console.error('Failed to update admin user:', error);
      alert('Failed to update admin user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const revokeKey = async (keyCode: string) => {
    try {
      await fetch('/api/admin/revoke-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ key_code: keyCode })
      });
      fetchDashboardData();
    } catch (error) {
      console.error('Failed to revoke key:', error);
    }
  };

  const deleteAdmin = async (adminId: string) => {
    if (confirm('Are you sure you want to delete this admin user?')) {
      try {
        await fetch(`/api/admin/users/${adminId}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        fetchDashboardData();
      } catch (error) {
        console.error('Failed to delete admin:', error);
      }
    }
  };

  const exportKeys = async (format: 'csv' | 'excel') => {
    try {
      const response = await fetch(`/api/admin/export-keys?format=${format}`, { credentials: 'include' });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `license-keys.${format === 'excel' ? 'xlsx' : 'csv'}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export keys:', error);
    }
  };

  // Filter and sort license keys
  const filteredKeys = licenseKeys
    .filter(key => {
      const matchesSearch = 
        key.key_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        key.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        key.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        key.customer_company?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || key.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof LicenseKey] || '';
      const bValue = b[sortBy as keyof LicenseKey] || '';
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unused':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'expired':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'revoked':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unused':
        return 'bg-blue-100 text-blue-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-yellow-100 text-yellow-800';
      case 'revoked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'keys', label: 'License Keys', icon: Key },
    { id: 'admins', label: 'Admin Users', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-[#00A8B5] mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-[#00A8B5] text-[#00A8B5]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow-sm border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Keys</p>
                  <p className="text-3xl font-bold text-[#153B6B]">{stats.totalKeys}</p>
                </div>
                <Key className="w-8 h-8 text-[#00A8B5]" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl shadow-sm border border-green-200 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-green-700 mb-1">Active Keys</p>
                  <p className="text-3xl font-bold text-green-600">{stats?.activeKeys || 0}</p>
                  <p className="text-xs text-green-600 mt-1">Currently in use</p>
                </div>
                <div className="p-3 bg-green-600 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-teal-50 to-cyan-100 p-6 rounded-xl shadow-sm border border-teal-200 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-teal-700 mb-1">Total Downloads</p>
                  <p className="text-3xl font-bold text-[#00A8B5]">{stats?.totalDownloads || 0}</p>
                  <p className="text-xs text-teal-600 mt-1">Software installs</p>
                </div>
                <div className="p-3 bg-[#00A8B5] rounded-lg">
                  <Download className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-yellow-50 to-amber-100 p-6 rounded-xl shadow-sm border border-yellow-200 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-yellow-700 mb-1">This Month</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats?.monthlyDownloads || 0}</p>
                  <p className="text-xs text-yellow-600 mt-1">Recent activity</p>
                </div>
                <div className="p-3 bg-yellow-600 rounded-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-[#153B6B] mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowKeyModal(true)}
                className="flex items-center gap-2 bg-[#00A8B5] text-white px-4 py-2 rounded-lg hover:bg-[#008c97] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Generate Keys
              </button>
              <button
                onClick={() => setShowAdminModal(true)}
                className="flex items-center gap-2 bg-[#153B6B] text-white px-4 py-2 rounded-lg hover:bg-[#0f2a4d] transition-colors"
              >
                <Users className="w-4 h-4" />
                Add Admin
              </button>
              <button
                onClick={() => exportKeys('csv')}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <button
                onClick={fetchDashboardData}
                className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      )}

      {/* License Keys Tab */}
      {activeTab === 'keys' && (
        <div className="space-y-6">
          {/* Search and Filter Bar */}
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search keys, customers, emails..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent w-full"
                  />
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="unused">Unused</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="revoked">Revoked</option>
                </select>

                <select
                  value={`${sortBy}_${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('_');
                    setSortBy(field);
                    setSortOrder(order as 'asc' | 'desc');
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                >
                  <option value="created_at_desc">Newest First</option>
                  <option value="created_at_asc">Oldest First</option>
                  <option value="key_code_asc">Key A-Z</option>
                  <option value="key_code_desc">Key Z-A</option>
                  <option value="customer_name_asc">Customer A-Z</option>
                  <option value="download_count_desc">Most Downloads</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowKeyModal(true)}
                  className="flex items-center gap-2 bg-[#00A8B5] text-white px-4 py-2 rounded-lg hover:bg-[#008c97] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Generate Keys
                </button>
                <button
                  onClick={() => exportKeys('csv')}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* License Keys Table */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-[#153B6B]">
                License Keys ({filteredKeys.length})
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      License Key
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Downloads
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredKeys.map((key) => (
                    <tr key={key.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(key.status)}
                          <span className="ml-2 font-mono text-sm text-gray-900">
                            {key.key_code}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(key.status)}`}>
                          {key.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {key.customer_name || key.customer_email || '—'}
                        </div>
                        {key.customer_company && (
                          <div className="text-sm text-gray-500">{key.customer_company}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {key.download_count}/{key.max_downloads}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(key.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedKey(key)}
                            className="text-[#00A8B5] hover:text-[#008c97]"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {key.status !== 'revoked' && (
                            <button
                              onClick={() => revokeKey(key.key_code)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Admin Users Tab */}
      {activeTab === 'admins' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-[#153B6B]">Admin Users</h3>
            <button
              onClick={() => setShowAdminModal(true)}
              className="flex items-center gap-2 bg-[#00A8B5] text-white px-4 py-2 rounded-lg hover:bg-[#008c97] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Admin
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {adminUsers.map((admin) => (
                  <tr key={admin.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-[#00A8B5] flex items-center justify-center text-white font-semibold">
                          {admin.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{admin.username}</div>
                          <div className="text-sm text-gray-500">{admin.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        admin.role === 'super_admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        admin.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {admin.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {admin.last_login ? new Date(admin.last_login).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedAdmin(admin)}
                          className="text-[#00A8B5] hover:text-[#008c97]"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteAdmin(admin.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <AdminAnalytics />
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <EnterpriseSettingsPanel />
      )}

      {/* Generate Keys Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Generate License Keys</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Keys
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={keyGenForm.count}
                  onChange={(e) => setKeyGenForm({ ...keyGenForm, count: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Downloads per Key
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={keyGenForm.max_downloads}
                  onChange={(e) => setKeyGenForm({ ...keyGenForm, max_downloads: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name (Optional)
                </label>
                <input
                  type="text"
                  value={keyGenForm.customer_name}
                  onChange={(e) => setKeyGenForm({ ...keyGenForm, customer_name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Email (Optional)
                </label>
                <input
                  type="email"
                  value={keyGenForm.customer_email}
                  onChange={(e) => setKeyGenForm({ ...keyGenForm, customer_email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  value={keyGenForm.customer_company}
                  onChange={(e) => setKeyGenForm({ ...keyGenForm, customer_company: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiration Date (Optional)
                </label>
                <input
                  type="date"
                  value={keyGenForm.expires_at}
                  onChange={(e) => setKeyGenForm({ ...keyGenForm, expires_at: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={generateKeys}
                className="px-4 py-2 bg-[#00A8B5] text-white rounded-lg hover:bg-[#008c97]"
              >
                Generate Keys
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Admin Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create Admin User</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={adminForm.username}
                  onChange={(e) => setAdminForm({ ...adminForm, username: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={adminForm.email}
                  onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={adminForm.password}
                  onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={adminForm.role}
                  onChange={(e) => setAdminForm({ ...adminForm, role: e.target.value as 'admin' | 'super_admin' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                >
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAdminModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={createAdmin}
                className="px-4 py-2 bg-[#00A8B5] text-white rounded-lg hover:bg-[#008c97]"
              >
                Create Admin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Key Details Modal */}
      {selectedKey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#153B6B]">License Key Details</h2>
                <button
                  onClick={() => setSelectedKey(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Key Code</label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm">
                    {selectedKey.key_code}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <div className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    selectedKey.status === 'active' ? 'bg-green-100 text-green-800' :
                    selectedKey.status === 'revoked' ? 'bg-red-100 text-red-800' :
                    selectedKey.status === 'expired' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedKey.status.charAt(0).toUpperCase() + selectedKey.status.slice(1)}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Downloads</label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                    {selectedKey.download_count} / {selectedKey.max_downloads}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Created</label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                    {new Date(selectedKey.created_at).toLocaleString()}
                  </div>
                </div>
                
                {selectedKey.customer_name && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                    <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                      {selectedKey.customer_name}
                    </div>
                  </div>
                )}
                
                {selectedKey.customer_email && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer Email</label>
                    <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                      {selectedKey.customer_email}
                    </div>
                  </div>
                )}
                
                {selectedKey.customer_company && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                      {selectedKey.customer_company}
                    </div>
                  </div>
                )}
                
                {selectedKey.expires_at && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expires</label>
                    <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                      {new Date(selectedKey.expires_at).toLocaleString()}
                    </div>
                  </div>
                )}
                
                {selectedKey.last_used && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Used</label>
                    <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                      {new Date(selectedKey.last_used).toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  onClick={() => setSelectedKey(null)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                {selectedKey.status !== 'revoked' && (
                  <button
                    onClick={() => {
                      revokeKey(selectedKey.key_code);
                      setSelectedKey(null);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Revoke Key
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin User Edit Modal */}
      {selectedAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#153B6B] flex items-center gap-2">
                  <UserCog className="w-6 h-6" />
                  Edit Admin User
                </h2>
                <button
                  onClick={() => setSelectedAdmin(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <form onSubmit={(e) => handleAdminUserSave(e, parseInt(selectedAdmin.id))}>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      name="username"
                      defaultValue={selectedAdmin.username}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={selectedAdmin.email || ''}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <select
                      name="role"
                      defaultValue={selectedAdmin.role}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                    >
                      <option value="admin">Admin</option>
                      <option value="super_admin">Super Admin</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-3 pt-6">
                    <input
                      type="checkbox"
                      id="isActive"
                      name="isActive"
                      defaultChecked={selectedAdmin.is_active}
                      className="rounded border-gray-300 text-[#00A8B5] focus:ring-[#00A8B5]"
                    />
                    <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                      Active User
                    </label>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Change Password
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Leave blank to keep current"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm new password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Password must be at least 6 characters long. Leave blank to keep current password.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Account Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Created:</span> {new Date(selectedAdmin.created_at).toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Last Login:</span> {
                        selectedAdmin.last_login 
                          ? new Date(selectedAdmin.last_login).toLocaleString() 
                          : 'Never'
                      }
                    </div>
                    <div>
                      <span className="font-medium">Status:</span> 
                      <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                        selectedAdmin.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedAdmin.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedAdmin(null)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-gradient-to-r from-[#153B6B] to-blue-700 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}