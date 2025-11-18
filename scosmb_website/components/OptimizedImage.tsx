'use client';

import { useState, useRef, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'loading'> {
  fallbackSrc?: string;
  errorFallback?: React.ReactNode;
  loadingComponent?: React.ReactNode;
  priority?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  fallbackSrc,
  errorFallback,
  loadingComponent,
  priority = false,
  className = '',
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(!priority);
  const [hasError, setHasError] = useState(false);
  const [inView, setInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before the image enters viewport
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, inView]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const shouldLoad = priority || inView;

  if (hasError && errorFallback) {
    return <>{errorFallback}</>;
  }

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {/* Loading placeholder */}
      {isLoading && loadingComponent && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          {loadingComponent}
        </div>
      )}
      
      {/* Error fallback image */}
      {hasError && fallbackSrc ? (
        <Image
          src={fallbackSrc}
          alt={alt}
          onLoad={handleLoad}
          className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}
          {...props}
        />
      ) : (
        shouldLoad && (
          <Image
            src={src}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
            priority={priority}
            className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}
            {...props}
          />
        )
      )}
      
      {/* Blur placeholder for smooth loading */}
      {!hasError && isLoading && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"
          style={{
            background: 'linear-gradient(45deg, #f3f4f6, #e5e7eb)',
          }}
        />
      )}
    </div>
  );
}