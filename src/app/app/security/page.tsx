'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const THREATS = [
  { id: 1, type: 'Sybil Attack', severity: 'critical', actor: '0x12a3...c4d5', target: 'Proposal #127', time: '2 mins ago', desc: 'Coordinated voting pattern detected from 42 newly funded wallets.' },
  { id: 2, type: 'Treasury Drain', severity: 'high', actor: 'Unknown', target: 'Vault Alpha', time: '14 mins ago', desc: 'Unusual withdrawal request exceeding daily threshold for multisig 0x7b...f2.' },
  { id: 3, type: 'Flash Loan', severity: 'medium', actor: '0x9e1d...e2f3', target: 'Staking Pool', time: '1 hour ago', desc: 'Large flash loan spike detected in governance stake contract.' },
  { id: 4, type: 'Anomaly', severity: 'low', actor: '0x4c2b...a1b2', target: 'API Endpoint', time: '3 hours ago', desc: 'Subtle high-frequency queries detected from single IP address.' },
];

const severityColors: Record<string, string> = {
  critical: 'text-magenta-500 border-magenta-500 bg-magenta-500/10 shadow-[0_0_10px_rgba(255,45,106,0.3)]',
  high: 'text-orange-500 border-orange-500 bg-orange-500/10',
  medium: 'text-yellow-500 border-yellow-500 bg-yellow-500/10',
  low: 'text-cyan-500 border-cyan-500 bg-cyan-500/10',
};

export default function SecurityModule() {
  const [selectedId, setSelectedId] = useState<number>(1);
  const selectedThreat = THREATS.find(t => t.id === selectedId) || THREATS[0];

  return (
    <div className="flex gap-6 h-full font-rajdhani overflow-hidden">
      {/* Left Panel: Threat List */}
      <aside className="w-[380px] flex flex-col gap-4">
        <div className="holo-panel p-4 border-magenta-500/20 bg-void-mid/60">
           <div className="flex items-center justify-between mb-2">
              <span className="font-orbitron font-bold text-text-primary text-[10px] tracking-widest uppercase">Defense Status</span>
              <span className="font-mono text-[9px] text-magenta-500 animate-pulse">WAR_MODE_ACTIVE</span>
           </div>
           <div className="flex gap-1 h-1.5 mb-2">
              {[...Array(12)].map((_, i) => (
                <div key={i} className={`flex-1 rounded-sm ${i < 9 ? 'bg-magenta-500' : 'bg-black/10'}`} />
              ))}
           </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
           {THREATS.map((t) => (
             <button
               key={t.id}
               onClick={() => setSelectedId(t.id)}
               className={`w-full text-left p-4 border transition-all rounded relative group ${selectedId === t.id ? 'bg-magenta-500/10 border-magenta-500/50' : 'bg-black/2 border-black/5 hover:bg-black/5'}`}
             >
                <div className="flex justify-between items-center mb-2">
                   <span className={`font-orbitron font-bold text-[8px] px-2 py-0.5 rounded border uppercase tracking-widest ${severityColors[t.severity]}`}>
                      {t.severity}
                   </span>
                   <span className="font-mono text-[9px] text-text-tertiary">{t.time}</span>
                </div>
                <h4 className="font-orbitron font-bold text-text-primary text-[11px] tracking-widest uppercase mb-1">{t.type}</h4>
                <div className="font-mono text-[9px] text-text-tertiary truncate">TARGET: {t.target}</div>
                {selectedId === t.id && (
                  <motion.div layoutId="security-active" className="absolute left-0 top-0 bottom-0 w-0.5 bg-magenta-500 shadow-[0_0_10px_#bd154d]" />
                )}
             </button>
           ))}
        </div>
      </aside>

      {/* Center/Right: Radar & Intelligence */}
      <main className="flex-1 flex flex-col gap-6 overflow-hidden">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
            {/* Threat Radar Display */}
            <section className="holo-panel p-8 bg-void-mid/60 flex flex-col items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 scanlines opacity-30"></div>
               <div className="relative w-64 h-64 border border-magenta-500/20 rounded-full flex items-center justify-center">
                  <div className="absolute w-[80%] h-[80%] border border-magenta-500/10 rounded-full"></div>
                  <div className="absolute w-[60%] h-[60%] border border-magenta-500/10 rounded-full"></div>
                  <div className="absolute w-[40%] h-[40%] border border-magenta-500/10 rounded-full"></div>
                  
                  {/* Radar Sweep */}
                  <div className="absolute top-0 left-1/2 w-1 h-1/2 bg-gradient-to-t from-magenta-500 to-transparent origin-bottom animate-[spin_4s_linear_infinite]" />
                  
                  {/* Active Threat Dots */}
                  {THREATS.map((t, idx) => (
                    <motion.div
                      key={t.id}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.5 }}
                      className={`absolute w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${severityColors[t.severity].split(' ')[0]}`}
                      style={{ 
                        top: `${20 + idx * 15}%`, 
                        left: `${30 + idx * 10}%` 
                      }}
                    />
                  ))}
               </div>
               <div className="mt-8 text-center">
                  <span className="font-orbitron text-magenta-500 text-[10px] tracking-[.4em] font-bold">RADAR_ACTIVE</span>
                  <p className="font-mono text-[9px] text-text-tertiary mt-2 uppercase">Tracing_Anomaly_Signature_0x42...</p>
               </div>
            </section>

            {/* AI Risk Assessment */}
            <section className="holo-panel p-8 bg-void-mid/60">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded bg-magenta-500/10 border border-magenta-500/30 flex items-center justify-center">🤖</div>
                  <h3 className="font-orbitron font-bold text-text-primary text-[10px] tracking-widest uppercase">Sentinel Intelligence</h3>
               </div>
               <div className="space-y-6">
                  <div className="p-4 border border-magenta-500/20 bg-magenta-500/5 rounded">
                     <span className="font-orbitron text-[9px] text-magenta-500 uppercase font-bold tracking-widest block mb-2">Threat Likelihood</span>
                     <div className="flex items-center gap-4">
                        <div className="flex-1 h-1.5 bg-black/5 rounded-full overflow-hidden">
                           <div className="h-full bg-magenta-500 w-[92%] shadow-[0_0_5px_#bd154d]" />
                        </div>
                        <span className="font-mono text-xs text-text-primary">92%</span>
                     </div>
                  </div>
                  <p className="font-rajdhani text-text-tertiary text-sm leading-relaxed">
                     The Sentinel has identified a cluster of 42 wallets with shared funding sources participating in Proposal #127. Probability of a coordinated sybil attack is high. Recommended Action: Temporary vote weight reduction for detected accounts.
                  </p>
                  <button className="w-full py-4 bg-magenta-500 text-black font-orbitron font-bold text-[10px] tracking-widest hover:brightness-110 transition-all">
                     ACTIVATE_DEFENSIVE_LOCK
                  </button>
               </div>
            </section>
         </div>

         {/* Chronological Alert Feed */}
         <section className="flex-1 holo-panel flex flex-col min-h-0">
            <div className="p-6 border-b border-black/5 bg-void-mid/20 flex items-center justify-between">
               <h3 className="font-orbitron font-bold text-text-primary text-[10px] tracking-widest uppercase">Security Security Sentinel_Log</h3>
               <span className="font-mono text-[9px] text-text-tertiary uppercase">Real-time Stream</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-px p-1 custom-scrollbar">
               {[...Array(15)].map((_, i) => (
                 <div key={i} className="flex gap-6 px-6 py-3 hover:bg-black/2 transition-colors border-b border-black/5 last:border-0 font-mono text-[9px]">
                    <span className="text-text-tertiary w-16">20:46:1{i}</span>
                    <span className={`w-20 ${i % 4 === 0 ? 'text-magenta-500' : 'text-cyan-500'}`}>[{i % 4 === 0 ? 'CRITICAL' : 'TRACE'}]</span>
                    <span className="flex-1 text-text-tertiary">
                       {i % 4 === 0 
                         ? 'SEC_SENTINEL: DETECTED_COORD_VOTE_CLUSTER_0x42...F3' 
                         : 'SYSTEM_KERNEL: BLOCK_INITIALIZED_#194285' + i}
                    </span>
                 </div>
               ))}
            </div>
         </section>
      </main>
    </div>
  );
}
