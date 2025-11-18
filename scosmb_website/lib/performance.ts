'use client';

import { useEffect } from 'react';

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  const criticalResources: { href: string; as: string; type?: string }[] = [
    // Only preload resources that are actually used immediately on page load
    // Removed logo and hero image preloads due to unused resource warnings
  ];

  criticalResources.forEach(({ href, as, type }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    document.head.appendChild(link);
  });
}

// Lazy load non-critical resources
export function lazyLoadResources() {
  if (typeof window === 'undefined') return;

  // Load non-critical fonts
  const loadFonts = () => {
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    fontLink.media = 'print';
    fontLink.onload = function() {
      fontLink.media = 'all';
    };
    document.head.appendChild(fontLink);
  };

  // Use requestIdleCallback if available, otherwise setTimeout
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      loadFonts();
    });
  } else {
    setTimeout(() => {
      loadFonts();
    }, 100);
  }
}

// Intersection Observer hook for revealing animations
export function useIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) {
  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1,
      ...options
    });

    const elements = document.querySelectorAll('.below-fold');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [callback, options]);
}

// Performance monitoring
export function measurePerformance() {
  if (typeof window === 'undefined' || !('performance' in window)) return;

  // Measure Core Web Vitals
  const observer = new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        console.log('LCP:', entry.startTime);
      }
      if (entry.entryType === 'first-input') {
        const fidEntry = entry as PerformanceEventTiming;
        console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
      }
      if (entry.entryType === 'layout-shift') {
        const clsEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
        if (!clsEntry.hadRecentInput) {
          console.log('CLS:', clsEntry.value);
        }
      }
    }
  });

  try {
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  } catch (e) {
    // Some browsers might not support all entry types
    console.warn('Performance observer not fully supported:', e);
  }
}

// Debounce utility for performance
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Throttle utility for performance
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}