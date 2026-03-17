'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { PRODUCTS, REVIEWS, formatPrice } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Share2, 
  ShieldCheck, 
  Truck, 
  RefreshCcw,
  Star,
  ChevronRight,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { generateProductDescription } from '@/ai/flows/generate-product-description';
import { generateProductRecommendations } from '@/ai/flows/generate-product-recommendations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ProductCard } from '@/components/product/ProductCard';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function ProductPage() {
  const { id, country } = useParams();
  const countryCode = (country as string) || 'us';
  const router = useRouter();
  const { toast } = useToast();
  const { addToCart, toggleWishlist, wishlist } = useAppStore();
  
  const product = PRODUCTS.find(p => p.id === id);
  const [aiDescription, setAiDescription] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(true);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(true);
  
  const isWishlisted = wishlist.some(i => i.id === product?.id);

  useEffect(() => {
    if (!product) return;
    
    async function fetchData() {
      try {
        const [descRes, recRes] = await Promise.all([
          generateProductDescription({
            productName: product.name,
            category: product.category,
          }),
          generateProductRecommendations({
            scenario: `Upsell recommendations for a client viewing ${product.name} in the ${product.category} department.`,
            currentProductId: product.id
          })
        ]);
        setAiDescription(descRes.description);
        setRecommendations(recRes.recommendations.slice(0, 4));
      } catch (e) {
        setAiDescription(null);
      } finally {
        setLoadingAi(false);
        setLoadingRecs(false);
      }
    }
    fetchData();
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
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-[10px] tracking-widest uppercase mb-12 text-muted-foreground">
        <Link href={`/${countryCode}`} className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/${countryCode}/category/${product.category.toLowerCase()}`} className="hover:text-primary transition-colors">{product.category}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-20">
        {/* Gallery */}
        <div className="w-full lg:w-3/5 space-y-4">
          <div className="group relative aspect-[4/5] overflow-hidden bg-card bg-muted border border-border/40">
            <Image 
              src={product.imageUrl} 
              alt={product.name}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              priority
            />
            <div className="absolute inset-0 bg-black/5 pointer-events-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-square bg-card bg-muted overflow-hidden border border-border/40">
               <Image src={`https://picsum.photos/seed/${product.id}-alt1/800/800`} alt="Detail 1" fill className="object-cover" />
            </div>
            <div className="relative aspect-square bg-card bg-muted overflow-hidden border border-border/40">
               <Image src={`https://picsum.photos/seed/${product.id}-alt2/800/800`} alt="Detail 2" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="w-full lg:w-2/5 space-y-10">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase">{product.category}</span>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="hover:text-primary" onClick={() => toggleWishlist(product)}>
                  <Heart className={cn("w-5 h-5 transition-all", isWishlisted && "fill-primary text-primary scale-110")} />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-headline font-bold leading-tight">{product.name}</h1>
            <div className="flex items-center space-x-6">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("w-4 h-4", i < Math.floor(product.rating) ? "fill-current" : "text-muted-foreground")} />
                ))}
              </div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">{product.reviewsCount} Verfied Reviews</span>
            </div>
            <div className="text-4xl font-light tracking-tighter pt-4">
              {formatPrice(product.basePrice, countryCode)}
            </div>
          </div>

          <div className="space-y-6">
            <div className="prose prose-invert prose-sm font-light text-muted-foreground leading-relaxed italic">
              "A testament to the pursuit of perfection, designed in our Paris atelier and brought to life through centuries-old craft."
            </div>
            
            <div className="grid grid-cols-1 gap-6 py-10 border-y border-border">
              <Benefit icon={<ShieldCheck className="w-5 h-5" />} label="Authenticity Certificate Included" />
              <Benefit icon={<Truck className="w-5 h-5" />} label="Complimentary Global White-Glove Shipping" />
              <Benefit icon={<RefreshCcw className="w-5 h-5" />} label="30-Day Bespoke Returns Policy" />
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <Button 
              size="lg" 
              className="w-full bg-primary hover:bg-secondary text-white h-16 rounded-none text-[10px] tracking-[0.3em] font-bold shadow-xl shadow-primary/20 transition-all hover:-translate-y-1"
              onClick={handleAddToCart}
            >
              ADD TO SHOPPING BAG
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full border-foreground/50 hover:border-foreground h-16 rounded-none text-[10px] tracking-[0.3em] font-bold transition-all"
              onClick={() => router.push(`/${countryCode}/checkout`)}
            >
              EXPRESS CHECKOUT
            </Button>
          </div>

          <Tabs defaultValue="description" className="w-full pt-12">
            <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-14 p-0 space-x-12">
              <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent h-full px-0 text-[10px] tracking-widest uppercase font-bold">The Narrative</TabsTrigger>
              <TabsTrigger value="details" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent h-full px-0 text-[10px] tracking-widest uppercase font-bold">Provenance</TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent h-full px-0 text-[10px] tracking-widest uppercase font-bold">Critiques</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-10 min-h-[250px] animate-fade-in">
              {loadingAi ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-4 bg-muted w-full" />
                  <div className="h-4 bg-muted w-5/6" />
                  <div className="h-4 bg-muted w-4/6" />
                </div>
              ) : (
                <div className="text-muted-foreground font-light leading-relaxed whitespace-pre-wrap first-letter:text-5xl first-letter:font-headline first-letter:mr-3 first-letter:float-left first-letter:text-primary">
                  {aiDescription || "Our master storytellers are crafting the legacy for this exquisite piece."}
                </div>
              )}
            </TabsContent>
            <TabsContent value="details" className="pt-10 animate-fade-in">
              <ul className="space-y-6">
                <DetailItem label="Origin" value="Paris, France" />
                <DetailItem label="Material" value="Sustainably Sourced Italian Silk & Fine Gold Hardware" />
                <DetailItem label="Craft" value="Hand-finished by 3rd Generation Master Artisans" />
                <DetailItem label="Exclusivity" value="Part of the Limited Edition Heritage Series" />
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="pt-10 animate-fade-in">
               <div className="space-y-12">
                 {REVIEWS.map(rev => (
                   <div key={rev.id} className="space-y-4 pb-8 border-b border-border/50 last:border-0">
                     <div className="flex items-center justify-between">
                       <span className="font-bold text-xs uppercase tracking-[0.2em]">{rev.userName}</span>
                       <span className="text-[10px] text-muted-foreground font-bold">{rev.date}</span>
                     </div>
                     <div className="flex text-primary">
                       {[...Array(5)].map((_, i) => (
                         <Star key={i} className={cn("w-3 h-3", i < rev.rating ? "fill-current" : "text-muted-foreground")} />
                       ))}
                     </div>
                     <p className="text-sm text-muted-foreground font-light italic leading-relaxed">"{rev.comment}"</p>
                   </div>
                 ))}
               </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* AI Recommendations */}
      <section className="mt-40 border-t border-border pt-20">
        <div className="flex items-end justify-between mb-16">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-primary">
               <Sparkles className="w-5 h-5" />
               <span className="text-[10px] font-bold tracking-[0.4em] uppercase">AI Curation</span>
            </div>
            <h2 className="text-5xl font-headline font-bold">You May Also Admire</h2>
          </div>
          <Link href={`/${countryCode}/category/${product.category.toLowerCase()}`} className="text-[10px] font-bold tracking-widest uppercase border-b border-primary pb-1 group flex items-center">
            View All <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {loadingRecs ? (
            [...Array(4)].map((_, i) => <div key={i} className="aspect-[3/4] bg-muted animate-pulse" />)
          ) : (
            recommendations.map(p => (
              <ProductCard key={p.id} product={p} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

function Benefit({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex items-center space-x-6 group">
      <div className="p-3 bg-primary/5 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
    </div>
  );
}

function DetailItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="grid grid-cols-3 gap-8 items-start">
      <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{label}</span>
      <span className="col-span-2 text-sm text-muted-foreground font-light">{value}</span>
    </div>
  );
}
