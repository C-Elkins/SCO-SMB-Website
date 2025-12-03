'use client';

import React, { useState } from 'react';
import { Calculator, TrendingDown, Clock, DollarSign, Users, FileText, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ScanCostCalculator() {
  const [scansPerDay, setScansPerDay] = useState(50);
  const [employeeRate, setEmployeeRate] = useState(25);
  const [timePerScan, setTimePerScan] = useState(3);
  const [showResults, setShowResults] = useState(false);

  // Calculations
  const manualTimePerScan = timePerScan; // minutes
  const automatedTimePerScan = 0.5; // minutes with SCO SMB
  
  const dailyManualTime = (scansPerDay * manualTimePerScan) / 60; // hours
  const dailyAutomatedTime = (scansPerDay * automatedTimePerScan) / 60; // hours
  const timeSavedDaily = dailyManualTime - dailyAutomatedTime; // hours
  
  const dailyCostManual = dailyManualTime * employeeRate;
  const dailyCostAutomated = dailyAutomatedTime * employeeRate;
  const dailySavings = dailyCostManual - dailyCostAutomated;
  
  const annualSavings = dailySavings * 260; // 260 work days
  const annualTimeSaved = timeSavedDaily * 260; // hours per year
  
  const roiMonths = 299 / dailySavings; // $299 software cost / daily savings

  const handleCalculate = () => {
    setShowResults(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-linear-to-br from-[#153B6B] to-[#00A8B5] p-8 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">ROI Calculator</h2>
            <p className="text-white/80 text-sm">Calculate your savings with SCO SMB</p>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="p-8 space-y-6">
        {/* Scans per day */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#00A8B5]" />
              Scans per day
            </label>
            <span className="text-2xl font-bold text-[#153B6B]">{scansPerDay}</span>
          </div>
          <input
            type="range"
            min="10"
            max="500"
            step="10"
            value={scansPerDay}
            onChange={(e) => setScansPerDay(Number(e.target.value))}
            className="w-full h-3 bg-linear-to-r from-gray-200 via-[#00A8B5]/20 to-[#00A8B5]/40 rounded-full appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>10</span>
            <span>500</span>
          </div>
        </div>

        {/* Employee hourly rate */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#00A8B5]" />
              Employee hourly rate
            </label>
            <span className="text-2xl font-bold text-[#153B6B]">${employeeRate}</span>
          </div>
          <input
            type="range"
            min="15"
            max="100"
            step="5"
            value={employeeRate}
            onChange={(e) => setEmployeeRate(Number(e.target.value))}
            className="w-full h-3 bg-linear-to-r from-gray-200 via-[#00A8B5]/20 to-[#00A8B5]/40 rounded-full appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>$15</span>
            <span>$100</span>
          </div>
        </div>

        {/* Time per manual scan */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#00A8B5]" />
              Minutes per manual scan
            </label>
            <span className="text-2xl font-bold text-[#153B6B]">{timePerScan} min</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={timePerScan}
            onChange={(e) => setTimePerScan(Number(e.target.value))}
            className="w-full h-3 bg-linear-to-r from-gray-200 via-[#00A8B5]/20 to-[#00A8B5]/40 rounded-full appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1 min</span>
            <span>10 min</span>
          </div>
        </div>

        {/* Calculate Button */}
        <motion.button
          onClick={handleCalculate}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-linear-to-r from-[#153B6B] to-[#00A8B5] text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          Calculate Savings
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Results Section */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 bg-linear-to-br from-gray-50 to-white p-8"
          >
            <h3 className="text-xl font-bold text-[#153B6B] mb-6 flex items-center gap-2">
              <TrendingDown className="w-6 h-6 text-green-600" />
              Your Estimated Savings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Daily Savings */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              >
                <p className="text-sm text-gray-600 mb-2">Daily Savings</p>
                <p className="text-3xl font-bold text-green-600">${dailySavings.toFixed(2)}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {timeSavedDaily.toFixed(1)} hours saved per day
                </p>
              </motion.div>

              {/* Annual Savings */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-linear-to-br from-green-500 to-emerald-600 p-6 rounded-xl shadow-lg text-white"
              >
                <p className="text-sm text-white/80 mb-2">Annual Savings</p>
                <p className="text-3xl font-bold">${annualSavings.toLocaleString()}</p>
                <p className="text-xs text-white/80 mt-2">
                  {annualTimeSaved.toFixed(0)} hours saved per year
                </p>
              </motion.div>
            </div>

            {/* ROI Timeline */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-blue-50 border border-blue-200 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-blue-900 font-semibold">ROI Timeline</p>
                  <p className="text-xs text-blue-700">Time to recover software cost</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-blue-900">
                {roiMonths < 1 
                  ? `${Math.ceil(roiMonths * 30)} days` 
                  : `${roiMonths.toFixed(1)} months`}
              </p>
            </motion.div>

            {/* Productivity Boost */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 bg-linear-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6"
            >
              <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Productivity Impact
              </h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-purple-900">
                    {((timeSavedDaily / dailyManualTime) * 100).toFixed(0)}%
                  </p>
                  <p className="text-xs text-purple-700">Time Reduction</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-900">
                    {Math.floor(annualTimeSaved / 8)}
                  </p>
                  <p className="text-xs text-purple-700">Work Days Saved/Year</p>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center"
            >
              <a
                href="/download"
                className="inline-flex items-center gap-2 bg-[#00A8B5] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#008c99] transition-colors shadow-lg"
              >
                Start Saving Today
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
