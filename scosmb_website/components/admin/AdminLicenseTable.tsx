"use client";
import React, { useEffect, useState } from 'react';
import { Search, Eye, Trash2, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface LicenseRow {
  id: string;
  key_code: string;
  status: string;
  download_count: number;
  max_downloads: number;
  customer_email?: string;
  customer_name?: string;
  customer_company?: string;
  created_at: string;
  expires_at?: string;
}

export function AdminLicenseTable() {
  const [rows, setRows] = useState<LicenseRow[]>([]);
  const [filteredRows, setFilteredRows] = useState<LicenseRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const res = await fetch('/api/licenses/list');
        const data = await res.json();
        if (!cancelled) {
          setRows(data.items || []);
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to load licenses:', error);
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  // Filter and sort rows
  useEffect(() => {
    const filtered = rows.filter(row => {
      const matchesSearch = 
        row.key_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.customer_company?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || row.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      const aValue = a[sortBy as keyof LicenseRow] || '';
      const bValue = b[sortBy as keyof LicenseRow] || '';
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredRows(filtered);
  }, [rows, searchTerm, statusFilter, sortBy, sortOrder]);

  async function revoke(key: string) {
    try {
      await fetch('/api/licenses/revoke', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }) 
      });
      // Reload licenses after revocation
      const res = await fetch('/api/licenses/list');
      const data = await res.json();
      setRows(data.items || []);
    } catch (error) {
      console.error('Failed to revoke license:', error);
    }
  }

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#00A8B5] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading licenses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50 p-4 rounded-lg">
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

        <div className="text-sm text-gray-600">
          Showing {filteredRows.length} of {rows.length} keys
        </div>
      </div>

      {/* License Keys Table */}
      <div className="overflow-auto rounded-lg border border-gray-200 bg-white">
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
            {filteredRows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  {rows.length === 0 ? 'No license keys found' : 'No keys match your search criteria'}
                </td>
              </tr>
            ) : (
              filteredRows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(row.status)}
                      <span className="ml-2 font-mono text-sm text-gray-900">
                        {row.key_code}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {row.customer_name || row.customer_email || '—'}
                    </div>
                    {row.customer_company && (
                      <div className="text-sm text-gray-500">{row.customer_company}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {row.download_count}/{row.max_downloads}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-[#00A8B5] h-2 rounded-full" 
                        style={{ width: `${(row.download_count / row.max_downloads) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(row.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        title="View Details"
                        className="text-[#00A8B5] hover:text-[#008c97] p-1"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {row.status !== 'revoked' && (
                        <button
                          onClick={() => revoke(row.key_code)}
                          title="Revoke License"
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
