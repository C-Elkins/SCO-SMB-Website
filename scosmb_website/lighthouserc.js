/**
 * 🚀 LIGHTHOUSE CI CONFIGURATION
 *
 * World-class performance budgets aligned with:
 * - Apple.com
 * - Stripe.com
 * - Vercel.com
 * - Linear.app
 */

module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'Ready',
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/docs',
        'http://localhost:3000/download',
      ],
      settings: {
        preset: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
        },
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
        formFactor: 'desktop',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      },
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        // Performance Metrics
        'first-contentful-paint': ['error', { maxNumericValue: 1500 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.02 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        'speed-index': ['error', { maxNumericValue: 2500 }],
        'interactive': ['error', { maxNumericValue: 3000 }],

        // Resource Metrics
        'resource-summary:script:size': ['error', { maxNumericValue: 300000 }], // 300KB max JS
        'resource-summary:stylesheet:size': ['error', { maxNumericValue: 150000 }], // 150KB max CSS
        'resource-summary:image:size': ['error', { maxNumericValue: 500000 }], // 500KB max images
        'resource-summary:total:size': ['error', { maxNumericValue: 1000000 }], // 1MB total

        // Network
        'network-requests': ['error', { maxNumericValue: 50 }],
        'uses-http2': 'error',
        'uses-long-cache-ttl': 'warn',

        // JavaScript
        'bootup-time': ['error', { maxNumericValue: 2000 }],
        'mainthread-work-breakdown': ['error', { maxNumericValue: 3000 }],
        'uses-optimized-images': 'error',
        'modern-image-formats': 'warn',
        'unminified-javascript': 'error',
        'unused-javascript': 'warn',

        // Fonts
        'font-display': 'error',
        'preload-fonts': 'warn',

        // Critical Path
        'render-blocking-resources': 'warn',
        'uses-rel-preconnect': 'warn',

        // Overall Scores
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
