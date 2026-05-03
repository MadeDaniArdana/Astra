import type { Metadata } from 'next';
import { Lexend, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

import Providers from './Providers';

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RuangWarisan — Museum Digital Budaya Indonesia',
  description:
    'Platform museum digital interaktif yang mendokumentasikan dan melestarikan warisan budaya Indonesia yang hampir punah. Bahasa daerah, tradisi lisan, teknik kriya, dan ritual.',
  keywords: ['budaya indonesia', 'museum digital', 'warisan budaya', 'bahasa daerah', 'pelestarian budaya'],
  openGraph: {
    title: 'RuangWarisan — Museum Digital Budaya Indonesia',
    description: 'Jelajahi dan lestarikan warisan budaya Indonesia yang hampir punah.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark">
      <body
        className={`${lexend.variable} ${playfair.variable} bg-[#0E0B08] text-[#F2E8D5] antialiased grain-overlay`}
      >
        <Providers>

          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
