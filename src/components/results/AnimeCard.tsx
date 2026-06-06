'use client';

import { motion } from 'framer-motion';
import type { PersonalityResult } from '@/types';
import ShareButton from './ShareButton';

export default function AnimeCard({ result }: { result: PersonalityResult }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8 }}
      className="glass-strong p-8 md:p-10 mb-8"
      style={{ borderImage: 'linear-gradient(135deg, #ff6b9d, #00d4ff) 1', borderWidth: '2px', borderStyle: 'solid' }}
    >
      <p className="text-xs tracking-[0.3em] uppercase mb-2 text-center" style={{ color: 'var(--color-nebula-pink)' }}>
        🎌 YOUR ANIME CHARACTER MATCH
      </p>
      <h2 className="text-3xl md:text-4xl font-black text-center mb-1 gradient-text-cosmic">
        {result.animeMatch.character}
      </h2>
      <p className="text-center text-sm mb-4" style={{ color: 'var(--color-stellar-cyan)' }}>
        from {result.animeMatch.series}
      </p>
      <p className="text-sm text-center max-w-lg mx-auto" style={{ color: 'var(--color-ghost-white)' }}>
        {result.animeMatch.reason}
      </p>
      <div className="flex justify-center">
        <ShareButton title={result.animeMatch.character} text={`My anime match: ${result.animeMatch.character} from ${result.animeMatch.series}!`} />
      </div>
    </motion.section>
  );
}
