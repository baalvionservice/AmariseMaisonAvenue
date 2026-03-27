
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
  Search,
  Sparkles
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

/**
 * Institutional Sidebar Definition
 * Replicated from high-fidelity reference.
 */
const HERMES_SIDEBAR = [
  {
    id: 'handbags',
    label: 'HANDBAGS',
    items: [
      {
        id: 'birkin',
        label: 'Birkin Bags',
        subItems: [
          { label: 'Birkin 25CM', id: 'birkin-25cm' },
          { label: 'Birkin 30CM', id: 'birkin-30cm' },
          { label: 'Birkin 35CM', id: 'birkin-35cm' },
          { label: 'Birkin 40+CM', id: 'birkin-40cm' },
          { label: 'Shoulder Birkins', id: 'birkin-shoulder' },
        ]
      },
      {
        id: 'kelly',
        label: 'Kelly Bags',
        subItems: [
          { label: 'Kelly 20CM', id: 'kelly-20cm' },
          { label: 'Kelly 25CM', id: 'kelly-25cm' },
          { label: 'Kelly 28CM', id: 'kelly-28cm' },
          { label: 'Kelly 32CM', id: 'kelly-32cm' },
          { label: 'Kelly 35CM+', id: 'kelly-35cm' },
        ]
      },
      {
        id: 'constance',
        label: 'Constance Bags',
        subItems: [
          { label: 'Constance 18CM', id: 'constance-18cm' },
          { label: 'Constance 24/25CM', id: 'constance-24cm' },
        ]
      },
      { id: 'pochettes', label: 'Pochettes & Kelly Cuts' },
      { id: 'hss', label: 'Horseshoe Stamp (HSS) Bags' },
      {
        id: 'evelyne',
        label: 'Evelyne Bags',
        subItems: [
          { label: 'Mini Evelyne (TPM) Bags', id: 'mini-evelyne' }
        ]
      }
    ]
  }
];

export default function CategoryPage() {
  const { country, id } = useParams();
  const countryCode = (country as string) || 'us';
  const categoryName = id === 'hermes' ? 'Hermès' : 'Atelier Registry';
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 225000]);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);

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
      {/* Filters Modal */}
      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <SheetContent side="right" className="w-full sm:max-w-[450px] p-0 border-none rounded-none bg-white flex flex-col h-full shadow-2xl">
          <div className="flex items-center justify-between p-8 border-b border-gray-100">
            <span className="text-sm font-bold tracking-[0.2em] text-gray-900 uppercase">FILTER BY</span>
            <button onClick={() => setIsFilterOpen(false)} className="hover:opacity-60 transition-opacity">
              <X className="w-6 h-6 stroke-[1px]" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-8 py-4 custom-scrollbar">
            <Accordion type="multiple" defaultValue={['COLOR', 'CONDITION', 'PRICE']} className="w-full">
              <AccordionItem value="COLOR" className="border-b border-gray-100 py-2">
                <AccordionTrigger className="text-[11px] font-bold tracking-[0.2em] text-gray-900 hover:no-underline py-4 uppercase">COLOR</AccordionTrigger>
                <AccordionContent className="pt-2 pb-6">
                  <div className="space-y-4 pl-1">
                    {colors.map((color) => (
                      <div key={color.name} className="flex items-center space-x-4 group cursor-pointer">
                        <Checkbox className="rounded-none border-gray-300" />
                        <div className="w-4 h-4 rounded-full border border-gray-100" style={{ background: color.isMulti ? 'conic-gradient(red, yellow, green, blue, purple, red)' : color.hex }} />
                        <span className="text-xs font-light text-gray-700 tracking-wide flex-1">{color.name}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="PRICE" className="border-b border-gray-100 py-2">
                <AccordionTrigger className="text-[11px] font-bold tracking-[0.2em] text-gray-900 hover:no-underline py-4 uppercase">PRICE</AccordionTrigger>
                <AccordionContent className="pt-2 pb-10">
                  <Slider defaultValue={[0, 225000]} max={225000} step={100} value={priceRange} onValueChange={setPriceRange} className="my-8" />
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
          
          {/* Institutional Sidebar Navigation */}
          <aside className="lg:w-72 shrink-0">
            <div className="space-y-10">
              <div className="space-y-2 pb-4 border-b border-gray-100">
                <h2 className="text-2xl font-headline font-medium text-gray-900">{categoryName}</h2>
              </div>
              
              <nav className="space-y-1">
                {HERMES_SIDEBAR.map(section => (
                  <SidebarAccordion key={section.id} section={section} />
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Registry View */}
          <main className="flex-1 space-y-12">
            <header className="space-y-10">
              <h1 className="text-4xl font-headline font-medium text-black">
                {selectedSub ? selectedSub.replace(/-/g, ' ').toUpperCase() : 'Hermès Archive'}
              </h1>

              <div className="flex items-center justify-between py-4 bg-[#f8f8f8] px-8">
                <div className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">
                  522 products
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
                    </select>
                    <ChevronDown className="w-3 h-3 text-gray-400" />
                  </div>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-24">
              {birkinProducts.map(product => (
                <Link key={product.id} href={`/${countryCode}/product/${product.id}`} className="group cursor-pointer block">
                  <div className="relative aspect-[4/5] bg-white mb-8 overflow-hidden flex items-center justify-center border border-gray-50 group-hover:shadow-md transition-all">
                    <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-8 transition-transform duration-700 group-hover:scale-105" />
                    <button className="absolute top-4 right-4 text-gray-300 hover:text-black transition-colors" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-3 text-center px-4">
                    <h3 className="text-[12px] font-light text-gray-800 leading-relaxed uppercase tracking-wide px-4">
                      {product.name}
                    </h3>
                    <p className="text-[14px] font-bold text-black tracking-tight">
                      €{product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function SidebarAccordion({ section }: { section: any }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="space-y-2">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-900 border-none bg-transparent outline-none cursor-pointer"
      >
        <span>{section.label}</span>
        {isOpen ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
      </button>
      {isOpen && (
        <div className="space-y-2 pl-4 animate-fade-in">
          {section.items.map((item: any) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function SidebarItem({ item }: { item: any }) {
  const [isOpen, setIsOpen] = useState(item.id === 'birkin'); 
  return (
    <div className="space-y-2">
      <button 
        onClick={() => item.subItems && setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-[13px] font-normal tracking-wide text-gray-700 hover:text-black transition-colors border-none bg-transparent outline-none cursor-pointer py-1"
      >
        <span>{item.label}</span>
        {item.subItems && (isOpen ? <ChevronUp size={12} className="text-gray-300" /> : <ChevronDown size={12} className="text-gray-300" />)}
      </button>
      {item.subItems && isOpen && (
        <div className="space-y-3 pl-6 mt-2 mb-4 border-none animate-fade-in">
          {item.subItems.map((sub: any) => (
            <Link key={sub.id} href="#" className="block text-[12px] font-light text-gray-500 hover:text-black transition-colors tracking-wide">
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
