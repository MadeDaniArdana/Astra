import { create } from 'zustand';

interface AudioState {
  currentTrackId: string | null;
  isPlaying: boolean;
  volume: number;
  setTrack: (id: string) => void;
  togglePlay: () => void;
  setVolume: (v: number) => void;
  stop: () => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  currentTrackId: null,
  isPlaying: false,
  volume: 0.8,
  setTrack: (id) => set({ currentTrackId: id, isPlaying: true }),
  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
  setVolume: (v) => set({ volume: v }),
  stop: () => set({ isPlaying: false, currentTrackId: null }),
}));
