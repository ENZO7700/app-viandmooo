import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://app.viandmo.com';

  const slugs = [
    "", "stahovanie-bratislava", "lacne-stahovanie-bratislava", "stahovanie-bytov-bratislava",
    "stahovanie-kancelarii-bratislava", "preprava-nabytku-bratislava", "odvoz-odpadu-bratislava",
    "nonstop-stahovanie-bratislava", "vypratavanie-bytov-bratislava", "stahovanie-klavirov-bratislava"
  ];
  
  const staticRoutes = slugs.map((slug) => ({
    url: `${siteUrl}${slug ? `/${slug}` : ''}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: slug === '' ? 1.0 : 0.8,
  }));

  const blogRoutes = [
    { slug: 'ako-si-vybrat-stahovaciu-sluzbu-v-bratislave', date: '2024-05-20' },
    { slug: 'najcastejsie-chyby-pri-stahovani-v-bratislave', date: '2024-05-15' },
    { slug: 'tipy-na-bezstresove-stahovanie-bytu-v-petrzalke', date: '2024-05-10' },
  ].map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date).toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
  }));


  return [...staticRoutes, ...blogRoutes];
}
