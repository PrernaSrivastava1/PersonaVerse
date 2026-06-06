'use client';

import { motion } from 'framer-motion';
import type { PersonalityResult } from '@/types';
import ShareButton from './ShareButton';

export default function PersonalityCard({ result }: { result: PersonalityResult }) {
  return (
    <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
      className="glass-strong" style={{ padding: '2.5rem 2rem', textAlign: 'center', marginBottom: '1.5rem' }}>
      <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem', color: '#00d4ff' }}>✦ YOUR PERSONALITY ARCHETYPE ✦</p>
      <h1 className="gradient-text-cosmic text-glow-cyan" style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 900, marginBottom: '1.5rem' }}>{result.archetype}</h1>
      <p style={{ fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 560, margin: '0 auto 2rem', color: '#e8e6f0', whiteSpace: 'pre-line' as const }}>{result.story}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', maxWidth: 560, margin: '0 auto 2rem', textAlign: 'left' }}>
        <div>
          <h3 style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem', color: '#00ff88' }}>✦ Strengths</h3>
          {result.strengths.map((s, i) => (
            <p key={i} style={{ fontSize: '0.85rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#e8e6f0' }}>
              <span style={{ color: '#00ff88', flexShrink: 0 }}>◆</span> {s}
            </p>
          ))}
        </div>
        <div>
          <h3 style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem', color: '#ff6b9d' }}>✦ Growth Areas</h3>
          {result.weaknesses.map((w, i) => (
            <p key={i} style={{ fontSize: '0.85rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#b8b5c9' }}>
              <span style={{ color: '#ff6b9d', flexShrink: 0 }}>◇</span> {w}
            </p>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', maxWidth: 600, margin: '0 auto 2rem' }}>
        {[
          { label: 'Dream Career', value: result.dreamCareer, icon: '🚀' },
          { label: 'Leadership', value: result.leadershipStyle, icon: '👑' },
          { label: 'Learning', value: result.learningStyle, icon: '📚' },
        ].map(({ label, value, icon }) => (
          <div key={label} className="glass-subtle" style={{ padding: '1rem', textAlign: 'left' }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem', color: '#00d4ff' }}>{icon} {label}</p>
            <p style={{ fontSize: '0.8rem', color: '#e8e6f0' }}>{value}</p>
          </div>
        ))}
      </div>

      <div className="glass glow-pink" style={{ padding: '1.25rem', maxWidth: 480, margin: '0 auto' }}>
        <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.4rem', color: '#ff6b9d' }}>🔮 Hidden Trait Revealed</p>
        <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#e8e6f0' }}>{result.hiddenTrait}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}><ShareButton title={result.archetype} text={result.story.slice(0, 150)} /></div>
    </motion.section>
  );
}
