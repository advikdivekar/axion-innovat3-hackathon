// src/lib/constants.ts

// ═══ TARGET DAO — UNISWAP ═══
export const DAO_CONFIG = {
    name: 'Uniswap',
    symbol: 'UNI',
    chain: 'ethereum',
    chainId: 1,
    governor: '0x408ED6354d4973f66138C91495F2f2FCbd8724C3',
    token: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    treasury: '0x1a9C8182C09F50C8318d769245beA52c32BE35BC',
    timelock: '0x1a9C8182C09F50C8318d769245beA52c32BE35BC',
    snapshotSpace: 'uniswapgovernance.eth',
    whaleThreshold: 1_000_000,   // 1M UNI = whale
    quorum: 40_000_000,          // 40M UNI
    tokenDecimals: 18,
} as const;

// ═══ MODULE REGISTRY ═══
export const MODULES = {
    home: {
        id: 'home' as const,
        label: 'Neural Network',
        icon: '/icons/logo-cosmos.svg',
        color: '#00f0ff',
        cameraPosition: [0, 0, 25] as [number, number, number],
        cameraTarget: [0, 0, 0] as [number, number, number],
        clusterCenter: [0, 0, 0] as [number, number, number],
    },
    governance: {
        id: 'governance' as const,
        label: 'Governance Arena',
        icon: '/icons/module-governance.svg',
        color: '#7b2ff7',
        cameraPosition: [-8, 5, 12] as [number, number, number],
        cameraTarget: [-5, 2, 0] as [number, number, number],
        clusterCenter: [-5, 2, 0] as [number, number, number],
    },
    treasury: {
        id: 'treasury' as const,
        label: 'Treasury Reactor',
        icon: '/icons/module-treasury.svg',
        color: '#ffd700',
        cameraPosition: [8, 5, 12] as [number, number, number],
        cameraTarget: [5, 2, 0] as [number, number, number],
        clusterCenter: [5, 2, 0] as [number, number, number],
    },
    contributors: {
        id: 'contributors' as const,
        label: 'Contributor Galaxy',
        icon: '/icons/module-contributors.svg',
        color: '#00f0ff',
        cameraPosition: [0, -5, 15] as [number, number, number],
        cameraTarget: [0, -3, -2] as [number, number, number],
        clusterCenter: [0, -3, -2] as [number, number, number],
    },
    security: {
        id: 'security' as const,
        label: 'Security Sentinel',
        icon: '/icons/module-security.svg',
        color: '#ff2d6a',
        cameraPosition: [0, 8, 12] as [number, number, number],
        cameraTarget: [0, 4, 3] as [number, number, number],
        clusterCenter: [0, 4, 3] as [number, number, number],
    },
    simulator: {
        id: 'simulator' as const,
        label: 'Multiverse Simulator',
        icon: '/icons/module-simulator.svg',
        color: '#00ff88',
        cameraPosition: [0, 0, 20] as [number, number, number],
        cameraTarget: [0, 0, 5] as [number, number, number],
        clusterCenter: [0, 0, 5] as [number, number, number],
    },
} as const;

// ═══ VISUAL CONSTANTS ═══
export const SCENE = {
    MAX_NODES: 200,
    MAX_CONNECTIONS: 500,
    MAX_PARTICLES: 3000,
    MAX_EFFECTS: 10,
    CAMERA_TRANSITION_DURATION: 1200,    // ms
    NODE_HOVER_SCALE: 1.3,
    NODE_SELECT_SCALE: 1.5,
    PULSE_SPEED: 2.0,
    ENERGY_STREAM_SPEED: 0.8,
    SHOCKWAVE_DURATION: 1500,            // ms
    DEMO_EVENT_INTERVAL: 4000,           // ms
} as const;

// ═══ API POLLING INTERVALS ═══
export const POLLING = {
    BLOCKCHAIN_DATA: 30_000,     // 30 seconds
    TREASURY_BALANCE: 60_000,    // 60 seconds
    EVENTS_CHECK: 15_000,        // 15 seconds
    HEALTH_RECALC: 120_000,      // 2 minutes
} as const;

// ═══ GAMIFICATION ═══
export const XP_REWARDS = {
    VOTE_CAST: 50,
    PROPOSAL_CREATED: 500,
    PROPOSAL_PASSED: 1000,
    DELEGATION_RECEIVED: 10,
    SECURITY_REPORT_VALID: 200,
    TREASURY_ACTION: 100,
    COLLABORATION_EVENT: 25,
    DAILY_LOGIN: 10,
    STREAK_3D: 50,
    STREAK_7D: 150,
    STREAK_30D: 500,
} as const;

export const LEVEL_THRESHOLDS = [
    0, 100, 250, 500, 800, 1200, 1800, 2500, 3500, 5000,
    6500, 8500, 11000, 14000, 17500, 21500, 26000, 31000,
    37000, 44000, 52000, 61000, 71000, 82000, 95000,
    110000, 130000, 155000, 185000, 220000,
] as const;

