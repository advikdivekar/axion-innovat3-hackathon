// src/app/api/simulate/route.ts
import { NextResponse } from 'next/server';
import { MOCK_SIMULATION } from '@/lib/mockData';

export async function POST(req: Request) {
    try {
        const scenario = await req.json();
        console.log('Simulating Scenario:', scenario.scenarioType);

        // Simulate processing time for UX effect
        await new Promise(r => setTimeout(r, 1500));

        return NextResponse.json(MOCK_SIMULATION);
    } catch (error) {
        return NextResponse.json({ error: 'Simulator core offline' }, { status: 500 });
    }
}