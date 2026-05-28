/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Sparkles, Smartphone, X } from 'lucide-react';

interface NotificationToastType {
  triggerNotification: (title: string, body: string) => void;
}

const NotificationContext = createContext<NotificationToastType | undefined>(undefined);

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}

interface ProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: ProviderProps) {
  const [activeNotification, setActiveNotification] = useState<{
    id: number;
    title: string;
    body: string;
  } | null>(null);

  const triggerNotification = (title: string, body: string) => {
    const id = Date.now();
    setActiveNotification({ id, title, body });

    // Haptic feedback simulation (slight device-like rattle click if API exists, else audio/visual toast)
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate([80, 50, 80]);
      } catch (e) {
        // Safe skip if blocked by iframe permissions
      }
    }

    // Auto close after 5 seconds
    setTimeout(() => {
      setActiveNotification(prev => (prev?.id === id ? null : prev));
    }, 5500);
  };

  return (
    <NotificationContext.Provider value={{ triggerNotification }}>
      {children}
      
      {/* Simulation push alert tray */}
      <AnimatePresence>
        {activeNotification && (
          <div className="absolute top-4 left-4 right-4 z-50 pointer-events-none flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: -80, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="pointer-events-auto w-full max-w-[360px] bg-slate-900/95 border border-slate-700/60 rounded-2xl shadow-2xl p-4 flex gap-3 text-slate-100 backdrop-blur-md"
            >
              {/* Simulated Mobile Mock App Logo Indicator */}
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-sky-600 flex items-center justify-center text-slate-950 shadow-md">
                <Bell className="w-5 h-5" />
              </div>

              {/* Push content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-[10px] font-semibold text-teal-400 tracking-widest uppercase flex items-center gap-1.5">
                    <Smartphone className="w-3 h-3" />
                    Soffio iOS/Capacitor
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">Adesso</span>
                </div>
                <h5 className="text-xs font-bold text-slate-100 truncate">{activeNotification.title}</h5>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{activeNotification.body}</p>
              </div>

              {/* Close notification trigger */}
              <button
                onClick={() => setActiveNotification(null)}
                aria-label="Chiudi notifica"
                className="flex-shrink-0 cursor-pointer text-slate-600 hover:text-slate-400 h-fit"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </NotificationContext.Provider>
  );
}
