// src/app/page.tsx
export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-black text-[#00f0ff]">
      <h1 className="text-2xl font-bold tracking-widest uppercase">DAO Cosmos OS</h1>
      <p className="mt-4 text-sm text-gray-400">Backend systems are online.</p>
      <p className="mt-2 text-xs text-gray-500">Waiting for Dev A to build visual interface...</p>
    </div>
  );
=======
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — HERO (dark + dot-grid)
      ══════════════════════════════════════════════════════════════════ */}
      <section data-theme="dark" className="bg-dark dot-grid" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '12rem 0 8rem' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6.4rem', flexWrap: 'wrap' }}>
            {/* Left */}
            <motion.div variants={stagger} initial="hidden" animate="visible" style={{ flex: '1 1 46rem', minWidth: '30rem' }}>
              <motion.div variants={fadeUp}>
                <span className="hero-eyebrow" style={{ marginBottom: '2.4rem', display: 'inline-flex' }}>
                  <span className="pulse-dot" style={{ width: '0.7rem', height: '0.7rem' }} />
                  Live on Ethereum · Uniswap DAO
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="display-hero" style={{ marginBottom: '2.4rem' }}>
                The Command Center<br />
                for <span className="gradient-text">Your DAO.</span>
              </motion.h1>

              <motion.p variants={fadeUp} style={{
                fontSize: '1.8rem', color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.7, marginBottom: '3.6rem', maxWidth: '48rem', fontFamily: 'Inter, sans-serif',
              }}>
                Axion gives DAOs a real-time 3D visualization of governance, treasury,
                contributors, and security — powered by four AI agents that never sleep.
              </motion.p>

              <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
                <Link href="/app" className="mm-btn mm-btn-primary mm-btn-lg">
                  <span className="mm-btn-main">Enter the Universe</span>
                  <span className="mm-btn-hover">Enter the Universe</span>
                </Link>
                <Link href="/platform" className="mm-btn mm-btn-outline mm-btn-lg">
                  <span className="mm-btn-main">Learn More</span>
                  <span className="mm-btn-hover">Learn More</span>
                </Link>
              </motion.div>

              {/* Module pills */}
              <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                {[
                  { label: 'Governance', color: '#d075ff' },
                  { label: 'Treasury',   color: '#f59e0b' },
                  { label: 'Security',   color: '#ff5c16' },
                  { label: 'Universe',   color: '#00d4ff' },
                  { label: 'Simulator',  color: '#baf24a' },
                  { label: 'AI Agents',  color: '#d075ff' },
                ].map((m) => (
                  <span key={m.label} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.4rem 1.2rem',
                    background: `${m.color}12`, border: `1px solid ${m.color}30`,
                    borderRadius: '10rem', fontSize: '1.1rem', fontWeight: 600,
                    color: m.color, fontFamily: 'Inter, sans-serif',
                  }}>
                    <span style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: m.color, display: 'inline-block' }} />
                    {m.label}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Hero Sphere */}
            <motion.div
              variants={fadeIn} initial="hidden" animate="visible"
              style={{ flex: '1 1 48rem', display: 'flex', justifyContent: 'center', overflow: 'visible' }}
            >
              <HeroSphere />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — STATS BAR (off-white)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-off" style={{ padding: '6.4rem 0', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="eyebrow" style={{ color: '#00a8cc' }}>Platform Stats</span>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))', gap: '4.8rem' }}>
              <motion.div variants={fadeUp}><StatCounter end={42} prefix="$" suffix="B" label="Treasury Monitored" /></motion.div>
              <motion.div variants={fadeUp}><StatCounter end={127} suffix="K" label="Contributors Tracked" /></motion.div>
              <motion.div variants={fadeUp}><StatCounter end={8400} suffix="+" label="Proposals Analyzed" /></motion.div>
              <motion.div variants={fadeUp}><StatCounter end={99} suffix="%" label="Threat Accuracy" /></motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3 — INTRO (dark)
      ══════════════════════════════════════════════════════════════════ */}
      <section data-theme="dark" className="bg-dark" style={{ padding: '9.6rem 0' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} style={{ textAlign: 'center', maxWidth: '80rem', margin: '0 auto' }}>
            <motion.div variants={fadeUp}>
              <span className="eyebrow">What is Axion</span>
            </motion.div>
            <motion.h2 variants={fadeUp} style={{
              fontSize: 'clamp(3.2rem, 5vw, 6rem)',
              fontWeight: 900, color: '#ffffff',
              lineHeight: 1.1, letterSpacing: '-0.03em', fontFamily: 'Inter, sans-serif',
            }}>
              DAOs are flying <span className="gradient-text">completely blind.</span><br />
              Axion changes that.
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: '1.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '2.4rem', lineHeight: 1.7, maxWidth: '64rem', margin: '2.4rem auto 0' }}>
              One command center. Real-time AI intelligence. Total visibility into governance,
              treasury, contributors, and security — rendered in a living 3D universe.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4 — MODULES GRID (white)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white" style={{ padding: '9.6rem 0' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
            <motion.div variants={fadeUp}>
              <span className="eyebrow" style={{ color: '#00a8cc' }}>The Platform</span>
            </motion.div>
            <motion.h2 variants={fadeUp} style={{
              fontSize: 'clamp(2.8rem, 4vw, 4.8rem)',
              fontWeight: 900, color: '#0a0a0a',
              lineHeight: 1.1, marginBottom: '4.8rem', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em',
            }}>
              Six modules. Total command.
            </motion.h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(28rem, 1fr))', gap: '2rem' }}>
              {[
                { Icon: Globe2,      color: '#00d4ff', name: 'Universe',     route: '/universe',     title: '3D Neural Network',    desc: 'Every module connected in real-time 3D space. Your DAO as a living, breathing universe.',      cssVar: 'card-cyan' },
                { Icon: Shield,      color: '#d075ff', name: 'Governance',   route: '/governance',   title: 'Proposal Intelligence', desc: 'Track votes, whales, and quorum risk the moment a proposal goes live.', cssVar: 'card-gov' },
                { Icon: DollarSign,  color: '#f59e0b', name: 'Treasury',     route: '/treasury',     title: 'Live Reactor',          desc: 'Monitor token flows, runway, and financial anomalies 24/7.',            cssVar: 'card-treasury' },
                { Icon: Users,       color: '#89b0ff', name: 'Contributors', route: '/contributors', title: 'Reputation Galaxy',     desc: 'Map collaboration networks and score every contributor automatically.',  cssVar: 'card-contributors' },
                { Icon: ShieldAlert, color: '#ff5c16', name: 'Security',     route: '/security',     title: 'Threat Radar',          desc: 'AI detects sybil attacks, flash loans, and governance manipulation.',   cssVar: 'card-security' },
                { Icon: GitBranch,   color: '#baf24a', name: 'Simulator',    route: '/simulator',    title: 'Future Engine',         desc: 'Run what-if scenarios across three branching timeline forecasts.',       cssVar: 'card-sim' },
              ].map(({ Icon, color, name, route, title, desc, cssVar }) => (
                <motion.div key={name} variants={fadeUp}
                  className={`card-white card-accent ${cssVar}`}
                  style={{ padding: '2.8rem', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.6rem' }}>
                    <div style={{
                      width: '3.6rem', height: '3.6rem', borderRadius: '0.8rem',
                      background: `${color}14`, border: `1px solid ${color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={20} color={color} />
                    </div>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                      {name}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0a0a0a', marginBottom: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: '1.3rem', color: '#4a5568', lineHeight: 1.6, marginBottom: '1.6rem', fontFamily: 'Inter, sans-serif' }}>
                    {desc}
                  </p>
                  <Link href={route} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '1.2rem', fontWeight: 600, color, textDecoration: 'none' }}>
                    Open Module <ArrowRight size={14} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 5 — HOW IT WORKS (off-white)
      ══════════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="bg-off" style={{ padding: '9.6rem 0' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
            <motion.div variants={fadeUp}>
              <span className="eyebrow" style={{ color: '#00a8cc' }}>How It Works</span>
            </motion.div>
            <motion.h2 variants={fadeUp} style={{
              fontSize: 'clamp(2.8rem, 4vw, 4.8rem)',
              fontWeight: 900, color: '#0a0a0a',
              marginBottom: '6rem', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em',
            }}>
              From contract to command in 60 seconds
            </motion.h2>

            <div style={{ display: 'flex', gap: '3.2rem', flexWrap: 'wrap', position: 'relative' }}>
              {[
                { n: '01', title: 'Connect', desc: 'Add your governor contract address. Axion indexes your entire DAO history in under 60 seconds.', Icon: Zap, color: '#00d4ff' },
                { n: '02', title: 'Visualize', desc: 'Your DAO renders as a live 3D universe. Click any module node to explore governance, treasury, and more.', Icon: Globe2, color: '#d075ff' },
                { n: '03', title: 'Command', desc: 'Four AI agents brief you instantly on risks, opportunities, and anomalies. Natural language. Zero learning curve.', Icon: Brain, color: '#baf24a' },
              ].map((step, i) => (
                <motion.div key={step.n} variants={slideLeft} style={{ flex: '1 1 24rem', position: 'relative' }}>
                  <div style={{
                    width: '5.6rem', height: '5.6rem', borderRadius: '50%',
                    background: step.color, color: '#0a0a0a',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '2rem', boxShadow: `0 0.4rem 2rem ${step.color}40`,
                  }}>
                    <step.Icon size={24} />
                  </div>
                  <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', color: step.color, letterSpacing: '0.1em', marginBottom: '0.8rem' }}>
                    {step.n}
                  </div>
                  <h3 style={{ fontSize: '2rem', fontWeight: 700, color: '#0a0a0a', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '1.4rem', color: '#4a5568', lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }}>
                    {step.desc}
                  </p>
                  {i < 2 && (
                    <div style={{
                      position: 'absolute', top: '2.8rem', right: '-1.6rem',
                      width: '3.2rem', height: '2px', borderTop: '2px dashed #e2e8f0',
                    }} />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 6 — UNIVERSE PREVIEW (dark + dot-grid)
      ══════════════════════════════════════════════════════════════════ */}
      <section data-theme="dark" className="bg-dark dot-grid" style={{ padding: '9.6rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '6.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Left — node network preview */}
            <motion.div
              variants={slideLeft} initial="hidden" whileInView="visible" viewport={viewport}
              style={{
                flex: '1 1 40rem',
                background: '#050508', borderRadius: '1.6rem', height: '34rem',
                position: 'relative', overflow: 'hidden',
                border: '1px solid rgba(0,212,255,0.15)',
                boxShadow: '0 0 4rem rgba(0,212,255,0.05)',
              }}
            >
              {[
                { x: '28%', y: '30%', c: '#00d4ff', s: 10 },
                { x: '68%', y: '25%', c: '#d075ff', s: 8 },
                { x: '75%', y: '65%', c: '#f59e0b', s: 10 },
                { x: '35%', y: '70%', c: '#ff5c16', s: 8 },
                { x: '50%', y: '50%', c: '#00d4ff', s: 14 },
                { x: '15%', y: '55%', c: '#baf24a', s: 8 },
              ].map((n, i) => (
                <div key={i} className="net-node" style={{
                  '--node-color': n.c, left: n.x, top: n.y,
                  width: n.s, height: n.s, animationDelay: `${i * 0.4}s`,
                } as React.CSSProperties} />
              ))}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 400 340">
                {[[112,102,272,85],[200,170,272,85],[200,170,300,221],[200,170,140,238],[60,187,140,238],[272,85,300,221]].map(([x1,y1,x2,y2], i) => (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(0,212,255,0.15)" strokeWidth="1" strokeDasharray="4 4" />
                ))}
              </svg>
              <div style={{
                position: 'absolute', bottom: '1.6rem', left: '1.6rem',
                fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', color: 'rgba(0,212,255,0.5)',
              }}>
                AXION UNIVERSE · LIVE
              </div>
            </motion.div>

            {/* Right — text */}
            <motion.div variants={slideRight} initial="hidden" whileInView="visible" viewport={viewport} style={{ flex: '1 1 36rem' }}>
              <span className="eyebrow">Universe Module</span>
              <h2 style={{ fontSize: 'clamp(2.4rem, 3.5vw, 4rem)', fontWeight: 900, color: '#ffffff', marginBottom: '1.6rem', lineHeight: 1.15, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>
                Your DAO as a living 3D universe
              </h2>
              <p style={{ fontSize: '1.6rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '3.2rem', fontFamily: 'Inter, sans-serif' }}>
                Every governance proposal, every treasury flow, every contributor —
                rendered in real-time 3D. Click any node to fly to that module.
                Watch the universe breathe with your DAO&apos;s activity.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3.2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {['Earth globe with 6 satellite module nodes', 'Particles traveling along connection lines', 'Click to fly — camera transitions on click', 'Auto-rotates with your DAO health as pulse speed'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.4rem', color: 'rgba(255,255,255,0.6)' }}>
                    <Activity size={14} color="#00d4ff" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/app" className="mm-btn mm-btn-neon">
                <span className="mm-btn-main">Enter the Universe</span>
                <span className="mm-btn-hover">Enter the Universe</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 7 — AI AGENTS (white)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white" style={{ padding: '9.6rem 0' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
            <motion.div variants={fadeUp}>
              <span className="eyebrow" style={{ color: '#00a8cc' }}>AI Intelligence</span>
            </motion.div>
            <motion.h2 variants={fadeUp} style={{
              fontSize: 'clamp(2.8rem, 4vw, 4.8rem)',
              fontWeight: 900, color: '#0a0a0a',
              marginBottom: '1.2rem', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em',
            }}>
              Four AI agents. Total intelligence.
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: '1.6rem', color: '#4a5568', marginBottom: '4.8rem', maxWidth: '52rem', fontFamily: 'Inter, sans-serif' }}>
              Each agent is specialized for a different DAO domain. Ask anything in natural language.
            </motion.p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(26rem, 1fr))', gap: '2rem', marginBottom: '5.6rem' }}>
              {[
                { name: 'HERMES', role: 'Governance Analyst', color: '#d075ff', Icon: Shield,     queries: ['"Who are the whale voters on Prop #142?"', '"What\'s the quorum risk this week?"'] },
                { name: 'ATLAS',  role: 'Treasury Monitor',   color: '#f59e0b', Icon: DollarSign, queries: ['"Is our runway healthy?"', '"Show me anomalous outflows."'] },
                { name: 'ARGUS',  role: 'Security Sentinel',  color: '#ff5c16', Icon: ShieldAlert, queries: ['"Any sybil activity today?"', '"Alert me on flash loan risk."'] },
                { name: 'ORACLE', role: 'Scenario Forecaster',color: '#baf24a', Icon: GitBranch,  queries: ['"Model a 40% market crash."', '"Simulate governance takeover risk."'] },
              ].map(({ name, role, color, queries, Icon }) => (
                <motion.div key={name} variants={fadeUp} className="card-white" style={{
                  borderLeft: `4px solid ${color}`, padding: '2.4rem',
                  borderTopLeftRadius: 0, borderBottomLeftRadius: 0,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
                    <div style={{ width: '3.2rem', height: '3.2rem', borderRadius: '0.8rem', background: `${color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={16} color={color} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', fontWeight: 700, color, letterSpacing: '0.1em' }}>{name}</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0a0a0a', fontFamily: 'Inter, sans-serif' }}>{role}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {queries.map(q => (
                      <div key={q} style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>{q}</div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp}>
              <div style={{ textAlign: 'center', marginBottom: '2.4rem' }}>
                <span style={{ fontSize: '1.2rem', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
                  Try the live demo — powered by Gemini Flash AI
                </span>
              </div>
              <AIDemoTerminal />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 8 — PARTNERS MARQUEE (off-white)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-off" style={{ padding: '6.4rem 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.4rem' }}>
          <span style={{ fontSize: '1.1rem', color: '#94a3b8', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
            Trusted by leading DAO communities
          </span>
        </div>
        <div className="marquee-wrap" style={{ background: '#0a0a0a', padding: '2rem 0' }}>
          <div className="marquee-track">
            {['Uniswap', 'Compound', 'ENS', 'Aave', 'Gitcoin', 'MakerDAO', 'Curve', 'Balancer', 'Lido', 'dYdX', 'Optimism', 'Arbitrum', 'Snapshot', 'Safe',
              'Uniswap', 'Compound', 'ENS', 'Aave', 'Gitcoin', 'MakerDAO', 'Curve', 'Balancer', 'Lido', 'dYdX', 'Optimism', 'Arbitrum', 'Snapshot', 'Safe',
            ].map((name, i) => (
              <div key={`${name}-${i}`} className="partner-logo">{name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 9 — FINAL CTA (dark)
      ══════════════════════════════════════════════════════════════════ */}
      <section data-theme="dark" className="bg-dark" style={{ padding: '12rem 0', position: 'relative', overflow: 'hidden' }}>
        {/* Glow sphere */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '60rem', height: '60rem', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, rgba(208,117,255,0.05) 40%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}
            style={{ textAlign: 'center', maxWidth: '64rem', margin: '0 auto' }}
          >
            <motion.div variants={fadeUp}>
              <span className="eyebrow">Ready to Start</span>
            </motion.div>
            <motion.h2 variants={fadeUp} style={{
              fontSize: 'clamp(3.2rem, 5vw, 6.4rem)',
              fontWeight: 900, color: '#ffffff',
              marginBottom: '2rem', fontFamily: 'Inter, sans-serif', lineHeight: 1.1, letterSpacing: '-0.03em',
            }}>
              Ready to <span className="gradient-text">command</span> your DAO?
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: '1.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '4rem', lineHeight: 1.6 }}>
              Join the future of decentralized governance. Connect your DAO in 60 seconds.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/app" className="mm-btn mm-btn-primary mm-btn-lg">
                <span className="mm-btn-main">Enter the Universe</span>
                <span className="mm-btn-hover">Enter the Universe</span>
              </Link>
              <Link href="/docs" className="mm-btn mm-btn-outline mm-btn-lg">
                <span className="mm-btn-main">Read the Docs</span>
                <span className="mm-btn-hover">Read the Docs</span>
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'center', gap: '2.4rem', marginTop: '3.2rem', flexWrap: 'wrap' }}>
              {['No credit card required', 'Open source', 'Self-hostable'].map(t => (
                <span key={t} style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Zap size={12} color="#00d4ff" />
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
>>>>>>> 101409a (v2 axion)
}
