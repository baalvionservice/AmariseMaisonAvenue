'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { PRODUCTS, COLLECTIONS, COUNTRIES, getLocalizedMockText } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Crown, ShieldCheck, BookOpen } from 'lucide-react';
import { generateProductRecommendations } from '@/ai/flows/generate-product-recommendations';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

/**
 * HomePage: Redesigned for a light, elegant, editorial luxury feel.
 * Centered content overlays, airy typography, and sophisticated gold/plum accents.
 */
export default function HomePage() {
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES.us;
  const { activeVip, editorials } = useAppStore();
  
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(true);

  const latestEditorial = editorials.find(ed => ed.country === countryCode) || editorials[0];

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
    <div className="space-y-32 bg-ivory min-h-screen">
      {/* Cinematic Hero - Redesigned for Light Editorial Look */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/amarise-hero-light/2560/1440" 
          alt="Amarisé Luxe Heritage Presentation"
          fill
          className="object-cover opacity-90 animate-slow-zoom"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 cinematic-gradient" />
        <div className="relative z-10 text-center space-y-12 max-w-4xl px-6 py-12 luxury-blur rounded-sm shadow-luxury">
          <div className="animate-fade-in opacity-0 [animation-delay:200ms] space-y-6">
            <div className="flex items-center justify-center space-x-6">
              <div className="w-16 h-px bg-gold" />
              <span className="text-[12px] font-bold tracking-[0.5em] uppercase text-plum">
                Atelier Amarisé | {currentCountry.name}
              </span>
              <div className="w-16 h-px bg-gold" />
            </div>
            <h1 className="text-6xl md:text-8xl font-headline font-bold text-gray-900 leading-tight tracking-tight">
              {getLocalizedMockText('Timeless', countryCode)} <br /> 
              <span className="italic font-normal serif text-gold">{getLocalizedMockText('Elegance', countryCode)}</span>
            </h1>
          </div>
          <div className="animate-fade-in opacity-0 [animation-delay:400ms]">
            <p className="text-lg md:text-xl text-gray-600 font-light max-w-xl mx-auto leading-relaxed tracking-wide">
              {activeVip 
                ? `Welcome back, ${activeVip.name}. We have prepared your private viewing for the ${currentCountry.name} market.`
                : `Crafting artifacts of desire for ${currentCountry.name}'s most discerning individuals. Hand-sculpted heritage, redefined for the contemporary era.`
              }
            </p>
          </div>
          <div className="animate-fade-in opacity-0 [animation-delay:600ms] flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <Link href={`/${countryCode}/category/apparel`}>
              <Button className="bg-gold text-gray-900 hover:shadow-gold-glow hover:scale-105 px-14 h-16 rounded-sm text-[11px] tracking-[0.4em] font-bold transition-all">
                {getLocalizedMockText('VIEW SELECTION', countryCode)}
              </Button>
            </Link>
            <Button variant="outline" className="border-plum text-plum hover:bg-plum hover:text-white px-14 h-16 rounded-sm text-[11px] tracking-[0.4em] font-bold transition-all">
              {activeVip ? "REQUEST CONCIERGE" : getLocalizedMockText("OUR HERITAGE", countryCode)}
            </Button>
          </div>
        </div>
      </section>

      {/* From The Journal - Light Editorial Spacing */}
      {latestEditorial && (
        <section className="container mx-auto px-6 py-24">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2 relative aspect-[4/5] overflow-hidden rounded-lg shadow-luxury group">
              <Image 
                src={latestEditorial.imageUrl} 
                alt={latestEditorial.title} 
                fill 
                className="object-cover transition-transform duration-[3s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-lavender/10 group-hover:bg-transparent transition-colors" />
            </div>
            <div className="lg:w-1/2 space-y-10">
              <div className="flex items-center space-x-4 text-plum">
                <BookOpen className="w-8 h-8" />
                <span className="text-[12px] font-bold tracking-[0.5em] uppercase">From The Journal</span>
              </div>
              <h2 className="text-5xl font-headline font-bold italic leading-tight text-gray-900 border-l-4 border-gold pl-8">{latestEditorial.title}</h2>
              <p className="text-xl text-gray-600 font-light leading-relaxed italic max-w-xl">
                {latestEditorial.excerpt}
              </p>
              <div className="pt-8">
                 <Link href={`/${countryCode}/journal/${latestEditorial.id}`}>
                    <Button className="bg-gold text-gray-900 hover:shadow-gold-glow h-16 px-14 rounded-sm text-[11px] tracking-[0.4em] font-bold transition-all">
                      READ THE NARRATIVE
                    </Button>
                 </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* VIP Private Atelier - Light Lavender Aesthetic */}
      {activeVip && (
        <section className="bg-lavender/5 py-32 border-y border-border">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="lg:w-1/3 space-y-8">
                <div className="flex items-center space-x-4 text-gold">
                  <Crown className="w-10 h-10" />
                  <span className="text-[12px] font-bold tracking-[0.5em] uppercase text-plum">Private Atelier</span>
                </div>
                <h2 className="text-5xl font-headline font-bold italic text-gray-900">Curated for <br />{activeVip.name}</h2>
                <p className="text-gray-600 font-light leading-relaxed italic">
                  Each piece in this selection has been hand-vetted by our master artisans to complement your bespoke status.
                </p>
                <div className="pt-6 border-t border-gold/30 space-y-4">
                  <div className="flex items-center space-x-3 text-[11px] uppercase tracking-widest text-gold font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Bespoke Access Enabled</span>
                  </div>
                  <Button className="w-full bg-plum text-white border border-gold hover:bg-gold hover:text-gray-900 h-14 rounded-sm text-[11px] tracking-widest font-bold transition-all">
                    ACCESS PRIVATE VAULT
                  </Button>
                </div>
              </div>
              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
                 {COLLECTIONS.filter(c => activeVip.assignedCollections.includes(c.id)).map(col => (
                   <Link key={col.id} href={`/${countryCode}/collection/${col.id}`} className="group relative aspect-video overflow-hidden rounded-lg shadow-luxury border border-border">
                     <Image src={col.imageUrl} alt={col.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 50vw" />
                     <div className="absolute inset-0 bg-lavender/20 group-hover:bg-transparent transition-colors" />
                     <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-4">
                        <span className="text-gold text-[10px] font-bold tracking-[0.5em] uppercase drop-shadow-md">Private Preview</span>
                        <h3 className="text-3xl font-headline font-bold italic text-white drop-shadow-lg">{col.name}</h3>
                        <div className="w-16 h-px bg-gold/60" />
                        <p className="text-[11px] text-white uppercase tracking-widest font-bold drop-shadow-md">Enter Gallery</p>
                     </div>
                   </Link>
                 ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* AI Recommendations - Clean Grid */}
      <section className="container mx-auto px-6 py-24">
        <div className="flex flex-col items-center text-center space-y-6 mb-24">
           <div className="p-6 bg-gold/10 rounded-full">
              <Sparkles className="w-8 h-8 text-gold" />
           </div>
           <div>
              <h2 className="text-5xl font-headline font-bold text-gray-900 tracking-tight">Personalized for You</h2>
              <p className="text-gray-400 text-sm uppercase tracking-[0.4em] font-bold mt-2">Refined Insights for {currentCountry.name}</p>
           </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {loadingRecs ? (
            [...Array(3)].map((_, i) => <div key={i} className="aspect-[4/5] bg-white rounded-lg border border-border animate-pulse" />)
          ) : (
            recommendations.map(rec => (
              <div key={rec.id} className="group space-y-8 animate-fade-in">
                <div className="relative aspect-[4/5] overflow-hidden bg-white rounded-lg border border-border shadow-luxury hover:shadow-md transition-shadow">
                   <Image src={rec.imageUrl} alt={rec.name} fill className="object-cover transition-transform duration-700 group-hover:scale-103" sizes="(max-width: 768px) 100vw, 33vw" />
                   <div className="absolute inset-0 bg-gradient-to-t from-lavender/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-3 text-center">
                   <span className="text-plum text-[10px] font-bold tracking-[0.4em] uppercase">{rec.category}</span>
                   <h3 className="text-2xl font-headline italic text-gray-900 group-hover:text-gold transition-colors">{rec.name}</h3>
                   <p className="text-xl font-light tracking-tighter text-gray-500">{currentCountry.symbol} {rec.price.toLocaleString()}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-ivory py-40 text-center space-y-12">
        <div className="max-w-2xl mx-auto space-y-8">
           <h3 className="text-4xl font-headline font-bold italic text-gray-900">Experience Excellence</h3>
           <p className="text-gray-600 font-light leading-relaxed">
             Join the world of AMARISÉ Luxe. Receive private invitations to global launches and bespoke artisanal events.
           </p>
           <Button className="bg-gold text-gray-900 hover:shadow-gold-glow px-16 h-16 rounded-sm text-[11px] tracking-[0.4em] font-bold">
             SUBSCRIBE TO THE MAISON
           </Button>
        </div>
      </section>
    </div>
  );
}
