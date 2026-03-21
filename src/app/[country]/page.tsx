
'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { COUNTRIES } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Crown, 
  Eye, 
  Lock,
  FlaskConical,
  Zap,
  Globe
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import Image from 'next/image';

/**
 * Maison Homepage: The Minimalist Luxury Entry.
 * Reverted to a high-fidelity, text-focused design that emphasizes heritage and personas.
 */
export default function HomePage() {
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES.us;
  const { products } = useAppStore();

  return (
    <div className="bg-white min-h-screen pb-40 animate-fade-in font-body">
      {/* 1. Minimalist Heritage Hero */}
      <section className="relative h-[75vh] w-full flex items-center justify-center bg-ivory border-b border-border overflow-hidden">
        {/* Subtle Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
           <span className="text-[25vw] font-headline font-bold text-black italic leading-none">1924</span>
        </div>
        
        <div className="relative z-10 text-center space-y-10 max-w-5xl px-6">
          <div className="space-y-4">
            <span className="text-[10px] font-bold tracking-[0.6em] text-plum uppercase">Est. 1924 | Paris Flagship</span>
            <h1 className="text-7xl md:text-[120px] font-headline font-medium text-gray-900 leading-[0.85] tracking-tighter italic">
              Amarisé Maison
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-500 font-light italic max-w-2xl mx-auto leading-relaxed font-headline">
            "Curating the world's most significant artifacts. A dialogue between human brilliance and the absolute standard of the archive."
          </p>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link href={`/${countryCode}/category/hermes`}>
              <Button className="bg-black text-white hover:bg-plum px-16 h-16 rounded-none text-[10px] font-bold tracking-[0.4em] uppercase transition-all shadow-xl">
                EXPLORE THE ARCHIVE
              </Button>
            </Link>
            <Link href={`/${countryCode}/appointments`}>
              <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white px-12 h-16 rounded-none text-[10px] font-bold tracking-[0.4em] uppercase transition-all">
                BOOK PRIVATE VIEWING
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Tactical Ticker */}
      <section className="bg-black py-4 border-y border-white/10">
        <div className="container mx-auto flex items-center justify-center space-x-12">
           <div className="flex items-center space-x-3 text-gold">
              <Zap className="w-3.5 h-3.5 animate-pulse" />
              <span className="text-[9px] font-bold tracking-[0.5em] uppercase">REGISTRY SYNC: ACTIVE</span>
           </div>
           <p className="text-white/40 text-[9px] font-bold tracking-[0.3em] uppercase hidden md:block">
             Specialist Access: 1924 Heritage Series Now Syncing in {currentCountry.name} Hub
           </p>
        </div>
      </section>

      {/* 3. Dual-Persona Acquisition Matrix */}
      <section className="container mx-auto px-12 py-40 max-w-7xl">
        <div className="text-center space-y-24">
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-5 bg-plum/5 rounded-full mb-4">
              <FlaskConical className="w-8 h-8 text-plum" />
            </div>
            <h3 className="text-5xl font-headline font-bold italic text-gray-900 tracking-tighter">The Acquisition Strategy</h3>
            <p className="text-lg text-gray-500 font-light italic leading-relaxed">
              Our digital presence is architected around two core flows optimized for technical transparency and narrative exclusivity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <Link href={`/${countryCode}/product/prod-11`} className="group relative p-16 bg-white border border-border hover:border-black transition-all text-left space-y-8 shadow-sm overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                 <Eye className="w-64 h-64 text-black" />
              </div>
              <div className="flex items-center justify-between relative z-10">
                <div className="p-4 bg-ivory border border-border rounded-none text-gray-400 group-hover:text-black transition-colors">
                   <Eye className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-300">Design A</span>
              </div>
              <div className="space-y-4 relative z-10">
                <h4 className="text-4xl font-headline font-bold italic text-gray-900">The Institutional Registry</h4>
                <p className="text-sm text-gray-500 font-light italic leading-relaxed max-w-xs">
                  Normal Collector Flow: High-density technical data grid optimized for marketplace trust and asset tracking.
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
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">Design B</span>
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

      {/* 4. Rare Archive Grid */}
      <section className="bg-ivory/30 py-48 border-y border-border">
         <div className="container mx-auto px-12 max-w-[1600px] space-y-24">
            <div className="flex flex-col md:row items-end justify-between gap-8">
               <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gold">
                     <Sparkles className="w-5 h-5" />
                     <span className="text-[11px] font-bold tracking-[0.6em] uppercase">The Selection</span>
                  </div>
                  <h3 className="text-5xl md:text-6xl font-headline font-bold italic tracking-tighter">Rare Archive Entries</h3>
               </div>
               <Link href={`/${countryCode}/category/hermes`} className="text-[10px] font-bold tracking-[0.4em] uppercase text-black hover:text-plum transition-all border-b border-black pb-2 flex items-center">
                 VIEW FULL REGISTRY <ArrowRight className="w-3.5 h-3.5 ml-2" />
               </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
               {products.slice(0, 3).map((prod, idx) => (
                 <Link key={prod.id} href={`/${countryCode}/product/${prod.id}`} className="group space-y-10">
                    <div className="relative aspect-[3/4] bg-white border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center p-12">
                       <div className="w-full h-full relative">
                          <Image 
                            src={prod.imageUrl} 
                            alt={prod.name} 
                            fill 
                            className="object-contain p-8 transition-transform duration-[2s] group-hover:scale-105" 
                          />
                       </div>
                       <div className="absolute inset-0 bg-black/[0.02] group-hover:bg-transparent transition-colors" />
                    </div>
                    <div className="space-y-4 text-center">
                       <span className="text-[10px] font-bold tracking-[0.5em] text-gray-400 uppercase">0{idx + 1} / {prod.categoryId.toUpperCase()}</span>
                       <h4 className="text-2xl font-headline font-bold italic text-gray-900 group-hover:text-plum transition-colors leading-tight px-8">{prod.name}</h4>
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

      {/* 5. Institutional Trust Footer */}
      <section className="bg-white py-60 text-center">
        <div className="max-w-4xl mx-auto space-y-20 px-12">
           <div className="inline-flex items-center justify-center p-6 bg-[#f9f7f9] rounded-full border border-plum/10">
              <ShieldCheck className="w-10 h-10 text-plum" />
           </div>
           <div className="space-y-8">
              <h3 className="text-6xl font-headline font-medium italic text-gray-900 tracking-tighter leading-none">Institutional Responsibility</h3>
              <p className="text-gray-500 font-light leading-relaxed max-w-2xl mx-auto italic text-2xl font-headline">
                Every enrollment in our verified collector network is audited against the Global Heritage Charter. We maintain absolute discretion for all private client archives.
              </p>
           </div>
           <div className="flex flex-col items-center space-y-6 pt-10">
              <div className="flex items-center space-x-12 opacity-30 grayscale transition-all hover:grayscale-0 hover:opacity-100 cursor-help">
                 <ShieldCheck className="w-10 h-10" />
                 <Lock className="w-8 h-8" />
                 <Globe className="w-10 h-10" />
              </div>
              <p className="text-[10px] text-gray-300 uppercase tracking-[0.5em] font-medium pt-4">
                Maison Amarisé Global Registry Hub
              </p>
           </div>
        </div>
      </section>
    </div>
  );
}
