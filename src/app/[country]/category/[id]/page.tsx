
'use client';

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  PRODUCTS, 
  CATEGORIES, 
  formatPrice 
} from '@/lib/mock-data';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  Filter, 
  Search,
  Heart,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * CategoryPage: Refined for brand-specific storytelling (e.g., Hermès).
 * Features a navigation-first sidebar and minimalist product gallery.
 */
export default function CategoryPage() {
  const { country, id } = useParams();
  const countryCode = (country as string) || 'us';
  const category = CATEGORIES.find(c => c.id === id) || { name: id === 'hermes' ? 'Hermès' : 'Department', subcategories: [] };
  
  const [activeSort, setActiveSort] = useState('Featured');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.slice(0, 36);
  }, []);

  return (
    <div className="bg-white min-h-screen pb-20 animate-fade-in">
      <div className="container mx-auto px-6 max-w-[1600px] pt-12">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Brand Navigation Sidebar */}
          <aside className="lg:w-64 shrink-0 space-y-12">
            <div className="space-y-10 sticky top-40">
              <h2 className="text-2xl font-headline italic text-gray-900 border-b border-gray-100 pb-4">{category.name}</h2>
              
              <nav className="space-y-2">
                <SidebarNavItem label="HANDBAGS" hasSub />
                <SidebarNavItem label="ACCESSORIES" hasSub />
                <SidebarNavItem label="JEWELRY" hasSub />
                <SidebarNavItem label="SHOES" />
                
                <div className="pt-4 space-y-4">
                  <SidebarNavItem label="CURATIONS" hasSub isOpen />
                  <ul className="pl-4 space-y-4 pt-2">
                    <SidebarLink label="New Arrivals" />
                    <SidebarLink label="Bestsellers" />
                    <SidebarLink label="Pre-Owned & Vintage Handbags" />
                    <SidebarLink label="Exotic Handbags" hasSub />
                    <SidebarLink label="Pre-Owned Exotic Handbags" />
                    <SidebarLink label="Home Goods" />
                    <SidebarLink label="Atelier Bags" />
                  </ul>
                </div>
              </nav>
            </div>
          </aside>

          {/* Catalog Main View */}
          <main className="flex-1">
            <header className="mb-12 space-y-8">
              <h1 className="text-3xl font-headline font-medium text-black">
                {category.name} Handbags - New Arrivals
              </h1>

              {/* Controls Bar */}
              <div className="flex items-center justify-between py-4 border-y border-gray-100 bg-white/50">
                <div className="text-[11px] font-medium text-gray-400">
                  36 products
                </div>
                <div className="flex items-center space-x-10">
                  <button className="flex items-center space-x-2 text-[11px] font-bold tracking-[0.2em] text-black hover:opacity-60 transition-opacity">
                    <span className="uppercase">FILTER</span>
                    <Filter className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center space-x-3 text-[11px] font-bold tracking-[0.2em] text-black">
                    <span className="uppercase text-gray-400">SORT</span>
                    <select 
                      className="bg-transparent outline-none cursor-pointer"
                      value={activeSort}
                      onChange={(e) => setActiveSort(e.target.value)}
                    >
                      <option>Featured</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Newest</option>
                    </select>
                  </div>
                </div>
              </div>
            </header>

            {/* Product Grid - 3 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-20">
              {filteredProducts.map(product => (
                <div key={product.id} className="group cursor-pointer">
                  <Link href={`/${countryCode}/product/${product.id}`} className="block">
                    <div className="relative aspect-square bg-[#f8f8f8] mb-6 overflow-hidden flex items-center justify-center">
                      <div className="w-full h-full flex items-center justify-center text-[10px] font-bold uppercase tracking-[0.4em] text-gray-200">
                        Atelier Asset
                      </div>
                      <button className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="space-y-2 text-center px-4">
                      <h3 className="text-sm font-light text-gray-800 leading-relaxed line-clamp-2 uppercase tracking-wide">
                        Hermès {product.name}
                      </h3>
                      <p className="text-sm font-bold text-black tracking-tight">
                        {formatPrice(product.basePrice, countryCode)}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Shopping Assistant Bar */}
            <div className="mt-40 pt-12 border-t border-gray-100 flex items-center justify-center">
              <div className="flex items-center space-x-3 text-gray-900">
                <span className="font-headline italic text-2xl lowercase tracking-tight">judy</span>
                <Sparkles className="w-4 h-4 text-gray-300" />
                <span className="text-[12px] font-medium tracking-tight">Shopping Assistant</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function SidebarNavItem({ label, hasSub, isOpen }: { label: string, hasSub?: boolean, isOpen?: boolean }) {
  return (
    <div className="flex items-center justify-between text-[11px] font-bold tracking-[0.2em] text-gray-900 hover:opacity-60 transition-opacity cursor-pointer border-b border-gray-50 py-4 first:pt-0">
      <span>{label}</span>
      {hasSub && (
        isOpen ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
      )}
    </div>
  );
}

function SidebarLink({ label, active, hasSub }: { label: string, active?: boolean, hasSub?: boolean }) {
  return (
    <li className="flex items-center justify-between group cursor-pointer">
      <span className={cn(
        "text-[13px] font-light transition-colors leading-tight",
        active ? "text-gray-900 font-normal" : "text-gray-500 hover:text-black"
      )}>
        {label}
      </span>
      {hasSub && <ChevronDown className="w-3 h-3 text-gray-300 group-hover:text-black transition-colors" />}
    </li>
  );
}
