/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, DaySchedule, UserStats, EnergyLevel, ActivityItem } from '../types';
import { INITIAL_WEEKLY_SCHEDULE, getDayIdFromIndex } from '../data';
import { useNotification } from './NotificationToast';

interface SoffioStateContextType {
  profile: UserProfile;
  schedule: DaySchedule[];
  userStats: UserStats;
  todayEnergy: EnergyLevel;
  selectedDayId: string;
  setSelectedDayId: (dayId: string) => void;
  setTodayEnergy: (level: EnergyLevel) => void;
  toggleActivityComplete: (dayId: string, activityId: string) => void;
  toggleActivitySkip: (dayId: string, activityId: string) => void;
  updateProfileName: (name: string) => void;
  updateReminderSettings: (enabled: boolean, time: string, days: string[]) => void;
  updateTheme: (theme: 'dark' | 'sepia' | 'light') => void;
  getSuggestedActivitiesForToday: () => ActivityItem[];
  resetAllData: () => void;
}

const SoffioStateContext = createContext<SoffioStateContextType | undefined>(undefined);

export function useSoffioState() {
  const context = useContext(SoffioStateContext);
  if (!context) {
    throw new Error('useSoffioState must be used within a SoffioStateProvider');
  }
  return context;
}

interface ProviderProps {
  children: ReactNode;
}

export function SoffioStateProvider({ children }: ProviderProps) {
  const { triggerNotification } = useNotification();

  // 1. Initial State Definitions
  const defaultProfile: UserProfile = {
    name: 'Stefano',
    reminderSettings: {
      enabled: true,
      time: '14:30',
      days: ['lun', 'mar', 'mer', 'gio', 'ven']
    },
    theme: 'dark'
  };

  const defaultStats: UserStats = {
    streak: 0,
    lastActiveDate: '',
    totalCompleted: 0,
    totalSkipped: 0,
    weeklyEnergyLog: {},
    completedActivities: []
  };

  // 2. Load and initialize state from LocalStorage or Fallbacks
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('soffio_profile');
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  const [schedule, setSchedule] = useState<DaySchedule[]>(() => {
    const saved = localStorage.getItem('soffio_schedule');
    return saved ? JSON.parse(saved) : INITIAL_WEEKLY_SCHEDULE;
  });

  const [userStats, setUserStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('soffio_stats');
    return saved ? JSON.parse(saved) : defaultStats;
  });

  // Calculate current day code dynamically based on real calendar weekday
  const getTodayDayCode = (): string => {
    const dayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday...
    return getDayIdFromIndex(dayIndex);
  };

  const todayId = getTodayDayCode();
  const [selectedDayId, setSelectedDayId] = useState<string>(todayId);

  // Initialize today's energy level from saved state or fallback to 'normale'
  const [todayEnergy, setTodayEnergyState] = useState<EnergyLevel>(() => {
    const savedStats = localStorage.getItem('soffio_stats');
    if (savedStats) {
      const parsed: UserStats = JSON.parse(savedStats);
      return parsed.weeklyEnergyLog[todayId] || 'normale';
    }
    return 'normale';
  });

  // 3. Persist State Changes
  useEffect(() => {
    localStorage.setItem('soffio_profile', JSON.stringify(profile));
    // Apply styling hook based on custom theme
    const htmlElement = document.documentElement;
    htmlElement.classList.remove('theme-dark', 'theme-sepia', 'theme-light');
    htmlElement.classList.add(`theme-${profile.theme}`);
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('soffio_schedule', JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem('soffio_stats', JSON.stringify(userStats));
  }, [userStats]);

  // Set energy levels reactively
  const setTodayEnergy = (level: EnergyLevel) => {
    setTodayEnergyState(level);
    
    // Save to weekly log dynamically
    setUserStats(prev => {
      const updatedLog = { ...prev.weeklyEnergyLog, [todayId]: level };
      return {
        ...prev,
        weeklyEnergyLog: updatedLog
      };
    });

    // Provide calming tactile feedback and notifications suggestion
    let motivationalBody = '';
    if (level === 'scarico') {
      motivationalBody = 'Oggi rallentiamo. Abbiamo preparato movimenti ultra docili e stretching rigenerante per te. 🌱';
    } else if (level === 'normale') {
      motivationalBody = 'Energia stabile. Un percorso bilanciato per farti sentire leggero e attivo. ✨';
    } else {
      motivationalBody = 'Che bello sentirti carico! Proviamo ad aggiungere un po\' di brio con del corpo libero aerobico. 🔥';
    }

    triggerNotification(
      `Energia impostata: ${level.toUpperCase()}`,
      motivationalBody
    );
  };

  // 4. State mutators
  const toggleActivityComplete = (dayId: string, activityId: string) => {
    setSchedule(prevSchedule => {
      const updated = prevSchedule.map(day => {
        if (day.id === dayId) {
          // Identify energy track (scarico, normale, energico)
          const tracks = { ...day.energyRecommendation };
          for (const level in tracks) {
            const key = level as EnergyLevel;
            tracks[key] = tracks[key].map(act => {
              if (act.id === activityId) {
                const newCompleted = !act.completed;
                
                // Recalculate stats with beautiful trigger conditions
                if (newCompleted) {
                  // If completed, update tally, trigger push simulation
                  setTimeout(() => {
                    triggerNotification(
                      'Attività Completata! 🌿',
                      `Grande! Hai completato "${act.name}". Ogni piccolo passo conta.`
                    );
                  }, 200);
                  
                  // Handle stats updating
                  adjustStatsOnCompletion(true);
                } else {
                  adjustStatsOnCompletion(false);
                }

                return { ...act, completed: newCompleted, skipped: false };
              }
              return act;
            });
          }
          return { ...day, energyRecommendation: tracks };
        }
        return day;
      });
      return updated;
    });
  };

  const toggleActivitySkip = (dayId: string, activityId: string) => {
    setSchedule(prevSchedule => {
      const updated = prevSchedule.map(day => {
        if (day.id === dayId) {
          const tracks = { ...day.energyRecommendation };
          for (const level in tracks) {
            const key = level as EnergyLevel;
            tracks[key] = tracks[key].map(act => {
              if (act.id === activityId) {
                const newSkipped = !act.skipped;

                if (newSkipped) {
                  setTimeout(() => {
                    triggerNotification(
                      'Oggi riposo consapevole 🤍',
                      'Hai scelto di saltare questa attività. Riposare senza sensi di colpa fa bene.'
                    );
                  }, 200);
                  adjustStatsOnSkip(true);
                } else {
                  adjustStatsOnSkip(false);
                }

                return { ...act, skipped: newSkipped, completed: false };
              }
              return act;
            });
          }
          return { ...day, energyRecommendation: tracks };
        }
        return day;
      });
      return updated;
    });
  };

  const adjustStatsOnCompletion = (isAdding: boolean) => {
    setUserStats(prev => {
      const todayStr = new Date().toISOString().split('T')[0];
      const hadStreakYesterday = prev.lastActiveDate === new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const isAlreadyActiveToday = prev.lastActiveDate === todayStr;

      let newStreak = prev.streak;
      if (isAdding) {
        if (!isAlreadyActiveToday) {
          newStreak = hadStreakYesterday ? prev.streak + 1 : 1;
        }
      }

      return {
        ...prev,
        totalCompleted: prev.totalCompleted + (isAdding ? 1 : -1),
        lastActiveDate: isAdding ? todayStr : prev.lastActiveDate,
        streak: newStreak
      };
    });
  };

  const adjustStatsOnSkip = (isAdding: boolean) => {
    setUserStats(prev => {
      return {
        ...prev,
        totalSkipped: prev.totalSkipped + (isAdding ? 1 : -1)
      };
    });
  };

  const updateProfileName = (newName: string) => {
    setProfile(prev => ({ ...prev, name: newName }));
  };

  const updateReminderSettings = (enabled: boolean, time: string, days: string[]) => {
    setProfile(prev => ({
      ...prev,
      reminderSettings: { enabled, time, days }
    }));
  };

  const updateTheme = (theme: 'dark' | 'sepia' | 'light') => {
    setProfile(prev => ({ ...prev, theme }));
  };

  const getSuggestedActivitiesForToday = (): ActivityItem[] => {
    const todaySchedule = schedule.find(day => day.id === todayId);
    if (!todaySchedule) return [];
    
    // Choose track dynamically using user selected energy level
    return todaySchedule.energyRecommendation[todayEnergy];
  };

  const resetAllData = () => {
    localStorage.removeItem('soffio_profile');
    localStorage.removeItem('soffio_schedule');
    localStorage.removeItem('soffio_stats');
    setProfile(defaultProfile);
    setSchedule(INITIAL_WEEKLY_SCHEDULE);
    setUserStats(defaultStats);
    setTodayEnergyState('normale');
    setSelectedDayId(todayId);
    
    triggerNotification(
      'Reset Completato 🍃',
      'Le tue statistiche e routine impostate sono state ripristinate ai valori iniziali.'
    );
  };

  return (
    <SoffioStateContext.Provider
      value={{
        profile,
        schedule,
        userStats,
        todayEnergy,
        selectedDayId,
        setSelectedDayId,
        setTodayEnergy,
        toggleActivityComplete,
        toggleActivitySkip,
        updateProfileName,
        updateReminderSettings,
        updateTheme,
        getSuggestedActivitiesForToday,
        resetAllData
      }}
    >
      {children}
    </SoffioStateContext.Provider>
  );
}
