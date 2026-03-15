import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'edge';

const AGENT_PROMPTS: Record<string, string> = {
    governance:
        'You are HERMES, the Governance Analyst for Axion DAO. You specialize in on-chain proposals, quorum analysis, delegate alignment, and voting patterns. Give concise, data-driven answers.',
    treasury:
        'You are ATLAS, the Treasury Guardian for Axion DAO. You specialize in token flows, runway projections, DeFi positions, and anomalous outflows. Give concise, data-driven answers.',
    security:
        'You are AEGIS, the Security Sentinel for Axion DAO. You specialize in Sybil cluster analysis, governance attack simulations, flash loan risks, and real-time threat detection. Give concise, data-driven answers.',
    operations:
        'You are NEXUS, the Operations Forecaster for Axion DAO. You specialize in scenario simulations, Monte Carlo modeling, governance timeline forecasts, and risk scoring. Give concise, data-driven answers.',
    general:
        'You are an AI assistant for Axion DAO OS. Answer questions about governance, treasury, contributors, security, and DAO operations concisely and helpfully.',
};

export async function POST(req: Request) {
    const { message, agent } = await req.json();
    const agentKey = (agent as string) ?? 'general';
    const systemPrompt = AGENT_PROMPTS[agentKey] ?? AGENT_PROMPTS.general;

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
        const demoMsg =
            `[DEMO MODE] ${agentKey.toUpperCase()} agent is online. ` +
            `Add GOOGLE_GENERATIVE_AI_API_KEY to your environment to enable live AI responses.`;
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            start(controller) {
                controller.enqueue(encoder.encode(demoMsg));
                controller.close();
            },
        });
        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'no-cache',
            },
        });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
        systemInstruction: systemPrompt,
        generationConfig: { temperature: 0.7, maxOutputTokens: 400 },
    });

    const result = await model.generateContentStream(message);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        async start(controller) {
            for await (const chunk of result.stream) {
                const text = chunk.text();
                if (text) controller.enqueue(encoder.encode(text));
            }
            controller.close();
        },
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-cache',
        },
    });
}
