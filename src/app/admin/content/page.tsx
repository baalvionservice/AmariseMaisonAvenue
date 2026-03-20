
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  History, 
  Edit3, 
  Trash2, 
  Package,
  ChevronRight,
  Database,
  CheckCircle2,
  Lock,
  Eye,
  Crown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCMS } from '@/hooks/use-cms';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { useSearch } from '@/hooks/use-search';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

/**
 * Atelier CMS: Multi-Market Registry Terminal
 * Control artifact template strategy (Normal vs Private) and regional visibility.
 */
export default function ContentAdminHub() {
  const { products, deleteProduct } = useCMS();
  const { globalSettings, lockProductForEditing, toggleProductVipStatus } = useAppStore();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useSearch(products, searchQuery);

  const handleEditArtifact = (productId: string) => {
    const locked = lockProductForEditing(productId);
    if (locked) {
      toast({ title: "Session Secured", description: "You have exclusive edit rights for this artifact." });
    } else {
      toast({ variant: "destructive", title: "Conflict Blocked", description: "Refined by another hub." });
    }
  };

  const handleToggleTemplate = (productId: string) => {
    toggleProductVipStatus(productId);
    toast({ title: "Acquisition Strategy Updated", description: "The artifact template has been re-routed." });
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <nav className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center space-x-2 mb-2">
            <Link href="/admin" className="hover:text-plum transition-colors">Admin</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900">Products</span>
            <span className="text-slate-300">/</span>
            <span className="text-plum">Atelier CMS</span>
          </nav>
          <h1 className="text-3xl font-headline font-bold text-slate-900 uppercase tracking-tight">Atelier Registry</h1>
          <p className="text-sm text-slate-500 max-w-2xl">Manage the global master catalog and acquisition template strategy (Normal vs Private).</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-plum hover:bg-black text-white font-bold uppercase tracking-widest text-[10px] h-11 px-8 rounded-none shadow-lg transition-all">
            <Plus className="w-4 h-4 mr-2" /> Register New Entry
          </Button>
        </div>
      </header>

      {globalSettings.isGuideMode && (
        <div className="p-6 bg-plum/5 border border-plum/10 rounded-none flex items-start space-x-4">
          <div className="p-2 bg-plum rounded-none text-white">
            <Database size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-plum mb-1 uppercase tracking-tight">Acquisition Strategy Control</h4>
            <p className="text-xs text-slate-600 font-light leading-relaxed">
              Use the "Strategy" toggle to route products between the **Institutional Registry (Normal)** 
              and the **Private Salon (Exclusive)** templates.
            </p>
          </div>
        </div>
      )}

      <Card className="bg-white border-slate-200 shadow-sm overflow-hidden rounded-none">
        <Tabs defaultValue="registry" className="w-full">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 p-0">
            <div className="px-8 pt-6 pb-0 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <TabsList className="bg-transparent h-auto p-0 space-x-8 rounded-none border-b-0">
                <TabsTrigger value="registry" className="tab-trigger-modern">All Artifacts</TabsTrigger>
                <TabsTrigger value="private" className="tab-trigger-modern">Private Salon Only</TabsTrigger>
                <TabsTrigger value="normal" className="tab-trigger-modern">Registry Standard</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center space-x-4 pb-4">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 transition-colors group-focus-within:text-plum" />
                  <input 
                    type="text" 
                    placeholder="Filter registry..." 
                    className="bg-white border border-slate-200 h-9 pl-9 pr-4 text-xs rounded-none w-64 focus:ring-4 focus:ring-plum/5 focus:border-plum outline-none transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm" className="h-9 border-slate-200 text-[10px] font-bold uppercase tracking-widest rounded-none">
                  <Filter className="w-3.5 h-3.5 mr-2" /> Filters
                </Button>
              </div>
            </div>
          </CardHeader>

          <TabsContent value="registry" className="m-0 border-none outline-none">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow className="border-slate-100">
                  <TableHead className="text-[10px] uppercase font-bold text-slate-400 pl-8">Artifact Information</TableHead>
                  <TableHead className="text-[10px] uppercase font-bold text-slate-400">Acquisition Strategy</TableHead>
                  <TableHead className="text-[10px] uppercase font-bold text-slate-400">Jurisdiction</TableHead>
                  <TableHead className="text-[10px] uppercase font-bold text-slate-400 text-right pr-8">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.slice(0, 15).map(prod => (
                  <TableRow key={prod.id} className="hover:bg-slate-50/50 group transition-colors border-slate-50">
                    <TableCell className="pl-8 py-5">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-14 bg-slate-100 rounded-none border border-slate-200 flex-shrink-0 flex items-center justify-center text-[8px] font-bold text-slate-400 uppercase">
                          Asset
                        </div>
                        <div className="flex flex-col space-y-0.5">
                          <span className="text-sm font-bold text-slate-900 group-hover:text-plum transition-colors uppercase tracking-tight">{prod.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-tighter">REF: {prod.id.toUpperCase()}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <button 
                        onClick={() => handleToggleTemplate(prod.id)}
                        className="flex items-center space-x-3 group/strategy"
                      >
                        <Badge className={cn(
                          "text-[9px] font-bold uppercase tracking-widest border-none px-3 py-1 rounded-none",
                          prod.isVip ? "bg-plum text-white" : "bg-slate-100 text-slate-500"
                        )}>
                          {prod.isVip ? <Lock className="w-2.5 h-2.5 mr-1.5" /> : <Eye className="w-2.5 h-2.5 mr-1.5" />}
                          {prod.isVip ? 'PRIVATE SALON' : 'NORMAL REGISTRY'}
                        </Badge>
                        <span className="text-[8px] font-bold text-slate-300 group-hover/strategy:text-plum transition-colors uppercase tracking-widest opacity-0 group-hover/strategy:opacity-100">Switch</span>
                      </button>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[9px] uppercase tracking-widest border-slate-200 text-slate-500 font-medium bg-white rounded-none">
                        {prod.scope === 'global' ? 'Global Master' : 'Regional'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <div className="flex justify-end space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-plum hover:bg-plum/5" onClick={() => handleEditArtifact(prod.id)}>
                          <Edit3 size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900">
                          <History size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => deleteProduct(prod.id)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="p-8 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Showing 15 of {products.length} Registry Entries</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="h-8 border-slate-200 text-[10px] font-bold uppercase tracking-widest rounded-none disabled:opacity-30">Previous</Button>
                <Button variant="outline" size="sm" className="h-8 border-slate-200 text-[10px] font-bold uppercase tracking-widest rounded-none">Next Page</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
