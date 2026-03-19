'use client';

import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  LayoutTemplate, 
  Target, 
  TrendingUp, 
  Globe, 
  Mail, 
  Zap, 
  BarChart3, 
  ChevronRight, 
  Settings,
  ShieldCheck,
  Building2,
  Users,
  CreditCard,
  History,
  ActivitySquare,
  DollarSign,
  Crown,
  BrainCircuit,
  Bell
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Badge } from "@/components/ui/badge";

export default function SuperAdminPanel() {
  const { privateInquiries, scopedNotifications, markNotificationRead } = useAppStore();

  const isSuperAdmin = true; 

  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-body text-gray-900">
      <aside className="w-72 border-r border-border bg-white p-8 flex flex-col space-y-12 shadow-sm z-20">
        <div className="space-y-4">
          <div className="font-headline text-3xl font-bold tracking-tighter text-gray-900">
            AMARISÉ <span className="text-plum text-xs font-normal tracking-[0.4em] ml-2">MASTER</span>
          </div>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Business OS v5.0</p>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          <AdminNavItem icon={<LayoutDashboard />} label="Intelligence" active={true} href="/admin" />
          <AdminNavItem icon={<BrainCircuit />} label="AI Autopilot" active={false} href="/admin/ai-dashboard" />
          <AdminNavItem icon={<LayoutTemplate />} label="Content (CMS)" active={false} href="/admin/content" />
          <AdminNavItem icon={<Target />} label="Sales (CRM)" active={false} href="/admin/sales" />
          <AdminNavItem icon={<Globe />} label="SEO Authority" active={false} href="/admin/seo" />
          <AdminNavItem icon={<Mail />} label="Outreach" active={false} href="/admin/messaging" />
          <AdminNavItem icon={<Zap />} label="Automation" active={false} href="/admin/automation" />
          
          <div className="pt-6 pb-2 px-6 text-[8px] font-bold uppercase tracking-widest text-gray-300">Department Hubs</div>
          <AdminNavItem icon={<CreditCard />} label="Finance Hub" active={false} href="/admin/finance" />
          <AdminNavItem icon={<Settings />} label="Operations Hub" active={false} href="/admin/operations" />

          {isSuperAdmin && (
            <>
              <div className="pt-6 pb-2 px-6 text-[8px] font-bold uppercase tracking-widest text-plum">Global Infrastructure</div>
              <AdminNavItem icon={<Crown />} label="Super Admin" active={false} href="/admin/super" />
            </>
          )}
        </nav>

        <div className="pt-8 border-t border-border space-y-4">
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
            <Link href="/us">
              <History className="w-4 h-4 mr-3" /> Exit Control
            </Link>
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-ivory relative">
        <header className="flex justify-between items-center bg-white/80 luxury-blur p-8 border-b border-border sticky top-0 z-30">
          <div>
            <h1 className="text-3xl font-headline font-bold italic text-gray-900 uppercase tracking-widest">Command Center</h1>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase font-bold mt-1">Platform Intelligence & Unit Economics</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="w-10 h-10 bg-plum rounded-sm flex items-center justify-center font-headline text-xl font-bold italic text-white shadow-md">MC</div>
          </div>
        </header>

        <div className="p-12 space-y-12 animate-fade-in pb-32">
          {/* Notifications Center */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4 text-plum" />
              <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Institutional Alerts</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scopedNotifications.slice(0, 3).map(note => (
                <Card key={note.id} className={cn(
                  "border-l-4 p-6 bg-white shadow-sm flex flex-col justify-between h-40",
                  note.type === 'alert' ? "border-l-red-500" : "border-l-green-500"
                )}>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400">{note.country.toUpperCase()} Market</span>
                      <span className="text-[8px] text-gray-300">{new Date(note.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-xs font-medium leading-relaxed">{note.message}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="self-end text-[9px] font-bold uppercase tracking-widest text-plum h-auto p-0"
                    onClick={() => markNotificationRead(note.id)}
                  >
                    Dismiss
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard icon={<DollarSign />} label="Estimated Rev." value="$1.2M" trend="+12.4%" positive />
            <StatCard icon={<Users />} label="Active Leads" value={privateInquiries.length.toString()} trend="High Value" positive />
            <StatCard icon={<ShieldCheck />} label="Registry Health" value="100%" trend="Optimal" positive />
            <StatCard icon={<ActivitySquare />} label="Conv. Rate" value="4.2%" trend="+0.8%" positive />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <Card className="lg:col-span-2 bg-white border-border shadow-luxury">
              <CardHeader className="border-b border-border">
                <CardTitle className="font-headline text-2xl">Maison System Health</CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest">Real-time status of business modules</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <ModuleStatus label="AI Autopilot" status="Active" progress={88} />
                <ModuleStatus label="Atelier CMS" status="Synchronized" progress={100} />
                <ModuleStatus label="Acquisition CRM" status="Live" progress={100} />
                <ModuleStatus label="SEO Authority Matrix" status="Indexing" progress={92} />
              </CardContent>
            </Card>

            <Card className="bg-black text-white p-10 space-y-10 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-6">
                <h3 className="text-3xl font-headline font-bold italic">Quick Actions</h3>
                <div className="space-y-4">
                  <Link href="/admin/ai-dashboard" className="block p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gold">Review AI Proposals</p>
                  </Link>
                  <Link href="/admin/sales" className="block p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gold">Review T1 Leads</p>
                  </Link>
                  <Link href="/admin/super" className="block p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-plum">Global Infrastructure</p>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function AdminNavItem({ icon, label, active, href }: { icon: any, label: string, active: boolean, href: string }) {
  return (
    <Link href={href}>
      <button className={cn(
        "w-full flex items-center space-x-4 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all group rounded-sm border",
        active ? "bg-plum text-white border-plum shadow-md" : "text-gray-400 hover:bg-ivory hover:text-plum border-transparent"
      )}>
        <span className={cn("transition-transform group-hover:scale-110", active ? "text-white" : "text-gold")}>
          {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
        </span>
        <span>{label}</span>
        {active && <ChevronRight className="w-4 h-4 ml-auto" />}
      </button>
    </Link>
  );
}

function StatCard({ icon, label, value, trend, positive }: { icon: any, label: string, value: string, trend: string, positive: boolean }) {
  return (
    <Card className="bg-white border-border shadow-luxury hover:border-gold transition-colors group">
      <CardContent className="p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div className="p-4 bg-ivory rounded-full group-hover:bg-gold/10 transition-colors text-plum">{icon}</div>
          <div className={cn("text-[10px] font-bold tracking-widest uppercase", positive ? "text-gold" : "text-red-500")}>
            {trend}
          </div>
        </div>
        <div>
          <div className="text-gray-400 text-[10px] uppercase tracking-[0.4em] font-bold">{label}</div>
          <div className="text-4xl font-headline font-bold italic mt-2 text-gray-900">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function ModuleStatus({ label, status, progress }: { label: string, status: string, progress: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
        <span className="text-gray-500">{label}</span>
        <span className="text-plum">{status}</span>
      </div>
      <div className="h-1 bg-ivory w-full overflow-hidden rounded-full">
        <div className="h-full bg-plum transition-all" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
