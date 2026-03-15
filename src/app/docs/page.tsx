'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import { fadeUp, stagger, viewport } from '@/lib/animations';

const SECTIONS = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    color: '#00d4ff',
    items: [
      { id: 'quickstart', label: 'Quickstart Guide' },
      { id: 'connect-dao', label: 'Connect Your DAO' },
      { id: 'overview', label: 'Platform Overview' },
      { id: 'concepts', label: 'Core Concepts' },
    ],
  },
  {
    id: 'api-reference',
    label: 'API Reference',
    color: '#f59e0b',
    items: [
      { id: 'api-auth', label: 'Authentication' },
      { id: 'api-proposals', label: 'Proposals API' },
      { id: 'api-treasury', label: 'Treasury API' },
      { id: 'api-agents', label: 'Agents API' },
      { id: 'api-webhooks', label: 'Webhooks' },
    ],
  },
  {
    id: 'modules',
    label: 'Modules',
    color: '#d075ff',
    items: [
      { id: 'mod-governance', label: 'Governance Module' },
      { id: 'mod-treasury', label: 'Treasury Module' },
      { id: 'mod-contributors', label: 'Contributors Module' },
      { id: 'mod-security', label: 'Security Module' },
      { id: 'mod-simulator', label: 'Simulator Module' },
    ],
  },
  {
    id: 'configuration',
    label: 'Configuration',
    color: '#baf24a',
    items: [
      { id: 'docker', label: 'Docker Deploy' },
      { id: 'env-config', label: 'Environment Config' },
      { id: 'supabase', label: 'Supabase Setup' },
      { id: 'updates', label: 'Updating Axion' },
    ],
  },
];

const CONTENT: Record<string, { title: string; body: React.ReactNode }> = {
  quickstart: {
    title: 'Quickstart Guide',
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.4rem' }}>
        <p style={{ fontSize: '1.6rem', color: '#4a5568', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
          Get your DAO live on Axion in under 5 minutes. This guide covers connecting your Snapshot space, Gnosis Safe, and activating the four AI agents.
        </p>
        {[
          { step: '1', title: 'Create Your Account', desc: 'Connect a wallet at app.axion.xyz. Any EVM-compatible wallet works — MetaMask, WalletConnect, or Coinbase Wallet.', color: '#00d4ff' },
          { step: '2', title: 'Connect Your Snapshot Space', desc: 'Paste your Snapshot space URL. Axion will auto-discover all proposals, votes, and delegate configurations.', color: '#d075ff' },
          { step: '3', title: 'Link Treasury Wallets', desc: 'Add your Gnosis Safe address(es). Multi-sig wallets are fully supported — all signers are indexed automatically.', color: '#f59e0b' },
          { step: '4', title: 'Activate AI Agents', desc: 'HERMES, ATLAS, ARGUS, and ORACLE activate automatically. No configuration required.', color: '#baf24a' },
        ].map((s) => (
          <div
            key={s.step}
            style={{
              display: 'flex',
              gap: '2rem',
              padding: '2rem 2.4rem',
              background: `${s.color}06`,
              border: `1px solid ${s.color}18`,
              borderLeft: `4px solid ${s.color}`,
              borderRadius: '0 1.2rem 1.2rem 0',
            }}
          >
            <div
              style={{
                width: '3.2rem',
                height: '3.2rem',
                borderRadius: '50%',
                background: `${s.color}18`,
                border: `1.5px solid ${s.color}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: s.color }}>{s.step}</span>
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0a0a0a', marginBottom: '0.4rem', fontFamily: 'Inter, sans-serif' }}>
                {s.title}
              </div>
              <p style={{ fontSize: '1.3rem', color: '#4a5568', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  'api-auth': {
    title: 'Authentication',
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.4rem' }}>
        <p style={{ fontSize: '1.6rem', color: '#4a5568', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
          All API requests require a Bearer token obtained via wallet signature. Tokens expire after 24 hours.
        </p>
        <div className="terminal">
          <div className="terminal-bar">
            <div className="terminal-dot" style={{ background: '#dc2626' }} />
            <div className="terminal-dot" style={{ background: '#f59e0b' }} />
            <div className="terminal-dot" style={{ background: '#22c55e' }} />
            <span style={{ marginLeft: '0.8rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '1.1rem', color: 'rgba(255,255,255,0.3)' }}>shell</span>
          </div>
          <div className="terminal-body">
            {[
              { text: '# 1. Request auth challenge', color: 'rgba(255,255,255,0.3)' },
              { text: 'curl -X POST https://api.axion.xyz/auth/challenge \\', color: '#00d4ff' },
              { text: "  -d '{\"address\": \"0x...\"}'", color: '#00d4ff' },
              { text: '', color: '' },
              { text: '# 2. Sign the message, then:', color: 'rgba(255,255,255,0.3)' },
              { text: 'curl -X POST https://api.axion.xyz/auth/verify \\', color: '#00d4ff' },
              { text: "  -d '{\"address\": \"0x...\", \"signature\": \"0x...\"}'", color: '#00d4ff' },
              { text: '', color: '' },
              { text: '# Response:', color: 'rgba(255,255,255,0.3)' },
              { text: '{ "token": "eyJ...", "expires": 1720000000 }', color: '#86efac' },
            ].map((l, i) => (
              <div key={i} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.2rem', color: l.color, lineHeight: 1.7 }}>
                {l.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  overview: {
    title: 'Platform Overview',
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.4rem' }}>
        <p style={{ fontSize: '1.6rem', color: '#4a5568', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
          Axion is a four-layer mission control platform for DAO governance. Each layer is independently deployable and scalable.
        </p>
        {[
          { layer: 'L1 — Data Layer', desc: 'Indexes Ethereum, Snapshot, and The Graph in real time. Powers all modules and agents.', color: '#22c55e' },
          { layer: 'L2 — Domain Layer', desc: 'Five governance domains: Governance, Treasury, Contributors, Security, Simulator.', color: '#f59e0b' },
          { layer: 'L3 — Intelligence Layer', desc: 'Four AI agents process domain events and surface actionable insights.', color: '#d075ff' },
          { layer: 'L4 — Presentation Layer', desc: '3D Universe Canvas, module dashboards, and the REST API.', color: '#00d4ff' },
        ].map((l) => (
          <div key={l.layer} style={{ display: 'flex', gap: '1.6rem', padding: '1.6rem 2rem', background: `${l.color}06`, border: `1px solid ${l.color}18`, borderRadius: '1.2rem' }}>
            <div style={{ width: '0.4rem', background: l.color, borderRadius: '0.4rem', flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.2rem', fontWeight: 700, color: l.color, marginBottom: '0.4rem' }}>{l.layer}</div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.3rem', color: '#4a5568', lineHeight: 1.6 }}>{l.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
};

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [activeItem, setActiveItem] = useState('quickstart');
  const [search, setSearch] = useState('');

  const allItems = SECTIONS.flatMap((s) => s.items.map((item) => ({ ...item, sectionId: s.id, sectionColor: s.color })));
  const filteredItems = search.trim()
    ? allItems.filter((i) => i.label.toLowerCase().includes(search.toLowerCase()))
    : null;

  const content = CONTENT[activeItem] ?? {
    title: allItems.find((i) => i.id === activeItem)?.label ?? 'Documentation',
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
        <p style={{ fontSize: '1.6rem', color: '#4a5568', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
          Full documentation for this section is coming soon. Join our Discord for direct support from the Axion team.
        </p>
        <Link href="/app" className="btn btn-primary" style={{ display: 'inline-flex', width: 'fit-content' }}>
          Launch App
        </Link>
      </div>
    ),
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-dark dot-grid" style={{ padding: '11.2rem 0 6rem' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeUp}>
              <span className="eyebrow">Documentation</span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              style={{
                fontSize: 'clamp(3.6rem, 6vw, 6.4rem)',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '1.6rem',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Axion <span className="gradient-text">Docs</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              style={{ fontSize: '1.8rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: '52rem', fontFamily: 'Inter, sans-serif' }}
            >
              Everything you need to connect your DAO, configure the AI agents, and integrate with the Axion API.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── TWO-COLUMN LAYOUT ── */}
      <section className="bg-off" style={{ borderTop: '1px solid #e2e8f0', minHeight: '70vh' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '28rem 1fr', gap: 0, alignItems: 'start' }}>
          {/* LEFT SIDEBAR */}
          <aside
            style={{
              position: 'sticky',
              top: '7.2rem',
              height: 'calc(100vh - 7.2rem)',
              overflowY: 'auto',
              borderRight: '1px solid #e2e8f0',
              paddingRight: 0,
              background: 'rgba(8,8,18,0.97)',
              backdropFilter: 'blur(1.6rem)',
            }}
          >
            {/* Search */}
            <div style={{ padding: '2rem 2rem 1.6rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ position: 'relative' }}>
                <Search size={14} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search docs..."
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem 0.8rem 3.2rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '0.8rem',
                    color: '#e2e8f0',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '1.3rem',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* Nav tree or search results */}
            <nav style={{ padding: '1.6rem 0' }}>
              {filteredItems ? (
                <div>
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { setActiveItem(item.id); setActiveSection(item.sectionId); setSearch(''); }}
                        style={{
                          width: '100%',
                          background: 'none',
                          border: 'none',
                          padding: '0.8rem 2rem',
                          textAlign: 'left',
                          cursor: 'pointer',
                          borderLeft: activeItem === item.id ? `2px solid ${item.sectionColor}` : '2px solid transparent',
                        }}
                      >
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.3rem', color: 'rgba(255,255,255,0.7)' }}>
                          {item.label}
                        </span>
                      </button>
                    ))
                  ) : (
                    <p style={{ padding: '1.2rem 2rem', fontSize: '1.3rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter, sans-serif' }}>
                      No results found.
                    </p>
                  )}
                </div>
              ) : (
                SECTIONS.map((section) => (
                  <div key={section.id} style={{ marginBottom: '0.4rem' }}>
                    <button
                      onClick={() => setActiveSection(activeSection === section.id ? '' : section.id)}
                      style={{
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        padding: '0.8rem 2rem',
                        textAlign: 'left',
                      }}
                    >
                      <div style={{ width: '0.6rem', height: '0.6rem', borderRadius: '50%', background: section.color, flexShrink: 0 }} />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: activeSection === section.id ? '#ffffff' : 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', flex: 1 }}>
                        {section.label}
                      </span>
                      {activeSection === section.id ? (
                        <ChevronDown size={14} color="rgba(255,255,255,0.4)" />
                      ) : (
                        <ChevronRight size={14} color="rgba(255,255,255,0.3)" />
                      )}
                    </button>
                    {activeSection === section.id && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.2 }} style={{ overflow: 'hidden' }}>
                        {section.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => setActiveItem(item.id)}
                            style={{
                              width: '100%',
                              background: activeItem === item.id ? `${section.color}10` : 'none',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '0.7rem 2rem 0.7rem 3.6rem',
                              textAlign: 'left',
                              borderLeft: activeItem === item.id ? `2px solid ${section.color}` : '2px solid transparent',
                              transition: 'all 150ms ease',
                            }}
                          >
                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.3rem', fontWeight: activeItem === item.id ? 600 : 400, color: activeItem === item.id ? '#ffffff' : 'rgba(255,255,255,0.5)' }}>
                              {item.label}
                            </span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))
              )}
            </nav>
          </aside>

          {/* RIGHT CONTENT */}
          <main style={{ padding: '4.8rem 5.6rem', minWidth: 0, background: '#ffffff' }}>
            <motion.div key={activeItem} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              {/* Breadcrumb */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2.4rem' }}>
                {(() => {
                  const parent = SECTIONS.find((s) => s.items.some((i) => i.id === activeItem));
                  return parent ? (
                    <>
                      <span style={{ fontSize: '1.3rem', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>{parent.label}</span>
                      <ChevronRight size={14} color="#94a3b8" />
                      <span style={{ fontSize: '1.3rem', color: '#0a0a0a', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{content.title}</span>
                    </>
                  ) : null;
                })()}
              </div>

              <h2
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(2.4rem, 3.5vw, 3.6rem)',
                  fontWeight: 900,
                  color: '#0a0a0a',
                  letterSpacing: '-0.02em',
                  marginBottom: '3.2rem',
                  lineHeight: 1.15,
                }}
              >
                {content.title}
              </h2>

              {content.body}

              {/* Page nav */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6.4rem', paddingTop: '2.4rem', borderTop: '1px solid #e2e8f0' }}>
                <Link href="/app" className="btn btn-primary">
                  Launch App <ChevronRight size={16} />
                </Link>
              </div>
            </motion.div>
          </main>
        </div>
      </section>
    </>
  );
}
