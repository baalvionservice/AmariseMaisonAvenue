'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { 
  ChevronLeft, 
  Sparkles, 
  Lightbulb, 
  Package, 
  ArrowRight,
  Share2,
  Bookmark
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { generateBuyingGuideNarrative } from '@/ai/flows/generate-buying-guide-narrative';
import { cn } from '@/lib/utils';
import { COUNTRIES } from '@/lib/mock-data';

/**
 * BuyingGuideDetailPage: Cinematic editorial guide for luxury artifacts.
 */
export default function BuyingGuideDetailPage() {
  const { id, country } = useParams();
  const { buyingGuides, products, collections } = useAppStore();
  const countryCode = (country as string) || 'us';
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES.us;
  
  const guide = buyingGuides.find(g => g.id === id);
  const featured = products.filter(p => guide?.featuredProducts.includes(p.id));
  const relCollections = collections.filter(c => guide?.featuredCollections.includes(c.id));

  const [aiNarrative, setAiNarrative] = useState<string | null>(null);
  const [aiTips, setAiTips] = useState<string[]>([]);
  const [loadingAi, setLoadingAi] = useState(true);

  useEffect(() => {
    if (!guide) return;
    async function fetchAiNarrative() {
      setLoadingAi(true);
      try {
        const res = await generateBuyingGuideNarrative({
          category: guide.category,
          country: currentCountry.name
        });
        setAiNarrative(res.narrative);
        setAiTips(res.tips);
      } catch (e) {
        setAiNarrative(null);
      } finally {
        setLoadingAi(false);
      }
    }
    fetchAiNarrative();
  }, [guide, currentCountry.name]);

  if (!guide) {
    return <div className="py-40 text-center font-headline text-3xl">Guide not found.</div>;
  }

  return (
    <div className="animate-fade-in bg-ivory">
      {/* SEO: JSON-LD HowTo / Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": guide.title,
            "description": guide.excerpt,
            "image": guide.imageUrl,
            "author": {
              "@type": "Person",
              "name": guide.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "AMARISÉ MAISON AVENUE"
            },
            "datePublished": guide.date
          })
        }}
      />

      {/* Hero Header */}
      <section className="relative h-[60vh] w-full flex items-end overflow-hidden border-b border-border">
        <Image 
          src={guide.imageUrl} 
          alt={guide.title}
          fill
          className="object-cover opacity-80 animate-slow-zoom"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/10 to-transparent" />
        <div className="container mx-auto px-6 pb-20 relative z-10">
          <Link href={`/${countryCode}/buying-guide`} className="inline-flex items-center text-[10px] tracking-[0.4em] uppercase text-gray-900 hover:text-plum transition-colors mb-8">
            <ChevronLeft className="w-3 h-3 mr-2" /> Back to Guides
          </Link>
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-center space-x-6">
              <span className="text-plum text-xs font-bold tracking-[0.4em] uppercase">{guide.category} Guide</span>
              <span className="text-gray-400 text-[10px] uppercase tracking-widest">{guide.date}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-headline font-bold text-gray-900 leading-tight italic">
              {guide.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Narrative Content */}
      <section className="container mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-3 gap-24 items-start">
        <div className="lg:col-span-2 space-y-16">
          <div className="bg-white p-12 border border-border shadow-luxury relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-12 opacity-5">
                <Sparkles className="w-64 h-64" />
             </div>
             <div className="space-y-8 relative z-10">
                <div className="flex items-center space-x-4 text-plum">
                   <div className="w-10 h-10 bg-plum/10 rounded-full flex items-center justify-center font-headline font-bold italic">
                     {guide.author.charAt(0)}
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-plum">Words By</span>
                      <span className="text-xs font-bold uppercase">{guide.author}</span>
                   </div>
                </div>
                
                {loadingAi ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-muted w-full" />
                    <div className="h-4 bg-muted w-5/6" />
                  </div>
                ) : (
                  <div className="prose prose-xl font-light leading-relaxed text-gray-700 italic first-letter:text-7xl first-letter:font-headline first-letter:text-plum first-letter:float-left first-letter:mr-4 whitespace-pre-wrap">
                    {aiNarrative || guide.content}
                  </div>
                )}
             </div>
          </div>

          {/* Expert Tips Section */}
          <div className="space-y-12">
             <div className="flex items-center space-x-4">
                <Lightbulb className="w-8 h-8 text-gold" />
                <h2 className="text-3xl font-headline font-bold italic">Atelier Intelligence</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(aiTips.length > 0 ? aiTips : guide.tips).map((tip, idx) => (
                  <div key={idx} className="p-8 bg-white border border-border hover:border-gold transition-all group">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-plum mb-4 block">Point 0{idx + 1}</span>
                     <p className="text-lg text-gray-600 font-light italic leading-relaxed">
                       {tip}
                     </p>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Sidebar: Featured & Social */}
        <aside className="space-y-12 sticky top-32">
          <div className="bg-plum p-10 text-white shadow-luxury">
             <h3 className="text-2xl font-headline font-bold italic mb-6">Concierge Consultation</h3>
             <p className="text-xs text-white/70 font-light leading-relaxed italic mb-10">
               "If you require a more intimate exploration of these artifacts, our private curators are available for a bespoke digital tour."
             </p>
             <Link href={`/${countryCode}/contact`}>
                <button className="w-full h-14 bg-white text-plum hover:bg-gold hover:text-gray-900 transition-all text-[10px] font-bold tracking-[0.3em] uppercase">
                  Contact Specialist
                </button>
             </Link>
          </div>

          <div className="space-y-8">
             <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-plum border-b border-gold/30 pb-2">Resonance</h4>
             <div className="flex space-x-4">
                <Button variant="outline" className="flex-1 rounded-none border-border"><Share2 className="w-4 h-4 mr-2" /> Share</Button>
                <Button variant="outline" className="flex-1 rounded-none border-border"><Bookmark className="w-4 h-4 mr-2" /> Save</Button>
             </div>
          </div>

          {relCollections.length > 0 && (
            <div className="space-y-8">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-plum border-b border-gold/30 pb-2">Related Curations</h4>
               <div className="space-y-4">
                  {relCollections.map(col => (
                    <Link key={col.id} href={`/${countryCode}/collection/${col.id}`} className="group flex items-center space-x-4 p-4 bg-white border border-border hover:border-plum transition-all">
                       <div className="relative w-16 h-16 shrink-0 overflow-hidden">
                          <Image src={col.imageUrl} alt={col.name} fill className="object-cover" />
                       </div>
                       <div>
                          <span className="text-[8px] font-bold uppercase tracking-widest text-gold">Collection</span>
                          <h5 className="text-sm font-headline font-bold uppercase text-gray-900 line-clamp-1">{col.name}</h5>
                       </div>
                       <ChevronLeft className="w-4 h-4 rotate-180 ml-auto text-gray-300" />
                    </Link>
                  ))}
               </div>
            </div>
          )}
        </aside>
      </section>

      {/* Recommended Products Gallery */}
      <section className="container mx-auto px-6 py-32 border-t border-border mt-32">
         <div className="flex items-end justify-between mb-20">
            <div className="space-y-4">
               <div className="flex items-center space-x-3 text-plum">
                  <Package className="w-6 h-6 text-gold" />
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Curated Recommendations</span>
               </div>
               <h2 className="text-5xl font-headline font-bold italic text-gray-900">Artifacts to Consider</h2>
            </div>
            <Link href={`/${countryCode}/category/${guide.category.toLowerCase()}`} className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold hover:text-plum transition-colors flex items-center">
              Explore Full Gallery <ArrowRight className="w-3 h-3 ml-2" />
            </Link>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {featured.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
         </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-white py-40 border-t border-border text-center">
         <div className="max-w-3xl mx-auto space-y-12 px-6">
            <h3 className="text-4xl font-headline font-bold italic">A World of Heritage</h3>
            <p className="text-gray-500 font-light italic leading-relaxed text-lg">
              "True discovery is an architectural process. Continue your journey through the Maison's collective knowledge."
            </p>
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-8">
               <Link href={`/${countryCode}/journal`}>
                  <Button variant="outline" className="h-16 px-14 rounded-none border-foreground text-[10px] tracking-[0.4em] font-bold transition-all">
                    THE JOURNAL
                  </Button>
               </Link>
               <Link href={`/${countryCode}/buying-guide`}>
                  <Button className="h-16 px-14 rounded-none bg-plum text-white hover:bg-gold hover:text-gray-900 text-[10px] tracking-[0.4em] font-bold transition-all">
                    ALL BUYING GUIDES
                  </Button>
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
