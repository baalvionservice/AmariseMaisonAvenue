
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  Truck, 
  FileText, 
  Users, 
  BarChart3, 
  Settings,
  LogOut,
  ChevronRight,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RefreshCcw,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Star,
  MapPin
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAppStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { cn } from '@/lib/utils';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

type OpsTab = 'dashboard' | 'catalog' | 'curations' | 'orders' | 'cms' | 'customers' | 'reports' | 'logistics';

export default function OperationsAdminPanel() {
  const [activeTab, setActiveTab] = useState<OpsTab>('dashboard');
  const { products, editorials, vipClients, deleteProduct } = useAppStore();
  const { toast } = useToast();

  const handleAction = (msg: string) => {
    toast({ title: "Operation Initiated", description: msg });
  };

  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-body text-gray-900">
      {/* Operations Sidebar */}
      <aside className="w-72 border-r border-border bg-white p-8 flex flex-col space-y-12 shadow-sm z-20">
        <div className="space-y-4">
          <div className="font-headline text-3xl font-bold tracking-tighter text-gray-900">
            AMARISÉ <span className="text-gold text-xs font-normal tracking-[0.4em] ml-2">OPS</span>
          </div>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Maison Operations Hub</p>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          <OpsNavItem icon={<LayoutDashboard />} label="Orchestration" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <OpsNavItem icon={<Package />} label="Catalog Atelier" active={activeTab === 'catalog'} onClick={() => setActiveTab('catalog')} />
          <OpsNavItem icon={<Tags />} label="Curations" active={activeTab === 'curations'} onClick={() => setActiveTab('curations')} />
          <OpsNavItem icon={<Truck />} label="Orders & Returns" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
          <OpsNavItem icon={<FileText />} label="Storytelling CMS" active={activeTab === 'cms'} onClick={() => setActiveTab('cms')} />
          <OpsNavItem icon={<Users />} label="Connoisseurs" active={activeTab === 'customers'} onClick={() => setActiveTab('customers')} />
          <OpsNavItem icon={<BarChart3 />} label="Analytics" active={activeTab === 'reports'} onClick={() => setActiveTab('reports')} />
          <OpsNavItem icon={<Settings />} label="Logistics" active={activeTab === 'logistics'} onClick={() => setActiveTab('logistics')} />
        </nav>

        <div className="pt-8 border-t border-border space-y-4">
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
            <Link href="/admin">
              <RefreshCcw className="w-4 h-4 mr-3" /> Master Control
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
            <Link href="/us">
              <LogOut className="w-4 h-4 mr-3" /> Exit Ops
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 overflow-y-auto bg-ivory relative">
        <header className="flex justify-between items-center bg-white/80 luxury-blur p-8 border-b border-border sticky top-0 z-30">
          <div>
            <h1 className="text-3xl font-headline font-bold italic text-gray-900 uppercase tracking-widest">
              {activeTab}
            </h1>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase font-bold mt-1">
              Operational Oversight • Global Logistics Terminal
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative group">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-plum transition-colors" />
               <input className="bg-ivory border border-border h-10 pl-10 pr-4 text-[10px] font-bold uppercase tracking-widest outline-none focus:border-gold w-64 transition-all" placeholder="SEARCH CATALOG / ORDERS" />
            </div>
            <div className="w-10 h-10 bg-ivory border border-border rounded-sm flex items-center justify-center font-headline text-xl font-bold italic text-plum">OP</div>
          </div>
        </header>

        <div className="p-12 space-y-12 animate-fade-in pb-32">
          
          {/* ORCHESTRATION (DASHBOARD) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard icon={<Clock />} label="Pending Shipments" value="24" trend="Action Required" positive={false} />
                <StatCard icon={<AlertTriangle />} label="Inventory Alerts" value="12" trend="Low Stock" positive={false} />
                <StatCard icon={<Plus />} label="Orders Today" value="84" trend="+15%" positive={true} />
                <StatCard icon={<Star />} label="Client Enquiries" value="08" trend="Unread" positive={false} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <Card className="lg:col-span-2 bg-white border-border shadow-luxury">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="font-headline text-2xl">Daily Logistics Stream</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest">Real-time status of artisanal fulfillment</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-ivory/50">
                        <TableRow>
                          <TableHead className="text-[9px] uppercase font-bold pl-8">Order ID</TableHead>
                          <TableHead className="text-[9px] uppercase font-bold">Connoisseur</TableHead>
                          <TableHead className="text-[9px] uppercase font-bold">Atelier</TableHead>
                          <TableHead className="text-[9px] uppercase font-bold text-center">Status</TableHead>
                          <TableHead className="text-[9px] uppercase font-bold text-right pr-8">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[1, 2, 3, 4, 5].map(i => (
                          <TableRow key={i} className="hover:bg-ivory/30">
                            <TableCell className="text-xs font-bold font-mono pl-8">#AM-{(1000 + i)}</TableCell>
                            <TableCell className="text-xs font-light italic">Julian Vandervilt</TableCell>
                            <TableCell className="text-[10px] uppercase tracking-widest text-plum font-bold">New York</TableCell>
                            <TableCell className="text-center">
                              <Badge className="bg-plum/10 text-plum text-[8px] uppercase tracking-widest">Processing</Badge>
                            </TableCell>
                            <TableCell className="text-right pr-8">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gold"><Eye className="w-4 h-4" /></Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card className="bg-white border-border shadow-luxury">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="font-headline text-2xl">Atelier Performance</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest">Regional fulfillment velocity</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-8 space-y-8">
                    <PerformanceRow label="Paris Flagship" val={98} />
                    <PerformanceRow label="London Bond St." val={92} />
                    <PerformanceRow label="Dubai Mall" val={95} />
                    <PerformanceRow label="New York 5th Ave" val={88} />
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* CATALOG ATELIER (PRODUCT MGMT) */}
          {activeTab === 'catalog' && (
            <div className="space-y-12">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <h2 className="text-2xl font-headline font-bold italic">Artifact Management</h2>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">Add, edit, or archive the Maison's creations</p>
                </div>
                <Button className="bg-plum text-white hover:bg-gold h-12 px-8 rounded-none text-[10px] font-bold tracking-widest uppercase" onClick={() => handleAction("Catalog creation interface opened.")}>
                  <Plus className="w-4 h-4 mr-2" /> Add New Artifact
                </Button>
              </div>

              <Card className="bg-white border-border shadow-luxury overflow-hidden">
                <Table>
                  <TableHeader className="bg-ivory/50">
                    <TableRow>
                      <TableHead className="text-[9px] uppercase font-bold pl-8">Artifact</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold">Category</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-center">Stock</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-right">Value</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-right pr-8">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.slice(0, 15).map(product => (
                      <TableRow key={product.id} className="hover:bg-ivory/30 transition-colors">
                        <TableCell className="pl-8">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-12 bg-ivory rounded-sm overflow-hidden flex-shrink-0">
                              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold leading-tight">{product.name}</span>
                              <span className="text-[8px] text-gray-400 uppercase tracking-tighter">SKU: {product.id.toUpperCase()}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell><Badge variant="outline" className="text-[8px] uppercase tracking-widest">{product.category}</Badge></TableCell>
                        <TableCell className="text-center">
                          <span className={cn("text-xs font-bold", product.stock < 5 ? "text-red-500" : "text-gray-500")}>
                            {product.stock}
                          </span>
                        </TableCell>
                        <TableCell className="text-right text-xs font-light">${product.basePrice.toLocaleString()}</TableCell>
                        <TableCell className="text-right pr-8">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-plum"><Edit3 className="w-3.5 h-3.5" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-destructive" onClick={() => deleteProduct(product.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {/* STORYTELLING CMS */}
          {activeTab === 'cms' && (
            <div className="space-y-12">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <h2 className="text-2xl font-headline font-bold italic">Editorial & Narratives</h2>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">Manage the Maison Journal and trend highlights</p>
                </div>
                <Button className="bg-plum text-white hover:bg-gold h-12 px-8 rounded-none text-[10px] font-bold tracking-widest uppercase">
                  <Plus className="w-4 h-4 mr-2" /> Draft Narrative
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {editorials.map(ed => (
                  <Card key={ed.id} className="bg-white border-border shadow-luxury overflow-hidden group">
                    <div className="aspect-video relative overflow-hidden">
                      <img src={ed.imageUrl} alt={ed.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
                      <div className="absolute top-4 left-4 bg-plum/90 text-white px-3 py-1 text-[8px] font-bold uppercase tracking-widest">
                        {ed.category}
                      </div>
                    </div>
                    <CardContent className="p-8 space-y-4">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xl font-headline font-bold italic">{ed.title}</h4>
                        <Badge className="bg-green-50 text-green-600 text-[8px] uppercase tracking-widest">Published</Badge>
                      </div>
                      <p className="text-xs text-gray-500 font-light italic line-clamp-2">{ed.excerpt}</p>
                      <div className="pt-4 flex justify-between items-center border-t border-border">
                        <span className="text-[9px] text-gray-400 uppercase tracking-widest">By {ed.author} • {ed.date}</span>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-plum"><Eye className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-plum"><Edit3 className="w-4 h-4" /></Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* PLACEHOLDERS FOR REMAINING TABS */}
          {['curations', 'orders', 'customers', 'reports', 'logistics'].includes(activeTab) && (
            <div className="py-40 text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-12 bg-ivory border border-border rounded-full animate-pulse">
                  <RefreshCcw className="w-12 h-12 text-gold/30 mx-auto" />
                </div>
              </div>
              <p className="text-2xl text-muted-foreground font-light italic font-headline">
                The {activeTab} terminal is currently synchronizing with the Global Ateliers.
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

function OpsNavItem({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
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

function StatCard({ icon, label, value, trend, positive }: { icon: any, label: string, value: string, trend: string, positive: boolean }) {
  return (
    <Card className="bg-white border-border shadow-luxury hover:border-gold transition-colors group">
      <CardContent className="p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div className="p-4 bg-ivory rounded-full group-hover:bg-gold/10 transition-colors text-plum">{icon}</div>
          <div className={cn(
            "flex items-center text-[10px] font-bold tracking-widest uppercase",
            positive ? "text-gold" : "text-gray-400"
          )}>
            {trend} {positive ? <ArrowUpRight className="ml-1 w-3 h-3" /> : null}
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

function PerformanceRow({ label, val }: { label: string, val: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
        <span>{label}</span>
        <span className="text-plum">{val}%</span>
      </div>
      <Progress value={val} className="h-1 bg-ivory" />
    </div>
  );
}
