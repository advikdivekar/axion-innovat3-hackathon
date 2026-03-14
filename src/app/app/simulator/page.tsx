'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SCENARIOS = [
  'Market Crash (-40% Treasury)',
  'Governance Takeover Attempt',
  'Treasury Liquidity Depletion',
  'Whale Influence Spike',
  'Contributor Exodus',
];

const TIMELINES = [
  { id: 'alpha', name: 'Timeline Alpha', prob: '65%', status: 'Stable', metric: '+12%', color: 'text-green-500', desc: 'The organization absorbs the shock through treasury reserves. Governance remains decentralized.' },
  { id: 'beta', name: 'Timeline Beta', prob: '25%', status: 'Volatile', metric: '-34%', color: 'text-yellow-500', desc: 'Treasury depletion causes contributor attrition. Governance power concentrates in top 3 whales.' },
  { id: 'gamma', name: 'Timeline Gamma', prob: '10%', status: 'Critical', metric: '-82%', color: 'text-magenta-500', desc: 'Systemic failure. Treasury drain exceeds recovery capacity. Organization dissolution likely.' },
];

export default function SimulatorModule() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [severity, setSeverity] = useState(50);

  const runSimulation = () => {
    setIsSimulating(true);
    setShowResults(false);
    setTimeout(() => {
      setIsSimulating(false);
      setShowResults(true);
    }, 2500);
  };

  return (
    <div className="flex gap-6 h-full font-rajdhani overflow-hidden">
      {/* Left Panel: Scenario Builder */}
      <aside className="w-[360px] flex flex-col gap-6">
        <section className="holo-panel p-6 border-green-500/20 bg-void-mid/60">
           <h3 className="font-orbitron font-bold text-text-primary text-[10px] tracking-widest uppercase mb-8">Scenario Configuration</h3>
           
           <div className="space-y-6">
              <div>
                 <label className="font-orbitron text-[9px] text-text-tertiary uppercase tracking-widest block mb-3">Scenario Type</label>
                 <select className="w-full bg-void-deepest border border-black/5 rounded px-3 py-3 text-xs text-text-primary outline-none focus:border-green-500/50 appearance-none font-rajdhani">
                    {SCENARIOS.map(s => <option key={s}>{s}</option>)}
                 </select>
              </div>

              <div>
                 <div className="flex justify-between mb-3">
                    <label className="font-orbitron text-[9px] text-text-tertiary uppercase tracking-widest">Severity Level</label>
                    <span className="font-mono text-xs text-green-500">{severity}%</span>
                 </div>
                 <input 
                   type="range" 
                   min="0" 
                   max="100" 
                   value={severity}
                   onChange={(e) => setSeverity(parseInt(e.target.value))}
                   className="w-full accent-green-500 bg-black/5 h-1 rounded-full appearance-none cursor-pointer"
                 />
              </div>

              <div className="pt-6 border-t border-black/5">
                 <button 
                   onClick={runSimulation}
                   disabled={isSimulating}
                   className={`w-full py-4 bg-green-500 text-black font-orbitron font-bold text-[10px] tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-3 ${isSimulating ? 'opacity-50 cursor-not-allowed' : ''}`}
                 >
                    {isSimulating ? (
                      <>
                        <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        COMPUTING_BRANCHES...
                      </>
                    ) : (
                      'EXECUTE_SIMULATION'
                    )}
                 </button>
              </div>
           </div>
        </section>

        <section className="holo-panel p-6 bg-void-mid/60 flex-1">
           <h3 className="font-orbitron font-bold text-text-primary text-[10px] tracking-widest uppercase mb-4">Baseline Metrics</h3>
           <div className="space-y-4">
              {[
                { label: 'QUORUM_PROB', val: '92.4%' },
                { label: 'TREASURY_SOLVENCY', val: 'OPTIMAL' },
                { label: 'CONTRIB_VELOCITY', val: '0.82x' },
              ].map(stat => (
                <div key={stat.label} className="p-3 border border-black/5 bg-black/2 rounded flex justify-between items-center">
                   <span className="font-mono text-[9px] text-text-tertiary">{stat.label}</span>
                   <span className="font-mono text-[10px] text-text-primary">{stat.val}</span>
                </div>
              ))}
           </div>
        </section>
      </aside>

      {/* Main Content: Results / Timeline Area */}
      <main className="flex-1 flex flex-col gap-6 overflow-hidden">
         {!showResults && !isSimulating && (
           <div className="flex-1 holo-panel bg-void-mid/20 flex flex-col items-center justify-center text-center p-12">
              <div className="w-20 h-20 rounded-full border border-black/5 flex items-center justify-center mb-8 opacity-20">
                 <span className="text-4xl text-green-500">🌿</span>
              </div>
              <h2 className="text-lg font-orbitron font-bold text-text-tertiary mb-4">NO SIMULATION DATA</h2>
              <p className="font-rajdhani text-text-tertiary max-w-sm">Configure and execute a scenario to generate branching multiverse projections for the organization.</p>
           </div>
         )}

         {isSimulating && (
           <div className="flex-1 holo-panel bg-void-mid/60 flex flex-col items-center justify-center">
              <div className="relative w-48 h-1 bg-black/5 rounded-full overflow-hidden mb-8">
                 <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-green-500 shadow-[0_0_15px_#008a47]"
                 />
              </div>
              <div className="font-orbitron text-xs text-green-500 animate-pulse tracking-[0.4em]">FORKING_TIMELINES...</div>
           </div>
         )}

         {showResults && (
           <div className="flex-1 flex flex-col gap-6 overflow-hidden">
              <div className="grid grid-cols-3 gap-6">
                 {TIMELINES.map((t, idx) => (
                   <motion.div
                     key={t.id}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.1 }}
                     className={`holo-panel p-6 bg-void-mid/60 border-black/5 relative group hover:border-green-500/30 transition-all cursor-default overflow-hidden`}
                   >
                     {idx === 0 && <div className="absolute top-0 right-0 px-3 py-1 bg-green-500 text-black font-orbitron text-[8px] font-bold tracking-widest">MOST_PROBABLE</div>}
                     <div className="flex justify-between items-center mb-6">
                        <span className={`font-orbitron font-bold text-sm tracking-widest ${t.color}`}>{t.prob}</span>
                        <span className="font-mono text-[9px] text-text-tertiary uppercase">{t.status}</span>
                     </div>
                     <h4 className="font-orbitron font-bold text-text-primary text-[11px] mb-4 uppercase tracking-widest">{t.name}</h4>
                     <p className="font-rajdhani text-text-tertiary text-xs leading-relaxed mb-6 h-12 overflow-hidden">{t.desc}</p>
                     
                     <div className="pt-4 border-t border-black/5 flex justify-between items-center">
                        <span className="font-mono text-[10px] text-text-tertiary">DAO_HEALTH</span>
                        <span className={`font-mono text-xs font-bold ${t.color}`}>{t.metric}</span>
                     </div>
                   </motion.div>
                 ))}
              </div>

              {/* Detailed Simulation Summary */}
              <section className="flex-1 holo-panel p-8 bg-void-mid/80 border-green-500/20 overflow-y-auto custom-scrollbar">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded border border-green-500/50 flex items-center justify-center text-xl">🧠</div>
                    <div>
                       <h3 className="font-orbitron font-bold text-text-primary text-xs tracking-widest uppercase">AI IMPACT ASSESSMENT</h3>
                       <span className="font-mono text-[9px] text-green-500 uppercase">Scenario_Analysis_Complete_v2.1</span>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-12 font-rajdhani">
                    <div className="space-y-6">
                       <h5 className="font-orbitron text-[10px] text-text-primary tracking-[.2em] uppercase border-b border-black/5 pb-2">Primary Risks</h5>
                       <ul className="space-y-3 text-text-tertiary text-sm">
                          <li className="flex items-start gap-3">
                             <span className="text-magenta-500">▶</span> 
                             Liquidity depth insufficient for -40% treasury stress.
                          </li>
                          <li className="flex items-start gap-3">
                             <span className="text-magenta-500">▶</span> 
                             Governance participation falls below 40% quorum required.
                          </li>
                       </ul>
                    </div>
                    <div className="space-y-6">
                       <h5 className="font-orbitron text-[10px] text-text-primary tracking-[.2em] uppercase border-b border-black/5 pb-2">Mitigation Strategies</h5>
                       <ul className="space-y-3 text-text-tertiary text-sm">
                          <li className="flex items-start gap-3">
                             <span className="text-green-500">▶</span> 
                             Diversify reserve assets into stable-protocol yields.
                          </li>
                          <li className="flex items-start gap-3">
                             <span className="text-green-500">▶</span> 
                             Implement dynamic quorum thresholds for emergency scenarios.
                          </li>
                       </ul>
                    </div>
                 </div>
              </section>
           </div>
         )}
      </main>
    </div>
  );
}
