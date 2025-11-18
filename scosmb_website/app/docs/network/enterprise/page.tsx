"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Building2, Shield, Network, Users, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function EnterpriseNetworkPage() {
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
              <Building2 className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight"
            >
              <span className="text-[#00A8B5]">Enterprise</span> Network Setup
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Configure SCO SMB for enterprise environments with VLAN configuration, domain integration, and scalable deployment strategies.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                VLAN Support
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                Domain Integration
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                Scalable Architecture
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-12">
            
            {/* VLAN Configuration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Network className="w-8 h-8 text-[#00A8B5]" />
                <h2 className="text-2xl font-bold text-[#153B6B]">VLAN Configuration</h2>
              </div>
              
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold text-[#153B6B] mb-3">Network Segmentation</h3>
                <p className="text-gray-600 mb-6">
                  In enterprise environments, printers and workstations are often on separate VLANs for security. 
                  Configure inter-VLAN routing to allow communication between printer and workstation networks.
                </p>
                
                <div className="bg-blue-50 border-l-4 border-[#00A8B5] p-4 mb-6">
                  <h4 className="font-semibold text-[#153B6B] mb-2">Required Network Access</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Printers must reach workstations on configured FTP port (default: 21)</li>
                    <li>• Workstations need HTTP/HTTPS access to printer web interfaces</li>
                    <li>• DNS resolution between VLANs for hostname-based configurations</li>
                  </ul>
                </div>
                
                <h3 className="text-lg font-semibold text-[#153B6B] mb-3">Firewall Rules</h3>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <pre className="text-sm text-gray-800 overflow-x-auto">
{`# Sample firewall rules (adjust for your environment)
# Allow printers to connect to workstations on FTP port
allow from printer_vlan to workstation_vlan port 21

# Allow workstations to access printer web interfaces  
allow from workstation_vlan to printer_vlan port 80,443

# Allow DNS resolution
allow from any to dns_servers port 53`}
                  </pre>
                </div>
              </div>
            </motion.div>

            {/* Domain Integration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-[#00A8B5]" />
                <h2 className="text-2xl font-bold text-[#153B6B]">Domain Integration</h2>
              </div>
              
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold text-[#153B6B] mb-3">Active Directory Integration</h3>
                <p className="text-gray-600 mb-4">
                  Configure SCO SMB to work with your Active Directory environment for seamless hostname resolution and user authentication.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-[#153B6B] mb-3">DNS Configuration</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Ensure AD DNS servers are configured on workstations</li>
                      <li>• Verify forward and reverse DNS resolution</li>
                      <li>• Test hostname connectivity from printers</li>
                      <li>• Consider DNS suffixes for shorter hostnames</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-[#153B6B] mb-3">User Context</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Run SCO SMB under user context for proper permissions</li>
                      <li>• Configure service account if running as Windows service</li>
                      <li>• Ensure network access permissions for service accounts</li>
                      <li>• Test with domain user authentication</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Security Considerations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-[#00A8B5]" />
                <h2 className="text-2xl font-bold text-[#153B6B]">Security Considerations</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <h4 className="font-semibold text-red-800">Security Best Practices</h4>
                  </div>
                  <ul className="space-y-1 text-red-700 text-sm">
                    <li>• Enable IP whitelisting to restrict access to known printer IPs</li>
                    <li>• Use non-standard ports when possible to avoid automated attacks</li>
                    <li>• Implement network monitoring to detect unauthorized access attempts</li>
                    <li>• Regular security audits of printer and workstation configurations</li>
                  </ul>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-[#153B6B] mb-3">Network Isolation</h4>
                    <p className="text-gray-600 text-sm mb-3">
                      Isolate printer networks from general user networks to minimize attack surface.
                    </p>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Dedicated printer VLAN</li>
                      <li>• Controlled inter-VLAN routing</li>
                      <li>• Network access control (NAC)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-[#153B6B] mb-3">Monitoring & Logging</h4>
                    <p className="text-gray-600 text-sm mb-3">
                      Implement comprehensive logging and monitoring for compliance and security.
                    </p>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Enable SCO SMB audit logging</li>
                      <li>• Network traffic monitoring</li>
                      <li>• SIEM integration for alerts</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Deployment Strategies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-8 h-8 text-[#00A8B5]" />
                <h2 className="text-2xl font-bold text-[#153B6B]">Deployment Strategies</h2>
              </div>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-[#00A8B5] rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h4 className="font-semibold text-[#153B6B] mb-2">Centralized</h4>
                    <p className="text-sm text-gray-600">Single SCO SMB instance serving multiple printers</p>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-[#00A8B5] rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h4 className="font-semibold text-[#153B6B] mb-2">Distributed</h4>
                    <p className="text-sm text-gray-600">Multiple instances for geographical distribution</p>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-[#00A8B5] rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h4 className="font-semibold text-[#153B6B] mb-2">Hybrid</h4>
                    <p className="text-sm text-gray-600">Central management with local processing</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-[#153B6B] mb-3">Recommended Approach</h4>
                  <p className="text-gray-700 mb-3">
                    For most enterprise environments, we recommend starting with a centralized approach:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Install SCO SMB on a dedicated server or VM</li>
                    <li>• Configure all printers to send scans to this central instance</li>
                    <li>• Implement file sharing to distribute scans to users</li>
                    <li>• Scale to distributed model as needed</li>
                  </ul>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}