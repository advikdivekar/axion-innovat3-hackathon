// src/services/contracts.ts
import { ethers } from 'ethers';
import { DAO_CONFIG } from '@/lib/constants';
import type { Proposal, VoteRecord } from '@/lib/types';

const GOVERNOR_ABI = [
  'function proposalCount() view returns (uint256)',
  'function state(uint256 proposalId) view returns (uint8)',
  'function proposals(uint256) view returns (uint256 id, address proposer, uint256 eta, uint256 startBlock, uint256 endBlock, uint256 forVotes, uint256 againstVotes, uint256 abstainVotes, bool canceled, bool executed)',
  'function quorumVotes() view returns (uint256)',
  'event ProposalCreated(uint256 id, address proposer, address[] targets, uint256[] values, string[] signatures, bytes[] calldatas, uint256 startBlock, uint256 endBlock, string description)',
  'event VoteCast(address indexed voter, uint256 proposalId, uint8 support, uint256 votes, string reason)',
  'event ProposalExecuted(uint256 id)',
  'event ProposalCanceled(uint256 id)',
];

const ERC20_ABI = [
  'function balanceOf(address) view returns (uint256)',
  'function totalSupply() view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function delegates(address) view returns (address)',
  'function getCurrentVotes(address) view returns (uint96)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'event DelegateChanged(address indexed delegator, address indexed fromDelegate, address indexed toDelegate)',
  'event DelegateVotesChanged(address indexed delegate, uint256 previousBalance, uint256 newBalance)',
];

function getProvider(): ethers.AlchemyProvider {
  const apiKey = process.env.ALCHEMY_API_KEY;
  if (!apiKey) throw new Error('[Contracts] ALCHEMY_API_KEY not set');
  return new ethers.AlchemyProvider('mainnet', apiKey);
}

export function getGovernorContract(): ethers.Contract {
  return new ethers.Contract(DAO_CONFIG.governor, GOVERNOR_ABI, getProvider());
}

export function getTokenContract(): ethers.Contract {
  return new ethers.Contract(DAO_CONFIG.token, ERC20_ABI, getProvider());
}

const PROPOSAL_STATE_MAP: Record<number, string> = {
  0: 'pending',
  1: 'active',
  2: 'cancelled',
  3: 'defeated',
  4: 'passed',
  5: 'queued',
  6: 'expired',
  7: 'executed',
};

export async function fetchOnChainProposals(limit: number = 10): Promise<Partial<Proposal>[]> {
  const governor = getGovernorContract();
  const provider = getProvider();

  const currentBlock = await provider.getBlockNumber();
  const fromBlock = Math.max(0, currentBlock - 200_000);

  const filter = governor.filters.ProposalCreated();
  const events = await governor.queryFilter(filter, fromBlock);

  const proposals: Partial<Proposal>[] = [];
  const recentEvents = events.slice(-limit).reverse();

  for (const event of recentEvents) {
    try {
      const args = (event as ethers.EventLog).args;
      if (!args) continue;

      const id = args[0].toString();
      const proposer = args[1] as string;
      const description = args[7] as string;
      const startBlock = Number(args[5]);
      const endBlock = Number(args[6]);

      const stateNum = await governor.state(id);
      const status = PROPOSAL_STATE_MAP[Number(stateNum)] || 'unknown';

      const proposalData = await governor.proposals(id);
      const forVotes = Number(ethers.formatUnits(proposalData.forVotes, 18));
      const againstVotes = Number(ethers.formatUnits(proposalData.againstVotes, 18));
      const abstainVotes = Number(ethers.formatUnits(proposalData.abstainVotes, 18));

      const title = extractTitle(description);

      proposals.push({
        id: `prop-${id}`,
        onChainId: id,
        title,
        description: description.slice(0, 2000),
        proposer,
        status: status as any,
        forVotes,
        againstVotes,
        abstainVotes,
        quorum: DAO_CONFIG.quorum,
        quorumReached: (forVotes + againstVotes + abstainVotes) >= DAO_CONFIG.quorum,
        startBlock,
        endBlock,
        totalVoters: 0,
        topVoters: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error(`[Contracts] Failed to process proposal event:`, err);
      continue;
    }
  }

  return proposals;
}

export async function fetchVotesForProposal(proposalId: string): Promise<Partial<VoteRecord>[]> {
  const governor = getGovernorContract();
  const provider = getProvider();

  const currentBlock = await provider.getBlockNumber();
  const fromBlock = Math.max(0, currentBlock - 200_000);

  const filter = governor.filters.VoteCast(null, BigInt(proposalId));
  const events = await governor.queryFilter(filter, fromBlock);

  return events.map((event) => {
    const args = (event as ethers.EventLog).args;
    if (!args) return null;

    const weight = Number(ethers.formatUnits(args[3], 18));

    return {
      voter: args[0] as string,
      support: Number(args[2]) as 0 | 1 | 2,
      weight,
      isWhale: weight >= DAO_CONFIG.whaleThreshold,
      blockNumber: event.blockNumber,
      txHash: event.transactionHash,
    };
  }).filter(Boolean) as Partial<VoteRecord>[];
}

export async function fetchTopDelegates(limit: number = 20) {
  const token = getTokenContract();
  const provider = getProvider();

  const currentBlock = await provider.getBlockNumber();
  const fromBlock = Math.max(0, currentBlock - 100_000);

  const filter = token.filters.DelegateVotesChanged();
  const events = await token.queryFilter(filter, fromBlock);

  const delegateMap = new Map<string, number>();

  for (const event of events) {
    const args = (event as ethers.EventLog).args;
    if (!args) continue;

    const delegate = args[0] as string;
    const newBalance = Number(ethers.formatUnits(args[2], 18));
    delegateMap.set(delegate, newBalance);
  }

  return Array.from(delegateMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([address, votingPower]) => ({
      address,
      votingPower,
    }));
}

function extractTitle(description: string): string {
  const firstLine = description.split('\n')[0].trim();
  if (firstLine.startsWith('#')) {
    return firstLine.replace(/^#+\s*/, '').slice(0, 100);
  }
  if (firstLine.length <= 100) {
    return firstLine;
  }
  return firstLine.slice(0, 97) + '...';
}
