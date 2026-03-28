"use client";

import React, { useState, useEffect } from "react";
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
  ShieldCheck,
  Globe,
  User,
  LayoutDashboard,
  MapPin,
  Briefcase,
  Languages,
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
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { i18n } from "@/lib/i18n/engine";
import { SupportedLanguage } from "@/lib/i18n/config";
import Image from "next/image";
import placeholderData from "@/app/lib/placeholder-images.json";

interface NavLink {
  name: string;
  href: string;
  id: string;
}

const MEGA_MENU_DATA: Record<string, any> = {
  new: {
    title: "NEW ARRIVALS",
    subtitle: "Hermès New Arrivals",
    imageId: "mega-new-arrivals",
    sections: [
      {
        title: "New Arrivals",
        links: [
          { name: "Hermès", href: "/category/hermes" },
          { name: "Chanel", href: "/category/chanel" },
          { name: "Other Brands", href: "/category/other-brands" },
          { name: "Jewelry", href: "/category/jewelry" },
        ],
      },
    ],
  },
  hermes: {
    title: "Valentine’s Day Edit",
    subtitle: "Hermès Bestsellers",
    imageId: "mega-hermes",
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
  chanel: {
    title: "CHANEL CLASSIC BAGS",
    subtitle: "Discover the Beauty of Chanel",
    imageId: "mega-chanel",
    sections: [
      {
        title: "Handbags",
        links: [
          { name: "Classic Flap Bags", href: "/category/chanel" },
          { name: "Chanel 22 Bags", href: "/category/chanel" },
          { name: "Chanel 25 Bags", href: "/category/chanel" },
          { name: "Totes", href: "/category/chanel" },
          { name: "Boy Bags", href: "/category/chanel" },
          { name: "Wallet on Chains", href: "/category/chanel" },
          { name: "Fashion & Runway Bags", href: "/category/chanel" },
          { name: "All Chanel Bags", href: "/category/chanel" },
        ],
      },
      {
        title: "Accessories",
        links: [
          { name: "Wallets", href: "/category/chanel" },
          { name: "Shoes", href: "/category/chanel" },
          { name: "Jewelry", href: "/category/chanel" },
        ],
      },
      {
        title: "Curations",
        links: [
          { name: "Vintage", href: "/category/chanel" },
          { name: "Contemporary", href: "/category/chanel" },
          { name: "Vintage Handbags", href: "/category/chanel" },
          { name: "Pre-Owned Handbags", href: "/category/chanel" },
        ],
      },
    ],
  },
  goyard: {
    title: "The Saigon Bag",
    subtitle: "Iconic Style",
    imageId: "mega-goyard",
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

export const Header = () => {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const router = useRouter();
  const { cart, wishlist, currentUser, currentLanguage, setLanguage } =
    useAppStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const countryCode = (params?.country as string) || "us";
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES.us;

  const cartCount = mounted ? cart.reduce((acc, i) => acc + i.quantity, 0) : 0;
  const wishlistCount = mounted ? wishlist.length : 0;

  const getSlideText = (idx: number) => {
    if (idx === 0)
      return currentLanguage === "ar"
        ? "جلسات تقييم خاصة متاحة في نيويورك ولندن"
        : "PRIVATE CURATORIAL SESSIONS AVAILABLE IN NYC & LONDON";
    return currentLanguage === "ar"
      ? "سجل أرشيف ربيع ١٩٢٤ متاح الآن"
      : "THE SPRING 1924 ARCHIVE REGISTRY IS NOW ACTIVE";
  };

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
    { id: "chanel", name: "CHANEL", href: `/${countryCode}/category/chanel` },
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

  return (
    <>
      <header className="bg-white" onMouseLeave={() => setHoveredLink(null)}>
        {/* 1. Ticker Hub */}
        <div className="hidden sm:flex bg-cream text-muted-text h-10 items-center justify-center  px-4 sm:px-6 lg:px-8 text-label tracking-label font-bold uppercase border-b border-border-color">
          <div className="flex items-center space-x-10">
            <button
              className="opacity-40 p-2 hover:text-black transition-colors bg-transparent border-none outline-none cursor-pointer"
              onClick={() => setActiveSlide((s) => (s === 0 ? 1 : s - 1))}
              aria-label="Prev"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <div className="overflow-hidden relative flex items-center justify-center min-w-[300px] lg:min-w-[500px]">
              <span className="animate-fade-in text-center" key={activeSlide}>
                {getSlideText(activeSlide)}
              </span>
            </div>
            <button
              className="opacity-40 p-2 hover:text-black transition-colors bg-transparent border-none outline-none cursor-pointer"
              onClick={() => setActiveSlide((s) => (s === 1 ? 0 : s + 1))}
              aria-label="Next"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 2. Institutional Passport (Utility Bar) */}
        <div className="hidden md:flex bg-black text-white h-9 items-center justify-between  px-4 sm:px-6 lg:px-8 text-label tracking-label font-bold uppercase">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              <span className="opacity-90">{i18n.t("footer.charter")}</span>
            </div>
            {isAdmin && (
              <Link
                href="/admin"
                className="text-blue-400 hover:text-white transition-colors border-l border-white/10 pl-6 flex items-center space-x-2"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>ADMIN MATRIX</span>
              </Link>
            )}
          </div>
          <div className="flex items-center space-x-6 border-l border-white/10 pl-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 hover:opacity-80 transition-all bg-transparent border-none outline-none cursor-pointer">
                  <Languages className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-[10px] text-white uppercase tracking-widest">
                    {currentLanguage}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white border-gray-100 w-40 p-2 shadow-luxury rounded-none"
              >
                {[
                  { code: "en", label: "English" },
                  { code: "ar", label: "العربية" },
                  { code: "hi", label: "हिन्दी" },
                  { code: "fr", label: "Français" },
                ].map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as SupportedLanguage)}
                    className={cn(
                      "cursor-pointer rounded-none mb-1",
                      currentLanguage === lang.code
                        ? "bg-black text-white"
                        : "hover:bg-ivory"
                    )}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      {lang.label}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-3 hover:opacity-80 transition-all group bg-transparent border-none outline-none cursor-pointer">
                  <Globe className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
                  <span className="text-[10px] text-white uppercase tracking-[0.2em]">
                    {currentCountry.name}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white border-gray-100 w-64 p-3 shadow-luxury rounded-none"
              >
                {Object.values(COUNTRIES).map((c) => (
                  <DropdownMenuItem
                    key={c.code}
                    onClick={() => handleCountryChange(c.code)}
                    className={cn(
                      "cursor-pointer p-4 rounded-none mb-1",
                      countryCode === c.code
                        ? "bg-black text-white"
                        : "hover:bg-ivory"
                    )}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-4">
                        <span className="text-lg">{c.flag}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          {c.name} Hub
                        </span>
                      </div>
                      {countryCode === c.code && (
                        <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* 3. Brand Core - Sticky Section */}
      <div
        className="sticky top-0 z-50 h-20 lg:h-28 border-b border-border-color bg-white"
        onMouseLeave={() => setHoveredLink(null)}
      >
        <div className=" px-4 sm:px-6 lg:px-8 flex items-center justify-between relative h-full">
          <div className="lg:hidden flex items-center">
            {mounted && (
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    className="h-11 px-4 bg-black text-white text-label tracking-label uppercase font-bold hover:bg-body-text transition-colors"
                    aria-label="Open Maison Menu"
                  >
                    <Menu className="w-4 h-4" />
                  </button>
                </SheetTrigger>
                <SheetContent
                  side={currentLanguage === "ar" ? "right" : "left"}
                  className="w-full sm:max-w-[440px] p-0 bg-white border-none rounded-none font-body flex flex-col h-full shadow-2xl"
                >
                  <SheetHeader className="p-8 border-b border-gray-50 text-left shrink-0">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <SheetTitle className="font-headline text-3xl italic tracking-tight text-gray-900 leading-none">
                          Maison Archive
                        </SheetTitle>
                        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400">
                          {i18n.t("nav.archive")}
                        </p>
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
                      <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-plum mb-6 px-2">
                        Departments
                      </p>
                      {navLinks.map((link) => (
                        <SheetClose asChild key={link.id}>
                          <Link href={link.href} className="block group">
                            <div className="w-full text-left py-4 px-2 text-base font-bold tracking-[0.3em] uppercase text-gray-900 group-hover:text-plum transition-colors flex items-center justify-between">
                              {link.name}
                              <ChevronRight
                                className={cn(
                                  "w-4 h-4 text-gray-200 group-hover:text-plum transition-all",
                                  currentLanguage === "ar" ? "rotate-180" : ""
                                )}
                              />
                            </div>
                          </Link>
                        </SheetClose>
                      ))}
                    </div>

                    <div className="px-8 py-10 bg-ivory/50 border-y border-gray-50 space-y-1">
                      <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-gray-400 mb-6 px-2">
                        Collector Services
                      </p>
                      <SheetClose asChild>
                        <Link
                          href={`/${countryCode}/account`}
                          className="block group"
                        >
                          <div className="w-full text-left py-4 px-2 flex items-center space-x-4">
                            <User className="w-5 h-5 text-gray-400" />
                            <span className="text-sm font-bold uppercase tracking-widest text-gray-700">
                              My Dashboard
                            </span>
                          </div>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link
                          href={`/${countryCode}/how-to-sell`}
                          className="block group"
                        >
                          <div className="w-full text-left py-4 px-2 flex items-center space-x-4">
                            <Briefcase className="w-5 h-5 text-gray-400" />
                            <span className="text-sm font-bold uppercase tracking-widest text-gray-700">
                              Consign Artifacts
                            </span>
                          </div>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link
                          href={`/${countryCode}/appointments`}
                          className="block group"
                        >
                          <div className="w-full text-left py-4 px-2 flex items-center space-x-4">
                            <MapPin className="w-5 h-5 text-gray-400" />
                            <span className="text-sm font-bold uppercase tracking-widest text-gray-700">
                              Book Private Salon
                            </span>
                          </div>
                        </Link>
                      </SheetClose>
                    </div>
                  </div>

                  <div className="p-10 border-t border-gray-50 bg-white shrink-0 text-center space-y-4">
                    <div className="flex flex-col items-center justify-center">
                      <span className="font-headline text-2xl font-bold tracking-[0.05em] text-gray-900">
                        AMARISÉ
                      </span>
                      <span className="text-[8px] font-bold uppercase tracking-[0.6em] text-gray-300 mt-1 italic">
                        Maison Avenue
                      </span>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>

          {mounted && (
            <nav className="flex items-center space-x-10">
              <Link
                href={`/${countryCode}/account/login`}
                className="hover:text-gold transition-colors font-light"
              >
                {i18n.t("common.login")}
              </Link>
            </nav>
          )}

          {/* logo */}

          <div className="">
            <Link href={`/${countryCode}`} className="group text-center block">
              <span className="font-headline text-3xl lg:text-5xl font-medium tracking-[0.05em] text-black uppercase">
                AMARISÉ{" "}
                <span className="hidden lg:inline font-light italic text-3xl opacity-80 lowercase">
                  Maison
                </span>
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-1 lg:space-x-10">
            <button
              className="p-2 text-gray-400 hover:text-black hidden sm:flex items-center bg-transparent border-none outline-none cursor-pointer"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="w-5 h-5 stroke-[1.5px]" />
              <span className="ml-3 text-[10px] font-bold uppercase tracking-[0.3em] hidden lg:block">
                {i18n.t("nav.intelligence")}
              </span>
            </button>

            <Link
              href={`/${countryCode}/wishlist`}
              className="relative p-2 text-gray-400 hover:text-black"
            >
              <Heart
                className={cn(
                  "w-5 h-5 transition-colors",
                  wishlistCount > 0 && "fill-black text-black"
                )}
              />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-black text-white text-[7px] w-4 h-4 rounded-full flex items-center justify-center shadow-lg font-bold border border-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href={`/${countryCode}/cart`}
              className="relative p-2 text-gray-400 hover:text-black"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-plum text-white text-[7px] w-4 h-4 rounded-full flex items-center justify-center shadow-lg font-bold border border-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav with Mega Menu Capability */}
      <nav
        className="h-16 bg-white border-b border-border-color hidden lg:flex items-center justify-center space-x-16"
        onMouseLeave={() => setHoveredLink(null)}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center space-x-16">
          {navLinks.map((link) => (
            <div
              key={link.id}
              className="h-full flex items-center relative"
              onMouseEnter={() => setHoveredLink(link.id)}
            >
              <Link
                href={link.href}
                className={cn(
                  "text-label tracking-label font-bold uppercase text-body-text hover:text-black transition-all relative py-2",
                  hoveredLink === link.id && "text-black"
                )}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-[2px] bg-black transition-all duration-500",
                    hoveredLink === link.id ? "w-full" : "w-0"
                  )}
                />
              </Link>
            </div>
          ))}
        </div>  
      </nav>

      {/* Mega Menu Container */}
      <AnimatePresence>
        {hoveredLink && MEGA_MENU_DATA[hoveredLink] && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-2xl z-[40] font-body overflow-hidden"
            onMouseEnter={() => setHoveredLink(hoveredLink)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-4 gap-12">
              {/* Links Sections */}
              <div className="col-span-3 grid grid-cols-3 gap-8">
                {MEGA_MENU_DATA[hoveredLink].sections.map(
                  (section: any, idx: number) => (
                    <div key={idx} className="space-y-6">
                      <h4 className="text-[11px] font-bold tracking-[0.3em] uppercase text-gray-900 border-b border-gray-50 pb-3">
                        {section.title}
                      </h4>
                      <ul className="space-y-3">
                        {section.links.map((sub: any, sIdx: number) => (
                          <li key={sIdx}>
                            <Link
                              href={`/${countryCode}${sub.href}`}
                              className="text-[13px] font-light text-gray-500 hover:text-plum transition-colors block py-1"
                              onClick={() => setHoveredLink(null)}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </div>

              {/* Featured Visual */}
              <div className="col-span-1 flex flex-col space-y-6 items-center text-center">
                <div className="relative aspect-[16/10] w-full bg-ivory border border-gray-50 overflow-hidden">
                  <Image
                    src={
                      placeholderData.placeholderImages.find(
                        (i) => i.id === MEGA_MENU_DATA[hoveredLink].imageId
                      )?.imageUrl || ""
                    }
                    alt={MEGA_MENU_DATA[hoveredLink].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h5 className="text-[14px] font-headline font-bold uppercase tracking-widest text-gray-900 leading-tight">
                    {MEGA_MENU_DATA[hoveredLink].title}
                  </h5>
                  <p className="text-[11px] text-gray-400 italic font-light">
                    {MEGA_MENU_DATA[hoveredLink].subtitle}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/98 backdrop-blur-3xl flex flex-col p-8 lg:p-24 font-body"
          >
            <div className="container mx-auto max-w-[1600px]">
              <div className="flex justify-between items-center mb-16 lg:mb-32">
                <div className="space-y-2">
                  <h2 className="font-headline text-3xl lg:text-6xl font-bold italic text-gray-900 tracking-tighter leading-tight">
                    Archive Discovery
                  </h2>
                  <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400">
                    {i18n.t("common.search")}
                  </p>
                </div>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-4 hover:scale-110 transition-transform group bg-transparent border-none outline-none cursor-pointer"
                >
                  <X className="w-8 h-8 lg:w-12 lg:h-12 stroke-[1px] text-gray-300 group-hover:text-black transition-colors" />
                </button>
              </div>
              <div className="relative border-b border-gray-100 pb-4 lg:pb-8">
                <Search
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 w-6 h-6 lg:w-12 lg:h-12 text-gray-200",
                    currentLanguage === "ar" ? "right-0" : "left-0"
                  )}
                />
                <input
                  autoFocus
                  type="text"
                  placeholder={i18n.t("common.search")}
                  className={cn(
                    "w-full bg-transparent h-16 lg:h-24 text-2xl lg:text-8xl font-headline italic font-light outline-none focus:placeholder:opacity-0 transition-all text-gray-900",
                    currentLanguage === "ar"
                      ? "pr-10 lg:pr-24"
                      : "pl-10 lg:pl-24"
                  )}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
