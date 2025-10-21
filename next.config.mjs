/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  // Odstránenie `images.unoptimized` zabezpečí, že Next.js bude obrázky optimalizovať.
  // Pre statický export je dôležité, aby všetky obrázky mali definovanú šírku a výšku.
};

export default nextConfig;
