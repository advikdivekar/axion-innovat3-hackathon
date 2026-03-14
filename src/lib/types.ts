// src/lib/types.ts

// ═══ ENUMS ═══
export type ModuleId = 'home' | 'governance' | 'treasury' | 'contributors' | 'security' | 'simulator';

export type ProposalStatus = 'pending' | 'active' | 'passed' | 'defeated' | 'queued' | 'executed' | 'cancelled' | 'expired';

export type ThreatType = 'sybil' | 'treasury_drain' | 'governance_manipulation' | 'suspicious_wallet' | 'flash_loan' | 'contract_exploit';

export type ThreatSeverity = 'low' | 'medium' | 'high' | 'critical';

export type ContributorClass = 'architect' | 'diplomat' | 'sentinel' | 'merchant' | 'explorer';

export type AgentRole = 'governance' | 'treasury' | 'security' | 'operations' | 'general';

export type EventType = 'vote_cast' | 'proposal_created' | 'proposal_executed' | 'transfer_in' | 'transfer_out' | 'swap' | 'delegate_change' | 'threat_detected' | 'threat_resolved' | 'contributor_join' | 'contributor_leave' | 'whale_movement';

export type VisualEffectType = 'shockwave' | 'pulse' | 'energy_beam' | 'star_birth' | 'star_death' | 'alert_flash' | 'lightning';

export type ScenarioType = 'market_crash' | 'governance_takeover' | 'treasury_depletion' | 'whale_influence' | 'contributor_exodus' | 'protocol_exploit' | 'custom';

export type NodeType = 'governance' | 'treasury' | 'contributor' | 'contract' | 'wallet' | 'threat';

export type ConnectionType = 'transaction' | 'vote' | 'collaboration' | 'delegation' | 'threat_link';

export type RiskLevel = 'normal' | 'elevated' | 'high' | 'critical';

export type TransferType = 'transfer' | 'swap' | 'stake' | 'unstake' | 'claim' | 'bridge';

// ═══ GOVERNANCE ═══
export interface Proposal {
    id: string;
    onChainId: string;
    title: string;
    description: string;
    proposer: string;
    proposerENS?: string;
    status: ProposalStatus;
    forVotes: number;
    againstVotes: number;
    abstainVotes: number;
    quorum: number;
    quorumReached: boolean;
    startBlock: number;
    endBlock: number;
    startTimestamp: string;
    endTimestamp: string;
    impactScore: number;
    aiSummary: string;
    totalVoters: number;
    topVoters: VoteRecord[];
    createdAt: string;
    updatedAt: string;
}

export interface VoteRecord {
    id: string;
    proposalId: string;
    voter: string;
    voterENS?: string;
    support: 0 | 1 | 2;
    weight: number;
    isWhale: boolean;
    timestamp: string;
    blockNumber: number;
    txHash: string;
}

export interface Delegate {
    address: string;
    ensName?: string;
    votingPower: number;
    delegatorsCount: number;
    votesParticipated: number;
    proposalsCreated: number;
    participationRate: number;
}

// ═══ TREASURY ═══
export interface TreasuryState {
    totalValueUSD: number;
    tokens: TokenBalance[];
    inflow24h: number;
    outflow24h: number;
    inflow7d: number;
    outflow7d: number;
    netFlow24h: number;
    runwayDays: number;
    healthScore: number;
    riskLevel: RiskLevel;
    concentrationRisk: number;
    volatilityRisk: number;
    recentTransfers: TreasuryTransfer[];
    snapshotTimestamp: string;
}

export interface TokenBalance {
    symbol: string;
    name: string;
    address: string;
    balance: number;
    decimals: number;
    valueUSD: number;
    percentage: number;
    priceUSD: number;
    priceChange24h: number;
    logoURI?: string;
}

export interface TreasuryTransfer {
    id: string;
    txHash: string;
    from: string;
    fromENS?: string;
    to: string;
    toENS?: string;
    tokenSymbol: string;
    tokenAddress: string;
    amount: number;
    valueUSD: number;
    type: TransferType;
    timestamp: string;
    blockNumber: number;
    isAnomaly: boolean;
}

// ═══ CONTRIBUTORS ═══
export interface Contributor {
    address: string;
    ensName?: string;
    displayName: string;
    votingPower: number;
    delegatorsCount: number;
    proposalsCreated: number;
    votesCast: number;
    totalVotes: number;
    participationRate: number;
    activityScore: number;
    reputationScore: number;
    contributorClass: ContributorClass;
    xp: number;
    level: number;
    firstSeen: string;
    lastActive: string;
    daysSinceLastActive: number;
    isActive: boolean;
    collaborators: string[];
    avatarSeed: string;
}

// ═══ SECURITY ═══
export interface Threat {
    id: string;
    type: ThreatType;
    severity: ThreatSeverity;
    riskScore: number;
    affectedEntity: string;
    affectedEntityType: NodeType;
    title: string;
    description: string;
    evidence: ThreatEvidence[];
    status: 'active' | 'investigating' | 'resolved' | 'dismissed';
    detectedAt: string;
    resolvedAt?: string;
    detectedBy: 'ai' | 'heuristic' | 'manual';
}

export interface ThreatEvidence {
    type: string;
    description: string;
    data: Record<string, unknown>;
    confidence: number;
}

export interface WalletRiskAssessment {
    address: string;
    ensName?: string;
    overallRisk: number;
    factors: {
        accountAge: { score: number; detail: string };
        tokenConcentration: { score: number; detail: string };
        behaviorPattern: { score: number; detail: string };
        networkConnections: { score: number; detail: string };
        transactionVelocity: { score: number; detail: string };
    };
    flags: string[];
    recommendation: string;
    assessedAt: string;
}

// ═══ AI AGENT ═══
export interface AgentMessage {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: string;
    agentRole: AgentRole;
    highlights?: string[];
    structuredData?: Record<string, unknown>;
    isStreaming?: boolean;
}

export interface AgentContext {
    daoMeta: DAOMeta;
    proposals: Proposal[];
    treasury: TreasuryState;
    contributors: Contributor[];
    threats: Threat[];
    recentEvents: DAOEvent[];
}

export interface AgentResponse {
    text: string;
    highlights: string[];
    riskLevel?: RiskLevel;
    data?: Record<string, unknown>;
    suggestedActions?: string[];
}

// ═══ SIMULATION ═══
export interface SimulationInput {
    scenarioType: ScenarioType;
    severity: number;
    params: Record<string, unknown>;
    currentState: {
        treasuryValue: number;
        contributorCount: number;
        activeProposals: number;
        healthScore: number;
    };
}

export interface SimulationTimeline {
    id: string;
    name: string;
    probability: number;
    sentiment: 'positive' | 'neutral' | 'negative';
    narrative: string;
    metrics: {
        treasuryValue: number;
        treasuryChange: number;
        contributorCount: number;
        contributorChange: number;
        governanceHealth: number;
        survivalMonths: number;
    };
    keyEvents: string[];
    risks: string[];
}

export interface SimulationResult {
    id: string;
    scenarioType: ScenarioType;
    timelines: [SimulationTimeline, SimulationTimeline, SimulationTimeline];
    generatedAt: string;
}

// ═══ EVENTS ═══
export interface DAOEvent {
    id: string;
    type: EventType;
    title: string;
    data: Record<string, unknown>;
    sourceNodeId?: string;
    targetNodeId?: string;
    magnitude: number;
    timestamp: string;
}

export interface VisualEffect {
    id: string;
    type: VisualEffectType;
    origin: [number, number, number];
    target?: [number, number, number];
    color: string;
    intensity: number;
    duration: number;
    startedAt: number;
}

// ═══ 3D SCENE GRAPH ═══
export interface NetworkNode {
    id: string;
    type: NodeType;
    label: string;
    address?: string;
    position: [number, number, number];
    size: number;
    brightness: number;
    color: string;
    isHighlighted: boolean;
    isDimmed: boolean;
    connections: string[];
    metadata: Record<string, unknown>;
    moduleCluster: ModuleId;
}

export interface NetworkConnection {
    id: string;
    sourceId: string;
    targetId: string;
    type: ConnectionType;
    strength: number;
    animated: boolean;
    color: string;
    pulseActive: boolean;
}

export interface NetworkGraph {
    nodes: NetworkNode[];
    connections: NetworkConnection[];
    clusters: Record<ModuleId, [number, number, number]>;
}

// ═══ DAO METADATA ═══
export interface DAOMeta {
    name: string;
    symbol: string;
    chain: string;
    governorAddress: string;
    tokenAddress: string;
    treasuryAddress: string;
    timelockAddress: string;
    snapshotSpace?: string;
    healthScore: number;
    riskLevel: RiskLevel;
}

// ═══ GAMIFICATION ═══
export interface UserProfile {
    walletAddress: string;
    ensName?: string;
    contributorClass: ContributorClass;
    xp: number;
    level: number;
    rank: number;
    badges: Badge[];
    achievements: Achievement[];
    stats: {
        votesAll: number;
        proposalsAll: number;
        securityReports: number;
        treasuryActions: number;
        daysActive: number;
        currentStreak: number;
    };
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    tier: 'bronze' | 'silver' | 'gold' | 'legendary';
    iconEmoji: string;
    earnedAt: string;
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
    progress: number;
    target: number;
    current: number;
    completed: boolean;
    reward: number;
}

// ═══ UI STATE ═══
export interface UIState {
    activeModule: ModuleId;
    selectedNodeId: string | null;
    zoomLevel: number;
    sidebarCollapsed: boolean;
    commandBarActive: boolean;
    holoAssistantVisible: boolean;
    cameraTarget: [number, number, number];
    cameraPosition: [number, number, number];
    isDemoMode: boolean;
    isLoading: boolean;
    loadingMessage: string;
}

// ═══ ANALYTICS ═══
export interface DAOHealthMetrics {
    overallScore: number;
    governanceHealth: number;
    treasuryHealth: number;
    contributorHealth: number;
    securityHealth: number;
    trend: 'improving' | 'stable' | 'declining';
    lastCalculated: string;
}

export interface GovernanceMetrics {
    totalProposals: number;
    activeProposals: number;
    averageTurnout: number;
    averageQuorumRate: number;
    whaleInfluenceScore: number;
    decentralizationScore: number;
    proposalPassRate: number;
}

export interface TreasuryMetrics {
    totalValue: number;
    monthlyBurnRate: number;
    monthlyIncome: number;
    runwayMonths: number;
    diversificationScore: number;
    volatilityExposure: number;
    defiYieldRate: number;
}

export interface ContributorMetrics {
    totalContributors: number;
    activeContributors: number;
    newContributorsWeek: number;
    churned30d: number;
    averageActivityScore: number;
    topContributorConcentration: number;
    classDistribution: Record<ContributorClass, number>;
}