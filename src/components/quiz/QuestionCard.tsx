'use client';

import { motion } from 'framer-motion';
import type { QuizQuestion } from '@/types';

interface QuestionCardProps {
  question: QuizQuestion;
  onAnswer: (optionId: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export default function QuestionCard({ question, onAnswer, questionNumber, totalQuestions }: QuestionCardProps) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 50, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -50, scale: 0.97 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="glass-strong"
      style={{ padding: '2rem 2rem', maxWidth: 640, width: '100%', margin: '0 auto' }}
    >
      {/* Progress dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: '1.25rem' }}>
        {Array.from({ length: totalQuestions }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 8, height: 8, borderRadius: '50%',
              transition: 'all 0.3s',
              background: i < questionNumber ? '#00d4ff' : i === questionNumber - 1 ? '#ff6b9d' : 'rgba(255,255,255,0.12)',
              boxShadow: i === questionNumber - 1 ? '0 0 8px #ff6b9d' : 'none',
            }}
          />
        ))}
      </div>

      {/* Question number */}
      <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem', textAlign: 'center', color: '#6b6880' }}>
        Question {questionNumber} of {totalQuestions}
      </p>

      {/* Scenario */}
      <h2 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.35rem)', fontWeight: 600, textAlign: 'center', marginBottom: '2rem', lineHeight: 1.5, color: '#e8e6f0' }}>
        {question.scenario}
      </h2>

      {/* Options */}
      <div style={{ display: 'grid', gap: '0.65rem' }}>
        {question.options.map((option, i) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.06 }}
            onClick={() => onAnswer(option.id)}
            whileHover={{ scale: 1.015, boxShadow: '0 0 20px rgba(0, 212, 255, 0.12)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%', textAlign: 'left',
              padding: '0.9rem 1.25rem', borderRadius: '0.75rem',
              background: 'rgba(15, 15, 35, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              cursor: 'pointer', transition: 'all 0.2s',
              color: '#e8e6f0', fontSize: '0.9rem',
              display: 'flex', alignItems: 'center', gap: '0.65rem',
              fontFamily: 'inherit',
            }}
          >
            <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{option.emoji}</span>
            <span>{option.text}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
