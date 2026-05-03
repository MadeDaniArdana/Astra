'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const dict = {
  ID: {
    title: "Selamat Datang",
    subtitle: "Masuk untuk berkontribusi pada pelestarian budaya",
    google: "Lanjutkan dengan Google",
    github: "Lanjutkan dengan GitHub",
    or: "ATAU",
    email: "Email",
    password: "Kata Sandi",
    loginBtn: "Masuk",
    noAccount: "Belum punya akun?",
    registerLink: "Daftar gratis"
  },
  EN: {
    title: "Welcome Back",
    subtitle: "Log in to contribute to cultural preservation",
    google: "Continue with Google",
    github: "Continue with GitHub",
    or: "OR",
    email: "Email",
    password: "Password",
    loginBtn: "Log In",
    noAccount: "Don't have an account?",
    registerLink: "Sign up for free"
  }
};

export default function LoginPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = dict[lang];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    } else {
      router.push('/');
    }
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/`,
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-[#D4A853] opacity-[0.04] blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-60 h-60 rounded-full bg-[#6B72C8] opacity-[0.04] blur-[80px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="ASTRA Logo" 
                fill 
                className="object-contain" 
                sizes="48px"
              />
            </div>
            <span className="font-mono text-sm tracking-[0.2em] uppercase text-[#D4A853]">ASTRA</span>
          </Link>
          <h1 className="font-serif text-3xl text-[#F2E8D5] mb-2">{t.title}</h1>
          <p className="text-[#A08B6E] text-sm">{t.subtitle}</p>
        </div>

        <div className="glass-card p-8">
          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            {[ 
              { label: t.github, icon: '⚫', provider: 'github' as const },
            ].map(({ label, icon, provider }) => (
              <button
                key={label}
                onClick={() => handleOAuth(provider)}
                className="w-full flex items-center gap-3 px-4 py-3 border border-[rgba(212,168,83,0.2)] text-[#F2E8D5] text-sm hover:border-[rgba(212,168,83,0.4)] hover:bg-[rgba(212,168,83,0.04)] transition-all duration-200"
              >
                <span>{icon}</span>
                <span className="flex-1 text-center">{label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[rgba(212,168,83,0.1)]" />
            <span className="text-[#A08B6E] text-xs" style={{ fontFamily: "'Courier New', monospace" }}>{t.or}</span>
            <div className="flex-1 h-px bg-[rgba(212,168,83,0.1)]" />
          </div>

          {/* Email Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center">
                {error}
              </div>
            )}
            <div>
              <label className="text-[#A08B6E] text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: "'Courier New', monospace" }}>{t.email}</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@contoh.com" 
                className="w-full px-4 py-3 bg-[rgba(212,168,83,0.05)] border border-[rgba(212,168,83,0.15)] text-[#F2E8D5] placeholder-[#A08B6E] text-sm focus:outline-none focus:border-[#D4A853] transition-colors" 
              />
            </div>
            <div>
              <label className="text-[#A08B6E] text-xs tracking-widest uppercase block mb-2" style={{ fontFamily: "'Courier New', monospace" }}>{t.password}</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full px-4 py-3 bg-[rgba(212,168,83,0.05)] border border-[rgba(212,168,83,0.15)] text-[#F2E8D5] placeholder-[#A08B6E] text-sm focus:outline-none focus:border-[#D4A853] transition-colors" 
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#D4A853] text-[#0E0B08] font-semibold text-sm tracking-widest uppercase hover:bg-[#E8C878] transition-colors mt-2 disabled:opacity-50"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <>{t.loginBtn} <ArrowRight size={14} /></>}
            </button>
          </form>

          <p className="text-center text-[#A08B6E] text-sm mt-6">
            {t.noAccount}{' '}
            <Link href="/register" className="text-[#D4A853] hover:text-[#E8C878] transition-colors">{t.registerLink}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
