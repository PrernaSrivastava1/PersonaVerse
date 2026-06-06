'use client';

import { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useQuizStore } from '@/store/quizStore';
import QuestionCard from '@/components/quiz/QuestionCard';

const CosmicScene = dynamic(() => import('@/components/three/CosmicScene'), { ssr: false });
const StarField = dynamic(() => import('@/components/three/StarField'), { ssr: false });

export default function QuizPage() {
  const router = useRouter();
  const { selectedPlanet, currentQuestionIndex, isComplete, questions, answerQuestion, nextQuestion, getCurrentQuestion } = useQuizStore();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!selectedPlanet) router.push('/universe');
  }, [selectedPlanet, router]);

  useEffect(() => {
    if (isComplete) {
      setIsTransitioning(true);
      setTimeout(() => router.push('/results'), 2000);
    }
  }, [isComplete, router]);

  const question = getCurrentQuestion();
  const progress = questions.length > 0 ? (currentQuestionIndex / questions.length) * 100 : 0;

  const handleAnswer = useCallback(
    (optionId: string) => {
      if (!question) return;
      const option = question.options.find((o) => o.id === optionId);
      if (!option) return;
      answerQuestion(question.id, optionId, option.scores);
      setTimeout(() => nextQuestion(), 500);
    },
    [question, answerQuestion, nextQuestion]
  );

  if (!selectedPlanet) return null;

  if (isComplete || isTransitioning) {
    return (
      <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="scene-background"><CosmicScene><StarField /></CosmicScene></div>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="content-overlay" style={{ textAlign: 'center' }}>
          <div style={{
            width: 80, height: 80, margin: '0 auto 1.5rem', borderRadius: '50%',
            background: 'radial-gradient(circle, #FFD700, #1A1A14)',
            boxShadow: '0 0 60px rgba(255, 215, 0, 0.4), 0 0 120px rgba(26, 26, 20, 0.3)',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }} />
          <h2 className="gradient-text-cosmic" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, marginBottom: '0.75rem' }}>
            Analyzing Your Universe...
          </h2>
          <p style={{ color: '#A89968' }}>The cosmos is reading your soul</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="scene-background"><CosmicScene><StarField /></CosmicScene></div>
      <div className="content-overlay" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '1.5rem 1rem' }}>
        {/* Progress bar */}
        <div style={{ maxWidth: 640, width: '100%', margin: '0 auto 2rem' }}>
          <div className="glass-subtle" style={{ height: 6, borderRadius: 3, overflow: 'hidden' }}>
            <motion.div
              style={{ height: '100%', borderRadius: 3, background: 'linear-gradient(90deg, #FFD700, #E6A817)' }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            {question && (
              <QuestionCard key={question.id} question={question} onAnswer={handleAnswer} questionNumber={currentQuestionIndex + 1} totalQuestions={questions.length} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
