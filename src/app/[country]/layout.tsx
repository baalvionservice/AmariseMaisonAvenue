
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
    // In a production app, we would handle 404 or redirect here
  }

  return (
    <AppProvider>
      <Header />
      <main className="min-h-screen pt-20 animate-fade-in">
        {children}
      </main>
      <footer className="bg-card py-32 border-t border-border mt-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-20 relative z-10">
          <div className="col-span-1 md:col-span-1 space-y-8">
            <div className="font-headline text-3xl font-bold tracking-tighter">AMARISÉ <span className="text-primary text-xl font-normal ml-1">LUXE</span></div>
            <p className="text-sm text-muted-foreground leading-relaxed font-light italic">
              "Curating the world's most exquisite treasures since 1924. A testament to human excellence, craft, and the pursuit of timeless beauty."
            </p>
            <div className="flex space-x-6">
              {['Instagram', 'Twitter', 'Facebook', 'LinkedIn'].map(social => (
                <a key={social} href="#" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">{social}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] mb-8 text-primary">Departments</h4>
            <ul className="space-y-4 text-sm font-light text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Fine Jewelry</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Haute Couture</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Heritage Watches</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Bespoke Accessories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] mb-8 text-primary">Client Services</h4>
            <ul className="space-y-4 text-sm font-light text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">VIP Salon</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Track Your Order</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Global Shipping</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Return Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] mb-8 text-primary">Maison Amarisé</h4>
            <ul className="space-y-4 text-sm font-light text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Ateliers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-32 pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center text-[9px] text-muted-foreground tracking-[0.4em] uppercase font-bold">
          <p>© 2024 Amarisé Luxe. All rights reserved. Global Headateliers: Paris | London | New York.</p>
          <div className="flex space-x-10 mt-8 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Accessibility</a>
          </div>
        </div>
      </footer>
    </AppProvider>
  );
}
