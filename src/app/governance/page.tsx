'use client';

import ModulePageHero from '@/components/marketing/ModulePageHero';
import ModuleShowcase from '@/components/marketing/ModuleShowcase';
import Link from 'next/link';

export default function GovernancePage() {
  const features = [
    { 
      title: 'Live Proposal Battle', 
      description: 'Watch voters and whales battle in real-time as proposals are broadcast to the network. Every vote weight is visualized.', 
      icon: '⚔️' 
    },
    { 
      title: 'Whale Influence Tracking', 
      description: 'Identify and track the largest wallets influence on outcomes before they occur. AI-powered whale sentiment analysis.', 
      icon: '🐋' 
    },
    { 
      title: 'Proposal Replay', 
      description: 'Rewind time to see how past battles were won or lost. Analyze the tipping points of critical DAO decisions.', 
      icon: '🔄' 
    },
    { 
      title: 'Governance Analytics', 
      description: 'Deep-dive into participation rates, decentralization scores, and voting power distribution across the organization.', 
      icon: '📊' 
    }
  ];

  return (
    <div className="bg-void-deepest min-h-screen">
      <ModulePageHero 
        title="THE GOVERNANCE ARENA" 
        tagline="Know who controls your DAO. Track every whale. Replay every governance battle." 
        accentColor="purple" 
      />

      {/* Visual Showcase (CSS Simulation) */}
      <section className="py-24 border-b border-black/5">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-orbitron text-sm text-purple-500 tracking-widest uppercase">0002. REAL-TIME BATTLE MAP</span>
            <h2 className="text-xl mt-4 mb-8">VISUALIZE THE CONFLICT</h2>
            <p className="font-rajdhani text-lg text-text-tertiary mb-12 leading-relaxed">
              In the Governance Arena, every proposal is a battle of wills. Our engine renders voting power as energy flows, allowing you to see which whales are pushing the needle and where the DAO sentiment truly lies.
            </p>
            <div className="flex flex-col gap-4">
               <div className="flex items-center justify-between p-4 border border-purple-500/20 bg-purple-500/5 rounded">
                  <span className="font-orbitron text-xs text-text-primary uppercase tracking-widest">Proposal Health</span>
                  <span className="font-mono text-xs text-green-500">92% QUORUM</span>
               </div>
               <div className="flex items-center justify-between p-4 border border-purple-500/20 bg-purple-500/5 rounded">
                  <span className="font-orbitron text-xs text-text-primary uppercase tracking-widest">Whale Activity</span>
                  <span className="font-mono text-xs text-purple-300">MODERATE</span>
               </div>
            </div>
          </div>
          <div className="holo-panel aspect-square flex items-center justify-center p-12 overflow-hidden bg-void-mid">
             <div className="relative w-full h-full border border-purple-500/20 rounded-full flex items-center justify-center">
                <div className="absolute inset-0 animate-pulse border-2 border-purple-500/10 rounded-full"></div>
                {/* Simulated Nodes */}
                <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_15px_#5c14cc]"></div>
                <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-purple-500/50 border border-purple-500 rounded-full animate-bounce"></div>
                <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-black rounded-full"></div>
                <div className="w-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-transparent absolute rotate-45"></div>
                <div className="w-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-transparent absolute -rotate-12"></div>
                <div className="text-center">
                   <span className="font-orbitron text-purple-500 text-3xl font-bold">LIVE FEED</span>
                   <p className="font-mono text-[10px] text-text-tertiary mt-2">STREAMING_PROPOSAL_#124</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      <ModuleShowcase features={features} accentColor="purple" />

      {/* Final CTA */}
      <section className="py-32 text-center bg-void-deepest">
         <div className="container mx-auto px-6">
            <h2 className="text-hero mb-8">ENTER THE ARENA</h2>
            <Link href="/app/governance" className="glow-btn !text-purple-500 border-purple-500 shadow-[0_0_30px_rgba(123,47,247,0.3)] hover:!bg-purple-500">
              Launch Command Center →
            </Link>
         </div>
      </section>
    </div>
  );
}
