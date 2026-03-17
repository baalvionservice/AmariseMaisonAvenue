
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Search, ShoppingBag, Heart, User, Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CATEGORIES, COUNTRIES } from '@/lib/mock-data';
import { useAppStore } from '@/lib/store';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export const Header = () => {
  const { country } = useParams();
  const { cart, wishlist } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const countryCode = (country as string) || 'us';
  const currentCountry = COUNTRIES[countryCode];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 luxury-blur border-b border-border/40">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Mobile Menu Trigger */}
        <button 
          className="lg:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Brand */}
        <div className="flex-1 lg:flex-none text-center lg:text-left">
          <Link href={`/${countryCode}`} className="font-headline text-3xl tracking-tighter text-foreground font-bold">
            AMARISÉ <span className="text-primary font-normal text-xl ml-1">LUXE</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-1 justify-center space-x-10">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="group relative">
              <Link 
                href={`/${countryCode}/category/${cat.id}`}
                className="text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors py-8"
              >
                {cat.name}
              </Link>
              <div className="absolute top-full left-0 hidden group-hover:block w-48 bg-card border border-border mt-2 p-2 shadow-2xl animate-in fade-in zoom-in-95">
                {cat.subcategories.map(sub => (
                  <Link 
                    key={sub}
                    href={`/${countryCode}/category/${cat.id}?sub=${sub}`}
                    className="block px-4 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link href={`/${countryCode}/vip`} className="text-sm font-medium uppercase tracking-widest text-primary hover:text-secondary transition-colors py-8">
            VIP SALON
          </Link>
        </nav>

        {/* Action Icons */}
        <div className="flex-1 lg:flex-none flex items-center justify-end space-x-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground">
                <Globe className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {Object.values(COUNTRIES).map((c) => (
                <DropdownMenuItem key={c.code} asChild>
                  <Link href={`/${c.code}`} className="flex items-center space-x-2">
                    <span>{c.name}</span>
                    <span className="text-xs text-muted-foreground uppercase">({c.currency})</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="text-foreground hidden sm:flex">
            <Search className="w-5 h-5" />
          </Button>
          
          <Link href={`/${countryCode}/wishlist`} className="relative text-foreground hover:text-primary transition-colors">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link href={`/${countryCode}/cart`} className="relative text-foreground hover:text-primary transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cart.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            )}
          </Link>

          <Link href="/admin" className="hidden lg:block">
            <Button variant="outline" size="sm" className="border-primary/50 text-xs">ADMIN</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
