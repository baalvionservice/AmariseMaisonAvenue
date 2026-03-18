'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { CITIES, COUNTRIES, PRODUCTS, COLLECTIONS } from '@/lib/mock-data';
import { generateCityNarrative } from '@/ai/flows/generate-city-narrative';
import { ProductCard } from '@/components/product/ProductCard';
import { 
  ChevronRight, 
  MapPin, 
  Phone, 
  Mail, 
  Sparkles, 
  Globe, 
  ArrowRight,
  Store
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CityPage() {
  const { country, cityId } = useParams();
  const countryCode = (country as string) || 'us';
  const city = CITIES.find(c => c.id === cityId);
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES.us;

  const [narrative, setNarrative] = useState<string | null>(null);
  const [loadingNarrative, setLoadingNarrative] = useState(true);

  const featuredProducts = PRODUCTS.filter(p => city?.featuredProducts.includes(p.id));
  const featuredCollections = COLLECTIONS.filter(c => city?.featuredCollections.includes(c.id));

  useEffect(() => {
    if (!city) return;
    async function fetchNarrative() {
      setLoadingNarrative(true);
      try {
        const res = await generateCityNarrative({
          cityName: city.name,
          country: currentCountry.name
        });
        setNarrative(res.narrative);
      } catch (e) {
        setNarrative(null);
      } finally {
        setLoadingNarrative(false);
      }
    }
    fetchNarrative();
  }, [city, currentCountry.name]);

  if (!city) return <div className="py-40 text-center font-headline text-3xl">Destination not found</div>;

  return (
    <div className="animate-fade-in bg-ivory pb-40">
      {/* Hero Header */}
      <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden bg-muted">
        {/* City Card Box Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
           <span className="text-[15vw] font-headline font-bold text-gray-900 italic tracking-tighter">{city.name}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-ivory" />
        <div className="relative z-10 text-center space-y-8 max-w-5xl px-6">
          <nav className="flex items-center justify-center space-x-2 text-[10px] tracking-widest uppercase text-muted-foreground mb-8">
            <Link href={`/${countryCode}`} className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">Destinations</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-plum font-bold">{city.name}</span>
          </nav>
          <span className="text-primary text-[10px] font-bold tracking-[0.5em] uppercase">The Global Ateliers</span>
          <h1 className="text-7xl md:text-9xl font-headline font-bold text-gray-900 leading-tight italic">
            {city.name}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light italic max-w-3xl mx-auto leading-relaxed">
            {city.description}
          </p>
        </div>
      </section>

      {/* Editorial Narrative */}
      <section className="container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="flex items-center space-x-4">
            <div className="h-px flex-1 bg-gold/30" />
            <Sparkles className="w-6 h-6 text-gold" />
            <div className="h-px flex-1 bg-gold/30" />
          </div>
          
          <div className="bg-white p-16 border border-border shadow-luxury relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-12 opacity-5">
                <Globe className="w-64 h-64" />
             </div>
             {loadingNarrative ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-4 bg-muted w-full" />
                  <div className="h-4 bg-muted w-5/6 mx-auto" />
                </div>
              ) : (
                <div className="space-y-8 relative z-10 text-center">
                  <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-plum">Maison Intelligence</h2>
                  <p className="text-3xl text-gray-800 font-light italic font-headline leading-relaxed max-w-3xl mx-auto">
                    {narrative}
                  </p>
                  <div className="h-px w-20 bg-gold mx-auto" />
                </div>
              )}
          </div>
        </div>
      </section>

      {/* City Trends & Collections */}
      <section className="container mx-auto px-6 py-12 space-y-32">
        {/* Trends Grid */}
        {city.trends.length > 0 && (
          <div className="space-y-20">
            <div className="text-center space-y-4">
              <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-plum">Local Resonance</h3>
              <h2 className="text-5xl font-headline font-bold italic text-gray-900">Atelier Trends: {city.name}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {city.trends.map((trend, idx) => (
                <div key={idx} className="bg-white p-12 border border-border shadow-sm group hover:border-gold transition-all">
                  <h4 className="text-2xl font-headline font-bold italic text-gray-900 mb-4 group-hover:text-plum transition-colors">{trend.title}</h4>
                  <p className="text-gray-500 font-light leading-relaxed italic border-l-2 border-gold/30 pl-6">
                    {trend.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Collections */}
        <div className="space-y-20">
           <div className="flex items-end justify-between border-b border-border pb-8">
              <div className="space-y-2">
                <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-plum">Curated Edits</h3>
                <h2 className="text-4xl font-headline font-bold italic text-gray-900">City-Specific Selection</h2>
              </div>
              <Link href={`/${countryCode}/category/apparel`} className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold hover:text-plum transition-colors flex items-center">
                Explore Full Catalog <ArrowRight className="w-3 h-3 ml-2" />
              </Link>
           </div>
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredCollections.map(col => (
                <Link key={col.id} href={`/${countryCode}/collection/${col.id}`} className="group relative aspect-[3/4] overflow-hidden shadow-luxury bg-muted flex items-center justify-center">
                  {/* Collection City Card Box Placeholder */}
                  <div className="text-[10px] font-bold tracking-[0.5em] text-gray-300 uppercase transition-transform duration-[2s] group-hover:scale-105 group-hover:text-plum">
                    {col.name} Edit
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-12 text-center text-white">
                    <span className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-4">Maison Edit</span>
                    <h3 className="text-3xl font-headline font-bold italic">{col.name}</h3>
                  </div>
                </Link>
              ))}
           </div>
        </div>

        {/* Flagship Section */}
        <div className="flex flex-col lg:flex-row items-center gap-24 py-20 bg-white p-16 border border-border shadow-luxury">
           <div className="lg:w-1/2 relative aspect-square shadow-2xl overflow-hidden group bg-muted flex items-center justify-center">
              {/* Flagship Card Box Placeholder */}
              <div className="text-[10px] font-bold tracking-[0.5em] text-gray-300 uppercase transition-transform duration-[2s] group-hover:scale-105">
                Flagship View
              </div>
              <div className="absolute inset-0 bg-plum/5" />
           </div>
           <div className="lg:w-1/2 space-y-10">
              <div className="flex items-center space-x-4 text-plum">
                 <Store className="w-8 h-8" />
                 <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase">The Flagship Experience</h3>
              </div>
              <h2 className="text-5xl font-headline font-bold italic leading-tight text-gray-900">Amarisé Luxe {city.office.city}</h2>
              <div className="space-y-6">
                <ContactRow icon={<MapPin className="w-4 h-4 text-gold" />} label="Address" value={city.office.address} />
                <ContactRow icon={<Phone className="w-4 h-4 text-gold" />} label="Concierge" value={city.office.phone} />
                <ContactRow icon={<Mail className="w-4 h-4 text-gold" />} label="Inquiry" value={city.office.email} />
              </div>
              <div className="pt-8">
                 <Link href={city.office.mapUrl} target="_blank">
                    <Button className="h-16 px-14 rounded-none bg-plum text-white hover:bg-gold hover:text-gray-900 text-[10px] tracking-[0.4em] font-bold transition-all">
                      REQUEST DIRECTIONS
                    </Button>
                 </Link>
              </div>
           </div>
        </div>
      </section>

      {/* Artifact Gallery */}
      <section className="container mx-auto px-6 py-24 space-y-20">
         <div className="text-center space-y-4">
            <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-plum">Local Availability</h3>
            <h2 className="text-5xl font-headline font-bold italic text-gray-900">Artisanal Artifacts in {city.name}</h2>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {featuredProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
         </div>
      </section>
    </div>
  );
}

function ContactRow({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-start space-x-6 group">
      <div className="mt-1">{icon}</div>
      <div className="space-y-1">
        <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
        <p className="text-sm font-light text-gray-900 italic leading-relaxed">{value}</p>
      </div>
    </div>
  );
}
