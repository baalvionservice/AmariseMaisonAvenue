
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Search, ShoppingBag, Heart, Menu, X, Globe, Crown, Languages, User, BookOpen } from 'lucide-react';
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
 * Features localized country selector, VIP status indicators, and boutique navigation.
 */
export const Header = () => {
  const { country } = useParams();
  const router = useRouter();
  const { cart, wishlist, activeVip, isShowcaseMode } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const countryCode = (country as string) || 'us';
  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  const handleCountryChange = (code: string) => {
    router.push(`/${code}`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 luxury-blur border-b border-border/40 h-20">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Mobile Menu Trigger */}
        <button 
          className="lg:hidden text-foreground hover:text-primary transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Brand */}
        <div className="flex-1 lg:flex-none text-center lg:text-left">
          <Link href={`/${countryCode}`} className="font-headline text-3xl tracking-tighter text-foreground font-bold group">
            AMARISÉ <span className="text-primary font-normal text-xl ml-1 group-hover:text-secondary transition-colors">LUXE</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-1 justify-center space-x-12">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="group relative py-8">
              <Link 
                href={`/${countryCode}/category/${cat.id}`}
                className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-all pb-1 border-b border-transparent hover:border-primary"
              >
                {cat.name}
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block w-56 bg-card border border-border shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="p-2 space-y-1">
                  {cat.subcategories.map(sub => (
                    <Link 
                      key={sub}
                      href={`/${countryCode}/category/${cat.id}?sub=${sub}`}
                      className="block px-4 py-3 text-[9px] uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-bold"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <Link href={`/${countryCode}/journal`} className="py-8 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-all pb-1 border-b border-transparent hover:border-primary">
            JOURNAL
          </Link>
          <Link href={activeVip ? `/${countryCode}/collection/heritage` : `/${countryCode}/category/apparel`} className={cn(
            "py-8 text-[10px] font-bold uppercase tracking-[0.3em] transition-colors",
            activeVip ? "text-primary hover:text-secondary" : "text-muted-foreground hover:text-primary"
          )}>
            {activeVip ? "PRIVATE SALON" : "DISCOVER"}
          </Link>
        </nav>

        {/* Action Icons */}
        <div className="flex-1 lg:flex-none flex items-center justify-end space-x-6">
          {/* Active VIP Indicator */}
          {activeVip && (
            <div className="hidden xl:flex items-center space-x-3 px-4 py-2 bg-primary/10 border border-primary/20 animate-fade-in group cursor-pointer hover:bg-primary/20 transition-all">
               <Crown className="w-3 h-3 text-primary animate-pulse" />
               <div className="flex flex-col">
                  <span className="text-[8px] font-bold tracking-[0.2em] text-primary uppercase leading-tight">{activeVip.tier} CLIENT</span>
                  <span className="text-[9px] font-bold text-white uppercase leading-tight">{activeVip.name}</span>
               </div>
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground hover:text-primary transition-colors">
                <Globe className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-border bg-card w-64 p-2 shadow-2xl">
              <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-primary font-bold px-4 py-2">Select Market</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {Object.values(COUNTRIES).map((c) => (
                <DropdownMenuItem key={c.code} onClick={() => handleCountryChange(c.code)} className="flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors cursor-pointer group">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest group-hover:text-primary transition-colors">{c.name}</span>
                    <span className="text-[8px] text-muted-foreground uppercase">{c.locale}</span>
                  </div>
                  <span className="text-[9px] text-primary font-bold">{c.currency}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <div className="p-4 flex items-center space-x-2 text-muted-foreground">
                 <Languages className="w-3 h-3" />
                 <span className="text-[8px] uppercase tracking-widest">Mock Multi-Language Engine Active</span>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="text-foreground hidden sm:flex hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </Button>
          
          <Link href={`/${countryCode}/wishlist`} className="relative text-foreground hover:text-primary transition-all group">
            <Heart className={cn("w-5 h-5 transition-all", wishlist.length > 0 && "fill-primary text-primary scale-110")} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg animate-fade-in">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link href={`/${countryCode}/cart`} className="relative text-foreground hover:text-primary transition-all group">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-secondary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg animate-fade-in">
                {cartCount}
              </span>
            )}
          </Link>

          <Link href="/admin" className="hidden lg:block">
            <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary hover:text-white transition-all text-[10px] font-bold tracking-widest h-10 px-6 group">
              {activeVip ? "CONCIERGE" : "MAISON HUB"}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
