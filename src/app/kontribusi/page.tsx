'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Check, ChevronRight, Upload, MapPin, Tag, FileText, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from '@/components/ui/Toast';

gsap.registerPlugin(useGSAP);

const categories = ['Bahasa Daerah', 'Seni Kriya', 'Musik Tradisional', 'Ritual & Upacara', 'Seni Tari', 'Kuliner Tradisional', 'Sastra Lisan', 'Permainan Rakyat'];
const provinces = ['Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Kepulauan Riau', 'Jambi', 'Bengkulu', 'Sumatera Selatan', 'Bangka Belitung', 'Lampung', 'Banten', 'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'DI Yogyakarta', 'Jawa Timur', 'Bali', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur', 'Kalimantan Barat', 'Kalimantan Tengah', 'Kalimantan Selatan', 'Kalimantan Timur', 'Kalimantan Utara', 'Sulawesi Utara', 'Sulawesi Tengah', 'Sulawesi Selatan', 'Sulawesi Tenggara', 'Gorontalo', 'Sulawesi Barat', 'Maluku', 'Maluku Utara', 'Papua Barat', 'Papua'];

const dict = {
  ID: {
    steps: [
      { id: 1, title: 'Informasi Dasar', icon: FileText, desc: 'Nama, kategori, dan lokasi' },
      { id: 2, title: 'Deskripsi & Media', icon: Upload, desc: 'Cerita mendalam dan lampiran' },
      { id: 3, title: 'Verifikasi & Kirim', icon: Send, desc: 'Tinjau sebelum dikirim' },
    ],
    categories: ['Bahasa Daerah', 'Seni Kriya', 'Musik Tradisional', 'Ritual & Upacara', 'Seni Tari', 'Kuliner Tradisional', 'Sastra Lisan', 'Permainan Rakyat'],
    extinctions: [
      { value: 'aman', label: 'Aman — Masih aktif dipraktikkan', color: '#4E8C66' },
      { value: 'rentan', label: 'Rentan — Praktisi berkurang', color: '#C8793A' },
      { value: 'kritis', label: 'Kritis — Hampir punah', color: '#C84535' },
    ],
    successTitle: "Kontribusi Terkirim!",
    successDesc1: "Terima kasih telah berkontribusi untuk pelestarian warisan budaya Indonesia.",
    successDesc2: "Tim moderator kami akan meninjau dan memverifikasi data yang Anda kirimkan dalam 3–5 hari kerja.",
    submittedAsset: "ASET DIAJUKAN",
    fallbackTitle: "Warisan Budaya Baru",
    btnAgain: "Kontribusi Lagi",
    badge: "Portal Kontribusi",
    title: "Bagikan Warisan",
    subtitle: "Dokumentasikan pengetahuan budaya yang Anda miliki dan bantu kami melestarikannya untuk generasi mendatang.",
    step1Title: "Informasi Dasar",
    nameLabel: "Nama Warisan Budaya *",
    namePlaceholder: "Contoh: Tari Pendet Bali",
    catLabel: "Kategori *",
    catPlaceholder: "Pilih kategori...",
    provLabel: "Provinsi *",
    provPlaceholder: "Pilih provinsi...",
    regionLabel: "Kabupaten / Kota / Daerah Spesifik",
    regionPlaceholder: "Contoh: Kabupaten Sleman, Desa Prambanan",
    statusLabel: "Status Kepunahan *",
    tagLabel: "Tag (pisahkan dengan koma)",
    tagPlaceholder: "Contoh: UNESCO, Ritual, Tradisi Lisan",
    step2Title: "Deskripsi & Media",
    descLabel: "Deskripsi Umum *",
    descPlaceholder: "Jelaskan secara singkat tentang warisan budaya ini, karakteristik uniknya, dan mengapa penting untuk dilestarikan...",
    histLabel: "Sejarah & Asal-Usul",
    histPlaceholder: "Ceritakan sejarah dan asal-usul warisan budaya ini selengkap mungkin...",
    pracLabel: "Cara Praktik / Pelaksanaan",
    pracPlaceholder: "Bagaimana warisan budaya ini dipraktikkan? Siapa yang terlibat? Kapan dilakukan?",
    mediaLabel: "Lampiran Media",
    mediaDrop: "Seret & lepas file di sini",
    mediaTypes: "Dukung JPG, PNG, MP3, MP4, PDF — maks 50MB",
    btnFile: "Pilih File",
    mediaLink: "Atau tuliskan link/URL ke media eksternal (Google Drive, YouTube, dll.)...",
    step3Title: "Tinjau & Kirim",
    summaryTitle: "Ringkasan Kontribusi",
    lblEmpty: "—",
    lblName: "Nama",
    lblCat: "Kategori",
    lblProv: "Provinsi",
    lblStat: "Status",
    lblDesc: "Deskripsi",
    contribName: "Nama Kontributor",
    contribNamePl: "Nama Anda",
    email: "Email",
    emailPl: "email@contoh.com",
    agree: "Saya menyatakan bahwa informasi yang saya berikan adalah benar dan saya memiliki hak untuk berbagi konten ini. Saya setuju dengan",
    terms: "Syarat & Ketentuan",
    btnBack: "Kembali",
    btnNext: "Lanjut",
    btnSubmit: "Kirim Kontribusi",
  },
  EN: {
    steps: [
      { id: 1, title: 'Basic Information', icon: FileText, desc: 'Name, category, and location' },
      { id: 2, title: 'Description & Media', icon: Upload, desc: 'In-depth story and attachments' },
      { id: 3, title: 'Verify & Submit', icon: Send, desc: 'Review before sending' },
    ],
    categories: ['Local Language', 'Craft Arts', 'Traditional Music', 'Rituals & Ceremonies', 'Dance', 'Traditional Culinary', 'Oral Literature', 'Folk Games'],
    extinctions: [
      { value: 'aman', label: 'Safe — Still actively practiced', color: '#4E8C66' },
      { value: 'rentan', label: 'Vulnerable — Practitioners decreasing', color: '#C8793A' },
      { value: 'kritis', label: 'Critical — Almost extinct', color: '#C84535' },
    ],
    successTitle: "Contribution Submitted!",
    successDesc1: "Thank you for contributing to the preservation of Indonesian cultural heritage.",
    successDesc2: "Our moderator team will review and verify the data you submitted within 3–5 working days.",
    submittedAsset: "SUBMITTED ASSET",
    fallbackTitle: "New Cultural Heritage",
    btnAgain: "Contribute Again",
    badge: "Contribution Portal",
    title: "Share Heritage",
    subtitle: "Document the cultural knowledge you have and help us preserve it for future generations.",
    step1Title: "Basic Information",
    nameLabel: "Cultural Heritage Name *",
    namePlaceholder: "Example: Balinese Pendet Dance",
    catLabel: "Category *",
    catPlaceholder: "Select category...",
    provLabel: "Province *",
    provPlaceholder: "Select province...",
    regionLabel: "Regency / City / Specific Area",
    regionPlaceholder: "Example: Sleman Regency, Prambanan Village",
    statusLabel: "Extinction Status *",
    tagLabel: "Tags (comma separated)",
    tagPlaceholder: "Example: UNESCO, Ritual, Oral Tradition",
    step2Title: "Description & Media",
    descLabel: "General Description *",
    descPlaceholder: "Briefly explain this cultural heritage, its unique characteristics, and why it is important to preserve...",
    histLabel: "History & Origins",
    histPlaceholder: "Tell the history and origins of this cultural heritage as completely as possible...",
    pracLabel: "Practice / Execution Method",
    pracPlaceholder: "How is this cultural heritage practiced? Who is involved? When is it done?",
    mediaLabel: "Media Attachments",
    mediaDrop: "Drag & drop files here",
    mediaTypes: "Supports JPG, PNG, MP3, MP4, PDF — max 50MB",
    btnFile: "Choose File",
    mediaLink: "Or enter a link/URL to external media (Google Drive, YouTube, etc.)...",
    step3Title: "Review & Submit",
    summaryTitle: "Contribution Summary",
    lblEmpty: "—",
    lblName: "Name",
    lblCat: "Category",
    lblProv: "Province",
    lblStat: "Status",
    lblDesc: "Description",
    contribName: "Contributor Name",
    contribNamePl: "Your Name",
    email: "Email",
    emailPl: "email@example.com",
    agree: "I declare that the information I provide is true and I have the right to share this content. I agree to the",
    terms: "Terms & Conditions",
    btnBack: "Back",
    btnNext: "Next",
    btnSubmit: "Submit Contribution",
  }
};

export default function KontribusiPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: '', category: '', province: '', region: '', extinctionStatus: '',
    description: '', history: '', practiceInfo: '', tags: '', mediaNote: '',
    contactName: '', contactEmail: '', agreeTerms: false,
  });
  const { lang } = useLanguage();
  const t = dict[lang];
  const router = useRouter();
  const { user, loading } = useAuthStore();
  const { showToast } = useToast();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!loading && !user && !hasRedirected.current) {
      hasRedirected.current = true;
      showToast(lang === 'ID' ? 'Harap login terlebih dahulu untuk berkontribusi.' : 'Please login first to contribute.', 'error');
      router.push('/login');
    }
  }, [user, loading, router, showToast, lang]);

  useGSAP(() => {
    if (!loading && user) {
      gsap.fromTo('.contrib-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });
      gsap.fromTo('.step-card', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.4 });
    }
  }, { scope: containerRef, dependencies: [loading, user] });

  const update = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const nextStep = () => {
    const el = document.querySelector('.form-panel');
    if (el) {
      gsap.fromTo(el, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' });
    }
    setStep((s) => Math.min(s + 1, 3));
  };

  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 1));
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const { error } = await supabase.from('contributions').insert({
        user_name: form.contactName || user?.user_metadata?.full_name || 'Anonymous',
        user_email: form.contactEmail || user?.email || 'no-email@example.com',
        asset_name: form.title,
        category: form.category,
        region: form.region || form.province,
        description: form.description,
        status: 'pending'
      });

      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit contribution:", err);
      alert("Failed to submit contribution. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-[rgba(212,168,83,0.05)] border border-[rgba(212,168,83,0.15)] text-[#F2E8D5] placeholder-[#A08B6E] text-sm focus:outline-none focus:border-[#D4A853] transition-colors";
  const labelClass = "text-[#A08B6E] text-xs tracking-widest uppercase mb-2 block";

  if (loading || !user) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D4A853] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center max-w-lg px-6">
          <div className="w-20 h-20 border-2 border-[#4E8C66] flex items-center justify-center mx-auto mb-6" style={{ boxShadow: '0 0 30px rgba(16,185,129,0.3)' }}>
            <Check size={32} className="text-[#4E8C66]" />
          </div>
          <h2 className="font-serif text-4xl text-[#F2E8D5] mb-4">{t.successTitle}</h2>
          <p className="text-[#A08B6E] leading-relaxed mb-3">
            {t.successDesc1}
          </p>
          <p className="text-[#A08B6E] text-sm mb-8">
            {t.successDesc2}
          </p>
          <div className="glass-card p-4 mb-8 text-left">
            <p className="text-[#D4A853] text-xs mb-1" style={{ fontFamily: "'Courier New', monospace" }}>{t.submittedAsset}</p>
            <p className="text-[#F2E8D5] font-serif text-xl">{form.title || t.fallbackTitle}</p>
            <p className="text-[#A08B6E] text-sm">{form.category} · {form.province}</p>
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setSubmitted(false); setStep(1); setForm({ title: '', category: '', province: '', region: '', extinctionStatus: '', description: '', history: '', practiceInfo: '', tags: '', mediaNote: '', contactName: '', contactEmail: '', agreeTerms: false }); }}
              className="px-6 py-3 border border-[rgba(212,168,83,0.3)] text-[#D4A853] text-sm tracking-widest uppercase hover:bg-[rgba(212,168,83,0.06)] transition-colors">
              {t.btnAgain}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="contrib-title text-center mb-12">
          <span className="badge-warisan mb-4 inline-block">{t.badge}</span>
          <h1 className="font-serif text-5xl text-[#F2E8D5] mt-4 mb-4">{t.title}</h1>
          <p className="text-[#A08B6E] max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {t.steps.map((s, i) => (
            <div key={s.id} className="step-card flex items-center">
              <div className={`flex items-center gap-3 px-6 py-4 border transition-all duration-300 ${
                step === s.id
                  ? 'border-[#D4A853] bg-[rgba(212,168,83,0.1)] text-[#D4A853]'
                  : step > s.id
                  ? 'border-[rgba(16,185,129,0.4)] bg-[rgba(16,185,129,0.06)] text-[#4E8C66]'
                  : 'border-[rgba(212,168,83,0.1)] text-[#A08B6E]'
              }`}>
                <div className={`w-7 h-7 flex items-center justify-center text-xs font-bold ${
                  step > s.id ? 'bg-[#4E8C66] text-[#0E0B08]' : step === s.id ? 'bg-[#D4A853] text-[#0E0B08]' : 'border border-[rgba(212,168,83,0.2)] text-[#A08B6E]'
                }`}>
                  {step > s.id ? <Check size={12} /> : s.id}
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Courier New', monospace" }}>{s.title}</p>
                  <p className="text-xs opacity-60">{s.desc}</p>
                </div>
              </div>
              {i < t.steps.length - 1 && (
                <div className={`w-8 h-px ${step > s.id ? 'bg-[#4E8C66]' : 'bg-[rgba(212,168,83,0.15)]'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Panel */}
        <div className="form-panel glass-card p-8">

          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-[#F2E8D5] mb-6">{t.step1Title}</h2>

              <div>
                <label className={labelClass} style={{ fontFamily: "'Courier New', monospace" }}>{t.nameLabel}</label>
                <input type="text" placeholder={t.namePlaceholder} value={form.title} onChange={(e) => update('title', e.target.value)} className={inputClass} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass} style={{ fontFamily: "'Courier New', monospace" }}>{t.catLabel}</label>
                  <select value={form.category} onChange={(e) => update('category', e.target.value)} className={inputClass + ' cursor-pointer'}>
                    <option value="" className="bg-[#1C1208]">{t.catPlaceholder}</option>
                    {t.categories.map((c) => <option key={c} value={c} className="bg-[#1C1208]">{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass} style={{ fontFamily: "'Courier New', monospace" }}>{t.provLabel}</label>
                  <select value={form.province} onChange={(e) => update('province', e.target.value)} className={inputClass + ' cursor-pointer'}>
                    <option value="" className="bg-[#1C1208]">{t.provPlaceholder}</option>
                    {provinces.map((p) => <option key={p} value={p} className="bg-[#1C1208]">{p}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass} style={{ fontFamily: "'Courier New', monospace" }}>{t.regionLabel}</label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A08B6E]" />
                  <input type="text" placeholder={t.regionPlaceholder} value={form.region} onChange={(e) => update('region', e.target.value)} className={inputClass + ' pl-10'} />
                </div>
              </div>

              <div>
                <label className={labelClass} style={{ fontFamily: "'Courier New', monospace" }}>{t.statusLabel}</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {t.extinctions.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => update('extinctionStatus', level.value)}
                      className={`p-4 border text-left transition-all duration-200 ${
                        form.extinctionStatus === level.value ? 'border-opacity-100' : 'border-[rgba(212,168,83,0.1)] hover:border-[rgba(212,168,83,0.25)]'
                      }`}
                      style={form.extinctionStatus === level.value ? { borderColor: level.color, background: `${level.color}10` } : {}}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-3 h-3 rounded-full" style={{ background: level.color }} />
                        <span className="text-xs capitalize font-medium" style={{ color: level.color, fontFamily: "'Courier New', monospace" }}>{level.value}</span>
                      </div>
                      <p className="text-[#A08B6E] text-xs leading-relaxed">{level.label.split('—')[1]}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass} style={{ fontFamily: "'Courier New', monospace" }}>
                  <Tag size={10} className="inline mr-1" /> {t.tagLabel}
                </label>
                <input type="text" placeholder={t.tagPlaceholder} value={form.tags} onChange={(e) => update('tags', e.target.value)} className={inputClass} />
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-[#F2E8D5] mb-6">{t.step2Title}</h2>

              <div>
                <label className={labelClass} style={{ fontFamily: "'Courier New', monospace" }}>{t.descLabel}</label>
                <textarea
                  rows={4}
                  placeholder={t.descPlaceholder}
                  value={form.description}
                  onChange={(e) => update('description', e.target.value)}
                  className={inputClass + ' resize-none'}
                />
              </div>

              <div>
                <label className={labelClass} style={{ fontFamily: "'Courier New', monospace" }}>{t.histLabel}</label>
                <textarea
                  rows={4}
                  placeholder={t.histPlaceholder}
                  value={form.history}
                  onChange={(e) => update('history', e.target.value)}
                  className={inputClass + ' resize-none'}
                />
              </div>

              <div>
                <label className={labelClass} style={{ fontFamily: "'Courier New', monospace" }}>{t.pracLabel}</label>
                <textarea
                  rows={3}
                  placeholder={t.pracPlaceholder}
                  value={form.practiceInfo}
                  onChange={(e) => update('practiceInfo', e.target.value)}
                  className={inputClass + ' resize-none'}
                />
              </div>

              {/* Upload area */}
              <div>
                <label className={labelClass} style={{ fontFamily: "'Courier New', monospace" }}>{t.mediaLabel}</label>
                <div className="border border-dashed border-[rgba(212,168,83,0.25)] p-8 text-center hover:border-[rgba(212,168,83,0.5)] transition-colors cursor-pointer group">
                  <Upload size={24} className="mx-auto mb-3 text-[#A08B6E] group-hover:text-[#D4A853] transition-colors" />
                  <p className="text-[#F2E8D5] text-sm mb-1">{t.mediaDrop}</p>
                  <p className="text-[#A08B6E] text-xs">{t.mediaTypes}</p>
                  <button className="mt-4 text-xs tracking-widest uppercase px-4 py-2 border border-[rgba(212,168,83,0.3)] text-[#D4A853] hover:bg-[rgba(212,168,83,0.06)] transition-colors" style={{ fontFamily: "'Courier New', monospace" }}>
                    {t.btnFile}
                  </button>
                </div>
                <textarea
                  rows={2}
                  placeholder={t.mediaLink}
                  value={form.mediaNote}
                  onChange={(e) => update('mediaNote', e.target.value)}
                  className={inputClass + ' resize-none mt-3'}
                />
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-[#F2E8D5] mb-6">{t.step3Title}</h2>

              {/* Summary */}
              <div className="glass-card p-6 space-y-4">
                <h3 className="text-[#D4A853] text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'Courier New', monospace" }}>{t.summaryTitle}</h3>
                {[
                  { label: t.lblName, val: form.title || t.lblEmpty },
                  { label: t.lblCat, val: form.category || t.lblEmpty },
                  { label: t.lblProv, val: form.province || t.lblEmpty },
                  { label: t.lblStat, val: form.extinctionStatus || t.lblEmpty },
                ].map(({ label, val }) => (
                  <div key={label} className="flex items-center gap-4 pb-3 border-b border-[rgba(212,168,83,0.06)] last:border-0 last:pb-0">
                    <span className="text-[#A08B6E] text-xs w-24 flex-shrink-0" style={{ fontFamily: "'Courier New', monospace" }}>{label}</span>
                    <span className="text-[#F2E8D5] text-sm">{val}</span>
                  </div>
                ))}
                {form.description && (
                  <div className="pt-2">
                    <span className="text-[#A08B6E] text-xs block mb-2" style={{ fontFamily: "'Courier New', monospace" }}>{t.lblDesc}</span>
                    <p className="text-[#F2E8D5] text-sm leading-relaxed line-clamp-3">{form.description}</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} style={{ fontFamily: "'Courier New', monospace" }}>{t.contribName}</label>
                  <input type="text" placeholder={t.contribNamePl} value={form.contactName} onChange={(e) => update('contactName', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass} style={{ fontFamily: "'Courier New', monospace" }}>{t.email}</label>
                  <input type="email" placeholder={t.emailPl} value={form.contactEmail} onChange={(e) => update('contactEmail', e.target.value)} className={inputClass} />
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div
                  onClick={() => update('agreeTerms', !form.agreeTerms)}
                  className={`w-5 h-5 border flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${form.agreeTerms ? 'border-[#D4A853] bg-[#D4A853]' : 'border-[rgba(212,168,83,0.3)]'}`}
                >
                  {form.agreeTerms && <Check size={12} className="text-[#0E0B08]" />}
                </div>
                <span className="text-[#A08B6E] text-sm leading-relaxed group-hover:text-[#F2E8D5] transition-colors">
                  {t.agree} <span className="text-[#D4A853]">{t.terms}</span> RuangWarisan.
                </span>
              </label>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[rgba(212,168,83,0.1)]">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="px-6 py-3 border border-[rgba(212,168,83,0.2)] text-[#A08B6E] text-sm tracking-widest uppercase disabled:opacity-30 hover:border-[rgba(212,168,83,0.4)] hover:text-[#F2E8D5] transition-all"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              {t.btnBack}
            </button>
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((n) => (
                <div key={n} className={`h-1 transition-all duration-300 ${step === n ? 'w-8 bg-[#D4A853]' : step > n ? 'w-4 bg-[#4E8C66]' : 'w-4 bg-[rgba(212,168,83,0.2)]'}`} />
              ))}
            </div>
            {step < 3 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 bg-[#D4A853] text-[#0E0B08] font-semibold text-sm tracking-widest uppercase hover:bg-[#E8C878] transition-colors"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                {t.btnNext} <ChevronRight size={14} />
              </button>
            ) : (
                <button 
                  onClick={handleSubmit}
                  disabled={!form.agreeTerms || submitting}
                  className={`px-8 py-3 bg-[#D4A853] text-[#0E0B08] font-bold text-sm tracking-widest uppercase transition-all ${
                    !form.agreeTerms || submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#E5CD82]'
                  }`}
                >
                  {submitting ? 'Mengirim...' : t.btnSubmit}
                </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
