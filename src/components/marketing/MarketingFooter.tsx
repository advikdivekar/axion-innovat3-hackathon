import Link from 'next/link';

function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
    </svg>
  );
}

const PRODUCT_LINKS = [
  { label: 'Platform', href: '/platform' },
  { label: 'Universe', href: '/universe' },
  { label: 'Governance', href: '/governance' },
  { label: 'Treasury', href: '/treasury' },
  { label: 'Contributors', href: '/contributors' },
  { label: 'Security', href: '/security' },
];

const RESOURCE_LINKS = [
  { label: 'Docs', href: '/docs' },
  { label: 'API Reference', href: '/docs#api' },
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'Changelog', href: '/changelog' },
];

const COMPANY_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '1.3rem',
        fontWeight: 400,
        color: 'rgba(255,255,255,0.4)',
        textDecoration: 'none',
        transition: 'color 150ms ease',
        display: 'block',
        paddingBottom: '0.8rem',
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.8)')}
      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)')}
    >
      {children}
    </a>
  );
}

export function MarketingFooter() {
  return (
    <footer
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid #00d4ff',
        boxShadow: '0 -1px 0 #00d4ff, 0 -1px 16px rgba(0,212,255,0.15)',
        paddingTop: '6.4rem',
        paddingBottom: '3.2rem',
      }}
    >
      <div className="container">
        {/* ── 4-column grid ─────────────────────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))',
            gap: '4.8rem',
            marginBottom: '4.8rem',
          }}
        >
          {/* Col 1 — Brand */}
          <div>
            <Link
              href="/"
              style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none', marginBottom: '1.2rem' }}
            >
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" stroke="#00d4ff" strokeWidth="1.5" fill="none" opacity="0.8"/>
                <circle cx="16" cy="16" r="2.5" fill="#00d4ff"/>
              </svg>
              <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.3rem', fontWeight: 700, letterSpacing: '0.18em', color: '#ffffff' }}>
                AXION
              </span>
            </Link>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.3rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5, marginBottom: '2rem', maxWidth: '22rem' }}>
              Mission Control for Decentralized Organizations.
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: '1.2rem' }}>
              {[
                { icon: <TwitterIcon />, href: 'https://twitter.com', label: 'Twitter / X' },
                { icon: <GitHubIcon />, href: 'https://github.com', label: 'GitHub' },
                { icon: <DiscordIcon />, href: 'https://discord.com', label: 'Discord' },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: '3.6rem', height: '3.6rem', borderRadius: '0.6rem',
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.03)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.4)',
                    transition: 'color 150ms ease, border-color 150ms ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = '#00d4ff';
                    el.style.borderColor = 'rgba(0,212,255,0.25)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = 'rgba(255,255,255,0.4)';
                    el.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Product */}
          <div>
            <div className="eyebrow" style={{ marginBottom: '1.6rem', fontSize: '1rem' }}>Product</div>
            {PRODUCT_LINKS.map((l) => <FooterLink key={l.label} href={l.href}>{l.label}</FooterLink>)}
          </div>

          {/* Col 3 — Resources */}
          <div>
            <div className="eyebrow" style={{ marginBottom: '1.6rem', fontSize: '1rem' }}>Resources</div>
            {RESOURCE_LINKS.map((l) => <FooterLink key={l.label} href={l.href}>{l.label}</FooterLink>)}
          </div>

          {/* Col 4 — Company */}
          <div>
            <div className="eyebrow" style={{ marginBottom: '1.6rem', fontSize: '1rem' }}>Company</div>
            {COMPANY_LINKS.map((l) => <FooterLink key={l.label} href={l.href}>{l.label}</FooterLink>)}
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────────── */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '2.4rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.6rem',
          }}
        >
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.2rem', color: 'rgba(255,255,255,0.2)' }}>
            &copy; 2025 Axion &bull; MIT License
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.6rem' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Powered by
            </span>
            {['Ethereum', 'Alchemy', 'Gemini AI', 'Supabase'].map((name) => (
              <span
                key={name}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.06em',
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
