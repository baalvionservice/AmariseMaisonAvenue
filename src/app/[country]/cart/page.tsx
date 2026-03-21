
'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { formatPrice } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Trash2, ShoppingBag, ShieldCheck, Truck, ChevronRight } from 'lucide-react';
import Image from 'next/image';

/**
 * Bank-Grade Cart Page: Tactical Acquisition Ledger.
 * Optimized for high-fidelity transactional review.
 */
export default function CartPage() {
  const { cart, removeFromCart } = useAppStore();
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  const router = useRouter();

  const subtotal = cart.reduce((acc, item) => acc + (item.basePrice * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-6 py-40 flex flex-col items-center justify-center space-y-12 animate-fade-in">
        <div className="p-12 bg-ivory border border-border rounded-full shadow-inner">
          <ShoppingBag className="w-20 h-20 text-gray-200" />
        </div>
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-headline font-bold italic tracking-tight">Your Archive is Empty</h1>
          <p className="text-gray-500 font-light italic max-w-md mx-auto">
            "Discovery is the foundation of any significant collection. Explore our curated ateliers to find your next masterpiece."
          </p>
        </div>
        <Button onClick={() => router.push(`/${countryCode}`)} size="lg" className="rounded-none bg-black hover:bg-plum px-16 h-16 text-[10px] font-bold uppercase tracking-[0.4em] shadow-2xl transition-all">
          START DISCOVERY
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-12 py-24 max-w-[1600px] animate-fade-in">
      <header className="space-y-4 mb-20 border-b border-border pb-12">
        <nav className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-4">
           <Link href={`/${countryCode}`} className="hover:text-black">Maison</Link>
           <ChevronRight className="w-2.5 h-2.5" />
           <span className="text-black">Shopping Bag</span>
        </nav>
        <h1 className="text-6xl font-headline font-bold italic tracking-tighter">Acquisition Ledger</h1>
        <p className="text-sm text-gray-500 font-light italic">Reviewing artifacts reserved for global settlement.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-24 items-start">
        {/* Artifact List */}
        <div className="lg:w-2/3 space-y-12">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-12 pb-12 border-b border-border group relative">
              <div className="relative w-48 aspect-[3/4] bg-white border border-border shadow-sm overflow-hidden flex-shrink-0">
                <Image 
                  src={item.imageUrl} 
                  alt={item.name} 
                  fill 
                  className="object-contain p-6 transition-transform duration-[1.5s] group-hover:scale-105" 
                />
              </div>
              
              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-plum">{item.categoryId.toUpperCase()} Registry</span>
                      <h3 className="text-3xl font-headline font-bold italic group-hover:text-plum transition-colors leading-none">
                        <Link href={`/${countryCode}/product/${item.id}`}>{item.name}</Link>
                      </h3>
                      <p className="text-[9px] text-gray-400 font-mono uppercase tracking-tighter">REF: {item.id.toUpperCase()}</p>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 tabular">
                      {formatPrice(item.basePrice, countryCode)}
                    </div>
                  </div>

                  <div className="flex items-center space-x-8 text-[9px] font-bold uppercase tracking-widest text-gray-400">
                     <div className="flex items-center space-x-2">
                        <span className="opacity-60">Quantity:</span>
                        <span className="text-black">{item.quantity}</span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" />
                        <span>Provenance Audited</span>
                     </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-10">
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center space-x-2 text-[9px] font-bold uppercase tracking-widest text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> 
                    <span>Remove from ledger</span>
                  </button>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-gold italic">Ready for Dispatch</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tactical Summary Sidebar */}
        <aside className="lg:w-1/3 w-full lg:sticky lg:top-40">
          <Card className="bg-ivory border-border shadow-luxury p-10 space-y-10 rounded-none">
            <h2 className="text-xl font-headline font-bold uppercase tracking-widest border-b border-border pb-6">Settlement Summary</h2>
            
            <div className="space-y-6">
              <div className="flex justify-between text-xs font-light italic">
                <span className="text-gray-500">Registry Subtotal</span>
                <span className="font-bold tabular">{formatPrice(subtotal, countryCode)}</span>
              </div>
              <div className="flex justify-between text-xs font-light italic">
                <span className="text-gray-500">Global Logistics</span>
                <span className="text-plum font-bold uppercase tracking-widest">Complimentary</span>
              </div>
              <div className="flex justify-between text-xs font-light italic">
                <span className="text-gray-500">Insurance & Certification</span>
                <span className="text-plum font-bold uppercase tracking-widest">Included</span>
              </div>
              
              <div className="pt-8 border-t border-border flex justify-between items-end">
                <div className="space-y-1">
                   <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400">Total Yield</span>
                   <div className="text-4xl font-body font-bold tabular leading-none">
                     {formatPrice(subtotal, countryCode)}
                   </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <Link href={`/${countryCode}/checkout`} className="block">
                <Button className="w-full bg-black text-white hover:bg-plum h-20 rounded-none text-[11px] font-bold tracking-[0.4em] uppercase shadow-2xl transition-all">
                  PROCEED TO SETTLEMENT
                </Button>
              </Link>
              <p className="text-[9px] text-gray-400 text-center italic leading-relaxed">
                "By proceeding, you authorize the Maison to begin curatorial audit and logistical preparation for your artifacts."
              </p>
            </div>

            <div className="pt-10 space-y-6 border-t border-border">
               <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white rounded-full shadow-sm text-gold"><ShieldCheck className="w-5 h-5" /></div>
                  <div className="space-y-0.5">
                     <p className="text-[10px] font-bold uppercase tracking-widest">256-Bit SSL SECURE</p>
                     <p className="text-[8px] text-gray-400 italic">Institutional Encryption Standard</p>
                  </div>
               </div>
               <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white rounded-full shadow-sm text-gold"><Truck className="w-5 h-5" /></div>
                  <div className="space-y-0.5">
                     <p className="text-[10px] font-bold uppercase tracking-widest">Global White-Glove</p>
                     <p className="text-[8px] text-gray-400 italic">Tracked Dispatch via Maison Logistics</p>
                  </div>
               </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
