'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PRODUCTS, formatPrice, COUNTRIES } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  ChevronRight,
  Star,
  RotateCcw,
  Zap,
  Gavel,
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

export default function ProductPage() {
  const { id, country } = useParams();
  const countryCode = (country as string) || 'us';
  const router = useRouter();
  const { toast } = useToast();
  const { addToCart, toggleWishlist, wishlist, socialMetrics } = useAppStore();
  
  const product = useMemo(() => PRODUCTS.find(p => p.id === id), [id]);
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES.us;
  
  const [aiDescription, setAiDescription] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(true);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(true);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [is360Active, setIs360Active] = useState(false);
  
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
              {is360Active ? (
                <div className="w-full h-full flex flex-col items-center justify-center space-y-4 bg-ivory">
                   <RotateCcw className="w-12 h-12 text-gold animate-spin-slow" />
                   <p className="text-[10px] font-bold uppercase tracking-widest text-plum">Initializing Immersive 360° View</p>
                   <Button variant="ghost" className="text-[9px] uppercase font-bold" onClick={() => setIs360Active(false)}>Return to Still</Button>
                </div>
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-[10px] font-bold tracking-[0.5em] text-gray-300 uppercase italic">
                  Artisanal Perspective {activeMediaIndex + 1}
                </div>
              )}
              
              <div className="absolute bottom-8 left-8 flex space-x-2">
                 {product.mediaGallery?.map((m, idx) => (
                   <button 
                    key={idx} 
                    onClick={() => {
                      setActiveMediaIndex(idx);
                      setIs360Active(m.type === '360');
                    }}
                    className={cn(
                      "w-12 h-16 border bg-muted transition-all overflow-hidden relative flex items-center justify-center text-[6px] font-bold uppercase tracking-tighter text-gray-400",
                      activeMediaIndex === idx ? "border-plum scale-110 shadow-lg bg-ivory text-plum" : "border-border opacity-60"
                    )}
                   >
                     {m.type === 'video' ? 'VIDEO' : m.type === '360' ? '360°' : `P-${idx+1}`}
                   </button>
                 ))}
              </div>

              {product.isVip && (
                <div className="absolute top-8 left-8 bg-plum px-6 py-3 text-[10px] font-bold tracking-[0.4em] text-white uppercase shadow-2xl luxury-blur bg-opacity-80">
                  Private Edition
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-2/5 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-primary text-[10px] font-bold tracking-[0.5em] uppercase border-b border-gold/40 pb-1">
                  Atelier {currentCountry.office?.city}
                </span>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="hover:text-primary transition-all" onClick={() => toggleWishlist(product)}>
                    <Heart className={cn("w-5 h-5", isWishlisted && "fill-plum text-plum")} />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight text-gray-900 italic">{product.name}</h1>
                {product.listingType === 'auction' && (
                  <div className="flex items-center space-x-2 bg-gold/10 p-3 border border-gold/20 inline-flex">
                    <Gavel className="w-4 h-4 text-gold" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold">Active Bid: {formatPrice(product.currentBid || 0, countryCode)}</span>
                  </div>
                )}
              </div>

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
                {product.listingType === 'auction' ? 'PLACE YOUR BID' : 'ADD TO SHOPPING BAG'}
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
              <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-14 p-0 space-x-12 overflow-x-auto">
                <TabsTrigger value="narrative" className="tab-trigger">Narrative</TabsTrigger>
                <TabsTrigger value="provenance" className="tab-trigger">Provenance</TabsTrigger>
                <TabsTrigger value="inventory" className="tab-trigger">Stock</TabsTrigger>
                <TabsTrigger value="compliance" className="tab-trigger">Legal</TabsTrigger>
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

              <TabsContent value="inventory" className="pt-10">
                <div className="space-y-6">
                   <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Regional Availability</p>
                   {product.regionalStock?.map(rs => (
                     <div key={rs.warehouseId} className="flex justify-between items-center border-b border-border pb-4">
                        <div className="flex flex-col">
                           <span className="text-[10px] font-bold uppercase">{rs.warehouseName}</span>
                           <span className="text-[8px] text-muted-foreground uppercase">{rs.region} Market</span>
                        </div>
                        <span className={cn("text-xs font-bold", rs.stockCount < 5 ? "text-red-500" : "text-gray-900")}>
                          {rs.stockCount} Available
                        </span>
                     </div>
                   ))}
                </div>
              </TabsContent>

              <TabsContent value="compliance" className="pt-10 space-y-6">
                 <div className="p-6 bg-plum/5 border border-plum/10 rounded-sm">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2">Heritage Compliance</h4>
                    <p className="text-[9px] text-gray-500 leading-relaxed italic">
                      This artifact complies with global {currentCountry.name} import regulations and Maison sustainability charters. Full GDPR data protection applies to your acquisition registry.
                    </p>
                 </div>
                 <Button variant="outline" className="w-full h-12 text-[9px] font-bold uppercase tracking-widest border-border" onClick={() => toast({ title: "Document Downloaded", description: "Maison Sustainability Charter" })}>
                    VIEW COMPLIANCE DOCS
                 </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <section className="mt-40 border-t border-border pt-20">
          <div className="flex items-end justify-between mb-20">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-plum">
                 <Zap className="w-5 h-5 text-gold" />
                 <span className="text-[10px] font-bold tracking-[0.5em] uppercase">Intelligence Curation</span>
              </div>
              <h2 className="text-5xl font-headline font-bold italic text-gray-900">Complementary Artifacts</h2>
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
