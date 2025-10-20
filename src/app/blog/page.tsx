
'use client';

import { useState } from 'react';
import { blogPosts } from '@/lib/blog-posts.tsx';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessagesSquare, Search } from 'lucide-react';
import imageData from '@/lib/placeholder-images.json';
import { Input } from '@/components/ui/input';
import { PostList } from '@/components/blog/PostList';
import { slugify } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation';

export default function BlogPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  
  const sortedPosts = blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredPosts = sortedPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const allCategories = [...new Set(blogPosts.map(p => p.category))];
  const allTags = [...new Set(blogPosts.flatMap(p => p.tags))];

  const handleCategoryChange = (value: string) => {
    if (value === 'all') {
      router.push('/blog');
    } else {
      router.push(`/blog/kategoria/${slugify(value)}`);
    }
  };


  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-96 w-full flex items-center justify-center text-center text-white">
        <Image
          src={imageData.blogHero.src}
          alt="Písanie na klávesnici notebooku - blog o sťahovaní v Bratislave"
          fill
          priority
          className="object-cover object-center brightness-50"
          data-ai-hint={imageData.blogHero.hint}
        />
        <div className="relative z-10 p-4">
          <h1 className="text-5xl md:text-7xl font-headline leading-tight text-primary-foreground drop-shadow-lg">
            Náš Blog
          </h1>
          <p className="mt-4 text-lg md:text-2xl max-w-3xl mx-auto drop-shadow-md">
            Tipy, triky a rady pre vaše sťahovanie a bývanie.
          </p>
        </div>
      </section>

      {/* Blog Archive Header */}
      <section className="py-8 sticky top-20 z-40 bg-background/80 backdrop-blur-md border-b">
          <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-auto md:flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Hľadať v článkoch..." 
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className='flex gap-2 w-full md:w-auto'>
              <Select onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Všetky kategórie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Všetky kategórie</SelectItem>
                  {allCategories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
               <Button asChild>
                <Link href="/contact">
                  <MessagesSquare className="w-5 h-5 mr-2" />
                  Pridať recenziu
                </Link>
              </Button>
            </div>
          </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          {filteredPosts.length > 0 ? (
             <PostList posts={filteredPosts} />
          ) : (
             <div className="text-center py-16">
                <Search className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-xl font-semibold">Nenašli sa žiadne články</h3>
                <p className="mt-2 text-muted-foreground">Skúste zmeniť hľadaný výraz.</p>
             </div>
          )}
         
        </div>
      </section>
    </div>
  );
}

    