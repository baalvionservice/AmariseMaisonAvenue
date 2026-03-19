
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Globe, 
  Package, 
  Zap, 
  Target, 
  Truck, 
  CreditCard, 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  FlaskConical,
  ChevronRight,
  ChevronDown,
  RefreshCcw,
  BookOpen,
  Eye,
  Settings2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import { Switch } from '@/components/ui/switch';

/**
 * AdminSidebar: Tiered Navigation Hub
 * Filters terminals based on Operator Mode (Simple vs. Advanced).
 */
export function AdminSidebar() {
  const pathname = usePathname();
  const { currentUser, globalSettings, setAdminViewMode } = useAppStore();

  const isJunior = currentUser?.role === 'operator';
  const isSuper = currentUser?.role === 'super_admin';
  const isAdvancedMode = globalSettings.adminViewMode === 'advanced';

  return (
    <aside className="w-72 border-r border-border bg-white p-8 flex flex-col space-y-12 shadow-sm z-20 shrink-0">
      <div className="space-y-4">
        <Link href="/admin">
          <div className="font-headline text-3xl font-bold tracking-tighter text-gray-900">
            AMARISÉ <span className="text-plum text-xs font-normal tracking-[0.4em] ml-2">CORE</span>
          </div>
        </Link>
        
        {/* Operator Mode Toggle */}
        <div className="flex items-center justify-between p-3 bg-ivory border border-border rounded-sm">
           <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Advanced Mode</span>
           <Switch 
            checked={isAdvancedMode} 
            onCheckedChange={(val) => setAdminViewMode(val ? 'advanced' : 'simple')}
            className="data-[state=checked]:bg-plum scale-75" 
           />
        </div>
      </div>
      
      <nav className="flex-1 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
        {/* Block 1: Intelligence (Always Visible) */}
        <NavBlock title="Intelligence">
          <NavLink icon={<LayoutDashboard />} label="Today's Focus" href="/admin" active={pathname === '/admin'} />
          {isSuper && isAdvancedMode && <NavLink icon={<Globe />} label="Global Matrix" href="/admin/super" active={pathname === '/admin/super'} />}
        </NavBlock>

        {/* Block 2: Commerce (Always Visible) */}
        <NavBlock title="Commerce">
          <NavLink icon={<Package />} label="Atelier Registry" href="/admin/content" active={pathname === '/admin/content'} />
          <NavLink icon={<Target />} label="Connoisseur CRM" href="/admin/sales" active={pathname === '/admin/sales'} />
          {isAdvancedMode && <NavLink icon={<Zap />} label="AI Autopilot" href="/admin/ai-dashboard" active={pathname === '/admin/ai-dashboard'} />}
        </NavBlock>

        {/* Block 3: Institutional (Advanced Only) */}
        {isAdvancedMode && !isJunior && (
          <NavBlock title="Institutional">
            <NavLink icon={<Truck />} label="Operations Hub" href="/admin/operations" active={pathname === '/admin/operations'} />
            <NavLink icon={<CreditCard />} label="Finance Hub" href="/admin/finance" active={pathname === '/admin/finance'} />
            <NavLink icon={<Search />} label="SEO Authority" href="/admin/seo" active={pathname === '/admin/seo'} />
          </NavBlock>
        )}

        {/* Block 4: System Resilience (Advanced Only) */}
        {isAdvancedMode && !isJunior && (
          <NavBlock title="Resilience">
            <NavLink icon={<ShieldAlert />} label="Error Matrix" href="/admin/errors" active={pathname === '/admin/errors'} />
            <NavLink icon={<ShieldCheck />} label="Compliance Hub" href="/admin/compliance" active={pathname === '/admin/compliance'} />
            <NavLink icon={<FlaskConical />} label="QA Laboratory" href="/admin/qa" active={pathname === '/admin/qa'} />
          </NavBlock>
        )}
      </nav>

      <div className="pt-8 border-t border-border space-y-4">
        <Link href="/us" className="group">
          <button className="w-full flex items-center space-x-4 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-plum transition-all">
            <BookOpen className="w-4 h-4" />
            <span>Visit Flagship</span>
          </button>
        </Link>
      </div>
    </aside>
  );
}

function NavBlock({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h4 className="text-[8px] font-bold uppercase tracking-[0.4em] text-gray-300 ml-6">{title}</h4>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function NavLink({ icon, label, href, active }: { icon: any, label: string, href: string, active: boolean }) {
  return (
    <Link href={href}>
      <button className={cn(
        "w-full flex items-center space-x-4 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all group rounded-sm border border-transparent",
        active ? "bg-plum text-white shadow-xl shadow-plum/10 border-plum/20" : "text-gray-400 hover:bg-ivory hover:text-plum"
      )}>
        <span className={cn("transition-transform group-hover:scale-110", active ? "text-gold" : "text-gold/40 group-hover:text-gold")}>
          {React.cloneElement(icon as React.ReactElement, { className: "w-4 h-4" })}
        </span>
        <span className="truncate">{label}</span>
        {active && <ChevronRight className="w-3 h-3 ml-auto opacity-50" />}
      </button>
    </Link>
  );
}
