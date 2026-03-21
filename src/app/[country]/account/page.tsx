
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
  Sparkles,
  Search,
  LayoutDashboard,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';

/**
 * Connoisseur Dashboard: Persona-Aware Environment.
 * Routes to "Private Salon" (Premium) or "Institutional Registry" (Normal) view logic.
 */
export default function ConnoisseurDashboard() {
  const { country } = useParams();
  const countryCode = (country as string) || 'us';
  const { currentUser, transactions, privateInquiries, activeVip } = useAppStore();

  const isPremium = useMemo(() => 
    activeVip?.tier === 'Diamond' || activeVip?.tier === 'Gold',
  [activeVip]);

  const stats = useMemo(() => {
    return {
      loyaltyPoints: activeVip?.loyaltyPoints || 0,
      nextTierAt: 15000,
      activeAcquisitions: transactions.filter(t => t.status !== 'Closed').length,
      curatorialSignals: privateInquiries.filter(i => i.status === 'closing').length,
    };
  }, [transactions, privateInquiries, activeVip]);

  if (isPremium) {
    return <PremiumSalonDashboard countryCode={countryCode} stats={stats} transactions={transactions} currentUser={currentUser} />;
  }

  return <NormalRegistryDashboard countryCode={countryCode} stats={stats} transactions={transactions} currentUser={currentUser} />;
}

/**
 * Design B: The Private Salon (Premium)
 */
function PremiumSalonDashboard({ countryCode, stats, transactions, currentUser }: any) {
  return (
    <div className="space-y-12 animate-fade-in">
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-plum">Maison Private Salon</span>
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
        <DashboardCard label="Resonance Score" value={stats.loyaltyPoints.toLocaleString()} icon={<Star className="w-5 h-5 text-gold fill-gold" />}>
           <div className="space-y-2">
              <div className="flex justify-between text-[9px] font-bold uppercase">
                 <span className="text-gray-400">Next Plateau</span>
                 <span className="text-plum">{stats.nextTierAt.toLocaleString()}</span>
              </div>
              <Progress value={(stats.loyaltyPoints / stats.nextTierAt) * 100} className="h-1 bg-ivory" />
           </div>
        </DashboardCard>

        <DashboardCard label="Open Acquisitions" value={stats.activeAcquisitions} icon={<Package className="w-5 h-5 text-plum" />}>
           <p className="text-[10px] text-gray-400 italic">Tracking artifacts in transit.</p>
        </DashboardCard>

        <DashboardCard label="Curator Signals" value={stats.curatorialSignals} icon={<Zap className="w-5 h-5 text-plum" />}>
           <p className="text-[10px] text-gray-400 italic">Direct responses from the atelier.</p>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
           <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-sm font-headline font-bold uppercase tracking-widest">Acquisition Pulse</h3>
              <Link href={`/${countryCode}/account/acquisitions`} className="text-[9px] font-bold uppercase tracking-widest text-plum hover:text-gold transition-colors">View All History</Link>
           </div>
           
           <div className="bg-white border border-border shadow-sm divide-y divide-border">
              {transactions.slice(0, 4).map((tx: any) => (
                <div key={tx.id} className="p-6 flex items-center justify-between hover:bg-ivory/30 transition-colors">
                   <div className="flex items-center space-x-6">
                      <div className="p-3 bg-plum/5 rounded-full text-plum"><Package className="w-4 h-4" /></div>
                      <div>
                         <p className="text-sm font-bold uppercase tracking-tight text-gray-900">{tx.artifactName || 'Maison Archive Transfer'}</p>
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
        </aside>
      </div>
    </div>
  );
}

/**
 * Design A: The Institutional Registry (Normal)
 */
function NormalRegistryDashboard({ countryCode, stats, transactions, currentUser }: any) {
  return (
    <div className="space-y-12 animate-fade-in">
      <header className="flex justify-between items-end border-b border-border pb-10">
        <div className="space-y-2">
          <div className="flex items-center space-x-3 mb-2">
             <div className="p-2 bg-slate-100 rounded-none text-slate-400 border border-slate-200"><LayoutDashboard className="w-4 h-4" /></div>
             <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-400">Institutional Registry</span>
          </div>
          <h1 className="text-4xl font-headline font-bold text-gray-900 uppercase tracking-tight">Account Overview</h1>
          <p className="text-sm text-gray-500 font-light italic">Managing {currentUser?.name}'s collection registry.</p>
        </div>
        <Badge variant="outline" className="bg-slate-50 text-slate-500 border-slate-200 h-9 px-4 rounded-none text-[9px] font-bold uppercase tracking-widest">
          Standard Collector
        </Badge>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <RegistryStat label="Active Orders" value={stats.activeAcquisitions} icon={<Package className="w-4 h-4" />} />
         <RegistryStat label="Registry Points" value={stats.loyaltyPoints} icon={<Star className="w-4 h-4" />} />
         <RegistryStat label="Open Tickets" value={0} icon={<MessageSquare className="w-4 h-4" />} />
         <RegistryStat label="Compliance" value="Verified" icon={<ShieldCheck className="w-4 h-4" />} color="text-green-600" />
      </div>

      <div className="space-y-6">
         <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">RECENT ACQUISITIONS</h3>
         <div className="bg-white border border-border shadow-sm overflow-hidden">
            {transactions.length > 0 ? (
              <div className="divide-y divide-border">
                {transactions.slice(0, 3).map((tx: any) => (
                  <div key={tx.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                     <div className="flex items-center space-x-6">
                        <div className="w-10 h-12 bg-slate-100 flex items-center justify-center text-[6px] font-bold text-slate-400 uppercase border border-slate-200">Asset</div>
                        <div>
                           <p className="text-xs font-bold uppercase tracking-tight text-gray-900">{tx.artifactName || 'Acquisition Entry'}</p>
                           <p className="text-[9px] text-gray-400 font-mono">REF: {tx.id}</p>
                        </div>
                     </div>
                     <Badge variant="outline" className="text-[8px] uppercase tracking-widest">{tx.status}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center opacity-30">
                 <p className="text-[10px] font-bold uppercase tracking-widest italic">Registry empty.</p>
              </div>
            )}
            <Link href={`/${countryCode}/account/acquisitions`} className="block bg-slate-50 p-4 text-center border-t border-border group">
               <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-gray-900 transition-colors">View All Registry Entries</span>
            </Link>
         </div>
      </div>
    </div>
  );
}

function DashboardCard({ label, value, icon, children }: any) {
  return (
    <Card className="bg-white border-border shadow-luxury p-8 space-y-6 group hover:border-plum transition-all">
       <div className="flex justify-between items-start">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-plum transition-colors">{label}</span>
          {icon}
       </div>
       <div className="text-4xl font-headline font-bold italic text-gray-900">{value}</div>
       {children}
    </Card>
  );
}

function RegistryStat({ label, value, icon, color = "text-gray-900" }: any) {
  return (
    <Card className="bg-white border-border shadow-sm p-6 flex flex-col items-center justify-center space-y-3 hover:border-slate-900 transition-all">
       <div className="p-2 bg-slate-50 rounded-full text-slate-400">{icon}</div>
       <div className="text-center">
          <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400 mb-1">{label}</p>
          <p className={cn("text-xl font-headline font-bold", color)}>{value}</p>
       </div>
    </Card>
  );
}
