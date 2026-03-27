'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { COUNTRIES } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Crown, 
  Eye, 
  Lock,
  FlaskConical,
  Zap,
  Globe,
  Award,
  Package,
  Activity,
  Truck,
  ChevronLeft,
  ChevronRight,
  Heart
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import placeholderData from '@/app/lib/placeholder-images.json';

/**
 * Maison Homepage: The Minimalist Luxury Entry.
 * Optimized for high-fidelity detailing and architectural spacing.
 */
export default function HomePage() {
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES.us;
  const { products } = useAppStore();
  const [activeNewArrivalTab, setActiveNewArrivalTab] = useState('HERMÈS');

  const heroImage = placeholderData.placeholderImages.find(img => img.id === 'home-hero-banner-main')?.imageUrl || 'https://madisonavenuecouture.com/cdn/shop/files/Web_Banner_2.png?v=1773688964';
  const liveImage = placeholderData.placeholderImages.find(img => img.id === 'madave-live-section')?.imageUrl || 'https://picsum.photos/seed/amarise-live/1200/800';
  
  const gridSpring = placeholderData.placeholderImages.find(img => img.id === 'home-grid-spring')?.imageUrl;
  const gridArrivals = placeholderData.placeholderImages.find(img => img.id === 'home-grid-arrivals')?.imageUrl;
  const gridVisit = placeholderData.placeholderImages.find(img => img.id === 'home-grid-visit')?.imageUrl;

  // Specific "New Arrival" artifacts inspired by the reference image
  const newArrivals = [
    {
      id: 'prod-11',
      name: 'Hermès Kelly Sellier 25 Craie Epsom Electrum Hardware',
      price: 34500,
      imageUrl: 'https://madisonavenuecouture.com/cdn/shop/products/Hermes_Kelly_25_Sellier_Craie_Epsom_Electrum_Hardware_1.jpg?v=1691512345&width=1000'
    },
    {
      id: 'prod-kelly-yellow',
      name: 'Hermès Kelly Sellier 20 Jaune Mango Epsom Palladium Hardware',
      price: 32500,
      imageUrl: 'https://madisonavenuecouture.com/cdn/shop/files/Hermes_Kelly_20_Sellier_Jaune_Mango_Epsom_Palladium_Hardware_1.jpg?v=1691512345&width=1000'
    },
    {
      id: 'prod-birkin-hss',
      name: 'Hermès Special Order (HSS) Birkin 30 Hermès Birkin 30 Etoupe and Rose Sakura Chevre Mysore Brushed Gold Hardware',
      price: 34500,
      imageUrl: 'https://madisonavenuecouture.com/cdn/shop/products/Hermes_Birkin_30_Etoupe_and_Rose_Sakura_Chevre_Mysore_Brushed_Gold_Hardware_1.jpg?v=1691512345&width=1000'
    },
    {
      id: 'prod-kelly-green',
      name: 'Hermès Kelly Sellier 25 Vert Amande Epsom Gold Hardware',
      price: 24500,
      imageUrl: 'https://madisonavenuecouture.com/cdn/shop/files/Hermes_Kelly_25_Sellier_Vert_Amande_Epsom_Gold_Hardware_1.jpg?v=1691512345&width=1000'
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-40 animate-fade-in font-body">
      {/* 1. Cinematic Heritage Hero Banner */}
      <section className="relative h-[65vh] lg:h-[85vh] w-full flex items-center justify-center overflow-hidden bg-white">
        <Image 
          src={heroImage}
          alt="Maison Amarisé Heritage Collection"
          fill
          priority
          className="object-cover"
          data-ai-hint="luxury fashion"
        />
        
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        
        <div className="relative z-10 text-center space-y-8 lg:space-y-12 max-w-5xl px-6 lg:mt-20">
          <div className="space-y-4 lg:space-y-6">
            <span className="text-[10px] lg:text-[12px] font-bold tracking-[0.6em] text-white uppercase drop-shadow-md">
              Est. 1924 | Paris Flagship
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-[110px] font-headline font-medium text-white leading-[0.9] tracking-tighter italic drop-shadow-2xl">
              Amarisé Maison
            </h1>
          </div>
          
          <p className="text-lg md:text-2xl lg:text-3xl text-white/90 font-light italic max-w-3xl mx-auto leading-relaxed font-headline drop-shadow-lg">
            "Curating the world's most significant artifacts. A dialogue between human brilliance and the absolute standard of the archive."
          </p>
          
          <div className="pt-8 lg:pt-16 flex flex-col sm:flex-row items-center justify-center gap-6 lg:gap-10">
            <Link href={`/${countryCode}/category/hermes`}>
              <Button className="bg-white text-black hover:bg-black hover:text-white px-12 lg:px-24 h-16 lg:h-20 rounded-none text-[10px] lg:text-[11px] font-bold tracking-[0.4em] uppercase transition-all shadow-2xl">
                EXPLORE THE ARCHIVE
              </Button>
            </Link>
            <Link href={`/${countryCode}/appointments`}>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-10 lg:px-20 h-16 lg:h-20 rounded-none text-[10px] lg:text-[11px] font-bold tracking-[0.4em] uppercase transition-all">
                BOOK PRIVATE VIEWING
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Tactical Collection CTA Bar */}
      <Link href={`/${countryCode}/category/hermes`} className="block bg-[#262626] hover:bg-black transition-colors py-5 border-b border-white/5">
        <div className="container mx-auto px-6 text-center">
          <span className="text-[9px] md:text-[11px] font-bold tracking-[0.35em] text-white uppercase">
            SHOP OUR COLLECTION OF NEW HERMÈS BIRKIN BAGS
          </span>
        </div>
      </Link>

      {/* 3. Seasonal Curatorial Grid (3 Columns) */}
      <section className="container mx-auto px-6 lg:px-12 py-12 lg:py-20 max-w-[1600px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          <CuratorialBlock 
            imageUrl={gridSpring!} 
            title="Spring Edit" 
            subtitle="Refresh Your Closet" 
            href={`/${countryCode}/category/spring-edit`} 
            hint="luxury bags"
          />
          <CuratorialBlock 
            imageUrl={gridArrivals!} 
            title="Hermès New Arrivals" 
            subtitle="Just Arrived Bags" 
            href={`/${countryCode}/category/hermes`} 
            hint="hermes collection"
          />
          <CuratorialBlock 
            imageUrl={gridVisit!} 
            title="Visit Us" 
            subtitle="Shop In Person" 
            href={`/${countryCode}/contact`} 
            hint="luxury boutique"
          />
        </div>
      </section>

      {/* 4. New Arrivals Carousel Section */}
      <section className="container mx-auto px-6 lg:px-12 py-24 lg:py-32 max-w-[1600px] space-y-16">
        <div className="text-center space-y-8">
          <h2 className="text-5xl lg:text-6xl font-headline font-medium text-gray-900 tracking-tight">New Arrivals</h2>
          
          <div className="flex items-center justify-center space-x-12 border-b border-gray-100 pb-1">
            {['HERMÈS', 'CHANEL', 'OTHER BRANDS', 'VIEW ALL'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveNewArrivalTab(tab)}
                className={cn(
                  "pb-4 text-[11px] font-bold tracking-[0.2em] transition-all relative uppercase outline-none",
                  activeNewArrivalTab === tab ? "text-black" : "text-gray-400 hover:text-black"
                )}
              >
                {tab}
                {activeNewArrivalTab === tab && (
                  <motion.div layoutId="arrival-underline" className="absolute bottom-0 left-0 right-0 h-[1px] bg-black" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="relative group px-12">
          {/* Navigation Arrows */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:border-black hover:text-black transition-all bg-white z-10">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:border-black hover:text-black transition-all bg-white z-10">
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {newArrivals.map((prod) => (
              <div key={prod.id} className="flex flex-col items-center text-center space-y-8 group/card cursor-pointer">
                <div className="relative aspect-[4/5] w-full bg-white flex items-center justify-center p-8 overflow-hidden">
                  <Image 
                    src={prod.imageUrl} 
                    alt={prod.name} 
                    fill 
                    className="object-contain transition-transform duration-[2s] group-hover/card:scale-105" 
                  />
                  <button className="absolute top-4 right-4 text-gray-300 hover:text-black transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3 px-4">
                  <h3 className="text-[12px] font-light text-gray-600 uppercase tracking-widest leading-relaxed line-clamp-2">
                    {prod.name}
                  </h3>
                  <p className="text-[14px] font-bold text-gray-900 tabular-nums">
                    ${prod.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Amarisé Maison Avenue Live Section */}
      <section className="flex flex-col lg:flex-row min-h-[600px] border-b border-border overflow-hidden bg-black">
        <div className="lg:w-1/2 bg-black text-white p-12 lg:p-24 flex flex-col items-center justify-center text-center space-y-10 group luxury-reveal">
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center">
              <div className="h-px w-12 bg-gold/40 mb-6" />
              <h2 className="text-4xl lg:text-6xl font-headline font-medium italic tracking-tighter uppercase leading-tight max-w-md">
                Amarisé Maison <br /> Avenue Live
              </h2>
              <div className="h-px w-12 bg-gold/40 mt-6" />
            </div>
          </div>
          <div className="space-y-8 max-w-lg">
            <p className="text-xs lg:text-sm font-body font-light leading-relaxed text-gray-400 italic">
              Experience the absolute standard of discovery with our live shopping events. Featuring exotic archive entries and high-fidelity curatorial presentations from our global flagship ateliers.
            </p>
            <Link href={`/${countryCode}/account/live`} className="block group">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white group-hover:text-gold transition-colors border-b border-white/20 pb-2 flex items-center justify-center w-fit mx-auto">
                ENTER LIVE ATELIER <ArrowRight className="ml-3 w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-auto bg-muted overflow-hidden">
          <Image 
            src={liveImage}
            alt="Amarisé Maison Live Archive Preview"
            fill
            className="object-cover grayscale-[20%] transition-all duration-[3s] hover:grayscale-0 hover:scale-105"
            data-ai-hint="luxury handbags"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
      </section>

      {/* 6. Tactical Ticker */}
      <section className="bg-black py-5 border-y border-white/10">
        <div className="container mx-auto flex items-center justify-center space-x-16">
           <div className="flex items-center space-x-4 text-gold">
              <Zap className="w-4 h-4 animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase">REGISTRY SYNC: ACTIVE</span>
           </div>
           <p className="text-white/40 text-[10px] font-bold tracking-[0.4em] uppercase hidden md:block">
             Specialist Access: 1924 Heritage Series Now Syncing in {currentCountry.name} Hub
           </p>
           <div className="hidden lg:flex items-center space-x-4 text-white/20">
              <Globe className="w-4 h-4" />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase">GLOBAL NODES: 05 / 05</span>
           </div>
        </div>
      </section>

      {/* 7. Dual-Persona Acquisition Matrix */}
      <section className="container mx-auto px-6 py-40 max-w-[1600px]">
        <div className="text-center space-y-24">
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center p-6 bg-plum/5 rounded-full mb-4">
              <FlaskConical className="w-10 h-10 text-plum" />
            </div>
            <h3 className="text-6xl md:text-7xl font-headline font-bold italic text-gray-900 tracking-tighter">The Acquisition Strategy</h3>
            <p className="text-2xl text-gray-500 font-light italic leading-relaxed">
              Our digital presence is architected around two core flows optimized for technical transparency and narrative exclusivity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 px-6">
            <Link href={`/${countryCode}/product/prod-11`} className="group relative p-16 lg:p-24 bg-white border border-border hover:border-black transition-all text-left space-y-10 shadow-sm overflow-hidden">
              <div className="absolute top-0 right-0 p-16 lg:p-24 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                 <Eye className="w-80 h-80 text-black" />
              </div>
              <div className="flex items-center justify-between relative z-10">
                <div className="p-6 bg-ivory border border-border rounded-none text-gray-400 group-hover:text-black transition-colors">
                   <Eye className="w-8 h-8" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-gray-300">Design A</span>
              </div>
              <div className="space-y-6 relative z-10">
                <h4 className="text-5xl font-headline font-bold italic text-gray-900 leading-tight">The Institutional Registry</h4>
                <p className="text-lg text-gray-500 font-light italic leading-relaxed">
                  Normal Collector Flow: High-density technical data grid optimized for marketplace trust and absolute asset transparency.
                </p>
              </div>
              <div className="pt-12 flex items-center text-[11px] font-bold tracking-[0.5em] uppercase text-plum group-hover:translate-x-6 transition-transform relative z-10">
                AUDIT REGISTRY VIEW <ArrowRight className="w-5 h-5 ml-4" />
              </div>
            </Link>

            <Link href={`/${countryCode}/private-order/prod-11`} className="group relative p-16 lg:p-24 bg-[#0A0A0B] border border-white/5 hover:border-gold transition-all text-left space-y-10 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 p-16 lg:p-24 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Crown className="w-80 h-80 text-gold" />
              </div>
              <div className="flex items-center justify-between relative z-10">
                <div className="p-6 bg-white/5 border border-white/10 rounded-none text-gold">
                   <Lock className="w-8 h-8" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-white/20">Design B</span>
              </div>
              <div className="space-y-6 relative z-10">
                <h4 className="text-5xl font-headline font-bold italic text-white leading-tight">The Private Salon</h4>
                <p className="text-lg text-white/40 font-light italic leading-relaxed">
                  Elite Client Flow: Cinematic, narrative-first design reserved for high-value VIP artifacts and bespoke curatorial briefs.
                </p>
              </div>
              <div className="pt-12 flex items-center text-[11px] font-bold tracking-[0.5em] uppercase text-gold group-hover:translate-x-6 transition-transform relative z-10">
                AUDIT SALON VIEW <ArrowRight className="ml-4 w-5 h-5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Rare Archive Grid */}
      <section className="bg-ivory/30 py-60 border-y border-border">
         <div className="container mx-auto px-12 max-w-[1600px] space-y-32">
            <div className="flex flex-col md:row items-end justify-between gap-12">
               <div className="space-y-6">
                  <div className="flex items-center space-x-4 text-gold">
                     <Sparkles className="w-6 h-6" />
                     <span className="text-[12px] font-bold tracking-[0.6em] uppercase">The Selection</span>
                  </div>
                  <h3 className="text-6xl md:text-8xl font-headline font-bold italic tracking-tighter text-gray-900 leading-[0.9]">Rare Archive Entries</h3>
               </div>
               <Link href={`/${countryCode}/category/hermes`} className="text-[11px] font-bold tracking-[0.5em] uppercase text-black hover:text-plum transition-all border-b-2 border-black pb-3 flex items-center">
                 VIEW FULL REGISTRY <ArrowRight className="w-4 h-4 ml-3" />
               </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
               {products.slice(0, 3).map((prod, idx) => (
                 <Link key={prod.id} href={`/${countryCode}/product/${prod.id}`} className="group space-y-12 block">
                    <div className="relative aspect-[3/4] bg-white border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center p-16 luxury-reveal">
                       <div className="w-full h-full relative">
                          <Image 
                            src={prod.imageUrl} 
                            alt={prod.name} 
                            fill 
                            className="object-contain p-8 transition-transform duration-[3s] group-hover:scale-110" 
                          />
                       </div>
                       <div className="absolute inset-0 bg-black/[0.02] group-hover:bg-transparent transition-colors" />
                    </div>
                    <div className="space-y-6 text-center">
                       <span className="text-[11px] font-bold tracking-[0.6em] text-gray-400 uppercase">0{idx + 1} / {prod.categoryId.toUpperCase()} REGISTRY</span>
                       <h4 className="text-3xl font-headline font-bold italic text-gray-900 group-hover:text-plum transition-colors duration-700 leading-tight px-12">{prod.name}</h4>
                       <div className="flex items-center justify-center space-x-6 pt-6">
                          <div className="h-[1.5px] w-12 bg-gray-100 group-hover:w-20 group-hover:bg-plum transition-all duration-1000" />
                          <span className="text-lg font-bold tracking-tighter tabular-nums text-gray-900">${prod.basePrice.toLocaleString()}</span>
                          <div className="h-[1.5px] w-12 bg-gray-100 group-hover:w-20 group-hover:bg-plum transition-all duration-1000" />
                       </div>
                    </div>
                 </Link>
               ))}
            </div>
         </div>
      </section>

      {/* 9. Institutional Trust Footer */}
      <section className="bg-white py-80 text-center">
        <div className="max-w-5xl mx-auto space-y-24 px-12">
           <div className="inline-flex items-center justify-center p-10 bg-[#f9f7f9] rounded-full border border-plum/10 shadow-lg">
              <ShieldCheck className="w-14 h-14 text-plum" />
           </div>
           <div className="space-y-10">
              <h3 className="text-7xl md:text-8xl font-headline font-medium italic text-gray-900 tracking-tighter leading-none">Institutional Responsibility</h3>
              <p className="text-gray-500 font-light leading-relaxed max-w-3xl mx-auto italic text-3xl font-headline">
                "Every enrollment in our verified collector network is audited against the Global Heritage Charter. We maintain absolute discretion for all private client archives."
              </p>
           </div>
           <div className="flex flex-col items-center space-y-8 pt-16">
              <div className="flex items-center space-x-20 opacity-30 grayscale transition-all hover:grayscale-0 hover:opacity-100 cursor-help">
                 <ShieldCheck className="w-12 h-12" />
                 <Lock className="w-10 h-10" />
                 <Globe className="w-12 h-12" />
                 <Award className="w-12 h-12" />
              </div>
              <p className="text-[11px] text-gray-300 uppercase tracking-[0.6em] font-medium pt-8">
                Maison Amarisé Global Registry Hub • Node Alpha
              </p>
           </div>
        </div>
      </section>
    </div>
  );
}

function CuratorialBlock({ imageUrl, title, subtitle, href, hint }: { imageUrl: string, title: string, subtitle: string, href: string, hint: string }) {
  return (
    <Link href={href} className="group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-muted shadow-sm">
      <Image 
        src={imageUrl} 
        alt={title} 
        fill 
        className="object-cover transition-transform duration-[5s] group-hover:scale-110" 
        data-ai-hint={hint}
      />
      {/* Dynamic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
      
      {/* Content Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-8 lg:p-12 text-center text-white space-y-2 lg:space-y-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
        <h3 className="text-2xl lg:text-4xl font-headline font-medium italic tracking-tight">{title}</h3>
        <p className="text-[10px] lg:text-[12px] font-body font-light italic opacity-80 tracking-wide">{subtitle}</p>
      </div>
    </Link>
  );
}
