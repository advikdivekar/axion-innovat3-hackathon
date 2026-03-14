// src/hooks/useStreamingAI.ts
'use client';

import { useState, useCallback } from 'react';
import { useAgentStore } from '@/store/agentStore';
import { useDAOStore } from '@/store/daoStore';
import { buildAgentContext, detectAgentRole } from '@/services/ai';
import type { ModuleId } from '@/lib/types';

export function useStreamingAI() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = useCallback(async (message: string, currentModule: ModuleId) => {
    if (isStreaming) return;
    setIsStreaming(true);
    setError(null);

    const agentStore = useAgentStore.getState();
    const daoStore = useDAOStore.getState();
    const role = detectAgentRole(message, currentModule);
    agentStore.setActiveRole(role);

    const context = buildAgentContext({
      daoMeta: daoStore.daoMeta,
      proposals: daoStore.proposals,
      treasury: daoStore.treasury,
      contributors: daoStore.contributors,
      threats: daoStore.threats,
    });

    const userMessageId = crypto.randomUUID();
    const assistantMessageId = crypto.randomUUID();

    useAgentStore.setState((state) => ({
      isStreaming: true,
      highlights: [],
      messages: [
        ...state.messages,
        { id: userMessageId, role: 'user' as const, content: message, timestamp: new Date().toISOString(), agentRole: role },
        { id: assistantMessageId, role: 'assistant' as const, content: '', timestamp: new Date().toISOString(), agentRole: role, isStreaming: true },
      ],
    }));

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context, role, history: agentStore.messages.slice(-16) }),
      });

      if (!response.ok) throw new Error(`AI request failed: ${response.status}`);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error('No reader available');

      let fullResponse = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullResponse += chunk;
        useAgentStore.setState((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === assistantMessageId ? { ...msg, content: fullResponse } : msg
          ),
        }));
      }

      let highlights: string[] = [];
      try {
        const cleaned = fullResponse.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
        const parsed = JSON.parse(cleaned);
        highlights = Array.isArray(parsed.highlights) ? parsed.highlights : [];
        if (parsed.text) fullResponse = parsed.text;
      } catch { /* not JSON, use raw */ }

      useAgentStore.setState((state) => ({
        isStreaming: false,
        highlights,
        messages: state.messages.map((msg) =>
          msg.id === assistantMessageId ? { ...msg, content: fullResponse, isStreaming: false, highlights } : msg
        ),
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      useAgentStore.setState((state) => ({
        isStreaming: false,
        messages: state.messages.map((msg) =>
          msg.id === assistantMessageId ? { ...msg, content: 'Error: Communication link to AI core severed.', isStreaming: false } : msg
        ),
      }));
    } finally {
      setIsStreaming(false);
    }
  }, [isStreaming]);

  return { send, isStreaming, error };
}
