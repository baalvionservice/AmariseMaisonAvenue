
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { PRODUCTS, CATEGORIES, formatPrice } from '@/lib/mock-data';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  Filter, 
  LayoutGrid,
  List,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { generateCategoryNarrative } from '@/ai/flows/generate-category-narrative';

/**
 * CategoryPage: Redesigned for a Luxurious Digital Department experience.
 * Supports the 10 core departments with curated storytelling and artifact discovery.
 */
export default function CategoryPage() {
  const { country, id } = useParams();
  const searchParams = useSearchParams();
  const sub = searchParams.get('sub');
  const countryCode = (country as string) || 'us';
  
  const category = CATEGORIES.find(c => c.id === id);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [narrative, setNarrative] = useState<string | null>(null);
  const [loadingNarrative, setLoadingNarrative] = useState(true);

  // ENTERPRISE OPTIMIZATION: Memoize filtered products for high-volume catalogs
  const filteredProducts = useMemo(() => {
    if (!category) return [];
    
    let list = PRODUCTS.filter(p => p.category.toLowerCase() === category.name.toLowerCase());
    
    if (sub) {
      const lowerSub = sub.toLowerCase();
      list = list.filter(p => 
        p.subcategory.toLowerCase().includes(lowerSub) || 
        p.name.toLowerCase().includes(lowerSub)
      );
    }
    
    if (sortBy === 'price-low') list = [...list].sort((a, b) => a.basePrice - b.basePrice);
    if (sortBy === 'price-high') list = [...list].sort((a, b) => b.basePrice - a.basePrice);
    
    return list;
  }, [category, sortBy, sub]);

  useEffect(() => {
    if (!category) return;
    async function fetchNarrative() {
      try {
        const res = await generateCategoryNarrative({
          categoryName: category.name,
          subcategories: category.subcategories,
        });
        setNarrative(res.narrative);
      } catch (e) {
        setNarrative(null);
      } finally {
        setLoadingNarrative(false);
      }
    }
    fetchNarrative();
  }, [category]);

  if (!category) return <div className="py-40 text-center font-headline text-3xl">Department not found</div>;

  return (
    <div className="animate-fade-in bg-ivory min-h-screen pb-40">
      {/* Category Hero / Department Banner */}
      <section className="relative h-[40vh] w-full flex items-end justify-center overflow-hidden border-b border-border">
        <Image 
          src={`https://picsum.photos/seed/amarise-dept-${id}/2560/1440`} 
          alt={category.name}
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ivory" />
        <div className="relative z-10 text-center space-y-6 max-w-5xl px-6 pb-20">
          <nav className="flex items-center justify-center space-x-2 text-[10px] tracking-widest uppercase text-muted-foreground mb-4">
            <Link href={`/${countryCode}`} className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-bold">{category.name}</span>
          </nav>
          <span className="text-primary text-[10px] font-bold tracking-[0.5em] uppercase">Maison Department</span>
          <h1 className="text-6xl md:text-8xl font-headline font-bold text-gray-900 leading-tight">
            {category.name}
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Refined Filters Sidebar */}
          <aside className="lg:w-80 space-y-12 shrink-0">
            <div className="space-y-10 sticky top-32">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 text-plum">
                  <Sparkles className="w-4 h-4" />
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em]">Curation Filters</h4>
                </div>
                
                <div className="space-y-10">
                  <FilterGroup title="Specialized Collections">
                    {category.subcategories.map(s => (
                      <Link 
                        key={s} 
                        href={`/${countryCode}/category/${id}?sub=${s}`}
                        className={`block text-xs font-light tracking-wide hover:text-plum transition-colors border-l-2 pl-4 py-1 ${sub === s ? 'text-plum border-gold font-bold' : 'text-muted-foreground border-transparent'}`}
                      >
                        {s}
                      </Link>
                    ))}
                  </FilterGroup>

                  <FilterGroup title="Atelier Preference">
                    {['Heritage Series', 'Bespoke Private', 'Seasonal Runway', 'Artisanal Archive'].map(m => (
                      <div key={m} className="flex items-center space-x-4 group cursor-pointer">
                        <div className="w-4 h-4 border border-border group-hover:border-plum transition-colors" />
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-gray-900">{m}</span>
                      </div>
                    ))}
                  </FilterGroup>

                  <FilterGroup title="Investment Range">
                    <div className="space-y-6">
                      <div className="h-0.5 bg-border relative rounded-full">
                        <div className="absolute left-1/4 right-1/4 h-full bg-gold shadow-sm" />
                      </div>
                      <div className="flex justify-between text-[9px] text-muted-foreground uppercase tracking-widest font-bold">
                        <span>{formatPrice(1200, countryCode)}</span>
                        <span>{formatPrice(50000, countryCode)}</span>
                      </div>
                    </div>
                  </FilterGroup>
                </div>
              </div>

              {/* Sidebar Editorial Snippet */}
              <div className="bg-white p-8 border border-border shadow-luxury space-y-4">
                 <h5 className="text-[10px] font-bold uppercase tracking-widest text-plum">Curator's Note</h5>
                 <p className="text-xs text-muted-foreground italic font-light leading-relaxed">
                   "Every artifact in the {category.name} department represents a marriage of centuries-old technique and contemporary vision."
                 </p>
              </div>
            </div>
          </aside>

          {/* Masterpiece Gallery */}
          <main className="flex-1 space-y-12">
            {/* Department Narrative (AI) */}
            <div className="bg-white/50 p-12 border border-border/40 luxury-blur space-y-8 mb-12">
               <div className="h-px w-20 bg-gold" />
               {loadingNarrative ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-4 bg-muted w-full" />
                  <div className="h-4 bg-muted w-5/6" />
                </div>
              ) : (
                <p className="text-2xl text-gray-700 font-light leading-relaxed italic font-headline">
                  {narrative}
                </p>
              )}
            </div>

            {/* Grid Controls */}
            <div className="flex justify-between items-center pb-6 border-b border-border">
              <div className="text-[10px] tracking-widest uppercase text-muted-foreground font-bold">
                {filteredProducts.length} Artifacts Discovered
              </div>
              <div className="flex items-center space-x-8">
                <select 
                  className="bg-transparent text-[10px] tracking-widest uppercase font-bold outline-none cursor-pointer text-plum hover:text-gold transition-colors"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Maison Featured</option>
                  <option value="price-low">Value: Low to High</option>
                  <option value="price-high">Value: High to Low</option>
                </select>
                <div className="flex items-center space-x-4 border-l border-border pl-8">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={cn("transition-colors", viewMode === 'grid' ? 'text-plum' : 'text-muted-foreground')}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={cn("transition-colors", viewMode === 'list' ? 'text-plum' : 'text-muted-foreground')}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Gallery */}
            <div className={`grid gap-12 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredProducts.slice(0, 24).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination / Load More */}
            {filteredProducts.length > 24 && (
              <div className="mt-24 flex flex-col items-center space-y-8">
                <div className="h-px w-full bg-border" />
                <Button 
                  variant="outline" 
                  className="border-plum text-plum hover:bg-plum hover:text-white text-[10px] tracking-[0.4em] font-bold h-16 px-16 rounded-none transition-all shadow-xl shadow-plum/5"
                >
                  REVEAL MORE MASTERPIECES <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="py-40 text-center space-y-4">
                <p className="text-xl text-muted-foreground font-light italic">The curators are currently preparing new artifacts for this selection.</p>
                <Link href={`/${countryCode}`}>
                  <Button variant="link" className="text-plum uppercase tracking-widest text-[10px] font-bold">Return to Main Gallery</Button>
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-900 border-b border-gold/30 pb-2">{title}</h5>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}
