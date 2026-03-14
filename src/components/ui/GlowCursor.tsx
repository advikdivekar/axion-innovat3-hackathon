'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function GlowCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-500/30 pointer-events-none z-[9999] hidden lg:block"
      animate={{ 
        x: mousePos.x - 16, 
        y: mousePos.y - 16,
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 250, restDelta: 0.001 }}
    >
      <div className="absolute inset-0 rounded-full bg-cyan-500/5 backdrop-blur-sm"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-500 rounded-full shadow-[0_0_10px_#007a8c]"></div>
    </motion.div>
  );
}
