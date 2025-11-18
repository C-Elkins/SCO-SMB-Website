'use client';

// Custom analytics events for better insights
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Track user interactions
export const trackEvent = (event: AnalyticsEvent) => {
  // Vercel Analytics
  if (typeof window !== 'undefined' && window.va) {
    window.va('track', event.action, {
      category: event.category,
      label: event.label,
      value: event.value
    });
  }

  // Google Analytics 4 (if available)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value
    });
  }

  // Console logging for development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', event);
  }
};

// Specific tracking functions
export const analytics = {
  // Download tracking
  trackDownload: (version: string, platform: string) => {
    trackEvent({
      action: 'download',
      category: 'engagement',
      label: `${version}-${platform}`,
      value: 1
    });
  },

  // Form submissions
  trackFormSubmission: (formType: string, success: boolean = true) => {
    trackEvent({
      action: 'form_submit',
      category: 'engagement',
      label: formType,
      value: success ? 1 : 0
    });
  },

  // Navigation
  trackNavigation: (destination: string) => {
    trackEvent({
      action: 'navigate',
      category: 'engagement',
      label: destination
    });
  },

  // Feature engagement
  trackFeatureClick: (feature: string) => {
    trackEvent({
      action: 'feature_click',
      category: 'engagement',
      label: feature
    });
  },

  // Documentation usage
  trackDocumentationView: (section: string) => {
    trackEvent({
      action: 'docs_view',
      category: 'content',
      label: section
    });
  },

  // Trial requests
  trackTrialRequest: (source: string = 'unknown') => {
    trackEvent({
      action: 'trial_request',
      category: 'conversion',
      label: source,
      value: 10 // Higher value for conversion events
    });
  },

  // Pricing inquiries
  trackPricingInquiry: (planType: string) => {
    trackEvent({
      action: 'pricing_inquiry',
      category: 'conversion',
      label: planType,
      value: 5
    });
  },

  // Search usage
  trackSiteSearch: (query: string, results: number) => {
    trackEvent({
      action: 'site_search',
      category: 'engagement',
      label: query,
      value: results
    });
  },

  // Video engagement
  trackVideoPlay: (videoId: string) => {
    trackEvent({
      action: 'video_play',
      category: 'engagement',
      label: videoId
    });
  },

  // Error tracking
  trackError: (errorType: string, errorMessage: string) => {
    trackEvent({
      action: 'error',
      category: 'error',
      label: `${errorType}: ${errorMessage}`
    });
  },

  // Performance tracking
  trackPerformance: (metric: string, value: number) => {
    trackEvent({
      action: 'performance',
      category: 'technical',
      label: metric,
      value: Math.round(value)
    });
  }
};

// Auto-track scroll depth
export const initializeScrollTracking = () => {
  if (typeof window === 'undefined') return;

  let maxScroll = 0;
  const thresholds = [25, 50, 75, 90, 100];
  const tracked = new Set<number>();

  const trackScrollDepth = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      // Track major scroll milestones
      thresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !tracked.has(threshold)) {
          tracked.add(threshold);
          trackEvent({
            action: 'scroll_depth',
            category: 'engagement',
            label: `${threshold}%`,
            value: threshold
          });
        }
      });
    }
  };

  let ticking = false;
  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        trackScrollDepth();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => window.removeEventListener('scroll', handleScroll);
};

// Auto-track time on page
export const initializeTimeTracking = () => {
  if (typeof window === 'undefined') return;

  const startTime = Date.now();
  const intervals = [30, 60, 120, 300]; // 30s, 1m, 2m, 5m
  const tracked = new Set<number>();

  const trackTimeOnPage = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    intervals.forEach(interval => {
      if (timeSpent >= interval && !tracked.has(interval)) {
        tracked.add(interval);
        trackEvent({
          action: 'time_on_page',
          category: 'engagement',
          label: `${interval}s`,
          value: interval
        });
      }
    });
  };

  const timer = setInterval(trackTimeOnPage, 5000); // Check every 5 seconds
  
  return () => clearInterval(timer);
};

// Extend window interface for analytics
declare global {
  interface Window {
    va?: (action: string, ...args: unknown[]) => void;
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}