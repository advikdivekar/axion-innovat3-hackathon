// src/app/api/blockchain/proposals/route.ts
import { NextResponse } from 'next/server';
import { MOCK_PROPOSALS } from '@/lib/mockData';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // DEV B: Replace with Alchemy SDK fetch for live Uniswap Governor data later
        return NextResponse.json(MOCK_PROPOSALS);
    } catch (error) {
        return NextResponse.json({ error: 'Governance sync failed' }, { status: 500 });
    }
}