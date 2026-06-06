// ============================================
// PersonaVerse Type Definitions
// ============================================

// --- Quiz Types ---

export type PlanetPath = 'mind' | 'emotion' | 'chaos';

export interface QuizOption {
  id: string;
  emoji: string;
  text: string;
  scores: PersonalityScores;
}

export interface QuizQuestion {
  id: string;
  scenario: string;
  description?: string;
  options: QuizOption[];
  planet: PlanetPath;
}

export interface PersonalityScores {
  extroversion: number;    // -1 to 1 (introversion to extroversion)
  thinking: number;        // -1 to 1 (feeling to thinking)
  order: number;           // -1 to 1 (chaos to order)
  action: number;          // -1 to 1 (observation to action)
  creativity: number;      // -1 to 1 (logic to creativity)
}

export interface QuizState {
  selectedPlanet: PlanetPath | null;
  currentQuestionIndex: number;
  answers: { questionId: string; optionId: string }[];
  scores: PersonalityScores;
  isComplete: boolean;
}

// --- Personality Result Types ---

export interface PersonalityResult {
  archetype: string;
  story: string;
  strengths: string[];
  weaknesses: string[];
  dreamCareer: string;
  leadershipStyle: string;
  learningStyle: string;
  hiddenTrait: string;
  famousMatch: {
    name: string;
    reason: string;
  };
  animeMatch: {
    character: string;
    series: string;
    reason: string;
  };
  spiritAnimal: {
    animal: string;
    emoji: string;
    reason: string;
  };
  heroIdentity: {
    name: string;
    powers: string[];
    backstory: string;
  };
  villainIdentity: {
    name: string;
    methods: string[];
    backstory: string;
  };
  bestFriendMatch: string;
  futureSelf: string;
  villainArc: string;
  colorTheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

// --- Gamification Types ---

export type LevelName = 'Dreamer' | 'Explorer' | 'Thinker' | 'Strategist' | 'Architect' | 'Mastermind' | 'Legend';

export interface LevelInfo {
  level: number;
  name: LevelName;
  minXP: number;
  maxXP: number;
}

export const LEVELS: LevelInfo[] = [
  { level: 1, name: 'Dreamer', minXP: 0, maxXP: 99 },
  { level: 2, name: 'Explorer', minXP: 100, maxXP: 299 },
  { level: 3, name: 'Thinker', minXP: 300, maxXP: 599 },
  { level: 4, name: 'Strategist', minXP: 600, maxXP: 999 },
  { level: 5, name: 'Architect', minXP: 1000, maxXP: 1499 },
  { level: 6, name: 'Mastermind', minXP: 1500, maxXP: 2499 },
  { level: 7, name: 'Legend', minXP: 2500, maxXP: Infinity },
];

export type XPEventType = 'quiz_complete' | 'trait_discover' | 'daily_visit' | 'personality_unlock' | 'share_result';

export const XP_VALUES: Record<XPEventType, number> = {
  quiz_complete: 50,
  trait_discover: 20,
  daily_visit: 10,
  personality_unlock: 100,
  share_result: 15,
};

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface GameState {
  xp: number;
  level: number;
  levelName: LevelName;
  achievements: Achievement[];
  streak: number;
  lastVisit: string | null;
  personalityResults: PersonalityResult[];
}

// --- Daily Challenge Types ---

export type MoodType = '😊' | '😐' | '😴' | '🔥' | '💀';

export interface DailyChallenge {
  question: string;
  options: string[];
  date: string;
}

export interface DailyResponse {
  challengeDate: string;
  mood: MoodType;
  moodInsight: string;
  fortune: string;
  challengeAnswer?: string;
}

// --- User Profile Types ---

export interface UserProfile {
  id: string;
  displayName: string;
  createdAt: string;
  gameState: GameState;
  latestResult?: PersonalityResult;
}
