
'use client';

import React, { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PRODUCTS, formatPrice, COUNTRIES } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  ChevronRight, 
  ShieldCheck,
  Mail,
  MessageCircle,
  HelpCircle,
  Clock,
  MapPin,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ConditionMatrix } from '@/components/product/ConditionMatrix';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

/**
 * ProductPage: Institutional Artifact View.
 * Optimized for high-fidelity technical detail and SEO authority.
 */
export default function ProductPage() {
  const { id, country } = useParams();
  const countryCode = (country as string) || 'us';
  const { toast } = useToast();
  const { toggleWishlist, wishlist, addToCart, setCartOpen } = useAppStore();
  
  const product = useMemo(() => PRODUCTS.find(p => p.id === id), [id]);
  const isWishlisted = wishlist.some(i => i.id === product?.id);

  if (!product) return <div className="py-40 text-center font-headline text-3xl">Artifact not found in registry.</div>;

  const handleAddToCart = () => {
    addToCart(product);
    setCartOpen(true);
    toast({ title: "Registry Updated", description: "Artifact added to shopping bag." });
  };

  return (
    <div className="bg-white min-h-screen pb-20 lg:pb-40 animate-fade-in font-body">
      {/* 1. Breadcrumbs */}
      <nav className="hidden sm:block container mx-auto px-6 lg:px-12 pt-12 pb-6 max-w-[1600px]">
        <div className="flex items-center space-x-3 text-[10px] lg:text-[11px] font-normal text-gray-400 uppercase tracking-widest">
          <Link href={`/${countryCode}`} className="hover:text-black transition-colors">Maison</Link>
          <ChevronRight className="w-2.5 h-2.5" />
          <Link href={`/${countryCode}/category/${product.categoryId}`} className="hover:text-black transition-colors uppercase">{product.categoryId}</Link>
          <ChevronRight className="w-2.5 h-2.5" />
          <span className="text-gray-900 truncate font-bold">{product.name}</span>
        </div>
      </nav>

      <main className="container mx-auto px-6 lg:px-12 py-6 lg:py-12 max-w-[1600px]">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          
          {/* Column 1: Gallery & Visual Authority */}
          <div className="flex-1 space-y-16">
            <div className="flex flex-col md:flex-row gap-10">
              {/* Vertical Gallery Thumbnails */}
              <div className="hidden xl:flex flex-col space-y-6 w-24 shrink-0">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-white border border-gray-100 p-1 cursor-pointer hover:border-plum transition-all duration-500 group">
                    <div className="relative w-full h-full bg-[#fcfcfc] overflow-hidden">
                      <Image src={product.imageUrl} alt={`Registry View ${i}`} fill className="object-contain group-hover:scale-110 transition-transform duration-700" sizes="100px" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Main Artifact Viewport */}
              <div className="relative flex-1 aspect-[4/5] bg-white border border-gray-50 shadow-sm overflow-hidden group luxury-reveal">
                <Image 
                  src={product.imageUrl} 
                  alt={product.name} 
                  fill 
                  className="object-contain p-8 lg:p-20 transition-transform duration-[3s] group-hover:scale-105" 
                  priority 
                  fetchPriority="high" 
                  sizes="(max-width: 768px) 100vw, 55vw"
                />
                <div className="absolute top-10 left-10 luxury-blur bg-black/5 px-6 py-2 border border-black/5 hidden md:block">
                   <span className="text-[10px] font-bold tracking-[0.6em] text-gray-900 uppercase italic">Archive Ref: {product.id.toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* Hidden Luxury Detail: Provenance Timeline */}
            <div className="hidden lg:block space-y-12 pt-16 border-t border-gray-100">
               <div className="flex items-center space-x-4 text-gray-400">
                  <Sparkles className="w-5 h-5 text-gold" />
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.5em]">Provenance Registry</h3>
               </div>
               <div className="grid grid-cols-3 gap-12">
                  <ProvenanceStep label="Source" value="Paris Central Atelier" date="1924 Heritage Series" />
                  <ProvenanceStep label="Audit" value="Heritage Verified" date="March 2024 Audit" />
                  <ProvenanceStep label="Node" value={`${countryCode.toUpperCase()} Jurisdictional Hub`} date="Registry Active" />
               </div>
            </div>
          </div>

          {/* Column 2: Actions & Technical Specs */}
          <div className="w-full lg:w-[500px] space-y-12">
            <header className="space-y-8">
              <div className="flex items-center space-x-4 text-[10px] font-bold text-plum uppercase tracking-[0.5em]">
                <ShieldCheck className="w-5 h-5 text-secondary" />
                <span>Verified Archive Entry</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-headline font-medium text-gray-900 leading-[1.1] italic tracking-tighter">
                {product.name}
              </h1>
              <div className="flex flex-col space-y-2">
                <div className="flex items-baseline space-x-6">
                  <p className="text-3xl lg:text-5xl font-bold text-black tracking-tighter tabular-nums leading-none">
                    {formatPrice(product.basePrice, countryCode)}
                  </p>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Inc. Duty & Logistics</span>
                </div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest italic pt-2">
                  Jurisdictional Hub: {COUNTRIES[countryCode]?.name} Archive
                </p>
              </div>
            </header>

            <div className="space-y-6">
              <div className="flex gap-4">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-[5] h-20 bg-black text-white hover:bg-plum rounded-none text-[12px] font-bold tracking-[0.5em] uppercase transition-all shadow-2xl shadow-black/10"
                >
                  ADD TO SHOPPING BAG
                </Button>
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={cn("flex-1 h-20 border-2 border-gray-900 flex items-center justify-center transition-all", isWishlisted ? "bg-black text-white shadow-inner" : "bg-transparent hover:bg-ivory")}
                  aria-label="Add to Archive"
                >
                  <Heart className={cn("w-7 h-7", isWishlisted && "fill-white")} />
                </button>
              </div>
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.4em] text-center italic">
                Absolute standard global white-glove dispatch included.
              </p>
            </div>

            {/* Condition Matrix - The Expertise Signal */}
            <ConditionMatrix condition={product.condition || 'PRISTINE'} />

            <div className="space-y-8 pt-6 border-t border-gray-100">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="artifact" className="border-b-0">
                  <AccordionTrigger className="text-[11px] font-bold tracking-[0.3em] uppercase py-6 hover:no-underline text-gray-900">THE ARTIFACT</AccordionTrigger>
                  <AccordionContent className="text-sm font-light text-gray-600 leading-relaxed italic first-letter:text-4xl first-letter:float-left first-letter:mr-2">
                    {product.specialNotes || "Museum-grade preservation. All protective seals remain intact. Includes full archival packaging and heritage registry documentation. This artifact represents the pinnacle of the Maison's 1924 series, curated specifically for the discerning collector."}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="logistics" className="border-b-0">
                  <AccordionTrigger className="text-[11px] font-bold tracking-[0.3em] uppercase py-6 hover:no-underline text-gray-900">LOGISTICS CHARTER</AccordionTrigger>
                  <AccordionContent className="text-sm font-light text-gray-600 leading-relaxed italic">
                    Dispatched from our {countryCode.toUpperCase()} flagship sanctuary via specialized curatorial courier. Fully insured for absolute replacement value with real-time tracking through the Maison Secure Portal.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <footer className="pt-12 flex flex-col sm:flex-row items-center justify-between border-t border-gray-50 gap-8">
              <button className="flex items-center space-x-4 text-[11px] font-bold uppercase tracking-[0.3em] text-gray-900 group">
                <HelpCircle className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors" />
                <span className="underline underline-offset-[12px] decoration-gray-100 group-hover:decoration-plum transition-all">Consult Specialist</span>
              </button>
              <div className="flex items-center space-x-8 text-gray-400">
                <MessageCircle className="w-5 h-5 cursor-pointer hover:text-plum transition-colors" />
                <Mail className="w-5 h-5 cursor-pointer hover:text-plum transition-colors" />
                <div className="h-8 w-[1.5px] bg-gray-50 hidden sm:block" />
                <MapPin className="w-5 h-5 cursor-pointer hover:text-plum transition-colors" />
              </div>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}

function ProvenanceStep({ label, value, date }: { label: string; value: string; date: string }) {
  return (
    <div className="space-y-2 group">
       <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-gray-400 group-hover:text-plum transition-colors">{label}</span>
       <p className="text-sm font-bold uppercase tracking-tight text-gray-900">{value}</p>
       <p className="text-[10px] font-light italic text-gray-400">{date}</p>
    </div>
  );
}
