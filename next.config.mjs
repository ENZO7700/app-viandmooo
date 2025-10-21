/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required for next export
  },
  webpack: (config) => {
    config.resolve.alias['@'] = require('path').resolve(__dirname, 'src');
    return config;
  },
};

export default nextConfig;
