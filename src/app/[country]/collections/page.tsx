'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { ChevronRight, Ban, Smartphone, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * CollectionsPage: High-fidelity directory of Maison curations.
 * Features the structural circular assets and the new VIP Email list section.
 */
export default function CollectionsPage() {
  const { country } = useParams();
  const { collections } = useAppStore();
  const countryCode = (country as string) || 'us';

  return (
    <div className="bg-white min-h-screen relative">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-[13px] font-normal text-gray-600 mb-8">
          <Link href={`/${countryCode}`} className="hover:text-black transition-colors">Home</Link>
          <span className="text-gray-400 font-light flex items-center justify-center">
            <ChevronRight className="w-3.5 h-3.5 mx-1" strokeWidth={1.5} />
          </span>
          <span className="text-gray-900">Collections</span>
        </nav>

        {/* Page Title */}
        <h1 className="text-7xl font-headline font-medium text-black mb-32 tracking-tight">
          Collections
        </h1>

        {/* Collections Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-40 mb-40">
          {collections.slice(0, 9).map((col) => {
            return (
              <div key={col.id} className="flex flex-col items-center text-center group">
                {/* Circular Structural Asset */}
                <Link href={`/${countryCode}/collection/${col.id}`} className="relative block mb-10">
                  <div className="relative w-64 h-64 rounded-full bg-[#f8f8f8] flex items-center justify-center border border-gray-100 transition-transform duration-500 group-hover:scale-105">
                    <Ban className="w-32 h-32 text-gray-100/60 stroke-[0.5px]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-[#262626] w-10 h-10 flex items-center justify-center shadow-xl">
                        <Plus className="w-6 h-6 text-white stroke-[2.5px]" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <span className="text-2xl font-headline italic text-gray-300/70 tracking-tight block">No image</span>
                  </div>
                </Link>

                {/* Info & CTA */}
                <div className="w-full flex flex-col items-center">
                  <Link href={`/${countryCode}/collection/${col.id}`} className="w-full max-w-[220px]">
                    <Button variant="outline" className="w-full h-12 rounded-none border border-black bg-transparent text-[11px] font-bold tracking-[0.25em] text-black uppercase hover:bg-black hover:text-white transition-all duration-300">
                      SHOP NOW
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Join the VIP Email List Section */}
      <section className="bg-[#f9f7f9] py-32 border-t border-black/5">
        <div className="container mx-auto px-6 max-w-4xl text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-headline font-medium text-gray-900">Join the VIP Email List</h2>
            <p className="text-[13px] text-gray-500 font-light leading-relaxed max-w-lg mx-auto">
              Join our VIP email list and get first access new product launches and all the latest updates from Amarisé Maison Avenue!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center max-w-xl mx-auto bg-white border border-gray-200 h-14 overflow-hidden">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 h-full px-6 text-sm font-light text-gray-600 outline-none placeholder:text-gray-300"
            />
            <button className="h-full px-10 text-[11px] font-bold tracking-[0.3em] uppercase text-black hover:text-plum transition-colors border-l border-gray-100">
              SUBMIT
            </button>
          </div>
        </div>
      </section>

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
