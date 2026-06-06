'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useQuizStore } from '@/store/quizStore';
import { useGameStore } from '@/store/gameStore';
import type { PersonalityResult } from '@/types';
import PersonalityCard from '@/components/results/PersonalityCard';
import HeroCard from '@/components/results/HeroCard';
import VillainCard from '@/components/results/VillainCard';
import AnimeCard from '@/components/results/AnimeCard';
import SpiritAnimalCard from '@/components/results/SpiritAnimalCard';
import ShareButton from '@/components/results/ShareButton';

const CosmicScene = dynamic(() => import('@/components/three/CosmicScene'), { ssr: false });
const StarField = dynamic(() => import('@/components/three/StarField'), { ssr: false });

export default function ResultsPage() {
  const router = useRouter();
  const { isComplete, scores, answers, selectedPlanet, resetQuiz } = useQuizStore();
  const { savePersonalityResult } = useGameStore();
  const [result, setResult] = useState<PersonalityResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isComplete || !selectedPlanet) {
      router.push('/universe');
      return;
    }

    const fetchResults = async () => {
      try {
        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ scores, answers, planet: selectedPlanet }),
        });
        if (!res.ok) throw new Error('Analysis failed');
        const data: PersonalityResult = await res.json();
        setResult(data);
        savePersonalityResult(data);
      } catch (err) {
        setError('Failed to analyze. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [isComplete, selectedPlanet, scores, answers, router, savePersonalityResult]);

  if (loading) {
    return (
      <div className="page-container flex items-center justify-center">
        <div className="scene-background">
          <CosmicScene><StarField /></CosmicScene>
        </div>
        <div className="content-overlay text-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 mx-auto mb-8 rounded-full"
            style={{
              background: 'radial-gradient(circle, var(--color-stellar-cyan), var(--color-nebula), var(--color-void))',
              boxShadow: '0 0 80px rgba(0, 212, 255, 0.4), 0 0 120px rgba(45, 27, 105, 0.3)',
            }}
          />
          <h2 className="text-2xl md:text-4xl font-bold gradient-text-cosmic mb-3">
            Scanning the Cosmos...
          </h2>
          <p style={{ color: 'var(--color-mist)' }}>Analyzing your unique personality signature</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="page-container flex items-center justify-center">
        <div className="content-overlay text-center">
          <p className="text-xl mb-4" style={{ color: 'var(--color-crimson)' }}>{error || 'Something went wrong'}</p>
          <button onClick={() => { resetQuiz(); router.push('/universe'); }} className="btn-cosmic">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="scene-background">
        <CosmicScene><StarField /></CosmicScene>
      </div>

      <div className="content-overlay min-h-screen px-4 py-8 max-w-3xl mx-auto">
        {/* Reveal header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--color-mist)' }}>
            ✦ THE COSMOS HAS SPOKEN ✦
          </p>
          <h1 className="text-3xl md:text-5xl font-black gradient-text-cosmic">
            Your Universe Revealed
          </h1>
        </motion.div>

        {/* Result cards */}
        <PersonalityCard result={result} />
        <HeroCard result={result} />
        <VillainCard result={result} />
        <AnimeCard result={result} />
        <SpiritAnimalCard result={result} />

        {/* Famous Match */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong p-8 mb-8 text-center"
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--color-solar-gold)' }}>
            ⭐ FAMOUS CHARACTER MATCH
          </p>
          <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-ghost-white)' }}>
            {result.famousMatch.name}
          </h3>
          <p className="text-sm" style={{ color: 'var(--color-mist)' }}>{result.famousMatch.reason}</p>
          <ShareButton title={result.famousMatch.name} text={`I match ${result.famousMatch.name}!`} />
        </motion.section>

        {/* Best Friend & Future Self */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-6"
          >
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--color-stellar-cyan)' }}>
              🤝 Best Friend Match
            </p>
            <p className="text-sm" style={{ color: 'var(--color-ghost-white)' }}>{result.bestFriendMatch}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-6"
          >
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--color-aurora-green)' }}>
              🔮 Future Self
            </p>
            <p className="text-sm" style={{ color: 'var(--color-ghost-white)' }}>{result.futureSelf}</p>
          </motion.div>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-12"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => { resetQuiz(); router.push('/universe'); }} className="btn-cosmic">
              ✦ Explore Another Path
            </button>
            <button onClick={() => router.push('/daily')} className="btn-cosmic" style={{ background: 'linear-gradient(135deg, #1a0533, #2d1b69)' }}>
              ⭐ Daily Challenge
            </button>
            <button onClick={() => router.push('/')} className="glass-subtle px-6 py-3 rounded-full text-sm cursor-pointer" style={{ color: 'var(--color-mist)' }}>
              🏠 Home
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
