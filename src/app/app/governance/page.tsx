'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger, viewport } from '@/lib/animations';
import { useCountUp } from '@/hooks/useCountUp';

const MOD = '#d075ff';

interface Voter {
  id: string;
  voterENS?: string;
  voter: string;
  support: number;
  weight: number;
  isWhale: boolean;
}

interface Proposal {
  id: string;
  title: string;
  status: string;
  forVotes: number;
  againstVotes: number;
  abstainVotes: number;
  quorum: number;
  quorumReached: boolean;
  endTimestamp: string;
  impactScore: number;
  aiSummary: string;
  totalVoters: number;
  topVoters: Voter[];
  proposerENS?: string;
}

const MOCK_PROPOSALS: Proposal[] = [
  {
    id: '1', title: 'Treasury Allocation Q2 2026', status: 'active',
    forVotes: 4200000, againstVotes: 980000, abstainVotes: 120000,
    quorum: 3000000, quorumReached: true, endTimestamp: new Date(Date.now() + 86400000 * 3).toISOString(),
    impactScore: 82, aiSummary: 'Proposal to reallocate 15% of treasury reserves into yield-bearing stablecoins to improve runway metrics.', totalVoters: 342,
    topVoters: [
      { id: 'v1', voterENS: 'atlas.eth', voter: '0xabc', support: 1, weight: 980000, isWhale: true },
      { id: 'v2', voterENS: 'hermes.eth', voter: '0xdef', support: 1, weight: 620000, isWhale: true },
      { id: 'v3', voter: '0x1234567890ab', support: 0, weight: 210000, isWhale: false },
    ],
  },
  {
    id: '2', title: 'Fee Switch Activation', status: 'active',
    forVotes: 2100000, againstVotes: 1850000, abstainVotes: 50000,
    quorum: 3000000, quorumReached: true, endTimestamp: new Date(Date.now() + 86400000 * 1).toISOString(),
    impactScore: 74, aiSummary: 'Activating the protocol fee switch would redirect 0.05% of swap volume to the DAO treasury.', totalVoters: 198,
    topVoters: [
      { id: 'v4', voterENS: 'oracle.eth', voter: '0x999', support: 1, weight: 540000, isWhale: true },
    ],
  },
  {
    id: '3', title: 'Protocol Upgrade v3.1', status: 'active',
    forVotes: 5800000, againstVotes: 210000, abstainVotes: 90000,
    quorum: 3000000, quorumReached: true, endTimestamp: new Date(Date.now() + 86400000 * 7).toISOString(),
    impactScore: 91, aiSummary: 'Upgrade to v3.1 introduces flash loan protection and reduces gas costs by an estimated 18%.', totalVoters: 512,
    topVoters: [],
  },
];

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
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

export default function GovernancePage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [selected, setSelected] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blockchain/proposals')
      .then(r => r.json())
      .then((data: Proposal[]) => {
        const list = Array.isArray(data) && data.length > 0 ? data : MOCK_PROPOSALS;
        setProposals(list);
        setSelected(list[0] ?? null);
        setLoading(false);
      })
      .catch(() => {
        setProposals(MOCK_PROPOSALS);
        setSelected(MOCK_PROPOSALS[0]);
        setLoading(false);
      });
  }, []);

  const totalVotes = proposals.reduce((s, p) => s + p.forVotes + p.againstVotes + p.abstainVotes, 0);
  const activeCount = proposals.filter(p => p.status === 'active').length;
  const quorumReached = proposals.filter(p => p.quorumReached).length;
  const participationPct = proposals.length
    ? Math.round((proposals.filter(p => p.quorumReached).length / proposals.length) * 100)
    : 0;

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
          Governance
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
          <KpiCard label="Active Proposals" end={activeCount} color={MOD} />
        </motion.div>
        <motion.div variants={fadeUp}>
          <KpiCard label="Total Votes" end={Math.round(totalVotes / 1000)} suffix="K" color="#89b0ff" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <KpiCard label="Participation %" end={participationPct} suffix="%" color="#baf24a" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <KpiCard label="Quorum Reached" end={quorumReached} color="#f59e0b" />
        </motion.div>
      </motion.div>

      {/* Main 60/40 split */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '2rem' }}>
        {/* Left: Proposal list */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
        >
          <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
            Proposals
          </div>

          {loading ? (
            <>
              {[1, 2, 3].map(i => (
                <div key={i} className="skeleton" style={{ height: '9.6rem', borderRadius: '0.8rem' }} />
              ))}
            </>
          ) : (
            proposals.map(p => {
              const total = p.forVotes + p.againstVotes + p.abstainVotes || 1;
              const forPct = (p.forVotes / total) * 100;
              const againstPct = (p.againstVotes / total) * 100;
              const isActive = selected?.id === p.id;
              const statusColor = p.status === 'active' ? '#22c55e' : p.status === 'passed' ? '#22c55e' : '#ef4444';

              return (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  style={{
                    textAlign: 'left', cursor: 'pointer', border: 'none', padding: '1.6rem',
                    background: isActive ? `${MOD}0d` : 'rgba(255,255,255,0.025)',
                    borderRadius: '1rem',
                    borderLeft: `3px solid ${isActive ? MOD : 'transparent'}`,
                    outline: isActive ? `1px solid ${MOD}35` : '1px solid rgba(255,255,255,0.06)',
                    display: 'flex', flexDirection: 'column', gap: '1rem',
                    transition: 'all 200ms ease', width: '100%',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.8rem' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4, flex: 1 }}>
                      {p.title}
                    </span>
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', padding: '0.2rem 0.7rem',
                      borderRadius: '0.4rem', background: `${statusColor}18`,
                      border: `1px solid ${statusColor}40`, color: statusColor,
                      flexShrink: 0, textTransform: 'uppercase', letterSpacing: '0.08em',
                    }}>
                      {p.status}
                    </span>
                  </div>

                  {/* Vote bar */}
                  <div>
                    <div style={{ height: '0.5rem', borderRadius: '0.3rem', background: 'rgba(255,255,255,0.08)', overflow: 'hidden', display: 'flex' }}>
                      <div style={{ width: `${forPct}%`, background: '#22c55e', transition: 'width 500ms ease' }} />
                      <div style={{ width: `${againstPct}%`, background: '#ef4444', transition: 'width 500ms ease' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem' }}>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', color: '#22c55e' }}>FOR {fmt(p.forVotes)}</span>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', color: '#ef4444' }}>AGAINST {fmt(p.againstVotes)}</span>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </motion.div>

        {/* Right: Top Voters + AI Summary */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}
        >
          {/* Top Voters */}
          <div className="app-panel">
            <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginBottom: '1.2rem', textTransform: 'uppercase' }}>
              Top Voters
            </div>
            {loading ? (
              <div className="skeleton" style={{ height: '6.4rem', borderRadius: '0.8rem' }} />
            ) : selected && selected.topVoters.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {selected.topVoters.map(v => (
                  <div key={v.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1.2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.6rem' }}>
                    <div style={{ width: '0.6rem', height: '0.6rem', borderRadius: '50%', background: v.support === 1 ? '#22c55e' : v.support === 0 ? '#ef4444' : '#f59e0b', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.1rem', color: 'var(--text-primary)', flex: 1 }}>
                      {v.voterENS ?? `${v.voter.slice(0, 6)}...`}
                    </span>
                    {v.isWhale && (
                      <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.9rem', padding: '0.1rem 0.6rem', borderRadius: '0.3rem', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b' }}>
                        WHALE
                      </span>
                    )}
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.1rem', color: v.support === 1 ? '#22c55e' : '#ef4444' }}>
                      {fmt(v.weight)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ color: 'var(--text-tertiary)', fontFamily: 'JetBrains Mono, monospace', fontSize: '1.1rem' }}>
                No voter data available
              </div>
            )}
          </div>

          {/* AI Summary */}
          <div className="app-panel" style={{ background: `${MOD}06`, border: `1px solid ${MOD}18` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
              <div style={{ width: '0.6rem', height: '0.6rem', borderRadius: '50%', background: MOD, boxShadow: `0 0 0.6rem ${MOD}` }} />
              <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.12em', color: MOD }}>
                AI SUMMARY
              </span>
            </div>
            {loading ? (
              <div className="skeleton" style={{ height: '6.4rem', borderRadius: '0.8rem' }} />
            ) : (
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.3rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: 0 }}>
                {selected?.aiSummary ?? 'Select a proposal to view AI analysis.'}
              </p>
            )}
          </div>

          {/* Quorum status if proposal selected */}
          {!loading && selected && (
            <div className="app-card">
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginBottom: '1rem' }}>
                QUORUM STATUS
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.1rem', color: 'rgba(255,255,255,0.4)' }}>
                  {fmt(selected.forVotes + selected.againstVotes)} / {fmt(selected.quorum)}
                </span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.1rem', color: selected.quorumReached ? '#22c55e' : '#f59e0b' }}>
                  {selected.quorumReached ? 'REACHED' : 'PENDING'}
                </span>
              </div>
              <div style={{ height: '0.5rem', borderRadius: '0.3rem', background: 'rgba(255,255,255,0.07)' }}>
                <div style={{
                  width: `${Math.min(100, ((selected.forVotes + selected.againstVotes) / selected.quorum) * 100)}%`,
                  height: '100%',
                  background: selected.quorumReached ? '#22c55e' : '#f59e0b',
                  borderRadius: '0.3rem',
                  transition: 'width 0.6s ease',
                }} />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
