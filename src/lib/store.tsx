
'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  CartItem, 
  Product, 
  Collection, 
  Category, 
  Department,
  City, 
  BuyingGuide, 
  Editorial,
  SocialMetrics,
  AdminAccount,
  Vendor,
  Campaign,
  AuditLog,
  VipClient,
  GlobalSettings,
  CustomerSegment,
  SupportTicket,
  SupportStats,
  MaisonIntegration,
  ApiLog,
  IndexingStatus,
  IndexingLog,
  Appointment,
  Invoice,
  Affiliate,
  ReturnRequest
} from './types';
import { 
  PRODUCTS as INITIAL_PRODUCTS, 
  COLLECTIONS as INITIAL_COLLECTIONS, 
  CATEGORIES as INITIAL_CATEGORIES,
  DEPARTMENTS as INITIAL_DEPARTMENTS,
  CITIES as INITIAL_CITIES,
  BUYING_GUIDES as INITIAL_GUIDES,
  EDITOR_INITIAL,
  ADMIN_ACCOUNTS,
  VENDORS,
  CAMPAIGNS,
  AUDIT_LOGS,
  VIP_CLIENTS,
  CUSTOMER_SEGMENTS,
  SUPPORT_TICKETS,
  SUPPORT_STATS,
  INTEGRATIONS,
  API_LOGS,
  INDEXING_STATUS,
  INDEXING_LOGS,
  APPOINTMENTS,
  INVOICES,
  AFFILIATES,
  RETURNS
} from './mock-data';

interface AppContextType {
  // Data State
  cart: CartItem[];
  wishlist: Product[];
  products: Product[];
  collections: Collection[];
  categories: Category[];
  departments: Department[];
  cities: City[];
  buyingGuides: BuyingGuide[];
  editorials: Editorial[];
  socialMetrics: Record<string, SocialMetrics>;
  
  // High-Level Admin State
  admins: AdminAccount[];
  vendors: Vendor[];
  affiliates: Affiliate[];
  returns: ReturnRequest[];
  activeCampaigns: Campaign[];
  auditLogs: AuditLog[];
  vipClients: VipClient[];
  customerSegments: CustomerSegment[];
  globalSettings: GlobalSettings;
  appointments: Appointment[];
  invoices: Invoice[];
  
  // Support Hub State
  supportTickets: SupportTicket[];
  supportStats: SupportStats;

  // Integration Hub State
  integrations: MaisonIntegration[];
  apiLogs: ApiLog[];
  
  // Indexing State
  indexingStatus: IndexingStatus;
  indexingLogs: IndexingLog[];

  // Showcase State
  isShowcaseMode: boolean;
  activeVip: VipClient | null;
  activeVendor: Vendor | null;
  
  // Actions
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  toggleWishlist: (product: Product) => void;
  clearCart: () => void;
  
  // Admin Actions
  upsertProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  upsertCollection: (collection: Collection) => void;
  upsertEditorial: (editorial: Editorial) => void;
  upsertAdmin: (admin: AdminAccount) => void;
  upsertVendor: (vendor: Vendor) => void;
  upsertAffiliate: (affiliate: Affiliate) => void;
  upsertCampaign: (campaign: Campaign) => void;
  updateGlobalSettings: (settings: GlobalSettings) => void;
  upsertSegment: (segment: CustomerSegment) => void;
  upsertAppointment: (apt: Appointment) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  updateReturnStatus: (id: string, status: ReturnRequest['status']) => void;
  createInvoice: (invoice: Invoice) => void;
  
  // Support Actions
  updateTicketStatus: (ticketId: string, status: SupportTicket['status']) => void;
  assignTicket: (ticketId: string, adminId: string) => void;
  addTicketMessage: (ticketId: string, text: string, sender: 'agent' | 'customer') => void;

  // Integration Actions
  toggleIntegration: (id: string) => void;
  toggleEmergencyMode: () => void;
  
  // Indexing Actions
  triggerReindex: (type: 'catalog' | 'sitemap' | 'search') => void;
  toggleAutoSync: () => void;

  // Social Actions
  toggleLike: (contentId: string, country: string) => void;
  trackShare: (contentId: string, country: string) => void;
  
  // System Controls
  setShowcaseMode: (val: boolean) => void;
  setActiveVip: (vip: VipClient | null) => void;
  setActiveVendor: (vendor: Vendor | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [collections, setCollections] = useState<Collection[]>(INITIAL_COLLECTIONS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [departments, setDepartments] = useState<Department[]>(INITIAL_DEPARTMENTS);
  const [cities, setCities] = useState<City[]>(INITIAL_CITIES);
  const [buyingGuides, setBuyingGuides] = useState<BuyingGuide[]>(INITIAL_GUIDES);
  const [editorials, setEditorials] = useState<Editorial[]>(EDITOR_INITIAL);
  const [socialMetrics, setSocialMetrics] = useState<Record<string, SocialMetrics>>({});
  
  // Admin State
  const [admins, setAdmins] = useState<AdminAccount[]>(ADMIN_ACCOUNTS);
  const [vendors, setVendors] = useState<Vendor[]>(VENDORS);
  const [affiliates, setAffiliates] = useState<Affiliate[]>(AFFILIATES);
  const [returns, setReturns] = useState<ReturnRequest[]>(RETURNS);
  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>(CAMPAIGNS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(AUDIT_LOGS);
  const [vipClients, setVipClients] = useState<VipClient[]>(VIP_CLIENTS);
  const [customerSegments, setCustomerSegments] = useState<CustomerSegment[]>(CUSTOMER_SEGMENTS);
  const [appointments, setAppointments] = useState<Appointment[]>(APPOINTMENTS);
  const [invoices, setInvoices] = useState<Invoice[]>(INVOICES);
  
  // Support Hub State
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(SUPPORT_TICKETS);
  const [supportStats, setSupportStats] = useState<SupportStats>(SUPPORT_STATS);

  // Integration Hub State
  const [integrations, setIntegrations] = useState<MaisonIntegration[]>(INTEGRATIONS);
  const [apiLogs, setApiLogs] = useState<ApiLog[]>(API_LOGS);

  // Indexing State
  const [indexingStatus, setIndexingStatus] = useState<IndexingStatus>(INDEXING_STATUS);
  const [indexingLogs, setIndexingLogs] = useState<IndexingLog[]>(INDEXING_LOGS);

  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>({
    theme: { primary: '#7E3F98', accent: '#D4AF37', fontFamily: 'Inter' },
    seo: { defaultTitle: 'Amarisé Luxe', defaultDesc: 'Global Luxury Flagship', sitemapUrl: '/sitemap.xml' },
    payments: { cards: true, wallets: true, crypto: false },
    compliance: { gdprEnabled: true, ccpaEnabled: true, pciStatus: 'Optimal' },
    performance: { cdnEnabled: true, cachingEnabled: true, autoScalingStatus: 'Ready' },
    emergencyMode: false
  });
  
  const [isShowcaseMode, setShowcaseMode] = useState(false);
  const [activeVip, setActiveVip] = useState<VipClient | null>(null);
  const [activeVendor, setActiveVendor] = useState<Vendor | null>(VENDORS[0]);

  const recordLog = (action: string, module: string, severity: AuditLog['severity'] = 'low') => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      adminId: 'adm-current',
      adminName: 'Maison CEO',
      action,
      module,
      timestamp: new Date().toISOString(),
      ipAddress: '127.0.0.1',
      severity
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const simulateApiCall = (endpoint: string, method: ApiLog['method'], status: number = 200) => {
    const newLog: ApiLog = {
      id: `apilog-${Date.now()}`,
      timestamp: new Date().toISOString(),
      endpoint,
      method,
      status,
      latency: `${Math.floor(Math.random() * 200) + 20}ms`,
      integrationId: 'int-dynamic'
    };
    setApiLogs(prev => [newLog, ...prev.slice(0, 9)]);
  };

  useEffect(() => {
    const initialMetrics: Record<string, SocialMetrics> = {};
    // Populate metrics for all content types to simulate high-authority resonance
    products.forEach(p => {
      initialMetrics[p.id] = {
        likes: Math.floor(Math.random() * 1000) + 100,
        shares: Math.floor(Math.random() * 200) + 50,
        engagementRate: Math.random() * 5 + 2
      };
    });
    editorials.forEach(ed => {
      initialMetrics[ed.id] = {
        likes: Math.floor(Math.random() * 5000) + 500,
        shares: Math.floor(Math.random() * 1000) + 100,
        engagementRate: Math.random() * 8 + 4
      };
    });
    buyingGuides.forEach(bg => {
      initialMetrics[bg.id] = {
        likes: Math.floor(Math.random() * 3000) + 300,
        shares: Math.floor(Math.random() * 800) + 50,
        engagementRate: Math.random() * 6 + 3
      };
    });
    setSocialMetrics(initialMetrics);
  }, [products, editorials, buyingGuides]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    simulateApiCall('/cart/add', 'POST');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    simulateApiCall('/cart/remove', 'DELETE');
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) return prev.filter((item) => item.id !== product.id);
      return [...prev, product];
    });
    simulateApiCall('/wishlist/toggle', 'POST');
  };

  const clearCart = () => setCart([]);

  const upsertProduct = (p: Product) => {
    setProducts(prev => {
      const idx = prev.findIndex(item => item.id === p.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = p;
        return next;
      }
      return [p, ...prev];
    });
    recordLog(`Upserted Artifact: ${p.name}`, 'Catalog Atelier');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    recordLog(`Deleted Artifact: ${id}`, 'Catalog Atelier', 'medium');
  };

  const upsertCollection = (c: Collection) => {
    setCollections(prev => {
      const idx = prev.findIndex(item => item.id === c.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = c;
        return next;
      }
      return [c, ...prev];
    });
  };

  const upsertEditorial = (ed: Editorial) => {
    setEditorials(prev => {
      const idx = prev.findIndex(item => item.id === ed.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = ed;
        return next;
      }
      return [ed, ...prev];
    });
  };

  const upsertAdmin = (admin: AdminAccount) => {
    setAdmins(prev => {
      const idx = prev.findIndex(a => a.id === admin.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = admin;
        return next;
      }
      return [admin, ...prev];
    });
  };

  const upsertVendor = (vendor: Vendor) => {
    setVendors(prev => {
      const idx = prev.findIndex(v => v.id === vendor.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = vendor;
        return next;
      }
      return [vendor, ...prev];
    });
  };

  const upsertAffiliate = (aff: Affiliate) => {
    setAffiliates(prev => {
      const idx = prev.findIndex(a => a.id === aff.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = aff;
        return next;
      }
      return [aff, ...prev];
    });
  };

  const upsertCampaign = (campaign: Campaign) => {
    setActiveCampaigns(prev => {
      const idx = prev.findIndex(c => c.id === campaign.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = campaign;
        return next;
      }
      return [campaign, ...prev];
    });
  };

  const upsertSegment = (seg: CustomerSegment) => {
    setCustomerSegments(prev => {
      const idx = prev.findIndex(s => s.id === seg.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = seg;
        return next;
      }
      return [seg, ...prev];
    });
  };

  const upsertAppointment = (apt: Appointment) => {
    setAppointments(prev => [...prev, apt]);
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const updateReturnStatus = (id: string, status: ReturnRequest['status']) => {
    setReturns(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    recordLog(`Return ${id} set to ${status}`, 'Operations');
  };

  const createInvoice = (invoice: Invoice) => {
    setInvoices(prev => [invoice, ...prev]);
  };

  const updateTicketStatus = (id: string, status: SupportTicket['status']) => {
    setSupportTickets(prev => prev.map(t => t.id === id ? { ...t, status, updatedAt: new Date().toISOString() } : t));
  };

  const assignTicket = (ticketId: string, adminId: string) => {
    setSupportTickets(prev => prev.map(t => t.id === ticketId ? { ...t, assignedTo: adminId, updatedAt: new Date().toISOString() } : t));
  };

  const addTicketMessage = (ticketId: string, text: string, sender: 'agent' | 'customer') => {
    setSupportTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        const newMessage = { id: `msg-${Date.now()}`, sender, text, timestamp: new Date().toISOString() };
        return { 
          ...t, 
          messages: [...t.messages, newMessage], 
          lastMessage: text,
          updatedAt: new Date().toISOString() 
        };
      }
      return t;
    }));
  };

  const toggleIntegration = (id: string) => {
    setIntegrations(prev => prev.map(i => {
      if (i.id === id) {
        const newStatus = i.status === 'Connected' ? 'Disconnected' : 'Connected';
        return { ...i, status: newStatus as any };
      }
      return i;
    }));
  };

  const toggleEmergencyMode = () => {
    setGlobalSettings(prev => ({ ...prev, emergencyMode: !prev.emergencyMode }));
    recordLog('Emergency Mode Toggled', 'IT Architecture', 'high');
  };

  const triggerReindex = (type: 'catalog' | 'sitemap' | 'search') => {
    const newLog: IndexingLog = {
      id: `idx-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: `Manual ${type.charAt(0).toUpperCase() + type.slice(1)} Refresh`,
      itemsAffected: indexingStatus.catalogItems,
      duration: '45s',
      status: 'Success'
    };
    setIndexingLogs(prev => [newLog, ...prev]);
    setIndexingStatus(prev => ({ ...prev, lastFullScan: new Date().toISOString() }));
  };

  const toggleAutoSync = () => {
    setIndexingStatus(prev => ({ ...prev, autoSyncEnabled: !prev.autoSyncEnabled }));
  };

  const updateGlobalSettings = (settings: GlobalSettings) => {
    setGlobalSettings(settings);
  };

  const toggleLike = (contentId: string, country: string) => {
    setSocialMetrics(prev => {
      const current = prev[contentId] || { likes: 0, shares: 0, engagementRate: 0 };
      return { ...prev, [contentId]: { ...current, likes: current.likes + 1 } };
    });
  };

  const trackShare = (contentId: string, country: string) => {
    setSocialMetrics(prev => {
      const current = prev[contentId] || { likes: 0, shares: 0, engagementRate: 0 };
      return { ...prev, [contentId]: { ...current, shares: current.shares + 1 } };
    });
  };

  const value = useMemo(() => ({
    cart,
    wishlist,
    products,
    collections,
    categories,
    departments,
    cities,
    buyingGuides,
    editorials,
    socialMetrics,
    admins,
    vendors,
    affiliates,
    returns,
    activeCampaigns,
    auditLogs,
    vipClients,
    customerSegments,
    globalSettings,
    supportTickets,
    supportStats,
    integrations,
    apiLogs,
    indexingStatus,
    indexingLogs,
    appointments,
    invoices,
    isShowcaseMode,
    activeVip,
    activeVendor,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    clearCart,
    upsertProduct,
    deleteProduct,
    upsertCollection,
    upsertEditorial,
    upsertAdmin,
    upsertVendor,
    upsertAffiliate,
    upsertCampaign,
    upsertSegment,
    upsertAppointment,
    updateAppointmentStatus,
    updateReturnStatus,
    createInvoice,
    updateGlobalSettings,
    updateTicketStatus,
    assignTicket,
    addTicketMessage,
    toggleIntegration,
    toggleEmergencyMode,
    triggerReindex,
    toggleAutoSync,
    toggleLike,
    trackShare,
    setShowcaseMode,
    setActiveVip,
    setActiveVendor,
  }), [cart, wishlist, products, collections, categories, departments, cities, buyingGuides, editorials, socialMetrics, admins, vendors, affiliates, returns, activeCampaigns, auditLogs, vipClients, customerSegments, globalSettings, supportTickets, supportStats, integrations, apiLogs, indexingStatus, indexingLogs, appointments, invoices, isShowcaseMode, activeVip, activeVendor]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppStore must be used within AppProvider');
  return context;
}
