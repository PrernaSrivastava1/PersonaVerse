'use client';

import { motion } from 'framer-motion';
import type { PersonalityResult } from '@/types';
import ShareButton from './ShareButton';

export default function HeroCard({ result }: { result: PersonalityResult }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8 }}
      className="glass-strong p-8 md:p-10 mb-8 glow-gold"
    >
      <p className="text-xs tracking-[0.3em] uppercase mb-2 text-center" style={{ color: 'var(--color-solar-gold)' }}>
        ⚡ YOUR HERO IDENTITY ⚡
      </p>
      <h2 className="text-3xl md:text-5xl font-black text-center mb-6 gradient-text-hero text-glow-gold">
        {result.heroIdentity.name}
      </h2>

      <div className="max-w-xl mx-auto">
        <p className="text-sm mb-6 text-center italic" style={{ color: 'var(--color-ghost-white)' }}>
          {result.heroIdentity.backstory}
        </p>

        <h3 className="text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--color-solar-gold)' }}>
          ⚡ Powers
        </h3>
        <div className="grid gap-2 mb-4">
          {result.heroIdentity.powers.map((power, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-subtle px-4 py-3 rounded-lg text-sm flex items-center gap-2"
              style={{ color: 'var(--color-ghost-white)' }}
            >
              <span style={{ color: 'var(--color-solar-gold)' }}>⚡</span> {power}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <ShareButton title={result.heroIdentity.name} text={`My hero identity: ${result.heroIdentity.name}! Powers: ${result.heroIdentity.powers.join(', ')}`} />
      </div>
    </motion.section>
  );
}
