
import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://app.viandmo.com';

  // Statické trasy
  const staticRoutes = [
    '/',
    '/about',
    '/contact',
    '/blog',
    '/privacy-policy',
  ].map((slug) => ({
    url: `${siteUrl}${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: slug === '/' ? 1.0 : 0.8,
  }));

  // Trasy pre blogové články
  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Unikátne kategórie a tagy
  const categories = [...new Set(blogPosts.map((p) => p.category))];
  const tags = [...new Set(blogPosts.flatMap((p) => p.tags))];

  // Trasy pre kategórie
  const categoryRoutes = categories.map((category) => ({
    url: `${siteUrl}/blog/kategoria/${encodeURIComponent(category.toLowerCase())}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Trasy pre tagy
  const tagRoutes = tags.map((tag) => ({
    url: `${siteUrl}/blog/tag/${encodeURIComponent(tag.toLowerCase())}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...blogRoutes, ...categoryRoutes, ...tagRoutes];
}

    