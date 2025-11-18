import { Metadata } from 'next'
import Link from 'next/link'
import { Heart, Users, Building, Shield, Award, CheckCircle, Clock, FileText, Stethoscope, Archive, TrendingUp, Lock, AlertCircle } from 'lucide-react'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = {
  title: 'Healthcare Industry Guide - SCO SMB Documentation',
  description: 'HIPAA-compliant document scanning solutions for healthcare providers including PHI protection, audit trails, and regulatory compliance.',
}

export default function HealthcareIndustryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <PageHeader
        title="<span class='text-[#00A8B5]'>Healthcare</span> Industry Solutions"
        subtitle="HIPAA-compliant document scanning solutions for healthcare providers including PHI protection, audit trails, and regulatory compliance."
        icon="Heart"
        backLink={{
          href: "/docs",
          label: "Back to Documentation"
        }}
        badges={[
          "PHI Protection",
          "HIPAA Compliant",
          "Audit Trail"
        ]}
      />

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">

        {/* SOX Compliance Notice */}
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <Shield className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Financial Compliance</h3>
              <p className="mt-1 text-sm text-green-700">
                SCO SMB includes SOX compliance features, audit trail capabilities, and financial document controls 
                required for accounting firms and their clients.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Accounting Document Types */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Financial Document Management</h2>
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">Accounting Firm Document Categories</h3>
                  <p className="text-green-700 text-sm">
                    Accounting practices handle diverse financial documents requiring strict controls, 
                    audit trails, and compliance with professional standards and regulatory requirements.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Client Financial Records
                    </h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Bank statements and reconciliations</li>
                      <li>• General ledger and trial balances</li>
                      <li>• Accounts receivable and payable</li>
                      <li>• Payroll records and tax documents</li>
                      <li>• Fixed asset schedules and depreciation</li>
                      <li>• Investment and securities documentation</li>
                    </ul>
                  </div>

                  <div className="border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                      <Stethoscope className="w-5 h-5 mr-2" />
                      Patient Records
                    </h4>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• Individual and corporate tax returns</li>
                      <li>• Supporting schedules and worksheets</li>
                      <li>• IRS correspondence and notices</li>
                      <li>• State and local tax filings</li>
                      <li>• Tax research and memorandums</li>
                      <li>• Extension and payment vouchers</li>
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-orange-200 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Medical Certifications
                    </h4>
                    <ul className="text-orange-700 text-sm space-y-1">
                      <li>• Audit workpapers and lead sheets</li>
                      <li>• Management letters and responses</li>
                      <li>• Internal control documentation</li>
                      <li>• Risk assessment and planning memos</li>
                      <li>• Independence confirmations</li>
                      <li>• Peer review documentation</li>
                    </ul>
                  </div>

                  <div className="border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Business Advisory Documents
                    </h4>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>• Financial statements and reports</li>
                      <li>• Budget and forecast models</li>
                      <li>• Business valuation reports</li>
                      <li>• Due diligence documentation</li>
                      <li>• Consulting engagement letters</li>
                      <li>• Management advisory services</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Accounting Industry Challenges</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-yellow-700 text-sm">
                    <div>
                      <div><strong>Regulatory Compliance:</strong></div>
                      <ul className="list-disc list-inside mt-1">
                        <li>Sarbanes-Oxley Act requirements</li>
                        <li>PCAOB auditing standards</li>
                        <li>IRS documentation rules</li>
                        <li>State CPA board regulations</li>
                      </ul>
                    </div>
                    <div>
                      <div><strong>Operational Challenges:</strong></div>
                      <ul className="list-disc list-inside mt-1">
                        <li>Seasonal workload fluctuations</li>
                        <li>Client confidentiality requirements</li>
                        <li>Version control and collaboration</li>
                        <li>Remote work and security needs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SOX Compliance Features */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-green-600" />
                SOX Compliance & Internal Controls
              </h2>
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">Sarbanes-Oxley Act Compliance</h3>
                  <p className="text-green-700 text-sm">
                    Built-in controls and audit trails ensure compliance with SOX requirements for 
                    financial reporting accuracy, internal control documentation, and corporate governance.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Section 302 & 404 Compliance</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 border border-green-200 rounded p-3">
                        <h4 className="font-medium text-green-800 mb-2">Section 302 - Disclosure Controls</h4>
                        <ul className="text-green-700 text-sm space-y-1">
                          <li>• Executive certification documentation</li>
                          <li>• Material weakness reporting</li>
                          <li>• Disclosure committee records</li>
                          <li>• Sub-certification requirements</li>
                          <li>• Quarterly assessment documentation</li>
                        </ul>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded p-3">
                        <h4 className="font-medium text-blue-800 mb-2">Section 404 - Internal Controls</h4>
                        <ul className="text-blue-700 text-sm space-y-1">
                          <li>• ICFR assessment and testing</li>
                          <li>• Process documentation and flowcharts</li>
                          <li>• Control design and effectiveness</li>
                          <li>• Deficiency identification and remediation</li>
                          <li>• Management assessment reports</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Internal Control Documentation</h4>
                      <div className="bg-gray-50 border border-gray-200 rounded p-3">
                        <div className="text-sm space-y-2">
                          <div><strong>Process Documentation:</strong></div>
                          <ul className="list-disc list-inside text-gray-600 ml-4">
                            <li>Business process narratives and flowcharts</li>
                            <li>Risk and control matrices (RCMs)</li>
                            <li>Control activity descriptions and procedures</li>
                            <li>Segregation of duties documentation</li>
                          </ul>
                          <div><strong>Testing Documentation:</strong></div>
                          <ul className="list-disc list-inside text-gray-600 ml-4">
                            <li>Test of design and operating effectiveness</li>
                            <li>Sample selection and testing results</li>
                            <li>Exception identification and follow-up</li>
                            <li>Management remediation plans</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Audit Trail & Change Management</h3>
                  <div className="space-y-3">
                    <div className="bg-blue-50 border border-blue-200 rounded p-3">
                      <h4 className="font-medium text-blue-800 mb-2">Comprehensive Audit Trails</h4>
                      <div className="text-blue-700 text-sm space-y-2">
                        <div><strong>Document Activity Logging:</strong> Complete audit trail of document access, modifications, and approvals</div>
                        <div><strong>User Authentication Records:</strong> Detailed logging of user access and authentication events</div>
                        <div><strong>System Configuration Changes:</strong> Audit trail of all system and security setting modifications</div>
                        <div><strong>Workflow Process Tracking:</strong> Complete documentation of approval workflows and decision points</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Change Control Procedures</h4>
                      <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="font-medium text-yellow-800 mb-2">Document Version Control</div>
                            <ul className="text-yellow-700 space-y-1">
                              <li>• Automated version numbering</li>
                              <li>• Check-in/check-out controls</li>
                              <li>• Version comparison tools</li>
                              <li>• Archive and restoration capabilities</li>
                            </ul>
                          </div>
                          <div>
                            <div className="font-medium text-yellow-800 mb-2">Approval Workflows</div>
                            <ul className="text-yellow-700 space-y-1">
                              <li>• Multi-level approval processes</li>
                              <li>• Role-based authorization</li>
                              <li>• Electronic signature capture</li>
                              <li>• Approval deadline monitoring</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Risk Assessment & Monitoring</h3>
                  <div className="space-y-3">
                    <div className="bg-purple-50 border border-purple-200 rounded p-3">
                      <h4 className="font-medium text-purple-800 mb-2">Automated Risk Controls</h4>
                      <div className="text-purple-700 text-sm space-y-1">
                        <div>• <strong>Access Control Monitoring:</strong> Real-time monitoring of user access patterns</div>
                        <div>• <strong>Segregation of Duties:</strong> Automated verification of role-based access controls</div>
                        <div>• <strong>Exception Reporting:</strong> Automated alerts for unusual activities or violations</div>
                        <div>• <strong>Compliance Dashboard:</strong> Real-time compliance status and metrics</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Control Testing Support</h4>
                      <div className="bg-red-50 border border-red-200 rounded p-3">
                        <div className="text-red-800 text-sm space-y-2">
                          <div><strong>Testing Automation:</strong> Automated control testing and validation procedures</div>
                          <div><strong>Sample Generation:</strong> Statistical sampling for control testing</div>
                          <div><strong>Results Documentation:</strong> Automated documentation of testing results</div>
                          <div><strong>Deficiency Tracking:</strong> Automated tracking of identified deficiencies and remediation</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Tax Season Workflow */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-orange-600" />
                Tax Season Workflow Optimization
              </h2>
              <div className="space-y-6">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="font-semibold text-orange-800 mb-2">Peak Season Management</h3>
                  <p className="text-orange-700 text-sm">
                    Streamlined workflows and automation features help accounting firms manage 
                    the intense document processing demands of tax season efficiently.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Client Document Collection</h3>
                  <div className="space-y-4">
                    <div className="bg-orange-50 border border-orange-200 rounded p-3">
                      <h4 className="font-medium text-orange-800 mb-2">Automated Client Portal</h4>
                      <div className="text-orange-700 text-sm space-y-2">
                        <div><strong>Document Request Automation:</strong> Automated client requests for missing documents</div>
                        <div><strong>Secure Upload Portal:</strong> Client self-service document upload with encryption</div>
                        <div><strong>Document Status Tracking:</strong> Real-time visibility into document collection progress</div>
                        <div><strong>Reminder System:</strong> Automated follow-up for outstanding documents</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Document Processing Pipeline</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-50 border border-green-200 rounded p-3">
                          <div className="font-medium text-green-800 mb-2 flex items-center">
                            <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">1</span>
                            Intake & Sorting
                          </div>
                          <ul className="text-green-700 text-sm space-y-1">
                            <li>• Automatic client assignment</li>
                            <li>• Document type classification</li>
                            <li>• OCR data extraction</li>
                            <li>• Quality validation checks</li>
                          </ul>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded p-3">
                          <div className="font-medium text-blue-800 mb-2 flex items-center">
                            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">2</span>
                            Review & Preparation
                          </div>
                          <ul className="text-blue-700 text-sm space-y-1">
                            <li>• Preparer assignment</li>
                            <li>• Document review workflow</li>
                            <li>• Data entry and validation</li>
                            <li>• Supporting schedule preparation</li>
                          </ul>
                        </div>
                        <div className="bg-purple-50 border border-purple-200 rounded p-3">
                          <div className="font-medium text-purple-800 mb-2 flex items-center">
                            <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">3</span>
                            Review & Filing
                          </div>
                          <ul className="text-purple-700 text-sm space-y-1">
                            <li>• Partner/manager review</li>
                            <li>• Client approval process</li>
                            <li>• Electronic filing preparation</li>
                            <li>• Archive and client delivery</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Capacity Management</h3>
                  <div className="space-y-3">
                    <div className="bg-blue-50 border border-blue-200 rounded p-3">
                      <h4 className="font-medium text-blue-800 mb-2">Workload Distribution</h4>
                      <div className="text-blue-700 text-sm space-y-2">
                        <div><strong>Staff Capacity Tracking:</strong> Real-time visibility into staff workloads</div>
                        <div><strong>Smart Assignment:</strong> Automated work distribution based on capacity and expertise</div>
                        <div><strong>Priority Management:</strong> Client priority-based work scheduling</div>
                        <div><strong>Bottleneck Identification:</strong> Automated identification of process bottlenecks</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Performance Analytics</h4>
                      <div className="bg-gray-50 border border-gray-200 rounded p-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="font-medium text-gray-800 mb-2">Productivity Metrics</div>
                            <ul className="text-gray-600 space-y-1">
                              <li>• Returns processed per day</li>
                              <li>• Average processing time</li>
                              <li>• Quality scores and error rates</li>
                              <li>• Client satisfaction ratings</li>
                            </ul>
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 mb-2">Resource Utilization</div>
                            <ul className="text-gray-600 space-y-1">
                              <li>• Staff utilization rates</li>
                              <li>• Overtime and capacity planning</li>
                              <li>• Technology usage analytics</li>
                              <li>• Cost per return analysis</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Quality Control & Review</h3>
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded p-3">
                      <h4 className="font-medium text-green-800 mb-2">Multi-Level Review Process</h4>
                      <div className="text-green-700 text-sm space-y-1">
                        <div>• <strong>Preparer Review:</strong> Initial review and quality check by preparer</div>
                        <div>• <strong>Senior Review:</strong> Technical review by senior staff or manager</div>
                        <div>• <strong>Partner Review:</strong> Final partner review and sign-off</div>
                        <div>• <strong>Client Review:</strong> Client approval and signature process</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Automated Quality Checks</h4>
                      <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                        <div className="text-yellow-800 text-sm space-y-2">
                          <div><strong>Data Validation:</strong> Automatic validation of tax calculations and data consistency</div>
                          <div><strong>Completeness Checks:</strong> Verification that all required forms and schedules are complete</div>
                          <div><strong>Prior Year Comparison:</strong> Automated comparison with prior year returns</div>
                          <div><strong>Error Detection:</strong> Built-in error detection and correction suggestions</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Audit Documentation */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Archive className="w-6 h-6 mr-2 text-indigo-600" />
                Audit Documentation & Workpapers
              </h2>
              <div className="space-y-6">
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <h3 className="font-semibold text-indigo-800 mb-2">Professional Audit Standards</h3>
                  <p className="text-indigo-700 text-sm">
                    Comprehensive audit documentation capabilities ensure compliance with PCAOB, AICPA, 
                    and international auditing standards for workpaper preparation and retention.
                  </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Workpaper Management</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-indigo-50 border border-indigo-200 rounded p-3">
                        <h4 className="font-medium text-indigo-800 mb-2">Audit File Organization</h4>
                        <ul className="text-indigo-700 text-sm space-y-1">
                          <li>• Permanent file and current file structure</li>
                          <li>• Lead schedule and supporting detail organization</li>
                          <li>• Cross-reference indexing system</li>
                          <li>• Tick mark and notation standards</li>
                          <li>• Review note and clearance tracking</li>
                        </ul>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded p-3">
                        <h4 className="font-medium text-blue-800 mb-2">Documentation Standards</h4>
                        <ul className="text-blue-700 text-sm space-y-1">
                          <li>• PCAOB AS 1215 compliance</li>
                          <li>• Client-prepared vs. auditor-prepared designation</li>
                          <li>• Source document identification</li>
                          <li>• Preparer and reviewer identification</li>
                          <li>• Date and time stamp requirements</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Workpaper Templates and Standards</h4>
                      <div className="bg-gray-50 border border-gray-200 rounded p-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="font-medium text-gray-800 mb-2">Planning Documents</div>
                            <ul className="text-gray-600 space-y-1">
                              <li>• Engagement letters</li>
                              <li>• Risk assessment matrices</li>
                              <li>• Materiality calculations</li>
                              <li>• Audit strategy memos</li>
                            </ul>
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 mb-2">Testing Workpapers</div>
                            <ul className="text-gray-600 space-y-1">
                              <li>• Substantive testing schedules</li>
                              <li>• Internal control testing</li>
                              <li>• Analytical procedures</li>
                              <li>• Journal entry testing</li>
                            </ul>
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 mb-2">Completion Documents</div>
                            <ul className="text-gray-600 space-y-1">
                              <li>• Management representation letters</li>
                              <li>• Subsequent events review</li>
                              <li>• Going concern assessments</li>
                              <li>• Independence confirmations</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Review and Sign-off Process</h3>
                  <div className="space-y-3">
                    <div className="bg-purple-50 border border-purple-200 rounded p-3">
                      <h4 className="font-medium text-purple-800 mb-2">Hierarchical Review Workflow</h4>
                      <div className="text-purple-700 text-sm space-y-2">
                        <div><strong>Staff Preparation:</strong> Initial workpaper preparation and self-review</div>
                        <div><strong>Senior Review:</strong> Technical review and quality assessment</div>
                        <div><strong>Manager Review:</strong> Risk assessment and client consultation</div>
                        <div><strong>Partner Review:</strong> Final review and opinion formation</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Review Documentation</h4>
                      <div className="bg-orange-50 border border-orange-200 rounded p-3">
                        <div className="text-orange-800 text-sm space-y-2">
                          <div><strong>Review Notes:</strong> Electronic review notes with resolution tracking</div>
                          <div><strong>Sign-off Requirements:</strong> Electronic signatures with authentication</div>
                          <div><strong>Clearance Process:</strong> Systematic clearance of review points</div>
                          <div><strong>Version Control:</strong> Audit trail of workpaper revisions</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Retention and Archival</h3>
                  <div className="space-y-3">
                    <div className="bg-red-50 border border-red-200 rounded p-3">
                      <h4 className="font-medium text-red-800 mb-2">Audit File Retention</h4>
                      <div className="text-red-700 text-sm space-y-1">
                        <div>• <strong>7-Year Retention:</strong> PCAOB requirement for public company audits</div>
                        <div>• <strong>5-Year Retention:</strong> Private company audit requirements</div>
                        <div>• <strong>Tax Return Retention:</strong> Client-specific retention policies</div>
                        <div>• <strong>Working Paper Access:</strong> Controlled access during retention period</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Archive Management</h4>
                      <div className="bg-gray-50 border border-gray-200 rounded p-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div>
                            <div className="font-medium text-gray-800">Archive Creation</div>
                            <ul className="text-gray-600 list-disc list-inside mt-1">
                              <li>Automated archive file assembly</li>
                              <li>Integrity verification and validation</li>
                              <li>Compressed and encrypted storage</li>
                              <li>Archive date and administrator logging</li>
                            </ul>
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">Archive Access</div>
                            <ul className="text-gray-600 list-disc list-inside mt-1">
                              <li>Read-only archive access controls</li>
                              <li>Audit trail of archive retrievals</li>
                              <li>Search and index capabilities</li>
                              <li>Regulatory inspection support</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Financial Reporting Integration */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
                Financial Reporting Integration
              </h2>
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Accounting Software Integration</h3>
                  <p className="text-blue-700 text-sm">
                    Seamless integration with major accounting and financial reporting platforms 
                    for streamlined document workflows and automated data synchronization.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Supported Accounting Platforms</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 border border-blue-200 rounded p-3">
                        <h4 className="font-medium text-blue-800 mb-2">Enterprise ERP Systems</h4>
                        <ul className="text-blue-700 text-sm space-y-1">
                          <li>• SAP Financial Accounting</li>
                          <li>• Oracle Financials</li>
                          <li>• Microsoft Dynamics 365</li>
                          <li>• NetSuite ERP</li>
                          <li>• Sage Intacct</li>
                          <li>• Workday Financial Management</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded p-3">
                        <h4 className="font-medium text-green-800 mb-2">Professional Software</h4>
                        <ul className="text-green-700 text-sm space-y-1">
                          <li>• Thomson Reuters UltraTax</li>
                          <li>• CCH Axcess</li>
                          <li>• Lacerte Tax</li>
                          <li>• ProSeries Professional</li>
                          <li>• Drake Tax Software</li>
                          <li>• GoSystem Tax RS</li>
                        </ul>
                      </div>
                      <div className="bg-purple-50 border border-purple-200 rounded p-3">
                        <h4 className="font-medium text-purple-800 mb-2">Small Business Platforms</h4>
                        <ul className="text-purple-700 text-sm space-y-1">
                          <li>• QuickBooks Desktop & Online</li>
                          <li>• Xero Accounting</li>
                          <li>• FreshBooks</li>
                          <li>• Wave Accounting</li>
                          <li>• Sage 50 Accounting</li>
                          <li>• Zoho Books</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Integration Capabilities</h4>
                      <div className="bg-gray-50 border border-gray-200 rounded p-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="font-medium text-gray-800 mb-2">Data Synchronization</div>
                            <ul className="text-gray-600 space-y-1">
                              <li>• Client and vendor information sync</li>
                              <li>• Chart of accounts mapping</li>
                              <li>• Trial balance import/export</li>
                              <li>• Journal entry documentation</li>
                            </ul>
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 mb-2">Workflow Automation</div>
                            <ul className="text-gray-600 space-y-1">
                              <li>• Document routing and approval</li>
                              <li>• Automated file naming and organization</li>
                              <li>• Metadata population and tagging</li>
                              <li>• Report generation and distribution</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Financial Statement Preparation</h3>
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded p-3">
                      <h4 className="font-medium text-green-800 mb-2">Automated Report Generation</h4>
                      <div className="text-green-700 text-sm space-y-2">
                        <div><strong>Trial Balance Processing:</strong> Automated trial balance import and mapping</div>
                        <div><strong>Adjusting Entries:</strong> Documentation and tracking of adjusting entries</div>
                        <div><strong>Financial Statement Assembly:</strong> Automated compilation and formatting</div>
                        <div><strong>Note Disclosure Management:</strong> Template-based note preparation</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Compilation and Review Services</h4>
                      <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                        <div className="text-yellow-800 text-sm space-y-2">
                          <div><strong>Engagement Documentation:</strong> SSARS compliance for compilation and review</div>
                          <div><strong>Independence Tracking:</strong> Independence monitoring and documentation</div>
                          <div><strong>Management Representation:</strong> Automated management letter preparation</div>
                          <div><strong>Report Generation:</strong> Standard compilation and review report templates</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Client Communication & Delivery</h3>
                  <div className="space-y-3">
                    <div className="bg-orange-50 border border-orange-200 rounded p-3">
                      <h4 className="font-medium text-orange-800 mb-2">Secure Client Portals</h4>
                      <div className="text-orange-700 text-sm space-y-1">
                        <div>• <strong>Document Delivery:</strong> Secure delivery of financial statements and tax returns</div>
                        <div>• <strong>Client Communications:</strong> Encrypted messaging and document sharing</div>
                        <div>• <strong>Signature Collection:</strong> Electronic signature capture for engagements</div>
                        <div>• <strong>Payment Processing:</strong> Integration with billing and payment systems</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Client Relationship Management</h4>
                      <div className="bg-purple-50 border border-purple-200 rounded p-3">
                        <div className="text-purple-800 text-sm space-y-2">
                          <div><strong>Engagement Tracking:</strong> Complete engagement lifecycle management</div>
                          <div><strong>Service Delivery:</strong> Automated service delivery and follow-up</div>
                          <div><strong>Client Satisfaction:</strong> Feedback collection and analysis</div>
                          <div><strong>Cross-selling Opportunities:</strong> Service expansion identification</div>
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
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Setup Guide</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium text-gray-800">1. SOX Compliance Setup</div>
                  <div className="text-gray-600">Configure audit trails and controls</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">2. User Roles & Access</div>
                  <div className="text-gray-600">Set up staff and client permissions</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">3. Document Classification</div>
                  <div className="text-gray-600">Configure financial document types</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">4. Workflow Automation</div>
                  <div className="text-gray-600">Set up tax season workflows</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">5. Software Integration</div>
                  <div className="text-gray-600">Connect accounting platforms</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Compliance Standards</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium text-gray-800">Sarbanes-Oxley Act</div>
                  <div className="text-gray-600">SOX 302 & 404 compliance</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">PCAOB Standards</div>
                  <div className="text-gray-600">Audit documentation requirements</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">AICPA Professional Standards</div>
                  <div className="text-gray-600">Professional conduct and quality</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">IRS Documentation</div>
                  <div className="text-gray-600">Tax return supporting records</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Common Financial Documents</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-blue-600" />
                  <span>Financial statements</span>
                </div>
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-green-600" />
                  <span>Tax returns</span>
                </div>
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-purple-600" />
                  <span>Audit workpapers</span>
                </div>
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-orange-600" />
                  <span>Bank statements</span>
                </div>
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-red-600" />
                  <span>General ledger</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Related Documentation</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/docs/enterprise/deployment" className="text-blue-600 hover:text-blue-800 block">
                    Enterprise Deployment →
                  </Link>
                </li>
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
                  <Link href="/docs/backup-recovery" className="text-blue-600 hover:text-blue-800 block">
                    Backup & Recovery →
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Accounting Industry Support</h3>
              <p className="text-gray-600 text-sm mb-4">
                Our accounting specialists provide comprehensive support for tax season workflows, audit documentation, and regulatory compliance.
              </p>
              <div className="space-y-2">
                <a href="mailto:accounting@southcoastoffice.com" className="block text-blue-600 hover:text-blue-800 text-sm">
                  accounting@southcoastoffice.com
                </a>
                <Link href="/support" className="block text-blue-600 hover:text-blue-800 text-sm">
                  Contact Accounting Team →
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