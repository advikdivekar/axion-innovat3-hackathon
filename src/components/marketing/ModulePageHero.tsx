'use client';

import { motion } from 'framer-motion';

interface ModulePageHeroProps {
  title: string;
  tagline: string;
  accentColor: string; // e.g., 'cyan', 'purple', 'gold', 'magenta', 'green'
}

const colorMap: Record<string, { text: string; bg: string; glow: string }> = {
  cyan: { text: 'text-cyan-500', bg: 'bg-cyan-500/10', glow: 'shadow-[0_0_50px_rgba(0,240,255,0.3)]' },
  purple: { text: 'text-purple-500', bg: 'bg-purple-500/10', glow: 'shadow-[0_0_50px_rgba(123,47,247,0.3)]' },
  gold: { text: 'text-gold-500', bg: 'bg-gold-500/10', glow: 'shadow-[0_0_50px_rgba(255,215,0,0.3)]' },
  magenta: { text: 'text-magenta-500', bg: 'bg-magenta-500/10', glow: 'shadow-[0_0_50px_rgba(255,45,106,0.3)]' },
  green: { text: 'text-green-500', bg: 'bg-green-500/10', glow: 'shadow-[0_0_50px_rgba(0,255,136,0.3)]' },
};

export default function ModulePageHero({ title, tagline, accentColor }: ModulePageHeroProps) {
  const colors = colorMap[accentColor] || colorMap.cyan;

  return (
    <section className="relative pt-32 pb-24 overflow-hidden border-b border-black/5">
      {/* Background Accent Glow */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[120px] rounded-full opacity-30 pointer-events-none ${colors.bg}`}></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 ${colors.bg} backdrop-blur-md mb-8`}
        >
          <div className={`w-2 h-2 rounded-full ${colors.text.replace('text-', 'bg-')} animate-pulse`}></div>
          <span className={`${colors.text} font-orbitron text-xs tracking-[0.2em] font-bold uppercase`}>Mission Control Module</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-hero text-text-primary mb-6 lg:text-7xl"
        >
          {title}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-rajdhani text-xl text-text-tertiary max-w-2xl mb-12"
        >
          {tagline}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-6"
        >
          <button className={`glow-btn !px-12 !py-4 ${colors.text} border-${accentColor}-500 group relative overflow-hidden transition-all duration-300`}>
             <span className="relative z-10 group-hover:text-black transition-colors">Launch Module</span>
             <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 ${colors.text.replace('text-', 'bg-')} transition-transform duration-300`}></div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
