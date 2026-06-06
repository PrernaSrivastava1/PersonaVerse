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

const PLANET_DESCRIPTIONS: Record<PlanetPath, { title: string; desc: string }> = {
  mind: { title: 'Planet of Mind 🧠', desc: 'Logic, strategy, and intellectual puzzles' },
  emotion: { title: 'Planet of Emotion ❤️', desc: 'Feelings, relationships, and empathy' },
  chaos: { title: 'Planet of Chaos 🔥', desc: 'Adventure, risk, and wild scenarios' },
};

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
      {/* 3D Background */}
      <div className="scene-background">
        <CosmicScene>
          <StarField />
          <ParticleField count={300} radius={10} />
          <Planet
            type="mind"
            position={[-3, 1.2, 0]}
            onClick={() => handlePlanetClick('mind')}
            isSelected={selected === 'mind'}
          />
          <Planet
            type="emotion"
            position={[3, 1.2, 0]}
            onClick={() => handlePlanetClick('emotion')}
            isSelected={selected === 'emotion'}
          />
          <Planet
            type="chaos"
            position={[0, -1.5, 0]}
            onClick={() => handlePlanetClick('chaos')}
            isSelected={selected === 'chaos'}
          />
        </CosmicScene>
      </div>

      {/* Overlay */}
      <div className="content-overlay min-h-screen flex flex-col items-center pt-12 px-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass px-8 py-5 mb-8 text-center pointer-events-auto"
        >
          <h1 className="text-3xl md:text-5xl font-bold gradient-text-cosmic mb-2">
            Choose Your Path
          </h1>
          <p className="text-sm md:text-base" style={{ color: 'var(--color-mist)' }}>
            Each planet reveals different facets of your personality
          </p>
        </motion.div>

        {/* Planet descriptions */}
        <div className="flex flex-wrap justify-center gap-4 mt-auto mb-12 pointer-events-auto">
          {(Object.entries(PLANET_DESCRIPTIONS) as [PlanetPath, { title: string; desc: string }][]).map(
            ([key, { title, desc }], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.2, duration: 0.6 }}
                className={`glass-subtle px-6 py-4 text-center cursor-pointer transition-all duration-300 max-w-[200px] ${
                  selected === key ? 'glow-cyan scale-105' : 'hover:scale-105'
                }`}
                onClick={() => handlePlanetClick(key)}
              >
                <h3 className="text-base font-semibold mb-1">{title}</h3>
                <p className="text-xs" style={{ color: 'var(--color-twilight)' }}>{desc}</p>
              </motion.div>
            )
          )}
        </div>

        {selected && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-lg mb-8 text-glow-cyan"
            style={{ color: 'var(--color-stellar-cyan)' }}
          >
            ✦ Entering {PLANET_DESCRIPTIONS[selected].title}...
          </motion.p>
        )}
      </div>
    </div>
  );
}
