'use client';

import React, { memo, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Heart, Share2, Lock, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/mock-data';
import { PRODUCTS_EXTENDED } from '@/lib/mock-monetization';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = memo(({ product }: ProductCardProps) => {
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  const { toggleWishlist, wishlist, socialMetrics, trackShare } = useAppStore();
  const { toast } = useToast();
  
  const isWishlisted = wishlist.some(i => i.id === product.id);
  const metrics = socialMetrics[product.id] || { likes: 0, shares: 0, engagementRate: 0 };
  const monetization = useMemo(() => PRODUCTS_EXTENDED[product.id] || { priceVisible: true }, [product.id]);

  const targetFlow = product.isVip ? 'private-order' : 'product';

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <article className="group relative flex flex-col bg-transparent overflow-hidden animate-fade-in h-full">
      {/* 1. Visual Gateway - Aspect Ratio Locked for CLS prevention */}
      <Link href={`/${countryCode}/${targetFlow}/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-[#fcfcfc] border border-gray-50" aria-label={`View ${product.name}`}>
        <PlaceholderImage className="absolute inset-0 w-full h-full transition-transform duration-[1.5s] group-hover:scale-105" />
        
        {product.isVip && (
          <div className="absolute top-4 lg:top-6 left-4 lg:left-6 bg-black px-3 py-1 text-[7px] lg:text-[8px] font-bold tracking-[0.3em] text-white uppercase z-10">
            PRIVATE ALLOCATION
          </div>
        )}

        {/* Desktop Action Overlay - Hidden on Mobile */}
        <div className="hidden lg:flex absolute inset-x-0 bottom-0 p-8 flex-col space-y-3 translate-y-full group-hover:translate-y-0 transition-transform duration-700 bg-white/95 backdrop-blur-xl z-20 border-t border-gray-100">
          <Button className="w-full h-14 bg-black text-white hover:bg-gold rounded-none text-[9px] font-bold tracking-[0.4em] uppercase">
            {product.isVip ? 'PRIVATE BRIEF' : 'VIEW ENTRY'}
          </Button>
        </div>
      </Link>
      
      {/* 2. Metadata - Responsively Spaced */}
      <div className="pt-4 lg:pt-8 pb-4 flex-1 flex flex-col space-y-2 lg:space-y-3 text-center">
        <Link href={`/${countryCode}/${targetFlow}/${product.id}`} className="block px-2">
          <h3 className="font-headline text-base lg:text-xl text-gray-900 group-hover:text-plum transition-colors duration-500 leading-tight tracking-tight line-clamp-1 italic">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex flex-col items-center space-y-1">
          <span className="text-xs lg:text-sm font-bold tracking-tight text-gray-900 tabular">
            {monetization.priceVisible ? formatPrice(product.basePrice, countryCode) : "Inquire"}
          </span>
          <div className="w-6 lg:w-8 h-px bg-gray-100 group-hover:w-12 transition-all duration-700" />
        </div>

        {/* Mobile Action Indicator */}
        <div className="lg:hidden pt-2">
           <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-plum flex items-center justify-center">
             View Details <ArrowRight className="w-2.5 h-2.5 ml-1" />
           </span>
        </div>
      </div>
    </article>
  );
});

ProductCard.displayName = 'ProductCard';
