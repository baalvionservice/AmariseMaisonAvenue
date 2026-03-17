
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { 
  PRODUCTS, 
  CATEGORIES, 
  COLLECTIONS, 
  COLORS, 
  SIZES, 
  formatPrice 
} from '@/lib/mock-data';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  Filter, 
  LayoutGrid,
  List,
  Sparkles,
  ArrowRight,
  Crown,
  History,
  Check,
  Search
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { generateCategoryNarrative } from '@/ai/flows/generate-category-narrative';
import { cn } from '@/lib/utils';

/**
 * CategoryPage: Enterprise-Grade Luxury Digital Department.
 * Supports 100+ categories, multi-dimensional filtering, and high-fidelity SEO.
 */
export default function CategoryPage() {
  const { country, id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const sub = searchParams.get('sub');
  const collectionFilter = searchParams.get('collection');
  const vipFilter = searchParams.get('vip') === 'true';
  const colorFilter = searchParams.get('color');
  const sizeFilter = searchParams.get('size');
  
  const countryCode = (country as string) || 'us';
  const category = CATEGORIES.find(c => c.id === id);
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [narrative, setNarrative] = useState<string | null>(null);
  const [loadingNarrative, setLoadingNarrative] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // ENTERPRISE OPTIMIZATION: Advanced Memoized Filter Matrix
  const filteredProducts = useMemo(() => {
    if (!category) return [];
    
    let list = PRODUCTS.filter(p => p.category.toLowerCase() === category.name.toLowerCase());
    
    if (sub) list = list.filter(p => p.subcategory.toLowerCase() === sub.toLowerCase());
    if (collectionFilter) list = list.filter(p => p.collectionId === collectionFilter);
    if (vipFilter) list = list.filter(p => p.isVip);
    if (colorFilter) list = list.filter(p => p.colors?.includes(colorFilter));
    if (sizeFilter) list = list.filter(p => p.sizes?.includes(sizeFilter));
    if (searchQuery) list = list.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (sortBy === 'price-low') list = [...list].sort((a, b) => a.basePrice - b.basePrice);
    if (sortBy === 'price-high') list = [...list].sort((a, b) => b.basePrice - a.basePrice);
    if (sortBy === 'popularity') list = [...list].sort((a, b) => b.rating - a.rating);
    
    return list;
  }, [category, sortBy, sub, collectionFilter, vipFilter, colorFilter, sizeFilter, searchQuery]);

  useEffect(() => {
    if (!category) return;
    async function fetchNarrative() {
      setLoadingNarrative(true);
      try {
        const res = await generateCategoryNarrative({
          categoryName: category.name,
          subcategories: category.subcategories.slice(0, 5),
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

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (!value || params.get(key) === value) params.delete(key);
    else params.set(key, value);
    router.push(`/${countryCode}/category/${id}?${params.toString()}`);
  };

  return (
    <div className="animate-fade-in bg-ivory min-h-screen pb-40">
      {/* SEO: JSON-LD ItemList & Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": `${category.name} Department`,
            "description": category.description,
            "itemListElement": filteredProducts.slice(0, 20).map((p, idx) => ({
              "@type": "ListItem",
              "position": idx + 1,
              "url": `https://amarise-luxe.com/${countryCode}/product/${p.id}`,
              "name": p.name,
              "image": p.imageUrl
            }))
          })
        }}
      />

      {/* Breadcrumbs Navigation */}
      <nav className="container mx-auto px-6 pt-10 flex items-center space-x-2 text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-bold">
        <Link href={`/${countryCode}`} className="hover:text-primary transition-colors">Maison</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">Departments</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-plum">{category.name}</span>
      </nav>

      {/* Category Hero */}
      <section className="relative h-[40vh] w-full flex items-end justify-center overflow-hidden">
        <Image 
          src={`https://picsum.photos/seed/amarise-dept-${id}/2560/1440`} 
          alt={category.name}
          fill
          className="object-cover opacity-50 grayscale-[20%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ivory" />
        <div className="relative z-10 text-center space-y-4 max-w-5xl px-6 pb-20">
          <span className="text-primary text-[10px] font-bold tracking-[0.5em] uppercase">International Department</span>
          <h1 className="text-6xl md:text-8xl font-headline font-bold text-gray-900 leading-tight">
            {category.name}
          </h1>
          <p className="text-lg text-gray-500 font-light italic max-w-2xl mx-auto">{category.description}</p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Advanced Multi-Level Filters */}
          <aside className="lg:w-80 space-y-12 shrink-0">
            <div className="space-y-10 sticky top-32">
              
              {/* Internal Department Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input 
                  type="text"
                  placeholder="SEARCH WITHIN DEPARTMENT"
                  className="w-full bg-white border border-border h-12 pl-10 pr-4 text-[9px] tracking-widest font-bold uppercase outline-none focus:border-plum transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-10">
                <FilterGroup title="Level 1: Curations">
                   <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {category.subcategories.map(s => (
                      <button 
                        key={s} 
                        onClick={() => updateFilters('sub', s)}
                        className={cn(
                          "block w-full text-left text-[10px] font-light tracking-wide hover:text-plum transition-all border-l-2 pl-4 py-2",
                          sub === s ? 'text-plum border-gold font-bold bg-plum/5' : 'text-muted-foreground border-transparent'
                        )}
                      >
                        {s}
                      </button>
                    ))}
                   </div>
                </FilterGroup>

                <FilterGroup title="Investment Exclusivity">
                   <button 
                     onClick={() => updateFilters('vip', vipFilter ? null : 'true')}
                     className={cn(
                       "flex items-center space-x-3 w-full p-4 border transition-all group",
                       vipFilter ? "border-gold bg-gold/5" : "border-border hover:border-gold"
                     )}
                   >
                     <Crown className={cn("w-4 h-4", vipFilter ? "text-gold" : "text-muted-foreground")} />
                     <span className={cn("text-[10px] uppercase tracking-widest font-bold", vipFilter ? "text-gray-900" : "text-muted-foreground")}>VIP Private Selection</span>
                     {vipFilter && <Check className="w-3 h-3 ml-auto text-gold" />}
                   </button>
                </FilterGroup>

                <FilterGroup title="Atelier Color Palette">
                   <div className="grid grid-cols-4 gap-3">
                     {COLORS.map(c => (
                       <button 
                        key={c}
                        onClick={() => updateFilters('color', c)}
                        title={c}
                        className={cn(
                          "w-full aspect-square border-2 transition-all",
                          colorFilter === c ? "border-gold scale-110 shadow-lg" : "border-transparent hover:border-border",
                          c === 'Ivory' && 'bg-[#FAF9F6]',
                          c === 'Gold' && 'bg-[#D4AF37]',
                          c === 'Plum' && 'bg-[#7E3F98]',
                          c === 'Midnight' && 'bg-[#191970]',
                          c === 'Emerald' && 'bg-[#50C878]',
                          c === 'Sapphire' && 'bg-[#0F52BA]',
                          c === 'Onyx' && 'bg-[#353935]'
                        )}
                       />
                     ))}
                   </div>
                </FilterGroup>

                <FilterGroup title="Size & Dimensions">
                   <div className="flex flex-wrap gap-2">
                     {SIZES.map(sz => (
                       <button 
                        key={sz}
                        onClick={() => updateFilters('size', sz)}
                        className={cn(
                          "px-4 py-2 border text-[9px] font-bold tracking-widest transition-all",
                          sizeFilter === sz ? "bg-plum text-white border-plum" : "bg-white border-border text-muted-foreground hover:border-plum"
                        )}
                       >
                         {sz}
                       </button>
                     ))}
                   </div>
                </FilterGroup>
              </div>

              {/* Reset Control */}
              <Button 
                variant="ghost" 
                className="w-full text-[9px] uppercase tracking-widest font-bold text-muted-foreground hover:text-destructive"
                onClick={() => router.push(`/${countryCode}/category/${id}`)}
              >
                Reset All Filters
              </Button>
            </div>
          </aside>

          {/* Catalog Gallery */}
          <main className="flex-1 space-y-12">
            {/* AI Curated Narrative */}
            <div className="bg-white p-12 border border-border/60 luxury-blur space-y-8 mb-12 relative overflow-hidden group shadow-luxury">
               <div className="h-px w-20 bg-gold" />
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <History className="w-40 h-40" />
               </div>
               {loadingNarrative ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-4 bg-muted w-full" />
                  <div className="h-4 bg-muted w-5/6" />
                </div>
              ) : (
                <div className="space-y-4 relative z-10">
                  <p className="text-2xl text-gray-700 font-light leading-relaxed italic font-headline">
                    {narrative}
                  </p>
                  <p className="text-[9px] text-muted-foreground font-bold tracking-[0.3em] uppercase">Maison Editorial Intelligence</p>
                </div>
              )}
            </div>

            {/* Gallery Control Bar */}
            <div className="flex justify-between items-center pb-6 border-b border-border">
              <div className="text-[10px] tracking-widest uppercase text-muted-foreground font-bold">
                Showing {filteredProducts.length} Artisanal Artifacts
              </div>
              <div className="flex items-center space-x-8">
                <select 
                  className="bg-transparent text-[10px] tracking-widest uppercase font-bold outline-none cursor-pointer text-plum hover:text-gold transition-colors"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured Gallery</option>
                  <option value="popularity">Critique Rating</option>
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

            {/* Product Gallery Grid */}
            <div className={cn(
              "grid gap-12 transition-all duration-700 ease-in-out",
              viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'
            )}>
              {filteredProducts.slice(0, 48).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* No Results Fallback */}
            {filteredProducts.length === 0 && (
              <div className="py-40 text-center space-y-12">
                <div className="flex justify-center">
                  <div className="p-12 bg-ivory border border-border rounded-full animate-pulse">
                    <Sparkles className="w-12 h-12 text-gold/30" />
                  </div>
                </div>
                <div className="space-y-6">
                  <p className="text-2xl text-muted-foreground font-light italic font-headline">The curators are currently preparing new treasures for this selection.</p>
                  <Button 
                    variant="outline" 
                    className="border-plum text-plum hover:bg-plum hover:text-white text-[10px] font-bold tracking-widest"
                    onClick={() => router.push(`/${countryCode}/category/${id}`)}
                  >
                    CLEAR FILTERS
                  </Button>
                </div>
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
