// src/app/api/blockchain/treasury/route.ts
import { NextResponse } from 'next/server';
import { MOCK_TREASURY } from '@/lib/mockData';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // DEV B: Replace with Alchemy Token API for real-time balances later
        return NextResponse.json(MOCK_TREASURY);
    } catch (error) {
        return NextResponse.json({ error: 'Treasury sync failed' }, { status: 500 });
    }
}