'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Search, ShoppingBag, Heart, Menu, X, Globe, Crown, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CATEGORIES, COUNTRIES } from '@/lib/mock-data';
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

/**
 * Header: The Entry to Maison Amarisé.
 * Redesigned for a light, elegant, editorial feel.
 */
export const Header = () => {
  const { country } = useParams();
  const router = useRouter();
  const { cart, wishlist, activeVip } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const countryCode = (country as string) || 'us';
  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

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
        <nav className="hidden lg:flex flex-1 justify-center space-x-12">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="group relative py-8">
              <Link 
                href={`/${countryCode}/category/${cat.id}`}
                className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-600 hover:text-gold transition-all pb-1 border-b border-transparent hover:border-gold"
              >
                {cat.name}
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block w-56 bg-white border border-border shadow-luxury animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="p-2 space-y-1">
                  {cat.subcategories.map(sub => (
                    <Link 
                      key={sub}
                      href={`/${countryCode}/category/${cat.id}?sub=${sub}`}
                      className="block px-4 py-3 text-[10px] uppercase tracking-widest text-gray-500 hover:text-plum hover:bg-ivory transition-colors font-bold"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <Link href={`/${countryCode}/journal`} className="py-8 text-[11px] font-bold uppercase tracking-[0.3em] text-gray-600 hover:text-gold transition-all pb-1 border-b border-transparent hover:border-gold">
            JOURNAL
          </Link>
          <Link href={activeVip ? `/${countryCode}/collection/heritage` : `/${countryCode}/category/apparel`} className={cn(
            "py-8 text-[11px] font-bold uppercase tracking-[0.3em] transition-colors",
            activeVip ? "text-plum hover:text-gold" : "text-gray-600 hover:text-gold"
          )}>
            {activeVip ? "PRIVATE SALON" : "DISCOVER"}
          </Link>
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

          <Button variant="ghost" size="icon" className="text-gray-600 hidden sm:flex hover:text-gold transition-colors">
            <Search className="w-5 h-5" />
          </Button>
          
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
    </header>
  );
};
