'use client';

import { useState, useEffect } from 'react';

const MARQUEE_TEXT =
  'AXION v1.0 LIVE ON ETHEREUM MAINNET — MISSION CONTROL FOR DECENTRALIZED ORGANIZATIONS — AI AGENTS ACTIVE — REAL-TIME THREAT DETECTION ONLINE — COMMAND YOUR DAO — AXION v1.0 LIVE ON ETHEREUM MAINNET — MISSION CONTROL FOR DECENTRALIZED ORGANIZATIONS — AI AGENTS ACTIVE — REAL-TIME THREAT DETECTION ONLINE — COMMAND YOUR DAO »';

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('axion-bar-dismissed');
    if (saved === '1') setDismissed(true);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem('axion-bar-dismissed', '1');
    setDismissed(false);
    // force hide via state
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div
      className="announcement-bar relative flex items-center overflow-hidden"
      style={{ height: 36, position: 'sticky', top: 0, zIndex: 60 }}
    >
      {/* Marquee */}
      <div
        className="flex-1 overflow-hidden flex items-center"
        style={{ height: '100%' }}
      >
        <div className="marquee-track">
          {[0, 1].map((i) => (
            <span
              key={i}
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--cyan-500)',
                whiteSpace: 'nowrap',
                paddingRight: 56,
              }}
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* Dismiss */}
      <button
        onClick={dismiss}
        aria-label="Dismiss announcement"
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          padding: '0 14px',
          background: 'linear-gradient(90deg, transparent, rgba(5,5,8,0.9) 40%)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          color: 'var(--text-tertiary)',
          transition: 'color 150ms ease',
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--cyan-500)')}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)')}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
