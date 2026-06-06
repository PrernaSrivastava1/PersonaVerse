'use client';

import { motion } from 'framer-motion';

export default function DailyFortune({ fortune }: { fortune: string | null }) {
  if (!fortune) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-strong p-6 md:p-8 animate-float-slow"
    >
      <p className="text-xs tracking-[0.3em] uppercase text-center mb-4" style={{ color: 'var(--color-solar-gold)' }}>
        ✨ Today&apos;s Cosmic Fortune
      </p>
      <p className="text-center text-lg italic leading-relaxed" style={{ color: 'var(--color-ghost-white)', fontFamily: 'var(--font-display)' }}>
        &ldquo;{fortune}&rdquo;
      </p>
      <div className="text-center mt-4 animate-rotate-slow inline-block w-full">
        <span className="text-2xl">✦</span>
      </div>
    </motion.div>
  );
}
