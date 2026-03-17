
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { PRODUCTS, COLLECTIONS, COUNTRIES, getLocalizedMockText } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Crown, ShieldCheck } from 'lucide-react';
import { generateProductRecommendations } from '@/ai/flows/generate-product-recommendations';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

/**
 * HomePage: The Cinematic Flagship.
 * Optimized for LCP and visual impact with localized AI curation and multi-language support.
 * Uses priority loading for the hero to satisfy Core Web Vitals.
 */
export default function HomePage() {
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES.us;
  const { activeVip } = useAppStore();
  
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(true);

  useEffect(() => {
    async function loadRecs() {
      try {
        const scenario = activeVip 
          ? `Personalized curations for ${activeVip.name}, a ${activeVip.tier} tier client in ${currentCountry.name}. Market: ${countryCode}. Language: ${currentCountry.locale}.`
          : `A discerning luxury shopper in ${currentCountry.name} seeking iconic heritage pieces. Regional context: ${countryCode}.`;

        const res = await generateProductRecommendations({ scenario });
        setRecommendations(res.recommendations.slice(0, 3));
      } catch (e) {
        console.error("Personalization error:", e);
      } finally {
        setLoadingRecs(false);
      }
    }
    loadRecs();
  }, [countryCode, currentCountry.name, currentCountry.locale, activeVip]);

  return (
    <div className="space-y-32">
      {/* Cinematic Hero - Priority Loaded for LCP */}
      <section className="relative h-[98vh] w-full flex items-center justify-center overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/amarise-hero-main-hq/2560/1440" 
          alt="Amarisé Luxe Heritage Presentation"
          fill
          className="object-cover opacity-70 animate-slow-zoom"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 cinematic-gradient" />
        <div className="relative z-10 text-center space-y-12 max-w-5xl px-6">
          <div className="animate-fade-in opacity-0 [animation-delay:200ms] space-y-6">
            <div className="flex items-center justify-center space-x-4 mb-2">
              <div className="w-12 h-px bg-primary" />
              <span className="text-[11px] font-bold tracking-[0.6em] uppercase text-primary">
                Atelier Amarisé | {currentCountry.name === 'United States' ? 'New York' : currentCountry.name === 'France' ? 'Paris' : 'Global Hub'}
              </span>
              <div className="w-12 h-px bg-primary" />
            </div>
            <h1 className="text-8xl md:text-[10rem] font-headline font-bold text-white leading-[0.85] tracking-tighter">
              {getLocalizedMockText('Timeless', countryCode)} <br /> 
              <span className="italic font-normal serif text-primary/90">{getLocalizedMockText('Elegance', countryCode)}</span>
            </h1>
          </div>
          <div className="animate-fade-in opacity-0 [animation-delay:400ms]">
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-xl mx-auto leading-relaxed tracking-wide">
              {activeVip 
                ? `Welcome back, ${activeVip.name}. We have prepared your private viewing for the ${currentCountry.name} market.`
                : `Crafting artifacts of desire for ${currentCountry.name}'s most discerning individuals. Hand-sculpted heritage, redefined for the contemporary era.`
              }
            </p>
          </div>
          <div className="animate-fade-in opacity-0 [animation-delay:600ms] flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <Link href={`/${countryCode}/category/apparel`}>
              <Button size="lg" className="bg-primary hover:bg-secondary text-white px-14 h-16 rounded-none text-[10px] tracking-[0.4em] font-bold shadow-2xl transition-all hover:-translate-y-1">
                {getLocalizedMockText('VIEW SELECTION', countryCode)}
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white/40 text-white hover:bg-white hover:text-background px-14 h-16 rounded-none text-[10px] tracking-[0.4em] font-bold transition-all">
              {activeVip ? "REQUEST CONCIERGE" : getLocalizedMockText("OUR HERITAGE", countryCode)}
            </Button>
          </div>
        </div>
      </section>

      {/* VIP Private Atelier Section */}
      {activeVip && (
        <section className="container mx-auto px-6 border-y border-primary/20 bg-primary/5 py-32 animate-fade-in">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/3 space-y-8">
              <div className="flex items-center space-x-4 text-primary">
                <Crown className="w-10 h-10" />
                <span className="text-[12px] font-bold tracking-[0.4em] uppercase">Private Atelier</span>
              </div>
              <h2 className="text-5xl font-headline font-bold italic">Curated for <br />{activeVip.name}</h2>
              <p className="text-muted-foreground font-light leading-relaxed italic">
                {getLocalizedMockText('Each piece in this selection has been hand-vetted by our master artisans to complement your bespoke status.', countryCode)}
              </p>
              <div className="pt-6 border-t border-primary/20 space-y-4">
                <div className="flex items-center space-x-3 text-[10px] uppercase tracking-widest text-primary font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Bespoke Access Enabled</span>
                </div>
                <Button className="w-full bg-primary hover:bg-secondary h-14 rounded-none text-[10px] tracking-widest font-bold">
                  ACCESS PRIVATE VAULT
                </Button>
              </div>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
               {COLLECTIONS.filter(c => activeVip.assignedCollections.includes(c.id)).map(col => (
                 <Link key={col.id} href={`/${countryCode}/collection/${col.id}`} className="group relative aspect-video overflow-hidden border border-primary/30">
                   <Image src={col.imageUrl} alt={col.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" sizes="(max-width: 1024px) 100vw, 50vw" />
                   <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                   <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-4">
                      <span className="text-primary text-[9px] font-bold tracking-[0.4em] uppercase">Private Preview</span>
                      <h3 className="text-3xl font-headline font-bold italic text-white">{col.name}</h3>
                      <div className="w-12 h-px bg-white/40" />
                      <p className="text-[10px] text-white/80 uppercase tracking-widest">Enter Gallery</p>
                   </div>
                 </Link>
               ))}
            </div>
          </div>
        </section>
      )}

      {/* AI Recommendations */}
      <section className="container mx-auto px-6">
        <div className="flex items-center space-x-8 mb-24">
           <div className="p-6 bg-primary/10 rounded-full">
              <Sparkles className="w-8 h-8 text-primary" />
           </div>
           <div>
              <h2 className="text-4xl font-headline font-bold">Personalized for You</h2>
              <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold mt-1">Refined Insights for {currentCountry.name}</p>
           </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {loadingRecs ? (
            [...Array(3)].map((_, i) => <div key={i} className="aspect-[4/5] bg-muted animate-pulse" />)
          ) : (
            recommendations.map(rec => (
              <div key={rec.id} className="group space-y-6">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted border border-border">
                   <Image src={rec.imageUrl} alt={rec.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                   <div className="absolute bottom-6 left-6 right-6 p-4 luxury-blur bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-[10px] text-white font-bold uppercase tracking-widest text-center">In Stock: {currentCountry.code.toUpperCase()}</p>
                   </div>
                </div>
                <div className="space-y-2">
                   <span className="text-primary text-[10px] font-bold tracking-widest uppercase">{rec.category}</span>
                   <h3 className="text-2xl font-headline italic">{rec.name}</h3>
                   <p className="text-lg font-light tracking-tighter">{currentCountry.symbol} {rec.price.toLocaleString()}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
