/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Home, Calendar, LineChart, Settings } from 'lucide-react';

export type TabId = 'home' | 'routine' | 'stats' | 'settings';

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const navItems = [
    { id: 'home' as TabId, label: 'Home', icon: Home },
    { id: 'routine' as TabId, label: 'Routine', icon: Calendar },
    { id: 'stats' as TabId, label: 'Analisi', icon: LineChart },
    { id: 'settings' as TabId, label: 'Impostazioni', icon: Settings }
  ];

  const handleTabClick = (tabId: TabId) => {
    onTabChange(tabId);
    
    // Slight simulated touch bump
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(12);
      } catch (e) {
        // Suppress blocked permission bugs
      }
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-slate-950/85 border-t border-slate-900/60 pb-3.5 flex items-center justify-around px-2 backdrop-blur-md rounded-b-[2.5rem] z-40 select-none">
      {navItems.map(item => {
        const isActive = activeTab === item.id;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            className="flex-1 flex flex-col items-center justify-center relative py-1 h-full cursor-pointer focus:outline-none focus:ring-none group"
          >
            {/* Sliding backdrop capsule indicating active state */}
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute w-12 h-8 rounded-2xl bg-teal-500/10 -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}

            {/* Icon Wrapper with micro jump on hover/active */}
            <motion.div
              animate={isActive ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
              className={`transition-colors duration-200 ${isActive ? 'text-teal-400' : 'text-slate-500 group-hover:text-slate-300'}`}
            >
              <Icon className="w-5 h-5 stroke-[1.75]" />
            </motion.div>

            {/* Micro Dot or Small Text below */}
            <span className={`text-[9px] mt-1 font-sans tracking-wide transition-colors ${isActive ? 'text-teal-400 font-semibold' : 'text-slate-600'}`}>
              {item.label}
            </span>
            
            {/* Direct selector dot indicator */}
            {isActive && (
              <motion.span
                layoutId="activeIndicatorDot"
                className="absolute bottom-1 w-1 h-1 rounded-full bg-teal-400"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
