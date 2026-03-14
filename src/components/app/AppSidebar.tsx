'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const MODULES = [
  { id: 'overview', name: 'Neural Network', path: '/app', icon: '🌀', color: 'cyan' },
  { id: 'governance', name: 'Governance Arena', path: '/app/governance', icon: '⚔️', color: 'purple' },
  { id: 'treasury', name: 'Treasury Reactor', path: '/app/treasury', icon: '⚡', color: 'gold' },
  { id: 'contributors', name: 'Contributor Galaxy', path: '/app/contributors', icon: '⭐', color: 'cyan' },
  { id: 'security', name: 'Security Sentinel', path: '/app/security', icon: '🛡️', color: 'magenta' },
  { id: 'simulator', name: 'Multiverse Sim', path: '/app/simulator', icon: '🌀', color: 'green' },
];

const colorMap: Record<string, string> = {
  cyan: 'text-cyan-500',
  purple: 'text-purple-500',
  gold: 'text-gold-500',
  magenta: 'text-magenta-500',
  green: 'text-green-500',
};

const bgMap: Record<string, string> = {
  cyan: 'bg-cyan-500/10',
  purple: 'bg-purple-500/10',
  gold: 'bg-gold-500/10',
  magenta: 'bg-magenta-500/10',
  green: 'bg-green-500/10',
};

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-cyan-500/10 h-screen bg-void-deepest/80 backdrop-blur-xl flex flex-col z-20">
      <div className="p-6 border-b border-black/5">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/50 flex items-center justify-center font-orbitron text-cyan-500 font-bold text-xs group-hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all">
            Ω
          </div>
          <span className="font-orbitron font-bold text-text-primary tracking-widest text-sm">DAO COSMOS</span>
        </Link>
      </div>

      <nav className="flex-1 py-8 px-4 space-y-2">
        {MODULES.map((mod) => {
          const isActive = pathname === mod.path;
          const colorClass = colorMap[mod.color];
          const bgClass = bgMap[mod.color];

          return (
            <Link 
              key={mod.id} 
              href={mod.path}
              className={`flex items-center gap-4 px-4 py-3 rounded group transition-all ${isActive ? `${bgClass} border border-black/10` : 'hover:bg-black/5'}`}
            >
              <span className={`text-lg transition-transform group-hover:scale-110 ${isActive ? colorClass : 'text-text-tertiary'}`}>
                {mod.icon}
              </span>
              <span className={`font-orbitron text-[10px] tracking-[0.2em] transition-colors ${isActive ? 'text-text-primary' : 'text-text-tertiary group-hover:text-text-primary'}`}>
                {mod.name.toUpperCase()}
              </span>
              {isActive && (
                <motion.div 
                   layoutId="active-nav"
                   className={`ml-auto w-1 h-4 rounded-full ${colorClass.replace('text-', 'bg-')} shadow-[0_0_10px_currentColor]`}
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-black/5 space-y-4">
        <div className="p-3 bg-black/5 border border-black/10 rounded flex items-center justify-between">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-mono text-[10px] text-text-tertiary uppercase">Wallet Connected</span>
           </div>
           <span className="font-mono text-[10px] text-text-primary">0x...f2a1</span>
        </div>
        <button className="w-full py-3 bg-cyan-500 font-orbitron text-black font-bold text-[10px] tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2">
           <span className="text-sm">⚙</span> SYSTEM_SETTINGS
        </button>
      </div>
    </aside>
  );
}
