
'use client';

import React, { useEffect, useState } from 'react';
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
  Sparkles,
  Facebook,
  Twitter,
  Linkedin,
  Copy
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { generateProductDescription } from '@/ai/flows/generate-product-description';
import { generateProductRecommendations } from '@/ai/flows/generate-product-recommendations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ProductCard } from '@/components/product/ProductCard';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProductPage() {
  const { id, country } = useParams();
  const countryCode = (country as string) || 'us';
  const router = useRouter();
  const { toast } = useToast();
  const { addToCart, toggleWishlist, wishlist, socialMetrics, toggleLike, trackShare } = useAppStore();
  
  const product = PRODUCTS.find(p => p.id === id);
  const metrics = socialMetrics[id as string] || { likes: 0, shares: 0, engagementRate: 0 };
  const [aiDescription, setAiDescription] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(true);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(true);
  
  const isWishlisted = wishlist.some(i => i.id === product?.id);

  // Dynamic Image Angles based on Product ID
  const mainImage = product?.imageUrl || '';
  const altImage1 = `https://picsum.photos/seed/${id}-detail/1200/1600`;
  const altImage2 = `https://picsum.photos/seed/${id}-lifestyle/1200/1600`;

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
  }, [product, id]);

  if (!product) {
    return <div className="container mx-auto px-6 py-40 text-center font-headline text-3xl">Artifact not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to Bag",
      description: `${product.name} has been added to your shopping bag.`,
    });
  };

  const handleToggleLike = () => {
    toggleWishlist(product);
    toggleLike(product.id, countryCode);
    if (!isWishlisted) {
      toast({
        title: "Selection Liked",
        description: "Your taste for excellence is noted in our archives.",
      });
    }
  };

  const handleShare = (platform: string) => {
    trackShare(product.id, countryCode);
    toast({
      title: `Shared to ${platform}`,
      description: `The Maison's vision has been broadcasted to your ${platform} network.`,
    });
  };

  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-[10px] tracking-widest uppercase mb-12 text-muted-foreground font-bold">
        <Link href={`/${countryCode}`} className="hover:text-primary transition-colors">Maison</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/${countryCode}/category/${product.category.toLowerCase()}`} className="hover:text-primary transition-colors">{product.category}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground" aria-current="page">{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-20">
        {/* Professional Multi-Angle Gallery */}
        <div className="w-full lg:w-3/5 space-y-6">
          <div className="group relative aspect-[4/5] overflow-hidden bg-white border border-border shadow-luxury">
            <Image 
              src={mainImage} 
              alt={`${product.name} - Front View`}
              fill
              className="object-cover transition-transform duration-[2s] group-hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              data-ai-hint="luxury fashion"
            />
            <div className="absolute inset-0 bg-black/5 pointer-events-none" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="relative aspect-[4/5] bg-white overflow-hidden border border-border shadow-sm group">
               <Image 
                src={altImage1} 
                alt={`${product.name} - Detail View`} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
                sizes="30vw"
                data-ai-hint="artisanal detail"
               />
               <div className="absolute inset-0 bg-plum/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="relative aspect-[4/5] bg-white overflow-hidden border border-border shadow-sm group">
               <Image 
                src={altImage2} 
                alt={`${product.name} - Lifestyle View`} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
                sizes="30vw"
                data-ai-hint="luxury lifestyle"
               />
               <div className="absolute inset-0 bg-plum/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>

        {/* Product Information & Artisanal Controls */}
        <div className="w-full lg:w-2/5 space-y-12">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-primary text-[10px] font-bold tracking-[0.5em] uppercase border-b border-gold pb-1">{product.category} Atelier</span>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="hover:text-primary transition-all hover:scale-110" onClick={handleToggleLike}>
                  <Heart className={cn("w-5 h-5 transition-all", isWishlisted && "fill-plum text-plum scale-125")} />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:text-primary">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white border-border luxury-blur w-56 p-2 shadow-luxury">
                    <DropdownMenuItem className="p-3 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:text-gold hover:bg-ivory" onClick={() => handleShare('Facebook')}>
                      <Facebook className="w-4 h-4 mr-3" /> Facebook
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-3 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:text-gold hover:bg-ivory" onClick={() => handleShare('Twitter')}>
                      <Twitter className="w-4 h-4 mr-3" /> Twitter
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-3 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:text-gold hover:bg-ivory" onClick={() => handleShare('LinkedIn')}>
                      <Linkedin className="w-4 h-4 mr-3" /> LinkedIn
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-3 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:text-gold hover:bg-ivory" onClick={() => handleShare('Copy Link')}>
                      <Copy className="w-4 h-4 mr-3" /> Copy Link
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight text-gray-900 italic">{product.name}</h1>
            <div className="flex items-center space-x-6">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("w-4 h-4", i < Math.floor(product.rating) ? "fill-current" : "text-gray-200")} />
                ))}
              </div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold">{product.reviewsCount} Verfied Critiques</span>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center space-x-2 text-[10px] font-bold text-plum uppercase tracking-widest">
                 <Heart className="w-3 h-3 fill-current animate-pulse" />
                 <span>{metrics.likes.toLocaleString()} Resonance</span>
              </div>
            </div>
            <div className="text-5xl font-light tracking-tighter pt-4 text-gray-900">
              {formatPrice(product.basePrice, countryCode)}
            </div>
          </div>

          <div className="space-y-8">
            <div className="prose prose-sm font-light text-gray-500 leading-relaxed italic border-l-2 border-gold/30 pl-8">
              "A testament to the pursuit of perfection, designed in our Paris atelier and brought to life through centuries-old craft. This artifact represents the pinnacle of Maison Amarisé."
            </div>
            
            <div className="grid grid-cols-1 gap-8 py-10 border-y border-border">
              <Benefit icon={<ShieldCheck className="w-5 h-5" />} label="Authenticity Certificate Issued" />
              <Benefit icon={<Truck className="w-5 h-5" />} label="Complimentary Global White-Glove Shipping" />
              <Benefit icon={<RefreshCcw className="w-5 h-5" />} label="30-Day Bespoke Exchange Policy" />
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <Button 
              size="lg" 
              className="w-full bg-plum text-white hover:bg-gold hover:text-gray-900 h-20 rounded-none text-[10px] tracking-[0.4em] font-bold shadow-2xl shadow-plum/10 transition-all hover:-translate-y-1"
              onClick={handleAddToCart}
            >
              ADD TO SHOPPING BAG
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full border-gray-900 hover:bg-gray-900 hover:text-white h-20 rounded-none text-[10px] tracking-[0.4em] font-bold transition-all"
              onClick={() => router.push(`/${countryCode}/checkout`)}
            >
              EXPRESS ATELIER CHECKOUT
            </Button>
          </div>

          <Tabs defaultValue="description" className="w-full pt-12">
            <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-14 p-0 space-x-12">
              <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-plum data-[state=active]:bg-transparent h-full px-0 text-[10px] tracking-widest uppercase font-bold text-gray-500 data-[state=active]:text-plum">The Narrative</TabsTrigger>
              <TabsTrigger value="details" className="rounded-none border-b-2 border-transparent data-[state=active]:border-plum data-[state=active]:bg-transparent h-full px-0 text-[10px] tracking-widest uppercase font-bold text-gray-500 data-[state=active]:text-plum">Provenance</TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-plum data-[state=active]:bg-transparent h-full px-0 text-[10px] tracking-widest uppercase font-bold text-gray-500 data-[state=active]:text-plum">Critiques</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-10 min-h-[250px] animate-fade-in">
              {loadingAi ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-4 bg-muted w-full" />
                  <div className="h-4 bg-muted w-5/6" />
                  <div className="h-4 bg-muted w-4/6" />
                </div>
              ) : (
                <div className="text-gray-600 font-light leading-relaxed whitespace-pre-wrap first-letter:text-6xl first-letter:font-headline first-letter:mr-3 first-letter:float-left first-letter:text-plum italic">
                  {aiDescription || "Our master storytellers are crafting the legacy for this exquisite piece."}
                </div>
              )}
            </TabsContent>
            <TabsContent value="details" className="pt-10 animate-fade-in">
              <ul className="space-y-8">
                <DetailItem label="Origin" value="Maison Amarisé Ateliers, Paris" />
                <DetailItem label="Composition" value="Sustainably Sourced Italian Silk & 18K Reclaimed Gold" />
                <DetailItem label="Maîtrise" value="Hand-finished by 3rd Generation Master Artisans" />
                <DetailItem label="Series" value="Heritage Limited Edition | Serialized Artifact" />
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="pt-10 animate-fade-in">
               <div className="space-y-12">
                 {REVIEWS.map(rev => (
                   <div key={rev.id} className="space-y-4 pb-10 border-b border-border last:border-0">
                     <div className="flex items-center justify-between">
                       <span className="font-bold text-[10px] uppercase tracking-[0.3em] text-gray-900">{rev.userName}</span>
                       <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">{rev.date}</span>
                     </div>
                     <div className="flex text-gold">
                       {[...Array(5)].map((_, i) => (
                         <Star key={i} className={cn("w-3 h-3", i < rev.rating ? "fill-current" : "text-gray-200")} />
                       ))}
                     </div>
                     <p className="text-lg text-gray-500 font-light italic leading-relaxed">"{rev.comment}"</p>
                   </div>
                 ))}
               </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* AI Curation: Personal Resonance */}
      <section className="mt-40 border-t border-border pt-20">
        <div className="flex items-end justify-between mb-20">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-plum">
               <Sparkles className="w-5 h-5 text-gold" />
               <span className="text-[10px] font-bold tracking-[0.5em] uppercase">Intelligence Curation</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-headline font-bold italic text-gray-900">You May Also Admire</h2>
          </div>
          <Link href={`/${countryCode}/category/${product.category.toLowerCase()}`} className="text-[10px] font-bold tracking-[0.4em] uppercase border-b border-gold pb-2 group flex items-center hover:text-gold transition-colors">
            VIEW FULL GALLERY <ArrowRight className="ml-3 w-3 h-3 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {loadingRecs ? (
            [...Array(4)].map((_, i) => <div key={i} className="aspect-[4/5] bg-white border border-border animate-pulse shadow-sm" />)
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
    <div className="flex items-center space-x-8 group">
      <div className="p-4 bg-ivory rounded-full text-plum group-hover:bg-gold group-hover:text-white transition-all duration-500 shadow-sm">
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600 group-hover:text-gray-900 transition-colors">{label}</span>
    </div>
  );
}

function DetailItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="grid grid-cols-3 gap-12 items-start group">
      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-plum border-l-2 border-gold/20 pl-4 group-hover:border-gold transition-colors">{label}</span>
      <span className="col-span-2 text-sm text-gray-600 font-light italic leading-relaxed">{value}</span>
    </div>
  );
}
