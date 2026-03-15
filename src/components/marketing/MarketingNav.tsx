'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, Shield, DollarSign, Users, ShieldAlert, GitBranch,
  Globe2, Bot, BookOpen, type LucideIcon,
} from 'lucide-react';

// ─── Platform mega menu items ─────────────────────────────────────────────────
const PLATFORM_ITEMS: { label: string; href: string; Icon: LucideIcon; color: string; desc: string }[] = [
  { label: 'Governance',   href: '/governance',   Icon: Shield,      color: '#d075ff', desc: 'Real-time proposal tracking and vote analytics.' },
  { label: 'Treasury',     href: '/treasury',     Icon: DollarSign,  color: '#f59e0b', desc: 'Multi-wallet monitoring and DeFi yield tracking.' },
  { label: 'Contributors', href: '/contributors', Icon: Users,       color: '#89b0ff', desc: 'XP scoring, levels, and activity heatmaps.' },
  { label: 'Security',     href: '/security',     Icon: ShieldAlert, color: '#ff5c16', desc: 'Sybil detection and real-time threat feeds.' },
  { label: 'Simulator',    href: '/simulator',    Icon: GitBranch,   color: '#baf24a', desc: 'AI-powered governance scenario forecasting.' },
  { label: 'AI Agents',    href: '/ai-agents',    Icon: Bot,         color: '#d075ff', desc: 'Four specialized agents briefing your DAO 24/7.' },
];

const NAV_LINKS = [
  { label: 'Universe',  href: '/universe' },
  { label: 'Docs',      href: '/docs' },
];

// ─── Axion Logo ───────────────────────────────────────────────────────────────
function AxionLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
      <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" stroke="#00d4ff" strokeWidth="1.5" fill="none" opacity="0.8"/>
      <path d="M16 8L23 19H9L16 8Z" stroke="#d075ff" strokeWidth="1.5" fill="none" opacity="0.8"/>
      <circle cx="16" cy="16" r="2.5" fill="#00d4ff"/>
    </svg>
  );
}

// ─── Platform mega dropdown ───────────────────────────────────────────────────
function PlatformDropdown({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        top: 'calc(100% + 1.2rem)',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '52rem',
        background: 'rgba(10,10,10,0.92)',
        backdropFilter: 'blur(2.4rem)',
        WebkitBackdropFilter: 'blur(2.4rem)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '1.6rem',
        padding: '1.2rem',
        zIndex: 99,
        boxShadow: '0 2.4rem 6.4rem rgba(0,0,0,0.5)',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
        {PLATFORM_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              padding: '1rem 1.2rem',
              borderRadius: '1rem',
              textDecoration: 'none',
              transition: 'background 150ms ease',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
          >
            <div style={{
              width: '3.2rem', height: '3.2rem', borderRadius: '0.8rem',
              background: `${item.color}18`, border: `1px solid ${item.color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, marginTop: '0.1rem',
            }}>
              <item.Icon size={14} color={item.color} />
            </div>
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.2rem' }}>
                {item.label}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.3 }}>
                {item.desc}
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* Launch App row */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '0.8rem', paddingTop: '0.8rem' }}>
        <Link
          href="/app"
          onClick={onClose}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
            padding: '1rem', borderRadius: '1rem', textDecoration: 'none',
            background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)',
            color: '#00d4ff', fontFamily: 'Inter, sans-serif', fontSize: '1.3rem', fontWeight: 700,
            transition: 'background 150ms ease',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.18)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.1)')}
        >
          <Globe2 size={14} />
          Launch Full App →
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Main Nav ─────────────────────────────────────────────────────────────────
export function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setPlatformOpen(false); }, [pathname]);

  return (
    <>
      {/* ── Floating Pill Nav ─────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 4rem)',
          maxWidth: '110rem',
          zIndex: 1000,
        }}
        aria-label="Main navigation"
      >
        <div
          className={`nav-pill${scrolled ? ' scrolled' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 2rem',
          }}
        >
          {/* Left — Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none', flexShrink: 0 }}>
            <AxionLogo />
            <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.18em', color: '#ffffff' }}>
              AXION
            </span>
          </Link>

          {/* Center — Links (desktop) */}
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            {/* Platform — hover dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setPlatformOpen(true)}
              onMouseLeave={() => setPlatformOpen(false)}
            >
              <button style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.6rem 1.2rem', background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontSize: '1.4rem', fontWeight: 500,
                color: platformOpen ? '#ffffff' : 'rgba(255,255,255,0.7)',
                transition: 'color 150ms ease',
              }}>
                Platform
                <ChevronDown
                  size={13}
                  style={{
                    transform: platformOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 200ms ease',
                  }}
                />
              </button>
              <AnimatePresence>
                {platformOpen && <PlatformDropdown onClose={() => setPlatformOpen(false)} />}
              </AnimatePresence>
            </div>

            {/* Simple links */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link"
                style={{
                  padding: '0.6rem 1.2rem',
                  color: pathname === link.href ? '#ffffff' : undefined,
                  fontWeight: pathname === link.href ? 600 : undefined,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right — Live + CTA + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexShrink: 0 }}>
            <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div className="pulse-dot" />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Live</span>
            </div>

            <Link href="/app" className="btn-cta hide-mobile" style={{ fontSize: '1.2rem', padding: '0.8rem 1.8rem' }}>
              Launch App
            </Link>

            {/* Hamburger — mobile */}
            <button
              className="hide-desktop"
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem', color: 'rgba(255,255,255,0.7)' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                {mobileOpen ? (
                  <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                ) : (
                  <>
                    <line x1="3" y1="6"  x2="17" y2="6"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Overlay ────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(10,10,10,0.99)',
              zIndex: 79,
              display: 'flex',
              flexDirection: 'column',
              padding: '9.6rem 3.2rem 4.8rem',
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
              {[
                { label: 'Platform',     href: '/platform' },
                { label: 'Universe',     href: '/universe' },
                { label: 'Governance',   href: '/governance' },
                { label: 'Treasury',     href: '/treasury' },
                { label: 'Security',     href: '/security' },
                { label: 'AI Agents',    href: '/ai-agents' },
                { label: 'Docs',         href: '/docs' },
              ].map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'block',
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: '2.4rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: pathname === link.href ? '#00d4ff' : '#ffffff',
                      textDecoration: 'none',
                      padding: '1.4rem 0',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      transition: 'color 150ms ease',
                    }}
                  >
                    {link.label.toUpperCase()}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/app"
                className="btn-cta"
                style={{ width: '100%', display: 'flex', justifyContent: 'center', fontSize: '1.6rem', padding: '1.4rem 2.8rem' }}
                onClick={() => setMobileOpen(false)}
              >
                Launch App →
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
