'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { PRODUCTS, COLLECTIONS, formatPrice, COUNTRIES } from '@/lib/mock-data';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { generateProductRecommendations } from '@/ai/flows/generate-product-recommendations';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  const featuredProducts = PRODUCTS.slice(0, 4);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(true);

  useEffect(() => {
    async function loadRecs() {
      try {
        const res = await generateProductRecommendations({
          scenario: `A luxury shopper in ${countryCode} looking for seasonal highlights.`,
        });
        setRecommendations(res.recommendations);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingRecs(false);
      }
    }
    loadRecs();
  }, [countryCode]);

  return (
    <div className="space-y-32">
      {/* Cinematic Hero */}
      <section className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/amarise-hero-main/1920/1080" 
          alt="Amarisé Luxe Hero"
          fill
          className="object-cover opacity-60"
          priority
          data-ai-hint="luxury aesthetic"
        />
        <div className="absolute inset-0 cinematic-gradient" />
        <div className="relative z-10 text-center space-y-10 max-w-5xl px-6">
          <div className="animate-fade-in opacity-0 [animation-delay:200ms]">
            <span className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary mb-6 block">Maison de Luxe | Est. 1924</span>
            <h1 className="text-7xl md:text-9xl font-headline font-bold text-white leading-[1.1]">
              Defining <br /> <span className="italic font-normal serif">Modern Heritage</span>
            </h1>
          </div>
          <div className="animate-fade-in opacity-0 [animation-delay:400ms]">
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
              Where the boundaries of craft and imagination dissolve. Hand-sculpted pieces for the global elite.
            </p>
          </div>
          <div className="animate-fade-in opacity-0 [animation-delay:600ms] flex flex-col sm:flex-row items-center justify-center gap-8 pt-8">
            <Button size="lg" className="bg-primary hover:bg-secondary text-white px-12 h-16 rounded-none text-xs tracking-[0.2em] font-bold shadow-2xl">
              EXPLORE COLLECTION
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-background px-12 h-16 rounded-none text-xs tracking-[0.2em] font-bold">
              THE ATELIER STORY
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">Selection</span>
            <h2 className="text-5xl font-headline font-bold">Curated Chapters</h2>
            <p className="text-muted-foreground max-w-xl font-light text-lg">
              Each collection is a narrative of its own, meticulously assembled for the discerning soul.
            </p>
          </div>
          <Link href={`/${countryCode}/category/apparel`} className="text-[10px] font-bold tracking-[0.2em] uppercase border-b border-primary pb-1 hover:text-primary transition-colors">
            View All Departments
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {COLLECTIONS.map((col, idx) => (
            <Link 
              key={col.id} 
              href={`/${countryCode}/collection/${col.id}`}
              className={cn(
                "group relative h-[600px] overflow-hidden bg-card transition-all duration-700 hover:shadow-2xl",
                idx === 1 && "md:translate-y-16"
              )}
            >
              <Image 
                src={col.imageUrl} 
                alt={col.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                data-ai-hint="fashion editorial"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
              <div className="absolute bottom-12 left-12 right-12 space-y-4">
                <h3 className="text-4xl font-headline text-white">{col.name}</h3>
                <p className="text-sm text-gray-300 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                  {col.description}
                </p>
                <div className="inline-flex items-center text-[10px] font-bold tracking-widest text-white uppercase border-b border-white pb-1 group-hover:text-primary group-hover:border-primary transition-colors">
                  Enter Collection <ArrowRight className="w-3 h-3 ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className="container mx-auto px-6 pt-32">
        <div className="text-center space-y-6 mb-24">
          <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase">Highlights</span>
          <h2 className="text-6xl font-headline font-bold">Seasonal Icons</h2>
          <div className="w-24 h-px bg-primary mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* AI Recommendations */}
      <section className="bg-card py-40 border-y border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center space-x-6 mb-16">
            <div className="p-4 bg-primary/10 rounded-full">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-4xl font-headline font-bold">Bespoke Intelligence</h2>
              <p className="text-lg text-muted-foreground font-light italic">
                Curation informed by current trends in {COUNTRIES[countryCode]?.name}.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {loadingRecs ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="space-y-6 animate-pulse">
                  <div className="aspect-[4/5] bg-muted rounded-none" />
                  <div className="h-4 bg-muted w-2/3" />
                  <div className="h-4 bg-muted w-1/2" />
                </div>
              ))
            ) : (
              recommendations.map((rec) => (
                <div key={rec.id} className="group relative">
                  <div className="aspect-[4/5] overflow-hidden relative mb-8 bg-muted shadow-lg">
                    <Image 
                      src={rec.imageUrl} 
                      alt={rec.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">{rec.category}</span>
                    <h3 className="text-2xl font-headline">{rec.name}</h3>
                    <p className="text-muted-foreground font-light leading-relaxed line-clamp-3">
                      {rec.description}
                    </p>
                    <div className="pt-2 text-xl font-light">
                      {rec.currency} {rec.price.toLocaleString()}
                    </div>
                  </div>
                  <Button variant="link" className="px-0 text-[10px] tracking-[0.2em] font-bold text-foreground hover:text-primary mt-6 uppercase">
                    Discover Details <ArrowRight className="w-3 h-3 ml-2" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Editorial Section */}
      <section className="container mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative h-[800px] w-full group overflow-hidden shadow-2xl">
            <Image 
              src="https://picsum.photos/seed/editorial-main/1200/1600"
              alt="Editorial"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              data-ai-hint="fashion atelier"
            />
            <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-700" />
          </div>
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-[12px] font-bold tracking-[0.5em] uppercase text-primary">The Journal</span>
              <h2 className="text-6xl font-headline font-bold leading-tight italic">Alchemy in <br /> the Atelier</h2>
            </div>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              Step into the clandestine world of Amarisé. Our master artisans breathe life into raw materials, creating artifacts that transcend time. Every stitch, every facet, tells a story of relentless dedication to beauty.
            </p>
            <div className="grid grid-cols-2 gap-12 pt-8 border-t border-border">
              <div className="space-y-2">
                <span className="text-5xl font-headline text-primary font-bold">120+</span>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-bold">Master Craftsmen</p>
              </div>
              <div className="space-y-2">
                <span className="text-5xl font-headline text-primary font-bold">1924</span>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-bold">Inception</p>
              </div>
            </div>
            <Button size="lg" className="bg-transparent border border-foreground text-foreground hover:bg-foreground hover:text-background h-16 px-12 rounded-none text-xs tracking-[0.2em] font-bold transition-all">
              EXPLORE THE JOURNAL
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
