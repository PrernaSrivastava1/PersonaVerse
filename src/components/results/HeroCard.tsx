'use client';

import { motion } from 'framer-motion';
import type { PersonalityResult } from '@/types';
import ShareButton from './ShareButton';

export default function HeroCard({ result }: { result: PersonalityResult }) {
  return (
    <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
      className="glass-strong glow-gold" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
      <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.5rem', textAlign: 'center', color: '#FFE55C' }}>⚡ YOUR HERO IDENTITY ⚡</p>
      <h2 className="gradient-text-hero text-glow-gold" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.75rem)', fontWeight: 900, textAlign: 'center', marginBottom: '1.5rem' }}>{result.heroIdentity.name}</h2>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'center', fontStyle: 'italic', color: '#F5F0E1' }}>{result.heroIdentity.backstory}</p>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem', color: '#FFE55C' }}>⚡ Powers</p>
        <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
          {result.heroIdentity.powers.map((power, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-subtle" style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#F5F0E1' }}>
              <span style={{ color: '#FFE55C' }}>⚡</span> {power}
            </motion.div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><ShareButton title={result.heroIdentity.name} text={`My hero: ${result.heroIdentity.name}! Powers: ${result.heroIdentity.powers.join(', ')}`} /></div>
    </motion.section>
  );
}
