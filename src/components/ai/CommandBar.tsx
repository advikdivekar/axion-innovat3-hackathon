// src/components/ai/CommandBar.tsx
'use client';

import { useState, useRef, useCallback, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAgentStore } from '@/store/agentStore';
import { useStreamingAI } from '@/hooks/useStreamingAI';
import { QuickActions } from './QuickActions';
import type { ModuleId } from '@/lib/types';
import clsx from 'clsx';

interface CommandBarProps {
  currentModule: ModuleId;
}

export function CommandBar({ currentModule }: CommandBarProps) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isStreaming = useAgentStore((s) => s.isStreaming);
  const { send } = useStreamingAI();

  const handleSubmit = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;
    send(trimmed, currentModule);
    setInput('');
  }, [input, isStreaming, send, currentModule]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
  }, [handleSubmit]);

  const handleQuickAction = useCallback((command: string) => {
    if (isStreaming) return;
    send(command, currentModule);
  }, [isStreaming, send, currentModule]);

  return (
    <div className="fixed bottom-0 left-[60px] right-0 z-[50]" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,5,8,0.95) 30%)', paddingTop: '24px' }}>
      <AnimatePresence>
        {isFocused && !isStreaming && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }} className="px-4 pb-2">
            <QuickActions onAction={handleQuickAction} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="px-4 pb-4">
        <div className={clsx('flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 border', isFocused ? 'border-[rgba(0,240,255,0.4)] shadow-[0_0_20px_rgba(0,240,255,0.15)]' : 'border-[rgba(0,240,255,0.12)]')} style={{ background: 'rgba(8, 8, 18, 0.85)', backdropFilter: 'blur(16px)' }}>
          <div className={clsx('w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono flex-shrink-0', isStreaming ? 'bg-[#7b2ff7] animate-pulse' : 'bg-[rgba(0,240,255,0.15)] text-[#00f0ff]')}>AI</div>
          <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setTimeout(() => setIsFocused(false), 200)} onKeyDown={handleKeyDown} placeholder={isStreaming ? 'AI Commander is analyzing...' : 'Ask the AI Commander...'} disabled={isStreaming} className={clsx('flex-1 bg-transparent border-none outline-none font-body text-sm text-[#e8ecf4] placeholder:text-[#4a5268]', isStreaming && 'opacity-50 cursor-not-allowed')} />
          <button onClick={handleSubmit} disabled={!input.trim() || isStreaming} className={clsx('px-3 py-1.5 rounded text-xs font-display uppercase tracking-[0.15em] border transition-all duration-200', input.trim() && !isStreaming ? 'border-[#00f0ff] text-[#00f0ff] hover:bg-[rgba(0,240,255,0.1)] cursor-pointer' : 'border-[#2a3040] text-[#2a3040] cursor-not-allowed')}>{isStreaming ? '...' : 'SEND'}</button>
        </div>
      </div>
    </div>
  );
}
