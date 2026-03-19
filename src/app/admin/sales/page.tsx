'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Target, 
  Users, 
  Crown, 
  MessageSquare, 
  ChevronRight, 
  Globe, 
  LogOut,
  LayoutDashboard,
  RefreshCcw,
  Search,
  Filter,
  TrendingUp,
  Award,
  Lock,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from '@/lib/store';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { cn } from '@/lib/utils';
import { CuratorChat } from '@/components/sales/CuratorChat';
import { useSearch } from '@/hooks/use-search';

type SalesTab = 'leads' | 'conversations' | 'performance' | 'strategy';

export default function AdminSalesHub() {
  const [activeTab, setActiveTab] = useState<SalesTab>('leads');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const { privateInquiries, updateInquiryStatus } = useAppStore();

  // Integrated Advanced Search
  const filteredLeads = useSearch(privateInquiries, searchQuery, { status: statusFilter });

  const sortedLeads = useMemo(() => {
    return [...filteredLeads].sort((a, b) => a.leadTier - b.leadTier);
  }, [filteredLeads]);

  const selectedLead = useMemo(() => 
    privateInquiries.find(i => i.id === selectedLeadId), 
    [privateInquiries, selectedLeadId]
  );

  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-body text-gray-900">
      {/* Sidebar */}
      <aside className="w-72 border-r border-border bg-white p-8 flex flex-col space-y-12 shadow-sm z-20">
        <div className="space-y-4">
          <div className="font-headline text-3xl font-bold tracking-tighter text-gray-900">
            AMARISÉ <span className="text-plum text-xs font-normal tracking-[0.4em] ml-2">CLOSER</span>
          </div>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Sales Intelligence Suite</p>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          <SalesNavItem icon={<LayoutDashboard />} label="Lead Terminal" active={activeTab === 'leads'} onClick={() => setActiveTab('leads')} />
          <SalesNavItem icon={<MessageSquare />} label="Dialogue Feed" active={activeTab === 'conversations'} onClick={() => setActiveTab('conversations')} />
          <SalesNavItem icon={<TrendingUp />} label="Closing Velocity" active={activeTab === 'performance'} onClick={() => setActiveTab('performance')} />
          <SalesNavItem icon={<Target />} label="Scripts & Strategy" active={activeTab === 'strategy'} onClick={() => setActiveTab('strategy')} />
        </nav>

        <div className="pt-8 border-t border-border space-y-4">
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
            <Link href="/admin">
              <RefreshCcw className="w-4 h-4 mr-3" /> Master Control
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
            <Link href="/us">
              <LogOut className="w-4 h-4 mr-3" /> Exit Hub
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-ivory relative">
        <header className="flex justify-between items-center bg-white/80 luxury-blur p-8 border-b border-border sticky top-0 z-30">
          <div>
            <h1 className="text-3xl font-headline font-bold italic text-gray-900 uppercase tracking-widest">
              {activeTab}
            </h1>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase font-bold mt-1">
              High-Ticket Acquisition Oversight
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4 bg-plum/5 px-4 py-2 border border-plum/10 rounded-sm">
               <Crown className="w-4 h-4 text-plum" />
               <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Elite Portfolio</span>
                  <span className="text-[9px] text-gray-400">12 Pending T1 Leads</span>
               </div>
            </div>
            <div className="w-10 h-10 bg-plum rounded-sm flex items-center justify-center font-headline text-xl font-bold italic text-white shadow-md">AS</div>
          </div>
        </header>

        <div className="p-12 space-y-12 animate-fade-in pb-32">
          {activeTab === 'leads' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Leads List */}
              <Card className="lg:col-span-7 bg-white border-border shadow-luxury overflow-hidden">
                <CardHeader className="border-b border-border flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                  <div>
                    <CardTitle className="font-headline text-2xl">Active Acquisition Leads</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest">Global registry of private intent</CardDescription>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
                      <input 
                        className="bg-ivory border border-border h-10 pl-10 pr-4 text-[10px] font-bold uppercase tracking-widest outline-none w-48 focus:ring-1 focus:ring-plum transition-all" 
                        placeholder="SEARCH CONNOISSEURS" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-plum">
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Filter className="w-3.5 h-3.5 text-gray-400" />
                      <select 
                        className="bg-white border border-border h-10 px-3 text-[9px] font-bold uppercase tracking-widest outline-none cursor-pointer focus:ring-1 focus:ring-plum"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="all">ALL STAGES</option>
                        <option value="new">NEW</option>
                        <option value="contacted">CONTACTED</option>
                        <option value="qualifying">QUALIFYING</option>
                        <option value="presenting">PRESENTING</option>
                        <option value="closing">CLOSING</option>
                        <option value="won">WON</option>
                      </select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-ivory/50">
                      <TableRow>
                        <TableHead className="text-[9px] uppercase font-bold pl-8">Connoisseur</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold text-center">Tier</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold">Status</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold text-right pr-8">Oversight</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedLeads.length > 0 ? sortedLeads.map(lead => (
                        <TableRow 
                          key={lead.id} 
                          className={cn("hover:bg-ivory/30 cursor-pointer transition-colors", selectedLeadId === lead.id && "bg-plum/5")}
                          onClick={() => setSelectedLeadId(lead.id)}
                        >
                          <TableCell className="pl-8">
                            <div className="flex flex-col">
                              <span className="text-xs font-bold leading-tight uppercase tracking-tight">{lead.customerName}</span>
                              <span className="text-[8px] text-gray-400 uppercase tracking-widest">{lead.country} Hub</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className={cn(
                              "inline-flex items-center justify-center w-6 h-6 rounded-full text-[9px] font-bold border",
                              lead.leadTier === 1 ? "bg-gold/10 border-gold text-gold shadow-sm" : 
                              lead.leadTier === 2 ? "bg-plum/5 border-plum text-plum" : 
                              "bg-gray-50 border-border text-gray-400"
                            )}>
                              {lead.leadTier}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={cn("text-[8px] uppercase tracking-widest", 
                              lead.status === 'closing' ? 'bg-red-50 text-red-600' : 
                              lead.status === 'won' ? 'bg-green-50 text-green-600' : 
                              'bg-gold/10 text-gold'
                            )}>
                              {lead.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right pr-8">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-plum"><ChevronRight className="w-4 h-4" /></Button>
                          </TableCell>
                        </TableRow>
                      )) : (
                        <TableRow>
                          <TableCell colSpan={4} className="py-20 text-center">
                            <div className="flex flex-col items-center space-y-4 opacity-20">
                              <Search className="w-12 h-12" />
                              <p className="text-xs font-bold uppercase tracking-[0.2em]">No results found in current registry</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Oversight Sidebar */}
              <div className="lg:col-span-5 space-y-8">
                {selectedLead ? (
                  <Card className="bg-white border-border shadow-luxury overflow-hidden">
                    <CardHeader className="border-b border-border bg-ivory/30">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">LEAD OVERVIEW</span>
                          <CardTitle className="font-headline text-xl uppercase tracking-tight">{selectedLead.customerName}</CardTitle>
                        </div>
                        <Badge className="bg-plum text-white text-[8px] uppercase tracking-[0.2em]">TIER {selectedLead.leadTier}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                      <div className="space-y-4">
                        <h4 className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Acquisition Stage</h4>
                        <div className="flex gap-2 flex-wrap">
                          {['contacted', 'qualifying', 'presenting', 'closing', 'won'].map(stage => (
                            <Button 
                              key={stage}
                              variant={selectedLead.status === stage ? 'default' : 'outline'}
                              size="sm"
                              className={cn(
                                "h-8 px-4 rounded-none text-[8px] font-bold uppercase tracking-widest",
                                selectedLead.status === stage ? "bg-plum hover:bg-plum" : "border-border text-gray-400"
                              )}
                              onClick={() => updateInquiryStatus(selectedLead.id, stage as any)}
                            >
                              {stage}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 bg-ivory border border-border space-y-4">
                        <div className="flex items-center space-x-3 text-plum">
                          <MessageSquare className="w-4 h-4" />
                          <h4 className="text-[10px] font-bold uppercase tracking-widest">Active Dialogue</h4>
                        </div>
                        <p className="text-[11px] text-gray-500 font-light italic leading-relaxed">
                          Review the latest curatorial transcript below to ensure strategic alignment.
                        </p>
                        <Button 
                          variant="outline" 
                          className="w-full h-10 border-black text-[9px] font-bold uppercase tracking-widest hover:bg-black hover:text-white"
                          asChild
                        >
                          <Link href={`/${selectedLead.country.toLowerCase()}/inquiry/${selectedLead.id}`}>
                            ENTER SECURE CHAT
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="h-64 border-2 border-dashed border-border flex flex-col items-center justify-center p-8 text-center space-y-4">
                    <Users className="w-8 h-8 text-gray-200" />
                    <p className="text-xs text-gray-400 font-light italic uppercase tracking-widest">Select a lead to begin oversight</p>
                  </div>
                )}

                {/* Closing Matrix */}
                <Card className="bg-black text-white p-8 space-y-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center space-x-3 text-secondary">
                      <Target className="w-5 h-5" />
                      <h4 className="text-[10px] font-bold uppercase tracking-widest">Closing Matrix</h4>
                    </div>
                    <div className="space-y-4">
                      <ClosingStat label="Pipeline Value" value="$2.4M" />
                      <ClosingStat label="T1 Conversion" value="12%" />
                      <ClosingStat label="Avg. Cycle" value="4.2 Days" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab !== 'leads' && (
            <div className="py-40 text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-12 bg-ivory border border-border rounded-full animate-pulse">
                  <RefreshCcw className="w-12 h-12 text-gold/30 mx-auto" />
                </div>
              </div>
              <p className="text-2xl text-muted-foreground font-light italic font-headline">
                The {activeTab} workspace is currently synchronizing with the Maison Acquisition Registry.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function SalesNavItem({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center space-x-4 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all group rounded-sm border",
        active 
          ? "bg-plum text-white border-plum shadow-md" 
          : "text-gray-400 hover:bg-ivory hover:text-plum border-transparent"
      )}
    >
      <span className={cn("transition-transform group-hover:scale-110", active ? "text-white" : "text-gold")}>
        {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
      </span>
      <span>{label}</span>
      {active && <ChevronRight className="w-4 h-4 ml-auto" />}
    </button>
  );
}

function ClosingStat({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-end border-b border-white/10 pb-2">
      <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{label}</span>
      <span className="text-sm font-bold text-white">{value}</span>
    </div>
  );
}
