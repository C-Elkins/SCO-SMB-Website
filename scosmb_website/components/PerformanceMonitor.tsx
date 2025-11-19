'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Track Core Web Vitals
    if (typeof window !== 'undefined' && 'performance' in window) {
      // LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          console.log('LCP:', entry.startTime);
          // Send to analytics
          if (window.gtag) {
            window.gtag('event', 'web_vital', {
              name: 'LCP',
              value: Math.round(entry.startTime),
              event_category: 'Performance'
            });
          }
        });
      });

      // FID (First Input Delay)
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          const fidEntry = entry as PerformanceEventTiming;
          const fid = fidEntry.processingStart - fidEntry.startTime;
          console.log('FID:', fid);
          if (window.gtag) {
            window.gtag('event', 'web_vital', {
              name: 'FID',
              value: Math.round(fid),
              event_category: 'Performance'
            });
          }
        });
      });

      // CLS (Cumulative Layout Shift)
      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          const clsEntry = entry as PerformanceEntry & { 
            hadRecentInput?: boolean; 
            value?: number; 
          };
          if (!clsEntry.hadRecentInput && clsEntry.value) {
            console.log('CLS:', clsEntry.value);
            if (window.gtag) {
              window.gtag('event', 'web_vital', {
                name: 'CLS',
                value: Math.round(clsEntry.value * 1000),
                event_category: 'Performance'
              });
            }
          }
        });
      });

      // Start observing
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        fidObserver.observe({ entryTypes: ['first-input'] });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('Performance observer not fully supported:', e);
      }

      // Navigation timing
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          const loadTime = navigation.loadEventEnd - navigation.fetchStart;
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
          
          console.log('Page Load Time:', loadTime);
          console.log('DOM Content Loaded:', domContentLoaded);
          
          if (window.gtag) {
            window.gtag('event', 'page_load_time', {
              value: Math.round(loadTime),
              event_category: 'Performance'
            });
            window.gtag('event', 'dom_content_loaded', {
              value: Math.round(domContentLoaded),
              event_category: 'Performance'
            });
          }
        }, 0);
      });

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);

  return null; // This component doesn't render anything
}

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}