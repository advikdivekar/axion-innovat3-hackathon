'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useState, useCallback } from 'react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  title: string;
  message?: string;
}

const VARIANT_STYLES: Record<ToastVariant, { color: string; bg: string; border: string; Icon: typeof CheckCircle2 }> = {
  success: { color: '#22c55e', bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.2)',   Icon: CheckCircle2 },
  error:   { color: '#ff5c16', bg: 'rgba(255,92,22,0.08)',   border: 'rgba(255,92,22,0.2)',   Icon: AlertCircle  },
  warning: { color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', Icon: AlertTriangle },
  info:    { color: '#00d4ff', bg: 'rgba(0,212,255,0.08)',   border: 'rgba(0,212,255,0.2)',   Icon: Info          },
};

interface ToastItemProps {
  toast: ToastItem;
  onRemove: (id: string) => void;
}

function ToastComponent({ toast, onRemove }: ToastItemProps) {
  const style = VARIANT_STYLES[toast.variant];
  const { Icon } = style;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'rgba(10,10,15,0.95)',
        border: `1px solid ${style.border}`,
        borderLeft: `3px solid ${style.color}`,
        borderRadius: '1.2rem',
        padding: '1.4rem 1.6rem',
        display: 'flex', alignItems: 'flex-start', gap: '1.2rem',
        minWidth: '30rem', maxWidth: '40rem',
        backdropFilter: 'blur(1.6rem)',
        boxShadow: '0 1.6rem 4.8rem rgba(0,0,0,0.4)',
      }}
    >
      <Icon size={18} color={style.color} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.3rem', fontWeight: 600, color: '#ffffff', marginBottom: toast.message ? '0.4rem' : 0 }}>
          {toast.title}
        </div>
        {toast.message && (
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.2rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>
            {toast.message}
          </div>
        )}
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: '0.2rem', flexShrink: 0 }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)')}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)')}
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div style={{
      position: 'fixed', bottom: '2.4rem', right: '2.4rem',
      zIndex: 9000, display: 'flex', flexDirection: 'column', gap: '0.8rem',
    }}>
      <AnimatePresence mode="popLayout">
        {toasts.map(t => (
          <ToastComponent key={t.id} toast={t} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Hook for managing toasts
export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((variant: ToastVariant, title: string, message?: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, variant, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}
