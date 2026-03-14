'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_PROPOSALS } from '@/lib/mockData';

export default function GovernanceModule() {
  const [selectedId, setSelectedId] = useState(MOCK_PROPOSALS[0].id);
  const selectedProposal = MOCK_PROPOSALS.find(p => p.id === selectedId) || MOCK_PROPOSALS[0];

  return (
    <div className="flex gap-6 h-full font-rajdhani">
      {/* Left Panel: Proposal List */}
      <aside className="w-[360px] flex flex-col gap-4">
        <div className="holo-panel p-4 border-purple-500/20 bg-void-mid/60">
           <div className="flex items-center justify-between mb-4">
              <span className="font-orbitron font-bold text-text-primary text-[10px] tracking-widest uppercase">Active Proposals</span>
              <span className="font-mono text-[10px] text-purple-700">COUNT: {MOCK_PROPOSALS.length}</span>
           </div>
           <div className="relative">
              <input 
                type="text" 
                placeholder="SEARCH_INDEX..." 
                className="w-full bg-void-deepest border border-black/5 rounded px-3 py-2 text-[10px] font-mono text-text-primary outline-none focus:border-purple-500/50"
              />
           </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          {MOCK_PROPOSALS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`w-full text-left p-4 border transition-all rounded relative group ${selectedId === p.id ? 'bg-purple-500/10 border-purple-500/50 shadow-[0_0_15px_rgba(123,47,247,0.2)]' : 'bg-black/2 border-black/5 hover:bg-black/5'}`}
            >
               <div className="flex justify-between mb-2">
                  <span className="font-mono text-[9px] text-text-tertiary">#{p.id.substring(0,6)}</span>
                  <span className={`font-orbitron text-[8px] px-1.5 py-0.5 rounded border ${p.status === 'active' ? 'text-green-500 border-green-500/30 bg-green-500/5' : 'text-text-tertiary border-black/10'}`}>
                    {p.status.toUpperCase()}
                  </span>
               </div>
               <h4 className={`text-xs font-bold font-orbitron tracking-wider mb-2 ${selectedId === p.id ? 'text-text-primary' : 'text-text-tertiary group-hover:text-text-primary'}`}>
                 {p.title}
               </h4>
               <div className="flex items-center gap-4 text-[9px] font-mono text-text-tertiary">
                  <span>FOR: {p.votesFor.toLocaleString()}</span>
                  <span>AGAINST: {p.votesAgainst.toLocaleString()}</span>
               </div>
               {selectedId === p.id && (
                 <motion.div layoutId="governance-active" className="absolute left-0 top-0 bottom-0 w-0.5 bg-purple-500 shadow-[0_0_10px_#5c14cc]" />
               )}
            </button>
          ))}
        </div>
      </aside>

      {/* Right Panel: Detail View */}
      <main className="flex-1 flex flex-col gap-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col gap-6 min-h-0"
          >
            {/* Proposal Header */}
            <section className="holo-panel p-8 border-purple-500/30 bg-void-mid/60">
               <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="font-mono text-[10px] text-purple-700 mb-2 block tracking-widest uppercase">Proposal Details &gt; Active</span>
                    <h2 className="text-lg font-orbitron font-bold text-text-primary tracking-widest">{selectedProposal.title}</h2>
                  </div>
                  <div className="text-right">
                    <span className="font-orbitron text-[10px] text-text-tertiary uppercase mb-1 block">Time Remaining</span>
                    <span className="font-mono text-text-primary text-sm">12:45:02</span>
                  </div>
               </div>
               
               <p className="font-rajdhani text-text-tertiary text-sm leading-relaxed max-w-3xl mb-8">
                 {selectedProposal.description}
               </p>

               <div className="grid grid-cols-3 gap-6">
                  <div className="p-4 bg-black/2 border border-black/5 rounded">
                     <span className="font-orbitron text-[9px] text-text-tertiary uppercase tracking-widest block mb-2">Author</span>
                     <span className="font-mono text-[10px] text-cyan-500">{selectedProposal.author.substring(0,10)}...</span>
                  </div>
                  <div className="p-4 bg-black/2 border border-black/5 rounded">
                     <span className="font-orbitron text-[9px] text-text-tertiary uppercase tracking-widest block mb-1">Quorum</span>
                     <div className="flex items-center gap-3">
                        <div className="flex-1 h-1 bg-black/10 rounded-full overflow-hidden">
                           <div className="h-full bg-green-500 w-[85%] shadow-[0_0_5px_#008a47]" />
                        </div>
                        <span className="font-mono text-[10px] text-text-primary">85%</span>
                     </div>
                  </div>
                  <div className="p-4 bg-black/2 border border-black/5 rounded">
                     <span className="font-orbitron text-[9px] text-text-tertiary uppercase tracking-widest block mb-2">Total Votes</span>
                     <span className="font-mono text-[10px] text-text-primary">{(selectedProposal.votesFor + selectedProposal.votesAgainst).toLocaleString()} AXION</span>
                  </div>
               </div>
            </section>

            {/* Voting Arena */}
            <section className="grid grid-cols-2 gap-6 flex-1 min-h-0">
               <div className="holo-panel p-6 bg-void-mid/60 space-y-6">
                  <h3 className="font-orbitron font-bold text-text-primary text-[10px] tracking-widest uppercase">Voting Power Distribution</h3>
                  <div className="space-y-6 pt-4">
                     <div className="space-y-2">
                        <div className="flex justify-between font-mono text-[10px]">
                           <span className="text-green-500 uppercase">For</span>
                           <span className="text-text-primary">{selectedProposal.votesFor.toLocaleString()}</span>
                        </div>
                        <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                           <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(selectedProposal.votesFor / (selectedProposal.votesFor + selectedProposal.votesAgainst)) * 100}%` }}
                              className="h-full bg-green-500 shadow-[0_0_10px_#008a47]" 
                           />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <div className="flex justify-between font-mono text-[10px]">
                           <span className="text-magenta-500 uppercase">Against</span>
                           <span className="text-text-primary">{selectedProposal.votesAgainst.toLocaleString()}</span>
                        </div>
                        <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                           <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(selectedProposal.votesAgainst / (selectedProposal.votesFor + selectedProposal.votesAgainst)) * 100}%` }}
                              className="h-full bg-magenta-500 shadow-[0_0_10px_#bd154d]" 
                           />
                        </div>
                     </div>
                  </div>
                  <div className="mt-auto pt-8 flex gap-4">
                     <button className="flex-1 py-4 bg-green-500 text-black font-orbitron font-bold text-[10px] tracking-widest hover:scale-[1.02] transition-transform">CAST_VOTE_FOR</button>
                     <button className="flex-1 py-4 border border-magenta-500 text-magenta-500 font-orbitron font-bold text-[10px] tracking-widest hover:bg-magenta-500/10 transition-colors">CAST_VOTE_AGAINST</button>
                  </div>
               </div>

               <div className="holo-panel p-6 bg-void-mid/60 flex flex-col">
                  <h3 className="font-orbitron font-bold text-text-primary text-[10px] tracking-widest uppercase mb-6">Whale Influence Tracker</h3>
                  <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                     {[...Array(5)].map((_, i) => (
                       <div key={i} className="flex items-center justify-between p-3 border border-black/5 rounded bg-black/2 hover:border-purple-500/30 transition-all cursor-default group">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-sm">🐋</div>
                             <div>
                                <div className="font-mono text-[10px] text-text-primary">0x{Math.random().toString(16).substring(2, 6)}...{Math.random().toString(16).substring(2, 6)}</div>
                                <div className="font-rajdhani text-[9px] text-text-tertiary uppercase tracking-widest">Stake: {(100000 * (5 - i)).toLocaleString()} AXION</div>
                             </div>
                          </div>
                          <span className={`font-orbitron font-bold text-[9px] ${i % 2 === 0 ? 'text-green-500' : 'text-magenta-500'}`}>
                             {i % 2 === 0 ? 'FOR' : 'AGAINST'}
                          </span>
                       </div>
                     ))}
                  </div>
               </div>
            </section>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
