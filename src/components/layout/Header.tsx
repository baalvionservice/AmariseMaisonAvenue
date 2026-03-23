'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Search, ShoppingBag, Heart, Menu, X, ChevronLeft, ChevronRight, ShieldCheck, User, LayoutDashboard, Sparkles } from 'lucide-react';
import { COUNTRIES } from '@/lib/mock-data';
import { MAISON_SERVICES } from '@/lib/mock-monetization';
import { useAppStore } from '@/lib/store';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLink {
  name: string;
  href: string;
  mega?: boolean;
  services?: boolean;
}

export const Header = () => {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const router = useRouter();
  const { cart, wishlist, currentUser } = useAppStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const countryCode = (params?.country as string) || 'us';
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES.us;
  
  const cartCount = mounted ? cart.reduce((acc, i) => acc + i.quantity, 0) : 0;
  const wishlistCount = mounted ? wishlist.length : 0;

  const slides = [
    "PRIVATE CURATORIAL SESSIONS AVAILABLE IN NYC & LONDON",
    "THE SPRING 1924 ARCHIVE REGISTRY IS NOW ACTIVE"
  ];

  const handleCountryChange = (code: string) => {
    router.push(`/${code}`);
  };

  const isAdmin = currentUser?.role === 'super_admin' || currentUser?.role === 'country_admin';

  const navLinks: NavLink[] = [
    { name: 'NEW ARRIVALS', href: `/${countryCode}/category/new-arrivals`, mega: true },
    { name: 'HERMÈS', href: `/${countryCode}/category/hermes`, mega: true },
    { name: 'CHANEL', href: `/${countryCode}/category/chanel`, mega: true },
    { name: 'JEWELRY', href: `/${countryCode}/category/jewelry`, mega: true },
    { name: 'LIVE SHOP', href: `/${countryCode}/account/live`, services: true },
    { name: 'BLOG', href: `/${countryCode}/journal` },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      {/* 1. Desktop Ticker - Hidden on Small Mobile */}
      <div className="hidden sm:flex bg-[#fcfcfc] text-gray-500 h-10 items-center justify-center px-6 text-[9px] tracking-[0.4em] font-bold uppercase border-b border-gray-100">
        <div className="flex items-center space-x-10">
          <button className="opacity-40 p-2 hover:text-black transition-colors" onClick={() => setActiveSlide(s => s === 0 ? slides.length-1 : s-1)} aria-label="Prev">
            <ChevronLeft className="w-3 h-3" />
          </button>
          <div className="overflow-hidden relative flex items-center justify-center min-w-[300px] lg:min-w-[500px]">
            <span className="animate-fade-in text-center" key={activeSlide}>{slides[activeSlide]}</span>
          </div>
          <button className="opacity-40 p-2 hover:text-black transition-colors" onClick={() => setActiveSlide(s => s === slides.length-1 ? 0 : s+1)} aria-label="Next">
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 2. Authority Utility Bar - Hidden on Mobile */}
      <div className="hidden md:flex bg-black text-white h-11 items-center justify-between px-12 text-[10px] tracking-[0.3em] font-bold uppercase">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
            <span className="opacity-90">Maison Registry Verified</span>
          </div>
          {isAdmin && (
            <Link href="/admin" className="text-blue-400 hover:text-white transition-colors border-l border-white/10 pl-6 flex items-center space-x-2">
               <LayoutDashboard className="w-3.5 h-3.5" />
               <span>ADMIN TERMINAL</span>
            </Link>
          )}
        </div>
        
        <nav className="flex items-center space-x-8">
          <Link href={`/${countryCode}/how-to-sell`} className="hover:text-secondary">Consignment</Link>
          <Link href={`/${countryCode}/appointments`} className="hover:text-secondary">Viewings</Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-3 hover:opacity-80 transition-all border-l border-white/10 pl-8">
                <span className="text-sm grayscale brightness-200">{currentCountry.flag}</span>
                <span className="text-[10px] text-white uppercase">{currentCountry.name}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border-gray-100 w-64 p-3 shadow-luxury rounded-none">
              {Object.values(COUNTRIES).map((c) => (
                <DropdownMenuItem key={c.code} onClick={() => handleCountryChange(c.code)} className={cn("cursor-pointer p-4 rounded-none", countryCode === c.code ? "bg-black text-white" : "hover:bg-ivory")}>
                  <div className="flex items-center space-x-4">
                    <span>{c.flag}</span>
                    <span className="text-[10px] font-bold uppercase">{c.name}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>

      {/* 3. Main Brand Header - Responsive Height */}
      <div className="h-20 lg:h-28 border-b border-gray-100 px-6 lg:px-12 flex items-center justify-between relative bg-white">
        {/* Mobile Menu Trigger */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 -ml-2" aria-label="Open Menu">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0 bg-white border-none rounded-none font-body">
              <SheetHeader className="p-8 border-b border-gray-50 text-left">
                <SheetTitle className="font-headline text-2xl italic">Maison Navigation</SheetTitle>
              </SheetHeader>
              <div className="p-8 flex flex-col space-y-8">
                {navLinks.map(link => (
                  <Link key={link.name} href={link.href} className="text-sm font-bold tracking-[0.3em] uppercase hover:text-plum transition-colors">
                    {link.name}
                  </Link>
                ))}
                <div className="pt-8 border-t border-gray-50 space-y-6">
                  <Link href={`/${countryCode}/account`} className="text-xs font-medium uppercase tracking-widest text-gray-500">My Portal</Link>
                  <Link href={`/${countryCode}/appointments`} className="text-xs font-medium uppercase tracking-widest text-gray-500">Book Viewing</Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href={`/${countryCode}`} className="group text-center">
            <span className="font-headline text-3xl lg:text-5xl font-medium tracking-[0.05em] text-black">
              AMARISÉ <span className="hidden lg:inline font-light italic text-3xl opacity-80">MAISON</span>
            </span>
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 lg:space-x-8">
          <button className="p-2 text-gray-400 hover:text-black hidden sm:flex items-center" onClick={() => setIsSearchOpen(true)}>
            <Search className="w-5 h-5 stroke-[1.5px]" />
            <span className="ml-2 text-[10px] font-bold uppercase tracking-[0.2em] hidden lg:block">Intelligence</span>
          </button>
          
          <Link href={`/${countryCode}/wishlist`} className="relative p-2 text-gray-400 hover:text-black">
            <Heart className={cn("w-5 h-5", wishlistCount > 0 && "fill-black text-black")} />
            {wishlistCount > 0 && <span className="absolute top-0 right-0 bg-black text-white text-[7px] w-4 h-4 rounded-full flex items-center justify-center">{wishlistCount}</span>}
          </Link>

          <Link href={`/${countryCode}/cart`} className="relative p-2 text-gray-400 hover:text-black">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && <span className="absolute top-0 right-0 bg-secondary text-white text-[7px] w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
          </Link>
        </div>
      </div>

      {/* 4. Desktop Curatorial Navigation - Hidden on Mobile */}
      <nav className="h-16 bg-white border-b border-gray-100 px-12 hidden lg:flex items-center justify-center space-x-12">
        {navLinks.map((link) => (
          <div key={link.name} className="group h-full flex items-center">
            <Link href={link.href} className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-900 hover:text-secondary transition-all relative py-2">
              {link.name}
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-secondary transition-all group-hover:w-full group-hover:left-0" />
            </Link>
          </div>
        ))}
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-3xl flex flex-col p-12">
            <div className="container mx-auto max-w-6xl">
              <div className="flex justify-between items-center mb-24">
                <span className="font-headline text-2xl font-bold italic uppercase tracking-widest">Archive Discovery</span>
                <button onClick={() => setIsSearchOpen(false)} className="p-4 hover:scale-110 transition-transform"><X className="w-10 h-10 stroke-[1px]" /></button>
              </div>
              <div className="relative">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-300" />
                <input autoFocus type="text" placeholder="Search Maison Intelligence..." className="w-full bg-transparent border-b border-gray-100 h-24 pl-16 pr-12 text-4xl lg:text-6xl font-headline italic font-light outline-none focus:border-black transition-all" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
