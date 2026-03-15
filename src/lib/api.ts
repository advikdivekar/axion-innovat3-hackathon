// src/lib/api.ts
// Centralized API client — all fetch calls go through here

import type { Proposal, TreasuryState, Contributor, Threat, SimulationResult } from './types';
import {
  MOCK_PROPOSALS,
  MOCK_TREASURY,
  MOCK_CONTRIBUTORS,
  MOCK_THREATS,
  MOCK_SIMULATION,
} from './mockData';

export async function getProposals(): Promise<Proposal[]> {
  try {
    const res = await fetch('/api/blockchain/proposals');
    if (!res.ok) throw new Error('fetch failed');
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) return data as Proposal[];
    return MOCK_PROPOSALS;
  } catch {
    return MOCK_PROPOSALS;
  }
}

export async function getTreasury(): Promise<TreasuryState> {
  try {
    const res = await fetch('/api/blockchain/treasury');
    if (!res.ok) throw new Error('fetch failed');
    const data = await res.json();
    if (data && typeof data.totalValueUSD === 'number') return data as TreasuryState;
    return MOCK_TREASURY;
  } catch {
    return MOCK_TREASURY;
  }
}

export async function getContributors(): Promise<Contributor[]> {
  try {
    const res = await fetch('/api/blockchain/contributors');
    if (!res.ok) throw new Error('fetch failed');
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) return data as Contributor[];
    return MOCK_CONTRIBUTORS;
  } catch {
    return MOCK_CONTRIBUTORS;
  }
}

export async function getThreats(): Promise<Threat[]> {
  try {
    const res = await fetch('/api/security');
    if (!res.ok) throw new Error('fetch failed');
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) return data as Threat[];
    return MOCK_THREATS;
  } catch {
    return MOCK_THREATS;
  }
}

export async function runSimulation(
  scenario: string,
  params: object
): Promise<SimulationResult> {
  try {
    const res = await fetch('/api/simulate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenario, params }),
    });
    if (!res.ok) throw new Error('fetch failed');
    const data = await res.json();
    if (data && Array.isArray(data.timelines)) return data as SimulationResult;
    return MOCK_SIMULATION;
  } catch {
    return MOCK_SIMULATION;
  }
}

export async function streamAI(message: string): Promise<ReadableStream> {
  const res = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  if (!res.body) throw new Error('No response stream');
  return res.body;
}
