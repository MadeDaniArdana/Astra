'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Globe, Link2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const footerLinks = {
  ID: {
    Platform: [
      { label: 'Beranda', href: '/' },
      { label: 'Atlas Budaya', href: '/atlas' },
      { label: 'Arsip Media', href: '/arsip' },
      { label: 'Kontribusi', href: '/kontribusi' },
    ],
    Kategori: [
      { label: 'Bahasa Daerah', href: '/arsip?category=bahasa' },
      { label: 'Seni Kriya', href: '/arsip?category=kriya' },
      { label: 'Musik Tradisional', href: '/arsip?category=musik' },
      { label: 'Ritual & Upacara', href: '/arsip?category=ritual' },
    ],
    Tentang: [
      { label: 'Tentang Kami', href: '#' },
      { label: 'Misi Pelestarian', href: '#' },
      { label: 'Kebijakan Privasi', href: '#' },
      { label: 'Syarat Layanan', href: '#' },
    ],
  },
  EN: {
    Platform: [
      { label: 'Home', href: '/' },
      { label: 'Cultural Atlas', href: '/atlas' },
      { label: 'Media Archive', href: '/arsip' },
      { label: 'Contribute', href: '/kontribusi' },
    ],
    Category: [
      { label: 'Local Languages', href: '/arsip?category=bahasa' },
      { label: 'Craft Arts', href: '/arsip?category=kriya' },
      { label: 'Traditional Music', href: '/arsip?category=musik' },
      { label: 'Rituals & Ceremonies', href: '/arsip?category=ritual' },
    ],
    About: [
      { label: 'About Us', href: '#' },
      { label: 'Preservation Mission', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  }
};

export default function Footer() {
  const { lang } = useLanguage();
  
  return (
    <footer className="border-t border-[rgba(212,168,83,0.1)] bg-[#0E0B08]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6 group">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Image 
                  src="/logo.png" 
                  alt="ASTRA Logo" 
                  fill 
                  className="object-contain opacity-90 group-hover:opacity-100 transition-opacity" 
                  sizes="40px"
                />
              </div>
              <span
                className="font-mono text-sm tracking-[0.2em] uppercase text-[#D4A853]"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                ASTRA
              </span>
            </div>
            <p className="text-[#A08B6E] text-sm leading-relaxed mb-6 max-w-xs">
              {lang === 'ID' 
                ? 'Platform museum digital untuk mendokumentasikan, melestarikan, dan mempopulerkan warisan budaya Indonesia yang hampir punah.'
                : 'Digital museum platform to document, preserve, and popularize endangered Indonesian cultural heritage.'}
            </p>
            <div className="flex gap-4">
              {[Mail, Globe, Link2].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 border border-[rgba(212,168,83,0.2)] flex items-center justify-center text-[#A08B6E] hover:text-[#D4A853] hover:border-[#D4A853] transition-all duration-300"
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks[lang]).map(([section, links]) => (
            <div key={section}>
              <h4
                className="text-[#D4A853] text-xs tracking-[0.2em] uppercase mb-4"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#A08B6E] text-sm hover:text-[#F2E8D5] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="divider-gold" />

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p
          className="text-[#A08B6E] text-xs tracking-widest"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          {lang === 'ID' ? '© 2025 ASTRA. MENJAGA WARISAN MELALUI TEKNOLOGI.' : '© 2025 ASTRA. PRESERVING HERITAGE THROUGH TECHNOLOGY.'}
        </p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4E8C66] animate-pulse" />
          <span
            className="text-[#A08B6E] text-xs tracking-widest"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            {lang === 'ID' ? 'SISTEM AKTIF' : 'SYSTEM ACTIVE'}
          </span>
        </div>
      </div>
    </footer>
  );
}
