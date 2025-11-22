import { useEffect, useState } from 'react';

interface PerformanceOptimizedLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

export function PerformanceOptimizedLoader({
  children,
  fallback,
  threshold = 0.1,
  rootMargin = '50px'
}: PerformanceOptimizedLoaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  useEffect(() => {
    // Check device capabilities
    const memory = (navigator as any)?.deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    const connection = (navigator as any)?.connection;
    
    const isLowEnd = memory < 4 || cores < 4 || 
      (connection && ['slow-2g', '2g', '3g'].includes(connection.effectiveType));
    
    setIsLowEndDevice(isLowEnd);

    // Create intersection observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: isLowEnd ? 0.05 : threshold,
        rootMargin: isLowEnd ? '100px' : rootMargin
      }
    );

    const element = document.querySelector('[data-performance-loader]');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  if (!isVisible) {
    return (
      <div 
        data-performance-loader
        className="lazy-load"
        style={{
          minHeight: isLowEndDevice ? '200px' : '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {fallback || <div className="skeleton w-full h-48 rounded-lg" />}
      </div>
    );
  }

  return (
    <div className="lazy-load loaded">
      {children}
    </div>
  );
}

// Optimized image component with performance hints
interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  quality?: number;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  quality
}: OptimizedImageProps) {
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const memory = (navigator as any)?.deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    const connection = (navigator as any)?.connection;
    
    const isLowEnd = memory < 4 || cores < 4 || 
      (connection && ['slow-2g', '2g', '3g'].includes(connection.effectiveType));
    
    setIsLowEndDevice(isLowEnd);
  }, []);

  const optimizedQuality = quality || (isLowEndDevice ? 75 : 90);

  return (
    <div className={`image-container ${className}`}>
      {!imageLoaded && (
        <div className="skeleton absolute inset-0 rounded-lg" />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        className={`optimized-image transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setImageLoaded(true)}
        style={{
          imageRendering: isLowEndDevice ? 'auto' : 'crisp-edges'
        } as React.CSSProperties}
      />
    </div>
  );
}

// Performance-aware animation wrapper
interface PerformanceAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function PerformanceAnimation({ 
  children, 
  className = '',
  delay = 0 
}: PerformanceAnimationProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const memory = (navigator as any)?.deviceMemory || 4;
    const isLowEnd = memory < 4;

    if (prefersReducedMotion || isLowEnd) {
      setShouldAnimate(false);
      return;
    }

    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`${className} ${shouldAnimate ? 'animate-in' : ''}`}
      style={{
        '--animation-delay': `${delay}ms`
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}