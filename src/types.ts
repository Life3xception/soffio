/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type EnergyLevel = 'scarico' | 'normale' | 'energico';

export type ActivityCategory = 'movimento' | 'stretching' | 'mente' | 'sonno';

export interface ActivityItem {
  id: string;
  name: string;
  durationMin: number;
  completed: boolean;
  skipped: boolean;
  category: ActivityCategory;
  alternativeName?: string;
}

export interface DaySchedule {
  id: string; // e.g., 'lun', 'mar'
  dayName: string; // e.g., 'Lunedì'
  energyRecommendation: {
    scarico: ActivityItem[];
    normale: ActivityItem[];
    energico: ActivityItem[];
  };
}

export interface UserStats {
  streak: number;
  lastActiveDate: string | null; // Keep track of continuous streak
  totalCompleted: number;
  totalSkipped: number;
  weeklyEnergyLog: { [dayId: string]: EnergyLevel };
  completedActivities: string[]; // List of id-date completions
}

export interface ReminderSettings {
  enabled: boolean;
  time: string;
  days: string[];
}

export interface UserProfile {
  name: string;
  reminderSettings: ReminderSettings;
  theme: 'dark' | 'sepia' | 'light';
}
