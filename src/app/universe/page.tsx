'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function UniversePage() {
  const steps = [
    { title: 'REAL-TIME DATA', desc: 'Direct synchronization with Ethereum Mainnet events and governance protocols.' },
    { title: '3D NAVIGATION', desc: 'Fly through your organization. Zoom into contributors. Audit the treasury core.' },
    { title: 'NODE INTERACTION', desc: 'Every data point is an interactive object. Inspect wallets, proposals, and logs.' },
    { title: 'LIVE EVENTS', desc: 'Experience the heartbeat of your DAO as events ripple through the neural network.' },
  ];

  return (
    <div className="bg-void-deepest min-h-screen">
      {/* Cinematic Bridge Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        {/* Massive CSS Node Network Background */}
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent opacity-50"></div>
           {[...Array(30)].map((_, i) => (
             <motion.div
               key={i}
               animate={{
                 y: [0, -100, 0],
                 x: [0, Math.random() * 50 - 25, 0],
                 opacity: [0.2, 0.5, 0.2],
               }}
               transition={{
                 duration: 10 + Math.random() * 10,
                 repeat: Infinity,
                 ease: "linear",
               }}
               className="absolute w-1 h-1 bg-cyan-700 rounded-full"
               style={{
                 top: `${Math.random() * 100}%`,
                 left: `${Math.random() * 100}%`,
               }}
             />
           ))}
           {/* SVG Lines */}
           <svg className="absolute inset-0 w-full h-full opacity-10">
              <defs>
                 <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#007a8c" stopOpacity="0" />
                    <stop offset="50%" stopColor="#007a8c" stopOpacity="1" />
                    <stop offset="100%" stopColor="#007a8c" stopOpacity="0" />
                 </linearGradient>
              </defs>
              <line x1="20%" y1="30%" x2="80%" y2="70%" stroke="url(#line-grad)" strokeWidth="0.5" />
              <line x1="10%" y1="80%" x2="90%" y2="20%" stroke="url(#line-grad)" strokeWidth="0.5" />
           </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="font-orbitron font-bold text-cyan-500 tracking-[0.4em] text-xs uppercase">Bridge Initiative</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-hero text-text-primary mb-8 lg:text-8xl"
          >
            YOUR DAO. VISUALIZED.<br/>
            <span className="text-cyan-500">IN 3 DIMENSIONS.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-rajdhani text-xl text-text-tertiary max-w-3xl mx-auto mb-16 leading-relaxed"
          >
            Leave the world of 2D dashboards behind. Step into a living, breathing neural network that represents the true state of your decentralized organization. Connect your wallet and take command.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', damping: 15 }}
          >
            <Link 
              href="/app" 
              className="group relative inline-block px-12 py-6 bg-cyan-500 font-orbitron text-black font-bold tracking-[0.2em] text-lg uppercase transition-all hover:scale-105 hover:shadow-[0_0_100px_rgba(0,240,255,0.6)]"
            >
              <span className="relative z-10">ENTER THE UNIVERSE</span>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12"
          >
             <button className="font-rajdhani text-text-tertiary uppercase tracking-widest text-sm hover:text-text-primary transition-colors">
                Watch a 60-second demo
             </button>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 bg-void-mid border-y border-black/5">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {steps.map((step, idx) => (
                 <motion.div 
                   key={step.title}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   className="p-8 border border-black/5 bg-void-deepest/50 rounded-lg group hover:border-cyan-500/30 transition-all"
                 >
                    <span className="font-mono text-cyan-500 text-xs mb-4 block">000{idx + 1}</span>
                    <h3 className="font-orbitron font-bold text-text-primary tracking-widest uppercase mb-4 text-sm">{step.title}</h3>
                    <p className="font-rajdhani text-text-tertiary">{step.desc}</p>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Showcase Mockup Sections */}
      <section className="py-24">
         <div className="container mx-auto px-6 text-center">
            <h2 className="text-xl mb-16">SYSTEMS INITIALIZED</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {['GOVERNANCE', 'TREASURY', 'SECURITY'].map(module => (
                 <div key={module} className="holo-panel aspect-[16/10] bg-void-mid flex items-center justify-center group overflow-hidden">
                    <div className="absolute inset-0 scanlines opacity-20"></div>
                    <span className="font-orbitron text-xs text-text-tertiary group-hover:text-cyan-500 transition-colors tracking-[0.3em] font-bold">{module}_INTERFACE</span>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}
