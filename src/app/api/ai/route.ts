// src/app/api/ai/route.ts
import { NextResponse } from 'next/server';
import Gemini from '@gemini-sdk/gemini';
import { AgentRole, AgentContext } from '@/lib/types';

const gemini = new Gemini({
    apiKey: process.env.GEMINI_API_KEY || '',
});

export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        const { prompt, role, context }: { prompt: string; role: AgentRole; context: AgentContext } = await req.json();

        // In a hackathon, if no API key is found, we fall back to a mock stream so the UI still works.
        if (!process.env.GEMINI_API_KEY) {
            const encoder = new TextEncoder();
            const mockStream = new ReadableStream({
                async start(controller) {
                    const text = "AI Core online. System is running in mock mode because GEMINI_API_KEY is missing. Standing by for instructions.";
                    for (const word of text.split(' ')) {
                        controller.enqueue(encoder.encode(word + ' '));
                        await new Promise(r => setTimeout(r, 100));
                    }
                    controller.close();
                },
            });
            return new Response(mockStream);
        }

        const response = await gemini.messages.create({
            model: 'claude-3-5-sonnet-20240620',
            max_tokens: 1024,
            system: `You are the DAO Cosmos OS Commander. Role: ${role}. Context: ${JSON.stringify(context)}. Give concise, cinematic, and data-driven responses. Highlight node IDs in [node-id] format.`,
            messages: [{ role: 'user', content: prompt }],
            stream: true,
        });

        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                for await (const chunk of response) {
                    if (chunk.type === 'content_block_delta' && 'text' in chunk.delta) {
                        controller.enqueue(encoder.encode(chunk.delta.text));
                    }
                }
                controller.close();
            },
        });

        return new Response(stream);
    } catch (error) {
        return NextResponse.json({ error: 'AI Command failure' }, { status: 500 });
    }
}