'use client';

import { motion } from 'framer-motion';

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = 'Scanning the Cosmos...' }: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: 'var(--color-void)' }}
    >
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-20 h-20 rounded-full mb-8"
        style={{
          background: 'radial-gradient(circle, var(--color-stellar-cyan), var(--color-nebula), transparent)',
          boxShadow: '0 0 60px rgba(0, 212, 255, 0.4), 0 0 100px rgba(45, 27, 105, 0.3)',
        }}
      />
      <p className="text-lg font-medium" style={{ color: 'var(--color-ghost-white)' }}>
        {message}
      </p>
      <motion.div
        className="flex gap-1 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            style={{ color: 'var(--color-stellar-cyan)' }}
          >
            ●
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
