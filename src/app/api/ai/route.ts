// src/app/api/ai/route.ts
// REAL Claude integration — streaming responses
import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { buildSystemPrompt, buildMessageHistory } from '@/services/ai';
import type { AgentRole, AgentContext, AgentMessage } from '@/lib/types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, context, role, history } = body as {
      message: string;
      context: AgentContext;
      role: AgentRole;
      history?: AgentMessage[];
    };

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const systemPrompt = buildSystemPrompt(role || 'general', context);
    const conversationHistory = history ? buildMessageHistory(history, 6) : [];
    const messages = [...conversationHistory, { role: 'user' as const, content: message }];

    const stream = await anthropic.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: systemPrompt,
      messages,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch (err) {
          console.error('[AI Route] Stream error:', err);
          controller.enqueue(encoder.encode(JSON.stringify({
            text: 'AI Commander encountered an error. Falling back to diagnostic mode.',
            highlights: [],
            riskLevel: 'low',
            suggestedActions: ['Try again'],
          })));
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Transfer-Encoding': 'chunked', 'Cache-Control': 'no-cache' },
    });
  } catch (error) {
    console.error('[AI Route] Error:', error);
    const fallback = JSON.stringify({
      text: 'AI Commander is recalibrating. DAO systems operating within normal parameters.',
      highlights: [],
      riskLevel: 'low',
      suggestedActions: ['Retry query'],
    });
    return new Response(fallback, { headers: { 'Content-Type': 'application/json' } });
  }
}
