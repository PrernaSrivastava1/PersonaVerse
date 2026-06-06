import { GoogleGenAI } from '@google/genai';
import type { PersonalityScores, PersonalityResult, PlanetPath } from '@/types';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function analyzePersonality(
  scores: PersonalityScores,
  answers: { questionId: string; optionId: string }[],
  planet: PlanetPath
): Promise<PersonalityResult> {
  const prompt = `You are a creative personality analyst for a cosmic personality game called PersonaVerse.

A user completed a personality quiz on the "${planet}" path. Their personality dimension scores are:
- Extroversion: ${scores.extroversion.toFixed(2)} (negative = introverted, positive = extroverted)
- Thinking: ${scores.thinking.toFixed(2)} (negative = feeling, positive = thinking)
- Order: ${scores.order.toFixed(2)} (negative = chaotic, positive = orderly)
- Action: ${scores.action.toFixed(2)} (negative = observant, positive = action-oriented)
- Creativity: ${scores.creativity.toFixed(2)} (negative = logical, positive = creative)

They answered ${answers.length} scenario-based questions.

Generate a COMPLETE personality analysis as JSON. Be CREATIVE, VIVID, and FUN with all names and descriptions. Make it feel like discovering a cosmic identity. Use evocative, poetic language.

Return ONLY valid JSON (no markdown, no code blocks) with this EXACT structure:
{
  "archetype": "A creative 2-3 word personality archetype name (e.g., 'Neon Architect', 'Shadow Weaver', 'Quantum Dreamer')",
  "story": "A 2-3 paragraph vivid personality story/description",
  "strengths": ["strength1", "strength2", "strength3", "strength4", "strength5"],
  "weaknesses": ["weakness1", "weakness2", "weakness3"],
  "dreamCareer": "Their ideal career based on personality",
  "leadershipStyle": "Their leadership approach in 1-2 sentences",
  "learningStyle": "How they learn best in 1-2 sentences",
  "hiddenTrait": "A surprising hidden personality trait they might not know about",
  "famousMatch": {
    "name": "A real famous person they match",
    "reason": "Why they match in 1-2 sentences"
  },
  "animeMatch": {
    "character": "A popular anime character they match",
    "series": "The anime series name",
    "reason": "Why they match in 1-2 sentences"
  },
  "spiritAnimal": {
    "animal": "Their spirit animal",
    "emoji": "An emoji for the animal",
    "reason": "Why this animal represents them in 1-2 sentences"
  },
  "heroIdentity": {
    "name": "A creative superhero name",
    "powers": ["power1", "power2", "power3"],
    "backstory": "A 2-3 sentence hero origin story"
  },
  "villainIdentity": {
    "name": "A creative villain name",
    "methods": ["method1", "method2", "method3"],
    "backstory": "A 2-3 sentence villain origin story - make it compelling and screenshot-worthy"
  },
  "bestFriendMatch": "The type of person who would be their ideal best friend",
  "futureSelf": "A vivid 2-3 sentence vision of their future self in 10 years",
  "villainArc": "A dramatic 2-3 sentence 'what if you became a villain' narrative",
  "colorTheme": {
    "primary": "#hex color representing their core",
    "secondary": "#hex color representing their energy",
    "accent": "#hex color representing their spark"
  }
}`;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      let text = response.text || '';
      // Clean up potential markdown code blocks
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

      const result: PersonalityResult = JSON.parse(text);
      return result;
    } catch (error) {
      lastError = error as Error;
      if (attempt < 2) {
        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
      }
    }
  }

  throw lastError || new Error('Failed to analyze personality');
}
