'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger, viewport } from '@/lib/animations';
import { runSimulation } from '@/lib/api';
import type { SimulationResult, SimulationTimeline } from '@/lib/types';

const MOD = '#baf24a';

const SCENARIOS = [
  {
    id: 'market_crash',
    label: 'Market Crash',
    desc: 'Simulate a 70% drawdown in token prices over 90 days. Tests treasury resilience and community response.',
    color: '#ef4444',
    icon: '📉',
  },
  {
    id: 'governance_attack',
    label: 'Governance Attack',
    desc: 'Model a coordinated Sybil campaign targeting quorum. Measures DAO defensive mechanisms.',
    color: '#f59e0b',
    icon: '⚔️',
  },
  {
    id: 'liquidity_crisis',
    label: 'Liquidity Crisis',
    desc: 'Forecast outcomes when primary liquidity pool drops below critical threshold over 30 days.',
    color: '#d075ff',
    icon: '🌊',
  },
] as const;

type ScenarioId = typeof SCENARIOS[number]['id'];

const SENTIMENT_COLOR: Record<string, string> = {
  optimistic: '#22c55e',
  positive: '#22c55e',
  neutral: '#f59e0b',
  base: '#f59e0b',
  pessimistic: '#ef4444',
  negative: '#ef4444',
};

const MOCK_EVENTS: Record<string, string[][]> = {
  market_crash: [
    ['Token price drops 30%', 'Treasury rebalancing triggered', 'Emergency vote initiated', 'Runway extends via stables', 'Community confidence holds'],
    ['Token price drops 55%', 'Contributor activity drops 20%', 'Fee switch activated', 'Treasury at 60% nominal', 'Recovery plan voted in'],
    ['Token price drops 72%', 'Mass contributor exodus', 'Governance quorum fails', 'Treasury depleted in 8mo', 'Protocol enters hibernation'],
  ],
  governance_attack: [
    ['Attack vectors identified', 'Quadratic voting proposed', 'Sybil accounts flagged', 'ARGUS blocks 94% of bots', 'Governance strengthened'],
    ['12 Sybil accounts active', 'Proposal passes by 2%', 'Community emergency vote', 'New quorum rules enacted', 'Partial damage contained'],
    ['Coordinated attack succeeds', 'Malicious proposal passes', 'Treasury drained 30%', 'Hard fork proposed', 'DAO fractures'],
  ],
  liquidity_crisis: [
    ['LP incentives increased 40%', 'New LPs onboarded', 'TVL stabilises in 14d', 'Protocol fees cover costs', 'Liquidity exceeds pre-crisis'],
    ['TVL drops 45%', 'Emergency liquidity injected', 'Partnerships activated', 'Slow recovery over 60d', 'Protocol survives at 70% TVL'],
    ['TVL drops 80%', 'Slippage exceeds 8%', 'Users migrate to forks', 'Revenue collapses', 'Insolvency risk materialises'],
  ],
};

function fmtUSD(n: number) {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
}

interface SVGTimelineProps {
  events: string[];
  color: string;
}

function SVGTimeline({ events, color }: SVGTimelineProps) {
  const lineRef = useRef<SVGLineElement>(null);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const lineEl = lineRef.current;
    if (!lineEl) return;

    const totalLen = (lineEl as SVGLineElement & { getTotalLength?: () => number }).getTotalLength?.() ?? 200;
    lineEl.style.strokeDasharray = String(totalLen);
    lineEl.style.strokeDashoffset = String(totalLen);

    requestAnimationFrame(() => {
      lineEl.style.transition = 'stroke-dashoffset 1s ease';
      lineEl.style.strokeDashoffset = '0';
    });

    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      dot.style.opacity = '0';
      setTimeout(() => {
        if (dot) {
          dot.style.transition = 'opacity 300ms ease';
          dot.style.opacity = '1';
        }
      }, 200 + i * 180);
    });
  }, [events, color]);

  const nodeH = 40;
  const svgH = events.length * nodeH + 20;

  return (
    <svg width="24" height={svgH} viewBox={`0 0 24 ${svgH}`} style={{ flexShrink: 0, marginTop: '0.4rem' }}>
      <line
        ref={lineRef}
        x1="12" y1="10" x2="12" y2={svgH - 10}
        stroke={`${color}40`}
        strokeWidth="2"
      />
      {events.map((_, i) => (
        <circle
          key={i}
          ref={el => { dotRefs.current[i] = el; }}
          cx="12"
          cy={10 + i * nodeH}
          r="5"
          fill={color}
          style={{ opacity: 0 }}
        />
      ))}
    </svg>
  );
}

function TimelineCard({ timeline, events }: { timeline: SimulationTimeline; events: string[] }) {
  const color = SENTIMENT_COLOR[timeline.sentiment] ?? '#888';
  return (
    <div
      className="card-glass"
      style={{
        background: `${color}06`,
        border: `1px solid ${color}22`,
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.6rem',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.3rem', fontWeight: 800, color, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {timeline.name}
        </span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.8rem', fontWeight: 700, color }}>
          {Math.round(timeline.probability * 100)}%
        </span>
      </div>

      {/* Probability bar */}
      <div style={{ height: '0.4rem', borderRadius: '0.2rem', background: 'rgba(255,255,255,0.08)' }}>
        <div style={{ width: `${timeline.probability * 100}%`, height: '100%', background: color, borderRadius: '0.2rem', transition: 'width 0.8s ease' }} />
      </div>

      {/* Narrative */}
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.2rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, margin: 0 }}>
        {timeline.narrative}
      </p>

      {/* SVG Timeline with events */}
      <div style={{ display: 'flex', gap: '1.2rem' }}>
        <SVGTimeline events={events} color={color} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
          {events.map((ev, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', minHeight: '4rem' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>
                {ev}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingTop: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {[
          { label: 'Treasury', value: fmtUSD(timeline.metrics.treasuryValue), delta: timeline.metrics.treasuryChange as number | null },
          { label: 'Contributors', value: String(timeline.metrics.contributorCount), delta: timeline.metrics.contributorChange as number | null },
          { label: 'Gov Health', value: `${timeline.metrics.governanceHealth}%`, delta: null as number | null },
          { label: 'Runway', value: `${timeline.metrics.survivalMonths}mo`, delta: null as number | null },
        ].map(row => (
          <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', color: 'rgba(255,255,255,0.35)' }}>{row.label}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.1rem', color: 'var(--text-primary)' }}>{row.value}</span>
              {row.delta !== null && (
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', color: row.delta >= 0 ? '#22c55e' : '#ef4444' }}>
                  {row.delta >= 0 ? '+' : ''}{row.delta}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SimulatorPage() {
  const [scenario, setScenario] = useState<ScenarioId>('market_crash');
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const runSim = async () => {
    setLoading(true);
    setResult(null);
    const data = await runSimulation(scenario, {});
    setResult(data);
    setLoading(false);
  };

  const scenarioEvents = MOCK_EVENTS[scenario] ?? [[], [], []];

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
          Simulator
        </h1>
      </motion.div>

      {/* Scenario selector */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        style={{ marginBottom: '2.4rem' }}
      >
        <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginBottom: '1.2rem', textTransform: 'uppercase' }}>
          Select Scenario
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem' }}>
          {SCENARIOS.map(s => (
            <motion.button
              key={s.id}
              variants={fadeUp}
              onClick={() => { setScenario(s.id); setResult(null); }}
              className="card-glass"
              style={{
                textAlign: 'left', cursor: 'pointer', padding: '1.6rem',
                background: scenario === s.id ? `${s.color}0d` : 'rgba(255,255,255,0.025)',
                border: `1px solid ${scenario === s.id ? s.color + '40' : 'rgba(255,255,255,0.07)'}`,
                borderLeft: `3px solid ${scenario === s.id ? s.color : 'transparent'}`,
                borderRadius: '1rem',
                display: 'flex', flexDirection: 'column', gap: '0.8rem',
                transition: 'all 200ms ease',
                outline: 'none',
                '--module-color': s.color,
              } as React.CSSProperties}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{
                  width: '0.8rem', height: '0.8rem', borderRadius: '50%',
                  background: scenario === s.id ? s.color : 'rgba(255,255,255,0.15)',
                  boxShadow: scenario === s.id ? `0 0 0.8rem ${s.color}` : 'none',
                  transition: 'all 200ms',
                  flexShrink: 0,
                }} />
                <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.1em', color: scenario === s.id ? s.color : 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
                  {s.label}
                </span>
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.2rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, margin: 0 }}>
                {s.desc}
              </p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Run button */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        style={{ marginBottom: '3.2rem' }}
      >
        <button
          onClick={runSim}
          disabled={loading}
          className="btn btn-neon"
          style={{
            padding: '1.4rem 3.2rem',
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '1.2rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            background: loading ? `${MOD}20` : MOD,
            border: `1px solid ${MOD}60`,
            borderRadius: '0.8rem',
            color: loading ? MOD : '#0a0a0a',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 200ms ease',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: loading ? 'none' : `0 0 2.4rem ${MOD}40`,
          }}
        >
          {loading ? (
            <>
              <div style={{ width: '0.6rem', height: '0.6rem', borderRadius: '50%', background: MOD, animation: 'pulse 1s ease-in-out infinite' }} />
              ORACLE COMPUTING...
            </>
          ) : (
            'RUN SIMULATION →'
          )}
        </button>
      </motion.div>

      {/* Loading skeleton */}
      {loading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.6rem' }}>
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton" style={{ height: '48rem', borderRadius: '1.6rem' }} />
          ))}
        </div>
      )}

      {/* Results: 3 timeline columns */}
      {result && !loading && (
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}
        >
          <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
            Simulation Results — 3 Timelines
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.6rem' }}>
            {result.timelines.map((t, i) => (
              <motion.div key={t.id} variants={fadeUp}>
                <TimelineCard
                  timeline={t}
                  events={scenarioEvents[i] ?? ['Analysis complete', 'Metrics computed', 'Outcome projected', 'Report generated', 'Review recommended']}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
