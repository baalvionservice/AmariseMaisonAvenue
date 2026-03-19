
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
  ShieldCheck,
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

      {/* Institutional Black Label Footer - Matches Reference Image */}
      <footer className="bg-black text-white pt-20 pb-10 border-t border-white/5">
        <div className="container mx-auto px-12 max-w-[1600px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 items-start">
            {/* Column 1: Contact Registry */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Phone className="w-3.5 h-3.5 text-white" />
                <span className="text-[11px] font-medium tracking-widest">+91 8951284770</span>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="w-3.5 h-3.5 text-white" />
                <span className="text-[11px] font-medium tracking-widest uppercase">info@amarisemaisonavenue.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <MessageCircle className="w-3.5 h-3.5 text-white" />
                <span className="text-[11px] font-medium tracking-widest">+91 8951284770</span>
              </div>
            </div>

            {/* Column 2: Central Hub */}
            <div className="md:text-center space-y-4">
              <span className="text-[11px] font-bold tracking-[0.2em] block text-gray-400 uppercase">Shop</span>
              <Link href={`/${countryCode}`} className="text-[11px] font-medium tracking-widest block hover:text-gray-300 transition-colors">amarisemaisonavenue.com</Link>
              <Link href={`/${countryCode}/customer-service`} className="text-[11px] font-medium tracking-widest block hover:text-gray-300 transition-colors uppercase">FAQ</Link>
            </div>

            {/* Column 3: Authenticity Registry */}
            <div className="flex items-start space-x-4 md:justify-end">
              <ShieldCheck className="w-6 h-6 text-gray-400 shrink-0" />
              <div className="space-y-1">
                <h5 className="text-[13px] font-bold uppercase tracking-[0.1em]">100% Authentic Guaranteed</h5>
                <p className="text-[10px] text-gray-400 font-light italic leading-relaxed">
                  The #1 Trusted Seller of New & Pre-Owned Hermès Bags
                </p>
              </div>
            </div>
          </div>

          {/* Legal Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[10px] text-gray-500 font-medium tracking-wide">
              © 2025 Amarisé Maison Avenue. All Rights Reserved. Amarisé Maison Avenue is a Registered Trademark.
            </p>
            <div className="flex space-x-8 text-[10px] font-medium tracking-widest">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors underline underline-offset-4 decoration-gray-700">Privacy Policy</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors underline underline-offset-4 decoration-gray-700">Terms & Conditions</Link>
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
