# Axion — Deep Technical Architecture

This document describes the internal architecture of Axion DAO Cosmos OS in detail. It is intended for contributors who want to understand how the system works end-to-end.

---

## Table of Contents

1. [Blockchain Data Pipeline](#1-blockchain-data-pipeline)
2. [AI Streaming Architecture](#2-ai-streaming-architecture)
3. [3D Universe — Data to Visuals](#3-3d-universe--data-to-visuals)
4. [Zustand State Management](#4-zustand-state-management)
5. [Database Schema](#5-database-schema)
6. [Request Lifecycle](#6-request-lifecycle)

---

## 1. Blockchain Data Pipeline

### Overview

Axion targets three Uniswap contracts on Ethereum mainnet:

| Contract | Address | Purpose |
|---|---|---|
| Governor Bravo | `0x408ED6354d4973f66138C91495F2f2FCbd8724C3` | All governance proposals and votes |
| UNI Token | `0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984` | Voting power, delegation, transfers |
| Treasury Multisig | `0x1a9C8182C09F50C8318d769245beA52c32BE35BC` | $2.3B in UNI, USDC, ETH |

### Data Flow

```
Alchemy SDK (eth-mainnet)
  └── src/services/alchemy.ts
        ├── getProposals()         → queryFilter(Governor, ProposalCreated, block range)
        ├── getVotes()             → queryFilter(Governor, VoteCast, proposalId)
        ├── getTreasuryBalances()  → getTokenBalances(treasury address)
        └── getTransfers()        → getAssetTransfers(from/to treasury)

Each result is decoded via src/services/contracts.ts (ABI definitions)
  └── Governor ABI: ProposalCreated, VoteCast, ProposalExecuted events
  └── ERC20 ABI: Transfer, DelegateChanged events

Decoded data → typed via src/lib/types.ts → stored in Supabase → returned by API routes
```

### Mock Fallback

Every API route wraps its data fetch in a try/catch. When `ALCHEMY_API_KEY` is absent or the fetch fails, routes return data from `src/lib/mockData.ts`. The mock data is production-realistic:

- `MOCK_PROPOSALS`: Uniswap Proposal #127 (fee switch) and #126 (Base deployment) with real addresses (`gauntlet.eth`, `a16z.eth`), real vote counts, and real quorum threshold (40M UNI)
- `MOCK_TREASURY`: $2.34B total value, real token addresses, realistic 76.8% UNI concentration risk
- `MOCK_CONTRIBUTORS`: 20 procedurally generated profiles with contributor classes, XP levels, and ENS names
- `MOCK_THREATS`: Critical Sybil cluster (47 wallets, risk score 87) + medium treasury drain alert

### Polling Intervals (from `src/lib/constants.ts`)

```typescript
POLLING = {
  BLOCKCHAIN_DATA: 30_000,   // proposals, votes — every 30s
  TREASURY_BALANCE: 60_000,  // token balances — every 60s
  EVENTS_CHECK: 15_000,      // live events — every 15s
  HEALTH_RECALC: 120_000,    // DAO health score — every 2 min
}
```

---

## 2. AI Streaming Architecture

### Route: `POST /api/ai` (Edge Runtime)

The AI route runs on Vercel's Edge Runtime (`export const runtime = 'edge'`), which means:
- No Node.js APIs (no `fs`, no `Buffer`)
- Zero cold start latency
- Global distribution via CDN edge nodes

### Agent Dispatch

```typescript
const AGENT_PROMPTS: Record<string, string> = {
  governance: 'You are HERMES, the Governance Analyst...',
  treasury:   'You are ATLAS, the Treasury Guardian...',
  security:   'You are AEGIS, the Security Sentinel...',
  operations: 'You are NEXUS, the Operations Forecaster...',
  general:    'You are an AI assistant for Axion DAO OS...',
};

// Request body: { message: string, agent: AgentRole }
const agentKey = agent ?? 'general';
const systemPrompt = AGENT_PROMPTS[agentKey] ?? AGENT_PROMPTS.general;
```

### Streaming Pattern

```typescript
// Server side (route.ts)
const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
  systemInstruction: systemPrompt,
  generationConfig: { temperature: 0.7, maxOutputTokens: 400 },
});
const result = await model.generateContentStream(message);

return new Response(
  new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) controller.enqueue(new TextEncoder().encode(text));
      }
      controller.close();
    },
  }),
  { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache' } }
);
```

```typescript
// Client side (useAIChat.ts)
const res = await fetch('/api/ai', {
  method: 'POST',
  body: JSON.stringify({ message: msg, agent: agent ?? 'general' }),
});
const reader = res.body?.getReader();
const decoder = new TextDecoder();
let aiText = '';

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  aiText += decoder.decode(value, { stream: true });
  // Update the last assistant message incrementally
  setMessages(prev => {
    const updated = [...prev];
    updated[updated.length - 1] = { role: 'assistant', content: aiText };
    return updated;
  });
}
```

### Demo Mode

When `GOOGLE_GENERATIVE_AI_API_KEY` is not set, the route immediately returns a demo message without calling Gemini:

```typescript
if (!apiKey) {
  const demoMsg = `[DEMO MODE] ${agentKey.toUpperCase()} agent is online. ` +
    `Add GOOGLE_GENERATIVE_AI_API_KEY to enable live AI responses.`;
  // Returns as a single-chunk stream so the UI handles it identically
}
```

---

## 3. 3D Universe — Data to Visuals

### Architecture

The 3D universe uses a layered rendering approach:

```
AppLayout (src/app/app/layout.tsx)
  ├── z=0  UniverseCanvas (position: fixed, inset: 0)
  │         └── UniverseScene (Three.js / React Three Fiber)
  │               ├── EarthGlobe          — central navy sphere (r=3.1), wireframe overlay
  │               ├── MODULE_NODES[6]     — colored satellite spheres with pointLights
  │               ├── ConnectionLine[]    — Earth → node dashed lines
  │               ├── NodeConnectionLine[] — node → node connection web
  │               ├── TravellingParticle[] — animated particles along all connections
  │               ├── Text[]              — node labels above each sphere
  │               ├── Stars               — 5000 background stars (r=150)
  │               └── OrbitControls       — auto-rotate, damping, min/max distance
  │
  └── z=10+ 2D UI layer (position: absolute, inset: 0, pointerEvents: none)
              ├── StatusBar               — fixed top, z=30
              ├── Sidebar                 — fixed left, z=20
              └── <main>                  — module page content, scrollable
                    └── Exit Button       — absolute top-right, z=40
```

### Module Node Positions (3D coordinates)

```typescript
const MODULE_NODES = [
  { id: 'governance',   position: [-5,  3,  0], color: '#d075ff', size: 0.32 },
  { id: 'treasury',     position: [ 5,  2,  0], color: '#f59e0b', size: 0.32 },
  { id: 'contributors', position: [ 0, -4,  2], color: '#89b0ff', size: 0.28 },
  { id: 'security',     position: [ 1,  4.5, 3], color: '#ff5c16', size: 0.28 },
  { id: 'simulator',    position: [-4, -2,  3], color: '#baf24a', size: 0.28 },
  { id: 'ai',           position: [ 3, -3, -3], color: '#d075ff', size: 0.28 },
];
```

### Animation Loop

Each frame (`useFrame`), three things happen:
1. **Earth rotates** — `earthRef.rotation.y += delta * 0.18`
2. **Glow sphere counter-rotates** — `glowRef.rotation.y -= delta * 0.05`
3. **Module nodes pulse** — `scale = 1 + 0.1 * sin(t * 1.5 + phase)`, hover scale = 1.6×

### SSR Safety

Three.js cannot run server-side. The `UniverseCanvas` component uses Next.js `dynamic` import with `ssr: false`:

```typescript
const UniverseScene = dynamic(() => import('./UniverseScene'), {
  ssr: false,
  loading: () => <div style={{ background: 'var(--void-deepest)', ...fixedInset }} />,
});
```

The loading placeholder is a solid dark div that seamlessly transitions into the WebGL canvas once it loads client-side.

---

## 4. Zustand State Management

Four stores manage all application state. They are initialized in `src/app/providers.tsx` and hydrated with API data.

### `daoStore.ts` — Core DAO Data

```typescript
interface DAOStore {
  daoMeta: DAOMeta | null;           // Name, symbol, governor address, health score
  proposals: Proposal[];             // Active + recent proposals
  treasury: TreasuryState | null;    // Token balances, flows, runway
  contributors: Contributor[];       // All contributor profiles
  threats: Threat[];                 // Active security threats
  isLoading: boolean;
  lastUpdated: string | null;
}
```

### `agentStore.ts` — AI Agent State

```typescript
interface AgentStore {
  messages: AgentMessage[];          // Chat history per agent
  activeAgent: AgentRole;            // 'governance' | 'treasury' | ...
  isStreaming: boolean;              // True while Gemini is generating
  streamingContent: string;         // Current partial token stream
}
```

### `eventStore.ts` — Real-time Events

```typescript
interface EventStore {
  events: DAOEvent[];                // Ring buffer of recent DAO events
  visualEffects: VisualEffect[];     // Active 3D visual effects (shockwaves, pulses)
  addEvent: (e: DAOEvent) => void;  // Triggers visual effect in 3D scene
}
```

### `uiStore.ts` — UI State

```typescript
interface UIStore {
  activeModule: ModuleId;            // Which sidebar item is selected
  sidebarCollapsed: boolean;         // Controls main content left offset
  commandBarActive: boolean;         // Ctrl+K AI command bar toggle
  cameraTarget: [number, number, number]; // Three.js camera look-at point
  isDemoMode: boolean;               // Shows demo banner when no API keys
}
```

---

## 5. Database Schema

Supabase PostgreSQL with 7 tables. Migration in `supabase/migrations/001_initial.sql`.

### Tables

| Table | Primary Key | Key Columns | Indexes |
|---|---|---|---|
| `proposals` | `id TEXT` | `on_chain_id`, `status`, `for_votes`, `against_votes` | `status`, `created_at DESC` |
| `votes` | `id UUID` | `proposal_id`, `voter`, `support`, `weight`, `is_whale` | `proposal_id`, `voter`, `is_whale`, `timestamp DESC` |
| `contributors` | `address TEXT` | `voting_power`, `reputation_score`, `contributor_class`, `xp`, `level` | `is_active`, `voting_power DESC`, `activity_score DESC`, `class` |
| `treasury_snapshots` | `id UUID` | `total_value_usd`, `tokens JSONB`, `runway_days`, `health_score` | `snapshot_timestamp DESC` |
| `treasury_transfers` | `id UUID` | `tx_hash`, `from_address`, `to_address`, `amount`, `value_usd`, `is_anomaly` | `timestamp DESC`, `from_address`, `to_address`, `is_anomaly` |
| `threats` | `id UUID` | `threat_type`, `severity`, `risk_score`, `status`, `detected_by` | `status`, `severity`, `detected_at DESC` |
| `events` | `id UUID` | `event_type`, `title`, `data JSONB`, `magnitude` | `event_type`, `created_at DESC` |

### Realtime Subscriptions

Four tables have Supabase realtime enabled:

```sql
ALTER PUBLICATION supabase_realtime ADD TABLE events;
ALTER PUBLICATION supabase_realtime ADD TABLE threats;
ALTER PUBLICATION supabase_realtime ADD TABLE votes;
ALTER PUBLICATION supabase_realtime ADD TABLE treasury_transfers;
```

When any row is inserted into these tables (e.g., a new vote cast on Ethereum triggers an event write), the Supabase client in `src/services/supabase.ts` receives a real-time payload and dispatches it to the `eventStore`, which triggers a visual effect in the Three.js scene.

---

## 6. Request Lifecycle

### Full cycle: user navigates to `/app/governance`

```
1. Browser requests /app/governance
   └── Next.js serves the static shell (layout.tsx + page.tsx)

2. Client-side hydration
   └── AppLayout mounts → UniverseCanvas loads via dynamic import
   └── LoadingScreen plays boot animation (2-3 seconds)
   └── On complete: LoadingScreen fades out, opacity: 0 → 1 on main UI

3. GovernancePage mounts
   └── useApiData(getProposals) fires
   └── getProposals() → fetch('/api/blockchain/proposals')
   └── API route returns MOCK_PROPOSALS (or live Alchemy data)
   └── loading=true → KpiCard skeletons shown (height: 6.4rem)
   └── loading=false → KpiCards render with useCountUp animation

4. User hovers a module node in the 3D canvas
   └── NodeSphere.handlePointerOver fires
   └── Projects 3D position to screen coordinates
   └── DOM tooltip appears at (x, y) with module name + "Click to open"
   └── cursor changes to pointer

5. User clicks the node
   └── handleClick → router.push('/app/governance')
   └── Next.js client-side navigation (no full page reload)
   └── GovernancePage re-renders with fresh data

6. User types in AI terminal
   └── useAIChat('governance').sendMessage(text)
   └── fetch('/api/ai', { body: { message, agent: 'governance' } })
   └── ReadableStream reader starts
   └── Each chunk: setMessages updates last assistant message content
   └── UI re-renders with incremental token stream
   └── On stream close: loading=false, input re-enabled
```

---

## Module Color Tokens

All module colors are defined once and used consistently across the 3D canvas, sidebar, KPI cards, and AI agent chips:

```css
--gov:          #d075ff   /* Governance — purple */
--treasury:     #f59e0b   /* Treasury — amber */
--contributors: #89b0ff   /* Contributors — periwinkle */
--security:     #ff5c16   /* Security — orange-red */
--simulator:    #baf24a   /* Simulator — acid green */
--ai:           #d075ff   /* AI Agents — purple (same as governance) */
--cyan:         #00d4ff   /* Universe core / connections */
```

These tokens flow from `src/lib/colors.ts` → `src/app/globals.css` CSS custom properties → Three.js node colors → Tailwind utility classes.
