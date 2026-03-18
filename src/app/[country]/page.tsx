'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { COLLECTIONS, COUNTRIES } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  BookOpen, 
  Gem, 
  Watch, 
  Shirt, 
  ChevronRight,
  Sparkles,
  Crown
} from 'lucide-react';
import { generateProductRecommendations } from '@/ai/flows/generate-product-recommendations';
import { useAppStore } from '@/lib/store';
import { ProductCard } from '@/components/product/ProductCard';
import Image from 'next/image';

export default function HomePage() {
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES.us;
  const { activeVip, editorials } = useAppStore();
  
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(true);

  const latestEditorial = editorials.find(ed => ed.country === countryCode) || editorials[0];
  const featuredCollections = COLLECTIONS.slice(0, 3);

  useEffect(() => {
    async function loadRecs() {
      try {
        const scenario = activeVip 
          ? `VIP curation for ${activeVip.name} in ${currentCountry.name}. Market: ${countryCode}. Focus on heritage and high-value artifacts.`
          : `Luxury discovery for a new client in ${currentCountry.name}. Seasonal and iconic pieces.`;

        const res = await generateProductRecommendations({ scenario });
        setRecommendations(res.recommendations.slice(0, 3));
      } catch (e) {
        console.error("Personalization error:", e);
      } finally {
        setLoadingRecs(false);
      }
    }
    loadRecs();
  }, [countryCode, currentCountry.name, activeVip]);

  return (
    <div className="space-y-0 bg-background min-h-screen pb-40 animate-fade-in">
      <section className="relative h-[90vh] w-full flex items-end overflow-hidden">
        <Image 
          src="https://madisonavenuecouture.com/cdn/shop/files/SpringAuction_3.jpg?v=1772147453&width=1440" 
          alt="Spring Collector's Auction"
          fill
          className="object-cover animate-slow-zoom"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="container mx-auto px-12 pb-32 relative z-10 text-white max-w-[1600px]">
          <div className="space-y-8 max-w-3xl">
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-[0.6em] uppercase opacity-80">
                Institutional Event
              </span>
              <h1 className="text-7xl md:text-[110px] font-headline font-medium leading-[0.85] tracking-tighter">
                The Archive <br /> Registry
              </h1>
            </div>
            <p className="text-xl md:text-2xl font-light italic opacity-90 max-w-lg leading-relaxed">
              Curating high-value artifacts from the founding 1924 collections. Available for private acquisition only.
            </p>
            <div className="pt-6">
              <Link href={`/${countryCode}/buying-guide`}>
                <Button className="bg-white text-black hover:bg-ivory px-16 h-16 rounded-none text-[10px] font-bold tracking-[0.4em] transition-all shadow-2xl uppercase">
                  ENTER THE REGISTRY
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-5 text-center border-b border-white/5">
        <Link 
          href={`/${countryCode}/category/hermes`} 
          className="text-white text-[9px] font-bold tracking-[0.4em] uppercase hover:text-secondary transition-colors"
        >
          Specialist Access: Private Hermès Birkin Acquisition Flow Now Active
        </Link>
      </section>

      <section className="container mx-auto px-12 py-40 max-w-[1600px]">
        <div className="flex flex-col lg:flex-row items-center gap-24 lg:gap-40">
          <div className="lg:w-1/2 relative aspect-[4/5] w-full overflow-hidden shadow-luxury group">
            <Image 
              src="https://picsum.photos/seed/amarise-mastery/1200/1500" 
              alt="Maison Mastery" 
              fill 
              className="object-cover transition-transform duration-[3s] group-hover:scale-105"
              data-ai-hint="fashion atelier"
            />
          </div>
          <div className="lg:w-1/2 space-y-10 text-center lg:text-left">
            <div className="space-y-4">
              <span className="text-secondary text-[10px] font-bold tracking-[0.5em] uppercase">The Maison Voice</span>
              <h2 className="text-5xl md:text-7xl font-headline font-medium italic text-gray-900 tracking-tight leading-tight">
                The Pulse <br /> of Mastery
              </h2>
            </div>
            <p className="text-xl text-gray-500 font-light leading-relaxed italic max-w-xl border-l-2 border-secondary/20 pl-10">
              "Beyond the object lies the provenance. As a private acquisition house since 1924, we believe in the dialogue between the master's hand and the collector's soul."
            </p>
            <div className="pt-6">
              <Link href={`/${countryCode}/about`} className="text-[10px] font-bold tracking-[0.4em] uppercase text-black hover:text-secondary transition-all border-b border-black pb-2">
                Discover our Institutional Heritage
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-40">
        <section className="container mx-auto px-12 max-w-[1600px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <DepartmentCard 
              icon={<Shirt className="w-6 h-6" />} 
              title="Haute Couture" 
              desc="Bespoke tailoring and archival runway assets."
              href={`/${countryCode}/category/apparel`}
            />
            <DepartmentCard 
              icon={<Gem className="w-6 h-6" />} 
              title="High Jewelry" 
              desc="Museum-grade stones and hand-sculpted gold."
              href={`/${countryCode}/category/jewelry`}
            />
            <DepartmentCard 
              icon={<Watch className="w-6 h-6" />} 
              title="Heritage Complications" 
              desc="Swiss horological secrets and investment pieces."
              href={`/${countryCode}/category/timepieces`}
            />
          </div>
        </section>

        <section className="relative h-[60vh] w-full flex items-center overflow-hidden bg-ivory">
          <div className="absolute right-0 top-0 w-2/3 h-full overflow-hidden">
            <Image 
              src="https://picsum.photos/seed/amarise-pause/1920/1080" 
              alt="Atelier Silence" 
              fill 
              className="object-cover opacity-40 grayscale"
              data-ai-hint="minimal architecture"
            />
          </div>
          <div className="container mx-auto px-12 relative z-10 max-w-[1600px]">
            <div className="max-w-2xl space-y-8">
              <h2 className="text-6xl md:text-8xl font-headline font-medium italic text-black leading-none">Architecture <br /> of Rarity</h2>
              <p className="text-lg text-gray-600 font-light italic max-w-md">
                Exploring the intervals where craftsmanship transforms into institutional legacy.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-12 py-12 max-w-[1600px]">
          <div className="flex flex-col items-center text-center space-y-6 mb-24">
             <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-gray-400">Market Intelligence</span>
             <h2 className="text-5xl md:text-6xl font-headline font-medium italic text-gray-900">The Series Edit</h2>
             <div className="w-12 h-px bg-secondary" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {featuredCollections.map((col) => (
              <Link key={col.id} href={`/${countryCode}/collection/${col.id}`} className="group relative aspect-[3/4] overflow-hidden bg-[#f8f8f8]">
                <div className="w-full h-full bg-muted flex items-center justify-center text-[10px] font-bold tracking-[0.5em] text-gray-300 uppercase transition-all duration-[2s] group-hover:scale-105 group-hover:bg-ivory">
                  {col.name} Archive
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-16 text-center space-y-4">
                  <span className="text-secondary text-[9px] font-bold tracking-[0.5em] uppercase">Archive Only</span>
                  <h3 className="text-3xl font-headline font-bold text-white italic">{col.name}</h3>
                  <div className="flex items-center text-white text-[9px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                    Explore Series <ArrowRight className="ml-2 w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-12 py-24 max-w-[1600px]">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-8">
            <div className="space-y-4">
               <div className="flex items-center space-x-3">
                  <Crown className="w-5 h-5 text-secondary" />
                  <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-gray-400">The Private Salon</span>
               </div>
               <h2 className="text-5xl font-headline font-medium text-gray-900 tracking-tight">Private Acquisition Only</h2>
               <p className="text-gray-400 text-[9px] uppercase tracking-[0.5em] font-bold">Collector Verification Required for {currentCountry.name}</p>
            </div>
            <Link href={`/${countryCode}/wishlist`}>
              <Button variant="ghost" className="text-[10px] font-bold tracking-[0.3em] uppercase hover:text-secondary transition-colors">
                View Private Selection <ArrowRight className="ml-2 w-3 h-3" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20">
            {loadingRecs ? (
              [...Array(3)].map((_, i) => <div key={i} className="aspect-[3/4] bg-muted animate-pulse border border-gray-50" />)
            ) : (
              recommendations.map(rec => (
                <ProductCard key={rec.id} product={rec} />
              ))
            )}
          </div>
        </section>

        <section className="py-40 text-center bg-ivory">
          <div className="container mx-auto px-12 max-w-[1600px] flex flex-col items-center space-y-12">
            <h3 className="text-4xl md:text-5xl font-headline font-medium italic text-black tracking-widest leading-relaxed max-w-4xl mx-auto">
              "A curated world of rare expressions, <br /> defined by the absolute."
            </h3>
            <div className="w-16 h-px bg-secondary" />
            <Link href={`/${countryCode}/appointments`}>
               <Button variant="outline" className="border-black h-16 px-16 rounded-none text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-black hover:text-white transition-all">
                 Request Private Appointment
               </Button>
            </Link>
          </div>
        </section>

        <section className="bg-white py-48 text-center border-t border-gray-100">
          <div className="max-w-3xl mx-auto space-y-16 px-12">
             <div className="inline-flex items-center justify-center p-5 bg-[#f9f7f9] rounded-full">
                <Sparkles className="w-6 h-6 text-secondary" />
             </div>
             <div className="space-y-6">
                <h3 className="text-5xl md:text-6xl font-headline font-medium italic text-gray-900 tracking-tight">The Collector Registry</h3>
                <p className="text-gray-500 font-light leading-relaxed max-w-xl mx-auto italic text-lg">
                  Receive private invitations to seasonal launches and digital premieres from the Maison Amarisé archives.
                </p>
             </div>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-0 border-b border-gray-900 pb-2 max-w-md mx-auto focus-within:border-secondary transition-colors">
                <input 
                  type="email" 
                  placeholder="YOUR EMAIL ADDRESS" 
                  className="bg-transparent w-full py-4 text-[10px] font-bold tracking-widest uppercase outline-none placeholder:text-gray-200"
                />
                <button className="text-[10px] font-bold tracking-[0.4em] uppercase text-black hover:text-secondary transition-colors py-4">
                  SUBMIT
                </button>
             </div>
             <p className="text-[8px] text-gray-300 uppercase tracking-[0.4em] font-medium">
               By submitting, you agree to our Private Heritage Charter.
             </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function DepartmentCard({ icon, title, desc, href }: { icon: React.ReactNode, title: string, desc: string, href: string }) {
  return (
    <Link href={href} className="group p-12 bg-white border border-gray-50 hover:border-gray-200 hover:shadow-luxury transition-all duration-700 text-center space-y-8">
      <div className="inline-flex items-center justify-center w-14 h-14 bg-[#fcfcfc] border border-gray-100 rounded-full text-gray-400 group-hover:bg-secondary group-hover:text-white group-hover:border-secondary transition-all duration-500">
        {icon}
      </div>
      <div className="space-y-3">
        <h4 className="text-xl font-headline font-bold text-gray-900 group-hover:text-secondary transition-colors duration-500 tracking-tight">{title}</h4>
        <p className="text-[11px] text-gray-400 font-light leading-relaxed px-6 uppercase tracking-wider">{desc}</p>
      </div>
      <div className="pt-4 flex items-center justify-center text-[9px] font-bold tracking-[0.4em] uppercase text-gray-300 group-hover:text-black opacity-0 group-hover:opacity-100 transition-all">
        Consult Specialist <ChevronRight className="w-3 h-3 ml-1" />
      </div>
    </Link>
  );
}
