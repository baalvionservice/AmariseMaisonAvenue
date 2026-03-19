'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  Star,
  MapPin,
  RefreshCcw,
  CheckCircle2,
  XCircle,
  MessageSquare,
  History,
  Filter,
  ShieldCheck,
  X,
  Store,
  Briefcase,
  FlaskConical,
  CalendarDays,
  ShieldAlert
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
import { guardPage } from '@/lib/access/routeGuard';
import { useSearch } from '@/hooks/use-search';

type OpsTab = 'dashboard' | 'catalog' | 'approvals' | 'onboarding' | 'inventory' | 'orders' | 'returns';

export default function OperationsAdminPanel() {
  const [activeTab, setActiveTab] = useState<OpsTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const { 
    scopedProducts, 
    scopedReturns, 
    scopedApprovals, 
    handleApprovalAction, 
    deleteProduct, 
    currentUser, 
    scopedNotifications, 
    categories, 
    vendors,
    approveVendor
  } = useAppStore();
  const { toast } = useToast();

  // Integrated Advanced Search
  const filteredProducts = useSearch(scopedProducts, searchQuery, { categoryId: categoryFilter });

  useEffect(() => {
    if (!guardPage(currentUser, 'view_dashboard', currentUser?.country)) {
      console.warn("Institutional Access Violation Detected");
    }
  }, [currentUser]);

  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-body text-gray-900">
      <aside className="w-72 border-r border-border bg-white p-8 flex flex-col space-y-12 shadow-sm z-20">
        <div className="space-y-4">
          <div className="font-headline text-3xl font-bold tracking-tighter text-gray-900">
            AMARISÉ <span className="text-gold text-xs font-normal tracking-[0.4em] ml-2">OPS</span>
          </div>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">{currentUser?.country.toUpperCase()} Operations Hub</p>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          <OpsNavItem icon={<LayoutDashboard />} label="Orchestration" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <OpsNavItem icon={<ShieldAlert />} label="Error Matrix" active={false} href="/admin/errors" />
          <OpsNavItem icon={<ShieldCheck />} label="Compliance" active={false} href="/admin/compliance" />
          <OpsNavItem icon={<FlaskConical />} label="QA Automation" active={false} href="/admin/qa" />
          <OpsNavItem icon={<Briefcase />} label="Partner Onboarding" active={activeTab === 'onboarding'} onClick={() => setActiveTab('onboarding')} />
          <OpsNavItem icon={<RotateCcw />} label="Approval Queue" active={activeTab === 'approvals'} onClick={() => setActiveTab('approvals')} />
          <OpsNavItem icon={<Package />} label="Ateliers Catalog" active={activeTab === 'catalog'} onClick={() => setActiveTab('catalog')} />
          <OpsNavItem icon={<Boxes />} label="Multi-Warehouse" active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} />
          <OpsNavItem icon={<Truck />} label="Orders & Fulfillment" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
          <OpsNavItem icon={<RotateCcw />} label="Reverse Logistics" active={activeTab === 'returns'} onClick={() => setActiveTab('returns')} />
        </nav>

        <div className="pt-8 border-t border-border space-y-4">
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-gold group" asChild>
            <Link href="/admin">
              <RefreshCcw className="w-4 h-4 mr-3" /> Master Control
            </Link>
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-ivory relative">
        <header className="flex justify-between items-center bg-white/80 luxury-blur p-8 border-b border-border sticky top-0 z-30">
          <div>
            <h1 className="text-3xl font-headline font-bold italic text-gray-900 uppercase tracking-widest">{activeTab}</h1>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase font-bold mt-1">{currentUser?.country.toUpperCase()} Market Hub</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative group cursor-pointer">
               <div className="p-2 bg-ivory border border-border rounded-full hover:border-plum transition-colors">
                  <Star className="w-4 h-4 text-plum" />
               </div>
               {scopedNotifications.filter(n => !n.read).length > 0 && (
                 <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                   {scopedNotifications.filter(n => !n.read).length}
                 </span>
               )}
            </div>
            <div className="w-10 h-10 bg-ivory border border-border rounded-sm flex items-center justify-center font-headline text-xl font-bold italic text-plum">OP</div>
          </div>
        </header>

        <div className="p-12 space-y-12 animate-fade-in pb-32">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <StatCard icon={<Clock />} label="Pending Shipments" value="24" trend="Action Required" positive={false} />
                  <StatCard icon={<RotateCcw />} label="Approvals" value={scopedApprovals.filter(a => a.status === 'pending').length.toString()} trend="Review Required" positive={false} />
                  <StatCard icon={<Store />} label="Pending Partners" value={vendors.filter(v => v.status === 'pending').length.toString()} trend="Verification" positive={false} />
                </div>

                <Card className="bg-white border-border shadow-luxury overflow-hidden">
                  <CardHeader className="border-b border-border bg-ivory/10">
                    <CardTitle className="font-headline text-xl uppercase tracking-widest">Recent System Alerts</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border">
                      {scopedNotifications.slice(0, 5).map(note => (
                        <div key={note.id} className="p-6 flex items-start space-x-4 hover:bg-ivory/30 transition-colors">
                          <div className={cn("p-2 rounded-full", 
                            note.type === 'alert' ? "bg-red-50 text-red-500" : "bg-green-50 text-green-500"
                          )}>
                            {note.type === 'alert' ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-medium text-gray-900">{note.message}</p>
                            <span className="text-[8px] text-gray-400 uppercase font-bold">{new Date(note.timestamp).toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-4 space-y-8">
                <Card className="bg-black text-white p-8 space-y-6 shadow-2xl relative overflow-hidden">
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center space-x-3 text-secondary">
                      <LayoutDashboard className="w-5 h-5" />
                      <h4 className="text-[10px] font-bold uppercase tracking-widest">Atelier KPIs</h4>
                    </div>
                    <div className="space-y-4 pt-4">
                      <PerformanceRow label="Fulfillment" val={94} />
                      <PerformanceRow label="QC Accuracy" val={99} />
                      <PerformanceRow label="Partner Health" val={88} />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'onboarding' && (
            <div className="space-y-12">
              <div className="space-y-2">
                <h2 className="text-2xl font-headline font-bold italic">Institutional Partner Registry</h2>
                <p className="text-[10px] uppercase tracking-widest text-gray-400">Verify and approve new artisanal ateliers for the Maison</p>
              </div>

              <Card className="bg-white border-border shadow-luxury overflow-hidden">
                <Table>
                  <TableHeader className="bg-ivory/50">
                    <TableRow>
                      <TableHead className="text-[9px] uppercase font-bold pl-8">Atelier</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold">Category</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold">Joined Date</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-center">Status</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-right pr-8">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendors.map(vendor => (
                      <TableRow key={vendor.id} className="hover:bg-ivory/30 transition-colors">
                        <TableCell className="pl-8">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold leading-tight uppercase tracking-tight">{vendor.name}</span>
                            <span className="text-[8px] text-gray-400 uppercase tracking-widest">ID: {vendor.id}</span>
                          </div>
                        </TableCell>
                        <TableCell><Badge variant="outline" className="text-[8px] uppercase tracking-widest">{vendor.category}</Badge></TableCell>
                        <TableCell className="text-xs font-light italic">{new Date(vendor.joinedDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={cn("text-[8px] uppercase tracking-widest", 
                            vendor.status === 'active' ? 'bg-green-50 text-green-600' : 
                            vendor.status === 'rejected' ? 'bg-red-50 text-red-600' : 
                            'bg-gold/10 text-gold'
                          )}>
                            {vendor.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-8">
                          {vendor.status === 'pending' ? (
                            <div className="flex justify-end space-x-2">
                              <Button 
                                size="sm" 
                                className="h-8 bg-black text-white hover:bg-plum text-[8px] font-bold uppercase"
                                onClick={() => approveVendor(vendor.id)}
                              >
                                APPROVE
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500"><XCircle className="w-4 h-4" /></Button>
                            </div>
                          ) : (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-plum"><FileText className="w-4 h-4" /></Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {activeTab === 'approvals' && (
            <div className="space-y-12">
              <div className="space-y-2">
                <h2 className="text-2xl font-headline font-bold italic">Editorial & Listing Registry</h2>
                <p className="text-[10px] uppercase tracking-widest text-gray-400">Review artisanal submissions before global allocation</p>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {scopedApprovals.length > 0 ? scopedApprovals.map(req => (
                  <Card key={req.id} className="bg-white border-border shadow-sm overflow-hidden flex flex-col md:flex-row">
                    <div className="md:w-64 bg-ivory/50 p-8 border-r border-border flex flex-col justify-between">
                      <div className="space-y-4">
                        <Badge className="bg-plum text-white text-[8px] uppercase tracking-widest">{req.contentType}</Badge>
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold uppercase tracking-widest">ID: {req.contentId}</p>
                          <p className="text-[9px] text-gray-400 font-bold uppercase">Submitted: {new Date(req.timestamp).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 pt-4 border-t border-border mt-4">
                        <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center font-headline text-xs text-gold">{req.userName.charAt(0)}</div>
                        <p className="text-[10px] font-bold uppercase text-gray-600 truncate">{req.userName}</p>
                      </div>
                    </div>
                    
                    <div className="flex-1 p-8 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="text-xl font-headline font-bold italic">Institutional Review Required</h3>
                          <p className="text-xs text-gray-500 italic">"The submitted piece requires verification of provenance and material quality compliance."</p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge variant={req.status === 'pending' ? 'outline' : 'default'} className={cn(
                            "uppercase text-[8px]",
                            req.status === 'approved' && "bg-green-500",
                            req.status === 'rejected' && "bg-red-500"
                          )}>
                            {req.status}
                          </Badge>
                          {req.status === 'approved' && (
                            <span className="text-[8px] font-bold text-gray-400 uppercase flex items-center">
                              <CalendarDays className="w-3 h-3 mr-1" /> Scheduled for Publish
                            </span>
                          )}
                        </div>
                      </div>

                      {req.status === 'pending' && (
                        <div className="pt-8 flex space-x-4">
                          <Button 
                            className="bg-black text-white hover:bg-plum h-10 px-8 rounded-none text-[9px] font-bold uppercase tracking-widest"
                            onClick={() => handleApprovalAction(req.id, true)}
                          >
                            <CheckCircle2 className="w-3 h-3 mr-2" /> APPROVE ENTRY
                          </Button>
                          <Button 
                            variant="outline" 
                            className="border-border text-gray-400 h-10 px-8 rounded-none text-[9px] font-bold uppercase tracking-widest"
                            onClick={() => handleApprovalAction(req.id, false, "Provenance documentation insufficient.")}
                          >
                            <XCircle className="w-3 h-3 mr-2" /> REJECT
                          </Button>
                        </div>
                      )}
                      
                      {req.comments && (
                        <div className="mt-6 p-4 bg-muted text-[10px] italic text-gray-500 border-l-2 border-plum">
                          Admin Comments: {req.comments}
                        </div>
                      )}
                    </div>
                  </Card>
                )) : (
                  <div className="py-40 text-center space-y-6 opacity-20 border-2 border-dashed border-border rounded-sm">
                    <RotateCcw className="w-12 h-12 mx-auto" />
                    <p className="text-xl font-headline italic">The Approval Queue is Currently Clear.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'catalog' && (
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0">
                <div className="space-y-2">
                  <h2 className="text-2xl font-headline font-bold italic">Artifact Management</h2>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">Add, edit, or archive the {currentUser?.country.toUpperCase()} atelier creations</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
                    <input 
                      className="bg-white border border-border h-10 pl-10 pr-4 text-[10px] font-bold uppercase tracking-widest outline-none w-48 focus:ring-1 focus:ring-plum transition-all shadow-sm" 
                      placeholder="SEARCH SKU / NAME" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-plum">
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <Button className="bg-plum text-white hover:bg-gold h-10 px-6 rounded-none text-[10px] font-bold tracking-widest uppercase shadow-sm">
                    <Plus className="w-4 h-4 mr-2" /> NEW ENTRY
                  </Button>
                </div>
              </div>

              <Card className="bg-white border-border shadow-luxury overflow-hidden">
                <Table>
                  <TableHeader className="bg-ivory/50">
                    <TableRow>
                      <TableHead className="text-[9px] uppercase font-bold pl-8">Artifact</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold">Department</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-center">Market Stock</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-right">Value</TableHead>
                      <TableHead className="text-[9px] uppercase font-bold text-right pr-8">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.slice(0, 15).map(product => (
                      <TableRow key={product.id} className="hover:bg-ivory/30 transition-colors">
                        <TableCell className="pl-8">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-12 bg-muted rounded-sm flex-shrink-0 flex items-center justify-center text-[6px] font-bold uppercase text-gray-400 border border-border">
                              Asset
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold leading-tight">{product.name}</span>
                              <span className="text-[8px] text-gray-400 uppercase tracking-tighter">SKU: {product.id.toUpperCase()}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[8px] uppercase tracking-widest">{product.departmentId}</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={cn("text-xs font-bold", product.stock < 5 ? "text-red-500" : "text-gray-500")}>
                            {product.stock} Units
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

function OpsNavItem({ icon, label, active, onClick, href }: { icon: any, label: string, active?: boolean, onClick?: () => void, href?: string }) {
  const content = (
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

  if (href) return <Link href={href}>{content}</Link>;
  return content;
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

function PerformanceRow({ label, val }: { label: string, val: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
        <span className="opacity-60">{label}</span>
        <span className="text-secondary">{val}%</span>
      </div>
      <Progress value={val} className="h-1 bg-white/10" />
    </div>
  );
}
