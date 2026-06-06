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
    if (!isComplete || !selectedPlanet) { router.push('/universe'); return; }
    const fetchResults = async () => {
      try {
        const res = await fetch('/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ scores, answers, planet: selectedPlanet }) });
        if (!res.ok) throw new Error('Analysis failed');
        const data: PersonalityResult = await res.json();
        setResult(data);
        savePersonalityResult(data);
      } catch (err) { setError('Failed to analyze. Please try again.'); console.error(err); }
      finally { setLoading(false); }
    };
    fetchResults();
  }, [isComplete, selectedPlanet, scores, answers, router, savePersonalityResult]);

  if (loading) {
    return (
      <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="scene-background"><CosmicScene><StarField /></CosmicScene></div>
        <div className="content-overlay" style={{ textAlign: 'center' }}>
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 96, height: 96, margin: '0 auto 2rem', borderRadius: '50%', background: 'radial-gradient(circle, #FFD700, #1A1A14, #0A0A0A)', boxShadow: '0 0 80px rgba(255, 215, 0, 0.4)' }} />
          <h2 className="gradient-text-cosmic" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: '0.75rem' }}>Scanning the Cosmos...</h2>
          <p style={{ color: '#A89968' }}>Analyzing your unique personality signature</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="content-overlay" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#FF3B3B' }}>{error || 'Something went wrong'}</p>
          <button onClick={() => { resetQuiz(); router.push('/universe'); }} className="btn-cosmic">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="scene-background"><CosmicScene><StarField /></CosmicScene></div>
      <div className="content-overlay" style={{ minHeight: '100vh', padding: '2rem 1rem', maxWidth: 740, margin: '0 auto' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.75rem', color: '#A89968' }}>✦ THE COSMOS HAS SPOKEN ✦</p>
          <h1 className="gradient-text-cosmic" style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', fontWeight: 900 }}>Your Universe Revealed</h1>
        </motion.div>

        <PersonalityCard result={result} />
        <HeroCard result={result} />
        <VillainCard result={result} />
        <AnimeCard result={result} />
        <SpiritAnimalCard result={result} />

        {/* Famous Match */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-strong" style={{ padding: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.5rem', color: '#FFE55C' }}>⭐ FAMOUS CHARACTER MATCH</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#F5F0E1' }}>{result.famousMatch.name}</h3>
          <p style={{ fontSize: '0.85rem', color: '#A89968' }}>{result.famousMatch.reason}</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}><ShareButton title={result.famousMatch.name} text={`I match ${result.famousMatch.name}!`} /></div>
        </motion.section>

        {/* Best Friend & Future Self */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass" style={{ padding: '1.5rem' }}>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem', color: '#FFD700' }}>🤝 Best Friend Match</p>
            <p style={{ fontSize: '0.85rem', color: '#F5F0E1' }}>{result.bestFriendMatch}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass" style={{ padding: '1.5rem' }}>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem', color: '#7FCC3E' }}>🔮 Future Self</p>
            <p style={{ fontSize: '0.85rem', color: '#F5F0E1' }}>{result.futureSelf}</p>
          </motion.div>
        </div>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ textAlign: 'center', padding: '3rem 0' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
            <button onClick={() => { resetQuiz(); router.push('/universe'); }} className="btn-cosmic">✦ Explore Another Path</button>
            <button onClick={() => router.push('/daily')} className="btn-cosmic" style={{ background: 'linear-gradient(135deg, #1A1A14, #2A2510)' }}>⭐ Daily Challenge</button>
            <button onClick={() => router.push('/')} className="glass-subtle" style={{ padding: '0.75rem 1.5rem', borderRadius: 9999, cursor: 'pointer', color: '#A89968', fontSize: '0.85rem', border: 'none', fontFamily: 'inherit' }}>🏠 Home</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
