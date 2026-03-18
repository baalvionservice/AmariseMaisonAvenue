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
  Zap,
  Calendar,
  ShieldCheck,
  TrendingUp,
  Award,
  Lock,
  Sparkles,
  Info
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
            scenario: `Private acquisition recommendations for elite client viewing ${product.name}. Focus on collector synergy.`,
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

  return (
    <div className="bg-ivory min-h-screen">
      <InquiryModal 
        isOpen={isInquiryOpen} 
        onClose={() => setIsInquiryOpen(false)} 
        product={product} 
      />

      <div className="container mx-auto px-6 py-12 max-w-[1600px]">
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-[10px] tracking-widest uppercase mb-12 text-muted-foreground font-bold">
          <Link href={`/${countryCode}`} className="hover:text-primary transition-colors">Maison</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/${countryCode}/category/${product.categoryId}`} className="hover:text-primary transition-colors uppercase">{product.categoryId}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-black" aria-current="page">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-24">
          {/* Main Visuals */}
          <div className="w-full lg:w-[55%] space-y-8">
            <div className="group relative aspect-[4/5] overflow-hidden bg-white border border-border shadow-luxury">
              <div className="w-full h-full bg-muted flex items-center justify-center text-[10px] font-bold tracking-[0.5em] text-gray-300 uppercase italic">
                Atelier Perspective {activeMediaIndex + 1}
              </div>
              
              {monetization.scarcityTag && (
                <div className="absolute top-8 left-8 bg-black px-6 py-3 text-[10px] font-bold tracking-[0.4em] text-white uppercase shadow-2xl luxury-blur bg-opacity-80 border border-white/10">
                  {monetization.scarcityTag}
                </div>
              )}

              <div className="absolute bottom-8 left-8 flex space-x-3">
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
            </div>
          </div>

          {/* Acquisition Details */}
          <div className="w-full lg:w-[45%] space-y-12">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-secondary">
                   <CrownIcon className="w-5 h-5" />
                   <span className="text-[10px] font-bold tracking-[0.5em] uppercase border-b border-gold/40 pb-1">
                     Private Acquisition Flow
                   </span>
                </div>
                <Button variant="ghost" size="icon" className="hover:text-primary transition-all" onClick={() => toggleWishlist(product)}>
                  <Heart className={cn("w-5 h-5", isWishlisted && "fill-plum text-plum")} />
                </Button>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-headline font-bold leading-[0.9] text-gray-900 italic tracking-tighter">{product.name}</h1>
                <div className="flex items-center space-x-6 pt-2">
                   <div className="flex text-gold">
                    {[...Array(5)].map((_, i) => <Star key={i} className={cn("w-4 h-4", i < Math.floor(product.rating) ? "fill-current" : "text-gray-200")} />)}
                   </div>
                   <span className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold border-l border-border pl-6">{product.reviewsCount} Archive Appreciations</span>
                </div>
              </div>

              <div className="text-7xl font-light tracking-tighter text-gray-900">
                {monetization.priceVisible ? formatPrice(product.basePrice, countryCode) : "Inquire for Price"}
              </div>
            </div>

            {/* High-Ticket Intelligence Block */}
            <div className="grid grid-cols-2 gap-6">
               <IntelligenceTile icon={<Award className="w-5 h-5" />} label="Collector Value" value={monetization.collectorValue || 'Signature Artifact'} />
               <IntelligenceTile icon={<TrendingUp className="w-5 h-5" />} label="Market Status" value={monetization.marketRange || 'Highly Resilient'} />
            </div>

            {/* Primary Acquisition Actions */}
            <div className="space-y-6 pt-4">
              <Button 
                size="lg" 
                className="w-full bg-plum text-white hover:bg-black h-24 rounded-none text-[11px] font-bold tracking-[0.5em] shadow-2xl transition-all border-none"
                onClick={() => setIsInquiryOpen(true)}
              >
                <Lock className="w-4 h-4 mr-4" /> REQUEST PRIVATE ACQUISITION
              </Button>
              
              <div className="grid grid-cols-2 gap-6">
                <Button 
                  variant="outline" 
                  className="h-16 rounded-none border-gray-900 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-gray-900 hover:text-white transition-all"
                  onClick={() => setIsInquiryOpen(true)}
                >
                  <Sparkles className="w-4 h-4 mr-3" /> SPEAK WITH A CURATOR
                </Button>
                <Button 
                  variant="outline" 
                  className="h-16 rounded-none border-gray-900 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-gray-900 hover:text-white transition-all"
                  onClick={() => router.push(`/${countryCode}/appointments`)}
                >
                  <Calendar className="w-4 h-4 mr-3" /> ATELIER VIEWING
                </Button>
              </div>
            </div>

            <Tabs defaultValue="intelligence" className="w-full pt-16">
              <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-14 p-0 space-x-12">
                <TabsTrigger value="intelligence" className="tab-trigger">Collector Insight</TabsTrigger>
                <TabsTrigger value="narrative" className="tab-trigger">The Narrative</TabsTrigger>
                <TabsTrigger value="provenance" className="tab-trigger">Provenance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="intelligence" className="pt-12 space-y-10 animate-fade-in min-h-[300px]">
                 <div className="p-12 bg-white border border-border shadow-luxury relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                       <Zap className="w-40 h-40 text-black" />
                    </div>
                    <div className="relative z-10 space-y-8">
                       <div className="flex items-center space-x-4 text-plum">
                          <TrendingUp className="w-6 h-6" />
                          <h3 className="text-[11px] font-bold uppercase tracking-[0.5em]">Investment Analysis</h3>
                       </div>
                       <p className="text-xl text-gray-600 font-light leading-relaxed italic border-l-2 border-plum/20 pl-10">
                         {monetization.investmentInsight || "This artifact represents a stable position within the Maison archives, historically outperforming standard market benchmarks for its category by 12% annually."}
                       </p>
                    </div>
                 </div>
                 <div className="flex items-center space-x-4 text-gray-400">
                    <ShieldCheck className="w-5 h-5 text-secondary" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Maison Registry Verified</span>
                 </div>
              </TabsContent>

              <TabsContent value="narrative" className="pt-12 animate-fade-in min-h-[300px]">
                {loadingAi ? (
                  <div className="space-y-6 animate-pulse">
                    <div className="h-6 bg-muted w-full" />
                    <div className="h-6 bg-muted w-5/6" />
                    <div className="h-6 bg-muted w-4/6" />
                  </div>
                ) : (
                  <div className="text-2xl text-gray-700 font-light leading-relaxed whitespace-pre-wrap first-letter:text-[120px] first-letter:font-headline first-letter:mr-8 first-letter:float-left first-letter:text-black italic">
                    {aiDescription || "This artifact represents the pinnacle of Maison Amarisé's century-long pursuit of excellence."}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="provenance" className="pt-12">
                <ul className="space-y-10">
                  <DetailRow label="Atelier Origin" value={`Maison Amarisé Ateliers, Paris Flagship`} />
                  <DetailRow label="Heritage Series" value="Hand-curated Founding Archives" />
                  <DetailRow label="Certification" value="NFC-enabled global authenticity registry" />
                  <DetailRow label="Material Purity" value="Audited for artisanal responsibility" />
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Resonance Section */}
        <section className="mt-60 border-t border-border pt-32">
          <div className="flex items-end justify-between mb-24">
            <div className="space-y-6">
              <div className="flex items-center space-x-4 text-plum">
                 <Award className="w-8 h-8 text-gold" />
                 <span className="text-[11px] font-bold tracking-[0.6em] uppercase">Private Selection</span>
              </div>
              <h2 className="text-6xl font-headline font-bold italic text-gray-900 tracking-tight">Resonant Artifacts</h2>
            </div>
            <Link href={`/${countryCode}/category/all`} className="text-[10px] font-bold tracking-[0.4em] uppercase text-black hover:text-plum transition-colors border-b border-black pb-2 flex items-center">
               Explore Full Archive <ChevronRight className="w-3 h-3 ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
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

function IntelligenceTile({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="bg-white p-8 border border-border space-y-4 hover:border-gold transition-colors group">
      <div className="flex items-center space-x-3 text-secondary group-hover:scale-110 transition-transform origin-left">
         {icon}
         <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 group-hover:text-plum">{label}</span>
      </div>
      <p className="text-2xl font-headline font-bold italic text-gray-900">{value}</p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="grid grid-cols-3 gap-12 py-6 border-b border-border/40 last:border-0 group">
      <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-plum group-hover:text-gold transition-colors">{label}</span>
      <span className="col-span-2 text-lg text-gray-500 font-light italic leading-snug">{value}</span>
    </div>
  );
}

function CrownIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 15l-2-7 5 2 4-7 4 7 5-2-2 7H5z" />
      <path d="M5 15v4h14v-4" />
    </svg>
  );
}
