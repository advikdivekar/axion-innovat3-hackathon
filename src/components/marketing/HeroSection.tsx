'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Hero3DObject = dynamic(() => import('@/components/canvas/Hero3DObject'), { ssr: false });

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] bg-void-deepest overflow-hidden border-b border-black/10 flex flex-col pt-24">
      
      {/* Background Grid Lines (ChainGPT Labs Style) */}
      <div className="absolute inset-x-0 top-0 h-full z-0 pointer-events-none flex justify-center opacity-30">
        <div className="w-full h-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 border-x border-black/10">
          <div className="border-r border-black/10 relative">
             {/* Corner brackets for aesthetic */}
             <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-700"></div>
          </div>
          <div className="relative">
             <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-700"></div>
          </div>
        </div>
        
        {/* Horizontal dividing lines */}
        <div className="absolute inset-0 flex flex-col justify-center max-w-7xl mx-auto">
          <div className="h-1/3 border-b border-black/10 w-full"></div>
          <div className="h-1/3 border-b border-black/10 w-full"></div>
        </div>
      </div>

      {/* Massive Parallax Background Text */}
      <div className="absolute top-[35%] w-full z-0 flex items-center overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, -2000] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap font-orbitron font-extrabold text-[15vw] text-black/[0.03] leading-none tracking-tighter"
        >
          MISSION CONTROL • DAO COSMOS • MISSION CONTROL • DAO COSMOS
        </motion.div>
      </div>

      {/* Foreground Content Grid */}
      <div className="container mx-auto max-w-7xl relative z-20 flex-1 grid grid-cols-1 lg:grid-cols-2 pointer-events-none h-full min-h-[70vh]">
        
        {/* Left Column: Typography & CTAs aligned to bottom-left text block */}
        <div className="col-span-1 flex flex-col justify-end pb-12 px-6 lg:border-r border-transparent">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 pointer-events-auto w-max"
          >
            <span className="px-3 py-1 bg-white/50 backdrop-blur-md font-orbitron text-[9px] text-text-primary tracking-[0.2em] uppercase inline-flex items-center gap-2 border border-black/10 shadow-sm">
              <span className="w-1.5 h-1.5 bg-green-500 animate-pulse"></span>
              LIVE ON ETHEREUM
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-text-primary mb-6 text-4xl xl:text-5xl 2xl:text-6xl font-orbitron font-bold leading-[1.1] pointer-events-none uppercase tracking-tight"
          >
            THE OPERATING <br/> SYSTEM FOR<br/>
            <span className="text-cyan-700 block mt-2">DECENTRALIZED <br className="hidden lg:block"/> GOVERNANCE</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-rajdhani text-lg text-text-secondary max-w-[280px] mb-8 leading-relaxed pointer-events-auto bg-white/30 backdrop-blur-sm p-4 border border-black/5"
          >
            Visualize. Govern. Defend. Simulate. Your DAO — in real-time 3D. 
            Mission Control for the next era of human coordination.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col gap-4 pointer-events-auto w-full max-w-[280px]"
          >
            <Link href="/universe" className="w-full text-center px-6 py-4 bg-cyan-700 text-white font-orbitron font-bold tracking-widest text-[10px] hover:bg-cyan-600 transition-all shadow-[0_0_15px_rgba(0,122,140,0.3)]">
              ENTER THE UNIVERSE
            </Link>
            <button className="w-full text-center px-6 py-4 bg-transparent border border-black/20 text-text-primary font-orbitron font-bold tracking-widest text-[10px] hover:border-black/40 transition-all backdrop-blur-md">
              WATCH DEMO
            </button>
          </motion.div>
        </div>

        {/* Right Column: 3D Object Container */}
        <div className="col-span-1 hidden lg:flex items-center justify-center relative pointer-events-auto h-full min-h-[60vh] pb-12">
          <div className="w-full h-full max-w-xl">
             <Hero3DObject />
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-12 right-6 flex flex-col items-end gap-2 font-orbitron text-[8px] tracking-[0.4em] uppercase text-text-tertiary pointer-events-none"
          >
             <span className="block mb-2 text-black/30 border-b border-black/10 pb-2 w-full text-right pointer-events-none">OUR PARTNERS:</span>
             <span className="hover:text-cyan-700 cursor-pointer pointer-events-auto transition-colors">Alchemy</span>
             <span className="hover:text-cyan-700 cursor-pointer pointer-events-auto transition-colors">Anthropic Claude</span>
             <span className="hover:text-cyan-700 cursor-pointer pointer-events-auto transition-colors">Ethereum</span>
          </motion.div>
        </div>


      </div>
      
    </section>
  );
}
