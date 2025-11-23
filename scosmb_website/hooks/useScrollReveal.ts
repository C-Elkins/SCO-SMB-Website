/**
 * 🚀 useScrollReveal Hook
 * Performant scroll-based reveal animations using IntersectionObserver
 * Replaces framer-motion's whileInView for better performance
 *
 * Usage:
 * const ref = useScrollReveal({ threshold: 0.1 });
 * <div ref={ref} className="reveal-on-scroll">...</div>
 */

'use client';

import { useEffect, useRef } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export function useScrollReveal({
  threshold = 0.1,
  rootMargin = '-50px',
  triggerOnce = true,
  delay = 0,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for IntersectionObserver support
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // Fallback: Just show the element
      element.classList.add('revealed');
      return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      element.classList.add('revealed');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Apply delay if specified
            if (delay > 0) {
              setTimeout(() => {
                entry.target.classList.add('revealed');
              }, delay);
            } else {
              entry.target.classList.add('revealed');
            }

            // Disconnect if triggerOnce is true
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            // Remove revealed class if triggerOnce is false
            entry.target.classList.remove('revealed');
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    // Cleanup
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce, delay]);

  return ref;
}

/**
 * useScrollRevealMultiple
 * For revealing multiple elements with stagger effect
 */
export function useScrollRevealMultiple(count: number, {
  threshold = 0.1,
  rootMargin = '-50px',
  triggerOnce = true,
  staggerDelay = 100,
}: UseScrollRevealOptions & { staggerDelay?: number } = {}) {
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const elements = refs.current.filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    // Check for IntersectionObserver support
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('revealed'));
      return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      elements.forEach(el => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = elements.indexOf(entry.target as HTMLElement);
            const delay = index * staggerDelay;

            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, delay);

            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            entry.target.classList.remove('revealed');
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    elements.forEach(element => observer.observe(element));

    // Cleanup
    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, [count, threshold, rootMargin, triggerOnce, staggerDelay]);

  return refs;
}
