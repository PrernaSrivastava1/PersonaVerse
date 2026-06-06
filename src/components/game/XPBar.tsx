'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { LEVELS } from '@/types';

interface XPBarProps {
  compact?: boolean;
}

export default function XPBar({ compact = false }: XPBarProps) {
  const { xp, level, levelName } = useGameStore();
  const currentLevel = LEVELS.find((l) => l.level === level) || LEVELS[0];
  const nextLevel = LEVELS.find((l) => l.level === level + 1);
  const progress = nextLevel
    ? ((xp - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100
    : 100;

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold" style={{ color: 'var(--color-stellar-cyan)' }}>
          Lv.{level}
        </span>
        <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #00d4ff, #ff6b9d)' }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="glass-subtle p-4 rounded-xl">
      <div className="flex justify-between items-center mb-2">
        <div>
          <span className="text-lg font-bold" style={{ color: 'var(--color-stellar-cyan)' }}>
            Level {level}
          </span>
          <span className="text-sm ml-2" style={{ color: 'var(--color-mist)' }}>{levelName}</span>
        </div>
        <span className="text-xs" style={{ color: 'var(--color-twilight)' }}>
          {xp} / {nextLevel ? nextLevel.minXP : '∞'} XP
        </span>
      </div>
      <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #00d4ff, #ff6b9d, #00ff88)' }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
