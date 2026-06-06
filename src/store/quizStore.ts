'use client';

import { create } from 'zustand';
import type { PlanetPath, PersonalityScores, QuizQuestion } from '@/types';
import { getQuestionsForPlanet } from '@/lib/questions';

interface QuizStore {
  selectedPlanet: PlanetPath | null;
  currentQuestionIndex: number;
  answers: { questionId: string; optionId: string }[];
  scores: PersonalityScores;
  isComplete: boolean;
  questions: QuizQuestion[];

  selectPlanet: (planet: PlanetPath) => void;
  answerQuestion: (questionId: string, optionId: string, optionScores: PersonalityScores) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
  getCurrentQuestion: () => QuizQuestion | null;
}

const initialScores: PersonalityScores = {
  extroversion: 0,
  thinking: 0,
  order: 0,
  action: 0,
  creativity: 0,
};

export const useQuizStore = create<QuizStore>((set, get) => ({
  selectedPlanet: null,
  currentQuestionIndex: 0,
  answers: [],
  scores: { ...initialScores },
  isComplete: false,
  questions: [],

  selectPlanet: (planet) => {
    const questions = getQuestionsForPlanet(planet);
    set({
      selectedPlanet: planet,
      questions,
      currentQuestionIndex: 0,
      answers: [],
      scores: { ...initialScores },
      isComplete: false,
    });
  },

  answerQuestion: (questionId, optionId, optionScores) => {
    const state = get();
    const newScores = { ...state.scores };
    (Object.keys(optionScores) as (keyof PersonalityScores)[]).forEach((key) => {
      newScores[key] += optionScores[key];
    });
    set({
      answers: [...state.answers, { questionId, optionId }],
      scores: newScores,
    });
  },

  nextQuestion: () => {
    const state = get();
    const nextIndex = state.currentQuestionIndex + 1;
    if (nextIndex >= state.questions.length) {
      set({ isComplete: true, currentQuestionIndex: nextIndex });
    } else {
      set({ currentQuestionIndex: nextIndex });
    }
  },

  getCurrentQuestion: () => {
    const state = get();
    return state.questions[state.currentQuestionIndex] || null;
  },

  resetQuiz: () => {
    set({
      selectedPlanet: null,
      currentQuestionIndex: 0,
      answers: [],
      scores: { ...initialScores },
      isComplete: false,
      questions: [],
    });
  },
}));
