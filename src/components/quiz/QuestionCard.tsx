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
      initial={{ opacity: 0, x: 60, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -60, scale: 0.95 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="glass-strong p-6 md:p-10 max-w-2xl w-full mx-auto"
    >
      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-6">
        {Array.from({ length: totalQuestions }).map((_, i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{
              background: i < questionNumber
                ? 'var(--color-stellar-cyan)'
                : i === questionNumber - 1
                ? 'var(--color-nebula-pink)'
                : 'rgba(255,255,255,0.15)',
              boxShadow: i === questionNumber - 1 ? '0 0 8px var(--color-nebula-pink)' : 'none',
            }}
          />
        ))}
      </div>

      {/* Question number */}
      <p className="text-xs tracking-widest uppercase mb-3 text-center" style={{ color: 'var(--color-twilight)' }}>
        Question {questionNumber} of {totalQuestions}
      </p>

      {/* Scenario */}
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-8 leading-relaxed" style={{ color: 'var(--color-ghost-white)' }}>
        {question.scenario}
      </h2>

      {/* Options */}
      <div className="grid gap-3">
        {question.options.map((option, i) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            onClick={() => onAnswer(option.id)}
            className="w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 cursor-pointer group"
            style={{
              background: 'rgba(15, 15, 35, 0.4)',
              borderColor: 'rgba(255, 255, 255, 0.08)',
            }}
            whileHover={{
              scale: 1.02,
              borderColor: 'rgba(0, 212, 255, 0.4)',
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.15)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-2xl mr-3">{option.emoji}</span>
            <span className="text-sm md:text-base" style={{ color: 'var(--color-ghost-white)' }}>
              {option.text}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
