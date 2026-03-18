'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { useParams } from 'next/navigation';
import { ShowcaseControls } from '@/components/demo/ShowcaseControls';
import Link from 'next/link';

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
      <ShowcaseControls />
      <footer className="bg-black text-white py-32 mt-32 relative overflow-hidden">
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
