
'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { useParams } from 'next/navigation';
import { ShowcaseControls } from '@/components/demo/ShowcaseControls';
import { MaisonPopup } from '@/components/layout/MaisonPopup';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Music2, 
  ShieldCheck, 
  Search
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
      <Header />
      <main id="main-content" className="min-h-screen pt-[148px] animate-fade-in relative bg-white">
        {children}
      </main>

      {/* Institutional Luxury Footer */}
      <footer className="bg-white border-t border-gray-100 pt-20 pb-8">
        <div className="container mx-auto px-12 max-w-[1600px]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Column 1: Customer Care */}
            <div className="space-y-8">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black border-b border-black pb-2 w-full">Customer Care</h4>
              <ul className="space-y-4">
                <FooterLink href="#">Contact Us</FooterLink>
                <FooterLink href="#">My Account</FooterLink>
                <FooterLink href="#">Shipping</FooterLink>
                <FooterLink href="#">Returns</FooterLink>
                <FooterLink href="#">FAQ</FooterLink>
              </ul>
              <div className="space-y-4 pt-6">
                <div className="flex items-center space-x-3 text-black group">
                  <Phone className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Phone: <span className="font-normal normal-case ml-2 text-gray-600">+1 (888) 623-2832</span></span>
                </div>
                <div className="flex items-center space-x-3 text-black group">
                  <Mail className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Email: <span className="font-normal normal-case ml-2 text-gray-600">info@madisonavenuecouture.com</span></span>
                </div>
                <div className="flex items-center space-x-3 text-black group">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Whatsapp: <span className="font-normal normal-case ml-2 text-gray-600">+1 (917) 831-6040</span></span>
                </div>
              </div>
            </div>

            {/* Column 2: About */}
            <div className="space-y-8">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black border-b border-black pb-2 w-full">About</h4>
              <ul className="space-y-4">
                <FooterLink href="#">About Us</FooterLink>
                <FooterLink href="#">Visit Us</FooterLink>
                <FooterLink href="#">Message From Our Founder</FooterLink>
                <FooterLink href="#">Affiliates</FooterLink>
                <FooterLink href="#">Blog</FooterLink>
                <FooterLink href="#">Press</FooterLink>
              </ul>
            </div>

            {/* Column 3: Shop With Us */}
            <div className="space-y-8">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black border-b border-black pb-2 w-full">Shop With Us</h4>
              <ul className="space-y-4">
                <FooterLink href="#">Authenticity Guarantee</FooterLink>
                <FooterLink href="#">Condition Descriptions</FooterLink>
                <FooterLink href="#">In-Home Services</FooterLink>
                <FooterLink href="#">Concierge Services</FooterLink>
                <FooterLink href="#">Catalog</FooterLink>
                <FooterLink href="#">MadAve Live</FooterLink>
              </ul>
            </div>

            {/* Column 4: Sell With Us & Trust */}
            <div className="space-y-8">
              <div className="space-y-8">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black border-b border-black pb-2 w-full">Sell With Us</h4>
                <ul className="space-y-4">
                  <FooterLink href="#">How to Sell or Consign</FooterLink>
                  <FooterLink href="#">Submit an Item</FooterLink>
                </ul>
              </div>

              {/* Social Icons */}
              <div className="flex space-x-6 text-black pt-2">
                <Link href="#" className="hover:opacity-60 transition-opacity"><Facebook className="w-4 h-4 fill-current" /></Link>
                <Link href="#" className="hover:opacity-60 transition-opacity"><Twitter className="w-4 h-4 fill-current" /></Link>
                <Link href="#" className="hover:opacity-60 transition-opacity"><Instagram className="w-4 h-4" /></Link>
                <Link href="#" className="hover:opacity-60 transition-opacity"><Search className="w-4 h-4 rotate-90" /></Link>
                <Link href="#" className="hover:opacity-60 transition-opacity"><Music2 className="w-4 h-4" /></Link>
                <Link href="#" className="hover:opacity-60 transition-opacity"><Youtube className="w-4 h-4" /></Link>
              </div>

              {/* Authenticity Box */}
              <div className="bg-[#f4f4f4] p-8 text-center space-y-3 border border-gray-100">
                <h5 className="text-[12px] font-bold uppercase tracking-[0.2em] text-black">100% Authentic</h5>
                <div className="flex justify-center">
                  <ShieldCheck className="w-5 h-5 text-gray-400" />
                </div>
                <h5 className="text-[12px] font-bold uppercase tracking-[0.2em] text-black">Guaranteed</h5>
                <p className="text-[9px] text-gray-500 font-light leading-relaxed px-4 italic">
                  The #1 Trusted Seller of New & Pre-Owned Hermès Bags
                </p>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-medium">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="font-headline text-lg font-bold text-black tracking-tighter">MC</span>
              <span className="uppercase tracking-[0.1em] text-[9px] border-l border-gray-200 pl-4">
                © 2025 Madison Avenue Couture. All Rights Reserved. MAC Madison Avenue Couture is a registered Trademark of Madison Avenue Couture Inc.
              </span>
            </div>
            <div className="flex space-x-8 uppercase tracking-widest text-[9px] font-bold">
              <Link href="#" className="text-gray-900 hover:text-black transition-colors underline underline-offset-4">Our Privacy Policy</Link>
              <Link href="#" className="text-gray-900 hover:text-black transition-colors underline underline-offset-4">Terms & Conditions</Link>
            </div>
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

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-[12px] font-light text-gray-600 hover:text-black transition-colors block">
        {children}
      </Link>
    </li>
  );
}
