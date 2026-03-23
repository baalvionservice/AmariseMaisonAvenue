'use client';

import React, { useState } from 'react';
import { Sparkles, X, Plus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * JudyTrigger: The AI Autonomous Shopping Assistant.
 * Floating action that triggers a curatorial dialogue.
 */
export function JudyTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-10 left-10 z-[60] flex items-center space-x-4 bg-black text-white px-6 h-14 shadow-2xl transition-all hover:scale-105 active:scale-95 group border border-white/10",
          isOpen && "opacity-0 pointer-events-none"
        )}
      >
        <div className="relative">
          <Sparkles className="w-5 h-5 text-gold animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-black" />
        </div>
        <div className="flex flex-col items-start leading-none">
          <span className="font-headline text-lg italic lowercase">judy</span>
          <span className="text-[7px] font-bold uppercase tracking-widest opacity-60">Maison Assistant</span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            className="fixed bottom-10 left-10 z-[70] w-[380px] bg-white border border-gray-100 shadow-[0_30px_100px_rgba(0,0,0,0.2)] font-body overflow-hidden"
          >
            <div className="p-8 space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-headline text-3xl font-medium italic text-gray-900">Bonjour.</h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Curatorial Dialogue Active</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-50 transition-colors">
                  <X className="w-5 h-5 text-gray-300" />
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-sm text-gray-600 font-light italic leading-relaxed">
                  "I am Judy, the Maison's autonomous assistant. I can guide you through the 1924 series or assist with a private brief."
                </p>
                
                <div className="space-y-3">
                  <JudyOption label="How does Beton compare to Etoupe?" />
                  <JudyOption label="Show me Birkins under €30k" />
                  <JudyOption label="Initiate Private Curation" />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 relative">
                <input 
                  type="text" 
                  placeholder="Inquire with Judy..." 
                  className="w-full bg-[#fcfcfc] h-14 pl-6 pr-12 text-xs font-light italic border border-gray-100 focus:border-black transition-all outline-none"
                />
                <button className="absolute right-4 top-[3.25rem] text-gray-300 hover:text-black transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function JudyOption({ label }: { label: string }) {
  return (
    <button className="w-full text-left p-4 bg-[#fcfcfc] border border-gray-50 hover:border-black transition-all group flex items-center justify-between">
      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-black">{label}</span>
      <Plus className="w-3 h-3 text-gray-200 group-hover:text-black" />
    </button>
  );
}
