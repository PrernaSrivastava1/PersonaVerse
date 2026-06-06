'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LEVELS, type Achievement, type LevelName, type PersonalityResult } from '@/types';

interface GameStore {
  xp: number;
  level: number;
  levelName: LevelName;
  achievements: Achievement[];
  streak: number;
  lastVisit: string | null;
  personalityResults: PersonalityResult[];
  shareCount: number;

  addXP: (amount: number) => { newXP: number; leveledUp: boolean; newLevel: number };
  checkDailyVisit: () => void;
  unlockAchievement: (id: string) => void;
  savePersonalityResult: (result: PersonalityResult) => void;
  incrementShareCount: () => void;
  getLevel: (xp: number) => { level: number; name: LevelName };
}

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_quiz', title: 'First Discovery', description: 'Complete your first quiz', icon: '🌟' },
  { id: 'streak_3', title: 'Cosmic Regular', description: '3-day visit streak', icon: '🔥' },
  { id: 'streak_7', title: 'Universe Devotee', description: '7-day visit streak', icon: '💫' },
  { id: 'level_3', title: 'Deep Thinker', description: 'Reach Level 3', icon: '🧠' },
  { id: 'level_5', title: 'Master Architect', description: 'Reach Level 5', icon: '🏛️' },
  { id: 'all_planets', title: 'Universal Explorer', description: 'Complete quiz on all 3 planets', icon: '🌍' },
  { id: 'villain_reveal', title: 'Dark Side Revealed', description: 'Discover your villain identity', icon: '🦹' },
  { id: 'share_master', title: 'Social Butterfly', description: 'Share 5 results', icon: '🦋' },
];

function computeLevel(xp: number): { level: number; name: LevelName } {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) {
      return { level: LEVELS[i].level, name: LEVELS[i].name };
    }
  }
  return { level: 1, name: 'Dreamer' };
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      xp: 0,
      level: 1,
      levelName: 'Dreamer' as LevelName,
      achievements: DEFAULT_ACHIEVEMENTS,
      streak: 0,
      lastVisit: null,
      personalityResults: [],
      shareCount: 0,

      addXP: (amount) => {
        const state = get();
        const newXP = state.xp + amount;
        const { level: newLevel, name: newName } = computeLevel(newXP);
        const leveledUp = newLevel > state.level;

        set({ xp: newXP, level: newLevel, levelName: newName });

        // Check level achievements
        if (newLevel >= 3) get().unlockAchievement('level_3');
        if (newLevel >= 5) get().unlockAchievement('level_5');

        return { newXP, leveledUp, newLevel };
      },

      checkDailyVisit: () => {
        const state = get();
        const today = new Date().toISOString().split('T')[0];

        if (state.lastVisit === today) return;

        if (state.lastVisit) {
          const lastDate = new Date(state.lastVisit);
          const todayDate = new Date(today);
          const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

          if (diffDays === 1) {
            const newStreak = state.streak + 1;
            set({ streak: newStreak, lastVisit: today });
            if (newStreak >= 3) get().unlockAchievement('streak_3');
            if (newStreak >= 7) get().unlockAchievement('streak_7');
          } else {
            set({ streak: 1, lastVisit: today });
          }
        } else {
          set({ streak: 1, lastVisit: today });
        }

        get().addXP(10);
      },

      unlockAchievement: (id) => {
        set((state) => ({
          achievements: state.achievements.map((a) =>
            a.id === id && !a.unlockedAt
              ? { ...a, unlockedAt: new Date().toISOString() }
              : a
          ),
        }));
      },

      savePersonalityResult: (result) => {
        set((state) => ({
          personalityResults: [result, ...state.personalityResults].slice(0, 10),
        }));
        get().unlockAchievement('first_quiz');
        get().unlockAchievement('villain_reveal');
        get().addXP(100);
      },

      incrementShareCount: () => {
        const newCount = get().shareCount + 1;
        set({ shareCount: newCount });
        if (newCount >= 5) get().unlockAchievement('share_master');
        get().addXP(15);
      },

      getLevel: computeLevel,
    }),
    {
      name: 'personaverse-game',
    }
  )
);
