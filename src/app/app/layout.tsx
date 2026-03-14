'use client';

import dynamic from 'next/dynamic';
import AppSidebar from '@/components/app/AppSidebar';
import AppStatusBar from '@/components/app/AppStatusBar';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

// Lazy load UniverseCanvas to avoid SSR issues with Three.js
const UniverseCanvas = dynamic(() => import('@/components/canvas/UniverseCanvas'), { ssr: false });

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isInitialized, setIsInitialized] = useState(false);
  const [progress, setProgress] = useState(0);

  // Simulation of the "Mission Control" initialization sequence
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsInitialized(true), 500);
          return 100;
        }
        return p + Math.random() * 15;
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-void-deepest text-text-primary selection:bg-cyan-500/30">
      
      {/* Layer 0: Three.js Universe */}
      <UniverseCanvas />

      {/* Layer 3: Loading / Initializing Screen */}
      <AnimatePresence>
        {!isInitialized && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-void-deepest flex flex-col items-center justify-center p-8 text-center"
          >
             <div className="w-16 h-16 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-8"></div>
             <div className="font-orbitron text-xl tracking-[0.4em] text-text-primary mb-2">INITIALIZING_DAO_COSMOS_OS</div>
             <div className="font-rajdhani text-text-tertiary text-xs tracking-widest uppercase mb-12">Establishing Secure Connection...</div>
             
             <div className="w-64 h-1 bg-black/5 rounded-full overflow-hidden relative">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-cyan-500 shadow-[0_0_15px_#007a8c]"
                  style={{ width: `${progress}%` }}
                  transition={{ type: 'spring', bounce: 0 }}
                />
             </div>
             
             <div className="mt-8 grid grid-cols-1 gap-2">
                <div className={`font-mono text-[9px] transition-colors ${progress > 20 ? 'text-green-500' : 'text-text-tertiary'}`}>[OK] CONNECTING_TO_ETHEREUM</div>
                <div className={`font-mono text-[9px] transition-colors ${progress > 50 ? 'text-green-500' : 'text-text-tertiary'}`}>[OK] LOADING_DAO_STATE</div>
                <div className={`font-mono text-[9px] transition-colors ${progress > 80 ? 'text-green-500' : 'text-text-tertiary'}`}>[OK] AWAKENING_AI_AGENTS</div>
                <div className={`font-mono text-[9px] transition-colors ${progress >= 100 ? 'text-green-500' : 'text-text-tertiary'}`}>[OK] RENDERING_UNIVERSE</div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Layer 1: UI Shell */}
      {isInitialized && (
        <div className="relative z-10 flex h-full w-full">
          <motion.div 
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <AppSidebar />
          </motion.div>

          <div className="flex-1 flex flex-col min-w-0">
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AppStatusBar />
            </motion.div>
            
            <main className="flex-1 relative overflow-auto custom-scrollbar p-6">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={pathname}
                   initial={{ opacity: 0, scale: 0.98, y: 10 }}
                   animate={{ opacity: 1, scale: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 0.98, y: -10 }}
                   transition={{ duration: 0.4, ease: "easeOut" }}
                   className="h-full w-full"
                 >
                   {children}
                 </motion.div>
               </AnimatePresence>
            </main>
          </div>
        </div>
      )}

      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 scanlines opacity-[0.03]"></div>
    </div>
  );
}
