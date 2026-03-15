'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, Shield, Home, Code, ArrowRight } from 'lucide-react';
import { fadeUp, stagger, viewport } from '@/lib/animations';

const mission = [
  {
    Icon: Eye,
    title: 'Radical Transparency',
    desc: 'Every data source, every algorithm, every agent decision is auditable. Open source by default. We build in public.',
    color: '#00d4ff',
  },
  {
    Icon: Shield,
    title: 'No Trust Required',
    desc: 'Axion reads chain state. It never holds funds, keys, or voting power. Verify everything on-chain at any time.',
    color: '#d075ff',
  },
  {
    Icon: Home,
    title: 'DAO Sovereignty',
    desc: 'Self-hosting first. Every byte of your governance data stays under your control. We\'re a tool, not a custodian.',
    color: '#f59e0b',
  },
];

const team = [
  {
    name: 'Alex Chen',
    role: 'Founder & CEO',
    bio: 'Former protocol researcher at a top-4 DeFi protocol. Shipped governance tooling used by 80+ DAOs worldwide.',
    initials: 'AC',
    color: '#00d4ff',
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Engineering',
    bio: 'Previously led infrastructure at a major L2. Obsessed with sub-second data pipelines and zero-downtime deploys.',
    initials: 'PS',
    color: '#d075ff',
  },
  {
    name: 'Marcus Okonkwo',
    role: 'AI Lead',
    bio: 'PhD in computational social choice. Built the Monte Carlo governance simulation engine and all four AI agents.',
    initials: 'MO',
    color: '#f59e0b',
  },
  {
    name: 'Sofia Reyes',
    role: 'Design & Product',
    bio: 'ex-Figma, ex-Coinbase. Designed the 3D Universe interface and the entire Axion visual design language.',
    initials: 'SR',
    color: '#ff5c16',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO (dark) ── */}
      <section
        className="bg-dark dot-grid"
        style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', padding: '11.2rem 0 8rem' }}
      >
        <div className="container">
          <motion.div variants={stagger} initial="hidden" animate="visible" style={{ maxWidth: '72rem' }}>
            <motion.div variants={fadeUp}>
              <span className="eyebrow">About Axion</span>
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
              Built for the{' '}
              <span className="gradient-text">people who govern.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: '1.8rem',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.7,
                marginBottom: '1.6rem',
                maxWidth: '56rem',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Axion started because governance contributors were drowning in fragmented tools, manual spreadsheets, and late-night Discord alerts about proposals they had no time to properly analyze.
            </motion.p>
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: '1.8rem',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.7,
                marginBottom: '4rem',
                maxWidth: '56rem',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              We built the command center we wished existed. Four AI agents, one 3D universe, zero spreadsheets.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
              <Link href="/app" className="btn btn-neon btn-lg">
                Launch App <ArrowRight size={18} />
              </Link>
              <Link href="/docs" className="btn btn-outline-white btn-lg">
                Read Docs
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── MISSION / VALUES (white) ── */}
      <section className="bg-white" style={{ padding: '9.6rem 0' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '6rem' }}>
              <span className="eyebrow">Our Mission</span>
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
                What we stand for
              </h2>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(28rem, 1fr))', gap: '2.4rem' }}>
              {mission.map(({ Icon, title, desc, color }) => (
                <motion.div key={title} variants={fadeUp} className="card-white" style={{ padding: '3.2rem' }}>
                  <div
                    style={{
                      width: '5.6rem',
                      height: '5.6rem',
                      borderRadius: '1.6rem',
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
                  <h3 style={{ fontSize: '2rem', fontWeight: 700, color: '#0a0a0a', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
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

      {/* ── TEAM (off-white) ── */}
      <section className="bg-off" style={{ padding: '9.6rem 0' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '6rem' }}>
              <span className="eyebrow">Team</span>
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
                The people behind Axion
              </h2>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(28rem, 1fr))', gap: '2rem' }}>
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  variants={fadeUp}
                  className="card-white"
                  style={{ padding: '2.8rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.6rem', marginBottom: '1.6rem' }}>
                    <div
                      style={{
                        width: '5.6rem',
                        height: '5.6rem',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${member.color}30, ${member.color}10)`,
                        border: `2px solid ${member.color}40`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: member.color }}>
                        {member.initials}
                      </span>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.6rem', fontWeight: 700, color: '#0a0a0a' }}>
                        {member.name}
                      </div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.3rem', color: member.color, fontWeight: 600 }}>
                        {member.role}
                      </div>
                    </div>
                  </div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.4rem', color: '#4a5568', lineHeight: 1.65 }}>
                    {member.bio}
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
            style={{ maxWidth: '52rem', margin: '0 auto' }}
          >
            <motion.div variants={fadeUp}>
              <span className="eyebrow">Join Us</span>
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
              Join the{' '}
              <span className="gradient-text">mission.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{ fontSize: '1.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '4rem', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}
            >
              We&apos;re building in public. Star the repo, join the Discord, or connect your DAO and tell us what to build next.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/app" className="btn btn-neon btn-lg">
                Launch App <ArrowRight size={18} />
              </Link>
              <Link href="/docs" className="btn btn-outline-white btn-lg">
                <Code size={16} /> Contribute
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
