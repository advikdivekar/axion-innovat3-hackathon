'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, GitBranch, Cpu, BarChart3 } from 'lucide-react';
import { fadeUp, stagger, viewport } from '@/lib/animations';

const SIM_COLOR = '#baf24a';

const steps = [
  {
    n: '01',
    title: 'Define Your Scenario',
    desc: 'Describe any governance situation in plain English — a spending proposal, market crash, or governance attack. ORACLE understands context instantly.',
    Icon: GitBranch,
  },
  {
    n: '02',
    title: 'Run 1,000 Simulations',
    desc: 'ORACLE\'s Monte Carlo engine runs 1,000+ iterations of your scenario, accounting for voter behavior, market conditions, and historical patterns.',
    Icon: Cpu,
  },
  {
    n: '03',
    title: 'Get Branching Forecasts',
    desc: 'Three probability-weighted futures appear on the timeline. Click any branch to explore that outcome in full detail with confidence intervals.',
    Icon: BarChart3,
  },
];

const scenarios = [
  { id: 'A', label: 'Conservative', probability: 72, color: SIM_COLOR, y: 30 },
  { id: 'B', label: 'Aggressive', probability: 51, color: '#00d4ff', y: 60 },
  { id: 'C', label: 'Buyback', probability: 38, color: '#d075ff', y: 90 },
];

export default function SimulatorPage() {
  return (
    <>
      {/* ── HERO (dark) ── */}
      <section className="bg-dark dot-grid" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', padding: '11.2rem 0 8rem' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" animate="visible" style={{ maxWidth: '64rem' }}>
            <motion.div variants={fadeUp}>
              <span className="eyebrow" style={{ color: SIM_COLOR }}>Simulator</span>
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
              <span style={{ color: SIM_COLOR }}>Scenario</span>{' '}
              Simulator
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
              Run any governance scenario through ORACLE&apos;s probabilistic AI engine. Model treasury outcomes, quorum probabilities, and attack surfaces with branching timeline projections.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
              <Link href="/app" className="btn btn-neon btn-lg">
                Open Simulator <ArrowRight size={18} />
              </Link>
              <Link href="/docs" className="btn btn-outline-white btn-lg">
                API Docs
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS (white) ── */}
      <section className="bg-white" style={{ padding: '9.6rem 0' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '6rem' }}>
              <span className="eyebrow">How It Works</span>
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
                From question to forecast in seconds
              </h2>
            </motion.div>

            <div style={{ display: 'flex', gap: '3.2rem', flexWrap: 'wrap', position: 'relative' }}>
              {steps.map((step, i) => (
                <motion.div
                  key={step.n}
                  variants={fadeUp}
                  style={{ flex: '1 1 24rem', position: 'relative' }}
                >
                  <div className="card-white" style={{ padding: '3.2rem' }}>
                    <div
                      style={{
                        width: '4.8rem',
                        height: '4.8rem',
                        borderRadius: '50%',
                        background: `${SIM_COLOR}20`,
                        border: `1.5px solid ${SIM_COLOR}50`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '2rem',
                      }}
                    >
                      <step.Icon size={22} color={SIM_COLOR} />
                    </div>
                    <div
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: SIM_COLOR,
                        letterSpacing: '0.1em',
                        marginBottom: '0.8rem',
                      }}
                    >
                      {step.n}
                    </div>
                    <h3 style={{ fontSize: '2rem', fontWeight: 700, color: '#0a0a0a', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: '1.4rem', color: '#4a5568', lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }}>
                      {step.desc}
                    </p>
                  </div>
                  {i < 2 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '4rem',
                        right: '-1.6rem',
                        zIndex: 2,
                        color: '#e2e8f0',
                      }}
                    >
                      <ArrowRight size={20} color="#e2e8f0" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SVG BRANCHING TIMELINE (dark) ── */}
      <section className="bg-dark" style={{ padding: '9.6rem 0' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '6rem' }}>
              <span className="eyebrow">Timeline Tree</span>
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
                Three futures from every decision
              </h2>
            </motion.div>

            <motion.div
              variants={fadeUp}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '2.4rem',
                padding: '4.8rem',
                maxWidth: '80rem',
                margin: '0 auto',
              }}
            >
              <svg width="100%" viewBox="0 0 600 200" style={{ display: 'block', overflow: 'visible' }}>
                {/* Trunk */}
                <line x1="60" y1="100" x2="140" y2="100" stroke={`${SIM_COLOR}60`} strokeWidth="2.5" />
                {/* Root node */}
                <circle cx="60" cy="100" r="8" fill={SIM_COLOR} />
                <text x="60" y="120" fill={`${SIM_COLOR}80`} fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">NOW</text>

                {/* Branches */}
                {scenarios.map((s, i) => (
                  <g key={s.id}>
                    {/* Branch line from trunk split */}
                    <line
                      x1="140" y1="100"
                      x2="300" y2={s.y}
                      stroke={`${s.color}50`}
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                    />
                    {/* Extension line */}
                    <line
                      x1="300" y1={s.y}
                      x2="520" y2={s.y}
                      stroke={`${s.color}50`}
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                    />
                    {/* Endpoint node */}
                    <circle cx="520" cy={s.y} r="6" fill={s.color} opacity="0.9" />
                    {/* Label */}
                    <text x="420" y={s.y - 10} fill={`${s.color}90`} fontSize="9" fontFamily="Inter" textAnchor="middle" fontWeight="600">
                      {s.label}
                    </text>
                    {/* Probability */}
                    <text x="540" y={s.y + 4} fill={s.color} fontSize="9" fontFamily="JetBrains Mono" textAnchor="start">
                      {s.probability}%
                    </text>
                  </g>
                ))}

                {/* Branch split point */}
                <circle cx="140" cy="100" r="5" fill="rgba(255,255,255,0.5)" />
              </svg>

              {/* Scenario detail cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))', gap: '1.6rem', marginTop: '4rem' }}>
                {scenarios.map((s) => (
                  <div
                    key={s.id}
                    style={{
                      padding: '2rem',
                      background: `${s.color}08`,
                      border: `1px solid ${s.color}20`,
                      borderRadius: '1.6rem',
                    }}
                  >
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 700, color: s.color, letterSpacing: '0.08em', marginBottom: '0.6rem' }}>
                      SCENARIO {s.id}
                    </div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>
                      {s.label}
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.2rem', color: s.color }}>
                      {s.probability}% likely
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
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
              <span className="eyebrow">Get Started</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: 'clamp(3.2rem, 5vw, 6rem)',
                fontWeight: 900,
                color: '#0a0a0a',
                marginBottom: '2rem',
                fontFamily: 'Inter, sans-serif',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              See the future before it happens.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{ fontSize: '1.8rem', color: '#4a5568', marginBottom: '4rem', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}
            >
              Activate the ORACLE scenario simulator and run your first governance forecast in seconds.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/app" className="btn btn-primary btn-lg">
                Open Simulator Module <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
