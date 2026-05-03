'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import gsap from 'gsap';
import { Menu, X, Globe, LogOut, User } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuthStore } from '@/store/useAuthStore';
import { supabase } from '@/lib/supabase';

const navLinks = {
  ID: [
    { href: '/', label: 'Beranda' },
    { href: '/atlas', label: 'Atlas' },
    { href: '/arsip', label: 'Arsip' },
    { href: '/kontribusi', label: 'Kontribusi' },
  ],
  EN: [
    { href: '/', label: 'Home' },
    { href: '/atlas', label: 'Atlas' },
    { href: '/arsip', label: 'Archive' },
    { href: '/kontribusi', label: 'Contribute' },
  ]
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const { user } = useAuthStore();
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (isOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-dark border-b border-[rgba(212,168,83,0.15)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <Image 
                  src="/logo.png" 
                  alt="ASTRA Logo" 
                  fill 
                  className="object-contain" 
                  sizes="48px"
                />
              </div>
              <span
                className="font-mono text-sm tracking-[0.2em] uppercase text-[#D4A853] group-hover:text-[#E8C878] transition-colors"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                ASTRA
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex flex-none items-center justify-center gap-8">
            {navLinks[lang as 'ID' | 'EN'].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs tracking-[0.15em] uppercase transition-all duration-300 relative group ${
                  pathname === link.href
                    ? 'text-[#D4A853]'
                    : 'text-[#A08B6E] hover:text-[#F2E8D5]'
                }`}
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#D4A853]" />
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#E8C878] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex flex-1 justify-end items-center gap-4">
            <button 
              onClick={() => {
                setLang(lang === 'ID' ? 'EN' : 'ID');
              }}
              className="p-2 text-[#A08B6E] hover:text-[#D4A853] transition-colors flex items-center gap-1"
            >
              <Globe size={16} />
              <span className="text-[10px] font-mono">{lang}</span>
            </button>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-[#A08B6E] text-xs font-mono flex items-center gap-2 border border-[rgba(212,168,83,0.2)] px-3 py-1.5 rounded-full">
                  <User size={12} /> {user.user_metadata?.full_name || user.email?.split('@')[0]}
                </span>
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="p-2 text-[#A08B6E] hover:text-[#C84535] transition-colors"
                  title={lang === 'ID' ? 'Keluar' : 'Logout'}
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-xs font-mono tracking-[0.15em] uppercase px-4 py-2 bg-[#D4A853] text-[#0E0B08] hover:bg-[#E8C878] transition-all duration-300 font-semibold"
              >
                {lang === 'ID' ? 'Masuk' : 'Login'}
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-[#D4A853] p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden glass-dark border-t border-[rgba(212,168,83,0.15)] px-6 py-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks[lang as 'ID' | 'EN'].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-xs tracking-[0.15em] uppercase py-2 border-b border-[rgba(212,168,83,0.1)] ${
                    pathname === link.href ? 'text-[#D4A853]' : 'text-[#A08B6E]'
                  }`}
                  style={{ fontFamily: "'Courier New', monospace" }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-3 mt-2">
                {!user ? (
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center text-xs font-mono tracking-widest uppercase py-2 bg-[#D4A853] text-[#0E0B08] font-semibold"
                  >
                    {lang === 'ID' ? 'Masuk' : 'Login'}
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      supabase.auth.signOut();
                      setIsOpen(false);
                    }}
                    className="w-full text-center text-xs font-mono tracking-widest uppercase py-2 border border-[#C84535] text-[#C84535] hover:bg-[#C84535] hover:text-white transition-colors"
                  >
                    {lang === 'ID' ? 'Keluar' : 'Logout'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
