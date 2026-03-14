'use client';

import ModulePageHero from '@/components/marketing/ModulePageHero';
import ModuleShowcase from '@/components/marketing/ModuleShowcase';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ContributorsPage() {
  const features = [
    { 
      title: 'Constellation Map', 
      description: 'Visualize every contributor as a star in a massive, interactive 3D galaxy. See the clusters of activity and collaboration.', 
      icon: '🌌' 
    },
    { 
      title: 'Reputation Scores', 
      description: 'On-chain reputation tracking based on contributions, voting history, and tenure. Identify the true architects of your DAO.', 
      icon: '⭐' 
    },
    { 
      title: 'Collaboration Networks', 
      description: 'Map the connections between contributors. See who works together and how teams form organically within the DAO.', 
      icon: '🕸️' 
    },
    { 
      title: 'Class System', 
      description: 'Categorize contributors into five specialized classes: Architect, Diplomat, Sentinel, Merchant, and Explorer.', 
      icon: '🛡️' 
    }
  ];

  const categories = [
    { name: 'Architect', role: 'Design and protocol builders', icon: '🏛️' },
    { name: 'Diplomat', role: 'Governance and community leads', icon: '🤝' },
    { name: 'Sentinel', role: 'Security and code auditors', icon: '🛡️' },
    { name: 'Merchant', role: 'Treasury and growth strategists', icon: '💰' },
    { name: 'Explorer', role: 'New initiatives and research', icon: '🔭' },
  ];

  return (
    <div className="bg-void-deepest min-h-screen">
      <ModulePageHero 
        title="THE CONTRIBUTOR GALAXY" 
        tagline="See your contributors as a living galaxy. Every star a person. Every connection a collaboration." 
        accentColor="cyan" 
      />

      {/* Visual Showcase (CSS Simulation) */}
      <section className="py-24 border-b border-black/5">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 holo-panel aspect-square flex items-center justify-center p-12 overflow-hidden bg-void-mid relative">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent"></div>
             {/* Simulated Galaxy */}
             <div className="relative w-full h-full">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                    className="absolute w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_8px_#007a8c]"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
                {/* Connection Lines */}
                <div className="absolute inset-0 opacity-10">
                   <svg className="w-full h-full">
                      <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="white" strokeWidth="0.5" />
                      <line x1="80%" y1="10%" x2="50%" y2="50%" stroke="white" strokeWidth="0.5" />
                      <line x1="10%" y1="90%" x2="50%" y2="50%" stroke="white" strokeWidth="0.5" />
                   </svg>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="font-orbitron text-cyan-500 text-sm tracking-[0.3em] font-bold">GALAXY_SCAN_ACTIVE</div>
                </div>
             </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="font-orbitron text-sm text-cyan-500 tracking-widest uppercase">0002. HUMAN CAPITAL VISUALIZATION</span>
            <h2 className="text-xl mt-4 mb-8">PEOPLE ARE THE STARS</h2>
            <p className="font-rajdhani text-lg text-text-tertiary mb-12 leading-relaxed">
              Modern DAOs suffer from contributor invisibility. Our Galaxy module maps reputation, activity, and relationships into a stellar field. Identify your key architects and reward those who keep the universe expanding.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {categories.map((cat) => (
                 <div key={cat.name} className="flex items-center gap-3 p-3 border border-cyan-500/10 bg-cyan-500/5 rounded">
                    <span className="text-lg">{cat.icon}</span>
                    <div>
                      <h4 className="font-orbitron text-[10px] text-text-primary uppercase tracking-widest">{cat.name}</h4>
                      <p className="font-rajdhani text-[10px] text-text-tertiary">{cat.role}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      <ModuleShowcase features={features} accentColor="cyan" />

      {/* Final CTA */}
      <section className="py-32 text-center bg-void-deepest">
         <div className="container mx-auto px-6">
            <h2 className="text-hero mb-8">JOIN THE GALAXY</h2>
            <Link href="/app/contributors" className="glow-btn !text-cyan-500 border-cyan-500 shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:!bg-cyan-500">
              Launch Command Center →
            </Link>
         </div>
      </section>
    </div>
  );
}
