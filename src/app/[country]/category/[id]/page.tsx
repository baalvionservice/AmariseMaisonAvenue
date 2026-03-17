
'use client';

import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { PRODUCTS, CATEGORIES, COUNTRIES, formatPrice } from '@/lib/mock-data';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  Filter, 
  SlidersHorizontal,
  LayoutGrid,
  List
} from 'lucide-react';
import Link from 'next/link';

export default function CategoryPage() {
  const { country, id } = useParams();
  const searchParams = useSearchParams();
  const sub = searchParams.get('sub');
  const countryCode = (country as string) || 'us';
  
  const category = CATEGORIES.find(c => c.id === id);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter(p => p.category.toLowerCase() === category?.name.toLowerCase());
    if (sub) {
      // In a real app we'd filter by subcategory
    }
    if (sortBy === 'price-low') list = [...list].sort((a, b) => a.basePrice - b.basePrice);
    if (sortBy === 'price-high') list = [...list].sort((a, b) => b.basePrice - a.basePrice);
    return list;
  }, [category, sortBy, sub]);

  if (!category) return <div className="py-40 text-center">Department not found</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-[10px] tracking-widest uppercase mb-12 text-muted-foreground">
        <Link href={`/${countryCode}`} className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">{category.name}</span>
        {sub && (
          <>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{sub}</span>
          </>
        )}
      </nav>

      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="space-y-4">
          <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">Department</span>
          <h1 className="text-6xl font-headline font-bold">{category.name}</h1>
          <p className="text-muted-foreground max-w-2xl font-light">
            An exquisite selection of {category.name.toLowerCase()}, curated for the discerning clientele of {COUNTRIES[countryCode]?.name}.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Filters Sidebar */}
        <aside className="lg:w-64 space-y-10 shrink-0">
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest flex items-center">
              <Filter className="w-3 h-3 mr-2" /> Filter By
            </h4>
            
            <div className="space-y-8">
              <FilterGroup title="Subcategories">
                {category.subcategories.map(s => (
                  <button key={s} className={`block text-sm font-light hover:text-primary transition-colors ${sub === s ? 'text-primary' : 'text-muted-foreground'}`}>
                    {s}
                  </button>
                ))}
              </FilterGroup>

              <FilterGroup title="Material">
                {['Silk', 'Cashmere', 'Fine Gold', 'Leather'].map(m => (
                  <div key={m} className="flex items-center space-x-3 group cursor-pointer">
                    <div className="w-4 h-4 border border-border group-hover:border-primary" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground">{m}</span>
                  </div>
                ))}
              </FilterGroup>

              <FilterGroup title="Price Range">
                <div className="space-y-4">
                  <div className="h-1 bg-muted relative rounded-full">
                    <div className="absolute left-1/4 right-1/4 h-full bg-primary" />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-tighter">
                    <span>{formatPrice(500, countryCode)}</span>
                    <span>{formatPrice(10000, countryCode)}</span>
                  </div>
                </div>
              </FilterGroup>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-10 pb-6 border-b border-border">
            <div className="text-[10px] tracking-widest uppercase text-muted-foreground font-bold">
              {filteredProducts.length} Pieces Found
            </div>
            <div className="flex items-center space-x-6">
              <select 
                className="bg-transparent text-[10px] tracking-widest uppercase font-bold outline-none cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <div className="flex items-center border-l border-border pl-6 space-x-3">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'text-primary' : 'text-muted-foreground'}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'text-primary' : 'text-muted-foreground'}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <Button variant="outline" className="border-border hover:bg-muted text-[10px] tracking-[0.3em] font-bold h-14 px-12 rounded-none">
              LOAD MORE MASTERPIECES
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{title}</h5>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}
