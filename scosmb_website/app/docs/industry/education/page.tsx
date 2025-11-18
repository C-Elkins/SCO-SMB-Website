'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Users, Shield, BookOpen, Settings, CheckCircle, Clock, Wifi } from 'lucide-react';
import Link from 'next/link';

export default function EducationEnvironmentPage() {
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
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Education Environment Setup
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Optimized document scanning solutions for schools, universities, and educational institutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom max-w-4xl">
          
          {/* Educational Institution Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Educational Institution Requirements</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* K-12 Schools */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="text-center mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-blue-900">K-12 Schools</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div>• Student enrollment documents</div>
                  <div>• FERPA compliance requirements</div>
                  <div>• Parent permission forms</div>
                  <div>• Health and emergency records</div>
                  <div>• IEP and 504 plan documents</div>
                  <div>• Attendance and grade records</div>
                </div>
              </div>
              
              {/* Higher Education */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="text-center mb-4">
                  <GraduationCap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-green-900">Universities</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div>• Admissions applications</div>
                  <div>• Transcript management</div>
                  <div>• Financial aid documents</div>
                  <div>• Research paper submissions</div>
                  <div>• Faculty hiring records</div>
                  <div>• Grant application materials</div>
                </div>
              </div>
              
              {/* Administrative Offices */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <div className="text-center mb-4">
                  <Settings className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-purple-900">Administration</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div>• Human resources files</div>
                  <div>• Budget and financial records</div>
                  <div>• Vendor contracts</div>
                  <div>• Facility maintenance logs</div>
                  <div>• Board meeting minutes</div>
                  <div>• Policy documentation</div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-2">FERPA Compliance</h3>
                  <p className="text-yellow-800 text-sm">
                    The Family Educational Rights and Privacy Act (FERPA) protects student education records. 
                    SCO SMB provides the security features needed to maintain FERPA compliance while enabling efficient document workflows.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Multi-User Environment Setup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Multi-User Environment Configuration</h2>
            
            <div className="space-y-8">
              {/* User Groups */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">User Groups & Access Control</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* User Groups */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Recommended User Groups:</h4>
                    <div className="space-y-3">
                      <div className="bg-blue-100 border border-blue-200 rounded p-3">
                        <div className="font-semibold text-blue-900">Teachers</div>
                        <div className="text-blue-800 text-sm">Access to student work, assignments, classroom materials</div>
                      </div>
                      
                      <div className="bg-green-100 border border-green-200 rounded p-3">
                        <div className="font-semibold text-green-900">Administrators</div>
                        <div className="text-green-800 text-sm">Full system access, policy documents, HR materials</div>
                      </div>
                      
                      <div className="bg-purple-100 border border-purple-200 rounded p-3">
                        <div className="font-semibold text-purple-900">Office Staff</div>
                        <div className="text-purple-800 text-sm">Enrollment forms, attendance records, general documents</div>
                      </div>
                      
                      <div className="bg-orange-100 border border-orange-200 rounded p-3">
                        <div className="font-semibold text-orange-900">IT Support</div>
                        <div className="text-orange-800 text-sm">System administration and technical documentation</div>
                      </div>
                    </div>
                  </div>

                  {/* Permissions Matrix */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Permissions Matrix:</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-gray-300">
                            <th className="text-left py-2 text-gray-700">Folder</th>
                            <th className="text-center py-2 text-blue-700">Teachers</th>
                            <th className="text-center py-2 text-green-700">Admin</th>
                            <th className="text-center py-2 text-purple-700">Office</th>
                            <th className="text-center py-2 text-orange-700">IT</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs">
                          <tr className="border-b border-gray-200">
                            <td className="py-1 text-gray-700">Student Records</td>
                            <td className="text-center py-1">Read</td>
                            <td className="text-center py-1">Full</td>
                            <td className="text-center py-1">Write</td>
                            <td className="text-center py-1">None</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-1 text-gray-700">HR Documents</td>
                            <td className="text-center py-1">None</td>
                            <td className="text-center py-1">Full</td>
                            <td className="text-center py-1">Read</td>
                            <td className="text-center py-1">None</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-1 text-gray-700">Classroom Materials</td>
                            <td className="text-center py-1">Full</td>
                            <td className="text-center py-1">Read</td>
                            <td className="text-center py-1">Read</td>
                            <td className="text-center py-1">Full</td>
                          </tr>
                          <tr>
                            <td className="py-1 text-gray-700">General Documents</td>
                            <td className="text-center py-1">Write</td>
                            <td className="text-center py-1">Full</td>
                            <td className="text-center py-1">Full</td>
                            <td className="text-center py-1">Full</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Printer Setup */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Multi-Printer Network Configuration</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-3">Printer Placement Strategy:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="text-blue-800">• Main Office: High-capacity scanner for enrollment</div>
                        <div className="text-blue-800">• Library: Student and research document scanning</div>
                        <div className="text-blue-800">• Faculty Lounge: Teacher materials and grading</div>
                        <div className="text-blue-800">• Registrar: Transcript and record management</div>
                        <div className="text-blue-800">• Nurse Office: Health and emergency documents</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-3">Network Configuration:</h4>
                      <div className="bg-black rounded p-3 text-green-400 font-mono text-xs">
                        # Education Network Segment
                        <br />
                        192.168.10.0/24 - Administrative network
                        <br />
                        192.168.20.0/24 - Faculty network  
                        <br />
                        192.168.30.0/24 - Student network
                        <br />
                        192.168.100.0/24 - Printer network
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Document Organization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Educational Document Organization</h2>
            
            <div className="space-y-6">
              {/* Folder Structure */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Folder Structure</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Academic Year Structure:</h4>
                      <div className="space-y-1 text-sm font-mono">
                        <div>📁 /EducationScans/</div>
                        <div className="ml-4">📁 2024-2025_SchoolYear/</div>
                        <div className="ml-8">📁 StudentRecords/</div>
                        <div className="ml-12">📁 Enrollment/</div>
                        <div className="ml-12">📁 Transcripts/</div>
                        <div className="ml-12">📁 HealthRecords/</div>
                        <div className="ml-8">📁 FacultyMaterials/</div>
                        <div className="ml-12">📁 LessonPlans/</div>
                        <div className="ml-12">📁 Assessments/</div>
                        <div className="ml-12">📁 Professional/</div>
                        <div className="ml-8">📁 Administration/</div>
                        <div className="ml-12">📁 Policies/</div>
                        <div className="ml-12">📁 BoardMeetings/</div>
                        <div className="ml-12">📁 Budgets/</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Department-Based Structure:</h4>
                      <div className="space-y-1 text-sm font-mono">
                        <div>📁 /DepartmentScans/</div>
                        <div className="ml-4">📁 Mathematics/</div>
                        <div className="ml-4">📁 Science/</div>
                        <div className="ml-4">📁 English/</div>
                        <div className="ml-4">📁 SocialStudies/</div>
                        <div className="ml-4">📁 SpecialEducation/</div>
                        <div className="ml-4">📁 Counseling/</div>
                        <div className="ml-4">📁 Athletics/</div>
                        <div className="ml-4">📁 Arts/</div>
                        <div className="ml-4">📁 Library/</div>
                        <div className="ml-4">📁 Maintenance/</div>
                        <div className="ml-4">📁 Cafeteria/</div>
                        <div className="ml-4">📁 Transportation/</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Naming Conventions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Naming Conventions for Education</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-green-100 border border-green-200 rounded p-4">
                      <h4 className="font-semibold text-green-900 mb-2">Student Documents:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="font-mono text-xs bg-white rounded p-2">
                          YYYY_StudentID_DocumentType.pdf
                        </div>
                        <div className="text-green-700 text-xs">
                          Example: 2024_S123456_Enrollment.pdf
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-100 border border-blue-200 rounded p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Faculty Materials:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="font-mono text-xs bg-white rounded p-2">
                          YYYY-MM-DD_TeacherName_Subject_Type.pdf
                        </div>
                        <div className="text-blue-700 text-xs">
                          Example: 2024-01-15_Johnson_Math_LessonPlan.pdf
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-purple-100 border border-purple-200 rounded p-4">
                      <h4 className="font-semibold text-purple-900 mb-2">Administrative Docs:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="font-mono text-xs bg-white rounded p-2">
                          YYYY-MM-DD_Department_DocumentType.pdf
                        </div>
                        <div className="text-purple-700 text-xs">
                          Example: 2024-01-15_HR_PolicyUpdate.pdf
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-orange-100 border border-orange-200 rounded p-4">
                      <h4 className="font-semibold text-orange-900 mb-2">Class Materials:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="font-mono text-xs bg-white rounded p-2">
                          YYYY_Grade_Subject_MaterialType.pdf
                        </div>
                        <div className="text-orange-700 text-xs">
                          Example: 2024_Grade5_Science_Worksheet.pdf
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Workflow Optimization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Educational Workflow Optimization</h2>
            
            <div className="space-y-8">
              {/* Common Workflows */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Educational Workflows</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Student Enrollment */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="font-semibold text-blue-900 mb-3">Student Enrollment Process</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                        <div className="text-sm">
                          <div className="font-semibold text-gray-900">Document Collection</div>
                          <div className="text-gray-700">Birth certificate, immunization records, previous transcripts</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                        <div className="text-sm">
                          <div className="font-semibold text-gray-900">Document Scanning</div>
                          <div className="text-gray-700">Scan all documents to StudentRecords/Enrollment folder</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                        <div className="text-sm">
                          <div className="font-semibold text-gray-900">File Organization</div>
                          <div className="text-gray-700">Organize by student ID and document type</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                        <div className="text-sm">
                          <div className="font-semibold text-gray-900">Digital Access</div>
                          <div className="text-gray-700">Provide secure access to authorized staff</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Grade Submission */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="font-semibold text-green-900 mb-3">Assignment & Grade Management</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                        <div className="text-sm">
                          <div className="font-semibold text-gray-900">Student Work Collection</div>
                          <div className="text-gray-700">Gather completed assignments, tests, projects</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                        <div className="text-sm">
                          <div className="font-semibold text-gray-900">Bulk Scanning</div>
                          <div className="text-gray-700">Use high-speed scanning for multiple assignments</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                        <div className="text-sm">
                          <div className="font-semibold text-gray-900">Digital Grading</div>
                          <div className="text-gray-700">Review and grade digitally with annotations</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                        <div className="text-sm">
                          <div className="font-semibold text-gray-900">Portfolio Building</div>
                          <div className="text-gray-700">Create digital portfolios for parent conferences</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule Optimization */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Schedule & Usage Optimization</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Peak Usage Times
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="text-yellow-800">• 7:30-8:30 AM: Student arrival documents</div>
                        <div className="text-yellow-800">• 11:00 AM-1:00 PM: Administrative tasks</div>
                        <div className="text-yellow-800">• 3:00-4:00 PM: End-of-day paperwork</div>
                        <div className="text-yellow-800">• After hours: Faculty grading and prep</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        User Management
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="text-yellow-800">• Shared scanner access schedules</div>
                        <div className="text-yellow-800">• Priority queuing for urgent documents</div>
                        <div className="text-yellow-800">• Department-specific access hours</div>
                        <div className="text-yellow-800">• Student assistant supervised access</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                        <Wifi className="w-5 h-5" />
                        Network Considerations
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="text-yellow-800">• Bandwidth allocation during class hours</div>
                        <div className="text-yellow-800">• Wi-Fi congestion from student devices</div>
                        <div className="text-yellow-800">• Separate network for educational tools</div>
                        <div className="text-yellow-800">• Backup connectivity options</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Privacy & Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Student Privacy & Data Security</h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* FERPA Compliance */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-red-900 mb-4">FERPA Compliance Measures</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <div className="font-semibold text-gray-900">Access Restrictions</div>
                        <div className="text-gray-700">Limit access to educational records based on legitimate need</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <div className="font-semibold text-gray-900">Audit Trails</div>
                        <div className="text-gray-700">Log all access to student records with timestamps</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <div className="font-semibold text-gray-900">Data Encryption</div>
                        <div className="text-gray-700">Encrypt sensitive student information in transit and at rest</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <div className="font-semibold text-gray-900">Staff Training</div>
                        <div className="text-gray-700">Regular training on FERPA requirements and best practices</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Security */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Technical Security Measures</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <div className="font-semibold text-gray-900">Network Segmentation</div>
                        <div className="text-gray-700">Separate networks for student, faculty, and administrative systems</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <div className="font-semibold text-gray-900">Secure Authentication</div>
                        <div className="text-gray-700">Multi-factor authentication for administrative access</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <div className="font-semibold text-gray-900">Regular Backups</div>
                        <div className="text-gray-700">Automated backups with off-site storage for disaster recovery</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <div className="font-semibold text-gray-900">Incident Response</div>
                        <div className="text-gray-700">Documented procedures for security breaches or data incidents</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Retention */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Educational Record Retention Schedule</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Student Records:</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Permanent Records (Transcripts)</span>
                        <span className="font-semibold text-green-700">Permanent</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Special Education Records</span>
                        <span className="font-semibold text-green-700">5 years after graduation</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Disciplinary Records</span>
                        <span className="font-semibold text-green-700">3 years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Health Records</span>
                        <span className="font-semibold text-green-700">3 years after graduation</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Administrative Records:</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Board Meeting Minutes</span>
                        <span className="font-semibold text-green-700">Permanent</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Personnel Files</span>
                        <span className="font-semibold text-green-700">7 years after separation</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Budget Documents</span>
                        <span className="font-semibold text-green-700">7 years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Policy Documents</span>
                        <span className="font-semibold text-green-700">Until superseded</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Implementation Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-[#153B6B]/5 to-[#00A8B5]/5 rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Education Implementation Checklist</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Initial Setup</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 text-sm">Assess document volume and user requirements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 text-sm">Plan network infrastructure and printer placement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 text-sm">Create user groups and permission structure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 text-sm">Design folder structure and naming conventions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 text-sm">Configure FERPA-compliant security settings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 text-sm">Set up audit logging and monitoring</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Training & Rollout</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 text-sm">Train IT staff on system administration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 text-sm">Conduct faculty training sessions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 text-sm">Train office staff on document workflows</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 text-sm">Create user documentation and quick guides</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 text-sm">Pilot program with select departments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 text-sm">Full deployment with ongoing support</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Educational Support Services</h3>
                    <p className="text-blue-800 text-sm">
                      We offer specialized support for educational institutions including FERPA compliance consulting, 
                      staff training programs, and ongoing technical support. Contact our education team for customized 
                      implementation assistance.
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