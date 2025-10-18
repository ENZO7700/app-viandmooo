import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /wp-admin/
Disallow: /cgi-bin/

Sitemap: https://app.viandmo.com/sitemap.xml
`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
