import { create } from 'zustand';

interface SidebarState {
  selectedMenuLabel?: string;
  setSelectedMenuLabel: (selectedMenuLabel: string) => void;
  selectedMenuItem?: number;
  setSelectedMenuItem: (selectedMenuItem: number | undefined) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  selectedMenuLabel: undefined,
  setSelectedMenuLabel: (selectedMenuLabel) => set({ selectedMenuLabel }),
  selectedMenuItem: undefined,
  setSelectedMenuItem: (selectedMenuItem) => set({ selectedMenuItem }),
}));
