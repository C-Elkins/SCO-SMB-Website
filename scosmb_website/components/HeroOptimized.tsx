"use client";
import { motion } from 'framer-motion';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

export function HeroOptimized() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);
  const lastMouseUpdate = useRef<number>(0);

  // Lightweight static particles for better performance
  const staticParticles = React.useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: ((i * 23 + 17) % 100),
      top: ((i * 19 + 31) % 100),
      delay: i * 0.8,
      duration: 15 + i * 2,
    }));
  }, []);

  // Simple mouse cursor effect - much more performant
  const cursorStyle = React.useMemo(() => {
    if (!isClient || mousePosition.x === 0) return {};
    return {
      background: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.08), transparent 70%)`,
    };
  }, [isClient, mousePosition.x, mousePosition.y]);

  // Optimized mouse handler with better throttling
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = performance.now();
    // Throttle to 15fps for better performance
    if (now - lastMouseUpdate.current < 66) return;

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        lastMouseUpdate.current = now;
      }
    });
  }, []);

  useEffect(() => {
    setIsClient(true);
    
    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    
    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      }
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleMouseMove]);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900"
      style={{
        minHeight: 'calc(100vh - 80px)',
      }}
    >
      {/* Optimized Background */}
      <div className="absolute inset-0">
        {/* Static floating orbs - better performance */}
        <div 
          className="absolute top-20 left-20 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(34, 211, 238, 0.08) 50%, transparent 100%)',
            filter: 'blur(60px)',
            animation: 'float-1 25s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.12) 0%, rgba(59, 130, 246, 0.06) 50%, transparent 100%)',
            filter: 'blur(50px)',
            animation: 'float-2 30s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(34, 211, 238, 0.08) 50%, transparent 100%)',
            filter: 'blur(45px)',
            animation: 'float-3 20s ease-in-out infinite',
          }}
        />
        
        {/* Static grid pattern - no animation for better performance */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        
        {/* Simplified floating particles */}
        {staticParticles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `float-particle ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
        
        {/* Simple mouse cursor effect */}
        {isClient && (
          <div 
            className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out"
            style={cursorStyle}
          />
        )}

        {/* Radial Spotlight Effect */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 50% 40%, transparent 0%, rgba(15,23,42,0.4) 50%, rgba(15,23,42,0.8) 100%)'
        }} />
        
        {/* Top Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/50" />
      </div>

      {/* CSS Animations for better performance */}
      <style jsx>{`
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -25px) scale(1.05); }
          66% { transform: translate(-30px, 20px) scale(0.95); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, -35px) scale(1.08); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          25% { transform: translate(calc(-50% + 25px), calc(-50% - 20px)) scale(1.03); }
          75% { transform: translate(calc(-50% - 30px), calc(-50% + 25px)) scale(0.97); }
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) scale(0.3); opacity: 0.1; }
          50% { transform: translateY(-60px) scale(0.8); opacity: 0.3; }
        }
      `}</style>

      <div className="container-wide relative z-10 py-6 pb-20">
        <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-500/10 backdrop-blur-xl border border-blue-400/20 text-blue-300 font-semibold mb-8 shadow-lg"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                boxShadow: [
                  '0 0 8px rgba(34, 197, 94, 0.4)',
                  '0 0 16px rgba(34, 197, 94, 0.6)',
                  '0 0 8px rgba(34, 197, 94, 0.4)'
                ]
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
            />
            <span className="text-base tracking-wide">Enterprise-Ready Scan Management</span>
          </motion.div>

          {/* Main Headline - Reduced motion complexity */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black mb-8 leading-tight tracking-tight"
          >
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent font-extrabold">
              Professional
            </span>
            <span className="block text-white font-black mt-2">
              Document Scanning
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Transform your office workflow with{' '}
            <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-teal-300 bg-clip-text text-transparent font-semibold">
              secure, automated document ingestion
            </span>{' '}
            from <strong className="text-white">Kyocera & Sharp</strong> printers.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link 
              href="/trial" 
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
            >
              <span>Start Free Trial</span>
              <motion.svg
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </Link>
            
            <Link 
              href="/features" 
              className="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold text-slate-200 bg-slate-800/60 backdrop-blur-xl border border-slate-600/50 rounded-xl hover:bg-slate-700/60 transition-all duration-300"
            >
              <span>View Features</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { icon: "🔒", text: "Enterprise Security" },
              { icon: "⚡", text: "Zero-Config Setup" },
              { icon: "🛡️", text: "24/7 Support" },
              { icon: "🔄", text: "Auto-Updates" }
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 p-4 bg-slate-800/30 backdrop-blur-xl border border-slate-600/20 rounded-xl hover:border-slate-500/40 hover:bg-slate-700/30 transition-all duration-300"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-slate-200 font-medium text-sm text-center">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Simple Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 cursor-pointer group">
          <span className="text-slate-400 text-xs font-medium tracking-widest uppercase opacity-60">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-blue-400/40 bg-slate-800/20 backdrop-blur-xl flex items-start justify-center pt-2"
          >
            <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full opacity-60" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}