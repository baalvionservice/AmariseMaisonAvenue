
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Search, ShoppingBag, Heart, Menu, X, Globe, Crown, ChevronDown, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CATEGORIES, COUNTRIES, CITIES } from '@/lib/mock-data';
import { useAppStore } from '@/lib/store';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

/**
 * Header: The Entry to Maison Amarisé.
 * Redesigned for a light, elegant, editorial feel.
 * Updated to support 10 luxury departments and City Destinations.
 */
export const Header = () => {
  const { country } = useParams();
  const router = useRouter();
  const { cart, wishlist, activeVip } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const countryCode = (country as string) || 'us';
  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  const countryCities = CITIES.filter(c => c.countryCode === countryCode);

  const handleCountryChange = (code: string) => {
    router.push(`/${code}`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 luxury-blur border-b border-border h-20 transition-all duration-300">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Mobile Menu Trigger */}
        <button 
          className="lg:hidden text-foreground hover:text-gold transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Brand */}
        <div className="flex-1 lg:flex-none text-center lg:text-left">
          <Link href={`/${countryCode}`} className="font-headline text-3xl tracking-tighter text-gray-900 font-bold group">
            AMARISÉ <span className="text-plum font-normal text-xl ml-1 group-hover:text-gold transition-colors">LUXE</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-1 justify-center px-10">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-8 h-20 items-center">
              {/* Destinations Dropdown */}
              <div className="group relative">
                <button className="text-[10px] font-bold uppercase tracking-[0.3em] text-plum hover:text-gold transition-all pb-1 border-b-2 border-transparent hover:border-gold flex items-center">
                  <MapPin className="w-3 h-3 mr-2" /> DESTINATIONS
                </button>
                <div className="absolute top-full left-0 hidden group-hover:block w-64 bg-white border border-border shadow-luxury animate-in fade-in slide-in-from-top-2 duration-300 pt-2">
                  <div className="p-2 space-y-1">
                    <DropdownMenuLabel className="text-[9px] uppercase tracking-widest text-muted-foreground px-4 py-2">Maison Cities: {COUNTRIES[countryCode].name}</DropdownMenuLabel>
                    {countryCities.map(city => (
                      <Link 
                        key={city.id}
                        href={`/${countryCode}/city/${city.id}`}
                        className="block px-4 py-3 text-[10px] uppercase tracking-widest text-gray-900 hover:text-plum hover:bg-ivory transition-colors font-bold"
                      >
                        {city.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {CATEGORIES.map((cat) => (
                <div key={cat.id} className="group relative">
                  <Link 
                    href={`/${countryCode}/category/${cat.id}`}
                    className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600 hover:text-gold transition-all pb-1 border-b-2 border-transparent hover:border-gold flex items-center"
                  >
                    {cat.name}
                  </Link>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block w-56 bg-white border border-border shadow-luxury animate-in fade-in slide-in-from-top-2 duration-300 pt-2">
                    <div className="p-2 space-y-1">
                      {cat.subcategories.slice(0, 10).map(sub => (
                        <Link 
                          key={sub}
                          href={`/${countryCode}/category/${cat.id}?sub=${sub}`}
                          className="block px-4 py-3 text-[9px] uppercase tracking-widest text-gray-500 hover:text-plum hover:bg-ivory transition-colors font-bold whitespace-normal"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <Link href={`/${countryCode}/journal`} className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600 hover:text-gold transition-all pb-1 border-b-2 border-transparent hover:border-gold">
                JOURNAL
              </Link>
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </nav>

        {/* Action Icons */}
        <div className="flex-1 lg:flex-none flex items-center justify-end space-x-6">
          {activeVip && (
            <div className="hidden xl:flex items-center space-x-3 px-4 py-2 bg-lavender/10 border border-gold/20 animate-fade-in group cursor-pointer hover:bg-lavender/20 transition-all rounded-sm">
               <Crown className="w-3 h-3 text-gold animate-pulse" />
               <div className="flex flex-col">
                  <span className="text-[8px] font-bold tracking-[0.2em] text-gold uppercase leading-tight">{activeVip.tier} CLIENT</span>
                  <span className="text-[9px] font-bold text-gray-900 uppercase leading-tight">{activeVip.name}</span>
               </div>
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gold transition-colors">
                <Globe className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-border bg-white w-64 p-2 shadow-luxury">
              <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-plum font-bold px-4 py-2">Select Market</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {Object.values(COUNTRIES).map((c) => (
                <DropdownMenuItem key={c.code} onClick={() => handleCountryChange(c.code)} className="flex items-center justify-between px-4 py-3 hover:bg-ivory transition-colors cursor-pointer group">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest group-hover:text-gold transition-colors">{c.name}</span>
                    <span className="text-[8px] text-gray-500 uppercase">{c.locale}</span>
                  </div>
                  <span className="text-[9px] text-gold font-bold">{c.currency}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href={`/${countryCode}/wishlist`} className="relative text-gray-600 hover:text-gold transition-all group">
            <Heart className={cn("w-5 h-5 transition-all", wishlist.length > 0 && "fill-plum text-plum scale-110")} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-plum text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link href={`/${countryCode}/cart`} className="relative text-gray-600 hover:text-gold transition-all group">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-gold text-gray-900 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </Link>

          <Link href="/admin" className="hidden lg:block">
            <Button className="bg-gold text-gray-900 hover:shadow-gold-glow hover:scale-105 transition-all text-[10px] font-bold tracking-widest h-10 px-6">
              {activeVip ? "CONCIERGE" : "MAISON HUB"}
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Drawer (Simplified) */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-20 bg-white z-[60] overflow-y-auto animate-in slide-in-from-left duration-500">
           <div className="p-10 space-y-8">
              <div className="space-y-4">
                 <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-plum">Destinations</h3>
                 <div className="flex flex-wrap gap-4">
                    {countryCities.map(city => (
                      <Link key={city.id} href={`/${countryCode}/city/${city.id}`} onClick={() => setIsMenuOpen(false)} className="text-[10px] uppercase tracking-widest text-gray-900 font-bold">
                        {city.name}
                      </Link>
                    ))}
                 </div>
              </div>
              {CATEGORIES.map(cat => (
                <div key={cat.id} className="space-y-4">
                  <Link 
                    href={`/${countryCode}/category/${cat.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-headline font-bold text-gray-900 border-b border-border block pb-2"
                  >
                    {cat.name}
                  </Link>
                  <div className="flex flex-wrap gap-4">
                    {cat.subcategories.slice(0, 8).map(sub => (
                      <Link 
                        key={sub}
                        href={`/${countryCode}/category/${cat.id}?sub=${sub}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-[10px] uppercase tracking-widest text-muted-foreground"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link 
                href={`/${countryCode}/journal`}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-headline font-bold text-gray-900 border-b border-border block pb-2"
              >
                Journal
              </Link>
           </div>
        </div>
      )}
    </header>
  );
};
