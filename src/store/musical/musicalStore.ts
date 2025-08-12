import { create } from 'zustand';
import { type GetMusicalListResponseData } from '@/hooks/queries/musical/useGetMusicalList';

interface MusicalState {
  musicalList: GetMusicalListResponseData[];
  setMusicalList: (musicalList: GetMusicalListResponseData[]) => void;
}

export const useMusicalStore = create<MusicalState>((set) => ({
  musicalList: [],
  setMusicalList: (musicalList) => set({ musicalList }),
}));
