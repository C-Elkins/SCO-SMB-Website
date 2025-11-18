'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Puzzle, Zap, Globe, Shield, Database, Code, Workflow } from 'lucide-react';

export default function IntegrationPage() {
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
              <Puzzle className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight"
            >
              <span className="text-[#00A8B5]">Third-Party</span> Integration
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Seamlessly connect SCO SMB with your existing business systems, cloud services, and productivity tools for enhanced workflow automation.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                100+ Integrations
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                REST API Access
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                Webhook Support
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-12">
            
            {/* Integration Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-8 h-8 text-[#00A8B5]" />
                <h2 className="text-2xl font-bold text-[#153B6B]">Enterprise Integration Hub</h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-gray-600">
                  SCO SMB's powerful integration engine connects with over 100+ business applications, 
                  cloud services, and enterprise systems to create seamless document workflows.
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <div className="w-16 h-16 bg-[#00A8B5] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Database className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-[#153B6B] mb-2">CRM Systems</h4>
                    <p className="text-sm text-gray-600">Salesforce, HubSpot, Dynamics</p>
                  </div>
                  
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-[#153B6B] mb-2">Cloud Storage</h4>
                    <p className="text-sm text-gray-600">Google Drive, Dropbox, OneDrive</p>
                  </div>
                  
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Workflow className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-[#153B6B] mb-2">Workflow Tools</h4>
                    <p className="text-sm text-gray-600">Zapier, Microsoft Flow, IFTTT</p>
                  </div>
                  
                  <div className="text-center p-6 bg-orange-50 rounded-lg">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Code className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-[#153B6B] mb-2">Developer APIs</h4>
                    <p className="text-sm text-gray-600">REST, webhooks, SDKs</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Popular Integrations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Puzzle className="w-8 h-8 text-[#00A8B5]" />
                <h2 className="text-2xl font-bold text-[#153B6B]">Popular Integrations</h2>
              </div>
              
              <div className="space-y-8">
                {/* Microsoft 365 */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">M365</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#153B6B]">Microsoft 365</h3>
                      <p className="text-gray-600 text-sm">Complete integration with Office suite and SharePoint</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Features</h4>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Direct upload to OneDrive</li>
                        <li>• SharePoint document libraries</li>
                        <li>• Outlook email integration</li>
                        <li>• Teams channel notifications</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">Automation</h4>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>• Auto-categorize in SharePoint</li>
                        <li>• Smart folder organization</li>
                        <li>• Approval workflows</li>
                        <li>• Version control sync</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <h4 className="font-medium text-purple-800 mb-2">Security</h4>
                      <ul className="text-purple-700 text-sm space-y-1">
                        <li>• Azure AD authentication</li>
                        <li>• Conditional access policies</li>
                        <li>• DLP compliance</li>
                        <li>• Audit log integration</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Google Workspace */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">G</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#153B6B]">Google Workspace</h3>
                      <p className="text-gray-600 text-sm">Seamless integration with Google's productivity suite</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Cloud Storage</h4>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Direct Google Drive upload</li>
                        <li>• Shared drive organization</li>
                        <li>• Smart folder creation</li>
                        <li>• OCR text searchability</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">Collaboration</h4>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>• Gmail attachment handling</li>
                        <li>• Google Docs integration</li>
                        <li>• Calendar event attachments</li>
                        <li>• Meet recording uploads</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <h4 className="font-medium text-purple-800 mb-2">Apps Script</h4>
                      <ul className="text-purple-700 text-sm space-y-1">
                        <li>• Custom automation scripts</li>
                        <li>• Sheets data integration</li>
                        <li>• Form response handling</li>
                        <li>• Advanced workflows</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Salesforce */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">SF</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#153B6B]">Salesforce CRM</h3>
                      <p className="text-gray-600 text-sm">Streamline customer document management</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Document Management</h4>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Auto-attach to customer records</li>
                        <li>• Contract and agreement storage</li>
                        <li>• Lead qualification documents</li>
                        <li>• Case file attachments</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">Workflow Triggers</h4>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>• New lead notifications</li>
                        <li>• Opportunity updates</li>
                        <li>• Case escalations</li>
                        <li>• Approval processes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* API & Webhooks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-8 h-8 text-[#00A8B5]" />
                <h2 className="text-2xl font-bold text-[#153B6B]">Developer APIs</h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-gray-600">
                  Build custom integrations with SCO SMB's comprehensive REST API and webhook system. 
                  Perfect for enterprise environments with unique workflow requirements.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#153B6B] mb-4">REST API Endpoints</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">GET</span>
                        <span className="text-gray-700">/api/v1/documents</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">POST</span>
                        <span className="text-gray-700">/api/v1/scan/upload</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-mono">PUT</span>
                        <span className="text-gray-700">/api/v1/settings</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-mono">DEL</span>
                        <span className="text-gray-700">/api/v1/documents/&#123;id&#125;</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        Full OpenAPI 3.0 specification available with interactive documentation.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#153B6B] mb-4">Webhook Events</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <code className="bg-white px-2 py-1 rounded text-xs">document.scanned</code></li>
                      <li>• <code className="bg-white px-2 py-1 rounded text-xs">document.processed</code></li>
                      <li>• <code className="bg-white px-2 py-1 rounded text-xs">backup.completed</code></li>
                      <li>• <code className="bg-white px-2 py-1 rounded text-xs">user.authenticated</code></li>
                      <li>• <code className="bg-white px-2 py-1 rounded text-xs">system.error</code></li>
                      <li>• <code className="bg-white px-2 py-1 rounded text-xs">license.expired</code></li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        Secure webhook delivery with retry logic and signature verification.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-800 mb-3">SDK & Libraries</h4>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <span className="text-yellow-900 font-bold text-sm">JS</span>
                      </div>
                      <p className="text-sm font-medium">JavaScript</p>
                      <p className="text-xs text-gray-600">Node.js & Browser</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <span className="text-white font-bold text-sm">PY</span>
                      </div>
                      <p className="text-sm font-medium">Python</p>
                      <p className="text-xs text-gray-600">PyPI package</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <span className="text-white font-bold text-sm">C#</span>
                      </div>
                      <p className="text-sm font-medium">.NET</p>
                      <p className="text-xs text-gray-600">NuGet package</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <span className="text-white font-bold text-sm">☕</span>
                      </div>
                      <p className="text-sm font-medium">Java</p>
                      <p className="text-xs text-gray-600">Maven/Gradle</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Workflow Automation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Workflow className="w-8 h-8 text-[#00A8B5]" />
                <h2 className="text-2xl font-bold text-[#153B6B]">Workflow Automation</h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-gray-600">
                  Create sophisticated document workflows that automatically route, process, and archive 
                  scanned documents based on content, metadata, or business rules.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 border-l-4 border-[#00A8B5] p-4">
                    <h4 className="font-semibold text-[#153B6B] mb-3">Smart Routing</h4>
                    <ul className="space-y-2 text-blue-700 text-sm">
                      <li>• Content-based classification</li>
                      <li>• Department auto-routing</li>
                      <li>• Priority queue management</li>
                      <li>• Approval chain automation</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 border-l-4 border-green-400 p-4">
                    <h4 className="font-semibold text-green-800 mb-3">Data Extraction</h4>
                    <ul className="space-y-2 text-green-700 text-sm">
                      <li>• OCR text recognition</li>
                      <li>• Form field extraction</li>
                      <li>• Barcode/QR code reading</li>
                      <li>• Metadata enrichment</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                    <h4 className="font-semibold text-purple-800 mb-3">Business Rules</h4>
                    <ul className="space-y-2 text-purple-700 text-sm">
                      <li>• Conditional processing</li>
                      <li>• Compliance validation</li>
                      <li>• Retention policies</li>
                      <li>• Notification triggers</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-[#153B6B] mb-4">Example Workflow: Invoice Processing</h4>
                  <div className="flex items-center gap-4 text-sm overflow-x-auto pb-2">
                    <div className="flex-shrink-0 text-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mb-2">1</div>
                      <p className="text-xs text-gray-600">Scan Invoice</p>
                    </div>
                    <div className="flex-shrink-0 w-8 h-0.5 bg-gray-300 mt-6"></div>
                    <div className="flex-shrink-0 text-center">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mb-2">2</div>
                      <p className="text-xs text-gray-600">Extract Data</p>
                    </div>
                    <div className="flex-shrink-0 w-8 h-0.5 bg-gray-300 mt-6"></div>
                    <div className="flex-shrink-0 text-center">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mb-2">3</div>
                      <p className="text-xs text-gray-600">Route to AP</p>
                    </div>
                    <div className="flex-shrink-0 w-8 h-0.5 bg-gray-300 mt-6"></div>
                    <div className="flex-shrink-0 text-center">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mb-2">4</div>
                      <p className="text-xs text-gray-600">ERP Integration</p>
                    </div>
                    <div className="flex-shrink-0 w-8 h-0.5 bg-gray-300 mt-6"></div>
                    <div className="flex-shrink-0 text-center">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mb-2">5</div>
                      <p className="text-xs text-gray-600">Archive</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Setup Guide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-[#00A8B5]" />
                <h2 className="text-2xl font-bold text-[#153B6B]">Integration Setup</h2>
              </div>
              
              <div className="space-y-6">
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold text-[#153B6B] mb-3">Quick Setup Guide</h3>
                  <p className="text-gray-600 mb-4">
                    Setting up integrations in SCO SMB is straightforward with our guided setup wizard.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-[#153B6B] mb-4">General Setup Steps</h4>
                  <ol className="space-y-3 text-gray-700">
                    <li><strong>1.</strong> Navigate to Settings → Integrations</li>
                    <li><strong>2.</strong> Select your desired integration from the marketplace</li>
                    <li><strong>3.</strong> Follow the authentication flow (OAuth, API key, etc.)</li>
                    <li><strong>4.</strong> Configure mapping rules and workflow triggers</li>
                    <li><strong>5.</strong> Test the integration with sample documents</li>
                    <li><strong>6.</strong> Enable monitoring and error notifications</li>
                    <li><strong>7.</strong> Document the setup for your team</li>
                  </ol>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-white text-xs font-bold">!</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-yellow-800 mb-2">Security Best Practices</h4>
                        <ul className="text-yellow-700 text-sm space-y-1">
                          <li>• Use least privilege access principles</li>
                          <li>• Enable audit logging for all integrations</li>
                          <li>• Regularly rotate API keys and tokens</li>
                          <li>• Monitor integration activity and errors</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-800 mb-2">Support Resources</h4>
                        <ul className="text-green-700 text-sm space-y-1">
                          <li>• 24/7 integration support hotline</li>
                          <li>• Dedicated integration specialists</li>
                          <li>• Custom integration development</li>
                          <li>• Training and onboarding assistance</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}