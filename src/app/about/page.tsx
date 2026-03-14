'use client';

import ModulePageHero from '@/components/marketing/ModulePageHero';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const stack = [
    { name: 'Ethereum', logo: '⟠' },
    { name: 'Alchemy', logo: '⚗️' },
    { name: 'Claude AI', logo: '🤖' },
    { name: 'Supabase', logo: '⚡' },
    { name: 'Next.js', logo: '▲' },
    { name: 'Three.js', logo: '⬢' },
  ];

  return (
    <div className="bg-void-deepest min-h-screen">
      <ModulePageHero 
        title="ABOUT THE MISSION" 
        tagline="Built for the future of decentralized governance. Real-time. AI-powered. Unstoppable." 
        accentColor="cyan" 
      />

      {/* Story Section */}
      <section className="py-24 border-b border-black/5">
        <div className="container mx-auto px-6 max-w-4xl">
           <div className="mb-16">
              <span className="font-orbitron text-sm text-cyan-500 tracking-widest uppercase">0002. THE ORIGIN</span>
              <h2 className="text-xl mt-4 mb-8">WHY WE BUILT THIS</h2>
              <div className="space-y-6 font-rajdhani text-lg text-text-tertiary leading-relaxed">
                 <p>
                    Decentralized Autonomous Organizations (DAOs) are the most important coordination technology of our era. However, managing them is currently a fragmented, opaque experience. Commanders are forced to navigate through dozens of different tools just to get a basic pulse on their organization.
                 </p>
                 <p>
                    DAO Cosmos OS was born from a simple insight: Governance shouldn&apos;t be a chore—it should be an experience. By combining real-time blockchain telemetry with cutting-edge AI and 3D visualization, we&apos;ve built a mission control that makes DAO management feel like operating a strategic command center.
                 </p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
              <div className="holo-panel p-8 bg-void-mid">
                 <h3 className="font-orbitron font-bold text-text-primary mb-4 uppercase text-sm">Our Mission</h3>
                 <p className="font-rajdhani text-text-tertiary">To provide every decentralized organization with the high-fidelity intelligence needed to thrive in an uncertain world.</p>
              </div>
              <div className="holo-panel p-8 bg-void-mid">
                 <h3 className="font-orbitron font-bold text-text-primary mb-4 uppercase text-sm">Our Vision</h3>
                 <p className="font-rajdhani text-text-tertiary">A future where DAO governance is the gold standard for human collaboration, powered by transparent and accessible intelligence.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 bg-void-mid">
         <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-16">
               <span className="font-orbitron text-sm text-text-tertiary tracking-widest uppercase">0003. THE INFRASTRUCTURE</span>
               <h2 className="text-lg mt-4 uppercase">BATTLE-TESTED TECH STACK</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
               {stack.map((tech) => (
                 <motion.div 
                   key={tech.name}
                   whileHover={{ scale: 1.1, y: -5 }}
                   className="flex flex-col items-center gap-4 group"
                 >
                    <div className="w-16 h-16 rounded-lg bg-void-deepest border border-black/10 flex items-center justify-center text-3xl group-hover:border-cyan-500/50 group-hover:text-cyan-500 transition-all">
                       {tech.logo}
                    </div>
                    <span className="font-orbitron text-[10px] text-text-tertiary tracking-widest uppercase">{tech.name}</span>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Open Source CTA */}
      <section className="py-32 bg-void-deepest text-center border-t border-black/5">
         <div className="container mx-auto px-6">
            <h2 className="text-xl mb-4">OPEN CORE. TRANSPARENT GOVERNANCE.</h2>
            <p className="font-rajdhani text-text-tertiary mb-12 max-w-2xl mx-auto">
               The DAO Cosmos OS is an open-source project. We believe that the tools used to govern decentralized organizations must themselves be transparent and auditable.
            </p>
            <div className="flex justify-center gap-6">
               <a href="https://github.com" target="_blank" className="glow-btn !text-text-primary border-black/20">View on GitHub</a>
               <Link href="/universe" className="glow-btn">Enter the Universe →</Link>
            </div>
         </div>
      </section>
    </div>
  );
}
