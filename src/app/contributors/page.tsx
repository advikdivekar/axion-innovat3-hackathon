'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Users, Star, Activity, Search, ArrowRight } from 'lucide-react';
import { fadeUp, stagger, viewport } from '@/lib/animations';

const CONT_COLOR = '#89b0ff';

const features = [
  { Icon: Star, title: 'XP Scoring Engine', desc: 'Every on-chain action earns XP — votes, proposals, forum posts, commits. A transparent merit score for every address.' },
  { Icon: Users, title: 'Constellation View', desc: '3D social graph showing relationships between delegates, core members, and active contributors.' },
  { Icon: Activity, title: 'Activity Heatmaps', desc: 'GitHub-style contribution heatmaps for every contributor. Instantly visualize active vs. dormant addresses.' },
  { Icon: Search, title: 'Wallet Lookup', desc: 'Search any ENS domain or 0x address for a full contribution report, XP history, and governance activity.' },
];

const constellationNodes = [
  { x: 50, y: 50, size: 14, color: '#d075ff', label: 'CORE', delay: 0 },
  { x: 25, y: 25, size: 10, color: '#f59e0b', label: 'DEL', delay: 0.3 },
  { x: 75, y: 20, size: 10, color: '#f59e0b', label: 'DEL', delay: 0.6 },
  { x: 15, y: 60, size: 8, color: CONT_COLOR, label: 'BUILD', delay: 0.9 },
  { x: 80, y: 65, size: 8, color: CONT_COLOR, label: 'BUILD', delay: 1.2 },
  { x: 35, y: 82, size: 6, color: '#22c55e', label: 'CONT', delay: 1.5 },
  { x: 65, y: 82, size: 6, color: '#22c55e', label: 'CONT', delay: 1.8 },
  { x: 55, y: 12, size: 6, color: '#22c55e', label: 'CONT', delay: 2.1 },
];

const edges = [[0,1],[0,2],[0,3],[0,4],[1,5],[2,7],[3,5],[4,6]];

interface Contributor {
  address?: string;
  handle?: string;
  name?: string;
  xp?: number;
  level?: string;
  votes?: number;
  [key: string]: unknown;
}

export default function ContributorsPage() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/blockchain/contributors');
        if (res.ok) {
          const data = await res.json();
          setContributors(Array.isArray(data) ? data.slice(0, 5) : []);
        }
      } catch {
        // keep empty
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
              <span className="eyebrow" style={{ color: CONT_COLOR }}>Contributors</span>
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
              <span style={{ color: CONT_COLOR }}>Contributor</span>{' '}
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
              Map every contributor&apos;s impact across governance participation, treasury actions, and on-chain activity. A living galaxy of human capital powering your DAO.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
              <Link href="/app" className="btn btn-neon btn-lg">
                Open Contributors <ArrowRight size={18} />
              </Link>
              <Link href="/docs" className="btn btn-outline-white btn-lg">
                API Docs
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CSS VISUALIZATION — star constellation (white) ── */}
      <section className="bg-white" style={{ padding: '9.6rem 0' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '6rem' }}>
              <span className="eyebrow">Constellation View</span>
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
                Your contributor galaxy, mapped
              </h2>
            </motion.div>

            <motion.div
              variants={fadeUp}
              style={{
                position: 'relative',
                height: '36rem',
                background: '#050508',
                borderRadius: '2.4rem',
                overflow: 'hidden',
                border: `1px solid ${CONT_COLOR}20`,
                maxWidth: '80rem',
                margin: '0 auto',
              }}
            >
              {/* Twinkling star field */}
              {Array.from({ length: 60 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: i % 10 === 0 ? 2 : 1,
                    height: i % 10 === 0 ? 2 : 1,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.6)',
                    left: `${(i * 37 + 11) % 100}%`,
                    top: `${(i * 53 + 7) % 100}%`,
                    animation: `twinkle ${2 + (i % 4)}s ease-in-out infinite`,
                    animationDelay: `${(i * 0.3) % 4}s`,
                  }}
                />
              ))}

              {/* SVG connection lines */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100" preserveAspectRatio="none">
                {edges.map(([a, b], i) => {
                  const na = constellationNodes[a];
                  const nb = constellationNodes[b > 7 ? 7 : b];
                  if (!nb) return null;
                  return (
                    <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke={`${CONT_COLOR}30`} strokeWidth="0.3" />
                  );
                })}
              </svg>

              {/* Nodes */}
              {constellationNodes.map((n, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: `${n.x}%`,
                    top: `${n.y}%`,
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <div
                    style={{
                      width: n.size,
                      height: n.size,
                      borderRadius: '50%',
                      background: n.color,
                      boxShadow: `0 0 ${n.size}px ${n.color}80`,
                      animation: `star-pulse 3s ease-in-out infinite`,
                      animationDelay: `${n.delay}s`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.9rem',
                      color: n.color,
                      opacity: 0.8,
                      letterSpacing: '0.06em',
                    }}
                  >
                    {n.label}
                  </span>
                </div>
              ))}

              <div
                style={{
                  position: 'absolute',
                  bottom: '1.6rem',
                  left: '1.6rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: `${CONT_COLOR}60`,
                  letterSpacing: '0.1em',
                }}
              >
                12,847 CONTRIBUTORS INDEXED
              </div>
            </motion.div>
          </motion.div>
        </div>

        <style>{`
          @keyframes twinkle { 0%, 100% { opacity: 0.6; } 50% { opacity: 0.1; } }
          @keyframes star-pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.3); opacity: 0.7; } }
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
                Know your community deeply
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
                      background: `${CONT_COLOR}14`,
                      border: `1px solid ${CONT_COLOR}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '2rem',
                    }}
                  >
                    <Icon size={22} color={CONT_COLOR} />
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
                Top contributors, right now
              </h2>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: '72rem', margin: '0 auto' }}>
              {loading ? (
                <>
                  {[1, 2, 3, 4, 5].map((k) => (
                    <div key={k} className="skeleton" style={{ height: '6.4rem', borderRadius: '0.8rem' }} />
                  ))}
                </>
              ) : contributors.length > 0 ? (
                contributors.map((c, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="card-white"
                    style={{ padding: '2rem 2.4rem', display: 'flex', alignItems: 'center', gap: '1.6rem' }}
                  >
                    <div
                      style={{
                        width: '4rem',
                        height: '4rem',
                        borderRadius: '50%',
                        background: `${CONT_COLOR}20`,
                        border: `1.5px solid ${CONT_COLOR}40`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        fontSize: '1.2rem',
                        color: CONT_COLOR,
                      }}
                    >
                      {i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#0a0a0a', fontFamily: 'Inter, sans-serif' }}>
                        {c.handle ?? c.name ?? c.address ?? 'Unknown'}
                      </div>
                      {c.address && (
                        <div style={{ fontSize: '1.1rem', color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>
                          {String(c.address).slice(0, 10)}...
                        </div>
                      )}
                    </div>
                    {c.xp !== undefined && (
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: '1.6rem', fontWeight: 700, color: CONT_COLOR, fontFamily: 'JetBrains Mono, monospace' }}>
                          {(Number(c.xp) / 1000).toFixed(1)}K
                        </div>
                        <div style={{ fontSize: '1rem', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>XP</div>
                      </div>
                    )}
                    {c.level && (
                      <span
                        style={{
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: CONT_COLOR,
                          background: `${CONT_COLOR}14`,
                          border: `1px solid ${CONT_COLOR}30`,
                          borderRadius: '0.6rem',
                          padding: '0.4rem 1rem',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        {c.level}
                      </span>
                    )}
                  </motion.div>
                ))
              ) : (
                <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '1.4rem', padding: '4.8rem' }}>
                  Contributor data unavailable right now.
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
              <span className="eyebrow" style={{ color: CONT_COLOR }}>Get Started</span>
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
              Know every{' '}
              <span style={{ color: CONT_COLOR }}>contributor.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{ fontSize: '1.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '4rem', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}
            >
              Connect your DAO and map your entire contributor constellation in under 60 seconds.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/app" className="btn btn-neon btn-lg">
                Open Contributors Module <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
