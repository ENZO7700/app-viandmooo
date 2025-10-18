
'use client';

import { useState } from 'react';
import { blogPosts } from '@/lib/blog-posts.tsx';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessagesSquare, Search } from 'lucide-react';
import imageData from '@/lib/placeholder-images.json';
import { Input } from '@/components/ui/input';


export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const sortedPosts = blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredPosts = sortedPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <Button asChild>
              <Link href="/contact">
                <MessagesSquare className="w-5 h-5 mr-2" />
                Pridať recenziu
              </Link>
            </Button>
          </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          {filteredPosts.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card key={post.slug} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl bg-card border">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative h-56 w-full">
                        <Image
                          src={post.image}
                          alt={post.image_alt}
                          fill
                          loading="lazy"
                          decoding="async"
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          data-ai-hint={post.image_alt}
                        />
                      </div>
                    </Link>
                    <CardHeader>
                      <h2 className="text-xl font-headline leading-snug">
                        <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </h2>
                       <p className="text-sm text-muted-foreground pt-2">
                        Publikované {new Date(post.date).toLocaleDateString('sk-SK')}
                      </p>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription>{post.summary}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="link" className="p-0 h-auto text-primary">
                        <Link href={`/blog/${post.slug}`}>
                          Čítať viac <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
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
