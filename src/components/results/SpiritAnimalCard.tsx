'use client';

import { motion } from 'framer-motion';
import type { PersonalityResult } from '@/types';
import ShareButton from './ShareButton';

export default function SpiritAnimalCard({ result }: { result: PersonalityResult }) {
  return (
    <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
      className="glass-strong glow-green" style={{ padding: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
      <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.5rem', color: '#00ff88' }}>🌿 YOUR SPIRIT ANIMAL</p>
      <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>{result.spiritAnimal.emoji}</div>
      <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 900, marginBottom: '1rem', color: '#00ff88' }}>{result.spiritAnimal.animal}</h2>
      <p style={{ fontSize: '0.9rem', maxWidth: 480, margin: '0 auto', color: '#e8e6f0' }}>{result.spiritAnimal.reason}</p>
      <div style={{ display: 'flex', justifyContent: 'center' }}><ShareButton title={result.spiritAnimal.animal} text={`My spirit animal: ${result.spiritAnimal.emoji} ${result.spiritAnimal.animal}!`} /></div>
    </motion.section>
  );
}
