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
  const {
    selectedPlanet,
    currentQuestionIndex,
    isComplete,
    questions,
    answerQuestion,
    nextQuestion,
    getCurrentQuestion,
  } = useQuizStore();

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!selectedPlanet) {
      router.push('/universe');
    }
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
      <div className="page-container flex items-center justify-center">
        <div className="scene-background">
          <CosmicScene>
            <StarField />
          </CosmicScene>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="content-overlay text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full animate-pulse-glow"
            style={{
              background: 'radial-gradient(circle, var(--color-stellar-cyan), var(--color-nebula))',
              boxShadow: '0 0 60px rgba(0, 212, 255, 0.4)',
            }}
          />
          <h2 className="text-2xl md:text-4xl font-bold gradient-text-cosmic mb-3">
            Analyzing Your Universe...
          </h2>
          <p style={{ color: 'var(--color-mist)' }}>The cosmos is reading your soul</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="scene-background">
        <CosmicScene>
          <StarField />
        </CosmicScene>
      </div>

      <div className="content-overlay min-h-screen flex flex-col px-4 py-6">
        {/* Progress bar */}
        <div className="w-full max-w-2xl mx-auto mb-8">
          <div className="glass-subtle h-2 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, var(--color-stellar-cyan), var(--color-nebula-pink))',
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {question && (
              <QuestionCard
                key={question.id}
                question={question}
                onAnswer={handleAnswer}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={questions.length}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
