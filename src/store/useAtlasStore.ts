import { create } from 'zustand';
import type { Category, ExtinctionStatus } from '@/data/mockData';

interface AtlasState {
  selectedCategory: Category | 'all';
  selectedStatus: ExtinctionStatus | 'all';
  selectedRegion: string | null;
  searchQuery: string;
  setCategory: (cat: Category | 'all') => void;
  setStatus: (status: ExtinctionStatus | 'all') => void;
  setRegion: (region: string | null) => void;
  setSearch: (q: string) => void;
  resetFilters: () => void;
}

export const useAtlasStore = create<AtlasState>((set) => ({
  selectedCategory: 'all',
  selectedStatus: 'all',
  selectedRegion: null,
  searchQuery: '',
  setCategory: (cat) => set({ selectedCategory: cat }),
  setStatus: (status) => set({ selectedStatus: status }),
  setRegion: (region) => set({ selectedRegion: region }),
  setSearch: (q) => set({ searchQuery: q }),
  resetFilters: () =>
    set({ selectedCategory: 'all', selectedStatus: 'all', selectedRegion: null, searchQuery: '' }),
}));
