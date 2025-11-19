'use client';

import dynamic from 'next/dynamic';


// Lazy load the heavy Hero component with animations
const DynamicHero = dynamic(() => import('./Hero').then(mod => ({ default: mod.Hero })), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      <div className="text-center">
        <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500/20 via-cyan-500/15 to-teal-500/20 backdrop-blur-2xl border border-blue-400/30 text-blue-300 font-semibold mb-8">
          <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse" />
          <span className="text-xl">Enterprise-Ready Scan Management</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none tracking-tighter">
          <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
            Professional
          </span>
          <span className="block text-white mt-4">
            Document Scanning
          </span>
        </h1>
        
        <p className="text-2xl md:text-3xl text-slate-300 max-w-5xl mx-auto mb-12 leading-relaxed font-light">
          Transform your office workflow with secure, automated document ingestion from Kyocera & Sharp printers.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="animate-pulse bg-blue-600 rounded-2xl px-10 py-5 text-xl font-bold text-white">
            Loading...
          </div>
        </div>
      </div>
    </div>
  )
});

// Lazy load motion components for feature cards
const DynamicFeatureCard = dynamic(() => import('./FeatureCard').then(mod => ({ default: mod.FeatureCard })), {
  ssr: false,
  loading: () => (
    <div className="p-8 bg-white rounded-2xl border border-gray-200 shadow-lg animate-pulse">
      <div className="w-12 h-12 bg-gray-200 rounded-xl mb-6"></div>
      <div className="h-6 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
  )
});

export { DynamicHero, DynamicFeatureCard };