
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
  const authImage = placeholderData.placeholderImages.find(img => img.id === 'home-authenticity-banner')?.imageUrl || 'https://madisonavenuecouture.com/cdn/shop/files/Rectangle_257_fa9c3862-a0f7-426e-9a6a-582562bce41f.jpg?v=1770664405&width=720';
  const missionImage = placeholderData.placeholderImages.find(img => img.id === 'home-mission-banner')?.imageUrl || 'https://picsum.photos/seed/amarise-mission/1200/800';
  
  const gridSpring = placeholderData.placeholderImages.find(img => img.id === 'home-grid-spring')?.imageUrl;
  const gridArrivals = placeholderData.placeholderImages.find(img => img.id === 'home-grid-arrivals')?.imageUrl;
  const gridVisit = placeholderData.placeholderImages.find(img => img.id === 'home-grid-visit')?.imageUrl;

  const infoAuth = placeholderData.placeholderImages.find(img => img.id === 'home-info-auth')?.imageUrl;
  const infoSell = placeholderData.placeholderImages.find(img => img.id === 'home-info-sell')?.imageUrl;
  const infoShowroom = placeholderData.placeholderImages.find(img => img.id === 'home-info-showrooms')?.imageUrl;

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
                  <Image src={prod.imageUrl} alt={prod.name} fill className="object-contain transition-transform duration-[2s] group-hover/card:scale-105" />
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

      {/* 5. 100% Authenticity Guarantee Section */}
      <section className="flex flex-col lg:flex-row min-h-[500px] lg:h-[600px] overflow-hidden bg-black relative">
        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-auto overflow-hidden">
          <Image src={authImage} alt="Amarisé Authenticity Guarantee" fill className="object-cover" data-ai-hint="luxury bag" />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block">
          <div className="w-16 h-20 relative flex items-center justify-center">
            <svg viewBox="0 0 100 120" className="absolute inset-0 w-full h-full text-white fill-none stroke-current stroke-[2px]">
              <path d="M50 5 L10 25 L10 60 C10 85 50 115 50 115 C50 115 90 85 90 60 L90 25 L50 5 Z" />
            </svg>
            <div className="relative z-10 flex flex-col items-center leading-none text-white font-bold text-[10px] tracking-tighter">
              <span>A</span>
              <div className="w-6 h-px bg-white/40 my-0.5 rotate-[-45deg]" />
              <span>G</span>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 bg-black text-white p-12 lg:p-24 flex flex-col items-center lg:items-start justify-center text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-6xl font-headline font-medium tracking-tight">100% Authenticity Guarantee</h2>
            <p className="text-sm lg:text-base font-body font-light text-gray-300 leading-relaxed max-w-md">
              Every piece is authenticated and certified by our in-house team of luxury experts.
            </p>
          </div>
          <Button className="bg-white text-black hover:bg-gray-200 h-14 px-12 rounded-none text-[10px] font-bold uppercase tracking-[0.3em] transition-all">
            LEARN MORE
          </Button>
        </div>
      </section>

      {/* 6. Institutional Information Matrix (First Instance) */}
      <section className="container mx-auto px-6 lg:px-12 py-32 max-w-[1600px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          <InfoBlock imageUrl={infoAuth!} title="100% Authenticity Guarantee" description="The #1 Trusted Seller of New & Pre-Owned Hermès Bags. Learn about our authentication process." href={`/${countryCode}/customer-service`} />
          <InfoBlock imageUrl={infoSell!} title="Sell To Us" description="Sell or consign your bag to us. Receive a fast quote by our advisors." href={`/${countryCode}/how-to-sell`} />
          <InfoBlock imageUrl={infoShowroom!} title="Visit Our Showrooms" description="New York City & Palm Beach. Make an appointment, or to schedule a virtual showing." href={`/${countryCode}/appointments`} />
        </div>
      </section>

      {/* 7. Amarisé Maison Avenue Live Section */}
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
          <Image src={liveImage} alt="Amarisé Maison Live Archive Preview" fill className="object-cover grayscale-[20%] transition-all duration-[3s] hover:grayscale-0 hover:scale-105" data-ai-hint="luxury handbags" />
          <div className="absolute inset-0 bg-black/10" />
        </div>
      </section>

      {/* 8. Tactical Ticker */}
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

      {/* 9. Institutional Information Matrix (Second Instance) */}
      <section className="container mx-auto px-6 lg:px-12 py-32 max-w-[1600px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          <InfoBlock imageUrl={infoAuth!} title="100% Authenticity Guarantee" description="The #1 Trusted Seller of New & Pre-Owned Hermès Bags. Learn about our authentication process." href={`/${countryCode}/customer-service`} />
          <InfoBlock imageUrl={infoSell!} title="Sell To Us" description="Sell or consign your bag to us. Receive a fast quote by our advisors." href={`/${countryCode}/how-to-sell`} />
          <InfoBlock imageUrl={infoShowroom!} title="Visit Our Showrooms" description="New York City & Palm Beach. Make an appointment, or to schedule a virtual showing." href={`/${countryCode}/appointments`} />
        </div>
      </section>

      {/* 10. Our Mission Section (Dual-Panel) */}
      <section className="flex flex-col lg:flex-row min-h-[600px] overflow-hidden bg-black">
        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-auto overflow-hidden">
          <Image src={missionImage} alt="Maison Amarisé Our Mission" fill className="object-cover" data-ai-hint="luxury fashion" />
        </div>
        <div className="w-full lg:w-1/2 bg-black text-white p-12 lg:p-24 flex flex-col justify-center space-y-10">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-headline font-medium tracking-tight italic">Our Mission</h2>
            <div className="space-y-8 max-w-xl">
              <p className="text-sm lg:text-base font-body font-light leading-relaxed text-gray-300">
                At Amarisé Maison Avenue, we specialize in the rare, the iconic, and the extraordinary. As the leading global curator of Hermès and Chanel artifacts, we offer a curated selection of investment-worthy pieces with unmatched access and authenticity. We believe in empowering and inspiring connoisseurs to express themselves through fashion, confidence, and bold individuality.
              </p>
              <p className="text-sm lg:text-base font-body font-light leading-relaxed text-gray-300">
                From rare Hermès bags, to shoes and fine jewelry, we curate the most comprehensive stock of new and never worn accessories, in stock and in your hands the very next day. Welcome to the art of the selection.
              </p>
            </div>
          </div>
          <Link href={`/${countryCode}/about`}>
            <Button className="bg-white text-black hover:bg-gray-200 h-14 px-12 rounded-none text-[10px] font-bold uppercase tracking-[0.3em] transition-all w-fit shadow-xl">
              LEARN MORE
            </Button>
          </Link>
        </div>
      </section>

      {/* 11. As Seen In Press Marquee */}
      <section className="bg-white py-24 border-t border-gray-50 overflow-hidden">
        <div className="container mx-auto px-6 mb-16 text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-headline font-medium text-gray-900 italic">As Seen In</h2>
        </div>
        <div className="relative flex overflow-x-hidden border-y border-gray-100 py-12">
          <div className="animate-marquee flex items-center whitespace-nowrap space-x-20 lg:space-x-40">
            <PressLogo name="Bloomberg" className="font-sans font-black tracking-tighter text-3xl" />
            <PressLogo name="COVETEUR" className="font-sans font-bold tracking-[0.2em] text-2xl" />
            <PressLogo name="NEW YORK POST" className="font-sans font-black italic tracking-tighter text-3xl" />
            <PressLogo name="THE WALL STREET JOURNAL." className="font-headline font-bold text-2xl" />
            <PressLogo name="BUSINESS INSIDER" className="font-sans font-black tracking-tighter text-2xl" />
            <PressLogo name="Bloomberg" className="font-sans font-black tracking-tighter text-3xl" />
            <PressLogo name="COVETEUR" className="font-sans font-bold tracking-[0.2em] text-2xl" />
            <PressLogo name="NEW YORK POST" className="font-sans font-black italic tracking-tighter text-3xl" />
            <PressLogo name="THE WALL STREET JOURNAL." className="font-headline font-bold text-2xl" />
            <PressLogo name="BUSINESS INSIDER" className="font-sans font-black tracking-tighter text-2xl" />
          </div>
        </div>
        <div className="mt-16 text-center">
          <Link href={`/${countryCode}/journal`} className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 hover:text-black transition-colors border-b border-gray-200 pb-1">
            SEE ALL PRESS
          </Link>
        </div>
      </section>

      {/* 12. VIP Email Registry Section */}
      <section className="bg-[#f8f8f8] py-24 border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-4xl text-center space-y-8">
          <div className="space-y-4">
            <h3 className="text-3xl lg:text-4xl font-headline font-medium italic text-gray-900">Join the VIP Email List</h3>
            <p className="text-sm lg:text-base font-body font-light text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Join our VIP email list and get first access new product launches and all the latest updates from Madison Avenue Couture!
            </p>
          </div>
          <div className="max-w-2xl mx-auto w-full pt-4">
            <form className="flex flex-col sm:flex-row gap-0 border border-gray-200 bg-white shadow-sm overflow-hidden">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 h-16 px-8 text-sm font-light italic outline-none border-none bg-transparent placeholder:text-gray-300"
                required
              />
              <button 
                type="submit"
                className="h-16 px-12 bg-white text-gray-900 font-bold text-[11px] tracking-[0.3em] uppercase transition-all hover:bg-gray-50 border-l border-gray-100 group"
              >
                <span className="border-b border-gray-900 pb-0.5 group-hover:border-plum transition-all">SUBMIT</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 13. Institutional Trust Footer */}
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

function PressLogo({ name, className }: { name: string, className?: string }) {
  return (
    <span className={cn("text-gray-900 opacity-80 hover:opacity-100 transition-opacity cursor-default select-none", className)}>
      {name}
    </span>
  );
}

function CuratorialBlock({ imageUrl, title, subtitle, href, hint }: { imageUrl: string, title: string, subtitle: string, href: string, hint: string }) {
  return (
    <Link href={href} className="group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-muted shadow-sm">
      <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-[5s] group-hover:scale-110" data-ai-hint={hint} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
      <div className="absolute inset-x-0 bottom-0 p-8 lg:p-12 text-center text-white space-y-2 lg:space-y-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
        <h3 className="text-2xl lg:text-4xl font-headline font-medium italic tracking-tight">{title}</h3>
        <p className="text-[10px] lg:text-[12px] font-body font-light italic opacity-80 tracking-wide">{subtitle}</p>
      </div>
    </Link>
  );
}

function InfoBlock({ imageUrl, title, description, href }: { imageUrl: string, title: string, description: string, href: string }) {
  return (
    <div className="flex flex-col items-center text-center space-y-8 group">
      <div className="relative aspect-square w-full overflow-hidden bg-muted border border-gray-100 shadow-sm">
        <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-[2s] group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/[0.02]" />
      </div>
      <div className="space-y-4 max-w-sm px-4">
        <h3 className="text-3xl font-headline font-bold italic text-gray-900 tracking-tight leading-tight">{title}</h3>
        <p className="text-sm font-light text-gray-500 italic leading-relaxed">{description}</p>
      </div>
      <Link href={href}>
        <Button className="bg-black text-white hover:bg-plum h-12 px-12 rounded-none text-[10px] font-bold uppercase tracking-[0.3em] transition-all shadow-xl">
          READ MORE
        </Button>
      </Link>
    </div>
  );
}
