// src/store/uiStore.ts
import { create } from 'zustand';
import { MODULES } from '@/lib/constants';

type ModuleId = keyof typeof MODULES;

interface UIState {
  activeModule: ModuleId;
  setActiveModule: (module: ModuleId) => void;

  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;

  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;

  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  setCameraView: (position: [number, number, number], target: [number, number, number]) => void;

  commandBarOpen: boolean;
  setCommandBarOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeModule: 'home',
  setActiveModule: (module) => {
    const mod = MODULES[module];
    set({
      activeModule: module,
      cameraPosition: mod?.cameraPosition ?? [0, 0, 25],
      cameraTarget: mod?.cameraTarget ?? [0, 0, 0],
    });
  },

  sidebarCollapsed: false,
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  selectedNodeId: null,
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),

  cameraPosition: [0, 0, 25],
  cameraTarget: [0, 0, 0],
  setCameraView: (position, target) => set({ cameraPosition: position, cameraTarget: target }),

  commandBarOpen: false,
  setCommandBarOpen: (open) => set({ commandBarOpen: open }),
}));
