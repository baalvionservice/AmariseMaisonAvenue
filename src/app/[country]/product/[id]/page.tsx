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
  HelpCircle
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
      {/* JSON-LD Structured Data: Product Authority */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "image": [product.imageUrl],
            "description": product.specialNotes || product.name,
            "sku": product.id,
            "brand": { "@type": "Brand", "name": "AMARISÉ MAISON AVENUE" },
            "offers": {
              "@type": "Offer",
              "url": `https://amarise-maison-avenue.com/${countryCode}/product/${product.id}`,
              "priceCurrency": COUNTRIES[countryCode]?.currency || "USD",
              "price": product.basePrice,
              "availability": "https://schema.org/InStock",
              "itemCondition": "https://schema.org/NewCondition"
            }
          })
        }}
      />

      {/* 1. Breadcrumbs */}
      <nav className="hidden sm:block container mx-auto px-6 lg:px-12 pt-8 pb-4 max-w-[1600px]">
        <div className="flex items-center space-x-2 text-[10px] lg:text-[11px] font-normal text-gray-500 uppercase tracking-wide">
          <Link href={`/${countryCode}`} className="hover:text-black transition-colors">Maison</Link>
          <ChevronRight className="w-2 h-2" />
          <span className="text-gray-900 truncate">{product.name}</span>
        </div>
      </nav>

      <main className="container mx-auto px-6 lg:px-12 py-6 lg:py-12 max-w-[1600px]">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* Column 1: Gallery */}
          <div className="flex-1 flex flex-col md:flex-row gap-6">
            <div className="hidden xl:flex flex-col space-y-4 w-20 shrink-0">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-white border border-gray-100 p-1 cursor-pointer hover:border-plum transition-colors">
                  <div className="relative w-full h-full bg-[#f8f8f8]">
                    <Image src={product.imageUrl} alt={`Registry View ${i}`} fill className="object-contain" sizes="80px" />
                  </div>
                </div>
              ))}
            </div>

            <div className="relative flex-1 aspect-[4/5] bg-white border border-gray-50 shadow-sm overflow-hidden group">
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

          {/* Column 2: Actions */}
          <div className="w-full lg:w-[400px] xl:w-[450px] space-y-8 lg:space-y-10">
            <header className="space-y-4 lg:space-y-6">
              <div className="flex items-center space-x-2 text-[9px] font-bold text-plum uppercase tracking-[0.3em]">
                <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                <span>Verified Archive</span>
              </div>
              <h1 className="text-2xl lg:text-4xl font-headline font-medium text-gray-900 leading-tight italic tracking-tight">
                {product.name}
              </h1>
              <p className="text-xl lg:text-3xl font-bold text-black tracking-tighter tabular">
                {formatPrice(product.basePrice, countryCode)}
              </p>
            </header>

            <div className="space-y-4">
              <div className="flex gap-3">
                <Button 
                  onClick={() => { addToCart(product); toast({ title: "Registry Updated", description: "Artifact added to bag." }); }}
                  className="flex-[3] h-14 lg:h-16 bg-plum text-white hover:bg-gold hover:text-black rounded-none text-[10px] font-bold tracking-[0.3em] uppercase transition-all shadow-xl"
                >
                  ADD TO SHOPPING BAG
                </Button>
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={cn("flex-1 h-14 lg:h-16 border border-gray-900 flex items-center justify-center transition-all", isWishlisted ? "bg-black text-white shadow-inner" : "bg-transparent hover:bg-ivory")}
                  aria-label="Add to Wishlist"
                >
                  <Heart className={cn("w-5 h-5", isWishlisted && "fill-white")} />
                </button>
              </div>
              <p className="text-[10px] text-gray-400 italic text-center">
                Complimentary global white-glove dispatch included.
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-3">
                <span className="text-[10px] font-bold text-black uppercase tracking-widest">CONDITION:</span>
                <span className="bg-gray-100 px-3 py-1 text-[9px] font-bold tracking-widest text-gray-900 uppercase">Pristine</span>
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="artifact" className="border-b-0">
                  <AccordionTrigger className="text-[10px] font-bold tracking-[0.2em] uppercase py-4 hover:no-underline">THE ARTIFACT</AccordionTrigger>
                  <AccordionContent className="text-xs font-light text-gray-600 leading-relaxed italic">
                    {product.specialNotes || "Museum-grade preservation. All protective seals remain intact. Includes full archival packaging and heritage registry documentation."}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <footer className="pt-6 flex items-center justify-between border-t border-gray-50">
              <button className="flex items-center space-x-3 text-[10px] font-medium text-gray-900 group">
                <HelpCircle className="w-4 h-4 text-gray-300 group-hover:text-black transition-colors" />
                <span className="underline underline-offset-4 decoration-gray-100 group-hover:decoration-plum transition-all">Consult Specialist</span>
              </button>
              <div className="flex items-center space-x-4 text-gray-400">
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
