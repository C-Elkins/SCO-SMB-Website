"use client";
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import React from 'react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  variant?: 'default' | 'highlighted';
}

export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0,
  variant = 'default'
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8 }}
      className={`
        group relative p-8 rounded-2xl border transition-all duration-300 h-full
        ${variant === 'highlighted' 
          ? 'bg-gradient-to-br from-white to-blue-50/50 border-blue-200 shadow-lg shadow-blue-100/50' 
          : 'bg-white border-gray-200 hover:border-gray-300'
        }
        hover:shadow-2xl hover:shadow-gray-100/60
      `}
    >
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/0 via-teal-500/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:via-teal-500/10 group-hover:to-blue-600/10 transition-all duration-500 -z-10" />
      
      {/* Icon Container */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`
          w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300
          ${variant === 'highlighted'
            ? 'bg-gradient-to-br from-blue-500 to-teal-500 text-white shadow-lg shadow-blue-500/25'
            : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 group-hover:from-blue-100 group-hover:to-teal-100 group-hover:text-blue-600'
          }
        `}
      >
        <Icon className="w-8 h-8" />
      </motion.div>

      {/* Content */}
      <div className="space-y-4">
        <h3 className={`
          text-xl font-semibold tracking-tight transition-colors duration-300
          ${variant === 'highlighted' 
            ? 'text-gray-900' 
            : 'text-gray-900 group-hover:text-gray-900'
          }
        `}>
          {title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Hover Indicator */}
      <motion.div
        initial={{ width: 0 }}
        whileHover={{ width: "2rem" }}
        transition={{ duration: 0.3 }}
        className={`
          absolute bottom-8 left-8 h-0.5 rounded-full transition-colors duration-300
          ${variant === 'highlighted' 
            ? 'bg-gradient-to-r from-blue-500 to-teal-500' 
            : 'bg-gradient-to-r from-gray-400 to-gray-600 group-hover:from-blue-500 group-hover:to-teal-500'
          }
        `}
      />
    </motion.div>
  );
}
