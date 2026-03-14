// src/store/daoStore.ts
import { create } from 'zustand';
import {
    Proposal, TreasuryState, Contributor, Threat, DAOEvent, DAOMeta
} from '@/lib/types';
import {
    MOCK_PROPOSALS, MOCK_TREASURY, MOCK_CONTRIBUTORS, MOCK_THREATS
} from '@/lib/mockData';
import { DAO_CONFIG } from '@/lib/constants';

interface DAOState {
    // Data State
    daoMeta: DAOMeta;
    proposals: Proposal[];
    treasury: TreasuryState | null;
    contributors: Contributor[];
    threats: Threat[];

    // Loading & Error State
    isLoading: boolean;
    isHydrated: boolean; // Tells Dev A when initial data is ready
    error: string | null;

    // Actions (Async Fetchers)
    fetchProposals: () => Promise<void>;
    fetchTreasury: () => Promise<void>;
    fetchContributors: () => Promise<void>;
    fetchThreats: () => Promise<void>;
    refreshAll: () => Promise<void>;

    // Real-time Event Reducer
    updateFromEvent: (event: DAOEvent) => void;
}

export const useDAOStore = create<DAOState>()((set, get) => ({
    // ═══ INITIAL STATE ═══
    daoMeta: {
        name: DAO_CONFIG.name,
        symbol: DAO_CONFIG.symbol,
        chain: DAO_CONFIG.chain,
        governorAddress: DAO_CONFIG.governor,
        tokenAddress: DAO_CONFIG.token,
        treasuryAddress: DAO_CONFIG.treasury,
        timelockAddress: DAO_CONFIG.timelock,
        snapshotSpace: DAO_CONFIG.snapshotSpace,
        healthScore: 85, // Will be updated by analytics engine
        riskLevel: 'normal',
    },
    proposals: [],
    treasury: null,
    contributors: [],
    threats: [],
    isLoading: false,
    isHydrated: false,
    error: null,

    // ═══ ASYNC FETCHERS ═══
    // Note: For hackathon speed, these currently load mock data with a slight 
    // delay to simulate network. When you build the /api routes, simply swap 
    // the mock assignment with a `fetch('/api/...')` call.

    fetchProposals: async () => {
        try {
            // Future: const res = await fetch('/api/blockchain/proposals');
            // Future: const data = await res.json();
            const data = MOCK_PROPOSALS;
            set({ proposals: data, error: null });
        } catch (err) {
            set({ error: 'Failed to fetch proposals' });
        }
    },

    fetchTreasury: async () => {
        try {
            const data = MOCK_TREASURY;
            set({ treasury: data, error: null });
        } catch (err) {
            set({ error: 'Failed to fetch treasury' });
        }
    },

    fetchContributors: async () => {
        try {
            const data = MOCK_CONTRIBUTORS;
            set({ contributors: data, error: null });
        } catch (err) {
            set({ error: 'Failed to fetch contributors' });
        }
    },

    fetchThreats: async () => {
        try {
            const data = MOCK_THREATS;
            set({ threats: data, error: null });
        } catch (err) {
            set({ error: 'Failed to fetch threats' });
        }
    },

    refreshAll: async () => {
        set({ isLoading: true, error: null });
        try {
            await Promise.all([
                get().fetchProposals(),
                get().fetchTreasury(),
                get().fetchContributors(),
                get().fetchThreats(),
            ]);
            set({ isHydrated: true });
        } catch (err) {
            set({ error: 'Failed to hydrate DAO state' });
        } finally {
            set({ isLoading: false });
        }
    },

    // ═══ REAL-TIME EVENT REDUCER ═══
    // This is critical for 60FPS. Instead of refetching all data when an event 
    // occurs, we immutably patch the state in real-time.
    updateFromEvent: (event: DAOEvent) => {
        const state = get();

        switch (event.type) {
            case 'vote_cast': {
                // Optimistically update the vote count on the specific proposal
                if (!event.targetNodeId) return;
                const propId = event.targetNodeId.replace('proposal-', '');
                const weight = (event.data.power as number) || 0;

                set({
                    proposals: state.proposals.map(p =>
                        p.id === propId
                            ? {
                                ...p,
                                forVotes: p.forVotes + weight, // Simplified assuming 'for' vote for now
                                totalVoters: p.totalVoters + 1
                            }
                            : p
                    )
                });
                break;
            }

            case 'transfer_in':
            case 'transfer_out': {
                // Optimistically update treasury totals
                if (!state.treasury) return;
                const amount = (event.data.amount as number) || 0;
                const isOutflow = event.type === 'transfer_out';

                set({
                    treasury: {
                        ...state.treasury,
                        totalValueUSD: state.treasury.totalValueUSD + (isOutflow ? -amount : amount),
                        inflow24h: state.treasury.inflow24h + (isOutflow ? 0 : amount),
                        outflow24h: state.treasury.outflow24h + (isOutflow ? amount : 0),
                    }
                });
                break;
            }

            case 'threat_detected': {
                // Add new threat to the top of the list
                const newThreat = event.data as unknown as Threat;
                if (!newThreat.id) return;

                set({
                    threats: [newThreat, ...state.threats],
                    daoMeta: {
                        ...state.daoMeta,
                        healthScore: Math.max(0, state.daoMeta.healthScore - 5), // Penalize health
                        riskLevel: newThreat.severity === 'critical' ? 'critical' : state.daoMeta.riskLevel
                    }
                });
                break;
            }

            // Add other event handlers as needed based on eventTypes.ts
            default:
                break;
        }
    }
}));