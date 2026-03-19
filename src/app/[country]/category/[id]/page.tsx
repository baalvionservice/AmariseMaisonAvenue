
'use client';

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  PRODUCTS, 
  CATEGORIES, 
  formatPrice 
} from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  Filter, 
  Heart,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * CategoryPage: Replicated for the Madison Avenue Couture archive view.
 * Features: Visual "Shop by Size" navigation, full-width filter bar, and archival grid.
 */
export default function CategoryPage() {
  const { country, id } = useParams();
  const countryCode = (country as string) || 'us';
  const category = CATEGORIES.find(c => c.id === id) || { name: id === 'hermes' ? 'Hermès' : 'Department', subcategories: [] };
  
  const [activeSort, setActiveSort] = useState('Featured');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'handbags': true,
    'curations': false,
    'birkin': true,
    'kelly': false,
    'constance': false,
    'accessories': false,
    'jewelry': false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Archival Birkin Sizes for the visual nav
  const birkinSizes = [
    { name: 'Birkin 25CM', id: '25cm' },
    { name: 'Birkin 30CM', id: '30cm' },
    { name: 'Birkin 35CM', id: '35cm' },
    { name: 'Birkin 40+CM', id: '40cm' },
    { name: 'Shoulder Birkins', id: 'shoulder' },
  ];

  // Specific Mock Birkin Products for the demonstration
  const birkinProducts = [
    {
      id: 'birkin-hss-25',
      name: 'Hermès Special Order (HSS) Birkin 25 White and Etoupe Clemence Brushed Gold Hardware',
      price: 31741.89,
      imageUrl: 'https://madisonavenuecouture.com/cdn/shop/products/Hermes_Birkin_25_White_and_Etoupe_Clemence_Brushed_Gold_Hardware_1.jpg?v=1691512345&width=1000'
    },
    {
      id: 'birkin-hss-rose',
      name: 'Hermès Special Order (HSS) Birkin 25 White and Rose Sakura Clemence Rose Gold Hardware',
      price: 33481.17,
      imageUrl: 'https://madisonavenuecouture.com/cdn/shop/products/Hermes_Birkin_25_White_and_Rose_Sakura_Clemence_Rose_Gold_Hardware_1.jpg?v=1691512345&width=1000'
    },
    {
      id: 'birkin-white-30',
      name: 'Pre-owned Hermès Birkin 30 White Epsom Palladium Hardware',
      price: 15218.71,
      imageUrl: 'https://madisonavenuecouture.com/cdn/shop/products/Hermes_Birkin_30_White_Epsom_Palladium_Hardware_1.jpg?v=1691512345&width=1000'
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20 animate-fade-in font-body">
      <div className="container mx-auto px-6 max-w-[1600px] pt-12">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* 1. Deep-Nested Navigation Sidebar */}
          <aside className="lg:w-72 shrink-0 space-y-12">
            <div className="space-y-10 sticky top-40">
              <h2 className="text-xl font-headline italic text-gray-400 border-b border-gray-100 pb-4">{category.name}</h2>
              
              <nav className="space-y-0.5">
                <div className="border-b border-gray-50 py-2">
                  <SidebarNavItem label="HANDBAGS" hasSub isOpen={openSections['handbags']} onClick={() => toggleSection('handbags')} />
                  {openSections['handbags'] && (
                    <div className="pl-4 mt-2 space-y-1">
                      <div className="space-y-1">
                        <SidebarSubHeader label="Birkin Bags" hasSub isOpen={openSections['birkin']} onClick={() => toggleSection('birkin')} />
                        {openSections['birkin'] && (
                          <ul className="pl-4 space-y-2 py-1">
                            <SidebarLink label="Birkin 25CM" />
                            <SidebarLink label="Birkin 30CM" />
                            <SidebarLink label="Birkin 35CM" />
                            <SidebarLink label="Birkin 40+CM" />
                            <SidebarLink label="Shoulder Birkins" />
                          </ul>
                        )}
                      </div>
                      <SidebarSubHeader label="Kelly Bags" hasSub isOpen={openSections['kelly']} onClick={() => toggleSection('kelly')} />
                      <SidebarSubHeader label="Constance Bags" hasSub isOpen={openSections['constance']} onClick={() => toggleSection('constance')} />
                      <SidebarLink label="Pochettes & Kelly Cuts" />
                      <SidebarLink label="Evelyne Bags" hasSub />
                      <SidebarLink label="Picotin Bags" hasSub />
                      <SidebarLink label="Other Bags" />
                    </div>
                  )}
                </div>

                <div className="border-b border-gray-50 py-2">
                  <SidebarNavItem label="ACCESSORIES" hasSub isOpen={openSections['accessories']} onClick={() => toggleSection('accessories')} />
                  {openSections['accessories'] && (
                    <ul className="pl-4 mt-2 space-y-2 py-1">
                      <SidebarLink label="Scarves" />
                      <SidebarLink label="Wallets" />
                      <SidebarLink label="Watches" />
                    </ul>
                  )}
                </div>

                <div className="border-b border-gray-50 py-2">
                  <SidebarNavItem label="JEWELRY" hasSub isOpen={openSections['jewelry']} onClick={() => toggleSection('jewelry')} />
                </div>

                <SidebarNavItem label="SHOES" />
                
                <div className="pt-4">
                  <SidebarNavItem label="CURATIONS" hasSub isOpen={openSections['curations']} onClick={() => toggleSection('curations')} />
                </div>
              </nav>
            </div>
          </aside>

          {/* 2. Main Registry View */}
          <main className="flex-1 space-y-12">
            <header className="space-y-10">
              <h1 className="text-3xl font-headline font-medium text-black">
                {id === 'hermes' ? 'Hermès Birkin Bags' : `${category.name} Archives`}
              </h1>

              {/* 3. Visual "Shop By Size" Matrix */}
              <div className="space-y-6">
                <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-gray-400">SHOP BY SIZE:</span>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {birkinSizes.map((size) => (
                    <div key={size.id} className="group cursor-pointer text-center space-y-4">
                      <div className="relative aspect-[4/5] bg-[#f8f8f8] flex items-center justify-center p-6 border border-transparent group-hover:border-gray-200 transition-all">
                        <div className="relative w-full h-full grayscale-[0.5] group-hover:grayscale-0 transition-all">
                           <Image 
                            src="https://madisonavenuecouture.com/cdn/shop/files/Birkin_30_Gold_Togo_Gold_Hardware_1.jpg?v=1691512345&width=400" 
                            alt={size.name} 
                            fill 
                            className="object-contain p-4"
                           />
                        </div>
                      </div>
                      <span className="text-[11px] font-light text-gray-500 uppercase tracking-widest block">{size.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Controls Matrix */}
              <div className="flex items-center justify-between py-4 bg-[#f8f8f8] px-6">
                <div className="text-[11px] font-medium text-gray-400">
                  524 products
                </div>
                <div className="flex items-center space-x-10">
                  <button className="flex items-center space-x-2 text-[11px] font-bold tracking-[0.2em] text-black hover:opacity-60 transition-opacity">
                    <span className="uppercase">FILTER</span>
                    <Filter className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center space-x-3 text-[11px] font-bold tracking-[0.2em] text-black">
                    <span className="uppercase text-gray-400">SORT</span>
                    <select className="bg-transparent outline-none cursor-pointer">
                      <option>Featured</option>
                      <option>Newest</option>
                      <option>Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </div>
            </header>

            {/* 5. High-Fidelity Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-24">
              {birkinProducts.map(product => (
                <div key={product.id} className="group cursor-pointer">
                  <div className="relative aspect-[4/5] bg-white mb-8 overflow-hidden flex items-center justify-center border border-gray-50">
                    <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-10 transition-transform duration-700 group-hover:scale-105" />
                    <button className="absolute top-4 right-4 text-gray-300 hover:text-black transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-3 text-center px-6">
                    <h3 className="text-[13px] font-light text-gray-800 leading-relaxed uppercase tracking-wide">
                      {product.name}
                    </h3>
                    <p className="text-[14px] font-bold text-black tracking-tight">
                      €{product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
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

function SidebarNavItem({ label, hasSub, isOpen, onClick }: { label: string, hasSub?: boolean, isOpen?: boolean, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between text-[11px] font-bold tracking-[0.2em] text-gray-900 hover:opacity-60 transition-opacity cursor-pointer py-4 first:pt-0"
    >
      <span>{label}</span>
      {hasSub && (
        isOpen ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
      )}
    </div>
  );
}

function SidebarSubHeader({ label, hasSub, isOpen, onClick }: { label: string, hasSub?: boolean, isOpen?: boolean, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between text-[13px] font-light text-gray-700 hover:text-black transition-colors cursor-pointer py-2 group"
    >
      <span>{label}</span>
      {hasSub && (
        isOpen ? <ChevronUp className="w-3 h-3 text-gray-300 group-hover:text-black" /> : <ChevronDown className="w-3 h-3 text-gray-300 group-hover:text-black" />
      )}
    </div>
  );
}

function SidebarLink({ label, active, hasSub }: { label: string, active?: boolean, hasSub?: boolean }) {
  return (
    <li className="flex items-center justify-between group cursor-pointer list-none py-1.5">
      <span className={cn(
        "text-[13px] font-light transition-colors leading-tight",
        active ? "text-gray-900 font-normal underline" : "text-gray-500 hover:text-black"
      )}>
        {label}
      </span>
      {hasSub && <ChevronDown className="w-3 h-3 text-gray-300 group-hover:text-black transition-colors" />}
    </li>
  );
}
