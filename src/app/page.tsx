'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const CosmicScene = dynamic(() => import('@/components/three/CosmicScene'), { ssr: false });
const StarField = dynamic(() => import('@/components/three/StarField'), { ssr: false });
const ParticleField = dynamic(() => import('@/components/three/ParticleField'), { ssr: false });
const CosmicOrb = dynamic(() => import('@/components/three/CosmicOrb'), { ssr: false });
const FloatingCrystals = dynamic(() => import('@/components/three/FloatingCrystals'), { ssr: false });
const MouseTracker = dynamic(() => import('@/components/three/MouseTracker'), { ssr: false });

export default function LandingPage() {
  const router = useRouter();
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  const handleEnter = useCallback(() => {
    setIsPortalOpen(true);
    setTimeout(() => router.push('/universe'), 1500);
  }, [router]);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', background: '#0A0A0A' }}>
      {/* 3D Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <CosmicScene>
          <MouseTracker>
            <StarField />
            <ParticleField />
            <CosmicOrb />
            <FloatingCrystals />
          </MouseTracker>
        </CosmicScene>
      </div>

      {/* Portal Animation */}
      <AnimatePresence>
        {isPortalOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 50, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{
              position: 'fixed', inset: 0, zIndex: 50,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'radial-gradient(circle, #FFD700 0%, #1A1A14 40%, transparent 70%)',
              boxShadow: '0 0 100px 50px rgba(255, 215, 0, 0.3)',
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '2rem 1.5rem',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ textAlign: 'center', maxWidth: 720 }}
        >
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase',
              marginBottom: '1.5rem', color: '#A89968',
            }}
          >
            ✦ AI POWERED PERSONALITY UNIVERSE ✦
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="gradient-text-cosmic"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              fontWeight: 900, marginBottom: '1.5rem',
              lineHeight: 1.05,
            }}
          >
            Who Are You<br />Really?
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              marginBottom: '3rem', maxWidth: 520, margin: '0 auto 3rem',
              color: '#A89968', lineHeight: 1.7,
            }}
          >
            Explore the Universe Inside You — Discover your hero identity, villain arc,
            spirit animal, and more through an immersive cosmic experience.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <button
              id="enter-universe-btn"
              onClick={handleEnter}
              disabled={isPortalOpen}
              className="btn-cosmic animate-pulse-glow"
              style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', padding: '1rem 3rem' }}
            >
              {isPortalOpen ? '✦ Opening Portal...' : '✦ Enter The Universe'}
            </button>
          </motion.div>

          {/* Feature tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            style={{
              marginTop: '3rem', display: 'flex', flexWrap: 'wrap',
              justifyContent: 'center', gap: '0.6rem',
            }}
          >
            {['AI Personality', 'Hero Identity', 'Villain Arc', 'Spirit Animal', 'Anime Match'].map(
              (tag) => (
                <span
                  key={tag}
                  className="glass-subtle"
                  style={{
                    padding: '0.4rem 1rem', fontSize: '0.7rem',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: '#FFD700',
                  }}
                >
                  {tag}
                </span>
              )
            )}
          </motion.div>
        </motion.div>

        {/* Version */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ delay: 2.5 }}
          style={{
            position: 'absolute', bottom: 24, fontSize: '0.65rem',
            letterSpacing: '0.15em', color: '#6B6340',
          }}
        >
          PERSONAVERSE v1.0 — Powered by Gemini AI
        </motion.p>
      </div>
    </div>
  );
}
