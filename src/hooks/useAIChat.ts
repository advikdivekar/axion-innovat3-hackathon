'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export type ChatMessage = { role: 'user' | 'assistant'; content: string };

export function useAIChat(agent?: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = useCallback(async (text?: string) => {
    const msg = text ?? input.trim();
    if (!msg || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setLoading(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, agent: agent ?? 'general' }),
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
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: 'assistant', content: aiText };
            return updated;
          });
        }
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error connecting to AI agent.' }]);
    }
    setLoading(false);
  }, [input, loading]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return { messages, input, setInput, sendMessage, loading, messagesEndRef };
}
