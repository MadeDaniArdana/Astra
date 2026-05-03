import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { CulturalAsset } from '@/data/mockData';

interface DataState {
  assets: CulturalAsset[];
  loading: boolean;
  error: string | null;
  fetchAssets: () => Promise<void>;
}

export const useDataStore = create<DataState>((set, get) => ({
  assets: [],
  loading: true,
  error: null,
  fetchAssets: async () => {
    
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('cultural_assets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform DB snake_case back to camelCase for the frontend
      const formatted = (data || []).map(row => ({
        id: row.id,
        title: row.title,
        subtitle: row.subtitle,
        category: row.category,
        description: row.description,
        region: row.region,
        province: row.province,
        regionCoords: { lat: row.lat, lng: row.lng },
        statusExtinction: row.status_extinction,
        coverImage: row.cover_image,
        tags: row.tags,
        mediaCount: { image: row.media_count_image, audio: row.media_count_audio, video: row.media_count_video },
        contributors: row.contributors,
        views: row.views,
        createdAt: row.created_at,
        featured: row.featured,
      }));

      set({ assets: formatted as CulturalAsset[], loading: false, error: null });
    } catch (err: any) {
      console.error("Error fetching assets:", err);
      set({ error: err.message, loading: false });
    }
  }
}));
