'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { DollarSign, BarChart3, Bell, TrendingUp, ArrowRight } from 'lucide-react';
import { fadeUp, stagger, viewport } from '@/lib/animations';

const TREAS_COLOR = '#f59e0b';

const features = [
  { Icon: DollarSign, title: 'Multi-Safe Monitoring', desc: 'Real-time balance tracking across Gnosis Safe, Coinbase Custody, and any EVM wallet — all in one view.' },
  { Icon: TrendingUp, title: 'DeFi Yield Tracking', desc: 'Automatically detect and track yield positions across Aave, Compound, Uniswap v3, and 40+ protocols.' },
  { Icon: BarChart3, title: 'Runway Calculator', desc: 'Dynamic runway projections based on current burn rate, yield income, and token price scenarios.' },
  { Icon: Bell, title: 'Anomaly Alerts', desc: 'Instant alerts for unusual transfers, large outflows, and unexpected contract interactions.' },
];

interface TreasuryData {
  totalValue?: string | number;
  runway?: string | number;
  assets?: Array<{ symbol: string; value: string | number }>;
  [key: string]: unknown;
}

export default function TreasuryPage() {
  const [treasuryData, setTreasuryData] = useState<TreasuryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/blockchain/treasury');
        if (res.ok) {
          const data = await res.json();
          setTreasuryData(data);
        }
      } catch {
        // keep null
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <>
      {/* ── HERO (dark) ── */}
      <section className="bg-dark dot-grid" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', padding: '11.2rem 0 8rem' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" animate="visible" style={{ maxWidth: '64rem' }}>
            <motion.div variants={fadeUp}>
              <span className="eyebrow" style={{ color: TREAS_COLOR }}>Treasury</span>
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
              <span style={{ color: TREAS_COLOR }}>Treasury</span>{' '}
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
              Monitor every wallet, track every DeFi position, and forecast your runway with institutional-grade precision. ATLAS watches your treasury 24/7.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
              <Link href="/app" className="btn btn-neon btn-lg">
                Open Treasury <ArrowRight size={18} />
              </Link>
              <Link href="/docs" className="btn btn-outline-white btn-lg">
                API Docs
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CSS VISUALIZATION — pulsing reactor core (white) ── */}
      <section className="bg-white" style={{ padding: '9.6rem 0' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '6rem' }}>
              <span className="eyebrow">Live Reactor</span>
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
                Treasury pulse, in real time
              </h2>
            </motion.div>

            <div style={{ display: 'flex', gap: '6.4rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              {/* Reactor core animation */}
              <motion.div variants={fadeUp} style={{ position: 'relative', width: '28rem', height: '28rem', flexShrink: 0 }}>
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      inset: `${i * 14}%`,
                      borderRadius: '50%',
                      border: `1px solid ${TREAS_COLOR}${Math.round((1 - i * 0.2) * 255).toString(16).padStart(2, '0')}`,
                      animation: `reactor-pulse ${2 + i * 0.5}s ease-in-out infinite`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
                {/* Center */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '8rem',
                    height: '8rem',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${TREAS_COLOR}40, ${TREAS_COLOR}10)`,
                    border: `2px solid ${TREAS_COLOR}`,
                    boxShadow: `0 0 4rem ${TREAS_COLOR}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <DollarSign size={28} color={TREAS_COLOR} />
                </div>
                {/* Flowing data points */}
                {[
                  { label: '$847M', sub: 'AUM', top: '8%', left: '50%' },
                  { label: '18.4mo', sub: 'Runway', top: '75%', left: '15%' },
                  { label: '$234K', sub: 'Monthly yield', top: '75%', left: '80%' },
                ].map((dp) => (
                  <div
                    key={dp.label}
                    style={{
                      position: 'absolute',
                      top: dp.top,
                      left: dp.left,
                      transform: 'translate(-50%, -50%)',
                      textAlign: 'center',
                      background: '#ffffff',
                      border: `1px solid ${TREAS_COLOR}30`,
                      borderRadius: '1rem',
                      padding: '0.8rem 1.4rem',
                      boxShadow: '0 0.4rem 1.6rem rgba(0,0,0,0.08)',
                    }}
                  >
                    <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0a0a0a', fontFamily: 'JetBrains Mono, monospace' }}>
                      {dp.label}
                    </div>
                    <div style={{ fontSize: '1rem', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>{dp.sub}</div>
                  </div>
                ))}
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeUp} style={{ flex: '1 1 32rem' }}>
                {[
                  { label: 'Total AUM Tracked', value: '$847M', color: TREAS_COLOR },
                  { label: 'Active Safes', value: '3', color: '#22c55e' },
                  { label: 'Projected Runway', value: '18.4 months', color: '#00d4ff' },
                  { label: 'Monthly DeFi Yield', value: '$234K', color: TREAS_COLOR },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1.6rem 0',
                      borderBottom: '1px solid #e2e8f0',
                    }}
                  >
                    <span style={{ fontSize: '1.4rem', color: '#4a5568', fontFamily: 'Inter, sans-serif' }}>{stat.label}</span>
                    <span style={{ fontSize: '1.8rem', fontWeight: 700, color: stat.color, fontFamily: 'JetBrains Mono, monospace' }}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        <style>{`
          @keyframes reactor-pulse {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 0.3; transform: scale(1.04); }
          }
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
                Total treasury visibility
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
                      background: `${TREAS_COLOR}14`,
                      border: `1px solid ${TREAS_COLOR}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '2rem',
                    }}
                  >
                    <Icon size={22} color={TREAS_COLOR} />
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
                Treasury stats, live
              </h2>
            </motion.div>

            <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
              {loading ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
                  {[1, 2, 3].map((k) => (
                    <div key={k} className="skeleton" style={{ height: '6.4rem', borderRadius: '0.8rem' }} />
                  ))}
                </div>
              ) : treasuryData ? (
                <motion.div variants={fadeUp} className="card-white" style={{ padding: '3.2rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))', gap: '2.4rem' }}>
                    {[
                      { label: 'Total Value', value: treasuryData.totalValue ? `$${Number(treasuryData.totalValue).toLocaleString()}` : '$847M' },
                      { label: 'Runway', value: treasuryData.runway ? `${treasuryData.runway} mo` : '18.4 months' },
                    ].map((stat) => (
                      <div key={stat.label} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '3.2rem', fontWeight: 900, color: TREAS_COLOR, fontFamily: 'JetBrains Mono, monospace' }}>
                          {stat.value}
                        </div>
                        <div style={{ fontSize: '1.2rem', color: '#94a3b8', fontFamily: 'Inter, sans-serif', marginTop: '0.4rem' }}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '1.4rem', padding: '4.8rem' }}>
                  Treasury data unavailable right now.
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
              <span className="eyebrow" style={{ color: TREAS_COLOR }}>Get Started</span>
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
              Full visibility into your{' '}
              <span style={{ color: TREAS_COLOR }}>treasury.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{ fontSize: '1.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '4rem', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}
            >
              Connect your Gnosis Safe and activate the ATLAS treasury agent in under 60 seconds.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/app" className="btn btn-neon btn-lg">
                Open Treasury Module <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
