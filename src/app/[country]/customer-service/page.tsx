
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronRight, 
  Truck, 
  RefreshCcw, 
  HelpCircle, 
  ShieldCheck, 
  Clock, 
  Package 
} from 'lucide-react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { CUSTOMER_SERVICE, COUNTRIES } from '@/lib/mock-data';

export default function CustomerServicePage() {
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  const info = CUSTOMER_SERVICE[countryCode] || CUSTOMER_SERVICE.us;
  const currentCountry = COUNTRIES[countryCode] || COUNTRIES.us;

  return (
    <div className="animate-fade-in bg-ivory pb-32">
      {/* Header Section */}
      <section className="container mx-auto px-6 py-20 text-center space-y-8">
        <nav className="flex items-center justify-center space-x-2 text-[10px] tracking-widest uppercase text-muted-foreground mb-8">
          <Link href={`/${countryCode}`} className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-bold">Client Services</span>
        </nav>
        <span className="text-primary text-[10px] font-bold tracking-[0.5em] uppercase">Maison Support</span>
        <h1 className="text-6xl md:text-7xl font-headline font-bold italic text-gray-900 leading-tight">
          How May We Assist You?
        </h1>
        <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto italic">
          "The excellence of the Maison extends beyond the creation of an artifact. It is found in every interaction with our connoisseurs."
        </p>
      </section>

      {/* Main Content Grid */}
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-24 items-start">
        
        {/* Policies Section */}
        <div className="lg:col-span-2 space-y-24">
          
          {/* Shipping Info */}
          <div className="space-y-12">
            <div className="flex items-center space-x-4 text-plum">
              <Truck className="w-8 h-8" />
              <h2 className="text-3xl font-headline font-bold italic">Global White-Glove Shipping</h2>
            </div>
            <div className="bg-white p-12 shadow-luxury border border-border space-y-8">
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold">Local Logistics: {currentCountry.name}</h3>
                <p className="text-lg text-gray-600 font-light leading-relaxed italic">
                  {info.shipping}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-border">
                <ServiceHighlight 
                  icon={<ShieldCheck className="w-5 h-5 text-gold" />} 
                  title="Full Insurance" 
                  desc="Every artifact is insured for its replacement value during transit." 
                />
                <ServiceHighlight 
                  icon={<Clock className="w-5 h-5 text-gold" />} 
                  title="Priority Access" 
                  desc="Bespoke and VIP clients receive prioritized dispatch from the ateliers." 
                />
              </div>
            </div>
          </div>

          {/* Returns Policy */}
          <div className="space-y-12">
            <div className="flex items-center space-x-4 text-plum">
              <RefreshCcw className="w-8 h-8" />
              <h2 className="text-3xl font-headline font-bold italic">Artisanal Returns</h2>
            </div>
            <div className="bg-white p-12 shadow-luxury border border-border space-y-8">
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold">The Return Charter</h3>
                <p className="text-lg text-gray-600 font-light leading-relaxed italic">
                  {info.returns}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-border">
                <ServiceHighlight 
                  icon={<Package className="w-5 h-5 text-gold" />} 
                  title="Original Condition" 
                  desc="Items must remain in their original architectural packaging with seals intact." 
                />
                <ServiceHighlight 
                  icon={<ShieldCheck className="w-5 h-5 text-gold" />} 
                  title="Authenticity Verification" 
                  desc="All returned artifacts undergo a rigorous inspection by our master curators." 
                />
              </div>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-12 pb-12">
            <div className="flex items-center space-x-4 text-plum">
              <HelpCircle className="w-8 h-8" />
              <h2 className="text-3xl font-headline font-bold italic">Frequently Asked</h2>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {info.faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="bg-white border border-border px-8 shadow-sm">
                  <AccordionTrigger className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900 hover:text-gold hover:no-underline py-8">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-500 font-light italic leading-relaxed pb-8">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

        </div>

        {/* Sidebar Navigation / Contact Shortcut */}
        <aside className="space-y-12 sticky top-32">
          <div className="bg-plum p-10 text-white shadow-luxury">
             <h3 className="text-2xl font-headline font-bold italic mb-6">Direct Inquiries</h3>
             <p className="text-xs text-white/70 font-light leading-relaxed italic mb-10">
               "If your question remains unanswered, our private concierge team is available for a bespoke consultation."
             </p>
             <Link href={`/${countryCode}/contact`}>
                <button className="w-full h-14 bg-white text-plum hover:bg-gold hover:text-gray-900 transition-all text-[10px] font-bold tracking-[0.3em] uppercase">
                  Contact Concierge
                </button>
             </Link>
          </div>
          
          <div className="bg-white p-10 border border-border space-y-8">
             <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-plum">Client Resources</h4>
             <ul className="space-y-6">
                <ResourceLink label="Size Guide" href="#" />
                <ResourceLink label="Product Care" href="#" />
                <ResourceLink label="Authenticity Registry" href="#" />
                <ResourceLink label="Gift Services" href="#" />
             </ul>
          </div>
        </aside>

      </div>
    </div>
  );
}

function ServiceHighlight({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="mt-1">{icon}</div>
      <div className="space-y-1">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-900">{title}</h4>
        <p className="text-xs text-gray-500 font-light leading-relaxed italic">{desc}</p>
      </div>
    </div>
  );
}

function ResourceLink({ label, href }: { label: string, href: string }) {
  return (
    <li>
      <Link href={href} className="group flex items-center justify-between border-b border-border pb-4 hover:border-gold transition-colors">
        <span className="text-xs text-gray-600 font-light uppercase tracking-widest group-hover:text-gold transition-colors">{label}</span>
        <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-gold transition-colors" />
      </Link>
    </li>
  );
}
