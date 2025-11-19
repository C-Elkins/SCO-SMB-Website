"use client";
import { motion } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [viewportDimensions, setViewportDimensions] = useState({ width: 0, height: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);
  const lastMouseUpdate = useRef<number>(0);

  // Generate deterministic particle positions
  const particlePositions = React.useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      left: ((i * 17 + 23) % 100),  // Deterministic positioning
      top: ((i * 13 + 41) % 100),   // Deterministic positioning
      delay: i * 0.3,
      duration: 8 + i * 0.5,
      xOffset: Math.sin(i) * 50
    }));
  }, []);

  // Ultra-optimized dot grid with pre-calculated positions and zones
  const dotGridData = React.useMemo(() => {
    if (!isClient || viewportDimensions.width === 0) return [];

    // Responsive spacing optimized for performance - fewer dots on all devices
    const getSpacing = () => {
      if (viewportDimensions.width < 480) return 40; // Small mobile - much fewer dots
      if (viewportDimensions.width < 640) return 36; // Mobile
      if (viewportDimensions.width < 1024) return 38; // Tablet
      if (viewportDimensions.width < 1440) return 40; // Desktop
      return 42; // Large desktop
    };

    const spacing = getSpacing();
    const cols = Math.ceil(viewportDimensions.width / spacing) + 2;
    const rows = Math.ceil(viewportDimensions.height / spacing) + 2;

    // Pre-calculate ALL dot positions with performance zones
    return Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: cols }, (_, colIndex) => {
        const x = colIndex * spacing;
        const y = rowIndex * spacing;
        return {
          key: `${rowIndex}-${colIndex}`,
          x,
          y,
          rowIndex,
          colIndex,
          // Pre-calculate zone boundaries for ultra-fast lookups
          isEdgeZone: rowIndex < 2 || rowIndex >= rows - 2 || colIndex < 2 || colIndex >= cols - 2,
        };
      })
    ).flat();
  }, [isClient, viewportDimensions]);
  
  // Ultra-optimized mouse-based calculations - only calculate nearby dots
  const interactiveDots = React.useMemo(() => {
    const mouseX = mousePosition.x;
    const mouseY = mousePosition.y;
    const maxDistance = 150; // Reduced for performance
    const maxDistanceSquared = 22500; // 150^2

    // Early return for initial state - don't spread objects
    if (mouseX === 0 && mouseY === 0) {
      return dotGridData.map(dot => ({
        key: dot.key,
        x: dot.x,
        y: dot.y,
        type: 'static' as const,
        intensity: 0
      }));
    }

    // Direct iteration without chunking for better performance
    const results = new Array(dotGridData.length);

    for (let i = 0; i < dotGridData.length; i++) {
      const dot = dotGridData[i];
      const dx = mouseX - dot.x;
      const dy = mouseY - dot.y;
      const distanceSquared = dx * dx + dy * dy;

      if (distanceSquared > maxDistanceSquared) {
        results[i] = {
          key: dot.key,
          x: dot.x,
          y: dot.y,
          type: 'static' as const,
          intensity: 0
        };
        continue;
      }

      const distance = Math.sqrt(distanceSquared);
      const intensity = 1 - (distance / maxDistance);

      if (intensity <= 0.1) {
        results[i] = {
          key: dot.key,
          x: dot.x,
          y: dot.y,
          type: 'dim' as const,
          intensity: 0
        };
      } else {
        results[i] = {
          key: dot.key,
          x: dot.x,
          y: dot.y,
          type: 'interactive' as const,
          intensity,
          scale: 1 + (intensity * 2.5),
          opacity: 0.3 + (intensity * 0.7)
        };
      }
    }

    return results;
  }, [dotGridData, mousePosition.x, mousePosition.y]);

  useEffect(() => {
    setIsClient(true);
    
    // Set initial viewport dimensions
    const updateViewportDimensions = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setViewportDimensions({
          width: rect.width || window.innerWidth,
          height: rect.height || window.innerHeight
        });
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      // Throttle to 30fps for better performance while still smooth
      if (now - lastMouseUpdate.current < 33) return; // ~30fps

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        if (heroRef.current) {
          const rect = heroRef.current.getBoundingClientRect();
          const newX = e.clientX - rect.left;
          const newY = e.clientY - rect.top;

          // Only update if mouse moved significantly (reduce unnecessary renders)
          const oldX = mousePosition.x;
          const oldY = mousePosition.y;
          const deltaX = Math.abs(newX - oldX);
          const deltaY = Math.abs(newY - oldY);

          if (deltaX > 4 || deltaY > 4) { // Only update if moved >4px
            setMousePosition({ x: newX, y: newY });
            lastMouseUpdate.current = now;
          }
        }
      });
    };

    const handleResize = () => {
      updateViewportDimensions();
    };

    // Initial setup
    updateViewportDimensions();
    
    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
    }
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero-optimized relative overflow-hidden min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900"
      style={{
        minHeight: 'calc(100vh - 80px)', // Account for header
      }}
    >
      {/* Premium Animated Background */}
      <div className="absolute inset-0">
        {/* Dramatic Floating Orbs */}
        <motion.div 
          animate={{ 
            x: [0, 100, -50, 0],
            y: [0, -80, 50, 0],
            scale: [1, 1.2, 0.9, 1], // Reduced scale variation to maintain shape
            rotate: [0, 90, 180, 360]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 sm:top-20 left-5 sm:left-20 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-gradient-to-r from-blue-500/30 via-cyan-400/20 to-teal-500/30 rounded-full blur-2xl sm:blur-3xl"
          style={{
            aspectRatio: '1 / 1', // Force perfect circle
            borderRadius: '50%',
            filter: 'blur(40px)', // Consistent blur
          }}
        />
        <motion.div 
          animate={{ 
            x: [0, -120, 60, 0],
            y: [0, 100, -40, 0],
            scale: [1, 0.8, 1.2, 1], // Reduced scale variation
            rotate: [0, -120, 240, 360]
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 sm:bottom-20 right-5 sm:right-20 w-40 sm:w-60 lg:w-80 h-40 sm:h-60 lg:h-80 bg-gradient-to-r from-purple-500/25 via-pink-400/15 to-blue-500/25 rounded-full blur-2xl sm:blur-3xl"
          style={{
            aspectRatio: '1 / 1',
            borderRadius: '50%',
            filter: 'blur(35px)',
          }}
        />
        <motion.div 
          animate={{ 
            x: [0, 80, -80, 0],
            y: [0, -60, 80, 0],
            scale: [1, 1.1, 0.95, 1], // Minimal scale variation
            rotate: [0, 180, -90, 360]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 w-36 sm:w-56 lg:w-72 h-36 sm:h-56 lg:h-72 bg-gradient-to-r from-emerald-400/20 via-teal-500/25 to-cyan-400/20 rounded-full blur-2xl sm:blur-3xl -translate-x-1/2 -translate-y-1/2"
          style={{
            aspectRatio: '1 / 1',
            borderRadius: '50%',
            filter: 'blur(38px)',
          }}
        />
        
        {/* Animated Grid Pattern */}
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" 
        />
        
        {/* Floating Particles */}
        {particlePositions.map((particle, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, particle.xOffset, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
          />
        ))}
        
        {/* ULTRA-OPTIMIZED Interactive Dot Grid - GPU accelerated */}
        {isClient && (
          <div className="hero-dots absolute inset-0 pointer-events-none" style={{ willChange: 'contents' }}>
            {interactiveDots.map((dot) => {
              // Ultra-fast rendering based on pre-calculated data
              if (dot.type === 'static') {
                return (
                  <div
                    key={dot.key}
                    className="absolute w-1 h-1 rounded-full bg-slate-500/20"
                    style={{
                      left: dot.x,
                      top: dot.y,
                      willChange: 'transform',
                    }}
                  />
                );
              }

              if (dot.type === 'dim') {
                return (
                  <div
                    key={dot.key}
                    className="absolute w-1 h-1 rounded-full bg-slate-400/25"
                    style={{
                      left: dot.x,
                      top: dot.y,
                      willChange: 'transform',
                    }}
                  />
                );
              }

              // Interactive dots with pre-calculated values
              const intensity = (dot as any).intensity || 0;
              const scale = (dot as any).scale || 1;
              const opacity = (dot as any).opacity || 0.3;

              return (
                <div
                  key={dot.key}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    left: dot.x,
                    top: dot.y,
                    transform: `scale(${scale})`,
                    opacity,
                    backgroundColor: intensity > 0.3
                      ? `rgba(59, 130, 246, ${Math.min(opacity + 0.2, 1)})`
                      : `rgba(100, 149, 237, ${opacity})`,
                    // Simplified glow - only for high intensity dots
                    boxShadow: intensity > 0.5
                      ? `0 0 ${intensity * 12}px rgba(59, 130, 246, ${intensity * 0.5})`
                      : 'none',
                    willChange: 'transform, opacity',
                  }}
                />
              );
            })}
          </div>
        )}
        
        {/* Radial Spotlight Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(15,23,42,0.4)_50%,rgba(15,23,42,0.8)_100%)]" />
        
        {/* Top Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/50" />
      </div>

      <div className="container-wide relative z-10 py-4 sm:py-6 pb-16 sm:pb-20 md:pb-24 lg:pb-28">
        <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.5, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full bg-gradient-to-r from-blue-500/20 via-cyan-500/15 to-teal-500/20 backdrop-blur-2xl border border-blue-400/30 text-blue-300 font-semibold mt-4 sm:mt-6 mb-6 sm:mb-10 md:mb-12 shadow-2xl shadow-blue-500/20 hover:shadow-blue-400/30 transition-all duration-500"
          >
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                boxShadow: [
                  '0 0 10px rgba(34, 197, 94, 0.5)',
                  '0 0 20px rgba(34, 197, 94, 0.8)',
                  '0 0 10px rgba(34, 197, 94, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
            />
            <span className="text-sm sm:text-base md:text-lg lg:text-xl tracking-wide">Enterprise-Ready Scan Management</span>
          </motion.div>

          {/* Massive, Bold Headline */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-none tracking-tighter"
            style={{ fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif' }}
          >
            <motion.span 
              initial={{ opacity: 0, y: 100, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
              className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent drop-shadow-2xl font-extrabold tracking-[-0.05em]"
              style={{ 
                fontWeight: 900,
                letterSpacing: '-0.05em',
                textShadow: '0 0 80px rgba(59, 130, 246, 0.3)'
              }}
            >
              Professional
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 100, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
              className="block text-white drop-shadow-2xl mt-2 sm:mt-3 md:mt-4 font-black tracking-[-0.02em]"
              style={{
                fontWeight: 900,
                letterSpacing: '-0.02em',
                textShadow: '0 0 60px rgba(255, 255, 255, 0.2), 0 20px 40px rgba(0, 0, 0, 0.3)'
              }}
            >
              Document Scanning
            </motion.span>
          </motion.h1>

          {/* Enhanced Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12 lg:mb-14 leading-relaxed font-light px-2"
          >
            Transform your office workflow with{' '}
            <motion.span 
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="bg-gradient-to-r from-blue-300 via-cyan-200 to-teal-300 bg-[length:200%_100%] bg-clip-text text-transparent font-semibold"
            >
              secure, automated document ingestion
            </motion.span>{' '}
            from <strong className="text-white font-semibold">Kyocera & Sharp</strong> printers.
          </motion.p>

          {/* Premium CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 1.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-10"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-full sm:w-auto"
            >
              <Link href="/trial" className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 md:gap-4 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 overflow-hidden w-full sm:w-auto">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                />
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45"
                />
                <span className="relative z-10">Start Free Trial</span>
                <motion.svg
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link href="/features" className="inline-flex items-center justify-center gap-2 sm:gap-3 md:gap-4 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl font-semibold text-slate-200 bg-slate-800/60 backdrop-blur-2xl border border-slate-600/50 rounded-xl sm:rounded-2xl hover:bg-slate-700/60 hover:border-slate-500 transition-all duration-500 shadow-2xl hover:shadow-slate-500/20 w-full sm:w-auto">
                <span>View Features</span>
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* Animated Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-4xl mx-auto mb-4 sm:mb-6"
          >
            {[
              { icon: "🔒", text: "Enterprise Security", delay: 0 },
              { icon: "⚡", text: "Zero-Config Setup", delay: 0.1 },
              { icon: "🛡️", text: "24/7 Support", delay: 0.2 },
              { icon: "🔄", text: "Auto-Updates", delay: 0.3 }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + item.delay }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center gap-1 sm:gap-2 md:gap-3 p-3 sm:p-4 md:p-5 lg:p-6 bg-slate-800/40 backdrop-blur-2xl border border-slate-600/30 rounded-xl sm:rounded-2xl hover:border-slate-500/50 hover:bg-slate-700/40 transition-all duration-500 shadow-xl hover:shadow-slate-500/20"
              >
                <span className="text-2xl sm:text-3xl md:text-4xl filter drop-shadow-lg">{item.icon}</span>
                <span className="text-slate-200 font-semibold text-center text-xs sm:text-sm md:text-base">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Premium Scroll Indicator - Responsive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1, ease: "easeOut" }}
        className="absolute bottom-2 sm:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex"
      >
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="flex flex-col items-center gap-1 sm:gap-2 md:gap-3 cursor-pointer group"
        >
          {/* Modern Scroll Text */}
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-slate-400 text-[10px] sm:text-xs md:text-sm font-medium tracking-widest uppercase"
          >
            Scroll
          </motion.span>

          {/* Sleek Arrow Design */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 10px rgba(59, 130, 246, 0.3)',
                  '0 0 20px rgba(59, 130, 246, 0.6)',
                  '0 0 10px rgba(59, 130, 246, 0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-5 h-8 sm:w-6 sm:h-10 md:w-8 md:h-12 rounded-full border-2 border-blue-400/60 bg-slate-800/40 backdrop-blur-xl flex items-start justify-center pt-1.5 sm:pt-2 group-hover:border-blue-300 transition-colors duration-300"
            >
              <motion.div
                animate={{
                  y: [0, 4, 0],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-0.5 sm:w-1 h-2 sm:h-3 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full"
              />
            </motion.div>
          </motion.div>

          {/* Additional Chevron */}
          <motion.svg
            animate={{ y: [0, 3, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
