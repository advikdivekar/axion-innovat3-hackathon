'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/store/uiStore';
import { WalletConnect } from '@/components/wallet/WalletConnect';
import { Globe2, Shield, DollarSign, Users, ShieldAlert, GitBranch, Settings, ChevronLeft } from 'lucide-react';

const NAV_MODULES = [
  { id: 'home' as const,        label: 'Universe',     href: '/app',             color: '#00d4ff', Icon: Globe2      },
  { id: 'governance' as const,  label: 'Governance',   href: '/app/governance',  color: '#d075ff', Icon: Shield      },
  { id: 'treasury' as const,    label: 'Treasury',     href: '/app/treasury',    color: '#f59e0b', Icon: DollarSign  },
  { id: 'contributors' as const, label: 'Contributors', href: '/app/contributors', color: '#89b0ff', Icon: Users      },
  { id: 'security' as const,    label: 'Security',     href: '/app/security',    color: '#ff5c16', Icon: ShieldAlert },
  { id: 'simulator' as const,   label: 'Simulator',    href: '/app/simulator',   color: '#baf24a', Icon: GitBranch   },
] as const;

const SIDEBAR_WIDTH_EXPANDED = 220;
const SIDEBAR_WIDTH_COLLAPSED = 64;

export function Sidebar() {
  const pathname = usePathname();
  const { setActiveModule, sidebarCollapsed, toggleSidebar } = useUIStore();

  const isActive = (href: string) => {
    if (href === '/app') return pathname === '/app';
    return pathname?.startsWith(href) ?? false;
  };

  const width = sidebarCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED;

  return (
    <aside
      style={{
        position: 'fixed',
        top: 40,
        left: 0,
        bottom: 0,
        width,
        background: 'rgba(5,5,8,0.92)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(2rem)',
        WebkitBackdropFilter: 'blur(2rem)',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 300ms cubic-bezier(0.16,1,0.3,1)',
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div style={{
        padding: '1.4rem 1.4rem 1rem',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        display: 'flex', alignItems: 'center', gap: '1rem',
        minHeight: '5rem', flexShrink: 0,
      }}>
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
          <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" stroke="#00d4ff" strokeWidth="1.5" fill="none" opacity="0.8"/>
          <path d="M16 8L23 19H9L16 8Z" stroke="#d075ff" strokeWidth="1.5" fill="none" opacity="0.8"/>
          <circle cx="16" cy="16" r="2.5" fill="#00d4ff"/>
        </svg>
        {!sidebarCollapsed && (
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.2em', color: '#ffffff', whiteSpace: 'nowrap' }}>
              AXION
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em', marginTop: '0.2rem' }}>
              v1.0
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '1rem 0.8rem', overflowY: 'auto', overflowX: 'hidden' }}>
        {NAV_MODULES.map((mod) => {
          const active = isActive(mod.href);
          return (
            <Link
              key={mod.id}
              href={mod.href}
              onClick={() => setActiveModule(mod.id)}
              title={sidebarCollapsed ? mod.label : undefined}
              style={{
                position: 'relative',
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '0.9rem 1.2rem',
                borderRadius: '0.6rem',
                textDecoration: 'none',
                marginBottom: '0.2rem',
                background: active ? `${mod.color}12` : 'transparent',
                color: active ? mod.color : 'rgba(255,255,255,0.35)',
                transition: 'background 150ms ease, color 150ms ease',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)';
                }
              }}
            >
              {/* Active left bar */}
              {active && (
                <span style={{
                  position: 'absolute', left: 0, top: '0.6rem', bottom: '0.6rem',
                  width: '0.3rem', borderRadius: '0.15rem',
                  background: mod.color, boxShadow: `0 0 0.8rem ${mod.color}`,
                }} />
              )}
              {/* Icon */}
              <span style={{ flexShrink: 0, display: 'flex', color: 'inherit' }}>
                <mod.Icon size={18} />
              </span>
              {/* Label */}
              {!sidebarCollapsed && (
                <span style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '1.3rem', fontWeight: 600,
                  whiteSpace: 'nowrap', color: 'inherit',
                }}>
                  {mod.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div style={{
        padding: '1rem 0.8rem',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        display: 'flex', flexDirection: 'column', gap: '0.6rem', flexShrink: 0,
      }}>
        {/* Wallet */}
        {!sidebarCollapsed ? (
          <WalletConnect />
        ) : (
          <button title="Wallet" style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            padding: '0.8rem', borderRadius: '0.6rem',
            background: 'none', border: '1px solid rgba(255,255,255,0.08)',
            cursor: 'pointer', color: 'rgba(255,255,255,0.35)', width: '100%',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="6" width="22" height="14" rx="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
          </button>
        )}

        {/* Settings */}
        <button title="Settings" style={{
          display: 'flex', alignItems: 'center', gap: '1rem',
          padding: '0.8rem 1.2rem', borderRadius: '0.6rem',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.35)', transition: 'background 150ms ease, color 150ms ease',
          width: '100%',
        }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.04)'; el.style.color = 'rgba(255,255,255,0.7)'; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'none'; el.style.color = 'rgba(255,255,255,0.35)'; }}
        >
          <Settings size={16} style={{ flexShrink: 0 }} />
          {!sidebarCollapsed && (
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.2rem', fontWeight: 500 }}>Settings</span>
          )}
        </button>

        {/* Collapse toggle */}
        <button
          onClick={toggleSidebar}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: sidebarCollapsed ? 'center' : 'flex-start', gap: '1rem',
            padding: '0.8rem 1.2rem', borderRadius: '0.6rem',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.25)', transition: 'color 150ms ease',
            width: '100%',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.25)')}
        >
          <ChevronLeft size={14} style={{ transform: sidebarCollapsed ? 'rotate(180deg)' : 'none', transition: 'transform 250ms ease', flexShrink: 0 }} />
          {!sidebarCollapsed && (
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', fontWeight: 500, whiteSpace: 'nowrap' }}>
              Collapse
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
