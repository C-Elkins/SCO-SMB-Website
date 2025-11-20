import React from 'react';

// Ultra-lightweight loading skeleton with CSS-only animations
export function FastLoadingSkeleton() {
  return (
    <div 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated background dots */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
          `,
          animation: 'pulse 2s infinite'
        }}
      />
      
      {/* Logo skeleton */}
      <div 
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.1)',
          marginBottom: '24px',
          animation: 'shimmer 1.5s infinite linear'
        }}
      />
      
      {/* Title skeleton */}
      <div 
        style={{
          width: '300px',
          height: '32px',
          borderRadius: '8px',
          background: 'rgba(255, 255, 255, 0.1)',
          marginBottom: '16px',
          animation: 'shimmer 1.5s infinite linear'
        }}
      />
      
      {/* Subtitle skeleton */}
      <div 
        style={{
          width: '200px',
          height: '20px',
          borderRadius: '6px',
          background: 'rgba(255, 255, 255, 0.05)',
          animation: 'shimmer 1.5s infinite linear'
        }}
      />
      
      {/* CSS animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { opacity: 0.5; transform: translateX(-100%); }
          50% { opacity: 1; }
          100% { opacity: 0.5; transform: translateX(100%); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        
        /* Ensure immediate visibility */
        div {
          will-change: transform;
          backface-visibility: hidden;
          transform: translateZ(0);
        }
      `}</style>
    </div>
  );
}