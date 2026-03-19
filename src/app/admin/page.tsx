'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Users, ShoppingCart, Heart } from 'lucide-react';

/**
 * Institutional Dashboard: Minimal Signal-First Terminal
 * Provides real-time yield and intent signals across global hubs.
 */
export default function AdminDashboard() {
  const hubs = [
    { name: 'USA Hub', revenue: '$425,000', intent: { cart: 45, wishlist: 120 }, conversion: '4.2%', insight: 'Strong momentum in Signature Bags.' },
    { name: 'UK Hub', revenue: '$280,000', intent: { cart: 22, wishlist: 85 }, conversion: '3.8%', insight: 'High interest in Heritage Complications.' },
    { name: 'UAE Hub', revenue: '$340,000', intent: { cart: 65, wishlist: 150 }, conversion: '5.1%', insight: 'High conversion window active.' },
    { name: 'IN Hub', revenue: '$120,000', intent: { cart: 18, wishlist: 42 }, conversion: '2.4%', insight: 'Market discovery phase stable.' },
    { name: 'SG Hub', revenue: '$180,000', intent: { cart: 28, wishlist: 64 }, conversion: '3.5%', insight: 'Engagement scaling in accessories.' },
  ];

  return (
    <div className="space-y-16 animate-fade-in pb-20">
      {/* 1. Tactical Top Bar - Primary Yield Signals */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/5 pb-12">
        <div className="flex space-x-24">
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Total Yield</p>
            <p className="text-4xl font-headline font-bold tracking-tighter text-white">$1,345,000</p>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Active Intent</p>
            <p className="text-4xl font-headline font-bold tracking-tighter text-white">1,420</p>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Resonance Index</p>
            <p className="text-4xl font-headline font-bold tracking-tighter text-white">4.2%</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">Real-time Node Status: Optimal</span>
        </div>
      </header>

      {/* 2. Center Section - Tactical Viewport */}
      <section className="relative h-[300px] w-full bg-[#111113] border border-white/5 rounded-sm flex items-center justify-center group overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent opacity-50" />
        <div className="relative z-10 text-center space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/10 group-hover:text-white/30 transition-all duration-1000">
            Tactical Global Intelligence
          </span>
          <div className="h-px w-32 bg-white/5 mx-auto group-hover:w-48 group-hover:bg-blue-500/20 transition-all duration-1000" />
        </div>
      </section>

      {/* 3. Bottom Grid - Jurisdictional Signal Nodes */}
      <div className="space-y-10">
        <div className="flex items-center space-x-4 text-white/30">
          <div className="h-px w-8 bg-current" />
          <h2 className="text-[10px] font-bold uppercase tracking-[0.5em]">Global Market Matrix</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {hubs.map((hub) => (
            <motion.div 
              key={hub.name} 
              whileHover={{ scale: 1.02 }}
              className="bg-[#111113] border border-white/5 p-8 hover:bg-[#18181B] transition-all duration-500 cursor-pointer group shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 flex flex-col justify-between h-full"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 group-hover:text-white/60 transition-colors">
                    {hub.name}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover:bg-blue-500 transition-colors shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                </div>
                
                <div className="space-y-1">
                  <p className="text-3xl font-headline font-bold text-white/90 group-hover:text-white transition-colors">{hub.revenue}</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/20">Jurisdictional Yield</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-white/60">{hub.intent.cart}</p>
                    <p className="text-[8px] font-bold uppercase tracking-tighter text-white/20 flex items-center">
                      <ShoppingCart className="w-2.5 h-2.5 mr-1 opacity-40" /> In Cart
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-white/60">{hub.intent.wishlist}</p>
                    <p className="text-[8px] font-bold uppercase tracking-tighter text-white/20 flex items-center">
                      <Heart className="w-2.5 h-2.5 mr-1 opacity-40" /> Saved
                    </p>
                  </div>
                </div>

                <div className="space-y-1 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/20">Yield Index</span>
                    <span className="text-[10px] font-bold text-blue-400">{hub.conversion}</span>
                  </div>
                  <div className="h-0.5 w-full bg-white/5 overflow-hidden">
                    <div className="h-full bg-blue-500/30 group-hover:bg-blue-500 transition-all duration-1000" style={{ width: hub.conversion }} />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5">
                <p className="text-[10px] text-white/40 italic font-light leading-relaxed">
                  "{hub.insight}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
