'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useGameStore } from '@/store/gameStore';

export default function AchievementsPage() {
  const { achievements, xp, level, streak, personalityResults } = useGameStore();
  const unlocked = achievements.filter(a => a.unlockedAt).length;

  return (
    <div className="page-container">
      <div className="content-overlay" style={{ minHeight: '100vh', padding: '2rem 1rem', maxWidth: 700, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="gradient-text-cosmic" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.75rem)', fontWeight: 800, marginBottom: '0.25rem' }}>Your Achievements</h1>
          <p style={{ fontSize: '0.85rem', color: '#A89968' }}>{unlocked} of {achievements.length} unlocked</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total XP', value: xp, icon: '⚡' },
            { label: 'Level', value: level, icon: '🏅' },
            { label: 'Streak', value: `${streak}d`, icon: '🔥' },
            { label: 'Quizzes', value: personalityResults.length, icon: '🔮' },
          ].map(({ label, value, icon }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="glass" style={{ padding: '1rem 0.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{icon}</div>
              <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F5F0E1' }}>{value}</p>
              <p style={{ fontSize: '0.55rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B6340' }}>{label}</p>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
          {achievements.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}
              className={a.unlockedAt ? 'glass glow-cyan' : 'glass'}
              style={{ padding: '1.25rem', textAlign: 'center', opacity: a.unlockedAt ? 1 : 0.4, filter: a.unlockedAt ? 'none' : 'grayscale(1)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{a.unlockedAt ? a.icon : '🔒'}</div>
              <h3 style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem', color: a.unlockedAt ? '#F5F0E1' : '#6B6340' }}>{a.title}</h3>
              <p style={{ fontSize: '0.65rem', color: '#6B6340' }}>{a.description}</p>
              {a.unlockedAt && <p style={{ fontSize: '0.55rem', marginTop: '0.4rem', color: '#FFD700' }}>Unlocked {new Date(a.unlockedAt).toLocaleDateString()}</p>}
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
          <Link href="/universe" className="btn-cosmic" style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}>🔮 Take Quiz</Link>
          <Link href="/" className="home-btn" style={{
            padding: '0.65rem 1.5rem', borderRadius: 9999, fontSize: '0.85rem',
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            color: '#FFD700', fontWeight: 600, fontFamily: "'Outfit', sans-serif",
            letterSpacing: '0.04em',
            background: 'linear-gradient(135deg, rgba(255,215,0,0.08), rgba(230,168,23,0.04))',
            border: '1px solid rgba(255,215,0,0.25)',
            boxShadow: '0 0 12px rgba(255,215,0,0.06), inset 0 1px 0 rgba(255,215,0,0.08)',
            transition: 'all 0.3s ease',
          }}>
            <span style={{ fontSize: '1.1rem', filter: 'drop-shadow(0 0 4px rgba(255,215,0,0.4))' }}>🏠</span>
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
