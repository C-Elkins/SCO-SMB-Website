'use client';

import React, { useState } from 'react';
import { FileText, TrendingUp, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function DocumentVolumeCalculator() {
  const [employees, setEmployees] = useState(10);
  const [docsPerEmployee, setDocsPerEmployee] = useState(5);
  const [calculated, setCalculated] = useState(false);

  const dailyVolume = employees * docsPerEmployee;
  const weeklyVolume = dailyVolume * 5;
  const monthlyVolume = dailyVolume * 22;
  const annualVolume = dailyVolume * 260;
  
  // Storage estimates (avg 2MB per scanned document)
  const annualStorageGB = (annualVolume * 2) / 1024;
  
  // Recommendations based on volume
  const getRecommendation = () => {
    if (dailyVolume < 20) return { level: 'Low', color: 'green', message: 'Perfect for single printer setup' };
    if (dailyVolume < 100) return { level: 'Medium', color: 'blue', message: 'Consider 2-3 printers for redundancy' };
    if (dailyVolume < 300) return { level: 'High', color: 'orange', message: 'Multi-printer setup recommended' };
    return { level: 'Very High', color: 'red', message: 'Enterprise deployment needed' };
  };

  const recommendation = getRecommendation();

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden hover-lift card-depth group">
      <div className="bg-linear-to-br from-[#153B6B] via-[#1e4a7f] to-[#00A8B5] p-10 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-cyan-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative z-10 flex items-center gap-4 mb-2">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Document Volume Calculator</h2>
            <p className="text-white/90 text-sm mt-1">Estimate your scanning needs</p>
          </div>
        </div>
      </div>

      <div className="p-12">
        <p className="text-gray-600 mb-8 text-center leading-relaxed">
          Calculate your organization&apos;s document scanning volume and get personalized setup recommendations.
        </p>
        
        <div className="space-y-6 mb-8">
          {/* Number of Employees */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">Number of Employees</label>
              <span className="text-2xl font-bold text-[#00A8B5]">{employees}</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              step="1"
              value={employees}
              onChange={(e) => {
                setEmployees(Number(e.target.value));
                setCalculated(false);
              }}
              className="w-full h-3 bg-linear-to-r from-gray-200 via-emerald-200 to-emerald-400 rounded-full appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1</span>
              <span>100</span>
            </div>
          </div>

          {/* Documents per Employee */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">Documents per Employee/Day</label>
              <span className="text-2xl font-bold text-[#00A8B5]">{docsPerEmployee}</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={docsPerEmployee}
              onChange={(e) => {
                setDocsPerEmployee(Number(e.target.value));
                setCalculated(false);
              }}
              className="w-full h-3 bg-linear-to-r from-gray-200 via-[#00A8B5]/20 to-[#00A8B5]/40 rounded-full appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1</span>
              <span>50</span>
            </div>
          </div>

          <motion.button
            onClick={() => setCalculated(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-linear-to-r from-[#153B6B] to-[#00A8B5] text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Calculate Volume
          </motion.button>
        </div>

        {calculated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Volume Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#00A8B5]/10 p-4 rounded-xl border border-[#00A8B5]/30 text-center">
                <div className="text-2xl font-bold text-[#00A8B5]">{dailyVolume}</div>
                <div className="text-xs text-gray-600 mt-1">Per Day</div>
              </div>
              <div className="bg-[#00A8B5]/10 p-4 rounded-xl border border-[#00A8B5]/30 text-center">
                <div className="text-2xl font-bold text-[#00A8B5]">{weeklyVolume}</div>
                <div className="text-xs text-gray-600 mt-1">Per Week</div>
              </div>
              <div className="bg-[#153B6B]/10 p-4 rounded-xl border border-[#153B6B]/30 text-center">
                <div className="text-2xl font-bold text-[#153B6B]">{monthlyVolume.toLocaleString()}</div>
                <div className="text-xs text-gray-600 mt-1">Per Month</div>
              </div>
              <div className="bg-[#153B6B]/10 p-4 rounded-xl border border-[#153B6B]/30 text-center">
                <div className="text-2xl font-bold text-[#153B6B]">{annualVolume.toLocaleString()}</div>
                <div className="text-xs text-gray-600 mt-1">Per Year</div>
              </div>
            </div>

            {/* Storage Estimate */}
            <div className="bg-linear-to-br from-[#00A8B5]/10 to-[#153B6B]/10 p-6 rounded-xl border border-[#00A8B5]/30">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#00A8B5]" />
                Storage Requirements
              </h4>
              <p className="text-gray-700">
                Estimated annual storage: <span className="font-bold text-[#00A8B5]">{annualStorageGB.toFixed(1)} GB</span>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Based on average 2MB per scanned document
              </p>
            </div>

            {/* Recommendation */}
            <div className={`bg-linear-to-br from-${recommendation.color}-50 to-${recommendation.color}-100 p-6 rounded-xl border-2 border-${recommendation.color}-300`}>
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <AlertCircle className={`w-5 h-5 text-${recommendation.color}-600`} />
                Setup Recommendation: {recommendation.level} Volume
              </h4>
              <p className="text-gray-700 font-medium">
                {recommendation.message}
              </p>
              <p className="text-sm text-gray-600 mt-3">
                {dailyVolume < 100 
                  ? "SCO SMB handles this volume efficiently with minimal configuration."
                  : "SCO SMB supports unlimited printers and users, perfect for high-volume environments."}
              </p>
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
