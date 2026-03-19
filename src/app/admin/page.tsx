'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Users, ShoppingCart, Heart } from 'lucide-react';

/**
 * Institutional Dashboard: Minimal Signal-First Terminal
 * Provides real-time yield and intent signals across global hubs.
 * Refined with luxury styling and smooth motion states.
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
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="space-y-24 pb-32"
    >
      {/* 1. Tactical Top Bar - Primary Yield Signals */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/5 pb-16">
        <div className="flex space-x-24">
          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">Total Yield</p>
            <p className="text-5xl font-headline font-bold tracking-tighter text-white select-none">$1,345,000</p>
          </div>
          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">Active Intent</p>
            <p className="text-5xl font-headline font-bold tracking-tighter text-white select-none">1,420</p>
          </div>
          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">Resonance Index</p>
            <p className="text-5xl font-headline font-bold tracking-tighter text-white select-none">4.2%</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mb-1">
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Node Status: Optimal</span>
        </div>
      </header>

      {/* 2. Center Section - Tactical Viewport */}
      <section className="relative h-[320px] w-full bg-[#111113] border border-white/5 rounded-sm flex items-center justify-center group overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="relative z-10 text-center space-y-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.8em] text-white/10 group-hover:text-white/40 transition-all duration-1000 cursor-default">
            Tactical Global Intelligence
          </span>
          <div className="h-px w-24 bg-white/5 mx-auto group-hover:w-64 group-hover:bg-blue-500/30 transition-all duration-1000" />
        </div>
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </section>

      {/* 3. Bottom Grid - Jurisdictional Signal Nodes */}
      <div className="space-y-12">
        <div className="flex items-center space-x-6 text-white/20">
          <div className="h-px w-12 bg-current" />
          <h2 className="text-[10px] font-bold uppercase tracking-[0.6em]">Market Matrix</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {hubs.map((hub, idx) => (
            <motion.div 
              key={hub.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.6 }}
              whileHover={{ scale: 1.02, backgroundColor: '#18181B' }}
              className="bg-[#111113] border border-white/5 p-10 transition-all duration-500 cursor-pointer group shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 flex flex-col justify-between h-full min-h-[380px]"
            >
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 group-hover:text-white/60 transition-colors">
                    {hub.name}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-blue-500/40 group-hover:bg-blue-500 transition-colors shadow-[0_0_12px_rgba(59,130,246,0.4)]" />
                </div>
                
                <div className="space-y-2">
                  <p className="text-4xl font-headline font-bold text-white/90 group-hover:text-white transition-colors tracking-tighter">{hub.revenue}</p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/20">Yield Index</p>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-white/60 group-hover:text-white transition-colors">{hub.intent.cart}</p>
                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/20 flex items-center">
                      <ShoppingCart className="w-3 h-3 mr-2 opacity-40 group-hover:text-blue-500 transition-colors" /> In Cart
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-white/60 group-hover:text-white transition-colors">{hub.intent.wishlist}</p>
                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/20 flex items-center">
                      <Heart className="w-3 h-3 mr-2 opacity-40 group-hover:text-blue-500 transition-colors" /> Saved
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">Yield Index</span>
                    <span className="text-[11px] font-bold text-blue-400/80 group-hover:text-blue-400 transition-colors">{hub.conversion}</span>
                  </div>
                  <div className="h-0.5 w-full bg-white/5 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: hub.conversion }}
                      transition={{ delay: 0.5 + (0.1 * idx), duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-blue-500/30 group-hover:bg-blue-500 transition-all duration-700" 
                    />
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-white/5">
                <p className="text-[11px] text-white/40 italic font-light leading-relaxed group-hover:text-white/60 transition-colors">
                  "{hub.insight}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
