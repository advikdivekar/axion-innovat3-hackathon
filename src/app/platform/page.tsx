'use client';

import ModulePageHero from '@/components/marketing/ModulePageHero';
import ModuleShowcase from '@/components/marketing/ModuleShowcase';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PlatformPage() {
  const layers = [
    { name: 'DATA LAYER', desc: 'Real-time multi-chain indexing via Alchemy and Infura. Governance data from Snapshot and on-chain proposals.', color: 'text-cyan-500', bg: 'bg-cyan-500/5' },
    { name: 'AI CORE', desc: 'Four specialized LLM agents (powered by Claude) trained on DAO architectures and security patterns.', color: 'text-purple-500', bg: 'bg-purple-500/5' },
    { name: 'VISUALIZATION ENGINE', desc: 'Three.js and custom shaders transform complex blockchain data into 3D cosmic systems.', color: 'text-gold-500', bg: 'bg-gold-500/5' },
    { name: 'SIMULATION KERNEL', desc: 'Predictive modeling engine for running stress tests and governance projections.', color: 'text-green-500', bg: 'bg-green-500/5' },
  ];

  const features = [
    { 
      title: 'Full Stack Intelligence', 
      description: 'From raw blockchain events to executive summaries. We handle the data complexity so you can focus on leadership.', 
      icon: '🧠' 
    },
    { 
      title: 'Live Chain Sync', 
      description: 'Sub-second updates on treasury moves, governance votes, and security threats. Never act on stale information again.', 
      icon: '⚡' 
    },
    { 
      title: 'Protocol Agnostic', 
      description: 'Support for all major DAO frameworks including Aragon, Governor Alpha/Bravo, and Moloch.', 
      icon: '🔌' 
    },
    { 
      title: 'Enterprise Security', 
      description: 'Military-grade monitoring for your organization. Detect anomalies and threats before they impact your mission.', 
      icon: '🛡️' 
    }
  ];

  return (
    <div className="bg-void-deepest min-h-screen">
      <ModulePageHero 
        title="THE INTELLIGENCE PLATFORM" 
        tagline="A complete intelligence layer for decentralized organizations. Visualize, monitor, and master your DAO." 
        accentColor="cyan" 
      />

      {/* Architecture Diagram Section */}
      <section className="py-24 bg-void-mid">
        <div className="container mx-auto px-6">
           <div className="text-center mb-20">
              <span className="font-orbitron text-sm text-text-tertiary tracking-widest">0002. SYSTEM ARCHITECTURE</span>
              <h2 className="text-xl mt-4">THE DAO OPERATING SYSTEM</h2>
           </div>

           <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto">
              {layers.map((layer, idx) => (
                <motion.div 
                  key={layer.name}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`w-full p-8 holo-panel border-black/5 ${layer.bg} group hover:border-cyan-500/30 transition-all`}
                >
                   <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded bg-void-deepest border border-black/10 flex items-center justify-center font-orbitron text-xs text-text-tertiary">
                         L0{idx + 1}
                      </div>
                      <div className="flex-1">
                         <h3 className={`font-orbitron font-bold text-lg tracking-widest uppercase mb-2 ${layer.color}`}>{layer.name}</h3>
                         <p className="font-rajdhani text-text-tertiary leading-relaxed">{layer.desc}</p>
                      </div>
                   </div>
                   {idx < layers.length - 1 && (
                     <div className="hidden md:block absolute -bottom-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
                   )}
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      <ModuleShowcase features={features} accentColor="cyan" />

      {/* Final CTA */}
      <section className="py-32 text-center bg-void-deepest">
         <div className="container mx-auto px-6">
            <h2 className="text-hero mb-8">COMMAND YOUR ORGANIZATION</h2>
            <Link href="/universe" className="glow-btn">
              Enter the Universe →
            </Link>
         </div>
      </section>
    </div>
  );
}
