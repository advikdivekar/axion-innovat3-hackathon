'use client';

import { motion } from 'framer-motion';
import { useDAOStore } from '@/store/daoStore';
import { MOCK_PROPOSALS } from '@/lib/mockData';

export default function AppPage() {
  const { systemStats, isLoading } = useDAOStore();

  const healthMetrics = [
    { label: 'GOVERNANCE', score: 88, color: 'text-purple-500', bar: 'bg-purple-500' },
    { label: 'TREASURY', score: 94, color: 'text-gold-500', bar: 'bg-gold-500' },
    { label: 'CONTRIBUTOR', score: 72, color: 'text-cyan-500', bar: 'bg-cyan-500' },
    { label: 'SECURITY', score: 81, color: 'text-magenta-500', bar: 'bg-magenta-500' },
  ];

  return (
    <div className="grid grid-cols-12 gap-6 h-full">
      {/* Left / Center: Visualization Area (Handled by Canvas in Layout) */}
      <div className="col-span-12 lg:col-span-8 flex flex-col pointer-events-none">
         <div className="mt-auto pb-4">
            <div className="holo-panel p-6 bg-void-mid/40 border-black/5 pointer-events-auto max-w-2xl">
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                  <span className="font-orbitron text-[10px] text-text-primary tracking-[.3em] uppercase">Tactical Overview</span>
               </div>
               <p className="font-rajdhani text-text-tertiary text-sm leading-relaxed mb-6">
                 The Axion DAO Universe is currently stable. AI Agents are monitoring 4 sectors. 
                 Treasury Reactor is operating at 94% efficiency. No critical governance threats detected in the last 24 hours.
               </p>
               <div className="flex gap-3">
                  <button className="px-4 py-2 border border-cyan-500/20 bg-cyan-500/5 font-orbitron text-[9px] text-cyan-500 hover:bg-cyan-500 hover:text-black transition-all">GENERATE_SUMMARY</button>
                  <button className="px-4 py-2 border border-black/10 bg-black/5 font-orbitron text-[9px] text-text-primary hover:bg-black/10 transition-all">SCAN_SECTOR_7</button>
               </div>
            </div>
         </div>
      </div>

      {/* Right Side: Health & AI Panels */}
      <div className="col-span-12 lg:col-span-4 space-y-6 overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar">
        {/* DAO Health Card */}
        <section className="holo-panel p-6 border-cyan-500/20 bg-void-mid/60">
           <div className="flex items-center justify-between mb-8">
              <h3 className="font-orbitron font-bold text-text-primary tracking-widest text-xs uppercase">DAO_HEALTH_INDEX</h3>
              <span className="font-mono text-cyan-500 font-bold">84%</span>
           </div>
           
           <div className="space-y-6">
              {healthMetrics.map((m) => (
                <div key={m.label} className="space-y-2">
                   <div className="flex justify-between font-orbitron text-[9px] tracking-widest mb-1">
                      <span className="text-text-tertiary">{m.label}</span>
                      <span className={m.color}>{m.score}%</span>
                   </div>
                   <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${m.score}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full ${m.bar} shadow-[0_0_8px_currentColor]`} 
                      />
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-8 pt-6 border-t border-black/5">
              <div className="flex items-center justify-between text-[10px] font-mono mb-4 text-text-tertiary">
                 <span>Active Proposals</span>
                 <span className="text-text-primary">12</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-text-tertiary">
                 <span>Total Staked</span>
                 <span className="text-text-primary">4.2M AXION</span>
              </div>
           </div>
        </section>

        {/* AI Agent Quick Actions */}
        <section className="holo-panel p-6 border-purple-500/20 bg-void-mid/60">
           <h3 className="font-orbitron font-bold text-text-primary tracking-widest text-xs uppercase mb-6">AI_COMMAND_CORE</h3>
           <div className="space-y-3 font-rajdhani">
              <button className="w-full text-left p-4 border border-black/5 bg-black/2 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all rounded group">
                 <div className="font-orbitron text-[9px] text-purple-700 mb-1 group-hover:text-purple-300">GOVERNANCE_AGENT</div>
                 <div className="text-xs text-text-tertiary">&quot;Summarize current voting threats&quot;</div>
              </button>
              <button className="w-full text-left p-4 border border-black/5 bg-black/2 hover:bg-gold-500/10 hover:border-gold-500/30 transition-all rounded group">
                 <div className="font-orbitron text-[9px] text-gold-400 mb-1 group-hover:text-gold-300">TREASURY_AGENT</div>
                 <div className="text-xs text-text-tertiary">&quot;Find unusual fund movements&quot;</div>
              </button>
           </div>
        </section>

        {/* Event Log */}
        <section className="holo-panel p-6 flex flex-col h-[400px]">
           <h3 className="font-orbitron font-bold text-text-primary tracking-widest text-xs uppercase mb-4 border-b border-black/5 pb-4">
              INTEL_FEED
           </h3>
           <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar font-mono text-[9px]">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex gap-4 border-l border-black/10 pl-4 py-1">
                   <span className="text-text-tertiary">02:14:{12 + i}</span>
                   <div className="flex-1">
                      <span className="text-cyan-500">[LOG]</span>
                      <span className="text-text-tertiary ml-2 uppercase">System synchronized with block #194285{12 + i}</span>
                   </div>
                </div>
              ))}
              <div className="flex gap-4 border-l border-magenta-500/30 pl-4 py-1 bg-magenta-500/5">
                 <span className="text-magenta-500">02:14:11</span>
                 <div className="flex-1">
                    <span className="text-magenta-500">[WARN]</span>
                    <span className="text-text-primary ml-2 uppercase">Unusual stake volume detected on Proposal #127</span>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}
