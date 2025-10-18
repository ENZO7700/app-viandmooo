import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://app.viandmo.com';

  const staticRoutes = [
    "/",
    "/about",
    "/contact",
    "/blog",
    "/privacy-policy",
  ].map((slug) => ({
    url: `${siteUrl}${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: slug === '/' ? 1.0 : 0.8,
  }));

  const blogRoutes = blogPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date).toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
  }));


  return [...staticRoutes, ...blogRoutes];
}
