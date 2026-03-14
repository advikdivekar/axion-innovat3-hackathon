'use client';

import ModulePageHero from '@/components/marketing/ModulePageHero';
import ModuleShowcase from '@/components/marketing/ModuleShowcase';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SimulatorPage() {
  const features = [
    { 
      title: 'Scenario Builder', 
      description: 'Construct complex "what if" scenarios by adjusting variables like token price, voting power, and treasury outflow.', 
      icon: '🛠️' 
    },
    { 
      title: 'Branching Timelines', 
      description: 'Visualize multiple possible futures for your DAO based on different governance decisions or external market events.', 
      icon: '🌿' 
    },
    { 
      title: 'Probability Scores', 
      description: 'AI-driven probability assessment for each simulated timeline. Know which future is most likely to manifest.', 
      icon: '📈' 
    },
    { 
      title: 'Risk Assessment', 
      description: 'Simulate stress tests to identify breaking points in your DAO protocol before they are exploited in production.', 
      icon: '🛡️' 
    }
  ];

  const scenarios = [
    'Market Crash (-40% Treasury)',
    'Governance Takeover Attempt',
    'Treasury Liquidity Depletion',
    'Whale Influence Spike',
    'Contributor Exodus',
  ];

  return (
    <div className="bg-void-deepest min-h-screen">
      <ModulePageHero 
        title="THE MULTIVERSE SIMULATOR" 
        tagline="Run your DAO through every possible future. Know the risks before they happen." 
        accentColor="green" 
      />

      {/* Visual Showcase (CSS Simulation) */}
      <section className="py-24 border-b border-black/5">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-orbitron text-sm text-green-500 tracking-widest uppercase">0002. TEMPORAL ANALYSIS</span>
            <h2 className="text-xl mt-4 mb-8">PREDICTING THE OUTCOME</h2>
            <p className="font-rajdhani text-lg text-text-tertiary mb-12 leading-relaxed">
              Don&apos;t leave your DAO&apos;s future to chance. The Simulator allows you to fork the current state of the organization and run thousands of parallel timelines. See the impact of proposals before you vote.
            </p>
            <div className="space-y-3">
               {scenarios.map((s, idx) => (
                 <div key={s} className="flex items-center gap-4 p-3 bg-green-500/5 border border-green-500/10 rounded group hover:border-green-500/30 transition-all cursor-default">
                    <span className="font-mono text-[10px] text-text-tertiary">000{idx+1}</span>
                    <span className="font-orbitron text-xs text-text-primary uppercase tracking-wider">{s}</span>
                    <div className="ml-auto w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#008a47]"></div>
                 </div>
               ))}
            </div>
          </div>
          <div className="holo-panel aspect-square flex items-center justify-center p-12 overflow-hidden bg-void-mid relative">
             {/* Branching Tree Visualization (CSS) */}
             <div className="relative w-full h-full flex flex-col items-center justify-center">
                <div className="w-1 h-32 bg-green-500/30 relative">
                   <div className="absolute top-0 left-0 w-1 h-full bg-green-500 shadow-[0_0_15px_#008a47]" />
                   {/* Branches */}
                   <div className="absolute top-1/4 left-1/2 w-24 h-0.5 bg-green-500/50 -rotate-45 origin-left" />
                   <div className="absolute top-1/4 left-1/2 w-20 h-0.5 bg-green-500/30 -rotate-12 origin-left" />
                   <div className="absolute top-1/2 left-1/2 w-28 h-0.5 bg-green-500/50 rotate-45 origin-left" />
                   <div className="absolute top-3/4 left-1/2 w-24 h-0.5 bg-red-500/50 rotate-12 origin-left" />
                </div>
                <div className="mt-8 text-center">
                  <span className="font-orbitron text-green-500 text-sm tracking-[0.3em] font-bold">SIMULATION_ACTIVE</span>
                  <p className="font-mono text-[10px] text-text-tertiary mt-2">PARALLEL_TIMELINES: 4</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      <ModuleShowcase features={features} accentColor="green" />

      {/* Final CTA */}
      <section className="py-32 text-center bg-void-deepest">
         <div className="container mx-auto px-6">
            <h2 className="text-hero mb-8">SHAPE THE FUTURE</h2>
            <Link href="/app/simulator" className="glow-btn !text-green-500 border-green-500 shadow-[0_0_30px_rgba(0,255,136,0.3)] hover:!bg-green-500">
              Launch Command Center →
            </Link>
         </div>
      </section>
    </div>
  );
}
