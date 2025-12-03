'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Sparkles, Check, ArrowRight } from 'lucide-react';

interface AnimatedFeatureProps {
  title: string;
  description: string;
  steps: Array<{ label: string; duration: number }>;
  colors: { from: string; to: string };
}

export function AnimatedFeatureDemo({ title, description, steps, colors }: AnimatedFeatureProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const stepDuration = steps[currentStep].duration;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentStep < steps.length - 1) {
            setCurrentStep((s) => s + 1);
            return 0;
          } else {
            setIsPlaying(false);
            return 100;
          }
        }
        return prev + (100 / stepDuration) * 50; // Update every 50ms
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, currentStep, steps]);

  const handleReset = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div
        className="p-8 text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">{title}</h3>
          </div>
          <p className="text-white/90 text-sm">{description}</p>
        </div>
      </div>

      {/* Animation Canvas */}
      <div className="p-12 bg-gradient-to-br from-gray-50 to-white min-h-[300px] flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          {steps.map(
            (step, index) =>
              currentStep === index && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
                  className="text-center"
                >
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                    }}
                  >
                    <Check className="w-16 h-16 text-white" />
                  </motion.div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    {step.label}
                  </h4>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    In progress...
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>

        {/* Completion State */}
        {currentStep === steps.length - 1 && progress >= 100 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl"
              >
                <Check className="w-12 h-12 text-white" strokeWidth={3} />
              </motion.div>
              <h4 className="text-3xl font-bold text-gray-900 mb-2">
                Complete!
              </h4>
              <p className="text-gray-600">Workflow finished successfully</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Steps Timeline */}
      <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 relative">
              <div className="flex items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    index < currentStep
                      ? 'bg-green-500 text-white'
                      : index === currentStep
                      ? 'bg-gradient-to-br text-white ring-4 ring-blue-100'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                  style={
                    index === currentStep
                      ? { background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }
                      : undefined
                  }
                  animate={
                    index === currentStep
                      ? {
                          scale: [1, 1.1, 1],
                        }
                      : undefined
                  }
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                >
                  {index < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </motion.div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 bg-gray-200 mx-2 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r"
                      style={{
                        background:
                          index < currentStep
                            ? '#10b981'
                            : index === currentStep
                            ? `linear-gradient(90deg, ${colors.from}, ${colors.to})`
                            : '#e5e7eb',
                        width: index === currentStep ? `${progress}%` : index < currentStep ? '100%' : '0%',
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
              </div>
              <div className="mt-2 text-xs font-medium text-gray-600 text-center">
                {step.label}
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayPause}
            className="px-6 py-3 bg-gradient-to-r text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
            }}
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                {currentStep === steps.length - 1 && progress >= 100 ? 'Replay' : 'Play'}
              </>
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// Example usage component
export function ScanWorkflowDemo() {
  return (
    <AnimatedFeatureDemo
      title="Automated Scan Workflow"
      description="Watch how SCO SMB handles scanning from start to finish"
      steps={[
        { label: 'Scan Initiated', duration: 2000 },
        { label: 'File Received', duration: 1500 },
        { label: 'Auto-Organized', duration: 1500 },
        { label: 'Notification Sent', duration: 1000 },
      ]}
      colors={{ from: '#153B6B', to: '#00A8B5' }}
    />
  );
}

export function SecurityWorkflowDemo() {
  return (
    <AnimatedFeatureDemo
      title="Enterprise Security Process"
      description="See how your scans are protected with multiple security layers"
      steps={[
        { label: 'IP Validation', duration: 1500 },
        { label: 'File Scanning', duration: 2000 },
        { label: 'Encryption', duration: 1500 },
        { label: 'Audit Logged', duration: 1000 },
      ]}
      colors={{ from: '#7c3aed', to: '#ec4899' }}
    />
  );
}
