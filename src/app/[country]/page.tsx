'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { PRODUCTS, COLLECTIONS, COUNTRIES, CATEGORIES, getLocalizedMockText } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Sparkles, 
  Crown, 
  ShieldCheck, 
  BookOpen, 
  Gem, 
  Watch, 
  Shirt, 
  ChevronRight 
} from 'lucide-react';
import { generateProductRecommendations } from '@/ai/flows/generate-product-recommendations';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { ProductCard } from '@/components/product/ProductCard';

/**
 * HomePage: AMARISÉ MAISON AVENUE
 * A light, airy, editorial luxury experience.
 */
export default function HomePage() {
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES.us;
  const { activeVip, editorials } = useAppStore();
  
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(true);

  const latestEditorial = editorials.find(ed => ed.country === countryCode) || editorials[0];
  const featuredCollections = COLLECTIONS.slice(0, 3);

  useEffect(() => {
    async function loadRecs() {
      try {
        const scenario = activeVip 
          ? `VIP curation for ${activeVip.name} in ${currentCountry.name}. Market: ${countryCode}. Focus on heritage and high-value artifacts.`
          : `Luxury discovery for a new client in ${currentCountry.name}. Seasonal and iconic pieces.`;

        const res = await generateProductRecommendations({ scenario });
        setRecommendations(res.recommendations.slice(0, 4));
      } catch (e) {
        console.error("Personalization error:", e);
      } finally {
        setLoadingRecs(false);
      }
    }
    loadRecs();
  }, [countryCode, currentCountry.name, activeVip]);

  return (
    <div className="space-y-32 bg-ivory min-h-screen pb-20">
      {/* Cinematic Hero - Maison Avenue Presentation */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/amarise-avenue-hero/2560/1440" 
          alt="Amarisé Maison Avenue Global Flagship"
          fill
          className="object-cover opacity-90 animate-slow-zoom"
          priority
        />
        <div className="absolute inset-0 cinematic-gradient" />
        <div className="relative z-10 text-center space-y-10 max-w-5xl px-6 py-16 luxury-blur border border-white/20 shadow-luxury">
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-px bg-gold/50" />
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-plum">
                Maison Avenue | {currentCountry.name}
              </span>
              <div className="w-12 h-px bg-gold/50" />
            </div>
            <h1 className="text-7xl md:text-9xl font-headline font-bold text-gray-900 leading-none">
              {getLocalizedMockText('The Art of', countryCode)} <br /> 
              <span className="italic font-normal serif text-gold">{getLocalizedMockText('Excellence', countryCode)}</span>
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed italic animate-fade-in [animation-delay:200ms]">
            "Curating the world's most exquisite treasures since 1924. A testament to human brilliance, craft, and the pursuit of timeless beauty."
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 animate-fade-in [animation-delay:400ms]">
            <Link href={`/${countryCode}/category/apparel`}>
              <Button className="bg-plum text-white hover:bg-gold hover:text-gray-900 px-16 h-16 rounded-none text-[10px] tracking-[0.4em] font-bold transition-all shadow-xl shadow-plum/10">
                {getLocalizedMockText('EXPLORE THE ATELIER', countryCode)}
              </Button>
            </Link>
            <Button variant="outline" className="border-gold text-gold hover:bg-gold/5 px-16 h-16 rounded-none text-[10px] tracking-[0.4em] font-bold transition-all">
              {getLocalizedMockText('OUR HERITAGE', countryCode)}
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Departments - Iconographic Grid */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <DepartmentCard 
            icon={<Shirt className="w-8 h-8" />} 
            title="Haute Couture" 
            desc="Bespoke tailoring and seasonal runways."
            href={`/${countryCode}/category/apparel`}
          />
          <DepartmentCard 
            icon={<Gem className="w-8 h-8" />} 
            title="Fine Jewelry" 
            desc="Rare stones and hand-sculpted gold."
            href={`/${countryCode}/category/jewelry`}
          />
          <DepartmentCard 
            icon={<Watch className="w-8 h-8" />} 
            title="Heritage Timepieces" 
            desc="Swiss precision and horological secrets."
            href={`/${countryCode}/category/timepieces`}
          />
        </div>
      </section>

      {/* Featured Collections - The Curated Edit */}
      <section className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center text-center space-y-6 mb-20">
           <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-plum">Seasonal Curations</span>
           <h2 className="text-5xl md:text-6xl font-headline font-bold italic text-gray-900">The Collection Edit</h2>
           <div className="w-20 h-px bg-gold" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredCollections.map((col, idx) => (
            <Link key={col.id} href={`/${countryCode}/collection/${col.id}`} className="group relative aspect-[3/4] overflow-hidden bg-white shadow-luxury">
              <Image 
                src={col.imageUrl} 
                alt={col.name} 
                fill 
                className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-12 text-center space-y-4">
                <span className="text-gold text-[10px] font-bold tracking-[0.5em] uppercase">Maison Exclusive</span>
                <h3 className="text-3xl font-headline font-bold text-white italic">{col.name}</h3>
                <div className="flex items-center text-white text-[9px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                  Reveal Piece <ArrowRight className="ml-2 w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Editorial Highlight - From The Journal */}
      {latestEditorial && (
        <section className="bg-lavender/5 py-32 border-y border-border">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-24">
              <div className="lg:w-1/2 relative aspect-[4/5] shadow-2xl">
                <Image 
                  src={latestEditorial.imageUrl} 
                  alt={latestEditorial.title} 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute -bottom-10 -right-10 w-64 h-80 bg-white p-8 shadow-luxury hidden xl:flex flex-col justify-between border border-border">
                   <span className="text-[9px] font-bold tracking-widest uppercase text-plum">Featured Extract</span>
                   <p className="text-sm font-light italic leading-relaxed text-gray-600 line-clamp-4">
                     {latestEditorial.excerpt}
                   </p>
                   <Link href={`/${countryCode}/journal/${latestEditorial.id}`} className="text-[10px] font-bold uppercase tracking-widest text-gold flex items-center">
                     Read Full Story <ChevronRight className="w-3 h-3 ml-1" />
                   </Link>
                </div>
              </div>
              <div className="lg:w-1/2 space-y-10">
                <div className="flex items-center space-x-4 text-plum">
                  <BookOpen className="w-6 h-6" />
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase">The Maison Journal</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-headline font-bold italic leading-tight text-gray-900">{latestEditorial.title}</h2>
                <div className="space-y-6 text-xl text-gray-500 font-light leading-relaxed italic max-w-xl border-l-2 border-gold/30 pl-8">
                  <p>{latestEditorial.excerpt}</p>
                </div>
                <div className="pt-8">
                   <Link href={`/${countryCode}/journal/${latestEditorial.id}`}>
                      <Button className="bg-plum text-white hover:bg-gold hover:text-gray-900 h-16 px-14 rounded-none text-[10px] tracking-[0.4em] font-bold transition-all">
                        ENTER THE NARRATIVE
                      </Button>
                   </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* VIP Preview Salon - Private Access Simulation */}
      <section className="container mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
             <div className="flex items-center space-x-3 text-gold">
                <Crown className="w-6 h-6" />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-plum">The Private Salon</span>
             </div>
             <h2 className="text-5xl font-headline font-bold text-gray-900">Curated Intelligence</h2>
             <p className="text-gray-400 text-xs uppercase tracking-[0.4em] font-bold">Personalized Artifacts for {currentCountry.name}</p>
          </div>
          <Link href={`/${countryCode}/wishlist`}>
            <Button variant="ghost" className="text-[10px] font-bold tracking-[0.3em] uppercase hover:text-gold">
              View Your Private Selection <ArrowRight className="ml-2 w-3 h-3" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {loadingRecs ? (
            [...Array(4)].map((_, i) => <div key={i} className="aspect-[3/4] bg-white border border-border animate-pulse" />)
          ) : (
            recommendations.map(rec => (
              <ProductCard key={rec.id} product={rec} />
            ))
          )}
        </div>
      </section>

      {/* Newsletter Signup - The Archive */}
      <section className="bg-white py-40 text-center border-t border-border">
        <div className="max-w-3xl mx-auto space-y-12 px-6">
           <div className="inline-flex items-center justify-center p-4 bg-plum/5 rounded-full mb-4">
              <Sparkles className="w-8 h-8 text-gold" />
           </div>
           <div className="space-y-4">
              <h3 className="text-4xl md:text-5xl font-headline font-bold italic text-gray-900">Join The Archive</h3>
              <p className="text-gray-500 font-light leading-relaxed max-w-xl mx-auto italic text-lg">
                Receive private invitations to seasonal launches, artisanal showcases, and digital premieres from the Maison Amarisé.
              </p>
           </div>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-0 border-b border-gray-900 pb-2 max-w-md mx-auto focus-within:border-gold transition-colors">
              <input 
                type="email" 
                placeholder="YOUR EMAIL ADDRESS" 
                className="bg-transparent w-full py-4 text-[10px] font-bold tracking-widest uppercase outline-none placeholder:text-gray-300"
              />
              <button className="text-[10px] font-bold tracking-[0.3em] uppercase text-plum hover:text-gold transition-colors py-4">
                SUBSCRIBE
              </button>
           </div>
           <p className="text-[8px] text-gray-400 uppercase tracking-widest">
             By subscribing, you agree to our Privacy Policy and Terms of Heritage.
           </p>
        </div>
      </section>
    </div>
  );
}

function DepartmentCard({ icon, title, desc, href }: { icon: React.ReactNode, title: string, desc: string, href: string }) {
  return (
    <Link href={href} className="group p-10 bg-white border border-border shadow-sm hover:shadow-luxury transition-all duration-500 text-center space-y-6">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-ivory rounded-full text-plum group-hover:bg-gold group-hover:text-white transition-colors duration-500">
        {icon}
      </div>
      <div className="space-y-2">
        <h4 className="text-xl font-headline font-bold text-gray-900 group-hover:text-gold transition-colors">{title}</h4>
        <p className="text-xs text-gray-400 font-light leading-relaxed px-4">{desc}</p>
      </div>
      <div className="pt-4 flex items-center justify-center text-[9px] font-bold tracking-widest uppercase text-plum opacity-0 group-hover:opacity-100 transition-opacity">
        Enter Gallery <ChevronRight className="w-3 h-3 ml-1" />
      </div>
    </Link>
  );
}
