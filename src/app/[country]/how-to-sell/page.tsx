
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

/**
 * HowToSellPage: Replicated "Sell or Consign" Informational Page.
 * Features a high-fidelity dual-panel hero and a centered authority text section.
 */
export default function HowToSellPage() {
  const { country } = useParams();
  const countryCode = (country as string) || 'us';

  return (
    <div className="bg-white min-h-screen animate-fade-in font-body">
      {/* 1. Cinematic Dual-Panel Hero */}
      <section className="relative flex flex-col md:flex-row h-auto md:h-[600px] overflow-hidden bg-black">
        {/* Left Panel: Narrative & CTA */}
        <div className="w-full md:w-[45%] p-12 md:p-24 flex flex-col justify-center space-y-8 bg-black text-white">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-headline font-bold italic leading-tight tracking-tight">
              Sell or Consign with <br /> Madison Ave Couture
            </h1>
            <p className="text-sm md:text-base font-light leading-relaxed text-gray-300 max-w-md italic">
              At Madison Avenue Couture, we offer the most personalized way to sell or consign your designer bags or jewelry. Earn up to 85% of the market price for your mint, new, vintage, or pre-owned items.
            </p>
          </div>

          <div className="space-y-6 pt-4">
            <Link href={`/${countryCode}/sell`}>
              <Button 
                className="h-14 px-12 bg-[#E1D3DC] text-gray-900 hover:bg-[#D8C4D1] rounded-none text-[10px] font-bold tracking-[0.3em] uppercase transition-all shadow-xl"
              >
                START SELLING
              </Button>
            </Link>
            
            <div className="block">
              <Link 
                href={`/${countryCode}/sell`} 
                className="text-[10px] font-bold tracking-[0.2em] text-white hover:text-gold transition-colors uppercase border-b border-white/20 pb-1"
              >
                LOGIN TO OUR NEW SELLING PORTAL
              </Link>
            </div>
          </div>
        </div>

        {/* Right Panel: Visual Resonance */}
        <div className="w-full md:w-[55%] relative h-[400px] md:h-auto overflow-hidden">
          <Image 
            src="https://madisonavenuecouture.com/cdn/shop/files/Consign_Landing_Page_Banner_1.jpg?v=1691512345&width=1440" 
            alt="Maison Amarisé Heritage Collection - Hermès Series"
            fill
            className="object-cover transition-transform duration-[5s] hover:scale-105"
            priority
            sizes="60vw"
          />
          <div className="absolute inset-0 bg-black/5" />
        </div>
      </section>

      {/* 2. Institutional Authority Section */}
      <section className="container mx-auto px-12 py-32 max-w-6xl">
        <div className="text-center space-y-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-[13px] md:text-base text-gray-600 font-light leading-relaxed italic text-justify md:text-center">
              If you&apos;re looking to sell or consign your designer bag, jewelry or accessories, entrust it to the care and knowledge of people who know luxury — Madison Avenue Couture. We are one of the leading sellers and buyers of Hermès and Chanel handbags and accessories in the secondary market. We bring our years of experience and expertise buying and selling designer bags to evaluate your bags so that we can offer you the best price. We specialize in selling store-fresh luxury bags, so we prefer to purchase never worn bags outright. We also accept recently produced and vintage pre-owned bags in excellent to like new condition, jewelry and accessories.
            </p>
          </div>
          
          <div className="pt-8">
            <div className="h-px w-24 bg-gold mx-auto opacity-30" />
          </div>
        </div>
      </section>

      {/* 3. Final Step Gateway */}
      <section className="bg-ivory py-24 border-t border-gray-100">
        <div className="container mx-auto px-6 text-center space-y-8">
          <h3 className="text-2xl font-headline font-bold italic text-gray-900">Ready to begin your consignment?</h3>
          <p className="text-sm text-gray-500 font-light max-w-xl mx-auto italic">
            "Every artifact has a story. Our curators ensure yours finds its next rightful guardian with absolute transparency."
          </p>
          <Link href={`/${countryCode}/sell`}>
            <Button variant="outline" className="rounded-none border-gray-900 h-14 px-16 text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-black hover:text-white transition-all">
              PROCEED TO SELL PORTAL
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
