'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Search, ShoppingBag, Heart, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { COUNTRIES, DEPARTMENTS, CATEGORIES } from '@/lib/mock-data';
import { useAppStore } from '@/lib/store';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export const Header = () => {
  const { country } = useParams();
  const router = useRouter();
  const { cart, wishlist } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const countryCode = (country as string) || 'us';
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES.us;
  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  const handleCountryChange = (code: string) => {
    router.push(`/${code}`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      {/* Announcement Bar */}
      <div className="bg-black text-white h-10 flex items-center justify-between px-6 text-[10px] tracking-widest font-medium uppercase">
        <div className="flex items-center space-x-2">
          <span className="opacity-80">100% Authentic Guaranteed</span>
        </div>
        <div className="flex-1 flex justify-center items-center overflow-hidden">
          <div className="flex items-center space-x-4">
            <ChevronLeft className="w-3 h-3 cursor-pointer hover:text-gold transition-colors" />
            <span className="animate-pulse">Spring Collector's Auction</span>
            <ChevronRight className="w-3 h-3 cursor-pointer hover:text-gold transition-colors" />
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <Link href="#" className="hover:text-gold transition-colors">Sell</Link>
          <Link href={`/${countryCode}/appointments`} className="hover:text-gold transition-colors">Appointments</Link>
          <Link href={`/${countryCode}/contact`} className="hover:text-gold transition-colors">Contact</Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-3 hover:text-gold transition-all bg-black px-3 py-1 rounded-sm border border-white/10">
                <span className="text-sm leading-none">{currentCountry.flag}</span>
                <span className="font-bold tracking-tighter text-[11px]">{currentCountry.currency}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border-border w-56 p-2">
              <DropdownMenuLabel className="text-[8px] uppercase tracking-widest text-muted-foreground mb-2">Select Global Region</DropdownMenuLabel>
              {Object.values(COUNTRIES).map((c) => (
                <DropdownMenuItem 
                  key={c.code} 
                  onClick={() => handleCountryChange(c.code)} 
                  className={cn(
                    "cursor-pointer flex items-center justify-between p-3 rounded-none transition-colors",
                    countryCode === c.code ? "bg-black text-white" : "hover:bg-ivory"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-base">{c.flag}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">{c.name}</span>
                  </div>
                  <span className="text-[9px] font-medium opacity-60">{c.currency}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Brand Header */}
      <div className="h-24 border-b border-border px-6 flex items-center justify-between relative bg-white">
        <div className="flex items-center space-x-4 text-[11px] font-medium tracking-tight text-gray-500">
          <Link href="#" className="hover:text-black border-r border-border pr-4">Log in</Link>
          <Link href="#" className="hover:text-black">Sign Up</Link>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <Link href={`/${countryCode}`} className="group flex flex-col items-center">
            <span className="font-headline text-4xl font-bold tracking-[0.1em] text-black transition-colors duration-500">
              AMARISÉ <span className="font-light italic text-2xl">MAISON AVENUE</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-8">
          <button className="text-gray-400 hover:text-black transition-colors group relative flex items-center">
            <Search className="w-5 h-5" />
            <span className="ml-2 text-[10px] font-bold uppercase tracking-widest hidden lg:block border-b border-transparent group-hover:border-black transition-all">Search</span>
          </button>
          
          <Link href={`/${countryCode}/wishlist`} className="relative text-gray-400 hover:text-black transition-colors">
            <Heart className={cn("w-5 h-5", wishlist.length > 0 && "fill-black text-black")} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link href={`/${countryCode}/cart`} className="relative text-gray-400 hover:text-black transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className="h-14 bg-white border-b border-border px-6 hidden lg:flex items-center justify-center space-x-10">
        <Link href={`/${countryCode}/category/new-arrivals`} className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 hover:text-gold transition-colors">New Arrivals</Link>
        {DEPARTMENTS.slice(0, 6).map((dept) => (
          <div key={dept.id} className="group relative">
            <Link 
              href={`/${countryCode}/${dept.id}`} 
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 hover:text-gold transition-colors block h-14 flex items-center"
            >
              {dept.name}
            </Link>
            <div className="absolute top-full left-0 hidden group-hover:block w-screen max-w-sm bg-white border border-border shadow-luxury animate-in fade-in slide-in-from-top-1 duration-200 z-50">
              <div className="p-6 grid grid-cols-1 gap-4">
                <DropdownMenuLabel className="text-[9px] uppercase tracking-widest text-muted-foreground p-0">Collections</DropdownMenuLabel>
                {CATEGORIES.filter(c => c.departmentId === dept.id).map(cat => (
                  <Link key={cat.id} href={`/${countryCode}/${dept.id}/${cat.id}`} className="text-[11px] uppercase tracking-wider text-gray-600 hover:text-gold transition-colors">
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
        <Link href={`/${countryCode}/journal`} className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 hover:text-gold transition-colors">Journal</Link>
        <Link href={`/${countryCode}/buying-guide`} className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold hover:text-black transition-colors animate-pulse">Live Shop</Link>
      </nav>

      {/* Mobile Trigger */}
      <div className="lg:hidden h-14 bg-white flex items-center px-6 justify-between border-b border-border">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
        <span className="text-[10px] font-bold uppercase tracking-widest">Menu</span>
        <div className="w-10" /> {/* balance */}
      </div>
    </header>
  );
};
