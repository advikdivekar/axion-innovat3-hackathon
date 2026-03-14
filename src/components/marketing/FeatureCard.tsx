'use client';

import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
}

const colorVariants: Record<string, string> = {
  cyan: 'text-cyan-500 border-cyan-500/20 shadow-[0_0_15px_rgba(0,240,255,0.1)]',
  purple: 'text-purple-500 border-purple-500/20 shadow-[0_0_15px_rgba(123,47,247,0.1)]',
  gold: 'text-gold-500 border-gold-500/20 shadow-[0_0_15px_rgba(255,215,0,0.1)]',
  magenta: 'text-magenta-500 border-magenta-500/20 shadow-[0_0_15px_rgba(255,45,106,0.1)]',
  green: 'text-green-500 border-green-500/20 shadow-[0_0_15px_rgba(0,255,136,0.1)]',
};

export default function FeatureCard({ title, description, icon, color }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className={`holo-panel p-8 group cursor-default transition-all duration-300 ${colorVariants[color] || colorVariants.cyan}`}
    >
      <div className="mb-6 text-4xl group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="font-orbitron font-bold text-text-primary text-sm tracking-widest uppercase mb-4 group-hover:text-current transition-colors">
        {title}
      </h3>
      <p className="font-rajdhani text-text-tertiary leading-relaxed">
        {description}
      </p>
      
      {/* Decorative Corner that glows more on hover */}
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-current opacity-20 group-hover:opacity-100 transition-opacity"></div>
    </motion.div>
  );
}
