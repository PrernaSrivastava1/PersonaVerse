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
    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleCopy}
        className="glass-subtle" style={{ padding: '0.4rem 1rem', fontSize: '0.7rem', borderRadius: 9999, cursor: 'pointer', border: 'none', fontFamily: 'inherit', color: copied ? '#00ff88' : '#b8b5c9' }}>
        {copied ? '✓ Copied!' : '📋 Copy'}
      </motion.button>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleTwitter}
        className="glass-subtle" style={{ padding: '0.4rem 1rem', fontSize: '0.7rem', borderRadius: 9999, cursor: 'pointer', border: 'none', fontFamily: 'inherit', color: '#00d4ff' }}>
        𝕏 Share
      </motion.button>
    </div>
  );
}
