import { Metadata } from 'next'
import Link from 'next/link'
import { Building, Users, Server, Shield, Network, Database, Settings, Zap } from 'lucide-react'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = {
  title: 'Enterprise Deployment - SCO SMB Documentation',
  description: 'Complete enterprise deployment guide for SCO SMB including multi-site setup, Active Directory integration, and centralized management.',
}

export default function EnterpriseDeploymentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <PageHeader
        title="<span class='text-[#00A8B5]'>Enterprise</span> Deployment"
        subtitle="Complete enterprise deployment guide for SCO SMB including multi-site setup, Active Directory integration, and centralized management."
        icon="Building"
        backLink={{
          href: "/docs",
          label: "Back to Documentation"
        }}
        badges={[
          "Enterprise Ready",
          "Scalable",
          "Corporate"
        ]}
      />

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">

        {/* Enterprise Overview */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <Building className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Enterprise Features</h3>
              <p className="mt-1 text-sm text-blue-700">
                SCO SMB Enterprise supports centralized configuration, Active Directory integration, and distributed deployment across multiple locations.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Deployment Architecture */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enterprise Architecture Overview</h2>
              <div className="space-y-6">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Deployment Models</h3>
                  <p className="text-gray-600 text-sm">
                    Choose the deployment model that best fits your organization's structure, 
                    security requirements, and operational needs.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                      <Server className="w-5 h-5 mr-2" />
                      Centralized Model
                    </h4>
                    <div className="space-y-2 text-green-700 text-sm">
                      <div><strong>Architecture:</strong> Single SCO SMB server for entire organization</div>
                      <div><strong>Best For:</strong> Small to medium enterprises (up to 100 printers)</div>
                      <div><strong>Benefits:</strong></div>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Simplified management and configuration</li>
                        <li>Centralized file storage and processing</li>
                        <li>Lower infrastructure costs</li>
                        <li>Unified reporting and analytics</li>
                      </ul>
                      <div><strong>Considerations:</strong></div>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Single point of failure</li>
                        <li>Network bandwidth requirements</li>
                        <li>Potential latency for remote sites</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                      <Network className="w-5 h-5 mr-2" />
                      Distributed Model
                    </h4>
                    <div className="space-y-2 text-blue-700 text-sm">
                      <div><strong>Architecture:</strong> Multiple SCO SMB instances across locations</div>
                      <div><strong>Best For:</strong> Large enterprises with multiple sites</div>
                      <div><strong>Benefits:</strong></div>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>High availability and fault tolerance</li>
                        <li>Reduced network traffic and latency</li>
                        <li>Site-specific configuration flexibility</li>
                        <li>Better performance for local users</li>
                      </ul>
                      <div><strong>Considerations:</strong></div>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>More complex management</li>
                        <li>Higher infrastructure costs</li>
                        <li>Data synchronization challenges</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                  <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                    <Database className="w-5 h-5 mr-2 text-purple-600" />
                    Hybrid Model
                  </h4>
                  <div className="space-y-2 text-purple-700 text-sm">
                    <div><strong>Architecture:</strong> Regional servers with central management</div>
                    <div><strong>Best For:</strong> Global enterprises with regional offices</div>
                    <div><strong>Implementation:</strong></div>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Regional SCO SMB servers for processing</li>
                      <li>Central management console for configuration</li>
                      <li>Automated data synchronization between regions</li>
                      <li>Failover capabilities between regional servers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Active Directory Integration */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Users className="w-6 h-6 mr-2 text-green-600" />
                Active Directory Integration
              </h2>
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">Enterprise Authentication</h3>
                  <p className="text-green-700 text-sm">
                    Integrate SCO SMB with your existing Active Directory infrastructure for centralized 
                    user management, authentication, and security policy enforcement.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">LDAP Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Connection Settings</h4>
                      <div className="bg-gray-50 border border-gray-200 rounded p-3">
                        <div className="text-sm space-y-2">
                          <div><strong>LDAP Server:</strong> dc01.company.com:389 (or 636 for LDAPS)</div>
                          <div><strong>Base DN:</strong> DC=company,DC=com</div>
                          <div><strong>Bind DN:</strong> CN=SCO-SMB Service,OU=Service Accounts,DC=company,DC=com</div>
                          <div><strong>User Search Base:</strong> OU=Users,DC=company,DC=com</div>
                          <div><strong>Group Search Base:</strong> OU=Groups,DC=company,DC=com</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">User Attribute Mapping</h4>
                      <div className="bg-gray-50 border border-gray-200 rounded p-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <div><strong>Username:</strong> sAMAccountName</div>
                            <div><strong>Full Name:</strong> displayName</div>
                            <div><strong>Email:</strong> mail</div>
                            <div><strong>Department:</strong> department</div>
                          </div>
                          <div>
                            <div><strong>Office:</strong> physicalDeliveryOfficeName</div>
                            <div><strong>Phone:</strong> telephoneNumber</div>
                            <div><strong>Manager:</strong> manager</div>
                            <div><strong>Groups:</strong> memberOf</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Group-Based Access Control</h3>
                  <div className="space-y-3">
                    <div className="bg-blue-50 border border-blue-200 rounded p-3">
                      <h4 className="font-medium text-blue-800 mb-2">Security Group Configuration</h4>
                      <div className="text-blue-700 text-sm space-y-2">
                        <div><strong>SCO-SMB-Administrators:</strong> Full administrative access</div>
                        <div><strong>SCO-SMB-PowerUsers:</strong> Advanced features and configuration</div>
                        <div><strong>SCO-SMB-Users:</strong> Standard scanning and file access</div>
                        <div><strong>SCO-SMB-ReadOnly:</strong> View-only access to files</div>
                        <div><strong>Department-Specific Groups:</strong> HR-Scanners, Finance-Scanners, etc.</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Permission Matrix</h4>
                      <div className="bg-gray-50 border border-gray-200 rounded p-3">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left p-2">Security Group</th>
                                <th className="text-left p-2">Upload</th>
                                <th className="text-left p-2">Download</th>
                                <th className="text-left p-2">Delete</th>
                                <th className="text-left p-2">Configure</th>
                                <th className="text-left p-2">Admin</th>
                              </tr>
                            </thead>
                            <tbody className="text-xs">
                              <tr className="border-b">
                                <td className="p-2 font-medium">SCO-SMB-ReadOnly</td>
                                <td className="p-2">❌</td>
                                <td className="p-2">✅</td>
                                <td className="p-2">❌</td>
                                <td className="p-2">❌</td>
                                <td className="p-2">❌</td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-2 font-medium">SCO-SMB-Users</td>
                                <td className="p-2">✅</td>
                                <td className="p-2">✅</td>
                                <td className="p-2">✅ (own)</td>
                                <td className="p-2">❌</td>
                                <td className="p-2">❌</td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-2 font-medium">SCO-SMB-PowerUsers</td>
                                <td className="p-2">✅</td>
                                <td className="p-2">✅</td>
                                <td className="p-2">✅</td>
                                <td className="p-2">✅ (limited)</td>
                                <td className="p-2">❌</td>
                              </tr>
                              <tr>
                                <td className="p-2 font-medium">SCO-SMB-Administrators</td>
                                <td className="p-2">✅</td>
                                <td className="p-2">✅</td>
                                <td className="p-2">✅</td>
                                <td className="p-2">✅</td>
                                <td className="p-2">✅</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Single Sign-On (SSO) Integration</h3>
                  <div className="space-y-3">
                    <div className="bg-purple-50 border border-purple-200 rounded p-3">
                      <h4 className="font-medium text-purple-800 mb-2">Supported SSO Protocols</h4>
                      <ul className="text-purple-700 text-sm space-y-1">
                        <li>• <strong>SAML 2.0:</strong> Enterprise SSO with ADFS, Azure AD, Okta</li>
                        <li>• <strong>OAuth 2.0:</strong> Modern authentication with Microsoft 365</li>
                        <li>• <strong>OpenID Connect:</strong> Identity layer for secure authentication</li>
                        <li>• <strong>Kerberos:</strong> Windows integrated authentication</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">SSO Configuration Example (SAML)</h4>
                      <div className="bg-gray-800 text-green-400 rounded p-3 font-mono text-sm">
                        <div># SAML Configuration</div>
                        <div>SSO_Provider: "ADFS"</div>
                        <div>Entity_ID: "https://company.com/sco-smb"</div>
                        <div>SSO_URL: "https://adfs.company.com/adfs/ls/"</div>
                        <div>Certificate: "/path/to/adfs-signing.crt"</div>
                        <div>Attribute_Mapping:</div>
                        <div>&nbsp;&nbsp;Username: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"</div>
                        <div>&nbsp;&nbsp;Email: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"</div>
                        <div>&nbsp;&nbsp;Groups: "http://schemas.microsoft.com/ws/2008/06/identity/claims/groups"</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Centralized Management */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Settings className="w-6 h-6 mr-2 text-orange-600" />
                Centralized Management Console
              </h2>
              <div className="space-y-6">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="font-semibold text-orange-800 mb-2">Management Platform</h3>
                  <p className="text-orange-700 text-sm">
                    Web-based management console for configuring and monitoring multiple SCO SMB instances 
                    across your enterprise from a single interface.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Configuration Management</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white border border-gray-200 rounded p-4">
                        <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                          <Database className="w-4 h-4 mr-2 text-blue-600" />
                          Configuration Templates
                        </h4>
                        <ul className="text-gray-600 text-sm space-y-1">
                          <li>• Pre-defined configuration sets</li>
                          <li>• Department-specific templates</li>
                          <li>• Location-based configurations</li>
                          <li>• Compliance policy templates</li>
                        </ul>
                      </div>
                      <div className="bg-white border border-gray-200 rounded p-4">
                        <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                          <Zap className="w-4 h-4 mr-2 text-purple-600" />
                          Mass Deployment
                        </h4>
                        <ul className="text-gray-600 text-sm space-y-1">
                          <li>• Push configurations to multiple servers</li>
                          <li>• Scheduled deployment windows</li>
                          <li>• Rollback capabilities</li>
                          <li>• Change approval workflows</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Policy Enforcement</h4>
                      <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                        <div className="text-yellow-800 text-sm space-y-2">
                          <div><strong>Security Policies:</strong></div>
                          <ul className="list-disc list-inside ml-4 text-yellow-700">
                            <li>Enforce minimum password complexity</li>
                            <li>Mandatory encryption for sensitive documents</li>
                            <li>IP whitelist compliance across all locations</li>
                            <li>Audit logging requirements</li>
                          </ul>
                          <div><strong>Operational Policies:</strong></div>
                          <ul className="list-disc list-inside ml-4 text-yellow-700">
                            <li>Standardized file naming conventions</li>
                            <li>Consistent backup and retention schedules</li>
                            <li>Uniform network port configurations</li>
                            <li>Centralized update management</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-teal-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Monitoring & Analytics</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-teal-50 border border-teal-200 rounded p-3">
                        <h4 className="font-medium text-teal-800 mb-2">Real-Time Monitoring</h4>
                        <ul className="text-teal-700 text-sm space-y-1">
                          <li>• Server health status</li>
                          <li>• Active connection counts</li>
                          <li>• Processing queue lengths</li>
                          <li>• Error rates and alerts</li>
                        </ul>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded p-3">
                        <h4 className="font-medium text-blue-800 mb-2">Usage Analytics</h4>
                        <ul className="text-blue-700 text-sm space-y-1">
                          <li>• Document volume trends</li>
                          <li>• User activity patterns</li>
                          <li>• Printer utilization stats</li>
                          <li>• Performance metrics</li>
                        </ul>
                      </div>
                      <div className="bg-purple-50 border border-purple-200 rounded p-3">
                        <h4 className="font-medium text-purple-800 mb-2">Compliance Reporting</h4>
                        <ul className="text-purple-700 text-sm space-y-1">
                          <li>• Audit trail summaries</li>
                          <li>• Security incident reports</li>
                          <li>• Data retention compliance</li>
                          <li>• Access control reviews</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Dashboard Features</h4>
                      <div className="bg-gray-50 border border-gray-200 rounded p-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <div><strong>Executive Summary:</strong></div>
                            <ul className="list-disc list-inside text-gray-600 mt-1">
                              <li>Organization-wide scan volumes</li>
                              <li>Cost per document processed</li>
                              <li>ROI and efficiency metrics</li>
                              <li>Uptime and availability stats</li>
                            </ul>
                          </div>
                          <div>
                            <div><strong>Operational Details:</strong></div>
                            <ul className="list-disc list-inside text-gray-600 mt-1">
                              <li>Site-by-site performance breakdown</li>
                              <li>Individual server status</li>
                              <li>Network utilization graphs</li>
                              <li>Error logs and troubleshooting</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Multi-Site Deployment */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Network className="w-6 h-6 mr-2 text-indigo-600" />
                Multi-Site Deployment Strategy
              </h2>
              <div className="space-y-6">
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <h3 className="font-semibold text-indigo-800 mb-2">Scalable Architecture</h3>
                  <p className="text-indigo-700 text-sm">
                    Deploy SCO SMB across multiple locations with consistent configuration, 
                    centralized management, and optimized data flow between sites.
                  </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Site Hierarchy Design</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Organizational Structure</h4>
                      <div className="bg-gray-50 border border-gray-200 rounded p-3">
                        <div className="text-sm">
                          <div className="font-mono text-xs bg-gray-800 text-green-400 p-3 rounded">
                            Corporate Headquarters (Primary)<br/>
                            ├── North America Region<br/>
                            │   ├── New York Office (100 users)<br/>
                            │   ├── Chicago Office (75 users)<br/>
                            │   └── Los Angeles Office (150 users)<br/>
                            ├── Europe Region<br/>
                            │   ├── London Office (200 users)<br/>
                            │   ├── Frankfurt Office (80 users)<br/>
                            │   └── Amsterdam Office (60 users)<br/>
                            └── Asia-Pacific Region<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;├── Tokyo Office (120 users)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;├── Singapore Office (90 users)<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;└── Sydney Office (70 users)
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Server Placement Strategy</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-50 border border-green-200 rounded p-3">
                          <h5 className="font-medium text-green-800 mb-2">Regional Servers</h5>
                          <ul className="text-green-700 text-sm space-y-1">
                            <li>• One server per major region</li>
                            <li>• Handle 200-500 users each</li>
                            <li>• Local data processing and storage</li>
                            <li>• Redundant internet connections</li>
                          </ul>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded p-3">
                          <h5 className="font-medium text-blue-800 mb-2">Branch Offices</h5>
                          <ul className="text-blue-700 text-sm space-y-1">
                            <li>• Connect to nearest regional server</li>
                            <li>• Local caching for performance</li>
                            <li>• Backup connectivity options</li>
                            <li>• Minimal local infrastructure</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Data Synchronization</h3>
                  <div className="space-y-3">
                    <div className="bg-purple-50 border border-purple-200 rounded p-3">
                      <h4 className="font-medium text-purple-800 mb-2">Synchronization Methods</h4>
                      <div className="text-purple-700 text-sm space-y-2">
                        <div><strong>Configuration Sync:</strong> Real-time policy and setting distribution</div>
                        <div><strong>User Directory Sync:</strong> Periodic Active Directory synchronization</div>
                        <div><strong>Document Archive:</strong> Scheduled backup to central repository</div>
                        <div><strong>Audit Log Consolidation:</strong> Centralized compliance reporting</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Bandwidth Optimization</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-white border border-gray-200 rounded p-3">
                          <div className="font-medium text-gray-800 mb-1">Compression Techniques</div>
                          <ul className="text-gray-600 text-sm space-y-1">
                            <li>• Document compression before transfer</li>
                            <li>• Delta synchronization for configs</li>
                            <li>• Incremental backup strategies</li>
                          </ul>
                        </div>
                        <div className="bg-white border border-gray-200 rounded p-3">
                          <div className="font-medium text-gray-800 mb-1">Traffic Scheduling</div>
                          <ul className="text-gray-600 text-sm space-y-1">
                            <li>• Off-peak hour synchronization</li>
                            <li>• QoS prioritization for critical data</li>
                            <li>• Bandwidth throttling controls</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Disaster Recovery & Business Continuity</h3>
                  <div className="space-y-3">
                    <div className="bg-red-50 border border-red-200 rounded p-3">
                      <h4 className="font-medium text-red-800 mb-2">High Availability Design</h4>
                      <div className="text-red-700 text-sm space-y-1">
                        <div>• <strong>Active-Passive Clustering:</strong> Hot standby servers ready for failover</div>
                        <div>• <strong>Load Balancing:</strong> Distribute traffic across multiple servers</div>
                        <div>• <strong>Geographic Redundancy:</strong> Mirror critical services across regions</div>
                        <div>• <strong>Automated Failover:</strong> Sub-60 second recovery times</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Backup Strategy</h4>
                      <div className="bg-gray-50 border border-gray-200 rounded p-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                          <div>
                            <div className="font-medium text-gray-800">Local Backups</div>
                            <div className="text-gray-600">Daily incremental, Weekly full</div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">Regional Backups</div>
                            <div className="text-gray-600">Weekly cross-site replication</div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">Cloud Backups</div>
                            <div className="text-gray-600">Monthly archive to cloud storage</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Security Architecture */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-red-600" />
                Enterprise Security Architecture
              </h2>
              <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">Defense in Depth</h3>
                  <p className="text-red-700 text-sm">
                    Multi-layered security approach protecting data in transit, at rest, and during processing 
                    with enterprise-grade security controls and compliance features.
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Network Security</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-red-50 border border-red-200 rounded p-3">
                        <h4 className="font-medium text-red-800 mb-2">Perimeter Security</h4>
                        <ul className="text-red-700 text-sm space-y-1">
                          <li>• Enterprise firewall integration</li>
                          <li>• VPN-only access for remote sites</li>
                          <li>• DDoS protection and rate limiting</li>
                          <li>• Network intrusion detection</li>
                        </ul>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded p-3">
                        <h4 className="font-medium text-blue-800 mb-2">Internal Security</h4>
                        <ul className="text-blue-700 text-sm space-y-1">
                          <li>• VLAN segmentation for printer networks</li>
                          <li>• Network access control (NAC)</li>
                          <li>• Certificate-based device authentication</li>
                          <li>• Encrypted communication channels</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Security Monitoring</h4>
                      <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                        <div className="text-yellow-800 text-sm space-y-1">
                          <div>• <strong>SIEM Integration:</strong> Real-time security event correlation</div>
                          <div>• <strong>Threat Intelligence:</strong> Automated threat detection and response</div>
                          <div>• <strong>Behavioral Analytics:</strong> Anomaly detection for user activities</div>
                          <div>• <strong>Incident Response:</strong> Automated containment and escalation</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Compliance & Governance</h3>
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded p-3">
                      <h4 className="font-medium text-green-800 mb-2">Regulatory Compliance</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div><strong>HIPAA Compliance:</strong></div>
                          <ul className="list-disc list-inside text-green-700 mt-1">
                            <li>Encrypted PHI transmission</li>
                            <li>Access logging and audit trails</li>
                            <li>Business Associate Agreements</li>
                            <li>Breach notification procedures</li>
                          </ul>
                        </div>
                        <div>
                          <div><strong>SOX Compliance:</strong></div>
                          <ul className="list-disc list-inside text-green-700 mt-1">
                            <li>Financial document controls</li>
                            <li>Change management procedures</li>
                            <li>Internal control documentation</li>
                            <li>Independent audit support</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Data Governance</h4>
                      <div className="bg-gray-50 border border-gray-200 rounded p-3">
                        <div className="text-sm space-y-2">
                          <div><strong>Data Classification:</strong> Automatic classification of sensitive documents</div>
                          <div><strong>Retention Policies:</strong> Automated lifecycle management based on document type</div>
                          <div><strong>Data Loss Prevention:</strong> Content scanning and policy enforcement</div>
                          <div><strong>Privacy Controls:</strong> GDPR-compliant data handling and user rights</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Deployment Checklist</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium text-gray-800">1. Architecture Planning</div>
                  <div className="text-gray-600">Choose deployment model</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">2. Active Directory Setup</div>
                  <div className="text-gray-600">Configure LDAP integration</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">3. Network Configuration</div>
                  <div className="text-gray-600">Firewall and VPN setup</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">4. Security Implementation</div>
                  <div className="text-gray-600">Encryption and access controls</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">5. Testing & Validation</div>
                  <div className="text-gray-600">End-to-end functionality testing</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sizing Guidelines</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium text-gray-800">Small Enterprise</div>
                  <div className="text-gray-600">50-100 users, 1 server</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Medium Enterprise</div>
                  <div className="text-gray-600">100-500 users, 2-3 servers</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Large Enterprise</div>
                  <div className="text-gray-600">500+ users, regional deployment</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Global Enterprise</div>
                  <div className="text-gray-600">Multi-site, hybrid architecture</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Related Guides</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/docs/network/security" className="text-blue-600 hover:text-blue-800 block">
                    Network Security →
                  </Link>
                </li>
                <li>
                  <Link href="/docs/advanced/features" className="text-blue-600 hover:text-blue-800 block">
                    Advanced Features →
                  </Link>
                </li>
                <li>
                  <Link href="/docs/troubleshooting/network-issues" className="text-blue-600 hover:text-blue-800 block">
                    Network Troubleshooting →
                  </Link>
                </li>
                <li>
                  <Link href="/docs/backup-recovery" className="text-blue-600 hover:text-blue-800 block">
                    Backup & Recovery →
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Enterprise Support</h3>
              <p className="text-gray-600 text-sm mb-4">
                Planning an enterprise deployment? Our team provides architecture consulting, implementation support, and ongoing management services.
              </p>
              <div className="space-y-2">
                <a href="mailto:enterprise@southcoastoffice.com" className="block text-blue-600 hover:text-blue-800 text-sm">
                  enterprise@southcoastoffice.com
                </a>
                <Link href="/support" className="block text-blue-600 hover:text-blue-800 text-sm">
                  Contact Enterprise Sales →
                </Link>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  )
}