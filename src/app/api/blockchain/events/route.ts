// src/app/api/blockchain/events/route.ts
import { NextResponse } from 'next/server';
import { MOCK_EVENTS } from '@/lib/mockData';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        return NextResponse.json(MOCK_EVENTS);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
    }
}
