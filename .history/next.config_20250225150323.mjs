import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@fortawesome/fontawesome-svg-core': path.resolve(__dirname, 'custom_modules/@fortawesome/fontawesome-svg-core'),
      '@fortawesome/react-fontawesome': path.resolve(__dirname, 'custom_modules/@fortawesome/react-fontawesome'),
      '@fortawesome/pro-solid-svg-icons': path.resolve(__dirname, 'custom_modules/@fortawesome/pro-solid-svg-icons')
    };
    return config;
  }
};

export default nextConfig;