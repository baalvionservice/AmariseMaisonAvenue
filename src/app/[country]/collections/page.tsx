'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { ChevronRight, Ban, Smartphone, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * CollectionsPage: Refined for a more compact and elegant presentation.
 */
export default function CollectionsPage() {
  const { country } = useParams();
  const { collections } = useAppStore();
  const countryCode = (country as string) || 'us';

  return (
    <div className="bg-white min-h-screen relative">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-[12px] font-normal text-gray-500 mb-6">
          <Link href={`/${countryCode}`} className="hover:text-black transition-colors">Home</Link>
          <span className="text-gray-300 font-light flex items-center justify-center">
            <ChevronRight className="w-3 h-3 mx-1" strokeWidth={1.5} />
          </span>
          <span className="text-gray-900">Collections</span>
        </nav>

        {/* Page Title */}
        <h1 className="text-5xl font-headline font-medium text-black mb-16 tracking-tight">
          Collections
        </h1>

        {/* Collections Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-24 mb-24">
          {collections.slice(0, 9).map((col) => {
            return (
              <div key={col.id} className="flex flex-col items-center text-center group">
                {/* Circular Structural Asset - Reduced size */}
                <Link href={`/${countryCode}/collection/${col.id}`} className="relative block mb-8">
                  <div className="relative w-52 h-52 rounded-full bg-[#f8f8f8] flex items-center justify-center border border-gray-100 transition-transform duration-500 group-hover:scale-105">
                    <Ban className="w-24 h-24 text-gray-100/60 stroke-[0.5px]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-[#262626] w-8 h-8 flex items-center justify-center shadow-lg">
                        <Plus className="w-5 h-5 text-white stroke-[2.5px]" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <span className="text-xl font-headline italic text-gray-300/70 tracking-tight block">No image</span>
                  </div>
                </Link>

                {/* Info & CTA */}
                <div className="w-full flex flex-col items-center">
                  <Link href={`/${countryCode}/collection/${col.id}`} className="w-full max-w-[180px]">
                    <Button variant="outline" className="w-full h-10 rounded-none border border-black bg-transparent text-[10px] font-bold tracking-[0.25em] text-black uppercase hover:bg-black hover:text-white transition-all duration-300">
                      SHOP NOW
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Join the VIP Email List Section - More compact padding */}
      <section className="bg-[#f9f7f9] py-20 border-t border-black/5">
        <div className="container mx-auto px-6 max-w-3xl text-center space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-headline font-medium text-gray-900">Join the VIP Email List</h2>
            <p className="text-[12px] text-gray-500 font-light leading-relaxed max-w-md mx-auto">
              Join our VIP email list and get first access new product launches and all the latest updates from Amarisé Maison Avenue!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center max-w-lg mx-auto bg-white border border-gray-200 h-12 overflow-hidden">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 h-full px-5 text-xs font-light text-gray-600 outline-none placeholder:text-gray-300"
            />
            <button className="h-full px-8 text-[10px] font-bold tracking-[0.3em] uppercase text-black hover:text-plum transition-colors border-l border-gray-100">
              SUBMIT
            </button>
          </div>
        </div>
      </section>

      {/* Floating App Badge - Slightly smaller */}
      <div className="fixed bottom-6 left-6 z-[60]">
        <button className="flex items-center space-x-3 bg-gradient-to-r from-[#e8def8] to-[#f3e8f5] px-4 py-2.5 rounded-full shadow-lg border border-white/50 hover:shadow-xl transition-all group">
          <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center shadow-sm">
            <Smartphone className="w-4 h-4 text-gray-800" />
          </div>
          <span className="text-[9px] font-bold tracking-widest text-gray-800 uppercase">
            GET OUR APP • $300 OFF
          </span>
        </button>
      </div>
    </div>
  );
}
