/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add custom_modules to the module resolution paths
    config.resolve.modules.push('./custom_modules');
    
    return config;
  }
};

export default nextConfig;