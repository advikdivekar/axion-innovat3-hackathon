/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['three'],
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