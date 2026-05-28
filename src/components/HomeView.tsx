/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSoffioState } from './SoffioStateContext';
import BreathingWidget from './BreathingWidget';
import { MOTIVATIONAL_MESSAGES } from '../data';
import { Sparkles, Check, CheckCircle2, ChevronRight, HelpCircle, RefreshCcw, Coffee, Moon, Sun, Sunrise } from 'lucide-react';
import { ActivityItem, EnergyLevel } from '../types';

interface HomeViewProps {
  onNavigateToRoutine: () => void;
}

export default function HomeView({ onNavigateToRoutine }: HomeViewProps) {
  const {
    profile,
    todayEnergy,
    setTodayEnergy,
    getSuggestedActivitiesForToday,
    toggleActivityComplete,
    toggleActivitySkip,
    userStats
  } = useSoffioState();

  const [greeting, setGreeting] = useState('Benvenuto');
  const [greetingIcon, setGreetingIcon] = useState<React.ReactNode>(<Sun className="w-5 h-5 text-teal-400" />);
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Dynamic Greeting based on real-time hour of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Buongiorno');
      setGreetingIcon(<Sunrise className="w-5 h-5 text-teal-400 stroke-[1.5]" />);
    } else if (hour >= 12 && hour < 17) {
      setGreeting('Buon pomeriggio');
      setGreetingIcon(<Sun className="w-5 h-5 text-amber-400 stroke-[1.5]" />);
    } else if (hour >= 17 && hour < 22) {
      setGreeting('Buonasera');
      setGreetingIcon(<Coffee className="w-5 h-5 text-teal-300 stroke-[1.5]" />);
    } else {
      setGreeting('Dolce notte');
      setGreetingIcon(<Moon className="w-5 h-5 text-sky-400 stroke-[1.5]" />);
    }

    // Set a random motivational quote index
    setQuoteIndex(Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length));
  }, []);

  const changeQuote = () => {
    let nextIndex = Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length);
    if (nextIndex === quoteIndex) {
      nextIndex = (quoteIndex + 1) % MOTIVATIONAL_MESSAGES.length;
    }
    setQuoteIndex(nextIndex);
  };

  const getWeekDayString = () => {
    const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
    const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    const now = new Date();
    return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`;
  };

  const todaysActivities = getSuggestedActivitiesForToday();
  const completedTodayCount = todaysActivities.filter(a => a.completed).length;

  return (
    <div className="space-y-6 pb-20 overflow-y-auto max-h-[calc(100vh-140px)] no-scrollbar">
      
      {/* 1. Welcoming Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between"
      >
        <div className="space-y-1">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block font-medium">
            {getWeekDayString()}
          </span>
          <h2 className="text-2xl font-light text-slate-100 tracking-tight flex items-center gap-2 flex-wrap">
            {greeting}, <span className="font-semibold text-white">{profile.name}</span>
            {greetingIcon}
          </h2>
        </div>
        
        {/* Simple Active Streak Widget */}
        <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800/80 px-4 py-2 rounded-2xl shadow-sm self-start sm:self-auto">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-60"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Streak: <strong className="text-teal-400 font-semibold">{userStats.streak} g.</strong>
          </span>
        </div>
      </motion.div>

      {/* 2. Tactical Energy Selector */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-5 bg-slate-900/40 border border-slate-800/80 rounded-3xl backdrop-blur-sm"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Come ti senti fisicamente ora?</h3>
          <span className="text-[10px] font-mono bg-teal-500/10 text-teal-400 border border-teal-500/15 py-0.5 px-2 rounded-full font-medium">
            {todayEnergy === 'scarico' ? 'Mindful / Dolce' : todayEnergy === 'normale' ? 'Equilibrato' : 'Attivo'}
          </span>
        </div>

        {/* 3 tactile pill columns */}
        <div className="grid grid-cols-3 gap-2.5">
          {(['scarico', 'normale', 'energico'] as EnergyLevel[]).map(level => {
            const isSelected = todayEnergy === level;
            return (
              <button
                key={level}
                onClick={() => setTodayEnergy(level)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300 transform active:scale-95 cursor-pointer ${
                  isSelected
                    ? level === 'scarico'
                      ? 'bg-amber-500/10 border-amber-500/50 text-amber-300 shadow-md shadow-amber-500/5'
                      : level === 'normale'
                      ? 'bg-teal-500/10 border-teal-500/50 text-teal-300 shadow-md shadow-teal-500/5'
                      : 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-500/5'
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-500 hover:text-slate-300 hover:border-slate-800'
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-wide">
                  {level === 'scarico' ? 'Scarico' : level === 'normale' ? 'Normale' : 'Energico'}
                </span>
                <span className="text-[9px] text-slate-500 mt-1 font-sans">
                  {level === 'scarico' ? 'Ripristina' : level === 'normale' ? 'Armonia' : 'Forza leggera'}
                </span>
                
                {/* Micro selection dot */}
                {isSelected && (
                  <motion.div
                    layoutId="energySelectedDot"
                    className={`w-1.5 h-1.5 rounded-full mt-2 ${
                      level === 'scarico' ? 'bg-amber-400' : level === 'normale' ? 'bg-teal-400' : 'bg-emerald-400'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* 3. Activity Suggestions Engine (Dynamic Cards based on current Energy) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-3"
      >
        <div className="flex justify-between items-baseline">
          <div className="flex items-center gap-2">
            <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Attività Suggerite per Oggi</h3>
            <span className="text-[10px] font-mono text-slate-500 font-medium">({completedTodayCount}/{todaysActivities.length})</span>
          </div>
          <button
            onClick={onNavigateToRoutine}
            className="text-xs text-teal-400/80 hover:text-teal-400 font-medium flex items-center gap-0.5 transition-all cursor-pointer"
          >
            Vedi tutto
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {todaysActivities.length === 0 ? (
          <div className="text-center p-6 bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl text-slate-500 text-xs">
            Nessuna attività programmata per oggi. Goditi il riposo!
          </div>
        ) : (
          <div className="space-y-2.5">
            {todaysActivities.map((act, index) => (
              <motion.div
                key={act.id + index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                  act.completed
                    ? 'bg-slate-950/30 border-slate-900 text-slate-500'
                    : act.skipped
                    ? 'bg-slate-950/20 border-slate-900 border-dashed text-slate-500/80'
                    : 'bg-slate-900/50 border-slate-800/80 text-slate-200'
                }`}
              >
                <div className="flex-1 min-w-0 pr-3 flex items-start gap-3">
                  {/* Category bullet */}
                  <div className={`mt-1.5 flex-shrink-0 w-2 h-2 rounded-full ${
                    act.category === 'stretching' ? 'bg-amber-400' :
                    act.category === 'movimento' ? 'bg-teal-400' :
                    act.category === 'mente' ? 'bg-sky-400' : 'bg-purple-400'
                  }`} />

                  <div className="min-w-0">
                    <h4 className={`text-sm leading-snug font-medium ${act.completed ? 'line-through text-slate-600' : ''}`}>
                      {act.completed ? act.name : act.skipped ? act.alternativeName || 'Riposo rigenerante concordato' : act.name}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                      {act.category.toUpperCase()} • {act.durationMin} MIN
                    </span>
                  </div>
                </div>

                {/* Left/Right actions aligned for single-hand use */}
                <div className="flex gap-2 flex-shrink-0">
                  {!act.completed && !act.skipped ? (
                    <>
                      <button
                        onClick={() => toggleActivitySkip('lun', act.id)} // mock to lun and resolve in state or pass correct day index
                        className="px-2.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-300 text-[10px] font-medium transition-all active:scale-95 cursor-pointer"
                      >
                        Salta
                      </button>
                      <button
                        onClick={() => toggleActivityComplete('lun', act.id)}
                        className="p-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 hover:border-teal-500/50 text-teal-400 hover:text-teal-300 transition-all active:scale-95 cursor-pointer"
                        aria-label="Segna completo"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                    </>
                  ) : act.completed ? (
                    <button
                      onClick={() => toggleActivityComplete('lun', act.id)}
                      className="text-xs text-teal-500/60 hover:text-slate-400 hover:line-through transition-all cursor-pointer font-medium flex items-center gap-1.5 px-2 py-1"
                    >
                      <CheckCircle2 className="w-4 h-4 text-teal-500" />
                      Fatto
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleActivitySkip('lun', act.id)}
                      className="text-xs italic text-slate-500/80 hover:text-slate-400 transition-all cursor-pointer font-light px-2 py-1"
                    >
                      Saltato con cura
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* 4. Guided Breathing Interactive Widget */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <BreathingWidget />
      </motion.div>

      {/* 5. Realistic Low-Pressure Motivation Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="p-5 bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800/80 rounded-3xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-3 text-slate-800">
          <Sparkles className="w-16 h-16 opacity-10 stroke-[1]" />
        </div>

        <div className="relative">
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono font-medium">Incoraggiamento del Giorno</span>
            <button
              onClick={changeQuote}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              aria-label="Nuovo aforisma"
            >
              <RefreshCcw className="w-3 h-3" />
            </button>
          </div>
          <p className="text-sm italic text-slate-300 leading-relaxed font-light">
            “{MOTIVATIONAL_MESSAGES[quoteIndex]}”
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-teal-500" />
            <span className="text-[10px] text-slate-500">Filosofia Soffio: continuità, non perfezione</span>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
