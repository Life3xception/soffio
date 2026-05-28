/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Wind, Heart, Sparkles } from 'lucide-react';

interface SplashProps {
  onDismiss: () => void;
}

export default function Splash({ onDismiss }: SplashProps) {
  const [breatheText, setBreatheText] = useState('Respira...');
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    // Elegant, slow rotation of micro prompts to induce calm on load
    const interval = setInterval(() => {
      setBreatheText(prev => {
        if (prev === 'Respira...') return 'Rallenta...';
        if (prev === 'Rallenta...') return 'Ascolta il corpo...';
        return 'Respira...';
      });
      setCycleCount(c => c + 1);
    }, 4000);

    // Auto-dismiss after 3 full cycles (12 seconds) or tap immediately
    const autoDismiss = setTimeout(() => {
      onDismiss();
    }, 11000);

    return () => {
      clearInterval(interval);
      clearTimeout(autoDismiss);
    };
  }, [onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-between p-8 bg-[#090a0c] text-slate-100 select-none"
    >
      <div className="w-full flex justify-end">
        <button
          onClick={onDismiss}
          className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wide bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all cursor-pointer"
        >
          Salta
        </button>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 max-w-sm text-center">
        {/* Breathing Orb Ornament */}
        <div className="relative mb-12 flex items-center justify-center">
          {/* Outermost breathing pulse glow */}
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-44 h-44 rounded-full bg-teal-500/20 blur-2xl"
          />

          {/* Medium pulse loop */}
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-32 h-32 rounded-full border border-teal-500/20 bg-teal-500/5 backdrop-blur-sm"
          />

          {/* Core branding element */}
          <motion.div
            animate={{ scale: [0.95, 1.08, 0.95] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-slate-900 to-slate-800 border border-slate-700/50 flex items-center justify-center shadow-xl shadow-black/80"
          >
            <Wind className="w-10 h-10 text-teal-400 stroke-[1.25]" />
          </motion.div>
        </div>

        {/* Branding & Subtitle */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl font-light tracking-widest text-[#e2e8f0]"
        >
          SOFFIO
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-3 text-xs tracking-widest text-teal-400/80 uppercase font-medium"
        >
          routine & benessere quotidiano
        </motion.p>

        {/* Sensory guidance text */}
        <div className="h-10 mt-12">
          <motion.div
            key={breatheText}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1 }}
            className="text-lg font-light text-slate-300 italic tracking-wide"
          >
            {breatheText}
          </motion.div>
        </div>
      </div>

      {/* Touch to open card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
        onClick={onDismiss}
        className="mb-8 cursor-pointer flex flex-col items-center gap-2 group"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-slate-500 group-hover:text-teal-400 transition-colors">
          Tocca per iniziare
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
      </motion.div>
    </motion.div>
  );
}
