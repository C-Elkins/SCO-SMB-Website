'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Track Core Web Vitals - Fixed version with proper observer management
    if (typeof window !== 'undefined' && 'performance' in window && 'PerformanceObserver' in window) {
      
      // Store observers for cleanup
      const observers: PerformanceObserver[] = [];
      
      // Check for supported entry types first
      const supportedEntryTypes = PerformanceObserver.supportedEntryTypes || [];
      
      // LCP (Largest Contentful Paint)
      if (supportedEntryTypes.includes('largest-contentful-paint')) {
        try {
          const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach((entry) => {
              console.log('LCP:', entry.startTime);
              if (window.gtag) {
                window.gtag('event', 'web_vital', {
                  name: 'LCP',
                  value: Math.round(entry.startTime),
                  event_category: 'Performance'
                });
              }
            });
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
          observers.push(lcpObserver);
        } catch (e) {
          console.warn('LCP observer failed:', e);
        }
      }

      // FID (First Input Delay) 
      if (supportedEntryTypes.includes('first-input')) {
        try {
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
          fidObserver.observe({ entryTypes: ['first-input'] });
          observers.push(fidObserver);
        } catch (e) {
          console.warn('FID observer failed:', e);
        }
      }

      // CLS (Cumulative Layout Shift) - Fixed to only observe if supported
      if (supportedEntryTypes.includes('layout-shift')) {
        try {
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
          clsObserver.observe({ entryTypes: ['layout-shift'] });
          observers.push(clsObserver);
        } catch (e) {
          console.warn('CLS observer failed:', e);
        }
      }

      // Navigation timing
      const handleLoad = () => {
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
      };

      window.addEventListener('load', handleLoad);

      return () => {
        // Cleanup all observers
        observers.forEach(observer => {
          try {
            observer.disconnect();
          } catch (e) {
            console.warn('Error disconnecting observer:', e);
          }
        });
        window.removeEventListener('load', handleLoad);
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