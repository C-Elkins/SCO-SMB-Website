'use client'

import { useEffect, useState } from 'react'

interface ResourceTiming {
  name: string
  duration: number
  size?: number
  type: 'script' | 'stylesheet' | 'image' | 'fetch' | 'navigation'
}

export default function AdvancedPerformanceMonitor() {
  const [metrics, setMetrics] = useState<{
    fcp?: number
    lcp?: number
    fid?: number
    cls?: number
    inp?: number
    ttfb?: number
    resources?: ResourceTiming[]
  }>({})

  useEffect(() => {
    // Enhanced Web Vitals monitoring
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { renderTime?: number; loadTime?: number }
        setMetrics(prev => ({ 
          ...prev, 
          lcp: lastEntry.renderTime || lastEntry.loadTime || 0 
        }))
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        if (entries.length > 0) {
          setMetrics(prev => ({ ...prev, fcp: entries[0].startTime }))
        }
      })
      fcpObserver.observe({ entryTypes: ['paint'] })

      // Cumulative Layout Shift
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as PerformanceEntry & { value?: number; hadRecentInput?: boolean }
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value || 0
            setMetrics(prev => ({ ...prev, cls: clsValue }))
          }
        }
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })

      // Interaction to Next Paint (INP)
      const inpObserver = new PerformanceObserver((list) => {
        let longestINP = 0
        for (const entry of list.getEntries()) {
          const eventEntry = entry as PerformanceEntry & { processingStart?: number; processingEnd?: number }
          const inp = (eventEntry.processingEnd || 0) - (entry.startTime || 0)
          if (inp > longestINP) {
            longestINP = inp
            setMetrics(prev => ({ ...prev, inp: longestINP }))
          }
        }
      })
      inpObserver.observe({ entryTypes: ['event'] })

      // Resource monitoring
      const resourceObserver = new PerformanceObserver((list) => {
        const resources: ResourceTiming[] = []
        for (const entry of list.getEntries()) {
          const resourceEntry = entry as PerformanceResourceTiming
          resources.push({
            name: resourceEntry.name.replace(window.location.origin, ''),
            duration: resourceEntry.duration,
            size: resourceEntry.encodedBodySize || resourceEntry.decodedBodySize,
            type: getResourceType(resourceEntry.name)
          })
        }
        setMetrics(prev => ({ 
          ...prev, 
          resources: [...(prev.resources || []), ...resources].slice(-20) // Keep last 20
        }))
      })
      resourceObserver.observe({ entryTypes: ['resource'] })

      // Navigation timing
      const navigationObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const navEntry = entry as PerformanceNavigationTiming
          setMetrics(prev => ({ 
            ...prev, 
            ttfb: navEntry.responseStart - navEntry.requestStart 
          }))
        }
      })
      navigationObserver.observe({ entryTypes: ['navigation'] })

      return () => {
        lcpObserver.disconnect()
        fcpObserver.disconnect()
        clsObserver.disconnect()
        inpObserver.disconnect()
        resourceObserver.disconnect()
        navigationObserver.disconnect()
      }
    }
  }, [])

  // Send metrics to analytics (Vercel Analytics integration)
  useEffect(() => {
    if (Object.keys(metrics).length > 0) {
      // Send to Vercel Analytics or your preferred analytics service
      if (typeof window !== 'undefined' && (window as any).va) {
        (window as any).va('track', 'Performance Metrics', {
          fcp: metrics.fcp,
          lcp: metrics.lcp,
          cls: metrics.cls,
          inp: metrics.inp,
          ttfb: metrics.ttfb
        })
      }
    }
  }, [metrics])

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg text-xs font-mono max-w-xs z-50 opacity-90 hover:opacity-100 transition-opacity">
      <h4 className="font-bold mb-2">Performance Metrics</h4>
      <div className="space-y-1">
        {metrics.fcp && (
          <div className={getScoreColor(metrics.fcp, 1800, 3000)}>
            FCP: {Math.round(metrics.fcp)}ms
          </div>
        )}
        {metrics.lcp && (
          <div className={getScoreColor(metrics.lcp, 2500, 4000)}>
            LCP: {Math.round(metrics.lcp)}ms
          </div>
        )}
        {metrics.cls && (
          <div className={getScoreColor(metrics.cls * 1000, 100, 250)}>
            CLS: {metrics.cls.toFixed(3)}
          </div>
        )}
        {metrics.inp && (
          <div className={getScoreColor(metrics.inp, 200, 500)}>
            INP: {Math.round(metrics.inp)}ms
          </div>
        )}
        {metrics.ttfb && (
          <div className={getScoreColor(metrics.ttfb, 800, 1800)}>
            TTFB: {Math.round(metrics.ttfb)}ms
          </div>
        )}
      </div>
    </div>
  )
}

function getResourceType(url: string): ResourceTiming['type'] {
  if (url.includes('.js')) return 'script'
  if (url.includes('.css')) return 'stylesheet'
  if (url.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/)) return 'image'
  if (url.includes('/api/')) return 'fetch'
  return 'navigation'
}

function getScoreColor(value: number, good: number, poor: number): string {
  if (value <= good) return 'text-green-400'
  if (value <= poor) return 'text-yellow-400'
  return 'text-red-400'
}