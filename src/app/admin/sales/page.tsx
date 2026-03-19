
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Target, 
  Users, 
  Crown, 
  MessageSquare, 
  ChevronRight, 
  Search,
  Filter,
  TrendingUp,
  Award,
  Lock,
  X,
  Plus
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
import { useSearch } from '@/hooks/use-search';

/**
 * Sales CRM: Updated to use global AdminLayout
 */
export default function AdminSalesHub() {
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const { scopedInquiries, updateInquiryStatus, currentUser } = useAppStore();

  const filteredLeads = useSearch(scopedInquiries, searchQuery, { status: statusFilter });

  const sortedLeads = useMemo(() => {
    return [...filteredLeads].sort((a, b) => a.leadTier - b.leadTier);
  }, [filteredLeads]);

  const selectedLead = useMemo(() => 
    scopedInquiries.find(i => i.id === selectedLeadId), 
    [scopedInquiries, selectedLeadId]
  );

  return (
    <div className="space-y-12 animate-fade-in">
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <nav className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 flex items-center space-x-2">
             <Link href="/admin">Dashboard</Link>
             <ChevronRight className="w-2.5 h-2.5" />
             <span className="text-plum">Sales CRM</span>
          </nav>
          <h1 className="text-4xl font-headline font-bold italic tracking-tight text-gray-900">Sales CRM</h1>
          <p className="text-sm text-gray-500 font-light italic">High-Ticket Lead Management & Curatorial Dialogue.</p>
        </div>
        <div className="flex items-center space-x-4">
           <Button className="bg-plum text-white hover:bg-black h-10 px-6 rounded-none text-[9px] font-bold uppercase tracking-widest">
             <Plus className="w-3.5 h-3.5 mr-2" /> NEW LEAD
           </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Leads List */}
        <Card className="lg:col-span-7 bg-white border-border shadow-luxury overflow-hidden">
          <CardHeader className="border-b border-border flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div>
              <CardTitle className="font-headline text-2xl">Active Acquisition Leads</CardTitle>
              <CardDescription className="text-[10px] uppercase tracking-widest">Market registry of private intent</CardDescription>
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
                    <TableCell colSpan={4} className="py-20 text-center opacity-20">
                      <Search className="w-12 h-12 mx-auto" />
                      <p className="text-xs font-bold uppercase tracking-[0.2em] mt-4">No results found</p>
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
                  <div className="flex flex-col items-end">
                     <Badge className="bg-plum text-white text-[8px] uppercase tracking-[0.2em]">TIER {selectedLead.leadTier}</Badge>
                     <span className="text-[7px] font-bold text-gray-400 uppercase mt-1">Assignment: AUTOMATIC</span>
                  </div>
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
                    "Review the latest curatorial transcript to ensure strategic alignment."
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
            <div className="h-64 border-2 border-dashed border-border flex flex-col items-center justify-center p-8 text-center space-y-4 opacity-30">
              <Users className="w-8 h-8" />
              <p className="text-xs font-bold uppercase tracking-widest">Select a lead to begin oversight</p>
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
                <ClosingStat label="Market Value" value="$2.4M" />
                <ClosingStat label="Conversion Rate" value="12%" />
                <ClosingStat label="Avg. Dialogue" value="4.2 Days" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
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
