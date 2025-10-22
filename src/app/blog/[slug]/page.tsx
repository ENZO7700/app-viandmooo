// @ts-nocheck

import { blogPosts } from '@/lib/blog-posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';
import type { Metadata, ResolvingMetadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { slugify } from '@/lib/utils';
import { Breadcrumbs } from '@/components/blog/Breadcrumbs';
import { getRelatedArticles } from '@/ai/flows/related-articles-flow';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  params: { slug: string };
};

// Generovanie metadát pre každý článok
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Článok nenájdený',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.viandmo.com';
  const imageUrl = post.image.startsWith('http') ? post.image : `${siteUrl}${post.image}`;

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `${siteUrl}/blog/${post.slug}`,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.image_alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
  };
}

// Generovanie statických ciest pre všetky články
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

async function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const currentPost = blogPosts.find(p => p.slug === currentSlug);
  if (!currentPost) return null;

  // For the purpose of getting related articles, we can create a simple string representation
  // In a real app, you might render JSX to string or use a different content format
  const contentAsString = `${currentPost.title}\n${currentPost.summary}`;

  const otherAvailableArticles = blogPosts
    .filter(p => p.slug !== currentSlug)
    .map(p => ({ slug: p.slug, title: p.title }));

  try {
    const relatedSlugs = await getRelatedArticles({
        currentArticleContent: contentAsString,
        availableArticles: otherAvailableArticles
    });

    const related = blogPosts.filter(p => relatedSlugs.includes(p.slug));

    if (related.length === 0) return null;

    return (
        <aside className="mt-12 md:mt-16">
            <h2 className="text-2xl md:text-3xl font-headline text-primary mb-6">Súvisiace články</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {related.map(post => (
                    <Card key={post.slug} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative h-48 w-full">
                        <Image
                          src={post.image}
                          alt={post.image_alt}
                          fill
                          className="object-cover"
                          data-ai-hint={post.image_alt}
                        />
                      </div>
                    </Link>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-headline leading-snug mb-2">
                        <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </h3>
                        <p className="text-sm text-muted-foreground">
                        {post.summary.substring(0, 100)}...
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
        </aside>
    )
  } catch (error) {
    // Fallback to simple "other posts" if AI fails, do not log error in production
    return <OtherPostsFallback currentSlug={currentSlug} />;
  }
}

const RelatedPostsSkeleton = () => (
    <aside className="mt-12 md:mt-16">
        <h2 className="text-2xl md:text-3xl font-headline text-primary mb-6">Súvisiace články</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
                <Card key={i} className="rounded-xl">
                    <Skeleton className="h-48 w-full" />
                    <CardContent className="p-4 space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </CardContent>
                </Card>
            ))}
        </div>
    </aside>
);

const OtherPostsFallback = ({ currentSlug }: { currentSlug: string }) => {
  const other = blogPosts
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  if (other.length === 0) return null;

  return (
    <aside className="mt-12 md:mt-16">
        <h2 className="text-2xl md:text-3xl font-headline text-primary mb-6">Prečítajte si tiež</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {other.map(post => (
                 <Card key={post.slug} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
                 <Link href={`/blog/${post.slug}`} className="block">
                   <div className="relative h-48 w-full">
                     <Image
                       src={post.image}
                       alt={post.image_alt}
                       fill
                       className="object-cover"
                       data-ai-hint={post.image_alt}
                     />
                   </div>
                 </Link>
                 <CardContent className="p-4">
                   <h3 className="text-lg font-headline leading-snug mb-2">
                     <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                       {post.title}
                     </Link>
                   </h3>
                    <p className="text-sm text-muted-foreground">
                     {post.summary.substring(0, 100)}...
                   </p>
                 </CardContent>
               </Card>
            ))}
        </div>
    </aside>
  )
}


export default async function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

    const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    image: post.image.startsWith('http') ? post.image : `${process.env.NEXT_PUBLIC_SITE_URL}${post.image}`,
    author: {
      '@type': 'Organization',
      name: 'VI&MO',
      url: process.env.NEXT_PUBLIC_SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'VI&MO',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/viandmo_logo.png`,
      },
    },
    datePublished: new Date(post.date).toISOString(),
  };

  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    { label: post.category, href: `/blog/kategoria/${slugify(post.category)}` },
    { label: post.title, href: `/blog/${post.slug}`, active: true },
  ];

  return (
    <article className="py-12 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container max-w-4xl mx-auto">

        <Breadcrumbs items={breadcrumbItems} />

        {/* Header */}
        <header className="mb-8 md:mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-headline text-primary mb-4 leading-tight">{post.title}</h1>
          <div className="flex items-center justify-center gap-6 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Publikované {new Date(post.date).toLocaleDateString('sk-SK')}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
          </div>
        </header>

        {/* Main Image */}
        <div className="relative h-64 md:h-96 w-full mb-8 md:mb-12 rounded-lg overflow-hidden shadow-xl">
          <Image
            src={post.image}
            alt={post.image_alt}
            fill
            priority
            className="object-cover"
            data-ai-hint={post.image_alt}
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-foreground/90 prose-h2:font-headline prose-h2:text-primary prose-h3:font-headline prose-h3:text-primary prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground">
           {post.content}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map(tag => (
                <Link href={`/blog/tag/${slugify(tag)}`} key={tag}>
                    <span className="bg-muted text-muted-foreground text-xs font-semibold px-3 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                        # {tag}
                    </span>
                </Link>
            ))}
        </div>

        <Suspense fallback={<RelatedPostsSkeleton />}>
          <RelatedPosts currentSlug={post.slug} />
        </Suspense>
      </div>
    </article>
  );
}
