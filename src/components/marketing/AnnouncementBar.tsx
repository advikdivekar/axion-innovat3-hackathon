'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-cyan-500/10 border-b border-cyan-500/20 py-2.5 relative overflow-hidden group"
        >
          <div className="flex items-center justify-center gap-8">
             <div className="flex items-center gap-4 animate-marquee-fast pause-hover">
                <span className="font-orbitron text-[9px] text-cyan-500 font-bold tracking-[.3em] uppercase">
                  ⚡ DAO Cosmos OS v1.0 Live on Ethereum Mainnet — Mission Control for Decentralized Organizations »
                </span>
                <span className="text-cyan-500/30 text-xs">•</span>
                <span className="font-orbitron text-[9px] text-cyan-500 font-bold tracking-[.3em] uppercase">
                  Explore the 3D Universe and AI-Powered Governance with Axion Intelligence »
                </span>
             </div>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500/50 hover:text-cyan-500 transition-colors text-xs"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
