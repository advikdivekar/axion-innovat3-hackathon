import type { Metadata } from "next";
import { Orbitron, Rajdhani, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fontOrbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "700", "900"],
});

const fontRajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  weight: ["400", "600"],
});

const fontJetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "DAO Cosmos OS",
  description: "Mission Control for Decentralized Organizations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${fontOrbitron.variable} ${fontRajdhani.variable} ${fontJetbrainsMono.variable} bg-void-deepest text-text-primary antialiased min-h-screen flex flex-col overflow-x-hidden`}
      >
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
