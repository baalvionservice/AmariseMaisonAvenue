
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

/**
 * MaisonPopup: Updated for high-ticket acquisition invitation.
 */
const POPUP_INTERVAL = 2 * 60 * 1000; // 2 minutes
const POPUP_KEY = 'maison_popup_last_shown';

export function MaisonPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem(POPUP_KEY);
    const now = Date.now();

    if (!lastShown || now - parseInt(lastShown) > POPUP_INTERVAL) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(POPUP_KEY, Date.now().toString());
  };

  const handleCollect = (e: React.FormEvent) => {
    e.preventDefault();
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-700">
      <div className="relative w-full max-w-[940px] bg-white overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col md:row animate-in zoom-in-95 duration-500 rounded-sm">
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 z-20 text-gray-400 hover:text-black transition-colors"
          type="button"
          aria-label="Close Invitation"
        >
          <X className="w-6 h-6 stroke-[1.5px]" />
        </button>

        <div className="relative w-full md:w-[52%] aspect-[4/5] md:aspect-auto h-[350px] md:h-auto bg-[#f2f2f2]">
          <Image 
            src="https://picsum.photos/seed/amarise-popup-bags/1000/1250" 
            alt="Amarisé Maison Avenue Collection" 
            fill 
            className="object-cover grayscale-[10%]"
            priority
          />
          <div className="absolute inset-0 bg-black/5" />
        </div>

        <div className="w-full md:w-[48%] p-10 md:p-16 flex flex-col justify-center text-center space-y-10 bg-white">
          <div className="space-y-3 text-center flex flex-col items-center">
            <span className="font-headline text-3xl font-bold tracking-[0.15em] text-black">
              AMARISÉ
            </span>
            <span className="text-[10px] font-bold tracking-[0.4em] text-gray-400 uppercase mt-1">
              Maison Avenue
            </span>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl md:text-[40px] font-headline font-medium text-gray-900 leading-[1.1] tracking-tight">
              A Private Invitation to the Archive
            </h2>
            <p className="text-sm text-gray-500 font-light italic leading-relaxed">
              Join our collector network for first access to the 1924 series and bespoke curatorial guidance.
            </p>
          </div>

          <form onSubmit={handleCollect} className="space-y-4 max-w-[320px] mx-auto w-full">
            <div className="space-y-3">
              <Input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="h-14 rounded-none border-gray-100 bg-[#fcfcfc] text-center text-xs font-bold tracking-widest placeholder:text-gray-300 focus:ring-black focus:border-black transition-all"
                required
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full h-14 bg-[#262626] text-white hover:bg-black rounded-none text-[11px] font-bold tracking-[0.3em] uppercase transition-all mt-4 shadow-xl"
            >
              REQUEST ACCESS <ArrowRight className="ml-3 w-4 h-4" />
            </Button>
          </form>

          <div className="pt-4 flex items-center justify-center space-x-3 text-secondary">
            <Sparkles className="w-4 h-4" />
            <p className="text-[10px] font-bold tracking-widest uppercase">
              Exclusivity Guaranteed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
