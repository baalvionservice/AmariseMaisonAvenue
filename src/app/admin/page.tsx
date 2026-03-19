'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Institutional Dashboard: Minimal Signal-First Terminal
 * Provides real-time yield and intent signals across global hubs.
 */
export default function AdminDashboard() {
  return (
    <div className="space-y-16 animate-fade-in pb-20">
      {/* 1. Tactical Top Bar - Primary Yield Signals */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/5 pb-12">
        <div className="flex space-x-24">
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Total Yield</p>
            <p className="text-4xl font-headline font-bold tracking-tighter text-white">$1,245,000</p>
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

      {/* 2. Center Section - Tactical Viewport (Placeholder) */}
      <section className="relative h-[450px] w-full bg-[#111113] border border-white/5 rounded-sm flex items-center justify-center group overflow-hidden shadow-2xl">
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
          {['USA Hub', 'UK Hub', 'UAE Hub', 'IN Hub', 'SG Hub'].map((hub) => (
            <motion.div 
              key={hub} 
              whileHover={{ scale: 1.02 }}
              className="bg-[#111113] border border-white/5 p-10 hover:bg-[#18181B] transition-all duration-700 cursor-pointer group shadow-sm hover:shadow-2xl hover:shadow-blue-500/5"
            >
              <div className="flex justify-between items-start mb-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 group-hover:text-white/60 transition-colors">
                  {hub}
                </span>
                <div className="w-1 h-1 rounded-full bg-white/10 group-hover:bg-blue-500 transition-colors" />
              </div>
              
              <div className="space-y-4">
                <div className="h-[1px] w-6 bg-white/5 group-hover:w-full group-hover:bg-blue-500 transition-all duration-1000" />
                <p className="text-2xl font-headline font-bold italic tracking-tight text-white/80 group-hover:text-white transition-colors">
                  Stable
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
