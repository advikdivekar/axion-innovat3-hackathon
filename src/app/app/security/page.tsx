'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger, viewport } from '@/lib/animations';
import { useCountUp } from '@/hooks/useCountUp';
import { useApiData } from '@/hooks/useApiData';
import { getThreats } from '@/lib/api';
import type { Threat } from '@/lib/types';

const MOD = '#ff5c16';

const SEVERITY_COLOR: Record<string, string> = {
  critical: '#ff5c16',
  high: '#f59e0b',
  medium: '#baf24a',
  low: '#89b0ff',
};

function timeAgo(ts: string) {
  const diff = Date.now() - new Date(ts).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  return `${Math.floor(m / 60)}h ago`;
}

function KpiCard({ label, end, suffix, color }: { label: string; end: number; suffix?: string; color: string }) {
  const { ref, value } = useCountUp({ end, duration: 1400 });
  return (
    <div className="app-card">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="stat-num" style={{ color }}>
        {value}{suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function ThreatDetail({ threat }: { threat: Threat }) {
  const color = SEVERITY_COLOR[threat.severity] ?? '#888';
  return (
    <div className="app-panel" style={{ background: `${color}04`, border: `1px solid ${color}18`, display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%' }}>
      {/* Severity badges */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', padding: '0.3rem 0.8rem',
          borderRadius: '0.4rem', background: `${color}18`, border: `1px solid ${color}40`,
          color, textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>
          {threat.severity}
        </span>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', padding: '0.3rem 0.8rem',
          borderRadius: '0.4rem',
          background: threat.status === 'active' ? 'rgba(239,68,68,0.12)' : 'rgba(245,158,11,0.12)',
          border: `1px solid ${threat.status === 'active' ? 'rgba(239,68,68,0.35)' : 'rgba(245,158,11,0.35)'}`,
          color: threat.status === 'active' ? '#ef4444' : '#f59e0b',
          textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>
          {threat.status}
        </span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', color: 'rgba(255,255,255,0.3)', marginLeft: 'auto' }}>
          {timeAgo(threat.detectedAt)}
        </span>
      </div>

      {/* Title */}
      <div>
        <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginBottom: '0.8rem', textTransform: 'uppercase' }}>
          Threat
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
          {threat.title}
        </div>
      </div>

      {/* Description */}
      <div>
        <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginBottom: '0.8rem', textTransform: 'uppercase' }}>
          Description
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.3rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: 0 }}>
          {threat.description}
        </p>
      </div>

      {/* Risk score bar */}
      <div>
        <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginBottom: '1rem', textTransform: 'uppercase' }}>
          Risk Score
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <div style={{ flex: 1, height: '0.8rem', borderRadius: '0.4rem', background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
            <div style={{ width: `${threat.riskScore}%`, height: '100%', background: `linear-gradient(90deg, ${color}80, ${color})`, borderRadius: '0.4rem', transition: 'width 0.5s ease' }} />
          </div>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '2rem', fontWeight: 700, color, minWidth: '4rem' }}>{threat.riskScore}</span>
        </div>
      </div>

      {/* Evidence table */}
      <div className="app-card">
        <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginBottom: '1.2rem', textTransform: 'uppercase' }}>
          Evidence
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {[
            { label: 'Detected by', value: threat.detectedBy },
            { label: 'Threat ID', value: `#${threat.id}` },
            { label: 'Type', value: threat.type.replace(/_/g, ' ') },
            { label: 'Detected', value: timeAgo(threat.detectedAt) },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.2rem', color: 'rgba(255,255,255,0.35)' }}>{row.label}</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.1rem', color: 'var(--text-primary)' }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SecurityPage() {
  const { data, loading } = useApiData(getThreats);
  const threats: Threat[] = data ?? [];
  const [selected, setSelected] = useState<Threat | null>(null);

  useEffect(() => {
    if (threats.length > 0 && selected === null) {
      setSelected(threats[0]);
    }
  }, [threats, selected]);

  const activeCount = threats.filter(t => t.status === 'active').length;
  const criticalCount = threats.filter(t => t.severity === 'critical').length;
  const highCount = threats.filter(t => t.severity === 'high').length;
  const threatLevel = criticalCount > 0 ? 'HIGH' : highCount > 0 ? 'ELEVATED' : 'NOMINAL';

  return (
    <div style={{ padding: '2.4rem', color: 'var(--text-primary)', minHeight: '100%' }}>
      {/* Page header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.4rem' }}
      >
        <div style={{ width: '0.8rem', height: '0.8rem', borderRadius: '50%', background: MOD, boxShadow: `0 0 0.8rem ${MOD}`, flexShrink: 0 }} />
        <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '2rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-primary)', margin: 0 }}>
          Security
        </h1>
      </motion.div>

      {/* KPI Row */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.2rem', marginBottom: '2.4rem' }}
      >
        <motion.div variants={fadeUp}>
          <KpiCard label="Active Threats" end={activeCount} color={MOD} />
        </motion.div>
        <motion.div variants={fadeUp}>
          <KpiCard label="Critical" end={criticalCount} color={criticalCount > 0 ? '#ff5c16' : '#22c55e'} />
        </motion.div>
        <motion.div variants={fadeUp}>
          <KpiCard label="High" end={highCount} color={highCount > 0 ? '#f59e0b' : '#22c55e'} />
        </motion.div>
        <motion.div variants={fadeUp}>
          <div className="app-card">
            <div className="stat-num" style={{ color: criticalCount > 0 ? '#ff5c16' : '#22c55e', fontSize: '1.8rem' }}>
              {threatLevel}
            </div>
            <div className="stat-label">Threat Level</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Split 40/60 */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '2rem' }}>
        {/* Left: Threat list */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="app-panel"
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
            Threat Feed
          </div>

          {loading ? (
            <>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="skeleton" style={{ height: '8rem', borderRadius: '0.8rem' }} />
              ))}
            </>
          ) : (
            threats.map(t => {
              const color = SEVERITY_COLOR[t.severity] ?? '#888';
              const isSelected = selected?.id === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelected(t)}
                  style={{
                    textAlign: 'left', cursor: 'pointer', border: 'none', padding: '1.4rem',
                    background: isSelected ? `${color}10` : 'rgba(255,255,255,0.025)',
                    borderRadius: '0.8rem',
                    borderLeft: `3px solid ${isSelected ? color : 'transparent'}`,
                    outline: isSelected ? `1px solid ${color}30` : '1px solid rgba(255,255,255,0.05)',
                    display: 'flex', flexDirection: 'column', gap: '0.6rem',
                    transition: 'all 200ms ease', width: '100%',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.8rem' }}>
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', padding: '0.2rem 0.7rem',
                      borderRadius: '0.3rem', background: `${color}18`, border: `1px solid ${color}40`,
                      color, textTransform: 'uppercase', letterSpacing: '0.08em',
                    }}>
                      {t.severity}
                    </span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', color: 'rgba(255,255,255,0.3)' }}>
                      {timeAgo(t.detectedAt)}
                    </span>
                  </div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.3rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                    {t.title}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ flex: 1, height: '0.3rem', borderRadius: '0.2rem', background: 'rgba(255,255,255,0.07)' }}>
                      <div style={{ width: `${t.riskScore}%`, height: '100%', background: color, borderRadius: '0.2rem' }} />
                    </div>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', color }}>
                      {t.riskScore}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </motion.div>

        {/* Right: Detail panel */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {loading ? (
            <div className="skeleton" style={{ height: '40rem', borderRadius: '1.2rem' }} />
          ) : selected ? (
            <ThreatDetail threat={selected} />
          ) : (
            <div className="app-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '24rem' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.2rem', color: 'rgba(255,255,255,0.2)' }}>
                Select a threat to view details
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
