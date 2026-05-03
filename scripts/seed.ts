import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { culturalAssets } from '../src/data/mockData';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log('Seeding Supabase Database...');

  // Hapus data lama (jika ada) agar tidak duplikat
  const { error: deleteError } = await supabase.from('cultural_assets').delete().neq('id', 'dummy');
  if (deleteError) {
    console.error('Error clearing old data:', deleteError);
  }

  // Format data agar sesuai dengan skema Supabase
  const formattedAssets = culturalAssets.map(asset => ({
    id: asset.id,
    title: asset.title,
    subtitle: asset.subtitle,
    category: asset.category,
    description: asset.description,
    region: asset.region,
    province: asset.province,
    lat: asset.regionCoords.lat,
    lng: asset.regionCoords.lng,
    status_extinction: asset.statusExtinction,
    cover_image: asset.coverImage,
    tags: asset.tags,
    media_count_image: asset.mediaCount.image,
    media_count_audio: asset.mediaCount.audio,
    media_count_video: asset.mediaCount.video,
    contributors: asset.contributors,
    views: asset.views,
    created_at: asset.createdAt ? new Date(asset.createdAt).toISOString() : new Date().toISOString(),
    featured: asset.featured || false
  }));

  const { data, error } = await supabase.from('cultural_assets').insert(formattedAssets);

  if (error) {
    console.error('Seeding failed:', error);
  } else {
    console.log(`Seeding successful! Uploaded ${formattedAssets.length} cultural assets.`);
  }
}

seed();
