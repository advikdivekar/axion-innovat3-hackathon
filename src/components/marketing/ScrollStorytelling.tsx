'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const SECTIONS = [
  {
    id: 'universe',
    title: 'THE UNIVERSE',
    color: 'cyan',
    desc: '3D neural network of your entire DAO ecosystem. Watch data flow and nodes pulse in real-time as your organization breathes.',
    metrics: ['12,402 Active Nodes', 'Live Data Streams', 'Multisig Sync']
  },
  {
    id: 'governance',
    title: 'GOVERNANCE ARENA',
    color: 'purple',
    desc: 'Proposal battle visualization. Track whale influence, voting power distribution, and execution likelihood as conflicts unfold.',
    metrics: ['Real-time Influence', 'Whale Tracking', 'Execution Engine']
  },
  {
    id: 'treasury',
    title: 'TREASURY REACTOR',
    color: 'gold',
    desc: 'Energy flow visualization of DAO treasury movements. Monitor burn rates and staking yields in a high-fidelity interface.',
    metrics: ['$4.2B TVL Analyzed', 'Burn Rate Monitoring', 'Yield Tracking']
  },
  {
    id: 'contributors',
    title: 'CONTRIBUTOR GALAXY',
    color: 'cyan',
    desc: 'Interactive star map of your personnel. Filter by sector, analyze XP scores, and visualize reputation networks.',
    metrics: ['Reputation Mapping', 'XP Scoring', 'Sector Routing']
  },
  {
    id: 'security',
    title: 'SECURITY SENTINEL',
    color: 'magenta',
    desc: 'AI-powered anomaly detection and threat radar. Preemptively identify sybil attacks and treasury drains before execution.',
    metrics: ['Anomaly Radar', 'Sybil Detection', 'AI Threat Analysis']
  },
  {
    id: 'simulator',
    title: 'MULTIVERSE SIMULATOR',
    color: 'green',
    desc: 'Branching futurism engine. Run what-if scenarios on market crashes or hostile takeovers to harden your DAO.',
    metrics: ['Predictive Modeling', 'Risk Assessment', 'Outcome Branching']
  }
];

// Reusable animated CSS shapes for the central object
const VisualObject = ({ activeIndex }: { activeIndex: number }) => {
  return (
    <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center pointer-events-none">
      <AnimatePresence mode="popLayout">
        
        {activeIndex === 0 && ( /* Universe: Neural Network */
          <motion.div
            key="universe"
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.5, rotate: 45 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  x: [0, (Math.cos(i * 30) * 150) + Math.random() * 50 - 25, 0],
                  y: [0, (Math.sin(i * 30) * 150) + Math.random() * 50 - 25, 0],
                  opacity: [0.2, 0.8, 0.2]
                }}
                transition={{ duration: 4 + i % 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_20px_#007a8c] blur-[1px]"
              />
            ))}
            {/* Connection Lines (Simulated with CSS borders in a rotating circle) */}
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute w-[80%] h-[80%] rounded-full border border-cyan-500/20 border-dashed" 
            />
            <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
               className="absolute w-[60%] h-[60%] rounded-full border border-cyan-500/30" 
            />
          </motion.div>
        )}

        {activeIndex === 1 && ( /* Governance: Arena */
          <motion.div
            key="governance"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <div className="absolute w-[90%] h-[90%] border-2 border-purple-500/40 rounded-sm rotate-45 flex items-center justify-center">
               <div className="w-[80%] h-[80%] border border-purple-500/20 bg-purple-500/5 animate-pulse flex items-center justify-center">
                  <div className="w-16 h-16 bg-purple-500 shadow-[0_0_40px_#5c14cc] rounded-sm transform rotate-45" />
               </div>
            </div>
            {/* Opposing nodes */}
            <motion.div animate={{ y: [-20, 20, -20] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-[10%] left-[20%] w-6 h-6 bg-green-500 shadow-[0_0_20px_#008a47]" />
            <motion.div animate={{ y: [20, -20, 20] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-[10%] right-[20%] w-6 h-6 bg-magenta-500 shadow-[0_0_20px_#bd154d]" />
          </motion.div>
        )}

        {activeIndex === 2 && ( /* Treasury: Reactor */
          <motion.div
            key="treasury"
            initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 1.5, rotateY: -90 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-full flex items-center justify-center perspective-[1000px]"
          >
            {/* Core */}
            <div className="absolute w-24 h-24 rounded-full bg-gold-500 shadow-[0_0_60px_#b38f00] z-10 animate-pulse" />
            {/* Spinning Rings */}
            <motion.div animate={{ rotateX: 360, rotateY: 180 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute w-[60%] h-[60%] border-[3px] border-gold-500/60 rounded-full" style={{ transformStyle: 'preserve-3d' }} />
            <motion.div animate={{ rotateY: 360, rotateZ: 180 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute w-[80%] h-[80%] border-2 border-gold-500/40 rounded-full" style={{ transformStyle: 'preserve-3d' }} />
            <motion.div animate={{ rotateX: 180, rotateZ: 360 }} transition={{ duration: 16, repeat: Infinity, ease: "linear" }} className="absolute w-[100%] h-[100%] border border-gold-500/20 rounded-full" style={{ transformStyle: 'preserve-3d' }} />
          </motion.div>
        )}

        {activeIndex === 3 && ( /* Contributors: Galaxy */
          <motion.div
            key="contributors"
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.5, rotate: 180 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="relative w-full h-full">
               {[...Array(40)].map((_, i) => (
                 <div
                   key={i}
                   className="absolute rounded-full bg-cyan-500"
                   style={{
                     width: Math.random() * 4 + 2 + 'px',
                     height: Math.random() * 4 + 2 + 'px',
                     top: `${50 + (Math.sin(i) * (i * 1.5))}%`,
                     left: `${50 + (Math.cos(i) * (i * 1.5))}%`,
                     boxShadow: '0 0 10px #007a8c',
                     opacity: Math.random() * 0.5 + 0.5,
                   }}
                 />
               ))}
            </motion.div>
          </motion.div>
        )}

        {activeIndex === 4 && ( /* Security: Radar */
          <motion.div
            key="security"
            initial={{ opacity: 0, scale: 0.5, borderRadius: '0%' }}
            animate={{ opacity: 1, scale: 1, borderRadius: '50%' }}
            exit={{ opacity: 0, scale: 1.5, borderRadius: '0%' }}
            transition={{ duration: 0.8 }}
            className="relative w-[90%] h-[90%] border border-magenta-500/30 bg-magenta-500/5 overflow-hidden flex items-center justify-center"
          >
            <div className="absolute inset-0 scanlines opacity-30"></div>
            <div className="absolute w-[66%] h-[66%] border border-magenta-500/20 rounded-full" />
            <div className="absolute w-[33%] h-[33%] border border-magenta-500/20 rounded-full" />
            {/* Radar Sweep Arc */}
            <motion.div 
               animate={{ rotate: 360 }} 
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }} 
               className="absolute w-1 h-1/2 top-0 left-1/2 bg-gradient-to-t from-magenta-500 to-transparent origin-bottom" 
            />
            {/* Blips */}
            <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 0.5 }} className="absolute top-[20%] left-[30%] w-3 h-3 bg-magenta-500 shadow-[0_0_15px_#bd154d] rounded-full" />
            <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 2.5 }} className="absolute bottom-[30%] right-[20%] w-4 h-4 bg-orange-500 shadow-[0_0_15px_#ff8c00] rounded-full" />
          </motion.div>
        )}

        {activeIndex === 5 && ( /* Simulator: Multiverse Branching */
          <motion.div
            key="simulator"
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.5, y: -100 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-full flex items-end justify-center pb-12"
          >
            {/* Base Trunk */}
            <div className="absolute bottom-10 w-2 h-32 bg-green-500/40 blur-[2px]" />
            <div className="absolute bottom-10 w-0.5 h-32 bg-green-700" />
            
            {/* Branches */}
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-[40%] left-[40%] w-1 h-32 bg-green-500 transform -rotate-45 origin-bottom shadow-[0_0_15px_#008a47]" />
            <motion.div animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 3, repeat: Infinity }} className="absolute bottom-[30%] right-[35%] w-0.5 h-40 bg-yellow-500 transform rotate-12 origin-bottom shadow-[0_0_10px_#eab308]" />
            <motion.div animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 2.5, repeat: Infinity }} className="absolute bottom-[50%] right-[45%] w-[1px] h-24 bg-magenta-500 transform rotate-45 origin-bottom shadow-[0_0_10px_#bd154d]" />
            
            <div className="absolute top-[20%] left-[25%] w-6 h-6 rounded-full bg-green-500 shadow-[0_0_20px_#008a47] flex items-center justify-center animate-pulse"><span className="text-[10px] text-black font-bold">A</span></div>
            <div className="absolute top-[10%] right-[25%] w-4 h-4 rounded-full bg-yellow-500 shadow-[0_0_15px_#eab308]" />
            <div className="absolute top-[30%] right-[10%] w-3 h-3 border border-magenta-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ScrollStorytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      // Divide the scroll progress into blocks corresponding to the sections
      const sectionsCount = SECTIONS.length;
      let currentIndex = Math.floor(v * sectionsCount);
      if (currentIndex >= sectionsCount) currentIndex = sectionsCount - 1;
      setActiveIndex(currentIndex);
    });
    return () => unsub();
  }, [scrollYProgress]);

  const colorTextMap: Record<string, string> = {
    cyan: 'text-cyan-500',
    purple: 'text-purple-500',
    gold: 'text-gold-500',
    magenta: 'text-magenta-500',
    green: 'text-green-500',
  };

  const colorBgMap: Record<string, string> = {
    cyan: 'bg-cyan-500',
    purple: 'bg-purple-500',
    gold: 'bg-gold-500',
    magenta: 'bg-magenta-500',
    green: 'bg-green-500',
  };

  const colorBorderMap: Record<string, string> = {
    cyan: 'border-cyan-500/50 hover:bg-cyan-500',
    purple: 'border-purple-500/50 hover:bg-purple-500',
    gold: 'border-gold-500/50 hover:bg-gold-500',
    magenta: 'border-magenta-500/50 hover:bg-magenta-500',
    green: 'border-green-500/50 hover:bg-green-500',
  };

  const colorShadowMap: Record<string, string> = {
    cyan: 'shadow-[0_0_15px_rgba(0,240,255,0.2)]',
    purple: 'shadow-[0_0_15px_rgba(123,47,247,0.2)]',
    gold: 'shadow-[0_0_15px_rgba(255,215,0,0.2)]',
    magenta: 'shadow-[0_0_15px_rgba(255,45,106,0.2)]',
    green: 'shadow-[0_0_15px_rgba(0,255,136,0.2)]',
  };

  return (
    <section ref={containerRef} className="relative bg-void-deepest" style={{ height: `${SECTIONS.length * 100}vh` }}>
      {/* Sticky Container */}
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center justify-between relative z-10 gap-12">
          
          {/* Left Side: Central Animating Object */}
          <div className="flex-1 w-full flex items-center justify-center relative">
            <VisualObject activeIndex={activeIndex} />
          </div>

          {/* Right Side: Text & Data (Fades in based on activeIndex) */}
          <div className="flex-1 w-full max-w-xl flex flex-col justify-center relative h-128 lg:h-auto">
             <AnimatePresence mode="wait">
               <motion.div
                 key={SECTIONS[activeIndex].id}
                 initial={{ opacity: 0, y: 40 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -40 }}
                 transition={{ duration: 0.5 }}
                 className="flex flex-col"
               >
                  <span className={`font-orbitron text-xs tracking-[0.4em] uppercase mb-4 ${colorTextMap[SECTIONS[activeIndex].color]}`}>
                    MODULE 0{activeIndex + 1}
                  </span>
                  <h2 className="text-4xl lg:text-5xl font-orbitron font-bold text-text-primary uppercase tracking-widest mb-6 leading-tight">
                    {SECTIONS[activeIndex].title}
                  </h2>
                  <p className="font-rajdhani text-xl text-text-tertiary mb-10 leading-relaxed">
                    {SECTIONS[activeIndex].desc}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-10">
                     {SECTIONS[activeIndex].metrics.map((metric, i) => (
                       <div key={i} className="holo-panel p-4 bg-void-mid/60 border-black/5 flex items-center gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full ${colorBgMap[SECTIONS[activeIndex].color]} shadow-[0_0_5px_currentColor]`}></div>
                          <span className="font-mono text-xs text-text-tertiary uppercase">{metric}</span>
                       </div>
                     ))}
                  </div>

                  <div>
                     <Link href={`/${SECTIONS[activeIndex].id}`} className={`glow-btn px-8 py-4 ${colorBorderMap[SECTIONS[activeIndex].color]} ${colorShadowMap[SECTIONS[activeIndex].color]} text-text-primary hover:text-black transition-all inline-block text-center`}>
                        Explore {SECTIONS[activeIndex].title} →
                     </Link>
                  </div>
               </motion.div>
             </AnimatePresence>
          </div>
        </div>

        {/* Scroll Progress Indicator */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 hidden lg:flex">
           {SECTIONS.map((_, i) => (
             <div key={i} className="flex flex-col items-center gap-2">
                <span className={`font-mono text-[8px] ${i === activeIndex ? 'text-text-primary' : 'text-text-tertiary'}`}>0{i + 1}</span>
                <div className={`w-1 transition-all duration-300 ${i === activeIndex ? 'h-12 bg-black shadow-[0_0_10px_#fff]' : 'h-4 bg-black/10'}`} />
             </div>
           ))}
        </div>

      </div>
    </section>
  );
}
