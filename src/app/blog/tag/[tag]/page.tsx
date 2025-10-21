
import { blogPosts } from '@/lib/blog-posts';
import { notFound } from 'next/navigation';
import { PostList } from '@/components/blog/PostList';
import { slugify } from '@/lib/utils';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/blog/Breadcrumbs';


type Props = {
  params: { tag: string };
}

export async function generateStaticParams() {
  const tags = Array.from(new Set(blogPosts.flatMap((p) => p.tags)));
  return tags.map((tag) => ({
    tag: slugify(tag),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tagName = blogPosts.flatMap(p => p.tags).find(t => slugify(t) === params.tag);

  if (!tagName) {
    return { title: 'Tag nenájdený' };
  }

  return {
    title: `Články s tagom: ${tagName}`,
    description: `Zoznam všetkých článkov označených tagom #${tagName} na blogu VI&MO.`,
     alternates: {
      canonical: `/blog/tag/${params.tag}`,
    },
  };
}


export default function TagPage({ params }: Props) {
  const { tag } = params;
  const posts = blogPosts.filter((post) => post.tags.some(t => slugify(t) === tag));

  if (posts.length === 0) {
    notFound();
  }
    
  const tagName = posts[0].tags.find(t => slugify(t) === tag) || tag;

  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    { label: `Tag: #${tagName}`, href: `/blog/tag/${tag}`, active: true },
  ];

  return (
    <div className="py-16 md:py-24 bg-background">
      <div className="container">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-3xl md:text-4xl font-headline text-primary mb-8">
          Tag: <span className="text-foreground">#{tagName}</span>
        </h1>
        <PostList posts={posts} />
      </div>
    </div>
  );
}
