"use client";
import { motion } from 'framer-motion';
import React, { useState } from 'react';

export function DocumentScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [documentType, setDocumentType] = useState('business-card');
  const [scannedDocuments, setScannedDocuments] = useState<string[]>([]);

  const documentTypes = {
    'business-card': { name: 'Business Card', width: 'w-20', height: 'h-12', color: 'bg-white' },
    'receipt': { name: 'Receipt', width: 'w-16', height: 'h-24', color: 'bg-yellow-50' },
    'contract': { name: 'Contract', width: 'w-24', height: 'h-32', color: 'bg-blue-50' },
    'photo': { name: 'Photo', width: 'w-20', height: 'h-20', color: 'bg-gradient-to-br from-purple-100 to-pink-100' }
  };

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    // Simulate scanning progress
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsScanning(false);
            setScannedDocuments(prev => [...prev, documentTypes[documentType as keyof typeof documentTypes].name]);
            setScanProgress(0);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const clearScans = () => {
    setScannedDocuments([]);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <h2 className="text-3xl font-bold text-white mb-4">SCO-SMB Document Scanner</h2>
      
      {/* Document Type Selector */}
      <div className="flex gap-2 mb-4">
        {Object.entries(documentTypes).map(([key, type]) => (
          <button
            key={key}
            onClick={() => setDocumentType(key)}
            className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
              documentType === key 
                ? 'bg-cyan-600 text-white shadow-lg' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {type.name}
          </button>
        ))}
      </div>

      {/* Control Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={startScan}
          className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isScanning}
        >
          {isScanning ? `Scanning... ${scanProgress}%` : 'Start Document Scan'}
        </button>
        <button
          onClick={clearScans}
          className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          disabled={scannedDocuments.length === 0}
        >
          Clear Scans ({scannedDocuments.length})
        </button>
      </div>

      {/* Scanner Device */}
      <div className="relative">
        {/* Scanner Base */}
        <motion.div
          className="w-96 h-80 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-2xl border-2 border-gray-600"
          animate={isScanning ? { boxShadow: ['0 0 0 0 rgba(34, 197, 94, 0)', '0 0 20px 5px rgba(34, 197, 94, 0.3)', '0 0 0 0 rgba(34, 197, 94, 0)'] } : {}}
          transition={{ duration: 2, repeat: isScanning ? Infinity : 0 }}
        >
          {/* Scanner Lid */}
          <motion.div
            className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-gray-600 to-gray-700 rounded-t-xl border-b-2 border-gray-500"
            animate={isScanning ? { 
              backgroundColor: ['#4b5563', '#059669', '#4b5563'],
            } : {}}
            transition={{ duration: 1, repeat: isScanning ? Infinity : 0 }}
          >
            {/* Scanner Brand */}
            <div className="absolute top-1 left-4 text-xs font-bold text-cyan-400">SCO-SMB</div>
            <div className="absolute top-1 right-4 text-xs text-gray-300">PRO SCANNER</div>
          </motion.div>

          {/* Scanning Bed */}
          <div className="absolute top-6 left-4 right-4 bottom-16 bg-black rounded-lg border-2 border-gray-700 overflow-hidden">
            {/* Document on Bed */}
            <motion.div
              className={`absolute top-4 left-4 ${documentTypes[documentType as keyof typeof documentTypes].width} ${documentTypes[documentType as keyof typeof documentTypes].height} ${documentTypes[documentType as keyof typeof documentTypes].color} rounded border border-gray-300 shadow-lg`}
              animate={isScanning ? { 
                y: [-2, 2, -2],
                boxShadow: ['0 0 0 0 rgba(34, 197, 94, 0)', '0 0 15px 3px rgba(34, 197, 94, 0.4)', '0 0 0 0 rgba(34, 197, 94, 0)']
              } : {}}
              transition={{ duration: 1, repeat: isScanning ? Infinity : 0 }}
            >
              {/* Document Content Based on Type */}
              {documentType === 'business-card' && (
                <div className="p-2 text-xs">
                  <div className="font-bold text-gray-800 text-[6px]">John Smith</div>
                  <div className="text-gray-600 text-[4px]">CEO, SCO-SMB</div>
                  <div className="text-blue-600 text-[4px] mt-1">john@sco-smb.com</div>
                </div>
              )}
              {documentType === 'receipt' && (
                <div className="p-1 text-xs">
                  <div className="text-center text-[4px] font-bold">OFFICE SUPPLIES</div>
                  <div className="text-[3px] text-gray-700 mt-1">Paper: $25.99</div>
                  <div className="text-[3px] text-gray-700">Ink: $45.99</div>
                  <div className="border-t border-gray-400 mt-1 pt-1">
                    <div className="text-[3px] font-bold">Total: $71.98</div>
                  </div>
                </div>
              )}
              {documentType === 'contract' && (
                <div className="p-2 text-xs">
                  <div className="text-center text-[5px] font-bold text-blue-800">SERVICE AGREEMENT</div>
                  <div className="text-[3px] text-gray-700 mt-1 space-y-0.5">
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <div className="w-3/4 h-[1px] bg-gray-300"></div>
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <div className="w-1/2 h-[1px] bg-gray-300"></div>
                  </div>
                  <div className="absolute bottom-1 right-1 text-[3px] text-blue-600">SCO-SMB</div>
                </div>
              )}
              {documentType === 'photo' && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-[6px] text-purple-600 font-bold">📸</div>
                </div>
              )}
            </motion.div>

            {/* Scanning Light Bar */}
            {isScanning && (
              <motion.div
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg shadow-cyan-400/50"
                animate={{
                  y: [0, 200, 0],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: isScanning ? Infinity : 0,
                  ease: "easeInOut"
                }}
              />
            )}

            {/* Progress Indicator */}
            {isScanning && (
              <div className="absolute bottom-2 left-2 right-2">
                <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 to-green-400 rounded-full"
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <div className="text-xs text-cyan-400 text-center mt-1">{scanProgress}%</div>
              </div>
            )}
          </div>

          {/* Control Panel */}
          <div className="absolute bottom-4 left-4 right-4 h-10 bg-gray-700 rounded-lg border border-gray-600 flex items-center justify-between px-4">
            {/* Status LEDs */}
            <div className="flex gap-2">
              <motion.div
                className="w-2 h-2 rounded-full"
                animate={{ 
                  backgroundColor: isScanning ? ['#22c55e', '#eab308', '#22c55e'] : ['#6b7280']
                }}
                transition={{ duration: 0.5, repeat: isScanning ? Infinity : 0 }}
              />
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <div className="w-2 h-2 bg-red-500 rounded-full" />
            </div>

            {/* Display */}
            <div className="text-xs text-cyan-400 font-mono">
              {isScanning ? 'SCANNING...' : 'READY'}
            </div>

            {/* Buttons */}
            <div className="flex gap-1">
              <div className="w-4 h-4 bg-gray-600 rounded border border-gray-500"></div>
              <div className="w-4 h-4 bg-gray-600 rounded border border-gray-500"></div>
            </div>
          </div>
        </motion.div>

        {/* Digital Output Display */}
        <motion.div
          className="absolute -right-32 top-8 w-24 h-32 bg-gray-900 rounded-lg border-2 border-gray-600 p-2"
          animate={isScanning ? { 
            borderColor: ['#4b5563', '#06b6d4', '#4b5563']
          } : {}}
          transition={{ duration: 1, repeat: isScanning ? Infinity : 0 }}
        >
          <div className="text-xs text-cyan-400 text-center mb-2">DIGITAL OUTPUT</div>
          <div className="space-y-1">
            {scannedDocuments.slice(-3).map((doc, index) => (
              <motion.div
                key={index}
                className="text-xs bg-gray-800 p-1 rounded text-green-400"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                ✓ {doc}
              </motion.div>
            ))}
            {isScanning && (
              <motion.div
                className="text-xs bg-yellow-900 p-1 rounded text-yellow-400"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                📄 Scanning...
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Results Summary */}
      <div className="text-center text-gray-300 mt-4">
        <p className="text-lg">Documents Scanned: {scannedDocuments.length}</p>
        <p className="text-sm">
          {isScanning ? `Scanning ${documentTypes[documentType as keyof typeof documentTypes].name}...` : 'Scanner Ready for Next Document'}
        </p>
        {scannedDocuments.length > 0 && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg max-w-md mx-auto">
            <p className="text-cyan-400 font-semibold mb-2">Recent Scans:</p>
            <div className="space-y-1">
              {scannedDocuments.slice(-5).map((doc, index) => (
                <div key={index} className="text-sm text-green-400">
                  📄 {doc}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}