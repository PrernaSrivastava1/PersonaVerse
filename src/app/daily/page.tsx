'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useGameStore } from '@/store/gameStore';
import MoodScanner from '@/components/daily/MoodScanner';
import DailyFortune from '@/components/daily/DailyFortune';
import XPBar from '@/components/game/XPBar';
import type { MoodType } from '@/types';

export default function DailyPage() {
  const { streak, checkDailyVisit } = useGameStore();
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [moodInsight, setMoodInsight] = useState<string | null>(null);
  const [moodLoading, setMoodLoading] = useState(false);
  const [fortune, setFortune] = useState<string | null>(null);

  useEffect(() => {
    checkDailyVisit();
    fetch('/api/daily')
      .then((r) => r.json())
      .then((d) => setFortune(d.fortune))
      .catch(() => setFortune('Today your potential is limitless.'));
  }, [checkDailyVisit]);

  const handleMoodSelect = async (mood: MoodType) => {
    setSelectedMood(mood);
    setMoodLoading(true);
    try {
      const res = await fetch('/api/daily', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood }),
      });
      const data = await res.json();
      setMoodInsight(data.insight);
    } catch {
      setMoodInsight('Your energy is unique today. Trust it.');
    } finally {
      setMoodLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="content-overlay min-h-screen px-4 py-8 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold gradient-text-cosmic mb-2">Daily Portal</h1>
          <p className="text-sm" style={{ color: 'var(--color-mist)' }}>Your daily cosmic check-in</p>
        </motion.div>

        <div className="mb-6"><XPBar /></div>

        <div className="grid gap-6">
          {/* Mood Scanner */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <MoodScanner onMoodSelect={handleMoodSelect} selectedMood={selectedMood} insight={moodInsight} loading={moodLoading} />
          </motion.div>

          {/* Fortune */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <DailyFortune fortune={fortune} />
          </motion.div>

          {/* Streak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-strong p-6 text-center"
          >
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--color-plasma-orange)' }}>
              🔥 Daily Streak
            </p>
            <p className="text-5xl font-black mb-1" style={{ color: 'var(--color-ghost-white)' }}>{streak}</p>
            <p className="text-sm" style={{ color: 'var(--color-mist)' }}>
              {streak === 0 ? 'Start your streak!' : streak === 1 ? 'day' : 'days in a row'}
            </p>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          <Link href="/universe" className="btn-cosmic text-sm">🔮 Take Quiz</Link>
          <Link href="/" className="glass-subtle px-5 py-2.5 rounded-full text-sm" style={{ color: 'var(--color-mist)' }}>🏠 Home</Link>
        </div>
      </div>
    </div>
  );
}
