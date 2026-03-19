'use client';

import React, { memo, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Heart, Share2, Lock, Sparkles, ShieldCheck } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/mock-data';
import { PRODUCTS_EXTENDED } from '@/lib/mock-monetization';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard: Optimized for institutional trust and private acquisition.
 * Uses semantic <article> tag and optimized Image delivery.
 */
export const ProductCard = memo(({ product }: ProductCardProps) => {
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  const { toggleWishlist, wishlist, socialMetrics, toggleLike, trackShare } = useAppStore();
  const { toast } = useToast();
  
  const isWishlisted = wishlist.some(i => i.id === product.id);
  const metrics = socialMetrics[product.id] || { likes: 0, shares: 0, engagementRate: 0 };
  const monetization = useMemo(() => PRODUCTS_EXTENDED[product.id] || { priceVisible: true }, [product.id]);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    toggleLike(product.id, countryCode);
    
    if (!isWishlisted) {
      toast({
        title: "Registry Update",
        description: "Artifact saved to your private wishlist.",
      });
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    trackShare(product.id, countryCode);
    toast({
      title: "Resonance",
      description: "Private sharing link generated.",
    });
  };

  return (
    <article className="group relative flex flex-col bg-transparent overflow-hidden animate-fade-in h-full" aria-labelledby={`title-${product.id}`}>
      <Link href={`/${countryCode}/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-[#f8f8f8]" aria-label={`View details for ${product.name}`}>
        {/* Loading placeholder optimized for CLS prevention */}
        <div className="absolute inset-0 bg-muted flex items-center justify-center text-[9px] font-bold tracking-[0.5em] text-gray-300 uppercase italic transition-all duration-[1.5s] group-hover:scale-105 group-hover:bg-ivory" aria-hidden="true">
          Archive Asset
        </div>
        
        {/* Main image using lazy loading for non-LCP content */}
        <Image 
          src={product.imageUrl} 
          alt={`${product.name} - Atelier Archive View`}
          fill
          className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        {(product.isVip || monetization.scarcityTag) && (
          <div className="absolute top-6 left-6 bg-black px-4 py-1.5 text-[8px] font-bold tracking-[0.3em] text-white uppercase shadow-lg z-10 rounded-none border border-white/10">
            {monetization.scarcityTag || 'Private Edition'}
          </div>
        )}

        <div className="absolute top-6 right-6 flex items-center space-x-2 bg-white/90 backdrop-blur-md px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-all duration-700 z-10 border border-gray-100 shadow-sm">
           <Heart className={cn("w-3 h-3", isWishlisted ? "fill-black text-black" : "text-gray-400")} aria-hidden="true" />
           <span className="text-[9px] font-bold text-gray-900 tracking-tighter" aria-label={`${metrics.likes} appreciations`}>{metrics.likes.toLocaleString()}</span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col space-y-3 translate-y-full group-hover:translate-y-0 transition-transform duration-1000 bg-white/95 backdrop-blur-xl z-20 border-t border-gray-100">
          <Button 
            className="w-full h-14 rounded-none bg-plum text-white hover:bg-black transition-all text-[9px] font-bold tracking-[0.4em] uppercase shadow-xl"
            aria-label={`Request Acquisition for ${product.name}`}
          >
            <Lock className="w-3.5 h-3.5 mr-2" /> Request Acquisition
          </Button>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className={cn("flex-1 h-12 rounded-none border-gray-200 text-gray-900 hover:bg-gray-50 transition-all text-[9px] font-bold tracking-[0.3em] uppercase", isWishlisted && "bg-black text-white hover:bg-black border-black")}
              onClick={handleToggleWishlist}
              aria-label={isWishlisted ? "In Registry" : "Save to Archive"}
            >
              {isWishlisted ? "In Registry" : "Save to Archive"}
            </Button>
            <Button 
              variant="outline" 
              className="w-12 h-12 rounded-none border-gray-200 text-gray-900 hover:bg-gray-50 transition-all p-0 flex items-center justify-center"
              onClick={handleShare}
              aria-label={`Share ${product.name}`}
            >
              <Share2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </Link>
      
      <div className="pt-8 pb-4 flex-1 flex flex-col space-y-3 bg-transparent text-center">
        <div className="space-y-1">
          <Link href={`/${countryCode}/product/${product.id}`} className="focus:outline-none focus:underline">
            <h3 id={`title-${product.id}`} className="font-headline text-xl text-gray-900 group-hover:text-secondary transition-colors duration-700 leading-tight tracking-tight px-4 line-clamp-1 italic">
              {product.name}
            </h3>
          </Link>
        </div>
        
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-2">
             <Sparkles className="w-3 h-3 text-gold opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
             <span className="text-sm font-bold tracking-tight text-gray-900">
               {monetization.priceVisible ? formatPrice(product.basePrice, countryCode) : "Inquire for Acquisition"}
             </span>
          </div>
          <div className="w-8 h-px bg-gray-100 group-hover:w-16 transition-all duration-1000" aria-hidden="true" />
        </div>

        <div className="pt-4 opacity-0 group-hover:opacity-100 transition-all duration-1000">
          <div className="flex items-center justify-center space-x-2 text-[9px] text-gray-400 font-bold uppercase tracking-[0.3em]">
            <ShieldCheck className="w-3 h-3 text-secondary" aria-hidden="true" />
            <span>Maison Registry Verified</span>
          </div>
        </div>
      </div>
    </article>
  );
});

ProductCard.displayName = 'ProductCard';
