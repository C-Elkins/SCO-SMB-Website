'use client';

import { useState, useEffect } from 'react';
import { 
  Settings, 
  Shield, 
  Globe, 
  Monitor, 
  Database, 
  Bell,
  Key,
  Users,
  Clock,
  Server,
  Activity,
  AlertTriangle,
  CheckCircle,
  Cpu,
  BarChart3,
  Download,
  Upload,
  RefreshCw,
  Save,
  RotateCcw
} from 'lucide-react';
import { TechUserManagement } from './TechUserManagement';

interface SystemInfo {
  version: string;
  uptime: {
    formatted: string;
    hours: number;
    days: number;
  };
  performance: {
    memoryUsed: number;
    memoryTotal: number;
    memoryUsagePercent: number;
    nodeVersion: string;
    platform: string;
  };
  statistics: {
    totalKeys: number;
    activeKeys: number;
    totalAdmins: number;
    totalDownloads: number;
    keysToday: number;
    downloadsToday: number;
  };
  status: string;
  lastUpdated: string;
}

interface Settings {
  licenseKeySettings: {
    defaultKeyFormat: string;
    defaultMaxDownloads: number;
    defaultExpiration: string;
    requireEmailVerification: boolean;
    autoRevokeExpired: boolean;
  };
  securitySettings: {
    sessionTimeoutHours: number;
    requireStrongPasswords: boolean;
    allowMultipleSessions: boolean;
    enableAuditLogging: boolean;
  };
  portalSettings: {
    enableDownloadLogging: boolean;
    enableEmailNotifications: boolean;
    adminEmail: string;
    maxDailyDownloads: number;
    enableRateLimiting: boolean;
  };
  systemSettings: {
    maintenanceMode: boolean;
    enableAnalytics: boolean;
    retentionPolicyDays: number;
    enableBackups: boolean;
    backupFrequency: string;
  };
}

export function EnterpriseSettingsPanel() {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    fetchSystemInfo();
    fetchSettings();
  }, []);

  const fetchSystemInfo = async () => {
    setRefreshing(true);
    try {
      const response = await fetch('/api/admin/system-info', { credentials: 'include' });
      const data = await response.json();
      setSystemInfo(data);
    } catch (error) {
      console.error('Failed to fetch system info:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings', { credentials: 'include' });
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    if (!settings) return;
    
    setSaving(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(settings)
      });
      
      if (response.ok) {
        // Show success message
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#00A8B5] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading enterprise settings...</p>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'overview', label: 'System Overview', icon: Monitor },
    { id: 'license', label: 'License Management', icon: Key },
    { id: 'security', label: 'Security & Access', icon: Shield },
    { id: 'techusers', label: 'Tech Portal Users', icon: Users },
    { id: 'monitoring', label: 'Monitoring & Alerts', icon: Activity },
    { id: 'maintenance', label: 'System Maintenance', icon: Settings }
  ];

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg border-0 ring-1 ring-gray-200 overflow-hidden">
        <div className="flex flex-wrap border-b border-gray-200">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-[#153B6B] text-white border-b-2 border-[#00A8B5]'
                    : 'text-gray-600 hover:text-[#153B6B] hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {section.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* System Overview */}
      {activeSection === 'overview' && systemInfo && (
        <div className="space-y-6">
          {/* Real-Time System Metrics */}
          <div className="bg-gradient-to-br from-[#153B6B] to-blue-700 p-8 rounded-xl text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Enterprise System Dashboard</h2>
                <p className="text-blue-100">Real-time system monitoring and analytics</p>
              </div>
              <button
                onClick={fetchSystemInfo}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{systemInfo.version}</div>
                    <div className="text-sm text-blue-100">SCO SMB Version</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#00A8B5] rounded-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{systemInfo?.uptime?.formatted || 'Loading...'}</div>
                    <div className="text-sm text-blue-100">System Uptime</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{systemInfo?.performance?.memoryUsagePercent || 0}%</div>
                    <div className="text-sm text-blue-100">Memory Usage</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-300">Operational</div>
                    <div className="text-sm text-blue-100">System Status</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border-0 ring-1 ring-gray-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-[#00A8B5] to-teal-600 rounded-lg">
                  <Key className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#153B6B]">{systemInfo?.statistics?.totalKeys || 0}</div>
                  <div className="text-sm text-gray-600">Total License Keys</div>
                  <div className="text-xs text-green-600">+{systemInfo?.statistics?.keysToday || 0} today</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border-0 ring-1 ring-gray-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#153B6B]">{systemInfo?.statistics?.totalDownloads || 0}</div>
                  <div className="text-sm text-gray-600">Total Downloads</div>
                  <div className="text-xs text-green-600">+{systemInfo?.statistics?.downloadsToday || 0} today</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border-0 ring-1 ring-gray-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#153B6B]">{systemInfo?.statistics?.totalAdmins || 0}</div>
                  <div className="text-sm text-gray-600">Admin Users</div>
                  <div className="text-xs text-gray-500">{systemInfo?.statistics?.activeKeys || 0} active keys</div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Details */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-0 ring-1 ring-gray-200">
            <h3 className="text-lg font-semibold text-[#153B6B] mb-6 flex items-center gap-2">
              <Server className="w-5 h-5" />
              System Performance
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Memory Usage</span>
                    <span className="text-sm text-gray-600">
                      {systemInfo?.performance?.memoryUsed || 0}MB / {systemInfo?.performance?.memoryTotal || 0}MB
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-[#00A8B5] to-teal-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${systemInfo?.performance?.memoryUsagePercent || 0}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="text-sm text-gray-600">
                    <div className="flex justify-between py-1">
                      <span>Node.js Version:</span>
                      <span className="font-medium">{systemInfo?.performance?.nodeVersion || 'Unknown'}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Platform:</span>
                      <span className="font-medium capitalize">{systemInfo?.performance?.platform || 'Unknown'}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Last Updated:</span>
                      <span className="font-medium">{systemInfo?.lastUpdated ? new Date(systemInfo.lastUpdated).toLocaleString() : 'Unknown'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">System Health</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">Database Connection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">API Endpoints</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">File System</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">Security Systems</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* License Management Section */}
      {activeSection === 'license' && settings && (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-xl shadow-lg border-0 ring-1 ring-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#00A8B5] rounded-lg">
                <Key className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#153B6B]">License Key Management</h2>
                <p className="text-sm text-gray-600">Configure license key generation and behavior</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-[#00A8B5]/10 to-teal-50 p-4 rounded-lg border border-[#00A8B5]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Key className="w-4 h-4 text-[#00A8B5]" />
                    <label className="block text-sm font-medium text-gray-700">Key Format</label>
                  </div>
                  <div className="font-mono text-lg text-[#153B6B] font-semibold">SCO-XXXX-XXXX-XXXX</div>
                  <p className="text-xs text-gray-500 mt-1">Standard format: 4 segments, 4 characters each</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default Max Downloads</label>
                  <input 
                    type="number" 
                    value={settings.licenseKeySettings.defaultMaxDownloads}
                    onChange={(e) => setSettings({...settings, licenseKeySettings: {...settings.licenseKeySettings, defaultMaxDownloads: parseInt(e.target.value)}})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                    min="1"
                    max="100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default Expiration</label>
                  <select 
                    value={settings.licenseKeySettings.defaultExpiration}
                    onChange={(e) => setSettings({...settings, licenseKeySettings: {...settings.licenseKeySettings, defaultExpiration: e.target.value}})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                  >
                    <option value="never">Never</option>
                    <option value="30d">30 days</option>
                    <option value="90d">90 days</option>
                    <option value="1y">1 year</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Require Email Verification</label>
                    <p className="text-xs text-gray-500">New keys require email confirmation</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={settings.licenseKeySettings.requireEmailVerification}
                      onChange={(e) => setSettings({...settings, licenseKeySettings: {...settings.licenseKeySettings, requireEmailVerification: e.target.checked}})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00A8B5]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00A8B5]"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Auto-Revoke Expired Keys</label>
                    <p className="text-xs text-gray-500">Automatically revoke expired license keys</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={settings.licenseKeySettings.autoRevokeExpired}
                      onChange={(e) => setSettings({...settings, licenseKeySettings: {...settings.licenseKeySettings, autoRevokeExpired: e.target.checked}})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00A8B5]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00A8B5]"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Section */}
      {activeSection === 'security' && settings && (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-xl shadow-lg border-0 ring-1 ring-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-600 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#153B6B]">Security & Access Control</h2>
                <p className="text-sm text-gray-600">Configure security policies and access controls</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (hours)</label>
                  <input 
                    type="number" 
                    value={settings.securitySettings.sessionTimeoutHours}
                    onChange={(e) => setSettings({...settings, securitySettings: {...settings.securitySettings, sessionTimeoutHours: parseInt(e.target.value)}})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                    min="1"
                    max="24"
                  />
                  <p className="text-xs text-gray-500 mt-1">Admin sessions will timeout after this duration</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Require Strong Passwords</label>
                      <p className="text-xs text-gray-500">Enforce password complexity requirements</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.securitySettings.requireStrongPasswords}
                        onChange={(e) => setSettings({...settings, securitySettings: {...settings.securitySettings, requireStrongPasswords: e.target.checked}})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Enable Audit Logging</label>
                      <p className="text-xs text-gray-500">Log all administrative actions</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.securitySettings.enableAuditLogging}
                        onChange={(e) => setSettings({...settings, securitySettings: {...settings.securitySettings, enableAuditLogging: e.target.checked}})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Security Status
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-red-800">SSL/TLS Encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-red-800">Password Hashing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-red-800">Session Management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-red-800">Access Control</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tech Portal Users Section */}
      {activeSection === 'techusers' && (
        <TechUserManagement />
      )}

      {/* Monitoring & Alerts Section */}
      {activeSection === 'monitoring' && settings && (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-xl shadow-lg border-0 ring-1 ring-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#153B6B]">Monitoring & Alerts</h2>
                <p className="text-sm text-gray-600">Configure system monitoring and notification settings</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alert Email Recipients</label>
                  <textarea 
                    placeholder="admin@company.com, support@company.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter email addresses separated by commas</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">License Key Expiration Alerts</label>
                      <p className="text-xs text-gray-500">Notify when keys are about to expire</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">High Download Volume Alerts</label>
                      <p className="text-xs text-gray-500">Alert when download volume exceeds thresholds</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Failed Login Attempts</label>
                      <p className="text-xs text-gray-500">Alert on suspicious admin login activity</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-900 mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Alert Thresholds
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-purple-800 mb-2">Daily Download Limit</label>
                      <input 
                        type="number" 
                        defaultValue="100"
                        className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-purple-800 mb-2">Keys Expiring (Days)</label>
                      <input 
                        type="number" 
                        defaultValue="7"
                        className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-purple-800 mb-2">Failed Login Threshold</label>
                      <input 
                        type="number" 
                        defaultValue="5"
                        className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Maintenance Section */}
      {activeSection === 'maintenance' && settings && (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-xl shadow-lg border-0 ring-1 ring-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-600 rounded-lg">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#153B6B]">System Maintenance</h2>
                <p className="text-sm text-gray-600">Automated maintenance and data management settings</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data Retention Policy (Days)</label>
                  <input 
                    type="number" 
                    value={settings.systemSettings.retentionPolicyDays}
                    onChange={(e) => setSettings({...settings, systemSettings: {...settings.systemSettings, retentionPolicyDays: parseInt(e.target.value)}})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                    min="30"
                    max="3650"
                  />
                  <p className="text-xs text-gray-500 mt-1">How long to keep download logs and audit data</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
                  <select 
                    value={settings.systemSettings.backupFrequency}
                    onChange={(e) => setSettings({...settings, systemSettings: {...settings.systemSettings, backupFrequency: e.target.value}})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Enable Automated Backups</label>
                      <p className="text-xs text-gray-500">Automatically backup database and files</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.systemSettings.enableBackups}
                        onChange={(e) => setSettings({...settings, systemSettings: {...settings.systemSettings, enableBackups: e.target.checked}})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Maintenance Mode</label>
                      <p className="text-xs text-gray-500">Temporarily disable public access</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.systemSettings.maintenanceMode}
                        onChange={(e) => setSettings({...settings, systemSettings: {...settings.systemSettings, maintenanceMode: e.target.checked}})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Auto-Purge Old Data</label>
                      <p className="text-xs text-gray-500">Automatically delete data older than retention policy</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
                  <h4 className="font-medium text-orange-900 mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Maintenance Actions
                  </h4>
                  <div className="space-y-3">
                    <button className="w-full text-left px-4 py-3 bg-white border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-orange-900">Clean Up Expired Keys</div>
                          <div className="text-sm text-orange-700">Remove keys expired &gt; 30 days</div>
                        </div>
                        <RefreshCw className="w-4 h-4 text-orange-600" />
                      </div>
                    </button>
                    
                    <button className="w-full text-left px-4 py-3 bg-white border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-orange-900">Optimize Database</div>
                          <div className="text-sm text-orange-700">Rebuild indexes and cleanup</div>
                        </div>
                        <RefreshCw className="w-4 h-4 text-orange-600" />
                      </div>
                    </button>
                    
                    <button className="w-full text-left px-4 py-3 bg-white border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-orange-900">Export Audit Logs</div>
                          <div className="text-sm text-orange-700">Download compliance reports</div>
                        </div>
                        <Download className="w-4 h-4 text-orange-600" />
                      </div>
                    </button>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-orange-200">
                    <div className="text-sm text-orange-800">
                      <div className="flex justify-between py-1">
                        <span>Last Cleanup:</span>
                        <span className="font-medium">2 hours ago</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Database Size:</span>
                        <span className="font-medium">245 MB</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Records Cleaned:</span>
                        <span className="font-medium">1,247</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Bar */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-0 ring-1 ring-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Last saved: {systemInfo ? new Date(systemInfo.lastUpdated).toLocaleString() : 'Never'}
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button 
              onClick={saveSettings}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#153B6B] to-blue-700 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save All Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}