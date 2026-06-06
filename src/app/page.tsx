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
    setTimeout(() => {
      router.push('/universe');
    }, 1500);
  }, [router]);

  return (
    <div className="page-container">
      {/* 3D Background */}
      <div className="scene-background">
        <CosmicScene>
          <MouseTracker>
            <StarField />
            <ParticleField />
            <CosmicOrb />
            <FloatingCrystals />
          </MouseTracker>
        </CosmicScene>
      </div>

      {/* Portal Animation Overlay */}
      <AnimatePresence>
        {isPortalOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 50, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div
              className="w-16 h-16 rounded-full"
              style={{
                background: 'radial-gradient(circle, #00d4ff 0%, #2d1b69 40%, transparent 70%)',
                boxShadow: '0 0 100px 50px rgba(0, 212, 255, 0.3)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="content-overlay min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center max-w-3xl"
        >
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-sm md:text-base tracking-[0.3em] uppercase mb-6"
            style={{ color: 'var(--color-mist)' }}
          >
            ✦ A I &nbsp; P O W E R E D &nbsp; P E R S O N A L I T Y &nbsp; U N I V E R S E ✦
          </motion.p>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-5xl sm:text-6xl md:text-8xl font-black mb-6 leading-tight gradient-text-cosmic"
          >
            Who Are You
            <br />
            Really?
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-lg md:text-xl mb-12 max-w-lg mx-auto"
            style={{ color: 'var(--color-mist)' }}
          >
            Explore the Universe Inside You — Discover hidden traits, your hero identity,
            villain arc, spirit animal, and more through an immersive cosmic experience.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <button
              id="enter-universe-btn"
              onClick={handleEnter}
              disabled={isPortalOpen}
              className="btn-cosmic text-lg md:text-xl px-10 py-4 animate-pulse-glow"
            >
              {isPortalOpen ? '✦ Opening Portal...' : '✦ Enter The Universe'}
            </button>
          </motion.div>

          {/* Feature tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="mt-12 flex flex-wrap justify-center gap-3"
          >
            {['AI Personality', 'Hero Identity', 'Villain Arc', 'Spirit Animal', 'Anime Match'].map(
              (tag) => (
                <span
                  key={tag}
                  className="glass-subtle px-4 py-1.5 text-xs tracking-wider uppercase"
                  style={{ color: 'var(--color-stellar-cyan)' }}
                >
                  {tag}
                </span>
              )
            )}
          </motion.div>
        </motion.div>

        {/* Bottom version text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-6 text-xs tracking-widest"
          style={{ color: 'var(--color-twilight)' }}
        >
          PERSONAVERSE v1.0 — Powered by Gemini AI
        </motion.p>
      </div>
    </div>
  );
}
