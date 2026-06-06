'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useGameStore } from '@/store/gameStore';
import AchievementCard from '@/components/game/AchievementCard';
import XPBar from '@/components/game/XPBar';

export default function AchievementsPage() {
  const { achievements, xp, level, levelName, streak, personalityResults } = useGameStore();
  const unlocked = achievements.filter((a) => a.unlockedAt).length;

  return (
    <div className="page-container">
      <div className="content-overlay min-h-screen px-4 py-8 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold gradient-text-cosmic mb-2">Your Achievements</h1>
          <p className="text-sm" style={{ color: 'var(--color-mist)' }}>{unlocked} of {achievements.length} unlocked</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Total XP', value: xp, icon: '⚡' },
            { label: 'Level', value: `${level} - ${levelName}`, icon: '🏅' },
            { label: 'Streak', value: `${streak} days`, icon: '🔥' },
            { label: 'Quizzes', value: personalityResults.length, icon: '🔮' },
          ].map(({ label, value, icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-4 text-center"
            >
              <div className="text-2xl mb-1">{icon}</div>
              <p className="text-lg font-bold" style={{ color: 'var(--color-ghost-white)' }}>{value}</p>
              <p className="text-[10px] tracking-wider uppercase" style={{ color: 'var(--color-twilight)' }}>{label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mb-6"><XPBar /></div>

        {/* Achievement grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((achievement, i) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
            >
              <AchievementCard achievement={achievement} />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Link href="/universe" className="btn-cosmic text-sm">🔮 Take Quiz</Link>
          <Link href="/" className="glass-subtle px-5 py-2.5 rounded-full text-sm" style={{ color: 'var(--color-mist)' }}>🏠 Home</Link>
        </div>
      </div>
    </div>
  );
}
