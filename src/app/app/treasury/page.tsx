'use client';

import { motion } from 'framer-motion';
import { MOCK_TREASURY } from '@/lib/mockData';

export default function TreasuryModule() {
  const assets = MOCK_TREASURY;
  const totalValue = assets.reduce((acc, curr) => acc + curr.valueUsd, 0);

  return (
    <div className="flex flex-col gap-6 h-full font-rajdhani">
      {/* Top Section: Overview & Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <section className="col-span-1 md:col-span-2 holo-panel p-6 border-gold-500/30 bg-gold-500/5">
           <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/50 flex items-center justify-center text-xl">💰</div>
              <div>
                 <span className="font-orbitron font-bold text-text-primary text-[10px] tracking-widest uppercase block">Total Treasury Value</span>
                 <span className="font-mono text-2xl text-gold-500 font-bold">${(totalValue / 1000000).toFixed(1)}M</span>
              </div>
           </div>
           <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-black/5">
              <div>
                 <span className="font-orbitron text-[9px] text-text-tertiary uppercase tracking-widest block mb-2">Estimated Runway</span>
                 <span className="font-mono text-sm text-text-primary">482 DAYS</span>
              </div>
              <div>
                 <span className="font-orbitron text-[9px] text-text-tertiary uppercase tracking-widest block mb-2">Monthly Burn</span>
                 <span className="font-mono text-sm text-magenta-400">$124,500</span>
              </div>
           </div>
        </section>

        <section className="holo-panel p-6 bg-void-mid/60">
           <h3 className="font-orbitron font-bold text-text-primary text-[10px] tracking-widest uppercase mb-6">Asset Health</h3>
           <div className="flex items-center justify-center h-24 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-16 h-16 rounded-full border-4 border-gold-500/20 border-t-gold-500 animate-[spin_3s_linear_infinite]" />
              </div>
              <span className="font-mono text-lg text-text-primary font-bold">94%</span>
           </div>
           <div className="text-center mt-2">
              <span className="font-rajdhani text-[9px] text-text-tertiary uppercase tracking-widest">Risk Level: Low</span>
           </div>
        </section>

        <section className="holo-panel p-6 bg-void-mid/60 flex flex-col justify-center">
           <div className="text-center">
              <span className="font-orbitron font-bold text-[9px] text-gold-500 tracking-[.3em] uppercase block mb-4">Reactor Core Status</span>
              <div className="flex items-center justify-center gap-1 mb-4">
                 {[...Array(8)].map((_, i) => (
                   <div key={i} className={`w-2 h-4 rounded-sm ${i < 7 ? 'bg-gold-500 animate-pulse' : 'bg-black/10'}`} style={{ animationDelay: `${i * 0.1}s` }}></div>
                 ))}
              </div>
              <span className="font-mono text-[9px] text-text-tertiary uppercase">Active_Fusion_Stable</span>
           </div>
        </section>
      </div>

      {/* Middle Section: Assets & Flows */}
      <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
         {/* Asset Table */}
         <section className="col-span-12 lg:col-span-7 holo-panel flex flex-col min-h-0">
            <div className="p-6 border-b border-black/5 flex items-center justify-between bg-void-mid/20">
               <h3 className="font-orbitron font-bold text-text-primary text-[10px] tracking-widest uppercase">Asset Breakdown</h3>
               <button className="font-mono text-[9px] text-gold-500 hover:text-text-primary transition-colors">EXPORT_CSV</button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
               <table className="w-full text-left font-mono text-[10px]">
                  <thead className="sticky top-0 bg-void-mid z-10 border-b border-black/5 text-text-tertiary">
                     <tr>
                        <th className="p-4 font-normal">ASSET_ID</th>
                        <th className="p-4 font-normal">BALANCE</th>
                        <th className="p-4 font-normal">VALUE</th>
                        <th className="p-4 font-normal text-right">ALLOCATION</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                     {assets.map((asset) => (
                       <tr key={asset.symbol} className="hover:bg-gold-500/5 transition-colors group">
                          <td className="p-4">
                             <div className="flex items-center gap-3">
                                <span className="w-5 h-5 flex items-center justify-center bg-black/5 rounded text-[8px] group-hover:bg-gold-500/20 transition-colors">{asset.symbol[0]}</span>
                                <div>
                                   <div className="text-text-primary font-bold">{asset.symbol}</div>
                                   <div className="text-[8px] text-text-tertiary">{asset.name}</div>
                                </div>
                             </div>
                          </td>
                          <td className="p-4 text-text-tertiary">{asset.amount.toLocaleString()}</td>
                          <td className="p-4 text-text-primary">${asset.valueUsd.toLocaleString()}</td>
                          <td className="p-4 text-right">
                             <div className="flex flex-col items-end gap-1">
                                <span className="text-gold-500">{((asset.valueUsd / totalValue) * 100).toFixed(1)}%</span>
                                <div className="w-16 h-0.5 bg-black/5 rounded-full overflow-hidden">
                                   <div className="h-full bg-gold-500" style={{ width: `${(asset.valueUsd / totalValue) * 100}%` }}></div>
                                </div>
                             </div>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </section>

         {/* Energy Flow Feed */}
         <section className="col-span-12 lg:col-span-5 holo-panel flex flex-col min-h-0">
            <div className="p-6 border-b border-black/5 bg-void-mid/20">
               <h3 className="font-orbitron font-bold text-text-primary text-[10px] tracking-widest uppercase">Reactor Fluid Dynamics</h3>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 p-6 custom-scrollbar font-mono text-[9px]">
               {[...Array(10)].map((_, i) => (
                 <div key={i} className="flex flex-col gap-2 p-3 border border-black/5 bg-black/2 rounded group hover:border-gold-500/20 transition-all">
                    <div className="flex justify-between items-center">
                       <span className={`${i % 3 === 0 ? 'text-gold-500' : 'text-cyan-500'} font-bold`}>
                          {i % 3 === 0 ? 'INFLOW (Staking Reward)' : 'OUTFLOW (Contributor Grant)'}
                       </span>
                       <span className="text-text-tertiary">14:02:{45 - i}</span>
                    </div>
                    <div className="flex justify-between text-text-tertiary">
                       <span>{Math.floor(Math.random() * 5000).toLocaleString()} AXION</span>
                       <span className="text-[8px] opacity-50">0x{Math.random().toString(16).substring(2, 10)}...</span>
                    </div>
                 </div>
               ))}
            </div>
         </section>
      </div>
    </div>
  );
}
