"use client";
import { motion } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [viewportDimensions, setViewportDimensions] = useState({ width: 0, height: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

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

  // Responsive dot grid calculations based on viewport
  const dotGridData = React.useMemo(() => {
    if (!isClient || viewportDimensions.width === 0) return [];
    
    // Responsive spacing based on screen size
    const getSpacing = () => {
      if (viewportDimensions.width < 640) return 24; // Mobile
      if (viewportDimensions.width < 1024) return 28; // Tablet
      return 32; // Desktop
    };
    
    const spacing = getSpacing();
    const cols = Math.ceil(viewportDimensions.width / spacing) + 2; // Extra columns for coverage
    const rows = Math.ceil(viewportDimensions.height / spacing) + 2; // Extra rows for coverage
    
    return Array.from({ length: rows }, (_, rowIndex) => 
      Array.from({ length: cols }, (_, colIndex) => ({
        key: `${rowIndex}-${colIndex}`,
        x: (colIndex * spacing),
        y: (rowIndex * spacing),
        rowIndex,
        colIndex
      }))
    ).flat();
  }, [isClient, viewportDimensions]);

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
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
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
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900"
    >
      {/* Premium Animated Background */}
      <div className="absolute inset-0">
        {/* Dramatic Floating Orbs */}
        <motion.div 
          animate={{ 
            x: [0, 100, -50, 0],
            y: [0, -80, 50, 0],
            scale: [1, 1.3, 0.8, 1],
            rotate: [0, 90, 180, 360]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/30 via-cyan-400/20 to-teal-500/30 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ 
            x: [0, -120, 60, 0],
            y: [0, 100, -40, 0],
            scale: [1, 0.7, 1.4, 1],
            rotate: [0, -120, 240, 360]
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/25 via-pink-400/15 to-blue-500/25 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ 
            x: [0, 80, -80, 0],
            y: [0, -60, 80, 0],
            scale: [1, 1.2, 0.9, 1],
            rotate: [0, 180, -90, 360]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-emerald-400/20 via-teal-500/25 to-cyan-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" 
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
        
        {/* Interactive Glowing Dot Grid - Client Only */}
        {isClient && (
          <div className="absolute inset-0 pointer-events-none">
            {dotGridData.map((dot) => {
              const distance = Math.sqrt(
                Math.pow(mousePosition.x - dot.x, 2) + 
                Math.pow(mousePosition.y - dot.y, 2)
              );
              const maxDistance = 180; // Increased interaction radius
              const intensity = Math.max(0, 1 - (distance / maxDistance));
              const scale = 1 + (intensity * 3); // Increased scale multiplier
              const baseOpacity = 0.25; // Increased base visibility
              const opacity = baseOpacity + (intensity * 0.75); // Enhanced opacity range
              const glow = intensity * 30; // Increased glow intensity
              
              return (
                <div
                  key={dot.key}
                  className="absolute w-1 h-1 rounded-full transition-all duration-200 ease-out" // Larger base size, faster transition
                  style={{
                    left: `${dot.x}px`,
                    top: `${dot.y}px`,
                    transform: `scale(${scale})`,
                    opacity: opacity,
                    backgroundColor: intensity > 0.2 
                      ? `rgba(59, 130, 246, ${Math.min(opacity, 0.9)})` 
                      : `rgba(148, 163, 184, ${Math.min(opacity, 0.6)})`,
                    boxShadow: intensity > 0.15 
                      ? `0 0 ${glow}px rgba(59, 130, 246, ${intensity * 0.6}), 0 0 ${glow * 1.5}px rgba(34, 197, 94, ${intensity * 0.3}), 0 0 ${glow * 0.5}px rgba(255, 255, 255, ${intensity * 0.2})` 
                      : intensity > 0.05
                      ? `0 0 ${glow * 0.5}px rgba(148, 163, 184, ${intensity * 0.3})`
                      : 'none'
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

      <div className="container-wide relative z-10 pt-8">
        <div className="max-w-6xl mx-auto text-center px-4">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.5, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500/20 via-cyan-500/15 to-teal-500/20 backdrop-blur-2xl border border-blue-400/30 text-blue-300 font-semibold mt-8 mb-16 shadow-2xl shadow-blue-500/20 hover:shadow-blue-400/30 transition-all duration-500"
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
              className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full" 
            />
            <span className="text-xl tracking-wide">Enterprise-Ready Scan Management</span>
          </motion.div>

          {/* Massive, Bold Headline */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-16 leading-none tracking-tighter"
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
              className="block text-white drop-shadow-2xl mt-4 font-black tracking-[-0.02em]"
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
            className="text-2xl md:text-3xl text-slate-300 max-w-5xl mx-auto mb-20 leading-relaxed font-light"
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
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
          >
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }} 
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link href="/trial" className="group relative inline-flex items-center gap-4 px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 overflow-hidden">
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
                  className="relative z-10 w-7 h-7"
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
            >
              <Link href="/features" className="inline-flex items-center gap-4 px-10 py-5 text-xl font-semibold text-slate-200 bg-slate-800/60 backdrop-blur-2xl border border-slate-600/50 rounded-2xl hover:bg-slate-700/60 hover:border-slate-500 transition-all duration-500 shadow-2xl hover:shadow-slate-500/20">
                <span>View Features</span>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8"
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
                className="flex flex-col items-center gap-4 p-8 bg-slate-800/40 backdrop-blur-2xl border border-slate-600/30 rounded-3xl hover:border-slate-500/50 hover:bg-slate-700/40 transition-all duration-500 shadow-2xl hover:shadow-slate-500/20"
              >
                <span className="text-4xl filter drop-shadow-lg">{item.icon}</span>
                <span className="text-slate-200 font-semibold text-center text-lg">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Premium Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1, ease: "easeOut" }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2"
      >
        <motion.div 
          whileHover={{ scale: 1.2 }}
          className="flex flex-col items-center gap-3 cursor-pointer group"
        >
          {/* Modern Scroll Text */}
          <motion.span 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-slate-400 text-sm font-medium tracking-widest uppercase"
          >
            Scroll
          </motion.span>
          
          {/* Sleek Arrow Design */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <motion.div 
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(59, 130, 246, 0.3)',
                  '0 0 40px rgba(59, 130, 246, 0.6)',
                  '0 0 20px rgba(59, 130, 246, 0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-8 h-12 rounded-full border-2 border-blue-400/60 bg-slate-800/40 backdrop-blur-xl flex items-start justify-center pt-2 group-hover:border-blue-300 transition-colors duration-300"
            >
              <motion.div
                animate={{ 
                  y: [0, 8, 0],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-3 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full"
              />
            </motion.div>
          </motion.div>
          
          {/* Additional Chevron */}
          <motion.svg
            animate={{ y: [0, 5, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="w-4 h-4 text-blue-400"
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
