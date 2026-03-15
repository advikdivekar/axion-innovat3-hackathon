'use client';

import Link from 'next/link';
import { Globe2, Shield, DollarSign, Users, ShieldAlert, GitBranch } from 'lucide-react';

const MODULES = [
  { icon: Shield,      color: '#d075ff', label: 'Governance',   href: '/app/governance',   desc: 'Proposals & votes' },
  { icon: DollarSign,  color: '#baf24a', label: 'Treasury',     href: '/app/treasury',     desc: 'Token flows & runway' },
  { icon: Users,       color: '#89b0ff', label: 'Contributors', href: '/app/contributors', desc: 'Reputation & XP' },
  { icon: ShieldAlert, color: '#ff5c16', label: 'Security',     href: '/app/security',     desc: 'Threats & alerts' },
  { icon: GitBranch,   color: '#baf24a', label: 'Simulator',    href: '/app/simulator',    desc: 'Scenario forecasting' },
];

export default function AppHomePage() {
  return (
    <div style={{
      position: 'relative',
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '40px 24px',
      pointerEvents: 'none',
    }}>
      {/* Center label */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        marginBottom: 48,
      }}>
        <div style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '0.25em',
          color: 'rgba(255,92,22,0.6)',
          textTransform: 'uppercase',
        }}>
          Axion Universe
        </div>
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.82rem',
          color: 'rgba(255,255,255,0.3)',
        }}>
          Click a module node or select below
        </div>
      </div>

      {/* Module quick-access grid */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        justifyContent: 'center',
        maxWidth: 560,
        pointerEvents: 'auto',
      }}>
        {MODULES.map(({ icon: Icon, color, label, href, desc }) => (
          <Link key={label} href={href} style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 16px',
              background: 'rgba(5,5,8,0.7)',
              border: `1px solid ${color}25`,
              borderRadius: 10,
              cursor: 'pointer',
              transition: 'background 150ms, border-color 150ms, transform 150ms',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = `${color}12`;
                (e.currentTarget as HTMLElement).style.borderColor = `${color}60`;
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(5,5,8,0.7)';
                (e.currentTarget as HTMLElement).style.borderColor = `${color}25`;
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <Icon size={16} color={color} />
              <div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0' }}>
                  {label}
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)' }}>
                  {desc}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
