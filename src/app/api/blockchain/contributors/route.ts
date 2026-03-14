// src/app/api/blockchain/contributors/route.ts
import { NextResponse } from 'next/server';
import { MOCK_CONTRIBUTORS } from '@/lib/mockData';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // DEV B: Replace with Supabase query for community reputation later
        return NextResponse.json(MOCK_CONTRIBUTORS);
    } catch (error) {
        return NextResponse.json({ error: 'Contributor sync failed' }, { status: 500 });
    }
}