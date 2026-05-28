/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useSoffioState } from './SoffioStateContext';
import { useNotification } from './NotificationToast';
import { User, Bell, LayoutIcon, RotateCcw, Smartphone, Shield, Check, Palette } from 'lucide-react';

export default function SettingsView() {
  const {
    profile,
    updateProfileName,
    updateReminderSettings,
    updateTheme,
    resetAllData
  } = useSoffioState();

  const { triggerNotification } = useNotification();

  const [localName, setLocalName] = useState(profile.name);
  const [remTime, setRemTime] = useState(profile.reminderSettings.time);
  const [remEnabled, setRemEnabled] = useState(profile.reminderSettings.enabled);
  
  const savedDays = profile.reminderSettings.days;
  const [selectedDays, setSelectedDays] = useState<string[]>(savedDays);

  const daysOfWeek = [
    { code: 'lun', label: 'L' },
    { code: 'mar', label: 'M' },
    { code: 'mer', label: 'M' },
    { code: 'gio', label: 'G' },
    { code: 'ven', label: 'V' },
    { code: 'sab', label: 'S' },
    { code: 'dom', label: 'D' }
  ];

  const handleApplyName = () => {
    if (localName.trim()) {
      updateProfileName(localName.trim());
      triggerNotification(
        'Profilo aggiornato ✨',
        `Ciao! Ti chiameremo "${localName.trim()}" nelle prossime schermate.`
      );
    }
  };

  const handleToggleDay = (code: string) => {
    let updated;
    if (selectedDays.includes(code)) {
      updated = selectedDays.filter(d => d !== code);
    } else {
      updated = [...selectedDays, code];
    }
    setSelectedDays(updated);
    updateReminderSettings(remEnabled, remTime, updated);
  };

  const handleRemSettingsSave = (enabled: boolean, time: string) => {
    setRemEnabled(enabled);
    setRemTime(time);
    updateReminderSettings(enabled, time, selectedDays);
  };

  const triggerTestNotification = () => {
    // Generate a beautiful mock native push notice telling they should prepare to move
    const prompts = [
      "Tempo di sgranchirsi! 🌱 Sollevati sulle punte dei piedi e fai girare le spalle per rilasciare lo stress.",
      "Pausa d'aria fresca? 👀 Stacca gli occhi dal monitor e guarda l'orizzonte per 20 secondi.",
      "Idratazione in corso: 💧 Alzati per bere un bicchiere d'acqua fresca e concediti 3 respiri profondi.",
      "Tensione alle spalle? 🌿 Concediti un allungamento lombare lento da seduto."
    ];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    
    triggerNotification(
      "Soffio: Nutri il tuo corpo",
      randomPrompt
    );
  };

  return (
    <div className="space-y-6 pb-20 overflow-y-auto max-h-[calc(100vh-140px)] no-scrollbar">
      
      {/* 1. Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block font-medium">Configurazione</span>
        <h2 className="text-2xl font-light text-slate-100 tracking-tight">Impostazioni <span className="font-semibold text-white">App</span></h2>
      </motion.div>

      {/* 2. Custom User Profile Identifier */}
      <div className="p-5 bg-slate-900/40 border border-slate-800/80 rounded-3xl space-y-3.5">
        <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-2">
          <User className="w-4 h-4 text-teal-400" />
          Nome Utente
        </h3>
        
        <div className="flex gap-2">
          <input
            id="profile-name-input"
            type="text"
            value={localName}
            onChange={e => setLocalName(e.target.value)}
            className="flex-1 bg-slate-950/80 border border-slate-800 text-slate-100 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500/50 transition-colors"
            placeholder="Scrivi il tuo nome..."
          />
          <button
            onClick={handleApplyName}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700/60 rounded-2xl text-xs text-slate-300 transition-all font-semibold active:scale-95 cursor-pointer"
          >
            Aggiorna
          </button>
        </div>
      </div>

      {/* 3. Simulated Capacitor Setup (Prompts future applets) */}
      <div className="p-5 bg-slate-900/40 border border-slate-800/80 rounded-3xl space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-2">
            <Bell className="w-4 h-4 text-teal-400" />
            Capacitor Reminder Notifiche
          </h3>
          <input
            id="reminder-toggle"
            type="checkbox"
            checked={remEnabled}
            onChange={e => handleRemSettingsSave(e.target.checked, remTime)}
            className="sr-only peer cursor-pointer"
          />
          {/* Custom Toggle Switch */}
          <div
            onClick={() => handleRemSettingsSave(!remEnabled, remTime)}
            className="w-10 h-6 bg-slate-950 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-500/20 relative cursor-pointer flex items-center transition-all px-0.5 border border-slate-800"
          >
            <div className={`w-4 h-4 rounded-full bg-slate-400 transition-all ${remEnabled ? 'translate-x-4 bg-teal-400' : ''}`} />
          </div>
        </div>

        {remEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4 pt-1"
          >
            {/* Hour Timepicker input */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-300 font-light">Orario del promemoria quotidiano:</span>
              <input
                id="reminder-time-input"
                type="time"
                value={remTime}
                onChange={e => handleRemSettingsSave(remEnabled, e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl px-3 py-1.5 focus:outline-none font-mono focus:border-teal-500/40"
              />
            </div>

            {/* Days active row checklist */}
            <div className="space-y-1.5">
              <span className="text-xs text-slate-300 font-light block">Seleziona i giorni attivi:</span>
              <div className="flex justify-between gap-1.5 pt-0.51">
                {daysOfWeek.map(day => {
                  const isActiveDay = selectedDays.includes(day.code);
                  return (
                    <button
                      key={day.code}
                      onClick={() => handleToggleDay(day.code)}
                      className={`flex-1 h-8 rounded-xl flex items-center justify-center text-xs font-semibold font-mono border transition-all cursor-pointer ${
                        isActiveDay
                          ? 'bg-teal-500/10 border-teal-500/50 text-teal-300 font-bold'
                          : 'bg-slate-950/60 border-slate-900 text-slate-500 hover:text-slate-400'
                      }`}
                    >
                      {day.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Capacitor test trigger button */}
        <button
          onClick={triggerTestNotification}
          className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-2xl text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-teal-500/5 transition-all active:scale-[0.98] cursor-pointer"
        >
          <Smartphone className="w-4 h-4" />
          Invia Notifica di Prova
        </button>
      </div>

      {/* 4. Elegant Palette Shifter */}
      <div className="p-5 bg-slate-900/40 border border-slate-800/80 rounded-3xl space-y-3.5">
        <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-2">
          <Palette className="w-4 h-4 text-teal-400" />
          Colori & Palette
        </h3>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => updateTheme('dark')}
            className={`p-2.5 rounded-2xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
              profile.theme === 'dark' ? 'border-teal-500/40 bg-teal-500/5' : 'border-slate-800/80 bg-slate-950/20'
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-[#0b0c0e] border border-slate-800" />
            <span className="text-[10px] text-slate-300 font-medium">Nebbia</span>
          </button>

          <button
            onClick={() => updateTheme('sepia')}
            className={`p-2.5 rounded-2xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
              profile.theme === 'sepia' ? 'border-teal-500/40 bg-teal-500/5' : 'border-slate-800/80 bg-slate-950/20'
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-[#fbf8f3] border border-stone-200" />
            <span className="text-[10px] text-slate-300 font-medium font-sans">Sabbia</span>
          </button>

          <button
            onClick={() => updateTheme('light')}
            className={`p-2.5 rounded-2xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
              profile.theme === 'light' ? 'border-teal-500/40 bg-teal-500/5' : 'border-slate-800/80 bg-slate-950/20'
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-white border border-slate-200" />
            <span className="text-[10px] text-slate-300 font-medium">Bianco</span>
          </button>
        </div>
      </div>

      {/* 5. Extreme Data Clean resets */}
      <div className="p-5 bg-slate-950 border border-slate-900 rounded-3xl text-center space-y-4">
        <div className="space-y-1">
          <h4 className="text-xs font-semibold text-slate-300">Resetta il tuo percorso</h4>
          <p className="text-[11px] text-slate-500 max-w-[280px] mx-auto leading-relaxed">
            Ripristina e pulisci tutte le impostazioni e le statistiche storiche archiviate localmente nel browser.
          </p>
        </div>

        <button
          onClick={resetAllData}
          className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 uppercase font-bold tracking-widest hover:bg-rose-500/10 border border-rose-500/20 px-4 py-2 rounded-xl transition-all active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Pulisci Tutto
        </button>
      </div>

    </div>
  );
}
