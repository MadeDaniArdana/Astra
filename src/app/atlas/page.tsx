'use client';

import { useState, useRef, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';
import { MapPin, Search, Filter, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useDataStore } from '@/store/useDataStore';
import type { Category, CulturalAsset } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(useGSAP);

const geoUrl = "/indonesia.json";

const statusColor: Record<string, string> = { aman: '#4E8C66', rentan: '#C8793A', kritis: '#C84535', punah: '#6B7280' };

const dict = {
  ID: {
    badge: "Registri Geospasial",
    title: "Atlas Budaya",
    desc: "Peta persebaran warisan budaya Indonesia. Temukan aset budaya berdasarkan wilayah dan status kepunahannya.",
    filterCat: "Filter Kategori",
    filterStatus: "Status Kepunahan",
    all: "Semua",
    shown: "Aset Ditampilkan",
    empty: "Tidak ada aset yang sesuai kriteria.",
    helper: "Peta Interaktif: Scroll untuk Zoom, Drag untuk Geser",
    categories: {
      all: 'Semua Kategori',
      bahasa: 'Bahasa',
      kriya: 'Seni Kriya',
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
    badge: "Geospatial Registry",
    title: "Cultural Atlas",
    desc: "Map of Indonesian cultural heritage distribution. Discover cultural assets by region and extinction status.",
    filterCat: "Category Filter",
    filterStatus: "Extinction Status",
    all: "All",
    shown: "Assets Shown",
    empty: "No assets match the criteria.",
    helper: "Interactive Map: Scroll to Zoom, Drag to Pan",
    categories: {
      all: 'All Categories',
      bahasa: 'Language',
      kriya: 'Craft Arts',
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

export default function AtlasPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [activeStatus, setActiveStatus] = useState<string | 'all'>('all');
  const [hoveredAsset, setHoveredAsset] = useState<CulturalAsset | null>(null);
  const { lang } = useLanguage();
  const t = dict[lang];
  const { assets: culturalAssets, loading } = useDataStore();
  const router = useRouter();

  const categoryOptions: { value: Category | 'all' }[] = [
    { value: 'all' },
    { value: 'bahasa' },
    { value: 'kriya' },
    { value: 'musik' },
    { value: 'ritual' },
    { value: 'tari' },
  ];

  useGSAP(() => {
    gsap.fromTo('.atlas-sidebar', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' });
    gsap.fromTo('.atlas-map-container', { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 1, ease: 'power2.out', delay: 0.2 });
  }, { scope: containerRef });

  const filtered = useMemo(() => culturalAssets.filter((a) => {
    if (activeCategory !== 'all' && a.category !== activeCategory) return false;
    if (activeStatus !== 'all' && a.statusExtinction !== activeStatus) return false;
    return true;
  }), [activeCategory, activeStatus, culturalAssets]);

  return (
    <div ref={containerRef} className="min-h-screen pt-24 pb-0 md:h-screen md:overflow-hidden flex flex-col md:flex-row">
      
      {/* SIDEBAR */}
      <div className="atlas-sidebar w-full md:w-[400px] lg:w-[450px] p-6 flex flex-col h-full border-r border-[rgba(212,168,83,0.1)] bg-[#0E0B08] relative z-10">
        <div className="mb-8">
          <span className="badge-warisan mb-4 inline-block">{t.badge}</span>
          <h1 className="font-serif text-4xl text-[#F2E8D5] mb-2">{t.title}</h1>
          <p className="text-[#A08B6E] text-sm leading-relaxed">
            {t.desc}
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-6 mb-8 flex-shrink-0">
          <div>
            <label className="text-[#A08B6E] text-xs tracking-widest uppercase mb-3 flex items-center gap-2" style={{ fontFamily: "'Courier New', monospace" }}>
              <Filter size={12} /> {t.filterCat}
            </label>
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value as Category | 'all')}
              className="w-full bg-[rgba(212,168,83,0.05)] border border-[rgba(212,168,83,0.2)] text-[#F2E8D5] p-3 text-sm focus:outline-none focus:border-[#D4A853] cursor-pointer"
            >
              {categoryOptions.map((c) => <option key={c.value} value={c.value} className="bg-[#1C1208]">{t.categories[c.value as keyof typeof t.categories]}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[#A08B6E] text-xs tracking-widest uppercase mb-3 block" style={{ fontFamily: "'Courier New', monospace" }}>
              {t.filterStatus}
            </label>
            <div className="flex flex-wrap gap-2">
              {['all', 'aman', 'rentan', 'kritis', 'punah'].map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={`text-xs px-3 py-1.5 border transition-colors capitalize ${
                    activeStatus === status 
                      ? 'border-[#D4A853] text-[#D4A853] bg-[rgba(212,168,83,0.1)]' 
                      : 'border-[rgba(212,168,83,0.2)] text-[#A08B6E] hover:border-[rgba(212,168,83,0.4)] hover:text-[#F2E8D5]'
                  }`}
                  style={{ fontFamily: "'Courier New', monospace" }}
                >
                  {status === 'all' ? t.all : t.status[status as keyof typeof t.status]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* List Results */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
          <p className="text-[#D4A853] text-xs tracking-widest uppercase mb-4 sticky top-0 bg-[#0E0B08] py-2" style={{ fontFamily: "'Courier New', monospace" }}>
            {filtered.length} {t.shown}
          </p>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-6 h-6 border-2 border-[#D4A853] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {filtered.map((asset) => (
                <div 
                  key={asset.id} 
                  className="glass-card p-4 group cursor-pointer border border-[rgba(212,168,83,0.1)] hover:border-[rgba(212,168,83,0.3)] transition-colors"
                  onMouseEnter={() => setHoveredAsset(asset)}
                  onMouseLeave={() => setHoveredAsset(null)}
                  onClick={() => router.push(`/arsip/${asset.id}`)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs text-[#A08B6E] capitalize" style={{ fontFamily: "'Courier New', monospace" }}>{t.categories[asset.category as keyof typeof t.categories]}</span>
                    <span className="w-2 h-2 rounded-full" style={{ background: statusColor[asset.statusExtinction] }} />
                  </div>
                  <h3 className="font-serif text-lg text-[#F2E8D5] group-hover:text-[#D4A853] transition-colors">{asset.title}</h3>
                  <p className="text-[#A08B6E] text-xs mt-2 flex items-center gap-1">
                    <MapPin size={10} /> {asset.region}
                  </p>
                  <div className="flex items-center gap-1 mt-3 text-[#D4A853] text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontFamily: "'Courier New', monospace" }}>
                    <ExternalLink size={10} />
                    <span>{lang === 'ID' ? 'Lihat Detail' : 'View Detail'}</span>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-[#A08B6E] text-sm">{t.empty}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* MAP AREA */}
      <div className="atlas-map-container flex-1 relative bg-[#0E0B08] overflow-hidden min-h-[50vh] md:min-h-full">
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{
          backgroundImage: 'linear-gradient(rgba(212,168,83,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        <div className="w-full h-full absolute inset-0">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 1200, center: [118, -2] }}
            style={{ width: "100%", height: "100%" }}
          >
            <ZoomableGroup zoom={1} minZoom={0.5} maxZoom={5}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      className="map-region"
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {!loading && filtered.map((asset) => {
                const isHovered = hoveredAsset?.id === asset.id;
                return (
                  <Marker
                    key={asset.id}
                    coordinates={[asset.regionCoords.lng, asset.regionCoords.lat]}
                    onMouseEnter={() => setHoveredAsset(asset)}
                    onMouseLeave={() => setHoveredAsset(null)}
                    onClick={() => router.push(`/arsip/${asset.id}`)}
                  >
                    <g>
                      <circle
                        r={isHovered ? 8 : 4}
                        fill={statusColor[asset.statusExtinction]}
                        className="transition-all duration-300 cursor-pointer"
                        style={{ filter: `drop-shadow(0 0 ${isHovered ? '8px' : '4px'} ${statusColor[asset.statusExtinction]})` }}
                      />
                      {isHovered && (
                        <circle
                          r={16}
                          fill="none"
                          stroke={statusColor[asset.statusExtinction]}
                          strokeWidth="1"
                          className="animate-ping"
                          opacity={0.5}
                        />
                      )}
                    </g>
                  </Marker>
                );
              })}
            </ZoomableGroup>
          </ComposableMap>
        </div>

        {/* Floating Tooltip */}
        {hoveredAsset && (
          <div className="absolute top-6 right-6 w-80 glass-card p-6 pointer-events-none z-20 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full" style={{ background: statusColor[hoveredAsset.statusExtinction] }} />
              <span className="text-xs uppercase tracking-widest" style={{ color: statusColor[hoveredAsset.statusExtinction], fontFamily: "'Courier New', monospace" }}>
                {t.status[hoveredAsset.statusExtinction as keyof typeof t.status]}
              </span>
            </div>
            <h3 className="font-serif text-2xl text-[#D4A853] mb-1">{hoveredAsset.title}</h3>
            <p className="text-[#F2E8D5] text-sm mb-3">{t.categories[hoveredAsset.category as keyof typeof t.categories]}</p>
            <div className="flex items-center gap-2 text-[#A08B6E] text-xs mb-4" style={{ fontFamily: "'Courier New', monospace" }}>
              <MapPin size={12} />
              {hoveredAsset.region}, {hoveredAsset.province}
            </div>
            <p className="text-[#A08B6E] text-sm leading-relaxed line-clamp-3 mb-4">
              {hoveredAsset.description}
            </p>
            <div className="flex items-center gap-1 text-[#D4A853] text-xs pointer-events-auto" style={{ fontFamily: "'Courier New', monospace" }}>
              <ExternalLink size={11} />
              <Link href={`/arsip/${hoveredAsset.id}`} className="hover:text-[#E8C878] transition-colors">
                {lang === 'ID' ? 'Klik marker untuk lihat detail' : 'Click marker to view detail'}
              </Link>
            </div>
          </div>
        )}
        
        {/* Helper Note */}
        <div className="absolute bottom-6 right-6 text-[#A08B6E] text-xs bg-[rgba(13,10,6,0.8)] px-4 py-2 border border-[rgba(212,168,83,0.2)]" style={{ fontFamily: "'Courier New', monospace" }}>
          {t.helper}
        </div>
      </div>

    </div>
  );
}
