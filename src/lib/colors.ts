// src/lib/colors.ts
import * as THREE from 'three';
import { ContributorClass, RiskLevel, ThreatSeverity } from './types';

// Memoized Three.js Color instances for performance
export const COSMOS_COLORS = {
    void: new THREE.Color('#0a0a0f'),
    cyan: new THREE.Color('#00f0ff'),
    magenta: new THREE.Color('#ff2d6a'),
    gold: new THREE.Color('#ffd700'),
    purple: new THREE.Color('#7b2ff7'),
    green: new THREE.Color('#00ff88'),
    white: new THREE.Color('#ffffff'),
};

export function getRiskColor(level: RiskLevel): THREE.Color {
    switch (level) {
        case 'normal': return COSMOS_COLORS.green;
        case 'elevated': return COSMOS_COLORS.gold;
        case 'high': return new THREE.Color('#ff8c00'); // Orange
        case 'critical': return COSMOS_COLORS.magenta;
        default: return COSMOS_COLORS.cyan;
    }
}

export function getThreatColor(severity: ThreatSeverity): THREE.Color {
    switch (severity) {
        case 'low': return COSMOS_COLORS.gold;
        case 'medium': return new THREE.Color('#ff8c00');
        case 'high': return COSMOS_COLORS.magenta;
        case 'critical': return new THREE.Color('#ff0000');
        default: return COSMOS_COLORS.magenta;
    }
}

export function getContributorClassColor(contributorClass: ContributorClass): THREE.Color {
    switch (contributorClass) {
        case 'architect': return COSMOS_COLORS.cyan;
        case 'diplomat': return COSMOS_COLORS.purple;
        case 'sentinel': return COSMOS_COLORS.magenta;
        case 'merchant': return COSMOS_COLORS.gold;
        case 'explorer': return COSMOS_COLORS.green;
        default: return COSMOS_COLORS.white;
    }
}

// Helper to get hex string for CSS/Tailwind use cases
export function getHexFromClass(contributorClass: ContributorClass): string {
    return '#' + getContributorClassColor(contributorClass).getHexString();
}