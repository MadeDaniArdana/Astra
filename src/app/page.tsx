'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ChevronDown, Play, MapPin, BookOpen, Headphones } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { platformStats, curatedIndices, featuredNarrative } from '@/data/mockData';
import AudioPlayer from '@/components/audio/AudioPlayer';
import { useLanguage } from '@/context/LanguageContext';
import { useDataStore } from '@/store/useDataStore';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const statusColor: Record<string, string> = {
  aman: '#4E8C66',
  rentan: '#C8793A',
  kritis: '#C84535',
  punah: '#6B7280',
};
const statusLabel: Record<string, string> = {
  aman: 'Aman',
  rentan: 'Rentan',
  kritis: 'Kritis',
  punah: 'Punah',
};

const dict = {
  ID: {
    heroBadge: "Museum Digital Budaya Indonesia",
    heroTitle1: "Arsip Seni & Tradisi",
    heroTitle2: "Ruang Antarmuka",
    heroSubtitle: "Platform imersif untuk mendokumentasikan, menjaga, dan mempopulerkan warisan budaya Indonesia yang hampir punah — dari bahasa daerah hingga ritual leluhur.",
    btnJelajahiAtlas: "Jelajahi Atlas",
    btnArsipMedia: "Arsip Media",
    scroll: "Scroll",
    featBadge: "Artefak Unggulan",
    featStats: "kunjungan",
    btnJelajahi: "Jelajahi",
    arsipCardTitle: "Arsip Digital",
    arsipCardDesc: "Akses lebih dari 10.000 artefak budaya yang telah terdigitasi dari 34 provinsi.",
    audioCardTitle: "Warisan Sonik",
    audioCardDesc: "Frekuensi Gamelan Jawa yang dipreservasi dalam arsip audio.",
    mapBadge: "Registri Geospasial",
    mapTitle: "Atlas Budaya",
    mapLink: "Lihat Topologi",
    idxTitle: "Indeks Kurasi",
    narrativeBadge: "Narasi Mendalam",
    narrativeCh: "Bab",
    recentBadge: "Koleksi Terbaru",
    recentTitle: "Jelajahi Arsip",
    recentLink: "Lihat Semua",
    ctaBadge: "Bergabung",
    ctaTitle1: "Jadilah Penjaga",
    ctaTitle2: "Warisan Bangsa",
    ctaDesc: "Kontribusikan pengetahuan budaya yang Anda miliki. Setiap dokumen, rekaman, atau cerita adalah investasi untuk generasi mendatang.",
    btnMulaiKontribusi: "Mulai Kontribusi",
    btnBuatAkun: "Buat Akun Gratis"
  },
  EN: {
    heroBadge: "Indonesian Digital Cultural Museum",
    heroTitle1: "Arts & Traditions Archive",
    heroTitle2: "Interface Space",
    heroSubtitle: "An immersive platform to document, preserve, and popularize endangered Indonesian cultural heritage — from local languages to ancestral rituals.",
    btnJelajahiAtlas: "Explore Atlas",
    btnArsipMedia: "Media Archive",
    scroll: "Scroll",
    featBadge: "Featured Artifact",
    featStats: "views",
    btnJelajahi: "Explore",
    arsipCardTitle: "Digital Archive",
    arsipCardDesc: "Access more than 10,000 digitized cultural artifacts from 34 provinces.",
    audioCardTitle: "Sonic Heritage",
    audioCardDesc: "Frequencies of Javanese Gamelan preserved in audio archives.",
    mapBadge: "Geospatial Registry",
    mapTitle: "Cultural Atlas",
    mapLink: "View Topology",
    idxTitle: "Curated Indices",
    narrativeBadge: "In-Depth Narrative",
    narrativeCh: "Chapter",
    recentBadge: "Recent Collections",
    recentTitle: "Explore Archive",
    recentLink: "View All",
    ctaBadge: "Join Us",
    ctaTitle1: "Become a Guardian of",
    ctaTitle2: "National Heritage",
    ctaDesc: "Contribute your cultural knowledge. Every document, recording, or story is an investment for future generations.",
    btnMulaiKontribusi: "Start Contributing",
    btnBuatAkun: "Create Free Account"
  }
};

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const t = dict[lang];
  const { assets: culturalAssets, loading } = useDataStore();

  useGSAP(() => {
    // Hero entrance
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo('.hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .fromTo('.hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1 }, '-=0.2')
      .fromTo('.hero-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
      .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1 }, '-=0.3')
      .fromTo('.scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2');

    // Parallax on hero
    gsap.to('.hero-bg-glow', {
      y: -80,
      ease: 'none',
      scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
    });

    // Scroll indicator fade
    gsap.to('.scroll-indicator', {
      opacity: 0,
      y: 20,
      ease: 'none',
      scrollTrigger: { trigger: heroRef.current, start: 'top top', end: '30% top', scrub: true },
    });

    // Stats counter
    const statEls = gsap.utils.toArray('.stat-number') as HTMLElement[];
    statEls.forEach((el, i) => {
      const target = platformStats[lang][i]?.value || 0;
      const counter = { val: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(counter, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.round(counter.val).toLocaleString('id-ID');
            },
          });
        },
        once: true,
      });
    });


    // Cards stagger in
    gsap.fromTo('.asset-card', { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: '.asset-grid', start: 'top 80%' },
    });

    // Narrative section
    gsap.fromTo('.narrative-chapter', { opacity: 0, x: -30 }, {
      opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out',
      scrollTrigger: { trigger: '.narrative-section', start: 'top 75%' },
    });

  }, { scope: containerRef, dependencies: [lang] });

  const recentAssets = culturalAssets.slice(0, 6);

  return (
    <div ref={containerRef} className="min-h-screen">

      {/* ── HERO ─────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background glows */}
        <div className="hero-bg-glow absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#D4A853] opacity-[0.04] blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-[#6B72C8] opacity-[0.04] blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[rgba(212,168,83,0.04)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[rgba(212,168,83,0.06)]" />
        </div>

        {/* Hero Background Image */}
        <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen blur-[4px]" style={{ maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 80%)', WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 80%)' }}>
          <Image
            src="/hero-bg.jpg"
            alt="Hero Background"
            fill
            className="object-cover scale-110"
            priority
          />
        </div>
        {/* Dark gradient overlay to ensure smooth transition at edges */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(13,10,6,0.8) 0%, transparent 20%, transparent 70%, #0E0B08 100%)' }} />

        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(212,168,83,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pb-24">
          <div className="hero-badge inline-flex items-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#4E8C66] animate-pulse" />
            <span className="badge-warisan">{t.heroBadge}</span>
          </div>

          <h1 className="font-serif mb-6">
            <span className="hero-title block text-4xl md:text-6xl lg:text-7xl text-[#F2E8D5] leading-tight mb-2">
              {t.heroTitle1}
            </span>
            <span className="hero-title block text-4xl md:text-6xl lg:text-7xl glow-gold leading-tight" style={{ color: '#D4A853' }}>
              {t.heroTitle2}
            </span>
          </h1>

          <p className="hero-subtitle text-[#A08B6E] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            {t.heroSubtitle}
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/atlas" className="group flex items-center gap-3 px-8 py-4 bg-[#D4A853] text-[#0E0B08] font-semibold text-sm tracking-widest uppercase hover:bg-[#E8C878] transition-all duration-300">
              {t.btnJelajahiAtlas}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/arsip" className="group flex items-center gap-3 px-8 py-4 border border-[rgba(212,168,83,0.4)] text-[#D4A853] text-sm tracking-widest uppercase hover:bg-[rgba(212,168,83,0.08)] transition-all duration-300">
              <Play size={14} />
              {t.btnArsipMedia}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[#A08B6E] text-xs tracking-[0.25em] uppercase" style={{ fontFamily: "'Courier New', monospace" }}>{t.scroll}</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#D4A853] to-transparent animate-pulse" />
          <ChevronDown size={14} className="text-[#D4A853] animate-bounce" />
        </div>
      </section>

      {/* ── FEATURED ARTIFACT GRID (like reference image) ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Large Featured Card */}
          <div className="lg:col-span-2 relative overflow-hidden glass-card min-h-[480px] group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2A1F08] via-[#1C1208] to-[#0E0B08]" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A853] opacity-[0.05] blur-[80px] rounded-full" />

            {/* Decorative wayang silhouette blending behind text */}
            <style>{`
              @keyframes floating-wayang {
                0% { transform: translateY(0px) scale(1); drop-shadow(0 0 15px rgba(212,168,83,0.3)); }
                50% { transform: translateY(-15px) scale(1.02); drop-shadow(0 0 35px rgba(212,168,83,0.7)); }
                100% { transform: translateY(0px) scale(1); drop-shadow(0 0 15px rgba(212,168,83,0.3)); }
              }
            `}</style>
            <div
              className="absolute inset-0 w-full h-full mix-blend-screen pointer-events-none opacity-90"
              style={{ maskImage: 'radial-gradient(circle at center right, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%)', WebkitMaskImage: 'radial-gradient(circle at center right, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%)' }}
            >
              <Image
                src="/wayang-hero.png"
                alt="Singularitas Wayang"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover md:object-contain"
                style={{ animation: 'floating-wayang 6s ease-in-out infinite' }}
                priority
              />
            </div>

            <div className="relative z-10 p-8 h-full flex flex-col justify-end" style={{ minHeight: '480px' }}>
              <div className="badge-warisan inline-block mb-4 self-start">{t.featBadge}</div>
              <h2 className="font-serif text-4xl md:text-5xl text-[#D4A853] glow-gold-sm mb-3 leading-tight">
                {featuredNarrative[lang].title}
              </h2>
              <p className="text-[#A08B6E] text-sm leading-relaxed mb-6 max-w-lg">
                {featuredNarrative[lang].subtitle}
              </p>
              <div className="flex items-center gap-4">
                <Link href="/arsip/wayang-kulit-jawa" className="flex items-center gap-2 text-[#D4A853] text-xs tracking-widest uppercase hover:text-[#E8C878] transition-colors" style={{ fontFamily: "'Courier New', monospace" }}>
                  {t.btnJelajahi} <ArrowRight size={12} />
                </Link>
                <span className="text-[#A08B6E] text-xs" style={{ fontFamily: "'Courier New', monospace" }}>
                  18.420 {t.featStats}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {/* Archive Card */}
            <div className="glass-card p-6 flex-1 group cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 border border-[rgba(212,168,83,0.3)] flex items-center justify-center">
                  <BookOpen size={14} className="text-[#D4A853]" />
                </div>
                <h3 className="font-serif text-xl text-[#F2E8D5]">{t.arsipCardTitle}</h3>
              </div>
              <p className="text-[#A08B6E] text-sm leading-relaxed mb-4">
                {t.arsipCardDesc}
              </p>
              <Link href="/arsip" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase border border-[rgba(212,168,83,0.3)] text-[#D4A853] px-4 py-2 hover:bg-[rgba(212,168,83,0.08)] transition-all" style={{ fontFamily: "'Courier New', monospace" }}>
                {t.btnJelajahi} <ArrowRight size={10} />
              </Link>
            </div>

            {/* Audio Card */}
            <div className="glass-card p-6 flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 border border-[rgba(212,168,83,0.3)] flex items-center justify-center">
                  <Headphones size={14} className="text-[#D4A853]" />
                </div>
                <h3 className="font-serif text-xl text-[#F2E8D5]">{t.audioCardTitle}</h3>
              </div>
              <p className="text-[#A08B6E] text-sm mb-4">{t.audioCardDesc}</p>
              <AudioPlayer trackId="gamelan-01" compact />
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Map Card */}
          <Link href="/atlas" className="glass-card p-6 group relative overflow-hidden min-h-[250px] cursor-pointer flex flex-col justify-between">
            <div className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none flex items-center justify-center">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 750, center: [118, -2] }}
                style={{ width: "120%", height: "120%" }}
              >
                <Geographies geography="/indonesia.json">
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="rgba(212,168,83, 0.15)"
                        stroke="rgba(212,168,83, 0.5)"
                        strokeWidth={0.8}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none", fill: "rgba(212,168,83, 0.3)" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>
              </ComposableMap>
            </div>
            <div className="relative z-10 pointer-events-none">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={14} className="text-[#D4A853]" />
                <span className="badge-warisan">{t.mapBadge}</span>
              </div>
              <h3 className="font-serif text-2xl text-[#D4A853]">{t.mapTitle}</h3>
            </div>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#D4A853] border border-[rgba(212,168,83,0.3)] px-4 py-2 group-hover:bg-[rgba(212,168,83,0.08)] transition-all" style={{ fontFamily: "'Courier New', monospace" }}>
                {t.mapLink} <ArrowRight size={10} />
              </span>
            </div>
          </Link>

          {/* Curated Indices */}
          <div className="glass-card p-6">
            <h3 className="font-serif text-2xl text-[#F2E8D5] mb-4">{t.idxTitle}</h3>
            <div className="flex flex-wrap gap-2">
              {curatedIndices.map((idx) => (
                <Link
                  key={idx.label}
                  href={`/arsip?q=${encodeURIComponent(idx.label)}`}
                  className="badge-indigo badge-warisan hover:bg-[rgba(99,102,241,0.15)] transition-colors cursor-pointer text-xs"
                >
                  {idx.label}
                  <span className="ml-1 opacity-60">({idx.count})</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SCROLLYTELLING NARRATIVE ── */}
      <section className="narrative-section py-24 border-t border-[rgba(212,168,83,0.08)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="badge-warisan mb-4 inline-block">{t.narrativeBadge}</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#F2E8D5] mt-4">
              {featuredNarrative[lang].title}
            </h2>
            <p className="text-[#A08B6E] mt-3 max-w-xl mx-auto">{featuredNarrative[lang].subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredNarrative[lang].chapters.map((ch, i) => (
              <div key={ch.id} className="narrative-chapter glass-card p-8 relative">
                <div className="absolute top-6 right-6 text-[#D4A853] opacity-20 font-serif text-6xl font-bold leading-none">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="text-[#D4A853] text-xs tracking-widest uppercase mb-2" style={{ fontFamily: "'Courier New', monospace" }}>
                  {t.narrativeCh} {i + 1}
                </p>
                <h3 className="font-serif text-2xl text-[#F2E8D5] mb-4">{ch.title}</h3>
                <p className="text-[#A08B6E] text-sm leading-relaxed mb-6">{ch.body}</p>
                <div className="border-t border-[rgba(212,168,83,0.1)] pt-4">
                  <span className="text-[#D4A853] text-2xl font-serif font-bold block">{ch.highlight}</span>
                  <span className="text-[#A08B6E] text-xs">{ch.accent}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 border-t border-[rgba(212,168,83,0.08)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {platformStats[lang].map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-5xl md:text-6xl text-[#D4A853] glow-gold-sm mb-2">
                  <span className="stat-number">0</span>
                  <span>{stat.suffix}</span>
                </div>
                <p className="text-[#A08B6E] text-sm tracking-widest uppercase" style={{ fontFamily: "'Courier New', monospace" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT ASSETS GRID ── */}
      <section className="py-20 border-t border-[rgba(212,168,83,0.08)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="badge-warisan mb-3 inline-block">{t.recentBadge}</span>
              <h2 className="font-serif text-4xl text-[#F2E8D5] mt-3">{t.recentTitle}</h2>
            </div>
            <Link href="/arsip" className="flex items-center gap-2 text-[#D4A853] text-xs tracking-widest uppercase hover:text-[#E8C878] transition-colors" style={{ fontFamily: "'Courier New', monospace" }}>
              {t.recentLink} <ArrowRight size={12} />
            </Link>
          </div>

          <div className="asset-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentAssets.map((asset) => (
              <Link
                key={asset.id}
                href={`/arsip/${asset.id}`}
                className="asset-card glass-card p-6 group flex flex-col"
              >
                {/* Category + Status */}
                <div className="flex items-center justify-between mb-4">
                  <span className="badge-warisan capitalize">{asset.category}</span>
                  <span
                    className="text-xs px-2 py-1 rounded-sm"
                    style={{
                      color: statusColor[asset.statusExtinction],
                      background: `${statusColor[asset.statusExtinction]}18`,
                      border: `1px solid ${statusColor[asset.statusExtinction]}40`,
                      fontFamily: "'Courier New', monospace",
                      letterSpacing: '0.08em',
                    }}
                  >
                    {statusLabel[asset.statusExtinction]}
                  </span>
                </div>

                <h3 className="font-serif text-xl text-[#F2E8D5] mb-1 group-hover:text-[#D4A853] transition-colors">
                  {asset.title}
                </h3>
                <p className="text-[#D4A853] text-xs mb-3" style={{ fontFamily: "'Courier New', monospace" }}>
                  {asset.subtitle}
                </p>
                <p className="text-[#A08B6E] text-sm leading-relaxed flex-1 line-clamp-3">
                  {asset.description}
                </p>

                <div className="border-t border-[rgba(212,168,83,0.1)] mt-4 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#A08B6E] text-xs" style={{ fontFamily: "'Courier New', monospace" }}>
                    <MapPin size={10} />
                    {asset.region}
                  </div>
                  <div className="flex items-center gap-3 text-[#A08B6E] text-xs" style={{ fontFamily: "'Courier New', monospace" }}>
                    <span>📷 {asset.mediaCount.image}</span>
                    <span>🎵 {asset.mediaCount.audio}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-24 border-t border-[rgba(212,168,83,0.08)]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="badge-warisan mb-6 inline-block">{t.ctaBadge}</span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#F2E8D5] mb-6 mt-4">
            {t.ctaTitle1} <br />
            <span className="text-[#D4A853] glow-gold">{t.ctaTitle2}</span>
          </h2>
          <p className="text-[#A08B6E] leading-relaxed mb-10">
            {t.ctaDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontribusi" className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#D4A853] text-[#0E0B08] font-semibold text-sm tracking-widest uppercase hover:bg-[#E8C878] transition-all duration-300">
              {t.btnMulaiKontribusi} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/login" className="flex items-center justify-center gap-3 px-8 py-4 border border-[rgba(212,168,83,0.3)] text-[#D4A853] text-sm tracking-widest uppercase hover:bg-[rgba(212,168,83,0.06)] transition-all duration-300">
              {t.btnBuatAkun}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
