import { NextRequest, NextResponse } from 'next/server';
import { analyzePersonality } from '@/lib/gemini';
import type { PersonalityScores, PlanetPath } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { scores, answers, planet } = body as {
      scores: PersonalityScores;
      answers: { questionId: string; optionId: string }[];
      planet: PlanetPath;
    };

    if (!scores || !answers || !planet) {
      return NextResponse.json(
        { error: 'Missing required fields: scores, answers, planet' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      // Return mock data when no API key is configured
      return NextResponse.json(getMockResult(scores));
    }

    const result = await analyzePersonality(scores, answers, planet);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze personality. Please try again.' },
      { status: 500 }
    );
  }
}

function getMockResult(scores: PersonalityScores) {
  const isCreative = scores.creativity > 0;
  const isExtroverted = scores.extroversion > 0;
  const isThinking = scores.thinking > 0;

  return {
    archetype: isCreative ? 'Neon Architect' : isThinking ? 'Quantum Strategist' : 'Ember Wanderer',
    story: `You are a rare soul who walks between worlds. Your mind operates on frequencies most people can't perceive — you see patterns in chaos and beauty in complexity. Where others see walls, you see doorways waiting to be opened.\n\nYour ${isExtroverted ? 'magnetic presence draws people into your orbit' : 'quiet intensity speaks volumes without words'}. You possess an unusual combination of ${isThinking ? 'analytical brilliance' : 'emotional depth'} and ${isCreative ? 'boundless creativity' : 'strategic precision'} that makes you unforgettable.\n\nThe universe shaped you to be a bridge — between imagination and reality, between thought and feeling, between the known and the impossible.`,
    strengths: [
      isCreative ? 'Visionary thinking that turns abstract ideas into reality' : 'Razor-sharp analytical skills',
      isExtroverted ? 'Natural charisma that inspires others' : 'Deep observational intelligence',
      'Resilience that turns setbacks into comebacks',
      isThinking ? 'Strategic mind that sees ten moves ahead' : 'Emotional intelligence that reads any room',
      'Adaptability — thrives in any environment',
    ],
    weaknesses: [
      isCreative ? 'Can get lost in imagination, neglecting practical matters' : 'Sometimes too rigid in approach',
      isExtroverted ? 'May spread energy too thin across too many connections' : 'Can isolate when overwhelmed',
      'Tendency toward perfectionism that delays action',
    ],
    dreamCareer: isCreative ? 'Creative Director at a cutting-edge design studio' : isThinking ? 'AI Research Lead at a top tech company' : 'Founder of a social impact startup',
    leadershipStyle: isExtroverted
      ? 'The Catalyst — you lead by igniting passion in others, creating an infectious energy that transforms teams into movements.'
      : 'The Architect — you lead through vision and careful design, building systems that empower others to excel independently.',
    learningStyle: isCreative
      ? 'You learn by creating — hands-on experimentation and building prototypes teaches you faster than any textbook.'
      : 'You learn by deconstructing — breaking complex systems apart and understanding each component before mastering the whole.',
    hiddenTrait: isCreative
      ? 'You have an uncanny ability to predict trends — your subconscious processes cultural patterns faster than most people consciously can.'
      : 'Behind your logical exterior, you possess a deep well of emotional wisdom that surfaces at the most critical moments.',
    famousMatch: {
      name: isCreative ? 'Leonardo da Vinci' : isThinking ? 'Nikola Tesla' : 'Frida Kahlo',
      reason: isCreative
        ? 'Like da Vinci, you refuse to be confined to a single discipline. Your mind naturally connects art, science, and philosophy.'
        : isThinking
        ? 'Like Tesla, you see possibilities that others dismiss as impossible, and your dedication to your vision borders on obsessive brilliance.'
        : 'Like Frida, your strength comes from transforming pain into beauty, and your authenticity is your most powerful weapon.',
    },
    animeMatch: {
      character: isCreative ? 'Senku Ishigami' : isThinking ? 'L Lawliet' : 'Naruto Uzumaki',
      series: isCreative ? 'Dr. Stone' : isThinking ? 'Death Note' : 'Naruto',
      reason: isCreative
        ? 'Your combination of scientific brilliance and creative problem-solving mirrors Senku\'s ability to rebuild civilization from scratch.'
        : isThinking
        ? 'Your analytical mind and unconventional approach to problems mirrors L\'s legendary detective abilities.'
        : 'Your determination and ability to connect with others mirrors Naruto\'s journey from outcast to leader.',
    },
    spiritAnimal: {
      animal: isCreative ? 'Fox' : isThinking ? 'Owl' : 'Wolf',
      emoji: isCreative ? '🦊' : isThinking ? '🦉' : '🐺',
      reason: isCreative
        ? 'The fox embodies your cleverness and adaptability — always finding creative solutions others overlook.'
        : isThinking
        ? 'The owl represents your wisdom and patient observation — you see what others miss in the darkness.'
        : 'The wolf mirrors your loyalty and strength — fierce when protecting what matters, strategic in your approach.',
    },
    heroIdentity: {
      name: isCreative ? 'Nova Guardian' : isThinking ? 'Cipher Prime' : 'Eclipse Warden',
      powers: isCreative
        ? ['Reality Weaving — reshape matter with imagination', 'Chromatic Vision — see emotional energy as color', 'Inspiration Pulse — amplify creativity in others']
        : isThinking
        ? ['Pattern Recognition — predict any outcome', 'Neural Override — interface with any system', 'Time Dilation — slow time for analysis']
        : ['Shadow Step — move between dimensions', 'Empathy Shield — absorb and redirect emotions', 'Bond Resonance — draw strength from connections'],
      backstory: isCreative
        ? 'Born during a supernova event that merged art and science into pure energy, Nova Guardian discovered their powers while dreaming — their imagination literally reshaping reality around them.'
        : isThinking
        ? 'A prodigy who accidentally merged their consciousness with a quantum computer, Cipher Prime now exists at the intersection of human intuition and computational perfection.'
        : 'Eclipse Warden was forged in the space between light and shadow, emerging from a moment of profound emotional transformation that unlocked their ability to walk between worlds.',
    },
    villainIdentity: {
      name: isCreative ? 'The Phantom Architect' : isThinking ? 'The Silent Manipulator' : 'The Chaos Weaver',
      methods: isCreative
        ? ['Constructs elaborate illusions indistinguishable from reality', 'Traps victims in beautiful prisons of their own desires', 'Rewrites memories to serve a grander design']
        : isThinking
        ? ['Orchestrates events from the shadows with surgical precision', 'Exploits psychological weaknesses identified through observation', 'Builds systems of control so elegant victims never realize they\'re trapped']
        : ['Destabilizes order by exposing hidden truths at critical moments', 'Turns allies against each other through carefully planted doubts', 'Creates chaos that feels like freedom until it\'s too late'],
      backstory: isCreative
        ? 'The Phantom Architect was once a visionary creator whose masterpiece was rejected by the world. Broken by the betrayal, they decided that if reality wouldn\'t accept their vision — they\'d simply replace reality itself.'
        : isThinking
        ? 'Once a brilliant advisor, The Silent Manipulator discovered that every system — every person — has a hidden vulnerability. Now they use that knowledge not to protect, but to control.'
        : 'The Chaos Weaver was born from a moment of perfect clarity — the realization that order is just an illusion maintained by fear. They decided to liberate everyone from that fear, whether they wanted liberation or not.',
    },
    bestFriendMatch: isCreative
      ? 'A grounded realist who appreciates your vision — someone who can execute your ideas while keeping you connected to reality.'
      : isThinking
      ? 'An emotionally intelligent free spirit who challenges your logic and shows you the beauty in imperfection.'
      : 'A fellow adventurer with complementary strengths — someone who matches your energy and pushes you to grow.',
    futureSelf: isCreative
      ? 'In 10 years, you\'re leading a creative revolution — your work has inspired millions, and your name is synonymous with innovation. You live in a space that\'s part studio, part sanctuary, surrounded by projects that blur the line between art and technology.'
      : isThinking
      ? 'In 10 years, you\'ve cracked a problem everyone said was unsolvable. Your breakthrough has rippled across industries, and you\'re now mentoring the next generation of thinkers while working on something even bigger — something you can\'t talk about yet.'
      : 'In 10 years, you\'ve built something that matters — a community, a company, a movement. Your greatest achievement isn\'t what you\'ve accomplished, but who you\'ve become: someone who turned vulnerability into their greatest strength.',
    villainArc: isCreative
      ? 'Disillusioned by a world that rewards conformity over genius, you retreat into your mind — and emerge with a plan to reshape reality according to your singular vision. The line between creation and destruction blurs when your imagination has no limits.'
      : isThinking
      ? 'You see the patterns. You see how every system is broken, how every leader is flawed, how every institution serves itself. Armed with perfect knowledge, you decide the only rational course is to dismantle it all — and rebuild from zero.'
      : 'They pushed you too far. Made you feel too much. So you learned to turn pain into power, empathy into manipulation, and love into a weapon. Now no one will ever hurt you again — because you\'ll hurt them first.',
    colorTheme: {
      primary: isCreative ? '#6C3CE0' : isThinking ? '#0066CC' : '#CC3366',
      secondary: isCreative ? '#00D4FF' : isThinking ? '#00FF88' : '#FF8C42',
      accent: isCreative ? '#FF6B9D' : isThinking ? '#FFD700' : '#00D4FF',
    },
  };
}
