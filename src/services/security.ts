// src/services/security.ts
import type {
  WalletRiskAssessment,
  Threat,
  ThreatSeverity,
  TreasuryTransfer,
  VoteRecord,
} from '@/lib/types';
import { DAO_CONFIG } from '@/lib/constants';

export function calculateWalletRisk(
  address: string,
  transfers: TreasuryTransfer[],
  votes: VoteRecord[],
  accountAgeInDays: number
): WalletRiskAssessment {
  const factors: WalletRiskAssessment['factors'] = {
    accountAge: scoreAccountAge(accountAgeInDays),
    tokenConcentration: scoreTokenConcentration(transfers),
    behaviorPattern: scoreBehaviorPattern(transfers),
    networkConnections: scoreNetworkConnections(transfers),
    transactionVelocity: scoreTransactionVelocity(transfers),
  };

  const weights = {
    accountAge: 0.15,
    tokenConcentration: 0.20,
    behaviorPattern: 0.25,
    networkConnections: 0.20,
    transactionVelocity: 0.20,
  };

  const overallRisk = Math.min(100, Math.round(
    factors.accountAge.score * weights.accountAge +
    factors.tokenConcentration.score * weights.tokenConcentration +
    factors.behaviorPattern.score * weights.behaviorPattern +
    factors.networkConnections.score * weights.networkConnections +
    factors.transactionVelocity.score * weights.transactionVelocity
  ));

  const flags: string[] = [];
  if (factors.accountAge.score > 60) flags.push('New wallet (< 30 days old)');
  if (factors.tokenConcentration.score > 70) flags.push('High token concentration');
  if (factors.behaviorPattern.score > 50) flags.push('Unusual transaction patterns');
  if (factors.networkConnections.score > 40) flags.push('Low counterparty diversity');
  if (factors.transactionVelocity.score > 60) flags.push('Abnormal transaction velocity');

  const recommendation = overallRisk > 75
    ? 'HIGH RISK — Recommend investigation and monitoring.'
    : overallRisk > 50
    ? 'ELEVATED — Monitor for further suspicious activity.'
    : overallRisk > 25
    ? 'MODERATE — Normal activity with minor flags.'
    : 'LOW RISK — No significant concerns detected.';

  return {
    address,
    overallRisk,
    factors,
    flags,
    recommendation,
    assessedAt: new Date().toISOString(),
  };
}

function scoreAccountAge(ageDays: number): { score: number; detail: string } {
  if (ageDays < 7) return { score: 95, detail: 'Account less than 7 days old' };
  if (ageDays < 30) return { score: 75, detail: 'Account less than 30 days old' };
  if (ageDays < 90) return { score: 50, detail: 'Account less than 90 days old' };
  if (ageDays < 365) return { score: 25, detail: 'Account less than 1 year old' };
  return { score: 5, detail: 'Established account (1+ years)' };
}

function scoreTokenConcentration(transfers: TreasuryTransfer[]): { score: number; detail: string } {
  if (transfers.length === 0) return { score: 0, detail: 'No transfers to analyze' };

  const tokenVolumes: Record<string, number> = {};
  transfers.forEach((t) => {
    tokenVolumes[t.tokenSymbol] = (tokenVolumes[t.tokenSymbol] || 0) + t.valueUSD;
  });

  const totalVolume = Object.values(tokenVolumes).reduce((a, b) => a + b, 0);
  const maxTokenVolume = Math.max(...Object.values(tokenVolumes));
  const concentrationPct = totalVolume > 0 ? (maxTokenVolume / totalVolume) * 100 : 0;

  if (concentrationPct > 90) return { score: 90, detail: `${concentrationPct.toFixed(0)}% in single token` };
  if (concentrationPct > 70) return { score: 65, detail: `${concentrationPct.toFixed(0)}% in single token` };
  if (concentrationPct > 50) return { score: 40, detail: `${concentrationPct.toFixed(0)}% in single token` };
  return { score: 10, detail: 'Well diversified across tokens' };
}

function scoreBehaviorPattern(transfers: TreasuryTransfer[]): { score: number; detail: string } {
  if (transfers.length < 3) return { score: 10, detail: 'Insufficient data for pattern analysis' };

  let score = 0;
  const details: string[] = [];

  const timestamps = transfers.map((t) => new Date(t.timestamp).getTime()).sort();
  for (let i = 0; i < timestamps.length - 10; i++) {
    const window = timestamps[i + 10] - timestamps[i];
    if (window < 3600000) {
      score += 40;
      details.push('10+ transactions within 1 hour');
      break;
    }
  }

  const roundNumberCount = transfers.filter((t) => t.amount === Math.round(t.amount)).length;
  const roundRatio = roundNumberCount / transfers.length;
  if (roundRatio > 0.8) {
    score += 25;
    details.push('80%+ transactions are round numbers');
  }

  const amounts = transfers.map((t) => t.amount);
  const uniqueAmounts = new Set(amounts);
  if (uniqueAmounts.size < amounts.length * 0.3) {
    score += 20;
    details.push('Many repeated transaction amounts');
  }

  return {
    score: Math.min(100, score),
    detail: details.length > 0 ? details.join('; ') : 'Normal behavior patterns',
  };
}

function scoreNetworkConnections(transfers: TreasuryTransfer[]): { score: number; detail: string } {
  if (transfers.length < 2) return { score: 0, detail: 'Insufficient data' };

  const counterparties = new Set([
    ...transfers.map((t) => t.from),
    ...transfers.map((t) => t.to),
  ]);

  const ratio = counterparties.size / transfers.length;

  if (ratio < 0.1) return { score: 80, detail: 'Very few unique counterparties' };
  if (ratio < 0.3) return { score: 50, detail: 'Low counterparty diversity' };
  if (ratio < 0.5) return { score: 25, detail: 'Moderate counterparty diversity' };
  return { score: 5, detail: 'High counterparty diversity' };
}

function scoreTransactionVelocity(transfers: TreasuryTransfer[]): { score: number; detail: string } {
  if (transfers.length < 2) return { score: 0, detail: 'Insufficient data' };

  const timestamps = transfers.map((t) => new Date(t.timestamp).getTime()).sort();
  const firstTx = timestamps[0];
  const lastTx = timestamps[timestamps.length - 1];
  const spanDays = Math.max(1, (lastTx - firstTx) / (1000 * 60 * 60 * 24));
  const txPerDay = transfers.length / spanDays;

  if (txPerDay > 50) return { score: 90, detail: `${txPerDay.toFixed(0)} tx/day (bot-like)` };
  if (txPerDay > 20) return { score: 60, detail: `${txPerDay.toFixed(0)} tx/day (high frequency)` };
  if (txPerDay > 5) return { score: 30, detail: `${txPerDay.toFixed(0)} tx/day (active)` };
  return { score: 5, detail: `${txPerDay.toFixed(1)} tx/day (normal)` };
}

export function detectSybilClusters(
  votes: VoteRecord[],
  proposals: string[]
): Threat[] {
  const threats: Threat[] = [];
  const voterPatterns = new Map<string, Map<string, number>>();

  votes.forEach((v) => {
    if (!voterPatterns.has(v.voter)) {
      voterPatterns.set(v.voter, new Map());
    }
    voterPatterns.get(v.voter)!.set(v.proposalId, v.support);
  });

  const voters = Array.from(voterPatterns.keys());
  const clusters: Set<string>[] = [];

  for (let i = 0; i < voters.length; i++) {
    for (let j = i + 1; j < voters.length; j++) {
      const patternA = voterPatterns.get(voters[i])!;
      const patternB = voterPatterns.get(voters[j])!;

      const commonProposals = Array.from(patternA.keys()).filter((p) => patternB.has(p));
      if (commonProposals.length < 3) continue;

      const allIdentical = commonProposals.every(
        (p) => patternA.get(p) === patternB.get(p)
      );

      if (allIdentical) {
        let foundCluster = clusters.find(
          (c) => c.has(voters[i]) || c.has(voters[j])
        );
        if (!foundCluster) {
          foundCluster = new Set();
          clusters.push(foundCluster);
        }
        foundCluster.add(voters[i]);
        foundCluster.add(voters[j]);
      }
    }
  }

  clusters
    .filter((c) => c.size >= 5)
    .forEach((cluster, index) => {
      const addresses = Array.from(cluster);
      const totalPower = votes
        .filter((v) => cluster.has(v.voter))
        .reduce((sum, v) => sum + v.weight, 0);

      const severity: ThreatSeverity =
        totalPower > DAO_CONFIG.whaleThreshold ? 'critical' :
        cluster.size > 20 ? 'high' :
        cluster.size > 10 ? 'medium' : 'low';

      threats.push({
        id: `sybil-${index}-${Date.now()}`,
        type: 'sybil',
        severity,
        riskScore: Math.min(100, cluster.size * 5 + (totalPower / 10000)),
        affectedEntity: addresses[0],
        affectedEntityType: 'contributor',
        title: `Potential Sybil Cluster (${cluster.size} wallets)`,
        description: `Detected ${cluster.size} wallets with identical voting patterns. Combined voting power: ${Math.round(totalPower).toLocaleString()} ${DAO_CONFIG.symbol}.`,
        evidence: [{
          type: 'voting_pattern',
          description: 'Identical votes on all shared proposals',
          data: { clusterSize: cluster.size, totalPower, addresses: addresses.slice(0, 5) },
          confidence: 0.85,
        }],
        status: 'active',
        detectedAt: new Date().toISOString(),
        detectedBy: 'heuristic',
      });
    });

  return threats;
}

export function detectTreasuryAnomalies(
  transfers: TreasuryTransfer[],
  totalTreasuryValue: number
): Threat[] {
  const threats: Threat[] = [];

  transfers.forEach((t) => {
    if (t.valueUSD > totalTreasuryValue * 0.05) {
      threats.push({
        id: `anom-large-${t.txHash?.slice(0, 8) || Date.now()}`,
        type: 'treasury_drain',
        severity: t.valueUSD > totalTreasuryValue * 0.10 ? 'critical' : 'high',
        riskScore: Math.min(100, Math.round((t.valueUSD / totalTreasuryValue) * 200)),
        affectedEntity: t.to,
        affectedEntityType: 'wallet',
        title: `Large Treasury Transfer: ${formatNum(t.valueUSD)}`,
        description: `Single transfer of ${t.amount.toLocaleString()} ${t.tokenSymbol} (${formatNum(t.valueUSD)}) representing ${((t.valueUSD / totalTreasuryValue) * 100).toFixed(1)}% of total treasury.`,
        evidence: [{
          type: 'transaction',
          description: 'Transfer exceeds 5% treasury threshold',
          data: { txHash: t.txHash, amount: t.amount, symbol: t.tokenSymbol, valueUSD: t.valueUSD },
          confidence: 0.95,
        }],
        status: 'active',
        detectedAt: new Date().toISOString(),
        detectedBy: 'heuristic',
      });
    }
  });

  return threats;
}

function formatNum(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K';
  return n.toFixed(0);
}
