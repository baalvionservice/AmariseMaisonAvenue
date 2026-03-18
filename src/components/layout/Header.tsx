'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Search, ShoppingBag, Heart, Menu, X, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { COUNTRIES } from '@/lib/mock-data';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export const Header = () => {
  const { country } = useParams();
  const router = useRouter();
  const { cart, wishlist } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  
  const countryCode = (country as string) || 'us';
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES.us;
  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  const slides = [
    "PRIVATE SHOWROOM APPOINTMENTS AVAILABLE IN NYC & LONDON",
    "THE SPRING 1924 ARCHIVE AUCTION IS NOW LIVE"
  ];

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleCountryChange = (code: string) => {
    router.push(`/${code}`);
  };

  const navLinks = [
    { name: 'NEW ARRIVALS', href: `/${countryCode}/category/new-arrivals`, mega: true },
    { name: 'COLLECTIONS', href: `/${countryCode}/collections` },
    { name: 'HERMÈS', href: `/${countryCode}/category/hermes` },
    { name: 'CHANEL', href: `/${countryCode}/category/chanel` },
    { name: 'GOYARD', href: `/${countryCode}/category/goyard` },
    { name: 'ACCESSORIES', href: `/${countryCode}/category/accessories` },
    { name: 'JEWELRY', href: `/${countryCode}/category/jewelry` },
    { name: 'THE JOURNAL', href: `/${countryCode}/journal` },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      {/* Top Ticker Bar - Minimalist Ivory */}
      <div className="bg-[#fcfcfc] text-gray-500 h-10 flex items-center justify-center px-6 text-[9px] tracking-[0.4em] font-bold uppercase border-b border-gray-100">
        <div className="flex items-center space-x-10">
          <ChevronLeft 
            className="w-3.5 h-3.5 cursor-pointer hover:text-black transition-colors opacity-40" 
            onClick={handlePrevSlide}
          />
          <div className="overflow-hidden relative flex items-center justify-center min-w-[500px]">
            <span className="animate-fade-in text-center" key={activeSlide}>
              {slides[activeSlide]}
            </span>
          </div>
          <ChevronRight 
            className="w-3.5 h-3.5 cursor-pointer hover:text-black transition-colors opacity-40" 
            onClick={handleNextSlide}
          />
        </div>
      </div>

      {/* Black Utility Bar */}
      <div className="bg-black text-white h-11 flex items-center justify-between px-12 text-[10px] tracking-[0.3em] font-bold uppercase">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
          <span className="opacity-90">Authenticity Registry Verified</span>
        </div>
        
        <div className="flex items-center space-x-8">
          <Link href="#" className="hover:text-secondary transition-colors">Consignment</Link>
          <Link href={`/${countryCode}/appointments`} className="hover:text-secondary transition-colors">Private Viewings</Link>
          <Link href={`/${countryCode}/contact`} className="hover:text-secondary transition-colors">Specialist Inquiry</Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-3 hover:opacity-80 transition-all group border-l border-white/10 pl-8">
                <span className="text-sm leading-none grayscale brightness-200">{currentCountry.flag}</span>
                <span className="font-bold tracking-widest text-[10px] text-white uppercase">{currentCountry.name}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border-gray-100 w-64 p-3 rounded-none shadow-luxury">
              <DropdownMenuLabel className="text-[8px] uppercase tracking-[0.5em] text-muted-foreground mb-3 px-3">Global Regions</DropdownMenuLabel>
              {Object.values(COUNTRIES).map((c) => (
                <DropdownMenuItem 
                  key={c.code} 
                  onClick={() => handleCountryChange(c.code)} 
                  className={cn(
                    "cursor-pointer flex items-center justify-between p-4 rounded-none transition-colors mb-1",
                    countryCode === c.code ? "bg-black text-white" : "hover:bg-ivory text-black"
                  )}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-lg leading-none">{c.flag}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">{c.name}</span>
                  </div>
                  <span className="text-[9px] font-medium opacity-40">{c.currency}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Brand Header */}
      <div className="h-28 border-b border-gray-100 px-12 flex items-center justify-between relative bg-white">
        <div className="flex items-center space-x-6 text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
          <Link href="#" className="hover:text-black border-r border-gray-100 pr-6">Client Portal</Link>
          <Link href="#" className="hover:text-black">Join</Link>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <Link href={`/${countryCode}`} className="group flex flex-col items-center">
            <span className="font-headline text-5xl font-medium tracking-[0.05em] text-black transition-all duration-700 group-hover:tracking-[0.1em]">
              AMARISÉ <span className="font-light italic text-3xl opacity-80">MAISON</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-10">
          <button className="text-gray-400 hover:text-black transition-colors group relative flex items-center">
            <Search className="w-5 h-5 stroke-[1.5px]" />
            <span className="ml-3 text-[10px] font-bold uppercase tracking-[0.3em] hidden lg:block">Search</span>
          </button>
          
          <Link href={`/${countryCode}/wishlist`} className="relative text-gray-400 hover:text-black transition-colors group">
            <Heart className={cn("w-5 h-5 stroke-[1.5px]", wishlist.length > 0 && "fill-black text-black")} />
            {wishlist.length > 0 && (
              <span className="absolute -top-3 -right-3 bg-black text-white text-[8px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link href={`/${countryCode}/cart`} className="relative text-gray-400 hover:text-black transition-colors group">
            <ShoppingBag className="w-5 h-5 stroke-[1.5px]" />
            {cartCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-secondary text-white text-[8px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Primary Navigation with Mega Menu */}
      <nav className="h-16 bg-white border-b border-gray-100 px-12 hidden lg:flex items-center justify-center space-x-12">
        {navLinks.map((link) => (
          <div key={link.name} className="group h-full flex items-center">
            <Link 
              href={link.href} 
              className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-900 hover:text-secondary transition-all relative"
            >
              {link.name}
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-secondary transition-all group-hover:w-full group-hover:left-0" />
            </Link>

            {/* Mega Menu implementation */}
            {link.mega && (
              <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-50 pt-20 pb-24 border-t border-gray-50">
                <div className="container mx-auto px-20 flex gap-40 max-w-[1600px]">
                  {/* Left Column: Navigation Links */}
                  <div className="w-72 space-y-10">
                    <h3 className="text-[10px] font-bold tracking-[0.5em] text-secondary uppercase border-b border-gray-100 pb-4">New Arrivals</h3>
                    <div className="flex flex-col space-y-6">
                      {['Hermès Heritage', 'Chanel Seasonal', 'Maison Accessories', 'Artisanal Jewelry'].map((sub) => (
                        <Link 
                          key={sub} 
                          href="#" 
                          className="text-2xl font-headline font-medium text-gray-600 hover:text-black transition-all hover:italic hover:pl-2"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Featured Image Area */}
                  <div className="flex-1 space-y-10">
                    <div className="aspect-[21/9] w-full bg-muted border border-gray-100 flex items-center justify-center group/img relative overflow-hidden shadow-sm">
                      <Image 
                        src="https://picsum.photos/seed/amarise-arrivals-bags/1200/800" 
                        alt="New Arrivals" 
                        fill 
                        className="object-cover transition-transform duration-[3s] group-hover/img:scale-105"
                        data-ai-hint="luxury handbags"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover/img:bg-transparent transition-colors" />
                    </div>
                    <div className="flex justify-between items-end border-l-2 border-secondary/20 pl-10">
                      <div className="space-y-2">
                        <h4 className="text-5xl font-headline font-medium text-black uppercase tracking-tight">The 1924 Series</h4>
                        <p className="text-lg font-light text-gray-400 italic">Exploring the heritage of global craft.</p>
                      </div>
                      <Button variant="outline" className="rounded-none border-black text-[9px] font-bold tracking-[0.4em] uppercase h-12 px-10 hover:bg-black hover:text-white transition-all">
                        Discover More
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Mobile Trigger */}
      <div className="lg:hidden h-16 bg-white flex items-center px-12 justify-between border-b border-gray-100">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black">
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <span className="text-[10px] font-bold uppercase tracking-[0.5em] italic">Maison Menu</span>
        <div className="w-10" />
      </div>
    </header>
  );
};