// src/store/eventStore.ts
import { create } from 'zustand';
import { DAOEvent, VisualEffect } from '@/lib/types';
import { EVENT_EFFECT_MAP } from '@/lib/eventTypes';
import { MODULES } from '@/lib/constants';
import { useDAOStore } from './daoStore';

interface EventState {
    events: DAOEvent[];
    activeEffects: VisualEffect[];
    isDemoMode: boolean;

    // Actions
    pushEvent: (event: Omit<DAOEvent, 'id' | 'timestamp'>) => void;
    clearEffect: (id: string) => void;
    startDemoMode: () => void;
    stopDemoMode: () => void;
}

// Module-level variable to hold the demo interval outside of React's state cycle
// This prevents memory leaks and guarantees only one loop runs at a time.
let demoInterval: NodeJS.Timeout | null = null;

// Helper to route the visual effect to the correct 3D cluster based on event type
const getClusterOriginForEvent = (type: string): [number, number, number] => {
    switch (type) {
        case 'vote_cast':
        case 'proposal_created':
        case 'proposal_executed':
            return MODULES.governance.clusterCenter;
        case 'transfer_in':
        case 'transfer_out':
        case 'swap':
            return MODULES.treasury.clusterCenter;
        case 'threat_detected':
        case 'threat_resolved':
        case 'whale_movement':
            return MODULES.security.clusterCenter;
        case 'contributor_join':
        case 'contributor_leave':
        case 'delegate_change':
            return MODULES.contributors.clusterCenter;
        default:
            return MODULES.home.clusterCenter;
    }
};

export const useEventStore = create<EventState>()((set, get) => ({
    events: [],
    activeEffects: [],
    isDemoMode: false,

    pushEvent: (eventPayload) => {
        // 1. Construct full event object
        const newEvent: DAOEvent = {
            ...eventPayload,
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
        };

        // 2. CROSS-STORE COMMUNICATION: Immediately patch the DAO data
        // This updates the numbers on the UI panels instantly.
        useDAOStore.getState().updateFromEvent(newEvent);

        set((state) => {
            // 3. Keep memory clean: Only store the last 100 events for the UI ticker
            const nextEvents = [newEvent, ...state.events].slice(0, 100);
            let nextEffects = state.activeEffects;

            // 4. Generate 3D Visual Effect payload for Dev A's R3F Canvas
            const effectConfig = EVENT_EFFECT_MAP[newEvent.type];

            if (effectConfig) {
                const effectId = crypto.randomUUID();
                const visualEffect: VisualEffect = {
                    id: effectId,
                    type: effectConfig.effectType,
                    origin: getClusterOriginForEvent(newEvent.type),
                    color: effectConfig.color,
                    intensity: effectConfig.intensity * newEvent.magnitude,
                    duration: effectConfig.duration,
                    startedAt: Date.now(),
                };

                nextEffects = [...state.activeEffects, visualEffect];

                // 5. GARBAGE COLLECTION: Auto-remove the effect after its animation duration
                // This ensures the 3D scene doesn't choke on thousands of lingering meshes
                setTimeout(() => {
                    get().clearEffect(effectId);
                }, effectConfig.duration + 100); // 100ms buffer to let animation fully fade
            }

            return {
                events: nextEvents,
                activeEffects: nextEffects,
            };
        });
    },

    clearEffect: (id: string) => {
        set((state) => ({
            activeEffects: state.activeEffects.filter((e) => e.id !== id),
        }));
    },

    // ═══ DEMO MODE LOGIC ═══
    // Used for the 3-minute hackathon pitch. Fires realistic events on a timer.
    startDemoMode: () => {
        if (demoInterval) return; // Prevent duplicate loops

        set({ isDemoMode: true });

        const demoEvents: Omit<DAOEvent, 'id' | 'timestamp'>[] = [
            { type: 'vote_cast', title: 'Vote on Proposal #127', data: { voter: 'vitalik.eth', power: 50000 }, targetNodeId: 'proposal-127', magnitude: 0.5 },
            { type: 'transfer_out', title: 'Treasury Transfer', data: { to: '0xDevTeam...', amount: 250000, token: 'USDC' }, magnitude: 0.7 },
            { type: 'contributor_join', title: 'New Architect Joined', data: { address: '0xNewBuilder...' }, magnitude: 0.6 },
            { type: 'whale_movement', title: 'Whale Vote Detected', data: { voter: 'a16z.eth', power: 2100000 }, targetNodeId: 'proposal-127', magnitude: 1.0 },
            { type: 'threat_detected', title: 'Sybil Pattern Detected', data: { risk: 88 }, magnitude: 0.9 },
            { type: 'transfer_in', title: 'Protocol Fee Accrual', data: { amount: 120000, token: 'UNI' }, magnitude: 0.4 },
        ];

        let index = 0;

        // Fire an event every 3.5 seconds
        demoInterval = setInterval(() => {
            get().pushEvent(demoEvents[index % demoEvents.length]);
            index++;
        }, 3500);
    },

    stopDemoMode: () => {
        if (demoInterval) {
            clearInterval(demoInterval);
            demoInterval = null;
        }
        set({ isDemoMode: false });
    },
}));