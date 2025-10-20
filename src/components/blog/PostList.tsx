
import type { BlogPost } from '@/lib/blog-posts';
import { PostCard } from './PostCard';

interface PostListProps {
  posts: BlogPost[];
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}

    