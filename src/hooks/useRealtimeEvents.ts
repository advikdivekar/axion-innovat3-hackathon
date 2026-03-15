// src/hooks/useRealtimeEvents.ts
'use client';

import { useEffect } from 'react';
import { supabase } from '@/services/supabase';
import { useEventStore } from '@/store/eventStore';
import type { EventType } from '@/lib/types';
import { DAO_CONFIG } from '@/lib/constants';

export function useRealtimeEvents() {
  useEffect(() => {
    const pushEvent = useEventStore.getState().pushEvent;

    const channel = supabase
      .channel('dao-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'events' }, (payload) => {
        const row = payload.new as any;
        pushEvent({
          type: row.event_type as EventType,
          title: row.title || 'DAO Event',
          data: row.data || {},
          sourceNodeId: row.source_node_id,
          targetNodeId: row.target_node_id,
          magnitude: row.magnitude || 0.5,
        });
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'votes' }, (payload) => {
        const vote = payload.new as any;
        const weight = Number(vote.weight) || 0;
        const isWhale = weight >= DAO_CONFIG.whaleThreshold;
        pushEvent({
          type: isWhale ? 'whale_movement' : 'vote_cast',
          title: isWhale ? `Whale Vote: ${vote.voter_ens || vote.voter?.slice(0, 10)}...` : `Vote on Proposal ${vote.proposal_id}`,
          data: { voter: vote.voter, proposalId: vote.proposal_id, support: vote.support, power: weight },
          sourceNodeId: `contributor-${vote.voter}`,
          targetNodeId: `proposal-${vote.proposal_id}`,
          magnitude: isWhale ? 1.0 : Math.min(0.8, weight / 1_000_000),
        });
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'threats' }, (payload) => {
        const threat = payload.new as any;
        const magnitudeMap: Record<string, number> = { low: 0.3, medium: 0.5, high: 0.8, critical: 1.0 };
        pushEvent({
          type: 'threat_detected',
          title: threat.title || 'New Threat Detected',
          data: threat,
          magnitude: magnitudeMap[threat.severity] || 0.5,
        });
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'treasury_transfers' }, (payload) => {
        const tx = payload.new as any;
        const isInflow = tx.to_address?.toLowerCase() === DAO_CONFIG.treasury.toLowerCase();
        pushEvent({
          type: isInflow ? 'transfer_in' : 'transfer_out',
          title: `${isInflow ? 'Inflow' : 'Outflow'}: ${tx.amount} ${tx.token_symbol}`,
          data: { from: tx.from_address, to: tx.to_address, amount: tx.value_usd || tx.amount, token: tx.token_symbol },
          magnitude: Math.min(1.0, (tx.value_usd || 0) / 1_000_000),
        });
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);
}
