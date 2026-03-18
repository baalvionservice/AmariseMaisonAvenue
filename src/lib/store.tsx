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
  ReturnRequest,
  PrivateInquiry,
  LeadConversation,
  CuratorMessage,
  CMSSection,
  SEOMetadata,
  SalesScript,
  AutomationRule
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
import { MOCK_INQUIRIES, MOCK_CONVERSATIONS } from './mock-sales';
import { ACQUISITION_SCRIPTS } from './mock-sales-system';

interface AppContextType {
  // --- Dynamic State Modules ---
  
  // CMS State
  cmsSections: CMSSection[];
  products: Product[];
  collections: Collection[];
  categories: Category[];
  departments: Department[];
  cities: City[];
  buyingGuides: BuyingGuide[];
  editorials: Editorial[];
  
  // CRM & Sales State
  privateInquiries: PrivateInquiry[];
  leadConversations: LeadConversation[];
  messagingTemplates: SalesScript[];
  
  // SEO State
  seoRegistry: SEOMetadata[];
  
  // Automation State
  automationRules: AutomationRule[];
  
  // Logistics & Admin State
  cart: CartItem[];
  wishlist: Product[];
  socialMetrics: Record<string, SocialMetrics>;
  admins: AdminAccount[];
  vendors: Vendor[];
  affiliates: Affiliate[];
  returns: ReturnRequest[];
  activeCampaigns: Campaign[];
  auditLogs: AuditLog[];
  vipClients: VipClient[];
  customerSegments: CustomerSegment[];
  globalSettings: GlobalSettings;
  supportTickets: SupportTicket[];
  supportStats: SupportStats;
  integrations: MaisonIntegration[];
  apiLogs: ApiLog[];
  indexingStatus: IndexingStatus;
  indexingLogs: IndexingLog[];
  appointments: Appointment[];
  invoices: Invoice[];

  // Showcase / Multi-Persona State
  isShowcaseMode: boolean;
  activeVip: VipClient | null;
  activeVendor: Vendor | null;
  
  // --- Actions & Methods ---
  
  // CMS Actions
  upsertCMSSection: (section: CMSSection) => void;
  upsertProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  upsertCollection: (collection: Collection) => void;
  upsertEditorial: (editorial: Editorial) => void;
  
  // Sales & CRM Actions
  upsertPrivateInquiry: (inquiry: PrivateInquiry) => void;
  updateInquiryStatus: (id: string, status: PrivateInquiry['status']) => void;
  addLeadMessage: (inquiryId: string, text: string, sender: 'curator' | 'client') => void;
  updateLeadTier: (id: string, tier: 1 | 2 | 3) => void;
  addInquiryNote: (id: string, note: string) => void;
  
  // SEO Actions
  upsertSEOMetadata: (meta: SEOMetadata) => void;
  
  // Messaging Actions
  upsertTemplate: (template: SalesScript) => void;
  
  // Automation Actions
  toggleRule: (id: string) => void;
  upsertRule: (rule: AutomationRule) => void;

  // Global Actions
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  toggleWishlist: (product: Product) => void;
  clearCart: () => void;
  updateGlobalSettings: (settings: GlobalSettings) => void;
  
  // System Controls
  setShowcaseMode: (val: boolean) => void;
  setActiveVip: (vip: VipClient | null) => void;
  setActiveVendor: (vendor: Vendor | null) => void;
  
  // Utility
  recordLog: (action: string, module: string, severity?: AuditLog['severity']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // CMS Module
  const [cmsSections, setCmsSections] = useState<CMSSection[]>([
    { id: 'hero', title: 'The Heritage Registry', subtitle: 'Institutional Acquisition House', visible: true, featured: true },
    { id: 'editorial-home', title: 'The Standard of the Absolute', visible: true, featured: false },
    { id: 'departments', title: 'Global Departments', visible: true, featured: false },
    { id: 'private-salon', title: 'Private Acquisition Salon', visible: true, featured: true }
  ]);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [collections, setCollections] = useState<Collection[]>(INITIAL_COLLECTIONS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [departments, setDepartments] = useState<Department[]>(INITIAL_DEPARTMENTS);
  const [cities, setCities] = useState<City[]>(INITIAL_CITIES);
  const [buyingGuides, setBuyingGuides] = useState<BuyingGuide[]>(INITIAL_GUIDES);
  const [editorials, setEditorials] = useState<Editorial[]>(EDITOR_INITIAL);

  // CRM Module
  const [privateInquiries, setPrivateInquiries] = useState<PrivateInquiry[]>(MOCK_INQUIRIES);
  const [leadConversations, setLeadConversations] = useState<LeadConversation[]>(MOCK_CONVERSATIONS);
  const [messagingTemplates, setMessagingTemplates] = useState<SalesScript[]>(ACQUISITION_SCRIPTS);

  // SEO Module
  const [seoRegistry, setSeoRegistry] = useState<SEOMetadata[]>([
    { id: 'home-us', path: '/us', title: 'AMARISÉ | The Heritage Registry (USA)', description: 'Elite acquisition hub for US collectors.', keywords: 'luxury, heritage, acquisition', h1: 'The Heritage Registry' },
    { id: 'home-uk', path: '/uk', title: 'AMARISÉ | London Heritage Souce', description: 'Traditional craftsmanship for the UK market.', keywords: 'london luxury, bond street', h1: 'The London Archive' }
  ]);

  // Automation Module
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([
    { id: 'rule-1', name: 'Auto-Reply: New Inquiry', trigger: 'inquiry_submitted', action: 'send_script', params: { scriptId: 'script-init' }, enabled: true },
    { id: 'rule-2', name: 'Priority Route: Tier 1', trigger: 'tier_assigned', action: 'notify_admin', params: { priority: 'urgent' }, enabled: true },
    { id: 'rule-3', name: 'Keyword: Investment Detect', trigger: 'keyword_match', action: 'send_script', params: { scriptId: 'script-investor' }, enabled: true }
  ]);

  // Global Logistics
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [socialMetrics, setSocialMetrics] = useState<Record<string, SocialMetrics>>({});
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
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(SUPPORT_TICKETS);
  const [supportStats] = useState<SupportStats>(SUPPORT_STATS);
  const [integrations] = useState<MaisonIntegration[]>(INTEGRATIONS);
  const [apiLogs] = useState<ApiLog[]>(API_LOGS);
  const [indexingStatus] = useState<IndexingStatus>(INDEXING_STATUS);
  const [indexingLogs] = useState<IndexingLog[]>(INDEXING_LOGS);

  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>({
    theme: { primary: '#000000', accent: '#D4AF37', fontFamily: 'Alegreya' },
    seo: { defaultTitle: 'AMARISÉ MAISON', defaultDesc: 'Global Acquisition House', sitemapUrl: '/sitemap.xml' },
    payments: { cards: true, wallets: true, crypto: false },
    compliance: { gdprEnabled: true, ccpaEnabled: true, pciStatus: 'Optimal' },
    performance: { cdnEnabled: true, cachingEnabled: true, autoScalingStatus: 'Ready' },
    emergencyMode: false
  });

  const [isShowcaseMode, setShowcaseMode] = useState(false);
  const [activeVip, setActiveVip] = useState<VipClient | null>(null);
  const [activeVendor, setActiveVendor] = useState<Vendor | null>(VENDORS[0]);

  // --- CMS Actions ---
  const upsertCMSSection = (s: CMSSection) => setCmsSections(prev => {
    const idx = prev.findIndex(item => item.id === s.id);
    return idx > -1 ? prev.map(item => item.id === s.id ? s : item) : [...prev, s];
  });

  const upsertProduct = (p: Product) => {
    setProducts(prev => {
      const idx = prev.findIndex(item => item.id === p.id);
      return idx > -1 ? prev.map(item => item.id === p.id ? p : item) : [p, ...prev];
    });
    recordLog(`Catalog Update: ${p.name}`, 'CMS');
  };

  const deleteProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));

  const upsertCollection = (c: Collection) => setCollections(prev => {
    const idx = prev.findIndex(item => item.id === c.id);
    return idx > -1 ? prev.map(item => item.id === c.id ? c : item) : [c, ...prev];
  });

  const upsertEditorial = (ed: Editorial) => setEditorials(prev => {
    const idx = prev.findIndex(item => item.id === ed.id);
    return idx > -1 ? prev.map(item => item.id === ed.id ? ed : item) : [ed, ...prev];
  });

  // --- Sales & CRM Actions ---
  const upsertPrivateInquiry = (inquiry: PrivateInquiry) => {
    setPrivateInquiries(prev => [inquiry, ...prev]);
    if (!leadConversations.find(c => c.inquiryId === inquiry.id)) {
      setLeadConversations(prev => [...prev, { id: `conv-${inquiry.id}`, inquiryId: inquiry.id, messages: [], status: 'active' }]);
    }
    recordLog(`New Acquisition Intent: ${inquiry.customerName}`, 'CRM');
  };

  const updateInquiryStatus = (id: string, status: PrivateInquiry['status']) => 
    setPrivateInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));

  const updateLeadTier = (id: string, leadTier: 1 | 2 | 3) => 
    setPrivateInquiries(prev => prev.map(i => i.id === id ? { ...i, leadTier } : i));

  const addInquiryNote = (id: string, adminNotes: string) => 
    setPrivateInquiries(prev => prev.map(i => i.id === id ? { ...i, adminNotes } : i));

  const addLeadMessage = (inquiryId: string, text: string, sender: 'curator' | 'client') => {
    setLeadConversations(prev => prev.map(c => {
      if (c.inquiryId === inquiryId) {
        const newMessage: CuratorMessage = { id: `msg-${Date.now()}`, sender, text, timestamp: new Date().toISOString() };
        return { ...c, messages: [...c.messages, newMessage] };
      }
      return c;
    }));
  };

  // --- SEO Actions ---
  const upsertSEOMetadata = (m: SEOMetadata) => setSeoRegistry(prev => {
    const idx = prev.findIndex(item => item.id === m.id);
    return idx > -1 ? prev.map(item => item.id === m.id ? m : item) : [...prev, m];
  });

  // --- Messaging Actions ---
  const upsertTemplate = (t: SalesScript) => setMessagingTemplates(prev => {
    const idx = prev.findIndex(item => item.id === t.id);
    return idx > -1 ? prev.map(item => item.id === t.id ? t : item) : [...prev, t];
  });

  // --- Automation Actions ---
  const toggleRule = (id: string) => setAutomationRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  const upsertRule = (r: AutomationRule) => setAutomationRules(prev => {
    const idx = prev.findIndex(item => item.id === r.id);
    return idx > -1 ? prev.map(item => item.id === r.id ? r : item) : [...prev, r];
  });

  // --- Global State ---
  const recordLog = (action: string, module: string, severity: AuditLog['severity'] = 'low') => {
    setAuditLogs(prev => [{ id: `log-${Date.now()}`, adminId: 'adm-current', adminName: 'Maison CEO', action, module, timestamp: new Date().toISOString(), ipAddress: '127.0.0.1', severity }, ...prev]);
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => setCart((prev) => prev.filter((item) => item.id !== productId));
  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) => prev.map(item => item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };
  const toggleWishlist = (product: Product) => setWishlist((prev) => prev.some(i => i.id === product.id) ? prev.filter(i => i.id !== product.id) : [...prev, product]);
  const clearCart = () => setCart([]);
  const updateGlobalSettings = (s: GlobalSettings) => setGlobalSettings(s);

  const value = useMemo(() => ({
    cmsSections, products, collections, categories, departments, cities, buyingGuides, editorials,
    privateInquiries, leadConversations, messagingTemplates, seoRegistry, automationRules,
    cart, wishlist, socialMetrics, admins, vendors, affiliates, returns, activeCampaigns, auditLogs,
    vipClients, customerSegments, globalSettings, supportTickets, supportStats, integrations, apiLogs,
    indexingStatus, indexingLogs, appointments, invoices, isShowcaseMode, activeVip, activeVendor,
    upsertCMSSection, upsertProduct, deleteProduct, upsertCollection, upsertEditorial,
    upsertPrivateInquiry, updateInquiryStatus, addLeadMessage, updateLeadTier, addInquiryNote,
    upsertSEOMetadata, upsertTemplate, toggleRule, upsertRule,
    addToCart, removeFromCart, updateQuantity, toggleWishlist, clearCart, updateGlobalSettings,
    setShowcaseMode, setActiveVip, setActiveVendor, recordLog
  }), [cmsSections, products, collections, categories, departments, cities, buyingGuides, editorials, privateInquiries, leadConversations, messagingTemplates, seoRegistry, automationRules, cart, wishlist, socialMetrics, admins, vendors, affiliates, returns, activeCampaigns, auditLogs, vipClients, customerSegments, globalSettings, supportTickets, supportStats, integrations, apiLogs, indexingStatus, indexingLogs, appointments, invoices, isShowcaseMode, activeVip, activeVendor]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppStore must be used within AppProvider');
  return context;
}
