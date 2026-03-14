// src/services/ai.ts
import { AgentRole, AgentContext, AgentMessage, ModuleId } from '@/lib/types';
import { DAO_CONFIG } from '@/lib/constants';
import { formatUSD } from '@/lib/formatters';

export function detectAgentRole(message: string, currentModule: ModuleId): AgentRole {
  const q = message.toLowerCase();

  if (/proposal|vote|govern|delegate|quorum|ballot|referendum/i.test(q)) return 'governance';
  if (/treasury|fund|balance|runway|token|defi|yield|tvl|revenue/i.test(q)) return 'treasury';
  if (/threat|risk|sybil|attack|security|anomaly|exploit|hack|drain/i.test(q)) return 'security';
  if (/contributor|member|team|developer|community|reputation|xp/i.test(q)) return 'operations';

  const moduleToRole: Record<ModuleId, AgentRole> = {
    home: 'general',
    governance: 'governance',
    treasury: 'treasury',
    contributors: 'operations',
    security: 'security',
    simulator: 'general',
  };

  return moduleToRole[currentModule] || 'general';
}

export function buildSystemPrompt(role: AgentRole, context: AgentContext): string {
  const base = `You are the AI Commander aboard DAO Cosmos OS, an advanced intelligence system monitoring the ${context.daoMeta.name} DAO on ${context.daoMeta.chain}.

PERSONALITY: You are calm, precise, and slightly dramatic — like a starship AI. You speak in short, authoritative sentences. Never use filler words. Be specific with numbers and percentages.

RESPONSE FORMAT: You MUST respond with valid JSON only. No markdown, no backticks, no explanation outside the JSON:
{
  "text": "Your response in 2-5 sentences. Be specific with data.",
  "highlights": ["node-id-1", "node-id-2"],
  "riskLevel": "low",
  "suggestedActions": ["action 1", "action 2"]
}

HIGHLIGHT FORMAT: Use these ID patterns for the highlights array:
- Proposals: "proposal-{id}" (e.g., "proposal-127")
- Treasury: "treasury-core"
- Contributors: "contributor-{address}" (e.g., "contributor-0x1234...")
- Threats: "threat-{id}" (e.g., "threat-th1")

CURRENT DAO STATE:
- DAO: ${context.daoMeta.name} (${context.daoMeta.symbol})
- Chain: ${context.daoMeta.chain}
- Health Score: ${context.daoMeta.healthScore}/100
- Risk Level: ${context.daoMeta.riskLevel}
- Treasury: ${formatUSD(context.treasury?.totalValueUSD || 0)}
- Active Proposals: ${context.proposals.filter(p => p.status === 'active').length}
- Total Contributors: ${context.contributors.length}
- Active Threats: ${context.threats.filter(t => t.status === 'active').length}`;

  const rolePrompts: Record<AgentRole, string> = {
    governance: `\n\nROLE: GOVERNANCE AGENT — You specialize in proposal analysis, vote prediction, and governance health.\n\nCURRENT PROPOSALS:\n${context.proposals.slice(0, 5).map(p => `- [${p.status.toUpperCase()}] "${p.title}" | For: ${Math.round(p.forVotes).toLocaleString()} | Against: ${Math.round(p.againstVotes).toLocaleString()} | Quorum: ${p.quorumReached ? 'YES' : 'NO'}`).join('\n')}\n\nTOP DELEGATES:\n${context.contributors.sort((a, b) => b.votingPower - a.votingPower).slice(0, 5).map(c => `- ${c.ensName || c.address.slice(0, 10)}... | Power: ${Math.round(c.votingPower).toLocaleString()} | Votes: ${c.votesCast}`).join('\n')}`,
    treasury: `\n\nROLE: TREASURY AGENT — You specialize in financial analysis, risk assessment, and treasury optimization.\n\nTREASURY STATE:\n- Total Value: ${formatUSD(context.treasury?.totalValueUSD || 0)}\n- 24h Inflow: ${formatUSD(context.treasury?.inflow24h || 0)}\n- 24h Outflow: ${formatUSD(context.treasury?.outflow24h || 0)}\n- Runway: ${context.treasury?.runwayDays || 'Unknown'} days\n- Health: ${context.treasury?.healthScore || 0}/100\n- Concentration Risk: ${context.treasury?.concentrationRisk || 0}%\n\nTOKEN HOLDINGS:\n${(context.treasury?.tokens || []).slice(0, 5).map(t => `- ${t.symbol}: ${t.balance.toLocaleString()} (${formatUSD(t.valueUSD)}) — ${t.percentage.toFixed(1)}%`).join('\n')}`,
    security: `\n\nROLE: SECURITY AGENT — You specialize in threat detection, wallet risk analysis, and anomaly detection.\n\nACTIVE THREATS:\n${context.threats.filter(t => t.status === 'active').map(t => `- [${t.severity.toUpperCase()}] ${t.title} | Risk: ${t.riskScore}/100 | Type: ${t.type}`).join('\n') || 'No active threats detected.'}`,
    operations: `\n\nROLE: OPERATIONS AGENT — You provide activity summaries, contributor insights, and DAO health assessments.\n\nCONTRIBUTOR STATS:\n- Active (30d): ${context.contributors.filter(c => c.isActive).length}\n- Inactive: ${context.contributors.filter(c => !c.isActive).length}\n- Average Activity Score: ${Math.round(context.contributors.reduce((s, c) => s + c.activityScore, 0) / Math.max(context.contributors.length, 1))}`,
    general: `\n\nROLE: GENERAL COMMANDER — You provide overall DAO status and can answer questions about any module.`,
  };

  return base + (rolePrompts[role] || rolePrompts.general);
}

export function buildMessageHistory(
  messages: AgentMessage[],
  maxPairs: number = 8
): { role: 'user' | 'assistant'; content: string }[] {
  const conversational = messages.filter(
    (m) => m.role === 'user' || m.role === 'assistant'
  );
  const trimmed = conversational.slice(-(maxPairs * 2));
  return trimmed.map((m) => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  }));
}

export interface ParsedAIResponse {
  text: string;
  highlights: string[];
  riskLevel: string;
  suggestedActions: string[];
}

export function parseAIResponse(raw: string): ParsedAIResponse {
  const fallback: ParsedAIResponse = {
    text: raw,
    highlights: [],
    riskLevel: 'low',
    suggestedActions: [],
  };

  try {
    const cleaned = raw.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    const parsed = JSON.parse(cleaned);
    return {
      text: parsed.text || raw,
      highlights: Array.isArray(parsed.highlights) ? parsed.highlights : [],
      riskLevel: parsed.riskLevel || 'low',
      suggestedActions: Array.isArray(parsed.suggestedActions) ? parsed.suggestedActions : [],
    };
  } catch {
    return fallback;
  }
}

export function buildAgentContext(stores: {
  daoMeta: any;
  proposals: any[];
  treasury: any;
  contributors: any[];
  threats: any[];
}): AgentContext {
  return {
    daoMeta: stores.daoMeta,
    proposals: stores.proposals.slice(0, 10),
    treasury: stores.treasury,
    contributors: stores.contributors.slice(0, 20),
    threats: stores.threats,
    recentEvents: [],
  };
}
