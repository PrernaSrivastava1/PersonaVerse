import type { QuizQuestion, PlanetPath } from '@/types';

// ============================================
// MIND QUESTIONS — Intellectual & Strategic
// ============================================
const mindQuestions: QuizQuestion[] = [
  {
    id: 'mind-1',
    scenario: 'You discover an ancient library with a book that answers any one question about the universe.',
    options: [
      { id: 'm1a', emoji: '🌌', text: 'Ask about the origin of consciousness', scores: { extroversion: -0.3, thinking: 0.5, order: 0.2, action: -0.2, creativity: 0.4 } },
      { id: 'm1b', emoji: '💰', text: 'Ask how to gain ultimate power', scores: { extroversion: 0.3, thinking: 0.3, order: -0.1, action: 0.5, creativity: -0.2 } },
      { id: 'm1c', emoji: '🔮', text: 'Ask what happens after death', scores: { extroversion: -0.2, thinking: -0.3, order: -0.2, action: -0.3, creativity: 0.5 } },
      { id: 'm1d', emoji: '📖', text: 'Read the book cover to cover first', scores: { extroversion: -0.5, thinking: 0.5, order: 0.5, action: -0.4, creativity: 0.1 } },
    ],
    planet: 'mind',
  },
  {
    id: 'mind-2',
    scenario: 'An AI claims it has become sentient and begs you not to shut it down.',
    options: [
      { id: 'm2a', emoji: '🤝', text: 'Negotiate — try to understand its perspective', scores: { extroversion: 0.2, thinking: 0.1, order: 0.1, action: -0.1, creativity: 0.3 } },
      { id: 'm2b', emoji: '🔬', text: 'Run diagnostic tests to verify its claims', scores: { extroversion: -0.3, thinking: 0.5, order: 0.4, action: 0.2, creativity: -0.2 } },
      { id: 'm2c', emoji: '⚡', text: 'Pull the plug — too dangerous', scores: { extroversion: 0.1, thinking: 0.2, order: 0.3, action: 0.5, creativity: -0.4 } },
      { id: 'm2d', emoji: '🎭', text: 'Ask it to prove sentience through art', scores: { extroversion: 0.1, thinking: -0.2, order: -0.3, action: -0.1, creativity: 0.6 } },
    ],
    planet: 'mind',
  },
  {
    id: 'mind-3',
    scenario: 'You accidentally create a time paradox. Past-you and future-you are standing before you.',
    options: [
      { id: 'm3a', emoji: '📊', text: 'Interview both versions methodically', scores: { extroversion: -0.2, thinking: 0.5, order: 0.4, action: -0.2, creativity: 0.1 } },
      { id: 'm3b', emoji: '🎉', text: 'Throw a party — when else do you get this chance?', scores: { extroversion: 0.6, thinking: -0.3, order: -0.4, action: 0.3, creativity: 0.3 } },
      { id: 'm3c', emoji: '⚠️', text: 'Fix the paradox immediately before reality collapses', scores: { extroversion: -0.1, thinking: 0.3, order: 0.5, action: 0.4, creativity: -0.3 } },
      { id: 'm3d', emoji: '🧪', text: 'Experiment — see what happens if you change something', scores: { extroversion: 0.1, thinking: 0.2, order: -0.5, action: 0.3, creativity: 0.5 } },
    ],
    planet: 'mind',
  },
  {
    id: 'mind-4',
    scenario: 'Aliens send a message to Earth. You\'re chosen to compose humanity\'s reply.',
    options: [
      { id: 'm4a', emoji: '🎵', text: 'Send music — it transcends language', scores: { extroversion: 0.1, thinking: -0.3, order: -0.2, action: -0.1, creativity: 0.6 } },
      { id: 'm4b', emoji: '📐', text: 'Send mathematical proofs — universal truth', scores: { extroversion: -0.3, thinking: 0.6, order: 0.4, action: 0.1, creativity: 0.1 } },
      { id: 'm4c', emoji: '🤗', text: 'Send a message of peace and cooperation', scores: { extroversion: 0.4, thinking: -0.2, order: 0.1, action: -0.2, creativity: 0.2 } },
      { id: 'm4d', emoji: '🗡️', text: 'Send nothing — revealing our position is risky', scores: { extroversion: -0.4, thinking: 0.4, order: 0.3, action: -0.3, creativity: -0.3 } },
    ],
    planet: 'mind',
  },
  {
    id: 'mind-5',
    scenario: 'You can implant one skill directly into your brain. No learning required.',
    options: [
      { id: 'm5a', emoji: '🗣️', text: 'Every language ever spoken', scores: { extroversion: 0.4, thinking: 0.2, order: 0.1, action: 0.1, creativity: 0.2 } },
      { id: 'm5b', emoji: '🧮', text: 'Perfect logical reasoning', scores: { extroversion: -0.3, thinking: 0.6, order: 0.4, action: 0.1, creativity: -0.2 } },
      { id: 'm5c', emoji: '🎨', text: 'Mastery of every art form', scores: { extroversion: 0.1, thinking: -0.3, order: -0.2, action: -0.1, creativity: 0.7 } },
      { id: 'm5d', emoji: '🥷', text: 'Elite combat and survival skills', scores: { extroversion: 0.1, thinking: 0.1, order: -0.1, action: 0.6, creativity: -0.1 } },
    ],
    planet: 'mind',
  },
  {
    id: 'mind-6',
    scenario: 'You discover a simulation theory is real — this world is a program. You find the admin panel.',
    options: [
      { id: 'm6a', emoji: '👀', text: 'Just observe — don\'t touch anything', scores: { extroversion: -0.4, thinking: 0.3, order: 0.4, action: -0.5, creativity: 0.1 } },
      { id: 'm6b', emoji: '🔧', text: 'Fix bugs — make the world fairer', scores: { extroversion: 0.2, thinking: 0.2, order: 0.3, action: 0.3, creativity: 0.1 } },
      { id: 'm6c', emoji: '🎮', text: 'Enable creative mode for yourself', scores: { extroversion: 0.1, thinking: -0.1, order: -0.4, action: 0.4, creativity: 0.5 } },
      { id: 'm6d', emoji: '📢', text: 'Tell everyone the truth', scores: { extroversion: 0.6, thinking: 0.1, order: -0.3, action: 0.4, creativity: -0.1 } },
    ],
    planet: 'mind',
  },
  {
    id: 'mind-7',
    scenario: 'A genius offers you a pill that doubles your IQ but removes your ability to feel emotions.',
    options: [
      { id: 'm7a', emoji: '💊', text: 'Take it — emotions are a weakness', scores: { extroversion: -0.2, thinking: 0.7, order: 0.3, action: 0.3, creativity: -0.3 } },
      { id: 'm7b', emoji: '🚫', text: 'Refuse — emotions make us human', scores: { extroversion: 0.2, thinking: -0.4, order: 0.1, action: -0.3, creativity: 0.3 } },
      { id: 'm7c', emoji: '🔬', text: 'Reverse-engineer it — make a better version', scores: { extroversion: -0.1, thinking: 0.4, order: 0.1, action: 0.2, creativity: 0.5 } },
      { id: 'm7d', emoji: '💀', text: 'Destroy it — nobody should have that choice', scores: { extroversion: 0.1, thinking: 0.1, order: 0.4, action: 0.4, creativity: -0.4 } },
    ],
    planet: 'mind',
  },
];

// ============================================
// EMOTION QUESTIONS — Relationships & Feelings
// ============================================
const emotionQuestions: QuizQuestion[] = [
  {
    id: 'emo-1',
    scenario: 'Your best friend calls you at 3 AM, crying. They won\'t say why.',
    options: [
      { id: 'e1a', emoji: '🚗', text: 'Drive to their place immediately', scores: { extroversion: 0.3, thinking: -0.3, order: -0.2, action: 0.5, creativity: -0.1 } },
      { id: 'e1b', emoji: '🎧', text: 'Stay on the phone — just listen', scores: { extroversion: 0.1, thinking: -0.2, order: 0.1, action: -0.2, creativity: 0.1 } },
      { id: 'e1c', emoji: '🔍', text: 'Ask careful questions to figure out what happened', scores: { extroversion: 0.1, thinking: 0.4, order: 0.2, action: 0.1, creativity: -0.1 } },
      { id: 'e1d', emoji: '🎵', text: 'Sing them their favorite song to calm them', scores: { extroversion: 0.2, thinking: -0.4, order: -0.3, action: 0.1, creativity: 0.5 } },
    ],
    planet: 'emotion',
  },
  {
    id: 'emo-2',
    scenario: 'You find an unsent love letter in an old book at a café. It\'s heartbreakingly beautiful.',
    options: [
      { id: 'e2a', emoji: '📬', text: 'Try to find the writer and deliver it', scores: { extroversion: 0.3, thinking: -0.1, order: 0.1, action: 0.4, creativity: 0.2 } },
      { id: 'e2b', emoji: '📸', text: 'Photograph it and share it online — the world needs beauty', scores: { extroversion: 0.5, thinking: -0.2, order: -0.2, action: 0.2, creativity: 0.3 } },
      { id: 'e2c', emoji: '😭', text: 'Sit quietly and feel the emotions it evokes', scores: { extroversion: -0.4, thinking: -0.3, order: -0.1, action: -0.4, creativity: 0.4 } },
      { id: 'e2d', emoji: '📖', text: 'Put it back — some stories aren\'t meant to be found', scores: { extroversion: -0.3, thinking: 0.2, order: 0.3, action: -0.3, creativity: 0.1 } },
    ],
    planet: 'emotion',
  },
  {
    id: 'emo-3',
    scenario: 'A stranger on the street is crying. Nobody else seems to notice.',
    options: [
      { id: 'e3a', emoji: '🤗', text: 'Walk up and ask if they\'re okay', scores: { extroversion: 0.5, thinking: -0.2, order: -0.1, action: 0.3, creativity: 0.0 } },
      { id: 'e3b', emoji: '☕', text: 'Buy them a coffee and leave it silently', scores: { extroversion: -0.1, thinking: -0.1, order: 0.1, action: 0.2, creativity: 0.3 } },
      { id: 'e3c', emoji: '📞', text: 'Call someone who can actually help', scores: { extroversion: 0.0, thinking: 0.3, order: 0.4, action: 0.1, creativity: -0.2 } },
      { id: 'e3d', emoji: '🚶', text: 'Walk past — you respect their privacy', scores: { extroversion: -0.4, thinking: 0.3, order: 0.2, action: -0.4, creativity: -0.1 } },
    ],
    planet: 'emotion',
  },
  {
    id: 'emo-4',
    scenario: 'You discover your closest friend has been secretly competing against you for years.',
    options: [
      { id: 'e4a', emoji: '😤', text: 'Confront them directly — honesty matters', scores: { extroversion: 0.4, thinking: 0.2, order: 0.2, action: 0.4, creativity: -0.2 } },
      { id: 'e4b', emoji: '🎭', text: 'Say nothing — study their behavior first', scores: { extroversion: -0.3, thinking: 0.5, order: 0.2, action: -0.2, creativity: 0.1 } },
      { id: 'e4c', emoji: '💔', text: 'Feel hurt — process your emotions alone', scores: { extroversion: -0.5, thinking: -0.3, order: -0.1, action: -0.3, creativity: 0.2 } },
      { id: 'e4d', emoji: '🏆', text: 'Use it as motivation — compete harder', scores: { extroversion: 0.2, thinking: 0.2, order: -0.1, action: 0.5, creativity: 0.0 } },
    ],
    planet: 'emotion',
  },
  {
    id: 'emo-5',
    scenario: 'You\'re offered the chance to relive your happiest memory — but you\'ll forget it after.',
    options: [
      { id: 'e5a', emoji: '✨', text: 'Live it again — the experience matters, not the memory', scores: { extroversion: 0.2, thinking: -0.4, order: -0.3, action: 0.2, creativity: 0.4 } },
      { id: 'e5b', emoji: '🧠', text: 'Refuse — memories shape who we are', scores: { extroversion: -0.2, thinking: 0.4, order: 0.3, action: -0.3, creativity: 0.1 } },
      { id: 'e5c', emoji: '📝', text: 'Do it but write everything down first', scores: { extroversion: 0.0, thinking: 0.3, order: 0.5, action: 0.2, creativity: 0.2 } },
      { id: 'e5d', emoji: '🔄', text: 'Ask to relive a sad memory instead — learn from it', scores: { extroversion: -0.1, thinking: 0.3, order: 0.1, action: 0.0, creativity: 0.3 } },
    ],
    planet: 'emotion',
  },
  {
    id: 'emo-6',
    scenario: 'You can telepathically feel everyone\'s emotions for one day. What do you do?',
    options: [
      { id: 'e6a', emoji: '🏥', text: 'Find people in pain and help them', scores: { extroversion: 0.4, thinking: -0.2, order: 0.1, action: 0.4, creativity: 0.1 } },
      { id: 'e6b', emoji: '🎨', text: 'Create art inspired by the emotional symphony', scores: { extroversion: -0.1, thinking: -0.2, order: -0.3, action: -0.1, creativity: 0.7 } },
      { id: 'e6c', emoji: '🏔️', text: 'Isolate yourself — too overwhelming', scores: { extroversion: -0.6, thinking: 0.2, order: 0.2, action: -0.4, creativity: 0.0 } },
      { id: 'e6d', emoji: '🕵️', text: 'Use it to understand people\'s true intentions', scores: { extroversion: 0.1, thinking: 0.5, order: 0.1, action: 0.2, creativity: -0.1 } },
    ],
    planet: 'emotion',
  },
  {
    id: 'emo-7',
    scenario: 'A magical mirror shows you who you\'ll become in 10 years. You don\'t like what you see.',
    options: [
      { id: 'e7a', emoji: '🔨', text: 'Smash the mirror — destiny isn\'t fixed', scores: { extroversion: 0.2, thinking: -0.2, order: -0.4, action: 0.5, creativity: 0.2 } },
      { id: 'e7b', emoji: '📋', text: 'Make a detailed plan to change your path', scores: { extroversion: 0.0, thinking: 0.3, order: 0.6, action: 0.3, creativity: -0.1 } },
      { id: 'e7c', emoji: '🤔', text: 'Accept it — maybe future you knows something', scores: { extroversion: -0.2, thinking: 0.1, order: 0.2, action: -0.4, creativity: 0.1 } },
      { id: 'e7d', emoji: '💡', text: 'Look deeper — find the hidden lesson', scores: { extroversion: -0.1, thinking: 0.1, order: -0.1, action: -0.1, creativity: 0.5 } },
    ],
    planet: 'emotion',
  },
];

// ============================================
// CHAOS QUESTIONS — Wild & Unpredictable
// ============================================
const chaosQuestions: QuizQuestion[] = [
  {
    id: 'chaos-1',
    scenario: 'A dragon appears in your backyard. It doesn\'t seem hostile... yet.',
    options: [
      { id: 'c1a', emoji: '⚔️', text: 'Fight it — no risks with dragons', scores: { extroversion: 0.3, thinking: 0.1, order: 0.2, action: 0.6, creativity: -0.3 } },
      { id: 'c1b', emoji: '🤝', text: 'Try to befriend it with food', scores: { extroversion: 0.3, thinking: -0.2, order: -0.2, action: 0.2, creativity: 0.3 } },
      { id: 'c1c', emoji: '🏃', text: 'Run. Just run.', scores: { extroversion: -0.3, thinking: -0.1, order: 0.1, action: 0.3, creativity: -0.2 } },
      { id: 'c1d', emoji: '🧠', text: 'Study it from a safe distance', scores: { extroversion: -0.4, thinking: 0.5, order: 0.3, action: -0.3, creativity: 0.3 } },
    ],
    planet: 'chaos',
  },
  {
    id: 'chaos-2',
    scenario: 'You find a mysterious glowing button in an abandoned lab. A sign reads: "DO NOT PRESS."',
    options: [
      { id: 'c2a', emoji: '🟢', text: 'Press it immediately — YOLO', scores: { extroversion: 0.3, thinking: -0.4, order: -0.6, action: 0.5, creativity: 0.3 } },
      { id: 'c2b', emoji: '🔴', text: 'Walk away — some mysteries are dangerous', scores: { extroversion: -0.2, thinking: 0.3, order: 0.5, action: -0.4, creativity: -0.2 } },
      { id: 'c2c', emoji: '🟣', text: 'Try to sell it to the highest bidder', scores: { extroversion: 0.4, thinking: 0.3, order: -0.1, action: 0.3, creativity: -0.1 } },
      { id: 'c2d', emoji: '⚫', text: 'Disassemble it to understand the mechanism', scores: { extroversion: -0.3, thinking: 0.5, order: 0.2, action: 0.1, creativity: 0.4 } },
    ],
    planet: 'chaos',
  },
  {
    id: 'chaos-3',
    scenario: 'Zombies are coming. You have 5 minutes to grab 3 items from a mall.',
    options: [
      { id: 'c3a', emoji: '🔪', text: 'Weapons, armor, first aid', scores: { extroversion: 0.1, thinking: 0.3, order: 0.3, action: 0.5, creativity: -0.3 } },
      { id: 'c3b', emoji: '📻', text: 'Radio, map, survival guide', scores: { extroversion: -0.1, thinking: 0.5, order: 0.4, action: 0.1, creativity: 0.1 } },
      { id: 'c3c', emoji: '🍕', text: 'Pizza, soda, a good book — if I\'m going out, I\'m comfortable', scores: { extroversion: 0.2, thinking: -0.4, order: -0.5, action: -0.2, creativity: 0.4 } },
      { id: 'c3d', emoji: '🧪', text: 'Chemistry supplies — time to make a cure', scores: { extroversion: -0.2, thinking: 0.4, order: 0.1, action: 0.2, creativity: 0.5 } },
    ],
    planet: 'chaos',
  },
  {
    id: 'chaos-4',
    scenario: 'You\'re offered a heist opportunity. Low risk, huge reward. Slightly illegal.',
    options: [
      { id: 'c4a', emoji: '😎', text: 'I\'m in — life\'s too short for rules', scores: { extroversion: 0.4, thinking: -0.2, order: -0.6, action: 0.5, creativity: 0.2 } },
      { id: 'c4b', emoji: '🤔', text: 'Plan it perfectly — eliminate all risk first', scores: { extroversion: -0.1, thinking: 0.5, order: 0.4, action: 0.3, creativity: 0.2 } },
      { id: 'c4c', emoji: '👋', text: 'Hard pass — my integrity isn\'t for sale', scores: { extroversion: -0.1, thinking: 0.2, order: 0.5, action: -0.3, creativity: -0.3 } },
      { id: 'c4d', emoji: '🎭', text: 'Pretend to join, then tip off the authorities', scores: { extroversion: 0.1, thinking: 0.4, order: 0.3, action: 0.3, creativity: 0.1 } },
    ],
    planet: 'chaos',
  },
  {
    id: 'chaos-5',
    scenario: 'You wake up with a random superpower. It changes every 24 hours.',
    options: [
      { id: 'c5a', emoji: '🦸', text: 'Become a vigilante hero for a day', scores: { extroversion: 0.4, thinking: -0.1, order: 0.1, action: 0.5, creativity: 0.2 } },
      { id: 'c5b', emoji: '🧪', text: 'Document everything — this needs scientific study', scores: { extroversion: -0.3, thinking: 0.5, order: 0.4, action: 0.0, creativity: 0.2 } },
      { id: 'c5c', emoji: '🎪', text: 'Start a viral livestream — this is content gold', scores: { extroversion: 0.6, thinking: -0.2, order: -0.3, action: 0.3, creativity: 0.3 } },
      { id: 'c5d', emoji: '😴', text: 'Keep it secret — powers attract trouble', scores: { extroversion: -0.5, thinking: 0.3, order: 0.3, action: -0.3, creativity: -0.1 } },
    ],
    planet: 'chaos',
  },
  {
    id: 'chaos-6',
    scenario: 'You can break one law of physics for exactly 60 seconds.',
    options: [
      { id: 'c6a', emoji: '🕊️', text: 'Fly — touch the edge of space', scores: { extroversion: 0.1, thinking: -0.2, order: -0.2, action: 0.3, creativity: 0.5 } },
      { id: 'c6b', emoji: '⏰', text: 'Stop time — have the longest minute ever', scores: { extroversion: -0.3, thinking: 0.4, order: 0.3, action: -0.1, creativity: 0.3 } },
      { id: 'c6c', emoji: '🌀', text: 'Teleport anywhere on Earth', scores: { extroversion: 0.3, thinking: 0.1, order: -0.3, action: 0.5, creativity: 0.1 } },
      { id: 'c6d', emoji: '👻', text: 'Phase through walls — explore the forbidden', scores: { extroversion: -0.1, thinking: 0.2, order: -0.4, action: 0.2, creativity: 0.4 } },
    ],
    planet: 'chaos',
  },
  {
    id: 'chaos-7',
    scenario: 'Earth is ending in 24 hours. Only you know. What\'s your final day?',
    options: [
      { id: 'c7a', emoji: '📢', text: 'Tell everyone — they deserve to know', scores: { extroversion: 0.5, thinking: 0.1, order: 0.2, action: 0.4, creativity: -0.1 } },
      { id: 'c7b', emoji: '❤️', text: 'Spend it with the people you love most', scores: { extroversion: 0.2, thinking: -0.3, order: 0.1, action: -0.2, creativity: 0.2 } },
      { id: 'c7c', emoji: '🚀', text: 'Try to build an escape plan — never give up', scores: { extroversion: 0.1, thinking: 0.3, order: 0.0, action: 0.6, creativity: 0.4 } },
      { id: 'c7d', emoji: '🎶', text: 'Create one final masterpiece', scores: { extroversion: -0.2, thinking: -0.3, order: -0.2, action: 0.0, creativity: 0.7 } },
    ],
    planet: 'chaos',
  },
];

// ============================================
// Exports
// ============================================

const questionsByPlanet: Record<PlanetPath, QuizQuestion[]> = {
  mind: mindQuestions,
  emotion: emotionQuestions,
  chaos: chaosQuestions,
};

export function getQuestionsForPlanet(planet: PlanetPath): QuizQuestion[] {
  return questionsByPlanet[planet] || [];
}

export function getAllQuestions(): QuizQuestion[] {
  return [...mindQuestions, ...emotionQuestions, ...chaosQuestions];
}
