
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Search, ShoppingBag, Heart, Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CATEGORIES, COUNTRIES } from '@/lib/mock-data';
import { useAppStore } from '@/lib/store';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

/**
 * Header: The Entry to Maison Amarisé.
 * Features a localized country selector and multi-tiered navigation.
 */
export const Header = () => {
  const { country } = useParams();
  const { cart, wishlist } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const countryCode = (country as string) || 'us';
  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

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
          <Link href={`/${countryCode}/collection/heritage`} className="py-8 text-[10px] font-bold uppercase tracking-[0.3em] text-primary hover:text-secondary transition-colors">
            VIP SALON
          </Link>
        </nav>

        {/* Action Icons */}
        <div className="flex-1 lg:flex-none flex items-center justify-end space-x-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground hover:text-primary transition-colors">
                <Globe className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-border bg-card">
              {Object.values(COUNTRIES).map((c) => (
                <DropdownMenuItem key={c.code} asChild>
                  <Link href={`/${c.code}`} className="flex items-center justify-between w-full px-4 py-2 hover:bg-muted transition-colors">
                    <span className="text-[10px] font-bold uppercase tracking-widest">{c.name}</span>
                    <span className="text-[9px] text-muted-foreground uppercase ml-4">({c.currency})</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="text-foreground hidden sm:flex hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </Button>
          
          <Link href={`/${countryCode}/wishlist`} className="relative text-foreground hover:text-primary transition-all">
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-primary text-primary' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg animate-fade-in">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link href={`/${countryCode}/cart`} className="relative text-foreground hover:text-primary transition-all">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-secondary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg animate-fade-in">
                {cartCount}
              </span>
            )}
          </Link>

          <Link href="/admin" className="hidden lg:block">
            <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary hover:text-white transition-all text-[10px] font-bold tracking-widest h-10 px-6">
              ADMIN
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-20 bg-background z-40 animate-fade-in lg:hidden">
          <nav className="p-10 space-y-8">
            {CATEGORIES.map(cat => (
              <Link 
                key={cat.id} 
                href={`/${countryCode}/category/${cat.id}`} 
                className="block text-4xl font-headline font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <Link 
              href={`/${countryCode}/collection/heritage`} 
              className="block text-4xl font-headline font-bold text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              VIP SALON
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
