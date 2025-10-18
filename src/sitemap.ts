import { blogPosts } from '@/lib/blog-posts';

export default function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://app.viandmo.com';

  const staticRoutes = [
    "/",
    "/about",
    "/contact",
    "/blog",
    "/privacy-policy",
  ].map((slug) => ({
    url: `${siteUrl}${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: slug === '/' ? 1.0 : 0.8,
  }));

  const blogRoutes = blogPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date).toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
  }));


  return [...staticRoutes, ...blogRoutes];
}
