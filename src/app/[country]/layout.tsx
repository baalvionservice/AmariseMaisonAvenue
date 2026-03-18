
'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { useParams } from 'next/navigation';
import { ShowcaseControls } from '@/components/demo/ShowcaseControls';
import { MaisonPopup } from '@/components/layout/MaisonPopup';
import Link from 'next/link';
import { Smartphone, Phone, Mail, MessageCircle, Facebook, Twitter, Instagram, Youtube, Music2 } from 'lucide-react';

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
      <main className="min-h-screen pt-[148px] animate-fade-in relative bg-white">
        {children}
      </main>

      {/* Global VIP Email List Section */}
      <section className="bg-[#f9f7f9] py-20 border-t border-black/5">
        <div className="container mx-auto px-6 max-w-3xl text-center space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-headline font-medium text-gray-900">Join the VIP Email List</h2>
            <p className="text-[12px] text-gray-500 font-light leading-relaxed max-w-md mx-auto">
              Join our VIP email list and get first access new product launches and all the latest updates from Amarisé Maison Avenue!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center max-w-lg mx-auto bg-white border border-gray-200 h-12 overflow-hidden">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 h-full px-5 text-xs font-light text-gray-600 outline-none placeholder:text-gray-300"
            />
            <button className="h-full px-8 text-[10px] font-bold tracking-[0.3em] uppercase text-black hover:text-plum transition-colors border-l border-gray-100">
              SUBMIT
            </button>
          </div>
        </div>
      </section>

      {/* Main Luxury Footer */}
      <footer className="bg-white border-t border-gray-100 pt-20 pb-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            {/* Column 1: Customer Care */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="w-full h-px bg-black/10" />
                <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-black">Customer Care</h4>
                <ul className="space-y-3">
                  <FooterLink href={`/${countryCode}/contact`}>Contact Us</FooterLink>
                  <FooterLink href="#">My Account</FooterLink>
                  <FooterLink href={`/${countryCode}/customer-service`}>Shipping</FooterLink>
                  <FooterLink href={`/${countryCode}/customer-service`}>Returns</FooterLink>
                  <FooterLink href={`/${countryCode}/customer-service`}>FAQ</FooterLink>
                </ul>
              </div>
              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-3 text-black">
                  <Phone className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Phone: <span className="font-normal normal-case ml-2 text-gray-600">+1 (888) 623-2832</span></span>
                </div>
                <div className="flex items-center space-x-3 text-black">
                  <Mail className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Email: <span className="font-normal normal-case ml-2 text-gray-600">info@amarise-maison.com</span></span>
                </div>
                <div className="flex items-center space-x-3 text-black">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">WhatsApp: <span className="font-normal normal-case ml-2 text-gray-600">+1 (917) 831-6040</span></span>
                </div>
              </div>
            </div>

            {/* Column 2: About */}
            <div className="space-y-6">
              <div className="w-full h-px bg-black/10" />
              <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-black">About</h4>
              <ul className="space-y-3">
                <FooterLink href={`/${countryCode}/about`}>About Us</FooterLink>
                <FooterLink href={`/${countryCode}/contact`}>Visit Us</FooterLink>
                <FooterLink href="#">Message From Our Founder</FooterLink>
                <FooterLink href="#">Affiliates</FooterLink>
                <FooterLink href={`/${countryCode}/journal`}>Blog</FooterLink>
                <FooterLink href="#">Press</FooterLink>
              </ul>
            </div>

            {/* Column 3: Shop With Us */}
            <div className="space-y-6">
              <div className="w-full h-px bg-black/10" />
              <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-black">Shop With Us</h4>
              <ul className="space-y-3">
                <FooterLink href="#">Authenticity Guarantee</FooterLink>
                <FooterLink href="#">Condition Descriptions</FooterLink>
                <FooterLink href="#">In-Home Services</FooterLink>
                <FooterLink href={`/${countryCode}/appointments`}>Concierge Services</FooterLink>
                <FooterLink href={`/${countryCode}/collections`}>Catalog</FooterLink>
                <FooterLink href={`/${countryCode}/buying-guide`}>MadAve Live</FooterLink>
              </ul>
            </div>

            {/* Column 4: Sell With Us & Socials */}
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="w-full h-px bg-black/10" />
                <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-black">Sell With Us</h4>
                <ul className="space-y-3">
                  <FooterLink href="#">How to Sell or Consign</FooterLink>
                  <FooterLink href="#">Submit an Item</FooterLink>
                </ul>
              </div>
              
              <div className="flex space-x-5 text-black items-center">
                <Link href="#" className="hover:opacity-60 transition-opacity"><Facebook className="w-4 h-4 fill-current" /></Link>
                <Link href="#" className="hover:opacity-60 transition-opacity"><Twitter className="w-4 h-4 fill-current" /></Link>
                <Link href="#" className="hover:opacity-60 transition-opacity"><Instagram className="w-4 h-4" /></Link>
                <Link href="#" className="hover:opacity-60 transition-opacity"><Youtube className="w-4 h-4" /></Link>
                <Link href="#" className="hover:opacity-60 transition-opacity"><Music2 className="w-4 h-4" /></Link>
              </div>

              {/* Authenticity Box */}
              <div className="bg-[#f8f8f8] p-8 text-center space-y-3 border border-gray-100">
                <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black">100% Authentic</h5>
                <div className="flex justify-center">
                  <div className="w-8 h-10 border border-black/20 flex items-center justify-center">
                    <span className="text-[8px] font-bold">A/G</span>
                  </div>
                </div>
                <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black">Guaranteed</h5>
                <p className="text-[9px] text-gray-400 font-light leading-tight italic px-4">
                  The #1 Trusted Seller Of New & Pre-Owned Hermès Bags
                </p>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[9px] text-gray-400 tracking-[0.3em] uppercase font-bold">
            <p>© 2024 Amarisé Maison Avenue. All rights reserved.</p>
            <div className="flex space-x-8 mt-6 md:mt-0">
              <Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-black transition-colors">Terms of Use</Link>
              <Link href="#" className="hover:text-black transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating App Badge */}
      <div className="fixed bottom-6 left-6 z-[60]">
        <button className="flex items-center space-x-3 bg-gradient-to-r from-[#e8def8] to-[#f3e8f5] px-4 py-2.5 rounded-full shadow-lg border border-white/50 hover:shadow-xl transition-all group">
          <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center shadow-sm">
            <Smartphone className="w-4 h-4 text-gray-800" />
          </div>
          <span className="text-[9px] font-bold tracking-widest text-gray-800 uppercase">
            GET OUR APP • $300 OFF
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
      <Link href={href} className="text-[11px] font-light text-gray-600 hover:text-black transition-colors block">
        {children}
      </Link>
    </li>
  );
}
