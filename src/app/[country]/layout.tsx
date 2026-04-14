"use client";

import React, { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { useParams } from "next/navigation";
import { ShowcaseControls } from "@/components/demo/ShowcaseControls";
import { MaisonPopup } from "@/components/layout/MaisonPopup";
import { MadAveLiveWidget } from "@/components/layout/MadAveLiveWidget";
import { JudyTrigger } from "@/components/layout/JudyTrigger";
import { CartSheet } from "@/components/layout/CartSheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import {
  Phone,
  Mail,
  MessageCircle,
  ShieldCheck,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Music2,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { i18n } from "@/lib/i18n/engine";
import { VipEmailSignup } from "@/components/home/VipEmailSingup";

export default function CountryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { country } = useParams();
  const [isMobile, setIsMobile] = React.useState<boolean>(true);
  const countryCode = (country as string) || "us";
  const { currentLanguage } = useAppStore();


  function checkMobile() {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }

  useEffect(() => {
    checkMobile();
    // Update directionality on load
    document.documentElement.dir = i18n.getDirection();
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  return (
    <div dir={i18n.getDirection()}>
      <MaisonPopup />
      <MadAveLiveWidget />
      {!isMobile && <JudyTrigger />}
      <CartSheet />
      <Header />
      {/* Optimized Content Offset for Responsive Tiered Header */}
      <main
        id="main-content"
        className="min-h-screen animate-fade-in relative bg-white"
      >
        {children}
      </main>
      <VipEmailSignup />

      <footer className="bg-white text-black pt-8 md:pt-20 pb-10 border-t border-gray-100 font-body">
        <div className="container mx-auto px-6 lg:px-12 max-w-[1600px]">
          <div className="md:hidden mb-12">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="customer-care">
                <AccordionTrigger className="uppercase">Customer Care</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-4 text-[13px] font-light text-gray-600">
                    <li>
                      <Link
                        href={`/${countryCode}/contact`}
                        className="hover:text-black transition-colors"
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${countryCode}/faq`}
                        className="hover:text-black transition-colors"
                      >
                        FAQ
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${countryCode}/account`}
                        className="hover:text-black transition-colors"
                      >
                        My Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${countryCode}/customer-service`}
                        className="hover:text-black transition-colors"
                      >
                        Shipping & Returns
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${countryCode}/customer-service`}
                        className="hover:text-black transition-colors"
                      >
                        Authenticity Guarantee
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${countryCode}/how-to-sell`}
                        className="hover:text-black transition-colors"
                      >
                        Sell To Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${countryCode}/appointments`}
                        className="hover:text-black transition-colors"
                      >
                        Showrooms
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="about">
                <AccordionTrigger  className="uppercase">About</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-4 text-[13px] font-light text-gray-600">
                    <li>
                      <Link
                        href={`/${countryCode}/about`}
                        className="hover:text-black transition-colors"
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${countryCode}/contact`}
                        className="hover:text-black transition-colors"
                      >
                        Visit Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${countryCode}/about`}
                        className="hover:text-black transition-colors"
                      >
                        Message From Our Founder
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${countryCode}/journal`}
                        className="hover:text-black transition-colors"
                      >
                        Affiliates
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${countryCode}/journal`}
                        className="hover:text-black transition-colors"
                      >
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${countryCode}/journal`}
                        className="hover:text-black transition-colors"
                      >
                        Press
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shop">
                <AccordionTrigger  className="uppercase">Shop</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-4 text-[13px] font-light text-gray-600">
                    <li>
                      <Link
                        href={`/${countryCode}/category/hermes`}
                        className="hover:text-black transition-colors"
                      >
                        Archive Registry
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${countryCode}/account/live`}
                        className="hover:text-black transition-colors"
                      >
                        Live Shops
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${countryCode}/category/new-arrivals`}
                        className="hover:text-black transition-colors"
                      >
                        New Arrivals
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${countryCode}/category/hermes`}
                        className="hover:text-black transition-colors"
                      >
                        Hermès
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${countryCode}/category/chanel`}
                        className="hover:text-black transition-colors"
                      >
                        Chanel
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="sell-with-us">
                <AccordionTrigger  className="uppercase">Sell With Us</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-4 text-[13px] font-light text-gray-600">
                    <li>
                      <Link
                        href={`/${countryCode}/how-to-sell`}
                        className="hover:text-black transition-colors"
                      >
                        How to Consign
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${countryCode}/sell`}
                        className="hover:text-black transition-colors"
                      >
                        Partner Portal
                      </Link>
                    </li>
                  </ul>
                  <div className="bg-[#f8f8f8] p-4 text-center space-y-3 border border-gray-100 text-[13px] text-gray-600">
                    <ShieldCheck className="w-5 h-5 text-gray-400 mx-auto" />
                    <p className="text-[10px] text-gray-400 font-light italic leading-relaxed">
                      100% Authentic Guaranteed Heritage Sourcing
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-20 items-start">
            {/* Column 1: Customer Care */}
            <div className="space-y-8">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase border-b border-black pb-4 w-full">
                Customer Care
              </p>
              <ul className="space-y-4 text-[13px] font-light text-gray-600">
                <li>
                  <Link
                    href={`/${countryCode}/contact`}
                    className="hover:text-black transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${countryCode}/faq`}
                    className="hover:text-black transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${countryCode}/account`}
                    className="hover:text-black transition-colors"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${countryCode}/customer-service`}
                    className="hover:text-black transition-colors"
                  >
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${countryCode}/customer-service`}
                    className="hover:text-black transition-colors"
                  >
                    Authenticity Guarantee
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${countryCode}/how-to-sell`}
                    className="hover:text-black transition-colors"
                  >
                    Sell To Us
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${countryCode}/appointments`}
                    className="hover:text-black transition-colors"
                  >
                    Showrooms
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: About */}
            <div className="space-y-8">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase border-b border-black pb-4 w-full">
                About
              </p>
              <ul className="space-y-4 text-[13px] font-light text-gray-600">
                <li>
                  <Link
                    href={`/${countryCode}/about`}
                    className="hover:text-black transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${countryCode}/contact`}
                    className="hover:text-black transition-colors"
                  >
                    Visit Us
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${countryCode}/about`}
                    className="hover:text-black transition-colors"
                  >
                    Message From Our Founder
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${countryCode}/journal`}
                    className="hover:text-black transition-colors"
                  >
                    Affiliates
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${countryCode}/journal`}
                    className="hover:text-black transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${countryCode}/journal`}
                    className="hover:text-black transition-colors"
                  >
                    Press
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Shop */}
            <div className="space-y-8">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase border-b border-black pb-4 w-full">
                Shop
              </p>
              <ul className="space-y-4 text-[13px] font-light text-gray-600">
                <li>
                  <Link
                    href={`/${countryCode}/category/hermes`}
                    className="hover:text-black transition-colors"
                  >
                    Archive Registry
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${countryCode}/account/live`}
                    className="hover:text-black transition-colors"
                  >
                    Live Shops
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${countryCode}/category/new-arrivals`}
                    className="hover:text-black transition-colors"
                  >
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${countryCode}/category/hermes`}
                    className="hover:text-black transition-colors"
                  >
                    Hermès
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${countryCode}/category/chanel`}
                    className="hover:text-black transition-colors"
                  >
                    Chanel
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Sell & Trust */}
            <div className="space-y-8">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase border-b border-black pb-4 w-full">
                Sell With Us
              </p>
              <ul className="space-y-4 text-[13px] font-light text-gray-600">
                <li>
                  <Link
                    href={`/${countryCode}/how-to-sell`}
                    className="hover:text-black transition-colors"
                  >
                    How to Consign
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${countryCode}/sell`}
                    className="hover:text-black transition-colors"
                  >
                    Partner Portal
                  </Link>
                </li>
              </ul>

              <div className="bg-[#f8f8f8] p-6 text-center space-y-4 border border-gray-100">
                <ShieldCheck className="w-6 h-6 text-gray-400 mx-auto" />
                <p className="text-[10px] text-gray-400 font-light italic leading-relaxed">
                  100% Authentic Guaranteed Heritage Sourcing
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="font-headline text-xl font-bold tracking-tight">
              AMARISÉ{" "}
              <span className="text-[8px] uppercase opacity-60 ml-2">
                MAISON AVENUE
              </span>
            </span>
            <p className="text-[9px] text-gray-400 text-center md:text-right italic">
              © 2025 Amarisé Maison Avenue. Independent ultra-luxury reseller.
              Not affiliated with any brands listed.
            </p>
          </div>
        </div>
      </footer>

      {!isMobile && <ShowcaseControls />}
    </div>
  );
}
