
'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Users, 
  Package, 
  ArrowUpRight, 
  ArrowRight,
  Clock,
  AlertCircle,
  Zap,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from '@/lib/store';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { NotificationFeed } from '@/components/admin/NotificationFeed';

/**
 * Admin Dashboard: Strategic Focus Terminal
 * Surfaces high-priority tasks and global KPIs for curators.
 */
export default function AdminDashboard() {
  const { products, privateInquiries, scopedNotifications, globalSettings } = useAppStore();

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <nav className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center space-x-2 mb-2">
            <span>Admin</span>
            <span className="text-slate-300">/</span>
            <span className="text-blue-600">Dashboard</span>
          </nav>
          <h1 className="text-3xl font-headline font-bold text-slate-900">Maison Command Center</h1>
          <p className="text-sm text-slate-500 max-w-2xl">Institutional oversight of the global registry, sales pipeline, and system health.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-widest text-[10px] h-11 px-6 rounded-md shadow-lg shadow-blue-600/20">
            <Zap className="w-4 h-4 mr-2" /> Daily Cycle
          </Button>
        </div>
      </header>

      {/* Strategic KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard label="Global Revenue" value="$1.24M" trend="+14.2%" trendUp={true} icon={<TrendingUp className="text-blue-600" />} />
        <KPICard label="Active Artifacts" value={products.length.toString()} trend="Registry Growth" trendUp={true} icon={<Package className="text-teal-500" />} />
        <KPICard label="Priority Leads" value={privateInquiries.filter(i => i.leadTier === 1).length.toString()} trend="Action Required" trendUp={false} icon={<Users className="text-amber-500" />} />
        <KPICard label="System Integrity" value="100%" trend="Optimal" trendUp={true} icon={<ShieldCheck className="text-emerald-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Curatorial Task Panel */}
        <Card className="lg:col-span-2 bg-white border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg font-bold text-slate-900">Urgent Task Registry</CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Actions requiring verification</CardDescription>
              </div>
              <Badge className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-3">Primary Focus</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              <TaskItem 
                icon={<Clock className="text-amber-500" />} 
                title="Pending Artifact Review" 
                desc="12 artifacts in UK Hub awaiting curatorial sign-off." 
                action="Review Now" 
                href="/admin/operations"
              />
              <TaskItem 
                icon={<AlertCircle className="text-red-500" />} 
                title="System Anomaly Detected" 
                desc="Lead routing failure in UAE market node. Immediate reset suggested." 
                action="Fix Anomaly" 
                href="/admin/errors"
              />
              <TaskItem 
                icon={<Users className="text-blue-600" />} 
                title="New Tier 1 Lead" 
                desc="High-net-worth inquiry for Heritage Birkin 1924 (Singapore)." 
                action="Open CRM" 
                href="/admin/sales"
              />
            </div>
            <div className="p-6 bg-slate-50 flex justify-center">
              <Button variant="ghost" className="text-slate-500 hover:text-blue-600 text-xs font-bold uppercase tracking-widest">
                View All Strategic Tasks <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Intelligence Pulse Feed */}
        <Card className="bg-white border-slate-200 shadow-sm flex flex-col">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-lg font-bold text-slate-900">Intelligence Pulse</CardTitle>
            <CardDescription className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Real-time system events</CardDescription>
          </CardHeader>
          <CardContent className="p-6 flex-1 overflow-y-auto custom-scrollbar">
            <NotificationFeed showTitle={false} maxItems={6} />
          </CardContent>
        </Card>
      </div>

      {/* Institutional Guide Placeholder */}
      {globalSettings.isGuideMode && (
        <Card className="bg-blue-600 text-white border-none shadow-2xl p-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 transition-transform group-hover:scale-110">
            <Zap size={160} />
          </div>
          <div className="relative z-10 max-w-xl space-y-6">
            <h3 className="text-3xl font-headline font-bold italic tracking-tight">Expand the Archive</h3>
            <p className="text-blue-100 text-sm font-light leading-relaxed">
              New to the Maison OS? Begin by registering a new artifact in the Atelier CMS. 
              Our AI Autopilot will automatically generate market-specific SEO descriptors for you.
            </p>
            <div className="pt-4">
              <Link href="/admin/content">
                <Button className="bg-white text-blue-600 hover:bg-blue-50 font-bold uppercase tracking-[0.2em] text-[10px] h-12 px-10 rounded-md">
                  Launch Workflow
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

function KPICard({ label, value, trend, trendUp, icon }: { label: string, value: string, trend: string, trendUp: boolean, icon: React.ReactNode }) {
  return (
    <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow group overflow-hidden">
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
            {icon}
          </div>
          <Badge variant="outline" className={cn(
            "text-[9px] uppercase tracking-widest border-transparent font-bold",
            trendUp ? "text-emerald-600 bg-emerald-50" : "text-amber-600 bg-amber-50"
          )}>
            {trend}
          </Badge>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
          <div className="flex items-baseline space-x-3">
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
            {trendUp && <ArrowUpRight className="w-4 h-4 text-emerald-500" />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TaskItem({ icon, title, desc, action, href }: { icon: React.ReactNode, title: string, desc: string, action: string, href: string }) {
  return (
    <div className="p-6 flex items-start justify-between group hover:bg-slate-50 transition-colors">
      <div className="flex space-x-5">
        <div className="mt-1">{icon}</div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-tight">{title}</h4>
          <p className="text-xs text-slate-500 font-light max-w-md">{desc}</p>
        </div>
      </div>
      <Link href={href}>
        <Button variant="outline" className="h-9 px-4 border-slate-200 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
          {action}
        </Button>
      </Link>
    </div>
  );
}
