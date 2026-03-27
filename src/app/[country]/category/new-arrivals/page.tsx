
'use client';

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { PRODUCTS, formatPrice } from '@/lib/mock-data';
import { ProductCard } from '@/components/product/ProductCard';
import { ChevronRight, Filter, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import placeholderData from '@/app/lib/placeholder-images.json';

export default function NewArrivalsPage() {
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  
  // Simulated "New" logic: take the first 12 products
  const newProducts = useMemo(() => {
    return PRODUCTS.slice(0, 12);
  }, []);

  const bannerImage = placeholderData.placeholderImages.find(i => i.id === 'mega-new-arrivals')?.imageUrl || '';

  return (
    <div className="bg-white min-h-screen pb-40 font-body animate-fade-in">
      {/* Cinematic Header */}
      <section className="relative h-[60vh] w-full flex items-end overflow-hidden border-b border-gray-100 bg-[#f8f8f8]">
        <Image 
          src={bannerImage} 
          alt="New Arrivals" 
          fill 
          className="object-cover opacity-80" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
        <div className="container mx-auto px-12 pb-24 relative z-10 max-w-[1600px]">
          <nav className="flex items-center space-x-2 text-[10px] tracking-[0.4em] uppercase text-gray-900 mb-8 font-bold">
            <Link href={`/${countryCode}`} className="hover:text-plum transition-colors">Maison</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-black">New Arrivals</span>
          </nav>
          <div className="space-y-6">
            <span className="text-plum text-[10px] font-bold tracking-[0.6em] uppercase">Just Arrived</span>
            <h1 className="text-7xl md:text-9xl font-headline font-bold italic text-gray-900 leading-[0.8] tracking-tighter">
              New Arrivals
            </h1>
            <p className="text-xl text-gray-500 font-light italic max-w-2xl leading-relaxed">
              "A fresh perspective on heritage. Explore the latest curations to arrive in our global ateliers."
            </p>
          </div>
        </div>
      </section>

      {/* Discovery Registry */}
      <div className="container mx-auto px-12 py-24 max-w-[1600px]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-gray-100 pb-12 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-plum">
              <Sparkles className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase tracking-[0.5em]">The Selection</span>
            </div>
            <h2 className="text-5xl font-headline font-bold italic text-gray-900 leading-none">Freshly Audited Artifacts</h2>
          </div>
          <div className="flex items-center space-x-12">
            <button className="flex items-center space-x-3 text-[11px] font-bold tracking-[0.3em] text-gray-900 hover:text-plum transition-all uppercase">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{newProducts.length} Results</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
          {newProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Tactical Footer */}
        <div className="mt-40 pt-40 border-t border-gray-100 flex flex-col items-center space-y-12 text-center">
           <div className="p-10 bg-ivory border border-gray-50 rounded-full shadow-inner">
              <Sparkles className="w-12 h-12 text-gold/30" />
           </div>
           <div className="space-y-6 max-w-2xl">
              <h3 className="text-4xl font-headline font-bold italic tracking-tight">The Heritage Registry</h3>
              <p className="text-lg text-gray-500 font-light italic leading-relaxed">
                "Our curators are constantly sourcing rare artifacts from private archives globally. Return often to discover the absolute standard of luxury."
              </p>
           </div>
           <Link href={`/${countryCode}/account/login`}>
              <button className="h-16 px-16 bg-black text-white hover:bg-plum transition-all text-[10px] font-bold uppercase tracking-[0.4em] shadow-2xl">
                JOIN THE VIP LIST
              </button>
           </Link>
        </div>
      </div>
    </div>
  );
}
