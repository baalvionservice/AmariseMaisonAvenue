'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { useParams } from 'next/navigation';
import { ShowcaseControls } from '@/components/demo/ShowcaseControls';
import { MaisonPopup } from '@/components/layout/MaisonPopup';
import { MadAveLiveWidget } from '@/components/layout/MadAveLiveWidget';
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
      <Header />
      <main id="main-content" className="min-h-screen pt-[148px] animate-fade-in relative bg-white">
        {children}
      </main>

      {/* Institutional White Label Footer - Replicated from Reference Image */}
      <footer className="bg-white text-black pt-20 pb-10 border-t border-gray-100 font-body">
        <div className="container mx-auto px-12 max-w-[1600px]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 items-start">
            {/* Column 1: Customer Care */}
            <div className="space-y-8">
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase border-b border-black pb-4 w-full">Customer Care</h4>
              <ul className="space-y-4 text-[13px] font-light text-gray-600">
                <li><Link href={`/${countryCode}/contact`} className="hover:text-black transition-colors">Contact Us</Link></li>
                <li><Link href={`/${countryCode}/account`} className="hover:text-black transition-colors">My Account</Link></li>
                <li><Link href={`/${countryCode}/customer-service`} className="hover:text-black transition-colors">Shipping</Link></li>
                <li><Link href={`/${countryCode}/customer-service`} className="hover:text-black transition-colors">Returns</Link></li>
                <li><Link href={`/${countryCode}/customer-service`} className="hover:text-black transition-colors">FAQ</Link></li>
              </ul>
              <div className="space-y-4 pt-4 border-t border-gray-50">
                <div className="flex items-center space-x-3 text-[11px] font-bold tracking-widest uppercase">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Phone: <span className="font-normal text-gray-500 ml-2">+91 8951284770</span></span>
                </div>
                <div className="flex items-center space-x-3 text-[11px] font-bold tracking-widest uppercase">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email: <span className="font-normal text-gray-500 ml-2">info@amarisemaisonavenue.com</span></span>
                </div>
                <div className="flex items-center space-x-3 text-[11px] font-bold tracking-widest uppercase">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Whatsapp: <span className="font-normal text-gray-500 ml-2">+91 8951284770</span></span>
                </div>
              </div>
            </div>

            {/* Column 2: About */}
            <div className="space-y-8">
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase border-b border-black pb-4 w-full">About</h4>
              <ul className="space-y-4 text-[13px] font-light text-gray-600">
                <li><Link href={`/${countryCode}/about`} className="hover:text-black transition-colors">About Us</Link></li>
                <li><Link href={`/${countryCode}/contact`} className="hover:text-black transition-colors">Visit Us</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">Message From Our Founder</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">Affiliates</Link></li>
                <li><Link href={`/${countryCode}/journal`} className="hover:text-black transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">Press</Link></li>
              </ul>
            </div>

            {/* Column 3: Shop With Us */}
            <div className="space-y-8">
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase border-b border-black pb-4 w-full">Shop With Us</h4>
              <ul className="space-y-4 text-[13px] font-light text-gray-600">
                <li><Link href={`/${countryCode}/customer-service`} className="hover:text-black transition-colors">Authenticity Guarantee</Link></li>
                <li><Link href={`/${countryCode}/customer-service`} className="hover:text-black transition-colors">Condition Descriptions</Link></li>
                <li><Link href={`/${countryCode}/services/concierge`} className="hover:text-black transition-colors">In-Home Services</Link></li>
                <li><Link href={`/${countryCode}/services/concierge`} className="hover:text-black transition-colors">Concierge Services</Link></li>
                <li><Link href={`/${countryCode}/category/hermes`} className="hover:text-black transition-colors">Catalog</Link></li>
                <li><Link href={`/${countryCode}/account/live`} className="hover:text-black transition-colors">MadAve Live</Link></li>
              </ul>
            </div>

            {/* Column 4: Sell With Us & Trust Box */}
            <div className="space-y-8">
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase border-b border-black pb-4 w-full">Sell With Us</h4>
              <ul className="space-y-4 text-[13px] font-light text-gray-600">
                <li><Link href={`/${countryCode}/how-to-sell`} className="hover:text-black transition-colors">How to Sell or Consign</Link></li>
                <li><Link href={`/${countryCode}/sell`} className="hover:text-black transition-colors">Submit an Item</Link></li>
              </ul>
              
              <div className="flex items-center space-x-6 py-4">
                <Facebook className="w-4 h-4 cursor-pointer hover:text-plum transition-colors" />
                <Twitter className="w-4 h-4 cursor-pointer hover:text-plum transition-colors" />
                <Instagram className="w-4 h-4 cursor-pointer hover:text-plum transition-colors" />
                <Music2 className="w-4 h-4 cursor-pointer hover:text-plum transition-colors" />
                <Youtube className="w-4 h-4 cursor-pointer hover:text-plum transition-colors" />
              </div>

              {/* Institutional Trust Box */}
              <div className="bg-[#f8f8f8] p-8 text-center space-y-4 border border-gray-100">
                <span className="text-[11px] font-bold uppercase tracking-[0.3em]">100% Authentic</span>
                <div className="flex justify-center">
                  <ShieldCheck className="w-8 h-8 text-gray-400 stroke-[1px]" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] block">Guaranteed</span>
                <p className="text-[10px] text-gray-400 font-light italic leading-relaxed">
                  The #1 Trusted Seller Of New & Pre-Owned Hermès Bags
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <span className="font-headline text-xl font-bold tracking-tight">MC <span className="text-[8px] font-bold uppercase tracking-widest opacity-60 ml-2">AMARISÉ MAISON AVENUE</span></span>
              <p className="text-[10px] text-gray-400 font-medium tracking-wide">
                © 2025 Amarisé Maison Avenue. All Rights Reserved. AMARISÉ Maison Avenue is a registered Trademark of Amarisé Maison Avenue Inc.
              </p>
            </div>
            <div className="flex space-x-8 text-[10px] font-medium tracking-widest">
              <Link href={`/${countryCode}/customer-service`} className="text-gray-600 hover:text-black transition-colors underline underline-offset-4 decoration-gray-200">Our Privacy Policy</Link>
              <Link href={`/${countryCode}/customer-service`} className="text-gray-600 hover:text-black transition-colors underline underline-offset-4 decoration-gray-200">Terms & Conditions</Link>
            </div>
          </div>

          {/* Legal Disclaimer Bottom */}
          <div className="mt-8 pt-8 border-t border-gray-50">
            <p className="text-[9px] text-gray-300 leading-relaxed text-center italic">
              Amarisé Maison Avenue is an independent reseller of collectible ultra-luxury handbags in the world, specializing in new and hard-to-find Hermès holy grail bags. Amarisé Maison Avenue is not affiliated with, nor a licensed boutique of, the brands we sell. Amarisé Maison Avenue guarantees that all of our products are authentic and in the condition described.
            </p>
          </div>
        </div>
      </footer>

      {/* Specialist Floating Trigger */}
      <div className="fixed bottom-8 left-8 z-[60]">
        <button className="flex items-center space-x-4 bg-black text-white px-6 py-3 rounded-none shadow-2xl border border-white/10 hover:bg-gold hover:text-black transition-all group" aria-label="Speak with a Maison Curator">
          <MessageCircle className="w-4 h-4 text-gold group-hover:text-black" />
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase">
            WHATSAPP US
          </span>
        </button>
      </div>

      <ShowcaseControls />
    </>
  );
}