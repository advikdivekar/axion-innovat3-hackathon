'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Shield, BarChart3, Clock, Users, Bell, ArrowRight } from 'lucide-react';
import { fadeUp, stagger, viewport } from '@/lib/animations';

const GOV_COLOR = '#d075ff';

const mockProposals = [
  { id: 'UNI-042', title: 'Treasury Diversification v2', status: 'ACTIVE', forPct: 62, againstPct: 28, votes: '12.4M' },
  { id: 'UNI-041', title: 'Fee Switch Activation — Mainnet', status: 'PASSED', forPct: 84, againstPct: 14, votes: '31.8M' },
  { id: 'UNI-040', title: 'Delegate Incentives Program', status: 'ACTIVE', forPct: 55, againstPct: 31, votes: '7.1M' },
];

const features = [
  { Icon: BarChart3, title: 'Live Proposal Feed', desc: 'Real-time sync from Snapshot and on-chain governance contracts. Every vote captured within 2 seconds.' },
  { Icon: Users, title: 'Delegate Analytics', desc: 'Visualize delegate vote weight, participation rates, and historical alignment for every major DAO.' },
  { Icon: Clock, title: 'Deadline Countdown', desc: 'Smart deadline alerts via webhook and in-app notifications, calibrated to your risk threshold.' },
  { Icon: Bell, title: 'Quorum Forecasting', desc: 'AI-powered participation models predict quorum likelihood up to 72 hours before a proposal closes.' },
];

interface Proposal {
  id: string;
  title: string;
  status: string;
  forVotes?: number;
  againstVotes?: number;
  description?: string;
}

export default function GovernancePage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/blockchain/proposals');
        if (res.ok) {
          const data = await res.json();
          setProposals(Array.isArray(data) ? data.slice(0, 4) : []);
        }
      } catch {
        // keep empty
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const statusColor = (s: string) =>
    s === 'ACTIVE' ? '#22c55e' : s === 'PASSED' || s === 'SUCCEEDED' ? GOV_COLOR : '#94a3b8';

  return (
    <>
      {/* ── HERO (dark) ── */}
      <section className="bg-dark dot-grid" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', padding: '11.2rem 0 8rem' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" animate="visible" style={{ maxWidth: '64rem' }}>
            <motion.div variants={fadeUp}>
              <span className="eyebrow" style={{ color: GOV_COLOR }}>Governance</span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              style={{
                fontSize: 'clamp(3.6rem, 6vw, 7.2rem)',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                marginBottom: '2.4rem',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <span style={{ color: GOV_COLOR }}>Proposal</span>{' '}
              Intelligence
            </motion.h1>
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: '1.8rem',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.7,
                marginBottom: '3.6rem',
                maxWidth: '52rem',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Track every governance proposal across Snapshot and on-chain in real time. Forecast quorum, analyze vote weight, and receive automated deadline alerts.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
              <Link href="/app" className="btn btn-neon btn-lg">
                Open Governance <ArrowRight size={18} />
              </Link>
              <Link href="/docs" className="btn btn-outline-white btn-lg">
                API Docs
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CSS VISUALIZATION — animated proposal cards (white) ── */}
      <section className="bg-white" style={{ padding: '9.6rem 0' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '6rem' }}>
              <span className="eyebrow">Live Proposals</span>
              <h2
                style={{
                  fontSize: 'clamp(2.8rem, 4vw, 4.8rem)',
                  fontWeight: 900,
                  color: '#0a0a0a',
                  lineHeight: 1.1,
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '-0.02em',
                  marginTop: '1.2rem',
                }}
              >
                See every vote as it happens
              </h2>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', maxWidth: '72rem', margin: '0 auto' }}>
              {mockProposals.map((p, i) => {
                const sColor = p.status === 'ACTIVE' ? '#22c55e' : p.status === 'PASSED' ? GOV_COLOR : '#94a3b8';
                return (
                  <motion.div
                    key={p.id}
                    variants={fadeUp}
                    className="card-white"
                    style={{ padding: '2.8rem' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.6rem' }}>
                      <div>
                        <div style={{ fontSize: '1.1rem', fontFamily: 'JetBrains Mono, monospace', color: GOV_COLOR, marginBottom: '0.4rem' }}>
                          {p.id}
                        </div>
                        <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0a0a0a', fontFamily: 'Inter, sans-serif' }}>
                          {p.title}
                        </h3>
                      </div>
                      <span
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          color: sColor,
                          background: `${sColor}14`,
                          border: `1px solid ${sColor}30`,
                          borderRadius: '0.6rem',
                          padding: '0.4rem 1.2rem',
                          flexShrink: 0,
                          marginLeft: '1.6rem',
                        }}
                      >
                        {p.status}
                      </span>
                    </div>
                    {/* Vote bar */}
                    <div style={{ marginBottom: '0.8rem' }}>
                      <div
                        style={{
                          height: '0.8rem',
                          borderRadius: '10rem',
                          background: '#f1f5f9',
                          overflow: 'hidden',
                          position: 'relative',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: `${p.forPct}%`,
                            background: '#22c55e',
                            borderRadius: '10rem',
                            animation: `fill-bar-${i} 1.2s ease forwards`,
                            animationDelay: `${i * 0.2}s`,
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '1.2rem', color: '#22c55e', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                        {p.forPct}% For
                      </span>
                      <span style={{ fontSize: '1.2rem', color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>
                        {p.votes} votes
                      </span>
                      <span style={{ fontSize: '1.2rem', color: '#ef4444', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                        {p.againstPct}% Against
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <style>{`
          @keyframes fill-bar { from { width: 0; } }
          @keyframes fill-bar-0 { from { width: 0; } }
          @keyframes fill-bar-1 { from { width: 0; } }
          @keyframes fill-bar-2 { from { width: 0; } }
        `}</style>
      </section>

      {/* ── FEATURES (off-white) ── */}
      <section className="bg-off" style={{ padding: '9.6rem 0' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '6rem' }}>
              <span className="eyebrow">Capabilities</span>
              <h2
                style={{
                  fontSize: 'clamp(2.8rem, 4vw, 4.8rem)',
                  fontWeight: 900,
                  color: '#0a0a0a',
                  lineHeight: 1.1,
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '-0.02em',
                  marginTop: '1.2rem',
                }}
              >
                Everything governance intelligence needs
              </h2>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(26rem, 1fr))', gap: '2rem' }}>
              {features.map(({ Icon, title, desc }) => (
                <motion.div key={title} variants={fadeUp} className="card-white" style={{ padding: '2.8rem' }}>
                  <div
                    style={{
                      width: '5.2rem',
                      height: '5.2rem',
                      borderRadius: '1.4rem',
                      background: `${GOV_COLOR}14`,
                      border: `1px solid ${GOV_COLOR}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '2rem',
                    }}
                  >
                    <Icon size={22} color={GOV_COLOR} />
                  </div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#0a0a0a', marginBottom: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: '1.4rem', color: '#4a5568', lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }}>{desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── LIVE DATA (white) ── */}
      <section className="bg-white" style={{ padding: '9.6rem 0' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '6rem' }}>
              <span className="eyebrow">Live Data</span>
              <h2
                style={{
                  fontSize: 'clamp(2.8rem, 4vw, 4.8rem)',
                  fontWeight: 900,
                  color: '#0a0a0a',
                  lineHeight: 1.1,
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '-0.02em',
                  marginTop: '1.2rem',
                }}
              >
                Real proposals, right now
              </h2>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', maxWidth: '72rem', margin: '0 auto' }}>
              {loading ? (
                <>
                  {[1, 2, 3, 4].map((k) => (
                    <div
                      key={k}
                      className="skeleton"
                      style={{ height: '6.4rem', borderRadius: '0.8rem' }}
                    />
                  ))}
                </>
              ) : proposals.length > 0 ? (
                proposals.map((p) => (
                  <motion.div
                    key={p.id}
                    variants={fadeUp}
                    className="card-white"
                    style={{ padding: '2.4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <div>
                      <div style={{ fontSize: '1.1rem', fontFamily: 'JetBrains Mono, monospace', color: GOV_COLOR, marginBottom: '0.4rem' }}>
                        {p.id}
                      </div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#0a0a0a', fontFamily: 'Inter, sans-serif' }}>
                        {p.title}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        color: statusColor(p.status),
                        background: `${statusColor(p.status)}14`,
                        border: `1px solid ${statusColor(p.status)}30`,
                        borderRadius: '0.6rem',
                        padding: '0.4rem 1.2rem',
                        flexShrink: 0,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {p.status}
                    </span>
                  </motion.div>
                ))
              ) : (
                <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '1.4rem', padding: '4.8rem' }}>
                  No live proposals available right now.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA (dark) ── */}
      <section className="bg-dark" style={{ padding: '12rem 0', textAlign: 'center' }}>
        <div className="container">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            style={{ maxWidth: '52rem', margin: '0 auto' }}
          >
            <motion.div variants={fadeUp}>
              <span className="eyebrow" style={{ color: GOV_COLOR }}>Get Started</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: 'clamp(3.2rem, 5vw, 6rem)',
                fontWeight: 900,
                color: '#ffffff',
                marginBottom: '2rem',
                fontFamily: 'Inter, sans-serif',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              Never miss a{' '}
              <span style={{ color: GOV_COLOR }}>critical proposal.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{ fontSize: '1.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '4rem', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}
            >
              Connect your DAO and activate the HERMES governance agent in under 60 seconds.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/app" className="btn btn-neon btn-lg">
                Open Governance Module <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
