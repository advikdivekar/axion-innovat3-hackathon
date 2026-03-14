'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const MODULES = [
  { name: 'Universe', path: '/universe', color: 'text-cyan-500', icon: '🌌' },
  { name: 'Governance', path: '/governance', color: 'text-purple-500', icon: '⚔️' },
  { name: 'Treasury', path: '/treasury', color: 'text-gold-500', icon: '💰' },
  { name: 'Security', path: '/security', color: 'text-magenta-500', icon: '🛡️' },
  { name: 'Platform', path: '/platform', color: 'text-cyan-500', icon: '⚡' },
];

export default function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname.startsWith('/app')) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center px-4 pt-4 md:pt-6">
      <nav className={`w-full max-w-7xl transition-all duration-500 rounded-full border ${scrolled ? 'bg-white/40 backdrop-blur-md h-16 border-black/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]' : 'bg-white/10 backdrop-blur-sm h-20 border-white/20 shadow-sm'}`}>
        <div className="w-full px-8 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded bg-cyan-500/10 border border-cyan-500/50 flex items-center justify-center font-orbitron text-cyan-500 font-bold text-lg group-hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all">
              Ω
            </div>
            <div className="flex flex-col">
              <span className="font-orbitron font-bold text-text-primary tracking-[0.3em] text-sm group-hover:text-cyan-500 transition-colors">DAO COSMOS</span>
              <span className="font-rajdhani text-[8px] text-text-tertiary tracking-[0.4em] uppercase">Operating System</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-12">
            {MODULES.map((m) => (
              <Link 
                key={m.name} 
                href={m.path}
                className="font-orbitron text-[10px] text-text-tertiary tracking-[0.2em] uppercase hover:text-text-primary transition-all relative group"
              >
                {m.name}
                <span className={`absolute -bottom-2 left-0 w-0 h-0.5 ${m.color.replace('text-', 'bg-')} transition-all group-hover:w-full`}></span>
              </Link>
            ))}
            <Link 
              href="/docs"
              className="font-orbitron text-[10px] text-text-tertiary tracking-[0.2em] uppercase hover:text-text-primary transition-all"
            >
              Docs
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-orbitron text-[8px] text-green-500 tracking-widest uppercase font-bold">LIVE System</span>
            </div>
            <Link 
              href="/app" 
              className="glow-btn !px-6 !py-2.5 !text-[9px]"
            >
              Launch App
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
