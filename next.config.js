/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['three'],
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                ],
            },
        ];
    },
    webpack: (config, { isServer }) => {
        config.module.rules.push({
            test: /\.(glsl|vs|fs|vert|frag)$/,
            use: ['raw-loader', 'glslify-loader'],
        });
        // Fix three.js SSR issues
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
            };
        }
        return config;
    },
    images: {
        domains: ['raw.githubusercontent.com', 'avatars.githubusercontent.com'],
    },
    // Allow GLSL imports
    experimental: {
        turbo: {
            rules: {
                '*.glsl': ['raw-loader'],
            },
        },
    },
};
module.exports = nextConfig;