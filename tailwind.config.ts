import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                cosmos: {
                    void: '#0a0a0f',
                    'void-light': '#12121a',
                    'void-lighter': '#1a1a2e',
                    cyan: '#00f0ff',
                    'cyan-dim': '#00a5b0',
                    magenta: '#ff2d6a',
                    'magenta-dim': '#b01e4a',
                    gold: '#ffd700',
                    'gold-dim': '#b09500',
                    purple: '#7b2ff7',
                    'purple-dim': '#5a1fb5',
                    green: '#00ff88',
                    'green-dim': '#00b060',
                },
            },
            fontFamily: {
                display: ['Orbitron', 'system-ui'],
                body: ['Rajdhani', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'pulse-slow': 'pulse 3s ease-in-out infinite',
                'float': 'float 4s ease-in-out infinite',
                'scan': 'scan 3s linear infinite',
                'flicker': 'flicker 4s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-6px)' },
                },
                scan: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' },
                },
                flicker: {
                    '0%, 97%, 100%': { opacity: '1' },
                    '98%': { opacity: '0.8' },
                    '99%': { opacity: '0.9' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
};

export default config;