'use client';

import { motion } from 'framer-motion';
import type { PersonalityResult } from '@/types';
import ShareButton from './ShareButton';

export default function VillainCard({ result }: { result: PersonalityResult }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8 }}
      className="glass-strong p-8 md:p-10 mb-8 glow-crimson"
    >
      <p className="text-xs tracking-[0.3em] uppercase mb-2 text-center" style={{ color: 'var(--color-crimson)' }}>
        💀 IF YOU BECAME A VILLAIN... 💀
      </p>
      <h2 className="text-3xl md:text-5xl font-black text-center mb-6 gradient-text-villain">
        {result.villainIdentity.name}
      </h2>

      <div className="max-w-xl mx-auto">
        <p className="text-sm mb-6 text-center italic" style={{ color: 'var(--color-ghost-white)' }}>
          {result.villainIdentity.backstory}
        </p>

        <h3 className="text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--color-crimson)' }}>
          💀 Methods
        </h3>
        <div className="grid gap-2 mb-6">
          {result.villainIdentity.methods.map((method, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="px-4 py-3 rounded-lg text-sm flex items-center gap-2"
              style={{
                background: 'rgba(255, 45, 85, 0.08)',
                border: '1px solid rgba(255, 45, 85, 0.15)',
                color: 'var(--color-ghost-white)',
              }}
            >
              <span style={{ color: 'var(--color-crimson)' }}>💀</span> {method}
            </motion.div>
          ))}
        </div>

        {/* Villain Arc */}
        <div className="p-5 rounded-xl text-center" style={{ background: 'rgba(139, 0, 0, 0.15)', border: '1px solid rgba(255, 45, 85, 0.2)' }}>
          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--color-crimson)' }}>
            Your Villain Arc
          </p>
          <p className="text-sm italic" style={{ color: 'var(--color-ghost-white)' }}>
            {result.villainArc}
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <ShareButton
          title={result.villainIdentity.name}
          text={`My villain identity: ${result.villainIdentity.name} 💀 ${result.villainArc}`}
        />
      </div>
    </motion.section>
  );
}
