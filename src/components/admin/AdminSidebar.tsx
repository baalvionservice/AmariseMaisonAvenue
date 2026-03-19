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
  LogOut,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * AdminSidebar: Minimal Dark Navigation
 * Redesigned for high-ticket curatorial oversight.
 */
export function AdminSidebar() {
  const pathname = usePathname();

  const menuGroups = [
    {
      title: "Tactical",
      items: [
        { icon: <LayoutDashboard />, label: "Terminal", href: "/admin" },
        { icon: <Globe />, label: "Global Matrix", href: "/admin/super" },
      ]
    },
    {
      title: "Inventory",
      items: [
        { icon: <Package />, label: "Registry", href: "/admin/content" },
        { icon: <Zap />, label: "AI Autopilot", href: "/admin/ai-dashboard" },
      ]
    },
    {
      title: "Acquisition",
      items: [
        { icon: <Target />, label: "CRM", href: "/admin/sales" },
        { icon: <CreditCard />, label: "Treasury", href: "/admin/finance" },
      ]
    },
    {
      title: "Infrastructure",
      items: [
        { icon: <ShieldAlert />, label: "Anomalies", href: "/admin/errors" },
        { icon: <ShieldCheck />, label: "Audit", href: "/admin/compliance" },
      ]
    }
  ];

  return (
    <aside className="w-72 bg-[#111113] border-r border-white/5 flex flex-col z-50">
      {/* Brand Signature */}
      <div className="p-10 border-b border-white/5">
        <Link href="/admin">
          <div className="font-headline text-3xl font-bold tracking-tighter text-white flex items-center group">
            AMARISÉ <span className="text-blue-500 text-[10px] font-bold tracking-[0.4em] ml-2 opacity-60">CORE</span>
          </div>
        </Link>
      </div>

      {/* Navigation Matrix */}
      <nav className="flex-1 overflow-y-auto p-6 py-10 space-y-12 custom-scrollbar">
        {menuGroups.map((group) => (
          <div key={group.title} className="space-y-4">
            <h4 className="px-4 text-[9px] font-bold uppercase tracking-[0.3em] text-white/20">{group.title}</h4>
            <div className="space-y-1">
              {group.items.map((item) => (
                <Link key={item.href} href={item.href}>
                  <button className={cn(
                    "w-full flex items-center space-x-4 px-4 py-3 rounded-none transition-all duration-500 text-xs group border-none bg-transparent outline-none cursor-pointer",
                    pathname === item.href 
                      ? "bg-white/5 text-white border-l-2 border-blue-500" 
                      : "text-white/40 hover:text-white hover:bg-white/5"
                  )}>
                    <span className={cn(
                      "transition-transform duration-500 group-hover:scale-110",
                      pathname === item.href ? "text-blue-500" : "text-white/20 group-hover:text-white/60"
                    )}>
                      {React.cloneElement(item.icon as React.ReactElement, { size: 16 })}
                    </span>
                    <span className="flex-1 text-left tracking-widest uppercase">{item.label}</span>
                    {pathname === item.href && <ChevronRight className="w-3 h-3 text-blue-500" />}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Terminal Footer */}
      <div className="p-6 border-t border-white/5 space-y-2">
        <button className="w-full flex items-center space-x-4 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors border-none bg-transparent outline-none cursor-pointer">
          <Settings size={16} />
          <span>Config</span>
        </button>
        <Link href="/us">
          <button className="w-full flex items-center space-x-4 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-red-500/40 hover:text-red-500 transition-colors border-none bg-transparent outline-none cursor-pointer">
            <LogOut size={16} />
            <span>Exit Node</span>
          </button>
        </Link>
      </div>
    </aside>
  );
}
