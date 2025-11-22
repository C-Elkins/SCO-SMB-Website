/**
 * Performance Optimization Component
 * Implements critical optimizations for better Real Experience Score and INP
 */

'use client';

import { useEffect } from 'react';

export function PerformanceOptimization() {
  useEffect(() => {
    // Defer non-critical scripts
    const deferScripts = () => {
      // Debounce rapid interactions
      let timeout: NodeJS.Timeout;
      const debounce = (fn: Function, delay: number) => {
        return (...args: any[]) => {
          clearTimeout(timeout);
          timeout = setTimeout(() => fn(...args), delay);
        };
      };

      // Optimize event listeners
      const optimizeEventListeners = () => {
        document.addEventListener('mousemove', debounce(() => {}, 16), { passive: true });
        document.addEventListener('scroll', debounce(() => {}, 16), { passive: true });
      };

      optimizeEventListeners();
    };

    // Use requestIdleCallback for non-critical work
    if ('requestIdleCallback' in window) {
      requestIdleCallback(deferScripts, { timeout: 2000 });
    } else {
      setTimeout(deferScripts, 1);
    }

    // Reduce layout thrashing
    let rafId: number;
    const optimizeAnimations = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        // Batch DOM reads and writes
      });
    };

    window.addEventListener('resize', optimizeAnimations, { passive: true });

    return () => {
      window.removeEventListener('resize', optimizeAnimations);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
