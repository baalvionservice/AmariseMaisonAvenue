'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PRODUCTS, REVIEWS, formatPrice } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Share2, 
  ShieldCheck, 
  Truck, 
  RefreshCcw,
  Star,
  Check
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { generateProductDescription } from '@/ai/flows/generate-product-description';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function ProductPage() {
  const { id, country } = useParams();
  const countryCode = (country as string) || 'us';
  const router = useRouter();
  const { toast } = useToast();
  const { addToCart, toggleWishlist, wishlist } = useAppStore();
  
  const product = PRODUCTS.find(p => p.id === id);
  const [aiDescription, setAiDescription] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(true);
  const isWishlisted = wishlist.some(i => i.id === product?.id);

  useEffect(() => {
    if (!product) return;
    
    async function fetchAiDesc() {
      try {
        const res = await generateProductDescription({
          productName: product.name,
          category: product.category,
        });
        setAiDescription(res.description);
      } catch (e) {
        setAiDescription(null);
      } finally {
        setLoadingAi(false);
      }
    }
    fetchAiDesc();
  }, [product]);

  if (!product) {
    return <div className="container mx-auto px-6 py-40 text-center">Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to Bag",
      description: `${product.name} has been added to your shopping bag.`,
    });
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-20">
        {/* Gallery */}
        <div className="w-full lg:w-3/5 space-y-4">
          <div className="relative aspect-[4/5] overflow-hidden bg-card bg-muted">
            {/* Image removed */}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-square bg-card bg-muted overflow-hidden">
               {/* Image removed */}
            </div>
            <div className="relative aspect-square bg-card bg-muted overflow-hidden">
               {/* Image removed */}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="w-full lg:w-2/5 space-y-10">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary">{product.category}</span>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={() => toggleWishlist(product)}>
                  <Heart className={cn("w-5 h-5", isWishlisted && "fill-primary text-primary")} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-headline font-bold">{product.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("w-4 h-4", i < Math.floor(product.rating) ? "fill-current" : "text-muted-foreground")} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground uppercase tracking-widest">{product.reviewsCount} Reviews</span>
            </div>
            <div className="text-3xl font-light tracking-tighter pt-4">
              {formatPrice(product.basePrice, countryCode)}
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-muted-foreground font-light leading-relaxed">
              Exquisitely engineered and meticulously finished, this piece from the {product.collectionId} collection exemplifies the Amarisé standard.
            </p>
            
            <div className="grid grid-cols-1 gap-4 py-8 border-y border-border">
              <div className="flex items-center space-x-4">
                < ShieldCheck className="w-5 h-5 text-primary" />
                <span className="text-sm">Lifetime Authenticity Guarantee</span>
              </div>
              <div className="flex items-center space-x-4">
                <Truck className="w-5 h-5 text-primary" />
                <span className="text-sm">Complimentary Global Priority Shipping</span>
              </div>
              <div className="flex items-center space-x-4">
                <RefreshCcw className="w-5 h-5 text-primary" />
                <span className="text-sm">30-Day Concierge Returns</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <Button 
              size="lg" 
              className="w-full bg-primary hover:bg-secondary text-white h-16 rounded-none text-xs tracking-[0.2em] font-bold"
              onClick={handleAddToCart}
            >
              ADD TO BAG
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full border-foreground h-16 rounded-none text-xs tracking-[0.2em] font-bold"
              onClick={() => router.push(`/${countryCode}/cart`)}
            >
              PROCEED TO CHECKOUT
            </Button>
          </div>

          <Tabs defaultValue="description" className="w-full pt-10">
            <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-12 p-0 space-x-10">
              <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent h-full px-0 text-[10px] tracking-widest uppercase font-bold">The Story</TabsTrigger>
              <TabsTrigger value="details" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent h-full px-0 text-[10px] tracking-widest uppercase font-bold">Details</TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent h-full px-0 text-[10px] tracking-widest uppercase font-bold">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-8 min-h-[200px]">
              {loadingAi ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-4 bg-muted w-full" />
                  <div className="h-4 bg-muted w-5/6" />
                  <div className="h-4 bg-muted w-4/6" />
                </div>
              ) : (
                <div className="prose prose-invert prose-sm font-light text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {aiDescription || "The master story for this piece is being curated by our atelier."}
                </div>
              )}
            </TabsContent>
            <TabsContent value="details" className="pt-8">
              <ul className="space-y-4 text-sm text-muted-foreground font-light">
                <li className="flex items-center space-x-3"><Check className="w-4 h-4 text-primary" /> <span>Premium materials sourced ethically</span></li>
                <li className="flex items-center space-x-3"><Check className="w-4 h-4 text-primary" /> <span>Hand-finished by master artisans</span></li>
                <li className="flex items-center space-x-3"><Check className="w-4 h-4 text-primary" /> <span>Individually numbered for exclusivity</span></li>
                <li className="flex items-center space-x-3"><Check className="w-4 h-4 text-primary" /> <span>Ships in signature luxury packaging</span></li>
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="pt-8">
               <div className="space-y-8">
                 {REVIEWS.map(rev => (
                   <div key={rev.id} className="space-y-2">
                     <div className="flex items-center justify-between">
                       <span className="font-bold text-sm uppercase tracking-widest">{rev.userName}</span>
                       <span className="text-[10px] text-muted-foreground">{rev.date}</span>
                     </div>
                     <div className="flex text-primary">
                       {[...Array(5)].map((_, i) => (
                         <Star key={i} className={cn("w-3 h-3", i < rev.rating ? "fill-current" : "text-muted-foreground")} />
                       ))}
                     </div>
                     <p className="text-sm text-muted-foreground italic">"{rev.comment}"</p>
                   </div>
                 ))}
               </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
