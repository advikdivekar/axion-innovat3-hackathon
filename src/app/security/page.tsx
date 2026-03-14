'use client';

import ModulePageHero from '@/components/marketing/ModulePageHero';
import ModuleShowcase from '@/components/marketing/ModuleShowcase';
import Link from 'next/link';

export default function SecurityPage() {
  const features = [
    { 
      title: 'Sybil Detection', 
      description: 'Identify sybil attacks and voting manipulation patterns before they affect governance outcomes.', 
      icon: '🛡️' 
    },
    { 
      title: 'Treasury Drain Alerts', 
      description: 'Real-time monitoring of large transfers and unusual withdrawal patterns from DAO vaults.', 
      icon: '⚠️' 
    },
    { 
      title: 'Governance Manipulation', 
      description: 'Detect flash-loan attacks and coordinated voting maneuvers designed to exploit DAO protocols.', 
      icon: '⚔️' 
    },
    { 
      title: 'Anomaly Scoring', 
      description: 'AI-powered risk scoring for every transaction and proposal. Know what is baseline and what is a threat.', 
      icon: '🧠' 
    }
  ];

  return (
    <div className="bg-void-deepest min-h-screen font-rajdhani">
      <ModulePageHero 
        title="THE SECURITY SENTINEL" 
        tagline="Every wallet scored. Every anomaly flagged. Before the damage is done." 
        accentColor="magenta" 
      />

      {/* Visual Showcase (CSS Simulation) */}
      <section className="py-24 border-b border-black/5">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-orbitron text-sm text-magenta-500 tracking-widest uppercase">0002. THREAT RADAR</span>
            <h2 className="text-xl mt-4 mb-8">DETECTING THE INVISIBLE</h2>
            <p className="font-rajdhani text-lg text-text-tertiary mb-12 leading-relaxed">
              The Security Sentinel is an always-on AI defense system. It scans every blockchain event through the lens of protection, identifying attack vectors and malicious actors long before they reach execution.
            </p>
            <div className="holo-panel p-6 border-magenta-500/20 bg-magenta-500/5">
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-3 h-3 bg-magenta-500 rounded-full animate-ping" />
                  <span className="font-orbitron text-text-primary text-sm tracking-widest">ACTIVE THREAT DETECTED</span>
               </div>
               <p className="text-text-tertiary text-sm">Large treasury withdrawal request from unverified multisig wallet detected on Proposal #127.</p>
            </div>
          </div>
          <div className="holo-panel aspect-square flex items-center justify-center p-12 overflow-hidden bg-void-mid relative">
             <div className="absolute inset-0 scanlines opacity-30"></div>
             {/* Radar Visualization */}
             <div className="relative w-full h-full border border-magenta-500/20 rounded-full flex items-center justify-center">
                <div className="absolute w-[90%] h-[90%] border border-magenta-500/10 rounded-full"></div>
                <div className="absolute w-[70%] h-[70%] border border-magenta-500/10 rounded-full"></div>
                <div className="absolute w-[50%] h-[50%] border border-magenta-500/10 rounded-full"></div>
                
                {/* Radar Sweep */}
                <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-gradient-to-t from-magenta-500 to-transparent origin-bottom animate-[spin_4s_linear_infinite]" />
                
                {/* Threat Dots */}
                <div className="absolute top-[20%] right-[30%] w-2 h-2 bg-magenta-500 rounded-full shadow-[0_0_10px_#bd154d] animate-pulse"></div>
                <div className="absolute bottom-[40%] left-[20%] w-1.5 h-1.5 bg-magenta-300 rounded-full"></div>
                
                <span className="font-orbitron text-magenta-500 text-sm tracking-widest font-bold">SENTINEL_SCANNING</span>
             </div>
          </div>
        </div>
      </section>

      <ModuleShowcase features={features} accentColor="magenta" />

      {/* Final CTA */}
      <section className="py-32 text-center bg-void-deepest">
         <div className="container mx-auto px-6">
            <h2 className="text-hero mb-8">DEFEND YOUR DAO</h2>
            <Link href="/app/security" className="glow-btn !text-magenta-500 border-magenta-500 shadow-[0_0_30px_rgba(255,45,106,0.3)] hover:!bg-magenta-500">
              Launch Command Center →
            </Link>
         </div>
      </section>
    </div>
  );
}
