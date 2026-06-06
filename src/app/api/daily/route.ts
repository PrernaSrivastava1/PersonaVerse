import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const FALLBACK_FORTUNES = [
  'Today your curiosity is stronger than usual. Follow it — it knows where to take you.',
  'Your creative energy is peaking. Something you start today will matter more than you think.',
  'The universe is arranging a surprise. Stay open to unexpected conversations.',
  'Your analytical mind is razor-sharp today. Trust your instincts on that decision you\'ve been postponing.',
  'Today you radiate a quiet confidence that draws people toward you. Use it wisely.',
  'A pattern you\'ve been struggling to see will suddenly become obvious. Pay attention to small details.',
  'Your emotional intelligence is heightened today. Someone near you needs exactly the kind of support only you can give.',
  'Today favors bold moves over careful planning. Sometimes the best strategy is no strategy at all.',
];

const MOOD_INSIGHTS: Record<string, string[]> = {
  '😊': [
    'You\'re operating in Creator Mode today. Your positive energy is a magnet for good ideas and better people.',
    'This happiness isn\'t random — you\'ve been building toward this feeling. Ride the wave and create something.',
  ],
  '😐': [
    'Neutral isn\'t boring — it\'s the eye of the storm. You\'re processing more than you realize right now.',
    'Today you\'re in Observer Mode. Your calm detachment is actually a superpower — use it to see what others miss.',
  ],
  '😴': [
    'Your mind is in recovery mode. The ideas brewing beneath this tiredness will surface when you least expect them.',
    'Rest isn\'t laziness — it\'s your brain defragmenting. The breakthrough is loading.',
  ],
  '🔥': [
    'You\'re in Ignition Mode. This fire is fuel — channel it before it scatters. One focused hour today is worth ten normal ones.',
    'That intensity you feel? It\'s your potential demanding to be used. Don\'t fight it — aim it.',
  ],
  '💀': [
    'Even at your lowest, your mind is still running at frequencies most people can\'t reach. This too shall become fuel.',
    'Phoenix Mode activated. Everything that feels like it\'s ending is actually transforming. You\'ve survived 100% of your worst days.',
  ],
};

export async function POST(request: NextRequest) {
  try {
    const { mood } = await request.json();

    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are a cosmic personality AI. A user selected mood: ${mood}. Give a single, insightful, fun personality-based mood insight in 1-2 sentences. Not astrology — personality psychology with cosmic flair. Be specific and empowering.`,
      });
      return NextResponse.json({ insight: response.text });
    }

    // Fallback
    const insights = MOOD_INSIGHTS[mood] || MOOD_INSIGHTS['😐'];
    const insight = insights[Math.floor(Math.random() * insights.length)];
    return NextResponse.json({ insight });
  } catch (error) {
    console.error('Mood analysis error:', error);
    return NextResponse.json({ insight: 'Your energy is unique today. Trust it.' });
  }
}

export async function GET() {
  try {
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const today = new Date().toISOString().split('T')[0];
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Generate a unique cosmic personality fortune for ${today}. One sentence. Fun, insightful, personality-focused. Not astrology. Example: "Today your curiosity is stronger than usual." Be creative and different each day.`,
      });
      return NextResponse.json({ fortune: response.text });
    }

    // Fallback
    const today = new Date();
    const index = (today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate()) % FALLBACK_FORTUNES.length;
    return NextResponse.json({ fortune: FALLBACK_FORTUNES[index] });
  } catch (error) {
    console.error('Fortune error:', error);
    return NextResponse.json({ fortune: FALLBACK_FORTUNES[0] });
  }
}
