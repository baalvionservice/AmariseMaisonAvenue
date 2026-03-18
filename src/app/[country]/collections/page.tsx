
'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { ChevronRight, Ban, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * CollectionsPage: The high-fidelity directory of Maison curations.
 * Matches design reference with structural circular assets and minimalist typography.
 */
export default function CollectionsPage() {
  const { country } = useParams();
  const { collections, products } = useAppStore();
  const countryCode = (country as string) || 'us';

  return (
    <div className="bg-white min-h-screen pb-40 relative">
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-[11px] font-medium text-gray-500 mb-12">
          <Link href={`/${countryCode}`} className="hover:text-black transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black">Collections</span>
        </nav>

        {/* Page Title */}
        <h1 className="text-6xl font-headline font-medium text-black mb-24">Collections</h1>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-32">
          {collections.map((col) => {
            const count = products.filter(p => p.collectionId === col.id).length;
            return (
              <div key={col.id} className="flex flex-col items-center text-center space-y-10 group">
                {/* Circular Structural Asset */}
                <Link href={`/${countryCode}/collection/${col.id}`} className="relative w-64 h-64 rounded-full bg-[#f8f8f8] flex flex-col items-center justify-center border border-gray-100 transition-transform duration-500 group-hover:scale-105">
                  <Ban className="w-16 h-16 text-gray-200 mb-2 stroke-[1px]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 italic">No image</span>
                </Link>

                {/* Info & CTA */}
                <div className="space-y-8 w-full flex flex-col items-center">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-headline font-bold text-black uppercase tracking-tight">{col.name}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{count} products</p>
                  </div>
                  
                  <Link href={`/${countryCode}/collection/${col.id}`} className="w-full max-w-[200px]">
                    <Button variant="outline" className="w-full h-12 rounded-none border-black text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-all">
                      SHOP NOW
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating App Badge */}
      <div className="fixed bottom-8 left-8 z-[60]">
        <button className="flex items-center space-x-3 bg-gradient-to-r from-[#e8def8] to-[#f3e8f5] px-5 py-3 rounded-full shadow-lg border border-white/50 hover:shadow-xl transition-all group">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center shadow-sm">
            <Smartphone className="w-5 h-5 text-gray-800" />
          </div>
          <span className="text-[10px] font-bold tracking-widest text-gray-800 uppercase">
            GET OUR APP • $300 OFF
          </span>
        </button>
      </div>
    </div>
  );
}
