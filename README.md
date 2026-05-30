# ASTRA — RuangWarisan

<div align="center">

**Platform Museum Digital Warisan Budaya Indonesia**

*Mendokumentasikan, melestarikan, dan mempopulerkan warisan budaya Indonesia yang hampir punah.*

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-2.x-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com)

</div>

---

## 📖 Tentang Project

**ASTRA** (RuangWarisan) adalah platform museum digital interaktif yang dibangun untuk mendokumentasikan dan melestarikan warisan budaya Indonesia yang hampir punah. Platform ini menjadi jembatan antara kekayaan budaya Nusantara dengan generasi digital — dari bahasa daerah yang terancam hilang hingga ritual leluhur yang perlahan terlupakan.

### Mengapa ASTRA?

Indonesia memiliki lebih dari **718 bahasa daerah**, ratusan tradisi lisan, dan ribuan artefak budaya tak benda. Banyak di antaranya berada di ambang kepunahan tanpa dokumentasi yang memadai. ASTRA hadir sebagai:

- 🗃️ **Arsip digital** yang dapat diakses oleh siapa saja
- 🗺️ **Peta geospasial** persebaran warisan budaya per wilayah
- 🎵 **Repositori multimedia** — gambar, audio, dan video budaya
- 🤝 **Platform kontribusi** komunitas untuk menambah dan memperkaya data

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| **Hero Interaktif** | Animasi GSAP bertahap dengan parallax scroll dan wayang floating |
| **Bento Grid Featured** | Tampilan artefak unggulan dalam layout grid premium |
| **Peta Atlas Interaktif** | Peta Indonesia zoomable dengan marker status kepunahan per aset |
| **Arsip Media** | Grid masonry dengan filter kategori, pencarian real-time, dan detail modal |
| **Audio Player** | Pemutar audio embedded dengan visualisasi waveform animasi |
| **Scrollytelling Narrative** | Narasi mendalam bergaya editorial dengan chapter-chapter |
| **Stats Counter** | Animasi penghitung angka saat masuk viewport |
| **Kontribusi Multi-step** | Form bertahap untuk menambah warisan budaya baru |
| **Bilingual (ID/EN)** | Toggle bahasa Indonesia / English di seluruh halaman |
| **Autentikasi** | Login & register via Supabase Auth |

---

## 🛠️ Tech Stack

### Core
| Teknologi | Versi | Peran |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.2.4 | Framework utama (App Router) |
| [React](https://react.dev) | 19.2.4 | UI library |
| [TypeScript](https://typescriptlang.org) | 5.x | Type safety |

### Styling & Animasi
| Teknologi | Versi | Peran |
|---|---|---|
| [TailwindCSS](https://tailwindcss.com) | 4.x | Utility-first CSS |
| [tw-animate-css](https://github.com/new-data-services/tw-animate-css) | 1.4.0 | Animasi Tailwind |
| [GSAP](https://gsap.com) | 3.15.0 | Animasi scroll & entrance |
| [@gsap/react](https://gsap.com/resources/React/) | 2.1.2 | GSAP hooks untuk React |

### Data & State
| Teknologi | Versi | Peran |
|---|---|---|
| [Zustand](https://zustand-demo.pmnd.rs) | 5.0.12 | Global state management |
| [Supabase](https://supabase.com) | 2.105.1 | Backend, Auth, Database |

### UI & Peta
| Teknologi | Versi | Peran |
|---|---|---|
| [react-simple-maps](https://www.react-simple-maps.io) | 3.0.0 | Peta interaktif Indonesia |
| [d3-geo](https://d3js.org/d3-geo) | 3.1.1 | Proyeksi geografi |
| [Lucide React](https://lucide.dev) | 1.14.0 | Icon library |
| [shadcn/ui](https://ui.shadcn.com) | 4.6.0 | Komponen UI dasar |

### Font
- **Playfair Display** — Google Fonts, untuk heading/judul (serif)
- **Lexend** — Google Fonts, untuk body text (sans-serif)
- **Courier New** — Sistem, untuk badge, label, metadata (monospace)

---

## 🗂️ Struktur Project

```
astra/
├── public/
│   ├── hero-bg.jpg          # Background hero section
│   ├── wayang-hero.png      # Silhouette wayang untuk hero
│   ├── logo.png             # Logo ASTRA
│   ├── indonesia.json       # GeoJSON peta Indonesia
│   └── images/              # Gambar artefak budaya
│
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Root layout (font, metadata, providers)
│   │   ├── page.tsx         # Homepage
│   │   ├── globals.css      # Global styles & design tokens
│   │   ├── Providers.tsx    # Context providers wrapper
│   │   ├── arsip/
│   │   │   ├── page.tsx     # Halaman arsip media (masonry grid)
│   │   │   └── [id]/        # Detail artefak
│   │   ├── atlas/
│   │   │   └── page.tsx     # Halaman peta interaktif
│   │   ├── kontribusi/
│   │   │   └── page.tsx     # Form kontribusi multi-step
│   │   ├── login/
│   │   │   └── page.tsx     # Halaman login
│   │   └── register/
│   │       └── page.tsx     # Halaman registrasi
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx   # Navigasi utama (transparent → glass)
│   │   │   └── Footer.tsx   # Footer dengan link & status
│   │   ├── audio/
│   │   │   └── AudioPlayer.tsx  # Pemutar audio + waveform
│   │   └── ui/              # Komponen UI reusable (shadcn)
│   │
│   ├── context/
│   │   └── LanguageContext.tsx  # Context untuk toggle ID/EN
│   │
│   ├── store/
│   │   ├── useAudioStore.ts     # State audio player global
│   │   ├── useAuthStore.ts      # State autentikasi user
│   │   ├── useAtlasStore.ts     # State filter peta atlas
│   │   ├── useDataStore.ts      # State data artefak dari Supabase
│   │   └── useLikesStore.ts     # State likes/bookmark artefak
│   │
│   ├── data/
│   │   └── mockData.ts      # Data mock + type definitions
│   │
│   └── lib/
│       └── supabase.ts      # Supabase client configuration
│
├── scripts/                 # Script utilitas
├── .env.local               # Environment variables (tidak di-commit)
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Memulai

### Prasyarat

Pastikan sudah terinstall:
- **Node.js** v18+ ([download](https://nodejs.org))
- **npm** v9+ (sudah termasuk dalam Node.js)
- Akun [Supabase](https://supabase.com) (gratis)

### 1. Clone Repository

```bash
git clone https://github.com/username/astra.git
cd astra
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Konfigurasi Environment Variables

Buat file `.env.local` di root project:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

> **Cara mendapatkan keys:**
> 1. Buka [supabase.com](https://supabase.com) → buat project baru
> 2. Pergi ke **Settings → API**
> 3. Salin `Project URL` dan `anon public` key

### 4. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 📜 Scripts

| Command | Deskripsi |
|---|---|
| `npm run dev` | Jalankan development server dengan hot reload |
| `npm run build` | Build production bundle |
| `npm run start` | Jalankan production server (perlu build dulu) |
| `npm run lint` | Jalankan ESLint untuk cek kualitas kode |

---

## 🗃️ Data Model

### `CulturalAsset` — Artefak Budaya

```typescript
interface CulturalAsset {
  id: string;                    // Slug unik (contoh: 'wayang-kulit-jawa')
  title: string;                 // Nama artefak
  subtitle: string;              // Tagline singkat
  category: Category;            // 'bahasa' | 'kriya' | 'musik' | 'ritual' | 'tari' | 'kuliner'
  description: string;           // Deskripsi lengkap
  region: string;                // Nama wilayah/daerah
  province: string;              // Nama provinsi
  regionCoords: {                // Koordinat untuk peta
    lat: number;
    lng: number;
  };
  statusExtinction: ExtinctionStatus; // 'aman' | 'rentan' | 'kritis' | 'punah'
  coverImage: string;            // Path gambar utama
  tags: string[];                // Tag pencarian
  mediaCount: {                  // Jumlah media per tipe
    image: number;
    audio: number;
    video: number;
  };
  contributors: number;          // Jumlah kontributor
  views: number;                 // Jumlah tayangan
  createdAt: string;             // Tanggal dibuat (ISO string)
  featured?: boolean;            // Tampil sebagai artefak unggulan
}
```

### Status Kepunahan

| Status | Kode | Warna | Arti |
|---|---|---|---|
| Aman | `aman` | `#4E8C66` 🟢 | Masih lestari dan aktif diwariskan |
| Rentan | `rentan` | `#C8793A` 🟠 | Mulai berkurang, perlu perhatian |
| Kritis | `kritis` | `#C84535` 🔴 | Sangat sedikit penutur/praktisi |
| Punah | `punah` | `#6B7280` ⚫ | Tidak ada lagi penutur/praktisi |

### Kategori Warisan

| Kategori | Contoh |
|---|---|
| `bahasa` | Bahasa Using, Bahasa Tobati |
| `kriya` | Wayang Kulit, Batik, Tenun Ikat |
| `musik` | Gamelan Jawa, Kolintang |
| `ritual` | Ritual Marapu, Ondel-Ondel |
| `tari` | Tari Kecak, Tari Saman, Reog |
| `kuliner` | Kuliner tradisional daerah |

---

## 🗺️ Halaman & Routing

| Route | Halaman | Deskripsi |
|---|---|---|
| `/` | Homepage | Hero, Bento Grid, Narrative, Stats, Arsip Terbaru, CTA |
| `/atlas` | Atlas Budaya | Peta interaktif Indonesia dengan filter & marker aset |
| `/arsip` | Arsip Media | Grid masonry semua aset + pencarian + filter kategori |
| `/arsip/[id]` | Detail Artefak | Halaman detail lengkap satu artefak |
| `/kontribusi` | Kontribusi | Form multi-step untuk menambah warisan budaya |
| `/login` | Login | Halaman autentikasi masuk |
| `/register` | Register | Halaman buat akun baru |

---

## 🎨 Design System

### Palet Warna

```css
--bg-primary:   #0E0B08;  /* Hitam arang — background utama */
--bg-card:      #1C1208;  /* Cokelat sangat gelap — card */
--gold:         #D4A853;  /* Emas keraton wayang — aksen utama */
--gold-bright:  #E8C878;  /* Emas kilap — hover state */
--text-primary: #F2E8D5;  /* Krem kulit kerbau — teks utama */
--text-muted:   #A08B6E;  /* Krem kusam — teks sekunder */
```

### Komponen Utama

**Glass Card** — Semua card menggunakan efek glassmorphism:
```css
background: rgba(28, 18, 8, 0.85);
backdrop-filter: blur(24px);
border: 1px solid rgba(212, 168, 83, 0.16);
```

**Badge Warisan** — Tag/label khas platform:
```css
font-family: 'Courier New', monospace;
font-size: 0.65rem;
letter-spacing: 0.12em;
border: 1px solid rgba(212, 168, 83, 0.45);
color: #D4A853;
```

---

## 🌐 Fitur Bilingual

Platform mendukung dua bahasa secara penuh:

- 🇮🇩 **Bahasa Indonesia** (default)
- 🇬🇧 **English**

Toggle bahasa tersedia di Navbar. State bahasa dikelola via `LanguageContext` dan persisten selama sesi browser.

Semua konten yang ditampilkan — judul halaman, label, deskripsi, pesan error, hingga teks metadata — tersedia dalam kedua bahasa.

---

## 🔐 Autentikasi

Platform menggunakan **Supabase Auth** untuk manajemen pengguna:

- ✅ Register dengan email & password
- ✅ Login dengan email & password  
- ✅ Session persisten (JWT)
- ✅ Logout
- 🔒 Fitur kontribusi memerlukan login

State autentikasi dikelola secara global via `useAuthStore` (Zustand) yang berlangganan ke perubahan session Supabase secara real-time.

---

## 🗺️ Peta Interaktif (Atlas)

Halaman Atlas menggunakan `react-simple-maps` dengan data GeoJSON Indonesia:

- **Proyeksi:** Mercator, center `[118, -2]`
- **Zoom:** 0.5x – 5x (scroll mouse / pinch)
- **Pan:** Drag untuk geser
- **Marker:** Titik per aset berwarna sesuai status kepunahan
- **Hover:** Marker membesar + tooltip detail muncul di kanan atas
- **Filter:** Berdasarkan kategori dan status kepunahan

Data koordinat setiap artefak budaya tersimpan dalam field `regionCoords` (`lat`, `lng`).

---

## 🎵 Audio Player

Komponen `AudioPlayer` mendukung dua mode:

**Compact mode** (embedded dalam card):
- Tombol play/pause
- Waveform bars animasi
- Progress bar
- Nama track & durasi

**State audio** dikelola global via `useAudioStore` (Zustand) sehingga musik terus berjalan saat berpindah halaman.

---

## ⚙️ State Management (Zustand)

| Store | File | Isi |
|---|---|---|
| `useAudioStore` | `store/useAudioStore.ts` | Track aktif, status play/pause |
| `useAuthStore` | `store/useAuthStore.ts` | Data user yang sedang login |
| `useDataStore` | `store/useDataStore.ts` | Cache data artefak dari Supabase |
| `useAtlasStore` | `store/useAtlasStore.ts` | Filter aktif di halaman Atlas |
| `useLikesStore` | `store/useLikesStore.ts` | Daftar artefak yang disukai user |

---

## 🐛 Troubleshooting

### Hydration Error di Browser

```
A tree hydrated but some attributes of the server rendered HTML didn't match...
```

**Penyebab:** Browser extension (antivirus, ad blocker, Google Translate) menyuntikkan atribut ke DOM sebelum React selesai hydrate.

**Solusi:**
1. Test di mode **Incognito** (tanpa extension) — jika hilang, masalah dari extension
2. Atribut `suppressHydrationWarning` sudah ditambahkan di `<body>` pada `layout.tsx`

### Error Fetching Assets

```
Error fetching assets: {}
```

Pastikan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` di `.env.local` sudah benar dan Supabase project aktif.

### Peta Tidak Tampil

Pastikan file `/public/indonesia.json` ada. File ini berisi data GeoJSON untuk peta Indonesia.

---

## 📦 Deployment

### Deploy ke Vercel (Rekomendasi)

1. Push kode ke GitHub
2. Import project di [vercel.com](https://vercel.com)
3. Tambahkan environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy otomatis setiap push ke branch `main`

### Build Manual

```bash
npm run build
npm run start
```

---

## 🤝 Berkontribusi

Kontribusi sangat diterima! Berikut cara berkontribusi:

1. **Fork** repository ini
2. Buat branch baru: `git checkout -b feature/nama-fitur`
3. Commit perubahan: `git commit -m 'feat: tambah fitur X'`
4. Push ke branch: `git push origin feature/nama-fitur`
5. Buat **Pull Request**

### Convention Commit

| Prefix | Arti |
|---|---|
| `feat:` | Fitur baru |
| `fix:` | Perbaikan bug |
| `docs:` | Perubahan dokumentasi |
| `style:` | Perubahan style/CSS |
| `refactor:` | Refaktor kode |
| `chore:` | Maintenance |

---

## 📄 Lisensi

Project ini dilisensikan di bawah **MIT License** — bebas digunakan, dimodifikasi, dan didistribusikan dengan menyertakan atribusi.

---

<div align="center">

**© 2025 ASTRA — RuangWarisan**

*Menjaga Warisan Melalui Teknologi*

🌿 · 🥁 · 🗺️ · 📜

</div>
