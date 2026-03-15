import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { MarketingLayoutWrapper } from '@/components/marketing/MarketingLayoutWrapper';

export const metadata: Metadata = {
  title: 'Axion — Mission Control for DAOs',
  description: 'Axion is an AI-powered operating system for DAOs. Real-time governance, treasury, security, and simulation in one command center.',
  openGraph: {
    title: 'Axion — Mission Control for DAOs',
    description: 'AI-powered operating system for decentralized autonomous organizations.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axion — Mission Control for DAOs',
    description: 'AI-powered operating system for decentralized autonomous organizations.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="canonical" href="https://axion.dao" />
      </head>
      <body className="antialiased">
        <Providers>
          <MarketingLayoutWrapper>
            {children}
          </MarketingLayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
