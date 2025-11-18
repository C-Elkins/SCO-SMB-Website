'use client';

import { motion } from 'framer-motion';
import { Building2, Shield, FileText, Lock, CheckCircle, AlertTriangle, Users, Database } from 'lucide-react';
import Link from 'next/link';

export default function FinancialServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#153B6B] via-[#1e4a7f] to-[#00A8B5] text-white pt-32 pb-8">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl mb-6">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Financial Services Setup
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Secure document scanning solutions for banks, credit unions, and financial institutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom max-w-4xl">
          
          {/* Compliance Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Financial Industry Compliance</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Key Regulations */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Regulatory Requirements</h3>
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-red-900 mb-1">SOX Compliance</h4>
                        <p className="text-red-800 text-sm">Sarbanes-Oxley Act requires secure financial document handling and audit trails</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-1">GLBA Requirements</h4>
                        <p className="text-blue-800 text-sm">Gramm-Leach-Bliley Act mandates customer data protection and privacy</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-green-900 mb-1">FFIEC Guidelines</h4>
                        <p className="text-green-800 text-sm">Federal Financial Institutions Examination Council security standards</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">SCO SMB Security Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">End-to-end encrypted file transfers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Active Directory integration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Comprehensive audit logging</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Role-based access controls</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Secure folder permissions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Document retention policies</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-2">Compliance Note</h3>
                  <p className="text-yellow-800 text-sm">
                    This guide provides general security recommendations. Financial institutions should consult 
                    with their compliance officers and legal teams to ensure all specific regulatory requirements are met.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Network Security Configuration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Network Security Configuration</h2>
            
            <div className="space-y-8">
              {/* Network Segmentation */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Network Segmentation Strategy</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Recommended Network Architecture:</h4>
                      <div className="space-y-3 text-sm">
                        <div className="bg-blue-100 border border-blue-300 rounded p-3">
                          <div className="font-semibold text-blue-900">DMZ Segment</div>
                          <div className="text-blue-800">Place SCO SMB server in secure DMZ</div>
                        </div>
                        <div className="bg-green-100 border border-green-300 rounded p-3">
                          <div className="font-semibold text-green-900">Internal Network</div>
                          <div className="text-green-800">Printers in protected internal VLAN</div>
                        </div>
                        <div className="bg-purple-100 border border-purple-300 rounded p-3">
                          <div className="font-semibold text-purple-900">Management Network</div>
                          <div className="text-purple-800">Separate VLAN for device management</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Firewall Rules:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="bg-black rounded p-2 text-green-400 font-mono text-xs">
                          # Allow FTP from printer subnet only
                          <br />
                          allow tcp from 192.168.100.0/24 to DMZ port 21
                        </div>
                        <div className="bg-black rounded p-2 text-green-400 font-mono text-xs">
                          # Block all other FTP access  
                          <br />
                          deny tcp from any to DMZ port 21
                        </div>
                        <div className="bg-black rounded p-2 text-green-400 font-mono text-xs">
                          # Allow management from admin subnet
                          <br />
                          allow tcp from 192.168.200.0/24 to DMZ port 22,443
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Access Controls */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Access Control Implementation</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="font-semibold text-blue-900 mb-3">Active Directory Integration</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Security Groups:</div>
                        <ul className="space-y-1 text-gray-700">
                          <li>• FinanceScanUsers - Basic scanning access</li>
                          <li>• FinanceScanAdmins - Full administrative rights</li>
                          <li>• FinanceScanAuditors - Read-only audit access</li>
                          <li>• TellerScanUsers - Branch teller access</li>
                        </ul>
                      </div>
                      
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Folder Permissions:</div>
                        <ul className="space-y-1 text-gray-700">
                          <li>• CustomerDocuments: Restricted access only</li>
                          <li>• LoanApplications: Department-specific</li>
                          <li>• Compliance: Audit team read access</li>
                          <li>• GeneralScans: Broader team access</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="font-semibold text-green-900 mb-3">Authentication Requirements</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">User Authentication:</div>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Disable anonymous FTP access</li>
                          <li>• Require domain user authentication</li>
                          <li>• Implement multi-factor authentication</li>
                          <li>• Set strong password policies</li>
                        </ul>
                      </div>
                      
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Session Management:</div>
                        <ul className="space-y-1 text-gray-700">
                          <li>• 15-minute idle timeout</li>
                          <li>• Maximum 3 failed login attempts</li>
                          <li>• Account lockout for 30 minutes</li>
                          <li>• Log all authentication events</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Document Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Document Management & Retention</h2>
            
            <div className="space-y-6">
              {/* Folder Structure */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Folder Structure</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Primary Categories:</h4>
                      <div className="space-y-2 text-sm font-mono">
                        <div>📁 /FinancialScans/</div>
                        <div className="ml-4">📁 CustomerDocuments/</div>
                        <div className="ml-8">📁 AccountOpenings/</div>
                        <div className="ml-8">📁 KYC_Documents/</div>
                        <div className="ml-8">📁 SignatureCards/</div>
                        <div className="ml-4">📁 LoanApplications/</div>
                        <div className="ml-8">📁 Personal_Loans/</div>
                        <div className="ml-8">📁 Business_Loans/</div>
                        <div className="ml-8">📁 Mortgages/</div>
                        <div className="ml-4">📁 Compliance/</div>
                        <div className="ml-8">📁 AuditDocuments/</div>
                        <div className="ml-8">📁 RegulatoryFilings/</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Naming Conventions:</h4>
                      <div className="space-y-3 text-sm">
                        <div className="bg-blue-100 border border-blue-200 rounded p-3">
                          <div className="font-semibold text-blue-900">Customer Documents:</div>
                          <div className="text-blue-800 font-mono text-xs">YYYYMMDD_CustomerID_DocType.pdf</div>
                          <div className="text-blue-700 text-xs">20240115_C123456_AccountApp.pdf</div>
                        </div>
                        
                        <div className="bg-green-100 border border-green-200 rounded p-3">
                          <div className="font-semibold text-green-900">Loan Applications:</div>
                          <div className="text-green-800 font-mono text-xs">YYYYMMDD_LoanID_AppType.pdf</div>
                          <div className="text-green-700 text-xs">20240115_L789012_PersonalLoan.pdf</div>
                        </div>
                        
                        <div className="bg-purple-100 border border-purple-200 rounded p-3">
                          <div className="font-semibold text-purple-900">Compliance Docs:</div>
                          <div className="text-purple-800 font-mono text-xs">YYYYMMDD_CompType_RefNumber.pdf</div>
                          <div className="text-purple-700 text-xs">20240115_AuditRpt_AR2024001.pdf</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Retention Policies */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Retention Policies</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h4 className="font-semibold text-yellow-900 mb-3">Regulatory Retention Requirements</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center border-b border-yellow-200 pb-2">
                        <span className="text-gray-700">Account Opening Documents</span>
                        <span className="font-semibold text-yellow-800">5 years</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-yellow-200 pb-2">
                        <span className="text-gray-700">Loan Applications</span>
                        <span className="font-semibold text-yellow-800">25 months</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-yellow-200 pb-2">
                        <span className="text-gray-700">Signature Cards</span>
                        <span className="font-semibold text-yellow-800">7 years</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-yellow-200 pb-2">
                        <span className="text-gray-700">Audit Documents</span>
                        <span className="font-semibold text-yellow-800">7 years</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">General Correspondence</span>
                        <span className="font-semibold text-yellow-800">3 years</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="font-semibold text-blue-900 mb-3">Automated Management</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Archive Process:</div>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Move documents to archive folders after 1 year</li>
                          <li>• Compress archived files to save storage</li>
                          <li>• Maintain read-only access for compliance</li>
                          <li>• Generate retention reports monthly</li>
                        </ul>
                      </div>
                      
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Disposal Process:</div>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Automated alerts before retention expiry</li>
                          <li>• Secure deletion with certificate</li>
                          <li>• Log all disposal activities</li>
                          <li>• Annual retention policy review</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Audit & Monitoring */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Audit Trail & Monitoring</h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Audit Logging */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Comprehensive Audit Logging</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Events to Log:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">User authentication attempts</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">Document uploads and downloads</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">File access and modifications</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">Permission changes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">System configuration changes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">Failed access attempts</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Monitoring Alerts */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-time Monitoring</h3>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-red-900 mb-2">Critical Alerts:</h4>
                    <div className="space-y-1 text-red-800 text-sm">
                      <div>• Multiple failed login attempts</div>
                      <div>• Unauthorized access attempts</div>
                      <div>• Large file transfers outside hours</div>
                      <div>• System service failures</div>
                      <div>• Disk space critically low</div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Reporting Schedule:</h4>
                    <div className="space-y-1 text-blue-800 text-sm">
                      <div>• Daily: Security event summary</div>
                      <div>• Weekly: User activity report</div>
                      <div>• Monthly: Compliance status report</div>
                      <div>• Quarterly: Full audit review</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sample Audit Report */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">Sample Audit Log Entry</h3>
                <div className="bg-black rounded-lg p-4 text-green-400 font-mono text-sm">
                  <div>[2024-01-15 09:32:15] [AUDIT] User: jsmith@bank.com</div>
                  <div>[2024-01-15 09:32:15] [AUDIT] Action: Document Upload</div>
                  <div>[2024-01-15 09:32:15] [AUDIT] File: CustomerApp_C123456.pdf</div>
                  <div>[2024-01-15 09:32:15] [AUDIT] Destination: /CustomerDocuments/AccountOpenings/</div>
                  <div>[2024-01-15 09:32:15] [AUDIT] Source IP: 192.168.100.25</div>
                  <div>[2024-01-15 09:32:15] [AUDIT] Scanner: Canon-Teller-Station-3</div>
                  <div>[2024-01-15 09:32:15] [AUDIT] File Size: 2,450,672 bytes</div>
                  <div>[2024-01-15 09:32:15] [AUDIT] Transfer Time: 3.2 seconds</div>
                  <div>[2024-01-15 09:32:15] [AUDIT] Status: SUCCESS</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Implementation Checklist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-[#153B6B]/5 to-[#00A8B5]/5 rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Implementation Checklist</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Configuration</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 text-sm">Configure network segmentation and firewall rules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 text-sm">Set up Active Directory integration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 text-sm">Create security groups and assign permissions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 text-sm">Enable comprehensive audit logging</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 text-sm">Configure SSL/TLS encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 text-sm">Set up monitoring and alerting</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Management</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 text-sm">Create standardized folder structure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 text-sm">Implement file naming conventions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 text-sm">Configure retention policies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 text-sm">Set up automated archiving</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 text-sm">Test backup and recovery procedures</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 text-sm">Train staff on compliance procedures</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Professional Services Available</h3>
                    <p className="text-blue-800 text-sm">
                      Our team can assist with compliance configuration, security assessments, and staff training. 
                      Contact our professional services team for a customized implementation plan for your financial institution.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}