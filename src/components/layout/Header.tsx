"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { COUNTRIES } from "@/lib/mock-data";
import { useAppStore } from "@/lib/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import placeholderData from "@/app/lib/placeholder-images.json";

interface NavLink {
  name: string;
  href: string;
  id: string;
}

const CURRENCIES = [
  { code: "USD", label: "USD", flag: "🇺🇸" },
  { code: "EUR", label: "EUR", flag: "🇪🇺" },
  { code: "GBP", label: "GBP", flag: "🇬🇧" },
  { code: "CHF", label: "CHF", flag: "🇨🇭" },
];

const MEGA_MENU_DATA: Record<string, any> = {
  new: {
    title: "NEW ARRIVALS",
    subtitle: "Hermès New Arrivals",
    imageId: "mega-new-arrivals",
    collectionHref: "/category/new-arrivals",
    sections: [
      {
        title: "New Arrivals",
        links: [
          { name: "Hermès", href: "/category/hermes" },
          { name: "Other Brands", href: "/category/other-brands" },
          { name: "Jewelry", href: "/category/jewelry" },
        ],
      },
    ],
  },
  hermes: {
    title: "Valentine's Day Edit",
    subtitle: "Hermès Bestsellers",
    imageId: "mega-hermes",
    collectionHref: "/category/hermes",
    sections: [
      {
        title: "Handbags",
        links: [
          { name: "Birkin", href: "/category/hermes" },
          { name: "Kelly", href: "/category/hermes" },
          { name: "Constance", href: "/category/hermes" },
          { name: "Evelyne", href: "/category/hermes" },
          { name: "Picotin", href: "/category/hermes" },
          { name: "Lindy", href: "/category/hermes" },
          { name: "Herbag", href: "/category/hermes" },
          { name: "Other Bags", href: "/category/hermes" },
          { name: "All Hermès Bags", href: "/category/hermes" },
        ],
      },
      {
        title: "Accessories",
        links: [
          { name: "Wallets", href: "/category/hermes" },
          { name: "Watches", href: "/category/hermes" },
          { name: "Belts", href: "/category/hermes" },
          { name: "Charms", href: "/category/hermes" },
          { name: "Scarves", href: "/category/hermes" },
          { name: "Shoes", href: "/category/hermes" },
          { name: "Jewelry", href: "/category/hermes" },
        ],
      },
      {
        title: "Curations",
        links: [
          { name: "New Arrivals", href: "/category/new-arrivals" },
          { name: "Best Sellers", href: "/category/hermes" },
          { name: "Exotic Handbags", href: "/category/hermes" },
          { name: "Rare & Unique Bags", href: "/category/hermes" },
          { name: "HSS Horseshoe Stamp Bags", href: "/category/hermes" },
          { name: "Pre-Owned & Vintage Handbags", href: "/category/hermes" },
          { name: "Home Goods", href: "/category/hermes" },
          { name: "Atelier Bags", href: "/category/hermes" },
          { name: "Palm Beach Collection", href: "/category/hermes" },
          { name: "Bag Besties & Organizers", href: "/category/hermes" },
        ],
      },
    ],
  },
  goyard: {
    title: "The Saigon Bag",
    subtitle: "Iconic Style",
    imageId: "mega-goyard",
    collectionHref: "/category/goyard",
    sections: [
      {
        title: "Handbags",
        links: [
          { name: "Saint Louis", href: "/category/goyard" },
          { name: "Saigon", href: "/category/goyard" },
          { name: "Anjou", href: "/category/goyard" },
          { name: "Artois", href: "/category/goyard" },
          { name: "Other", href: "/category/goyard" },
          { name: "All Goyard Bags", href: "/category/goyard" },
        ],
      },
    ],
  },
  other: {
    title: "New Bags From THE ROW",
    subtitle: "Other Brands",
    imageId: "mega-new-arrivals",
    collectionHref: "/category/other-brands",
    sections: [
      {
        title: "Brands",
        links: [
          { name: "The Row", href: "/category/other-brands" },
          { name: "Louis Vuitton", href: "/category/other-brands" },
          { name: "Christian Dior", href: "/category/other-brands" },
          { name: "Fendi", href: "/category/other-brands" },
          { name: "Loro Piana", href: "/category/other-brands" },
        ],
      },
    ],
  },
  jewelry: {
    title: "Van Cleef & Arpels NEW ARRIVALS",
    subtitle: "Jewelry",
    imageId: "mega-jewelry",
    collectionHref: "/category/jewelry",
    sections: [
      {
        title: "Fine Jewelry",
        links: [
          { name: "Vintage", href: "/category/jewelry" },
          { name: "Contemporary", href: "/category/jewelry" },
          { name: "Costume Jewelry", href: "/category/jewelry" },
          { name: "New Arrivals", href: "/category/new-arrivals" },
        ],
      },
      {
        title: "Category",
        links: [
          { name: "Earrings", href: "/category/jewelry" },
          { name: "Bracelets", href: "/category/jewelry" },
          { name: "Necklaces", href: "/category/jewelry" },
          { name: "Rings", href: "/category/jewelry" },
          { name: "Watches", href: "/category/jewelry" },
        ],
      },
      {
        title: "Brand",
        links: [
          { name: "Hermès", href: "/category/jewelry" },
          { name: "Tiffany", href: "/category/jewelry" },
          { name: "Van Cleef & Arpels", href: "/category/jewelry" },
        ],
      },
    ],
  },
};

// Promo ticker slides
const TICKER_SLIDES = [
  "Special Notice - Shipments to the Middle East are Running with Delays",
  "Read Our 100% Authenticity Guarantee",
  "Call to schedule an appointment in our NYC Showroom or Virtually via FaceTime",
];

export const Header = () => {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const router = useRouter();
  const { cart, wishlist, currentUser } = useAppStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeCurrency, setActiveCurrency] = useState("USD");
  const [searchQuery, setSearchQuery] = useState("");
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-rotate ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((s) => (s + 1) % TICKER_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const countryCode = (params?.country as string) || "us";
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES.us;

  const cartCount = mounted ? cart.reduce((acc, i) => acc + i.quantity, 0) : 0;
  const wishlistCount = mounted ? wishlist.length : 0;

  const handleCountryChange = (code: string) => {
    router.push(`/${code}`);
  };

  const isAdmin =
    currentUser?.role === "super_admin" ||
    currentUser?.role === "country_admin";

  const navLinks: NavLink[] = [
    {
      id: "new",
      name: "NEW ARRIVALS",
      href: `/${countryCode}/category/new-arrivals`,
    },
    { id: "hermes", name: "HERMÈS", href: `/${countryCode}/category/hermes` },
    { id: "goyard", name: "GOYARD", href: `/${countryCode}/category/goyard` },
    {
      id: "other",
      name: "OTHER BRANDS",
      href: `/${countryCode}/category/other-brands`,
    },
    {
      id: "jewelry",
      name: "JEWELRY",
      href: `/${countryCode}/category/jewelry`,
    },
    { id: "live", name: "LIVE SHOP", href: `/${countryCode}/account/live` },
    { id: "journal", name: "BLOG", href: `/${countryCode}/journal` },
  ];

  const handleNavEnter = (id: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHoveredLink(id);
  };

  const handleNavLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredLink(null);
    }, 120);
  };

  const handleMegaEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  const popularSearches = ["Birkin", "Hermès", "Kelly"];

  return (
    <>
      {/* ─── LAYER 1: Announcement / Promo Ticker ─── */}
      <div className="bg-cream text-black hidden sm:block">
        <div className="flex items-center justify-center h-7 px-4 gap-4">
          <button
            className="opacity-50 hover:opacity-100 transition-opacity p-1"
            onClick={() =>
              setActiveSlide((s) =>
                s === 0 ? TICKER_SLIDES.length - 1 : s - 1
              )
            }
            aria-label="Previous"
          >
            <ChevronLeft className="w-3 h-3" />
          </button>

          <div className="overflow-hidden relative flex items-center justify-center min-w-[240px] sm:min-w-[460px] lg:min-w-[640px]">
            <AnimatePresence mode="wait">
              <motion.a
                key={activeSlide}
                href="#"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="text-[10px] sm:text-[11px] tracking-[0.18em] font-medium uppercase text-center block hover:underline"
              >
                {TICKER_SLIDES[activeSlide]}
              </motion.a>
            </AnimatePresence>
          </div>

          <button
            className="opacity-50 hover:opacity-100 transition-opacity p-1"
            onClick={() =>
              setActiveSlide((s) => (s + 1) % TICKER_SLIDES.length)
            }
            aria-label="Next"
          >
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* ─── LAYER 2: Top Utility Bar ─── */}
      {/* Desktop only */}
      <div className="hidden lg:block bg-[#1a1a1a]">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-9">
          <Link className="text-white" href={""}>
            100% Authentic Guaranteed
          </Link>
          <div className="flex items-center">
            <a
              href="#"
              className="text-[12px] tracking-[0.14em]  text-white hover:text-white transition-colors font-medium px-5"
            >
              Sell
            </a>
            <a
              href="#"
              className="text-[12px] tracking-[0.14em]  text-white hover:text-white transition-colors font-medium px-5"
            >
              Appointments
            </a>
            <a
              href="#"
              className="text-[12px] tracking-[0.14em]  text-white hover:text-white transition-colors font-medium px-5"
            >
              Contact
            </a>

            {/* Currency switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 text-[11px] tracking-[0.14em] uppercase text-white/70 hover:text-white transition-colors font-medium pl-5 bg-transparent border-none outline-none cursor-pointer">
                  <span className="text-sm leading-none">
                    {CURRENCIES.find((c) => c.code === activeCurrency)?.flag}
                  </span>
                  <span>{activeCurrency}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white border border-gray-100 rounded-none shadow-lg min-w-[110px] p-1"
              >
                {CURRENCIES.map((c) => (
                  <DropdownMenuItem
                    key={c.code}
                    onClick={() => setActiveCurrency(c.code)}
                    className={cn(
                      "cursor-pointer rounded-none text-[11px] font-medium tracking-wider uppercase flex items-center gap-2 py-2",
                      activeCurrency === c.code
                        ? "bg-black text-white"
                        : "hover:bg-gray-50"
                    )}
                  >
                    <span>{c.flag}</span>
                    <span>{c.code}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* ─── LAYER 3: Brand Core (Sticky) ─── */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        {/* Brand Row */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[64px] lg:h-[70px] gap-4">
            {/* LEFT: Mobile hamburger + wishlist / Desktop: empty spacer */}
            <div className=" flex lg:hidden items-center gap-2 min-w-[120px] lg:min-w-[200px]">
              {/* Mobile hamburger */}
              <div className="lg:hidden">
                {mounted && (
                  <Sheet>
                    <SheetTrigger asChild>
                      <button
                        className="p-2 text-black hover:bg-gray-50 transition-colors rounded-sm"
                        aria-label="Open menu"
                      >
                        <Menu className="w-5 h-5" />
                      </button>
                    </SheetTrigger>
                    <SheetContent
                      side="left"
                      className="w-[88%] sm:max-w-[420px] p-0 bg-white border-none rounded-none flex flex-col h-full shadow-2xl"
                    >
                      {/* Close button row */}
                      <div className="flex items-center px-5 py-4">
                        <SheetClose asChild>
                          <button className="p-1 -ml-1 hover:bg-gray-50 rounded-sm transition-colors">
                            <X className="w-6 h-6 text-black" />
                          </button>
                        </SheetClose>
                      </div>

                      <div className="flex-1 overflow-y-auto">
                        {/* Primary nav links */}
                        <nav className="border-t border-gray-100">
                          {navLinks.map((link) => (
                            <SheetClose asChild key={link.id}>
                              <Link
                                href={link.href}
                                className="flex items-center justify-between px-5 py-[14px] border-b border-gray-100 text-[13px] font-semibold tracking-[0.12em] uppercase text-black hover:text-gray-500 transition-colors"
                              >
                                {link.name}
                                <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                              </Link>
                            </SheetClose>
                          ))}
                        </nav>

                        {/* Secondary links */}
                        <nav>
                          {[
                            {
                              label: "SELL TO US",
                              href: `/${countryCode}/how-to-sell`,
                            },
                            {
                              label: "Appointments",
                              href: `/${countryCode}/appointments`,
                            },
                            {
                              label: "Shipping",
                              href: `/${countryCode}/shipping`,
                            },
                            {
                              label: "Return Policy",
                              href: `/${countryCode}/return-policy`,
                            },
                            { label: "FAQ", href: `/${countryCode}/faq` },
                            {
                              label: "Authenticity Guarantee",
                              href: `/${countryCode}/authenticity`,
                            },
                            {
                              label: "Contact",
                              href: `/${countryCode}/contact`,
                            },
                          ].map(({ label, href }) => (
                            <SheetClose asChild key={label}>
                              <Link
                                href={href}
                                className="flex items-center px-5 py-[11px] text-[13px] text-gray-700 hover:text-black transition-colors"
                              >
                                {label}
                              </Link>
                            </SheetClose>
                          ))}
                        </nav>
                      </div>
                    </SheetContent>
                  </Sheet>
                )}
              </div>

              {/* Mobile: wishlist next to hamburger */}
              <Link
                href={`/${countryCode}/wishlist`}
                className="relative p-2 lg:hidden hover:bg-gray-50 rounded-sm transition-colors"
              >
                <Heart
                  className={cn(
                    "w-5 h-5 transition-colors",
                    wishlistCount > 0 ? "fill-black text-black" : "text-black"
                  )}
                />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </div>

            <div className="hidden lg:flex space-x-2 text-gray-600 text-[12px]">
              <Link href={"/"}>Log In</Link>
              <span>|</span>
              <Link href={"/"}>Sign Up</Link>
            </div>

            {/* CENTER: Logo */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link href={`/${countryCode}`} className="block text-center">
                <span className="text-[14px] sm:text-[22px] lg:text-[28px] font-bold tracking-[0.1em] uppercase text-black leading-none font-serif">
                Amarisé Maison
                </span>
              </Link>
            </div>

            {/* RIGHT: search / wishlist / cart */}
            <div className="flex items-center gap-4 min-w-[120px] lg:min-w-[200px] justify-end">
              {/* Search button — icon + text + border-b on desktop */}
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
                className="flex items-center gap-1.5 md:w-24 text-black hover:opacity-70 md:border-b md:border-black transition-opacity"
              >
                <Search className="w-5 h-5 stroke-[1.5] md:mb-1 md:h-3 md:w-3" />
                <span className="hidden lg:block text-[12px] font-normal  pb-px tracking-wide">
                  Search
                </span>
              </button>

              {/* Wishlist (desktop) */}
              <Link
                href={`/${countryCode}/wishlist`}
                className="relative p-2 hidden lg:flex hover:opacity-70 transition-opacity"
                aria-label="Wishlist"
              >
                <Heart
                  className={cn(
                    "w-5 h-5 transition-colors stroke-1",
                    wishlistCount > 0 ? "fill-black text-black" : "text-black"
                  )}
                />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href={`/${countryCode}/cart`}
                className="relative p-2 hover:opacity-70 transition-opacity"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5  stroke-1 text-black" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* ─── LAYER 4: Main Nav (Desktop) ─── */}
        <nav
          className="hidden lg:block  relative"
          onMouseLeave={handleNavLeave}
        >
          <div className="max-w-[1400px] mx-auto px-8">
            <ul className="flex items-center justify-center h-11">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className="h-full flex items-center"
                  onMouseEnter={() => handleNavEnter(link.id)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "relative h-full flex items-center px-4 text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors duration-150",
                      hoveredLink === link.id
                        ? "text-black"
                        : "text-black hover:text-black"
                    )}
                  >
                    {link.name}
                    {/* Underline indicator */}
                    <span
                      className={cn(
                        "absolute bottom-0 left-3 right-3 h-[2px] bg-black transition-all duration-300 origin-center",
                        hoveredLink === link.id
                          ? "scale-x-100 opacity-100"
                          : "scale-x-0 opacity-0"
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── Mega Menu ─── */}
          <AnimatePresence>
            {hoveredLink && MEGA_MENU_DATA[hoveredLink] && (
              <motion.div
                ref={megaMenuRef}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="absolute top-full left-0 right-0 w-full bg-white border-t border-gray-100 shadow-xl z-[60]"
                onMouseEnter={handleMegaEnter}
                onMouseLeave={handleNavLeave}
              >
                <div className="max-w-[1100px] mx-auto px-8 py-10">
                  <div
                    className={cn(
                      "grid gap-10",
                      MEGA_MENU_DATA[hoveredLink].sections.length >= 3
                        ? "grid-cols-4"
                        : "grid-cols-2"
                    )}
                  >
                    {/* Link columns */}
                    {MEGA_MENU_DATA[hoveredLink].sections.map(
                      (section: any, idx: number) => (
                        <div key={idx}>
                          <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-gray-900 mb-4 pb-2 border-b border-gray-100">
                            {section.title}
                          </p>
                          <ul className="space-y-2">
                            {section.links.map((sub: any, sIdx: number) => (
                              <li key={sIdx}>
                                <Link
                                  href={`/${countryCode}${sub.href}`}
                                  onClick={() => setHoveredLink(null)}
                                  className="text-[13px] text-gray-500 hover:text-black transition-colors block py-0.5"
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    )}

                    {/* Featured image column */}
                    <div className="flex flex-col gap-4">
                      <div className="relative aspect-[4/3] w-full bg-gray-50 overflow-hidden">
                        <Image
                          src={
                            placeholderData.placeholderImages.find(
                              (i) =>
                                i.id === MEGA_MENU_DATA[hoveredLink].imageId
                            )?.imageUrl || ""
                          }
                          alt={MEGA_MENU_DATA[hoveredLink].title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <h5 className="text-[13px] font-bold uppercase tracking-[0.15em] text-gray-900 leading-snug">
                          {MEGA_MENU_DATA[hoveredLink].title}
                        </h5>
                        <p className="text-[11px] text-gray-400 mt-0.5 italic">
                          {MEGA_MENU_DATA[hoveredLink].subtitle}
                        </p>
                      </div>
                      <Link
                        href={`/${countryCode}${MEGA_MENU_DATA[hoveredLink].collectionHref}`}
                        onClick={() => setHoveredLink(null)}
                        className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-black border-b border-black pb-0.5 hover:opacity-60 transition-opacity w-fit"
                      >
                        Shop All
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>

      {/* ─── SEARCH OVERLAY ─── */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            {/* Search header */}
            <div className="flex items-center border-b border-gray-100 px-6 lg:px-12 h-16 lg:h-20 gap-4">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 bg-transparent text-base lg:text-xl font-medium text-gray-900 placeholder:text-gray-300 outline-none"
              />
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="p-2 hover:bg-gray-50 rounded-sm transition-colors"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-black" />
              </button>
            </div>

            {/* Search body */}
            <div className="flex-1 overflow-y-auto px-6 lg:px-12 py-8 max-w-[800px] mx-auto w-full">
              {/* Popular searches */}
              <div className="mb-8">
                <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-400 mb-4">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-4 py-2 border border-gray-200 text-[12px] font-medium tracking-wider uppercase text-gray-600 hover:border-black hover:text-black transition-colors rounded-sm"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending placeholder */}
              <div>
                <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-400 mb-4">
                  Trending
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    "Vintage Hermès Kelly",
                    "Birkin 25",
                    "Fauve Barenia",
                    "Rouge Sellier Epsom",
                    "Micro Picotin Lock",
                    "Kelly Cut Biscuit",
                    "Kelly Sellier 20 Black",
                    "Birkin 30 Rouge H",
                  ].map((item) => (
                    <button
                      key={item}
                      onClick={() => setSearchQuery(item)}
                      className="text-left group"
                    >
                      <div className="aspect-square bg-gray-50 mb-2 group-hover:bg-gray-100 transition-colors" />
                      <p className="text-[11px] text-gray-700 group-hover:text-black transition-colors leading-snug">
                        {item}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
