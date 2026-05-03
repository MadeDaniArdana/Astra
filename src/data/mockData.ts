// ═══════════════════════════════════════════════════════
//  MOCK DATA — RuangWarisan
//  Semua data budaya Indonesia untuk development
// ═══════════════════════════════════════════════════════

export type ExtinctionStatus = 'aman' | 'rentan' | 'kritis' | 'punah';
export type Category = 'bahasa' | 'kriya' | 'musik' | 'ritual' | 'tari' | 'kuliner';

export interface CulturalAsset {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  description: string;
  region: string;
  province: string;
  regionCoords: { lat: number; lng: number };
  statusExtinction: ExtinctionStatus;
  coverImage: string;
  tags: string[];
  mediaCount: { image: number; audio: number; video: number };
  contributors: number;
  views: number;
  createdAt: string;
  featured?: boolean;
}

export interface MediaItem {
  id: string;
  assetId: string;
  type: 'image' | 'audio' | 'video';
  url: string;
  caption: string;
  duration?: string;
}

export interface ContributorProfile {
  id: string;
  username: string;
  avatarInitials: string;
  avatarColor: string;
  bio: string;
  points: number;
  badges: string[];
  contributions: number;
}

// ─── Cultural Assets ─────────────────────────────────────
export const culturalAssets: CulturalAsset[] = [
  {
    id: 'wayang-kulit-jawa',
    title: 'Wayang Kulit',
    subtitle: 'Singularitas Bayangan',
    category: 'kriya',
    description:
      'Seni pertunjukan bayangan yang berusia lebih dari seribu tahun. Dalang menghidupkan tokoh-tokoh epik Mahabharata dan Ramayana melalui kulit kerbau yang diukir dengan presisi tak tertandingi. Setiap gerakan menyimpan filsafat Jawa yang dalam.',
    region: 'Jawa Tengah',
    province: 'Jawa Tengah',
    regionCoords: { lat: -7.150975, lng: 110.140259 },
    statusExtinction: 'rentan',
    coverImage: '/images/wayang.jpg',
    tags: ['UNESCO', 'Pertunjukan', 'Filosofi', 'Kulit'],
    mediaCount: { image: 48, audio: 12, video: 6 },
    contributors: 234,
    views: 18420,
    createdAt: '2024-01-15',
    featured: true,
  },
  {
    id: 'batik-pedalaman',
    title: 'Batik Pedalaman',
    subtitle: 'Kode Visual Nusantara',
    category: 'kriya',
    description:
      'Batik bukan sekadar kain — ia adalah manuskrip visual yang menyimpan kosmologi Jawa. Setiap motif — Parang, Kawung, Sido Mukti — membawa pesan tentang alam semesta, kekuasaan, dan doa.',
    region: 'Solo, Yogyakarta',
    province: 'Jawa Tengah',
    regionCoords: { lat: -7.5755, lng: 110.8243 },
    statusExtinction: 'rentan',
    coverImage: '/images/batik.jpg',
    tags: ['UNESCO', 'Tenun', 'Malam', 'Motif'],
    mediaCount: { image: 92, audio: 4, video: 8 },
    contributors: 412,
    views: 32100,
    createdAt: '2024-02-20',
    featured: true,
  },
  {
    id: 'gamelan-jawa',
    title: 'Gamelan Jawa',
    subtitle: 'Frekuensi Kosmik Nusantara',
    category: 'musik',
    description:
      'Orkestra perkusi yang terdiri dari instrumen perunggu, kayu, dan kulit. Nadanya bukan sekadar bunyi — ia adalah getaran yang menghubungkan manusia dengan alam dan leluhur. Sistem tangga nada Slendro dan Pelog adalah teknologi akustik tertua di dunia.',
    region: 'Jawa',
    province: 'Jawa Tengah',
    regionCoords: { lat: -7.7956, lng: 110.3695 },
    statusExtinction: 'rentan',
    coverImage: '/images/gamelan.jpg',
    tags: ['UNESCO', 'Perunggu', 'Slendro', 'Pelog'],
    mediaCount: { image: 35, audio: 28, video: 10 },
    contributors: 189,
    views: 24500,
    createdAt: '2024-03-10',
  },
  {
    id: 'bahasa-using',
    title: 'Bahasa Using',
    subtitle: 'Dialek Banyuwangi yang Bertahan',
    category: 'bahasa',
    description:
      'Bahasa Using adalah dialek Jawa Kuno yang masih lestari di Banyuwangi. Diperkirakan hanya sekitar 300.000 orang yang masih fasih berbicara Using sebagai bahasa ibu. Setiap kata menyimpan etimologi yang terhubung langsung ke era Majapahit.',
    region: 'Banyuwangi',
    province: 'Jawa Timur',
    regionCoords: { lat: -8.2192, lng: 114.3691 },
    statusExtinction: 'kritis',
    coverImage: '/images/using.jpg',
    tags: ['Dialek', 'Majapahit', 'Jawa Kuno', 'Lisan'],
    mediaCount: { image: 12, audio: 45, video: 3 },
    contributors: 67,
    views: 8900,
    createdAt: '2024-04-05',
  },
  {
    id: 'tenun-ikat-flores',
    title: 'Tenun Ikat Flores',
    subtitle: 'Geometri Kosmologi Ende-Lio',
    category: 'kriya',
    description:
      'Kain tenun ikat dari Flores bukan sekadar pakaian — ia adalah peta kosmologi suku Ende-Lio. Motif burung enggang, manusia bersenjata, dan pohon hayat ditenun dengan benang alam yang diwarnai tumbuhan hutan.',
    region: 'Flores',
    province: 'Nusa Tenggara Timur',
    regionCoords: { lat: -8.6573, lng: 121.0794 },
    statusExtinction: 'kritis',
    coverImage: '/images/tenun-flores.jpg',
    tags: ['Tenun', 'NTT', 'Kosmologi', 'Alam'],
    mediaCount: { image: 28, audio: 5, video: 4 },
    contributors: 89,
    views: 12300,
    createdAt: '2024-05-18',
  },
  {
    id: 'tari-kecak',
    title: 'Tari Kecak',
    subtitle: 'Orkestra Manusia Bali',
    category: 'tari',
    description:
      'Kecak adalah tari ritual yang menggunakan suara manusia sebagai orkestra. Puluhan penari laki-laki meneriakkan "cak" secara ritmis, menciptakan pola polifonik yang menakjubkan sambil menceritakan epos Ramayana.',
    region: 'Bali',
    province: 'Bali',
    regionCoords: { lat: -8.4095, lng: 115.1889 },
    statusExtinction: 'aman',
    coverImage: '/images/kecak.jpg',
    tags: ['Bali', 'Ritual', 'Ramayana', 'Suara'],
    mediaCount: { image: 56, audio: 18, video: 14 },
    contributors: 523,
    views: 45600,
    createdAt: '2024-01-30',
  },
  {
    id: 'marapu-sumba',
    title: 'Ritual Marapu',
    subtitle: 'Kepercayaan Animisme Sumba',
    category: 'ritual',
    description:
      'Marapu adalah sistem kepercayaan asli masyarakat Sumba yang memuliakan arwah leluhur. Ritual ini melibatkan penyembelihan kuda dan kerbau dalam upacara kematian yang disebut "Woleka" — sebuah perjalanan jiwa yang berlangsung berhari-hari.',
    region: 'Sumba',
    province: 'Nusa Tenggara Timur',
    regionCoords: { lat: -9.6554, lng: 120.2641 },
    statusExtinction: 'kritis',
    coverImage: '/images/marapu.jpg',
    tags: ['Animisme', 'Sumba', 'Leluhur', 'Ritual'],
    mediaCount: { image: 19, audio: 8, video: 2 },
    contributors: 34,
    views: 6700,
    createdAt: '2024-06-22',
  },
  {
    id: 'kolintang-minahasa',
    title: 'Kolintang Minahasa',
    subtitle: 'Xylofon Perunggu dari Sulawesi',
    category: 'musik',
    description:
      'Kolintang adalah alat musik perkusi melodis dari kayu ringan khas Minahasa. Namanya berasal dari kata kerja "tong" (nada rendah), "ting" (nada tinggi), dan "tang" (nada tengah). Kini terancam punah seiring modernisasi.',
    region: 'Minahasa',
    province: 'Sulawesi Utara',
    regionCoords: { lat: 1.4748, lng: 124.8421 },
    statusExtinction: 'rentan',
    coverImage: '/images/kolintang.jpg',
    tags: ['Kayu', 'Perkusi', 'Minahasa', 'Sulawesi'],
    mediaCount: { image: 22, audio: 34, video: 5 },
    contributors: 78,
    views: 9800,
    createdAt: '2024-07-14',
  },
  {
    id: 'ondel-ondel-betawi',
    title: 'Ondel-Ondel',
    subtitle: 'Roh Penjaga Betawi',
    category: 'ritual',
    description:
      'Ondel-ondel adalah boneka raksasa setinggi 2,5 meter yang berasal dari tradisi Betawi. Awalnya digunakan untuk mengusir roh jahat dalam ritual tolak bala. Kini maknanya terancam hilang seiring komersialisasi.',
    region: 'Jakarta',
    province: 'DKI Jakarta',
    regionCoords: { lat: -6.2088, lng: 106.8456 },
    statusExtinction: 'rentan',
    coverImage: '/images/ondel-ondel.jpg',
    tags: ['Betawi', 'Jakarta', 'Ritual', 'Boneka'],
    mediaCount: { image: 41, audio: 7, video: 9 },
    contributors: 167,
    views: 21400,
    createdAt: '2024-08-03',
  },
  {
    id: 'bahasa-tobati',
    title: 'Bahasa Tobati',
    subtitle: 'Bahasa yang Hampir Hilang dari Papua',
    category: 'bahasa',
    description:
      'Bahasa Tobati hanya dituturkan oleh sekitar 35 orang tua di Teluk Yos Sudarso, Papua. Bahasa ini memiliki sistem fonologi yang unik dan tidak memiliki hubungan dengan bahasa mana pun di dunia. Setiap kata yang hilang adalah kepunahan pengetahuan.',
    region: 'Jayapura',
    province: 'Papua',
    regionCoords: { lat: -2.5916, lng: 140.6690 },
    statusExtinction: 'kritis',
    coverImage: '/images/tobati.jpg',
    tags: ['Papua', 'Isolat Bahasa', 'Kepunahan', 'Lisan'],
    mediaCount: { image: 8, audio: 62, video: 1 },
    contributors: 12,
    views: 4300,
    createdAt: '2024-09-11',
  },
  {
    id: 'reog-ponorogo',
    title: 'Reog Ponorogo',
    subtitle: 'Topeng Singa Merak Nusantara',
    category: 'tari',
    description:
      'Reog Ponorogo adalah seni pertunjukan yang menampilkan topeng singa (Barongan) dengan hiasan bulu merak raksasa seberat 50 kg, ditopang hanya menggunakan gigi sang penari. Ini adalah demonstrasi kekuatan fisik dan spiritual yang luar biasa.',
    region: 'Ponorogo',
    province: 'Jawa Timur',
    regionCoords: { lat: -7.8644, lng: 111.4636 },
    statusExtinction: 'rentan',
    coverImage: '/images/reog.jpg',
    tags: ['Topeng', 'Merak', 'Kekuatan', 'Jawa Timur'],
    mediaCount: { image: 63, audio: 15, video: 11 },
    contributors: 298,
    views: 38900,
    createdAt: '2024-10-07',
  },
  {
    id: 'saman-gayo',
    title: 'Tari Saman',
    subtitle: 'Seribu Tangan Gayo Lues',
    category: 'tari',
    description:
      'Tari Saman dari Gayo Lues, Aceh, dikenal sebagai "Tarian Seribu Tangan". Puluhan penari bergerak sinkron dengan kecepatan luar biasa — tepuk tangan, dada, dan lantai — menciptakan visual yang hipnotis. UNESCO menetapkannya sebagai warisan tak benda.',
    region: 'Gayo Lues',
    province: 'Aceh',
    regionCoords: { lat: 3.9411, lng: 97.1534 },
    statusExtinction: 'aman',
    coverImage: '/images/saman.jpg',
    tags: ['UNESCO', 'Aceh', 'Gayo', 'Sinkron'],
    mediaCount: { image: 44, audio: 9, video: 16 },
    contributors: 445,
    views: 41200,
    createdAt: '2024-11-19',
  },
];

// ─── Featured Scrollytelling Content ─────────────────────
export const featuredNarrative = {
  ID: {
    id: 'wayang-kulit-jawa',
    title: 'Singularitas Wayang',
    subtitle: 'Ketika Bayangan Berbicara Lebih Keras dari Kata-Kata',
    chapters: [
      {
        id: 'ch1',
        title: 'Lahir dari Kegelapan',
        body: 'Ribuan tahun yang lalu, di lembah subur Jawa, para dalang pertama menemukan rahasia: bahwa bayangan bisa mengungkapkan kebenaran yang tidak bisa dikatakan oleh cahaya. Selembar kulit kerbau yang diukir dengan teliti menjadi jendela menuju dunia lain.',
        highlight: '1000+ tahun',
        accent: 'Usia Wayang Kulit',
      },
      {
        id: 'ch2',
        title: 'Bahasa Universal',
        body: 'UNESCO mengakui Wayang Kulit pada 2003 sebagai "Masterpiece of Oral and Intangible Heritage of Humanity". Namun pengakuan dunia tidak cukup untuk membendung erosi generasi. Jumlah dalang muda terus menurun setiap dekade.',
        highlight: '2003',
        accent: 'Pengakuan UNESCO',
      },
      {
        id: 'ch3',
        title: 'Darurat Pelestarian',
        body: 'Diperkirakan kurang dari 3.000 dalang aktif tersisa di Indonesia. Setiap dalang yang wafat membawa serta ribuan jam repertoar, ratusan karakter, dan filosofi mendalam tentang keseimbangan alam dan manusia.',
        highlight: '<3.000',
        accent: 'Dalang Aktif Tersisa',
      },
    ],
  },
  EN: {
    id: 'wayang-kulit-jawa',
    title: 'Singularity of Wayang',
    subtitle: 'When Shadows Speak Louder Than Words',
    chapters: [
      {
        id: 'ch1',
        title: 'Born from Darkness',
        body: 'Thousands of years ago, in the fertile valleys of Java, the first dalangs discovered a secret: that shadows can reveal truths unspoken by light. A piece of meticulously carved buffalo hide became a window to another world.',
        highlight: '1000+ years',
        accent: 'Age of Wayang Kulit',
      },
      {
        id: 'ch2',
        title: 'Universal Language',
        body: 'UNESCO recognized Wayang Kulit in 2003 as a "Masterpiece of the Oral and Intangible Heritage of Humanity". Yet global recognition is not enough to stem generational erosion. The number of young dalangs continues to decline every decade.',
        highlight: '2003',
        accent: 'UNESCO Recognition',
      },
      {
        id: 'ch3',
        title: 'Preservation Emergency',
        body: 'It is estimated that fewer than 3,000 active dalangs remain in Indonesia. Every passing dalang takes with them thousands of hours of repertoire, hundreds of characters, and profound philosophies on the balance of nature and humanity.',
        highlight: '<3,000',
        accent: 'Remaining Active Dalangs',
      },
    ],
  }
};

// ─── Stats ───────────────────────────────────────────────
export const platformStats = {
  ID: [
    { label: 'Artefak Terdigitasi', value: 10_247, suffix: '+', prefix: '' },
    { label: 'Provinsi Terwakili', value: 34, suffix: '', prefix: '' },
    { label: 'Bahasa Daerah', value: 718, suffix: '+', prefix: '' },
    { label: 'Kontributor Aktif', value: 2_841, suffix: '+', prefix: '' },
  ],
  EN: [
    { label: 'Digitized Artifacts', value: 10_247, suffix: '+', prefix: '' },
    { label: 'Provinces Represented', value: 34, suffix: '', prefix: '' },
    { label: 'Local Languages', value: 718, suffix: '+', prefix: '' },
    { label: 'Active Contributors', value: 2_841, suffix: '+', prefix: '' },
  ]
};

// ─── Audio Samples ───────────────────────────────────────
export const audioSamples = [
  {
    id: 'gamelan-01',
    title: 'Lancaran Manyar Sewu',
    artist: 'Gamelan Keraton Yogyakarta',
    duration: '4:32',
    category: 'Gamelan Jawa',
    waveHeights: [3, 6, 9, 12, 8, 5, 10, 14, 7, 4, 11, 9, 6, 13, 8, 5],
  },
  {
    id: 'saman-01',
    title: 'Nyanyian Pembukaan Saman',
    artist: 'Komunitas Gayo Lues',
    duration: '2:18',
    category: 'Vokal Ritual',
    waveHeights: [5, 10, 7, 13, 9, 4, 11, 8, 6, 14, 7, 3, 12, 9, 5, 8],
  },
  {
    id: 'kolintang-01',
    title: 'O Ina Ni Keke',
    artist: 'Ensemble Kolintang Minahasa',
    duration: '3:45',
    category: 'Kolintang',
    waveHeights: [8, 4, 11, 6, 14, 9, 5, 12, 7, 3, 10, 8, 6, 13, 4, 9],
  },
];

// ─── Curated Indices / Tags ───────────────────────────────
export const curatedIndices = [
  { label: 'Majapahit', count: 48 },
  { label: 'Sriwijaya', count: 31 },
  { label: 'Batik Textiles', count: 92 },
  { label: 'Keris Forging', count: 27 },
  { label: 'Temple Architecture', count: 63 },
  { label: 'Oral Literature', count: 184 },
  { label: 'Ritual Dance', count: 71 },
  { label: 'Bark Manuscript', count: 19 },
];

// ─── Contribution Mock Badges ─────────────────────────────
export const availableBadges = [
  { id: 'pioneer', label: 'Perintis', description: 'Kontribusi pertama', emoji: '🌱' },
  { id: 'chronicler', label: 'Penjelajah', description: '10 kontribusi disetujui', emoji: '📜' },
  { id: 'guardian', label: 'Penjaga', description: '50 kontribusi disetujui', emoji: '🛡️' },
  { id: 'sage', label: 'Empu', description: '100+ kontribusi', emoji: '⚡' },
  { id: 'linguist', label: 'Bahasawan', description: 'Kontribusi bahasa daerah', emoji: '🗣️' },
  { id: 'archivist', label: 'Arsiparis', description: 'Upload 20+ media', emoji: '📷' },
];

// ─── Map Regions with Cultural Hotspots ──────────────────
export const mapRegions = [
  {
    id: 'aceh',
    name: 'Aceh',
    assetCount: 24,
    coords: { x: 85, y: 145 },
    highlight: 'Tari Saman, Rencong',
    status: 'aman' as ExtinctionStatus,
  },
  {
    id: 'sumatra-utara',
    name: 'Sumatera Utara',
    assetCount: 38,
    coords: { x: 115, y: 168 },
    highlight: 'Tor-Tor, Ulos',
    status: 'rentan' as ExtinctionStatus,
  },
  {
    id: 'jawa-tengah',
    name: 'Jawa Tengah',
    assetCount: 187,
    coords: { x: 248, y: 248 },
    highlight: 'Wayang, Batik, Gamelan',
    status: 'rentan' as ExtinctionStatus,
  },
  {
    id: 'bali',
    name: 'Bali',
    assetCount: 112,
    coords: { x: 310, y: 258 },
    highlight: 'Kecak, Barong, Legong',
    status: 'aman' as ExtinctionStatus,
  },
  {
    id: 'ntt',
    name: 'NTT',
    assetCount: 89,
    coords: { x: 355, y: 278 },
    highlight: 'Tenun Ikat, Marapu',
    status: 'kritis' as ExtinctionStatus,
  },
  {
    id: 'sulawesi-utara',
    name: 'Sulawesi Utara',
    assetCount: 45,
    coords: { x: 380, y: 195 },
    highlight: 'Kolintang, Cakalele',
    status: 'rentan' as ExtinctionStatus,
  },
  {
    id: 'papua',
    name: 'Papua',
    assetCount: 67,
    coords: { x: 480, y: 230 },
    highlight: 'Tifa, Koteka, Bahasa Tobati',
    status: 'kritis' as ExtinctionStatus,
  },
  {
    id: 'kalimantan',
    name: 'Kalimantan',
    assetCount: 73,
    coords: { x: 310, y: 195 },
    highlight: 'Mandau, Hudoq',
    status: 'rentan' as ExtinctionStatus,
  },
];
