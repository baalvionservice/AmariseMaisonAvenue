
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { COUNTRIES } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Zap,
  FlaskConical,
  Lock,
  Eye,
  Crown,
  ShieldCheck,
  Sparkles,
  Play
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

/**
 * Maison Homepage: The Institutional Front Door.
 * Redesigned for a cinematic, high-luxury aesthetic.
 */
export default function HomePage() {
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES.us;
  const { activeVip, products } = useAppStore();
  
  const heroImage = PlaceHolderImages.find(img => img.id === 'home-hero-auction')?.imageUrl || 'https://picsum.photos/seed/amarise-hero/2560/1440';
  const masteryImage = PlaceHolderImages.find(img => img.id === 'home-mastery')?.imageUrl || 'https://picsum.photos/seed/mastery/1200/1500';

  return (
    <div className="space-y-0 bg-white min-h-screen pb-40 animate-fade-in font-body">
      {/* 1. Cinematic Hero: The Horizon of Acquisition */}
      <section className="relative h-[95vh] w-full flex items-end overflow-hidden" aria-label="Heritage Horizon">
        <Image 
          src={heroImage} 
          alt="Maison Amarisé Heritage Registry"
          fill
          className="object-cover animate-slow-zoom transition-transform duration-[10s]"
          priority
          sizes="100vw"
          data-ai-hint="luxury auction"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Floating Brand Mark */}
        <div className="absolute top-12 left-12 z-20 hidden lg:block">
           <div className="flex flex-col items-start border-l border-white/30 pl-6 py-2">
              <span className="text-[10px] font-bold tracking-[0.6em] text-white uppercase">Est. 1924</span>
              <span className="text-[10px] font-bold tracking-[0.6em] text-gold uppercase mt-1">Paris Flagship</span>
           </div>
        </div>

        <div className="container mx-auto px-12 pb-32 relative z-10 text-white max-w-[1600px]">
          <div className="space-y-12 max-w-4xl">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 mb-4">
                 <div className="h-px w-12 bg-gold" />
                 <span className="text-[11px] font-bold tracking-[0.6em] uppercase text-gold">The Standard of the Absolute</span>
              </div>
              <h1 className="text-7xl md:text-[130px] font-headline font-medium leading-[0.8] tracking-tighter italic">
                Heritage <br /> <span className="pl-20">Registry</span>
              </h1>
            </div>
            <p className="text-2xl md:text-3xl font-light italic opacity-90 max-w-2xl leading-relaxed font-headline">
              "Beyond the artifact lies the provenance. Curating the private transfer of human brilliance for the world's most discerning collectors."
            </p>
            <div className="pt-10 flex flex-col sm:flex-row gap-8">
              <Link href={`/${countryCode}/category/hermes`}>
                <Button className="bg-white text-black hover:bg-gold hover:text-white px-20 h-20 rounded-none text-[11px] font-bold tracking-[0.5em] transition-all shadow-2xl uppercase">
                  EXPLORE THE ARCHIVE
                </Button>
              </Link>
              <Link href={`/${countryCode}/appointments`}>
                <Button variant="outline" className="border-white/40 text-white hover:bg-white hover:text-black px-16 h-20 rounded-none text-[11px] font-bold tracking-[0.5em] transition-all uppercase">
                  BOOK PRIVATE VIEWING
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Institutional Ticker: The Global Pulse */}
      <section className="bg-[#050505] py-6 text-center border-y border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
           <span className="text-[10vw] font-headline font-bold text-white italic whitespace-nowrap">MARCH 1924 SERIES NOW ACTIVE</span>
        </div>
        <div className="container mx-auto relative z-10 flex items-center justify-center space-x-12">
           <div className="flex items-center space-x-3 text-gold">
              <Zap className="w-4 h-4 animate-pulse" />
              <span className="text-[9px] font-bold tracking-[0.5em] uppercase">Status: Registry Synchronized</span>
           </div>
           <Link 
            href={`/${countryCode}/journal`} 
            className="text-white/60 text-[9px] font-bold tracking-[0.4em] uppercase hover:text-gold transition-colors hidden md:block"
           >
            Specialist Access: Private Acquisition for the 1924 Heritage Series Now Active in {currentCountry.name}
           </Link>
        </div>
      </section>

      {/* 3. The Narrative: Mastery & Materiality */}
      <section className="container mx-auto px-12 py-60 max-w-[1600px] overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-32 lg:gap-60">
          <div className="lg:w-[45%] relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden shadow-luxury group bg-ivory">
              <Image 
                src={masteryImage} 
                alt="Artisanal Mastery" 
                fill 
                className="object-cover transition-transform duration-[5s] group-hover:scale-105 grayscale-[20%]"
                sizes="(max-width: 768px) 100vw, 50vw"
                data-ai-hint="haute couture"
              />
              <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none" />
            </div>
            {/* Absolute Deco Block */}
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-plum/5 -z-10 animate-pulse" />
          </div>
          
          <div className="lg:w-[55%] space-y-16 text-center lg:text-left">
            <div className="space-y-8">
              <div className="flex items-center justify-center lg:justify-start space-x-4 text-plum">
                 <ShieldCheck className="w-6 h-6" />
                 <span className="text-[11px] font-bold tracking-[0.6em] uppercase">Institutional Provenance</span>
              </div>
              <h2 className="text-6xl md:text-9xl font-headline font-medium italic text-gray-900 tracking-tighter leading-[0.85]">
                The standard <br /> of the absolute.
              </h2>
            </div>
            
            <div className="space-y-10">
               <p className="text-3xl text-gray-500 font-light leading-relaxed italic max-w-2xl font-headline border-l-2 border-plum/20 pl-12 mx-auto lg:mx-0">
                 "Our dialogue is not with the trend, but with the century. Every artifact in the Maison registry is audited for its contribution to the architectural legacy of human craft."
               </p>
               <div className="flex flex-col sm:flex-row items-center gap-12 pt-10">
                  <Link href={`/${countryCode}/about`} className="group flex items-center space-x-4">
                    <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-black border-b border-black pb-2 group-hover:text-plum group-hover:border-plum transition-all">
                      Our Institutional Heritage
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                  <Link href={`/${countryCode}/journal`} className="group flex items-center space-x-4">
                    <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-gray-400 group-hover:text-black transition-all">
                      Read the Journal
                    </span>
                  </Link>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Selection: Featured Artifacts */}
      <section className="bg-ivory/50 py-48 border-y border-gray-100">
         <div className="container mx-auto px-12 max-w-[1600px] space-y-32">
            <div className="flex flex-col md:row items-end justify-between gap-8 border-b border-gray-200 pb-16">
               <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gold">
                     <Crown className="w-6 h-6" />
                     <span className="text-[11px] font-bold tracking-[0.6em] uppercase">The Selection</span>
                  </div>
                  <h3 className="text-5xl md:text-7xl font-headline font-bold italic tracking-tighter">Rare Archive Entries</h3>
               </div>
               <Link href={`/${countryCode}/category/hermes`}>
                  <Button variant="outline" className="border-black rounded-none h-14 px-12 text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-black hover:text-white transition-all">
                    VIEW FULL REGISTRY
                  </Button>
               </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
               {products.slice(0, 3).map((prod, idx) => (
                 <Link key={prod.id} href={`/${countryCode}/product/${prod.id}`} className="group space-y-10">
                    <div className="relative aspect-[3/4] bg-white border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center p-12">
                       <Image 
                        src={prod.imageUrl} 
                        alt={prod.name} 
                        fill 
                        className="object-contain p-12 transition-transform duration-[2s] group-hover:scale-105" 
                       />
                       <div className="absolute inset-0 bg-black/[0.02] group-hover:bg-transparent transition-colors" />
                       <div className="absolute bottom-0 left-0 w-full p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-700 bg-white/90 backdrop-blur-md">
                          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-plum">Inquire for Private viewing</span>
                       </div>
                    </div>
                    <div className="space-y-4 text-center">
                       <span className="text-[10px] font-bold tracking-[0.5em] text-gray-400 uppercase">0{idx + 1} / {prod.categoryId.toUpperCase()}</span>
                       <h4 className="text-3xl font-headline font-bold italic text-gray-900 group-hover:text-plum transition-colors leading-tight px-8">{prod.name}</h4>
                       <div className="flex items-center justify-center space-x-4 pt-4">
                          <div className="h-px w-8 bg-gray-100" />
                          <span className="text-sm font-bold tracking-tighter tabular-nums">${prod.basePrice.toLocaleString()}</span>
                          <div className="h-px w-8 bg-gray-100" />
                       </div>
                    </div>
                 </Link>
               ))}
            </div>
         </div>
      </section>

      {/* 5. Dual-Persona Audit: The Acquisition Strategy */}
      <section className="container mx-auto px-12 py-60 max-w-7xl">
        <div className="text-center space-y-24">
          <div className="space-y-8 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-6 bg-plum/5 rounded-full mb-4">
              <FlaskConical className="w-10 h-10 text-plum" />
            </div>
            <h3 className="text-5xl md:text-7xl font-headline font-bold italic text-gray-900 tracking-tighter leading-none">Architectural Acquisition</h3>
            <p className="text-xl text-gray-500 font-light italic leading-relaxed">
              We have standardized our digital presence around two core persona flows optimized for transparency and narrative exclusivity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-8">
            <Link href={`/${countryCode}/product/prod-11`} className="group relative p-16 bg-white border border-gray-100 hover:border-black transition-all text-left space-y-8 shadow-sm overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                 <Eye className="w-64 h-64 text-black" />
              </div>
              <div className="flex items-center justify-between relative z-10">
                <div className="p-4 bg-ivory border border-gray-100 rounded-none text-gray-400 group-hover:text-black transition-colors">
                   <Eye className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-300">Strategy A</span>
              </div>
              <div className="space-y-4 relative z-10">
                <h4 className="text-4xl font-headline font-bold italic text-gray-900">The Institutional Registry</h4>
                <p className="text-sm text-gray-500 font-light italic leading-relaxed max-w-xs">
                  Normal Client Flow: High-density data grid optimized for technical transparency and marketplace trust.
                </p>
              </div>
              <div className="pt-8 flex items-center text-[10px] font-bold tracking-[0.4em] uppercase text-plum group-hover:translate-x-4 transition-transform relative z-10">
                AUDIT REGISTRY VIEW <ArrowRight className="w-4 h-4 ml-3" />
              </div>
            </Link>

            <Link href={`/${countryCode}/private-order/prod-11`} className="group relative p-16 bg-[#0A0A0B] border border-white/5 hover:border-gold transition-all text-left space-y-8 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Crown className="w-64 h-64 text-gold" />
              </div>
              <div className="flex items-center justify-between relative z-10">
                <div className="p-4 bg-white/5 border border-white/10 rounded-none text-gold">
                   <Lock className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">Strategy B</span>
              </div>
              <div className="space-y-4 relative z-10">
                <h4 className="text-4xl font-headline font-bold italic text-white">The Private Salon</h4>
                <p className="text-sm text-white/40 font-light italic leading-relaxed max-w-xs">
                  Elite Client Flow: Cinematic, narrative-first design reserved for VIP artifacts and bespoke curatorial briefs.
                </p>
              </div>
              <div className="pt-8 flex items-center text-[10px] font-bold tracking-[0.4em] uppercase text-gold group-hover:translate-x-4 transition-transform relative z-10">
                AUDIT SALON VIEW <ArrowRight className="w-4 h-4 ml-3" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Bespoke Services: The Private Curation */}
      <section className="bg-plum/5 py-48 border-t border-gray-100">
         <div className="container mx-auto px-12 max-w-[1600px] flex flex-col lg:flex-row items-center gap-32">
            <div className="lg:w-1/2 relative aspect-video w-full bg-black group overflow-hidden shadow-2xl">
               <Image 
                src="https://picsum.photos/seed/amarise-salon-view/1600/900" 
                alt="Maison Private Salon" 
                fill 
                className="object-cover opacity-60 transition-transform duration-[5s] group-hover:scale-105"
                data-ai-hint="exclusive interior"
               />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border-2 border-white/20 flex items-center justify-center backdrop-blur-md group-hover:bg-white/10 transition-all">
                     <Play className="w-8 h-8 text-white fill-white" />
                  </div>
               </div>
            </div>
            <div className="lg:w-1/2 space-y-12">
               <div className="space-y-6">
                  <div className="flex items-center space-x-4 text-plum">
                     <Sparkles className="w-6 h-6" />
                     <span className="text-[11px] font-bold tracking-[0.6em] uppercase">Private Atelier</span>
                  </div>
                  <h3 className="text-6xl font-headline font-bold italic text-gray-900 leading-tight">Live Digital <br /> Curation</h3>
                  <p className="text-xl text-gray-500 font-light italic leading-relaxed max-w-xl">
                    "Experience artisanal detail through our high-fidelity curatorial lens. Private viewing sessions allow for 4K macro inspection of provenance marks and material quality."
                  </p>
               </div>
               <div className="pt-6">
                  <Link href={`/${countryCode}/account/live`}>
                    <Button className="bg-black text-white hover:bg-plum px-16 h-16 rounded-none text-[11px] font-bold tracking-[0.4em] uppercase transition-all shadow-xl">
                      REQUEST LIVE SESSION
                    </Button>
                  </Link>
               </div>
            </div>
         </div>
      </section>

      {/* 7. Enrollment: The Global Network */}
      <section className="bg-white py-60 text-center border-t border-gray-100">
        <div className="max-w-4xl mx-auto space-y-20 px-12">
           <div className="inline-flex items-center justify-center p-6 bg-[#f9f7f9] rounded-full border border-plum/10">
              <Crown className="w-10 h-10 text-plum" />
           </div>
           <div className="space-y-8">
              <h3 className="text-6xl md:text-8xl font-headline font-medium italic text-gray-900 tracking-tighter">The Heritage Network</h3>
              <p className="text-gray-500 font-light leading-relaxed max-w-2xl mx-auto italic text-2xl font-headline">
                Join our verified collector network for private acquisition invitations, archival previews, and artisanal market intelligence.
              </p>
           </div>
           <form className="flex flex-col sm:flex-row items-center justify-center gap-0 border-b border-gray-900 pb-4 max-w-lg mx-auto focus-within:border-plum transition-colors group">
              <input 
                type="email" 
                placeholder="COLLECTOR EMAIL" 
                className="bg-transparent w-full py-4 text-xs font-bold tracking-widest uppercase outline-none placeholder:text-gray-200"
                required
              />
              <button type="submit" className="text-[11px] font-bold tracking-[0.5em] uppercase text-black hover:text-plum transition-colors py-4 px-6 flex items-center">
                ENROLL <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
           </form>
           <div className="flex flex-col items-center space-y-6">
              <p className="text-[10px] text-gray-300 uppercase tracking-[0.5em] font-medium">
                Audited compliance with the Global Heritage Charter.
              </p>
              <div className="flex items-center space-x-12 opacity-30 grayscale transition-all hover:grayscale-0 hover:opacity-100 cursor-help">
                 <ShieldCheck className="w-10 h-10" />
                 <Lock className="w-8 h-8" />
                 <Crown className="w-10 h-10" />
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
