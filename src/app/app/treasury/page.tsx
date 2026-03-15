'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger, viewport } from '@/lib/animations';
import { useCountUp } from '@/hooks/useCountUp';
import { useApiData } from '@/hooks/useApiData';
import { getTreasury } from '@/lib/api';
import { MOCK_TREASURY } from '@/lib/mockData';
import type { TreasuryState } from '@/lib/types';

const MOD = '#f59e0b';
const TOKEN_COLORS = [MOD, '#00d4ff', '#d075ff', '#22c55e', '#89b0ff'];

function fmtUSD(n: number) {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
}

function timeAgo(ts: string) {
  const diff = Date.now() - new Date(ts).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  return `${Math.floor(m / 60)}h ago`;
}

function KpiCard({ label, end, prefix, suffix, color, decimals }: { label: string; end: number; prefix?: string; suffix?: string; color: string; decimals?: number }) {
  const { ref, value } = useCountUp({ end, duration: 1400, decimals: decimals ?? 0 });
  return (
    <div className="app-card">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="stat-num" style={{ color }}>
        {prefix}{value}{suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function TreasuryPage() {
  const { data, loading } = useApiData(getTreasury);
  const d: TreasuryState = data ?? MOCK_TREASURY;

  const runwayYears = Math.floor(d.runwayDays / 365);
  const runwayMonths = Math.floor((d.runwayDays % 365) / 30);
  const circumference = 2 * Math.PI * 30;

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
          Treasury
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
          {loading ? (
            <div className="skeleton" style={{ height: '6.4rem', borderRadius: '0.8rem' }} />
          ) : (
            <KpiCard label="Total Value" end={Math.round(d.totalValueUSD / 1e6)} prefix="$" suffix="M" color={MOD} />
          )}
        </motion.div>
        <motion.div variants={fadeUp}>
          {loading ? (
            <div className="skeleton" style={{ height: '6.4rem', borderRadius: '0.8rem' }} />
          ) : (
            <KpiCard label="30d Net Flow" end={Math.round(d.netFlow24h / 1e3)} prefix="+" suffix="K" color="#22c55e" />
          )}
        </motion.div>
        <motion.div variants={fadeUp}>
          {loading ? (
            <div className="skeleton" style={{ height: '6.4rem', borderRadius: '0.8rem' }} />
          ) : (
            <KpiCard label="Health Score" end={d.healthScore} color={d.healthScore >= 70 ? '#22c55e' : d.healthScore >= 40 ? MOD : '#ef4444'} />
          )}
        </motion.div>
        <motion.div variants={fadeUp}>
          {loading ? (
            <div className="skeleton" style={{ height: '6.4rem', borderRadius: '0.8rem' }} />
          ) : (
            <div className="app-card">
              <div className="stat-num" style={{ color: '#00d4ff' }}>{runwayYears}y {runwayMonths}m</div>
              <div className="stat-label">Runway</div>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Main content */}
      <div style={{ display: 'grid', gridTemplateColumns: '16rem 1fr', gap: '2rem', alignItems: 'start' }}>
        {/* Health score ring */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="app-card"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '2rem 1.2rem' }}
        >
          <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
            Health Score
          </span>
          {loading ? (
            <div className="skeleton" style={{ width: '8rem', height: '8rem', borderRadius: '50%' }} />
          ) : (
            <div style={{ position: 'relative', width: '8rem', height: '8rem' }}>
              <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                <circle
                  cx="40" cy="40" r="30" fill="none"
                  stroke={d.healthScore >= 70 ? '#22c55e' : d.healthScore >= 40 ? MOD : '#ef4444'}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(d.healthScore / 100) * circumference} ${circumference}`}
                  style={{ transition: 'stroke-dasharray 1s ease' }}
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {d.healthScore}
                </span>
              </div>
            </div>
          )}
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            <div style={{ width: '0.6rem', height: '0.6rem', borderRadius: '50%', background: d.healthScore >= 70 ? '#22c55e' : MOD }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', fontWeight: 600, color: d.healthScore >= 70 ? '#22c55e' : MOD }}>
              {d.healthScore >= 70 ? 'HEALTHY' : 'WATCH'}
            </span>
          </div>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Token allocation */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="app-panel"
          >
            <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginBottom: '1.6rem', textTransform: 'uppercase' }}>
              Asset Allocation
            </div>
            {loading ? (
              <>
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="skeleton" style={{ height: '3.2rem', borderRadius: '0.6rem', marginBottom: '0.8rem' }} />
                ))}
              </>
            ) : (
              <>
                {/* Stacked bar */}
                <div style={{ height: '2.4rem', borderRadius: '0.6rem', overflow: 'hidden', display: 'flex', marginBottom: '1.6rem' }}>
                  {d.tokens.map((t, i) => (
                    <div key={t.symbol} style={{ width: `${t.percentage}%`, background: TOKEN_COLORS[i] ?? '#888', transition: 'width 0.6s ease' }} />
                  ))}
                </div>

                {/* Token rows */}
                {d.tokens.slice(0, 5).map((t, i) => (
                  <div key={t.symbol} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ width: '0.8rem', height: '0.8rem', borderRadius: '0.2rem', background: TOKEN_COLORS[i] ?? '#888', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.2rem', color: 'var(--text-primary)', width: '5.2rem' }}>{t.symbol}</span>
                    <div style={{ flex: 1, height: '0.5rem', borderRadius: '0.3rem', background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                      <div style={{ width: `${t.percentage}%`, height: '100%', background: TOKEN_COLORS[i] ?? '#888', transition: 'width 0.6s ease' }} />
                    </div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.2rem', color: 'rgba(255,255,255,0.5)', width: '4rem', textAlign: 'right' }}>
                      {t.percentage.toFixed(1)}%
                    </span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.2rem', color: TOKEN_COLORS[i] ?? '#888', width: '7rem', textAlign: 'right' }}>
                      {fmtUSD(t.valueUSD)}
                    </span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', color: t.priceChange24h >= 0 ? '#22c55e' : '#ef4444', width: '5rem', textAlign: 'right' }}>
                      {t.priceChange24h >= 0 ? '+' : ''}{t.priceChange24h.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </>
            )}
          </motion.div>

          {/* Recent transfers */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="app-panel"
          >
            <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginBottom: '1.6rem', textTransform: 'uppercase' }}>
              Recent Transfers
            </div>
            {loading ? (
              <>
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="skeleton" style={{ height: '5.6rem', borderRadius: '0.8rem', marginBottom: '0.8rem' }} />
                ))}
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {d.recentTransfers.slice(0, 5).map(tx => {
                  const isIn = tx.to.toLowerCase().includes('treasury') || tx.to.toLowerCase().includes('external') === false;
                  return (
                    <div
                      key={tx.id}
                      style={{
                        padding: '1.2rem',
                        background: 'rgba(255,255,255,0.025)',
                        borderRadius: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.2rem',
                        borderLeft: tx.isAnomaly ? '3px solid #ef4444' : '3px solid transparent',
                      }}
                    >
                      <div style={{ width: '2.8rem', height: '2.8rem', borderRadius: '0.6rem', background: isIn ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d={isIn ? 'M6 10V2M2 6l4-4 4 4' : 'M6 2v8M2 6l4 4 4-4'} stroke={isIn ? '#22c55e' : '#ef4444'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.3rem', color: 'var(--text-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                          {tx.tokenSymbol} transfer
                          {tx.isAnomaly && (
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', padding: '0.1rem 0.6rem', borderRadius: '0.3rem', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', color: '#ef4444' }}>
                              ANOMALY
                            </span>
                          )}
                        </div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.2rem' }}>
                          {timeAgo(tx.timestamp)}
                        </div>
                      </div>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.2rem', color: isIn ? '#22c55e' : '#ef4444', flexShrink: 0 }}>
                        {isIn ? '+' : '-'}{fmtUSD(tx.valueUSD)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
