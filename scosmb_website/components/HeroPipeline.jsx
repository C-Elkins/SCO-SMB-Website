// SCO-SMB Hero Pipeline — Animated SVG Component
// File: components/HeroPipeline.jsx
// Usage: import HeroPipeline from '@/components/HeroPipeline'
// Place <HeroPipeline /> in your homepage hero section.

/*
This component creates a beautiful animated pipeline visualization using SVG.
It's optimized for performance and compatibility across all browsers.

Performance features:
- Lightweight SVG-based animation
- Respects prefers-reduced-motion settings
- No dependencies on heavy 3D libraries
- Fast loading and rendering
- Cross-browser compatible

Props:
- brandName (string) default: 'SCO-SMB'
- headline (string) default: "Enterprise Document Scanning for Kyocera & Sharp Printers"
- subcopy (string) default: your provided subcopy
- reduceMotion (bool) default: false
*/

import React, { useState, useEffect } from 'react';
import Link from 'next/link';



// Simple animated SVG pipeline component to avoid WebGL context issues
function AnimatedPipeline({ reduce = false }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-linear-to-b from-[#071a2a] to-[#04121a] relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {!reduce && Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
            style={{
              left: `${10 + i * 4}%`,
              top: `${30 + Math.sin(i * 0.5) * 20}%`,
              animation: `float ${3 + i * 0.2}s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
      
      {/* Main pipeline visualization */}
      <svg width="90%" height="70%" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid meet" className="z-10">
        <defs>
          <linearGradient id="pipeline-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#00A8B5" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#00A8B5" stopOpacity="1" />
            <stop offset="100%" stopColor="#153B6B" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/> 
            </feMerge>
          </filter>
          {!reduce && (
            <>
              <circle id="particle" r="3" fill="#00A8B5" opacity="0.8" />
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                values="0,0; 800,0"
                dur="4s"
                repeatCount="indefinite"
              />
            </>
          )}
        </defs>
        
        {/* Pipeline curve */}
        <path 
          d="M50 200 Q200 80 400 150 T750 180" 
          stroke="url(#pipeline-grad)" 
          strokeWidth="8" 
          fill="none" 
          strokeLinecap="round"
          filter="url(#glow)"
          className={!reduce ? 'animate-pulse' : ''}
        />
        
        {/* Start node */}
        <circle cx="50" cy="200" r="12" fill="#00A8B5" filter="url(#glow)" />
        
        {/* Middle processing node */}
        <rect x="385" y="135" width="30" height="30" rx="4" fill="#153B6B" stroke="#00A8B5" strokeWidth="2" filter="url(#glow)" />
        
        {/* End node */}
        <rect x="735" y="165" width="40" height="30" rx="6" fill="#153B6B" stroke="#00A8B5" strokeWidth="2" filter="url(#glow)" />
        
        {/* Animated particles along path */}
        {!reduce && (
          <>
            <circle r="2" fill="#00A8B5" opacity="0.9">
              <animateMotion dur="3s" repeatCount="indefinite">
                <mpath href="#pipeline-path" />
              </animateMotion>
            </circle>
            <circle r="2" fill="#00A8B5" opacity="0.7">
              <animateMotion dur="3s" repeatCount="indefinite" begin="1s">
                <mpath href="#pipeline-path" />
              </animateMotion>
            </circle>
            <circle r="2" fill="#00A8B5" opacity="0.5">
              <animateMotion dur="3s" repeatCount="indefinite" begin="2s">
                <mpath href="#pipeline-path" />
              </animateMotion>
            </circle>
          </>
        )}
        
        <path id="pipeline-path" d="M50 200 Q200 80 400 150 T750 180" opacity="0" />
      </svg>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}



export default function HeroPipeline({ brandName = 'SCO-SMB', headline, subcopy, reduceMotion = false }) {
  const [mounted, setMounted] = useState(false);
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reduce = reduceMotion || prefersReduced;
  
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const defaultHeadline = 'Enterprise Document Scanning for Kyocera & Sharp Printers';
  const defaultSubcopy = 'Secure, automated document ingestion with zero-configuration network discovery, enterprise-grade security, and intelligent file organization.';
  
  // Don't render until client-side hydration is complete
  if (!mounted) {
    return (
      <section className="relative w-full bg-linear-to-b from-[#071a2a] to-[#04121a] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="z-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-md bg-[#153B6B] text-white px-3 py-1 font-semibold">{brandName}</div>
              <div className="text-sm text-slate-300">Enterprise-grade · Secure · Zero-config</div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-white mb-6 whitespace-pre-line">{headline || defaultHeadline}</h1>
            <p className="text-lg text-slate-300 max-w-xl mb-6">{subcopy || defaultSubcopy}</p>
            <div className="flex gap-4">
              <Link href="/download" className="inline-flex items-center gap-2 px-5 py-3 bg-[#00A8B5] text-[#042631] font-semibold rounded-lg shadow-lg hover:brightness-105">
                Get Started
              </Link>
              <Link href="/docs" className="inline-flex items-center gap-2 px-5 py-3 border border-slate-700 text-slate-200 rounded-lg">
                Learn more
              </Link>
            </div>
          </div>
          <div className="relative w-full h-[520px] lg:h-[640px] rounded-2xl overflow-hidden shadow-2xl bg-linear-to-b from-[#071a2a] to-[#04121a] flex items-center justify-center">
            <div className="text-slate-300 text-lg animate-pulse">Loading Pipeline...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full bg-linear-to-b from-[#071a2a] to-[#04121a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="z-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-md bg-[#153B6B] text-white px-3 py-1 font-semibold">{brandName}</div>
            <div className="text-sm text-slate-300">Enterprise-grade · Secure · Zero-config</div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-white mb-6 whitespace-pre-line">{headline || defaultHeadline}</h1>
          <p className="text-lg text-slate-300 max-w-xl mb-6">{subcopy || defaultSubcopy}</p>
          <div className="flex gap-4">
            <Link href="/download" className="inline-flex items-center gap-2 px-5 py-3 bg-[#00A8B5] text-[#042631] font-semibold rounded-lg shadow-lg hover:brightness-105">
              Get Started
            </Link>
            <Link href="/docs" className="inline-flex items-center gap-2 px-5 py-3 border border-slate-700 text-slate-200 rounded-lg">
              Learn more
            </Link>
          </div>
        </div>
        <div className="relative w-full h-[520px] lg:h-[640px] rounded-2xl overflow-hidden shadow-2xl">
          {mounted ? (
            <AnimatedPipeline reduce={reduce} />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-b from-[#071a2a] to-[#04121a]">
              <div className="text-slate-300 animate-pulse">Loading...</div>
            </div>
          )}
        </div>
      </div>

      {/* Decorative gradient overlays to add depth */}
      <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-20" />
    </section>
  );
}