"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { COUNTRIES } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  ChevronLeft,
  ChevronRight,
  Heart,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import placeholderData from "@/app/lib/placeholder-images.json";

/**
 * Maison Homepage: Institutional Discovery Hub.
 * Sanitzed and optimized for high-fidelity performance.
 */
export default function HomePage() {
  const { country } = useParams();
  const countryCode = (country as string) || "us";
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES.us;
  const [activeNewArrivalTab, setActiveNewArrivalTab] = useState("HERMÈS");

  const heroImage =
    placeholderData.placeholderImages.find(
      (img) => img.id === "home-hero-banner-main"
    )?.imageUrl || "";
  const liveImage =
    placeholderData.placeholderImages.find(
      (img) => img.id === "madave-live-section"
    )?.imageUrl || "";
  const authImage =
    placeholderData.placeholderImages.find(
      (img) => img.id === "home-authenticity-banner"
    )?.imageUrl || "";
  const missionImage =
    placeholderData.placeholderImages.find(
      (img) => img.id === "home-mission-banner"
    )?.imageUrl || "";

  const gridSpring = placeholderData.placeholderImages.find(
    (img) => img.id === "home-grid-spring"
  )?.imageUrl;
  const gridArrivals = placeholderData.placeholderImages.find(
    (img) => img.id === "home-grid-arrivals"
  )?.imageUrl;
  const gridVisit = placeholderData.placeholderImages.find(
    (img) => img.id === "home-grid-visit"
  )?.imageUrl;

  const infoAuth = placeholderData.placeholderImages.find(
    (img) => img.id === "home-info-auth"
  )?.imageUrl;
  const infoSell = placeholderData.placeholderImages.find(
    (img) => img.id === "home-info-sell"
  )?.imageUrl;
  const infoShowroom = placeholderData.placeholderImages.find(
    (img) => img.id === "home-info-showrooms"
  )?.imageUrl;

  const newArrivals = [
    {
      id: "prod-11",
      name: "Hermès Kelly Sellier 25 Craie Epsom Electrum Hardware",
      price: 34500,
      imageUrl: "https://picsum.photos/seed/hermes-kelly-craie/1000/1200",
    },
    {
      id: "prod-kelly-yellow",
      name: "Hermès Kelly Sellier 20 Jaune Mango Epsom Palladium Hardware",
      price: 32500,
      imageUrl: "https://picsum.photos/seed/hermes-kelly-yellow/1000/1200",
    },
    {
      id: "prod-birkin-hss",
      name: "Hermès Special Order (HSS) Birkin 30 Etoupe and Rose Sakura",
      price: 34500,
      imageUrl: "https://picsum.photos/seed/hermes-birkin-hss/1000/1200",
    },
    {
      id: "prod-kelly-green",
      name: "Hermès Kelly Sellier 25 Vert Amande Epsom Gold Hardware",
      price: 24500,
      imageUrl: "https://picsum.photos/seed/hermes-kelly-green/1000/1200",
    },
  ];

  return (
    <div className="bg-white min-h-screen pb-40 animate-fade-in font-body">
      {/* 1. Heritage Hero */}
      <section className="relative h-[65vh] lg:h-[85vh] w-full flex items-center justify-center overflow-hidden bg-white">
        <Image
          src={heroImage}
          alt="Heritage Hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/5" />
        <div className="relative z-10 text-center space-y-8 lg:space-y-12 max-w-5xl px-6">
          <div className="space-y-4">
            <span className="text-[10px] lg:text-[12px] font-bold tracking-[0.6em] text-white uppercase drop-shadow-md">
              Est. 1924 | Paris
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-[110px] font-headline font-medium text-white leading-[0.9] tracking-wide drop-shadow-2xl">
              Amarisé Maison
            </h1>
          </div>
          <p className="text-lg md:text-2xl text-white/90 font-light  max-w-3xl mx-auto leading-relaxed font-headline">
            "Curating the world's most significant artifacts."
          </p>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href={`/${countryCode}/category/hermes`}>
              <Button className="bg-white text-black hover:bg-black hover:text-white px-12 lg:px-24 h-16 lg:h-20 rounded-none text-[10px] font-bold uppercase tracking-[0.4em]">
                EXPLORE ARCHIVE
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Tactical Bar */}
      <Link
        href={`/${countryCode}/category/hermes`}
        className="block bg-[#262626] hover:bg-black transition-colors py-5 border-b border-white/5"
      >
        <div className="container mx-auto px-6 text-center">
          <span className="text-[9px] md:text-[11px] font-bold tracking-[0.35em] text-white uppercase">
            SHOP OUR COLLECTION OF NEW HERMÈS BIRKIN BAGS
          </span>
        </div>
      </Link>

      {/* 3. Curatorial Grid */}
      <section className="container mx-auto px-6 lg:px-12 py-12 lg:py-20 max-w-[1600px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          <CuratorialBlock
            imageUrl={gridSpring!}
            title="Spring Edit"
            subtitle="Refresh Your Closet"
            href={`/${countryCode}/category/spring-edit`}
          />
          <CuratorialBlock
            imageUrl={gridArrivals!}
            title="Hermès New Arrivals"
            subtitle="Just Arrived Bags"
            href={`/${countryCode}/category/hermes`}
          />
          <CuratorialBlock
            imageUrl={gridVisit!}
            title="Visit Us"
            subtitle="Shop In Person"
            href={`/${countryCode}/contact`}
          />
        </div>
      </section>

      {/* 4. New Arrivals */}
      <section className="container mx-auto px-6 lg:px-12 py-24 max-w-[1600px] space-y-16">
        <div className="text-center space-y-8">
          <h2 className="text-5xl lg:text-6xl font-headline font-medium text-gray-900 tracking-tight">
            New Arrivals
          </h2>
          <div className="flex items-center justify-center space-x-12 border-b border-gray-100 pb-1">
            {["HERMÈS", "CHANEL", "OTHER BRANDS", "VIEW ALL"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveNewArrivalTab(tab)}
                className={cn(
                  "pb-4 text-[11px] font-bold tracking-[0.2em] transition-all relative uppercase outline-none",
                  activeNewArrivalTab === tab
                    ? "text-black"
                    : "text-gray-400 hover:text-black"
                )}
              >
                {tab}
                {activeNewArrivalTab === tab && (
                  <motion.div
                    layoutId="arrival-underline"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-black"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {newArrivals.map((prod) => (
            <div
              key={prod.id}
              className="flex flex-col items-center text-center space-y-8 group cursor-pointer"
            >
              <div className="relative aspect-[4/5] w-full bg-white flex items-center justify-center p-8 overflow-hidden border border-gray-50 shadow-sm">
                <Image
                  src={prod.imageUrl}
                  alt={prod.name}
                  fill
                  className="object-contain transition-transform duration-[2s] group-hover:scale-105"
                />
                <button className="absolute top-4 right-4 text-gray-300 hover:text-black transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3 px-4">
                <h3 className="text-[12px] font-light text-gray-600 uppercase tracking-widest leading-relaxed line-clamp-2">
                  {prod.name}
                </h3>
                <p className="text-[14px] font-bold text-gray-900">
                  ${prod.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Authenticity Dual-Panel */}
      <section className="flex flex-col lg:flex-row min-h-[500px] overflow-hidden bg-black relative">
        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-auto">
          <Image src={authImage} alt="Auth" fill className="object-cover" />
        </div>
        <div className="w-full lg:w-1/2 bg-black text-white p-12 lg:p-24 flex flex-col items-center lg:items-start justify-center text-center lg:text-left space-y-8">
          <h2 className="text-4xl lg:text-6xl font-headline font-medium tracking-tight">
            100% Authenticity Guarantee
          </h2>
          <p className="text-sm font-light text-gray-300 max-w-md">
            Every piece is authenticated by our in-house team of luxury experts.
          </p>
          <Button className="bg-white text-black hover:bg-gray-200 h-14 px-12 rounded-none text-[10px] font-bold uppercase tracking-[0.3em]">
            LEARN MORE
          </Button>
        </div>
      </section>

      {/* 6. Info Matrix (First) */}
      <section className="container mx-auto px-6 lg:px-12 py-32 max-w-[1600px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          <InfoBlock
            imageUrl={infoAuth!}
            title="Authenticity"
            description="Trusted seller of new and pre-owned Hermès bags."
            href={`/${countryCode}/customer-service`}
          />
          <InfoBlock
            imageUrl={infoSell!}
            title="Sell To Us"
            description="Sell or consign your bag. Receive a fast quote."
            href={`/${countryCode}/how-to-sell`}
          />
          <InfoBlock
            imageUrl={infoShowroom!}
            title="Visit Us"
            description="New York City and Palm Beach showrooms."
            href={`/${countryCode}/appointments`}
          />
        </div>
      </section>

      {/* 7. Live Section */}
      <section className="flex flex-col lg:flex-row min-h-[600px] overflow-hidden bg-black border-b border-white/5">
        <div className="lg:w-1/2 bg-black text-white p-12 lg:p-24 flex flex-col items-center justify-center text-center space-y-10">
          <h2 className="text-4xl lg:text-6xl font-headline font-medium italic uppercase leading-tight">
            Amarisé Maison <br /> Avenue Live
          </h2>
          <p className="text-xs lg:text-sm text-gray-400 italic">
            Experience the absolute standard of discovery with our live shopping
            events.
          </p>
          <Link href={`/${countryCode}/account/live`}>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white border-b border-white/20 pb-2">
              ENTER LIVE ATELIER
            </span>
          </Link>
        </div>
        <div className="lg:w-1/2 relative min-h-[400px]">
          <Image
            src={liveImage}
            alt="Live"
            fill
            className="object-cover grayscale-[20%]"
          />
        </div>
      </section>

      {/* 8. Ticker */}
      <section className="bg-black py-5 border-y border-white/10">
        <div className="container mx-auto flex items-center justify-center space-x-16">
          <div className="flex items-center space-x-4 text-gold">
            <Zap className="w-4 h-4 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase">
              REGISTRY SYNC: ACTIVE
            </span>
          </div>
          <p className="text-white/40 text-[10px] font-bold tracking-[0.4em] uppercase hidden md:block">
            Heritage Series Syncing in {currentCountry.name} Hub
          </p>
          <div className="hidden lg:flex items-center space-x-4 text-white/20">
            <Globe className="w-4 h-4" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">
              GLOBAL NODES: 05 / 05
            </span>
          </div>
        </div>
      </section>

      {/* 9. Info Matrix (Second - As Requested) */}
      <section className="container mx-auto px-6 lg:px-12 py-32 max-w-[1600px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          <InfoBlock
            imageUrl={infoAuth!}
            title="Authenticity"
            description="Trusted seller of new and pre-owned Hermès bags."
            href={`/${countryCode}/customer-service`}
          />
          <InfoBlock
            imageUrl={infoSell!}
            title="Sell To Us"
            description="Sell or consign your bag. Receive a fast quote."
            href={`/${countryCode}/how-to-sell`}
          />
          <InfoBlock
            imageUrl={infoShowroom!}
            title="Visit Us"
            description="New York City and Palm Beach showrooms."
            href={`/${countryCode}/appointments`}
          />
        </div>
      </section>

      {/* 10. Our Mission */}
      <section className="flex flex-col lg:flex-row min-h-[600px] overflow-hidden bg-black">
        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-auto">
          <Image
            src={missionImage}
            alt="Mission"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 bg-black text-white p-12 lg:p-24 flex flex-col justify-center space-y-10">
          <h2 className="text-4xl lg:text-5xl font-headline font-medium italic">
            Our Mission
          </h2>
          <p className="text-sm lg:text-base font-light text-gray-300 leading-relaxed">
            At Amarisé Maison Avenue, we specialize in the rare, the iconic, and
            the extraordinary.
          </p>
          <Link href={`/${countryCode}/about`}>
            <Button className="bg-white text-black hover:bg-gray-200 h-14 px-12 rounded-none text-[10px] font-bold uppercase tracking-[0.3em]">
              LEARN MORE
            </Button>
          </Link>
        </div>
      </section>

      {/* 11. Press Marquee */}
      <section className="bg-white py-24 overflow-hidden">
        <h2 className="text-4xl md:text-5xl font-headline font-medium text-gray-900 text-center italic mb-16">
          As Seen In
        </h2>
        <div className="animate-marquee flex items-center whitespace-nowrap space-x-20 lg:space-x-40 py-12 border-y border-gray-100">
          {["Bloomberg", "COVETEUR", "WSJ", "BUSINESS INSIDER", "VOGUE"].map(
            (p) => (
              <span
                key={p}
                className="text-gray-900 opacity-80 text-2xl font-bold uppercase tracking-widest"
              >
                {p}
              </span>
            )
          )}
          {["Bloomberg", "COVETEUR", "WSJ", "BUSINESS INSIDER", "VOGUE"].map(
            (p) => (
              <span
                key={p + "2"}
                className="text-gray-900 opacity-80 text-2xl font-bold uppercase tracking-widest"
              >
                {p}
              </span>
            )
          )}
        </div>
      </section>

      {/* 12. VIP Email */}
      <section className="bg-[#f8f8f8] py-24 border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-4xl text-center space-y-8">
          <h3 className="text-3xl lg:text-4xl font-headline font-medium italic text-gray-900">
            Join the VIP Email List
          </h3>
          <form className="max-w-2xl mx-auto flex border border-gray-200 bg-white">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 h-16 px-8 text-sm italic outline-none"
              required
            />
            <button className="h-16 px-12 bg-white text-gray-900 font-bold text-[11px] uppercase border-l border-gray-100">
              SUBMIT
            </button>
          </form>
        </div>
      </section>

      {/* 13. Institutional Trust Footer */}
      <section className="bg-white py-80 text-center">
        <div className="max-w-5xl mx-auto space-y-24 px-12">
          <div className="inline-flex items-center justify-center p-10 bg-[#f9f7f9] rounded-full border border-plum/10 shadow-lg">
            <ShieldCheck className="w-14 h-14 text-plum" />
          </div>
          <h3 className="text-7xl md:text-8xl font-headline font-medium italic text-gray-900 tracking-tighter">
            Institutional Responsibility
          </h3>
          <p className="text-gray-500 font-light italic text-3xl font-headline">
            "Every enrollment in our network is audited against the Global
            Heritage Charter."
          </p>
        </div>
      </section>
    </div>
  );
}

function CuratorialBlock({ imageUrl, title, subtitle, href }: any) {
  return (
    <Link
      href={href}
      className="group relative aspect-[4/5] overflow-hidden bg-muted shadow-sm"
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover transition-transform duration-[5s] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-x-0 bottom-0 p-8 lg:p-12 text-center text-white space-y-2">
        <h3 className="text-2xl lg:text-4xl font-headline font-medium  tracking-wide">
          {title}
        </h3>
        <p className="text-[17px] font-light tracking-wide">
          {subtitle}
        </p>
      </div>
    </Link>
  );
}

function InfoBlock({ imageUrl, title, description, href }: any) {
  return (
    <div className="flex flex-col items-center text-center space-y-8 group">
      <div className="relative aspect-square w-full overflow-hidden bg-muted border border-gray-100 shadow-sm">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-[2s] group-hover:scale-105"
        />
      </div>
      <div className="space-y-4 max-w-sm">
        <h3 className="text-3xl font-headline font-bold italic text-gray-900">
          {title}
        </h3>
        <p className="text-sm font-light text-gray-500 italic">{description}</p>
      </div>
      <Link href={href}>
        <Button className="bg-black text-white hover:bg-plum h-12 px-12 rounded-none text-[10px] font-bold uppercase tracking-[0.3em]">
          READ MORE
        </Button>
      </Link>
    </div>
  );
}
