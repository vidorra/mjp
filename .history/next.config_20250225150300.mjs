/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
    esmExternals: true
  },
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      },
      modules: [
        ...config.resolve.modules || [],
        'node_modules',
        './custom_modules'
      ]
    };
    return config;
  }
};

export default nextConfig;