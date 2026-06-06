'use client';

import { motion } from 'framer-motion';
import type { PersonalityResult } from '@/types';
import ShareButton from './ShareButton';

export default function SpiritAnimalCard({ result }: { result: PersonalityResult }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8 }}
      className="glass-strong p-8 md:p-10 mb-8 glow-green"
    >
      <p className="text-xs tracking-[0.3em] uppercase mb-2 text-center" style={{ color: 'var(--color-aurora-green)' }}>
        🌿 YOUR SPIRIT ANIMAL
      </p>
      <div className="text-7xl text-center mb-4">{result.spiritAnimal.emoji}</div>
      <h2 className="text-3xl md:text-4xl font-black text-center mb-4" style={{ color: 'var(--color-aurora-green)' }}>
        {result.spiritAnimal.animal}
      </h2>
      <p className="text-sm text-center max-w-lg mx-auto" style={{ color: 'var(--color-ghost-white)' }}>
        {result.spiritAnimal.reason}
      </p>
      <div className="flex justify-center">
        <ShareButton title={result.spiritAnimal.animal} text={`My spirit animal: ${result.spiritAnimal.emoji} ${result.spiritAnimal.animal}!`} />
      </div>
    </motion.section>
  );
}
