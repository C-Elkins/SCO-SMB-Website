"use client";
import { motion } from 'framer-motion';
import { LucideIcon, ArrowRight, CheckCircle } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  variant?: 'default' | 'highlighted';
  benefits?: string[];
  technicalDetails?: string;
}

export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0,
  variant = 'default',
  benefits = [],
  technicalDetails = ''
}: FeatureCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: isVisible ? delay : 0 }}
      className="group relative h-80 perspective-1000"
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      {/* Card Container with 3D flip */}
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
        className="relative w-full h-full preserve-3d"
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden">
          <motion.div
            initial={{ y: 0, rotateX: 0, rotateY: 0 }}
            animate={{ 
              y: [0, -5, 0],
              rotateX: [0, 2, 0],
              rotateY: [0, -1, 1, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay * 0.5
            }}
            whileHover={{ 
              y: -15,
              rotateX: 5,
              scale: 1.02,
              filter: "blur(0px)"
            }}
            className="relative w-full h-full floating-card-blur hover:floating-card-sharp"
          >
            {/* 3D Floating Container */}
            <div className="relative w-full h-full p-8 rounded-2xl overflow-hidden floating-card-glass">
              {/* Subtle Corner Animation */}
              <motion.div
                animate={{
                  rotateZ: [0, 1, -1, 0],
                  scale: [1, 1.01, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: delay * 0.3
                }}
                className="absolute top-0 right-0 w-6 h-6 rounded-bl-lg bg-gradient-to-br from-blue-400/20 to-teal-400/20 shadow-lg"
              />
              
              {/* Floating Indicator Dots */}
              <div className="absolute top-4 right-4 flex gap-1">
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  className="w-1.5 h-1.5 rounded-full bg-blue-400/60"
                />
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  className="w-1.5 h-1.5 rounded-full bg-teal-400/60"
                />
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400/60"
                />
              </div>

              {/* Minimalist Content - Centered */}
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                {/* Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-teal-500 text-white shadow-lg shadow-blue-500/20"
                >
                  <Icon className="w-8 h-8 transition-transform duration-300" />
                </motion.div>

                {/* Title Only */}
                <h3 className="text-lg font-semibold text-gray-900 tracking-tight max-w-[200px]">
                  {title}
                </h3>

                {/* Hover Hint */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: delay * 0.7 }}
                  className="absolute bottom-6 text-xs text-blue-600 font-medium flex items-center gap-1"
                >
                  Hover to explore <ArrowRight className="w-3 h-3" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="relative w-full h-full p-8 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-teal-500 text-white overflow-hidden shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl transform translate-x-20 -translate-y-20" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-200 rounded-full blur-2xl transform -translate-x-16 translate-y-16" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
              </div>

              {/* Technical Details */}
              {technicalDetails && (
                <div className="mb-4">
                  <p className="text-blue-100 text-sm leading-relaxed">
                    {technicalDetails}
                  </p>
                </div>
              )}

              {/* Benefits List */}
              {benefits.length > 0 && (
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-blue-100 mb-3">Key Benefits:</h4>
                  <div className="space-y-2">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle className="w-4 h-4 text-teal-200 flex-shrink-0 mt-0.5" />
                        <span className="text-white text-sm">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom accent */}
              <div className="mt-auto pt-4">
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
