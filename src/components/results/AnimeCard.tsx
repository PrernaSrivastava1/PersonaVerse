'use client';

import { motion } from 'framer-motion';
import type { PersonalityResult } from '@/types';
import ShareButton from './ShareButton';

export default function AnimeCard({ result }: { result: PersonalityResult }) {
  return (
    <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
      className="glass-strong" style={{ padding: '2rem', marginBottom: '1.5rem', borderImage: 'linear-gradient(135deg, #ff6b9d, #00d4ff) 1', borderWidth: 2, borderStyle: 'solid' }}>
      <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.5rem', textAlign: 'center', color: '#ff6b9d' }}>🎌 YOUR ANIME CHARACTER MATCH</p>
      <h2 className="gradient-text-cosmic" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 900, textAlign: 'center', marginBottom: '0.25rem' }}>{result.animeMatch.character}</h2>
      <p style={{ textAlign: 'center', fontSize: '0.85rem', marginBottom: '1rem', color: '#00d4ff' }}>from {result.animeMatch.series}</p>
      <p style={{ textAlign: 'center', fontSize: '0.9rem', maxWidth: 480, margin: '0 auto', color: '#e8e6f0' }}>{result.animeMatch.reason}</p>
      <div style={{ display: 'flex', justifyContent: 'center' }}><ShareButton title={result.animeMatch.character} text={`My anime match: ${result.animeMatch.character} from ${result.animeMatch.series}!`} /></div>
    </motion.section>
  );
}
