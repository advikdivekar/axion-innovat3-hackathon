import { create } from "zustand";

interface DAOState {
  treasury: number;
  contributors: number;
  proposals: number;
  setTreasury: (value: number) => void;
}

export const useDAOStore = create<DAOState>((set) => ({
  treasury: 1250000,
  contributors: 142,
  proposals: 23,
  setTreasury: (value) => set({ treasury: value }),
}));
