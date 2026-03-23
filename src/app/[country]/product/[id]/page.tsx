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
  ArrowRight
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
  const { toggleWishlist, wishlist, addToCart } = useAppStore();
  
  const product = useMemo(() => PRODUCTS.find(p => p.id === id), [id]);
  const isWishlisted = wishlist.some(i => i.id === product?.id);

  if (!product) return <div className="py-40 text-center font-headline text-3xl">Artifact not found in registry.</div>;

  return (
    <div className="bg-white min-h-screen pb-20 lg:pb-40 animate-fade-in font-body">
      {/* 1. Breadcrumbs */}
      <nav className="hidden sm:block container mx-auto px-6 lg:px-12 pt-8 pb-4 max-w-[1600px]">
        <div className="flex items-center space-x-2 text-[10px] lg:text-[11px] font-normal text-gray-500 uppercase tracking-wide">
          <Link href={`/${countryCode}`} className="hover:text-black transition-colors">Maison</Link>
          <ChevronRight className="w-2 h-2" />
          <Link href={`/${countryCode}/category/${product.categoryId}`} className="hover:text-black transition-colors uppercase">{product.categoryId}</Link>
          <ChevronRight className="w-2 h-2" />
          <span className="text-gray-900 truncate">{product.name}</span>
        </div>
      </nav>

      <main className="container mx-auto px-6 lg:px-12 py-6 lg:py-12 max-w-[1600px]">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Column 1: Gallery & Visual Authority */}
          <div className="flex-1 space-y-12">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="hidden xl:flex flex-col space-y-4 w-20 shrink-0">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-white border border-gray-100 p-1 cursor-pointer hover:border-plum transition-colors">
                    <div className="relative w-full h-full bg-[#f8f8f8]">
                      <Image src={product.imageUrl} alt={`Registry View ${i}`} fill className="object-contain" sizes="80px" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative flex-1 aspect-[4/5] bg-white border border-gray-50 shadow-sm overflow-hidden group luxury-reveal">
                <Image 
                  src={product.imageUrl} 
                  alt={product.name} 
                  fill 
                  className="object-contain p-6 lg:p-12 transition-transform duration-[2s] group-hover:scale-105" 
                  priority 
                  fetchPriority="high" 
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Hidden Luxury Detail: Provenance Timeline */}
            <div className="hidden lg:block space-y-10 pt-12 border-t border-gray-100">
               <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Provenance Registry</h3>
               <div className="grid grid-cols-3 gap-8">
                  <ProvenanceStep label="Source" value="Paris Central Atelier" date="1924 Series" />
                  <ProvenanceStep label="Audit" value="Heritage Verified" date="March 2024" />
                  <ProvenanceStep label="Node" value={`${countryCode.toUpperCase()} Hub`} date="Registry Active" />
               </div>
            </div>
          </div>

          {/* Column 2: Actions & Technical Specs */}
          <div className="w-full lg:w-[450px] space-y-10">
            <header className="space-y-6">
              <div className="flex items-center space-x-3 text-[9px] font-bold text-plum uppercase tracking-[0.4em]">
                <ShieldCheck className="w-4 h-4 text-secondary" />
                <span>Verified Archive Entry</span>
              </div>
              <h1 className="text-3xl lg:text-5xl font-headline font-medium text-gray-900 leading-tight italic tracking-tight">
                {product.name}
              </h1>
              <div className="flex items-baseline space-x-4">
                <p className="text-2xl lg:text-4xl font-bold text-black tracking-tighter tabular">
                  {formatPrice(product.basePrice, countryCode)}
                </p>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Inc. Duty & Logistics</span>
              </div>
            </header>

            <div className="space-y-4">
              <div className="flex gap-3">
                <Button 
                  onClick={() => { addToCart(product); toast({ title: "Registry Updated", description: "Artifact added to bag." }); }}
                  className="flex-[4] h-16 lg:h-20 bg-plum text-white hover:bg-gold hover:text-black rounded-none text-[11px] font-bold tracking-[0.4em] uppercase transition-all shadow-xl"
                >
                  ADD TO SHOPPING BAG
                </Button>
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={cn("flex-1 h-16 lg:h-20 border border-gray-900 flex items-center justify-center transition-all", isWishlisted ? "bg-black text-white shadow-inner" : "bg-transparent hover:bg-ivory")}
                  aria-label="Add to Wishlist"
                >
                  <Heart className={cn("w-6 h-6", isWishlisted && "fill-white")} />
                </button>
              </div>
              <p className="text-[9px] text-gray-400 uppercase tracking-widest text-center italic">
                Absolute standard global white-glove dispatch included.
              </p>
            </div>

            {/* Condition Matrix - The Expertise Signal */}
            <ConditionMatrix condition={product.condition} />

            <div className="space-y-6 pt-4 border-t border-gray-100">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="artifact" className="border-b-0">
                  <AccordionTrigger className="text-[10px] font-bold tracking-[0.2em] uppercase py-4 hover:no-underline">THE ARTIFACT</AccordionTrigger>
                  <AccordionContent className="text-xs font-light text-gray-600 leading-relaxed italic">
                    {product.specialNotes || "Museum-grade preservation. All protective seals remain intact. Includes full archival packaging and heritage registry documentation."}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="logistics" className="border-b-0">
                  <AccordionTrigger className="text-[10px] font-bold tracking-[0.2em] uppercase py-4 hover:no-underline">LOGISTICS CHARTER</AccordionTrigger>
                  <AccordionContent className="text-xs font-light text-gray-600 leading-relaxed italic">
                    Dispatched from our {countryCode.toUpperCase()} flagship via specialized courier. Fully insured for replacement value.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <footer className="pt-8 flex items-center justify-between border-t border-gray-50">
              <button className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-gray-900 group">
                <HelpCircle className="w-4 h-4 text-gray-300 group-hover:text-black transition-colors" />
                <span className="underline underline-offset-8 decoration-gray-100 group-hover:decoration-plum transition-all">Consult Specialist</span>
              </button>
              <div className="flex items-center space-x-6 text-gray-400">
                <MessageCircle className="w-4 h-4 cursor-pointer hover:text-plum transition-colors" />
                <Mail className="w-4 h-4 cursor-pointer hover:text-plum transition-colors" />
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
    <div className="space-y-1 group">
       <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-gray-400 group-hover:text-plum transition-colors">{label}</span>
       <p className="text-xs font-bold uppercase tracking-tight text-gray-900">{value}</p>
       <p className="text-[9px] font-light italic text-gray-400">{date}</p>
    </div>
  );
}
