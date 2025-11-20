"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface EnhancedFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  gradient?: string;
}

export function EnhancedFeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0,
  gradient = "from-primary-navy to-accent-teal"
}: EnhancedFeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Optimized mouse tracking with throttling
  useEffect(() => {
    let rafId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      rafId = requestAnimationFrame(() => {
        const rect = cardRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setMousePosition({ x: 0, y: 0 });
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove, { passive: true });
      card.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-8 h-full transition-all duration-500 hover:shadow-xl hover:border-gray-300 shadow-sm">
        {/* Animated background glow */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 168, 181, 0.05) 0%, rgba(21, 59, 107, 0.03) 50%, transparent 100%)`
          }}
        />
        
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
          <div 
            className={`absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br ${gradient} opacity-20 rounded-full transition-transform duration-700 group-hover:scale-150 group-hover:opacity-30`}
          />
        </div>

        {/* Icon with enhanced animation */}
        <motion.div
          animate={{ 
            rotate: isHovered ? 360 : 0,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className={`relative z-10 w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} p-3 mb-6 shadow-lg`}
        >
          <Icon className="w-full h-full text-white" />
          
          {/* Icon glow effect */}
          <div 
            className={`absolute inset-0 rounded-xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-lg`}
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#153B6B] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
            {description}
          </p>
        </div>

        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-transparent via-[#00A8B5]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
             style={{ 
               backgroundSize: '200% 100%',
               animation: isHovered ? 'border-flow 2s linear infinite' : 'none'
             }} 
        />
        
        {/* Bottom accent line */}
        <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
      </div>

      {/* CSS for border animation */}
      <style jsx>{`
        @keyframes border-flow {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </motion.div>
  );
}

// Optimized grid container
export function FeatureGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
      {children}
    </div>
  );
}

export default EnhancedFeatureCard;