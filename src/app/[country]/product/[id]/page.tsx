
'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PRODUCTS, formatPrice, COUNTRIES } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  ChevronRight, 
  ChevronUp, 
  ChevronDown,
  Info, 
  Plus,
  ArrowRight,
  ShieldCheck,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
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
 * Normal Client Experience (Design A: The Institutional Registry).
 * Optimized for technical trust, transparency, and data-dense archival browsing.
 * Enhanced with dynamic SEO Authority metadata.
 */
export default function ProductPage() {
  const { id, country } = useParams();
  const countryCode = (country as string) || 'us';
  const { toast } = useToast();
  const { toggleWishlist, wishlist, addToCart } = useAppStore();
  
  const product = useMemo(() => PRODUCTS.find(p => p.id === id), [id]);
  const isWishlisted = wishlist.some(i => i.id === product?.id);

  if (!product) {
    return <div className="container mx-auto px-6 py-40 text-center font-headline text-3xl text-gray-900">Artifact not found.</div>;
  }

  return (
    <div className="bg-white min-h-screen pb-40 animate-fade-in font-body">
      {/* Dynamic SEO Title & Meta Tags */}
      <title>{product.seoTitle || `${product.name} | Amarisé Maison Registry`}</title>
      <meta name="description" content={product.seoDescription || product.specialNotes || product.name} />
      {product.targetKeyword && <meta name="keywords" content={product.targetKeyword} />}

      {/* Institutional JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "image": [product.imageUrl],
            "description": product.seoDescription || product.specialNotes || product.name,
            "sku": product.id,
            "brand": { "@type": "Brand", "name": "AMARISÉ MAISON AVENUE" },
            "offers": {
              "@type": "Offer",
              "url": `https://amarise-maison-avenue.com/${countryCode}/product/${product.id}`,
              "priceCurrency": COUNTRIES[countryCode]?.currency || "USD",
              "price": product.basePrice,
              "availability": "https://schema.org/InStock",
              "itemCondition": "https://schema.org/NewCondition"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": product.rating,
              "reviewCount": product.reviewsCount
            }
          })
        }}
      />

      {/* Breadcrumbs */}
      <nav className="container mx-auto px-12 pt-8 pb-4 max-w-[1600px]">
        <div className="flex items-center space-x-2 text-[11px] font-normal text-gray-500 uppercase tracking-wide">
          <Link href={`/${countryCode}`} className="hover:text-black">Home</Link>
          <ChevronRight className="w-2.5 h-2.5" />
          <Link href={`/${countryCode}/category/hermes`} className="hover:text-black">Registry Archive</Link>
          <ChevronRight className="w-2.5 h-2.5" />
          <span className="text-gray-900 line-clamp-1">{product.name}</span>
        </div>
      </nav>

      <main className="container mx-auto px-12 py-12 max-w-[1600px]">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Column 1: Vertical Thumbnails */}
          <div className="hidden lg:flex flex-col space-y-4 w-20 shrink-0">
            <button className="flex justify-center p-2 text-gray-300 hover:text-black transition-colors" aria-label="Scroll Up">
              <ChevronUp className="w-5 h-5" />
            </button>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="aspect-square bg-white border border-gray-100 p-1 cursor-pointer hover:border-black transition-all">
                  <div className="relative w-full h-full bg-[#f8f8f8]">
                    <Image src={product.imageUrl} alt={`View ${i}`} fill className="object-contain" sizes="80px" />
                  </div>
                </div>
              ))}
            </div>
            <button className="flex justify-center p-2 text-gray-300 hover:text-black transition-colors" aria-label="Scroll Down">
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Column 2: Main Gallery */}
          <div className="flex-1 space-y-12">
            <div className="relative aspect-[4/5] bg-white border border-gray-50 group shadow-sm">
              <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-12" priority fetchPriority="high" />
              <div className="absolute top-8 left-8">
                <Button variant="outline" className="h-9 px-6 rounded-none border-gray-900 bg-white text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all">
                  SEE SCALE
                </Button>
              </div>
            </div>

            <div className="bg-[#f8f8f8] p-8 flex items-start space-x-6 border border-gray-100">
              <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-gray-400 stroke-[1px]" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-light text-gray-600 leading-relaxed italic">
                  Comes with a Maison Amarisé Certificate of Authenticity.
                </p>
                <p className="text-[10px] text-gray-400 font-light">
                  Every artifact is authenticated by our senior curatorial board. <Link href="#" className="underline decoration-gray-200 hover:text-black">Audit Process</Link>
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Strategic Details & Primary Actions */}
          <div className="w-full lg:w-[450px] space-y-10">
            <header className="space-y-6">
              <h1 className="text-3xl font-headline font-medium text-gray-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-xl font-bold text-black tracking-tight">
                {formatPrice(product.basePrice, countryCode)}
              </p>
            </header>

            <div className="grid grid-cols-1 gap-3">
              <Button variant="outline" className="h-12 justify-between px-6 rounded-none border-gray-100 bg-[#fcfcfc] text-[11px] font-light italic text-gray-600 hover:bg-white hover:border-gray-900 transition-all group">
                <div className="flex items-center">
                  <Plus className="w-3.5 h-3.5 mr-3 text-gray-300 group-hover:text-black" />
                  What defines the rarity of this piece?
                </div>
              </Button>
              <Button variant="outline" className="h-12 justify-between px-6 rounded-none border-gray-100 bg-[#fcfcfc] text-[11px] font-light italic text-gray-600 hover:bg-white hover:border-gray-900 transition-all group">
                <div className="flex items-center">
                  <Plus className="w-3.5 h-3.5 mr-3 text-gray-300 group-hover:text-black" />
                  Request a high-fidelity condition report.
                </div>
              </Button>
            </div>

            {/* Primary Action Button: Standardized Plum/Gold */}
            <div className="flex gap-4">
              <Button 
                onClick={() => addToCart(product)}
                className="flex-[2] h-16 bg-plum text-white hover:bg-gold hover:text-gray-900 rounded-none text-[11px] font-bold tracking-[0.3em] uppercase shadow-lg transition-all"
              >
                ADD TO SHOPPING BAG
              </Button>
              <button 
                onClick={() => toggleWishlist(product)}
                className={cn(
                  "flex-1 h-16 border border-gray-900 flex items-center justify-center transition-all group bg-transparent",
                  isWishlisted ? "bg-black text-white" : "hover:bg-gray-50"
                )}
                aria-label="Save to Wishlist"
              >
                <Heart className={cn("w-4 h-4", isWishlisted && "fill-white")} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <span className="text-[11px] font-bold tracking-[0.1em] text-black uppercase">STATUS:</span>
                <p className="text-[11px] font-light text-gray-500 leading-relaxed italic">
                  Available for immediate acquisition with complimentary global white-glove logistics.
                </p>
              </div>
            </div>

            <div className="space-y-10 pt-6">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold tracking-[0.1em] text-black uppercase">CONDITION:</span>
                <span className="bg-gray-100 px-3 py-1 text-[10px] font-bold tracking-widest text-gray-900">PRISTINE</span>
                <Info className="w-3.5 h-3.5 text-gray-300" />
              </div>

              <div className="relative pt-4 pb-8 border-b border-gray-100">
                <div className="h-px w-full bg-gray-200 relative">
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-200" />
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 rounded-full bg-black" />
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 -translate-x-0 w-3 h-3 rounded-full bg-black border-4 border-white shadow-sm" />
                </div>
                <div className="flex justify-between mt-4">
                  <span className="text-[11px] font-light text-gray-400">Archives</span>
                  <span className="text-[11px] font-bold text-black uppercase tracking-widest">Unworn / Box Fresh</span>
                </div>
                <p className="text-[11px] font-light text-gray-500 italic mt-8 leading-relaxed">
                  {product.conditionDetails || "Museum-grade preservation. All protective seals remain intact. Includes full archival packaging and heritage registry documentation."}
                </p>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="description" className="border-b border-gray-100">
                <AccordionTrigger className="text-[11px] font-bold tracking-[0.2em] uppercase py-6 hover:no-underline">THE ARTIFACT</AccordionTrigger>
                <AccordionContent className="text-xs font-light text-gray-600 leading-relaxed italic pb-8">
                  {product.specialNotes || "A rare iteration of the Maison's architectural legacy. Hand-finished in our central atelier using heritage techniques preserved since 1924."}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping" className="border-b border-gray-100">
                <AccordionTrigger className="text-[11px] font-bold tracking-[0.2em] uppercase py-6 hover:no-underline">LOGISTICS & CARE</AccordionTrigger>
                <AccordionContent className="text-xs font-light text-gray-600 leading-relaxed pb-8">
                  Complimentary global white-glove dispatch. Insured for the total acquisition value.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <footer className="pt-10 flex items-center justify-between">
              <button className="flex items-center space-x-3 text-[11px] font-medium text-gray-900 group">
                <HelpCircle className="w-4 h-4 text-gray-300 group-hover:text-black transition-colors" />
                <span className="underline underline-offset-4 decoration-gray-200">Consult a Specialist</span>
              </button>
              
              <div className="flex items-center space-x-6">
                <span className="text-[9px] font-bold tracking-widest text-gray-400 uppercase">SHARE</span>
                <div className="flex items-center space-x-4 text-gray-400">
                  <MessageCircle className="w-3.5 h-3.5 cursor-pointer hover:text-black transition-colors" />
                  <Mail className="w-3.5 h-3.5 cursor-pointer hover:text-black transition-colors" />
                </div>
              </div>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
