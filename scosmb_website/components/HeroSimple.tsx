"use client";
import { motion } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export function HeroSimple() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const newX = e.clientX - rect.left;
        const newY = e.clientY - rect.top;
        setMousePosition({ x: newX, y: newY });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900"
    >
      {/* Simple Background */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <motion.div 
          animate={{ 
            x: [0, 100, -50, 0],
            y: [0, -80, 50, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/30 via-cyan-400/20 to-teal-500/30 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -120, 60, 0],
            y: [0, 100, -40, 0],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-r from-purple-500/25 via-pink-400/15 to-blue-500/25 rounded-full blur-3xl"
        />

        {/* Simple Dot Grid */}
        {isClient && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 50 }, (_, i) => {
              const x = (i % 10) * 100 + 50;
              const y = Math.floor(i / 10) * 100 + 50;
              const distance = Math.sqrt((mousePosition.x - x) ** 2 + (mousePosition.y - y) ** 2);
              const scale = distance < 100 ? 1 + (100 - distance) / 100 : 1;
              const opacity = distance < 100 ? 0.8 : 0.3;
              
              return (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-blue-400"
                  style={{
                    left: x,
                    top: y,
                    transform: `scale(${scale})`,
                    opacity,
                  }}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="container relative z-10 py-20">
        <div className="max-w-6xl mx-auto text-center px-6">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl font-black mb-8 leading-none"
          >
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
              Professional
            </span>
            <span className="block text-white mt-4">
              Document Scanning
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto mb-12"
          >
            Transform your office workflow with secure, automated document ingestion from Kyocera & Sharp printers.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/trial" className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300">
              <span>Start Free Trial</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <Link href="/features" className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-slate-200 bg-slate-800/60 backdrop-blur-2xl border border-slate-600/50 rounded-xl hover:bg-slate-700/60 transition-all duration-300">
              <span>View Features</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}