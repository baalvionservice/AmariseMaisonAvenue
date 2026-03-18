'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ShieldCheck, 
  Activity, 
  PieChart, 
  Globe, 
  Zap, 
  ChevronRight, 
  LogOut,
  LayoutDashboard,
  Target,
  RefreshCcw,
  BarChart3,
  Search,
  Eye,
  MessageSquare,
  Filter,
  Crown,
  Clock,
  Send,
  MoreVertical
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from '@/lib/store';
import { MOCK_REVENUE_METRICS } from '@/lib/mock-monetization';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RevenueDashboard() {
  const { privateInquiries, leadConversations, updateInquiryStatus } = useAppStore();
  const metrics = MOCK_REVENUE_METRICS;
  
  const [filterTier, setFilterTier] = useState<string>('all');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  const filteredInquiries = useMemo(() => {
    if (filterTier === 'all') return privateInquiries;
    return privateInquiries.filter(i => i.leadTier.toString() === filterTier);
  }, [privateInquiries, filterTier]);

  const selectedLead = useMemo(() => 
    privateInquiries.find(i => i.id === selectedLeadId), 
    [privateInquiries, selectedLeadId]
  );

  const activeConversation = useMemo(() => 
    leadConversations.find(c => c.inquiryId === selectedLeadId),
    [leadConversations, selectedLeadId]
  );

  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-body text-gray-900">
      <aside className="w-72 border-r border-border bg-white p-8 flex flex-col space-y-12 shadow-sm z-20">
        <div className="space-y-4">
          <div className="font-headline text-3xl font-bold tracking-tighter text-gray-900">
            AMARISÉ <span className="text-plum text-xs font-normal tracking-[0.4em] ml-2">SALES</span>
          </div>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Acquisition Terminal</p>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          <RevenueNavItem icon={<LayoutDashboard />} label="Revenue Matrix" active={true} />
          <RevenueNavItem icon={<Target />} label="Lead Terminal" active={false} />
          <RevenueNavItem icon={<Zap />} label="Service Performance" active={false} />
          <RevenueNavItem icon={<Globe />} label="Market Distribution" active={false} />
          <RevenueNavItem icon={<BarChart3 />} label="Forecasts" active={false} />
        </nav>

        <div className="pt-8 border-t border-border space-y-4">
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
            <Link href="/admin">
              <RefreshCcw className="w-4 h-4 mr-3" /> Master Control
            </Link>
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-ivory relative">
        <header className="flex justify-between items-center bg-white/80 luxury-blur p-8 border-b border-border sticky top-0 z-30">
          <div>
            <h1 className="text-3xl font-headline font-bold italic text-gray-900 uppercase tracking-widest">Acquisition Hub</h1>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase font-bold mt-1">Lead Lifecycle & Conversational CRM</p>
          </div>
          <div className="flex items-center space-x-6">
             <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/5 px-4 py-2 border border-gold/10">
                <Crown className="w-4 h-4" />
                <span>Curatorial Access</span>
             </div>
            <div className="w-10 h-10 bg-plum rounded-sm flex items-center justify-center font-headline text-xl font-bold italic text-white shadow-md">AS</div>
          </div>
        </header>

        <div className="p-12 space-y-12 animate-fade-in pb-32">
          {/* Top Line Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard icon={<DollarSign />} label="Estimated Value" value={`$${(metrics.totalAcquisitionValue / 1000000).toFixed(1)}M`} trend="+12.4%" positive />
            <StatCard icon={<Users />} label="Active Leads" value={privateInquiries.length.toString()} trend="High Tier Focus" positive />
            <StatCard icon={<ShieldCheck />} label="Verified Registry" value="100%" trend="Compliance" positive />
            <StatCard icon={<Target />} label="Conv. Rate" value={`${metrics.conversionRate}%`} trend="Target: 5%" positive />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Leads Table */}
            <Card className="lg:col-span-8 bg-white border-border shadow-luxury overflow-hidden">
              <CardHeader className="border-b border-border flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-headline text-2xl">Acquisition Leads</CardTitle>
                  <CardDescription className="text-[10px] uppercase tracking-widest">Private curatorial requests feed</CardDescription>
                </div>
                <div className="flex items-center space-x-4">
                   <div className="relative group">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-300" />
                      <input className="bg-ivory border border-border h-8 pl-8 pr-4 text-[9px] font-bold uppercase tracking-widest outline-none w-40" placeholder="SEARCH LEAD" />
                   </div>
                   <select 
                    className="bg-white border border-border h-8 px-3 text-[9px] font-bold uppercase tracking-widest outline-none"
                    value={filterTier}
                    onChange={(e) => setFilterTier(e.target.value)}
                   >
                      <option value="all">All Tiers</option>
                      <option value="1">Tier 1 (Elite)</option>
                      <option value="2">Tier 2 (Strategic)</option>
                      <option value="3">Tier 3 (Discovery)</option>
                   </select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-ivory/50">
                    <TableRow>
                      <TableHead className="text-[9px] uppercase font-bold pl-8">Connoisseur</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold">Market</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold">Intent</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-center">Tier</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-center">Status</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-right pr-8">View</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInquiries.length > 0 ? filteredInquiries.map(inq => (
                      <TableRow 
                        key={inq.id} 
                        className={cn("hover:bg-ivory/30 cursor-pointer transition-colors", selectedLeadId === inq.id && "bg-plum/5")}
                        onClick={() => setSelectedLeadId(inq.id)}
                      >
                        <TableCell className="pl-8">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold leading-tight uppercase tracking-tight">{inq.customerName}</span>
                            <span className="text-[8px] text-gray-400 uppercase tracking-widest">{inq.email}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-[10px] uppercase tracking-widest font-bold">{inq.country}</TableCell>
                        <TableCell><Badge variant="outline" className="text-[8px] uppercase tracking-widest border-border text-gray-500">{inq.intent}</Badge></TableCell>
                        <TableCell className="text-center">
                          <div className={cn(
                            "inline-flex items-center justify-center w-6 h-6 rounded-full text-[9px] font-bold border",
                            inq.leadTier === 1 ? "bg-gold/10 border-gold text-gold" : 
                            inq.leadTier === 2 ? "bg-plum/5 border-plum text-plum" : 
                            "bg-gray-50 border-border text-gray-400"
                          )}>
                            {inq.leadTier}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={cn("text-[8px] uppercase tracking-widest", 
                            inq.status === 'new' ? 'bg-red-50 text-red-600' : 
                            inq.status === 'contacted' ? 'bg-gold/10 text-gold' : 
                            'bg-green-50 text-green-600'
                          )}>
                            {inq.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-8">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-plum"><ChevronRight className="w-4 h-4" /></Button>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={6} className="py-32 text-center text-gray-400 italic text-sm">No artifacts found in this acquisition cycle.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Conversation/CRM Sidebar */}
            <Card className="lg:col-span-4 bg-white border-border shadow-luxury h-[700px] flex flex-col">
              {selectedLead ? (
                <>
                  <CardHeader className="border-b border-border bg-ivory/30">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                           <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">LEAD ID: {selectedLead.id}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        </div>
                        <CardTitle className="font-headline text-xl">{selectedLead.customerName}</CardTitle>
                      </div>
                      <Badge className="bg-plum text-white text-[8px] uppercase tracking-[0.2em]">Tier {selectedLead.leadTier}</Badge>
                    </div>
                  </CardHeader>
                  
                  <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-ivory/10">
                    <div className="p-4 bg-white border border-border space-y-2">
                       <span className="text-[8px] font-bold uppercase tracking-widest text-plum">Primary Intent</span>
                       <p className="text-xs italic font-light leading-relaxed">"{selectedLead.message}"</p>
                    </div>

                    <div className="space-y-4">
                       <div className="flex items-center space-x-2 text-[9px] font-bold uppercase tracking-widest text-gray-400">
                          <MessageSquare className="w-3 h-3" />
                          <span>Curatorial Dialogue</span>
                       </div>
                       
                       {activeConversation?.messages.map(m => (
                         <div key={m.id} className={cn("flex flex-col space-y-1", m.sender === 'curator' ? 'items-end' : 'items-start')}>
                            <div className={cn("max-w-[85%] p-4 text-[11px] leading-relaxed shadow-sm border", 
                              m.sender === 'curator' ? 'bg-plum text-white border-plum' : 'bg-white text-gray-700 border-border'
                            )}>
                               {m.text}
                            </div>
                            <span className="text-[7px] text-gray-300 uppercase tracking-tighter">{new Date(m.timestamp).toLocaleTimeString()}</span>
                         </div>
                       ))}
                    </div>
                  </div>

                  <div className="p-6 border-t border-border bg-white space-y-4">
                    <div className="flex space-x-2">
                       <Button 
                        variant="outline" 
                        className="flex-1 h-10 border-border text-[9px] font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all"
                        onClick={() => updateInquiryStatus(selectedLead.id, 'contacted')}
                       >
                         <Send className="w-3 h-3 mr-2" /> DISPATCH WHATSAPP
                       </Button>
                       <Button 
                        variant="outline" 
                        className="h-10 border-border text-gray-400"
                        onClick={() => updateInquiryStatus(selectedLead.id, 'closed')}
                       >
                         <ShieldCheck className="w-4 h-4" />
                       </Button>
                    </div>
                    <p className="text-[8px] text-center text-gray-400 italic">Discreet acquisition protocols enforced.</p>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6">
                   <div className="p-8 bg-ivory border border-border rounded-full animate-pulse">
                      <Users className="w-10 h-10 text-gold/30" />
                   </div>
                   <div className="space-y-2">
                      <h3 className="font-headline text-2xl italic text-gray-900">Maison Select</h3>
                      <p className="text-xs text-gray-400 font-light max-w-[200px] mx-auto">Select a lead from the registry to begin curatorial guidance.</p>
                   </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function RevenueNavItem({ icon, label, active }: { icon: any, label: string, active: boolean }) {
  return (
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
  );
}

function StatCard({ icon, label, value, trend, positive }: { icon: any, label: string, value: string, trend: string, positive: boolean }) {
  return (
    <Card className="bg-white border-border shadow-luxury hover:border-gold transition-colors group">
      <CardContent className="p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div className="p-4 bg-ivory rounded-full group-hover:bg-gold/10 transition-colors text-plum">{icon}</div>
          <div className={cn("text-[10px] font-bold tracking-widest uppercase", positive ? "text-gold" : "text-red-500")}>
            {trend} {positive && <ArrowUpRight className="ml-1 w-3 h-3 inline" />}
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
