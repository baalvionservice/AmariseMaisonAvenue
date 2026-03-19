'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { formatPrice } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { Trash2, ShoppingBag } from 'lucide-react';

/**
 * CartPage: High-trust transactional review.
 * Updated to use the Institutional Placeholder for artifact thumbnails.
 */
export default function CartPage() {
  const { cart, removeFromCart } = useAppStore();
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  const router = useRouter();

  const subtotal = cart.reduce((acc, item) => acc + (item.basePrice * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-6 py-40 flex flex-col items-center justify-center space-y-8">
        <div className="p-8 bg-card rounded-full">
          <ShoppingBag className="w-16 h-16 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-headline font-bold">Your Bag is Empty</h1>
        <p className="text-muted-foreground text-center max-w-md">
          Explore our latest collections and find your next masterpiece.
        </p>
        <Button onClick={() => router.push(`/${countryCode}`)} size="lg" className="rounded-none bg-primary hover:bg-secondary px-12">
          START SHOPPING
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-5xl font-headline font-bold mb-16">Shopping Bag</h1>
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-2/3 space-y-8">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-8 pb-8 border-b border-border group">
              {/* Institutional Thumbnail Placeholder */}
              <div className="relative w-32 h-40 flex-shrink-0">
                <PlaceholderImage className="w-full h-full text-[6px] p-2" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-headline font-bold group-hover:text-primary transition-colors">
                      <Link href={`/${countryCode}/product/${item.id}`}>{item.name}</Link>
                    </h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{item.category}</p>
                    <p className="text-xs text-muted-foreground mt-2">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-lg font-light">
                    {formatPrice(item.basePrice, countryCode)}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <Button variant="ghost" size="sm" className="text-[10px] tracking-widest uppercase hover:text-destructive" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="w-3 h-3 mr-2" /> Remove
                  </Button>
                  <span className="text-xs text-muted-foreground">Ships from global atelier</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:w-1/3">
          <div className="bg-card p-10 space-y-8 sticky top-32 border border-border">
            <h2 className="text-2xl font-headline font-bold uppercase tracking-widest">Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal, countryCode)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-primary font-bold uppercase tracking-widest">Complimentary</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Est. Duties & Taxes</span>
                <span>Included</span>
              </div>
              <div className="pt-6 border-t border-border flex justify-between items-end">
                <span className="text-xl font-bold uppercase tracking-[0.2em]">Total</span>
                <span className="text-3xl font-light">{formatPrice(subtotal, countryCode)}</span>
              </div>
            </div>
            <div className="space-y-4 pt-4">
              <Button className="w-full bg-primary hover:bg-secondary text-white h-16 rounded-none text-xs tracking-widest font-bold">
                SECURE CHECKOUT
              </Button>
              <p className="text-[10px] text-muted-foreground text-center italic">
                Secure transaction via Amarisé Global Payments. All major cards accepted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
