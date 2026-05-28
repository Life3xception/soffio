/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { NotificationProvider, useNotification } from './components/NotificationToast';
import { SoffioStateProvider, useSoffioState } from './components/SoffioStateContext';
import Splash from './components/Splash';
import BottomNav, { TabId } from './components/BottomNav';
import HomeView from './components/HomeView';
import RoutineView from './components/RoutineView';
import ProgressView from './components/ProgressView';
import SettingsView from './components/SettingsView';
import { Wind, Smartphone, Shield, BookOpen, Clock, Battery, Info } from 'lucide-react';

function MainApp() {
  const [splashDismissed, setSplashDismissed] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [systemTime, setSystemTime] = useState('');
  
  const { profile } = useSoffioState();

  // Dynamic status bar clock in the cellular phone mockup
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSystemTime(now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  // Theme style mapping to apply calming ambient backgrounds to the smartphone screen
  const getThemeClass = () => {
    switch (profile.theme) {
      case 'sepia':
        return {
          bgOuter: 'bg-[#d8d3c5]', // Warm linen
          bgFrame: 'bg-[#181512]', // Espresso bezel
          bgScreen: 'bg-[#FAF4EB]', // Cozy cream
          textPrimary: 'text-stone-800',
          textSecondary: 'text-stone-500',
          borderAccent: 'border-stone-200',
          cardBg: 'bg-stone-100/60 border-stone-200/80'
        };
      case 'light':
        return {
          bgOuter: 'bg-[#eaeef3]', // Light cloud
          bgFrame: 'bg-[#1e293b]', // Slate navy bezel
          bgScreen: 'bg-slate-50', // Crisp off-white
          textPrimary: 'text-slate-800',
          textSecondary: 'text-slate-500',
          borderAccent: 'border-slate-200',
          cardBg: 'bg-white border-slate-200/70 shadow-sm'
        };
      default: // 'dark'
        return {
          bgOuter: 'bg-[#060708]', // Deep matte onyx
          bgFrame: 'bg-[#15171a]', // Metal lead bezel
          bgScreen: 'bg-[#090a0c]', // Matte cosmic black
          textPrimary: 'text-slate-100',
          textSecondary: 'text-slate-500',
          borderAccent: 'border-slate-800/80',
          cardBg: 'bg-slate-900/40 border-slate-800/80'
        };
    }
  };

  const currentTheme = getThemeClass();

  // Render view depending on navigation bar selection
  const renderCurrentView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView onNavigateToRoutine={() => setActiveTab('routine')} />;
      case 'routine':
        return <RoutineView />;
      case 'stats':
        return <ProgressView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <HomeView onNavigateToRoutine={() => setActiveTab('routine')} />;
    }
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-0 md:p-8 transition-colors duration-500 ${currentTheme.bgOuter}`}>
      
      {/* 1. Splash Overlay on initial launch */}
      <AnimatePresence>
        {!splashDismissed && (
          <Splash onDismiss={() => setSplashDismissed(true)} />
        )}
      </AnimatePresence>

      {/* 2. Interactive Outer Companion Layout for program inspection on Desktop */}
      <div className="hidden lg:flex flex-col max-w-sm mr-12 text-slate-400 p-2 space-y-6 select-none leading-relaxed font-light">
        <div className="flex items-center gap-2">
          <Wind className="w-8 h-8 text-teal-400 animate-spin-slow" />
          <h1 className="text-3xl font-light text-slate-100 tracking-wider font-sans uppercase">Soffio</h1>
        </div>
        <p className="text-sm text-slate-400">
          Un ambiente virtuale progettato per chi lavora molto tempo seduto alla scrivania. Aiuta a promuovere sblocchi articolari, allungamenti costanti e riposo equilibrato.
        </p>
        
        <div className="p-4 bg-slate-900/30 rounded-2xl border border-slate-800/40 space-y-3">
          <h4 className="text-xs font-semibold text-slate-200 tracking-wider uppercase flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-teal-400" />
            Vantaggi del Progetto
          </h4>
          <ul className="text-xs space-y-2 list-none pl-1 text-slate-400">
            <li className="flex gap-2">🌱 <span className="font-semibold text-slate-300">Stress-Free</span>: Nessuna sanzione per i salti.</li>
            <li className="flex gap-2">📱 <span className="font-semibold text-slate-300">Capacitor-Ready</span>: Setup pronto per compilazione mobile.</li>
            <li className="flex gap-2">💾 <span className="font-semibold text-slate-300">Offline-First</span>: I dati si azzerano solo se lo desideri.</li>
          </ul>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-600" />
          <span>Filtra l'energia quotidiana per rigenerare il corpo.</span>
        </div>
      </div>

      {/* 3. Physical Smartphone Frame container (stretches to fill device screen naturally on mobile) */}
      <div className="relative w-full h-screen md:h-[844px] md:w-[390px] md:rounded-[3rem] md:shadow-2xl overflow-hidden md:border-8 border-slate-900/40 flex flex-col transition-all duration-500 select-none">
        
        {/* Dynamic Bezel container coloring */}
        <div className={`absolute inset-0 z-0 transition-colors duration-500 ${currentTheme.bgScreen}`} />

        {/* Real-time iOS/Android Simulated Status Row at the top */}
        <div className="relative z-30 h-10 px-6 pt-2 flex justify-between items-center text-xs font-mono select-none text-slate-400/80">
          <span className="font-semibold tracking-wider text-[11px] text-slate-500">{systemTime || '14:30'}</span>
          
          {/* Virtual camera dynamic notch */}
          <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-black rounded-full shadow-inner flex items-center justify-center p-0.5" />

          <div className="flex items-center gap-1.5 text-slate-500">
            <span className="text-[10px] uppercase tracking-tighter">LTE</span>
            <div className="w-5 h-2.5 border border-slate-600/60 rounded p-px flex items-center">
              <div className="h-full w-4 bg-teal-400 rounded-sm" />
            </div>
          </div>
        </div>

        {/* 4. Core display screen wrapper */}
        <div className={`relative z-10 flex-1 px-5 pt-3 pb-24 overflow-hidden transition-colors duration-500 ${currentTheme.textPrimary}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -5 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="h-full"
            >
              {renderCurrentView()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 5. Sticky touch optimized bottom bar navigation block */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

    </div>
  );
}

export default function App() {
  return (
    <NotificationProvider>
      <SoffioStateProvider>
        <MainApp />
      </SoffioStateProvider>
    </NotificationProvider>
  );
}
