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
  Affiliate,
  ReturnRequest,
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
  Transaction,
  PrivateInquiry,
  LeadConversation,
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
  AuditLogEntry,
  QATestCase,
  MaisonError,
  GlobalSyncSession,
  SyncCategory,
  StressTest,
  AdminViewMode,
  BrandIntegrityIssue,
  WalletTransaction,
  LiveRequest,
  MaisonCertificate,
  TransactionStatus
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
  AFFILIATES,
  RETURNS,
  CAMPAIGNS,
  VIP_CLIENTS,
  CUSTOMER_SEGMENTS,
  SUPPORT_TICKETS,
  SUPPORT_STATS,
  INTEGRATIONS,
  API_LOGS,
  INDEXING_STATUS,
  INDEXING_LOGS,
  APPOINTMENTS,
  INVOICES
} from './mock-data';
import { MOCK_INQUIRIES, MOCK_CONVERSATIONS } from './mock-sales';
import { ACQUISITION_SCRIPTS } from './mock-sales-system';
import { COUNTRIES_CONFIG, BRANDS_CONFIG } from './mock-global-config';
import { MOCK_SESSION_USER } from './rbac/mock-session';
import { MaisonUser } from './rbac/mock-users';

interface AppContextType {
  countryConfigs: CountryConfig[];
  brandConfigs: BrandConfig[];
  activeBrandId: string;
  currentUser: MaisonUser | null;
  adminJurisdiction: CountryCode | 'global';
  globalSyncHistory: GlobalSyncSession[];
  
  scopedProducts: Product[];
  scopedInquiries: PrivateInquiry[];
  scopedEditorials: Editorial[];
  scopedBuyingGuides: BuyingGuide[];
  scopedReturns: ReturnRequest[];
  scopedNotifications: MaisonNotification[];
  scopedApprovals: ApprovalRequest[];
  scopedAuditLogs: AuditLogEntry[];
  scopedWorkflows: WorkflowTask[];
  scopedTransactions: Transaction[];
  scopedQATests: QATestCase[];
  scopedErrors: MaisonError[];
  scopedStressTests: StressTest[];
  scopedBrandIntegrity: BrandIntegrityIssue[];
  scopedLiveRequests: LiveRequest[];
  scopedCertificates: MaisonCertificate[];
  
  products: Product[];
  privateInquiries: PrivateInquiry[];
  leadConversations: LeadConversation[];
  messagingTemplates: SalesScript[];
  notifications: MaisonNotification[];
  workflows: WorkflowTask[];
  approvalRequests: ApprovalRequest[];
  auditRegistry: AuditLogEntry[];
  cart: CartItem[];
  wishlist: Product[];
  socialMetrics: Record<string, SocialMetrics>;
  vendors: Vendor[];
  vipClients: VipClient[];
  globalSettings: GlobalSettings;
  supportTickets: SupportTicket[];
  supportStats: SupportStats;
  integrations: MaisonIntegration[];
  apiLogs: ApiLog[];
  indexingStatus: IndexingStatus;
  appointments: Appointment[];
  invoices: Invoice[];
  transactions: Transaction[];
  customerSegments: CustomerSegment[];
  brandIntegrityIssues: BrandIntegrityIssue[];
  automationRules: AutomationRule[];
  aiModules: AIModuleStatus[];
  aiLogs: AIActionLog[];
  aiSuggestions: AISuggestion[];
  qaTests: QATestCase[];
  maisonErrors: MaisonError[];
  stressTests: StressTest[];
  seoRegistry: SEOMetadata[];

  isShowcaseMode: boolean;
  activeVip: VipClient | null;
  activeVendor: Vendor | null;
  
  setCountryEnabled: (code: CountryCode, enabled: boolean) => void;
  setCurrentUser: (user: MaisonUser | null) => void;
  setAdminJurisdiction: (jurisdiction: CountryCode | 'global') => void;
  setGuideMode: (val: boolean) => void;
  setAdminViewMode: (val: AdminViewMode) => void;
  upsertProduct: (product: Product, changeSummary?: string) => void;
  deleteProduct: (id: string) => void;
  toggleProductVipStatus: (productId: string) => void;
  lockProductForEditing: (productId: string) => boolean;
  upsertPrivateInquiry: (inquiry: PrivateInquiry) => void;
  updateInquiryStatus: (id: string, status: PrivateInquiry['status']) => void;
  addLeadMessage: (inquiryId: string, text: string, sender: 'curator' | 'client') => void;
  sendNotification: (toRole: string, message: string, country?: string, type?: MaisonNotification['type']) => void;
  markNotificationRead: (id: string) => void;
  topUpWallet: (amount: number) => void;
  deductFromWallet: (amount: number, description: string) => boolean;
  requestLiveSession: (productId: string, productName: string) => boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  clearCart: () => void;
  updateGlobalSettings: (settings: GlobalSettings) => void;
  setShowcaseMode: (val: boolean) => void;
  setActiveVip: (vip: VipClient | null) => void;
  setActiveVendor: (vendor: Vendor | null) => void;
  createInvoice: (invoice: Invoice) => void;
  createTransaction: (transaction: Transaction) => void;
  updateTransactionStatus: (id: string, status: TransactionStatus) => void;
  toggleLike: (articleId: string, country: string) => void;
  trackShare: (articleId: string, country: string) => void;
  upsertAppointment: (appointment: Appointment) => void;
  updateTicketStatus: (id: string, status: SupportTicket['status']) => void;
  addTicketMessage: (ticketId: string, text: string, sender: 'agent' | 'customer') => void;
  upsertCampaign: (campaign: Campaign) => void;
  toggleRule: (id: string) => void;
  upsertRule: (rule: AutomationRule) => void;
  verifyClient: (id: string) => void;
  approveVendor: (id: string) => void;
  updateAIModule: (id: string, enabled: boolean, level: AIAutomationLevel) => void;
  addAILog: (log: AIActionLog) => void;
  upsertAISuggestion: (suggestion: AISuggestion) => void;
  updateSuggestionStatus: (id: string, status: AISuggestion['status']) => void;
  resolveBrandIntegrity: (id: string) => void;
  runQATest: (id: string) => void;
  runAllQATests: () => void;
  runStressTest: (loadSize: number, type: StressTest['type']) => void;
  executeSafeSync: (categories: SyncCategory[], targets: CountryCode[]) => void;
  logAction: (action: string, entity: string, country?: string, severity?: AuditLogEntry['severity']) => void;
  triggerReindex: (type: string) => void;
  toggleEmergencyMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // 1. STATE INITIALIZATION (Declare EVERYTHING first to prevent ReferenceErrors)
  const [activeBrandId, setActiveBrandId] = useState<string>(BRANDS_CONFIG[0].id);
  const [currentUser, setCurrentUser] = useState<MaisonUser | null>(MOCK_SESSION_USER);
  const [adminJurisdiction, setAdminJurisdiction] = useState<CountryCode | 'global'>('global');
  const [isShowcaseMode, setShowcaseMode] = useState(false);
  const [globalSyncHistory, setGlobalSyncHistory] = useState<GlobalSyncSession[]>([]);
  const [brandConfigs] = useState<BrandConfig[]>(BRANDS_CONFIG);
  
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>({
    theme: { primary: '#000000', accent: '#D4AF37', fontFamily: 'Alegreya' },
    seo: { defaultTitle: 'AMARISÉ MAISON', defaultDesc: 'Global Acquisition House', sitemapUrl: '/sitemap.xml' },
    payments: { cards: true, wallets: true, crypto: false },
    compliance: { gdprEnabled: true, ccpaEnabled: true, pciStatus: 'Optimal' },
    performance: { cdnEnabled: true, cachingEnabled: true, autoScalingStatus: 'Ready' },
    emergencyMode: false,
    isGuideMode: false,
    adminViewMode: 'advanced'
  });

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS.map(p => ({ 
    ...p, brandId: activeBrandId, status: 'published', regions: ['us', 'uk', 'ae', 'in', 'sg'], currentVersion: 1, versionHistory: [] 
  })));
  const [privateInquiries, setPrivateInquiries] = useState<PrivateInquiry[]>(MOCK_INQUIRIES.map(i => ({ ...i, brandId: activeBrandId })));
  const [leadConversations, setLeadConversations] = useState<LeadConversation[]>(MOCK_CONVERSATIONS.map(c => ({ ...c, brandId: activeBrandId })));
  const [messagingTemplates] = useState<SalesScript[]>(ACQUISITION_SCRIPTS.map(s => ({ ...s, brandId: activeBrandId })));
  const [notifications, setNotifications] = useState<MaisonNotification[]>([]);
  const [workflows, setWorkflows] = useState<WorkflowTask[]>([]);
  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>([]);
  const [auditRegistry, setAuditRegistry] = useState<AuditLogEntry[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [socialMetrics, setSocialMetrics] = useState<Record<string, SocialMetrics>>({});
  const [vendors, setVendors] = useState<Vendor[]>(VENDORS.map(v => ({ ...v, brandId: activeBrandId })));
  const [vipClients, setVipClients] = useState<VipClient[]>(VIP_CLIENTS.map(v => ({ 
    ...v, brandId: activeBrandId, status: 'verified', walletBalance: 12500.50, walletHistory: [], liveRequests: [], certificates: [] 
  })));
  const [customerSegments] = useState<CustomerSegment[]>(CUSTOMER_SEGMENTS.map(s => ({ ...s, brandId: activeBrandId })));
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(SUPPORT_TICKETS.map(t => ({ ...t, brandId: activeBrandId })));
  const [supportStats] = useState<SupportStats>(SUPPORT_STATS);
  const [integrations] = useState<MaisonIntegration[]>(INTEGRATIONS);
  const [apiLogs] = useState<ApiLog[]>(API_LOGS);
  const [indexingStatus] = useState<IndexingStatus>(INDEXING_STATUS);
  const [appointments, setAppointments] = useState<Appointment[]>(APPOINTMENTS);
  const [invoices] = useState<Invoice[]>(INVOICES);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [brandIntegrityIssues, setBrandIntegrityIssues] = useState<BrandIntegrityIssue[]>([]);
  const [automationRules] = useState<AutomationRule[]>([]);
  const [aiModules, setAiModules] = useState<AIModuleStatus[]>([
    { id: 'ai-sales', name: 'AI Sales Agent', enabled: true, level: 'assisted' },
    { id: 'ai-analytics', name: 'AI Analytics Engine', enabled: true, level: 'auto' },
    { id: 'ai-content', name: 'AI Content Engine', enabled: true, level: 'assisted' },
    { id: 'ai-seo', name: 'AI SEO Optimizer', enabled: true, level: 'auto' }
  ]);
  const [aiLogs, setAiLogs] = useState<AIActionLog[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>([]);
  const [qaTests] = useState<QATestCase[]>([]);
  const [maisonErrors, setMaisonErrors] = useState<MaisonError[]>([]);
  const [stressTests, setStressTests] = useState<StressTest[]>([]);
  const [seoRegistry] = useState<SEOMetadata[]>([]);
  const [activeVip, setActiveVip] = useState<VipClient | null>(vipClients[0]);
  const [activeVendor, setActiveVendor] = useState<Vendor | null>(vendors[0]);
  const [countryConfigs] = useState<CountryConfig[]>(COUNTRIES_CONFIG.map(c => ({
    ...c, taxType: c.code === 'us' ? 'Sales Tax' : 'VAT', taxRate: 15
  })));

  // 2. JURISDICTIONAL SCOPING
  const activeHub = useMemo(() => {
    if (!currentUser) return 'global';
    if (currentUser.role === 'super_admin') return adminJurisdiction;
    return currentUser.country as CountryCode;
  }, [currentUser, adminJurisdiction]);

  const scopedProducts = useMemo(() => activeHub === 'global' ? products : products.filter(p => p.regions.includes(activeHub as any) || p.isGlobal), [products, activeHub]);
  const scopedInquiries = useMemo(() => activeHub === 'global' ? privateInquiries : privateInquiries.filter(i => i.country.toLowerCase() === activeHub.toLowerCase()), [privateInquiries, activeHub]);
  const scopedEditorials = useMemo(() => activeHub === 'global' ? EDITOR_INITIAL : EDITOR_INITIAL.filter(e => e.country === activeHub || e.isGlobal), [activeHub]);
  const scopedBuyingGuides = useMemo(() => activeHub === 'global' ? INITIAL_GUIDES : INITIAL_GUIDES.filter(g => g.country === activeHub || g.isGlobal), [activeHub]);
  const scopedReturns = useMemo(() => activeHub === 'global' ? RETURNS : RETURNS.filter(r => r.country === activeHub), [activeHub]);
  const scopedNotifications = useMemo(() => activeHub === 'global' ? notifications : notifications.filter(n => n.country === activeHub || n.country === 'global'), [notifications, activeHub]);
  const scopedApprovals = useMemo(() => activeHub === 'global' ? approvalRequests : approvalRequests.filter(a => a.country === activeHub || a.country === 'global'), [approvalRequests, activeHub]);
  const scopedAuditLogs = useMemo(() => activeHub === 'global' ? auditRegistry : auditRegistry.filter(log => log.country === activeHub || log.country === 'global'), [auditRegistry, activeHub]);
  const scopedWorkflows = useMemo(() => activeHub === 'global' ? workflows : workflows.filter(w => w.country === activeHub || w.country === 'global'), [workflows, activeHub]);
  const scopedTransactions = useMemo(() => activeHub === 'global' ? transactions : transactions.filter(t => t.country.toLowerCase() === activeHub.toLowerCase()), [transactions, activeHub]);
  const scopedQATests = useMemo(() => activeHub === 'global' ? qaTests : qaTests.filter(t => t.country === activeHub || t.country === 'global'), [qaTests, activeHub]);
  const scopedErrors = useMemo(() => activeHub === 'global' ? maisonErrors : maisonErrors.filter(e => e.country === activeHub), [maisonErrors, activeHub]);
  const scopedStressTests = useMemo(() => activeHub === 'global' ? stressTests : stressTests.filter(t => t.country === activeHub || t.country === 'global'), [stressTests, activeHub]);
  const scopedBrandIntegrity = useMemo(() => activeHub === 'global' ? brandIntegrityIssues : brandIntegrityIssues.filter(i => i.country === activeHub), [brandIntegrityIssues, activeHub]);
  
  const scopedLiveRequests = useMemo(() => {
    const all = vipClients.flatMap(v => v.liveRequests.map(r => ({ ...r, clientName: v.name, country: v.brandId })));
    return activeHub === 'global' ? all : all.filter(r => r.country === activeHub);
  }, [vipClients, activeHub]);

  const scopedCertificates = useMemo(() => {
    const all = vipClients.flatMap(v => v.certificates.map(c => ({ ...c, clientName: v.name, country: v.brandId })));
    return activeHub === 'global' ? all : all.filter(c => c.country === activeHub);
  }, [vipClients, activeHub]);

  // 3. ACTIONS
  const logAction = (action: string, entity: string, country = 'global', severity: AuditLogEntry['severity'] = 'low') => {
    if (!currentUser) return;
    const entry: AuditLogEntry = { id: `aud-${Date.now()}`, actorId: currentUser.id, actorName: currentUser.name, actorRole: currentUser.role, country, action, entity, timestamp: new Date().toISOString(), severity, brandId: activeBrandId };
    setAuditRegistry(prev => [entry, ...prev]);
  };

  const topUpWallet = (amount: number) => {
    if (!activeVip) return;
    const newTx: WalletTransaction = { id: `wt-${Date.now()}`, type: 'Deposit', amount, description: 'Maison Wallet Top-Up', timestamp: new Date().toISOString(), status: 'Settled' };
    setVipClients(prev => prev.map(v => v.id === activeVip.id ? { ...v, walletBalance: v.walletBalance + amount, walletHistory: [newTx, ...v.walletHistory] } : v));
    setActiveVip(prev => prev ? { ...prev, walletBalance: prev.walletBalance + amount, walletHistory: [newTx, ...prev.walletHistory] } : null);
  };

  const deductFromWallet = (amount: number, description: string): boolean => {
    if (!activeVip || activeVip.walletBalance < amount) return false;
    const newTx: WalletTransaction = { id: `wt-${Date.now()}`, type: 'Service Fee', amount: -amount, description, timestamp: new Date().toISOString(), status: 'Settled' };
    setVipClients(prev => prev.map(v => v.id === activeVip.id ? { ...v, walletBalance: v.walletBalance - amount, walletHistory: [newTx, ...v.walletHistory] } : v));
    setActiveVip(prev => prev ? { ...prev, walletBalance: prev.walletBalance - amount, walletHistory: [newTx, ...prev.walletHistory] } : null);
    return true;
  };

  const requestLiveSession = (productId: string, productName: string): boolean => {
    const fee = 250;
    if (deductFromWallet(fee, `Live Request: ${productName}`)) {
      const newReq: LiveRequest = { id: `lr-${Date.now()}`, productId, productName, status: 'pending', requestedAt: new Date().toISOString(), fee };
      setVipClients(prev => prev.map(v => v.id === activeVip!.id ? { ...v, liveRequests: [...v.liveRequests, newReq] } : v));
      setActiveVip(prev => prev ? { ...prev, liveRequests: [...prev.liveRequests, newReq] } : null);
      return true;
    }
    return false;
  };

  const value = useMemo(() => ({
    countryConfigs, brandConfigs, activeBrandId, currentUser, adminJurisdiction, globalSyncHistory,
    scopedProducts, scopedInquiries, scopedEditorials, scopedBuyingGuides, scopedReturns, scopedNotifications, scopedApprovals, scopedAuditLogs, scopedWorkflows, scopedTransactions, scopedQATests, scopedErrors, scopedStressTests, scopedBrandIntegrity, scopedLiveRequests, scopedCertificates,
    products, privateInquiries, leadConversations, messagingTemplates, notifications, workflows, approvalRequests, auditRegistry, cart, wishlist, socialMetrics, vendors, vipClients, globalSettings, supportTickets, supportStats, integrations, apiLogs, indexingStatus, appointments, invoices, transactions, customerSegments, brandIntegrityIssues, automationRules, aiModules, aiLogs, aiSuggestions, qaTests, maisonErrors, stressTests, seoRegistry, isShowcaseMode, activeVip, activeVendor,
    setCountryEnabled: () => {}, setCurrentUser, setAdminJurisdiction, setGuideMode: (v: boolean) => setGlobalSettings(prev => ({...prev, isGuideMode: v})), setAdminViewMode: (v: AdminViewMode) => setGlobalSettings(prev => ({...prev, adminViewMode: v})),
    upsertProduct: (p: Product) => setProducts(prev => prev.find(i => i.id === p.id) ? prev.map(i => i.id === p.id ? p : i) : [p, ...prev]), deleteProduct: (id: string) => setProducts(prev => prev.filter(i => i.id !== id)), toggleProductVipStatus: (id: string) => setProducts(prev => prev.map(p => p.id === id ? {...p, isVip: !p.isVip} : p)), lockProductForEditing: () => true,
    upsertPrivateInquiry: (i: PrivateInquiry) => setPrivateInquiries(prev => [i, ...prev]), updateInquiryStatus: (id: string, s: any) => setPrivateInquiries(prev => prev.map(i => i.id === id ? {...i, status: s} : i)), addLeadMessage: (id: string, t: string, s: any) => setLeadConversations(prev => prev.map(c => c.inquiryId === id ? {...c, messages: [...c.messages, {id: `m-${Date.now()}`, sender: s, text: t, timestamp: new Date().toISOString()}]} : c)),
    sendNotification: (to: string, m: string, c = 'global', t: any = 'info') => setNotifications(prev => [{id: `n-${Date.now()}`, toRole: to, country: c, message: m, timestamp: new Date().toISOString(), read: false, type: t}, ...prev]), markNotificationRead: (id: string) => setNotifications(prev => prev.map(n => n.id === id ? {...n, read: true} : n)),
    topUpWallet, deductFromWallet, requestLiveSession, addToCart: (p: Product) => setCart(prev => prev.find(i => i.id === p.id) ? prev.map(i => i.id === p.id ? {...i, quantity: i.quantity + 1} : i) : [...prev, {...p, quantity: 1}]), removeFromCart: (id: string) => setCart(prev => prev.filter(i => i.id !== id)), toggleWishlist: (p: Product) => setWishlist(prev => prev.some(i => i.id === p.id) ? prev.filter(i => i.id !== p.id) : [...prev, p]), clearCart: () => setCart([]),
    updateGlobalSettings: (s: GlobalSettings) => setGlobalSettings(s), setShowcaseMode, setActiveVip, setActiveVendor, createInvoice: (i: Invoice) => setInvoices(prev => [i, ...prev]), createTransaction: (t: Transaction) => setTransactions(prev => [t, ...prev]), updateTransactionStatus: (id: string, s: any) => setTransactions(prev => prev.map(t => t.id === id ? {...t, status: s} : t)),
    toggleLike: (id: string) => setSocialMetrics(prev => ({...prev, [id]: {...(prev[id]||{likes:0,shares:0,engagementRate:0}), likes: (prev[id]?.likes||0)+1}})), trackShare: (id: string) => setSocialMetrics(prev => ({...prev, [id]: {...(prev[id]||{likes:0,shares:0,engagementRate:0}), shares: (prev[id]?.shares||0)+1}})),
    upsertAppointment: (a: Appointment) => setAppointments(prev => [a, ...prev]), updateTicketStatus: (id: string, s: any) => setSupportTickets(prev => prev.map(t => t.id === id ? {...t, status: s} : t)), addTicketMessage: (id: string, t: string, s: any) => setSupportTickets(prev => prev.map(tk => tk.id === id ? {...tk, messages: [...tk.messages, {id: `m-${Date.now()}`, sender: s, text: t, timestamp: new Date().toISOString()}]} : tk)),
    upsertCampaign: () => {}, toggleRule: () => {}, upsertRule: () => {}, verifyClient: (id: string) => setVipClients(prev => prev.map(v => v.id === id ? {...v, status: 'verified'} : v)), approveVendor: (id: string) => setVendors(prev => prev.map(v => v.id === id ? {...v, status: 'active'} : v)),
    updateAIModule: (id: string, e: boolean, l: any) => setAiModules(prev => prev.map(m => m.id === id ? {...m, enabled: e, level: l} : m)), addAILog: (l: AIActionLog) => setAiLogs(prev => [l, ...prev]), upsertAISuggestion: (s: AISuggestion) => setAiSuggestions(prev => [s, ...prev]), updateSuggestionStatus: (id: string, s: any) => setAiSuggestions(prev => prev.map(i => i.id === id ? {...i, status: s} : i)),
    resolveBrandIntegrity: (id: string) => setBrandIntegrityIssues(prev => prev.map(i => i.id === id ? {...i, status: 'fixed'} : i)), runQATest: () => {}, runAllQATests: () => {}, runStressTest: () => {}, executeSafeSync: () => {}, logAction, triggerReindex: () => {}, toggleEmergencyMode: () => setGlobalSettings(prev => ({...prev, emergencyMode: !prev.emergencyMode}))
  }), [
    countryConfigs, brandConfigs, activeBrandId, currentUser, adminJurisdiction, globalSyncHistory, scopedProducts, scopedInquiries, scopedEditorials, scopedBuyingGuides, scopedReturns, scopedNotifications, scopedApprovals, scopedAuditLogs, scopedWorkflows, scopedTransactions, scopedQATests, scopedErrors, scopedStressTests, scopedBrandIntegrity, scopedLiveRequests, scopedCertificates,
    products, privateInquiries, leadConversations, messagingTemplates, notifications, workflows, approvalRequests, auditRegistry, cart, wishlist, socialMetrics, vendors, vipClients, globalSettings, supportTickets, supportStats, integrations, apiLogs, indexingStatus, appointments, invoices, transactions, customerSegments, brandIntegrityIssues, automationRules, aiModules, aiLogs, aiSuggestions, qaTests, maisonErrors, stressTests, seoRegistry, isShowcaseMode, activeVip, activeVendor
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppStore must be used within AppProvider');
  return context;
}
