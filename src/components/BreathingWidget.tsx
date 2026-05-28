/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, X, RotateCcw } from 'lucide-react';

export default function BreathingWidget() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [completedCycles, setCompletedCycles] = useState(0);

  const phaseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isActive) {
      if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
      setPhase('idle');
      setSecondsLeft(4);
      return;
    }

    // Initialize first cycle
    triggerPhase('inhale');

    return () => {
      if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, [isActive]);

  const triggerPhase = (currentPhase: 'inhale' | 'hold' | 'exhale') => {
    setPhase(currentPhase);
    setSecondsLeft(4);

    // Countdown logic
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    countdownTimerRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) return 4;
        return prev - 1;
      });
    }, 1000);

    // Phase transition timeout (each phase is 4 seconds)
    if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
    phaseTimerRef.current = setTimeout(() => {
      if (currentPhase === 'inhale') {
        triggerPhase('hold');
      } else if (currentPhase === 'hold') {
        triggerPhase('exhale');
      } else {
        setCompletedCycles(prev => prev + 1);
        triggerPhase('inhale');
      }
    }, 4000);
  };

  const stopSession = () => {
    setIsActive(false);
    setCompletedCycles(0);
    setPhase('idle');
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Inspira profondamente...';
      case 'hold': return 'Trattieni e rilassati...';
      case 'exhale': return 'Espira dolcemente...';
      default: return 'Espira tutta la tensione accumulata';
    }
  };

  const getCircleScale = () => {
    switch (phase) {
      case 'inhale': return 1.5; // Expands
      case 'hold': return 1.5;   // Holds shape
      case 'exhale': return 0.95; // Compresses
      default: return 1.0;
    }
  };

  const getCircleColor = () => {
    switch (phase) {
      case 'inhale': return 'rgba(45, 212, 191, 0.45)'; // Teal glow
      case 'hold': return 'rgba(56, 189, 248, 0.45)';   // Sky blue
      case 'exhale': return 'rgba(20, 184, 166, 0.25)';  // Muted teal
      default: return 'rgba(148, 163, 184, 0.15)';
    }
  };

  return (
    <div className="w-full relative p-5 bg-slate-900/45 border border-slate-800/60 rounded-3xl overflow-hidden backdrop-blur-sm shadow-xl shadow-black/30">
      {/* Absolute aura backdrop */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />

      <div className="flex items-center justify-between mb-3 border-b border-slate-800/40 pb-2">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-[0.15em] text-teal-400 font-medium">Spazio Consapevole</span>
          <h4 className="text-md font-semibold text-slate-200 mt-0.5">Minuto di Decompressione</h4>
        </div>
        {isActive && (
          <button
            onClick={stopSession}
            aria-label="Chiudi sessione"
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex flex-col items-center py-5">
        {!isActive ? (
          <div className="text-center py-2 flex flex-col items-center">
            <p className="text-slate-300 text-sm max-w-[260px] leading-relaxed mb-5 font-light">
              Fai spazio nella tua giornata. Concediti 60 secondi di respirazione guidata ritmica per abbassare il cortisolo.
            </p>
            <button
              id="start-breathing-btn"
              onClick={() => setIsActive(true)}
              className="px-5 py-2.5 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg shadow-teal-500/10 hover:shadow-teal-500/25 transform active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Inizia Ora (4-4-4)
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            {/* Morphing Bubble sphere */}
            <div className="relative w-44 h-44 flex items-center justify-center mb-6">
              {/* Outer wave rings */}
              <AnimatePresence>
                {phase === 'inhale' && (
                  <motion.div
                    initial={{ opacity: 0.6, scale: 0.9 }}
                    animate={{ opacity: 0, scale: 2 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 4, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-teal-500/30"
                  />
                )}
              </AnimatePresence>

              {/* Pulsing breathing sphere */}
              <motion.div
                animate={{
                  scale: getCircleScale(),
                  backgroundColor: getCircleColor(),
                }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-lg transition-colors duration-1000"
              >
                <motion.span
                  key={secondsLeft}
                  initial={{ opacity: 0.3, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-3xl font-light text-white font-mono"
                >
                  {secondsLeft}
                </motion.span>
                <span className="text-[9px] uppercase tracking-widest text-white/50 -mt-1">secondi</span>
              </motion.div>
            </div>

            {/* Instruction text */}
            <h5 className="text-slate-200 text-md font-medium text-center h-6 tracking-wide mb-1 transition-all duration-1000">
              {getPhaseText()}
            </h5>

            <div className="flex gap-4 mt-6 items-center">
              <span className="text-[11px] text-slate-500 uppercase tracking-widest font-mono">
                Cicli completati: {completedCycles}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <button
                id="reset-breathing-btn"
                onClick={stopSession}
                className="text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1.5 bg-slate-800/50 hover:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-800 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Inizia da capo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
