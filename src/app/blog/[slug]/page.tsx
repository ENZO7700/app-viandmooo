// @ts-nocheck

import { blogPosts } from '@/lib/blog-posts.tsx';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';
import type { Metadata, ResolvingMetadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

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
  };
}

// Generovanie statických ciest pre všetky články
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

const OtherPosts = ({ currentSlug }: { currentSlug: string }) => {
  const other = blogPosts
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);

  if (other.length === 0) return null;

  return (
    <aside className="mt-12 md:mt-16">
        <h2 className="text-2xl md:text-3xl font-headline text-primary mb-6">Prečítajte si tiež</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {other.map(post => (
                 <Card key={post.slug} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
                 <Link href={`/blog/${post.slug}`} className="block">
                   <div className="relative h-48 w-full">
                     <Image
                       src={post.image}
                       alt={post.image_alt}
                       fill
                       loading="lazy"
                       decoding="async"
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


export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-12 md:py-20">
      <div className="container max-w-4xl mx-auto">
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
        <div className="prose prose-lg max-w-none text-foreground/90 prose-h2:font-headline prose-h2:text-primary prose-h3:font-headline prose-h3:text-primary prose-p:leading-relaxed">
           {post.content}
        </div>

        <OtherPosts currentSlug={post.slug} />
      </div>
    </article>
  );
}
