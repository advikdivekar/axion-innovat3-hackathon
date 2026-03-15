'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger, viewport } from '@/lib/animations';
import { useCountUp } from '@/hooks/useCountUp';

const MOD = '#89b0ff';

interface Contributor {
  address: string;
  ensName?: string;
  votingPower: number;
  xp: number;
  level: number;
  contributorClass: string;
  participationRate: number;
  activityScore: number;
  proposalsCreated: number;
  votesCast: number;
  lastActive: string;
}

const MOCK_CONTRIBUTORS: Contributor[] = [
  { address: '0x1111111111111111', ensName: 'atlas.eth', votingPower: 980000, xp: 42000, level: 12, contributorClass: 'architect', participationRate: 0.94, activityScore: 97, proposalsCreated: 8, votesCast: 142, lastActive: new Date(Date.now() - 3600000).toISOString() },
  { address: '0x2222222222222222', ensName: 'hermes.eth', votingPower: 620000, xp: 36500, level: 10, contributorClass: 'diplomat', participationRate: 0.87, activityScore: 91, proposalsCreated: 5, votesCast: 118, lastActive: new Date(Date.now() - 86400000).toISOString() },
  { address: '0x3333333333333333', ensName: 'oracle.eth', votingPower: 540000, xp: 28800, level: 9, contributorClass: 'sentinel', participationRate: 0.78, activityScore: 83, proposalsCreated: 3, votesCast: 97, lastActive: new Date(Date.now() - 172800000).toISOString() },
  { address: '0x4444444444444444', ensName: 'nexus.eth', votingPower: 340000, xp: 19200, level: 7, contributorClass: 'merchant', participationRate: 0.65, activityScore: 71, proposalsCreated: 2, votesCast: 64, lastActive: new Date(Date.now() - 432000000).toISOString() },
  { address: '0x5555555555555555', votingPower: 210000, xp: 12400, level: 5, contributorClass: 'explorer', participationRate: 0.52, activityScore: 58, proposalsCreated: 1, votesCast: 41, lastActive: new Date(Date.now() - 604800000).toISOString() },
];

const CLASS_COLOR: Record<string, string> = {
  architect: '#d075ff',
  diplomat: '#00d4ff',
  sentinel: '#ff5c16',
  merchant: '#f59e0b',
  explorer: '#22c55e',
};

function fmtXP(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

function timeAgo(ts: string) {
  const diff = Date.now() - new Date(ts).getTime();
  const d = Math.floor(diff / 86400000);
  if (d === 0) return 'today';
  return `${d}d ago`;
}

function KpiCard({ label, end, prefix, suffix, color }: { label: string; end: number; prefix?: string; suffix?: string; color: string }) {
  const { ref, value } = useCountUp({ end, duration: 1400 });
  return (
    <div className="app-card">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="stat-num" style={{ color }}>
        {prefix}{value}{suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function ContributorsPage() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'xp' | 'proposals'>('xp');

  useEffect(() => {
    fetch('/api/blockchain/contributors')
      .then(r => r.json())
      .then(data => {
        const list = Array.isArray(data) && data.length > 0 ? data : MOCK_CONTRIBUTORS;
        setContributors(list);
        setLoading(false);
      })
      .catch(() => {
        setContributors(MOCK_CONTRIBUTORS);
        setLoading(false);
      });
  }, []);

  const sorted = [...contributors].sort((a, b) => {
    if (sortBy === 'xp') return b.xp - a.xp;
    return b.proposalsCreated - a.proposalsCreated;
  });

  const totalXP = contributors.reduce((s, c) => s + c.xp, 0);
  const active30d = contributors.filter(c => Date.now() - new Date(c.lastActive).getTime() < 30 * 86400000).length;
  const totalProposals = contributors.reduce((s, c) => s + c.proposalsCreated, 0);

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
          Contributors
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
          <KpiCard label="Total Contributors" end={contributors.length} color={MOD} />
        </motion.div>
        <motion.div variants={fadeUp}>
          <KpiCard label="Active (30d)" end={active30d} color="#22c55e" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <KpiCard label="Total XP" end={Math.round(totalXP / 1000)} suffix="K" color="#f59e0b" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <KpiCard label="Proposals Authored" end={totalProposals} color="#d075ff" />
        </motion.div>
      </motion.div>

      {/* Sort controls */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.6rem' }}
      >
        <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
          Leaderboard
        </div>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          {(['xp', 'proposals'] as const).map(s => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              style={{
                padding: '0.4rem 1.2rem',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: sortBy === s ? `${MOD}18` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${sortBy === s ? `${MOD}50` : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '0.5rem',
                color: sortBy === s ? MOD : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                transition: 'all 180ms ease',
              }}
            >
              Sort: {s === 'xp' ? 'XP' : 'Proposals'}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="app-panel"
        style={{ padding: 0, overflow: 'hidden' }}
      >
        {/* Table header */}
        <div style={{ display: 'grid', gridTemplateColumns: '3.2rem 1fr 8rem 6rem 8rem 8rem', gap: '1.2rem', padding: '1rem 1.6rem', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
          {['Rank', 'Address', 'XP', 'Level', 'Proposals', 'Votes'].map(h => (
            <span key={h} style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>{h}</span>
          ))}
        </div>

        {loading ? (
          <div style={{ padding: '1.6rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="skeleton" style={{ height: '4rem', borderRadius: '0.6rem' }} />
            ))}
          </div>
        ) : (
          sorted.map((c, i) => {
            const color = CLASS_COLOR[c.contributorClass] ?? '#888';
            return (
              <div
                key={c.address}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '3.2rem 1fr 8rem 6rem 8rem 8rem',
                  gap: '1.2rem',
                  padding: '1.1rem 1.6rem',
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                  transition: 'background 150ms',
                  cursor: 'default',
                  alignItems: 'center',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.025)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.1rem', color: i < 3 ? MOD : 'rgba(255,255,255,0.25)', fontWeight: i < 3 ? 700 : 400 }}>
                  #{i + 1}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '2.4rem', height: '2.4rem', borderRadius: '50%', background: `${color}18`, border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', fontWeight: 700, color }}>{(c.ensName ?? c.address).slice(0, 2).toUpperCase()}</span>
                  </div>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                    {c.ensName ?? `${c.address.slice(0, 6)}...${c.address.slice(-4)}`}
                  </span>
                </div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.1rem', color: MOD }}>{fmtXP(c.xp)} XP</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ padding: '0.2rem 0.6rem', borderRadius: '0.4rem', background: `${color}15`, border: `1px solid ${color}35` }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', color }}>{c.level}</span>
                  </div>
                </div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.1rem', color: '#d075ff' }}>{c.proposalsCreated}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.1rem', color: 'rgba(255,255,255,0.5)' }}>{c.votesCast}</span>
              </div>
            );
          })
        )}
      </motion.div>
    </div>
  );
}
