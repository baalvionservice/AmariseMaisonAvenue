
'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { useParams } from 'next/navigation';
import { ShowcaseControls } from '@/components/demo/ShowcaseControls';
import { MaisonPopup } from '@/components/layout/MaisonPopup';
import Link from 'next/link';
import { Smartphone, Phone, Mail, MessageCircle, Facebook, Twitter, Instagram, Youtube, Music2, ShieldCheck, Globe } from 'lucide-react';

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

      {/* Institutional Registry Section */}
      <section className="bg-[#f9f7f9] py-24 border-t border-black/5">
        <div className="container mx-auto px-6 max-w-3xl text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-headline font-medium text-gray-900 italic">Maison Verification Registry</h2>
            <p className="text-[12px] text-gray-500 font-light leading-relaxed max-w-md mx-auto uppercase tracking-widest">
              Join the institutional email registry for early access to archive allocations and global Maison announcements.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center max-w-lg mx-auto bg-white border border-gray-200 h-12 overflow-hidden shadow-sm">
            <input 
              type="email" 
              placeholder="COLLECTOR EMAIL" 
              className="flex-1 h-full px-5 text-[10px] font-bold tracking-widest text-gray-600 outline-none placeholder:text-gray-300 uppercase"
              aria-label="Institutional Email Signup"
            />
            <button className="h-full px-8 text-[10px] font-bold tracking-[0.3em] uppercase text-black hover:text-plum transition-colors border-l border-gray-100">
              REGISTER
            </button>
          </div>
        </div>
      </section>

      {/* Institutional Luxury Footer */}
      <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            {/* Column 1: Client Relations */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="w-full h-px bg-black/10" />
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">Client Relations</h4>
                <ul className="space-y-4">
                  <FooterLink href={`/${countryCode}/contact`}>The Curatorial Desk</FooterLink>
                  <FooterLink href="#">Maison Account</FooterLink>
                  <FooterLink href={`/${countryCode}/customer-service`}>Global Logistics</FooterLink>
                  <FooterLink href={`/${countryCode}/customer-service`}>Return Charter</FooterLink>
                  <FooterLink href={`/${countryCode}/customer-service`}>Intelligence FAQ</FooterLink>
                </ul>
              </div>
              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-3 text-black">
                  <Phone className="w-3.5 h-3.5 opacity-40" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Atelier: <span className="font-normal normal-case ml-2 text-gray-600">+1 (888) AMARISE</span></span>
                </div>
                <div className="flex items-center space-x-3 text-black">
                  <Mail className="w-3.5 h-3.5 opacity-40" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Inquiry: <span className="font-normal normal-case ml-2 text-gray-600">curator@amarise-maison.com</span></span>
                </div>
              </div>
            </div>

            {/* Column 2: Institutional Heritage */}
            <div className="space-y-6">
              <div className="w-full h-px bg-black/10" />
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">Institutional</h4>
              <ul className="space-y-4">
                <FooterLink href={`/${countryCode}/about`}>Heritage Story</FooterLink>
                <FooterLink href={`/${countryCode}/contact`}>Global Ateliers</FooterLink>
                <FooterLink href="#">Founding Archive</FooterLink>
                <FooterLink href="#">Responsibility Charter</FooterLink>
                <FooterLink href={`/${countryCode}/journal`}>Maison Intelligence</FooterLink>
                <FooterLink href="#">Press Registry</FooterLink>
              </ul>
            </div>

            {/* Column 3: The Collection */}
            <div className="space-y-6">
              <div className="w-full h-px bg-black/10" />
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">The Collection</h4>
              <ul className="space-y-4">
                <FooterLink href="#">Provenance Registry</FooterLink>
                <FooterLink href="#">Artifact Conditions</FooterLink>
                <FooterLink href="#">Atelier Services</FooterLink>
                <FooterLink href={`/${countryCode}/appointments`}>Private Viewings</FooterLink>
                <FooterLink href={`/${countryCode}/collections`}>Global Catalog</FooterLink>
                <FooterLink href={`/${countryCode}/buying-guide`}>Acquisition Guides</FooterLink>
              </ul>
            </div>

            {/* Column 4: Trust & Identity */}
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="w-full h-px bg-black/10" />
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">Identity</h4>
                <div className="flex space-x-5 text-black items-center">
                  <Link href="#" className="hover:opacity-60 transition-opacity" aria-label="Facebook"><Facebook className="w-4 h-4 fill-current" /></Link>
                  <Link href="#" className="hover:opacity-60 transition-opacity" aria-label="Twitter"><Twitter className="w-4 h-4 fill-current" /></Link>
                  <Link href="#" className="hover:opacity-60 transition-opacity" aria-label="Instagram"><Instagram className="w-4 h-4" /></Link>
                  <Link href="#" className="hover:opacity-60 transition-opacity" aria-label="Youtube"><Youtube className="w-4 h-4" /></Link>
                </div>
              </div>

              {/* Authority Seal */}
              <div className="bg-[#f8f8f8] p-10 text-center space-y-4 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-secondary opacity-20" />
                <ShieldCheck className="w-6 h-6 text-secondary mx-auto mb-2" />
                <h5 className="text-[11px] font-bold uppercase tracking-[0.3em] text-black">Maison Registry Verified</h5>
                <p className="text-[9px] text-gray-400 font-light leading-tight italic px-4 uppercase tracking-tighter">
                  Every artifact is audited for provenance and authenticity compliance.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[9px] text-gray-400 tracking-[0.4em] uppercase font-bold">
            <p>© 2024 AMARISÉ MAISON AVENUE | Institutional Acquisition House</p>
            <div className="flex space-x-10 mt-6 md:mt-0">
              <Link href="#" className="hover:text-black transition-colors">Privacy Charter</Link>
              <Link href="#" className="hover:text-black transition-colors">Terms of Engagement</Link>
              <Link href="#" className="hover:text-black transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Specialist Floating Trigger - Hidden on very small screens to avoid obstruction */}
      <div className="fixed bottom-24 left-8 md:bottom-8 z-[60] hidden xs:block">
        <button className="flex items-center space-x-4 bg-black text-white px-6 py-3 rounded-none shadow-2xl border border-white/10 hover:bg-secondary hover:text-black transition-all group min-h-[44px]" aria-label="Speak with a Maison Curator">
          <Globe className="w-4 h-4 text-secondary group-hover:text-black" />
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase">
            SPEAK WITH A CURATOR
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
      <Link href={href} className="text-[11px] font-light text-gray-600 hover:text-black transition-colors block italic">
        {children}
      </Link>
    </li>
  );
}
