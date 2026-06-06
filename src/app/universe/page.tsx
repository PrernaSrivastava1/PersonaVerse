'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useQuizStore } from '@/store/quizStore';
import type { PlanetPath } from '@/types';

const CosmicScene = dynamic(() => import('@/components/three/CosmicScene'), { ssr: false });
const StarField = dynamic(() => import('@/components/three/StarField'), { ssr: false });
const ParticleField = dynamic(() => import('@/components/three/ParticleField'), { ssr: false });
const Planet = dynamic(() => import('@/components/three/Planet'), { ssr: false });

const PLANETS: { key: PlanetPath; title: string; desc: string; color: string }[] = [
  { key: 'mind', title: '🧠 Planet of Mind', desc: 'Logic, strategy & intellectual puzzles', color: '#00d4ff' },
  { key: 'emotion', title: '❤️ Planet of Emotion', desc: 'Feelings, relationships & empathy', color: '#ff6b9d' },
  { key: 'chaos', title: '🔥 Planet of Chaos', desc: 'Adventure, risk & wild scenarios', color: '#ff8c42' },
];

export default function UniversePage() {
  const router = useRouter();
  const selectPlanet = useQuizStore((s) => s.selectPlanet);
  const [selected, setSelected] = useState<PlanetPath | null>(null);

  const handlePlanetClick = (planet: PlanetPath) => {
    if (selected) return;
    setSelected(planet);
    selectPlanet(planet);
    setTimeout(() => router.push('/quiz'), 1200);
  };

  return (
    <div className="page-container">
      <div className="scene-background">
        <CosmicScene>
          <StarField />
          <ParticleField count={300} radius={10} />
          <Planet type="mind" position={[-3, 1.2, 0]} onClick={() => handlePlanetClick('mind')} isSelected={selected === 'mind'} />
          <Planet type="emotion" position={[3, 1.2, 0]} onClick={() => handlePlanetClick('emotion')} isSelected={selected === 'emotion'} />
          <Planet type="chaos" position={[0, -1.5, 0]} onClick={() => handlePlanetClick('chaos')} isSelected={selected === 'chaos'} />
        </CosmicScene>
      </div>

      <div className="content-overlay" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 1rem' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass"
          style={{ padding: '1.25rem 2rem', marginBottom: '2rem', textAlign: 'center', pointerEvents: 'auto' }}
        >
          <h1 className="gradient-text-cosmic" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 800, marginBottom: '0.25rem' }}>
            Choose Your Path
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#b8b5c9' }}>
            Each planet reveals different facets of your personality
          </p>
        </motion.div>

        {/* Planet cards at bottom */}
        <div style={{ marginTop: 'auto', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', pointerEvents: 'auto' }}>
          {PLANETS.map(({ key, title, desc, color }, i) => (
            <motion.button
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
              onClick={() => handlePlanetClick(key)}
              className={selected === key ? 'glass glow-cyan' : 'glass-subtle'}
              style={{
                padding: '1.25rem 1.5rem', textAlign: 'center', cursor: 'pointer',
                maxWidth: 200, transition: 'all 0.3s ease', border: 'none',
                transform: selected === key ? 'scale(1.05)' : undefined,
              }}
            >
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.35rem', color: selected === key ? color : '#e8e6f0' }}>
                {title}
              </h3>
              <p style={{ fontSize: '0.72rem', color: '#6b6880', lineHeight: 1.4 }}>{desc}</p>
            </motion.button>
          ))}
        </div>

        {selected && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', fontSize: '1.05rem', marginBottom: '1.5rem', color: '#00d4ff' }}>
            ✦ Entering {PLANETS.find(p => p.key === selected)?.title}...
          </motion.p>
        )}
      </div>
    </div>
  );
}
