'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Search, ShoppingBag, Heart, Menu, X, ChevronLeft, ChevronRight, ShieldCheck, ArrowRight, User } from 'lucide-react';
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
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface MegaColumn {
  title: string;
  links: string[];
}

interface NavLink {
  name: string;
  href: string;
  mega?: boolean;
  services?: boolean;
  megaContent?: {
    columns: MegaColumn[];
    image: string;
    caption: string;
    subCaption?: string;
  };
}

export const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { country } = useParams();
  const router = useRouter();
  const { cart, wishlist, currentUser } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const countryCode = mounted ? ((country as string) || 'us') : 'us';
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES.us;
  
  const cartCount = mounted ? cart.reduce((acc, i) => acc + i.quantity, 0) : 0;
  const wishlistCount = mounted ? wishlist.length : 0;

  const slides = [
    "PRIVATE CURATORIAL SESSIONS AVAILABLE IN NYC & LONDON",
    "THE SPRING 1924 ARCHIVE REGISTRY IS NOW ACTIVE"
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

  const navLinks: NavLink[] = [
    { 
      name: 'NEW ARRIVALS', 
      href: `/${countryCode}/category/new-arrivals`, 
      mega: true,
      megaContent: {
        columns: [
          {
            title: 'ATELIER EDITS',
            links: ['The 1924 Series', 'Mediterranean Dawn', 'Resort Curations', 'Evening Registry']
          }
        ],
        image: 'https://picsum.photos/seed/amarise-arrivals-bags/1200/800',
        caption: 'Maison New Arrivals',
        subCaption: 'THE LATEST ARCHIVE'
      }
    },
    { 
      name: 'HERMÈS', 
      href: `/${countryCode}/category/hermes`,
      mega: true,
      megaContent: {
        columns: [
          {
            title: 'HANDBAGS',
            links: ['Birkin', 'Kelly', 'Constance', 'Evelyne', 'Picotin', 'Lindy', 'Herbag', 'Other Bags', 'All Hermès Bags']
          },
          {
            title: 'ACCESSORIES',
            links: ['Wallets', 'Watches', 'Belts', 'Charms', 'Scarves', 'Shoes', 'Jewelry']
          },
          {
            title: 'CURATIONS',
            links: ['New Arrivals', 'Best Sellers', 'Exotic Handbags', 'Rare & Unique Bags', 'HSS Horseshoe Stamp Bags', 'Pre-Owned & Vintage Handbags', 'Home Goods', 'Atelier Bags', 'Palm Beach Collection', 'Bag Besties & Organizers']
          }
        ],
        image: 'https://madisonavenuecouture.com/cdn/shop/files/Birkin_30_Gold_Togo_Gold_Hardware_1.jpg?v=1691512345&width=1200',
        caption: 'Hermès Bestsellers',
        subCaption: 'SHOP THE ICONIC SERIES'
      }
    },
    { 
      name: 'CHANEL', 
      href: `/${countryCode}/category/chanel`,
      mega: true,
      megaContent: {
        columns: [
          {
            title: 'HANDBAGS',
            links: ['Classic Flap Bags', 'Chanel 22 Bags', 'Chanel 25 Bags', 'Totes', 'Boy Bags', 'Wallet on Chains', 'Fashion & Runway Bags', 'All Chanel Bags']
          },
          {
            title: 'ACCESSORIES',
            links: ['Wallets', 'Shoes']
          },
          {
            title: 'JEWELRY',
            links: ['Vintage', 'Contemporary']
          },
          {
            title: 'CURATIONS',
            links: ['Vintage Handbags', 'Pre-Owned Handbags']
          }
        ],
        image: 'https://madisonavenuecouture.com/cdn/shop/files/Chanel_Classic_Flap_Small_Black_Caviar_Gold_Hardware_1.jpg?v=1691512345&width=1200',
        caption: 'CHANEL CLASSIC BAGS',
        subCaption: 'Discover the Beauty of Chanel'
      }
    },
    { 
      name: 'GOYARD', 
      href: `/${countryCode}/category/goyard`,
      mega: true,
      megaContent: {
        columns: [
          {
            title: 'HANDBAGS',
            links: ['Saint Louis', 'Saigon', 'Anjou', 'Artois', 'Other', 'All Goyard Bags']
          }
        ],
        image: 'https://picsum.photos/seed/amarise-goyard-saigon/1200/800',
        caption: 'The Saigon Bag',
        subCaption: 'Iconic Style'
      }
    },
    { 
      name: 'OTHER BRANDS', 
      href: `/${countryCode}/category/all`,
      mega: true,
      megaContent: {
        columns: [
          {
            title: 'BRANDS',
            links: ['The Row', 'Goyard', 'Louis Vuitton']
          },
          {
            title: '',
            links: ['Christian Dior', 'Fendi', 'Loro Piana']
          }
        ],
        image: 'https://picsum.photos/seed/amarise-the-row/1200/800',
        caption: 'New Bags From',
        subCaption: 'THE ROW'
      }
    },
    { 
      name: 'JEWELRY', 
      href: `/${countryCode}/category/jewelry`,
      mega: true,
      megaContent: {
        columns: [
          {
            title: 'JEWELRY',
            links: ['Fine Jewelry', 'Vintage', 'Contemporary', 'Costume Jewelry', 'New Arrivals']
          },
          {
            title: 'CATEGORY',
            links: ['Earrings', 'Bracelets', 'Necklaces', 'Rings', 'Watches']
          },
          {
            title: 'BRAND',
            links: ['Hermès', 'Tiffany', 'Van Cleef & Arpels']
          }
        ],
        image: 'https://picsum.photos/seed/vca-jewelry/1200/800',
        caption: 'Van Cleef & Arpels',
        subCaption: 'NEW ARRIVALS'
      }
    },
    { name: 'LIVE SHOP', href: '#', services: true },
    { name: 'BLOG', href: `/${countryCode}/journal` },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      {/* Institutional Ticker */}
      <div className="bg-[#fcfcfc] text-gray-500 h-10 flex items-center justify-center px-6 text-[9px] tracking-[0.4em] font-bold uppercase border-b border-gray-100">
        <div className="flex items-center space-x-10">
          <button 
            type="button"
            className="hover:text-black transition-colors opacity-40 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center" 
            onClick={handlePrevSlide}
            aria-label="Previous Announcement"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <div className="overflow-hidden relative flex items-center justify-center min-w-[500px]">
            <span className="animate-fade-in text-center" key={activeSlide} role="status">
              {slides[activeSlide]}
            </span>
          </div>
          <button 
            type="button"
            className="hover:text-black transition-colors opacity-40 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center" 
            onClick={handleNextSlide}
            aria-label="Next Announcement"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Authority Utility Bar */}
      <div className="bg-black text-white h-11 flex items-center justify-between px-12 text-[10px] tracking-[0.3em] font-bold uppercase">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
          <span className="opacity-90">Maison Registry Verified</span>
        </div>
        
        <nav className="flex items-center space-x-8" aria-label="Utility Navigation">
          <Link href={`/${countryCode}/how-to-sell`} className="hover:text-secondary transition-colors py-2">Consignment</Link>
          <Link href={`/${countryCode}/appointments`} className="hover:text-secondary transition-colors py-2">Atelier Viewings</Link>
          <Link href={`/${countryCode}/contact`} className="hover:text-secondary transition-colors py-2">Specialist Inquiry</Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className="flex items-center space-x-3 hover:opacity-80 transition-all group border-l border-white/10 pl-8 min-h-[44px]" 
                type="button"
                aria-label={`Change Region (Current: ${currentCountry.name})`}
              >
                <span className="text-sm leading-none grayscale brightness-200" aria-hidden="true">{currentCountry.flag}</span>
                <span className="font-bold tracking-widest text-[10px] text-white uppercase">{currentCountry.name}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border-gray-100 w-64 p-3 rounded-none shadow-luxury">
              <DropdownMenuLabel className="text-[8px] uppercase tracking-[0.5em] text-muted-foreground mb-3 px-3">Global Regions</DropdownMenuLabel>
              {Object.values(COUNTRIES).map((c) => (
                <DropdownMenuItem 
                  key={c.code} 
                  onClick={() => handleCountryChange(c.code)} 
                  className={cn(
                    "cursor-pointer flex items-center justify-between p-4 rounded-none transition-colors mb-1",
                    countryCode === c.code ? "bg-black text-white" : "hover:bg-ivory text-black"
                  )}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-lg leading-none" aria-hidden="true">{c.flag}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">{c.name}</span>
                  </div>
                  <span className="text-[9px] font-medium opacity-40">{c.currency}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>

      {/* Maison Brand Header */}
      <div className="h-28 border-b border-gray-100 px-12 flex items-center justify-between relative bg-white">
        <div className="flex items-center space-x-6 text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
          <Link href={currentUser?.role === 'client' ? `/${countryCode}/account` : `/${countryCode}/sell`} className="hover:text-black border-r border-gray-100 pr-6 py-2">
            {currentUser?.role === 'client' ? 'Client Portal' : 'Login'}
          </Link>
          <Link href={`/${countryCode}/sell`} className="hover:text-black py-2">Join</Link>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <Link href={`/${countryCode}`} className="group flex flex-col items-center" aria-label="Maison Amarisé Home">
            <span className="font-headline text-5xl font-medium tracking-[0.05em] text-black transition-all duration-700 group-hover:tracking-[0.1em]">
              AMARISÉ <span className="font-light italic text-3xl opacity-80">MAISON</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-10">
          <button 
            className="text-gray-400 hover:text-black transition-colors group relative flex items-center min-w-[44px] min-h-[44px] justify-center" 
            type="button"
            aria-label="Search Maison Intelligence"
          >
            <Search className="w-5 h-5 stroke-[1.5px]" aria-hidden="true" />
            <span className="ml-3 text-[10px] font-bold uppercase tracking-[0.3em] hidden lg:block">Intelligence</span>
          </button>
          
          <Link 
            href={`/${countryCode}/wishlist`} 
            className="relative text-gray-400 hover:text-black transition-colors group min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={`View Wishlist (${wishlistCount} items)`}
          >
            <Heart className={cn("w-5 h-5 stroke-[1.5px]", wishlistCount > 0 && "fill-black text-black")} aria-hidden="true" />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white text-[8px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link 
            href={`/${countryCode}/cart`} 
            className="relative text-gray-400 hover:text-black transition-colors group min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={`View Shopping Bag (${cartCount} items)`}
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5px]" aria-hidden="true" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-secondary text-white text-[8px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Curatorial Navigation */}
      <nav className="h-16 bg-white border-b border-gray-100 px-12 hidden lg:flex items-center justify-center space-x-12" aria-label="Main Navigation">
        {navLinks.map((link) => (
          <div key={link.name} className="group h-full flex items-center">
            {link.services ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button type="button" className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-900 hover:text-secondary transition-all outline-none py-2">
                    {link.name}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="bg-white border-border w-72 p-2 rounded-none shadow-2xl">
                  <DropdownMenuLabel className="text-[8px] uppercase tracking-[0.5em] text-gray-400 p-4">Acquisition Services</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {MAISON_SERVICES.map(s => (
                    <DropdownMenuItem key={s.id} asChild className="p-4 rounded-none cursor-pointer hover:bg-ivory group/item">
                      <Link href={`/${countryCode}/services/${s.id}`} className="flex flex-col space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-black group-hover/item:text-plum">{s.name}</span>
                        <span className="text-[8px] text-gray-400 uppercase tracking-tighter">{s.tagline}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link 
                href={link.href} 
                className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-900 hover:text-secondary transition-all relative py-2"
              >
                {link.name}
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-secondary transition-all group-hover:w-full group-hover:left-0" aria-hidden="true" />
              </Link>
            )}

            {link.mega && link.megaContent && (
              <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-50 pt-16 pb-20 border-t border-gray-50 translate-y-4 group-hover:translate-y-0">
                <div className="container mx-auto px-12 flex justify-center gap-24 max-w-[1600px]">
                  {link.megaContent.columns.map((col, idx) => (
                    <div key={idx} className="w-56 space-y-8">
                      {col.title ? (
                        <h3 className="text-[11px] font-bold tracking-[0.2em] text-black uppercase border-b border-gray-100 pb-4">{col.title}</h3>
                      ) : (
                        <div className="h-[31px]" />
                      )}
                      <nav className="flex flex-col space-y-4" aria-label={col.title ? `${link.name} - ${col.title}` : `More ${link.name}`}>
                        {col.links.map((sub) => (
                          <Link 
                            key={sub} 
                            href={`/${countryCode}/category/${link.name.toLowerCase()}`} 
                            className="text-[13px] font-light text-gray-600 hover:text-black transition-colors"
                          >
                            {sub}
                          </Link>
                        ))}
                      </nav>
                    </div>
                  ))}

                  <div className="w-[450px] space-y-6">
                    <div className="aspect-[16/10] w-full bg-muted border border-gray-100 flex items-center justify-center group/img relative overflow-hidden shadow-sm">
                      <Image 
                        src={link.megaContent.image} 
                        alt={link.megaContent.caption} 
                        fill 
                        className="object-cover transition-transform duration-[3s] group-hover/img:scale-105"
                        sizes="400px"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover/img:bg-transparent transition-colors" />
                    </div>
                    <div className="text-left space-y-2">
                      <h4 className="text-2xl font-headline italic text-gray-900 leading-tight">
                        {link.megaContent.caption}
                      </h4>
                      {link.megaContent.subCaption && (
                        <p className="text-[11px] font-bold tracking-[0.2em] text-black uppercase">
                          {link.megaContent.subCaption}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Mobile Trigger */}
      <div className="lg:hidden h-16 bg-white flex items-center px-12 justify-between border-b border-gray-100">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="text-black min-w-[44px] min-h-[44px] flex items-center justify-center" 
          type="button"
          aria-expanded={isMenuOpen}
          aria-label="Toggle Navigation Menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
        </button>
        <span className="text-[10px] font-bold uppercase tracking-[0.5em] italic">Maison Menu</span>
        <div className="w-10" aria-hidden="true" />
      </div>
    </header>
  );
};
