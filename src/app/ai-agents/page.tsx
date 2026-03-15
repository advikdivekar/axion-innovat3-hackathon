'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Shield, DollarSign, ShieldAlert, GitBranch, ArrowRight, Zap, Database, Globe2 } from 'lucide-react';
import { fadeUp, stagger, viewport } from '@/lib/animations';

const agents = [
  {
    name: 'HERMES',
    role: 'Governance Analyst',
    color: '#d075ff',
    Icon: Shield,
    queries: ['"Who are the whale voters on Prop #142?"', '"What\'s the quorum risk this week?"'],
    desc: 'Monitors every governance proposal across Snapshot and on-chain contracts. Forecasts quorum, surfaces delegate alignment shifts, and alerts on deadline urgency.',
  },
  {
    name: 'ATLAS',
    role: 'Treasury Guardian',
    color: '#f59e0b',
    Icon: DollarSign,
    queries: ['"Is our runway healthy?"', '"Show me anomalous outflows."'],
    desc: 'Watches every treasury wallet, DeFi position, and token flow 24/7. Calculates runway projections and flags unusual outflows instantly.',
  },
  {
    name: 'AEGIS',
    role: 'Security Sentinel',
    color: '#ff5c16',
    Icon: ShieldAlert,
    queries: ['"Any sybil activity today?"', '"Alert me on flash loan risk."'],
    desc: 'Runs continuous Sybil cluster analysis, governance attack simulations, and real-time threat feeds — surfacing risks before they materialize.',
  },
  {
    name: 'NEXUS',
    role: 'Operations Forecaster',
    color: '#baf24a',
    Icon: GitBranch,
    queries: ['"Model a 40% market crash."', '"Simulate governance takeover risk."'],
    desc: 'Runs probabilistic governance simulations using Monte Carlo modeling. Input any scenario and get branching timeline forecasts with confidence intervals.',
  },
];

const howSteps = [
  { n: '01', title: 'You ask', desc: 'Type any question about your DAO in plain English. No query language, no dashboards to navigate.', Icon: Globe2, color: '#00d4ff' },
  { n: '02', title: 'Agents reason', desc: 'The relevant agent fetches live on-chain data, runs analysis, and composes a complete answer in milliseconds.', Icon: Database, color: '#d075ff' },
  { n: '03', title: 'You act', desc: 'Get a structured briefing with actionable recommendations, links to relevant proposals, and risk scores.', Icon: Zap, color: '#baf24a' },
];

// ─── AI Terminal ──────────────────────────────────────────────────────────────

const AGENT_CHIPS = [
  { label: 'HERMES', key: 'governance', color: '#d075ff' },
  { label: 'ATLAS',  key: 'treasury',   color: '#f59e0b' },
  { label: 'AEGIS',  key: 'security',   color: '#ff5c16' },
  { label: 'NEXUS',  key: 'operations', color: '#baf24a' },
];

function AIDemoTerminal() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeAgent, setActiveAgent] = useState('general');
  const scrollRef = useRef<HTMLDivElement>(null);

  const PRESETS = [
    'What are the current governance risks?',
    'Is the treasury healthy?',
    'Who are the most active contributors?',
    'Are there any security threats?',
  ];

  async function send(text?: string) {
    const msg = text ?? input.trim();
    if (!msg || loading) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: msg }]);
    setLoading(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, agent: activeAgent }),
      });
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let aiText = '';
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          aiText += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const u = [...prev];
            u[u.length - 1] = { role: 'assistant', content: aiText };
            return u;
          });
        }
      }
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Error connecting to AI agent.' }]);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="terminal" style={{ maxWidth: '72rem', margin: '0 auto' }}>
      <div className="terminal-bar">
        <div className="terminal-dot" style={{ background: '#dc2626' }} />
        <div className="terminal-dot" style={{ background: '#f59e0b' }} />
        <div className="terminal-dot" style={{ background: '#22c55e' }} />
        <span style={{ marginLeft: '0.8rem', fontSize: '1.1rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'JetBrains Mono, monospace' }}>
          axion — ai agent — gemini flash
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div className="pulse-dot" style={{ width: '0.6rem', height: '0.6rem' }} />
          <span style={{ fontSize: '1rem', color: '#22c55e', fontFamily: 'JetBrains Mono, monospace' }}>LIVE</span>
        </div>
      </div>

      {/* Agent selector chips */}
      <div style={{ display: 'flex', gap: '0.6rem', padding: '1rem 1.6rem', borderBottom: '1px solid rgba(255,255,255,0.04)', flexWrap: 'wrap' }}>
        {AGENT_CHIPS.map((chip) => (
          <button
            key={chip.key}
            onClick={() => setActiveAgent(chip.key)}
            style={{
              background: activeAgent === chip.key ? `${chip.color}20` : 'transparent',
              border: `1px solid ${activeAgent === chip.key ? chip.color : 'rgba(255,255,255,0.12)'}`,
              borderRadius: '0.6rem',
              padding: '0.3rem 0.9rem',
              fontSize: '1rem',
              color: activeAgent === chip.key ? chip.color : 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              letterSpacing: '0.06em',
              transition: 'all 150ms',
            }}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Presets */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', padding: '1.2rem 1.6rem', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        {PRESETS.map((p) => (
          <button
            key={p}
            onClick={() => send(p)}
            style={{
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.2)',
              borderRadius: '0.6rem',
              padding: '0.4rem 1rem',
              fontSize: '1.1rem',
              color: '#00d4ff',
              cursor: 'pointer',
              fontFamily: 'JetBrains Mono, monospace',
              transition: 'background 150ms',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,212,255,0.15)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,212,255,0.08)')}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="terminal-body" style={{ minHeight: '18rem', maxHeight: '24rem', overflowY: 'auto' }}>
        {messages.length === 0 && (
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '1.2rem' }}>
            Click a preset or type a question below...
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: '1rem' }}>
            {m.role === 'user' ? (
              <div style={{ color: '#00d4ff', fontSize: '1.2rem' }}>
                <span style={{ opacity: 0.6 }}>&gt; </span>
                {m.content}
              </div>
            ) : (
              <div style={{ color: '#86efac', fontSize: '1.2rem', whiteSpace: 'pre-wrap' }}>
                <span style={{ opacity: 0.7 }}>◆ </span>
                {m.content || (loading && i === messages.length - 1 ? '...' : '')}
              </div>
            )}
          </div>
        ))}
        {loading && messages[messages.length - 1]?.role === 'user' && (
          <div style={{ color: '#86efac', fontSize: '1.2rem' }}>◆ <span className="cursor-blink" /></div>
        )}
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: '0.8rem', padding: '1rem 1.6rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <span style={{ color: '#00d4ff', fontFamily: 'JetBrains Mono, monospace', fontSize: '1.3rem' }}>&gt;</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask anything about your DAO..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#e2e8f0',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '1.2rem',
          }}
        />
        <button
          onClick={() => send()}
          disabled={loading || !input.trim()}
          style={{
            background: '#00d4ff',
            border: 'none',
            borderRadius: '0.6rem',
            padding: '0.4rem 1.2rem',
            color: '#0a0a0a',
            fontSize: '1.1rem',
            cursor: 'pointer',
            fontWeight: 700,
            opacity: loading || !input.trim() ? 0.5 : 1,
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AIAgentsPage() {
  return (
    <>
      {/* ── HERO (dark) ── */}
      <section className="bg-dark dot-grid" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', padding: '11.2rem 0 8rem' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" animate="visible" style={{ maxWidth: '64rem' }}>
            <motion.div variants={fadeUp}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <span className="eyebrow" style={{ marginBottom: 0 }}>AI Agents</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 1rem', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '10rem' }}>
                  <div className="pulse-dot" style={{ width: '0.6rem', height: '0.6rem' }} />
                  <span style={{ fontSize: '1.1rem', color: '#22c55e', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>LIVE</span>
                </div>
              </div>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              style={{
                fontSize: 'clamp(3.6rem, 6vw, 7.2rem)',
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                marginBottom: '2.4rem',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <span className="gradient-text">Four AI Agents.</span>
              <br />
              <span style={{ color: '#ffffff' }}>Always On.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: '1.8rem',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.7,
                marginBottom: '3.6rem',
                maxWidth: '52rem',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              HERMES, ATLAS, AEGIS, and NEXUS run 24/7 across every data feed, proposal, and wallet your DAO touches. Intelligence without sleep.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
              <Link href="/app" className="btn btn-neon btn-lg">
                Meet the Agents <ArrowRight size={18} />
              </Link>
              <Link href="/platform" className="btn btn-outline-white btn-lg">
                Architecture
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── AGENT CARDS (white) ── */}
      <section className="bg-white" style={{ padding: '9.6rem 0' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '6rem' }}>
              <span className="eyebrow">Intelligence Layer</span>
              <h2
                style={{
                  fontSize: 'clamp(2.8rem, 4vw, 4.8rem)',
                  fontWeight: 900,
                  color: '#0a0a0a',
                  lineHeight: 1.1,
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '-0.02em',
                  marginTop: '1.2rem',
                }}
              >
                Meet the agents
              </h2>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(28rem, 1fr))', gap: '2rem' }}>
              {agents.map(({ name, role, color, Icon, queries, desc }) => (
                <motion.div
                  key={name}
                  variants={fadeUp}
                  className="card-white"
                  style={{ padding: '2.8rem', borderLeft: `4px solid ${color}`, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.6rem' }}>
                    <div
                      style={{
                        width: '4rem',
                        height: '4rem',
                        borderRadius: '1rem',
                        background: `${color}14`,
                        border: `1px solid ${color}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={18} color={color} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', fontWeight: 700, color, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        {name}
                      </div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 600, color: '#0a0a0a', fontFamily: 'Inter, sans-serif' }}>
                        {role}
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: '1.3rem', color: '#4a5568', lineHeight: 1.65, marginBottom: '1.6rem', fontFamily: 'Inter, sans-serif' }}>
                    {desc}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {queries.map((q) => (
                      <div
                        key={q}
                        style={{
                          fontSize: '1.1rem',
                          fontStyle: 'italic',
                          color: '#94a3b8',
                          fontFamily: 'JetBrains Mono, monospace',
                          padding: '0.6rem 1rem',
                          background: '#f7f9fc',
                          borderRadius: '0.8rem',
                        }}
                      >
                        {q}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── LIVE TERMINAL (dark) ── */}
      <section className="bg-dark" style={{ padding: '9.6rem 0' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '4.8rem' }}>
              <span className="eyebrow">Live Demo</span>
              <h2
                style={{
                  fontSize: 'clamp(2.8rem, 4vw, 4.8rem)',
                  fontWeight: 900,
                  color: '#ffffff',
                  lineHeight: 1.1,
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '-0.02em',
                  marginTop: '1.2rem',
                  marginBottom: '1.2rem',
                }}
              >
                Ask an agent right now
              </h2>
              <p style={{ fontSize: '1.6rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif' }}>
                Powered by Gemini Flash. Streaming responses in real time.
              </p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <AIDemoTerminal />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW AGENTS WORK (off-white) ── */}
      <section className="bg-off" style={{ padding: '9.6rem 0' }}>
        <div className="container">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '6rem' }}>
              <span className="eyebrow">How It Works</span>
              <h2
                style={{
                  fontSize: 'clamp(2.8rem, 4vw, 4.8rem)',
                  fontWeight: 900,
                  color: '#0a0a0a',
                  lineHeight: 1.1,
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '-0.02em',
                  marginTop: '1.2rem',
                }}
              >
                Intelligence in three steps
              </h2>
            </motion.div>

            <div style={{ display: 'flex', gap: '4.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {howSteps.map((step) => (
                <motion.div
                  key={step.n}
                  variants={fadeUp}
                  className="card-white"
                  style={{ flex: '1 1 28rem', maxWidth: '36rem', padding: '3.2rem', textAlign: 'center' }}
                >
                  <div
                    style={{
                      width: '5.6rem',
                      height: '5.6rem',
                      borderRadius: '50%',
                      background: step.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 2rem',
                      boxShadow: `0 0.4rem 2rem ${step.color}40`,
                    }}
                  >
                    <step.Icon size={24} color="#0a0a0a" />
                  </div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: step.color, letterSpacing: '0.08em', marginBottom: '0.8rem' }}>
                    {step.n}
                  </div>
                  <h3 style={{ fontSize: '2rem', fontWeight: 700, color: '#0a0a0a', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '1.4rem', color: '#4a5568', lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }}>
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA (dark) ── */}
      <section className="bg-dark" style={{ padding: '12rem 0', textAlign: 'center' }}>
        <div className="container">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            style={{ maxWidth: '52rem', margin: '0 auto' }}
          >
            <motion.div variants={fadeUp}>
              <span className="eyebrow">Activate</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: 'clamp(3.2rem, 5vw, 6rem)',
                fontWeight: 900,
                color: '#ffffff',
                marginBottom: '2rem',
                fontFamily: 'Inter, sans-serif',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              Intelligence{' '}
              <span className="gradient-text">on demand.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{ fontSize: '1.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '4rem', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}
            >
              All four agents activate the moment you connect your DAO. No setup. No configuration. Pure signal.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/app" className="btn btn-neon btn-lg">
                Activate AI Agents <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
