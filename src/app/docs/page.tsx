'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { group: 'GETTING STARTED', items: ['Introduction', 'Quick Start', 'Core Concepts'] },
  { group: 'SYSTEM MODULES', items: ['Universe', 'Governance', 'Treasury', 'Security', 'Simulator'] },
  { group: 'AI AGENTS', items: ['Governance AI', 'Treasury AI', 'Security AI', 'Operations AI'] },
  { group: 'TECHNICAL', items: ['Architecture', 'API Reference', 'Data Sources', 'Integrations'] },
];

export default function DocsPage() {
  const [activeItem, setActiveItem] = useState('Introduction');

  return (
    <div className="bg-void-deepest min-h-screen pt-20 flex">
      {/* Sticky Left Sidebar */}
      <aside className="w-64 border-r border-black/5 h-[calc(100vh-80px)] sticky top-20 overflow-y-auto hidden md:block p-8">
        <div className="mb-8">
           <input 
             type="text" 
             placeholder="Search docs..." 
             className="w-full bg-void-mid border border-black/10 rounded px-3 py-2 text-xs font-rajdhani text-text-primary outline-none focus:border-cyan-500/50"
           />
        </div>
        
        {NAV_ITEMS.map((group) => (
          <div key={group.group} className="mb-8">
            <h4 className="font-orbitron text-[10px] text-text-tertiary tracking-[0.2em] mb-4 uppercase">{group.group}</h4>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => setActiveItem(item)}
                    className={`font-rajdhani text-sm py-1 transition-colors hover:text-cyan-500 ${activeItem === item ? 'text-cyan-500 font-bold' : 'text-text-tertiary'}`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 md:p-16 max-w-4xl">
        <motion.div
          key={activeItem}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="font-mono text-cyan-500 text-xs tracking-widest uppercase mb-4 block">Documentation &gt; {activeItem}</span>
          <h1 className="text-xl text-text-primary mb-8">
             {activeItem.toUpperCase()}
          </h1>
          
          <div className="prose prose-invert max-w-none">
             <p className="text-text-tertiary font-rajdhani text-lg leading-relaxed mb-8">
               Everything you need to know about the {activeItem} module within the DAO Cosmos OS. 
               This section covers the technical implementation, AI integration, and core functionality.
             </p>

             <div className="holo-panel p-8 mb-12 bg-cyan-500/5 border-cyan-500/20">
                <h3 className="font-orbitron text-sm text-cyan-500 mb-4 uppercase">System Metadata</h3>
                <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-text-tertiary">
                   <div>MODULE_ID: COS_{activeItem.substring(0, 3).toUpperCase()}</div>
                   <div>STATUS: OPERATIONAL</div>
                   <div>INTEGRITY: 99.8%</div>
                   <div>AI_SYNC: ACTIVE</div>
                </div>
             </div>

             <h2 className="text-lg font-orbitron text-text-primary mt-12 mb-6 uppercase">Overview</h2>
             <p className="text-text-tertiary font-rajdhani text-lg leading-relaxed mb-8">
                The {activeItem} protocol is designed to provide high-fidelity intelligence for decentralized organizations. 
                By leveraging real-time blockchain data and specialized AI agents, it delivers a superior experience for DAO commanders.
             </p>

             <pre className="bg-void-mid p-6 rounded border border-black/5 font-mono text-xs text-cyan-500 overflow-x-auto">
{`// Example API Request for ${activeItem}
const data = await fetch('/api/v1/${activeItem.toLowerCase()}', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' }
});

const result = await data.json();
console.log('Tactical Intel:', result);`}
             </pre>

             <h2 className="text-lg font-orbitron text-text-primary mt-12 mb-6 uppercase">Key Features</h2>
             <ul className="list-disc list-inside space-y-4 text-text-tertiary font-rajdhani text-lg">
                <li>Real-time data synchronization with Ethereum Mainnet.</li>
                <li>AI-powered anomaly detection and sentiment analysis.</li>
                <li>Full integration with the 3D Universe visualization.</li>
                <li>Comprehensive API access for third-party extensions.</li>
             </ul>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
