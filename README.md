# PersonaVerse

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

---

## Features

**Immersive 3D Landing** — React Three Fiber scene with starfield, particle systems, a breathing orb, orbiting crystals, and mouse-driven parallax. Not a static page — a living world.

**Gamified Quiz** — 21 scenario-based questions across 3 planet paths. No psychology jargon. Just fun, wild, "what would you actually do?" situations.

**AI Personality Engine** — Powered by Google Gemini. Generates unique archetypes, hero/villain identities, anime matches, spirit animals, and narrative descriptions. Every result feels personal.

**Villain Identity** — The feature people actually share. *"If you became a villain..."* — complete with a name, methods, backstory, and a dramatic villain arc.

**Gamification System** — XP, 7 levels (Dreamer → Legend), 8 unlockable achievements, daily visit streaks. All persisted locally. Gives people a reason to return.

**Daily Portal** — Mood scanner with AI insights, date-seeded cosmic fortunes, and streak tracking. A new reason to open the app every day.

**Fully Responsive** — Glassmorphism UI that looks stunning on desktop and mobile. Bottom navigation on phones, top bar on desktop.

**Design System** — Custom cosmic color palette, three tiers of glassmorphism, glow effects, gradient text, and smooth Framer Motion animations throughout.

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




<p align="center">
  <strong> Built with cosmic energy!!!  <br> <img width="250" height="280" alt="despicablememinionsGIF" src="https://github.com/user-attachments/assets/92d61392-91ad-407b-9b73-a9531a515158" />
 </strong>
  <br/>
  <a href="https://personaverse-coral.vercel.app">personaverse-coral.vercel.app</a>
</p>
