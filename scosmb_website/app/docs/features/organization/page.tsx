'use client';

import { motion } from 'framer-motion';
import { FolderTree, Settings, Calendar, FileText, Check, AlertTriangle, Info, ExternalLink, Zap, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function FileOrganizationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative bg-linear-to-br from-[#153B6B] via-[#1e4a7f] to-[#00A8B5] text-white pt-32 pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 left-10 w-60 h-60 bg-[#00A8B5]/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
          <div style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.03\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} className="absolute inset-0 opacity-40" />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [-15, 15, -15], rotate: [0, 90, 180] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-32 right-20 w-5 h-5 border-2 border-white/25 rotate-45"
          />
          <motion.div
            animate={{ y: [25, -25, 25], x: [-10, 10, -10] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-40 right-32 w-3 h-3 bg-white/15 rounded-full"
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <Link href="/docs" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Documentation
            </Link>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-8 shadow-2xl"
            >
              <FolderTree className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight"
            >
              <span className="text-[#00A8B5]">Automatic</span> File Organization
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Custom naming patterns and intelligent folder organization for efficient document management.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Smart Patterns
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                Auto-Sort
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                Custom Rules
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom max-w-4xl">
          
          {/* Organization Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Smart File Organization</h2>
            
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2">Automatic Organization</h3>
                    <p className="text-green-800 text-sm">
                      SCO SMB automatically organizes your scanned documents using intelligent naming patterns and 
                      folder structures, eliminating manual file management and ensuring consistent organization.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Date-Based Structure</h3>
                  <p className="text-blue-800 text-sm">
                    Organize files by year, month, and day for chronological document management.
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Custom Naming</h3>
                  <p className="text-purple-800 text-sm">
                    Flexible naming patterns with dynamic variables for consistent file identification.
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-orange-900 mb-2">Rule-Based Sorting</h3>
                  <p className="text-orange-800 text-sm">
                    Advanced rules based on printer source, file type, or custom metadata.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Default Organization Pattern */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Default Organization Pattern</h2>
            
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Out-of-the-Box Structure</h3>
                    <p className="text-blue-800 text-sm">
                      SCO SMB comes pre-configured with a logical date-based organization structure that works 
                      for most use cases without any configuration required.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Folder Structure */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Default Folder Structure</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="font-mono text-sm space-y-1 text-gray-700">
                      <div className="font-bold text-gray-900">📁 SCO SMB Scans/</div>
                      <div className="ml-4">📁 2024/</div>
                      <div className="ml-8">📁 01 - January/</div>
                      <div className="ml-12">📁 01/</div>
                      <div className="ml-16">📄 Scan_20240101_143052.pdf</div>
                      <div className="ml-16">📄 Invoice_20240101_150830.pdf</div>
                      <div className="ml-12">📁 02/</div>
                      <div className="ml-16">📄 Receipt_20240102_091245.pdf</div>
                      <div className="ml-8">📁 02 - February/</div>
                      <div className="ml-12">📁 15/</div>
                      <div className="ml-16">📄 Contract_20240215_161030.pdf</div>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Chronological Order</h4>
                        <p className="text-gray-700 text-sm">Easy to find documents by date</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Scalable Structure</h4>
                        <p className="text-gray-700 text-sm">Handles years of documents efficiently</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Backup Friendly</h4>
                        <p className="text-gray-700 text-sm">Predictable structure for automated backups</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Zero Configuration</h4>
                        <p className="text-gray-700 text-sm">Works immediately without setup</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Custom Naming Patterns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Custom Naming Patterns</h2>
            
            <div className="space-y-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2">Dynamic Variables</h3>
                    <p className="text-purple-800 text-sm">
                      Use variables in your naming patterns to automatically insert dates, times, printer names, 
                      and other metadata into file names for consistent identification.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Available Variables */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Variables</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono">{'{YYYY}'}</code>
                        <span className="text-gray-700">4-digit year (2024)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono">{'{MM}'}</code>
                        <span className="text-gray-700">2-digit month (01-12)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono">{'{DD}'}</code>
                        <span className="text-gray-700">2-digit day (01-31)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono">{'{HH}'}</code>
                        <span className="text-gray-700">2-digit hour (00-23)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono">{'{mm}'}</code>
                        <span className="text-gray-700">2-digit minute (00-59)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono">{'{SS}'}</code>
                        <span className="text-gray-700">2-digit second (00-59)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono">{'{PRINTER}'}</code>
                        <span className="text-gray-700">Printer name or IP</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono">{'{EXT}'}</code>
                        <span className="text-gray-700">File extension (.pdf)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pattern Examples */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Patterns</h3>
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Business Documents</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <code className="bg-white px-2 py-1 rounded text-xs font-mono">{'{YYYY}-{MM}-{DD}_Document_{HH}{mm}{SS}'}</code>
                        </div>
                        <div className="text-blue-800">Result: 2024-01-15_Document_143052.pdf</div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">Printer-Specific</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <code className="bg-white px-2 py-1 rounded text-xs font-mono">{'{PRINTER}_Scan_{YYYY}{MM}{DD}_{HH}{mm}'}</code>
                        </div>
                        <div className="text-green-800">Result: Reception_Kyocera_Scan_20240115_1430.pdf</div>
                      </div>
                    </div>
                    
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h4 className="font-semibold text-orange-900 mb-2">Sequential Numbering</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <code className="bg-white px-2 py-1 rounded text-xs font-mono">DOC_&#123;YYYY&#125;&#123;MM&#125;&#123;DD&#125;_&#123;###&#125;</code>
                        </div>
                        <div className="text-orange-800">Result: DOC_20240115_001.pdf, DOC_20240115_002.pdf</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Advanced Organization Rules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Advanced Organization Rules</h2>
            
            <div className="space-y-6">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Settings className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-2">Rule-Based Automation</h3>
                    <p className="text-orange-800 text-sm">
                      Create sophisticated rules that automatically sort documents into different folders and apply 
                      different naming patterns based on various criteria.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Rule Types */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Rule Criteria</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Source-Based Rules</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div><strong>Printer IP/Name:</strong> Sort by which printer sent the scan</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div><strong>Department:</strong> Organize by printer location/department</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div><strong>Printer Model:</strong> Different rules for different printer brands</div>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Content-Based Rules</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div><strong>File Type:</strong> PDF, JPEG, TIFF handling</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div><strong>File Size:</strong> Large vs small document handling</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div><strong>Page Count:</strong> Single vs multi-page rules</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Example Rules */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Organization Rules</h3>
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Department-Based</h4>
                      <div className="text-blue-800 text-sm space-y-1">
                        <div><strong>IF</strong> printer IP = 192.168.1.10 (Accounting)</div>
                        <div><strong>THEN</strong> save to: Accounting/{"{YYYY}"}/{"{MM}"}/</div>
                        <div><strong>NAME</strong> pattern: ACC_{"{YYYY}{MM}{DD}"}_{"{HH}{mm}"}</div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">Document Type</h4>
                      <div className="text-green-800 text-sm space-y-1">
                        <div><strong>IF</strong> file size {'>'} 5MB (large documents)</div>
                        <div><strong>THEN</strong> save to: Large_Documents/{"{YYYY}"}/</div>
                        <div><strong>NAME</strong> pattern: LARGE_{"{YYYY}{MM}{DD}"}_{"{###}"}</div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-900 mb-2">Time-Based</h4>
                      <div className="text-purple-800 text-sm space-y-1">
                        <div><strong>IF</strong> time between 17:00-09:00 (after hours)</div>
                        <div><strong>THEN</strong> save to: After_Hours/{"{YYYY}"}/{"{MM}"}/</div>
                        <div><strong>NAME</strong> pattern: AH_{"{YYYY}{MM}{DD}"}_{"{HH}{mm}"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Configuration Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Configuration Guide</h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Basic Setup */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Configuration</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Access Settings:</h4>
                      <ol className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                          <div>Open SCO SMB Settings</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                          <div>Navigate to "File Organization" tab</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                          <div>Choose organization method</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                          <div>Configure naming pattern</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                          <div>Test with sample scan</div>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>

                {/* Advanced Setup */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Rules Setup</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Creating Rules:</h4>
                      <ol className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                          <div>Click "Add New Rule"</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                          <div>Define rule criteria (source, content, time)</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                          <div>Set destination folder pattern</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">4</div>
                          <div>Configure naming pattern for rule</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">5</div>
                          <div>Set rule priority and save</div>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-yellow-900 mb-2">Important Notes</h3>
                    <ul className="text-yellow-800 text-sm space-y-1">
                      <li>• Rules are processed in priority order (highest first)</li>
                      <li>• First matching rule determines file organization</li>
                      <li>• Test rules with sample scans before deploying</li>
                      <li>• Backup existing files before changing patterns</li>
                      <li>• Variable names are case-sensitive</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Best Practices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Organization Best Practices</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Do's */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">✅ Recommended Practices</h3>
                <div className="space-y-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <ul className="space-y-2 text-green-800 text-sm">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>Use consistent naming patterns across all rules</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>Include dates in file names for chronological sorting</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>Keep folder structures shallow (3-4 levels max)</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>Use descriptive but concise folder names</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>Test organization rules before full deployment</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>Document your organization strategy</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Don'ts */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">❌ Common Mistakes</h3>
                <div className="space-y-3">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <ul className="space-y-2 text-red-800 text-sm">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>Don't use special characters in file names (/, \, :, *, ?)</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>Avoid extremely long file names (&gt;255 characters)</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>Don't create overly complex folder hierarchies</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>Avoid spaces at beginning/end of file names</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>Don't change patterns frequently without planning</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>Avoid conflicting rules that could cause confusion</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-[#153B6B]/5 to-[#00A8B5]/5 rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Related Features</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Advanced Features</h3>
                <div className="space-y-3">
                  <Link href="/docs/features/audit" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Audit Logging & Compliance
                  </Link>
                  <Link href="/docs/features/backup" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Backup & Recovery
                  </Link>
                  <Link href="/docs/features/integration" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Business System Integration
                  </Link>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Configuration</h3>
                <div className="space-y-3">
                  <Link href="/docs/installation/first-time" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    First-Time Setup
                  </Link>
                  <Link href="/docs/network/security" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Security Best Practices
                  </Link>
                  <Link href="/docs/troubleshooting/performance" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Performance Optimization
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}