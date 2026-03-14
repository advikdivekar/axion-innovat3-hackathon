'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/marketing/HeroSection';
import StatCounter from '@/components/marketing/StatCounter';
import FeatureCard from '@/components/marketing/FeatureCard';
import TrustBar from '@/components/marketing/TrustBar';
import ScrollStorytelling from '@/components/marketing/ScrollStorytelling';
import { motion } from 'framer-motion';

export default function Home() {
  const [typedText, setTypedText] = useState('');
  const aiQuery = "Analyzing DAO Sector 7... Governance threats detected on Proposal #127. Threat severity: HIGH. Recommended Action: DEPLOY_SENTINEL_ARENA.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(aiQuery.slice(0, i));
      i++;
      if (i > aiQuery.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-void-deepest min-h-screen text-text-primary selection:bg-cyan-500/30">
      
      {/* SECTION 4.2 HERO */}
      <HeroSection />

      {/* SECTION 4.3 STATS BAR */}
      <section className="py-12 border-y border-black/5 bg-void-mid/30 relative">
        <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
           <StatCounter value="$4.2B+" label="Total Treasury Monitored" prefix="$" suffix="B+" />
           <StatCounter value="127,000+" label="DAO Contributors Tracked" suffix="+" />
           <StatCounter value="8,400+" label="Proposals Analyzed" suffix="+" />
           <StatCounter value="99.7%" label="Threat Detection Accuracy" suffix="%" />
        </div>
      </section>

      {/* SECTION 4.4 PROBLEM / SOLUTION */}
      <section className="py-32 relative overflow-hidden bg-void-deepest">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <motion.div 
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="holo-panel p-10 border-magenta-500/20 bg-magenta-500/5 group"
               >
                  <div className="flex items-center gap-4 mb-8">
                     <span className="text-3xl">🛡️</span>
                     <h3 className="font-orbitron font-bold text-text-primary tracking-widest text-sm">THE GOVERNANCE CRISIS</h3>
                  </div>
                  <ul className="space-y-6 font-rajdhani text-lg text-text-tertiary">
                     <li className="flex items-start gap-4"><span className="text-magenta-500">▶</span> Governance is opaque — you can&apos;t see what&apos;s happening</li>
                     <li className="flex items-start gap-4"><span className="text-magenta-500">▶</span> Treasury flows are invisible until it&apos;s too late</li>
                     <li className="flex items-start gap-4"><span className="text-magenta-500">▶</span> Threats and attacks go undetected</li>
                     <li className="flex items-start gap-4"><span className="text-magenta-500">▶</span> Contributors burn out in silence</li>
                  </ul>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, x: 30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="holo-panel p-10 border-cyan-500/20 bg-cyan-500/5 group"
               >
                  <div className="flex items-center gap-4 mb-8">
                     <span className="text-3xl">💎</span>
                     <h3 className="font-orbitron font-bold text-text-primary tracking-widest text-sm">THE COSMOS SOLUTION</h3>
                  </div>
                  <ul className="space-y-6 font-rajdhani text-lg text-text-tertiary">
                     <li className="flex items-start gap-4"><span className="text-cyan-500">▶</span> Real-time 3D visibility across your entire DAO</li>
                     <li className="flex items-start gap-4"><span className="text-cyan-500">▶</span> AI-powered treasury reactor & reactor monitoring</li>
                     <li className="flex items-start gap-4"><span className="text-cyan-500">▶</span> Predictive security sentinel defense systems</li>
                     <li className="flex items-start gap-4"><span className="text-cyan-500">▶</span> Deep contributor mapping & reputation galaxy</li>
                  </ul>
               </motion.div>
            </div>
         </div>
      </section>

      {/* SECTION 4.5 SCROLL STORYTELLING */}
      <ScrollStorytelling />

      {/* SECTION 4.8 AI TERMINAL PREVIEW */}
      <section className="py-32 bg-void-deepest border-y border-black/5">
         <div className="container mx-auto px-6 max-w-5xl">
            <div className="flex flex-col lg:flex-row items-center gap-16">
               <div className="flex-1">
                  <span className="font-orbitron text-xs text-purple-500 tracking-[0.4em] mb-4 block uppercase">0004. AI COMMAND CORE</span>
                  <h2 className="text-xl mb-8 leading-tight">INTELLIGENCE BUILT INTO<br/>EVERY MODULE</h2>
                  <p className="font-rajdhani text-lg text-text-tertiary mb-12">
                     Four specialized AI agents work around the clock to monitor, analyze, and defend your organization. From treasury leaks to governance takes, the command core is always one step ahead.
                  </p>
                  <Link href="/ai-agents" className="glow-btn !text-purple-500 border-purple-500 shadow-[0_0_15px_rgba(123,47,247,0.3)]">
                    Query the Agents →
                  </Link>
               </div>
               <div className="flex-1 w-full">
                  <div className="holo-panel aspect-video bg-void-mid border-purple-500/30 overflow-hidden relative">
                     <div className="absolute inset-0 scanlines opacity-20"></div>
                     <div className="p-8 font-mono text-[10px] text-purple-500">
                        <div className="mb-4 text-purple-300 opacity-50"> establishing_secure_link: [OK] </div>
                        <div className="flex gap-3">
                           <span className="font-bold">COMMANDER:</span>
                           <span className="text-text-primary">STATUS_REPORT_DAO_HEALTH</span>
                        </div>
                        <div className="mt-4 flex gap-3">
                           <span className="font-bold">SYSTEM:</span>
                           <span className="text-purple-300 underline underline-offset-4">{typedText}</span>
                           <span className="w-2 h-4 bg-purple-500 animate-pulse ml-1" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* SECTION 4.9 TRUST BAR */}
      <TrustBar />

      {/* SECTION 4.10 FINAL CTA */}
      <section className="py-40 relative overflow-hidden text-center bg-void-deepest">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.05)_0%,transparent_70%)]"></div>
         <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-hero mb-8 lg:text-7xl">READY TO COMMAND?</h2>
            <p className="font-rajdhani text-xl text-text-tertiary max-w-2xl mx-auto mb-16 uppercase tracking-[.2em]">
               Join the future of decentralized governance.<br/> Real-time. AI-powered. Unstoppable.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
               <Link href="/universe" className="glow-btn primary !px-16 !py-6 text-lg">Enter the Universe</Link>
               <Link href="/docs" className="glow-btn !px-16 !py-6 text-lg !bg-transparent text-text-primary border-black/20">Read the Docs</Link>
            </div>
         </div>
      </section>
    </div>
  );
}
