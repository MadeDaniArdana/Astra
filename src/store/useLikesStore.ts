import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LikesState {
  likedIds: string[];
  toggleLike: (id: string) => void;
  isLiked: (id: string) => boolean;
}

export const useLikesStore = create<LikesState>()(
  persist(
    (set, get) => ({
      likedIds: [],
      toggleLike: (id: string) =>
        set((state) => ({
          likedIds: state.likedIds.includes(id)
            ? state.likedIds.filter((x) => x !== id)
            : [...state.likedIds, id],
        })),
      isLiked: (id: string) => get().likedIds.includes(id),
    }),
    {
      name: 'ruangwarisan-likes',
    }
  )
);
