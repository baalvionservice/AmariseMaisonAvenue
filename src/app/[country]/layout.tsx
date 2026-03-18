'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { useParams } from 'next/navigation';
import { ShowcaseControls } from '@/components/demo/ShowcaseControls';
import Link from 'next/link';
import { Smartphone } from 'lucide-react';

export default function CountryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  
  return (
    <>
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

      {/* Floating App Badge - Persists on all pages */}
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
      
      <footer className="bg-black text-white py-32 mt-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-20 relative z-10">
          <div className="col-span-1 md:col-span-1 space-y-8">
            <div className="font-headline text-3xl font-bold tracking-tighter">
              AMARISÉ <span className="font-light italic text-xl ml-1 text-gold">MAISON AVENUE</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed font-light italic">
              "Curating the world's most exquisite treasures since 1924. A testament to human excellence, craft, and the pursuit of timeless beauty."
            </p>
            <div className="flex space-x-6">
              {['Instagram', 'Twitter', 'Facebook', 'LinkedIn'].map(social => (
                <a key={social} href="#" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-gold transition-colors">{social}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-[11px] uppercase tracking-[0.4em] mb-8 text-gold">Departments</h4>
            <ul className="space-y-4 text-sm font-light text-gray-400">
              <li><Link href={`/${countryCode}/category/jewelry`} className="hover:text-white transition-colors">Fine Jewelry</Link></li>
              <li><Link href={`/${countryCode}/category/apparel`} className="hover:text-white transition-colors">Haute Couture</Link></li>
              <li><Link href={`/${countryCode}/category/timepieces`} className="hover:text-white transition-colors">Heritage Watches</Link></li>
              <li><Link href={`/${countryCode}/category/accessories`} className="hover:text-white transition-colors">Bespoke Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[11px] uppercase tracking-[0.4em] mb-8 text-gold">Client Services</h4>
            <ul className="space-y-4 text-sm font-light text-gray-400">
              <li><Link href={`/${countryCode}/wishlist`} className="hover:text-white transition-colors">VIP Salon</Link></li>
              <li><Link href={`/${countryCode}/customer-service`} className="hover:text-white transition-colors">Track Your Order</Link></li>
              <li><Link href={`/${countryCode}/buying-guide`} className="hover:text-white transition-colors font-bold text-gold">Buying Guides</Link></li>
              <li><Link href={`/${countryCode}/customer-service`} className="hover:text-white transition-colors">Return Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[11px] uppercase tracking-[0.4em] mb-8 text-gold">Maison Amarisé</h4>
            <ul className="space-y-4 text-sm font-light text-gray-400">
              <li><Link href={`/${countryCode}/about`} className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href={`/${countryCode}/contact`} className="hover:text-white transition-colors">Ateliers</Link></li>
              <li><Link href={`/${countryCode}/journal`} className="hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 tracking-[0.4em] uppercase font-bold">
          <p>© 2024 Amarisé Maison Avenue. All rights reserved.</p>
          <div className="flex space-x-10 mt-8 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </footer>
    </>
  );
}
