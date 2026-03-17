'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    <div className="group relative flex flex-col bg-card overflow-hidden transition-all duration-500 hover:shadow-2xl">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Image 
          src={product.imageUrl} 
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.isVip && (
          <div className="absolute top-4 left-4 bg-primary px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase rounded-sm">
            VIP Exclusive
          </div>
        )}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <Button 
            variant="secondary" 
            size="icon" 
            className={cn("rounded-full h-10 w-10 shadow-xl", isWishlisted && "bg-primary text-white hover:bg-primary/90")}
            onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
          >
            <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
          </Button>
          <Button 
            variant="secondary" 
            size="icon" 
            className="rounded-full h-10 w-10 shadow-xl hover:bg-primary hover:text-white transition-colors" 
            onClick={(e) => { e.preventDefault(); addToCart(product); }}
          >
            <ShoppingBag className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <Link href={`/${countryCode}/product/${product.id}`} className="p-8 flex-1 flex flex-col space-y-4">
        <div className="space-y-1">
          <div className="text-[10px] text-primary uppercase tracking-[0.25em] font-bold">{product.category}</div>
          <h3 className="font-headline text-xl text-foreground group-hover:text-primary transition-colors leading-tight">{product.name}</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={cn("w-3 h-3", i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground")} />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">({product.reviewsCount} Reviews)</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-4 border-t border-border/50">
          <span className="text-2xl font-body font-light tracking-tight text-foreground">
            {formatPrice(product.basePrice, countryCode)}
          </span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold hover:text-primary transition-colors cursor-pointer">
            View Piece
          </span>
        </div>
      </Link>
    </div>
  );
};
