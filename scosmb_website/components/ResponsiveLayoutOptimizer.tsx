'use client'

import { useEffect, useState } from 'react'

interface ResponsiveLayoutProps {
  children: React.ReactNode
  className?: string
}

interface ViewportInfo {
  width: number
  height: number
  ratio: number
  isTouch: boolean
  connection: string
  memory: number
  cores: number
  pixelRatio: number
}

export default function ResponsiveLayoutOptimizer({ children, className = '' }: ResponsiveLayoutProps) {
  const [viewport, setViewport] = useState<ViewportInfo>({
    width: 0,
    height: 0,
    ratio: 1,
    isTouch: false,
    connection: 'unknown',
    memory: 4,
    cores: 4,
    pixelRatio: 1
  })

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const ratio = width / height
      const isTouch = 'ontouchstart' in window
      const connection = (navigator as any)?.connection?.effectiveType || 'unknown'
      const memory = (navigator as any)?.deviceMemory || 4
      const cores = navigator.hardwareConcurrency || 4
      const pixelRatio = window.devicePixelRatio || 1

      setViewport({
        width,
        height,
        ratio,
        isTouch,
        connection,
        memory,
        cores,
        pixelRatio
      })

      // Set CSS custom properties for responsive design
      document.documentElement.style.setProperty('--vw', `${width}px`)
      document.documentElement.style.setProperty('--vh', `${height}px`)
      document.documentElement.style.setProperty('--aspect-ratio', ratio.toString())
      document.documentElement.style.setProperty('--is-touch', isTouch ? '1' : '0')
      document.documentElement.style.setProperty('--pixel-ratio', pixelRatio.toString())
      document.documentElement.style.setProperty('--device-memory', memory.toString())
      document.documentElement.style.setProperty('--device-cores', cores.toString())

      // Performance-based classes
      document.documentElement.classList.toggle('low-memory', memory < 4)
      document.documentElement.classList.toggle('slow-connection', ['slow-2g', '2g', '3g'].includes(connection))
      document.documentElement.classList.toggle('high-dpi', pixelRatio > 1.5)
      document.documentElement.classList.toggle('touch-device', isTouch)
      
      // Breakpoint classes
      document.documentElement.classList.remove('mobile', 'tablet', 'desktop', 'ultrawide')
      if (width < 640) {
        document.documentElement.classList.add('mobile')
      } else if (width < 1024) {
        document.documentElement.classList.add('tablet')
      } else if (width < 1920) {
        document.documentElement.classList.add('desktop')
      } else {
        document.documentElement.classList.add('ultrawide')
      }

      // Orientation classes
      document.documentElement.classList.toggle('landscape', ratio > 1)
      document.documentElement.classList.toggle('portrait', ratio <= 1)
    }

    // Initial call
    updateViewport()

    // Throttled resize handler
    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(updateViewport, 100)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('orientationchange', handleResize, { passive: true })

    // Handle viewport units on mobile
    const setVH = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh-mobile', `${vh}px`)
    }
    
    setVH()
    window.addEventListener('resize', setVH, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      window.removeEventListener('resize', setVH)
      clearTimeout(resizeTimer)
    }
  }, [])

  // Adaptive image quality based on device capabilities
  useEffect(() => {
    const quality = viewport.memory >= 8 && viewport.cores >= 8 && !['slow-2g', '2g', '3g'].includes(viewport.connection) ? '90' : '75'
    document.documentElement.style.setProperty('--image-quality', quality)
  }, [viewport])

  const layoutClasses = [
    className,
    'responsive-layout',
    viewport.width < 640 ? 'layout-mobile' : '',
    viewport.width >= 640 && viewport.width < 1024 ? 'layout-tablet' : '',
    viewport.width >= 1024 && viewport.width < 1920 ? 'layout-desktop' : '',
    viewport.width >= 1920 ? 'layout-ultrawide' : '',
    viewport.isTouch ? 'layout-touch' : 'layout-mouse',
    viewport.memory < 4 ? 'layout-low-memory' : '',
    ['slow-2g', '2g', '3g'].includes(viewport.connection) ? 'layout-slow-connection' : '',
    viewport.pixelRatio > 1.5 ? 'layout-high-dpi' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={layoutClasses}>
      {children}
    </div>
  )
}

// CSS-in-JS styles for critical responsive optimizations
export const ResponsiveStyles = () => (
  <style jsx global>{`
    /* Fluid typography */
    :root {
      --fluid-min-width: 320;
      --fluid-max-width: 1920;
      --fluid-screen: 100vw;
      --fluid-bp: calc(
        (var(--fluid-screen) - var(--fluid-min-width) / 16 * 1rem) /
        (var(--fluid-max-width) - var(--fluid-min-width))
      );
    }

    /* Container queries */
    @container (max-width: 640px) {
      .responsive-layout {
        --container-size: small;
      }
    }

    @container (min-width: 641px) and (max-width: 1024px) {
      .responsive-layout {
        --container-size: medium;
      }
    }

    @container (min-width: 1025px) {
      .responsive-layout {
        --container-size: large;
      }
    }

    /* Performance-based optimizations */
    .layout-low-memory * {
      animation-duration: 0.1s !important;
      transition-duration: 0.1s !important;
    }

    .layout-slow-connection img {
      loading: lazy;
    }

    .layout-slow-connection video {
      preload: none;
    }

    .layout-touch .hover\\:scale-105:hover {
      transform: none !important;
    }

    .layout-touch button {
      min-height: 44px;
      min-width: 44px;
    }

    /* High DPI optimizations */
    .layout-high-dpi {
      font-feature-settings: 'liga', 'kern';
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Mobile viewport fixes */
    .layout-mobile {
      min-height: calc(var(--vh-mobile, 1vh) * 100);
    }

    /* Prevent horizontal scroll */
    .responsive-layout {
      max-width: 100vw;
      overflow-x: hidden;
    }

    /* Optimize for Safari */
    @supports (-webkit-appearance: none) {
      .layout-mobile .sticky {
        position: -webkit-sticky;
      }
      
      .layout-mobile input[type="text"],
      .layout-mobile input[type="email"],
      .layout-mobile textarea {
        font-size: 16px; /* Prevent zoom */
      }
    }

    /* Optimize scrolling performance */
    .responsive-layout {
      -webkit-overflow-scrolling: touch;
      scrollbar-width: thin;
    }

    /* Print optimizations */
    @media print {
      .responsive-layout * {
        animation: none !important;
        transition: none !important;
        transform: none !important;
      }
    }

    /* Reduce motion for accessibility */
    @media (prefers-reduced-motion: reduce) {
      .responsive-layout *,
      .responsive-layout *::before,
      .responsive-layout *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .responsive-layout {
        filter: contrast(1.2);
      }
    }

    /* Dark mode optimizations */
    @media (prefers-color-scheme: dark) {
      .responsive-layout {
        color-scheme: dark;
      }
    }
  `}</style>
)