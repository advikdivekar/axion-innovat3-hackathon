'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CONTRIBUTORS = [
  { id: 1, name: '0x742d...f2a1', ens: 'vitalik.eth', class: 'Architect', xp: 4200, power: '12.4%', color: 'text-cyan-500', icon: '🏛️' },
  { id: 2, name: '0x3a1b...e9c2', ens: 'governor.eth', class: 'Diplomat', xp: 3800, power: '8.2%', color: 'text-purple-500', icon: '🤝' },
  { id: 3, name: '0xf92c...d4a3', ens: 'sentinel.eth', class: 'Sentinel', xp: 3100, power: '4.5%', color: 'text-magenta-500', icon: '🛡️' },
  { id: 4, name: '0xe81d...c5b4', ens: 'merchant.eth', class: 'Merchant', xp: 2900, power: '2.1%', color: 'text-gold-500', icon: '💰' },
  { id: 5, name: '0xb30f...a7d6', ens: 'explorer.eth', class: 'Explorer', xp: 1200, power: '0.8%', color: 'text-green-500', icon: '🔭' },
];

export default function ContributorsModule() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filter, setFilter] = useState('All');

  const selectedContributor = CONTRIBUTORS.find(c => c.id === selectedId);

  return (
    <div className="flex flex-col h-full font-rajdhani overflow-hidden">
      {/* Top Filter Bar */}
      <section className="holo-panel p-4 mb-6 flex items-center justify-between border-cyan-500/20 bg-void-mid/60">
        <div className="flex items-center gap-6">
           <span className="font-orbitron font-bold text-text-primary text-[10px] tracking-widest uppercase">Filter Sector</span>
           <div className="flex gap-2">
              {['All', 'Architect', 'Diplomat', 'Sentinel', 'Merchant', 'Explorer'].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3 py-1.5 font-orbitron text-[8px] tracking-[0.2em] rounded border transition-all ${filter === cat ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_10px_rgba(0,240,255,0.4)]' : 'text-text-tertiary border-black/5 hover:border-black/20'}`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
           </div>
        </div>
        <div className="font-mono text-[10px] text-cyan-500">TOTAL_CONTRIBUTORS: 12,402</div>
      </section>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Main Content: Leaderboard / Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-2 custom-scrollbar">
          {CONTRIBUTORS.filter(c => filter === 'All' || c.class === filter).map((c) => (
            <motion.div
              layout
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className={`holo-panel p-6 cursor-pointer group transition-all ${selectedId === c.id ? 'border-cyan-500/50 bg-cyan-500/10' : 'hover:border-black/20 bg-void-mid/40'}`}
            >
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 rounded-full bg-void-deepest border border-black/10 flex items-center justify-center text-xl group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all">
                    {c.icon}
                 </div>
                 <div>
                    <h4 className="font-orbitron font-bold text-text-primary text-xs tracking-wider uppercase mb-1">{c.ens}</h4>
                    <span className={`font-mono text-[9px] ${c.color} uppercase tracking-widest`}>{c.class}</span>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/5">
                 <div>
                    <span className="font-orbitron text-[8px] text-text-tertiary tracking-widest block mb-1">XP Level</span>
                    <span className="font-mono text-[10px] text-text-primary">Lvl {Math.floor(c.xp / 1000)}</span>
                 </div>
                 <div className="text-right">
                    <span className="font-orbitron text-[8px] text-text-tertiary tracking-widest block mb-1">Vote Power</span>
                    <span className="font-mono text-[10px] text-text-primary">{c.power}</span>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Sidebar: Profile Detail */}
        <AnimatePresence>
          {selectedId && selectedContributor && (
            <motion.aside
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="w-[360px] holo-panel border-cyan-500/30 bg-void-mid/80 backdrop-blur-xl flex flex-col pointer-events-auto"
            >
               <div className="p-6 border-b border-black/5 flex justify-between items-center">
                  <span className="font-orbitron font-bold text-text-primary text-[10px] tracking-widest uppercase">Contributor Profile</span>
                  <button onClick={() => setSelectedId(null)} className="text-text-tertiary hover:text-text-primary transition-colors">✕</button>
               </div>
               
               <div className="p-8 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-void-deepest border-2 border-cyan-500/40 p-1 mb-6">
                     <div className="w-full h-full rounded-full bg-cyan-500/10 flex items-center justify-center text-4xl">
                        {selectedContributor.icon}
                     </div>
                  </div>
                  <h2 className="font-orbitron font-bold text-text-primary text-lg tracking-[0.2em] mb-2">{selectedContributor.ens}</h2>
                  <span className="font-mono text-xs text-text-tertiary mb-8">{selectedContributor.name}</span>
                  
                  <div className="w-full grid grid-cols-2 gap-4 mb-8">
                     <div className="p-4 bg-black/2 border border-black/5 rounded text-center">
                        <span className="font-orbitron text-[8px] text-text-tertiary uppercase mb-2 block">XP SCORE</span>
                        <span className="font-mono text-sm text-cyan-500 font-bold">{selectedContributor.xp.toLocaleString()}</span>
                     </div>
                     <div className="p-4 bg-black/2 border border-black/5 rounded text-center">
                        <span className="font-orbitron text-[8px] text-text-tertiary uppercase mb-2 block">RANK</span>
                        <span className="font-mono text-sm text-text-primary font-bold">TOP 5%</span>
                     </div>
                  </div>

                  <div className="w-full space-y-4">
                     <h5 className="font-orbitron font-bold text-[9px] text-text-tertiary uppercase tracking-widest">Recent Activity</h5>
                     {[...Array(3)].map((_, i) => (
                       <div key={i} className="p-3 border border-black/5 bg-black/2 rounded flex items-center justify-between">
                          <span className="font-mono text-[9px] text-text-tertiary uppercase">Proposal_Vote_#12{i}</span>
                          <span className="font-mono text-[9px] text-green-500">+12 XP</span>
                       </div>
                     ))}
                  </div>
                  
                  <button className="w-full mt-12 py-4 border border-cyan-500 text-cyan-500 font-orbitron font-bold text-[10px] tracking-widest hover:bg-cyan-500 hover:text-black transition-all">
                     VIEW_ON_Etherscan
                  </button>
               </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
