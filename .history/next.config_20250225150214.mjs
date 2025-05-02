/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add custom module resolution for @fortawesome packages
    config.resolve.alias = {
      ...config.resolve.alias,
      '@fortawesome/fontawesome-svg-core': './custom_modules/@fortawesome/fontawesome-svg-core',
      '@fortawesome/react-fontawesome': './custom_modules/@fortawesome/react-fontawesome',
      '@fortawesome/pro-solid-svg-icons': './custom_modules/@fortawesome/pro-solid-svg-icons'
    };
    
    return config;
  }
};

export default nextConfig;