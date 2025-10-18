import { NextResponse } from 'next/server';

const slugs = [
  "", "stahovanie-bratislava", "lacne-stahovanie-bratislava", "stahovanie-bytov-bratislava",
  "stahovanie-kancelarii-bratislava", "preprava-nabytku-bratislava", "odvoz-odpadu-bratislava",
  "nonstop-stahovanie-bratislava", "vypratavanie-bytov-bratislava", "stahovanie-klavirov-bratislava"
];
const siteUrl = 'https://app.viandmo.com';

export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${slugs.map(slug => `
    <url>
      <loc>${siteUrl}${slug ? `/${slug}` : ''}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${slug === '' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
