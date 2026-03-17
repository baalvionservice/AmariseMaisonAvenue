
'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { AppProvider } from '@/lib/store';
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
    <AppProvider>
      <Header />
      <main className="min-h-screen pt-20 animate-fade-in relative bg-ivory">
        {children}
      </main>
      <ShowcaseControls />
      <footer className="bg-white py-32 border-t border-border mt-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-20 relative z-10">
          <div className="col-span-1 md:col-span-1 space-y-8">
            <div className="font-headline text-3xl font-bold tracking-tighter text-gray-900">AMARISÉ <span className="text-plum text-xl font-normal ml-1">LUXE</span></div>
            <p className="text-sm text-gray-500 leading-relaxed font-light italic">
              "Curating the world's most exquisite treasures since 1924. A testament to human excellence, craft, and the pursuit of timeless beauty."
            </p>
            <div className="flex space-x-6">
              {['Instagram', 'Twitter', 'Facebook', 'LinkedIn'].map(social => (
                <a key={social} href="#" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gold transition-colors">{social}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-[11px] uppercase tracking-[0.4em] mb-8 text-plum">Departments</h4>
            <ul className="space-y-4 text-sm font-light text-gray-500">
              <li><Link href={`/${countryCode}/category/jewelry`} className="hover:text-gold transition-colors">Fine Jewelry</Link></li>
              <li><Link href={`/${countryCode}/category/apparel`} className="hover:text-gold transition-colors">Haute Couture</Link></li>
              <li><Link href={`/${countryCode}/category/timepieces`} className="hover:text-gold transition-colors">Heritage Watches</Link></li>
              <li><Link href={`/${countryCode}/category/accessories`} className="hover:text-gold transition-colors">Bespoke Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[11px] uppercase tracking-[0.4em] mb-8 text-plum">Client Services</h4>
            <ul className="space-y-4 text-sm font-light text-gray-500">
              <li><Link href={`/${countryCode}/wishlist`} className="hover:text-gold transition-colors">VIP Salon</Link></li>
              <li><Link href={`/${countryCode}/customer-service`} className="hover:text-gold transition-colors">Track Your Order</Link></li>
              <li><Link href={`/${countryCode}/customer-service`} className="hover:text-gold transition-colors">Global Shipping</Link></li>
              <li><Link href={`/${countryCode}/customer-service`} className="hover:text-gold transition-colors">Return Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[11px] uppercase tracking-[0.4em] mb-8 text-plum">Maison Amarisé</h4>
            <ul className="space-y-4 text-sm font-light text-gray-500">
              <li><Link href={`/${countryCode}/about`} className="hover:text-gold transition-colors">Our Story</Link></li>
              <li><Link href={`/${countryCode}/contact`} className="hover:text-gold transition-colors">Ateliers</Link></li>
              <li><Link href={`/${countryCode}/journal`} className="hover:text-gold transition-colors">Sustainability</Link></li>
              <li><Link href="/admin" className="hover:text-gold transition-colors">Careers</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-32 pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 tracking-[0.4em] uppercase font-bold">
          <p>© 2024 Amarisé Luxe. All rights reserved. Global Headateliers: Paris | London | New York.</p>
          <div className="flex space-x-10 mt-8 md:mt-0">
            <a href="#" className="hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms</a>
            <a href="#" className="hover:text-gold transition-colors">Accessibility</a>
          </div>
        </div>
      </footer>
    </AppProvider>
  );
}
