'use client';

import { useEffect } from 'react';

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private vitals: { [key: string]: number } = {};

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  public trackVital(name: string, value: number, rating?: 'good' | 'needs-improvement' | 'poor') {
    this.vitals[name] = value;
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 ${name}: ${value}ms${rating ? ` (${rating})` : ''}`);
    }

    // Send to analytics in production
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Analytics integration would go here
      this.sendToAnalytics(name, value, rating);
    }
  }

  private sendToAnalytics(name: string, value: number, rating?: string) {
    // Placeholder for analytics integration
    // gtag('event', 'web_vital', { name, value, rating });
    console.log(`Analytics: ${name} = ${value}${rating ? ` (${rating})` : ''}`);
  }

  public getVitals() {
    return { ...this.vitals };
  }
}

// Custom hook for Web Vitals tracking
export function useWebVitals() {
  useEffect(() => {
    const monitor = PerformanceMonitor.getInstance();

    // Basic performance tracking using native APIs
    if (typeof window !== 'undefined') {
      try {
        // Use native Performance Observer for basic metrics
        if ('PerformanceObserver' in window) {
          const perfObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
              if (entry.entryType === 'largest-contentful-paint') {
                const rating = entry.startTime <= 2500 ? 'good' : entry.startTime <= 4000 ? 'needs-improvement' : 'poor';
                monitor.trackVital('LCP', entry.startTime, rating);
              }
              if (entry.entryType === 'first-contentful-paint') {
                const rating = entry.startTime <= 1800 ? 'good' : entry.startTime <= 3000 ? 'needs-improvement' : 'poor';
                monitor.trackVital('FCP', entry.startTime, rating);
              }
            });
          });

          perfObserver.observe({ entryTypes: ['largest-contentful-paint', 'first-contentful-paint'] });
        }

        // Basic page load timing
        window.addEventListener('load', () => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (navigation) {
            const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
            monitor.trackVital('LOAD_TIME', loadTime);
          }
        });
      } catch (error) {
        console.log('Performance monitoring initialization failed:', error);
      }
    }

    // Custom performance tracking
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navigationEntry = entry as PerformanceNavigationTiming;
          monitor.trackVital('DOM_CONTENT_LOADED', navigationEntry.domContentLoadedEventEnd - navigationEntry.domContentLoadedEventStart);
          monitor.trackVital('LOAD_COMPLETE', navigationEntry.loadEventEnd - navigationEntry.loadEventStart);
        }
      });
    });

    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      observer.observe({ entryTypes: ['navigation'] });
    }

    return () => {
      if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
        observer.disconnect();
      }
    };
  }, []);
}

// Performance debugging component
export function PerformanceDebugger() {
  useWebVitals();

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Add performance debugging panel
      const debugPanel = document.createElement('div');
      debugPanel.id = 'perf-debug';
      debugPanel.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 12px;
        z-index: 9999;
        max-width: 200px;
      `;
      
      document.body.appendChild(debugPanel);

      const updateDebugInfo = () => {
        const monitor = PerformanceMonitor.getInstance();
        const vitals = monitor.getVitals();
        debugPanel.innerHTML = `
          <div><strong>Web Vitals</strong></div>
          ${Object.entries(vitals).map(([key, value]) => 
            `<div>${key}: ${typeof value === 'number' ? value.toFixed(2) : value}</div>`
          ).join('')}
        `;
      };

      const interval = setInterval(updateDebugInfo, 1000);

      return () => {
        clearInterval(interval);
        if (document.body.contains(debugPanel)) {
          document.body.removeChild(debugPanel);
        }
      };
    }
  }, []);

  return null;
}