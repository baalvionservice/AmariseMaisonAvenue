
'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Heart, ShoppingBag, Star, Eye, Share2 } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/mock-data';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard: Optimized for structural luxury aesthetics.
 * Uses persistent Card Boxes instead of standard imagery.
 */
export const ProductCard = memo(({ product }: ProductCardProps) => {
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  const { addToCart, toggleWishlist, wishlist, socialMetrics, toggleLike, trackShare } = useAppStore();
  const { toast } = useToast();
  
  const isWishlisted = wishlist.some(i => i.id === product.id);
  const metrics = socialMetrics[product.id] || { likes: 0, shares: 0, engagementRate: 0 };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Added to Bag",
      description: `${product.name} has been added to your selection.`,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    toggleLike(product.id, countryCode);
    
    if (!isWishlisted) {
      toast({
        title: "Artisan Piece Liked",
        description: "Your appreciation has been recorded in the Maison archive.",
      });
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    trackShare(product.id, countryCode);
    toast({
      title: "Link Generated",
      description: "A private sharing link has been created for your network.",
    });
  };

  return (
    <article className="group relative flex flex-col bg-white rounded-lg overflow-hidden transition-all duration-500 hover:shadow-luxury border border-border animate-fade-in h-full">
      <Link href={`/${countryCode}/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-ivory">
        {/* Card Box Placeholder */}
        <div className="w-full h-full bg-muted flex items-center justify-center text-[10px] font-bold tracking-[0.4em] text-gray-300 uppercase transition-colors group-hover:bg-ivory group-hover:text-gold">
          Maison Archive Asset
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-lavender/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {product.isVip && (
          <div className="absolute top-4 left-4 bg-plum px-3 py-1 text-[9px] font-bold tracking-[0.2em] text-white uppercase shadow-sm z-10 bg-opacity-90 rounded-sm">
            VIP Limited
          </div>
        )}

        <div className="absolute top-4 right-4 flex items-center space-x-2 luxury-blur px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 border border-border rounded-full shadow-sm">
           <Heart className={cn("w-3 h-3", isWishlisted ? "fill-plum text-plum" : "text-gray-400")} />
           <span className="text-[9px] font-bold text-gray-700">{metrics.likes.toLocaleString()}</span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col space-y-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 luxury-blur z-20">
          <Button 
            className="w-full h-12 rounded-sm bg-gold text-gray-900 hover:shadow-gold-glow hover:scale-102 transition-all text-[10px] font-bold tracking-widest uppercase border-none"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="w-4 h-4 mr-2" /> ADD TO BAG
          </Button>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className={cn("flex-1 h-12 rounded-sm border-border text-gray-700 hover:bg-ivory transition-all text-[10px] font-bold tracking-widest uppercase", isWishlisted && "bg-plum text-white hover:bg-plum/90")}
              onClick={handleToggleWishlist}
            >
              <Heart className={cn("w-4 h-4 mr-2", isWishlisted && "fill-current")} /> {isWishlisted ? "SAVED" : "SAVE"}
            </Button>
            <Button 
              variant="outline" 
              className="w-12 h-12 rounded-sm border-border text-gray-700 hover:text-gold transition-all p-0 flex items-center justify-center"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Link>
      
      <div className="p-8 flex-1 flex flex-col space-y-4 bg-white">
        <div className="space-y-1">
          <div className="text-[9px] text-plum uppercase tracking-[0.3em] font-bold">{product.category}</div>
          <Link href={`/${countryCode}/product/${product.id}`}>
            <h3 className="font-headline text-xl text-gray-900 group-hover:text-gold transition-colors duration-500 leading-tight line-clamp-1">{product.name}</h3>
          </Link>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn("w-3 h-3", i < Math.floor(product.rating) ? "fill-current" : "text-gray-200")} />
              ))}
            </div>
            <span className="text-[9px] text-gray-400 uppercase tracking-widest">({product.reviewsCount})</span>
          </div>
          <span className="text-xl font-body font-light tracking-tighter text-gray-900">
            {formatPrice(product.basePrice, countryCode)}
          </span>
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
          <span className="text-[9px] text-gray-400 uppercase tracking-[0.2em] font-bold">Atelier Global</span>
          <Link href={`/${countryCode}/product/${product.id}`} className="flex items-center text-[9px] text-gold font-bold tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
            Explore Piece <Eye className="w-3 h-3 ml-2" />
          </Link>
        </div>
      </div>
    </article>
  );
});

ProductCard.displayName = 'ProductCard';
