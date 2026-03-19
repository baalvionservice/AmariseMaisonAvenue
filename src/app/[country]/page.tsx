'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { COLLECTIONS, COUNTRIES } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  Crown,
  Shirt,
  Gem,
  Watch,
  Award,
  Zap,
  Target
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

  useEffect(() => {
    async function loadRecs() {
      try {
        const scenario = activeVip 
          ? `Private curation for elite client ${activeVip.name} in ${currentCountry.name}. Market: ${countryCode}. Focus on high-value institutional artifacts based on intent: ${activeVip.subscriptionPlan || 'Heritage'}.`
          : `Luxury discovery for a new connoisseur in ${currentCountry.name}. Seasonal heritage pieces with high market resonance.`;

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
      {/* Hero: Institutional Authority */}
      <section className="relative h-[90vh] w-full flex items-end overflow-hidden" aria-label="Heritage Registry Hero">
        <Image 
          src="https://madisonavenuecouture.com/cdn/shop/files/SpringAuction_3.jpg?v=1772147453&width=1440" 
          alt="Maison Amarisé Heritage Auction - Elite Birkin Collection"
          fill
          className="object-cover animate-slow-zoom"
          priority
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="container mx-auto px-12 pb-32 relative z-10 text-white max-w-[1600px]">
          <div className="space-y-8 max-w-3xl">
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-[0.6em] uppercase opacity-80">
                Institutional Acquisition House
              </span>
              <h1 className="text-7xl md:text-[110px] font-headline font-medium leading-[0.85] tracking-tighter">
                The Heritage <br /> Registry
              </h1>
            </div>
            <p className="text-xl md:text-2xl font-light italic opacity-90 max-w-lg leading-relaxed">
              Managing the private transfer of high-value artifacts since 1924. Available via curatorial verification only.
            </p>
            <div className="pt-6">
              <Link href={`/${countryCode}/buying-guide`}>
                <Button className="bg-white text-black hover:bg-ivory px-16 h-16 rounded-none text-[10px] font-bold tracking-[0.4em] transition-all shadow-2xl uppercase" aria-label="Enter the Heritage Registry">
                  ENTER THE REGISTRY
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Autonomous Ticker: Real-time Engagement */}
      <section className="bg-primary py-5 text-center border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
           <Zap className="w-64 h-64 text-white" />
        </div>
        <Link 
          href={`/${countryCode}/category/hermes`} 
          className="text-white text-[9px] font-bold tracking-[0.4em] uppercase hover:text-secondary transition-colors relative z-10"
        >
          Specialist Access: Private Acquisition Flow for the 1924 Heritage Series Now Active in {currentCountry.name}
        </Link>
      </section>

      {/* Narrative: Institutional Voice */}
      <section className="container mx-auto px-12 py-48 max-w-[1600px]">
        <div className="flex flex-col lg:flex-row items-center gap-24 lg:gap-40">
          <div className="lg:w-1/2 relative aspect-[4/5] w-full overflow-hidden shadow-luxury group">
            <Image 
              src="https://picsum.photos/seed/amarise-mastery/1200/1500" 
              alt="Artisanal Mastery at Maison Amarisé" 
              fill 
              className="object-cover transition-transform duration-[3s] group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="lg:w-1/2 space-y-10 text-center lg:text-left">
            <div className="space-y-4">
              <span className="text-secondary text-[10px] font-bold tracking-[0.5em] uppercase">The Maison Intelligence</span>
              <h2 className="text-5xl md:text-7xl font-headline font-medium italic text-gray-900 tracking-tight leading-tight">
                The Standard <br /> of the Absolute
              </h2>
            </div>
            <p className="text-xl text-gray-500 font-light leading-relaxed italic max-w-xl border-l-2 border-secondary/20 pl-10">
              "Beyond the artifact lies the provenance. As an institutional acquisition house, our dialogue is between the master's legacy and the discerning collector's soul."
            </p>
            <div className="pt-6">
              <Link href={`/${countryCode}/about`} className="text-[10px] font-bold tracking-[0.4em] uppercase text-black hover:text-secondary transition-all border-b border-black pb-2">
                Discover our Institutional Heritage
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-48">
        {/* Departments: Professional Categorization */}
        <section className="container mx-auto px-12 max-w-[1600px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <DepartmentCard 
              icon={<Shirt className="w-6 h-6" />} 
              title="Haute Couture" 
              desc="Archival runway assets and bespoke tailoring."
              href={`/${countryCode}/category/apparel`}
            />
            <DepartmentCard 
              icon={<Gem className="w-6 h-6" />} 
              title="High Jewelry" 
              desc="Ethically audited rare gems and hand-sculpted gold."
              href={`/${countryCode}/category/jewelry`}
            />
            <DepartmentCard 
              icon={<Watch className="w-6 h-6" />} 
              title="Heritage Complications" 
              desc="Swiss-certified horological artifacts for collectors."
              href={`/${countryCode}/category/watches`}
            />
          </div>
        </section>

        {/* Private Salon: High Intent Recs (Behavior Driven) */}
        <section className="container mx-auto px-12 py-24 max-w-[1600px]">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-8">
            <div className="space-y-4">
               <div className="flex items-center space-x-3">
                  <Crown className="w-5 h-5 text-secondary" />
                  <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-gray-400">Personalized Acquisition Salon</span>
               </div>
               <h2 className="text-5xl font-headline font-medium text-gray-900 tracking-tight">
                 {activeVip ? `Curated for ${activeVip.name}` : "Discreet Allocation Only"}
               </h2>
               <p className="text-gray-400 text-[9px] uppercase tracking-[0.5em] font-bold">
                 {activeVip ? "AI-Optimized based on historical intent" : `Curatorial Verification Required for ${currentCountry.name} Market`}
               </p>
            </div>
            <Link href={`/${countryCode}/wishlist`}>
              <Button variant="ghost" className="text-[10px] font-bold tracking-[0.3em] uppercase hover:text-secondary transition-colors" aria-label="View Personal Registry">
                View Personal Registry <ArrowRight className="ml-2 w-3 h-3" />
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

        {/* Automated Retargeting Moment */}
        <section className="bg-plum/5 py-32 border-y border-border">
           <div className="container mx-auto px-12 max-w-4xl text-center space-y-12">
              <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-lg">
                 <Target className="w-8 h-8 text-plum" />
              </div>
              <h3 className="text-4xl md:text-5xl font-headline font-bold italic tracking-tight">The Heritage Intelligence</h3>
              <p className="text-xl text-gray-600 font-light leading-relaxed italic max-w-2xl mx-auto">
                "Our curatorial AI monitors global market resonance to invite you into the world's most significant collection events before they reach the public hub."
              </p>
              <Link href={`/${countryCode}/journal`}>
                 <Button className="bg-black text-white hover:bg-gold px-12 h-14 rounded-none text-[9px] font-bold uppercase tracking-widest">
                    EXPLORE THE INTELLIGENCE HUB
                 </Button>
              </Link>
           </div>
        </section>

        {/* Final Registry Invitation */}
        <section className="bg-white py-48 text-center border-t border-gray-100">
          <div className="max-w-3xl mx-auto space-y-16 px-12">
             <div className="inline-flex items-center justify-center p-5 bg-[#f9f7f9] rounded-full">
                <Sparkles className="w-6 h-6 text-secondary" />
             </div>
             <div className="space-y-6">
                <h3 className="text-5xl md:text-6xl font-headline font-medium italic text-gray-900 tracking-tight">The Institutional Registry</h3>
                <p className="text-gray-500 font-light leading-relaxed max-w-xl mx-auto italic text-lg">
                  Join our verified collector network for private acquisition invitations and digital previews of the Maison archives.
                </p>
             </div>
             <form className="flex flex-col sm:flex-row items-center justify-center gap-0 border-b border-gray-900 pb-2 max-w-md mx-auto focus-within:border-secondary transition-colors" aria-label="Institutional Registry Signup">
                <input 
                  type="email" 
                  placeholder="ACQUISITION EMAIL" 
                  className="bg-transparent w-full py-4 text-[10px] font-bold tracking-widest uppercase outline-none placeholder:text-gray-200"
                  required
                  aria-label="Collector Email Address"
                />
                <button type="submit" className="text-[10px] font-bold tracking-[0.4em] uppercase text-black hover:text-secondary transition-colors py-4 px-4">
                  SUBMIT
                </button>
             </form>
             <p className="text-[8px] text-gray-300 uppercase tracking-[0.4em] font-medium">
               Audited compliance with the Global Heritage Responsibility Charter.
             </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function DepartmentCard({ icon, title, desc, href }: { icon: React.ReactNode, title: string, desc: string, href: string }) {
  return (
    <Link href={href} className="group p-12 bg-white border border-gray-50 hover:border-gray-200 hover:shadow-luxury transition-all duration-700 text-center space-y-8" aria-label={`Visit ${title} Department`}>
      <div className="inline-flex items-center justify-center w-14 h-14 bg-[#fcfcfc] border border-gray-100 rounded-full text-gray-400 group-hover:bg-secondary group-hover:text-white group-hover:border-secondary transition-all duration-500">
        {icon}
      </div>
      <div className="space-y-3">
        <h4 className="text-xl font-headline font-bold text-gray-900 group-hover:text-secondary transition-colors duration-500 tracking-tight">{title}</h4>
        <p className="text-[11px] text-gray-400 font-light leading-relaxed px-6 uppercase tracking-wider">{desc}</p>
      </div>
      <div className="pt-4 flex items-center justify-center text-[9px] font-bold tracking-[0.4em] uppercase text-gray-300 group-hover:text-black opacity-0 group-hover:opacity-100 transition-all">
        Speak with a Specialist <ChevronRight className="w-3 h-3 ml-1" />
      </div>
    </Link>
  );
}
