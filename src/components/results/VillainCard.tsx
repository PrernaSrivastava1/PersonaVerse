'use client';

import { motion } from 'framer-motion';
import type { PersonalityResult } from '@/types';
import ShareButton from './ShareButton';

export default function VillainCard({ result }: { result: PersonalityResult }) {
  return (
    <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
      className="glass-strong glow-crimson" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
      <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.5rem', textAlign: 'center', color: '#ff2d55' }}>💀 IF YOU BECAME A VILLAIN... 💀</p>
      <h2 className="gradient-text-villain" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.75rem)', fontWeight: 900, textAlign: 'center', marginBottom: '1.5rem' }}>{result.villainIdentity.name}</h2>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'center', fontStyle: 'italic', color: '#e8e6f0' }}>{result.villainIdentity.backstory}</p>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem', color: '#ff2d55' }}>💀 Methods</p>
        <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {result.villainIdentity.methods.map((method, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', background: 'rgba(255, 45, 85, 0.08)', border: '1px solid rgba(255, 45, 85, 0.15)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e8e6f0' }}>
              <span style={{ color: '#ff2d55' }}>💀</span> {method}
            </motion.div>
          ))}
        </div>
        <div style={{ padding: '1.25rem', borderRadius: '0.75rem', textAlign: 'center', background: 'rgba(139, 0, 0, 0.15)', border: '1px solid rgba(255, 45, 85, 0.2)' }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.4rem', color: '#ff2d55' }}>Your Villain Arc</p>
          <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#e8e6f0' }}>{result.villainArc}</p>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><ShareButton title={result.villainIdentity.name} text={`My villain identity: ${result.villainIdentity.name} 💀`} /></div>
    </motion.section>
  );
}
