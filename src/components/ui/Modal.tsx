'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

type ModalSize = 'sm' | 'md' | 'lg' | 'full';

const SIZE_MAP: Record<ModalSize, string> = {
  sm: '40rem',
  md: '56rem',
  lg: '80rem',
  full: '100vw',
};

interface ModalProps {
  open: boolean;
  onClose: () => void;
  size?: ModalSize;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, size = 'md', title, children }: ModalProps) {
  // Close on Escape
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
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(0.4rem)',
            }}
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 61,
              width: size === 'full' ? '100%' : SIZE_MAP[size],
              maxWidth: '90vw',
              maxHeight: '90vh',
              overflow: 'auto',
            }}
          >
            <div className="card-glass" style={{ padding: '2.4rem' }}>
              {title && (
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginBottom: '2rem', paddingBottom: '1.6rem',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.1em' }}>
                    {title}
                  </h2>
                  <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: '0.4rem' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ffffff')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)')}
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
