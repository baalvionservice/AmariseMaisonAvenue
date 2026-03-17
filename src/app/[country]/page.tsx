
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PRODUCTS, COLLECTIONS, formatPrice, COUNTRIES } from '@/lib/mock-data';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { generateProductRecommendations } from '@/ai/flows/generate-product-recommendations';

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
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="https://picsum.photos/seed/amarise-hero/1920/1080"
          alt="Cinematic Hero"
          fill
          priority
          className="object-cover scale-105 animate-pulse-slow transition-transform duration-[10000ms] hover:scale-100"
          data-ai-hint="luxury fashion"
        />
        <div className="absolute inset-0 cinematic-gradient" />
        <div className="relative z-10 text-center space-y-8 max-w-4xl px-6">
          <div className="animate-fade-in opacity-0 [animation-delay:200ms]">
            <span className="text-[12px] font-bold tracking-[0.4em] uppercase text-primary">Est. 1924</span>
            <h1 className="text-6xl md:text-8xl font-headline font-bold text-white mt-4 leading-tight">
              A Legacy of <br /> <span className="italic font-normal">Sublime Elegance</span>
            </h1>
          </div>
          <div className="animate-fade-in opacity-0 [animation-delay:400ms]">
            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
              Discover the Spring/Summer 2024 Collection, where heritage meets the horizon. Handcrafted masterpieces for the discerning global citizen.
            </p>
          </div>
          <div className="animate-fade-in opacity-0 [animation-delay:600ms] flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Button size="lg" className="bg-primary hover:bg-secondary text-white px-10 h-14 rounded-none text-xs tracking-widest font-bold">
              EXPLORE COLLECTION
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-background px-10 h-14 rounded-none text-xs tracking-widest font-bold">
              VIEW THE ATELIER
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-headline font-bold">Curated Departments</h2>
            <p className="text-muted-foreground max-w-xl">
              Navigate our expertly crafted selections, each representing the pinnacle of its respective craft.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COLLECTIONS.map((col, idx) => (
            <Link 
              key={col.id} 
              href={`/${countryCode}/collection/${col.id}`}
              className={cn(
                "group relative h-[500px] overflow-hidden bg-card",
                idx === 1 && "md:translate-y-12"
              )}
            >
              <Image
                src={col.imageUrl}
                alt={col.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-10 left-10 right-10">
                <h3 className="text-3xl font-headline text-white mb-2">{col.name}</h3>
                <p className="text-sm text-gray-300 mb-6 font-light">{col.description}</p>
                <div className="inline-flex items-center text-[10px] font-bold tracking-widest text-white uppercase border-b border-white pb-1 group-hover:text-primary group-hover:border-primary transition-colors">
                  View Collection <ArrowRight className="w-3 h-3 ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className="container mx-auto px-6 pt-20">
        <div className="text-center space-y-4 mb-20">
          <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">Highlights</span>
          <h2 className="text-5xl font-headline font-bold">Seasonal Icons</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* AI Recommendations */}
      <section className="bg-card py-32 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center space-x-4 mb-12">
            <div className="p-2 bg-primary/10 rounded-full">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-headline font-bold">Personalized for You</h2>
              <p className="text-sm text-muted-foreground">Intelligent selections based on the current market trends in {COUNTRIES[countryCode]?.name}.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {loadingRecs ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="space-y-4 animate-pulse">
                  <div className="aspect-square bg-muted rounded-sm" />
                  <div className="h-4 bg-muted w-2/3" />
                  <div className="h-4 bg-muted w-1/2" />
                </div>
              ))
            ) : (
              recommendations.map((rec) => (
                <div key={rec.id} className="group relative">
                  <div className="aspect-square overflow-hidden relative mb-6">
                    <Image
                      src={rec.imageUrl}
                      alt={rec.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold tracking-widest text-primary uppercase">{rec.category}</span>
                    <h3 className="text-xl font-headline">{rec.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{rec.description}</p>
                    <div className="pt-4 text-lg font-light">
                      {rec.currency} {rec.price.toLocaleString()}
                    </div>
                  </div>
                  <Button variant="link" className="px-0 text-xs tracking-widest text-foreground hover:text-primary mt-4">
                    DETAILS <ArrowRight className="w-3 h-3 ml-2" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Social / Editorial */}
      <section className="container mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative h-[700px]">
            <Image
              src="https://picsum.photos/seed/editorial/800/1000"
              alt="Editorial"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
          <div className="space-y-10">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary">Editorial</span>
            <h2 className="text-5xl font-headline font-bold leading-tight">The Art of <br /> Bespoke Mastery</h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Peek inside our clandestine workshops where time stands still and excellence is the only standard. Each piece carries the whisper of a thousand touches, a narrative of passion and precision.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div className="space-y-2">
                <span className="text-4xl font-headline text-primary font-bold">100+</span>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Master Artisans</p>
              </div>
              <div className="space-y-2">
                <span className="text-4xl font-headline text-primary font-bold">5</span>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Global Ateliers</p>
              </div>
            </div>
            <Button size="lg" className="bg-transparent border border-foreground text-foreground hover:bg-foreground hover:text-background h-14 px-10 rounded-none text-xs tracking-widest font-bold">
              READ THE JOURNAL
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
