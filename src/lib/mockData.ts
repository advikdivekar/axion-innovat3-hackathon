export type ModuleView = 'overview' | 'governance' | 'treasury' | 'security';

export interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'passed' | 'rejected' | 'pending';
  votesFor: number;
  votesAgainst: number;
  timeRemaining: string;
  author: string;
  category: string;
}

export interface TreasuryAsset {
  symbol: string;
  name: string;
  amount: number;
  valueUsd: number;
  change24h: number;
}

export const MOCK_PROPOSALS: Proposal[] = [
  {
    id: "PR-492",
    title: "Update Core Protocol Parameters",
    description: "This proposal aims to update the core protocol parameters. We propose adjusting the base fee and block size limits to accommodate increased network activity while maintaining decentralization and node performance.",
    status: "active",
    votesFor: 2450000,
    votesAgainst: 120000,
    timeRemaining: "12h 45m",
    author: "0x7F...2B19",
    category: "Protocol",
  },
  {
    id: "PR-491",
    title: "Q3 Marketing Budget Allocation",
    description: "Allocate $500,000 from the treasury for Q3 marketing efforts, focusing on developer acquisition and enterprise partnerships. Includes detailed budget breakdown for events, content, and sponsorships.",
    status: "passed",
    votesFor: 5800000,
    votesAgainst: 400000,
    timeRemaining: "0h",
    author: "0x1A...9C88",
    category: "Treasury",
  },
  {
    id: "PR-490",
    title: "Add Support for Artemis Network",
    description: "Integrate the Artemis Network as a supported Layer 2 solution. This will allow users to bridge assets to Artemis and utilize DAO Cosmos OS features with lower transaction fees.",
    status: "active",
    votesFor: 1200000,
    votesAgainst: 1150000,
    timeRemaining: "48h 12m",
    author: "0x9E...3F21",
    category: "Integration",
  },
  {
    id: "PR-489",
    title: "Increase Security Bug Bounty",
    description: "Double the maximum payout for critical security vulnerabilities reported via Immunefi from $100k to $200k. This is necessary to attract top security talent before our next major upgrade.",
    status: "rejected",
    votesFor: 800000,
    votesAgainst: 3200000,
    timeRemaining: "0h",
    author: "0x2C...1A55",
    category: "Security",
  }
];

export const MOCK_TREASURY: TreasuryAsset[] = [
  { symbol: "ETH", name: "Ethereum", amount: 4520.5, valueUsd: 12450000.00, change24h: 2.4 },
  { symbol: "USDC", name: "USD Coin", amount: 8500000, valueUsd: 8500000.00, change24h: 0.01 },
  { symbol: "UNI", name: "Uniswap", amount: 154000, valueUsd: 1155000.00, change24h: -1.2 },
  { symbol: "WBTC", name: "Wrapped Bitcoin", amount: 42.1, valueUsd: 2600000.00, change24h: 3.8 },
];

export const MOCK_SYSTEM_STATS = {
  totalTvl: "$24,705,000",
  activeMembers: 12450,
  proposalsExecuted: 489,
  networkUptime: 99.98,
  securityLevel: "Nominal",
  lastBlock: 18459201,
};
