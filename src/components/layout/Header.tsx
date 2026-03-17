
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Search, ShoppingBag, Heart, Menu, X, Globe, MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COUNTRIES, DEPARTMENTS, CITIES, CATEGORIES } from '@/lib/mock-data';
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

export const Header = () => {
  const { country } = useParams();
  const router = useRouter();
  const { cart, wishlist } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const countryCode = (country as string) || 'us';
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES.us;
  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  const countryCities = CITIES.filter(c => c.countryCode === countryCode);

  const handleCountryChange = (code: string) => {
    router.push(`/${code}`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 luxury-blur border-b border-border h-20 transition-all duration-300">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <button className="lg:hidden text-foreground hover:text-gold transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        <div className="flex-1 lg:flex-none text-center lg:text-left">
          <Link href={`/${countryCode}`} className="font-headline text-3xl tracking-tighter text-gray-900 font-bold group">
            AMARISÉ <span className="text-plum font-normal text-xl ml-1 group-hover:text-gold transition-colors">LUXE</span>
          </Link>
        </div>

        <nav className="hidden lg:flex flex-1 justify-center px-10">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-8 h-20 items-center">
              <div className="group relative">
                <button className="text-[10px] font-bold uppercase tracking-[0.3em] text-plum hover:text-gold transition-all pb-1 border-b-2 border-transparent hover:border-gold flex items-center">
                  <MapPin className="w-3 h-3 mr-2" /> DESTINATIONS
                </button>
                <div className="absolute top-full left-0 hidden group-hover:block w-64 bg-white border border-border shadow-luxury animate-in fade-in slide-in-from-top-2 duration-300 pt-2">
                  <div className="p-2 space-y-1">
                    <DropdownMenuLabel className="text-[9px] uppercase tracking-widest text-muted-foreground px-4 py-2">Maison Cities: {currentCountry.name}</DropdownMenuLabel>
                    {countryCities.map(city => (
                      <Link key={city.id} href={`/${countryCode}/city/${city.id}`} className="block px-4 py-3 text-[10px] uppercase tracking-widest text-gray-900 hover:text-plum hover:bg-ivory transition-colors font-bold">
                        {city.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {DEPARTMENTS.map((dept) => (
                <div key={dept.id} className="group relative">
                  <Link href={`/${countryCode}/${dept.id}`} className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600 hover:text-gold transition-all pb-1 border-b-2 border-transparent hover:border-gold">
                    {dept.name}
                  </Link>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block w-56 bg-white border border-border shadow-luxury animate-in fade-in slide-in-from-top-2 duration-300 pt-2">
                    <div className="p-2 space-y-1">
                      {CATEGORIES.filter(c => c.departmentId === dept.id).map(cat => (
                        <Link key={cat.id} href={`/${countryCode}/${dept.id}/${cat.id}`} className="block px-4 py-3 text-[9px] uppercase tracking-widest text-gray-500 hover:text-plum hover:bg-ivory transition-colors font-bold">
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <Link href={`/${countryCode}/journal`} className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600 hover:text-gold">JOURNAL</Link>
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </nav>

        <div className="flex-1 lg:flex-none flex items-center justify-end space-x-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gold"><Globe className="w-5 h-5" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-border bg-white w-64 p-2 shadow-luxury">
              <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-plum font-bold">Select Market</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {Object.values(COUNTRIES).map((c) => (
                <DropdownMenuItem key={c.code} onClick={() => handleCountryChange(c.code)} className="flex items-center justify-between px-4 py-3 hover:bg-ivory cursor-pointer group">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest group-hover:text-gold">{c.name}</span>
                    <span className="text-[8px] text-gray-500 uppercase">{c.locale}</span>
                  </div>
                  <span className="text-[9px] text-gold font-bold">{c.currency}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href={`/${countryCode}/wishlist`} className="relative text-gray-600 hover:text-gold transition-all">
            <Heart className={cn("w-5 h-5", wishlist.length > 0 && "fill-plum text-plum")} />
            {wishlist.length > 0 && <span className="absolute -top-1.5 -right-1.5 bg-plum text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{wishlist.length}</span>}
          </Link>

          <Link href={`/${countryCode}/cart`} className="relative text-gray-600 hover:text-gold transition-all">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 bg-gold text-gray-900 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
          </Link>

          <Link href="/admin" className="hidden lg:block">
            <Button className="bg-gold text-gray-900 hover:shadow-gold-glow h-10 px-6 text-[10px] font-bold tracking-widest">MAISON HUB</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
