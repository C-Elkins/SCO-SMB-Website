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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
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
        className="relative z-10 text-center text-white px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Headline - Critical for LCP */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-8 leading-tight"
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #E0E7FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Transform your office workflow with{' '}
          <span className="text-[#00A8B5] font-semibold">secure, automated document ingestion</span>{' '}
          from <span className="text-white font-semibold">Kyocera & Sharp</span> printers.
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="text-xl sm:text-2xl text-gray-100 mb-12 max-w-4xl mx-auto font-light leading-relaxed"
        >
          Enterprise-grade document scanning software that automatically organizes, 
          secures, and routes scanned documents to the right destinations.
        </motion.p>

        {/* Action Buttons - Optimized for INP */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
        >
          {/* Primary CTA - Fixed link to /trial */}
          <Link
            href="/trial"
            className="inline-flex items-center gap-3 px-12 py-6 rounded-xl font-bold text-2xl transition-colors duration-200 hover:scale-105 transform"
            style={{ 
              background: 'linear-gradient(135deg, #2196F3 0%, #00A8B5 100%)',
              color: '#FFFFFF',
              boxShadow: '0 12px 32px rgba(33, 150, 243, 0.4)'
            }}
          >
            Start Free Trial
            <span className="text-xl">→</span>
          </Link>
          
          {/* Secondary CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-12 py-6 rounded-xl font-bold text-2xl transition-colors duration-200 border-2 border-white/30 hover:border-white/60 hover:bg-white/10"
            style={{ color: '#FFFFFF' }}
          >
            Contact Sales
            <span className="text-xl">→</span>
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-8 text-sm text-white/80"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            30-Day Free Trial
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            Enterprise Security
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            24/7 Support
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator - Simple CSS animation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
      
      {/* Performance optimization styles */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse,
          .animate-bounce {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

export default Hero;