'use client';

import { useState, useEffect } from 'react';
import ModulePageHero from '@/components/marketing/ModulePageHero';
import Link from 'next/link';
import { motion } from 'framer-motion';

const AGENTS = [
  { 
    name: 'Governance Agent', 
    role: 'Decision Intelligence', 
    color: 'text-purple-500', 
    bg: 'bg-purple-500/10', 
    border: 'border-purple-500/20',
    desc: 'Analyzes proposals, tracks voting patterns, detects manipulation, summarizes governance health.',
    queries: ['Explain current DAO risks', 'Analyze proposal #124', 'Who are the top voters?']
  },
  { 
    name: 'Treasury Agent', 
    role: 'Financial Strategy', 
    color: 'text-gold-500', 
    bg: 'bg-gold-500/10', 
    border: 'border-gold-500/20',
    desc: 'Monitors balances, detects anomalies, estimates runway, analyzes DeFi positions.',
    queries: ['Is the treasury healthy?', 'Estimate next month spend', 'Detect recent leaks']
  },
  { 
    name: 'Security Agent', 
    role: 'Threat Defense', 
    color: 'text-magenta-500', 
    bg: 'bg-magenta-500/10', 
    border: 'border-magenta-500/20',
    desc: 'Scores wallet risk, detects threats, monitors suspicious activity, generates alerts.',
    queries: ['Any active threats?', 'Score wallet 0x123...', 'Scan recent transactions']
  },
  { 
    name: 'Operations Agent', 
    role: 'Coordination Engine', 
    color: 'text-cyan-500', 
    bg: 'bg-cyan-500/10', 
    border: 'border-cyan-500/20',
    desc: 'Tracks contributor activity, analyzes collaboration, generates operational reports.',
    queries: ['Show top contributors', 'Collaboration health', 'Project velocity report']
  }
];

export default function AIAgentsPage() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleQuery = (q: string) => {
    setQuery(q);
    setIsTyping(true);
    setResponse('');
    
    // Simple mock response logic based on spec
    setTimeout(() => {
      setResponse(`Analyzing "${q}"... OK. Current system checks complete. No immediate critical issues detected. Data points synchronized with Ethereum Mainnet.`);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="bg-void-deepest min-h-screen">
      <ModulePageHero 
        title="THE AI AGENT CORE" 
        tagline="Four specialized AI agents. One mission. Intelligence for every module." 
        accentColor="purple" 
      />

      {/* Agent Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {AGENTS.map((agent) => (
              <div key={agent.name} className={`holo-panel p-8 ${agent.border} group`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-lg ${agent.bg} flex items-center justify-center text-xl`}>🤖</div>
                  <div>
                    <h3 className={`font-orbitron font-bold text-text-primary tracking-widest uppercase`}>{agent.name}</h3>
                    <p className={`font-rajdhani text-xs uppercase tracking-[0.2em] ${agent.color}`}>{agent.role}</p>
                  </div>
                </div>
                <p className="font-rajdhani text-text-tertiary text-lg mb-8">{agent.desc}</p>
                <div className="flex flex-wrap gap-2">
                   {agent.queries.map(q => (
                     <button 
                       key={q} 
                       onClick={() => handleQuery(q)}
                       className="font-mono text-[10px] py-1.5 px-3 border border-black/10 rounded hover:border-cyan-500 hover:text-cyan-500 transition-colors"
                     >
                        &gt; {q}
                     </button>
                   ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Terminal */}
      <section className="py-24 bg-void-mid border-y border-black/5">
        <div className="container mx-auto px-6 max-w-4xl">
           <div className="text-center mb-12">
              <span className="font-orbitron text-sm text-cyan-500 tracking-widest uppercase">0003. LIVE COMMAND INTERFACE</span>
              <h2 className="text-xl mt-4">QUERY THE COMMAND CORE</h2>
           </div>

           <div className="holo-panel bg-[#0a0a0a] border-cyan-500/30 overflow-hidden">
              <div className="p-8 font-mono text-sm min-h-[400px] flex flex-col">
                 <div className="text-text-tertiary mb-6">establishing_link: cloud_intelligence_v4... [OK]</div>
                 
                 {query && (
                   <div className="flex gap-4 mb-6">
                     <span className="text-cyan-500 tracking-widest uppercase font-bold">COMMANDER:</span>
                     <span className="text-text-primary">{query}</span>
                   </div>
                 )}

                 {isTyping && (
                   <div className="flex gap-4">
                      <span className="text-purple-500 tracking-widest uppercase font-bold">SYSTEM:</span>
                      <span className="text-purple-300">Processing tactical query...</span>
                      <span className="w-2 h-4 bg-purple-500 animate-pulse ml-1" />
                   </div>
                 )}

                 {response && !isTyping && (
                   <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="flex gap-4"
                   >
                      <span className="text-purple-500 tracking-widest uppercase font-bold">SYSTEM:</span>
                      <span className="text-purple-300 leading-relaxed">{response}</span>
                   </motion.div>
                 )}

                 <div className="mt-auto pt-8 border-t border-black/5 flex items-center gap-4">
                    <span className="text-cyan-500 font-bold">&gt;</span>
                    <input 
                      type="text" 
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleQuery(query)}
                      placeholder="ENTER COMMAND OR ASK AGENT..."
                      className="flex-1 bg-transparent border-none outline-none text-text-primary font-mono placeholder:text-text-tertiary"
                    />
                    <button 
                      onClick={() => handleQuery(query)}
                      className="text-cyan-500 hover:text-text-primary transition-colors"
                    >
                      SEND_INTEL
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 text-center bg-void-deepest">
         <div className="container mx-auto px-6">
            <h2 className="text-hero mb-8">AI-POWERED GOVERNANCE</h2>
            <Link href="/app" className="glow-btn">
              Enter the Universe →
            </Link>
         </div>
      </section>
    </div>
  );
}
