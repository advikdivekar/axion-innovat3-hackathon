'use client';

import { useState } from 'react';

export function WalletConnect() {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');

  const connect = async () => {
    if (typeof window === 'undefined') return;
    const eth = (window as unknown as { ethereum?: { request: (args: { method: string }) => Promise<string[]> } }).ethereum;
    if (!eth) {
      // Fallback: show mock connected state
      setAddress('0x1a9C...35BC');
      setConnected(true);
      return;
    }
    try {
      const accounts = await eth.request({ method: 'eth_requestAccounts' });
      if (accounts[0]) {
        setAddress(`${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`);
        setConnected(true);
      }
    } catch {
      // user rejected
    }
  };

  const disconnect = () => {
    setConnected(false);
    setAddress('');
  };

  if (connected) {
    return (
      <button
        onClick={disconnect}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '7px 12px',
          borderRadius: 4,
          background: 'rgba(0,240,255,0.06)',
          border: '1px solid rgba(0,240,255,0.18)',
          cursor: 'pointer',
          width: '100%',
          transition: 'background 150ms ease',
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(0,240,255,0.1)')}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(0,240,255,0.06)')}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--green-500)',
            boxShadow: '0 0 6px var(--green-500)',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.68rem',
            color: 'var(--cyan-500)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {address}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={connect}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        padding: '7px 12px',
        borderRadius: 4,
        background: 'rgba(0,240,255,0.08)',
        border: '1px solid rgba(0,240,255,0.25)',
        cursor: 'pointer',
        width: '100%',
        transition: 'all 150ms ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = 'rgba(0,240,255,0.14)';
        el.style.borderColor = 'rgba(0,240,255,0.4)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = 'rgba(0,240,255,0.08)';
        el.style.borderColor = 'rgba(0,240,255,0.25)';
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cyan-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="6" width="22" height="14" rx="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
      <span
        style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '0.6rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          color: 'var(--cyan-500)',
          whiteSpace: 'nowrap',
        }}
      >
        CONNECT
      </span>
    </button>
  );
}
