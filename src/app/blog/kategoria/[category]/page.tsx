
import { blogPosts } from '@/lib/blog-posts';
import { notFound } from 'next/navigation';
import { PostList } from '@/components/blog/PostList';
import { slugify } from '@/lib/utils';
import type { Metadata, ResolvingMetadata } from 'next';
import { Breadcrumbs } from '@/components/blog/Breadcrumbs';

type Props = {
  params: { category: string };
}

export async function generateStaticParams() {
  const categories = [...new Set(blogPosts.map((p) => p.category))];
  return categories.map((category) => ({
    category: slugify(category),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryName = blogPosts.find(p => slugify(p.category) === params.category)?.category;

  if (!categoryName) {
    return { title: 'Kategória nenájdená' };
  }

  return {
    title: `Články v kategórii: ${categoryName}`,
    description: `Prehľad všetkých článkov a návodov v kategórii ${categoryName} na blogu VI&MO.`,
     alternates: {
      canonical: `/blog/kategoria/${params.category}`,
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const { category } = params;
  const posts = blogPosts.filter((post) => slugify(post.category) === category);
  
  if (posts.length === 0) {
    notFound();
  }

  const categoryName = posts[0].category;

  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    { label: `Kategória: ${categoryName}`, href: `/blog/kategoria/${category}`, active: true },
  ];

  return (
    <div className="py-16 md:py-24 bg-background">
      <div className="container">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-3xl md:text-4xl font-headline text-primary mb-8">
          Kategória: <span className="text-foreground">{categoryName}</span>
        </h1>
        <PostList posts={posts} />
      </div>
    </div>
  );
}

    