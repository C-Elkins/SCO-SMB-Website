'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/**
 * HeroPipelineUltra - Ultra-Premium Animated Hero
 * 
 * High-end animated hero with guaranteed cross-browser compatibility.
 * Uses CSS animations + Canvas for maximum performance and reliability.
 */
export default function HeroPipelineUltra({
  brandName = "SCO SMB",
  headline = "Enterprise Document Scanning for Kyocera & Sharp Printers",
  description = "Secure, automated document ingestion with zero-configuration network discovery, enterprise-grade security, and intelligent file organization."
}) {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0a1628] flex items-center justify-center">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-linear-to-br from-[#153B6B]/60 via-transparent to-[#0a1628]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="space-y-8 animate-fadeIn">
          
          {/* Brand Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-[#00A8B5]/30 shadow-2xl animate-slideDown">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A8B5] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00A8B5] shadow-[0_0_20px_rgba(0,168,181,1)]"></span>
            </span>
            <span className="text-base font-bold text-[#00A8B5] tracking-wide uppercase">{brandName}</span>
          </div>

          {/* Main Headline with gradient text */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-linear-to-r from-white via-[#00A8B5] to-white leading-[1.1] tracking-tight max-w-6xl mx-auto animate-slideUp">
            {headline}
          </h1>

          {/* Description */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#E9ECEF] max-w-5xl mx-auto leading-relaxed font-light animate-slideUp animation-delay-200">
            {description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 animate-slideUp animation-delay-400">
            <Link
              href="/trial"
              className="group relative px-10 py-5 bg-linear-to-r from-[#00A8B5] to-[#008c97] text-white text-xl font-bold rounded-2xl transition-all duration-500 shadow-[0_0_40px_rgba(0,168,181,0.4)] hover:shadow-[0_0_60px_rgba(0,168,181,0.8)] hover:scale-110 transform overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Start Free Trial
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Link>
            
            <Link
              href="/features"
              className="group px-10 py-5 bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white text-xl font-bold rounded-2xl transition-all duration-300 border-2 border-white/20 hover:border-[#00A8B5]/50 hover:shadow-[0_0_30px_rgba(0,168,181,0.3)]"
            >
              View Features
            </Link>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-4 justify-center pt-6 animate-fadeIn animation-delay-600">
            {['✓ Zero Configuration', '✓ Enterprise Security', '✓ Network Discovery'].map((feature, i) => (
              <span 
                key={i}
                className="px-5 py-2 text-sm font-medium rounded-full bg-white/5 border border-white/10 text-[#E9ECEF] backdrop-blur-sm hover:bg-white/10 hover:border-[#00A8B5]/30 transition-all duration-300"
                style={{ animationDelay: `${(i + 7) * 100}ms` }}
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-8 h-14 rounded-full border-3 border-white/40 flex items-start justify-center p-2">
          <div className="w-2 h-4 rounded-full bg-[#00A8B5] animate-pulse shadow-[0_0_10px_rgba(0,168,181,0.8)]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-slideDown {
          animation: slideDown 0.6s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        
        .animation-delay-600 {
          animation-delay: 600ms;
        }
      `}</style>
    </section>
  );
}

/**
 * AnimatedBackground - High-performance animated background
 * Uses HTML5 Canvas for smooth, GPU-accelerated animations
 * Lazy loaded for optimal LCP performance
 */
function AnimatedBackground() {
  const canvasRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Delay animation start for better LCP - wait for content to paint first
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!shouldRender || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationId;
    let particles = [];
    let time = 0;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Pipeline path points
    const pathPoints = [
      { x: 0.05, y: 0.7 },
      { x: 0.2, y: 0.4 },
      { x: 0.4, y: 0.6 },
      { x: 0.6, y: 0.35 },
      { x: 0.8, y: 0.55 },
      { x: 0.95, y: 0.4 }
    ];

    // Create particles using factory function
    function createParticle() {
      return {
        progress: Math.random(),
        speed: 0.0003 + Math.random() * 0.0005,
        size: 2 + Math.random() * 4,
        opacity: 0.3 + Math.random() * 0.5,
        hue: 180 + Math.random() * 20,
        
        update() {
          this.progress += this.speed;
          if (this.progress > 1) this.progress = 0;
        },
        
        getPosition() {
          const segmentIndex = Math.floor(this.progress * (pathPoints.length - 1));
          const nextIndex = Math.min(segmentIndex + 1, pathPoints.length - 1);
          const t = (this.progress * (pathPoints.length - 1)) - segmentIndex;
          
          const p1 = pathPoints[segmentIndex];
          const p2 = pathPoints[nextIndex];
          
          const curve = Math.sin(t * Math.PI) * 0.05;
          
          return {
            x: (p1.x + (p2.x - p1.x) * t) * canvas.width,
            y: ((p1.y + (p2.y - p1.y) * t) + curve) * canvas.height
          };
        },
        
        draw() {
          const pos = this.getPosition();
          
          ctx.shadowBlur = 20;
          ctx.shadowColor = `hsla(${this.hue}, 100%, 50%, ${this.opacity})`;
          
          ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${this.opacity})`;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      };
    }

    // Initialize particles
    for (let i = 0; i < 80; i++) {
      particles.push(createParticle());
    }

    // Draw pipeline path
    function drawPipeline() {
      ctx.strokeStyle = 'rgba(0, 168, 181, 0.3)';
      ctx.lineWidth = 4;
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(0, 168, 181, 0.6)';
      
      ctx.beginPath();
      for (let i = 0; i < pathPoints.length; i++) {
        const p = pathPoints[i];
        const x = p.x * canvas.width;
        const y = p.y * canvas.height;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          const prev = pathPoints[i - 1];
          const prevX = prev.x * canvas.width;
          const prevY = prev.y * canvas.height;
          
          // Smooth curves
          const cpX = (prevX + x) / 2;
          const cpY = (prevY + y) / 2 + Math.sin(time * 0.001 + i) * 30;
          
          ctx.quadraticCurveTo(cpX, cpY, x, y);
        }
      }
      ctx.stroke();

      // Draw glowing nodes
      pathPoints.forEach((p, i) => {
        const x = p.x * canvas.width;
        const y = p.y * canvas.height;
        const pulse = 1 + Math.sin(time * 0.003 + i) * 0.3;
        
        ctx.shadowBlur = 25;
        ctx.shadowColor = 'rgba(0, 168, 181, 0.8)';
        ctx.fillStyle = 'rgba(0, 168, 181, 0.6)';
        ctx.beginPath();
        ctx.arc(x, y, 8 * pulse, 0, Math.PI * 2);
        ctx.fill();
        
        // Outer ring
        ctx.strokeStyle = 'rgba(0, 168, 181, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, 15 * pulse, 0, Math.PI * 2);
        ctx.stroke();
      });
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time++;
      
      // Draw pipeline
      drawPipeline();
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Reset shadow for next frame
      ctx.shadowBlur = 0;
      
      animationId = requestAnimationFrame(animate);
    }

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [mounted, shouldRender]);

  if (!mounted || !shouldRender) {
    // Show static background during initial load for better LCP
    return (
      <div className="absolute inset-0 w-full h-full opacity-30 bg-linear-to-br from-[#00A8B5]/20 to-transparent" />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-70"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
