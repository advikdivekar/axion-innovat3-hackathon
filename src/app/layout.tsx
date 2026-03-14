import type { Metadata } from 'next';
import { Orbitron, Rajdhani, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// 1. Orbitron for Display / Titles
const fontOrbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900'],
});

// 2. Rajdhani for Body / UI
const fontRajdhani = Rajdhani({
  subsets: ['latin'],
  variable: '--font-rajdhani',
  weight: ['300', '400', '500', '600', '700'],
});

// 3. JetBrains Mono for Numbers / Address Data
const fontJetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
});

import MarketingNav from '@/components/marketing/MarketingNav';
import MarketingFooter from '@/components/marketing/MarketingFooter';
import GlowCursor from '@/components/ui/GlowCursor';

export const metadata: Metadata = {
  title: 'DAO Cosmos OS | The Operating System for Your DAO',
  description: 'Mission Control for Decentralized Organizations. Visualize, govern, and defend your DAO in real-time 3D.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${fontOrbitron.variable} ${fontRajdhani.variable} ${fontJetbrainsMono.variable} bg-void-deepest text-text-primary antialiased selection:bg-cyan-500/30 selection:text-cyan-500 min-h-screen flex flex-col pt-[72px] overflow-x-hidden`}
      >
        <GlowCursor />
        <MarketingNav />
        <main className="flex-1">
          {children}
        </main>
        <MarketingFooter />
      </body>
    </html>
  );
}
