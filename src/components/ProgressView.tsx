/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useSoffioState } from './SoffioStateContext';
import { TrendingUp, Award, Battery, ShieldAlert, Heart, Calendar, Bookmark, Landmark } from 'lucide-react';

export default function ProgressView() {
  const { userStats, schedule } = useSoffioState();

  // Mock calendar tracking completions for a visual representation
  const weeklyCompletionMock = [
    { day: 'Lun', completed: 3, skipped: 1, energy: 'normale' },
    { day: 'Mar', completed: 2, skipped: 0, energy: 'scarico' },
    { day: 'Mer', completed: 3, skipped: 1, energy: 'energico' },
    { day: 'Gio', completed: 1, skipped: 2, energy: 'normale' },
    { day: 'Ven', completed: 2, skipped: 0, energy: 'normale' },
    { day: 'Sab', completed: 1, skipped: 1, energy: 'scarico' },
    { day: 'Dom', completed: 0, skipped: 1, energy: 'scarico' }
  ];

  // Derived metrics
  const totalCompleted = userStats.totalCompleted;
  const totalSkipped = userStats.totalSkipped;
  const totalEntries = totalCompleted + totalSkipped;
  const compliancePct = totalEntries > 0 ? Math.round((totalCompleted / totalEntries) * 100) : 75;

  return (
    <div className="space-y-6 pb-20 overflow-y-auto max-h-[calc(100vh-140px)] no-scrollbar">

      {/* 1. Header and Overall Vibe */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block font-medium">Statistiche Consapevoli</span>
        <h2 className="text-2xl font-light text-slate-100 tracking-tight">Il tuo <span className="font-semibold text-white">Cammino</span></h2>
      </motion.div>

      {/* 2. Grid of metrics - lightweight and encouraging */}
      <div className="grid grid-cols-2 gap-3">
        {/* Streak card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 }}
          className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] uppercase font-semibold text-teal-400 tracking-wider">Continuità</span>
            <Award className="w-4 h-4 text-teal-400" />
          </div>
          <div>
            <div className="text-2xl font-mono font-bold text-slate-100">{userStats.streak}</div>
            <p className="text-[10px] text-slate-500 mt-1 uppercase font-medium">Giorni consecutivi</p>
          </div>
        </motion.div>

        {/* Total active metrics */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] uppercase font-semibold text-sky-400 tracking-wider">Completate</span>
            <TrendingUp className="w-4 h-4 text-sky-400" />
          </div>
          <div>
            <div className="text-2xl font-mono font-bold text-slate-100">{totalCompleted}</div>
            <p className="text-[10px] text-slate-500 mt-1 uppercase font-medium">Movimenti totali</p>
          </div>
        </motion.div>

        {/* Guilt-Free Rest tally (Skips) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] uppercase font-semibold text-amber-400 tracking-wider">Riposo Accolto</span>
            <Heart className="w-4 h-4 text-amber-400 fill-amber-400/15" />
          </div>
          <div>
            <div className="text-2xl font-mono font-bold text-slate-100">{totalSkipped}</div>
            <p className="text-[10px] text-slate-500 mt-1 uppercase font-medium">Salti senza sensi di colpa</p>
          </div>
        </motion.div>

        {/* Mean Weekly Energy Index */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] uppercase font-semibold text-emerald-400 tracking-wider">Stato Energetico</span>
            <Battery className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-lg font-semibold text-slate-100">Equilibrato</div>
            <p className="text-[10px] text-slate-500 mt-1 uppercase font-medium">Energia media settimana</p>
          </div>
        </motion.div>
      </div>

      {/* 3. Breathtaking Custom SVG Compliance chart */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="p-5 bg-slate-900/40 border border-slate-800/80 rounded-3xl"
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Tendenza Settimanale</h3>
            <span className="text-[10px] text-slate-500">Mette a confronto attività completate (verde) e riposo (grigio)</span>
          </div>
          <span className="text-xs font-mono font-bold text-teal-400 bg-teal-400/5 px-2 py-0.5 rounded-full border border-teal-500/10">
            {compliancePct}% Costanza
          </span>
        </div>

        {/* Interactive Bar Chart built purely in responsive styling/SVG */}
        <div className="flex justify-between items-end h-32 pt-2 px-1">
          {weeklyCompletionMock.map((day, idx) => {
            const maxCompletes = 4;
            // Height calculation
            const complHeight = (day.completed / maxCompletes) * 100;
            const skipHeight = (day.skipped / maxCompletes) * 100;

            return (
              <div key={idx} className="flex-1 flex flex-col items-center h-full group">
                {/* Visual Tooltip trigger indicator */}
                <div className="relative w-full flex flex-col justify-end items-center h-24 gap-[2px]">
                  
                  {/* Skip block (Dotted/Amber) */}
                  {day.skipped > 0 && (
                    <div
                      style={{ height: `${skipHeight}%` }}
                      className="w-4 rounded bg-slate-800 border-t border-slate-600 border-dashed"
                      title={`${day.skipped} Saltate`}
                    />
                  )}

                  {/* Completed block (Teal solid) */}
                  {day.completed > 0 ? (
                    <div
                      style={{ height: `${complHeight}%` }}
                      className="w-4 rounded bg-teal-400 shadow-sm shadow-teal-500/10"
                      title={`${day.completed} Completate`}
                    />
                  ) : (
                    day.skipped === 0 && <div className="h-[2px] w-2 bg-slate-800 rounded-full" />
                  )}
                </div>

                {/* X labels */}
                <span className="text-[10px] font-semibold uppercase font-mono text-slate-500 mt-3 block">
                  {day.day}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 4. Healing reminder block */}
      <div className="p-5 bg-slate-950 border border-slate-800/80 rounded-3xl space-y-3 font-light">
        <h4 className="text-xs uppercase tracking-widest text-[#94a3b8] font-mono font-semibold">Attività Recenti Completate</h4>
        
        {/* Simple Chronological Activity Log */}
        <div className="space-y-2 max-h-44 overflow-y-auto pr-1 no-scrollbar">
          <div className="flex items-start gap-3 p-3 bg-slate-900/30 rounded-2xl border border-slate-900">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5" />
            <div className="flex-1 min-w-0">
              <span className="text-[9px] font-mono text-slate-500">Ieri • 18:30</span>
              <p className="text-xs text-slate-300 font-medium">Allungamento spalle e rilascio tensioni lombari</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-900/30 rounded-2xl border border-slate-900">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5" />
            <div className="flex-1 min-w-0">
              <span className="text-[9px] font-mono text-slate-500">2 Giorni Fa • 14:15</span>
              <p className="text-xs text-slate-300 font-medium font-sans">Minuto di decompressione (Mano sulla pancia)</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-900/30 rounded-2xl border border-slate-900">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5" />
            <div className="flex-1 min-w-0">
              <span className="text-[9px] font-mono text-slate-500">2 Giorni Fa • 10:00</span>
              <p className="text-xs text-slate-400 italic">Oggi ho scelto di riposare (Stretching del piriforme)</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
