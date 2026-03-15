'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface Message { role: 'user' | 'assistant'; content: string; }

export function CommandBar() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Ctrl+K shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  async function send() {
    const msg = input.trim();
    if (!msg || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setLoading(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
      });
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let aiText = '';
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          aiText += decoder.decode(value, { stream: true });
          setMessages(prev => { const u = [...prev]; u[u.length - 1] = { role: 'assistant', content: aiText }; return u; });
        }
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Failed to connect to AI.' }]);
    }
    setLoading(false);
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(0.4rem)' }}
            />
            {/* Command bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.2, ease: [0.4, 1.35, 0.5, 0.97] }}
              style={{
                position: 'fixed', top: '10rem', left: '50%', transform: 'translateX(-50%)',
                zIndex: 51, width: '56rem', maxWidth: '90vw',
              }}
            >
              <div className="card-glass" style={{ overflow: 'hidden' }}>
                {/* Input row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', padding: '1.4rem 1.6rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <Search size={16} color="rgba(255,255,255,0.4)" />
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && send()}
                    placeholder="Ask Axion anything about your DAO..."
                    style={{
                      flex: 1, background: 'transparent', border: 'none', outline: 'none',
                      fontFamily: 'Inter, sans-serif', fontSize: '1.5rem', color: '#ffffff',
                    }}
                  />
                  <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: '0.2rem' }}>
                    <X size={14} />
                  </button>
                </div>

                {/* Messages */}
                {messages.length > 0 && (
                  <div ref={scrollRef} style={{ maxHeight: '32rem', overflowY: 'auto', padding: '1.6rem' }}>
                    {messages.map((m, i) => (
                      <div key={i} style={{ marginBottom: '1.2rem' }}>
                        {m.role === 'user' ? (
                          <div style={{ fontSize: '1.3rem', color: '#00d4ff', fontFamily: 'Inter, sans-serif' }}>
                            <span style={{ opacity: 0.5 }}>You: </span>{m.content}
                          </div>
                        ) : (
                          <div style={{ fontSize: '1.3rem', color: '#e2e8f0', fontFamily: 'Inter, sans-serif', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                            <span style={{ color: '#d075ff', opacity: 0.7 }}>Axion: </span>
                            {m.content || (loading && i === messages.length - 1 ? '...' : '')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer hint */}
                <div style={{ padding: '1rem 1.6rem', borderTop: messages.length > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', color: 'rgba(255,255,255,0.2)' }}>
                    Press Enter to send · Esc to close
                  </span>
                  {loading && (
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', color: '#00d4ff' }}>
                      Thinking...
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
