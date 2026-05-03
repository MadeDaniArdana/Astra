import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Koordinat akurat berdasarkan asal warisan
const coordFixes = [
  // Wayang Kulit → Solo (pusat tradisi wayang)
  { id: 'wayang-kulit-jawa', lat: -7.5560, lng: 110.8316 },
  // Batik → Kota Solo
  { id: 'batik-pedalaman', lat: -7.5755, lng: 110.8243 },
  // Gamelan → Yogyakarta (Keraton)
  { id: 'gamelan-jawa', lat: -7.8013, lng: 110.3644 },
  // Tari Saman → Takengon, Aceh Tengah (UTARA khatulistiwa!)
  { id: 'tari-saman', lat: 4.6290, lng: 96.8500 },
  // Bahasa Enggano → Pulau Enggano, Bengkulu
  { id: 'bahasa-enggano', lat: -5.3944, lng: 102.2711 },
  // Pasola → Waikabubak, Sumba Barat, NTT
  { id: 'ritual-pasola', lat: -9.6609, lng: 119.4207 },
  // Angklung → Bandung, Jawa Barat
  { id: 'angklung-sunda', lat: -6.9175, lng: 107.6191 },
  // Tari Kecak → Uluwatu, Bali
  { id: 'tari-kecak', lat: -8.8296, lng: 115.0852 },
  // Keris → Sukoharjo (pusat pandai besi keris)
  { id: 'keris-indonesia', lat: -7.6816, lng: 110.8393 },
  // Noken → Wamena, Pegunungan Papua
  { id: 'noken-papua', lat: -3.9939, lng: 138.9494 },
  // Rendang → Bukittinggi, Sumatra Barat
  { id: 'rendang-minang', lat: -0.3031, lng: 100.3692 },
  // Pencak Silat → Jakarta (IPSI pusat)
  { id: 'pencak-silat', lat: -6.2088, lng: 106.8456 },
  // Sasando → Ba'a, Pulau Rote
  { id: 'sasando-rote', lat: -10.7419, lng: 123.0720 },
  // Reog → Ponorogo, Jawa Timur
  { id: 'reog-ponorogo', lat: -7.8674, lng: 111.4633 },
  // Pinisi → Tanjung Bira, Bulukumba
  { id: 'kapal-pinisi', lat: -5.5773, lng: 120.4483 },
  // Tenun Ikat NTT → Ende, Flores
  { id: 'tenun-ikat-ntt', lat: -8.8432, lng: 121.6629 },
  // Tari Pendet → Gianyar, Bali
  { id: 'tari-pendet', lat: -8.5368, lng: 115.3640 },
  // Tongkonan → Rantepao, Toraja Utara
  { id: 'rumah-adat-toraja', lat: -2.9643, lng: 119.8989 },
  // Bahasa Tobati → Jayapura
  { id: 'bahasa-tobati', lat: -2.5916, lng: 140.6690 },
  // Ngaben → Ubud, Bali (pusat tradisi ngaben agung)
  { id: 'upacara-ngaben', lat: -8.5069, lng: 115.2625 },
  // Ukiran Asmat → Agats, Papua Selatan
  { id: 'ukiran-asmat', lat: -5.5444, lng: 138.1186 },
  // Tor-Tor → Rantau Prapat / Samosir, Sumatera Utara
  { id: 'tari-tor-tor', lat: 2.6033, lng: 98.9009 },
  // Jamu → Sukoharjo (Ny. Meneer, pusat jamu Jawa)
  { id: 'jamu-tradisional', lat: -7.4272, lng: 110.8390 },
  // Tari Piring → Solok, Sumatra Barat
  { id: 'tari-piring', lat: -0.7893, lng: 100.6503 },
  // Ondel-Ondel → Jakarta Kota (Betawi)
  { id: 'ondel-ondel', lat: -6.1341, lng: 106.8133 },
];

async function patchCoords() {
  console.log('Memperbarui koordinat warisan budaya...\n');
  let success = 0;
  let failed = 0;

  for (const item of coordFixes) {
    const { error } = await supabase
      .from('cultural_assets')
      .update({ lat: item.lat, lng: item.lng })
      .eq('id', item.id);

    if (error) {
      console.error(`❌ GAGAL [${item.id}]:`, error.message);
      failed++;
    } else {
      console.log(`✅ OK   [${item.id}] → (${item.lat}, ${item.lng})`);
      success++;
    }
  }

  console.log(`\nSelesai: ${success} berhasil, ${failed} gagal.`);
}

patchCoords();
