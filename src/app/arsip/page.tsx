'use client';

import { useRef, useState, useEffect, Suspense } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { MapPin, ArrowRight, Play, Headphones, Video, Image as ImageIcon, Search } from 'lucide-react';
import type { Category } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { useAudioStore } from '@/store/useAudioStore';
import { useDataStore } from '@/store/useDataStore';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const statusColor: Record<string, string> = { aman: '#4E8C66', rentan: '#C8793A', kritis: '#C84535', punah: '#6B7280' };

const dict = {
  ID: {
    badge: "Koleksi Budaya",
    title: "Arsip Media",
    desc: "Dokumentasi mendalam warisan budaya Indonesia — gambar, audio, video, dan narasi dari penjuru nusantara.",
    searchPlaceholder: "Cari aset budaya...",
    found: "ASET DITEMUKAN",
    emptyTitle: "Tidak ada hasil ditemukan",
    emptyDesc: "Coba ubah filter atau kata kunci pencarian",
    detail: "Detail",
    region: "Wilayah",
    province: "Provinsi",
    status: "Status",
    photo: "Foto",
    audio: "Audio",
    video: "Video",
    btnOpen: "Buka Lengkap",
    btnPlay: "Putar Audio",
    categories: {
      all: 'Semua',
      bahasa: 'Bahasa',
      kriya: 'Kriya',
      musik: 'Musik',
      ritual: 'Ritual',
      tari: 'Tari',
    },
  },
  EN: {
    badge: "Cultural Collection",
    title: "Media Archive",
    desc: "In-depth documentation of Indonesian cultural heritage — images, audio, video, and narratives from across the archipelago.",
    searchPlaceholder: "Search cultural assets...",
    found: "ASSETS FOUND",
    emptyTitle: "No results found",
    emptyDesc: "Try changing filters or search keywords",
    detail: "Details",
    region: "Region",
    province: "Province",
    status: "Status",
    photo: "Photo",
    audio: "Audio",
    video: "Video",
    btnOpen: "Open Full",
    btnPlay: "Play Audio",
    categories: {
      all: 'All',
      bahasa: 'Language',
      kriya: 'Crafts',
      musik: 'Music',
      ritual: 'Ritual',
      tari: 'Dance',
    },
  }
};

const mediaTypeIcon = { image: ImageIcon, audio: Headphones, video: Video };

function ArsipInner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<typeof culturalAssets[0] | null>(null);
  const { lang } = useLanguage();
  const t = dict[lang];
  const searchParams = useSearchParams();
  const { setTrack, currentTrackId, isPlaying, togglePlay } = useAudioStore();
  const { assets: culturalAssets, loading } = useDataStore();

  // Read ?q= from URL on mount and when URL changes
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearch(q);
  }, [searchParams]);

  const categoryOptions: { value: Category | 'all' }[] = [
    { value: 'all' },
    { value: 'bahasa' },
    { value: 'kriya' },
    { value: 'musik' },
    { value: 'ritual' },
    { value: 'tari' },
  ];

  useGSAP(() => {
    gsap.fromTo('.arsip-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.3 });
    gsap.fromTo('.arsip-card', { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out', delay: 0.5,
    });
  }, { scope: containerRef });

  const q = search.toLowerCase();
  const filtered = culturalAssets.filter((a) => {
    if (activeCategory !== 'all' && a.category !== activeCategory) return false;
    if (q) {
      const inTitle = a.title.toLowerCase().includes(q);
      const inRegion = a.region.toLowerCase().includes(q);
      const inTags = a.tags.some((tag) => tag.toLowerCase().includes(q));
      const inDesc = a.description.toLowerCase().includes(q);
      if (!inTitle && !inRegion && !inTags && !inDesc) return false;
    }
    return true;
  });

  const handlePlayAudio = (audioTrackId: string = 'gamelan-01') => {
    if (currentTrackId === audioTrackId) {
      togglePlay();
    } else {
      setTrack(audioTrackId);
    }
  };

  const isAudioPlaying = isPlaying && currentTrackId !== null;

  return (
    <div ref={containerRef} className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="arsip-title text-center mb-12">
          <span className="badge-warisan mb-4 inline-block">{t.badge}</span>
          <h1 className="font-serif text-5xl md:text-6xl text-[#F2E8D5] mt-4 mb-4">{t.title}</h1>
          <p className="text-[#A08B6E] max-w-xl mx-auto">
            {t.desc}
          </p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A08B6E]" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[rgba(212,168,83,0.06)] border border-[rgba(212,168,83,0.2)] text-[#F2E8D5] placeholder-[#A08B6E] text-sm focus:outline-none focus:border-[#D4A853] transition-colors"
              style={{ fontFamily: "'Courier New', monospace" }}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categoryOptions.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`text-xs tracking-widest uppercase px-4 py-3 border transition-all duration-200 ${
                  activeCategory === cat.value
                    ? 'border-[#D4A853] bg-[rgba(212,168,83,0.12)] text-[#D4A853]'
                    : 'border-[rgba(212,168,83,0.2)] text-[#A08B6E] hover:text-[#F2E8D5] hover:border-[rgba(212,168,83,0.4)]'
                }`}
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                {t.categories[cat.value as keyof typeof t.categories]}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p className="text-[#A08B6E] text-xs mb-6" style={{ fontFamily: "'Courier New', monospace" }}>
          {filtered.length} {t.found}
        </p>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-[#D4A853] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Masonry Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filtered.map((asset, i) => (
                <div
                  key={asset.id}
                  className="arsip-card break-inside-avoid glass-card group cursor-pointer overflow-hidden"
                  onClick={() => setSelectedAsset(asset)}
                >
                  {/* Decorative top bar */}
                  <div className="h-1" style={{ background: `linear-gradient(to right, ${statusColor[asset.statusExtinction]}, transparent)` }} />

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="badge-warisan capitalize">{t.categories[asset.category as keyof typeof t.categories]}</span>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full" style={{ background: statusColor[asset.statusExtinction] }} />
                        <span className="text-xs" style={{ color: statusColor[asset.statusExtinction], fontFamily: "'Courier New', monospace" }}>
                          {asset.statusExtinction}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-serif text-xl text-[#F2E8D5] group-hover:text-[#D4A853] transition-colors mb-1">
                      {asset.title}
                    </h3>
                    <p className="text-[#D4A853] text-xs mb-3" style={{ fontFamily: "'Courier New', monospace" }}>
                      {asset.subtitle}
                    </p>
                    <p className="text-[#A08B6E] text-sm leading-relaxed mb-4">
                      {asset.description}
                    </p>

                    {/* Media counts */}
                    <div className="flex gap-4 mb-4">
                      {[
                        { icon: ImageIcon, count: asset.mediaCount.image, label: t.photo },
                        { icon: Headphones, count: asset.mediaCount.audio, label: t.audio },
                        { icon: Video, count: asset.mediaCount.video, label: t.video },
                      ].map(({ icon: Icon, count, label }) => (
                        <div key={label} className="flex items-center gap-1 text-[#A08B6E]">
                          <Icon size={11} />
                          <span className="text-xs" style={{ fontFamily: "'Courier New', monospace" }}>{count}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[rgba(212,168,83,0.08)]">
                      <span className="text-[#A08B6E] text-xs flex items-center gap-1">
                        <MapPin size={10} /> {asset.region}
                      </span>
                      <span className="text-xs text-[#D4A853] flex items-center gap-1 group-hover:gap-2 transition-all" style={{ fontFamily: "'Courier New', monospace" }}>
                        {t.detail} <ArrowRight size={10} />
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  {i % 3 === 0 && (
                    <div className="px-6 pb-5 flex flex-wrap gap-2">
                      {asset.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 border border-[rgba(212,168,83,0.15)] text-[#A08B6E]" style={{ fontFamily: "'Courier New', monospace" }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-[#A08B6E] text-lg font-serif mb-2">{t.emptyTitle}</p>
                <p className="text-[#A08B6E] text-sm">{t.emptyDesc}</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Detail Modal */}
      {selectedAsset && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(13,10,6,0.85)', backdropFilter: 'blur(12px)' }}
          onClick={() => setSelectedAsset(null)}
        >
          <div
            className="glass-card max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-1" style={{ background: `linear-gradient(to right, ${statusColor[selectedAsset.statusExtinction]}, transparent)` }} />
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="badge-warisan capitalize mb-2 inline-block">{t.categories[selectedAsset.category as keyof typeof t.categories]}</span>
                  <h2 className="font-serif text-3xl text-[#F2E8D5] mt-2">{selectedAsset.title}</h2>
                  <p className="text-[#D4A853] text-sm mt-1" style={{ fontFamily: "'Courier New', monospace" }}>{selectedAsset.subtitle}</p>
                </div>
                <button onClick={() => setSelectedAsset(null)} className="text-[#A08B6E] hover:text-[#F2E8D5] text-xl leading-none">&times;</button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: t.region, val: selectedAsset.region },
                  { label: t.province, val: selectedAsset.province },
                  { label: t.status, val: selectedAsset.statusExtinction, color: statusColor[selectedAsset.statusExtinction] },
                ].map(({ label, val, color }) => (
                  <div key={label} className="p-3 border border-[rgba(212,168,83,0.1)] bg-[rgba(212,168,83,0.03)]">
                    <p className="text-[#A08B6E] text-xs mb-1" style={{ fontFamily: "'Courier New', monospace" }}>{label}</p>
                    <p className="text-sm font-medium" style={{ color: color || '#F2E8D5' }}>{val}</p>
                  </div>
                ))}
              </div>

              <p className="text-[#A08B6E] leading-relaxed mb-6">{selectedAsset.description}</p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { Icon: ImageIcon, count: selectedAsset.mediaCount.image, label: t.photo },
                  { Icon: Headphones, count: selectedAsset.mediaCount.audio, label: t.audio },
                  { Icon: Video, count: selectedAsset.mediaCount.video, label: t.video },
                ].map(({ Icon, count, label }) => (
                  <div key={label} className="p-4 border border-[rgba(212,168,83,0.1)] text-center">
                    <Icon size={20} className="mx-auto mb-2 text-[#D4A853]" />
                    <p className="text-[#F2E8D5] text-lg font-serif">{count}</p>
                    <p className="text-[#A08B6E] text-xs">{label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedAsset.tags.map((tag) => (
                  <span key={tag} className="badge-warisan">{tag}</span>
                ))}
              </div>

              <div className="flex gap-3">
                <Link href={`/arsip/${selectedAsset.id}`} className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#D4A853] text-[#0E0B08] font-semibold text-sm tracking-widest uppercase hover:bg-[#E8C878] transition-colors">
                  {t.btnOpen} <ArrowRight size={14} />
                </Link>
                <button
                  onClick={() => handlePlayAudio()}
                  className={`px-6 py-3 border text-sm flex items-center gap-2 transition-colors ${
                    isAudioPlaying
                      ? 'border-[#D4A853] bg-[rgba(212,168,83,0.12)] text-[#D4A853]'
                      : 'border-[rgba(212,168,83,0.3)] text-[#D4A853] hover:bg-[rgba(212,168,83,0.06)]'
                  }`}
                >
                  <Play size={14} fill={isAudioPlaying ? 'currentColor' : 'none'} />
                  {isAudioPlaying ? 'Memutar...' : t.btnPlay}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ArsipPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24" />}>
      <ArsipInner />
    </Suspense>
  );
}
