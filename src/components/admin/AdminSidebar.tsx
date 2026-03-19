
'use client';

import React, { useState } from 'react';
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
  ChevronDown,
  ChevronRight,
  LogOut,
  Settings,
  CircleHelp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';

/**
 * AdminSidebar: Grouped Enterprise Navigation
 * Categorizes 11 specialized terminals into logical business units.
 */
export function AdminSidebar() {
  const pathname = usePathname();
  const { currentUser } = useAppStore();

  const menuGroups = [
    {
      title: "Dashboard",
      items: [
        { icon: <LayoutDashboard />, label: "Command Center", href: "/admin" },
        { icon: <Globe />, label: "Global Matrix", href: "/admin/super" },
      ]
    },
    {
      title: "Products",
      items: [
        { icon: <Package />, label: "Atelier CMS", href: "/admin/content" },
        { icon: <Zap />, label: "AI Autopilot", href: "/admin/ai-dashboard" },
      ]
    },
    {
      title: "Sales",
      items: [
        { icon: <Target />, label: "Sales CRM", href: "/admin/sales" },
      ]
    },
    {
      title: "Operations",
      items: [
        { icon: <Truck />, label: "Operations Hub", href: "/admin/operations" },
        { icon: <CreditCard />, label: "Finance Hub", href: "/admin/finance" },
      ]
    },
    {
      title: "Growth",
      items: [
        { icon: <Search />, label: "SEO Authority", href: "/admin/seo" },
      ]
    },
    {
      title: "System",
      items: [
        { icon: <ShieldAlert />, label: "Error Matrix", href: "/admin/errors" },
        { icon: <ShieldCheck />, label: "Compliance Hub", href: "/admin/compliance" },
        { icon: <FlaskConical />, label: "QA Terminal", href: "/admin/qa" },
      ]
    }
  ];

  return (
    <aside className="w-72 bg-[#132F3F] text-slate-300 flex flex-col shadow-2xl z-50">
      {/* Brand Identity */}
      <div className="p-8 border-b border-white/5">
        <Link href="/admin">
          <div className="font-headline text-2xl font-bold tracking-tighter text-white flex items-center group">
            AMARISÉ <span className="text-teal-400 text-[10px] font-bold tracking-[0.3em] ml-2 opacity-80 group-hover:opacity-100 transition-opacity">CORE</span>
          </div>
        </Link>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-2">Maison OS v5.2</p>
      </div>

      {/* Grouped Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 py-6 space-y-8 custom-scrollbar">
        {menuGroups.map((group) => (
          <div key={group.title} className="space-y-2">
            <h4 className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{group.title}</h4>
            <div className="space-y-1">
              {group.items.map((item) => (
                <Link key={item.href} href={item.href}>
                  <button className={cn(
                    "w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-all duration-300 text-sm font-medium group",
                    pathname === item.href 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                      : "hover:bg-white/5 hover:text-white"
                  )}>
                    <span className={cn(
                      "transition-transform group-hover:scale-110",
                      pathname === item.href ? "text-white" : "text-teal-500/60 group-hover:text-teal-400"
                    )}>
                      {React.cloneElement(item.icon as React.ReactElement, { size: 18 })}
                    </span>
                    <span className="flex-1 text-left">{item.label}</span>
                    {pathname === item.href && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium hover:bg-white/5 transition-colors text-slate-400">
          <Settings size={18} />
          <span>Settings</span>
        </button>
        <Link href="/us">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium hover:bg-red-500/10 text-red-400 transition-colors">
            <LogOut size={18} />
            <span>Exit Admin</span>
          </button>
        </Link>
      </div>
    </aside>
  );
}
