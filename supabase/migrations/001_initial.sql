-- supabase/migrations/001_initial_schema.sql

-- ═══ PROPOSALS ═══
CREATE TABLE proposals (
  id TEXT PRIMARY KEY,
  on_chain_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  proposer TEXT NOT NULL,
  proposer_ens TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  for_votes NUMERIC NOT NULL DEFAULT 0,
  against_votes NUMERIC NOT NULL DEFAULT 0,
  abstain_votes NUMERIC NOT NULL DEFAULT 0,
  quorum NUMERIC,
  quorum_reached BOOLEAN DEFAULT false,
  start_block BIGINT,
  end_block BIGINT,
  start_timestamp TIMESTAMPTZ,
  end_timestamp TIMESTAMPTZ,
  impact_score NUMERIC DEFAULT 0,
  ai_summary TEXT DEFAULT '',
  total_voters INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_proposals_status ON proposals(status);
CREATE INDEX idx_proposals_created ON proposals(created_at DESC);

-- ═══ VOTES ═══
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id TEXT REFERENCES proposals(id),
  voter TEXT NOT NULL,
  voter_ens TEXT,
  support INTEGER NOT NULL,
  weight NUMERIC NOT NULL,
  is_whale BOOLEAN DEFAULT false,
  timestamp TIMESTAMPTZ,
  block_number BIGINT,
  tx_hash TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_votes_proposal ON votes(proposal_id);
CREATE INDEX idx_votes_voter ON votes(voter);
CREATE INDEX idx_votes_whale ON votes(is_whale) WHERE is_whale = true;
CREATE INDEX idx_votes_timestamp ON votes(timestamp DESC);

-- ═══ CONTRIBUTORS ═══
CREATE TABLE contributors (
  address TEXT PRIMARY KEY,
  ens_name TEXT,
  display_name TEXT,
  voting_power NUMERIC DEFAULT 0,
  delegators_count INTEGER DEFAULT 0,
  proposals_created INTEGER DEFAULT 0,
  votes_cast INTEGER DEFAULT 0,
  total_votes INTEGER DEFAULT 0,
  participation_rate NUMERIC DEFAULT 0,
  activity_score NUMERIC DEFAULT 0,
  reputation_score NUMERIC DEFAULT 0,
  contributor_class TEXT DEFAULT 'explorer',
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  first_seen TIMESTAMPTZ,
  last_active TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  collaborators TEXT[] DEFAULT '{}',
  avatar_seed TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_contributors_active ON contributors(is_active);
CREATE INDEX idx_contributors_power ON contributors(voting_power DESC);
CREATE INDEX idx_contributors_activity ON contributors(activity_score DESC);
CREATE INDEX idx_contributors_class ON contributors(contributor_class);

-- ═══ TREASURY SNAPSHOTS ═══
CREATE TABLE treasury_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  total_value_usd NUMERIC,
  tokens JSONB DEFAULT '[]',
  inflow_24h NUMERIC DEFAULT 0,
  outflow_24h NUMERIC DEFAULT 0,
  inflow_7d NUMERIC DEFAULT 0,
  outflow_7d NUMERIC DEFAULT 0,
  net_flow_24h NUMERIC DEFAULT 0,
  runway_days INTEGER,
  health_score NUMERIC DEFAULT 0,
  risk_level TEXT DEFAULT 'normal',
  concentration_risk NUMERIC DEFAULT 0,
  volatility_risk NUMERIC DEFAULT 0,
  snapshot_timestamp TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_treasury_timestamp ON treasury_snapshots(snapshot_timestamp DESC);

-- ═══ TREASURY TRANSFERS ═══
CREATE TABLE treasury_transfers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tx_hash TEXT UNIQUE,
  from_address TEXT NOT NULL,
  from_ens TEXT,
  to_address TEXT NOT NULL,
  to_ens TEXT,
  token_symbol TEXT,
  token_address TEXT,
  amount NUMERIC,
  value_usd NUMERIC,
  transfer_type TEXT DEFAULT 'transfer',
  timestamp TIMESTAMPTZ,
  block_number BIGINT,
  is_anomaly BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_transfers_timestamp ON treasury_transfers(timestamp DESC);
CREATE INDEX idx_transfers_from ON treasury_transfers(from_address);
CREATE INDEX idx_transfers_to ON treasury_transfers(to_address);
CREATE INDEX idx_transfers_anomaly ON treasury_transfers(is_anomaly) WHERE is_anomaly = true;

-- ═══ THREATS ═══
CREATE TABLE threats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  threat_type TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'medium',
  risk_score NUMERIC DEFAULT 0,
  affected_entity TEXT,
  affected_entity_type TEXT,
  title TEXT NOT NULL,
  description TEXT,
  evidence JSONB DEFAULT '[]',
  status TEXT DEFAULT 'active',
  detected_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ,
  detected_by TEXT DEFAULT 'heuristic'
);

CREATE INDEX idx_threats_status ON threats(status);
CREATE INDEX idx_threats_severity ON threats(severity);
CREATE INDEX idx_threats_detected ON threats(detected_at DESC);

-- ═══ EVENTS LOG ═══
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  title TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  source_node_id TEXT,
  target_node_id TEXT,
  magnitude NUMERIC DEFAULT 0.5,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_events_type ON events(event_type);
CREATE INDEX idx_events_created ON events(created_at DESC);

-- ═══ ENABLE REALTIME ═══
ALTER PUBLICATION supabase_realtime ADD TABLE events;
ALTER PUBLICATION supabase_realtime ADD TABLE threats;
ALTER PUBLICATION supabase_realtime ADD TABLE votes;
ALTER PUBLICATION supabase_realtime ADD TABLE treasury_transfers;