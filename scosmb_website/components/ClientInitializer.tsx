'use client';

import { useEffect } from 'react';
import { initializeScrollTracking, initializeTimeTracking } from '@/lib/analytics';
import { measurePerformance, lazyLoadResources, preloadCriticalResources } from '@/lib/performance';

export default function ClientInitializer() {
  useEffect(() => {
    // Initialize performance optimizations
    preloadCriticalResources();
    lazyLoadResources();
    measurePerformance();

    // Initialize analytics tracking
    const cleanupScroll = initializeScrollTracking();
    const cleanupTime = initializeTimeTracking();

    // Use intersection observer for better performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });

    const belowFoldElements = document.querySelectorAll('.below-fold');
    belowFoldElements.forEach(el => observer.observe(el));

    return () => {
      cleanupScroll?.();
      cleanupTime?.();
      observer.disconnect();
    };
  }, []);

  return null;
}