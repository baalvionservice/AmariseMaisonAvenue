
'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingBag, X, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { formatPrice } from '@/lib/mock-data';

/**
 * Maison Cart Drawer: Elite Acquisition Overlay.
 * Provides immediate feedback when an item is added to the shopping bag.
 */
export function CartSheet() {
  const { cart, removeFromCart, isCartOpen, setCartOpen } = useAppStore();
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  const router = useRouter();

  const subtotal = cart.reduce((acc, item) => acc + (item.basePrice * item.quantity), 0);

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full sm:max-w-[480px] p-0 border-none rounded-none shadow-2xl flex flex-col bg-white font-body">
        <SheetHeader className="p-8 border-b border-gray-50 bg-[#fcfcfc] shrink-0">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <SheetTitle className="font-headline text-3xl italic tracking-tight text-gray-900">Shopping Bag</SheetTitle>
              <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400">{cart.length} Artifacts Reserved</p>
            </div>
            <SheetClose asChild>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors border-none bg-transparent outline-none cursor-pointer">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="flex space-x-6 pb-8 border-b border-gray-50 group">
                <div className="relative w-24 aspect-[3/4] bg-ivory border border-gray-100 overflow-hidden shrink-0">
                  <Image src={item.imageUrl} alt={item.name} fill className="object-contain p-2" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="space-y-1">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-900 group-hover:text-plum transition-colors leading-relaxed">
                      <Link href={`/${countryCode}/product/${item.id}`} onClick={() => setCartOpen(false)}>{item.name}</Link>
                    </h4>
                    <p className="text-[10px] text-gray-400 font-mono uppercase tracking-tighter">REF: {item.id.toUpperCase()}</p>
                  </div>
                  <div className="flex items-end justify-between mt-4">
                    <span className="text-sm font-bold tabular-nums text-gray-900">{formatPrice(item.basePrice, countryCode)}</span>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors bg-transparent border-none outline-none cursor-pointer">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-30 text-center py-20">
              <ShoppingBag className="w-12 h-12 text-gray-300" />
              <p className="text-xs uppercase font-bold tracking-widest italic text-gray-400">Archive currently empty</p>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-8 bg-[#fcfcfc] border-t border-gray-100 space-y-6 shrink-0 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Yield Total</span>
              <span className="text-2xl font-bold tabular-nums text-gray-900">{formatPrice(subtotal, countryCode)}</span>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={() => { setCartOpen(false); router.push(`/${countryCode}/checkout`); }}
                className="w-full h-16 bg-black text-white hover:bg-plum rounded-none text-[10px] font-bold tracking-[0.4em] uppercase transition-all shadow-2xl"
              >
                PROCEED TO SETTLEMENT <ArrowRight className="w-3 h-3 ml-3" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => { setCartOpen(false); router.push(`/${countryCode}/cart`); }}
                className="w-full h-14 border-gray-200 text-gray-500 hover:bg-white hover:text-black rounded-none text-[9px] font-bold tracking-[0.3em] uppercase"
              >
                VIEW FULL LEDGER
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-2 text-emerald-500 opacity-60">
              <ShieldCheck className="w-3 h-3" />
              <span className="text-[8px] font-bold uppercase tracking-widest">End-to-End Secure Registry</span>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
