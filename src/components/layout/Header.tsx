
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Search, ShoppingBag, Heart, Menu, X, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { COUNTRIES } from '@/lib/mock-data';
import { useAppStore } from '@/lib/store';
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
    "Call to schedule an appointment in our NYC Showroom or Virtually via FaceTime",
    "Spring Collector's Auction"
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
    { name: 'HERMÈS', href: `/${countryCode}/category/hermes` },
    { name: 'CHANEL', href: `/${countryCode}/category/chanel` },
    { name: 'GOYARD', href: `/${countryCode}/category/goyard` },
    { name: 'OTHER BRANDS', href: `/${countryCode}/category/accessories` },
    { name: 'JEWELRY', href: `/${countryCode}/category/jewelry` },
    { name: 'LIVE SHOP', href: `/${countryCode}/buying-guide` },
    { name: 'BLOG', href: `/${countryCode}/journal` },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      {/* Top Ticker Bar - Light Lavender Style */}
      <div className="bg-[#f3ebf7] text-gray-800 h-9 flex items-center justify-center px-6 text-[10px] tracking-widest font-medium uppercase border-b border-black/5">
        <div className="flex items-center space-x-6">
          <ChevronLeft 
            className="w-3.5 h-3.5 cursor-pointer hover:text-plum transition-colors opacity-60" 
            onClick={handlePrevSlide}
          />
          <div className="overflow-hidden relative flex items-center justify-center min-w-[400px]">
            <span className="tracking-[0.15em] animate-fade-in text-center" key={activeSlide}>
              {slides[activeSlide]}
            </span>
          </div>
          <ChevronRight 
            className="w-3.5 h-3.5 cursor-pointer hover:text-plum transition-colors opacity-60" 
            onClick={handleNextSlide}
          />
        </div>
      </div>

      {/* Black Utility Bar */}
      <div className="bg-[#1a1a1a] text-white h-10 flex items-center justify-between px-6 text-[10px] tracking-widest font-bold uppercase">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-3.5 h-3.5 text-white/80" />
          <span className="text-white">100% Authentic Guaranteed</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <Link href="#" className="hover:text-gold transition-colors">Sell</Link>
          <Link href={`/${countryCode}/appointments`} className="hover:text-gold transition-colors">Appointments</Link>
          <Link href={`/${countryCode}/contact`} className="hover:text-gold transition-colors">Contact</Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2 hover:opacity-80 transition-all group">
                <span className="text-sm leading-none">{currentCountry.flag}</span>
                <span className="font-bold tracking-tighter text-[11px] text-white uppercase">{currentCountry.name}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border-border w-56 p-2 rounded-none shadow-luxury">
              <DropdownMenuLabel className="text-[8px] uppercase tracking-widest text-muted-foreground mb-2 px-3">Select Global Region</DropdownMenuLabel>
              {Object.values(COUNTRIES).map((c) => (
                <DropdownMenuItem 
                  key={c.code} 
                  onClick={() => handleCountryChange(c.code)} 
                  className={cn(
                    "cursor-pointer flex items-center justify-between p-3 rounded-none transition-colors",
                    countryCode === c.code ? "bg-black text-white" : "hover:bg-ivory text-black"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-base leading-none">{c.flag}</span>
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

      {/* Primary Navigation with Mega Menu */}
      <nav className="h-14 bg-white border-b border-border px-6 hidden lg:flex items-center justify-center space-x-10">
        {navLinks.map((link) => (
          <div key={link.name} className="group h-full flex items-center">
            <Link 
              href={link.href} 
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 hover:text-black transition-colors relative"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
            </Link>

            {/* Mega Menu implementation */}
            {link.mega && (
              <div className="absolute top-full left-0 w-full bg-white border-b border-border shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pt-16 pb-20">
                <div className="container mx-auto px-32 flex gap-32">
                  {/* Left Column: Navigation Links */}
                  <div className="w-64 space-y-8">
                    <h3 className="text-[10px] font-bold tracking-[0.3em] text-black uppercase">NEW ARRIVALS</h3>
                    <div className="flex flex-col space-y-5">
                      {['Hermès', 'Chanel', 'Other Brands', 'Jewelry'].map((sub) => (
                        <Link 
                          key={sub} 
                          href="#" 
                          className="text-lg font-light text-gray-600 hover:text-black transition-colors"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Featured Image Area */}
                  <div className="flex-1 space-y-8">
                    <div className="aspect-[16/8] w-full bg-muted border border-border flex items-center justify-center group/img relative overflow-hidden">
                      <Image 
                        src="https://picsum.photos/seed/amarise-arrivals-bags/1200/800" 
                        alt="New Arrivals" 
                        fill 
                        className="object-cover transition-transform duration-1000 group-hover/img:scale-105"
                        data-ai-hint="luxury handbags"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover/img:bg-transparent transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-4xl font-headline font-bold text-black uppercase tracking-wider">NEW ARRIVALS</h4>
                      <p className="text-base font-light text-gray-500 italic">Hermès New Arrivals</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Mobile Trigger */}
      <div className="lg:hidden h-14 bg-white flex items-center px-6 justify-between border-b border-border">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
        <span className="text-[10px] font-bold uppercase tracking-widest">Menu</span>
        <div className="w-10" />
      </div>
    </header>
  );
};
