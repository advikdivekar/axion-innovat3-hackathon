'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, Navigation, Zap, Activity, ArrowRight } from 'lucide-react';
import { fadeUp, stagger, viewport } from '@/lib/animations';

const universeNodes = [
  { label: 'GOV', color: '#d075ff', top: '18%', left: '22%' },
  { label: 'TREAS', color: '#f59e0b', top: '12%', left: '72%' },
  { label: 'SEC', color: '#ff5c16', top: '72%', left: '62%' },
  { label: 'SIM', color: '#baf24a', top: '68%', left: '20%' },
  { label: 'CONT', color: '#89b0ff', top: '42%', left: '8%' },
  { label: 'AI', color: '#d075ff', top: '38%', left: '82%' },
  { label: 'CORE', color: '#00d4ff', top: '44%', left: '46%' },
];

const features = [
  {
    Icon: Eye,
    title: 'Live Universe View',
    desc: 'Every module rendered as an orbiting node in real-time 3D WebGL space. Watch your DAO breathe.',
    color: '#00d4ff',
  },
  {
    Icon: Navigation,
    title: 'Click to Navigate',
    desc: 'Click any module node and the camera flies to that intelligence dashboard instantly.',
    color: '#d075ff',
  },
  {
    Icon: Zap,
    title: 'Particle Streams',
    desc: 'Energy particles travel along connection lines representing live governance and treasury flows.',
    color: '#f59e0b',
  },
  {
    Icon: Activity,
    title: 'DAO Health Pulse',
    desc: 'The universe pulses at a rate tied to your DAO\'s health score — slow means stable, fast means urgent.',
    color: '#baf24a',
  },
];

const steps = [
  {
    n: '01',
    action: 'Hover',
    desc: 'Hover any node to illuminate its connections and reveal live data — proposal counts, treasury value, threat level.',
    color: '#00d4ff',
  },
  {
    n: '02',
    action: 'Click',
    desc: 'Click a node to select it. The universe re-centers on that module and the camera begins its approach.',
    color: '#d075ff',
  },
  {
    n: '03',
    action: 'Fly',
    desc: 'The camera flies smoothly to the module. You arrive inside the intelligence dashboard with full context loaded.',
    color: '#baf24a',
  },
];

export default function UniversePage() {
  return (
    <>
      {/* ── HERO full-viewport (dark + dot-grid) ── */}
      <section
        className="bg-dark dot-grid"
        style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '11.2rem 0 8rem', position: 'relative', overflow: 'hidden' }}
      >
        {/* CSS node animation background */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {universeNodes.map((n, i) => (
            <div key={n.label} style={{ position: 'absolute', top: n.top, left: n.left, transform: 'translate(-50%, -50%)' }}>
              <div
                className="net-node"
                style={{
                  '--node-color': n.color,
                  width: n.label === 'CORE' ? 16 : 10,
                  height: n.label === 'CORE' ? 16 : 10,
                  animationDelay: `${i * 0.5}s`,
                } as React.CSSProperties}
              />
              <div
                style={{
                  marginTop: '0.6rem',
                  fontSize: '1rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: n.color,
                  textAlign: 'center',
                  opacity: 0.7,
                  letterSpacing: '0.08em',
                }}
              >
                {n.label}
              </div>
            </div>
          ))}
          {/* SVG connection lines */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }} viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="22" y1="18" x2="46" y2="44" stroke="#00d4ff" strokeWidth="0.2" strokeDasharray="2 2" />
            <line x1="72" y1="12" x2="46" y2="44" stroke="#00d4ff" strokeWidth="0.2" strokeDasharray="2 2" />
            <line x1="62" y1="72" x2="46" y2="44" stroke="#00d4ff" strokeWidth="0.2" strokeDasharray="2 2" />
            <line x1="20" y1="68" x2="46" y2="44" stroke="#00d4ff" strokeWidth="0.2" strokeDasharray="2 2" />
            <line x1="8"  y1="42" x2="46" y2="44" stroke="#00d4ff" strokeWidth="0.2" strokeDasharray="2 2" />
            <line x1="82" y1="38" x2="46" y2="44" stroke="#00d4ff" strokeWidth="0.2" strokeDasharray="2 2" />
          </svg>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            style={{ maxWidth: '64rem', textAlign: 'center', margin: '0 auto' }}
          >
            <motion.div variants={fadeUp}>
              <span className="eyebrow">Universe</span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              style={{
                fontSize: 'clamp(4rem, 7vw, 8rem)',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.06,
                letterSpacing: '-0.03em',
                marginBottom: '2.4rem',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Explore Your DAO<br />
              in <span className="gradient-text">3D Space</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: '1.8rem',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.7,
                marginBottom: '4rem',
                maxWidth: '48rem',
                margin: '0 auto 4rem',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Your DAO rendered as a living, breathing 3D neural network. Click any node to fly into that module instantly.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/app" className="btn btn-neon btn-lg">
                Enter the Universe <ArrowRight size={18} />
              </Link>
              <Link href="/platform" className="btn btn-outline-white btn-lg">
                How It Works
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES (white) ── */}
      <section className="bg-white" style={{ padding: '9.6rem 0' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '6rem' }}>
              <span className="eyebrow">Features</span>
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
                Every pixel carries meaning
              </h2>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(26rem, 1fr))', gap: '2rem' }}>
              {features.map(({ Icon, title, desc, color }) => (
                <motion.div key={title} variants={fadeUp} className="card-white" style={{ padding: '2.8rem' }}>
                  <div
                    style={{
                      width: '5.2rem',
                      height: '5.2rem',
                      borderRadius: '1.4rem',
                      background: `${color}14`,
                      border: `1px solid ${color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '2rem',
                    }}
                  >
                    <Icon size={24} color={color} />
                  </div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#0a0a0a', marginBottom: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: '1.4rem', color: '#4a5568', lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }}>
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── NAVIGATION GUIDE (dark) ── */}
      <section className="bg-dark" style={{ padding: '9.6rem 0' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '6rem' }}>
              <span className="eyebrow">How to Navigate</span>
              <h2
                style={{
                  fontSize: 'clamp(2.8rem, 4vw, 4.8rem)',
                  fontWeight: 900,
                  color: '#ffffff',
                  lineHeight: 1.1,
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '-0.02em',
                  marginTop: '1.2rem',
                }}
              >
                Three gestures. Zero learning curve.
              </h2>
            </motion.div>

            <div style={{ display: 'flex', gap: '4.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {steps.map((step, i) => (
                <motion.div
                  key={step.n}
                  variants={fadeUp}
                  style={{ flex: '1 1 24rem', maxWidth: '32rem', textAlign: 'center' }}
                >
                  <div
                    style={{
                      width: '7.2rem',
                      height: '7.2rem',
                      borderRadius: '50%',
                      border: `2px solid ${step.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 2rem',
                      boxShadow: `0 0 2.4rem ${step.color}30`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '2.4rem',
                        fontWeight: 900,
                        color: step.color,
                      }}
                    >
                      {step.n}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontSize: '2.4rem',
                      fontWeight: 700,
                      color: step.color,
                      marginBottom: '1.2rem',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {step.action}
                  </h3>
                  <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }}>
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA (white) ── */}
      <section className="bg-white" style={{ padding: '12rem 0', textAlign: 'center' }}>
        <div className="container">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            style={{ maxWidth: '52rem', margin: '0 auto' }}
          >
            <motion.div variants={fadeUp}>
              <span className="eyebrow">Ready to Explore</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: 'clamp(3.2rem, 5vw, 5.6rem)',
                fontWeight: 900,
                color: '#0a0a0a',
                marginBottom: '2rem',
                fontFamily: 'Inter, sans-serif',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              Your universe awaits.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: '1.8rem',
                color: '#4a5568',
                marginBottom: '4rem',
                lineHeight: 1.6,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Connect your DAO and go live in under 60 seconds.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/app" className="btn btn-primary btn-lg">
                Enter the Universe <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
