// src/services/analytics.ts
import type { Proposal, TreasuryState, Contributor, Threat, DAOHealthMetrics, ContributorClass } from '@/lib/types';
import { XP_REWARDS, LEVEL_THRESHOLDS } from '@/lib/constants';

export function calculateDAOHealth(
  proposals: Proposal[],
  treasury: TreasuryState | null,
  contributors: Contributor[],
  threats: Threat[]
): DAOHealthMetrics {
  const govHealth = calcGovHealth(proposals);
  const treasHealth = calcTreasHealth(treasury);
  const contribHealth = calcContribHealth(contributors);
  const secHealth = calcSecHealth(threats);

  const overallScore = Math.round(
    govHealth * 0.25 + treasHealth * 0.30 + contribHealth * 0.25 + secHealth * 0.20
  );

  return {
    overallScore,
    governanceHealth: govHealth,
    treasuryHealth: treasHealth,
    contributorHealth: contribHealth,
    securityHealth: secHealth,
    trend: 'stable',
    lastCalculated: new Date().toISOString(),
  };
}

function calcGovHealth(proposals: Proposal[]): number {
  if (proposals.length === 0) return 50;
  let score = 50;
  const quorumRate = proposals.filter(p => p.quorumReached).length / proposals.length;
  score += quorumRate * 20;
  const uniqueProposers = new Set(proposals.map(p => p.proposer)).size;
  score += Math.min(1, uniqueProposers / Math.max(5, proposals.length * 0.3)) * 15;
  if (proposals.filter(p => p.status === 'active').length > 0) score += 10;
  score += 5;
  return Math.min(100, Math.max(0, Math.round(score)));
}

function calcTreasHealth(treasury: TreasuryState | null): number {
  if (!treasury) return 50;
  let score = 0;
  if (treasury.runwayDays > 365 * 3) score += 30;
  else if (treasury.runwayDays > 365) score += 20;
  else if (treasury.runwayDays > 180) score += 10;
  else score += 5;
  score += Math.max(0, (100 - treasury.concentrationRisk) / 100) * 25;
  if (treasury.netFlow24h > 0) score += 20;
  else score += 10;
  score += Math.max(0, (100 - treasury.volatilityRisk) / 100) * 15;
  if (treasury.totalValueUSD > 1e9) score += 10;
  else if (treasury.totalValueUSD > 1e8) score += 8;
  else score += 5;
  return Math.min(100, Math.max(0, Math.round(score)));
}

function calcContribHealth(contributors: Contributor[]): number {
  if (contributors.length === 0) return 50;
  let score = 0;
  const activeRatio = contributors.filter(c => c.isActive).length / contributors.length;
  score += activeRatio * 30;
  const avgActivity = contributors.reduce((s, c) => s + c.activityScore, 0) / contributors.length;
  score += (avgActivity / 100) * 25;
  if (contributors.length > 500) score += 20;
  else if (contributors.length > 100) score += 15;
  else score += 10;
  const avgPart = contributors.reduce((s, c) => s + c.participationRate, 0) / contributors.length;
  score += avgPart * 15;
  score += Math.min(10, new Set(contributors.map(c => c.contributorClass)).size * 2);
  return Math.min(100, Math.max(0, Math.round(score)));
}

function calcSecHealth(threats: Threat[]): number {
  const active = threats.filter(t => t.status === 'active');
  if (active.length === 0) return 95;
  let score = 95;
  active.forEach(t => {
    switch (t.severity) {
      case 'critical': score -= 30; break;
      case 'high': score -= 20; break;
      case 'medium': score -= 10; break;
      case 'low': score -= 5; break;
    }
  });
  return Math.min(100, Math.max(0, Math.round(score)));
}

export function assignContributorClass(c: {
  votesCast: number;
  proposalsCreated: number;
  delegatorsCount: number;
  collaborators?: string[];
}): ContributorClass {
  const scores = {
    architect: (c.proposalsCreated || 0) * 5 + (c.collaborators?.length || 0),
    diplomat: (c.votesCast || 0) * 2 + (c.delegatorsCount || 0),
    sentinel: 0,
    merchant: 0,
    explorer: (c.collaborators?.length || 0) * 3,
  };
  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return (best[1] > 0 ? best[0] : 'explorer') as ContributorClass;
}

export function calculateXP(stats: {
  votesCast: number;
  proposalsCreated: number;
  delegatorsCount: number;
  securityReports?: number;
  daysActive?: number;
  currentStreak?: number;
}): number {
  let xp = 0;
  xp += (stats.votesCast || 0) * XP_REWARDS.VOTE_CAST;
  xp += (stats.proposalsCreated || 0) * XP_REWARDS.PROPOSAL_CREATED;
  xp += (stats.delegatorsCount || 0) * XP_REWARDS.DELEGATION_RECEIVED;
  xp += (stats.securityReports || 0) * XP_REWARDS.SECURITY_REPORT_VALID;
  xp += (stats.daysActive || 0) * XP_REWARDS.DAILY_LOGIN;
  const streak = stats.currentStreak || 0;
  if (streak >= 30) xp += XP_REWARDS.STREAK_30D;
  else if (streak >= 7) xp += XP_REWARDS.STREAK_7D;
  else if (streak >= 3) xp += XP_REWARDS.STREAK_3D;
  return xp;
}

export function calculateLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}
