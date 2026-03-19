
'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
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
  AutomationRule,
  CountryConfig,
  BrandConfig,
  CountryCode,
  AIModuleStatus,
  AIActionLog,
  AISuggestion,
  AIAutomationLevel,
  MaisonNotification,
  WorkflowTask,
  ApprovalRequest,
  AnalyticsMetric
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
import { COUNTRIES_CONFIG, BRANDS_CONFIG } from './mock-global-config';
import { MOCK_SESSION_USER } from './rbac/mock-session';
import { MaisonUser } from './rbac/mock-users';

interface AppContextType {
  // --- Global Infrastructure ---
  countryConfigs: CountryConfig[];
  brandConfigs: BrandConfig[];
  activeBrandId: string;
  currentUser: MaisonUser | null;
  
  // Scoped Data Views
  scopedProducts: Product[];
  scopedInquiries: PrivateInquiry[];
  scopedEditorials: Editorial[];
  scopedBuyingGuides: BuyingGuide[];
  scopedReturns: ReturnRequest[];
  scopedNotifications: MaisonNotification[];
  scopedApprovals: ApprovalRequest[];
  
  // Core Lists
  cmsSections: CMSSection[];
  products: Product[];
  collections: Collection[];
  categories: Category[];
  departments: Department[];
  cities: City[];
  buyingGuides: BuyingGuide[];
  editorials: Editorial[];
  
  // CRM State
  privateInquiries: PrivateInquiry[];
  leadConversations: LeadConversation[];
  messagingTemplates: SalesScript[];
  
  // SEO State
  seoRegistry: SEOMetadata[];
  
  // Automation & AI State
  automationRules: AutomationRule[];
  aiModules: AIModuleStatus[];
  aiLogs: AIActionLog[];
  aiSuggestions: AISuggestion[];
  
  // Operational State
  notifications: MaisonNotification[];
  workflows: WorkflowTask[];
  approvalRequests: ApprovalRequest[];
  analyticsData: AnalyticsMetric[];
  
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

  // Showcase State
  isShowcaseMode: boolean;
  activeVip: VipClient | null;
  activeVendor: Vendor | null;
  
  // --- Actions ---
  setCountryEnabled: (code: CountryCode, enabled: boolean) => void;
  updateCountryConfig: (config: CountryConfig) => void;
  setActiveBrand: (id: string) => void;
  setCurrentUser: (user: MaisonUser | null) => void;
  
  // CMS Actions
  upsertCMSSection: (section: CMSSection) => void;
  upsertProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  upsertCollection: (collection: Collection) => void;
  upsertEditorial: (editorial: Editorial) => void;
  
  // Sales Actions
  upsertPrivateInquiry: (inquiry: PrivateInquiry) => void;
  updateInquiryStatus: (id: string, status: PrivateInquiry['status']) => void;
  addLeadMessage: (inquiryId: string, text: string, sender: 'curator' | 'client') => void;
  
  // Operational Actions
  sendNotification: (toRole: string, message: string, country?: string, type?: MaisonNotification['type']) => void;
  markNotificationRead: (id: string) => void;
  scheduleWorkflow: (taskName: string, frequency: WorkflowTask['frequency'], country?: string) => void;
  runWorkflowTask: (id: string) => void;
  submitApproval: (contentType: ApprovalRequest['contentType'], contentId: string, country?: string) => void;
  handleApprovalAction: (requestId: string, approve: boolean, comments?: string) => void;
  toggleEmergencyMode: () => void;
  triggerReindex: (type: string) => void;

  // AI Actions
  updateAIModule: (id: string, enabled: boolean, level: AIAutomationLevel) => void;
  addAILog: (log: AIActionLog) => void;
  upsertAISuggestion: (suggestion: AISuggestion) => void;
  updateSuggestionStatus: (id: string, status: AISuggestion['status']) => void;

  // Global Actions
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  clearCart: () => void;
  updateGlobalSettings: (settings: GlobalSettings) => void;
  setShowcaseMode: (val: boolean) => void;
  setActiveVip: (vip: VipClient | null) => void;
  setActiveVendor: (vendor: Vendor | null) => void;
  recordLog: (action: string, module: string, severity?: AuditLog['severity']) => void;
  createInvoice: (invoice: Invoice) => void;
  toggleLike: (articleId: string, country: string) => void;
  trackShare: (articleId: string, country: string) => void;
  upsertAppointment: (appointment: Appointment) => void;
  updateTicketStatus: (id: string, status: SupportTicket['status']) => void;
  addTicketMessage: (ticketId: string, text: string, sender: 'agent' | 'customer') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Global Infrastructure
  const [countryConfigs, setCountryConfigs] = useState<CountryConfig[]>(COUNTRIES_CONFIG);
  const [brandConfigs, setBrandConfigs] = useState<BrandConfig[]>(BRANDS_CONFIG);
  const [activeBrandId, setActiveBrandId] = useState<string>(BRANDS_CONFIG[0].id);
  const [currentUser, setCurrentUser] = useState<MaisonUser | null>(MOCK_SESSION_USER);

  // Content state
  const [cmsSections, setCmsSections] = useState<CMSSection[]>([
    { id: 'hero', title: 'The Heritage Registry', visible: true, featured: true, brandId: activeBrandId },
    { id: 'private-salon', title: 'Private Acquisition Salon', visible: true, featured: true, brandId: activeBrandId }
  ]);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS.map(p => ({ ...p, brandId: activeBrandId, isGlobal: true })));
  const [collections] = useState<Collection[]>(INITIAL_COLLECTIONS.map(c => ({ ...c, brandId: activeBrandId, isGlobal: true })));
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES.map(c => ({ ...c, brandId: activeBrandId })));
  const [departments] = useState<Department[]>(INITIAL_DEPARTMENTS.map(d => ({ ...d, brandId: activeBrandId })));
  const [cities] = useState<City[]>(INITIAL_CITIES);
  const [buyingGuides] = useState<BuyingGuide[]>(INITIAL_GUIDES.map(g => ({ ...g, brandId: activeBrandId, isGlobal: false })));
  const [editorials] = useState<Editorial[]>(EDITOR_INITIAL.map(e => ({ ...e, brandId: activeBrandId, isGlobal: false })));

  // CRM state
  const [privateInquiries, setPrivateInquiries] = useState<PrivateInquiry[]>(MOCK_INQUIRIES.map(i => ({ ...i, brandId: activeBrandId })));
  const [leadConversations, setLeadConversations] = useState<LeadConversation[]>(MOCK_CONVERSATIONS.map(c => ({ ...c, brandId: activeBrandId })));
  const [messagingTemplates, setMessagingTemplates] = useState<SalesScript[]>(ACQUISITION_SCRIPTS.map(s => ({ ...s, brandId: activeBrandId })));

  // SEO state
  const [seoRegistry] = useState<SEOMetadata[]>([
    { id: 'home-us', path: '/us', title: 'AMARISÉ | The Heritage Registry (USA)', description: 'Elite acquisition hub.', keywords: 'luxury, heritage', h1: 'The Heritage Registry', brandId: activeBrandId, isGlobal: false }
  ]);

  // AI & Automation state
  const [aiModules, setAiModules] = useState<AIModuleStatus[]>([
    { id: 'ai-sales', name: 'AI Sales Agent', enabled: true, level: 'assisted' },
    { id: 'ai-analytics', name: 'AI Analytics Engine', enabled: true, level: 'auto' }
  ]);
  const [aiLogs, setAiLogs] = useState<AIActionLog[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>([]);
  const [automationRules] = useState<AutomationRule[]>([]);

  // Operational state
  const [notifications, setNotifications] = useState<MaisonNotification[]>([
    { id: 'n1', toRole: 'country_admin', country: 'in', message: 'New T1 Inquiry from Mumbai Hub', timestamp: new Date().toISOString(), read: false, type: 'alert' },
    { id: 'n2', toRole: 'super_admin', country: 'global', message: 'Global AI Sentiment Analysis Complete', timestamp: new Date().toISOString(), read: false, type: 'success' }
  ]);
  const [workflows, setWorkflows] = useState<WorkflowTask[]>([
    { id: 'w1', taskName: 'Global AI Sentiment Loop', frequency: 'hourly', country: 'global', status: 'complete', lastRun: new Date().toISOString() },
    { id: 'w2', taskName: 'Catalog Search Index Sync', frequency: 'daily', country: 'us', status: 'pending' }
  ]);
  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>([
    { id: 'a1', userId: 'u-4', userName: 'Lumière Atelier', contentType: 'listing', contentId: 'prod-50', country: 'ae', status: 'pending', timestamp: new Date().toISOString() }
  ]);
  const [analyticsData] = useState<AnalyticsMetric[]>([
    { date: '2024-03-01', revenue: 120000, leads: 45, conversionRate: 4.2, aiScore: 88 },
    { date: '2024-03-08', revenue: 145000, leads: 52, conversionRate: 4.5, aiScore: 92 },
    { date: '2024-03-15', revenue: 180000, leads: 68, conversionRate: 5.1, aiScore: 95 }
  ]);

  // Admin & Logistics state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [socialMetrics, setSocialMetrics] = useState<Record<string, SocialMetrics>>({});
  const [admins] = useState<AdminAccount[]>(ADMIN_ACCOUNTS);
  const [vendors] = useState<Vendor[]>(VENDORS.map(v => ({ ...v, brandId: activeBrandId })));
  const [affiliates] = useState<Affiliate[]>(AFFILIATES.map(a => ({ ...a, brandId: activeBrandId })));
  const [returns, setReturns] = useState<ReturnRequest[]>(RETURNS.map(r => ({ ...r, brandId: activeBrandId })));
  const [activeCampaigns] = useState<Campaign[]>(CAMPAIGNS.map(c => ({ ...c, brandId: activeBrandId })));
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(AUDIT_LOGS);
  const [vipClients] = useState<VipClient[]>(VIP_CLIENTS.map(v => ({ ...v, brandId: activeBrandId })));
  const [customerSegments] = useState<CustomerSegment[]>(CUSTOMER_SEGMENTS.map(s => ({ ...s, brandId: activeBrandId })));
  const [appointments, setAppointments] = useState<Appointment[]>(APPOINTMENTS.map(a => ({ ...a, brandId: activeBrandId })));
  const [invoices, setInvoices] = useState<Invoice[]>(INVOICES.map(i => ({ ...i, brandId: activeBrandId })));
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(SUPPORT_TICKETS.map(t => ({ ...t, brandId: activeBrandId })));
  
  // Support & Operational Definitions
  const [supportStats, setSupportStats] = useState<SupportStats>(SUPPORT_STATS);
  const [integrations, setIntegrations] = useState<MaisonIntegration[]>(INTEGRATIONS);
  const [apiLogs, setApiLogs] = useState<ApiLog[]>(API_LOGS);
  const [indexingStatus, setIndexingStatus] = useState<IndexingStatus>(INDEXING_STATUS);
  const [indexingLogs, setIndexingLogs] = useState<IndexingLog[]>(INDEXING_LOGS);

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
  const [activeVendor, setActiveVendor] = useState<Vendor | null>(vendors[0]);

  // --- Scoped Views ---
  const scopedProducts = useMemo(() => (!currentUser || currentUser.role === 'super_admin' || currentUser.country === 'GLOBAL') ? products : products.filter(p => p.countryCode === currentUser.country || p.isGlobal), [products, currentUser]);
  const scopedInquiries = useMemo(() => (!currentUser || currentUser.role === 'super_admin' || currentUser.country === 'GLOBAL') ? privateInquiries : privateInquiries.filter(i => i.country.toLowerCase() === currentUser.country.toLowerCase()), [privateInquiries, currentUser]);
  const scopedEditorials = useMemo(() => (!currentUser || currentUser.role === 'super_admin' || currentUser.country === 'GLOBAL') ? editorials : editorials.filter(e => e.country === currentUser.country || e.isGlobal), [editorials, currentUser]);
  const scopedBuyingGuides = useMemo(() => (!currentUser || currentUser.role === 'super_admin' || currentUser.country === 'GLOBAL') ? buyingGuides : buyingGuides.filter(g => g.country === currentUser.country || g.isGlobal), [buyingGuides, currentUser]);
  const scopedReturns = useMemo(() => (!currentUser || currentUser.role === 'super_admin' || currentUser.country === 'GLOBAL') ? returns : returns.filter(r => r.brandId === activeBrandId), [returns, currentUser, activeBrandId]);
  
  const scopedNotifications = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.role === 'super_admin') return notifications;
    return notifications.filter(n => n.toRole === currentUser.role && (n.country === currentUser.country || n.country === 'global'));
  }, [notifications, currentUser]);
  
  const scopedApprovals = useMemo(() => {
    if (!currentUser || currentUser.role === 'super_admin') return approvalRequests;
    return approvalRequests.filter(a => a.country === currentUser.country);
  }, [approvalRequests, currentUser]);

  // --- Actions ---
  const sendNotification = (toRole: string, message: string, country = 'global', type: MaisonNotification['type'] = 'info') => {
    const id = `n-${Date.now()}`;
    setNotifications(prev => [{ id, toRole, country, message, timestamp: new Date().toISOString(), read: false, type }, ...prev]);
  };

  const markNotificationRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  const scheduleWorkflow = (taskName: string, frequency: WorkflowTask['frequency'], country = 'global') => {
    setWorkflows(prev => [...prev, { id: `w-${Date.now()}`, taskName, frequency, country, status: 'pending' }]);
  };

  const runWorkflowTask = (id: string) => {
    setWorkflows(prev => prev.map(w => w.id === id ? { ...w, status: 'running', lastRun: new Date().toISOString() } : w));
    setTimeout(() => {
      setWorkflows(prev => prev.map(w => w.id === id ? { ...w, status: 'complete' } : w));
      sendNotification('super_admin', `Workflow Task Complete: ${id}`, 'global', 'success');
    }, 2000);
  };

  const submitApproval = (contentType: ApprovalRequest['contentType'], contentId: string, country = 'global') => {
    if (!currentUser) return;
    const req: ApprovalRequest = { id: `a-${Date.now()}`, userId: currentUser.id, userName: currentUser.name, contentType, contentId, country, status: 'pending', timestamp: new Date().toISOString() };
    setApprovalRequests(prev => [req, ...prev]);
    sendNotification('country_admin', `${currentUser.name} submitted ${contentType} for review`, country, 'info');
  };

  const handleApprovalAction = (requestId: string, approve: boolean, comments?: string) => {
    setApprovalRequests(prev => prev.map(a => {
      if (a.id === requestId) {
        const status = approve ? 'approved' : 'rejected';
        sendNotification('operator', `Submission ${requestId} has been ${status}`, a.country, approve ? 'success' : 'alert');
        return { ...a, status, comments, approvedBy: currentUser?.name };
      }
      return a;
    }));
  };

  const toggleEmergencyMode = () => setGlobalSettings(prev => ({ ...prev, emergencyMode: !prev.emergencyMode }));
  
  const triggerReindex = (type: string) => {
    setIndexingStatus(prev => ({ ...prev, sitemapStatus: 'Regenerating' }));
    setTimeout(() => setIndexingStatus(prev => ({ ...prev, sitemapStatus: 'Up to date' })), 3000);
  };

  const setCountryEnabled = (code: CountryCode, enabled: boolean) => setCountryConfigs(prev => prev.map(c => c.code === code ? { ...c, enabled } : c));
  const updateCountryConfig = (config: CountryConfig) => setCountryConfigs(prev => prev.map(c => c.code === config.code ? config : c));
  const setActiveBrand = (id: string) => setActiveBrandId(id);

  const upsertCMSSection = (s: CMSSection) => setCmsSections(prev => {
    const idx = prev.findIndex(item => item.id === s.id);
    return idx > -1 ? prev.map(item => item.id === s.id ? s : item) : [...prev, s];
  });
  const upsertProduct = (p: Product) => setProducts(prev => {
    const idx = prev.findIndex(item => item.id === p.id);
    return idx > -1 ? prev.map(item => item.id === p.id ? p : item) : [p, ...prev];
  });
  const deleteProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));
  const upsertCollection = (c: Collection) => console.log('Update collection', c);
  const upsertEditorial = (e: Editorial) => console.log('Update editorial', e);

  const upsertPrivateInquiry = (inquiry: PrivateInquiry) => {
    setPrivateInquiries(prev => [inquiry, ...prev]);
    setLeadConversations(prev => [...prev, { id: `conv-${inquiry.id}`, inquiryId: inquiry.id, messages: [], status: 'active', brandId: activeBrandId }]);
    sendNotification('country_admin', `New Acquisition Intent: ${inquiry.customerName}`, inquiry.country.toLowerCase());
  };
  const updateInquiryStatus = (id: string, status: PrivateInquiry['status']) => setPrivateInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  const addLeadMessage = (inquiryId: string, text: string, sender: 'curator' | 'client') => {
    setLeadConversations(prev => prev.map(c => c.inquiryId === inquiryId ? { ...c, messages: [...c.messages, { id: `msg-${Date.now()}`, sender, text, timestamp: new Date().toISOString() }] } : c));
  };

  const updateAIModule = (id: string, enabled: boolean, level: AIAutomationLevel) => {
    setAiModules(prev => prev.map(m => m.id === id ? { ...m, enabled, level } : m));
    recordLog(`AI Module ${id} updated to ${level}`, 'AI Autopilot');
  };
  const addAILog = (log: AIActionLog) => setAiLogs(prev => [log, ...prev].slice(0, 50));
  const upsertAISuggestion = (s: AISuggestion) => setAiSuggestions(prev => {
    const idx = prev.findIndex(item => item.id === s.id);
    return idx > -1 ? prev.map(item => item.id === s.id ? s : item) : [s, ...prev];
  });
  const updateSuggestionStatus = (id: string, status: AISuggestion['status']) => setAiSuggestions(prev => prev.map(s => s.id === id ? { ...s, status } : s));

  const recordLog = (action: string, module: string, severity: AuditLog['severity'] = 'low') => setAuditLogs(prev => [{ id: `log-${Date.now()}`, adminId: 'adm-current', adminName: currentUser?.name || 'System', action, module, timestamp: new Date().toISOString(), ipAddress: '127.0.0.1', severity, brandId: activeBrandId }, ...prev]);
  const addToCart = (product: Product) => setCart(prev => prev.find(item => item.id === product.id) ? prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...prev, { ...product, quantity: 1 }]);
  const removeFromCart = (productId: string) => setCart(prev => prev.filter(item => item.id !== productId));
  const toggleWishlist = (product: Product) => setWishlist(prev => prev.some(i => i.id === product.id) ? prev.filter(i => i.id !== product.id) : [...prev, product]);
  const clearCart = () => setCart([]);
  const updateGlobalSettings = (s: GlobalSettings) => setGlobalSettings(s);
  
  const createInvoice = (inv: Invoice) => setInvoices(prev => [inv, ...prev]);
  const upsertAppointment = (apt: Appointment) => setAppointments(prev => [apt, ...prev]);
  
  const toggleLike = (id: string, country: string) => {
    setSocialMetrics(prev => {
      const current = prev[id] || { likes: 0, shares: 0, engagementRate: 0 };
      return { ...prev, [id]: { ...current, likes: current.likes + 1 } };
    });
  };
  
  const trackShare = (id: string, country: string) => {
    setSocialMetrics(prev => {
      const current = prev[id] || { likes: 0, shares: 0, engagementRate: 0 };
      return { ...prev, [id]: { ...current, shares: current.shares + 1 } };
    });
  };

  const updateTicketStatus = (id: string, status: SupportTicket['status']) => setSupportTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  const addTicketMessage = (ticketId: string, text: string, sender: 'agent' | 'customer') => {
    setSupportTickets(prev => prev.map(t => t.id === ticketId ? { ...t, messages: [...t.messages, { id: `m-${Date.now()}`, sender, text, timestamp: new Date().toISOString() }], updatedAt: new Date().toISOString() } : t));
  };

  const value = useMemo(() => ({
    countryConfigs, brandConfigs, activeBrandId, currentUser,
    scopedProducts, scopedInquiries, scopedEditorials, scopedBuyingGuides, scopedReturns, scopedNotifications, scopedApprovals,
    cmsSections, products, collections, categories, departments, cities, buyingGuides, editorials,
    privateInquiries, leadConversations, messagingTemplates, seoRegistry, automationRules,
    aiModules, aiLogs, aiSuggestions,
    notifications, workflows, approvalRequests, analyticsData,
    cart, wishlist, socialMetrics, admins, vendors, affiliates, returns, activeCampaigns, auditLogs,
    vipClients, customerSegments, globalSettings, supportTickets, supportStats, integrations, apiLogs,
    indexingStatus, indexingLogs, appointments, invoices, isShowcaseMode, activeVip, activeVendor,
    setCountryEnabled, updateCountryConfig, setActiveBrand, setCurrentUser,
    upsertCMSSection, upsertProduct, deleteProduct, upsertCollection, upsertEditorial,
    upsertPrivateInquiry, updateInquiryStatus, addLeadMessage,
    sendNotification, markNotificationRead, scheduleWorkflow, runWorkflowTask, submitApproval, handleApprovalAction,
    toggleEmergencyMode, triggerReindex,
    updateAIModule, addAILog, upsertAISuggestion, updateSuggestionStatus,
    addToCart, removeFromCart, toggleWishlist, clearCart, updateGlobalSettings,
    setShowcaseMode, setActiveVip, setActiveVendor, recordLog, createInvoice, toggleLike, trackShare, upsertAppointment,
    updateTicketStatus, addTicketMessage
  }), [
    countryConfigs, brandConfigs, activeBrandId, currentUser, 
    scopedProducts, scopedInquiries, scopedEditorials, scopedBuyingGuides, scopedReturns, scopedNotifications, scopedApprovals, 
    cmsSections, products, collections, categories, departments, cities, buyingGuides, editorials,
    privateInquiries, leadConversations, messagingTemplates, seoRegistry, automationRules,
    aiModules, aiLogs, aiSuggestions,
    notifications, workflows, approvalRequests, analyticsData,
    cart, wishlist, socialMetrics, admins, vendors, affiliates, returns, activeCampaigns, auditLogs,
    vipClients, customerSegments, globalSettings, supportTickets, supportStats, integrations, apiLogs,
    indexingStatus, indexingLogs, appointments, invoices, isShowcaseMode, activeVip, activeVendor
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppStore must be used within AppProvider');
  return context;
}
