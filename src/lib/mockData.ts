// src/lib/mockData.ts
import {
    Proposal, TreasuryState, Contributor, Threat, DAOEvent,
    SimulationResult, WalletRiskAssessment
} from './types';

const NOW = new Date().toISOString();

export const MOCK_PROPOSALS: Proposal[] = [
    {
        id: '127',
        onChainId: '0x1234567890abcdef1234567890abcdef12345678',
        title: 'Upgrade fee switch to 1/5 protocol fee',
        description: 'This proposal would direct 20% of trading fees to the DAO treasury, estimated at $40M annually. Supporters argue it funds development; opponents fear LP exodus.',
        proposer: '0x1a9C8182C09F50C8318d769245beA52c32BE35BC',
        proposerENS: 'gauntlet.eth',
        status: 'active',
        forVotes: 12400000,
        againstVotes: 6000000,
        abstainVotes: 100000,
        quorum: 40000000,
        quorumReached: false,
        startBlock: 19500000,
        endBlock: 19550000,
        startTimestamp: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        endTimestamp: new Date(Date.now() + 86400000 * 2).toISOString(),  // 2 days from now
        impactScore: 85,
        aiSummary: 'Activates the fee switch to divert 20% of LP fees to the DAO treasury. High impact on protocol economics.',
        totalVoters: 847,
        topVoters: [
            { id: 'v1', proposalId: '127', voter: '0x1111111111111111111111111111111111111111', voterENS: 'a16z.eth', support: 1, weight: 2100000, isWhale: true, timestamp: NOW, blockNumber: 19500100, txHash: '0xabc' },
            { id: 'v2', proposalId: '127', voter: '0x2222222222222222222222222222222222222222', voterENS: 'penguinlover.eth', support: 0, weight: 800000, isWhale: false, timestamp: NOW, blockNumber: 19500200, txHash: '0xdef' }
        ],
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: NOW,
    },
    {
        id: '126',
        onChainId: '0x0987654321fedcba0987654321fedcba09876543',
        title: 'Deploy Uniswap V3 on Base',
        description: 'Proposal to deploy Uniswap V3 smart contracts to the Base L2 network.',
        proposer: '0x3333333333333333333333333333333333333333',
        status: 'passed',
        forVotes: 45000000,
        againstVotes: 1000000,
        abstainVotes: 0,
        quorum: 40000000,
        quorumReached: true,
        startBlock: 19400000,
        endBlock: 19450000,
        startTimestamp: new Date(Date.now() - 86400000 * 14).toISOString(),
        endTimestamp: new Date(Date.now() - 86400000 * 7).toISOString(),
        impactScore: 60,
        aiSummary: 'Routine multichain expansion to Coinbase’s Base L2 network.',
        totalVoters: 1204,
        topVoters: [],
        createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    }
];

export const MOCK_TREASURY: TreasuryState = {
    totalValueUSD: 2341567890,
    tokens: [
        { symbol: 'UNI', name: 'Uniswap', address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', balance: 300000000, decimals: 18, valueUSD: 1800000000, percentage: 76.8, priceUSD: 6.00, priceChange24h: 2.3 },
        { symbol: 'USDC', name: 'USD Coin', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', balance: 340000000, decimals: 6, valueUSD: 340000000, percentage: 14.5, priceUSD: 1.00, priceChange24h: 0.01 },
        { symbol: 'ETH', name: 'Ethereum', address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', balance: 60000, decimals: 18, valueUSD: 180000000, percentage: 7.7, priceUSD: 3000.00, priceChange24h: -1.2 },
    ],
    inflow24h: 12400000,
    outflow24h: 8700000,
    inflow7d: 85000000,
    outflow7d: 42000000,
    netFlow24h: 3700000,
    runwayDays: 1533, // ~4.2 years
    healthScore: 87,
    riskLevel: 'normal',
    concentrationRisk: 76.8,
    volatilityRisk: 65.0,
    recentTransfers: [
        { id: 't1', txHash: '0x1', from: '0xExternal', to: '0xTreasury', tokenSymbol: 'USDC', tokenAddress: '0x', amount: 5000000, valueUSD: 5000000, type: 'transfer', timestamp: NOW, blockNumber: 19500000, isAnomaly: false },
        { id: 't2', txHash: '0x2', from: '0xTreasury', to: '0xDevs', tokenSymbol: 'UNI', tokenAddress: '0x', amount: 100000, valueUSD: 600000, type: 'transfer', timestamp: new Date(Date.now() - 3600000).toISOString(), blockNumber: 19499000, isAnomaly: false }
    ],
    snapshotTimestamp: NOW
};

// Procedurally generate 20 contributors based on blueprint
export const MOCK_CONTRIBUTORS: Contributor[] = Array.from({ length: 20 }).map((_, i) => ({
    address: `0x${Math.random().toString(16).slice(2, 42)}`,
    ensName: i === 0 ? 'vitalik.eth' : i === 1 ? 'a16z.eth' : i === 2 ? 'gauntlet.eth' : `contributor${i}.eth`,
    displayName: `Contributor ${i}`,
    votingPower: Math.floor(Math.random() * (i < 3 ? 3000000 : 500000)),
    delegatorsCount: Math.floor(Math.random() * 5000),
    proposalsCreated: Math.floor(Math.random() * 10),
    votesCast: Math.floor(Math.random() * 200),
    totalVotes: 250,
    participationRate: Math.random(),
    activityScore: Math.floor(Math.random() * 100),
    reputationScore: Math.floor(Math.random() * 100),
    contributorClass: ['architect', 'diplomat', 'sentinel', 'merchant', 'explorer'][Math.floor(Math.random() * 5)] as any,
    xp: Math.floor(Math.random() * 50000),
    level: Math.floor(Math.random() * 50),
    firstSeen: new Date(Date.now() - 86400000 * 365).toISOString(),
    lastActive: new Date(Date.now() - 86400000 * Math.random() * 10).toISOString(),
    daysSinceLastActive: Math.floor(Math.random() * 10),
    isActive: true,
    collaborators: [],
    avatarSeed: `seed${i}`,
}));

export const MOCK_THREATS: Threat[] = [
    {
        id: 'th1',
        type: 'sybil',
        severity: 'critical',
        riskScore: 87,
        affectedEntity: '0xMultiple',
        affectedEntityType: 'contributor',
        title: 'Sybil Attack Detected',
        description: 'Cluster of 47 wallets with identical voting patterns and funding sources.',
        evidence: [],
        status: 'active',
        detectedAt: NOW,
        detectedBy: 'ai',
    },
    {
        id: 'th2',
        type: 'treasury_drain',
        severity: 'medium',
        riskScore: 45,
        affectedEntity: '0xTreasury',
        affectedEntityType: 'treasury',
        title: 'Unusual Treasury Outflow',
        description: 'Treasury outflow spike: 3x normal in last 6 hours.',
        evidence: [],
        status: 'investigating',
        detectedAt: new Date(Date.now() - 3600000).toISOString(),
        detectedBy: 'heuristic',
    }
];

export const MOCK_EVENTS: DAOEvent[] = [
    { id: 'e1', type: 'vote_cast', title: 'Vote on Proposal #127', data: { voter: 'a16z.eth', power: 2100000 }, sourceNodeId: `contributor-${MOCK_CONTRIBUTORS[1].address}`, targetNodeId: 'proposal-127', magnitude: 1.0, timestamp: NOW },
    { id: 'e2', type: 'transfer_out', title: 'Treasury Transfer', data: { amount: 600000, token: 'UNI' }, sourceNodeId: 'treasury-core', targetNodeId: 'wallet-devs', magnitude: 0.6, timestamp: new Date(Date.now() - 60000).toISOString() },
    { id: 'e3', type: 'threat_detected', title: 'Sybil Attack Flagged', data: { risk: 87 }, sourceNodeId: 'security-hub', targetNodeId: `contributor-${MOCK_CONTRIBUTORS[4].address}`, magnitude: 0.9, timestamp: new Date(Date.now() - 120000).toISOString() },
];

export const MOCK_SIMULATION: SimulationResult = {
    id: 'sim1',
    scenarioType: 'market_crash',
    timelines: [
        { id: 't1', name: 'Resilient', probability: 0.35, sentiment: 'positive', narrative: 'The DAO adapts swiftly. Treasury diversification limits losses.', metrics: { treasuryValue: 1800000000, treasuryChange: -22, contributorCount: 1100, contributorChange: -12, governanceHealth: 72, survivalMonths: 42 }, keyEvents: [], risks: [] },
        { id: 't2', name: 'Stagnant', probability: 0.45, sentiment: 'neutral', narrative: 'Governance paralyzes. Treasury takes a massive hit but survives.', metrics: { treasuryValue: 1200000000, treasuryChange: -48, contributorCount: 800, contributorChange: -36, governanceHealth: 45, survivalMonths: 14 }, keyEvents: [], risks: [] },
        { id: 't3', name: 'Collapse', probability: 0.20, sentiment: 'negative', narrative: 'Panic selling depletes runway. Contributors abandon the protocol.', metrics: { treasuryValue: 400000000, treasuryChange: -83, contributorCount: 200, contributorChange: -84, governanceHealth: 15, survivalMonths: 4 }, keyEvents: [], risks: [] },
    ],
    generatedAt: NOW,
};