'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Drawer({ open, onClose, title, children }: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 60,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(0.4rem)',
            }}
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 61,
              width: '38rem', maxWidth: '100vw',
              background: 'rgba(8,8,18,0.98)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRight: 'none',
              backdropFilter: 'blur(2rem)',
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            {title && (
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '2rem 2.4rem', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0,
              }}>
                <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.08em' }}>
                  {title}
                </h3>
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: '0.4rem' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ffffff')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)')}
                >
                  <X size={18} />
                </button>
              </div>
            )}
            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '2.4rem' }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
