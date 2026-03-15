'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Database, Brain, BarChart3, Globe2, Layers, Cloud } from 'lucide-react';
import { fadeUp, stagger, viewport } from '@/lib/animations';

const modules = [
  { color: '#00d4ff', name: 'Universe', desc: 'Real-time 3D neural network of your entire DAO ecosystem rendered in WebGL.' },
  { color: '#d075ff', name: 'Governance', desc: 'Proposal tracking, whale analysis, quorum risk scoring, and delegate analytics.' },
  { color: '#f59e0b', name: 'Treasury', desc: 'Live token flow monitoring, DeFi yield positions, and financial anomaly detection.' },
  { color: '#89b0ff', name: 'Contributors', desc: 'Reputation scoring, XP system, and collaboration network mapping.' },
  { color: '#ff5c16', name: 'Security', desc: 'AI-powered Sybil detection, flash loan simulation, and governance threat alerts.' },
  { color: '#baf24a', name: 'Simulator', desc: 'Branching scenario forecasts across three AI-generated future timelines.' },
];

const techStack = [
  { name: 'Ethereum', desc: 'On-chain governance data via governor contracts and real-time event logs indexed per block.', Icon: Globe2, color: '#627EEA' },
  { name: 'Alchemy', desc: 'Enterprise-grade node infrastructure for sub-2s blockchain indexing at any scale.', Icon: Layers, color: '#363FF9' },
  { name: 'Gemini AI', desc: 'Multimodal AI powering all four specialized DAO intelligence agents around the clock.', Icon: Brain, color: '#4285F4' },
  { name: 'Supabase', desc: 'Real-time database with live subscriptions for instant event streaming to every dashboard.', Icon: Cloud, color: '#3ECF8E' },
];

export default function PlatformPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="bg-dark dot-grid"
        style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '11.2rem 0 8rem' }}
      >
        <div className="container">
          <motion.div variants={stagger} initial="hidden" animate="visible" style={{ maxWidth: '72rem' }}>
            <motion.div variants={fadeUp}>
              <span className="eyebrow">Platform</span>
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
              A Complete{' '}
              <span className="gradient-text">Intelligence Layer</span>
              <br />
              for Your DAO
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
              Axion connects directly to your governor contract and delivers real-time AI intelligence
              across governance, treasury, contributors, and security — all in one command center.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
              <Link href="/app" className="btn btn-neon btn-lg">
                Enter the Platform <ArrowRight size={18} />
              </Link>
              <Link href="/docs" className="btn btn-outline-white btn-lg">
                Read the Docs
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── ARCHITECTURE (white) ── */}
      <section className="bg-white" style={{ padding: '9.6rem 0' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
            <motion.div variants={fadeUp}>
              <span className="eyebrow">Architecture</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: 'clamp(2.8rem, 4vw, 4.8rem)',
                fontWeight: 900,
                color: '#0a0a0a',
                lineHeight: 1.1,
                marginBottom: '6rem',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '-0.02em',
              }}
            >
              Data flows to intelligence in milliseconds
            </motion.h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '4rem',
                alignItems: 'center',
              }}
            >
              {[
                {
                  Icon: Database,
                  title: 'Data',
                  desc: 'Blockchain events, on-chain proposals, wallet activity — indexed in real time via Alchemy.',
                  color: '#00d4ff',
                },
                {
                  Icon: Brain,
                  title: 'AI Processing',
                  desc: 'Four specialized Gemini agents analyze data streams, detect anomalies, and generate insights.',
                  color: '#d075ff',
                },
                {
                  Icon: BarChart3,
                  title: 'Insights',
                  desc: 'Actionable intelligence surfaced through the 3D universe, natural language queries, and live alerts.',
                  color: '#baf24a',
                },
              ].map((step, i) => (
                <motion.div key={step.title} variants={fadeUp} style={{ position: 'relative' }}>
                  <div className="card-white" style={{ padding: '3.2rem 2.4rem', textAlign: 'center' }}>
                    <div
                      style={{
                        width: '5.6rem',
                        height: '5.6rem',
                        borderRadius: '50%',
                        background: `${step.color}14`,
                        border: `1px solid ${step.color}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2rem',
                      }}
                    >
                      <step.Icon size={24} color={step.color} />
                    </div>
                    <h3
                      style={{
                        fontSize: '2rem',
                        fontWeight: 700,
                        color: '#0a0a0a',
                        marginBottom: '1rem',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
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
                        top: '50%',
                        right: '-2.4rem',
                        transform: 'translateY(-50%)',
                        zIndex: 2,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <ArrowRight size={24} color="#00d4ff" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MODULE OVERVIEW (dark) ── */}
      <section className="bg-dark" style={{ padding: '9.6rem 0' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
            <motion.div variants={fadeUp}>
              <span className="eyebrow">Modules</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: 'clamp(2.8rem, 4vw, 4.8rem)',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.1,
                marginBottom: '4.8rem',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '-0.02em',
              }}
            >
              Six modules. Total command.
            </motion.h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(28rem, 1fr))',
                gap: '2rem',
              }}
            >
              {modules.map((mod) => (
                <motion.div key={mod.name} variants={fadeUp} className="card-glass" style={{ padding: '2.8rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.4rem' }}>
                    <div
                      style={{
                        width: '0.8rem',
                        height: '0.8rem',
                        borderRadius: '50%',
                        background: mod.color,
                        boxShadow: `0 0 0.8rem ${mod.color}80`,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: mod.color,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {mod.name}
                    </span>
                  </div>
                  <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }}>
                    {mod.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TECH STACK (off-white) ── */}
      <section className="bg-off" style={{ padding: '9.6rem 0' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
            <motion.div variants={fadeUp}>
              <span className="eyebrow">Technology</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: 'clamp(2.8rem, 4vw, 4.8rem)',
                fontWeight: 900,
                color: '#0a0a0a',
                lineHeight: 1.1,
                marginBottom: '4.8rem',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '-0.02em',
              }}
            >
              Built on best-in-class infrastructure
            </motion.h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(24rem, 1fr))',
                gap: '2rem',
              }}
            >
              {techStack.map(({ name, desc, Icon, color }) => (
                <motion.div key={name} variants={fadeUp} className="card-white" style={{ padding: '2.8rem' }}>
                  <div
                    style={{
                      width: '4.8rem',
                      height: '4.8rem',
                      borderRadius: '1.2rem',
                      background: `${color}14`,
                      border: `1px solid ${color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.6rem',
                    }}
                  >
                    <Icon size={22} color={color} />
                  </div>
                  <h3
                    style={{
                      fontSize: '1.8rem',
                      fontWeight: 700,
                      color: '#0a0a0a',
                      marginBottom: '0.8rem',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {name}
                  </h3>
                  <p style={{ fontSize: '1.3rem', color: '#4a5568', lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }}>
                    {desc}
                  </p>
                </motion.div>
              ))}
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
            style={{ maxWidth: '56rem', margin: '0 auto' }}
          >
            <motion.div variants={fadeUp}>
              <span className="eyebrow">Get Started</span>
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
              Your DAO deserves{' '}
              <span className="gradient-text">total visibility.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: '1.8rem',
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '4rem',
                lineHeight: 1.6,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Connect your governor contract and have a live intelligence dashboard in under 60 seconds.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/app" className="btn btn-neon btn-lg">
                Enter the Universe <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
