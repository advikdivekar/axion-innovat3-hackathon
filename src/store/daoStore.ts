import { create } from 'zustand';
import { ModuleView, MOCK_PROPOSALS, MOCK_TREASURY, MOCK_SYSTEM_STATS, Proposal, TreasuryAsset } from '@/lib/mockData';

interface DAOState {
  // Navigation State
  activeModule: ModuleView;
  setActiveModule: (module: ModuleView) => void;
  
  // Data State
  proposals: Proposal[];
  treasury: TreasuryAsset[];
  systemStats: typeof MOCK_SYSTEM_STATS;
  
  // Interaction State
  selectedProposalId: string | null;
  setSelectedProposal: (id: string | null) => void;
  
  // Actions
  refreshData: () => Promise<void>;
  isLoading: boolean;
}

export const useDAOStore = create<DAOState>((set) => ({
  activeModule: 'overview',
  setActiveModule: (module) => set({ activeModule: module, selectedProposalId: null }),
  
  proposals: MOCK_PROPOSALS,
  treasury: MOCK_TREASURY,
  systemStats: MOCK_SYSTEM_STATS,
  
  selectedProposalId: null,
  setSelectedProposal: (id) => set({ selectedProposalId: id }),
  
  isLoading: false,
  refreshData: async () => {
    // Simulate network delay for "Crazy Frontend" loading animations
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 800));
    set({ isLoading: false });
  }
}));
