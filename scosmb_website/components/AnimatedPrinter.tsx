"use client";
import { motion } from 'framer-motion';
import React, { useState } from 'react';

export function AnimatedPrinter() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [showWelcomeDoc, setShowWelcomeDoc] = useState(false);
  const [showComputerWelcome, setShowComputerWelcome] = useState(false);
  const [paperStack, setPaperStack] = useState(5);

  const startScanAnimation = () => {
    // Reset all states
    setScanComplete(false);
    setShowComputerWelcome(false);
    setShowWelcomeDoc(false);
    
    setIsScanning(true);
    
    // Wait for scan to complete (3 seconds)
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      
      // Show scan complete for 1 second, then show computer message
      setTimeout(() => {
        setShowComputerWelcome(true);
        
        // Auto-start printing after message displays
        setTimeout(() => {
          setIsPrinting(true);
          setPaperStack(prev => Math.max(0, prev - 1));
          setTimeout(() => {
            setIsPrinting(false);
            setShowWelcomeDoc(true);
            // Hide welcome doc and computer message after 5 seconds
            setTimeout(() => {
              setShowWelcomeDoc(false);
              setShowComputerWelcome(false);
              setScanComplete(false);
            }, 5000);
          }, 2500);
        }, 1000);
      }, 1000);
    }, 3000);
  };

  const startPrintAnimation = () => {
    setScanComplete(false);
    setIsPrinting(true);
    setShowComputerWelcome(true);
    setPaperStack(prev => Math.max(0, prev - 1));
    setTimeout(() => {
      setIsPrinting(false);
      setShowWelcomeDoc(true);
      setTimeout(() => {
        setShowWelcomeDoc(false);
        setShowComputerWelcome(false);
      }, 4000);
    }, 2500);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <h2 className="text-4xl font-bold text-white mb-8">SCO-SMB Enterprise Office Suite</h2>
      
      {/* Single Scan Button */}
      <div className="mb-8">
        <button
          onClick={startScanAnimation}
          className="px-12 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-xl font-semibold rounded-xl transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          disabled={isScanning || isPrinting}
        >
          {isScanning ? 'Scanning...' : 'Scan Document'}
        </button>
      </div>

      {/* Side-by-Side Layout */}
      <div className="flex items-start gap-12">
        {/* Redesigned Kyocera Printer */}
        <div className="relative">
        {/* Printer Base - Same size as monitor */}
        <motion.div
          className="w-[480px] h-80 bg-gradient-to-b from-gray-100 to-gray-300 rounded-xl shadow-2xl border-2 border-gray-400 relative overflow-hidden"
          animate={isPrinting ? { y: [0, -1, 0] } : {}}
          transition={{ duration: 0.3, repeat: isPrinting ? Infinity : 0 }}
        >
          {/* Kyocera Branding - Top Center like real printers */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
            <div className="text-lg font-bold text-red-600" style={{ fontFamily: '"Arial", sans-serif' }}>
              KYOCERA
            </div>
            <div className="text-xs text-gray-700 font-bold bg-gray-200 px-2 py-0.5 rounded">
              ECOSYS M3145idn
            </div>
          </div>

          {/* Scanner Lid */}
          <motion.div
            className="absolute top-8 left-6 right-6 h-14 bg-gradient-to-b from-gray-50 to-gray-150 rounded-lg border-2 border-gray-400 shadow-lg"
            animate={isScanning ? { 
              backgroundColor: ['#f9fafb', '#ecfdf5', '#f9fafb']
            } : {}}
            transition={{ duration: 0.8, repeat: isScanning ? 4 : 0 }}
          >
            {/* Scanner Glass */}
            <div className="absolute inset-2 bg-black rounded border border-gray-500 overflow-hidden">
              {/* Document on Scanner */}
              <div className="absolute top-1 left-1 w-12 h-14 bg-white rounded-sm border border-gray-200 shadow-sm">
                <div className="p-0.5">
                  <div className="w-full h-0.5 bg-blue-600 rounded mb-0.5"></div>
                  <div className="text-[4px] font-bold text-blue-700">SCO-SMB</div>
                  <div className="mt-0.5 space-y-0.5">
                    <div className="w-full h-[0.5px] bg-gray-300"></div>
                    <div className="w-3/4 h-[0.5px] bg-gray-300"></div>
                    <div className="w-full h-[0.5px] bg-gray-300"></div>
                  </div>
                </div>
              </div>

              {/* Scanning Light Bar */}
              {isScanning && (
                <motion.div
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg shadow-cyan-400/50"
                  animate={{
                    y: [0, 60, 0],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{ 
                    duration: 2.8,
                    ease: "easeInOut"
                  }}
                />
              )}
            </div>
          </motion.div>

          {/* Main Control Panel */}
          <div className="absolute top-26 left-12 right-12 h-24 bg-gradient-to-b from-gray-300 to-gray-400 rounded-lg border-2 border-gray-500 shadow-inner">
            
            {/* LCD Display */}
            <div className="absolute top-2 left-2 w-28 h-6 bg-blue-900 rounded border border-gray-600 flex items-center justify-center">
              <motion.div
                className="text-cyan-400 text-sm font-mono tracking-wide"
                animate={{ opacity: scanComplete ? [1, 0.3, 1] : [1] }}
                transition={{ duration: 0.5, repeat: scanComplete ? Infinity : 0 }}
              >
                {isScanning ? 'SCANNING...' : scanComplete ? 'SCAN COMPLETE' : isPrinting ? 'PRINTING...' : 'READY'}
              </motion.div>
            </div>

            {/* Function Buttons - Real Kyocera Layout */}
            <div className="absolute top-2 right-2 flex gap-0.5">
              <motion.div 
                className="w-5 h-5 bg-green-500 rounded-sm border border-green-600 flex items-center justify-center text-white text-[6px] font-bold shadow-sm"
                animate={isScanning ? { backgroundColor: ['#22c55e', '#16a34a', '#22c55e'] } : {}}
                transition={{ duration: 0.5, repeat: isScanning ? Infinity : 0 }}
              >
                ▶
              </motion.div>
              <div className="w-5 h-5 bg-red-500 rounded-sm border border-red-600 flex items-center justify-center text-white text-[6px] font-bold shadow-sm">
                ⏸
              </div>
              <div className="w-5 h-5 bg-blue-500 rounded-sm border border-blue-600 flex items-center justify-center text-white text-[6px] font-bold shadow-sm">
                📋
              </div>
            </div>

            {/* Number Pad */}
            <div className="absolute bottom-2 left-2 grid grid-cols-3 gap-0.5">
              {[1,2,3,4,5,6,7,8,9,'*',0,'#'].map((num, i) => (
                <div key={i} className="w-3 h-3 bg-white rounded-sm border border-gray-400 flex items-center justify-center text-[6px] font-semibold text-gray-700 shadow-sm">
                  {num}
                </div>
              ))}
            </div>

            {/* Status LEDs */}
            <div className="absolute bottom-2 right-2 flex gap-0.5">
              <motion.div
                className="w-1.5 h-1.5 rounded-full border border-gray-500"
                animate={{ 
                  backgroundColor: isScanning ? ['#22c55e', '#16a34a', '#22c55e'] : 
                                   isPrinting ? ['#eab308', '#ca8a04', '#eab308'] : 
                                   ['#6b7280']
                }}
                transition={{ duration: 0.5, repeat: (isScanning || isPrinting) ? Infinity : 0 }}
              />
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full border border-gray-500" />
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full border border-gray-500" />
            </div>
          </div>

          {/* Paper Input Tray (Bottom Center) */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-28 h-10 bg-gradient-to-t from-gray-400 to-gray-300 rounded border border-gray-500 shadow-lg">
            <div className="absolute top-1 left-1 right-1 h-6 bg-white rounded border border-gray-300 shadow-sm overflow-hidden">
              {/* Paper Stack Indicator */}
              <div className="absolute top-0.5 left-0.5 right-0.5 h-0.5 bg-gray-200 rounded"></div>
              <div className="absolute top-2 left-0.5 right-0.5 h-0.5 bg-gray-200 rounded"></div>
              <div className="absolute top-3.5 left-0.5 right-0.5 h-0.5 bg-gray-200 rounded"></div>
            </div>
            <div className="absolute bottom-0.5 left-1 text-[5px] text-gray-700 font-bold">
              250
            </div>
          </div>

          {/* Paper Output Tray (Right Side) */}
          <motion.div
            className="absolute bottom-16 right-6 w-20 h-6 bg-gradient-to-t from-gray-300 to-gray-200 rounded border border-gray-400 shadow-sm"
            animate={isPrinting ? { y: [0, -0.5, 0] } : {}}
            transition={{ duration: 0.3, repeat: isPrinting ? Infinity : 0 }}
          >
            <div className="absolute top-0.5 left-0.5 right-0.5 h-3 bg-gray-100 rounded border border-gray-300 shadow-inner"></div>
            <div className="absolute bottom-0.5 right-0.5 text-[5px] text-gray-700 font-bold">
              OUT
            </div>
          </motion.div>



          {/* Status Display */}
          <div className="absolute bottom-24 left-6 w-20 h-5 bg-black rounded border border-gray-600 flex items-center justify-center">
            <motion.div
              className="text-cyan-400 text-[6px] font-mono"
              animate={{ opacity: scanComplete ? [1, 0.5, 1] : [1] }}
              transition={{ duration: 0.5, repeat: scanComplete ? Infinity : 0 }}
            >
              {isScanning ? 'SCANNING' : scanComplete ? 'COMPLETE' : isPrinting ? 'PRINTING' : 'READY'}
            </motion.div>
          </div>

          {/* Paper Feed Rollers (Hidden Internal) */}
          <motion.div
            className="absolute top-56 left-12 w-4 h-4 border-2 border-gray-600 rounded-full opacity-30"
            animate={isPrinting ? { rotate: 360 } : {}}
            transition={{ duration: 0.3, repeat: isPrinting ? Infinity : 0, ease: "linear" }}
          >
            <div className="absolute inset-0.5 bg-gray-500 rounded-full" />
          </motion.div>

          {/* Cooling Vents (Right Side) */}
          <div className="absolute right-2 top-56 flex flex-col gap-0.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-8 h-0.5 bg-gray-600 rounded-full shadow-inner"
                animate={isPrinting ? {
                  backgroundColor: ['#4b5563', '#6b7280', '#4b5563']
                } : {}}
                transition={{ 
                  duration: 0.6, 
                  repeat: isPrinting ? Infinity : 0,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>

          {/* Side Access Panel */}
          <div className="absolute right-1 top-60 w-3 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-r border border-gray-600 shadow-sm">
            <div className="absolute top-1 left-0.5 w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="absolute bottom-1 left-0.5 w-1 h-6 bg-gray-600 rounded"></div>
          </div>

          {/* Front Access Handle */}
          <div className="absolute bottom-24 left-1 w-2 h-6 bg-gray-600 rounded-r border border-gray-700 shadow-md">
            <div className="absolute top-1 left-0.5 w-0.5 h-4 bg-gray-500 rounded"></div>
          </div>
        </motion.div>

        {/* SCO-SMB Professional Document Output */}
        {(isPrinting || showWelcomeDoc) && (
          <motion.div
            className="absolute top-32 right-8 w-16 h-20 bg-white border border-gray-400 rounded-sm shadow-xl z-20"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{
              opacity: showWelcomeDoc ? [0, 1, 1, 1] : [0, 1, 1, 0],
              scale: showWelcomeDoc ? [0.8, 1.1, 1, 1] : [0.8, 1.1, 1, 0.9],
              y: showWelcomeDoc ? [10, -8, -5, -5] : [10, -8, -5, 0],
              x: showWelcomeDoc ? [0, 3, 0, 0] : [0, 3, 0, 8],
              rotate: showWelcomeDoc ? [0, 3, -1, 0] : [0, 3, -1, 5]
            }}
            transition={{ duration: showWelcomeDoc ? 2.2 : 3.0, ease: "easeOut" }}
            style={{ transformOrigin: 'bottom right' }}
          >
            {/* Professional Document Content */}
            <div className="p-1">
              <div className="text-center mb-1">
                <div className="w-12 h-1.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded mb-0.5 mx-auto" />
                <div className="text-[6px] font-bold text-blue-700">SCO-SMB</div>
                <div className="text-[4px] font-semibold text-gray-600">PROFESSIONAL</div>
              </div>
              
              {/* Welcome Message */}
              <div className="space-y-0.5">
                <div className="text-[5px] font-bold text-center text-gray-800">WELCOME TO</div>
                <div className="text-[5px] font-bold text-center text-blue-700">ENTERPRISE</div>
                <div className="text-[5px] font-bold text-center text-blue-700">SOLUTIONS</div>
                
                {/* Separator */}
                <div className="w-full h-0.5 bg-gray-300 rounded my-1" />
                
                {/* Features */}
                <div className="space-y-0.5">
                  <div className="text-[4px] text-gray-700 text-center">✓ Secure Scanning</div>
                  <div className="text-[4px] text-gray-700 text-center">✓ Cloud Ready</div>
                  <div className="text-[4px] text-gray-700 text-center">✓ 24/7 Support</div>
                </div>
              </div>

              {/* Footer Branding */}
              <div className="absolute bottom-0.5 right-0.5 text-[3px] text-gray-500 font-mono">
                KYOCERA
              </div>
            </div>
          </motion.div>
        )}

        {/* Scan Line Effect */}
        {isScanning && (
          <motion.div
            className="absolute top-8 left-0 right-0 h-0.5 bg-cyan-400 shadow-lg shadow-cyan-400/50"
            animate={{
              y: [0, 48, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 1, repeat: 3, ease: "easeInOut" }}
          />
        )}
      </div>

        {/* Computer Monitor */}
        <div className="relative">
          {/* Monitor */}
          <div className="w-[480px] h-80 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl border-4 border-gray-700 shadow-2xl">
            {/* Screen Bezel */}
            <div className="w-full h-full p-4">
              {/* Screen */}
              <motion.div 
                className="w-full h-full bg-black rounded-lg border-2 border-gray-600 overflow-hidden relative"
                animate={showComputerWelcome ? {
                  boxShadow: ['0 0 0 0 rgba(59, 130, 246, 0)', '0 0 50px 10px rgba(59, 130, 246, 0.6)', '0 0 40px 8px rgba(59, 130, 246, 0.5)']
                } : {}}
                transition={{ duration: 0.5 }}
              >
              {/* Desktop Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
              </div>
              
                {/* Welcome Message Popup */}
                {showComputerWelcome && (
                  <motion.div
                    className="absolute inset-1 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl border-2 border-blue-500 flex flex-col overflow-hidden"
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      ease: "easeOut"
                    }}
                  >
                    {/* Window Header */}
                    <div className="h-14 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 flex items-center px-6 shadow-lg">
                      <div className="flex gap-3">
                        <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm" />
                        <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-sm" />
                        <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm" />
                      </div>
                      <div className="flex-1 text-center text-white text-xl font-bold tracking-wide">SCO-SMB Enterprise Scanner</div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 flex flex-col items-center justify-center px-8 py-4 min-h-0">
                      {/* Enhanced Welcome Text */}
                      <motion.div
                        className="text-center"
                        initial={{ y: 40, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: 0.3, 
                          duration: 0.7,
                          ease: "easeOut",
                          type: "spring",
                          stiffness: 100
                        }}
                      >
                        <motion.div 
                          className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent mb-3 leading-tight"
                          style={{ 
                            backgroundSize: '200% 200%',
                            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
                            letterSpacing: '-0.02em'
                          }}
                          animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                          }}
                          transition={{ 
                            duration: 4, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          Welcome to
                        </motion.div>
                        <motion.div 
                          className="text-5xl font-black text-blue-800 leading-tight relative"
                          style={{ 
                            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
                            letterSpacing: '-0.03em',
                            textShadow: '0 4px 12px rgba(30, 64, 175, 0.3), 0 2px 4px rgba(30, 64, 175, 0.2)'
                          }}
                          animate={{
                            textShadow: [
                              '0 4px 12px rgba(30, 64, 175, 0.3), 0 2px 4px rgba(30, 64, 175, 0.2)',
                              '0 6px 16px rgba(30, 64, 175, 0.4), 0 3px 6px rgba(30, 64, 175, 0.3)',
                              '0 4px 12px rgba(30, 64, 175, 0.3), 0 2px 4px rgba(30, 64, 175, 0.2)'
                            ]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          SCO-SMB
                          {/* Subtle highlight effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/20 to-transparent rounded-lg"
                            animate={{
                              opacity: [0, 0.3, 0],
                              x: ['-100%', '100%']
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              repeatDelay: 3,
                              ease: "easeInOut"
                            }}
                          />
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              
              {/* Desktop Icons */}
              {!showComputerWelcome && (
                <div className="absolute top-4 left-4 space-y-4">
                  <motion.div 
                    className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    SCO
                  </motion.div>
                  <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center text-white text-xs">📁</div>
                  <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white text-xs">📄</div>
                </div>
              )}
              
              {/* Taskbar */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-800 border-t border-gray-600 flex items-center px-2">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold mr-2">S</div>
                <div className="flex-1"></div>
                <div className="text-white text-xs">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
              </div>
            </motion.div>
          </div>
        </div>
        
          {/* Monitor Stand */}
          <div className="w-24 h-12 bg-gray-700 mx-auto mt-4 rounded-b-xl shadow-lg"></div>
          <div className="w-40 h-5 bg-gray-800 mx-auto mt-2 rounded-full shadow-inner"></div>
        </div>
      </div>

      {/* Status Info */}
      <div className="col-span-2 text-center text-gray-300 mt-8">
        <motion.div
          className="inline-block bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
          animate={isScanning || isPrinting ? {
            borderColor: ['#374151', '#06b6d4', '#374151']
          } : {}}
          transition={{ duration: 1, repeat: (isScanning || isPrinting) ? Infinity : 0 }}
        >
          <p className="text-xl font-semibold mb-2">
            {isScanning ? '🔍 Scanning Document...' : 
             scanComplete ? '✅ Scan Complete - Processing...' :
             showComputerWelcome && !isPrinting ? '💻 Displaying Welcome Message' :
             isPrinting ? '🖨️ Printing Welcome Document...' : 
             showWelcomeDoc ? '🎉 Welcome Process Complete!' : 
             '⚡ SCO-SMB Enterprise System Ready'}
          </p>
          <p className="text-gray-400">
            Paper Stack: {paperStack} sheets • 
            {isScanning ? ' Analyzing document structure' : 
             scanComplete ? ' Scan completed successfully' :
             showComputerWelcome && !isPrinting ? ' Welcome message displayed on screen' :
             isPrinting ? ' Generating physical welcome document' : 
             showWelcomeDoc ? ' Document successfully created' : 
             ' Ready for next scan operation'}
          </p>
          {showWelcomeDoc && (
            <motion.div 
              className="mt-4 p-4 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-lg border border-green-500/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-green-400 font-bold text-lg">
                🎉 Welcome to SCO-SMB Professional Document Scanning!
              </p>
              <p className="text-cyan-300 text-sm mt-1">
                Enterprise-grade scanning solution now active
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}