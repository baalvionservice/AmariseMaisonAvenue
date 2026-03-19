'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  FileText, 
  Download, 
  Search, 
  Filter, 
  ChevronRight, 
  RefreshCcw,
  LayoutDashboard,
  Clock,
  User,
  Activity,
  AlertTriangle,
  History,
  Lock,
  ArrowDownToLine,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { downloadMockAuditReport } from '@/lib/audit/engine';

export default function ComplianceAdminHub() {
  const { scopedAuditLogs, currentUser } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');

  const filteredLogs = scopedAuditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         log.actorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.entity.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  const handleExport = () => {
    downloadMockAuditReport(filteredLogs);
  };

  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-body text-gray-900">
      <aside className="w-72 border-r border-border bg-white p-8 flex flex-col space-y-12 shadow-sm z-20">
        <div className="space-y-4">
          <div className="font-headline text-3xl font-bold tracking-tighter text-gray-900">
            AMARISÉ <span className="text-plum text-xs font-normal tracking-[0.4em] ml-2">AUDIT</span>
          </div>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Institutional Compliance</p>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          <ComplianceNavItem icon={<LayoutDashboard />} label="Audit Registry" active={true} />
          <ComplianceNavItem icon={<ShieldCheck />} label="Policy Governance" active={false} />
          <ComplianceNavItem icon={<Lock />} label="Access Control" active={false} />
          <ComplianceNavItem icon={<History />} label="System History" active={false} />
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
            <h1 className="text-3xl font-headline font-bold italic text-gray-900 uppercase tracking-widest">Compliance Hub</h1>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase font-bold mt-1">
              Institutional Action Logs • {currentUser?.country.toUpperCase()} Jurisdiction
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <Button 
              className="bg-black text-white hover:bg-plum h-10 px-6 rounded-none text-[9px] font-bold uppercase tracking-widest"
              onClick={handleExport}
            >
              <ArrowDownToLine className="w-3.5 h-3.5 mr-2" /> EXPORT REGISTRY
            </Button>
            <div className="w-10 h-10 bg-ivory border border-border rounded-sm flex items-center justify-center font-headline text-xl font-bold italic text-plum">AL</div>
          </div>
        </header>

        <div className="p-12 space-y-12 animate-fade-in pb-32">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard icon={<Activity />} label="Actions Logged" value={filteredLogs.length.toString()} trend="Live Registry" positive={true} />
            <StatCard icon={<AlertTriangle />} label="Critical Alerts" value="0" trend="Optimal" positive={true} />
            <StatCard icon={<Clock />} label="Retention" value="365 Days" trend="Institutional" positive={true} />
            <StatCard icon={<ShieldCheck />} label="Integrity" value="Verified" trend="Immutable" positive={true} />
          </div>

          {/* Audit Log Table */}
          <Card className="bg-white border-border shadow-luxury overflow-hidden">
            <CardHeader className="border-b border-border flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              <div className="space-y-1">
                <CardTitle className="font-headline text-2xl">Maison Audit Feed</CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Chronological list of institutional actions</CardDescription>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
                  <input 
                    className="bg-white border border-border h-10 pl-10 pr-4 text-[10px] font-bold uppercase tracking-widest outline-none w-64 focus:ring-1 focus:ring-plum transition-all" 
                    placeholder="FILTER LOGS..." 
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
                    value={severityFilter}
                    onChange={(e) => setSeverityFilter(e.target.value)}
                  >
                    <option value="all">ALL SEVERITY</option>
                    <option value="low">LOW</option>
                    <option value="medium">MEDIUM</option>
                    <option value="high">HIGH</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-ivory/50">
                  <TableRow>
                    <TableHead className="text-[9px] uppercase font-bold pl-8">Timestamp</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold">Actor</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold">Action</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold">Entity</TableHead>
                    <TableHead className="text-[9px] uppercase font-bold text-center">Severity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map(log => (
                    <TableRow key={log.id} className="hover:bg-ivory/30 transition-colors">
                      <TableCell className="pl-8 text-[10px] font-mono text-gray-400">
                        {new Date(log.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold leading-tight uppercase tracking-tight">{log.actorName}</span>
                          <span className="text-[8px] text-gray-400 uppercase tracking-widest">{log.actorRole}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-light italic text-gray-700">
                        {log.action}
                      </TableCell>
                      <TableCell className="text-[10px] font-bold uppercase tracking-widest text-plum">
                        {log.entity}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={cn("text-[7px] uppercase tracking-tighter border-none", 
                          log.severity === 'high' ? 'bg-red-500 text-white' : 
                          log.severity === 'medium' ? 'bg-orange-50 text-orange-600' : 
                          'bg-green-50 text-green-600'
                        )}>
                          {log.severity}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredLogs.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="py-40 text-center">
                        <div className="flex flex-col items-center space-y-4 opacity-20">
                          <FileText className="w-12 h-12" />
                          <p className="text-xs font-bold uppercase tracking-[0.2em]">No audit entries match the criteria</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function ComplianceNavItem({ icon, label, active }: { icon: any, label: string, active: boolean }) {
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
          <div className={cn(
            "flex items-center text-[10px] font-bold tracking-widest uppercase",
            positive ? "text-gold" : "text-red-500"
          )}>
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
