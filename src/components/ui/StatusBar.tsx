'use client';

import { useEffect, useState } from 'react';
import { MOCK_EVENTS } from '@/lib/mockData';
import { useDAOStore } from '@/store/daoStore';

function useClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => setTime(new Date().toUTCString().slice(17, 25) + ' UTC');
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useBlockNumber() {
  const [block, setBlock] = useState(21_400_000);
  useEffect(() => {
    const id = setInterval(() => setBlock((b) => b + 1), 12000);
    return () => clearInterval(id);
  }, []);
  return block.toLocaleString();
}

const MOCK_WALLET = '0x1a9C...35BC';
const EVENT_LABELS = MOCK_EVENTS.map((e) => e.title);

export function StatusBar() {
  const clock = useClock();
  const block = useBlockNumber();
  const { daoMeta } = useDAOStore();

  const health = daoMeta?.healthScore ?? 72;
  const healthColor = health >= 75 ? '#baf24a' : health >= 50 ? '#f59e0b' : '#ff5c16';

  return (
    <div
      className="status-bar"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 30,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.6rem', gap: '1.6rem',
      }}
    >
      {/* Left — DAO info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
        <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.15em', color: '#ffffff' }}>
          UNISWAP DAO
        </span>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem',
          padding: '0.1rem 0.6rem', borderRadius: '0.3rem',
          background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)',
          color: '#00d4ff', letterSpacing: '0.08em',
        }}>
          ETH
        </span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', fontWeight: 700, color: healthColor }}>
          {health}
        </span>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>
          HEALTH
        </span>
      </div>

      {/* Center — Live event marquee */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center', maxWidth: '60rem' }}>
        <div className="marquee-track" style={{ animationDuration: '20s', gap: '0' }}>
          {[...EVENT_LABELS, ...EVENT_LABELS].map((label, i) => (
            <span key={i} style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', fontWeight: 500,
              letterSpacing: '0.06em', color: 'rgba(255,255,255,0.3)',
              whiteSpace: 'nowrap', textTransform: 'uppercase',
              paddingRight: '4rem',
            }}>
              <span style={{ color: '#00d4ff', marginRight: '0.8rem' }}>+</span>
              {label}
              <span style={{ marginLeft: '4rem', opacity: 0.2 }}>|</span>
            </span>
          ))}
        </div>
      </div>

      {/* Right — Block + clock + wallet */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            BLOCK
          </span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>
            {block}
          </span>
        </div>

        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', color: 'rgba(255,255,255,0.3)' }}>
          {clock}
        </span>

        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.2rem 0.8rem', borderRadius: '0.3rem',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div className="pulse-dot" style={{ width: '0.5rem', height: '0.5rem' }} />
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)' }}>
            {MOCK_WALLET}
          </span>
        </div>
      </div>
    </div>
  );
}
