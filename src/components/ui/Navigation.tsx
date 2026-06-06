'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import XPBar from '@/components/game/XPBar';

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/universe', label: 'Quiz', icon: '🔮' },
  { href: '/daily', label: 'Daily', icon: '⭐' },
  { href: '/achievements', label: 'Trophies', icon: '🏆' },
  { href: '/profile', label: 'Profile', icon: '👤' },
];

export default function Navigation() {
  const pathname = usePathname();

  // Don't show on landing page
  if (pathname === '/') return null;

  return (
    <>
      {/* Desktop top nav */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-40 glass px-6 py-3 mx-4 mt-4 rounded-2xl items-center justify-between">
        <Link href="/" className="text-lg font-bold gradient-text-cosmic">
          PersonaVerse
        </Link>
        <div className="flex items-center gap-6">
          {NAV_ITEMS.slice(1).map(({ href, label, icon }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href} className="relative group">
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-1.5 text-sm transition-colors"
                  style={{ color: isActive ? 'var(--color-stellar-cyan)' : 'var(--color-mist)' }}
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </motion.span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: 'var(--color-stellar-cyan)', boxShadow: '0 0 8px var(--color-stellar-cyan)' }}
                  />
                )}
              </Link>
            );
          })}
          <XPBar compact />
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass px-2 py-2 mx-2 mb-2 rounded-2xl flex justify-around">
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const isActive = pathname === href;
          return (
            <Link key={href} href={href} className="flex flex-col items-center gap-0.5 py-1 px-2 relative">
              <motion.span whileTap={{ scale: 0.9 }} className="text-xl">{icon}</motion.span>
              <span className="text-[9px]" style={{ color: isActive ? 'var(--color-stellar-cyan)' : 'var(--color-twilight)' }}>
                {label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute -top-0.5 w-6 h-0.5 rounded-full"
                  style={{ background: 'var(--color-stellar-cyan)', boxShadow: '0 0 8px var(--color-stellar-cyan)' }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
