'use client';

import Link from 'next/link';
import { 
  ArrowLeft, Network, Printer, Download, Apple, HardDrive, Settings, Shield, 
  Users, Building, AlertTriangle, Server, Monitor, CheckCircle, Zap, 
  FileText, FolderTree, History, Lock, RefreshCw, Play, Scale, Calculator, Heart, Clock, Database
} from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = {
  Network,
  Printer, 
  Download,
  Apple,
  HardDrive,
  Settings,
  Shield,
  Users,
  Building,
  AlertTriangle,
  Server,
  Monitor,
  CheckCircle,
  Zap,
  FileText,
  FolderTree,
  History,
  Lock,
  RefreshCw,
  Play,
  Scale,
  Calculator,
  Heart,
  Clock,
  Database
} as const;

type IconName = keyof typeof iconMap;

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: IconName;
  backLink?: {
    href: string;
    label: string;
  };
  badges?: string[];
  className?: string;
  children?: React.ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  icon,
  backLink,
  badges = [],
  className = '',
  children
}: PageHeaderProps) {
  const IconComponent = icon ? iconMap[icon] : null;
  
  return (
    <section className={`relative bg-linear-to-br from-[#153B6B] via-[#1e4a7f] to-[#00A8B5] text-white pt-28 pb-20 overflow-hidden ${className}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-[#00A8B5]/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
        <div 
          style={{ 
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.03\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" 
          }} 
          className="absolute inset-0 opacity-40" 
        />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [-15, 15, -15], rotate: [0, 90, 180] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-20 w-5 h-5 border-2 border-white/25 rotate-45"
        />
        <motion.div
          animate={{ y: [25, -25, 25], x: [-10, 10, -10] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 right-32 w-3 h-3 bg-white/15 rounded-full"
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          {/* Back Button */}
          {backLink && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8 flex justify-center"
            >
              <Link 
                href={backLink.href} 
                className="inline-flex items-center gap-3 text-white/90 hover:text-white transition-all duration-300 group bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 hover:bg-white/20 border border-white/20 shadow-lg"
              >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                <span className="font-semibold text-sm">{backLink.label}</span>
              </Link>
            </motion.div>
          )}
          
          {/* Icon */}
          {IconComponent && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-8 shadow-2xl"
            >
              <IconComponent className="w-10 h-10 text-white" />
            </motion.div>
          )}
          
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          
          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl lg:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-light"
            >
              {subtitle}
            </motion.p>
          )}
          
          {/* Badges */}
          {badges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              {badges.map((badge, index) => (
                <div 
                  key={badge}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white"
                >
                  <div 
                    className="w-2 h-2 bg-green-500 rounded-full animate-pulse" 
                    style={{ animationDelay: `${index * 0.5}s` }}
                  />
                  {badge}
                </div>
              ))}
            </motion.div>
          )}
          
          {/* Additional Content */}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10"
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}