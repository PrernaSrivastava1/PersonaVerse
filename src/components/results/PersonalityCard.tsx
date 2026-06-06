'use client';

import { motion } from 'framer-motion';
import type { PersonalityResult } from '@/types';
import ShareButton from './ShareButton';

export default function PersonalityCard({ result }: { result: PersonalityResult }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8 }}
      className="glass-strong p-8 md:p-12 text-center mb-8"
    >
      <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--color-stellar-cyan)' }}>
        ✦ YOUR PERSONALITY ARCHETYPE ✦
      </p>
      <h1 className="text-4xl md:text-7xl font-black gradient-text-cosmic mb-6 text-glow-cyan">
        {result.archetype}
      </h1>
      <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8 whitespace-pre-line" style={{ color: 'var(--color-ghost-white)' }}>
        {result.story}
      </p>

      {/* Strengths & Weaknesses */}
      <div className="grid md:grid-cols-2 gap-6 mt-8 text-left max-w-2xl mx-auto">
        <div>
          <h3 className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-aurora-green)' }}>
            ✦ Strengths
          </h3>
          {result.strengths.map((s, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-sm mb-2 flex items-start gap-2"
              style={{ color: 'var(--color-ghost-white)' }}
            >
              <span style={{ color: 'var(--color-aurora-green)' }}>◆</span> {s}
            </motion.p>
          ))}
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-nebula-pink)' }}>
            ✦ Growth Areas
          </h3>
          {result.weaknesses.map((w, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-sm mb-2 flex items-start gap-2"
              style={{ color: 'var(--color-mist)' }}
            >
              <span style={{ color: 'var(--color-nebula-pink)' }}>◇</span> {w}
            </motion.p>
          ))}
        </div>
      </div>

      {/* Career, Leadership, Learning */}
      <div className="grid md:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto">
        {[
          { label: 'Dream Career', value: result.dreamCareer, icon: '🚀' },
          { label: 'Leadership Style', value: result.leadershipStyle, icon: '👑' },
          { label: 'Learning Style', value: result.learningStyle, icon: '📚' },
        ].map(({ label, value, icon }) => (
          <div key={label} className="glass-subtle p-4 text-left">
            <p className="text-xs tracking-wider uppercase mb-1" style={{ color: 'var(--color-stellar-cyan)' }}>
              {icon} {label}
            </p>
            <p className="text-sm" style={{ color: 'var(--color-ghost-white)' }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Hidden Trait */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mt-8 glass p-6 max-w-xl mx-auto glow-pink"
      >
        <p className="text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--color-nebula-pink)' }}>
          🔮 Hidden Trait Revealed
        </p>
        <p className="text-sm italic" style={{ color: 'var(--color-ghost-white)' }}>{result.hiddenTrait}</p>
      </motion.div>

      <ShareButton title={result.archetype} text={result.story.slice(0, 150)} />
    </motion.section>
  );
}
