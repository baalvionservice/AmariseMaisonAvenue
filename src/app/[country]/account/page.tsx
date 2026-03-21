'use client';

import React, { useMemo } from 'react';
import { useAppStore } from '@/lib/store';
import { 
  Crown, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Clock, 
  ChevronRight,
  ArrowRight,
  Package,
  Star,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ConnoisseurDashboard() {
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  const { currentUser, transactions, privateInquiries } = useAppStore();

  const stats = useMemo(() => {
    return {
      loyaltyPoints: 12500,
      nextTierAt: 15000,
      activeAcquisitions: transactions.filter(t => t.status !== 'Closed').length,
      curatorialSignals: privateInquiries.filter(i => i.status === 'closing').length,
    };
  }, [transactions, privateInquiries]);

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-plum">Maison Client Portal</span>
          <h1 className="text-5xl font-headline font-bold italic text-gray-900 tracking-tight">Bonjour, {currentUser?.name.split(' ')[0]}</h1>
          <p className="text-gray-500 font-light italic">"A testament to your pursuit of human brilliance."</p>
        </div>
        <div className="flex items-center space-x-4">
           <Badge variant="outline" className="bg-plum/5 text-plum border-plum/20 h-10 px-6 rounded-none text-[10px] font-bold uppercase tracking-widest">
             Diamond Connoisseur
           </Badge>
        </div>
      </header>

      {/* Overview Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-white border-border shadow-luxury p-8 space-y-6 group hover:border-plum transition-all">
           <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Resonance Score</span>
              <Star className="w-5 h-5 text-gold fill-gold" />
           </div>
           <div className="text-4xl font-headline font-bold italic text-gray-900">{stats.loyaltyPoints.toLocaleString()}</div>
           <div className="space-y-2">
              <div className="flex justify-between text-[9px] font-bold uppercase">
                 <span className="text-gray-400">Next Plateau</span>
                 <span className="text-plum">{stats.nextTierAt.toLocaleString()}</span>
              </div>
              <Progress value={(stats.loyaltyPoints / stats.nextTierAt) * 100} className="h-1 bg-ivory" />
           </div>
        </Card>

        <Card className="bg-white border-border shadow-luxury p-8 space-y-6 group hover:border-plum transition-all">
           <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Open Acquisitions</span>
              <Package className="w-5 h-5 text-plum" />
           </div>
           <div className="text-4xl font-headline font-bold italic text-gray-900">{stats.activeAcquisitions}</div>
           <p className="text-[10px] text-gray-400 italic">Tracking artifacts in transit.</p>
        </Card>

        <Card className="bg-white border-border shadow-luxury p-8 space-y-6 group hover:border-plum transition-all">
           <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Curator Signals</span>
              <Zap className="w-5 h-5 text-plum" />
           </div>
           <div className="text-4xl font-headline font-bold italic text-gray-900">{stats.curatorialSignals}</div>
           <p className="text-[10px] text-gray-400 italic">Direct responses from the atelier.</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Recent Activity Ledger */}
        <div className="lg:col-span-8 space-y-8">
           <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-sm font-headline font-bold uppercase tracking-widest">Acquisition Pulse</h3>
              <Link href={`/${countryCode}/account/acquisitions`} className="text-[9px] font-bold uppercase tracking-widest text-plum hover:text-gold transition-colors">View All History</Link>
           </div>
           
           <div className="bg-white border border-border shadow-sm divide-y divide-border">
              {transactions.slice(0, 4).map(tx => (
                <div key={tx.id} className="p-6 flex items-center justify-between hover:bg-ivory/30 transition-colors">
                   <div className="flex items-center space-x-6">
                      <div className="p-3 bg-plum/5 rounded-full text-plum"><Package className="w-4 h-4" /></div>
                      <div>
                         <p className="text-sm font-bold uppercase tracking-tight text-gray-900">Maison Archive Transfer</p>
                         <p className="text-[9px] text-gray-400 uppercase tracking-widest">ID: {tx.id}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">${tx.amount.toLocaleString()}</p>
                      <Badge variant="outline" className="text-[8px] uppercase tracking-tighter border-green-100 text-green-600 bg-green-50">{tx.status}</Badge>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Private Selection Highlight */}
        <aside className="lg:col-span-4 space-y-8">
           <Card className="bg-black text-white p-10 space-y-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none"><Crown className="w-32 h-32" /></div>
              <div className="space-y-4">
                 <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">VIP Insight</h4>
                 <p className="text-sm font-light italic leading-relaxed opacity-70">
                   "Based on your recent interest in high-complication horology, the 1924 Heritage Complications have been added to your private preview list."
                 </p>
              </div>
              <Button variant="outline" className="w-full border-gold/40 text-gold rounded-none text-[9px] font-bold uppercase h-12 hover:bg-gold hover:text-black">
                 ACCESS PREVIEW
              </Button>
           </Card>

           <Card className="bg-white border-border p-8 space-y-6 shadow-sm">
              <div className="flex items-center space-x-3 text-plum">
                 <ShieldCheck className="w-5 h-5" />
                 <h4 className="text-[10px] font-bold uppercase tracking-widest">Identity Status</h4>
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest border-b border-border pb-2">
                    <span className="text-gray-400">KYC Verification</span>
                    <span className="text-green-600">VERIFIED</span>
                 </div>
                 <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest border-b border-border pb-2">
                    <span className="text-gray-400">Asset Authorization</span>
                    <span className="text-plum">ACTIVE</span>
                 </div>
              </div>
           </Card>
        </aside>
      </div>
    </div>
  );
}
