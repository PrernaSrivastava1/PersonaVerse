'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useGameStore } from '@/store/gameStore';
import type { MoodType } from '@/types';

const MOODS: { emoji: MoodType; label: string }[] = [
  { emoji: '😊', label: 'Great' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😴', label: 'Tired' },
  { emoji: '🔥', label: 'Fired Up' },
  { emoji: '💀', label: 'Dead' },
];

export default function DailyPage() {
  const { streak, xp, level, levelName, checkDailyVisit } = useGameStore();
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [moodInsight, setMoodInsight] = useState<string | null>(null);
  const [moodLoading, setMoodLoading] = useState(false);
  const [fortune, setFortune] = useState<string | null>(null);

  useEffect(() => {
    checkDailyVisit();
    fetch('/api/daily').then(r => r.json()).then(d => setFortune(d.fortune)).catch(() => setFortune('Today your potential is limitless.'));
  }, [checkDailyVisit]);

  const handleMoodSelect = async (mood: MoodType) => {
    setSelectedMood(mood);
    setMoodLoading(true);
    try {
      const res = await fetch('/api/daily', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mood }) });
      const data = await res.json();
      setMoodInsight(data.insight);
    } catch { setMoodInsight('Your energy is unique today. Trust it.'); }
    finally { setMoodLoading(false); }
  };

  return (
    <div className="page-container">
      <div className="content-overlay" style={{ minHeight: '100vh', padding: '2rem 1rem', maxWidth: 600, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="gradient-text-cosmic" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.75rem)', fontWeight: 800, marginBottom: '0.25rem' }}>Daily Portal</h1>
          <p style={{ fontSize: '0.85rem', color: '#b8b5c9' }}>Your daily cosmic check-in</p>
        </motion.div>

        {/* XP */}
        <div className="glass-subtle" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#00d4ff' }}>Level {level}</span>
            <span style={{ fontSize: '0.7rem', color: '#6b6880' }}>{xp} XP • {levelName}</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 3, background: 'linear-gradient(90deg, #00d4ff, #ff6b9d)', width: `${Math.min((xp % 200) / 2, 100)}%`, transition: 'width 0.5s' }} />
          </div>
        </div>

        {/* Mood Scanner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-strong" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, textAlign: 'center', marginBottom: '1.25rem', color: '#e8e6f0' }}>How Are You Feeling?</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {MOODS.map(({ emoji, label }) => (
              <motion.button key={emoji} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={() => handleMoodSelect(emoji)}
                className={selectedMood === emoji ? 'glass glow-cyan' : ''}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', padding: '0.6rem', borderRadius: '0.75rem', border: 'none', background: selectedMood === emoji ? undefined : 'transparent', opacity: selectedMood && selectedMood !== emoji ? 0.35 : 1, transition: 'all 0.3s', fontFamily: 'inherit' }}>
                <span style={{ fontSize: '2rem' }}>{emoji}</span>
                <span style={{ fontSize: '0.55rem', color: '#6b6880' }}>{label}</span>
              </motion.button>
            ))}
          </div>
          {moodLoading && <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#00d4ff' }}>Reading your energy...</p>}
          {moodInsight && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass" style={{ padding: '1rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#e8e6f0' }}>{moodInsight}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Fortune */}
        {fortune && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-strong" style={{ padding: '1.5rem 2rem', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', textAlign: 'center', marginBottom: '0.75rem', color: '#ffd700' }}>✨ Today&apos;s Cosmic Fortune</p>
            <p style={{ textAlign: 'center', fontSize: '1.05rem', fontStyle: 'italic', lineHeight: 1.7, color: '#e8e6f0', fontFamily: "'Outfit', sans-serif" }}>&ldquo;{fortune}&rdquo;</p>
          </motion.div>
        )}

        {/* Streak */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-strong" style={{ padding: '1.5rem', textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem', color: '#ff8c42' }}>🔥 Daily Streak</p>
          <p style={{ fontSize: '3rem', fontWeight: 900, color: '#e8e6f0' }}>{streak}</p>
          <p style={{ fontSize: '0.8rem', color: '#b8b5c9' }}>{streak === 0 ? 'Start your streak!' : streak === 1 ? 'day' : 'days in a row'}</p>
        </motion.div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
          <Link href="/universe" className="btn-cosmic" style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}>🔮 Take Quiz</Link>
          <Link href="/" className="glass-subtle" style={{ padding: '0.6rem 1.25rem', borderRadius: 9999, fontSize: '0.85rem', color: '#b8b5c9', display: 'inline-flex', alignItems: 'center' }}>🏠 Home</Link>
        </div>
      </div>
    </div>
  );
}
