'use client';

import React, { useState } from 'react';
import { Network, Wifi, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export function NetworkBandwidthCalculator() {
  const [scansPerHour, setScansPerHour] = useState(20);
  const [avgFileSize, setAvgFileSize] = useState(2);
  const [calculated, setCalculated] = useState(false);

  // Calculations
  const hourlyData = scansPerHour * avgFileSize; // MB per hour
  const dailyData = hourlyData * 8; // MB per 8-hour workday
  const peakBandwidth = (hourlyData / 3600) * 8; // Mbps (assuming even distribution)
  
  // Network assessment
  const getNetworkAssessment = () => {
    if (peakBandwidth < 1) return {
      status: 'Excellent',
      color: 'green',
      icon: CheckCircle2,
      message: 'Any standard network can handle this easily',
      recommendation: 'Even basic Wi-Fi (10 Mbps+) is sufficient'
    };
    if (peakBandwidth < 5) return {
      status: 'Good',
      color: 'blue',
      icon: CheckCircle2,
      message: 'Standard business network is perfect',
      recommendation: 'Wi-Fi or wired Ethernet both work well'
    };
    if (peakBandwidth < 20) return {
      status: 'Adequate',
      color: 'yellow',
      icon: AlertTriangle,
      message: 'Moderate bandwidth required',
      recommendation: 'Wired Ethernet (100 Mbps) recommended for reliability'
    };
    return {
      status: 'High',
      color: 'orange',
      icon: AlertTriangle,
      message: 'High-volume scanning operation',
      recommendation: 'Gigabit Ethernet recommended for optimal performance'
    };
  };

  const assessment = getNetworkAssessment();
  const AssessmentIcon = assessment.icon;

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden hover-lift card-depth group">
      <div className="bg-linear-to-br from-[#153B6B] via-[#1e4a7f] to-[#00A8B5] p-10 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative z-10 flex items-center gap-4 mb-2">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Network className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Network Bandwidth Calculator</h2>
            <p className="text-white/90 text-sm mt-1">Check your network requirements</p>
          </div>
        </div>
      </div>

      <div className="p-12">
        <p className="text-gray-600 mb-8 text-center leading-relaxed">
          Ensure your network can handle your scanning volume. Calculate bandwidth needs and get setup recommendations.
        </p>
        
        <div className="space-y-6 mb-8">
          {/* Scans per Hour */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">Scans per Hour (peak)</label>
              <span className="text-2xl font-bold text-[#00A8B5]">{scansPerHour}</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={scansPerHour}
              onChange={(e) => {
                setScansPerHour(Number(e.target.value));
                setCalculated(false);
              }}
              className="w-full h-3 bg-linear-to-r from-gray-200 via-blue-200 to-blue-400 rounded-full appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>5</span>
              <span>100</span>
            </div>
          </div>

          {/* Average File Size */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">Average File Size (MB)</label>
              <span className="text-2xl font-bold text-[#00A8B5]">{avgFileSize}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={avgFileSize}
              onChange={(e) => {
                setAvgFileSize(Number(e.target.value));
                setCalculated(false);
              }}
              className="w-full h-3 bg-linear-to-r from-gray-200 via-blue-200 to-blue-400 rounded-full appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0.5 MB</span>
              <span>10 MB</span>
            </div>
            <p className="text-xs text-gray-500 italic">
              Typical: 1-3 MB for documents, 5-10 MB for high-res images
            </p>
          </div>

          <motion.button
            onClick={() => setCalculated(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-linear-to-r from-[#153B6B] to-[#00A8B5] text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Check Network Requirements
          </motion.button>
        </div>

        {calculated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Data Transfer Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#00A8B5]/10 p-5 rounded-xl border border-[#00A8B5]/30 text-center">
                <div className="text-2xl font-bold text-[#00A8B5]">{hourlyData.toFixed(1)} MB</div>
                <div className="text-xs text-gray-600 mt-1">Per Hour</div>
              </div>
              <div className="bg-[#00A8B5]/10 p-5 rounded-xl border border-[#00A8B5]/30 text-center">
                <div className="text-2xl font-bold text-[#00A8B5]">{dailyData.toFixed(1)} MB</div>
                <div className="text-xs text-gray-600 mt-1">Per Day (8 hrs)</div>
              </div>
              <div className="bg-[#153B6B]/10 p-5 rounded-xl border border-[#153B6B]/30 text-center">
                <div className="text-2xl font-bold text-[#153B6B]">{peakBandwidth.toFixed(2)} Mbps</div>
                <div className="text-xs text-gray-600 mt-1">Peak Bandwidth</div>
              </div>
            </div>

            {/* Network Assessment */}
            <div className={`bg-linear-to-br from-${assessment.color}-50 to-${assessment.color}-100 p-6 rounded-xl border-2 border-${assessment.color}-300`}>
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-10 h-10 bg-${assessment.color}-500 rounded-full flex items-center justify-center shrink-0`}>
                  <AssessmentIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    Network Status: {assessment.status}
                  </h4>
                  <p className="text-gray-700 mt-1">{assessment.message}</p>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-linear-to-br from-gray-50 to-[#00A8B5]/10 p-6 rounded-xl border border-[#00A8B5]/30">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Wifi className="w-5 h-5 text-[#00A8B5]" />
                Recommended Setup
              </h4>
              <p className="text-gray-700 font-medium mb-3">
                {assessment.recommendation}
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <span className="text-[#00A8B5] font-bold mt-0.5">✓</span>
                  <span>SCO SMB uses FTP transfer - very network efficient</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#00A8B5] font-bold mt-0.5">✓</span>
                  <span>No cloud upload required - stays on your local network</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#00A8B5] font-bold mt-0.5">✓</span>
                  <span>Works offline - no internet dependency</span>
                </div>
              </div>
            </div>

            {/* Technical Details */}
            <div className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-300">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">Technical Details</h4>
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
                <div>
                  <span className="font-medium text-gray-900">Protocol:</span> FTP
                </div>
                <div>
                  <span className="font-medium text-gray-900">Ports:</span> 21, 20
                </div>
                <div>
                  <span className="font-medium text-gray-900">Transfer:</span> Direct to server
                </div>
                <div>
                  <span className="font-medium text-gray-900">Security:</span> Local network only
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #153B6B, #00A8B5);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 168, 181, 0.4);
          transition: all 0.2s;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(0, 168, 181, 0.6);
        }
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #153B6B, #00A8B5);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 168, 181, 0.4);
          border: none;
          transition: all 0.2s;
        }
        .slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(0, 168, 181, 0.6);
        }
      `}</style>
    </div>
  );
}
