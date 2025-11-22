"use client";
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Loading skeleton - optimized for better LCP
export function HeroSkeleton() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#153B6B] via-[#1e4a7f] to-[#00A8B5]" role="img" aria-label="Loading hero section">
      <div className="animate-pulse text-center">
        <div className="h-16 bg-slate-600/20 rounded-lg mb-6 mx-auto max-w-md"></div>
        <div className="h-8 bg-slate-600/20 rounded-lg mb-8 mx-auto max-w-lg"></div>
        <div className="flex gap-4 justify-center">
          <div className="h-12 w-32 bg-slate-600/20 rounded-lg"></div>
          <div className="h-12 w-32 bg-slate-600/20 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Simplified state management for better performance
  useEffect(() => {
    // Quick visibility trigger for better FCP
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Simplified animations for better performance and TypeScript compatibility
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <section 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #153B6B 0%, #1e4a7f 50%, #00A8B5 100%)'
      }}
      role="banner"
      aria-label="Hero section"
    >
      {/* Optimized Static Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Static gradient overlays - much better performance */}
        <div 
          className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(0, 168, 181, 0.4) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
        <div 
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(21, 59, 107, 0.5) 0%, transparent 70%)',
            filter: 'blur(50px)'
          }}
        />
        <div 
          className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(0, 133, 155, 0.4) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
        />
        
        {/* Simple animated dots - CSS animations for better performance */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-white/10 rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-6 h-6 bg-[#00A8B5]/20 rounded-full animate-pulse" style={{ animationDelay: '1s', animationDuration: '3s' }} />
        <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-white/15 rounded-full animate-pulse" style={{ animationDelay: '2s', animationDuration: '4s' }} />
      </div>

      {/* Main Content - Optimized for LCP */}
      <motion.div
        className="relative z-10 text-center text-white w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-28 lg:py-32"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Headline - Critical for LCP with Brand Focus */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 leading-tight max-w-6xl mx-auto"
        >
          <span className="block mb-3 sm:mb-4 md:mb-6">
            <span className="font-black tracking-tight" style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #E0E7FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 40px rgba(255, 255, 255, 0.3)'
            }}>
              SCO SMB
            </span>
          </span>
          <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight mb-2 sm:mb-3">
            <span style={{
              background: 'linear-gradient(135deg, #00A8B5 0%, #FFFFFF 50%, #153B6B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(0, 168, 181, 0.4)'
            }}>
              Enterprise Document Scanning
            </span>
          </span>
          <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium mt-3 sm:mt-4 text-white/90">
            for Kyocera & Sharp Printers
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-100 mb-10 sm:mb-12 max-w-5xl mx-auto font-light leading-relaxed"
        >
          Secure, automated document ingestion with zero-configuration network discovery, enterprise-grade security, and intelligent file organization.
        </motion.p>

        {/* Action Buttons - Optimized for INP */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-10 sm:mb-12 max-w-2xl mx-auto"
        >
          {/* Primary CTA - Fixed link to /trial */}
          <Link
            href="/trial"
            className="inline-flex items-center gap-3 px-8 sm:px-10 md:px-12 lg:px-14 py-4 sm:py-5 md:py-6 rounded-xl font-bold text-lg sm:text-xl md:text-2xl transition-all duration-200 hover:scale-105 transform w-full sm:w-auto text-center justify-center"
            style={{ 
              background: 'linear-gradient(135deg, #00A8B5 0%, #153B6B 100%)',
              color: '#FFFFFF',
              boxShadow: '0 10px 40px rgba(0, 168, 181, 0.4)'
            }}
          >
            Start Free Trial
            <span className="text-xl sm:text-2xl">→</span>
          </Link>
          
          {/* Secondary CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 sm:px-10 md:px-12 lg:px-14 py-4 sm:py-5 md:py-6 rounded-xl font-bold text-lg sm:text-xl md:text-2xl transition-all duration-200 border-2 border-white/30 hover:border-white/60 hover:bg-white/10 w-full sm:w-auto text-center justify-center"
            style={{ color: '#FFFFFF' }}
          >
            Contact Sales
            <span className="text-xl sm:text-2xl">→</span>
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 text-sm sm:text-base md:text-lg text-white/80 max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm whitespace-nowrap">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shrink-0" />
            <span className="font-medium">30-Day Free Trial</span>
          </div>
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm whitespace-nowrap">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shrink-0" style={{ animationDelay: '0.5s' }} />
            <span className="font-medium">Enterprise Security</span>
          </div>
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm whitespace-nowrap">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shrink-0" style={{ animationDelay: '1s' }} />
            <span className="font-medium">24/7 Support</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator - Simple CSS animation */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 text-white/60 z-20">
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <span className="text-xs sm:text-sm font-medium hidden md:block">Scroll to explore</span>
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-white/50 rounded-full mt-1 sm:mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;