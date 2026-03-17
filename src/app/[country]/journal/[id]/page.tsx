
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { ChevronLeft, Share2, Bookmark, Sparkles, Heart, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function JournalArticlePage() {
  const { id, country } = useParams();
  const { editorials, products, socialMetrics, toggleLike, trackShare, wishlist } = useAppStore();
  const { toast } = useToast();
  const countryCode = (country as string) || 'us';
  
  const article = editorials.find(ed => ed.id === id);
  const featured = products.filter(p => article?.featuredProducts.includes(p.id));
  const metrics = socialMetrics[id as string] || { likes: 0, shares: 0, engagementRate: 0 };
  const isLiked = wishlist.some(w => w.id === id);

  if (!article) {
    return <div className="py-40 text-center">Article not found.</div>;
  }

  const handleToggleLike = () => {
    // We use contentId for toggleLike. In a real app we'd have a separate 'likedJournal' state.
    // For this demo we'll just track it in the interaction log.
    toggleLike(article.id, countryCode);
    toast({
      title: isLiked ? "Reaction Removed" : "Article Appreciated",
      description: isLiked ? "Your mark has been cleared." : "The Maison appreciates your interest in our heritage.",
    });
  };

  const handleShare = (platform: string) => {
    trackShare(article.id, countryCode);
    toast({
      title: `Shared to ${platform}`,
      description: "The AMARISÉ Journal is reaching a wider audience.",
    });
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Header */}
      <section className="relative h-[80vh] w-full flex items-end overflow-hidden">
        <Image 
          src={article.imageUrl} 
          alt={article.title}
          fill
          className="object-cover animate-slow-zoom"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="container mx-auto px-6 pb-20 relative z-10">
          <Link href={`/${countryCode}/journal`} className="inline-flex items-center text-[10px] tracking-[0.4em] uppercase text-white hover:text-primary transition-colors mb-8">
            <ChevronLeft className="w-3 h-3 mr-2" /> Back to Journal
          </Link>
          <div className="space-y-6 max-w-5xl">
            <div className="flex items-center space-x-6">
              <span className="text-primary text-xs font-bold tracking-[0.4em] uppercase">{article.category}</span>
              <span className="text-white/60 text-[10px] uppercase tracking-widest">{article.date}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-headline font-bold text-white leading-tight">{article.title}</h1>
            <p className="text-xl md:text-2xl text-white/80 font-light italic max-w-3xl leading-relaxed">
              {article.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="container mx-auto px-6 py-32">
        <div className="max-w-3xl mx-auto space-y-16">
          <div className="flex justify-between items-center py-6 border-y border-border">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center font-headline font-bold italic text-primary">
                  {article.author.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-primary">Words By</span>
                  <span className="text-xs font-bold uppercase">{article.author}</span>
                </div>
              </div>
              <div className="h-10 w-px bg-border hidden sm:block" />
              <div className="hidden sm:flex items-center space-x-6">
                 <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-primary">Appreciation</span>
                    <span className="text-xs font-bold uppercase">{metrics.likes.toLocaleString()} Likes</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-primary">Resonance</span>
                    <span className="text-xs font-bold uppercase">{metrics.shares.toLocaleString()} Shares</span>
                 </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className={cn("hover:text-primary", isLiked && "text-primary")} onClick={handleToggleLike}>
                <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary"><Bookmark className="w-5 h-5" /></Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:text-primary">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-border luxury-blur w-48">
                  <DropdownMenuItem className="p-3 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:text-primary" onClick={() => handleShare('Facebook')}>
                    <Facebook className="w-4 h-4 mr-3" /> Facebook
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:text-primary" onClick={() => handleShare('Twitter')}>
                    <Twitter className="w-4 h-4 mr-3" /> Twitter
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:text-primary" onClick={() => handleShare('LinkedIn')}>
                    <Linkedin className="w-4 h-4 mr-3" /> LinkedIn
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:text-primary" onClick={() => handleShare('Copy Link')}>
                    <Copy className="w-4 h-4 mr-3" /> Copy Link
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="prose prose-invert prose-xl font-light leading-relaxed text-muted-foreground whitespace-pre-wrap selection:bg-primary selection:text-white first-letter:text-8xl first-letter:font-headline first-letter:text-primary first-letter:float-left first-letter:mr-4 first-letter:mt-2">
            {article.content}
          </div>

          <div className="pt-20 border-t border-border space-y-12">
            <div className="flex items-center space-x-4">
               <Sparkles className="w-6 h-6 text-primary" />
               <h3 className="text-2xl font-headline font-bold uppercase tracking-widest">Shop the Story</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              {featured.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="bg-muted/20 py-32">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4 text-center md:text-left">
            <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary">Up Next</h4>
            <h3 className="text-4xl font-headline font-bold italic">The Architecture of Time</h3>
          </div>
          <Link href={`/${countryCode}/journal`}>
            <Button variant="outline" className="rounded-none border-foreground h-16 px-12 text-[10px] font-bold tracking-[0.4em]">
              EXPLORE MORE STORIES
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
