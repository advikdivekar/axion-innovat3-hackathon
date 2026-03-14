'use client';

import { motion } from 'framer-motion';

export default function TrustBar() {
  const logos = ['Ethereum', 'Alchemy', 'Anthropic', 'Supabase', 'Next.js', 'Three.js'];

  return (
    <section className="py-24 border-y border-black/5 bg-void-mid/20">
      <div className="container mx-auto px-6 text-center">
        <span className="font-orbitron text-[9px] text-text-tertiary tracking-[0.4em] uppercase mb-12 block">
          built on battle-tested infrastructure
        </span>
        
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20">
           {logos.map((logo) => (
             <motion.div 
               key={logo}
               whileHover={{ scale: 1.1, opacity: 1 }}
               className="font-orbitron text-sm font-bold text-text-primary/40 tracking-widest uppercase cursor-default transition-all"
             >
                {logo}
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
