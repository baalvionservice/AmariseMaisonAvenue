'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  FileText, 
  Users, 
  Settings,
  LogOut,
  ChevronRight,
  Search,
  Plus,
  Edit3,
  Trash2,
  Clock,
  RotateCcw,
  Boxes,
  Star
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Product } from '@/lib/types';

type OpsTab = 'dashboard' | 'catalog' | 'inventory' | 'orders' | 'returns' | 'cms' | 'customers' | 'logistics';

export default function OperationsAdminPanel() {
  const [activeTab, setActiveTab] = useState<OpsTab>('dashboard');
  const { products, returns, updateReturnStatus, deleteProduct, upsertProduct } = useAppStore();
  const { toast } = useToast();

  const handleAddMockProduct = () => {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: 'New Artisanal Creation',
      departmentId: 'women',
      categoryId: 'w-couture',
      subcategoryId: 'evening-gowns',
      collectionId: 'spring-24',
      basePrice: 4500,
      imageUrl: '', // Asset placeholder
      isVip: false,
      rating: 5.0,
      reviewsCount: 0,
      stock: 5,
      vendorId: 'vend-1'
    };
    upsertProduct(newProduct);
    toast({ title: "Maison Entry Created", description: "The new artifact has been added to the catalog." });
  };

  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-body text-gray-900">
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
          <OpsNavItem icon={<Boxes />} label="Multi-Warehouse" active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} />
          <OpsNavItem icon={<Truck />} label="Orders & Fulfillment" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
          <OpsNavItem icon={<RotateCcw />} label="Reverse Logistics" active={activeTab === 'returns'} onClick={() => setActiveTab('returns')} />
          <OpsNavItem icon={<FileText />} label="Storytelling CMS" active={activeTab === 'cms'} onClick={() => setActiveTab('cms')} />
          <OpsNavItem icon={<Users />} label="Connoisseurs" active={activeTab === 'customers'} onClick={() => setActiveTab('customers')} />
          <OpsNavItem icon={<Settings />} label="Logistics Config" active={activeTab === 'logistics'} onClick={() => setActiveTab('logistics')} />
        </nav>

        <div className="pt-8 border-t border-border space-y-4">
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-gold group" asChild>
            <Link href="/admin">
              <RotateCcw className="w-4 h-4 mr-3" /> Master Control
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-plum group" asChild>
            <Link href="/us">
              <LogOut className="w-4 h-4 mr-3" /> Exit Ops
            </Link>
          </Button>
        </div>
      </aside>

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
          {activeTab === 'dashboard' && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard icon={<Clock />} label="Pending Shipments" value="24" trend="Action Required" positive={false} />
                <StatCard icon={<RotateCcw />} label="Active Returns" value={returns.length.toString()} trend="Inspect Now" positive={false} />
                <StatCard icon={<Boxes />} label="Low Stock Alerts" value="12" trend="Replenish" positive={false} />
                <StatCard icon={<Star />} label="VIP Enquiries" value="08" trend="Immediate" positive={false} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <Card className="lg:col-span-2 bg-white border-border shadow-luxury">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="font-headline text-2xl">Regional Fulfillment Velocity</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest">Real-time status of artisanal hubs</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-ivory/50">
                        <TableRow>
                          <TableHead className="text-[9px] uppercase font-bold pl-8">Atelier Hub</TableHead>
                          <TableHead className="text-[9px] uppercase font-bold">Region</TableHead>
                          <TableHead className="text-[9px] uppercase font-bold text-center">Status</TableHead>
                          <TableHead className="text-[9px] uppercase font-bold text-right pr-8">Load</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="pl-8 text-xs font-bold">New York Fifth Ave</TableCell>
                          <TableCell><Badge variant="outline" className="text-[8px] uppercase">US Market</Badge></TableCell>
                          <TableCell className="text-center text-green-600 font-bold text-[9px] uppercase">Optimal</TableCell>
                          <TableCell className="text-right pr-8"><Progress value={45} className="h-1" /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="pl-8 text-xs font-bold">London Bond Street</TableCell>
                          <TableCell><Badge variant="outline" className="text-[8px] uppercase">UK Market</Badge></TableCell>
                          <TableCell className="text-center text-gold font-bold text-[9px] uppercase">High Load</TableCell>
                          <TableCell className="text-right pr-8"><Progress value={88} className="h-1" /></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card className="bg-white border-border shadow-luxury">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="font-headline text-2xl">Return Sentiment</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest">Global reverse logistics analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-8 space-y-8">
                    <PerformanceRow label="Average Return Rate" val={1.8} />
                    <PerformanceRow label="Inspection Velocity" val={92} />
                    <PerformanceRow label="Refund Latency" val={12} />
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'catalog' && (
            <div className="space-y-12">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <h2 className="text-2xl font-headline font-bold italic">Artifact Management</h2>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">Add, edit, or archive the Maison's creations</p>
                </div>
                <Button className="bg-plum text-white hover:bg-gold h-12 px-8 rounded-none text-[10px] font-bold tracking-widest uppercase" onClick={handleAddMockProduct}>
                  <Plus className="w-4 h-4 mr-2" /> Add New Artifact
                </Button>
              </div>

              <Card className="bg-white border-border shadow-luxury overflow-hidden">
                <Table>
                  <TableHeader className="bg-ivory/50">
                    <TableRow>
                      <TableHead className="text-[9px] uppercase font-bold pl-8">Artifact</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold">Type</TableHead>
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
                            <div className="w-10 h-12 bg-muted rounded-sm flex-shrink-0 flex items-center justify-center text-[6px] font-bold uppercase text-gray-400">
                              Piece
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold leading-tight">{product.name}</span>
                              <span className="text-[8px] text-gray-400 uppercase tracking-tighter">SKU: {product.id.toUpperCase()}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn("text-[8px] uppercase tracking-widest", product.listingType === 'auction' ? 'border-gold text-gold' : 'border-border text-gray-400')}>
                            {product.listingType || 'Fixed'}
                          </Badge>
                        </TableCell>
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
