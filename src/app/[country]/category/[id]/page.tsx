
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
  Sparkles,
  X,
  Plus
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

/**
 * CategoryPage: Replicated for the Madison Avenue Couture archive view.
 * Features: Visual "Shop by Size" navigation, full-width filter bar, and archival grid.
 */
export default function CategoryPage() {
  const { country, id } = useParams();
  const countryCode = (country as string) || 'us';
  const category = CATEGORIES.find(c => c.id === id) || { name: id === 'hermes' ? 'Hermès' : 'Department', subcategories: [] };
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 225000]);
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

  // Color Registry from reference
  const colors = [
    { name: 'Beige', count: 14, hex: '#D2B48C' },
    { name: 'Black', count: 43, hex: '#000000' },
    { name: 'Blue', count: 99, hex: '#4169E1' },
    { name: 'Brown', count: 59, hex: '#8B4513' },
    { name: 'Gold', count: 6, hex: '#D4AF37' },
    { name: 'Grey', count: 42, hex: '#A9A9A9' },
    { name: 'Green', count: 58, hex: '#2E8B57' },
    { name: 'Multi', count: 12, isMulti: true },
    { name: 'Orange', count: 23, hex: '#FFA500' },
    { name: 'Pink', count: 50, hex: '#FF69B4' },
    { name: 'Purple', count: 14, hex: '#9370DB' },
    { name: 'Red', count: 49, hex: '#B22222' },
    { name: 'Tan', count: 5, hex: '#D2B48C' },
    { name: 'White', count: 11, hex: '#FFFFFF' },
    { name: 'Yellow', count: 16, hex: '#FFFF00' },
    { name: 'Burgundy', count: 12, hex: '#800020' },
    { name: 'Ivory', count: 29, hex: '#FFFFF0' },
  ];

  // Condition Registry from reference image
  const conditions = [
    { name: 'New', count: 233 },
    { name: 'Pre-owned', count: 256 },
    { name: 'Vintage', count: 33 },
  ];

  // Hardware Registry from reference image
  const hardwares = [
    { name: 'Gold', count: 196 },
    { name: 'Brushed Gold', count: 20 },
    { name: 'Rose Gold', count: 14 },
    { name: 'Palladium', count: 278 },
    { name: 'Permabrass', count: 15 },
    { name: 'Ruthenium', count: 1 },
  ];

  // Size Registry from reference image
  const sizes = [
    { name: 'Small', count: 153 },
    { name: 'Medium', count: 225 },
    { name: 'Large', count: 138 },
    { name: 'Extra Large', count: 8 },
  ];

  // Showroom Registry from reference image
  const showrooms = [
    { name: 'Both Showrooms - NYC & Palm Beach', count: 1 },
    { name: 'New York City', count: 64 },
    { name: 'Palm Beach', count: 41 },
  ];

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
      imageUrl: 'https://madisonavenuecouture.com/cdn/shop/files/Birkin_30_Gold_Togo_Gold_Hardware_1.jpg?v=1691512345&width=400'
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20 animate-fade-in font-body">
      {/* 1. Institutional Filter Sidebar (Drawer) */}
      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <SheetContent side="right" className="w-full sm:max-w-[450px] p-0 border-none rounded-none bg-white flex flex-col h-full shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between p-8 border-b border-gray-100 bg-white z-20">
            <span className="text-sm font-bold tracking-[0.2em] text-gray-900 uppercase">FILTER BY</span>
            <button onClick={() => setIsFilterOpen(false)} className="hover:opacity-60 transition-opacity">
              <X className="w-6 h-6 stroke-[1px]" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-8 py-4 relative custom-scrollbar">
            {/* Ask Judy Floating Button - Positioned exactly as reference */}
            <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[60]">
              <button className="bg-[#262626] text-white w-14 h-14 rounded-full flex flex-col items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-transform hover:scale-105 active:scale-95">
                <p className="flex flex-col items-center">
                  <span className="flex items-center space-x-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[7px] font-bold tracking-tighter uppercase leading-none mt-0.5">ASK<br/>JUDY</span>
                </p>
              </button>
            </div>

            <Accordion type="multiple" defaultValue={['COLOR', 'CONDITION', 'HARDWARE', 'SIZE', 'PRICE', 'SHOWROOM']} className="w-full">
              <AccordionItem value="COLOR" className="border-b border-gray-100 py-2">
                <AccordionTrigger className="text-[11px] font-bold tracking-[0.2em] text-gray-900 hover:no-underline py-4 uppercase">
                  COLOR
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6">
                  <div className="space-y-4 pl-1">
                    {colors.map((color) => (
                      <div key={color.name} className="flex items-center space-x-4 group cursor-pointer">
                        <Checkbox className="rounded-none border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black" />
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-100 shadow-sm" 
                          style={{ 
                            background: color.isMulti 
                              ? 'conic-gradient(red, yellow, green, blue, purple, red)' 
                              : color.hex 
                          }} 
                        />
                        <span className="text-xs font-light text-gray-700 tracking-wide flex-1">
                          {color.name} <span className="text-gray-400 ml-1">({color.count})</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="CONDITION" className="border-b border-gray-100 py-2">
                <AccordionTrigger className="text-[11px] font-bold tracking-[0.2em] text-gray-900 hover:no-underline py-4 uppercase">
                  CONDITION
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6">
                  <div className="space-y-4 pl-1">
                    {conditions.map((item) => (
                      <div key={item.name} className="flex items-center space-x-4 group cursor-pointer">
                        <Checkbox className="rounded-none border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black" />
                        <span className="text-xs font-light text-gray-700 tracking-wide flex-1">
                          {item.name} <span className="text-gray-400 ml-1">({item.count})</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="HARDWARE" className="border-b border-gray-100 py-2">
                <AccordionTrigger className="text-[11px] font-bold tracking-[0.2em] text-gray-900 hover:no-underline py-4 uppercase">
                  HARDWARE
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6">
                  <div className="space-y-4 pl-1">
                    {hardwares.map((item) => (
                      <div key={item.name} className="flex items-center space-x-4 group cursor-pointer">
                        <Checkbox className="rounded-none border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black" />
                        <span className="text-xs font-light text-gray-700 tracking-wide flex-1">
                          {item.name} <span className="text-gray-400 ml-1">({item.count})</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="SIZE" className="border-b border-gray-100 py-2">
                <AccordionTrigger className="text-[11px] font-bold tracking-[0.2em] text-gray-900 hover:no-underline py-4 uppercase">
                  SIZE
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6">
                  <div className="space-y-4 pl-1">
                    {sizes.map((item) => (
                      <div key={item.name} className="flex items-center space-x-4 group cursor-pointer">
                        <Checkbox className="rounded-none border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black" />
                        <span className="text-xs font-light text-gray-700 tracking-wide flex-1">
                          {item.name} <span className="text-gray-400 ml-1">({item.count})</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="PRICE" className="border-b border-gray-100 py-2">
                <AccordionTrigger className="text-[11px] font-bold tracking-[0.2em] text-gray-900 hover:no-underline py-4 uppercase">
                  PRICE
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-10">
                  <div className="space-y-8 px-1">
                    <Slider 
                      defaultValue={[0, 225000]} 
                      max={225000} 
                      step={100} 
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="my-8" 
                    />
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 flex items-center border border-gray-200 h-14 px-4 bg-white">
                        <span className="text-xs text-gray-400 font-bold">$</span>
                        <input 
                          type="text" 
                          value={priceRange[0]} 
                          readOnly
                          className="w-full text-right text-xs bg-transparent outline-none pr-1 font-light" 
                        />
                      </div>
                      <div className="flex-1 flex items-center border border-gray-200 h-14 px-4 bg-white">
                        <span className="text-xs text-gray-400 font-bold">$</span>
                        <input 
                          type="text" 
                          value={`${priceRange[1]}.00`} 
                          readOnly
                          className="w-full text-right text-xs bg-transparent outline-none pr-1 font-light" 
                        />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="SHOWROOM" className="border-b border-gray-100 py-2">
                <AccordionTrigger className="text-[11px] font-bold tracking-[0.2em] text-gray-900 hover:no-underline py-4 uppercase">
                  SHOWROOM
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6">
                  <div className="space-y-4 pl-1">
                    {showrooms.map((item) => (
                      <div key={item.name} className="flex items-center space-x-4 group cursor-pointer">
                        <Checkbox className="rounded-none border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black" />
                        <span className="text-xs font-light text-gray-700 tracking-wide flex-1">
                          {item.name} <span className="text-gray-400 ml-1">({item.count})</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="p-8 border-t border-gray-100 bg-white grid grid-cols-2 gap-4 sticky bottom-0 z-20">
            <Button 
              variant="outline" 
              className="h-14 rounded-none border-gray-900 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-gray-50 transition-all"
              onClick={() => setIsFilterOpen(false)}
            >
              CLEAR ALL
            </Button>
            <Button 
              className="h-14 rounded-none bg-black text-white hover:opacity-90 text-[10px] font-bold tracking-[0.3em] uppercase transition-all"
              onClick={() => setIsFilterOpen(false)}
            >
              VIEW (524)
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <div className="container mx-auto px-6 max-w-[1600px] pt-12">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* 2. Deep-Nested Navigation Sidebar */}
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
                      <SidebarLink label="Belts" />
                      <SidebarLink label="Charms" />
                    </ul>
                  )}
                </div>

                <div className="border-b border-gray-50 py-2">
                  <SidebarNavItem label="JEWELRY" hasSub isOpen={openSections['jewelry']} onClick={() => toggleSection('jewelry')} />
                  {openSections['jewelry'] && (
                    <div className="pl-4 mt-2">
                      <SidebarSubHeader label="Fine Jewelry" hasSub />
                    </div>
                  )}
                </div>

                <SidebarNavItem label="SHOES" />
                
                <div className="pt-4">
                  <SidebarNavItem label="CURATIONS" hasSub isOpen={openSections['curations']} onClick={() => toggleSection('curations')} />
                  {openSections['curations'] && (
                    <ul className="pl-4 mt-2 space-y-2 py-1">
                      <SidebarLink label="New Arrivals" />
                      <SidebarLink label="Bestsellers" />
                      <SidebarLink label="Pre-Owned & Vintage Handbags" />
                      <SidebarLink label="Exotic Handbags" hasSub />
                      <SidebarLink label="Pre-Owned Exotic Handbags" />
                      <SidebarLink label="Home Goods" />
                      <SidebarLink label="Atelier Bags" />
                    </ul>
                  )}
                </div>
              </nav>
            </div>
          </aside>

          {/* 3. Main Registry View */}
          <main className="flex-1 space-y-12">
            <header className="space-y-10">
              <h1 className="text-3xl font-headline font-medium text-black">
                {id === 'hermes' ? 'Hermès Birkin Bags' : `${category.name} Archives`}
              </h1>

              {/* 4. Visual "Shop By Size" Matrix */}
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

              {/* 5. Controls Matrix */}
              <div className="flex items-center justify-between py-4 bg-[#f8f8f8] px-6">
                <div className="text-[11px] font-medium text-gray-400">
                  524 products
                </div>
                <div className="flex items-center space-x-10">
                  <button 
                    onClick={() => setIsFilterOpen(true)}
                    className="flex items-center space-x-2 text-[11px] font-bold tracking-[0.2em] text-black hover:opacity-60 transition-opacity bg-transparent border-none outline-none cursor-pointer"
                  >
                    <span className="uppercase">FILTER</span>
                    <Filter className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center space-x-3 text-[11px] font-bold tracking-[0.2em] text-black">
                    <span className="uppercase text-gray-400">SORT</span>
                    <select className="bg-transparent outline-none cursor-pointer">
                      <option>Featured</option>
                      <option>Newest</option>
                      <option>Price: High to Low</option>
                      <option>Price: Low to High</option>
                    </select>
                  </div>
                </div>
              </div>
            </header>

            {/* 6. High-Fidelity Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-24">
              {birkinProducts.map(product => (
                <div key={product.id} className="group cursor-pointer">
                  <div className="relative aspect-[4/5] bg-white mb-8 overflow-hidden flex items-center justify-center border border-gray-50">
                    <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-10 transition-transform duration-700 group-hover:scale-105" />
                    <button className="absolute top-4 right-4 text-gray-300 hover:text-black transition-colors bg-transparent border-none outline-none">
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
