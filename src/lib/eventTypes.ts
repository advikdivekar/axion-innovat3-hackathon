// src/lib/eventTypes.ts
import { EventType, VisualEffectType } from './types';
import { COSMOS_COLORS } from './colors';

export interface EventEffectConfig {
    effectType: VisualEffectType;
    color: string;
    intensity: number;
    duration: number; // in milliseconds
}

// Maps blockchain/system events to 3D visual reactions
export const EVENT_EFFECT_MAP: Partial<Record<EventType, EventEffectConfig>> = {
    vote_cast: {
        effectType: 'pulse',
        color: '#' + COSMOS_COLORS.purple.getHexString(),
        intensity: 0.6,
        duration: 1500,
    },
    proposal_created: {
        effectType: 'shockwave',
        color: '#' + COSMOS_COLORS.purple.getHexString(),
        intensity: 1.0,
        duration: 2000,
    },
    transfer_in: {
        effectType: 'energy_beam',
        color: '#' + COSMOS_COLORS.cyan.getHexString(),
        intensity: 0.7,
        duration: 2000,
    },
    transfer_out: {
        effectType: 'energy_beam',
        color: '#' + COSMOS_COLORS.gold.getHexString(),
        intensity: 0.7,
        duration: 2000,
    },
    threat_detected: {
        effectType: 'alert_flash',
        color: '#' + COSMOS_COLORS.magenta.getHexString(),
        intensity: 1.0,
        duration: 3000,
    },
    whale_movement: {
        effectType: 'shockwave',
        color: '#' + COSMOS_COLORS.gold.getHexString(),
        intensity: 1.0,
        duration: 2500,
    },
    contributor_join: {
        effectType: 'star_birth',
        color: '#' + COSMOS_COLORS.cyan.getHexString(),
        intensity: 0.5,
        duration: 2000,
    },
};

