'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useGameStore } from '@/store/gameStore';
import XPBar from '@/components/game/XPBar';

export default function ProfilePage() {
  const { xp, level, levelName, streak, personalityResults, achievements } = useGameStore();
  const unlocked = achievements.filter((a) => a.unlockedAt).length;
  const latestResult = personalityResults[0];

  return (
    <div className="page-container">
      <div className="content-overlay min-h-screen px-4 py-8 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl"
            style={{ background: 'linear-gradient(135deg, var(--color-nebula), var(--color-stellar-blue))', boxShadow: '0 0 40px rgba(0, 212, 255, 0.3)' }}>
            👤
          </div>
          <h1 className="text-3xl md:text-5xl font-bold gradient-text-cosmic mb-1">Your Universe</h1>
          <p className="text-lg font-semibold" style={{ color: 'var(--color-stellar-cyan)' }}>
            Level {level} — {levelName}
          </p>
        </motion.div>

        <div className="mb-6"><XPBar /></div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: 'XP', value: xp, icon: '⚡' },
            { label: 'Streak', value: streak, icon: '🔥' },
            { label: 'Achievements', value: `${unlocked}/${achievements.length}`, icon: '🏆' },
          ].map(({ label, value, icon }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass p-4 text-center">
              <div className="text-xl mb-1">{icon}</div>
              <p className="text-lg font-bold" style={{ color: 'var(--color-ghost-white)' }}>{value}</p>
              <p className="text-[10px] tracking-wider uppercase" style={{ color: 'var(--color-twilight)' }}>{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Latest Result */}
        {latestResult && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-strong p-6 mb-6">
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--color-stellar-cyan)' }}>Latest Personality</p>
            <h3 className="text-2xl font-bold gradient-text-cosmic mb-2">{latestResult.archetype}</h3>
            <p className="text-sm" style={{ color: 'var(--color-mist)' }}>
              {latestResult.heroIdentity.name} / {latestResult.villainIdentity.name}
            </p>
            <p className="text-xs mt-2" style={{ color: 'var(--color-twilight)' }}>
              Spirit Animal: {latestResult.spiritAnimal.emoji} {latestResult.spiritAnimal.animal} •
              Anime: {latestResult.animeMatch.character}
            </p>
          </motion.div>
        )}

        {/* Recent Achievements */}
        {unlocked > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass p-6 mb-6">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--color-solar-gold)' }}>Recent Achievements</p>
            <div className="flex gap-4">
              {achievements.filter((a) => a.unlockedAt).slice(0, 3).map((a) => (
                <div key={a.id} className="text-center">
                  <div className="text-3xl mb-1">{a.icon}</div>
                  <p className="text-[10px]" style={{ color: 'var(--color-mist)' }}>{a.title}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick Links */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { href: '/universe', label: 'Take Quiz', icon: '🔮' },
            { href: '/daily', label: 'Daily Portal', icon: '⭐' },
            { href: '/achievements', label: 'Achievements', icon: '🏆' },
          ].map(({ href, label, icon }) => (
            <Link key={href} href={href} className="glass p-4 text-center card-hover block">
              <div className="text-2xl mb-1">{icon}</div>
              <p className="text-xs" style={{ color: 'var(--color-mist)' }}>{label}</p>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link href="/" className="glass-subtle px-5 py-2.5 rounded-full text-sm" style={{ color: 'var(--color-mist)' }}>🏠 Home</Link>
        </div>
      </div>
    </div>
  );
}
