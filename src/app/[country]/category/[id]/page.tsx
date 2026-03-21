
'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { 
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
  X,
  Plus,
  SlidersHorizontal,
  Search
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
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
import { Sparkles } from 'lucide-react';

/**
 * CategoryPage: Replicated for the Madison Avenue Couture archive view.
 * Features: Visual "Shop by Size" navigation, full-width filter bar, archival grid, 
 * and the "Judy" Autonomous Shopping Assistant.
 */
export default function CategoryPage() {
  const { country, id } = useParams();
  const countryCode = (country as string) || 'us';
  const category = CATEGORIES.find(c => c.id === id) || { name: id === 'hermes' ? 'Hermès' : 'Department', subcategories: [] };
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 225000]);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'handbags': true,
    'accessories': false,
    'jewelry': false,
    'shoes': false,
    'curations': false,
    'birkin': true
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Static Data for the "Shop By Size" Matrix
  const birkinSizes = [
    { name: 'Birkin 25CM', id: '25cm' },
    { name: 'Birkin 30CM', id: '30cm' },
    { name: 'Birkin 35CM', id: '35cm' },
    { name: 'Birkin 40+CM', id: '40cm' },
    { name: 'Shoulder Birkins', id: 'shoulder' },
  ];

  const colors = [
    { name: 'Beige', count: 14, hex: '#D2B48C' },
    { name: 'Black', count: 43, hex: '#000000' },
    { name: 'Blue', count: 99, hex: '#4169E1' },
    { name: 'Multi', count: 12, isMulti: true },
    { name: 'Pink', count: 50, hex: '#FF69B4' },
    { name: 'Ivory', count: 29, hex: '#FFFFF0' },
  ];

  const birkinProducts = [
    {
      id: 'prod-1',
      name: 'Hermès Special Order (HSS) Birkin 25 White and Etoupe Clemence Brushed Gold Hardware',
      price: 31741.89,
      imageUrl: 'https://madisonavenuecouture.com/cdn/shop/products/Hermes_Birkin_25_White_and_Etoupe_Clemence_Brushed_Gold_Hardware_1.jpg?v=1691512345&width=1000'
    },
    {
      id: 'prod-10',
      name: 'Hermès Special Order (HSS) Birkin 25 White and Rose Sakura Clemence Rose Gold Hardware',
      price: 33481.17,
      imageUrl: 'https://madisonavenuecouture.com/cdn/shop/products/Hermes_Birkin_25_White_and_Rose_Sakura_Clemence_Rose_Gold_Hardware_1.jpg?v=1691512345&width=1000'
    },
    {
      id: 'prod-50',
      name: 'Hermès Birkin 25 New White Swift Palladium Hardware',
      price: 27393.69,
      imageUrl: 'https://madisonavenuecouture.com/cdn/shop/files/Birkin_25_White_Swift_Palladium_Hardware_1.jpg?v=1691512345&width=1000',
      isNew: true
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20 animate-fade-in font-body">
      {/* Institutional Filter Sidebar */}
      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <SheetContent side="right" className="w-full sm:max-w-[450px] p-0 border-none rounded-none bg-white flex flex-col h-full shadow-2xl">
          <div className="flex items-center justify-between p-8 border-b border-gray-100">
            <span className="text-sm font-bold tracking-[0.2em] text-gray-900 uppercase">FILTER BY</span>
            <button onClick={() => setIsFilterOpen(false)} className="hover:opacity-60 transition-opacity">
              <X className="w-6 h-6 stroke-[1px]" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-8 py-4 custom-scrollbar">
            <Accordion type="multiple" defaultValue={['COLOR', 'CONDITION', 'HARDWARE', 'SIZE', 'PRICE', 'SHOWROOM']} className="w-full">
              <AccordionItem value="COLOR" className="border-b border-gray-100 py-2">
                <AccordionTrigger className="text-[11px] font-bold tracking-[0.2em] text-gray-900 hover:no-underline py-4 uppercase">COLOR</AccordionTrigger>
                <AccordionContent className="pt-2 pb-6">
                  <div className="space-y-4 pl-1">
                    {colors.map((color) => (
                      <div key={color.name} className="flex items-center space-x-4 group cursor-pointer">
                        <Checkbox className="rounded-none border-gray-300" />
                        <div className="w-4 h-4 rounded-full border border-gray-100" style={{ background: color.isMulti ? 'conic-gradient(red, yellow, green, blue, purple, red)' : color.hex }} />
                        <span className="text-xs font-light text-gray-700 tracking-wide flex-1">{color.name} <span className="text-gray-400 ml-1">({color.count})</span></span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="CONDITION" className="border-b border-gray-100 py-2">
                <AccordionTrigger className="text-[11px] font-bold tracking-[0.2em] text-gray-900 hover:no-underline py-4 uppercase">CONDITION</AccordionTrigger>
                <AccordionContent className="pt-2 pb-6">
                  <div className="space-y-4 pl-1">
                    {['New (233)', 'Pre-owned (256)', 'Vintage (33)'].map(c => (
                      <div key={c} className="flex items-center space-x-4 group cursor-pointer">
                        <Checkbox className="rounded-none border-gray-300" />
                        <span className="text-xs font-light text-gray-700 tracking-wide">{c}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="HARDWARE" className="border-b border-gray-100 py-2">
                <AccordionTrigger className="text-[11px] font-bold tracking-[0.2em] text-gray-900 hover:no-underline py-4 uppercase">HARDWARE</AccordionTrigger>
                <AccordionContent className="pt-2 pb-6">
                  <div className="space-y-4 pl-1">
                    {['Gold (196)', 'Brushed Gold (20)', 'Rose Gold (14)', 'Palladium (278)', 'Permabrass (15)', 'Ruthenium (1)'].map(h => (
                      <div key={h} className="flex items-center space-x-4 group cursor-pointer">
                        <Checkbox className="rounded-none border-gray-300" />
                        <span className="text-xs font-light text-gray-700 tracking-wide">{h}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="SIZE" className="border-b border-gray-100 py-2">
                <AccordionTrigger className="text-[11px] font-bold tracking-[0.2em] text-gray-900 hover:no-underline py-4 uppercase">SIZE</AccordionTrigger>
                <AccordionContent className="pt-2 pb-6">
                  <div className="space-y-4 pl-1">
                    {['Small (153)', 'Medium (225)', 'Large (138)', 'Extra Large (8)'].map(s => (
                      <div key={s} className="flex items-center space-x-4 group cursor-pointer">
                        <Checkbox className="rounded-none border-gray-300" />
                        <span className="text-xs font-light text-gray-700 tracking-wide">{s}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="PRICE" className="border-b border-gray-100 py-2">
                <AccordionTrigger className="text-[11px] font-bold tracking-[0.2em] text-gray-900 hover:no-underline py-4 uppercase">PRICE</AccordionTrigger>
                <AccordionContent className="pt-2 pb-10">
                  <div className="space-y-8 px-1">
                    <Slider defaultValue={[0, 225000]} max={225000} step={100} value={priceRange} onValueChange={setPriceRange} className="my-8" />
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 flex items-center border border-gray-200 h-14 px-4">
                        <span className="text-xs text-gray-400 font-bold">$</span>
                        <input type="text" value={priceRange[0]} readOnly className="w-full text-right text-xs outline-none font-light" />
                      </div>
                      <div className="flex-1 flex items-center border border-gray-200 h-14 px-4">
                        <span className="text-xs text-gray-400 font-bold">$</span>
                        <input type="text" value={`${priceRange[1]}.00`} readOnly className="w-full text-right text-xs outline-none font-light" />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="SHOWROOM" className="border-b border-gray-100 py-2">
                <AccordionTrigger className="text-[11px] font-bold tracking-[0.2em] text-gray-900 hover:no-underline py-4 uppercase">SHOWROOM</AccordionTrigger>
                <AccordionContent className="pt-2 pb-6">
                  <div className="space-y-4 pl-1">
                    {['Both Showrooms - NYC & Palm Beach (1)', 'New York City (64)', 'Palm Beach (41)'].map(s => (
                      <div key={s} className="flex items-center space-x-4 group cursor-pointer">
                        <Checkbox className="rounded-none border-gray-300" />
                        <span className="text-xs font-light text-gray-700 tracking-wide">{s}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="p-8 border-t border-gray-100 bg-white grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-14 rounded-none border-gray-900 text-[10px] font-bold tracking-[0.3em] uppercase">CLEAR ALL</Button>
            <Button className="h-14 rounded-none bg-black text-white text-[10px] font-bold tracking-[0.3em] uppercase">VIEW (524)</Button>
          </div>
        </SheetContent>
      </Sheet>

      <div className="container mx-auto px-12 max-w-[1600px] pt-16">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Replicated Sidebar Navigation */}
          <aside className="lg:w-64 shrink-0">
            <div className="space-y-10">
              <h2 className="text-lg font-headline italic text-gray-400 border-b border-gray-100 pb-4">{category.name}</h2>
              
              <nav className="space-y-0.5">
                <SidebarNavItem label="HANDBAGS" hasSub isOpen={openSections['handbags']} onClick={() => toggleSection('handbags')} />
                {openSections['handbags'] && (
                  <div className="pl-4 space-y-0.5 animate-fade-in">
                    <SidebarNavItem label="Birkin Bags" hasSub isOpen={openSections['birkin']} onClick={() => toggleSection('birkin')} isSub />
                    {openSections['birkin'] && (
                      <div className="pl-4 space-y-3 py-3 border-l border-gray-50 ml-2">
                        {birkinSizes.map(s => (
                          <button key={s.id} onClick={() => setSelectedSub(s.id)} className={cn("block text-[11px] font-light tracking-wide text-gray-500 hover:text-black transition-colors", selectedSub === s.id && "text-black font-bold")}>{s.name}</button>
                        ))}
                      </div>
                    )}
                    <SidebarNavItem label="Kelly Bags" hasSub isSub />
                    <SidebarNavItem label="Constance Bags" hasSub isSub />
                    <SidebarNavItem label="Pochettes & Kelly Cuts" isSub />
                    <SidebarNavItem label="Evelyne Bags" hasSub isSub />
                    <SidebarNavItem label="Picotin Bags" hasSub isSub />
                    <SidebarNavItem label="Lindy Bags" isSub />
                    <SidebarNavItem label="Garden Party Bags" isSub />
                  </div>
                )}
                <div className="border-b border-gray-50 py-1" />
                <SidebarNavItem label="ACCESSORIES" hasSub isOpen={openSections['accessories']} onClick={() => toggleSection('accessories')} />
                <div className="border-b border-gray-50 py-1" />
                <SidebarNavItem label="JEWELRY" hasSub isOpen={openSections['jewelry']} onClick={() => toggleSection('jewelry')} />
                <div className="border-b border-gray-50 py-1" />
                <SidebarNavItem label="SHOES" hasSub isOpen={openSections['shoes']} onClick={() => toggleSection('shoes')} />
                <div className="border-b border-gray-50 py-1" />
                <SidebarNavItem label="CURATIONS" hasSub isOpen={openSections['curations']} onClick={() => toggleSection('curations')} />
              </nav>
            </div>
          </aside>

          {/* Main Registry View */}
          <main className="flex-1 space-y-12">
            <header className="space-y-10">
              <h1 className="text-4xl font-headline font-medium text-black">
                {selectedSub === '25cm' ? 'Hermès Birkin 25cm' : 'Hermès Birkin Bags'}
              </h1>

              {/* Visual "Shop By Size" Matrix - Perfectly Aligned */}
              {!selectedSub && (
                <div className="space-y-6">
                  <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-gray-400">SHOP BY SIZE:</span>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {birkinSizes.map((size) => (
                      <div key={size.id} onClick={() => setSelectedSub(size.id)} className="group cursor-pointer text-center space-y-4">
                        <div className={cn(
                          "relative aspect-[4/5] bg-[#f8f8f8] flex items-center justify-center p-6 border transition-all",
                          selectedSub === size.id ? "border-black shadow-md" : "border-transparent"
                        )}>
                          <Image src="https://madisonavenuecouture.com/cdn/shop/files/Birkin_30_Gold_Togo_Gold_Hardware_1.jpg?v=1691512345&width=400" alt={size.name} fill className="object-contain p-4 grayscale group-hover:grayscale-0 transition-all" />
                        </div>
                        <span className={cn("text-[11px] font-light text-gray-500 uppercase tracking-widest block", selectedSub === size.id && "text-black font-bold")}>{size.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Replicated Filter/Sort Bar */}
              <div className="flex items-center justify-between py-4 bg-[#f8f8f8] px-8">
                <div className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">
                  {selectedSub === '25cm' ? '150 products' : '522 products'}
                </div>
                <div className="flex items-center space-x-12">
                  <button onClick={() => setIsFilterOpen(true)} className="flex items-center space-x-3 text-[11px] font-bold tracking-[0.2em] text-black hover:opacity-60 transition-all">
                    <span className="uppercase">FILTER</span>
                    <SlidersHorizontal className="w-4 h-4 stroke-[1.5px]" />
                  </button>
                  <div className="flex items-center space-x-3 text-[11px] font-bold tracking-[0.2em] text-black">
                    <span className="uppercase text-gray-400">SORT</span>
                    <select className="bg-transparent outline-none cursor-pointer">
                      <option>Featured</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Newest</option>
                    </select>
                    <ChevronDown className="w-3 h-3 text-gray-400" />
                  </div>
                </div>
              </div>
            </header>

            {/* High-Fidelity Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-24">
              {birkinProducts.map(product => (
                <Link key={product.id} href={`/${countryCode}/product/${product.id}`} className="group cursor-pointer block">
                  <div className="relative aspect-[4/5] bg-white mb-8 overflow-hidden flex items-center justify-center border border-gray-50 group-hover:shadow-md transition-all">
                    <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-8 transition-transform duration-700 group-hover:scale-105" />
                    <button className="absolute top-4 right-4 text-gray-300 hover:text-black transition-colors" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                      <Heart className="w-5 h-5" />
                    </button>
                    {product.isNew && (
                      <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[8px] font-bold tracking-widest uppercase border border-gray-100 shadow-sm">NEW ARRIVAL</div>
                    )}
                  </div>
                  <div className="space-y-3 text-center px-4">
                    <h3 className="text-[12px] font-light text-gray-800 leading-relaxed uppercase tracking-wide px-4">
                      {product.name}
                    </h3>
                    <p className="text-[14px] font-bold text-black tracking-tight">
                      €{product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Judy Shopping Assistant Footer */}
            <section className="pt-32 pb-20 border-t border-gray-100 mt-20">
              <div className="max-w-2xl mx-auto space-y-10">
                <div className="flex items-center justify-center space-x-4">
                  <span className="font-headline text-3xl italic text-gray-900">judy</span>
                  <div className="flex items-center space-x-2 text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400">
                    <Sparkles className="w-3 h-3" />
                    <span>Shopping Assistant</span>
                  </div>
                </div>
                
                <div className="text-center space-y-6">
                  <p className="text-xl font-light text-gray-500 italic">
                    Need help finding <span className="text-gray-300">what makes MAC different from other luxury resellers?</span>
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-3">
                    <JudyQuickAction label="How does Beton Matte Alligator compare?" />
                    <JudyQuickAction label="Show me 25cm Birkins under €30k" />
                  </div>
                </div>

                <div className="relative group max-w-xl mx-auto">
                  <input 
                    type="text" 
                    placeholder="What can I help you find?" 
                    className="w-full bg-[#fcfcfc] border border-gray-100 h-16 pl-8 pr-16 text-sm font-light italic outline-none focus:border-black transition-all shadow-sm"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors">
                    <Plus className="w-5 h-5 rotate-45" />
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Floating Ask Judy Button */}
      <button className="fixed bottom-10 right-10 z-[60] w-12 h-12 bg-black text-white rounded-full flex flex-col items-center justify-center shadow-2xl hover:scale-110 transition-all border border-white/10 group">
        <ChevronRight className="w-3 h-3 mb-0.5 rotate-180" />
        <span className="text-[6px] font-bold uppercase tracking-tighter leading-none">ASK<br />JUDY</span>
      </button>
    </div>
  );
}

function SidebarNavItem({ label, hasSub, isOpen, onClick, isSub }: { label: string, hasSub?: boolean, isOpen?: boolean, onClick?: () => void, isSub?: boolean }) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "flex items-center justify-between text-gray-900 hover:opacity-60 transition-opacity cursor-pointer py-4",
        isSub ? "text-[10px] font-normal tracking-widest text-gray-500" : "text-[11px] font-bold tracking-[0.2em] uppercase"
      )}
    >
      <span>{label}</span>
      {hasSub && (
        isOpen ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
      )}
    </div>
  );
}

function JudyQuickAction({ label }: { label: string }) {
  return (
    <button className="px-6 py-3 bg-white border border-gray-100 rounded-full text-[11px] font-light text-gray-500 hover:border-black hover:text-black transition-all shadow-sm">
      {label}
    </button>
  );
}
