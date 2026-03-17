
'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { AppProvider } from '@/lib/store';
import { useParams } from 'next/navigation';
import { COUNTRIES } from '@/lib/mock-data';

export default function CountryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  
  if (!COUNTRIES[countryCode]) {
    // In a real app we'd redirect or show 404
  }

  return (
    <AppProvider>
      <Header />
      <main className="min-h-screen pt-20">
        {children}
      </main>
      <footer className="bg-card py-20 border-t border-border mt-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="font-headline text-2xl font-bold mb-6">AMARISÉ <span className="text-primary text-lg">LUXE</span></div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Curating the world's most exquisite treasures since 1924. A testament to luxury, craft, and timeless beauty.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Departments</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Fine Jewelry</a></li>
              <li><a href="#" className="hover:text-primary">Haute Couture</a></li>
              <li><a href="#" className="hover:text-primary">Heritage Watches</a></li>
              <li><a href="#" className="hover:text-primary">Bespoke Accessories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Client Services</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">VIP Salon</a></li>
              <li><a href="#" className="hover:text-primary">Track Your Order</a></li>
              <li><a href="#" className="hover:text-primary">Global Shipping</a></li>
              <li><a href="#" className="hover:text-primary">Return Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Maison Amarisé</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Our Story</a></li>
              <li><a href="#" className="hover:text-primary">Ateliers</a></li>
              <li><a href="#" className="hover:text-primary">Sustainability</a></li>
              <li><a href="#" className="hover:text-primary">Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-[10px] text-muted-foreground tracking-[0.2em] uppercase">
          <p>© 2024 Amarisé Luxe. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </footer>
    </AppProvider>
  );
}
