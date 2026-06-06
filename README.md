# 🌌 PersonaVerse

**Explore the Universe Inside You.**

> *What if a personality test didn't feel like a form — but like entering a game?*

[**✦ Try it Live**](https://personaverse-coral.vercel.app)

---

## The Idea

Most personality quizzes are boring. You click radio buttons, hit submit, and get a paragraph that could describe literally anyone. I wanted something different.

**PersonaVerse** is a fully immersive 3D personality experience. You don't fill out a form — you enter a cosmic universe. You pick a floating planet. You face wild scenarios (dragons, time paradoxes, zombie apocalypses). And at the end, an AI doesn't just tell you you're "introverted" — it gives you a **hero identity**, a **villain arc**, a **spirit animal**, an **anime character match**, and a **future self** prediction.

The goal was simple:

- ✅ You land on the site and go *"woah"*
- ✅ You want to discover more about yourself
- ✅ You screenshot your villain identity and send it to friends
- ✅ You come back tomorrow

That's what makes a project worth building.

---

## What It Looks Like

**The Portal** — A breathing cosmic orb floats in space. Stars drift. Crystals orbit. Your mouse shifts the entire universe. One button: *Enter The Universe.*

**Choose Your Path** — Three glowing planets hover before you. Mind 🧠, Emotion ❤️, or Chaos 🔥. Each one unlocks a different set of scenarios.

**The Quiz** — No boring multiple choice. You're faced with scenarios: *"A dragon appears in your backyard. It doesn't seem hostile... yet."* Your answers quietly shape your personality profile across five hidden dimensions.

**The Reveal** — AI analyzes your responses and generates an entire personality universe: your archetype name, hero powers, villain methods, anime match, spirit animal, dream career, and more. Every card is designed to be screenshot-worthy.

**Daily Portal** — Come back each day for a mood scan, a cosmic fortune, and streak rewards. The app remembers you.

---

## Features

🪐 **Immersive 3D Landing** — React Three Fiber scene with starfield, particle systems, a breathing orb, orbiting crystals, and mouse-driven parallax. Not a static page — a living world.

🎮 **Gamified Quiz** — 21 scenario-based questions across 3 planet paths. No psychology jargon. Just fun, wild, "what would you actually do?" situations.

🤖 **AI Personality Engine** — Powered by Google Gemini. Generates unique archetypes, hero/villain identities, anime matches, spirit animals, and narrative descriptions. Every result feels personal.

🦹 **Villain Identity** — The feature people actually share. *"If you became a villain..."* — complete with a name, methods, backstory, and a dramatic villain arc.

🏆 **Gamification System** — XP, 7 levels (Dreamer → Legend), 8 unlockable achievements, daily visit streaks. All persisted locally. Gives people a reason to return.

⭐ **Daily Portal** — Mood scanner with AI insights, date-seeded cosmic fortunes, and streak tracking. A new reason to open the app every day.

📱 **Fully Responsive** — Glassmorphism UI that looks stunning on desktop and mobile. Bottom navigation on phones, top bar on desktop.

🎨 **Design System** — Custom cosmic color palette, three tiers of glassmorphism, glow effects, gradient text, and smooth Framer Motion animations throughout.

---

## Tech Stack

| What | Why |
|------|-----|
| **Next.js 15** | App Router, API routes, Turbopack builds |
| **React Three Fiber** | 3D scenes without leaving React |
| **Three.js + drei** | Stars, floating geometries, particle systems |
| **Framer Motion** | Page transitions, scroll reveals, micro-interactions |
| **Zustand** | Lightweight state with localStorage persistence |
| **Google Gemini AI** | Personality analysis and daily insights |
| **Tailwind CSS v4** | Utility styling alongside custom design tokens |
| **TypeScript** | End-to-end type safety |

---

## Project Structure

```
src/
├── app/                          # Pages & API routes
│   ├── page.tsx                  # 🌌 The Portal (landing)
│   ├── universe/                 # 🪐 Planet selection
│   ├── quiz/                     # 📝 Personality quiz
│   ├── results/                  # 🔮 AI-generated results
│   ├── daily/                    # ⭐ Daily challenge hub
│   ├── achievements/             # 🏆 Achievement gallery
│   ├── profile/                  # 👤 User profile
│   └── api/                      # Server-side AI endpoints
├── components/
│   ├── three/                    # 3D components (orb, stars, planets...)
│   ├── quiz/                     # Question cards
│   ├── results/                  # Result cards (hero, villain, anime...)
│   ├── game/                     # XP bar, achievement cards
│   ├── daily/                    # Mood scanner, fortune
│   └── ui/                       # Navigation, loading screen
├── store/                        # Zustand stores (quiz + game state)
├── lib/                          # Gemini client, question bank
└── types/                        # TypeScript definitions
```

---

## Getting Started

```bash
# Clone it
git clone https://github.com/yourusername/personaverse.git
cd personaverse

# Install dependencies
npm install

# Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and enter the universe.

### Enable AI (Optional)

The app works without an API key — it uses rich mock personality data based on your actual quiz scores. To enable real AI-generated results:

1. Get a free Gemini API key at [aistudio.google.com](https://aistudio.google.com/apikey)
2. Create a `.env.local` file:
   ```
   GEMINI_API_KEY=your_key_here
   ```
3. Restart the dev server

---

## The Personality Dimensions

Every question silently adjusts five hidden scores:

| Dimension | Low End | High End |
|-----------|---------|----------|
| **Extroversion** | Introspective, reflective | Social, energizing |
| **Thinking** | Feeling-driven, empathetic | Logic-driven, analytical |
| **Order** | Spontaneous, adaptable | Structured, systematic |
| **Action** | Observant, patient | Bold, decisive |
| **Creativity** | Practical, grounded | Imaginative, visionary |

These scores feed into the AI prompt, producing personality results that actually reflect how you answered — not random fortune-cookie text.

---

## What The AI Generates

Each result includes:

- 🔮 **Personality Archetype** — A unique name and narrative (*"Neon Architect"*, *"Shadow Weaver"*)
- ⚡ **Hero Identity** — Superhero name, powers, and origin story
- 💀 **Villain Identity** — Villain name, methods, backstory, and villain arc
- 🎌 **Anime Match** — Character, series, and why you match
- 🦊 **Spirit Animal** — Animal, emoji, and the reason behind it
- ⭐ **Famous Match** — A real person you share traits with
- 🚀 **Dream Career** — Based on your personality profile
- 👑 **Leadership & Learning Style** — How you lead and how you learn best
- 🔮 **Hidden Trait** — Something about yourself you might not know
- 🤝 **Best Friend Match** — The kind of person who'd be your ideal friend
- 🔭 **Future Self** — A vision of you in 10 years

---

## Deployment

Already deployed on Vercel:

```bash
# Deploy to production
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deploys on every push.

---

## What I Learned

Building this taught me a lot about:

- **React Three Fiber** — Making 3D feel native in React. BufferGeometry, useFrame animations, pointer events on meshes.
- **Design as Experience** — The 3D landing page, the glassmorphism cards, the glow effects — design isn't decoration, it's the product.
- **AI as a Feature** — Gemini doesn't just analyze — it creates. The structured JSON prompting technique makes AI output reliable and typed.
- **Gamification Psychology** — XP, streaks, achievements, levels. Small dopamine loops that make people come back.

---

## License

MIT — build on it, remix it, make it yours.

---

<p align="center">
  <strong>✦ Built with cosmic energy and too much coffee ✦</strong>
  <br/>
  <a href="https://personaverse-coral.vercel.app">personaverse-coral.vercel.app</a>
</p>
