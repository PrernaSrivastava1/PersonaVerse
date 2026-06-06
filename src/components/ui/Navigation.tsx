'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/universe', label: 'Quiz', icon: '🔮' },
  { href: '/daily', label: 'Daily', icon: '⭐' },
  { href: '/achievements', label: 'Trophies', icon: '🏆' },
  { href: '/profile', label: 'Profile', icon: '👤' },
];

export default function Navigation() {
  const pathname = usePathname();
  if (pathname === '/') return null;

  return (
    <>
      {/* Desktop top nav */}
      <nav style={{
        display: 'none', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40,
        padding: '0.75rem 1.5rem', margin: '1rem 1rem 0',
        background: 'rgba(15, 15, 35, 0.7)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '1rem',
        alignItems: 'center', justifyContent: 'space-between',
      }} className="desktop-nav">
        <Link href="/" style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }} className="gradient-text-cosmic">
          PersonaVerse
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {NAV_ITEMS.slice(1).map(({ href, label, icon }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href} style={{ position: 'relative' }}>
                <motion.span whileHover={{ scale: 1.1 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: isActive ? '#00d4ff' : '#b8b5c9', transition: 'color 0.2s' }}>
                  <span>{icon}</span><span>{label}</span>
                </motion.span>
                {isActive && (
                  <motion.div layoutId="nav-indicator" style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 2, borderRadius: 1, background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' }} />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="mobile-nav" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40,
        padding: '0.5rem 0.5rem', margin: '0 0.5rem 0.5rem',
        background: 'rgba(15, 15, 35, 0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '1rem',
        display: 'flex', justifyContent: 'space-around',
      }}>
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const isActive = pathname === href;
          return (
            <Link key={href} href={href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '0.4rem 0.5rem', position: 'relative' }}>
              <motion.span whileTap={{ scale: 0.9 }} style={{ fontSize: '1.25rem' }}>{icon}</motion.span>
              <span style={{ fontSize: '0.55rem', color: isActive ? '#00d4ff' : '#6b6880' }}>{label}</span>
              {isActive && (
                <motion.div layoutId="mobile-nav-indicator" style={{ position: 'absolute', top: -2, width: 20, height: 2, borderRadius: 1, background: '#00d4ff', boxShadow: '0 0 6px #00d4ff' }} />
              )}
            </Link>
          );
        })}
      </nav>

      <style jsx global>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-nav { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
        }
      `}</style>
    </>
  );
}
