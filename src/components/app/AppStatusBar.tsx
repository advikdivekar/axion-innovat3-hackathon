'use client';

import { useState, useEffect } from 'react';

export default function AppStatusBar() {
  const [time, setTime] = useState(new Date());
  const [block, setBlock] = useState(19428503);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const blockTimer = setInterval(() => setBlock(b => b + 1), 12000);
    return () => {
      clearInterval(timer);
      clearInterval(blockTimer);
    };
  }, []);

  return (
    <header className="h-12 border-b border-cyan-500/10 bg-void-deepest/80 backdrop-blur-xl flex items-center px-6 z-30">
      <div className="flex items-center gap-6 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-orbitron text-[10px] text-text-primary uppercase tracking-widest">Axion DAO</span>
          <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 font-mono text-[9px] text-cyan-500">ETH_MAINNET</span>
        </div>
        
        <div className="h-4 w-[1px] bg-black/10"></div>
        
        <div className="flex items-center gap-3">
          <span className="font-orbitron text-[9px] text-text-tertiary uppercase tracking-widest">System Health</span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`w-3 h-1.5 rounded-sm ${i < 4 ? 'bg-cyan-500 shadow-[0_0_5px_#007a8c]' : 'bg-black/10'}`}></div>
            ))}
          </div>
          <span className="font-mono text-[9px] text-cyan-500">82%</span>
        </div>
      </div>

      <div className="flex-1 flex justify-center overflow-hidden">
        <div className="flex items-center gap-4 whitespace-nowrap animate-marquee">
           <span className="font-mono text-[10px] text-purple-700 uppercase tracking-tighter">⚡ NEW_PROPOSAL_REGISTERED: #142 (TREASURY_REBALANCING)</span>
           <span className="text-text-primary/20">•</span>
           <span className="font-mono text-[10px] text-cyan-700 uppercase tracking-tighter">🐋 WHALE_ALERT: 45,000 AXION TRANSFERRED TO GOVERNANCE_STAKE</span>
           <span className="text-text-primary/20">•</span>
           <span className="font-mono text-[10px] text-magenta-400 uppercase tracking-tighter">⚠️ SECURITY_ALERT: UNUSUAL_VOTING_PATTERN_DETECTED_SECTOR_7</span>
        </div>
      </div>

      <div className="flex items-center gap-6 flex-1 justify-end">
        <div className="flex flex-col items-end">
           <span className="font-orbitron text-[9px] text-text-tertiary uppercase tracking-widest">Block Height</span>
           <span className="font-mono text-[10px] text-text-primary">{block.toLocaleString()}</span>
        </div>
        
        <div className="h-4 w-[1px] bg-black/10"></div>
        
        <div className="flex flex-col items-end min-w-[100px]">
           <span className="font-orbitron text-[9px] text-text-tertiary uppercase tracking-widest">MT TIME</span>
           <span className="font-mono text-[10px] text-cyan-500">{time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
        </div>
      </div>
    </header>
  );
}
