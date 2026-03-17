
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { CATEGORIES, DEPARTMENTS, PRODUCTS } from '@/lib/mock-data';
import { ProductCard } from '@/components/product/ProductCard';
import { ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CategoryPage() {
  const { country, department, category } = useParams();
  const countryCode = (country as string) || 'us';
  const catObj = CATEGORIES.find(c => c.id === category);
  const deptObj = DEPARTMENTS.find(d => d.id === department);

  const featuredProducts = PRODUCTS.filter(p => p.categoryId === category).slice(0, 8);

  if (!catObj) return <div className="py-40 text-center">Category not found.</div>;

  return (
    <div className="bg-ivory pb-40">
      <section className="relative h-[60vh] w-full flex items-end overflow-hidden">
        <Image src={`https://picsum.photos/seed/amarise-cat-${category}/2560/1440`} alt={catObj.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/20 to-transparent" />
        <div className="container mx-auto px-6 pb-20 relative z-10 space-y-4">
          <nav className="flex items-center space-x-2 text-[10px] tracking-widest uppercase text-muted-foreground font-bold mb-4">
            <Link href={`/${countryCode}`}>Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/${countryCode}/${department}`} className="capitalize">{department}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{catObj.name}</span>
          </nav>
          <h1 className="text-7xl font-headline font-bold text-gray-900 leading-tight italic">{catObj.name}</h1>
        </div>
      </section>

      <div className="container mx-auto px-6 py-24 space-y-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {catObj.subcategories.map(sub => (
            <Link key={sub} href={`/${countryCode}/${department}/${category}/${sub.toLowerCase().replace(/ /g, '-')}`} className="group relative aspect-[3/4] overflow-hidden bg-white shadow-luxury">
              <Image src={`https://picsum.photos/seed/amarise-sub-${sub}/1200/1600`} alt={sub} fill className="object-cover transition-transform duration-[2s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-12 text-center text-white">
                <span className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-4">Maison Edit</span>
                <h3 className="text-3xl font-headline font-bold italic">{sub}</h3>
                <div className="flex items-center text-white text-[9px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 pt-4">
                  Explore <ArrowRight className="ml-2 w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <section className="space-y-16">
          <div className="flex items-end justify-between border-b border-border pb-8">
            <h2 className="text-4xl font-headline font-bold italic text-gray-900">Featured Artifacts</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {featuredProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </div>
    </div>
  );
}
