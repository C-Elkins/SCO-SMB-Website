"use client";
import { motion } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';


// Loading skeleton
export function HeroSkeleton() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-[#153B6B] via-[#1e4a7f] to-[#00A8B5]">
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Simple visibility trigger for content animations
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Smooth parallax scroll effect with dampening
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY.current);
      
      // Only update if scroll difference is significant enough (threshold: 2px)
      if (scrollDiff > 2) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
        
        rafRef.current = requestAnimationFrame(() => {
          // Smooth interpolation for dampened effect
          setScrollY(prev => {
            const target = currentScrollY * 0.6; // Reduce intensity
            return prev + (target - prev) * 0.1; // Smooth lerp
          });
          lastScrollY.current = currentScrollY;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Subtle mouse tracking for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation variants for better performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <section 
      ref={heroRef}
      className="hero-section relative text-white pt-32 pb-20 overflow-hidden min-h-screen flex items-center justify-center"
      style={{
        background: `
          radial-gradient(ellipse at top left, rgba(15, 35, 65, 0.9) 0%, transparent 50%),
          radial-gradient(ellipse at top right, rgba(0, 120, 140, 0.7) 0%, transparent 50%),
          radial-gradient(ellipse at bottom center, rgba(10, 25, 50, 0.8) 0%, transparent 50%),
          linear-gradient(135deg, #0a1525 0%, #0f2338 25%, #153B6B 50%, #1a4a73 75%, #00859b 100%)
        `,
        transform: `translateY(${scrollY * 0.08}px)`, // Much gentler parallax
        transition: 'transform 0.1s ease-out' // Smooth transition
      }}
    >
      {/* Ultra-Premium $100M Background Effects */}
      <div 
        className="absolute inset-0 smooth-parallax" 
        style={{ 
          willChange: 'transform',
          transform: `translateY(${scrollY * 0.04}px)`, // Gentler movement
          transition: 'transform 0.1s ease-out', // Smooth transition
          zIndex: 1
        }}
      >
        {/* Main Premium Orbs */}
        <motion.div 
          className="absolute top-20 left-1/4 rounded-full" 
          style={{
            width: '400px',
            height: '400px',
            background: `
              radial-gradient(circle at 30% 30%, rgba(0, 168, 181, 0.4) 0%, rgba(0, 168, 181, 0.2) 30%, rgba(21, 59, 107, 0.1) 60%, transparent 100%),
              radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
            `,
            filter: 'blur(80px)',
            boxShadow: `
              inset 0 0 120px rgba(0, 168, 181, 0.3),
              0 0 200px rgba(0, 168, 181, 0.2),
              0 0 400px rgba(0, 168, 181, 0.1)
            `
          }}
          animate={{ 
            x: [-20, 40, -20],
            y: [-30, 20, -30],
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.9, 0.6]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute top-1/3 right-1/4 rounded-full" 
          style={{
            width: '300px',
            height: '300px',
            background: `
              radial-gradient(circle at 40% 40%, rgba(21, 59, 107, 0.5) 0%, rgba(21, 59, 107, 0.3) 40%, rgba(0, 168, 181, 0.1) 70%, transparent 100%),
              radial-gradient(circle at 60% 60%, rgba(255, 255, 255, 0.08) 0%, transparent 40%)
            `,
            filter: 'blur(60px)',
            boxShadow: `
              inset 0 0 100px rgba(21, 59, 107, 0.4),
              0 0 150px rgba(21, 59, 107, 0.3),
              0 0 300px rgba(21, 59, 107, 0.15)
            `
          }}
          animate={{ 
            x: [30, -20, 30],
            y: [20, -40, 20],
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 left-1/3 rounded-full" 
          style={{
            width: '350px',
            height: '350px',
            background: `
              radial-gradient(circle at 50% 50%, rgba(0, 133, 155, 0.4) 0%, rgba(0, 133, 155, 0.2) 35%, rgba(15, 45, 85, 0.1) 65%, transparent 100%),
              radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.06) 0%, transparent 35%)
            `,
            filter: 'blur(70px)',
            boxShadow: `
              inset 0 0 110px rgba(0, 133, 155, 0.35),
              0 0 180px rgba(0, 133, 155, 0.25),
              0 0 350px rgba(0, 133, 155, 0.12)
            `
          }}
          animate={{ 
            x: [-25, 25, -25],
            y: [35, -15, 35],
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6
          }}
        />
        
        {/* Premium Particle System */}
        {[
          { size: 4, left: 15, top: 20, color: 'rgba(0, 168, 181, 0.6)', shadow: 15, moveX: 5, duration: 8, delay: 0 },
          { size: 3, left: 85, top: 30, color: 'rgba(21, 59, 107, 0.5)', shadow: 12, moveX: -3, duration: 10, delay: 1 },
          { size: 5, left: 25, top: 70, color: 'rgba(255, 255, 255, 0.4)', shadow: 18, moveX: 8, duration: 12, delay: 2 },
          { size: 2, left: 60, top: 15, color: 'rgba(0, 168, 181, 0.6)', shadow: 10, moveX: -6, duration: 9, delay: 0.5 },
          { size: 6, left: 75, top: 80, color: 'rgba(21, 59, 107, 0.5)', shadow: 20, moveX: 4, duration: 11, delay: 1.5 },
          { size: 3, left: 10, top: 50, color: 'rgba(255, 255, 255, 0.4)', shadow: 14, moveX: -2, duration: 7, delay: 2.5 },
          { size: 4, left: 90, top: 60, color: 'rgba(0, 168, 181, 0.6)', shadow: 16, moveX: 7, duration: 13, delay: 3 },
          { size: 2, left: 45, top: 25, color: 'rgba(21, 59, 107, 0.5)', shadow: 11, moveX: -4, duration: 8, delay: 3.5 },
          { size: 5, left: 30, top: 85, color: 'rgba(255, 255, 255, 0.4)', shadow: 19, moveX: 6, duration: 10, delay: 4 },
          { size: 3, left: 70, top: 40, color: 'rgba(0, 168, 181, 0.6)', shadow: 13, moveX: -5, duration: 12, delay: 4.5 },
          { size: 4, left: 5, top: 75, color: 'rgba(21, 59, 107, 0.5)', shadow: 17, moveX: 3, duration: 9, delay: 0.8 },
          { size: 2, left: 55, top: 90, color: 'rgba(255, 255, 255, 0.4)', shadow: 12, moveX: -7, duration: 11, delay: 1.8 },
          { size: 6, left: 80, top: 10, color: 'rgba(0, 168, 181, 0.6)', shadow: 21, moveX: 5, duration: 14, delay: 2.8 },
          { size: 3, left: 20, top: 55, color: 'rgba(21, 59, 107, 0.5)', shadow: 14, moveX: -3, duration: 8, delay: 3.8 },
          { size: 5, left: 95, top: 45, color: 'rgba(255, 255, 255, 0.4)', shadow: 18, moveX: 4, duration: 10, delay: 4.8 },
          { size: 2, left: 40, top: 5, color: 'rgba(0, 168, 181, 0.6)', shadow: 10, moveX: -6, duration: 12, delay: 0.3 },
          { size: 4, left: 65, top: 95, color: 'rgba(21, 59, 107, 0.5)', shadow: 16, moveX: 8, duration: 9, delay: 1.3 },
          { size: 3, left: 12, top: 35, color: 'rgba(255, 255, 255, 0.4)', shadow: 13, moveX: -2, duration: 11, delay: 2.3 },
          { size: 5, left: 88, top: 65, color: 'rgba(0, 168, 181, 0.6)', shadow: 19, moveX: 6, duration: 13, delay: 3.3 },
          { size: 2, left: 35, top: 78, color: 'rgba(21, 59, 107, 0.5)', shadow: 11, moveX: -4, duration: 7, delay: 4.3 }
        ].map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: particle.size + 'px',
              height: particle.size + 'px',
              left: particle.left + '%',
              top: particle.top + '%',
              background: particle.color,
              boxShadow: `0 0 ${particle.shadow}px currentColor`,
              filter: 'blur(1px)'
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, particle.moveX, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay
            }}
          />
        ))}
        
        {/* Premium 3D Geometric Elements */}
        <motion.div
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2"
          style={{
            width: '200px',
            height: '200px',
            background: `
              linear-gradient(135deg, transparent 30%, rgba(0, 168, 181, 0.1) 50%, transparent 70%),
              linear-gradient(45deg, rgba(21, 59, 107, 0.05) 0%, transparent 100%)
            `,
            borderImage: 'linear-gradient(135deg, rgba(0, 168, 181, 0.3), rgba(21, 59, 107, 0.2), transparent) 1',
            borderStyle: 'solid',
            borderWidth: '1px',
            filter: 'blur(0.5px)',
            transform: 'rotateX(45deg) rotateY(45deg) rotateZ(10deg)',
            transformStyle: 'preserve-3d'
          }}
          animate={{
            rotateX: [45, 50, 45],
            rotateY: [45, 40, 45],
            rotateZ: [10, 15, 10],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 right-1/4"
          style={{
            width: '150px',
            height: '150px',
            background: `
              conic-gradient(from 45deg, rgba(0, 168, 181, 0.2) 0%, transparent 50%, rgba(21, 59, 107, 0.15) 100%)
            `,
            borderRadius: '50%',
            filter: 'blur(1px)',
            boxShadow: `
              inset 0 0 50px rgba(0, 168, 181, 0.2),
              0 0 100px rgba(0, 168, 181, 0.1)
            `
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            rotate: {
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
        
        {/* Ambient Lighting Effects */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(0, 168, 181, 0.08) 0%, transparent 30%),
              radial-gradient(circle at 80% 30%, rgba(21, 59, 107, 0.06) 0%, transparent 25%),
              radial-gradient(circle at 40% 80%, rgba(0, 133, 155, 0.05) 0%, transparent 20%),
              radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.02) 0%, transparent 15%)
            `,
            mixBlendMode: 'screen'
          }}
        />
        
        {/* Premium Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-8"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 168, 181, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(21, 59, 107, 0.06) 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px, 80px 80px, 40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 90%)'
          }}
        />
      </div>
      
      {/* Premium Floating Geometric Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            y: [-30, 30, -30], 
            rotate: [0, 360], 
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-24 right-16 w-8 h-8 border-2 border-[#00A8B5]/40 rotate-45 shadow-lg"
          style={{ boxShadow: '0 0 20px rgba(0, 168, 181, 0.5)' }}
        />
        
        <motion.div
          animate={{ 
            y: [25, -35, 25], 
            rotate: [360, 0], 
            scale: [0.8, 1.3, 0.8],
            opacity: [0.4, 0.9, 0.4]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-20 w-6 h-6 bg-[#2196F3]/30 rounded-full"
          style={{ boxShadow: '0 0 25px rgba(33, 150, 243, 0.6)' }}
        />
        
        <motion.div
          animate={{ 
            x: [-15, 25, -15], 
            y: [15, -25, 15], 
            rotate: [0, 180, 360],
            scale: [1, 0.7, 1.4, 1],
            opacity: [0.5, 0.2, 0.8, 0.5]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-1/3 w-10 h-10 border-2 border-[#153B6B]/50 rounded-full"
          style={{ boxShadow: '0 0 30px rgba(21, 59, 107, 0.4)' }}
        />
        
        {/* Additional Premium Geometric Shapes */}
        <motion.div
          animate={{ 
            rotate: [0, 270, 540],
            scale: [1, 1.5, 0.5, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 left-1/4 w-3 h-3 bg-[#00A8B5]/50"
          style={{ 
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            boxShadow: '0 0 15px rgba(0, 168, 181, 0.7)'
          }}
        />
        
        <motion.div
          animate={{ 
            y: [-20, 40, -20],
            x: [10, -30, 10],
            rotate: [45, 225, 405],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-1/4 right-1/5 w-5 h-5 border border-[#2196F3]/40"
          style={{ boxShadow: '0 0 20px rgba(33, 150, 243, 0.5)' }}
        />
      </div>

      {/* Premium Depth & Atmosphere Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Cinematic Vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(21, 59, 107, 0.4) 100%)'
          }}
        />
        
        {/* Premium Scanlines */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 168, 181, 0.3) 2px, rgba(0, 168, 181, 0.3) 4px)',
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Luxury Bokeh Effects */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={`bokeh-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${20 + (i * 10) % 60}%`,
              top: `${25 + (i * 8) % 50}%`,
              width: `${60 + (i * 20)}px`,
              height: `${60 + (i * 20)}px`,
              background: `radial-gradient(circle, ${
                i % 3 === 0 ? 'rgba(0, 168, 181, 0.15)' : 
                i % 3 === 1 ? 'rgba(21, 59, 107, 0.1)' : 
                'rgba(33, 150, 243, 0.12)'
              } 0%, transparent 60%)`,
              filter: 'blur(20px)'
            }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.7, 0.3],
              x: [0, (i % 2 === 0 ? 50 : -50), 0],
              y: [0, (i % 3 === 0 ? -30 : 30), 0]
            }}
            transition={{
              duration: 12 + (i * 2),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5
            }}
          />
        ))}
      </div>

        <div 
          className="container-wide relative smooth-parallax"
          style={{
            transform: `translateY(${scrollY * -0.02}px)`, // Very subtle reverse parallax
            transition: 'transform 0.1s ease-out', // Smooth transition
            zIndex: 20
          }}
        >
        <motion.div 
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
          {/* Enterprise Badge */}
          <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-lg font-medium text-white mb-12 mx-auto w-fit shadow-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            Enterprise-Ready Scan Management
          </div>
          
          <motion.h1 
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
            animate={{ 
              x: mousePosition.x * 0.1, 
              y: mousePosition.y * 0.1 
            }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
          >
            <span className="bg-linear-to-r from-[#00A8B5] to-[#2196F3] bg-clip-text text-transparent">Professional</span>
            <br />
            <span className="text-white">Document Scanning</span>
          </motion.h1>
          
          <p className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto mb-16 leading-relaxed">
            Transform your office workflow with <span className="text-[#00A8B5] font-semibold">secure, automated document ingestion</span> from <span className="text-white font-semibold">Kyocera & Sharp</span> printers.
          </p>
          </motion.div>

        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20"
        >
          <motion.div
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 16px 40px rgba(33, 150, 243, 0.5)'
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link
              href="/trial"
              className="inline-flex items-center gap-3 px-12 py-6 rounded-xl font-bold text-2xl transition-all duration-300"
              style={{ 
                background: 'linear-gradient(135deg, #2196F3 0%, #00A8B5 100%)',
                color: '#FFFFFF',
                boxShadow: '0 12px 32px rgba(33, 150, 243, 0.4)'
              }}
            >
              Start Free Trial
              <motion.span 
                style={{ fontSize: '1.2em' }}
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ 
              scale: 1.05,
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link
              href="/features"
              className="inline-flex items-center gap-3 px-12 py-6 rounded-xl font-bold text-2xl transition-all duration-300"
              style={{
                background: 'transparent',
                border: '3px solid rgba(0, 168, 181, 0.6)',
                color: '#00A8B5'
              }}
            >
              View Features
              <motion.span 
                style={{ fontSize: '1.1em' }}
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              >
                ›
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="relative"
        >
          <div className="flex flex-wrap justify-center gap-10 mb-16">
            <div className="flex flex-col items-center gap-4 px-8 py-6 bg-white/5 backdrop-blur-sm rounded-3xl text-lg font-medium text-white min-w-[180px] shadow-lg">
              <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span>Enterprise Security</span>
            </div>
            <div className="flex flex-col items-center gap-4 px-8 py-6 bg-white/5 backdrop-blur-sm rounded-3xl text-lg font-medium text-white min-w-[180px] shadow-lg">
              <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span>Zero-Config Setup</span>
            </div>
            <div className="flex flex-col items-center gap-4 px-8 py-6 bg-white/5 backdrop-blur-sm rounded-3xl text-lg font-medium text-white min-w-[180px] shadow-lg">
              <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span>24/7 Support</span>
            </div>
            <div className="flex flex-col items-center gap-4 px-8 py-6 bg-white/5 backdrop-blur-sm rounded-3xl text-lg font-medium text-white min-w-[180px] shadow-lg">
              <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <span>Auto-Updates</span>
            </div>
          </div>
        </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 20
        }}
        transition={ {
          duration: 0.8,
          delay: 1.2,
          ease: "easeOut"
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-white/60">
          <motion.span 
            className="text-sm mb-2"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to explore
          </motion.span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
              animate={{ 
                y: [0, 8, 0],
                opacity: [1, 0.3, 1]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;