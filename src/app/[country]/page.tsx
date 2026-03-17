
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { PRODUCTS, COLLECTIONS, COUNTRIES } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Crown, ShieldCheck } from 'lucide-react';
import { generateProductRecommendations } from '@/ai/flows/generate-product-recommendations';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

/**
 * HomePage: The Cinematic Flagship.
 * Optimized for LCP and visual impact with localized AI curation.
 * Features VIP-exclusive Private Atelier sections for assigned clients.
 */
export default function HomePage() {
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES.us;
  const { activeVip } = useAppStore();
  
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [vipRecs, setVipRecs] = useState<any[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(true);

  useEffect(() => {
    async function loadRecs() {
      try {
        const scenario = activeVip 
          ? `Personalized curations for ${activeVip.name}, a ${activeVip.tier} tier client in ${currentCountry.name}.`
          : `A discerning luxury shopper in ${currentCountry.name} seeking iconic heritage pieces.`;

        const [general, vip] = await Promise.all([
          generateProductRecommendations({ scenario }),
          generateProductRecommendations({
            scenario: `A VIP collector in ${currentCountry.name} looking for the most exclusive limited release items.`,
          })
        ]);
        setRecommendations(general.recommendations.slice(0, 3));
        setVipRecs(vip.recommendations.slice(0, 3));
      } catch (e) {
        console.error("Personalization error:", e);
      } finally {
        setLoadingRecs(false);
      }
    }
    loadRecs();
  }, [countryCode, currentCountry.name, activeVip]);

  return (
    <div className="space-y-32">
      {/* Cinematic Hero */}
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
              <span className="text-[11px] font-bold tracking-[0.6em] uppercase text-primary">Atelier Amarisé | Paris</span>
              <div className="w-12 h-px bg-primary" />
            </div>
            <h1 className="text-8xl md:text-[10rem] font-headline font-bold text-white leading-[0.85] tracking-tighter">
              Timeless <br /> <span className="italic font-normal serif text-primary/90">Elegance</span>
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
                VIEW SELECTION
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white/40 text-white hover:bg-white hover:text-background px-14 h-16 rounded-none text-[10px] tracking-[0.4em] font-bold transition-all">
              {activeVip ? "REQUEST CONCIERGE" : "OUR HERITAGE"}
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
                Each piece in this selection has been hand-vetted by our master artisans to complement your {activeVip.tier} tier status and historical preferences.
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
                   <Image src={col.imageUrl} alt={col.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
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

      {/* Curated Chapters */}
      <section className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6">
          <div className="space-y-4">
            <span className="text-primary text-[10px] font-bold tracking-[0.5em] uppercase">The Selection</span>
            <h2 className="text-6xl font-headline font-bold">Curated Chapters</h2>
            <p className="text-muted-foreground max-w-xl font-light text-lg italic">
              "Every piece is a narrative, meticulously assembled for the soul that seeks more than just beauty."
            </p>
          </div>
          <Link href={`/${countryCode}/category/apparel`} className="text-[10px] font-bold tracking-[0.3em] uppercase border-b border-primary pb-2 hover:text-primary transition-all">
            Explore All Departments
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {COLLECTIONS.filter(c => !c.isPrivate || (activeVip && activeVip.assignedCollections.includes(c.id))).map((col, idx) => (
            <Link 
              key={col.id} 
              href={`/${countryCode}/collection/${col.id}`}
              className={cn(
                "group relative h-[650px] overflow-hidden bg-card transition-all duration-1000 hover:shadow-2xl border border-border/20 hover-lift",
                idx === 1 && "md:translate-y-20"
              )}
            >
              <Image 
                src={col.imageUrl} 
                alt={col.name}
                fill
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-700" />
              <div className="absolute bottom-12 left-12 right-12 space-y-6">
                <div className="space-y-2">
                  <span className="text-primary text-[9px] font-bold tracking-[0.4em] uppercase">{col.isPrivate ? "VIP Private Access" : "Maison Exclusive"}</span>
                  <h3 className="text-4xl font-headline text-white italic">{col.name}</h3>
                </div>
                <p className="text-xs text-gray-300 font-light opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 line-clamp-2">
                  {col.description}
                </p>
                <div className="inline-flex items-center text-[10px] font-bold tracking-[0.3em] text-white uppercase border-b border-white pb-1 group-hover:text-primary group-hover:border-primary transition-colors">
                  Enter Gallery <ArrowRight className="w-3 h-3 ml-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* AI Intelligence Section */}
      <section className="bg-card py-48 border-y border-border/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center space-x-8 mb-24">
            <div className="p-6 bg-primary/10 rounded-full border border-primary/20 shadow-2xl shadow-primary/10">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h2 className="text-5xl font-headline font-bold">{activeVip ? `Personalized for ${activeVip.name.split(' ')[0]}` : "Personalized for You"}</h2>
              <p className="text-lg text-muted-foreground font-light italic mt-2">
                Intelligent selections based on the current market trends in {COUNTRIES[countryCode]?.name}.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {loadingRecs ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="space-y-8 animate-pulse">
                  <div className="aspect-[4/5] bg-muted border border-border/20" />
                  <div className="space-y-4">
                    <div className="h-4 bg-muted w-1/3" />
                    <div className="h-8 bg-muted w-3/4" />
                  </div>
                </div>
              ))
            ) : (
              recommendations.map((rec) => (
                <div key={rec.id} className="group relative space-y-8 hover-lift">
                  <div className="aspect-[4/5] overflow-hidden relative bg-muted shadow-2xl border border-border/20">
                    <Image 
                      src={rec.imageUrl} 
                      alt={rec.name}
                      fill
                      className="object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
                    {rec.isVip && (
                      <div className="absolute top-6 left-6 bg-primary px-3 py-1 text-[9px] font-bold tracking-[0.2em] text-white uppercase shadow-lg z-10 luxury-blur bg-opacity-80">
                        VIP Edition
                      </div>
                    )}
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase">{rec.category}</span>
                      <h3 className="text-3xl font-headline italic">{rec.name}</h3>
                    </div>
                    <div className="pt-4 flex items-center justify-between border-t border-border/40">
                      <span className="text-2xl font-light tracking-tighter">
                        {rec.currency} {rec.price.toLocaleString()}
                      </span>
                      <Button variant="link" className="px-0 text-[10px] tracking-[0.3em] font-bold text-foreground hover:text-primary uppercase group/btn">
                        Discover <ArrowRight className="w-3 h-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Brand Ethos */}
      <section className="container mx-auto px-6 mb-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="relative h-[850px] w-full group overflow-hidden shadow-[0_0_100px_rgba(102,38,204,0.15)]">
            <Image 
              src="https://picsum.photos/seed/editorial-main-hq/1440/1920"
              alt="Artisanal Excellence at Amarisé"
              fill
              className="object-cover transition-transform duration-[2s] group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-1000" />
            <div className="absolute inset-0 border-[20px] border-background m-10 pointer-events-none" />
          </div>
          <div className="space-y-16">
            <div className="space-y-6">
              <span className="text-[12px] font-bold tracking-[0.6em] uppercase text-primary">The Journal</span>
              <h2 className="text-7xl font-headline font-bold leading-[0.9] italic">The Soul <br /> of the Craft</h2>
            </div>
            <p className="text-xl text-muted-foreground font-light leading-relaxed tracking-wide">
              Within the clandestine walls of our ateliers, time follows a different tempo. Our artisans do not just assemble; they breathe life into raw materials, creating artifacts that defy the ephemeral nature of fashion.
            </p>
            <div className="grid grid-cols-2 gap-16 pt-12 border-t border-border">
              <div className="space-y-3">
                <span className="text-6xl font-headline text-primary font-bold italic">150+</span>
                <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-bold">Master Craftsmen</p>
              </div>
              <div className="space-y-3">
                <span className="text-6xl font-headline text-primary font-bold italic">1924</span>
                <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-bold">Foundation</p>
              </div>
            </div>
            <Button size="lg" className="bg-transparent border border-foreground text-foreground hover:bg-foreground hover:text-background h-18 px-16 rounded-none text-[10px] tracking-[0.4em] font-bold transition-all">
              EXPLORE THE LEGACY
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
