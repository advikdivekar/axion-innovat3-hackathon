// src/services/simulator.ts
import type { SimulationInput, SimulationResult, SimulationTimeline, ScenarioType } from '@/lib/types';

const SCENARIO_DESCRIPTIONS: Record<ScenarioType, (severity: number) => string> = {
  market_crash: (s) => `A major market crash occurs, with ETH and all DeFi tokens dropping ${Math.round(s * 80)}% in value over 2 weeks. How does the DAO respond?`,
  governance_takeover: (s) => `A hostile entity acquires ${Math.round(s * 100)}M worth of governance tokens and begins submitting proposals to redirect treasury funds.`,
  treasury_depletion: (s) => `The DAO's burn rate increases ${Math.round(1 + s * 9)}x due to expanded operations and falling token prices.`,
  whale_influence: (s) => `A single whale accumulates ${Math.round(s * 30)}% of voting power and starts voting against community-aligned proposals.`,
  contributor_exodus: (s) => `${Math.round(s * 70)}% of active contributors leave the DAO over 3 months due to internal disputes.`,
  protocol_exploit: (s) => `A smart contract vulnerability is exploited, draining ${Math.round(s * 50)}M from the protocol.`,
  custom: () => `Simulate a custom scenario as described by the user.`,
};

export function buildSimulationPrompt(input: SimulationInput): string {
  const scenarioDesc = SCENARIO_DESCRIPTIONS[input.scenarioType](input.severity);

  return `You are simulating future scenarios for a DAO.

CURRENT DAO STATE:
- Treasury Value: ${(input.currentState.treasuryValue / 1_000_000).toFixed(1)}M
- Active Contributors: ${input.currentState.contributorCount}
- Active Proposals: ${input.currentState.activeProposals}
- Health Score: ${input.currentState.healthScore}/100

SCENARIO: ${scenarioDesc}

Generate exactly 3 timelines as a JSON array. Each timeline should be distinct:
1. BEST CASE — The DAO responds effectively
2. BASE CASE — Mixed outcomes, realistic
3. WORST CASE — Things go badly

Respond with ONLY this JSON structure (no markdown, no backticks):
{
  "timelines": [
    {
      "name": "Timeline name",
      "probability": 0.35,
      "sentiment": "positive",
      "narrative": "2-3 sentence description of what happens",
      "metrics": {
        "treasuryValue": 1800000000,
        "treasuryChange": -22,
        "contributorCount": 1100,
        "contributorChange": -12,
        "governanceHealth": 72,
        "survivalMonths": 42
      },
      "keyEvents": ["event 1", "event 2"],
      "risks": ["risk 1"]
    }
  ]
}

The 3 probabilities should roughly sum to 1.0.`;
}

export function parseSimulationResponse(raw: string, input: SimulationInput): SimulationResult {
  try {
    const cleaned = raw.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    const parsed = JSON.parse(cleaned);

    const timelines: SimulationTimeline[] = (parsed.timelines || [])
      .slice(0, 3)
      .map((t: any, i: number) => ({
        id: `timeline-${i}-${Date.now()}`,
        name: t.name || `Timeline ${String.fromCharCode(65 + i)}`,
        probability: t.probability || (i === 0 ? 0.35 : i === 1 ? 0.45 : 0.20),
        sentiment: t.sentiment || (i === 0 ? 'positive' : i === 1 ? 'neutral' : 'negative'),
        narrative: t.narrative || 'No narrative available.',
        metrics: {
          treasuryValue: t.metrics?.treasuryValue || input.currentState.treasuryValue,
          treasuryChange: t.metrics?.treasuryChange || 0,
          contributorCount: t.metrics?.contributorCount || input.currentState.contributorCount,
          contributorChange: t.metrics?.contributorChange || 0,
          governanceHealth: t.metrics?.governanceHealth || 50,
          survivalMonths: t.metrics?.survivalMonths || 12,
        },
        keyEvents: Array.isArray(t.keyEvents) ? t.keyEvents : [],
        risks: Array.isArray(t.risks) ? t.risks : [],
      }));

    while (timelines.length < 3) {
      timelines.push(createFallbackTimeline(timelines.length, input));
    }

    return {
      id: `sim-${Date.now()}`,
      scenarioType: input.scenarioType,
      timelines: timelines as [SimulationTimeline, SimulationTimeline, SimulationTimeline],
      generatedAt: new Date().toISOString(),
    };
  } catch {
    return createFallbackResult(input);
  }
}

function createFallbackTimeline(index: number, input: SimulationInput): SimulationTimeline {
  const configs = [
    { name: 'Resilient Adaptation', sentiment: 'positive' as const, prob: 0.30, tc: -15, cc: -8, h: 72, m: 36 },
    { name: 'Gradual Decline', sentiment: 'neutral' as const, prob: 0.45, tc: -40, cc: -30, h: 45, m: 18 },
    { name: 'Critical Collapse', sentiment: 'negative' as const, prob: 0.25, tc: -75, cc: -65, h: 15, m: 5 },
  ];
  const c = configs[index] || configs[2];

  return {
    id: `timeline-fallback-${index}`,
    name: c.name,
    probability: c.prob,
    sentiment: c.sentiment,
    narrative: `Under this ${c.sentiment} scenario, the DAO experiences a ${Math.abs(c.tc)}% treasury impact and ${Math.abs(c.cc)}% contributor change.`,
    metrics: {
      treasuryValue: input.currentState.treasuryValue * (1 + c.tc / 100),
      treasuryChange: c.tc,
      contributorCount: Math.round(input.currentState.contributorCount * (1 + c.cc / 100)),
      contributorChange: c.cc,
      governanceHealth: c.h,
      survivalMonths: c.m,
    },
    keyEvents: ['Scenario triggered', 'Community responds'],
    risks: ['Uncertainty remains high'],
  };
}

function createFallbackResult(input: SimulationInput): SimulationResult {
  return {
    id: `sim-fallback-${Date.now()}`,
    scenarioType: input.scenarioType,
    timelines: [
      createFallbackTimeline(0, input),
      createFallbackTimeline(1, input),
      createFallbackTimeline(2, input),
    ] as [SimulationTimeline, SimulationTimeline, SimulationTimeline],
    generatedAt: new Date().toISOString(),
  };
}
