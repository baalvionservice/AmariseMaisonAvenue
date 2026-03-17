'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/mock-data';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  const { addToCart, toggleWishlist, wishlist } = useAppStore();
  const { toast } = useToast();
  const isWishlisted = wishlist.some(i => i.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Added to Bag",
      description: `${product.name} is waiting for you.`,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group relative flex flex-col bg-card overflow-hidden transition-all duration-700 hover:shadow-2xl border border-border/40">
      <Link href={`/${countryCode}/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-muted">
        <Image 
          src={product.imageUrl} 
          alt={product.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-black/5 opacity-100 group-hover:opacity-0 transition-opacity duration-700" />
        
        {product.isVip && (
          <div className="absolute top-4 left-4 bg-primary px-3 py-1 text-[9px] font-bold tracking-[0.2em] text-white uppercase shadow-lg z-10">
            VIP Limited
          </div>
        )}

        {/* Quick Actions Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col space-y-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 luxury-blur bg-black/40 z-20">
          <Button 
            className="w-full h-12 rounded-none bg-white text-black hover:bg-primary hover:text-white transition-all text-[10px] font-bold tracking-widest uppercase"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="w-4 h-4 mr-2" /> ADD TO BAG
          </Button>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className={cn("flex-1 h-12 rounded-none border-white/20 text-white hover:bg-white hover:text-black transition-all text-[10px] font-bold tracking-widest uppercase", isWishlisted && "bg-white text-black")}
              onClick={handleToggleWishlist}
            >
              <Heart className={cn("w-4 h-4 mr-2", isWishlisted && "fill-current")} /> {isWishlisted ? "WISHLISTED" : "WISHLIST"}
            </Button>
          </div>
        </div>
      </Link>
      
      <Link href={`/${countryCode}/product/${product.id}`} className="p-8 flex-1 flex flex-col space-y-4">
        <div className="space-y-1">
          <div className="text-[9px] text-primary uppercase tracking-[0.3em] font-bold">{product.category}</div>
          <h3 className="font-headline text-xl text-foreground group-hover:text-primary transition-colors duration-500 leading-tight line-clamp-1">{product.name}</h3>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex text-primary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn("w-3 h-3", i < Math.floor(product.rating) ? "fill-current" : "text-muted-foreground")} />
              ))}
            </div>
            <span className="text-[9px] text-muted-foreground uppercase tracking-widest">({product.reviewsCount})</span>
          </div>
          <span className="text-xl font-body font-light tracking-tighter text-foreground">
            {formatPrice(product.basePrice, countryCode)}
          </span>
        </div>

        <div className="pt-4 border-t border-border/40 flex items-center justify-between">
          <span className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Provenance: Global</span>
          <div className="flex items-center text-[9px] text-primary font-bold tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
            Discover <Eye className="w-3 h-3 ml-2" />
          </div>
        </div>
      </Link>
    </div>
  );
};
