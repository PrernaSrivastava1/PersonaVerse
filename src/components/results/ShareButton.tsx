'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ShareButtonProps {
  title: string;
  text: string;
}

export default function ShareButton({ title, text }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const shareText = `🔮 My PersonaVerse Result: ${title}\n${text}\n\nDiscover yours at PersonaVerse!`;
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTwitter = () => {
    const shareText = encodeURIComponent(`🔮 My PersonaVerse personality: ${title}\n\n${text.slice(0, 100)}...\n\nDiscover yours!`);
    window.open(`https://twitter.com/intent/tweet?text=${shareText}`, '_blank');
  };

  return (
    <div className="flex gap-2 mt-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCopy}
        className="glass-subtle px-4 py-2 text-xs rounded-full cursor-pointer transition-colors"
        style={{ color: copied ? 'var(--color-aurora-green)' : 'var(--color-mist)' }}
      >
        {copied ? '✓ Copied!' : '📋 Copy'}
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleTwitter}
        className="glass-subtle px-4 py-2 text-xs rounded-full cursor-pointer"
        style={{ color: 'var(--color-stellar-cyan)' }}
      >
        𝕏 Share
      </motion.button>
    </div>
  );
}
