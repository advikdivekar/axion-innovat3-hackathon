'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ShieldAlert, Radar, AlertTriangle, Eye, Bell, ArrowRight } from 'lucide-react';
import { fadeUp, stagger, viewport } from '@/lib/animations';

const SEC_COLOR = '#ff5c16';

const features = [
  { Icon: Radar, title: 'Sybil Detection', desc: 'ML clustering model identifies coordinated wallet networks attempting to manipulate governance outcomes.' },
  { Icon: AlertTriangle, title: 'Real-Time Threat Feed', desc: 'Live event stream surfaces anomalous vote weight movements, new large delegate entries, and proposal timing attacks.' },
  { Icon: ShieldAlert, title: 'Flash Loan Simulation', desc: 'Pre-proposal simulation detects whether flash loan attacks could manipulate quorum or vote outcome.' },
  { Icon: Bell, title: 'Instant Alerts', desc: 'Webhook, email, or Telegram alerts the moment a threat is detected. Configurable severity thresholds.' },
];

interface Threat {
  id?: string;
  type?: string;
  severity?: string;
  description?: string;
  timestamp?: string;
  [key: string]: unknown;
}

export default function SecurityPage() {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/security');
        if (res.ok) {
          const data = await res.json();
          const items = Array.isArray(data) ? data : (data.threats ?? data.alerts ?? []);
          setThreats(items.slice(0, 4));
        }
      } catch {
        // keep empty
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const severityColor = (s?: string) =>
    s === 'HIGH' || s === 'CRITICAL' ? SEC_COLOR : s === 'MEDIUM' ? '#f59e0b' : '#22c55e';

  return (
    <>
      {/* ── HERO (dark) ── */}
      <section className="bg-dark dot-grid" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', padding: '11.2rem 0 8rem' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" animate="visible" style={{ maxWidth: '64rem' }}>
            <motion.div variants={fadeUp}>
              <span className="eyebrow" style={{ color: SEC_COLOR }}>Security</span>
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
              <span style={{ color: SEC_COLOR }}>Security</span>{' '}
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
              ARGUS monitors every governance vote, wallet interaction, and proposal for coordinated attacks, Sybil clusters, and anomalous behavior — in real time, before damage is done.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
              <Link href="/app" className="btn btn-neon btn-lg">
                Open Security <ArrowRight size={18} />
              </Link>
              <Link href="/docs" className="btn btn-outline-white btn-lg">
                API Docs
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CSS VISUALIZATION — rotating radar sweep (white) ── */}
      <section className="bg-white" style={{ padding: '9.6rem 0' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '6rem' }}>
              <span className="eyebrow">Threat Radar</span>
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
                Continuous 360-degree scanning
              </h2>
            </motion.div>

            <div style={{ display: 'flex', gap: '6.4rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              {/* Radar animation */}
              <motion.div
                variants={fadeUp}
                style={{
                  position: 'relative',
                  width: '28rem',
                  height: '28rem',
                  flexShrink: 0,
                  background: '#050508',
                  borderRadius: '50%',
                  border: `2px solid ${SEC_COLOR}20`,
                  overflow: 'hidden',
                  boxShadow: `0 0 4rem ${SEC_COLOR}10`,
                }}
              >
                {/* Concentric rings */}
                {[1, 2, 3, 4].map((r) => (
                  <div
                    key={r}
                    style={{
                      position: 'absolute',
                      inset: `${r * 12}%`,
                      borderRadius: '50%',
                      border: `1px solid ${SEC_COLOR}15`,
                    }}
                  />
                ))}
                {/* Spoke lines */}
                {[0, 45, 90, 135].map((deg) => (
                  <div
                    key={deg}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '50%',
                      height: '1px',
                      background: `${SEC_COLOR}10`,
                      transformOrigin: 'left center',
                      transform: `rotate(${deg}deg)`,
                    }}
                  />
                ))}
                {/* Sweep cone */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: `conic-gradient(from 0deg, transparent 0deg, ${SEC_COLOR}25 40deg, transparent 40deg)`,
                    animation: 'radar-sweep 3s linear infinite',
                  }}
                />
                {/* Threat dots */}
                <div style={{ position: 'absolute', top: '28%', left: '62%', width: '0.8rem', height: '0.8rem', borderRadius: '50%', background: SEC_COLOR, animation: 'threat-blink 2s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', top: '65%', left: '35%', width: '0.6rem', height: '0.6rem', borderRadius: '50%', background: '#f59e0b', animation: 'threat-blink 2.5s ease-in-out infinite 0.5s' }} />
                {/* Center */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '1.2rem', height: '1.2rem', borderRadius: '50%', background: SEC_COLOR, boxShadow: `0 0 1.2rem ${SEC_COLOR}` }} />
                {/* Status */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '4rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '1rem',
                    color: '#22c55e',
                    letterSpacing: '0.1em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  NOMINAL
                </div>
              </motion.div>

              {/* Threat vectors */}
              <motion.div variants={fadeUp} style={{ flex: '1 1 32rem' }}>
                <h3 style={{ fontSize: '2rem', fontWeight: 700, color: '#0a0a0a', marginBottom: '2.4rem', fontFamily: 'Inter, sans-serif' }}>
                  Active threat vectors
                </h3>
                {[
                  { label: 'Sybil Attacks', level: 12, max: 100 },
                  { label: 'Flash Loan Risk', level: 3, max: 100 },
                  { label: 'Governance Takeover', level: 8, max: 100 },
                  { label: 'Treasury Drain', level: 0, max: 100 },
                  { label: 'Phishing Activity', level: 5, max: 100 },
                ].map((t) => {
                  const tColor = t.level === 0 ? '#22c55e' : t.level < 10 ? '#f59e0b' : SEC_COLOR;
                  return (
                    <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: '1.6rem', marginBottom: '1.2rem' }}>
                      <span style={{ fontSize: '1.3rem', color: '#4a5568', fontFamily: 'Inter, sans-serif', width: '16rem', flexShrink: 0 }}>
                        {t.label}
                      </span>
                      <div style={{ flex: 1, height: '0.6rem', background: '#f1f5f9', borderRadius: '10rem', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${t.level}%`, background: tColor, borderRadius: '10rem', minWidth: t.level > 0 ? '0.6rem' : 0 }} />
                      </div>
                      <span style={{ fontSize: '1.2rem', fontWeight: 700, color: tColor, fontFamily: 'JetBrains Mono, monospace', width: '2.4rem', textAlign: 'right', flexShrink: 0 }}>
                        {t.level}
                      </span>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </div>

        <style>{`
          @keyframes radar-sweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes threat-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
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
                Defense-grade threat intelligence
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
                      background: `${SEC_COLOR}14`,
                      border: `1px solid ${SEC_COLOR}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '2rem',
                    }}
                  >
                    <Icon size={22} color={SEC_COLOR} />
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
                Active threats, right now
              </h2>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: '72rem', margin: '0 auto' }}>
              {loading ? (
                <>
                  {[1, 2, 3, 4].map((k) => (
                    <div key={k} className="skeleton" style={{ height: '6.4rem', borderRadius: '0.8rem' }} />
                  ))}
                </>
              ) : threats.length > 0 ? (
                threats.map((t, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="card-white"
                    style={{ padding: '2rem 2.4rem', display: 'flex', alignItems: 'center', gap: '1.6rem', borderLeft: `3px solid ${severityColor(t.severity)}` }}
                  >
                    <Eye size={18} color={severityColor(t.severity)} style={{ flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#0a0a0a', fontFamily: 'Inter, sans-serif' }}>
                        {t.type ?? t.description ?? 'Security Event'}
                      </div>
                      {t.description && t.type && (
                        <div style={{ fontSize: '1.2rem', color: '#94a3b8', fontFamily: 'Inter, sans-serif', marginTop: '0.2rem' }}>
                          {t.description}
                        </div>
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: severityColor(t.severity),
                        background: `${severityColor(t.severity)}14`,
                        border: `1px solid ${severityColor(t.severity)}30`,
                        borderRadius: '0.6rem',
                        padding: '0.4rem 1.2rem',
                        flexShrink: 0,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {t.severity ?? 'INFO'}
                    </span>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  variants={fadeUp}
                  className="card-white"
                  style={{ padding: '3.2rem', textAlign: 'center' }}
                >
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#22c55e', marginBottom: '0.8rem', fontFamily: 'JetBrains Mono, monospace' }}>
                    0 ACTIVE THREATS
                  </div>
                  <p style={{ fontSize: '1.4rem', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
                    All governance vectors within safe parameters. ARGUS is watching.
                  </p>
                </motion.div>
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
              <span className="eyebrow" style={{ color: SEC_COLOR }}>Get Started</span>
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
              Threats detected{' '}
              <span style={{ color: SEC_COLOR }}>before they strike.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{ fontSize: '1.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '4rem', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}
            >
              Activate the ARGUS security agent and get 360-degree threat coverage in under 60 seconds.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/app" className="btn btn-neon btn-lg">
                Open Security Module <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
