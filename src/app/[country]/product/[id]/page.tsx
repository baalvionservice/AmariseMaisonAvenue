'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PRODUCTS, formatPrice, COUNTRIES } from '@/lib/mock-data';
import { PRODUCTS_EXTENDED } from '@/lib/mock-monetization';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  ChevronRight,
  Star,
  RotateCcw,
  Zap,
  Gavel,
  Calendar,
  Gift,
  Play,
  Maximize2,
  ShieldCheck,
  TrendingUp,
  Award,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { generateProductDescription } from '@/ai/flows/generate-product-description';
import { generateProductRecommendations } from '@/ai/flows/generate-product-recommendations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ProductCard } from '@/components/product/ProductCard';
import { InquiryModal } from '@/components/product/InquiryModal';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function ProductPage() {
  const { id, country } = useParams();
  const countryCode = (country as string) || 'us';
  const router = useRouter();
  const { toast } = useToast();
  const { addToCart, toggleWishlist, wishlist } = useAppStore();
  
  const product = useMemo(() => PRODUCTS.find(p => p.id === id), [id]);
  const monetization = useMemo(() => PRODUCTS_EXTENDED[id as string] || { priceVisible: true }, [id]);
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES.us;
  
  const [aiDescription, setAiDescription] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(true);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(true);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  
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

  return (
    <div className="bg-ivory min-h-screen">
      <InquiryModal 
        isOpen={isInquiryOpen} 
        onClose={() => setIsInquiryOpen(false)} 
        product={product} 
      />

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
              <div className="w-full h-full bg-muted flex items-center justify-center text-[10px] font-bold tracking-[0.5em] text-gray-300 uppercase italic">
                Atelier Perspective {activeMediaIndex + 1}
              </div>
              
              <div className="absolute bottom-8 left-8 flex space-x-2">
                 {[...Array(4)].map((_, idx) => (
                   <button 
                    key={idx} 
                    onClick={() => setActiveMediaIndex(idx)}
                    className={cn(
                      "w-12 h-16 border transition-all overflow-hidden relative flex items-center justify-center text-[6px] font-bold uppercase tracking-tighter",
                      activeMediaIndex === idx ? "border-plum bg-ivory text-plum scale-110 shadow-lg" : "border-border bg-muted text-gray-400 opacity-60"
                    )}
                   >
                     FRAME {idx+1}
                   </button>
                 ))}
              </div>

              {monetization.scarcityTag && (
                <div className="absolute top-8 left-8 bg-black px-6 py-3 text-[10px] font-bold tracking-[0.4em] text-white uppercase shadow-2xl luxury-blur bg-opacity-80">
                  {monetization.scarcityTag}
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-2/5 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-primary text-[10px] font-bold tracking-[0.5em] uppercase border-b border-gold/40 pb-1">
                  Private Acquisition Flow
                </span>
                <Button variant="ghost" size="icon" className="hover:text-primary transition-all" onClick={() => toggleWishlist(product)}>
                  <Heart className={cn("w-5 h-5", isWishlisted && "fill-plum text-plum")} />
                </Button>
              </div>
              
              <div className="space-y-2">
                <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight text-gray-900 italic">{product.name}</h1>
                <div className="flex items-center space-x-4">
                   <div className="flex text-gold">
                    {[...Array(5)].map((_, i) => <Star key={i} className={cn("w-4 h-4", i < Math.floor(product.rating) ? "fill-current" : "text-gray-200")} />)}
                   </div>
                   <span className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold">{product.reviewsCount} Appreciations</span>
                </div>
              </div>

              <div className="text-6xl font-light tracking-tighter pt-4 text-gray-900">
                {monetization.priceVisible ? formatPrice(product.basePrice, countryCode) : "Price on Request"}
              </div>
            </div>

            {/* High-Ticket Intelligence Block */}
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white p-6 border border-border space-y-2">
                  <div className="flex items-center space-x-2 text-secondary">
                     <Award className="w-4 h-4" />
                     <span className="text-[9px] font-bold uppercase tracking-widest">Collector Value</span>
                  </div>
                  <p className="text-lg font-headline font-bold italic">{monetization.collectorValue || 'Signature'}</p>
               </div>
               <div className="bg-white p-6 border border-border space-y-2">
                  <div className="flex items-center space-x-2 text-secondary">
                     <TrendingUp className="w-4 h-4" />
                     <span className="text-[9px] font-bold uppercase tracking-widest">Market Status</span>
                  </div>
                  <p className="text-lg font-headline font-bold italic">{monetization.marketRange || 'Stable'}</p>
               </div>
            </div>

            <div className="space-y-4">
              {monetization.priceVisible ? (
                <Button 
                  size="lg" 
                  className="w-full bg-black text-white hover:bg-gold hover:text-black h-20 rounded-none text-[10px] font-bold tracking-[0.4em] shadow-2xl transition-all"
                  onClick={handleAddToCart}
                >
                  SECURE IN SHOPPING BAG
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  className="w-full bg-plum text-white hover:bg-gold hover:text-black h-20 rounded-none text-[10px] font-bold tracking-[0.4em] shadow-2xl transition-all"
                  onClick={() => setIsInquiryOpen(true)}
                >
                  REQUEST PRIVATE ACQUISITION
                </Button>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="h-16 rounded-none border-gray-900 text-[9px] font-bold tracking-widest uppercase hover:bg-gray-900 hover:text-white"
                  onClick={() => setIsInquiryOpen(true)}
                >
                  <Lock className="w-4 h-4 mr-2" /> DISCREET INQUIRY
                </Button>
                <Button 
                  variant="outline" 
                  className="h-16 rounded-none border-gray-900 text-[9px] font-bold tracking-widest uppercase hover:bg-gray-900 hover:text-white"
                  onClick={() => router.push(`/${countryCode}/appointments`)}
                >
                  <Calendar className="w-4 h-4 mr-2" /> ATELIER VIEWING
                </Button>
              </div>
            </div>

            <Tabs defaultValue="intelligence" className="w-full pt-12">
              <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-14 p-0 space-x-12 overflow-x-auto">
                <TabsTrigger value="intelligence" className="tab-trigger">Collector Intelligence</TabsTrigger>
                <TabsTrigger value="narrative" className="tab-trigger">The Narrative</TabsTrigger>
                <TabsTrigger value="provenance" className="tab-trigger">Provenance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="intelligence" className="pt-10 space-y-8 animate-fade-in min-h-[250px]">
                 <div className="p-10 bg-ivory border border-border shadow-sm space-y-6">
                    <div className="flex items-center space-x-3 text-plum">
                       <Zap className="w-5 h-5" />
                       <h3 className="text-[10px] font-bold uppercase tracking-[0.4em]">Investment Insight</h3>
                    </div>
                    <p className="text-lg text-gray-600 font-light leading-relaxed italic border-l-2 border-plum/20 pl-8">
                      {monetization.investmentInsight || "This artifact represents a stable position within the Maison archives, historically outperforming standard market benchmarks for its category."}
                    </p>
                 </div>
                 <div className="flex items-center space-x-4 text-gray-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Heritage Registry Certified</span>
                 </div>
              </TabsContent>

              <TabsContent value="narrative" className="pt-10 animate-fade-in min-h-[250px]">
                {loadingAi ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-muted w-full" />
                    <div className="h-4 bg-muted w-5/6" />
                  </div>
                ) : (
                  <div className="text-gray-600 font-light leading-relaxed whitespace-pre-wrap first-letter:text-6xl first-letter:font-headline first-letter:mr-3 first-letter:float-left first-letter:text-plum italic">
                    {aiDescription || "This artifact represents the pinnacle of Maison Amarisé's century-long pursuit of excellence."}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="provenance" className="pt-10">
                <ul className="space-y-6">
                  <DetailRow label="Atelier Origin" value={`Maison Amarisé Ateliers, Paris Flagship`} />
                  <DetailRow label="Heritage Series" value="Hand-curated archives" />
                  <DetailRow label="Certification" value="NFC-enabled authenticity chip included" />
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <section className="mt-40 border-t border-border pt-20">
          <div className="flex items-end justify-between mb-20">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-plum">
                 <Award className="w-5 h-5 text-gold" />
                 <span className="text-[10px] font-bold tracking-[0.5em] uppercase">Private Selection</span>
              </div>
              <h2 className="text-5xl font-headline font-bold italic text-gray-900">Resonant Artifacts</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {loadingRecs ? (
              [...Array(4)].map((_, i) => <div key={i} className="aspect-[4/5] bg-muted border border-border animate-pulse" />)
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

function DetailRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="grid grid-cols-3 gap-8 py-4 border-b border-border/40 last:border-0">
      <span className="text-[10px] font-bold uppercase tracking-widest text-plum">{label}</span>
      <span className="col-span-2 text-xs text-gray-500 font-light italic">{value}</span>
    </div>
  );
}
