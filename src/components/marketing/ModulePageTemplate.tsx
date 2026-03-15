'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ModuleFeature {
  title: string;
  desc: string;
  iconPath: string;
}

export interface ModuleMetric {
  value: string;
  label: string;
}

export interface ModulePageTemplateProps {
  /** Module accent color (hex) */
  color: string;
  /** Section label (e.g. "Governance") */
  tag: string;
  /** Large H1 title */
  title: string;
  /** Gradient keyword in the title (wrapped in color) */
  titleAccent?: string;
  /** Hero subtext */
  subtitle: string;
  /** Short tagline beneath the heading */
  tagline?: string;
  /** 3–4 key metrics shown in the stats row */
  metrics: ModuleMetric[];
  /** Feature list (4–6 items) */
  features: ModuleFeature[];
  /** The visualization component rendered in the hero right column */
  visualization: React.ReactNode;
  /** Optional secondary visualization for a mid-page section */
  secondaryViz?: React.ReactNode;
  /** CTA destination (default '/app') */
  ctaHref?: string;
  /** CTA label */
  ctaLabel?: string;
}

// ─── Internal Components ──────────────────────────────────────────────────────

function FeatureItem({
  feature,
  color,
  index,
}: {
  feature: ModuleFeature;
  color: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        gap: 16,
        padding: '20px',
        background: 'rgba(255,255,255,0.7)',
        border: '1px solid rgba(0,0,0,0.06)',
        borderRadius: 6,
        transition: 'border-color 200ms ease, box-shadow 200ms ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${color}30`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px rgba(0,0,0,0.06)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.06)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: `${color}12`,
          border: `1px solid ${color}25`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d={feature.iconPath} />
        </svg>
      </div>
      <div>
        <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', color: '#0a0a0f', marginBottom: 5 }}>
          {feature.title.toUpperCase()}
        </div>
        <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.92rem', color: '#4a5268', lineHeight: 1.55, margin: 0 }}>
          {feature.desc}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Template ─────────────────────────────────────────────────────────────────

export function ModulePageTemplate({
  color,
  tag,
  title,
  titleAccent,
  subtitle,
  tagline,
  metrics,
  features,
  visualization,
  secondaryViz,
  ctaHref = '/app',
  ctaLabel = 'Open in Command Center',
}: ModulePageTemplateProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="section-bg-1 section-padding"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />
        {/* Accent glow blob */}
        <div
          style={{
            position: 'absolute',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`,
            top: -150,
            right: -100,
            pointerEvents: 'none',
            animation: 'blob-float 10s ease-in-out infinite',
          }}
        />

        <div
          className="container-max"
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
            alignItems: 'center',
          }}
        >
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
          >
            <span
              className="section-label"
              style={{ display: 'flex', color }}
            >
              {tag}
            </span>
            <h1
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: 'clamp(1.9rem, 4vw, 3rem)',
                fontWeight: 900,
                letterSpacing: '0.05em',
                lineHeight: 1.08,
                color: '#0a0a0f',
                margin: 0,
              }}
            >
              {titleAccent ? (
                <>
                  {title.replace(titleAccent, '')}{' '}
                  <span
                    style={{
                      color,
                      textShadow: `0 0 40px ${color}40`,
                    }}
                  >
                    {titleAccent}
                  </span>
                </>
              ) : (
                title
              )}
            </h1>
            {tagline && (
              <p style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.12em', color, margin: 0, textTransform: 'uppercase' as const }}>
                {tagline}
              </p>
            )}
            <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.05rem', color: '#4a5268', lineHeight: 1.7, margin: 0, maxWidth: 480 }}>
              {subtitle}
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link
                href={ctaHref}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '13px 28px',
                  background: color,
                  color: color === '#ffd700' || color === '#b88a00' ? '#0a0a0f' : '#ffffff',
                  border: 'none',
                  borderRadius: 6,
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                  boxShadow: `0 4px 20px ${color}40`,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${color}55`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${color}40`; }}
              >
                {ctaLabel}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/platform" className="btn-ghost" style={{ padding: '13px 22px' }}>
                View Platform
              </Link>
            </div>
          </motion.div>

          {/* Right: visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {visualization}
          </motion.div>
        </div>
      </section>

      {/* ── Metrics Bar ──────────────────────────────────────────────────── */}
      <section
        className="section-bg-2"
        style={{ borderTop: `1px solid ${color}15`, borderBottom: `1px solid ${color}15`, padding: '8px 0' }}
      >
        <div
          className="container-max"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            gap: 0,
          }}
        >
          {metrics.map((m) => (
            <div
              key={m.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                padding: '24px 20px',
                flex: '1 1 140px',
              }}
            >
              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  fontWeight: 700,
                  lineHeight: 1,
                  color,
                }}
              >
                {m.value}
              </span>
              <span
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase' as const,
                  color: '#6b7280',
                }}
              >
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="section-bg-1 section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <span className="section-label" style={{ justifyContent: 'center', marginBottom: 16, color }}>
              {tag} Features
            </span>
            <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '0.06em', color: '#0a0a0f', margin: 0 }}>
              Everything You Need
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 12 }}>
            {features.map((feat, i) => (
              <FeatureItem key={feat.title} feature={feat} color={color} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Optional secondary visualization ─────────────────────────────── */}
      {secondaryViz && (
        <section className="section-bg-3 section-padding">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              {secondaryViz}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="section-bg-2 section-padding" style={{ textAlign: 'center' }}>
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, maxWidth: 520, margin: '0 auto' }}
          >
            {/* Mini accent bar */}
            <div style={{ width: 48, height: 3, background: color, borderRadius: 2, boxShadow: `0 0 12px ${color}60` }} />
            <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '0.06em', color: '#0a0a0f', margin: 0 }}>
              Ready to Command?
            </h2>
            <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.05rem', color: '#4a5268', lineHeight: 1.65, margin: 0 }}>
              Access the full {tag} module inside the Axion Command Center.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link href={ctaHref} className="btn-cta">
                {ctaLabel}
              </Link>
              <Link href="/" className="btn-ghost" style={{ padding: '14px 22px' }}>
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
