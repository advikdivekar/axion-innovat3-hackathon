// src/components/ai/AIHologram.tsx
'use client';

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAgentStore } from '@/store/agentStore';
import clsx from 'clsx';

export function AIHologram() {
  const messages = useAgentStore((s) => s.messages);
  const isStreaming = useAgentStore((s) => s.isStreaming);
  const activeRole = useAgentStore((s) => s.activeRole);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const visibleMessages = messages.slice(-6);
  const roleColors: Record<string, string> = { governance: '#7b2ff7', treasury: '#ffd700', security: '#ff2d6a', operations: '#00f0ff', general: '#00f0ff' };
  const roleColor = roleColors[activeRole] || '#00f0ff';

  const hexToRgb = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  return (
    <AnimatePresence>
      {visibleMessages.length > 1 && (
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="fixed bottom-[72px] right-4 w-[400px] max-h-[350px] z-[45]" style={{ background: 'rgba(8, 8, 18, 0.88)', backdropFilter: 'blur(20px)', border: `1px solid rgba(${hexToRgb(roleColor)}, 0.2)`, borderRadius: '12px', boxShadow: `0 0 30px rgba(${hexToRgb(roleColor)}, 0.08)` }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: `1px solid rgba(${hexToRgb(roleColor)}, 0.1)` }}>
            <div className="relative">
              <div className={clsx('w-8 h-8 rounded-full flex items-center justify-center', isStreaming && 'animate-pulse')} style={{ background: `rgba(${hexToRgb(roleColor)}, 0.15)`, border: `1px solid rgba(${hexToRgb(roleColor)}, 0.3)` }}>
                <span className="text-[10px] font-display" style={{ color: roleColor }}>AI</span>
              </div>
              <div className={clsx('absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0a0a0f]', isStreaming ? 'bg-[#7b2ff7] animate-pulse' : 'bg-[#00ff88]')} />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-display uppercase tracking-[0.15em] text-[#8892a8]">AI Commander</div>
              <div className="text-[9px] font-mono uppercase tracking-wider" style={{ color: roleColor }}>{activeRole} agent {isStreaming ? '• analyzing' : '• ready'}</div>
            </div>
            {isStreaming && (
              <div className="flex items-center gap-[2px] h-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div key={i} className="w-[2px] rounded-full" style={{ backgroundColor: roleColor }} animate={{ height: [4, 12, 6, 16, 4] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }} />
                ))}
              </div>
            )}
          </div>
          {/* Messages */}
          <div ref={scrollRef} className="px-4 py-3 max-h-[240px] overflow-y-auto space-y-3">
            {visibleMessages.map((msg) => (
              <div key={msg.id}>
                {msg.role === 'user' ? (
                  <div className="text-right">
                    <span className="inline-block px-3 py-1.5 rounded-lg text-xs font-body text-[#e8ecf4] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)]">{msg.content}</span>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs font-body text-[#c0c8d8] leading-relaxed">
                      {msg.content}
                      {msg.isStreaming && <motion.span className="inline-block w-[6px] h-[14px] ml-0.5 align-text-bottom" style={{ backgroundColor: roleColor }} animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} />}
                    </p>
                    {msg.highlights && msg.highlights.length > 0 && (
                      <div className="flex gap-1 mt-1.5 flex-wrap">
                        {msg.highlights.map((h) => (
                          <span key={h} className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: `rgba(${hexToRgb(roleColor)}, 0.1)`, color: roleColor, border: `1px solid rgba(${hexToRgb(roleColor)}, 0.2)` }}>{h}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Scan Line Overlay */}
          <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.015) 2px, rgba(0,240,255,0.015) 3px)' }} />
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l rounded-tl-xl" style={{ borderColor: `rgba(${hexToRgb(roleColor)}, 0.5)` }} />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r rounded-tr-xl" style={{ borderColor: `rgba(${hexToRgb(roleColor)}, 0.5)` }} />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l rounded-bl-xl" style={{ borderColor: `rgba(${hexToRgb(roleColor)}, 0.5)` }} />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r rounded-br-xl" style={{ borderColor: `rgba(${hexToRgb(roleColor)}, 0.5)` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
