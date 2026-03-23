'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Search, ShoppingBag, Heart, Menu, X, ChevronLeft, ChevronRight, ShieldCheck, Globe, User, LayoutDashboard, Sparkles } from 'lucide-react';
import { COUNTRIES } from '@/lib/mock-data';
import { useAppStore } from '@/lib/store';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLink {
  name: string;
  href: string;
  mega?: boolean;
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
    { name: 'NEW ARRIVALS', href: `/${countryCode}/category/new-arrivals` },
    { name: 'HERMÈS', href: `/${countryCode}/category/hermes` },
    { name: 'CHANEL', href: `/${countryCode}/category/chanel` },
    { name: 'JEWELRY', href: `/${countryCode}/category/jewelry` },
    { name: 'LIVE SHOP', href: `/${countryCode}/account/live` },
    { name: 'THE JOURNAL', href: `/${countryCode}/journal` },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      {/* 1. Ticker Hub */}
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

      {/* 2. Institutional Passport (Utility Bar) */}
      <div className="hidden md:flex bg-black text-white h-11 items-center justify-between px-12 text-[10px] tracking-[0.3em] font-bold uppercase">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            <span className="opacity-90">Maison Heritage Protocol</span>
          </div>
          {isAdmin && (
            <Link href="/admin" className="text-blue-400 hover:text-white transition-colors border-l border-white/10 pl-6 flex items-center space-x-2">
               <LayoutDashboard className="w-3.5 h-3.5" />
               <span>ADMIN MATRIX</span>
            </Link>
          )}
        </div>
        
        <nav className="flex items-center space-x-10">
          <Link href={`/${countryCode}/account/login`} className="hover:text-gold transition-colors font-light italic lowercase">Log in | Sign up</Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-3 hover:opacity-80 transition-all border-l border-white/10 pl-8 group">
                <Globe className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
                <span className="text-[10px] text-white uppercase tracking-[0.2em]">{currentCountry.name} HUB</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border-gray-100 w-64 p-3 shadow-luxury rounded-none">
              {Object.values(COUNTRIES).map((c) => (
                <DropdownMenuItem key={c.code} onClick={() => handleCountryChange(c.code)} className={cn("cursor-pointer p-4 rounded-none mb-1", countryCode === c.code ? "bg-black text-white" : "hover:bg-ivory")}>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-4">
                      <span className="text-lg">{c.flag}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest">{c.name} Hub</span>
                    </div>
                    {countryCode === c.code && <ShieldCheck className="w-3 h-3 text-gold" />}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>

      {/* 3. Brand Core */}
      <div className="h-20 lg:h-28 border-b border-gray-100 px-6 lg:px-12 flex items-center justify-between relative bg-white">
        {/* Mobile Trigger */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 -ml-2" aria-label="Menu">
                <Menu className="w-6 h-6 stroke-[1.5px]" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-[400px] p-0 bg-white border-none rounded-none font-body">
              <SheetHeader className="p-10 border-b border-gray-50 text-left">
                <SheetTitle className="font-headline text-3xl italic">Maison Registry</SheetTitle>
              </SheetHeader>
              <div className="p-10 flex flex-col space-y-10">
                {navLinks.map(link => (
                  <Link key={link.name} href={link.href} className="text-base font-bold tracking-[0.3em] uppercase hover:text-plum transition-colors">
                    {link.name}
                  </Link>
                ))}
                <div className="pt-10 border-t border-gray-50 space-y-8">
                  <Link href={`/${countryCode}/account`} className="block text-sm font-bold uppercase tracking-widest text-gray-400">Collector Portal</Link>
                  <Link href={`/${countryCode}/how-to-sell`} className="block text-sm font-bold uppercase tracking-widest text-gray-400">Consign with Us</Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo Hub */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href={`/${countryCode}`} className="group text-center">
            <span className="font-headline text-3xl lg:text-5xl font-medium tracking-[0.05em] text-black">
              AMARISÉ <span className="hidden lg:inline font-light italic text-3xl opacity-80">MAISON</span>
            </span>
          </Link>
        </div>

        {/* Tactical Actions */}
        <div className="flex items-center space-x-2 lg:space-x-10">
          <button className="p-2 text-gray-400 hover:text-black hidden sm:flex items-center" onClick={() => setIsSearchOpen(true)}>
            <Search className="w-5 h-5 stroke-[1.5px]" />
            <span className="ml-3 text-[10px] font-bold uppercase tracking-[0.3em] hidden lg:block">Intelligence</span>
          </button>
          
          <Link href={`/${countryCode}/wishlist`} className="relative p-2 text-gray-400 hover:text-black">
            <Heart className={cn("w-5 h-5 transition-colors", wishlistCount > 0 && "fill-black text-black")} />
            {wishlistCount > 0 && <span className="absolute top-0 right-0 bg-black text-white text-[7px] w-4 h-4 rounded-full flex items-center justify-center shadow-lg">{wishlistCount}</span>}
          </Link>

          <Link href={`/${countryCode}/cart`} className="relative p-2 text-gray-400 hover:text-black">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && <span className="absolute top-0 right-0 bg-secondary text-white text-[7px] w-4 h-4 rounded-full flex items-center justify-center shadow-lg">{cartCount}</span>}
          </Link>
        </div>
      </div>

      {/* 4. Curatorial Nav */}
      <nav className="h-16 bg-white border-b border-gray-100 px-12 hidden lg:flex items-center justify-center space-x-16">
        {navLinks.map((link) => (
          <div key={link.name} className="group h-full flex items-center">
            <Link href={link.href} className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-900 hover:text-plum transition-all relative py-2">
              {link.name}
              <span className="absolute -bottom-1 left-1/2 w-0 h-[1.5px] bg-plum transition-all duration-500 group-hover:w-full group-hover:left-0" />
            </Link>
          </div>
        ))}
      </nav>

      {/* Discovery Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-white/98 backdrop-blur-3xl flex flex-col p-12 lg:p-24 font-body">
            <div className="container mx-auto max-w-[1600px]">
              <div className="flex justify-between items-center mb-32">
                <div className="space-y-2">
                   <h2 className="font-headline text-4xl lg:text-6xl font-bold italic text-gray-900 tracking-tighter">Archive Discovery</h2>
                   <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400">Institutional Registry Search</p>
                </div>
                <button onClick={() => setIsSearchOpen(false)} className="p-6 hover:scale-110 transition-transform group">
                  <X className="w-12 h-12 lg:w-16 lg:h-12 stroke-[1px] text-gray-300 group-hover:text-black transition-colors" />
                </button>
              </div>
              <div className="relative border-b border-gray-100 pb-8">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 lg:w-12 lg:h-12 text-gray-200" />
                <input autoFocus type="text" placeholder="Inquire with the archives..." className="w-full bg-transparent h-24 pl-16 lg:pl-24 text-4xl lg:text-8xl font-headline italic font-light outline-none focus:placeholder:opacity-0 transition-all text-gray-900" />
              </div>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-gray-400">
                 <div className="space-y-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Suggested Entries</span>
                    <ul className="space-y-4 text-xl lg:text-2xl font-light italic">
                       <li className="hover:text-plum cursor-pointer">Hermès Birkin 25 Gold</li>
                       <li className="hover:text-plum cursor-pointer">Chanel Classic Flap Archive</li>
                       <li className="hover:text-plum cursor-pointer">1924 Heritage Series</li>
                    </ul>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
