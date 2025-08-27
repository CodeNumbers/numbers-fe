import { create } from 'zustand';

interface SidebarState {
  selectedMenuLabel?: string;
  selectedMenuItem?: number;
  setSelectedMenuLabel: (selectedMenuLabel: string) => void;
  setSelectedMenuItem: (selectedMenuItem: number | undefined) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  selectedMenuLabel: undefined,
  selectedMenuItem: undefined,
  setSelectedMenuLabel: (selectedMenuLabel) => set({ selectedMenuLabel }),
  setSelectedMenuItem: (selectedMenuItem) => set({ selectedMenuItem }),
}));
