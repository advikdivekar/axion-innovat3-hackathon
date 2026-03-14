// src/app/api/security/route.ts
import { NextResponse } from 'next/server';
import { MOCK_THREATS } from '@/lib/mockData';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // DEV B: Replace with live heuristic analysis or AI threat engine later
        return NextResponse.json(MOCK_THREATS);
    } catch (error) {
        return NextResponse.json({ error: 'Sentinel scan failed' }, { status: 500 });
    }
}