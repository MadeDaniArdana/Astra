'use client';

import { useRef, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowLeft, MapPin, Share2, Heart, Play, Eye, BookOpen, ArrowRight, Copy, Check, ExternalLink } from 'lucide-react';
import AudioPlayer from '@/components/audio/AudioPlayer';
import { useLanguage } from '@/context/LanguageContext';
import { useLikesStore } from '@/store/useLikesStore';
import { useDataStore } from '@/store/useDataStore';
import { useToast } from '@/components/ui/Toast';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const statusColor: Record<string, string> = { aman: '#4E8C66', rentan: '#C8793A', kritis: '#C84535', punah: '#6B7280' };

const dict = {
  ID: {
    back: "Kembali ke Arsip",
    featured: "Artefak Unggulan",
    views: "tayangan",
    contributors: "kontributor",
    aboutTitle: "Tentang Warisan",
    aboutDescPart1: "Menelusuri jejak",
    aboutDescPart2: "adalah seperti membuka lembaran sejarah nusantara. Praktik ini telah diwariskan dari generasi ke generasi, membentuk identitas dan kearifan lokal masyarakat",
    aboutDescPart3: "Sayangnya, dengan arus modernisasi yang cepat, tradisi ini menghadapi tantangan besar untuk bertahan.",
    statusTitle: "Status Preservasi",
    statusDesc1: "Warisan ini saat ini diklasifikasikan sebagai",
    statusDesc2: "Dibutuhkan upaya kolektif untuk mendokumentasikan dan merevitalisasi praktik ini agar tidak hilang ditelan zaman.",
    audioTitle: "Arsip Sonik",
    tagsTitle: "Tags & Indeks",
    contribTitle: "Kontribusi Aset",
    contribDesc: "Apakah Anda memiliki pengetahuan mendalam, foto historis, atau rekaman terkait",
    contribDesc2: "? Bantu lengkapi arsip ini.",
    btnAddData: "Tambah Data",
    shareTitle: "Bagikan",
    coordTitle: "Koordinat Geospasial",
    viewAtlas: "Lihat di Atlas",
    sourceTitle: "Sumber Referensi",
    sourceDesc: "Pelajari lebih lanjut dan lihat bukti dokumentasi warisan ini dari sumber eksternal terpercaya.",
    visitSite: "Kunjungi Situs",
    categories: {
      all: 'Semua',
      bahasa: 'Bahasa',
      kriya: 'Kriya',
      musik: 'Musik',
      ritual: 'Ritual',
      tari: 'Tari',
    },
    status: {
      aman: 'Aman',
      rentan: 'Rentan',
      kritis: 'Kritis',
      punah: 'Punah',
    }
  },
  EN: {
    back: "Back to Archive",
    featured: "Featured Artifact",
    views: "views",
    contributors: "contributors",
    aboutTitle: "About the Heritage",
    aboutDescPart1: "Tracing the legacy of",
    aboutDescPart2: "is like opening the historical pages of the archipelago. This practice has been passed down from generation to generation, shaping the identity and local wisdom of the people of",
    aboutDescPart3: "Unfortunately, with the rapid currents of modernization, this tradition faces tremendous challenges to survive.",
    statusTitle: "Preservation Status",
    statusDesc1: "This heritage is currently classified as",
    statusDesc2: "Collective efforts are needed to document and revitalize this practice so it is not lost to time.",
    audioTitle: "Sonic Archive",
    tagsTitle: "Tags & Indices",
    contribTitle: "Asset Contribution",
    contribDesc: "Do you have in-depth knowledge, historical photos, or recordings related to",
    contribDesc2: "? Help complete this archive.",
    btnAddData: "Add Data",
    shareTitle: "Share",
    coordTitle: "Geospatial Coordinates",
    viewAtlas: "View in Atlas",
    sourceTitle: "Reference Source",
    sourceDesc: "Learn more and view documentary evidence of this heritage from trusted external sources.",
    visitSite: "Visit Site",
    categories: {
      all: 'All',
      bahasa: 'Language',
      kriya: 'Crafts',
      musik: 'Music',
      ritual: 'Ritual',
      tari: 'Dance',
    },
    status: {
      aman: 'Safe',
      rentan: 'Vulnerable',
      kritis: 'Critical',
      punah: 'Extinct',
    }
  }
};

export default function AssetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const t = dict[lang];
  const { assets: culturalAssets, loading } = useDataStore();

  const asset = culturalAssets.find(a => a.id === id);
  const { toggleLike, isLiked } = useLikesStore();
  const { showToast } = useToast();
  const [mounted, setMounted] = useState(false);

  // Wait for client mount before reading localStorage-backed store
  useEffect(() => { setMounted(true); }, []);

  const liked = mounted && asset ? isLiked(asset.id) : false;

  const sourceLinks: Record<string, string> = {
    'wayang-kulit-jawa': 'https://ich.unesco.org/en/RL/wayang-puppet-theatre-00063',
    'batik-pedalaman': 'https://ich.unesco.org/en/RL/indonesian-batik-00170',
    'gamelan-jawa': 'https://ich.unesco.org/en/RL/gamelan-01607',
    'tari-saman': 'https://ich.unesco.org/en/USL/saman-dance-00509',
    'bahasa-enggano': 'https://badanbahasa.kemdikbud.go.id',
    'ritual-pasola': 'https://warisanbudaya.kemdikbud.go.id',
    'angklung-sunda': 'https://ich.unesco.org/en/RL/angklung-music-00393',
    'tari-kecak': 'https://warisanbudaya.kemdikbud.go.id/?newdetail&detailCatat=4',
    'keris-indonesia': 'https://ich.unesco.org/en/RL/indonesian-kris-00112',
    'noken-papua': 'https://ich.unesco.org/en/USL/noken-00619',
    'rendang-minang': 'https://warisanbudaya.kemdikbud.go.id/?newdetail&detailCatat=13',
    'pencak-silat': 'https://ich.unesco.org/en/RL/pencak-silat-01391',
    'sasando-rote': 'https://warisanbudaya.kemdikbud.go.id/?newdetail&detailCatat=45',
    'reog-ponorogo': 'https://warisanbudaya.kemdikbud.go.id/?newdetail&detailCatat=8',
    'kapal-pinisi': 'https://ich.unesco.org/en/RL/tradition-of-proa-making-00862',
    'tenun-ikat-ntt': 'https://warisanbudaya.kemdikbud.go.id/?newdetail&detailCatat=30',
    'tari-pendet': 'https://warisanbudaya.kemdikbud.go.id/?newdetail&detailCatat=5',
    'rumah-adat-toraja': 'https://warisanbudaya.kemdikbud.go.id/?newdetail&detailCatat=60',
    'bahasa-tobati': 'https://endangeredlanguages.com/lang/4143',
    'upacara-ngaben': 'https://warisanbudaya.kemdikbud.go.id/?newdetail&detailCatat=7',
    'ukiran-asmat': 'https://warisanbudaya.kemdikbud.go.id/?newdetail&detailCatat=90',
    'tari-tor-tor': 'https://warisanbudaya.kemdikbud.go.id/?newdetail&detailCatat=22',
    'jamu-tradisional': 'https://ich.unesco.org/en/RL/jamu-01809',
    'tari-piring': 'https://warisanbudaya.kemdikbud.go.id/?newdetail&detailCatat=11',
    'ondel-ondel': 'https://warisanbudaya.kemdikbud.go.id/?newdetail&detailCatat=35',
  };

  const externalLink = asset ? (sourceLinks[asset.id] || `https://www.google.com/search?q=${encodeURIComponent('Warisan Budaya ' + asset.title)}`) : '#';

  const handleShare = async () => {
    const url = window.location.href;
    const title = asset?.title || 'RuangWarisan';
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (_) {/* user cancelled */}
    } else {
      await navigator.clipboard.writeText(url);
      showToast(
        lang === 'ID' ? 'Link disalin ke clipboard!' : 'Link copied to clipboard!',
        'success'
      );
    }
  };

  const handleLike = () => {
    if (!asset) return;
    toggleLike(asset.id);
    const msg = !liked
      ? (lang === 'ID' ? 'Ditambahkan ke favorit!' : 'Added to favorites!')
      : (lang === 'ID' ? 'Dihapus dari favorit' : 'Removed from favorites');
    showToast(msg, !liked ? 'success' : 'info');
  };

  useEffect(() => {
    if (!asset) {
      router.push('/arsip');
    }
  }, [asset, router]);

  useGSAP(() => {
    if (!asset) return;

    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo('.back-btn', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' })
      .fromTo('.asset-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .fromTo('.asset-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .fromTo('.asset-meta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      .fromTo('.hero-image', { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }, '-=0.4')
      .fromTo('.content-fade', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out' }, '-=0.5');

    // Parallax on hero image
    gsap.to('.hero-image-inner', {
      y: 100,
      ease: 'none',
      scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
    });
  }, { scope: containerRef, dependencies: [asset, lang] });

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-[#0E0B08] text-[#F2E8D5] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#D4A853] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-[#0E0B08] text-[#F2E8D5] flex flex-col items-center justify-center">
        <h1 className="font-serif text-3xl text-[#D4A853] mb-4">Aset Tidak Ditemukan</h1>
        <Link href="/arsip" className="text-[#A08B6E] hover:text-[#F2E8D5] transition-colors border-b border-[rgba(212,168,83,0.3)] pb-1">
          {t.back}
        </Link>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen pb-20">
      {/* ── HERO SECTION ── */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] flex items-end pb-16 overflow-hidden">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 z-0 hero-image overflow-hidden">
          {/* Placeholder for actual image. In real app we use asset.coverImage */}
          <div className="hero-image-inner absolute inset-[-10%] bg-[#1C1208]" style={{
            backgroundImage: `radial-gradient(circle at center, rgba(212,168,83,0.15) 0%, rgba(13,10,6,1) 100%)`
          }}>
            <div className="absolute inset-0 opacity-20" style={{
               backgroundImage: 'linear-gradient(45deg, rgba(212,168,83,0.2) 25%, transparent 25%, transparent 50%, rgba(212,168,83,0.2) 50%, rgba(212,168,83,0.2) 75%, transparent 75%, transparent)',
               backgroundSize: '40px 40px'
            }} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B08] via-[#0E0B08]/80 to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 w-full">
          <button onClick={() => router.back()} className="back-btn flex items-center gap-2 text-[#A08B6E] hover:text-[#D4A853] transition-colors mb-8 text-sm uppercase tracking-widest" style={{ fontFamily: "'Courier New', monospace" }}>
            <ArrowLeft size={16} /> {t.back}
          </button>

          <div className="flex flex-wrap items-center gap-3 mb-4 asset-badge">
            <span className="badge-warisan capitalize">{t.categories[asset.category as keyof typeof t.categories]}</span>
            <div className="flex items-center gap-2 px-3 py-1 border" style={{ borderColor: `${statusColor[asset.statusExtinction]}40`, background: `${statusColor[asset.statusExtinction]}10` }}>
              <span className="w-2 h-2 rounded-full" style={{ background: statusColor[asset.statusExtinction] }} />
              <span className="text-xs uppercase tracking-widest" style={{ color: statusColor[asset.statusExtinction], fontFamily: "'Courier New', monospace" }}>{t.status[asset.statusExtinction as keyof typeof t.status]}</span>
            </div>
            {asset.featured && <span className="badge-warisan text-[#E8C878] border-[#E8C878]">{t.featured}</span>}
          </div>

          <h1 className="asset-title font-serif text-5xl md:text-6xl lg:text-7xl text-[#F2E8D5] mb-4 glow-gold-sm">
            {asset.title}
          </h1>
          <p className="asset-title text-[#D4A853] text-lg md:text-xl font-serif italic mb-6">
            "{asset.subtitle}"
          </p>

          <div className="asset-meta flex flex-wrap items-center gap-6 text-[#A08B6E] text-sm" style={{ fontFamily: "'Courier New', monospace" }}>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-[#D4A853]" />
              <span>{asset.region}, {asset.province}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye size={16} className="text-[#D4A853]" />
              <span>{asset.views.toLocaleString('id-ID')} {t.views}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-[#D4A853]" />
              <span>{asset.contributors} {t.contributors}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTENT SECTION ── */}
      <section className="max-w-5xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main Description */}
          <div className="lg:col-span-2 space-y-12">
            <div className="content-fade">
              <h2 className="font-serif text-2xl text-[#D4A853] mb-4">{t.aboutTitle}</h2>
              <p className="text-[#F2E8D5] text-lg leading-relaxed mb-6">
                {asset.description}
              </p>
              <p className="text-[#A08B6E] leading-relaxed">
                {t.aboutDescPart1} {asset.title.toLowerCase()} {t.aboutDescPart2} {asset.province}. {t.aboutDescPart3}
              </p>
            </div>

            <div className="content-fade glass-card p-8 border-l-4 border-l-[#4E8C66]">
              <h3 className="font-serif text-xl text-[#F2E8D5] mb-3">{t.statusTitle}</h3>
              <p className="text-[#A08B6E] text-sm leading-relaxed mb-4">
                {t.statusDesc1} <strong style={{ color: statusColor[asset.statusExtinction] }}>{t.status[asset.statusExtinction as keyof typeof t.status].toUpperCase()}</strong>. {t.statusDesc2}
              </p>
              <div className="w-full bg-[rgba(212,168,83,0.1)] h-1.5 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{
                  width: asset.statusExtinction === 'aman' ? '80%' : asset.statusExtinction === 'rentan' ? '40%' : '15%',
                  background: statusColor[asset.statusExtinction]
                }} />
              </div>
            </div>

            {asset.category === 'musik' || asset.category === 'tari' || asset.category === 'bahasa' ? (
              <div className="content-fade">
                <h2 className="font-serif text-2xl text-[#D4A853] mb-4">{t.audioTitle}</h2>
                <AudioPlayer trackId="gamelan-01" />
              </div>
            ) : null}

            <div className="content-fade">
              <h2 className="font-serif text-2xl text-[#D4A853] mb-4">{t.tagsTitle}</h2>
              <div className="flex flex-wrap gap-2">
                {asset.tags.map(tag => (
                  <Link href={`/arsip?q=${tag}`} key={tag} className="badge-warisan hover:bg-[rgba(212,168,83,0.1)] transition-colors">
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="content-fade glass-card p-6">
              <h3 className="font-serif text-xl text-[#F2E8D5] mb-4">{t.contribTitle}</h3>
              <p className="text-[#A08B6E] text-sm leading-relaxed mb-6">
                {t.contribDesc} {asset.title}{t.contribDesc2}
              </p>
              <Link href="/kontribusi" className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#D4A853] text-[#0E0B08] font-semibold text-xs tracking-widest uppercase hover:bg-[#E8C878] transition-colors">
                {t.btnAddData} <ArrowRight size={14} />
              </Link>
            </div>

            <div className="content-fade glass-card p-6">
              <h3 className="font-serif text-xl text-[#F2E8D5] mb-4">{t.sourceTitle}</h3>
              <p className="text-[#A08B6E] text-sm leading-relaxed mb-6">
                {t.sourceDesc}
              </p>
              <a 
                href={externalLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-[rgba(212,168,83,0.4)] text-[#D4A853] hover:bg-[rgba(212,168,83,0.1)] transition-colors text-xs tracking-widest uppercase font-semibold"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                {t.visitSite} <ExternalLink size={14} />
              </a>
            </div>

            <div className="content-fade glass-card p-6">
              <h3 className="font-serif text-xl text-[#F2E8D5] mb-4">{t.shareTitle}</h3>
              <div className="flex gap-3">
                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 py-3 border border-[rgba(212,168,83,0.3)] text-[#D4A853] hover:bg-[rgba(212,168,83,0.06)] transition-all duration-200 text-xs tracking-widest uppercase hover:border-[#D4A853]"
                >
                  <Share2 size={14} /> {t.shareTitle}
                </button>
                <button
                  onClick={handleLike}
                  className={`flex items-center justify-center w-12 border transition-all duration-300 ${
                    liked
                      ? 'border-[#C84535] bg-[rgba(239,68,68,0.15)] text-[#C84535]'
                      : 'border-[rgba(212,168,83,0.3)] text-[#D4A853] hover:bg-[rgba(239,68,68,0.08)] hover:border-[rgba(239,68,68,0.5)] hover:text-[#C84535]'
                  }`}
                  title={liked ? (lang === 'ID' ? 'Hapus dari favorit' : 'Remove from favorites') : (lang === 'ID' ? 'Tambah ke favorit' : 'Add to favorites')}
                >
                  <Heart size={14} fill={liked ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            <div className="content-fade glass-card p-6 border-t border-[rgba(212,168,83,0.3)]">
              <p className="text-[#D4A853] text-xs tracking-widest uppercase mb-1" style={{ fontFamily: "'Courier New', monospace" }}>{t.coordTitle}</p>
              <p className="text-[#F2E8D5] font-mono text-sm mb-4">
                {asset.regionCoords.lat.toFixed(4)}°, {asset.regionCoords.lng.toFixed(4)}°
              </p>
              <Link href="/atlas" className="flex items-center gap-2 text-xs text-[#A08B6E] hover:text-[#D4A853] transition-colors uppercase tracking-widest" style={{ fontFamily: "'Courier New', monospace" }}>
                <MapPin size={12} /> {t.viewAtlas}
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
