'use client';

import { motion } from 'framer-motion';
import type { MoodType } from '@/types';

interface MoodScannerProps {
  onMoodSelect: (mood: MoodType) => void;
  selectedMood: MoodType | null;
  insight: string | null;
  loading: boolean;
}

const MOODS: { emoji: MoodType; label: string }[] = [
  { emoji: '😊', label: 'Great' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😴', label: 'Tired' },
  { emoji: '🔥', label: 'Fired Up' },
  { emoji: '💀', label: 'Dead' },
];

export default function MoodScanner({ onMoodSelect, selectedMood, insight, loading }: MoodScannerProps) {
  return (
    <div className="glass-strong p-6 md:p-8">
      <h3 className="text-lg font-semibold text-center mb-5" style={{ color: 'var(--color-ghost-white)' }}>
        How Are You Feeling?
      </h3>
      <div className="flex justify-center gap-4 mb-6">
        {MOODS.map(({ emoji, label }) => (
          <motion.button
            key={emoji}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onMoodSelect(emoji)}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 p-3 rounded-xl ${
              selectedMood === emoji ? 'glass glow-cyan scale-110' : selectedMood ? 'opacity-40' : ''
            }`}
          >
            <span className="text-4xl">{emoji}</span>
            <span className="text-[10px]" style={{ color: 'var(--color-twilight)' }}>{label}</span>
          </motion.button>
        ))}
      </div>
      {loading && (
        <p className="text-center text-sm animate-pulse" style={{ color: 'var(--color-stellar-cyan)' }}>
          Reading your energy...
        </p>
      )}
      {insight && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-4 text-center"
        >
          <p className="text-sm italic" style={{ color: 'var(--color-ghost-white)' }}>{insight}</p>
        </motion.div>
      )}
    </div>
  );
}
