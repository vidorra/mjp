/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@fortawesome/fontawesome-svg-core',
    '@fortawesome/react-fontawesome',
    '@fortawesome/pro-solid-svg-icons'
  ],
  webpack: (config) => {
    config.resolve.symlinks = false;
    config.resolve.alias = {
      ...config.resolve.alias,
      '@fortawesome': './custom_modules/@fortawesome'
    };
    return config;
  }
};

export default nextConfig;