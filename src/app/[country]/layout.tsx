
'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { useParams } from 'next/navigation';
import { ShowcaseControls } from '@/components/demo/ShowcaseControls';
import { MaisonPopup } from '@/components/layout/MaisonPopup';
import { MadAveLiveWidget } from '@/components/layout/MadAveLiveWidget';
import { JudyTrigger } from '@/components/layout/JudyTrigger';
import { CartSheet } from '@/components/layout/CartSheet';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  ShieldCheck,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Music2
} from 'lucide-react';

export default function CountryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  
  return (
    <>
      <MaisonPopup />
      <MadAveLiveWidget />
      <JudyTrigger />
      <CartSheet />
      <Header />
      {/* Optimized Content Offset for Responsive Tiered Header */}
      <main id="main-content" className="min-h-screen pt-20 lg:pt-[260px] animate-fade-in relative bg-white">
        {children}
      </main>

      <footer className="bg-white text-black pt-20 pb-10 border-t border-gray-100 font-body">
        <div className="container mx-auto px-6 lg:px-12 max-w-[1600px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-20 items-start">
            {/* Column 1: Customer Care */}
            <div className="space-y-8">
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase border-b border-black pb-4 w-full">Customer Care</h4>
              <ul className="space-y-4 text-[13px] font-light text-gray-600">
                <li><Link href={`/${countryCode}/contact`} className="hover:text-black transition-colors">Contact Us</Link></li>
                <li><Link href={`/${countryCode}/account`} className="hover:text-black transition-colors">My Account</Link></li>
                <li><Link href={`/${countryCode}/customer-service`} className="hover:text-black transition-colors">Shipping & Returns</Link></li>
                <li><Link href={`/${countryCode}/customer-service`} className="hover:text-black transition-colors">Authenticity Guarantee</Link></li>
                <li><Link href={`/${countryCode}/how-to-sell`} className="hover:text-black transition-colors">Sell To Us</Link></li>
                <li><Link href={`/${countryCode}/appointments`} className="hover:text-black transition-colors">Showrooms</Link></li>
              </ul>
            </div>

            {/* Column 2: About */}
            <div className="space-y-8">
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase border-b border-black pb-4 w-full">About</h4>
              <ul className="space-y-4 text-[13px] font-light text-gray-600">
                <li><Link href={`/${countryCode}/about`} className="hover:text-black transition-colors">About Us</Link></li>
                <li><Link href={`/${countryCode}/contact`} className="hover:text-black transition-colors">Visit Us</Link></li>
                <li><Link href={`/${countryCode}/about`} className="hover:text-black transition-colors">Message From Our Founder</Link></li>
                <li><Link href={`/${countryCode}/journal`} className="hover:text-black transition-colors">Affiliates</Link></li>
                <li><Link href={`/${countryCode}/journal`} className="hover:text-black transition-colors">Blog</Link></li>
                <li><Link href={`/${countryCode}/journal`} className="hover:text-black transition-colors">Press</Link></li>
              </ul>
            </div>

            {/* Column 3: Shop */}
            <div className="space-y-8">
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase border-b border-black pb-4 w-full">Shop</h4>
              <ul className="space-y-4 text-[13px] font-light text-gray-600">
                <li><Link href={`/${countryCode}/category/hermes`} className="hover:text-black transition-colors">Archive Registry</Link></li>
                <li><Link href={`/${countryCode}/account/live`} className="hover:text-black transition-colors">Live Shops</Link></li>
                <li><Link href={`/${countryCode}/category/new-arrivals`} className="hover:text-black transition-colors">New Arrivals</Link></li>
                <li><Link href={`/${countryCode}/category/hermes`} className="hover:text-black transition-colors">Hermès</Link></li>
                <li><Link href={`/${countryCode}/category/chanel`} className="hover:text-black transition-colors">Chanel</Link></li>
              </ul>
            </div>

            {/* Column 4: Sell & Trust */}
            <div className="space-y-8">
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase border-b border-black pb-4 w-full">Sell With Us</h4>
              <ul className="space-y-4 text-[13px] font-light text-gray-600">
                <li><Link href={`/${countryCode}/how-to-sell`} className="hover:text-black transition-colors">How to Consign</Link></li>
                <li><Link href={`/${countryCode}/sell`} className="hover:text-black transition-colors">Partner Portal</Link></li>
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
            <span className="font-headline text-xl font-bold tracking-tight">AMARISÉ <span className="text-[8px] uppercase opacity-60 ml-2">MAISON AVENUE</span></span>
            <p className="text-[9px] text-gray-400 text-center md:text-right italic">
              © 2025 Amarisé Maison Avenue. Independent ultra-luxury reseller. Not affiliated with any brands listed.
            </p>
          </div>
        </div>
      </footer>

      <ShowcaseControls />
    </>
  );
}
