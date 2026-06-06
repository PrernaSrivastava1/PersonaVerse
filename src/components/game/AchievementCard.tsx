'use client';

import { motion } from 'framer-motion';
import type { Achievement } from '@/types';

export default function AchievementCard({ achievement }: { achievement: Achievement }) {
  const isUnlocked = !!achievement.unlockedAt;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`glass p-5 text-center transition-all duration-300 ${
        isUnlocked ? 'glow-cyan' : 'opacity-50 grayscale'
      }`}
    >
      <div className="text-4xl mb-3">{isUnlocked ? achievement.icon : '🔒'}</div>
      <h3 className="text-sm font-semibold mb-1" style={{ color: isUnlocked ? 'var(--color-ghost-white)' : 'var(--color-twilight)' }}>
        {achievement.title}
      </h3>
      <p className="text-xs" style={{ color: 'var(--color-twilight)' }}>{achievement.description}</p>
      {isUnlocked && achievement.unlockedAt && (
        <p className="text-[10px] mt-2" style={{ color: 'var(--color-stellar-cyan)' }}>
          Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
        </p>
      )}
    </motion.div>
  );
}
