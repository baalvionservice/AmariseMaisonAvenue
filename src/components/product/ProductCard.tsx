'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/mock-data';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  const { addToCart, toggleWishlist, wishlist } = useAppStore();
  const isWishlisted = wishlist.some(i => i.id === product.id);

  return (
    <div className="group relative flex flex-col bg-card overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {/* Image removed */}
        {product.isVip && (
          <div className="absolute top-4 left-4 bg-primary px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-sm">
            VIP Exclusive
          </div>
        )}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="secondary" 
            size="icon" 
            className={cn("rounded-full", isWishlisted && "bg-primary text-white")}
            onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
          >
            <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full" onClick={(e) => { e.preventDefault(); addToCart(product); }}>
            <ShoppingBag className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <Link href={`/${countryCode}/product/${product.id}`} className="p-6 flex-1 flex flex-col">
        <div className="text-[10px] text-primary uppercase tracking-[0.2em] mb-2 font-bold">{product.category}</div>
        <h3 className="font-headline text-lg mb-2 text-foreground group-hover:text-primary transition-colors">{product.name}</h3>
        <div className="flex items-center mb-4 space-x-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={cn("w-3 h-3", i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground")} />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground">({product.reviewsCount})</span>
        </div>
        <div className="mt-auto flex items-end justify-between">
          <span className="text-xl font-body font-light tracking-tight text-foreground">
            {formatPrice(product.basePrice, countryCode)}
          </span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest border-b border-muted-foreground/30 pb-1">
            Discover
          </span>
        </div>
      </Link>
    </div>
  );
};
