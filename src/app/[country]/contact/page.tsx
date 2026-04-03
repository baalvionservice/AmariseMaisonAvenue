import React from 'react';
import { Metadata } from 'next';
import { COUNTRIES } from '@/lib/mock-data';
import { ContactFormClient, GlobalAtelier } from './contact-form-client';
import {
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Sparkles,
  Globe,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type ContactPageProps = {
  params: {
    country: string;
  };
};

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const countryCode = (params.country as string) || 'us';
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES.us;
  return {
    title: `Contact AMARISÉ MAISON | Concierge Services in ${currentCountry.office?.city}`,
    description: 'Reach out to our private client concierge team for bespoke requests, appointments, and inquiries. Available worldwide.',
  };
}

export default function ContactPage({ params }: ContactPageProps) {
  const countryCode = (params.country as string) || 'us';
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES.us;

  return (
    <div className="animate-fade-in bg-ivory pb-32">
      {/* Hero Header */}
      <section className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden border-b border-border bg-muted">
        {/* Concierge Card Box Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <span className="text-[10vw] font-headline font-bold text-gray-900 uppercase tracking-widest">CONCIERGE</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ivory/20 to-ivory" />
        <div className="relative z-10 text-center space-y-4 px-6">
          <nav className="flex items-center justify-center space-x-2 text-[10px] tracking-widest uppercase text-muted-foreground mb-8">
            <Link href={`/${countryCode}`} className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-bold">Concierge</span>
          </nav>
          <span className="text-primary text-[10px] font-bold tracking-[0.5em] uppercase">Private Client Relations</span>
          <h1 className="text-6xl md:text-7xl font-headline font-bold italic text-gray-900 leading-tight">
            The Global Ateliers
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-6 mt-20">
        <div className="flex flex-col lg:flex-row gap-24 items-start">

          {/* Contact Form Section */}
          <ContactFormClient countryCode={countryCode} currentCountry={currentCountry} />

          {/* Dynamic HQ Info Section */}
          <aside className="lg:w-96 space-y-12 shrink-0">
            <div className="space-y-8 bg-white p-10 border border-border shadow-luxury animate-fade-in" key={countryCode}>
              <div className="flex items-center space-x-4 text-plum">
                <Globe className="w-5 h-5" />
                <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase">Regional Headquarters</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-3xl font-headline font-bold italic text-gray-900">{currentCountry.office?.city} Ateliers</h4>
                  <div className="h-px w-12 bg-gold" />
                </div>

                <div className="space-y-6">
                  <ContactItem icon={<MapPin className="w-4 h-4 text-gold" />} label="Address" value={currentCountry.office?.address || ''} />
                  <ContactItem icon={<Phone className="w-4 h-4 text-gold" />} label="Telephone" value={currentCountry.office?.phone || ''} />
                  <ContactItem icon={<Mail className="w-4 h-4 text-gold" />} label="Email" value={currentCountry.office?.email || ''} />
                  <ContactItem icon={<Clock className="w-4 h-4 text-gold" />} label="Hours" value="Mon - Sat | 10:00 AM - 07:00 PM" />
                </div>
              </div>

              <div className="pt-8">
                <Link href={currentCountry.office?.mapUrl || '#'} target="_blank">
                  <Button variant="outline" className="w-full rounded-none border-border hover:bg-ivory text-[10px] font-bold tracking-[0.3em] uppercase h-12">
                    REQUEST DIRECTIONS
                  </Button>
                </Link>
              </div>
            </div>

            {/* Map Simulation Card Box */}
            <div className="relative aspect-[4/5] w-full border border-border shadow-luxury group overflow-hidden bg-muted flex items-center justify-center" key={`map-${countryCode}`}>
              {/* HQ Card Box Placeholder */}
              <div className="text-[10px] font-bold tracking-[0.5em] text-gray-300 uppercase transition-transform duration-[2s] group-hover:scale-105">
                Atelier Location
              </div>
              <div className="absolute inset-0 bg-plum/10 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-0 inset-x-0 p-8 luxury-blur bg-opacity-90 border-t border-border">
                <div className="flex items-center space-x-2 text-[10px] font-bold tracking-widest text-plum uppercase">
                  <Sparkles className="w-3 h-3 text-gold" />
                  <span>Maison Flagship</span>
                </div>
                <p className="text-xs text-gray-600 mt-2 font-light italic">
                  Visit our flagship boutique in the heart of {currentCountry.office?.city} for a private viewing experience.
                </p>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* Global Ateliers Section */}
      <section className="container mx-auto px-6 mt-40">
        <div className="text-center space-y-4 mb-20">
          <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-plum">Maison Global Network</h3>
          <h2 className="text-5xl font-headline font-bold italic text-gray-900">World-Class Presence</h2>
        </div>
        <GlobalAtelier countryCode={countryCode} />
      </section>
    </div>
  );
}
