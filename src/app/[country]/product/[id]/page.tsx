
'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { PRODUCTS, formatPrice, COUNTRIES } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Share2, 
  ShieldCheck, 
  Truck, 
  Star,
  ChevronRight,
  Sparkles,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Info,
  Calendar,
  Gift
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
  
  const product = useMemo(() => PRODUCTS.find(p => p.id === id), [id]);
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES.us;
  
  const metrics = socialMetrics[id as string] || { likes: 0, shares: 0, engagementRate: 0 };
  const [aiDescription, setAiDescription] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(true);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  
  const isWishlisted = wishlist.some(i => i.id === product?.id);
  const sku = useMemo(() => `AM-${id?.split('-')[1]}-${countryCode.toUpperCase()}`, [id, countryCode]);
  const stockCount = useMemo(() => Math.floor(Math.random() * 8) + 1, [id]);

  useEffect(() => {
    if (!product) return;
    if (product.colors?.[0]) setSelectedColor(product.colors[0]);
    if (product.sizes?.[0]) setSelectedSize(product.sizes[0]);
    
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
      description: `${product.name} has been added to your selection.`,
    });
  };

  const handleToggleLike = () => {
    toggleWishlist(product);
    toggleLike(product.id, countryCode);
  };

  const handleShare = (platform: string) => {
    trackShare(product.id, countryCode);
    toast({
      title: `Shared to ${platform}`,
      description: `The Maison's vision has been broadcasted.`,
    });
  };

  return (
    <div className="bg-ivory min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-[10px] tracking-widest uppercase mb-12 text-muted-foreground font-bold">
          <Link href={`/${countryCode}`} className="hover:text-primary transition-colors">Maison</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/${countryCode}/category/${product.categoryId}`} className="hover:text-primary transition-colors uppercase">{product.categoryId}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-black" aria-current="page">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-24">
          <div className="w-full lg:w-3/5 space-y-8">
            <div className="group relative aspect-[4/5] overflow-hidden bg-white border border-border shadow-luxury">
              <Image 
                src={product.imageUrl} 
                alt={product.name}
                fill
                className="object-cover transition-transform duration-[2.5s] group-hover:scale-105"
                priority
              />
              {product.isVip && (
                <div className="absolute top-8 left-8 bg-plum px-6 py-3 text-[10px] font-bold tracking-[0.4em] text-white uppercase shadow-2xl luxury-blur bg-opacity-80">
                  Private Edition
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="relative aspect-[4/5] bg-white overflow-hidden border border-border shadow-sm group">
                 <Image src={`https://picsum.photos/seed/${id}-detail/1200/1600`} alt="Artisanal Detail" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="relative aspect-[4/5] bg-white overflow-hidden border border-border shadow-sm group">
                 <Image src={`https://picsum.photos/seed/${id}-lifestyle/1200/1600`} alt="Maison Lifestyle" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/5 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-primary text-[10px] font-bold tracking-[0.5em] uppercase border-b border-gold/40 pb-1">
                  Atelier {currentCountry.office?.city}
                </span>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="hover:text-primary transition-all" onClick={handleToggleLike}>
                    <Heart className={cn("w-5 h-5", isWishlisted && "fill-plum text-plum")} />
                  </Button>
                  <ShareDropdown onShare={handleShare} />
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight text-gray-900 italic">{product.name}</h1>
              <div className="flex items-center space-x-6">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("w-4 h-4", i < Math.floor(product.rating) ? "fill-current" : "text-gray-200")} />
                  ))}
                </div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold">{product.reviewsCount} Critiques</span>
              </div>
              <div className="text-6xl font-light tracking-tighter pt-4 text-gray-900">
                {formatPrice(product.basePrice, countryCode)}
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                size="lg" 
                className="w-full bg-plum text-white hover:bg-gold hover:text-gray-900 h-20 rounded-none text-[10px] tracking-[0.4em] font-bold shadow-2xl transition-all"
                onClick={handleAddToCart}
              >
                ADD TO SHOPPING BAG
              </Button>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="h-16 rounded-none border-gray-900 text-[9px] font-bold tracking-widest uppercase hover:bg-gray-900 hover:text-white"
                  onClick={() => router.push(`/${countryCode}/appointments`)}
                >
                  <Calendar className="w-4 h-4 mr-2" /> BOOK APPOINTMENT
                </Button>
                <Button 
                  variant="outline" 
                  className="h-16 rounded-none border-gray-900 text-[9px] font-bold tracking-widest uppercase hover:bg-gray-900 hover:text-white"
                  onClick={() => router.push(`/${countryCode}/gift-registry`)}
                >
                  <Gift className="w-4 h-4 mr-2" /> GIFT REGISTRY
                </Button>
              </div>
            </div>

            <Tabs defaultValue="narrative" className="w-full pt-12">
              <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-14 p-0 space-x-12">
                <TabsTrigger value="narrative" className="tab-trigger">The Narrative</TabsTrigger>
                <TabsTrigger value="provenance" className="tab-trigger">Provenance</TabsTrigger>
                <TabsTrigger value="logistics" className="tab-trigger">Logistics</TabsTrigger>
              </TabsList>
              <TabsContent value="narrative" className="pt-10 animate-fade-in min-h-[250px]">
                {loadingAi ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-muted w-full" />
                    <div className="h-4 bg-muted w-5/6" />
                  </div>
                ) : (
                  <div className="text-gray-600 font-light leading-relaxed whitespace-pre-wrap first-letter:text-6xl first-letter:font-headline first-letter:mr-3 first-letter:float-left first-letter:text-plum italic">
                    {aiDescription || "A testament to the Maison's century-long pursuit of excellence."}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="provenance" className="pt-10">
                <ul className="space-y-6">
                  <DetailRow label="Origin" value={`Maison Amarisé Ateliers, ${currentCountry.office?.city}`} />
                  <DetailRow label="Atelier Craft" value="Hand-finished heritage series" />
                  <DetailRow label="Authenticity" value="NFC-enabled certification included" />
                </ul>
              </TabsContent>
              <TabsContent value="logistics" className="pt-10 space-y-8">
                <Benefit icon={<Truck className="w-4 h-4" />} title="White-Glove Delivery" desc={`Complimentary in ${currentCountry.name}`} />
                <Benefit icon={<ShieldCheck className="w-4 h-4" />} title="Insured Transit" desc="Full value insurance included" />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <section className="mt-40 border-t border-border pt-20">
          <div className="flex items-end justify-between mb-20">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-plum">
                 <Sparkles className="w-5 h-5 text-gold" />
                 <span className="text-[10px] font-bold tracking-[0.5em] uppercase">Intelligence Curation</span>
              </div>
              <h2 className="text-5xl font-headline font-bold italic text-gray-900">Complementary Artifacts</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {loadingRecs ? (
              [...Array(4)].map((_, i) => <div key={i} className="aspect-[4/5] bg-white border border-border animate-pulse" />)
            ) : (
              recommendations.map(p => (
                <ProductCard key={p.id} product={p} />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function ShareDropdown({ onShare }: { onShare: (platform: string) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:text-primary">
          <Share2 className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border-border luxury-blur w-56 p-2 shadow-luxury">
        <DropdownMenuItem className="p-3 text-[10px] font-bold uppercase tracking-widest cursor-pointer" onClick={() => onShare('Facebook')}>
          <Facebook className="w-4 h-4 mr-3" /> Facebook
        </DropdownMenuItem>
        <DropdownMenuItem className="p-3 text-[10px] font-bold uppercase tracking-widest cursor-pointer" onClick={() => onShare('Twitter')}>
          <Twitter className="w-4 h-4 mr-3" /> Twitter
        </DropdownMenuItem>
        <DropdownMenuItem className="p-3 text-[10px] font-bold uppercase tracking-widest cursor-pointer" onClick={() => onShare('LinkedIn')}>
          <Linkedin className="w-4 h-4 mr-3" /> LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem className="p-3 text-[10px] font-bold uppercase tracking-widest cursor-pointer" onClick={() => onShare('Copy Link')}>
          <Copy className="w-4 h-4 mr-3" /> Copy Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DetailRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="grid grid-cols-3 gap-8 py-4 border-b border-border/40 last:border-0">
      <span className="text-[10px] font-bold uppercase tracking-widest text-plum">{label}</span>
      <span className="col-span-2 text-xs text-gray-500 font-light italic">{value}</span>
    </div>
  );
}

function Benefit({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start space-x-6">
      <div className="p-3 bg-ivory rounded-full text-plum border border-border">{icon}</div>
      <div className="space-y-1">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-900">{title}</h4>
        <p className="text-xs text-gray-500 font-light italic">{desc}</p>
      </div>
    </div>
  );
}
