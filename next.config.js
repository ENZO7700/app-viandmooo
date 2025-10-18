/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  fallbacks: { document: '/offline.html' },
});

module.exports = withPWA({
  reactStrictMode: true,
  images: { unoptimized: true },
  experimental: {
    // explicitne dovolíme Firebase Studio preview doménu
    allowedDevOrigins: [
      "https://9000-firebase-studio-*.cloudworkstations.dev",
      "https://studio.web.app",
      "http://localhost:3000"
    ]
  }
});
