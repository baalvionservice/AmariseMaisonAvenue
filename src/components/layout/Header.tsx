'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Globe, 
  User, 
  LayoutDashboard, 
  Sparkles,
  MapPin,
  Briefcase
} from 'lucide-react';
import { COUNTRIES } from '@/lib/mock-data';
import { useAppStore } from '@/lib/store';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface NavLink {
  name: string;
  href: string;
  id: string;
}

export const Header = () => {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const router = useRouter();
  const { cart, wishlist, currentUser } = useAppStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  
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
    { id: 'new', name: 'NEW ARRIVALS', href: `/${countryCode}/category/new-arrivals` },
    { id: 'hermes', name: 'HERMÈS', href: `/${countryCode}/category/hermes` },
    { id: 'chanel', name: 'CHANEL', href: `/${countryCode}/category/chanel` },
    { id: 'goyard', name: 'GOYARD', href: `/${countryCode}/category/goyard` },
    { id: 'other', name: 'OTHER BRANDS', href: `/${countryCode}/category/other-brands` },
    { id: 'jewelry', name: 'JEWELRY', href: `/${countryCode}/category/jewelry` },
    { id: 'live', name: 'AMARISÉ LIVE', href: `/${countryCode}/account/live` },
    { id: 'journal', name: 'BLOG', href: `/${countryCode}/journal` },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white" onMouseLeave={() => setHoveredLink(null)}>
      {/* 1. Ticker Hub */}
      <div className="hidden sm:flex bg-[#fcfcfc] text-gray-500 h-10 items-center justify-center px-6 text-[9px] tracking-[0.4em] font-bold uppercase border-b border-gray-100">
        <div className="flex items-center space-x-10">
          <button className="opacity-40 p-2 hover:text-black transition-colors bg-transparent border-none outline-none cursor-pointer" onClick={() => setActiveSlide(s => s === 0 ? slides.length-1 : s-1)} aria-label="Prev">
            <ChevronLeft className="w-3 h-3" />
          </button>
          <div className="overflow-hidden relative flex items-center justify-center min-w-[300px] lg:min-w-[500px]">
            <span className="animate-fade-in text-center" key={activeSlide}>{slides[activeSlide]}</span>
          </div>
          <button className="opacity-40 p-2 hover:text-black transition-colors bg-transparent border-none outline-none cursor-pointer" onClick={() => setActiveSlide(s => s === slides.length-1 ? 0 : s+1)} aria-label="Next">
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
              <button className="flex items-center space-x-3 hover:opacity-80 transition-all border-l border-white/10 pl-8 group bg-transparent border-none outline-none cursor-pointer">
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
                    {countryCode === c.code && <ShieldCheck className="w-3.5 h-3.5 text-gold" />}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>

      {/* 3. Brand Core */}
      <div className="h-20 lg:h-28 border-b border-gray-100 px-6 lg:px-12 flex items-center justify-between relative bg-white">
        {/* Mobile Menu Trigger */}
        <div className="lg:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 -ml-2 bg-transparent border-none outline-none cursor-pointer" aria-label="Open Maison Menu">
                <Menu className="w-6 h-6 stroke-[1.5px]" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-[440px] p-0 bg-white border-none rounded-none font-body flex flex-col h-full shadow-2xl">
              <SheetHeader className="p-8 border-b border-gray-50 text-left shrink-0">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <SheetTitle className="font-headline text-3xl italic tracking-tight text-gray-900 leading-none">Maison Archive</SheetTitle>
                    <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400">Institutional Registry</p>
                  </div>
                  <SheetClose asChild>
                    <button className="p-2 hover:bg-gray-50 transition-colors bg-transparent border-none outline-none cursor-pointer">
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  </SheetClose>
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-8 space-y-1">
                  <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-plum mb-6 px-2">Departments</p>
                  {navLinks.map(link => (
                    <SheetClose asChild key={link.id}>
                      <Link href={link.href} className="block group">
                        <div className="w-full text-left py-4 px-2 text-base font-bold tracking-[0.3em] uppercase text-gray-900 group-hover:text-plum transition-colors flex items-center justify-between">
                          {link.name}
                          <ChevronRight className="w-4 h-4 text-gray-200 group-hover:text-plum group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                    </SheetClose>
                  ))}
                </div>

                <div className="px-8 py-10 bg-ivory/50 border-y border-gray-50 space-y-1">
                  <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-gray-400 mb-6 px-2">Collector Services</p>
                  <SheetClose asChild>
                    <Link href={`/${countryCode}/account`} className="block group">
                      <div className="w-full text-left py-4 px-2 flex items-center space-x-4">
                        <User className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-bold uppercase tracking-widest text-gray-700">My Dashboard</span>
                      </div>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href={`/${countryCode}/how-to-sell`} className="block group">
                      <div className="w-full text-left py-4 px-2 flex items-center space-x-4">
                        <Briefcase className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-bold uppercase tracking-widest text-gray-700">Consign Artifacts</span>
                      </div>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href={`/${countryCode}/appointments`} className="block group">
                      <div className="w-full text-left py-4 px-2 flex items-center space-x-4">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-bold uppercase tracking-widest text-gray-700">Book Private Salon</span>
                      </div>
                    </Link>
                  </SheetClose>
                </div>

                <div className="p-8 space-y-6">
                  <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-gray-400 mb-2 px-2">Market Hubs</p>
                  <div className="grid grid-cols-2 gap-3 px-2">
                    {Object.values(COUNTRIES).map((c) => (
                      <button 
                        key={c.code} 
                        onClick={() => { handleCountryChange(c.code); }}
                        className={cn(
                          "flex flex-col items-center justify-center p-4 border transition-all rounded-none outline-none cursor-pointer",
                          countryCode === c.code ? "bg-black border-black text-white shadow-lg" : "bg-white border-gray-100 text-gray-400 hover:border-plum"
                        )}
                      >
                        <span className="text-xl mb-1">{c.flag}</span>
                        <span className="text-[9px] font-bold uppercase tracking-tighter">{c.name} Hub</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-10 border-t border-gray-50 bg-white shrink-0 text-center space-y-4">
                <div className="flex flex-col items-center justify-center">
                  <span className="font-headline text-2xl font-bold tracking-[0.05em] text-gray-900">AMARISÉ</span>
                  <span className="text-[8px] font-bold uppercase tracking-[0.6em] text-gray-300 mt-1 italic">Maison Avenue</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-emerald-500 opacity-40 grayscale-[50%]">
                  <ShieldCheck className="w-3 h-3" />
                  <span className="text-[8px] font-bold uppercase tracking-widest">Protocol Active</span>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href={`/${countryCode}`} className="group text-center block">
            <span className="font-headline text-3xl lg:text-5xl font-medium tracking-[0.05em] text-black">
              AMARISÉ <span className="hidden lg:inline font-light italic text-3xl opacity-80">MAISON</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-1 lg:space-x-10">
          <button className="p-2 text-gray-400 hover:text-black hidden sm:flex items-center bg-transparent border-none outline-none cursor-pointer" onClick={() => setIsSearchOpen(true)}>
            <Search className="w-5 h-5 stroke-[1.5px]" />
            <span className="ml-3 text-[10px] font-bold uppercase tracking-[0.3em] hidden lg:block">Intelligence</span>
          </button>
          
          <button className="p-2 text-gray-400 hover:text-black sm:hidden bg-transparent border-none outline-none cursor-pointer" onClick={() => setIsSearchOpen(true)}>
            <Search className="w-5 h-5 stroke-[1.5px]" />
          </button>

          <Link href={`/${countryCode}/wishlist`} className="relative p-2 text-gray-400 hover:text-black">
            <Heart className={cn("w-5 h-5 transition-colors", wishlistCount > 0 && "fill-black text-black")} />
            {wishlistCount > 0 && <span className="absolute top-0 right-0 bg-black text-white text-[7px] w-4 h-4 rounded-full flex items-center justify-center shadow-lg font-bold border border-white">{wishlistCount}</span>}
          </Link>

          <Link href={`/${countryCode}/cart`} className="relative p-2 text-gray-400 hover:text-black">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && <span className="absolute top-0 right-0 bg-plum text-white text-[7px] w-4 h-4 rounded-full flex items-center justify-center shadow-lg font-bold border border-white">{cartCount}</span>}
          </Link>
        </div>
      </div>

      <nav className="h-16 bg-white border-b border-gray-100 px-12 hidden lg:flex items-center justify-center space-x-16">
        {navLinks.map((link) => (
          <div 
            key={link.id} 
            className="h-full flex items-center relative"
            onMouseEnter={() => setHoveredLink(link.id)}
          >
            <Link 
              href={link.href} 
              className={cn(
                "text-[10px] font-bold uppercase tracking-[0.4em] text-gray-900 hover:text-plum transition-all relative py-2",
                hoveredLink === link.id && "text-plum"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-1 left-0 h-[1.5px] bg-black transition-all duration-500",
                hoveredLink === link.id ? "w-full" : "w-0"
              )} />
            </Link>
          </div>
        ))}
      </nav>

      <AnimatePresence>
        {hoveredLink === 'new' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="absolute top-[148px] lg:top-[212px] left-0 right-0 bg-white border-b border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] z-40 overflow-hidden"
            onMouseEnter={() => setHoveredLink('new')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <div className="container mx-auto max-w-[1200px] py-16 px-12 flex gap-24">
              <div className="w-64 space-y-10 shrink-0">
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-900">NEW ARRIVALS</h4>
                  <div className="h-px w-8 bg-black" />
                </div>
                <ul className="space-y-6">
                  {['Hermès', 'Chanel', 'Other Brands', 'Jewelry'].map((item) => (
                    <li key={item}>
                      <Link href={`/${countryCode}/category/new-arrivals`} className="text-lg font-body font-light text-gray-500 hover:text-black transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 flex flex-col space-y-8">
                <div className="relative aspect-[16/9] w-full bg-ivory overflow-hidden group">
                  <Image 
                    src="https://madisonavenuecouture.com/cdn/shop/files/New_Arrivals_Mega_Menu_Banner.jpg?v=1691512345&width=1200"
                    alt="New Arrivals Curation"
                    fill
                    className="object-cover transition-transform duration-[3s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-headline text-4xl font-medium text-gray-900 tracking-tight uppercase">NEW ARRIVALS</h3>
                  <p className="text-sm font-body font-light text-gray-500 tracking-wide">Hermès New Arrivals</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {hoveredLink === 'hermes' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="absolute top-[148px] lg:top-[212px] left-0 right-0 bg-white border-b border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] z-40 overflow-hidden"
            onMouseEnter={() => setHoveredLink('hermes')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <div className="container mx-auto max-w-[1400px] py-16 px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="space-y-10">
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-900">HANDBAGS</h4>
                  <div className="h-px w-8 bg-black" />
                </div>
                <ul className="space-y-4">
                  {['Birkin', 'Kelly', 'Constance', 'Evelyne', 'Picotin', 'Lindy', 'Herbag', 'Other Bags', 'All Hermès Bags'].map((item) => (
                    <li key={item}>
                      <Link href={`/${countryCode}/category/hermes`} className="text-sm font-body font-light text-gray-500 hover:text-black transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-10">
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-900">ACCESSORIES</h4>
                  <div className="h-px w-8 bg-black" />
                </div>
                <ul className="space-y-4">
                  {['Wallets', 'Watches', 'Belts', 'Charms', 'Scarves', 'Shoes', 'Jewelry'].map((item) => (
                    <li key={item}>
                      <Link href={`/${countryCode}/category/hermes`} className="text-sm font-body font-light text-gray-500 hover:text-black transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-10">
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-900">CURATIONS</h4>
                  <div className="h-px w-8 bg-black" />
                </div>
                <ul className="space-y-4">
                  {['New Arrivals', 'Best Sellers', 'Exotic Handbags', 'Rare & Unique Bags', 'HSS Horseshoe Stamp Bags', 'Pre-Owned & Vintage Handbags', 'Home Goods', 'Atelier Bags', 'Palm Beach Collection', 'Bag Besties & Organizers'].map((item) => (
                    <li key={item}>
                      <Link href={`/${countryCode}/category/hermes`} className="text-sm font-body font-light text-gray-500 hover:text-black transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-8 flex flex-col items-center text-center">
                <div className="relative aspect-[3/2] w-full bg-ivory overflow-hidden group">
                  <Image 
                    src="https://madisonavenuecouture.com/cdn/shop/files/Hermes_Bestsellers_Mega_Menu_Banner.jpg?v=1691512345&width=800"
                    alt="Hermès Bestsellers"
                    fill
                    className="object-cover transition-transform duration-[3s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/[0.02]" />
                </div>
                <h3 className="font-headline text-3xl font-medium text-gray-900 italic tracking-tight">Hermès Bestsellers</h3>
              </div>
            </div>
          </motion.div>
        )}

        {hoveredLink === 'chanel' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="absolute top-[148px] lg:top-[212px] left-0 right-0 bg-white border-b border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] z-40 overflow-hidden"
            onMouseEnter={() => setHoveredLink('chanel')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <div className="container mx-auto max-w-[1400px] py-16 px-12 grid grid-cols-1 md:grid-cols-5 gap-12">
              <div className="space-y-10">
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-900">HANDBAGS</h4>
                  <div className="h-px w-8 bg-black" />
                </div>
                <ul className="space-y-4">
                  {['Classic Flap Bags', 'Chanel 22 Bags', 'Chanel 25 Bags', 'Totes', 'Boy Bags', 'Wallet on Chains', 'Fashion & Runway Bags', 'All Chanel Bags'].map((item) => (
                    <li key={item}>
                      <Link href={`/${countryCode}/category/chanel`} className="text-sm font-body font-light text-gray-500 hover:text-black transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-10">
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-900">ACCESSORIES</h4>
                  <div className="h-px w-8 bg-black" />
                </div>
                <ul className="space-y-4">
                  {['Wallets', 'Shoes'].map((item) => (
                    <li key={item}>
                      <Link href={`/${countryCode}/category/chanel`} className="text-sm font-body font-light text-gray-500 hover:text-black transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-10">
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-900">JEWELRY</h4>
                  <div className="h-px w-8 bg-black" />
                </div>
                <ul className="space-y-4">
                  {['Vintage', 'Contemporary'].map((item) => (
                    <li key={item}>
                      <Link href={`/${countryCode}/category/chanel`} className="text-sm font-body font-light text-gray-500 hover:text-black transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-10">
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-900">CURATIONS</h4>
                  <div className="h-px w-8 bg-black" />
                </div>
                <ul className="space-y-4">
                  {['Vintage Handbags', 'Pre-Owned Handbags'].map((item) => (
                    <li key={item}>
                      <Link href={`/${countryCode}/category/chanel`} className="text-sm font-body font-light text-gray-500 hover:text-black transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-8 flex flex-col items-start text-left">
                <div className="relative aspect-[4/3] w-full bg-ivory overflow-hidden group">
                  <Image 
                    src="https://picsum.photos/seed/chanel-mega/800/600"
                    alt="Chanel Classic Bags"
                    fill
                    className="object-cover transition-transform duration-[3s] group-hover:scale-105"
                    data-ai-hint="chanel handbag"
                  />
                  <div className="absolute inset-0 bg-black/[0.02]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline text-2xl font-medium text-gray-900 uppercase tracking-tight">CHANEL CLASSIC BAGS</h3>
                  <p className="text-[11px] font-body font-light text-gray-500 tracking-wide italic">Discover the Beauty of Chanel</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {hoveredLink === 'goyard' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="absolute top-[148px] lg:top-[212px] left-0 right-0 bg-white border-b border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] z-40 overflow-hidden"
            onMouseEnter={() => setHoveredLink('goyard')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <div className="container mx-auto max-w-[1200px] py-16 px-12 flex gap-24">
              {/* Col 1: HANDBAGS */}
              <div className="w-64 space-y-10 shrink-0">
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-900">HANDBAGS</h4>
                  <div className="h-px w-8 bg-black" />
                </div>
                <ul className="space-y-6">
                  {['Saint Louis', 'Saigon', 'Anjou', 'Artois', 'Other', 'All Goyard Bags'].map((item) => (
                    <li key={item}>
                      <Link href={`/${countryCode}/category/goyard`} className="text-lg font-body font-light text-gray-500 hover:text-black transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 2: FEATURED VISUAL */}
              <div className="flex-1 space-y-10">
                <div className="relative aspect-[16/9] w-full bg-ivory overflow-hidden group">
                  <Image 
                    src="https://picsum.photos/seed/goyard-mega/1200/800"
                    alt="The Saigon Bag"
                    fill
                    className="object-cover transition-transform duration-[3s] group-hover:scale-105"
                    data-ai-hint="luxury handbag"
                  />
                  <div className="absolute inset-0 bg-black/[0.02]" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-headline text-4xl font-medium text-gray-900 tracking-tight uppercase">THE SAIGON BAG</h3>
                  <p className="text-sm font-body font-light text-gray-500 tracking-wide italic">Iconic Style</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {hoveredLink === 'other' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="absolute top-[148px] lg:top-[212px] left-0 right-0 bg-white border-b border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] z-40 overflow-hidden"
            onMouseEnter={() => setHoveredLink('other')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <div className="container mx-auto max-w-[1200px] py-16 px-12 flex gap-24">
              <div className="w-80 space-y-10 shrink-0">
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-900">BRANDS</h4>
                  <div className="h-px w-8 bg-black" />
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  <ul className="space-y-6">
                    {['The Row', 'Goyard', 'Louis Vuitton'].map((item) => (
                      <li key={item}>
                        <Link href={`/${countryCode}/category/other-brands`} className="text-sm font-body font-light text-gray-500 hover:text-black transition-colors">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-6">
                    {['Christian Dior', 'Fendi', 'Loro Piana'].map((item) => (
                      <li key={item}>
                        <Link href={`/${countryCode}/category/other-brands`} className="text-sm font-body font-light text-gray-500 hover:text-black transition-colors">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex-1 flex flex-col space-y-8">
                <div className="relative aspect-[16/9] w-full bg-ivory overflow-hidden group">
                  <Image 
                    src="https://picsum.photos/seed/other-brands-mega/1200/800"
                    alt="The Row Collection"
                    fill
                    className="object-cover transition-transform duration-[3s] group-hover:scale-105"
                    data-ai-hint="luxury bag"
                  />
                  <div className="absolute inset-0 bg-black/5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline text-4xl font-medium text-gray-900 tracking-tight">New Bags From</h3>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">THE ROW</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {hoveredLink === 'jewelry' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="absolute top-[148px] lg:top-[212px] left-0 right-0 bg-white border-b border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] z-40 overflow-hidden"
            onMouseEnter={() => setHoveredLink('jewelry')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <div className="container mx-auto max-w-[1400px] py-16 px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
              {/* Col 1: JEWELRY */}
              <div className="space-y-10">
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-900">JEWELRY</h4>
                  <div className="h-px w-8 bg-black" />
                </div>
                <ul className="space-y-4">
                  {['Fine Jewelry', 'Vintage', 'Contemporary', 'Costume Jewelry', 'New Arrivals'].map((item) => (
                    <li key={item}>
                      <Link href={`/${countryCode}/category/jewelry`} className="text-sm font-body font-light text-gray-500 hover:text-black transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 2: CATEGORY */}
              <div className="space-y-10">
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-900">CATEGORY</h4>
                  <div className="h-px w-8 bg-black" />
                </div>
                <ul className="space-y-4">
                  {['Earrings', 'Bracelets', 'Necklaces', 'Rings', 'Watches'].map((item) => (
                    <li key={item}>
                      <Link href={`/${countryCode}/category/jewelry`} className="text-sm font-body font-light text-gray-500 hover:text-black transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 3: BRAND */}
              <div className="space-y-10">
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-900">BRAND</h4>
                  <div className="h-px w-8 bg-black" />
                </div>
                <ul className="space-y-4">
                  {['Hermès', 'Tiffany', 'Van Cleef & Arpels'].map((item) => (
                    <li key={item}>
                      <Link href={`/${countryCode}/category/jewelry`} className="text-sm font-body font-light text-gray-500 hover:text-black transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 4: FEATURED VISUAL */}
              <div className="space-y-8 flex flex-col items-start text-left">
                <div className="relative aspect-[4/3] w-full bg-ivory overflow-hidden group">
                  <Image 
                    src="https://picsum.photos/seed/jewelry-mega/800/600"
                    alt="Van Cleef & Arpels New Arrivals"
                    fill
                    className="object-cover transition-transform duration-[3s] group-hover:scale-105"
                    data-ai-hint="luxury jewelry"
                  />
                  <div className="absolute inset-0 bg-black/[0.02]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline text-2xl font-medium text-gray-900 italic tracking-tight uppercase">Van Cleef & Arpels</h3>
                  <p className="text-[11px] font-body font-bold text-gray-400 uppercase tracking-widest">NEW ARRIVALS</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-white/98 backdrop-blur-3xl flex flex-col p-8 lg:p-24 font-body">
            <div className="container mx-auto max-w-[1600px]">
              <div className="flex justify-between items-center mb-16 lg:mb-32">
                <div className="space-y-2">
                   <h2 className="font-headline text-3xl lg:text-6xl font-bold italic text-gray-900 tracking-tighter leading-tight">Archive Discovery</h2>
                   <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400">Institutional Registry Search</p>
                </div>
                <button onClick={() => setIsSearchOpen(false)} className="p-4 hover:scale-110 transition-transform group bg-transparent border-none outline-none cursor-pointer">
                  <X className="w-8 h-8 lg:w-12 lg:h-12 stroke-[1px] text-gray-300 group-hover:text-black transition-colors" />
                </button>
              </div>
              <div className="relative border-b border-gray-100 pb-4 lg:pb-8">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 lg:w-12 lg:h-12 text-gray-200" />
                <input autoFocus type="text" placeholder="Inquire with the archives..." className="w-full bg-transparent h-16 lg:h-24 pl-10 lg:pl-24 text-2xl lg:text-8xl font-headline italic font-light outline-none focus:placeholder:opacity-0 transition-all text-gray-900" />
              </div>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-gray-400">
                 <div className="space-y-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Suggested Entries</span>
                    <ul className="space-y-4 text-lg lg:text-2xl font-light italic">
                       <li className="hover:text-plum cursor-pointer transition-colors">Hermès Birkin 25 Gold</li>
                       <li className="hover:text-plum cursor-pointer transition-colors">Chanel Classic Flap Archive</li>
                       <li className="hover:text-plum cursor-pointer transition-colors">1924 Heritage Series</li>
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
