'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useGameStore } from '@/store/gameStore';

export default function ProfilePage() {
  const { xp, level, levelName, streak, personalityResults, achievements } = useGameStore();
  const unlocked = achievements.filter(a => a.unlockedAt).length;
  const latestResult = personalityResults[0];

  return (
    <div className="page-container">
      <div className="content-overlay" style={{ minHeight: '100vh', padding: '2rem 1rem', maxWidth: 600, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: 80, height: 80, margin: '0 auto 1rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', background: 'linear-gradient(135deg, #1A1A14, #2A2510)', boxShadow: '0 0 40px rgba(255, 215, 0, 0.3)' }}>
            👤
          </div>
          <h1 className="gradient-text-cosmic" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.75rem)', fontWeight: 800, marginBottom: '0.25rem' }}>Your Universe</h1>
          <p style={{ fontSize: '1rem', fontWeight: 600, color: '#FFD700' }}>Level {level} — {levelName}</p>
        </motion.div>

        {/* XP bar */}
        <div className="glass-subtle" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FFD700' }}>Level {level}</span>
            <span style={{ fontSize: '0.7rem', color: '#6B6340' }}>{xp} XP</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 3, background: 'linear-gradient(90deg, #FFD700, #E6A817, #7FCC3E)', width: `${Math.min((xp % 200) / 2, 100)}%`, transition: 'width 0.5s' }} />
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'XP', value: xp, icon: '⚡' },
            { label: 'Streak', value: streak, icon: '🔥' },
            { label: 'Achievements', value: `${unlocked}/${achievements.length}`, icon: '🏆' },
          ].map(({ label, value, icon }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="glass" style={{ padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{icon}</div>
              <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F5F0E1' }}>{value}</p>
              <p style={{ fontSize: '0.55rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B6340' }}>{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Latest Result */}
        {latestResult && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-strong" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem', color: '#FFD700' }}>Latest Personality</p>
            <h3 className="gradient-text-cosmic" style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.4rem' }}>{latestResult.archetype}</h3>
            <p style={{ fontSize: '0.8rem', marginBottom: '0.3rem', color: '#A89968' }}>{latestResult.heroIdentity.name} / {latestResult.villainIdentity.name}</p>
            <p style={{ fontSize: '0.7rem', color: '#6B6340' }}>{latestResult.spiritAnimal.emoji} {latestResult.spiritAnimal.animal} • {latestResult.animeMatch.character}</p>
          </motion.div>
        )}

        {/* Quick Links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
          {[
            { href: '/universe', label: 'Take Quiz', icon: '🔮' },
            { href: '/daily', label: 'Daily Portal', icon: '⭐' },
            { href: '/achievements', label: 'Achievements', icon: '🏆' },
          ].map(({ href, label, icon }) => (
            <Link key={href} href={href} className="glass card-hover" style={{ padding: '1rem', textAlign: 'center', display: 'block' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{icon}</div>
              <p style={{ fontSize: '0.7rem', color: '#A89968' }}>{label}</p>
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
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
            <span style={{ fontSize: '1.1rem', filter: 'drop-shadow(0 0 4px rgba(255,215,0,0.4))' }}></span>
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
