
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, FolderOpen } from 'lucide-react';
import type { BlogPost } from '@/lib/blog-posts';
import { slugify } from '@/lib/utils';

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl bg-card border h-full">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative h-56 w-full">
          <Image
            src={post.image}
            alt={post.image_alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={post.image_alt}
          />
        </div>
      </Link>
      <CardHeader>
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
            <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(post.date).toLocaleDateString('sk-SK')}</span>
            </div>
            <div className="flex items-center gap-1">
                <FolderOpen className="w-3 h-3" />
                 <Link href={`/blog/kategoria/${slugify(post.category)}`} className="hover:text-primary transition-colors">
                    {post.category}
                </Link>
            </div>
        </div>
        <h2 className="text-xl font-headline leading-snug">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </h2>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{post.summary}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="p-0 h-auto text-primary">
          <Link href={`/blog/${post.slug}`}>
            Čítať viac <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
