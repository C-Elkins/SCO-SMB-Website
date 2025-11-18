'use client';

import { motion } from 'framer-motion';
import { Zap, Clock, TrendingUp, Settings, CheckCircle, AlertCircle, BarChart3, Monitor } from 'lucide-react';
import Link from 'next/link';

export default function PerformanceTroubleshootingPage() {
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
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Performance Optimization
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Maximize scanning speed and system efficiency for optimal workflow performance
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom max-w-4xl">
          
          {/* Performance Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Performance Metrics & Benchmarks</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Scan Speed */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <Clock className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-green-900 mb-2">Optimal Scan Speed</h3>
                <div className="text-2xl font-bold text-green-600 mb-1">2-5 sec</div>
                <div className="text-green-700 text-sm">Per page processing</div>
              </div>
              
              {/* File Transfer */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-900 mb-2">Transfer Rate</h3>
                <div className="text-2xl font-bold text-blue-600 mb-1">10-50 MB/s</div>
                <div className="text-blue-700 text-sm">Network throughput</div>
              </div>
              
              {/* Memory Usage */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
                <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-purple-900 mb-2">Memory Usage</h3>
                <div className="text-2xl font-bold text-purple-600 mb-1">&lt; 500 MB</div>
                <div className="text-purple-700 text-sm">System resources</div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Monitor className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Performance Monitoring</h3>
                  <p className="text-blue-800 text-sm">
                    Use these benchmarks to identify when your system is operating below optimal performance levels. 
                    Significant deviations may indicate configuration issues or system limitations.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Common Performance Issues */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Common Performance Issues</h2>
            
            <div className="space-y-8">
              {/* Slow Scanning */}
              <div className="border border-orange-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-orange-900">Slow Scan Processing</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Symptoms:</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Scans taking &gt; 10 seconds per page</li>
                      <li>• Long delays before scan starts</li>
                      <li>• Files take time to appear in folders</li>
                      <li>• System becomes unresponsive during scanning</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Optimizations:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="font-semibold text-green-900 mb-1">• Lower DPI Settings</div>
                        <div className="text-green-800">Use 300 DPI for documents, 600 DPI only when needed</div>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="font-semibold text-blue-900 mb-1">• Optimize File Format</div>
                        <div className="text-blue-800">Use JPEG for photos, PDF for documents</div>
                      </div>
                      
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <div className="font-semibold text-purple-900 mb-1">• Local Storage First</div>
                        <div className="text-purple-800">Save to local drive, then move to network</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Network Bottlenecks */}
              <div className="border border-red-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-red-900">Network Transfer Bottlenecks</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Symptoms:</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Large files transfer very slowly</li>
                      <li>• Network timeouts during transfer</li>
                      <li>• Multiple scans queue up</li>
                      <li>• High network utilization</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Solutions:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="font-semibold text-green-900 mb-1">• Wired Connection</div>
                        <div className="text-green-800">Use Ethernet instead of Wi-Fi when possible</div>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="font-semibold text-blue-900 mb-1">• Network Optimization</div>
                        <div className="text-blue-800">Minimize other network traffic during scanning</div>
                      </div>
                      
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <div className="font-semibold text-purple-900 mb-1">• File Compression</div>
                        <div className="text-purple-800">Enable compression in scanner settings</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Resource Issues */}
              <div className="border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-yellow-900">System Resource Constraints</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Symptoms:</h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• High CPU usage during scanning</li>
                      <li>• System becomes sluggish</li>
                      <li>• Out of memory errors</li>
                      <li>• Disk space warnings</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Optimizations:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="font-semibold text-green-900 mb-1">• Close Unused Programs</div>
                        <div className="text-green-800">Free up system resources before scanning</div>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="font-semibold text-blue-900 mb-1">• Increase Virtual Memory</div>
                        <div className="text-blue-800">Configure adequate page file size</div>
                      </div>
                      
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <div className="font-semibold text-purple-900 mb-1">• Regular Cleanup</div>
                        <div className="text-purple-800">Clear temp files and old scans</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Optimization Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Optimization Settings Guide</h2>
            
            <div className="space-y-8">
              {/* Scanner Settings */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Scanner Configuration</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Resolution Guidelines</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="text-gray-700">Text Documents</span>
                        <span className="font-semibold text-green-600">300 DPI</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="text-gray-700">Detailed Graphics</span>
                        <span className="font-semibold text-blue-600">600 DPI</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="text-gray-700">Photos/Images</span>
                        <span className="font-semibold text-purple-600">300-600 DPI</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Archive Quality</span>
                        <span className="font-semibold text-orange-600">600+ DPI</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">File Format Performance</h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="font-semibold text-green-900 mb-1">Fastest: JPEG</div>
                        <div className="text-green-800">Best for photos and simple documents</div>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="font-semibold text-blue-900 mb-1">Balanced: PDF</div>
                        <div className="text-blue-800">Good compression with text recognition</div>
                      </div>
                      
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <div className="font-semibold text-orange-900 mb-1">Slower: TIFF</div>
                        <div className="text-orange-800">Highest quality but larger files</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Settings */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">System Configuration</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Windows Optimization</h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-black rounded p-3 text-green-400 text-xs font-mono">
                        # Disable Windows Defender real-time scanning for SCO SMB folder
                        Add-MpPreference -ExclusionPath "C:\SCOScans"
                      </div>
                      
                      <div className="bg-black rounded p-3 text-green-400 text-xs font-mono">
                        # Increase network buffer size
                        netsh int tcp set global autotuninglevel=normal
                      </div>
                      
                      <div className="bg-black rounded p-3 text-green-400 text-xs font-mono">
                        # Set high performance power plan
                        powercfg -setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">macOS Optimization</h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-black rounded p-3 text-green-400 text-xs font-mono">
                        # Prevent system sleep during scanning
                        caffeinate -d -i -m -s -u
                      </div>
                      
                      <div className="bg-black rounded p-3 text-green-400 text-xs font-mono">
                        # Increase file handle limits
                        ulimit -n 4096
                      </div>
                      
                      <div className="bg-black rounded p-3 text-green-400 text-xs font-mono">
                        # Disable Spotlight indexing for scan folder
                        mdutil -i off /Users/Shared/SCOScans
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Performance Monitoring */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Performance Monitoring & Testing</h2>
            
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Settings className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Built-in Performance Tools</h3>
                    <p className="text-blue-800 text-sm">
                      SCO SMB includes built-in performance monitoring. Check the status panel for real-time metrics and bottleneck identification.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Windows Monitoring */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Windows Performance Monitoring</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Task Manager Metrics:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">CPU Usage</span>
                          <span className="text-green-600">&lt; 50% during scanning</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Memory Usage</span>
                          <span className="text-blue-600">&lt; 80% total system</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Disk Activity</span>
                          <span className="text-purple-600">&lt; 90% utilization</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Network Usage</span>
                          <span className="text-orange-600">Monitor throughput</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Performance Monitor:</h4>
                      <div className="bg-black rounded p-2 text-green-400 text-xs font-mono">
                        perfmon.exe
                      </div>
                      <div className="text-gray-700 text-sm mt-1">Monitor detailed system counters</div>
                    </div>
                  </div>
                </div>

                {/* macOS Monitoring */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">macOS Performance Monitoring</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Activity Monitor:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">CPU Load</span>
                          <span className="text-green-600">&lt; 70% per core</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Memory Pressure</span>
                          <span className="text-blue-600">Green/Yellow OK</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Disk I/O</span>
                          <span className="text-purple-600">&lt; 80% busy</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Network Traffic</span>
                          <span className="text-orange-600">Monitor bandwidth</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Terminal Monitoring:</h4>
                      <div className="space-y-2">
                        <div className="bg-black rounded p-2 text-green-400 text-xs font-mono">
                          top -o cpu
                        </div>
                        <div className="bg-black rounded p-2 text-green-400 text-xs font-mono">
                          iotop -a
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Testing */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">Benchmark Testing Procedure</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-purple-900 mb-2">Test Scenarios:</h4>
                    <div className="space-y-2 text-purple-800 text-sm">
                      <div>• Single page scan (300 DPI, PDF)</div>
                      <div>• Multi-page document (10 pages)</div>
                      <div>• High resolution scan (600 DPI)</div>
                      <div>• Large file transfer (50+ MB)</div>
                      <div>• Concurrent scanning (multiple printers)</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-purple-900 mb-2">Measurements:</h4>
                    <div className="space-y-2 text-purple-800 text-sm">
                      <div>• Time from scan start to file appearance</div>
                      <div>• Network transfer rate (MB/s)</div>
                      <div>• System resource usage peaks</div>
                      <div>• Error rates and timeouts</div>
                      <div>• User experience responsiveness</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hardware Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-[#153B6B]/5 to-[#00A8B5]/5 rounded-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Hardware Recommendations</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Minimum */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="text-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Minimum</h3>
                  <div className="text-gray-600 text-sm">Basic functionality</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">CPU:</span>
                    <span className="font-semibold">Dual-core 2.5GHz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">RAM:</span>
                    <span className="font-semibold">4 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Storage:</span>
                    <span className="font-semibold">HDD 5400 RPM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Network:</span>
                    <span className="font-semibold">100 Mbps</span>
                  </div>
                </div>
              </div>

              {/* Recommended */}
              <div className="bg-white rounded-lg p-6 border-2 border-blue-500 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    RECOMMENDED
                  </div>
                </div>
                <div className="text-center mb-4 pt-2">
                  <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Recommended</h3>
                  <div className="text-gray-600 text-sm">Optimal performance</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">CPU:</span>
                    <span className="font-semibold">Quad-core 3.0GHz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">RAM:</span>
                    <span className="font-semibold">8 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Storage:</span>
                    <span className="font-semibold">SSD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Network:</span>
                    <span className="font-semibold">1 Gbps</span>
                  </div>
                </div>
              </div>

              {/* Enterprise */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="text-center mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Enterprise</h3>
                  <div className="text-gray-600 text-sm">High-volume environments</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">CPU:</span>
                    <span className="font-semibold">8+ cores 3.5GHz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">RAM:</span>
                    <span className="font-semibold">16+ GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Storage:</span>
                    <span className="font-semibold">NVMe SSD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Network:</span>
                    <span className="font-semibold">10 Gbps</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Related Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-[#153B6B] mb-6">Related Performance Topics</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">System Configuration</h3>
                <div className="space-y-3">
                  <Link href="/docs/network/setup" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <Settings className="w-4 h-4" />
                    Network Setup & Optimization
                  </Link>
                  <Link href="/docs/printers/setup" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <Settings className="w-4 h-4" />
                    Printer Configuration Guide
                  </Link>
                  <Link href="/docs/advanced/file-organization" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <Settings className="w-4 h-4" />
                    File Organization Best Practices
                  </Link>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Troubleshooting</h3>
                <div className="space-y-3">
                  <Link href="/docs/troubleshooting/connection" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <AlertCircle className="w-4 h-4" />
                    Connection Issues
                  </Link>
                  <Link href="/docs/troubleshooting/logs" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <AlertCircle className="w-4 h-4" />
                    Log Analysis Guide
                  </Link>
                  <Link href="/docs/troubleshooting/errors" className="flex items-center gap-2 text-[#00A8B5] hover:text-[#008c97] transition-colors">
                    <AlertCircle className="w-4 h-4" />
                    Error Code Reference
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