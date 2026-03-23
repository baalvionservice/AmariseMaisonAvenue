
'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { cn } from '@/lib/utils';

/**
 * MaisonPopup: Updated for high-ticket acquisition invitation.
 * Optimized for mobile responsiveness and viewport stability.
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-700" role="dialog" aria-labelledby="popup-title">
      <div className="relative w-full max-w-[940px] max-h-[90vh] overflow-y-auto bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col md:flex-row animate-in zoom-in-95 duration-500 rounded-sm custom-scrollbar">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-30 text-gray-400 hover:text-black transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center bg-white/80 rounded-full md:bg-transparent"
          type="button"
          aria-label="Close Private Invitation"
        >
          <X className="w-5 h-5 md:w-6 md:h-6 stroke-[1.5px]" />
        </button>

        <div className="relative w-full md:w-[52%] h-[200px] md:h-auto bg-[#f2f2f2] shrink-0">
          <PlaceholderImage className="absolute inset-0 w-full h-full border-none" />
          <div className="absolute inset-0 bg-black/5" />
        </div>

        <div className="w-full md:w-[48%] p-6 md:p-16 flex flex-col justify-center text-center space-y-6 md:space-y-10 bg-white">
          <div className="space-y-2 text-center flex flex-col items-center">
            <span className="font-headline text-2xl md:text-3xl font-bold tracking-[0.15em] text-black">
              AMARISÉ
            </span>
            <span className="text-[8px] md:text-[10px] font-bold tracking-[0.4em] text-gray-400 uppercase mt-1">
              Maison Avenue
            </span>
          </div>

          <div className="space-y-3 md:space-y-4">
            <h2 id="popup-title" className="text-2xl md:text-[40px] font-headline font-medium text-gray-900 leading-[1.1] tracking-tight">
              A Private Invitation to the Archive
            </h2>
            <p className="text-xs md:text-sm text-gray-500 font-light italic leading-relaxed">
              Join our collector network for first access to the 1924 series and bespoke curatorial guidance.
            </p>
          </div>

          <form onSubmit={handleCollect} className="space-y-4 max-w-[320px] mx-auto w-full">
            <div className="space-y-3">
              <Input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="h-12 md:h-14 rounded-none border-gray-100 bg-[#fcfcfc] text-center text-[10px] md:text-xs font-bold tracking-widest placeholder:text-gray-300 focus:ring-black focus:border-black transition-all"
                required
                aria-label="Collector Email Address"
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full h-12 md:h-14 bg-[#262626] text-white hover:bg-black rounded-none text-[10px] md:text-[11px] font-bold tracking-[0.3em] uppercase transition-all shadow-xl"
            >
              REQUEST ACCESS <ArrowRight className="ml-3 w-3 h-3 md:w-4 md:h-4" />
            </Button>
          </form>

          <div className="pt-2 md:pt-4 flex items-center justify-center space-x-2 md:space-x-3 text-secondary opacity-80 md:opacity-100">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-gold" />
            <p className="text-[8px] md:text-[10px] font-bold tracking-widest uppercase">
              Exclusivity Guaranteed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
