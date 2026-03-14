// src/store/agentStore.ts
import { create } from 'zustand';
import { AgentMessage, AgentRole, AgentContext } from '@/lib/types';

interface AgentState {
    // State
    messages: AgentMessage[];
    isStreaming: boolean;
    activeRole: AgentRole;
    highlights: string[]; // Node IDs for the 3D scene to glow

    // Actions
    setActiveRole: (role: AgentRole) => void;
    setHighlights: (nodeIds: string[]) => void;
    clearHistory: () => void;

    // Core AI Interaction
    sendMessage: (text: string, context?: AgentContext) => Promise<void>;
}

export const useAgentStore = create<AgentState>()((set, get) => ({
    messages: [
        {
            id: 'system-init',
            role: 'assistant',
            content: 'DAO Cosmos OS initialized. AI Commander online. Awaiting your instructions.',
            timestamp: new Date().toISOString(),
            agentRole: 'general',
        }
    ],
    isStreaming: false,
    activeRole: 'general',
    highlights: [],

    setActiveRole: (role) => set({ activeRole: role }),

    setHighlights: (nodeIds) => set({ highlights: nodeIds }),

    clearHistory: () => set((state) => ({
        messages: state.messages.slice(0, 1), // Keep the init message
        highlights: []
    })),

    sendMessage: async (text: string, context?: AgentContext) => {
        const state = get();
        if (state.isStreaming) return; // Prevent concurrent requests

        const userMessageId = crypto.randomUUID();
        const assistantMessageId = crypto.randomUUID();
        const currentRole = state.activeRole;

        // 1. Instantly append the user's message and create an empty placeholder for the AI
        set((state) => ({
            isStreaming: true,
            highlights: [], // Clear previous highlights
            messages: [
                ...state.messages,
                {
                    id: userMessageId,
                    role: 'user',
                    content: text,
                    timestamp: new Date().toISOString(),
                    agentRole: currentRole,
                },
                {
                    id: assistantMessageId,
                    role: 'assistant',
                    content: '', // Starts empty for the streaming effect
                    timestamp: new Date().toISOString(),
                    agentRole: currentRole,
                    isStreaming: true,
                }
            ]
        }));

        try {
            // ══════════════════════════════════════════════════════════════
            // API INTEGRATION POINT: 
            // For the hackathon, replace this simulation block with the real 
            // fetch call to `/api/ai` and pipe the ReadableStream chunks here.
            // ══════════════════════════════════════════════════════════════

            const mockResponseText = generateMockResponse(text, currentRole);
            const mockHighlights = detectMockHighlights(text);

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 600));

            // Simulate streaming character by character (or chunk by chunk)
            const chunks = mockResponseText.split(' ');

            for (let i = 0; i < chunks.length; i++) {
                // Stop if user cleared history while streaming
                if (!get().messages.find(m => m.id === assistantMessageId)) break;

                await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 50));

                set((state) => ({
                    messages: state.messages.map(msg =>
                        msg.id === assistantMessageId
                            ? { ...msg, content: msg.content + (i === 0 ? '' : ' ') + chunks[i] }
                            : msg
                    )
                }));
            }

            // Finalize the message (turn off streaming flag, apply highlights)
            set((state) => ({
                isStreaming: false,
                highlights: mockHighlights,
                messages: state.messages.map(msg =>
                    msg.id === assistantMessageId
                        ? { ...msg, isStreaming: false, highlights: mockHighlights }
                        : msg
                )
            }));

        } catch (error) {
            // Handle failures gracefully so the UI doesn't lock up
            set((state) => ({
                isStreaming: false,
                messages: state.messages.map(msg =>
                    msg.id === assistantMessageId
                        ? { ...msg, content: 'Error: Communication link to AI core severed.', isStreaming: false }
                        : msg
                )
            }));
        }
    }
}));

// ═══ MOCK HELPERS (Remove when API is wired) ═══
function generateMockResponse(query: string, role: AgentRole): string {
    const q = query.toLowerCase();
    if (q.includes('risk') || q.includes('threat')) {
        return "I have analyzed the current network. There is an elevated risk associated with a recent sybil pattern detection. I am highlighting the affected contributor nodes now.";
    }
    if (q.includes('proposal') || q.includes('vote')) {
        return "Proposal #127 is currently active. Whale concentration is high, but the predictive model suggests an 87% probability of passing. Highlighting the battle arena.";
    }
    if (q.includes('treasury') || q.includes('fund')) {
        return "The treasury reactor is stable at $2.34B. Runway is estimated at 4.2 years. Highlighting recent major outflows.";
    }
    return "Command acknowledged. I am monitoring the DAO network and standing by for further instructions.";
}

function detectMockHighlights(query: string): string[] {
    const q = query.toLowerCase();
    if (q.includes('risk') || q.includes('threat')) return ['threat-th1', 'contributor-0xMultiple'];
    if (q.includes('proposal') || q.includes('vote')) return ['proposal-127'];
    if (q.includes('treasury') || q.includes('fund')) return ['treasury-core'];
    return [];
}