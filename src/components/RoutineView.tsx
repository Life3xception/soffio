/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSoffioState } from './SoffioStateContext';
import { Calendar, CheckCircle2, Circle, AlertCircle, Plus, Trash2, Heart, RefreshCcw, ThumbsUp } from 'lucide-react';
import { EnergyLevel, ActivityCategory, ActivityItem } from '../types';

export default function RoutineView() {
  const {
    schedule,
    selectedDayId,
    setSelectedDayId,
    userStats,
    setTodayEnergy,
    toggleActivityComplete,
    toggleActivitySkip,
    getSuggestedActivitiesForToday
  } = useSoffioState();

  // Local helper for adding custom activities to a day
  const [showAddModal, setShowAddModal] = useState(false);
  const [newActName, setNewActName] = useState('');
  const [newActDuration, setNewActDuration] = useState(10);
  const [newActCat, setNewActCat] = useState<ActivityCategory>('stretching');

  // Alternative option swap maps (key: activityId, value: boolean)
  const [swappedAlternatives, setSwappedAlternatives] = useState<{ [id: string]: boolean }>({});

  const daysOfWeek = [
    { id: 'lun', label: 'Lun', fullname: 'Lunedì' },
    { id: 'mar', label: 'Mar', fullname: 'Martedì' },
    { id: 'mer', label: 'Mer', fullname: 'Mercoledì' },
    { id: 'gio', label: 'Gio', fullname: 'Giovedì' },
    { id: 'ven', label: 'Ven', fullname: 'Venerdì' },
    { id: 'sab', label: 'Sab', fullname: 'Sabato' },
    { id: 'dom', label: 'Dom', fullname: 'Domenica' }
  ];

  const currentDayData = schedule.find(d => d.id === selectedDayId);
  const currentDayEnergy: EnergyLevel = userStats.weeklyEnergyLog[selectedDayId] || 'normale';

  // Extract selected day standard routine
  const currentDayActivities = currentDayData
    ? currentDayData.energyRecommendation[currentDayEnergy]
    : [];

  const handleDaySelect = (dayId: string) => {
    setSelectedDayId(dayId);
  };

  const handleLocalEnergyChange = (level: EnergyLevel) => {
    // If we're updating the actual today's energy:
    const todayIndex = new Date().getDay();
    const daysCode = ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'];
    const todayId = daysCode[todayIndex];

    if (selectedDayId === todayId) {
      setTodayEnergy(level);
    } else {
      // Modifying energy for a separate day of the week
      userStats.weeklyEnergyLog[selectedDayId] = level;
      // Trigger a state bump
      setSelectedDayId(String(selectedDayId));
    }
  };

  const toggleAlternative = (id: string) => {
    setSwappedAlternatives(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Get active completions for drawing progress dots on the day calendar selector
  const getDayCompletionRate = (dayId: string): 'none' | 'partial' | 'full' => {
    const dayData = schedule.find(d => d.id === dayId);
    if (!dayData) return 'none';
    const energy = userStats.weeklyEnergyLog[dayId] || 'normale';
    const acts = dayData.energyRecommendation[energy];
    if (acts.length === 0) return 'none';

    const compls = acts.filter(a => a.completed || a.skipped).length;
    if (compls === 0) return 'none';
    if (compls === acts.length) return 'full';
    return 'partial';
  };

  return (
    <div className="space-y-6 pb-20 overflow-y-auto max-h-[calc(100vh-140px)] no-scrollbar">
      
      {/* 1. Week Scrollbar Slider (optimised for one-hand swipe) */}
      <div className="space-y-2">
        <h3 className="text-xs uppercase tracking-wider text-slate-500 font-mono font-medium">Routine Settimanale</h3>
        <div className="flex justify-between gap-1 overflow-x-auto pb-2 -mx-2 px-2 no-scrollbar">
          {daysOfWeek.map(day => {
            const isSelected = selectedDayId === day.id;
            const compRate = getDayCompletionRate(day.id);
            
            return (
              <button
                key={day.id}
                onClick={() => handleDaySelect(day.id)}
                className={`flex-1 min-w-[48px] p-2.5 rounded-2xl flex flex-col items-center justify-between border transition-all duration-300 transform active:scale-95 cursor-pointer ${
                  isSelected
                    ? 'bg-teal-500/10 border-teal-500/50 text-teal-300'
                    : 'bg-slate-900/30 border-slate-800/80 text-slate-400 hover:text-slate-300'
                }`}
              >
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold">{day.fullname.slice(0, 3)}</span>
                
                {/* Visual state indicators on each day button */}
                <div className="my-2 flex justify-center">
                  {compRate === 'full' ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  ) : compRate === 'partial' ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                  )}
                </div>

                <span className={`text-[11px] font-semibold ${isSelected ? 'text-teal-300 font-bold' : 'text-slate-400'}`}>
                  {day.id.toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Day details & Local difficulty calibrator */}
      <div className="p-5 bg-slate-900/35 border border-slate-800/80 rounded-3xl space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-slate-800/40">
          <div>
            <h3 className="text-lg font-light text-slate-100 flex items-center gap-1.5">
              Programma di <span className="font-semibold text-white">{currentDayData?.dayName}</span>
            </h3>
            <span className="text-[10px] text-slate-500 font-mono font-medium">Stato energetico programmato:</span>
          </div>

          <div className="flex gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
            {(['scarico', 'normale', 'energico'] as EnergyLevel[]).map(lvl => (
              <button
                key={lvl}
                onClick={() => handleLocalEnergyChange(lvl)}
                className={`px-2.5 py-1 rounded-lg text-[9px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  currentDayEnergy === lvl
                    ? lvl === 'scarico'
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/20'
                      : lvl === 'normale'
                      ? 'bg-teal-500/15 text-teal-300 border border-teal-500/20'
                      : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {lvl === 'scarico' ? 'Scarico' : lvl === 'normale' ? 'Norm' : 'Energ'}
              </button>
            ))}
          </div>
        </div>

        {/* 3. List of suggested and customized activities */}
        <div className="space-y-3">
          {currentDayActivities.length === 0 ? (
            <div className="text-center p-8 text-slate-500 text-xs italic">
              Nessuna sedia da sbloccare oggi! Completo relax selvaggio.
            </div>
          ) : (
            currentDayActivities.map((act, idx) => {
              const hasAlternative = !!act.alternativeName;
              const isSwapped = swappedAlternatives[act.id] || false;
              const displayTitle = isSwapped && act.alternativeName ? act.alternativeName : act.name;

              return (
                <motion.div
                  key={act.id + idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`p-4 rounded-2xl border transition-all duration-300 ${
                    act.completed
                      ? 'bg-slate-950/30 border-slate-900 border-solid text-slate-500'
                      : act.skipped
                      ? 'bg-slate-950/20 border-slate-900/50 border-dashed text-slate-500/80'
                      : 'bg-slate-900/50 border-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      {/* Interactive round icon checkbox */}
                      <button
                        onClick={() => toggleActivityComplete(selectedDayId, act.id)}
                        className="mt-1 flex-shrink-0 cursor-pointer text-slate-600 hover:text-teal-400 transition-colors"
                        aria-label="Clicca per completare"
                      >
                        {act.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-teal-400 stroke-[2.25]" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-700 hover:border-slate-500 transition-colors" />
                        )}
                      </button>

                      <div className="min-w-0">
                        <h4 className={`text-sm font-medium leading-relaxed ${act.completed ? 'line-through text-slate-600' : ''}`}>
                          {displayTitle}
                        </h4>
                        
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono uppercase font-semibold ${
                            act.category === 'stretching' ? 'bg-amber-500/10 text-amber-400' :
                            act.category === 'movimento' ? 'bg-teal-500/10 text-teal-400' :
                            'bg-sky-500/10 text-sky-400'
                          }`}>
                            {act.category}
                          </span>
                          <span className="text-[9px] font-mono text-slate-500">— {act.durationMin} MINUTI</span>
                        </div>
                      </div>
                    </div>

                    {/* Left/Right Action pill group */}
                    <div className="flex flex-col items-end gap-1.5">
                      {!act.completed && !act.skipped && (
                        <div className="flex items-center gap-1">
                          {hasAlternative && (
                            <button
                              onClick={() => toggleAlternative(act.id)}
                              className="p-1 px-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-[10px] font-mono transition-all flex items-center gap-1 cursor-pointer"
                              title="Mostra movimento alternativo"
                            >
                              <RefreshCcw className="w-2.5 h-2.5 text-teal-400" />
                              Alternativa
                            </button>
                          )}
                          <button
                            onClick={() => toggleActivitySkip(selectedDayId, act.id)}
                            className="p-1 px-2 rounded-lg bg-slate-950/80 hover:bg-slate-800 text-slate-400 text-[10px] transition-all cursor-pointer"
                          >
                            Salta
                          </button>
                        </div>
                      )}

                      {act.skipped && (
                        <button
                          onClick={() => toggleActivitySkip(selectedDayId, act.id)}
                          className="text-[10px] font-light text-slate-500 hover:text-slate-300 flex items-center gap-1 cursor-pointer"
                        >
                          Annulla salto
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Guilt-Free reassurance if skipped */}
                  <AnimatePresence>
                    {act.skipped && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-2.5 border-t border-slate-950/40 text-[11px] text-slate-400 italic font-light flex items-center gap-2"
                      >
                        <Heart className="w-3.5 h-3.5 text-teal-400/80 fill-teal-500/10" />
                        Oggi va bene così. Scegliere di riposare è continuità senza senso di colpa.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      {/* 4. Sustainable Commitment Banner */}
      <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-3xl flex gap-3.5 items-center">
        <div className="w-10 h-10 rounded-full bg-teal-500/5 border border-teal-500/15 flex items-center justify-center text-teal-400 flex-shrink-0 animate-pulse">
          <ThumbsUp className="w-4.5 h-4.5" />
        </div>
        <div className="space-y-0.5">
          <h5 className="text-xs font-semibold text-slate-200">Prendila con calma</h5>
          <p className="text-[11px] text-slate-500 leading-relaxed font-light">
            Hai completato il 60% della tua routine questa settimana. Un ritmo sostenibile che garantisce longevità.
          </p>
        </div>
      </div>

    </div>
  );
}
