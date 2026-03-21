
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
  AnalyticsMetric,
  AuditLogEntry,
  QATestCase,
  MaisonError,
  ArtifactVersion,
  TransactionStatus,
  GlobalSyncSession,
  SyncCategory,
  StressTest,
  AdminViewMode,
  BrandIntegrityIssue
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
  
  cmsSections: CMSSection[];
  products: Product[];
  collections: Collection[];
  categories: Category[];
  departments: Department[];
  cities: City[];
  buyingGuides: BuyingGuide[];
  editorials: Editorial[];
  qaTests: QATestCase[];
  maisonErrors: MaisonError[];
  stressTests: StressTest[];
  customerSegments: CustomerSegment[];
  brandIntegrityIssues: BrandIntegrityIssue[];
  
  privateInquiries: PrivateInquiry[];
  leadConversations: LeadConversation[];
  messagingTemplates: SalesScript[];
  
  seoRegistry: SEOMetadata[];
  automationRules: AutomationRule[];
  aiModules: AIModuleStatus[];
  aiLogs: AIActionLog[];
  aiSuggestions: AISuggestion[];
  
  notifications: MaisonNotification[];
  workflows: WorkflowTask[];
  approvalRequests: ApprovalRequest[];
  auditRegistry: AuditLogEntry[];
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
  globalSettings: GlobalSettings;
  supportTickets: SupportTicket[];
  supportStats: SupportStats;
  integrations: MaisonIntegration[];
  apiLogs: ApiLog[];
  indexingStatus: IndexingStatus;
  indexingLogs: IndexingLog[];
  appointments: Appointment[];
  invoices: Invoice[];
  transactions: Transaction[];

  isShowcaseMode: boolean;
  activeVip: VipClient | null;
  activeVendor: Vendor | null;
  
  setCountryEnabled: (code: CountryCode, enabled: boolean) => void;
  updateCountryConfig: (config: CountryConfig) => void;
  setActiveBrand: (id: string) => void;
  setCurrentUser: (user: MaisonUser | null) => void;
  setAdminJurisdiction: (jurisdiction: CountryCode | 'global') => void;
  setGuideMode: (val: boolean) => void;
  setAdminViewMode: (val: AdminViewMode) => void;
  
  upsertCMSSection: (section: CMSSection) => void;
  upsertProduct: (product: Product, changeSummary?: string) => void;
  toggleProductVipStatus: (productId: string) => void;
  rollbackProductVersion: (productId: string, versionId: string) => void;
  lockProductForEditing: (productId: string) => boolean;
  unlockProduct: (productId: string) => void;
  deleteProduct: (id: string) => void;
  upsertCollection: (collection: Collection) => void;
  upsertEditorial: (editorial: Editorial) => void;
  syncGlobalProducts: (regions?: CountryCode[]) => void;
  
  executeSafeSync: (categories: SyncCategory[], targets: CountryCode[]) => void;
  rollbackGlobalSync: (sessionId: string) => void;

  upsertPrivateInquiry: (inquiry: PrivateInquiry) => void;
  updateInquiryStatus: (id: string, status: PrivateInquiry['status']) => void;
  addLeadMessage: (inquiryId: string, text: string, sender: 'curator' | 'client') => void;
  
  sendNotification: (toRole: string, message: string, country?: string, type?: MaisonNotification['type']) => void;
  markNotificationRead: (id: string) => void;
  scheduleWorkflow: (taskName: string, frequency: WorkflowTask['frequency'], country?: string) => void;
  runWorkflowTask: (id: string) => void;
  runWorkflowSequence: (workflowName: string, country?: string) => void;
  submitApproval: (contentType: ApprovalRequest['contentType'], contentId: string, country?: string) => void;
  handleApprovalAction: (requestId: string, approve: boolean, comments?: string) => void;
  toggleEmergencyMode: () => void;
  triggerReindex: (type: string) => void;
  logAction: (action: string, entity: string, country?: string, severity?: AuditLogEntry['severity']) => void;

  logMaisonError: (error: Omit<MaisonError, 'id' | 'timestamp' | 'resolved'>) => void;
  resolveMaisonError: (id: string) => void;
  runQATest: (id: string) => void;
  runAllQATests: () => void;
  runStressTest: (loadSize: number, type: StressTest['type']) => void;

  updateAIModule: (id: string, enabled: boolean, level: AIAutomationLevel) => void;
  addAILog: (log: AIActionLog) => void;
  upsertAISuggestion: (suggestion: AISuggestion) => void;
  updateSuggestionStatus: (id: string, status: AISuggestion['status']) => void;

  resolveBrandIntegrity: (id: string) => void;

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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // 1. Initial Identity & Config
  const [countryConfigs, setCountryConfigs] = useState<CountryConfig[]>(COUNTRIES_CONFIG.map(c => ({
    ...c,
    taxType: c.code === 'us' ? 'Sales Tax' : c.code === 'uk' || c.code === 'ae' ? 'VAT' : 'GST',
    taxRate: c.code === 'uk' ? 20 : c.code === 'ae' ? 5 : c.code === 'in' ? 18 : c.code === 'sg' ? 9 : 8
  })));
  const [brandConfigs] = useState<BrandConfig[]>(BRANDS_CONFIG);
  const [activeBrandId, setActiveBrandId] = useState<string>(BRANDS_CONFIG[0].id);
  const [currentUser, setCurrentUser] = useState<MaisonUser | null>(MOCK_SESSION_USER);
  const [adminJurisdiction, setAdminJurisdiction] = useState<CountryCode | 'global'>('global');
  
  // 2. Core State Entities
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS.map(p => ({ 
    ...p, 
    brandId: activeBrandId, 
    isGlobal: true, 
    scope: 'global', 
    regions: ['us', 'uk', 'ae', 'in', 'sg'],
    status: 'published',
    versionHistory: [],
    currentVersion: 1,
    conflictStrategy: 'global-priority',
    lastEditedRegion: 'global'
  })));
  const [privateInquiries, setPrivateInquiries] = useState<PrivateInquiry[]>(MOCK_INQUIRIES.map(i => ({ ...i, brandId: activeBrandId })));
  const [editorials, setEditorials] = useState<Editorial[]>(EDITOR_INITIAL.map(e => ({ ...e, brandId: activeBrandId, isGlobal: false })));
  const [buyingGuides, setBuyingGuides] = useState<BuyingGuide[]>(INITIAL_GUIDES.map(g => ({ ...g, brandId: activeBrandId, isGlobal: false })));
  const [returns, setReturns] = useState<ReturnRequest[]>(RETURNS.map(r => ({ ...r, brandId: activeBrandId, country: 'us' })));
  const [notifications, setNotifications] = useState<MaisonNotification[]>([]);
  const [workflows, setWorkflows] = useState<WorkflowTask[]>([]);
  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>([]);
  const [auditRegistry, setAuditRegistry] = useState<AuditLogEntry[]>([]);
  const [qaTests, setQaTests] = useState<QATestCase[]>([]);
  const [maisonErrors, setMaisonErrors] = useState<MaisonError[]>([]);
  const [stressTests, setStressTests] = useState<StressTest[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [brandIntegrityIssues, setBrandIntegrityIssues] = useState<BrandIntegrityIssue[]>([]);
  const [customerSegments, setCustomerSegments] = useState<CustomerSegment[]>(CUSTOMER_SEGMENTS.map(s => ({ ...s, brandId: activeBrandId })));
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(SUPPORT_TICKETS.map(t => ({ ...t, brandId: activeBrandId })));
  const [affiliates, setAffiliates] = useState<Affiliate[]>(AFFILIATES.map(a => ({ ...a, brandId: activeBrandId })));
  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>(CAMPAIGNS.map(c => ({ ...c, brandId: activeBrandId })));
  
  // 3. Other initial state...
  const [collections] = useState<Collection[]>(INITIAL_COLLECTIONS.map(c => ({ ...c, brandId: activeBrandId, isGlobal: true })));
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES.map(c => ({ ...c, brandId: activeBrandId })));
  const [departments] = useState<Department[]>(INITIAL_DEPARTMENTS.map(d => ({ ...d, brandId: activeBrandId })));
  const [cities] = useState<City[]>(INITIAL_CITIES);
  const [globalSyncHistory, setGlobalSyncHistory] = useState<GlobalSyncSession[]>([]);
  const [leadConversations, setLeadConversations] = useState<LeadConversation[]>(MOCK_CONVERSATIONS.map(c => ({ ...c, brandId: activeBrandId })));
  const [messagingTemplates, setMessagingTemplates] = useState<SalesScript[]>(ACQUISITION_SCRIPTS.map(s => ({ ...s, brandId: activeBrandId })));
  const [seoRegistry, setSeoRegistry] = useState<SEOMetadata[]>([]);
  const [aiModules, setAiModules] = useState<AIModuleStatus[]>([
    { id: 'ai-sales', name: 'AI Sales Agent', enabled: true, level: 'assisted' },
    { id: 'ai-analytics', name: 'AI Analytics Engine', enabled: true, level: 'auto' },
    { id: 'ai-content', name: 'AI Content Engine', enabled: true, level: 'assisted' },
    { id: 'ai-seo', name: 'AI SEO Optimizer', enabled: true, level: 'auto' }
  ]);
  const [aiLogs, setAiLogs] = useState<AIActionLog[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>([]);
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [socialMetrics, setSocialMetrics] = useState<Record<string, SocialMetrics>>({});
  const [vendors, setVendors] = useState<Vendor[]>(VENDORS.map(v => ({ ...v, brandId: activeBrandId })));
  const [vipClients, setVipClients] = useState<VipClient[]>(VIP_CLIENTS.map(v => ({ ...v, brandId: activeBrandId, status: 'verified' })));
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [supportStats, setSupportStats] = useState<SupportStats>(SUPPORT_STATS);
  const [integrations, setIntegrations] = useState<MaisonIntegration[]>([]);
  const [apiLogs, setApiLogs] = useState<ApiLog[]>([]);
  const [indexingStatus, setIndexingStatus] = useState<IndexingStatus>(INDEXING_STATUS);
  const [indexingLogs, setIndexingLogs] = useState<IndexingLog[]>([]);
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
  const [isShowcaseMode, setShowcaseMode] = useState(false);
  const [activeVip, setActiveVip] = useState<VipClient | null>(null);
  const [activeVendor, setActiveVendor] = useState<Vendor | null>(vendors[0]);
  const [cmsSections, setCmsSections] = useState<CMSSection[]>([
    { id: 'hero', title: 'The Heritage Registry', visible: true, featured: true, brandId: activeBrandId }
  ]);

  // 4. Jurisdictional Scoping Logic
  const activeHub = useMemo(() => {
    if (!currentUser) return 'global';
    if (currentUser.role === 'super_admin') return adminJurisdiction;
    return currentUser.country as CountryCode;
  }, [currentUser, adminJurisdiction]);

  const scopedProducts = useMemo(() => activeHub === 'global' ? products : products.filter(p => p.regions.includes(activeHub as any) || p.isGlobal), [products, activeHub]);
  const scopedInquiries = useMemo(() => activeHub === 'global' ? privateInquiries : privateInquiries.filter(i => i.country.toLowerCase() === activeHub.toLowerCase()), [privateInquiries, activeHub]);
  const scopedEditorials = useMemo(() => activeHub === 'global' ? editorials : editorials.filter(e => e.country === activeHub || e.isGlobal), [editorials, activeHub]);
  const scopedBuyingGuides = useMemo(() => activeHub === 'global' ? buyingGuides : buyingGuides.filter(g => g.country === activeHub || g.isGlobal), [buyingGuides, activeHub]);
  const scopedReturns = useMemo(() => activeHub === 'global' ? returns : returns.filter(r => r.country === activeHub), [returns, activeHub]);
  const scopedNotifications = useMemo(() => !currentUser ? [] : (currentUser.role === 'super_admin' && activeHub === 'global') ? notifications : notifications.filter(n => n.country === activeHub || n.country === 'global'), [notifications, currentUser, activeHub]);
  const scopedApprovals = useMemo(() => activeHub === 'global' ? approvalRequests : approvalRequests.filter(a => a.country === activeHub || a.country === 'global'), [approvalRequests, activeHub]);
  const scopedAuditLogs = useMemo(() => activeHub === 'global' ? auditRegistry : auditRegistry.filter(log => log.country === activeHub || log.country === 'global'), [auditRegistry, activeHub]);
  const scopedWorkflows = useMemo(() => activeHub === 'global' ? workflows : workflows.filter(w => w.country === activeHub || w.country === 'global'), [workflows, activeHub]);
  const scopedTransactions = useMemo(() => {
    if (activeHub === 'global') return transactions;
    if (currentUser?.role === 'vendor') return transactions.filter(t => t.vendorId === currentUser.id);
    return transactions.filter(t => t.country.toLowerCase() === activeHub.toLowerCase());
  }, [transactions, activeHub, currentUser]);
  const scopedQATests = useMemo(() => activeHub === 'global' ? qaTests : qaTests.filter(t => t.country === activeHub || t.country === 'global'), [qaTests, activeHub]);
  const scopedErrors = useMemo(() => activeHub === 'global' ? maisonErrors : maisonErrors.filter(e => e.country === activeHub), [maisonErrors, activeHub]);
  const scopedStressTests = useMemo(() => activeHub === 'global' ? stressTests : stressTests.filter(t => t.country === activeHub || t.country === 'global'), [stressTests, activeHub]);
  const scopedBrandIntegrity = useMemo(() => activeHub === 'global' ? brandIntegrityIssues : brandIntegrityIssues.filter(i => i.country === activeHub), [brandIntegrityIssues, activeHub]);

  // 5. Shared Methods...
  const logAction = (action: string, entity: string, country = 'global', severity: AuditLogEntry['severity'] = 'low') => {
    if (!currentUser) return;
    const entry: AuditLogEntry = { id: `aud-${Date.now()}`, actorId: currentUser.id, actorName: currentUser.name, actorRole: currentUser.role, country, action, entity, timestamp: new Date().toISOString(), severity, brandId: activeBrandId };
    setAuditRegistry(prev => [entry, ...prev]);
  };

  const upsertProduct = (p: Product, changeSummary: string = 'Institutional update') => {
    setProducts(prev => {
      const idx = prev.findIndex(item => item.id === p.id);
      if (idx > -1) {
        return prev.map(item => item.id === p.id ? p : item);
      }
      return [p, ...prev];
    });
    logAction('Registry Update', p.name, (activeHub as any) || 'global');
  };

  const executeSafeSync = (categories: SyncCategory[], targets: CountryCode[]) => {
    logAction('Safe Global Sync Executed', `Targets: ${targets.join(',')}`, 'global', 'medium');
  };

  const value = useMemo(() => ({
    countryConfigs, brandConfigs, activeBrandId, currentUser, adminJurisdiction, globalSyncHistory,
    scopedProducts, scopedInquiries, scopedEditorials, scopedBuyingGuides, scopedReturns, scopedNotifications, scopedApprovals, scopedAuditLogs, scopedWorkflows, scopedTransactions, scopedQATests, scopedErrors, scopedStressTests, scopedBrandIntegrity,
    cmsSections, products, collections, categories, departments, cities, buyingGuides, editorials, qaTests, maisonErrors, stressTests, customerSegments, brandIntegrityIssues,
    privateInquiries, leadConversations, messagingTemplates, seoRegistry, automationRules, aiModules, aiLogs, aiSuggestions,
    notifications, workflows, approvalRequests, auditRegistry, cart, wishlist, socialMetrics, admins: ADMIN_ACCOUNTS, vendors, affiliates, returns, activeCampaigns,
    vipClients, globalSettings, supportTickets, supportStats, integrations, apiLogs, indexingStatus, indexingLogs, appointments, invoices, transactions, isShowcaseMode, activeVip, activeVendor,
    setCountryEnabled: (code: CountryCode, val: boolean) => setCountryConfigs(prev => prev.map(c => c.code === code ? { ...c, enabled: val } : c)),
    updateCountryConfig: (config: CountryConfig) => setCountryConfigs(prev => prev.map(c => c.code === config.code ? config : c)),
    setActiveBrand: setActiveBrandId,
    setCurrentUser,
    setAdminJurisdiction,
    setGuideMode: (val: boolean) => setGlobalSettings(prev => ({ ...prev, isGuideMode: val })),
    setAdminViewMode: (val: AdminViewMode) => setGlobalSettings(prev => ({ ...prev, adminViewMode: val })),
    upsertCMSSection: (s: CMSSection) => setCmsSections(prev => prev.some(i => i.id === s.id) ? prev.map(i => i.id === s.id ? s : i) : [...prev, s]),
    upsertProduct,
    toggleProductVipStatus: (productId: string) => setProducts(prev => prev.map(p => p.id === productId ? { ...p, isVip: !p.isVip } : p)),
    rollbackProductVersion: (productId: string, versionId: string) => {},
    lockProductForEditing: (productId: string) => true,
    unlockProduct: (productId: string) => {},
    deleteProduct: (id: string) => setProducts(prev => prev.filter(p => p.id !== id)),
    upsertCollection: () => {},
    upsertEditorial: (editorial: Editorial) => setEditorials(prev => prev.some(i => i.id === editorial.id) ? prev.map(i => i.id === editorial.id ? editorial : i) : [editorial, ...prev]),
    syncGlobalProducts: (regions: CountryCode[] = ['us','uk','ae','in','sg']) => setProducts(prev => prev.map(p => p.scope === 'global' ? { ...p, regions, lastSyncedAt: new Date().toISOString() } : p)),
    executeSafeSync,
    rollbackGlobalSync: (id: string) => {},
    upsertPrivateInquiry: (inquiry: PrivateInquiry) => setPrivateInquiries(prev => [inquiry, ...prev]),
    updateInquiryStatus: (id: string, s: PrivateInquiry['status']) => setPrivateInquiries(prev => prev.map(i => i.id === id ? { ...i, status: s } : i)),
    addLeadMessage: (id: string, t: string, s: 'curator'|'client') => setLeadConversations(prev => prev.map(c => c.inquiryId === id ? { ...c, messages: [...c.messages, { id: `m-${Date.now()}`, sender: s, text: t, timestamp: new Date().toISOString() }] } : c)),
    sendNotification: (to: string, msg: string, country = 'global', type: MaisonNotification['type'] = 'info') => setNotifications(prev => [{ id: `n-${Date.now()}`, toRole: to, country, message: msg, timestamp: new Date().toISOString(), read: false, type }, ...prev]),
    markNotificationRead: (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n)),
    scheduleWorkflow: (name: string, freq: WorkflowTask['frequency'], country = 'global') => setWorkflows(prev => [{ id: `w-${Date.now()}`, taskName: name, frequency: freq, country, status: 'pending', nextRun: new Date().toISOString() }, ...prev]),
    runWorkflowTask: (id: string) => {},
    runWorkflowSequence: (name: string, country = 'global') => {},
    submitApproval: (type: ApprovalRequest['contentType'], id: string, country = 'global') => {},
    handleApprovalAction: (id: string, a: boolean) => {},
    toggleEmergencyMode: () => setGlobalSettings(prev => ({ ...prev, emergencyMode: !prev.emergencyMode })),
    triggerReindex: () => {},
    logAction,
    logMaisonError: (err: Omit<MaisonError, 'id' | 'timestamp' | 'resolved'>) => setMaisonErrors(prev => [{ ...err, id: `err-${Date.now()}`, timestamp: new Date().toISOString(), resolved: false }, ...prev]),
    resolveMaisonError: (id: string) => setMaisonErrors(prev => prev.map(e => e.id === id ? { ...e, resolved: true } : e)),
    runQATest: (id: string) => {},
    runAllQATests: () => {},
    runStressTest: (load: number, type: StressTest['type']) => {},
    updateAIModule: (id: string, enabled: boolean, level: AIAutomationLevel) => setAiModules(prev => prev.map(m => m.id === id ? { ...m, enabled, level } : m)),
    addAILog: (l: AIActionLog) => setAiLogs(prev => [l, ...prev].slice(0, 50)),
    upsertAISuggestion: (suggestion: AISuggestion) => setAiSuggestions(prev => prev.some(i => i.id === suggestion.id) ? prev.map(i => i.id === suggestion.id ? suggestion : i) : [suggestion, ...prev]),
    updateSuggestionStatus: (id: string, s: AISuggestion['status']) => setAiSuggestions(prev => prev.map(i => i.id === id ? { ...i, status: s } : i)),
    resolveBrandIntegrity: (id: string) => setBrandIntegrityIssues(prev => prev.map(i => i.id === id ? { ...i, status: 'fixed' } : i)),
    addToCart: (p: Product) => setCart(prev => prev.find(i => i.id === p.id) ? prev.map(i => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i) : [...prev, { ...p, quantity: 1 }]),
    removeFromCart: (id: string) => setCart(prev => prev.filter(i => i.id !== id)),
    toggleWishlist: (p: Product) => setWishlist(prev => prev.some(i => i.id === p.id) ? prev.filter(i => i.id !== p.id) : [...prev, p]),
    clearCart: () => setCart([]),
    updateGlobalSettings: (s: GlobalSettings) => setGlobalSettings(s),
    setShowcaseMode,
    setActiveVip,
    setActiveVendor,
    createInvoice: (i: Invoice) => setInvoices(prev => [i, ...prev]),
    createTransaction: (t: Transaction) => setTransactions(prev => [t, ...prev]),
    updateTransactionStatus: (id: string, s: TransactionStatus) => setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: s } : t)),
    toggleLike: (id: string) => setSocialMetrics(prev => ({ ...prev, [id]: { likes: (prev[id]?.likes || 0) + 1, shares: prev[id]?.shares || 0, engagementRate: prev[id]?.engagementRate || 0 } })),
    trackShare: (id: string) => setSocialMetrics(prev => ({ ...prev, [id]: { likes: prev[id]?.likes || 0, shares: (prev[id]?.shares || 0) + 1, engagementRate: prev[id]?.engagementRate || 0 } })),
    upsertAppointment: (a: Appointment) => setAppointments(prev => [a, ...prev]),
    updateTicketStatus: (id: string, s: SupportTicket['status']) => setSupportTickets(prev => prev.map(t => t.id === id ? { ...t, status: s } : t)),
    addTicketMessage: (id: string, t: string, s: 'agent'|'customer') => setSupportTickets(prev => prev.map(tk => tk.id === id ? { ...tk, messages: [...tk.messages, { id: `m-${Date.now()}`, sender: s, text: t, timestamp: new Date().toISOString() }] } : tk)),
    upsertCampaign: (c: Campaign) => setActiveCampaigns(prev => prev.some(i => i.id === c.id) ? prev.map(i => i.id === c.id ? c : i) : [c, ...prev]),
    toggleRule: (id: string) => setAutomationRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r)),
    upsertRule: (r: AutomationRule) => setAutomationRules(prev => prev.some(i => i.id === r.id) ? prev.map(i => i.id === r.id ? r : i) : [...prev, r]),
    verifyClient: (id: string) => setVipClients(prev => prev.map(v => v.id === id ? { ...v, status: 'verified' } : v)),
    approveVendor: (id: string) => setVendors(prev => prev.map(v => v.id === id ? { ...v, status: 'active' } : v)),
  }), [
    countryConfigs, brandConfigs, activeBrandId, currentUser, adminJurisdiction, globalSyncHistory,
    scopedProducts, scopedInquiries, scopedEditorials, scopedBuyingGuides, scopedReturns, scopedNotifications, scopedApprovals, scopedAuditLogs, scopedWorkflows, scopedTransactions, scopedQATests, scopedErrors, scopedStressTests, scopedBrandIntegrity,
    cmsSections, products, collections, categories, departments, cities, buyingGuides, editorials, qaTests, maisonErrors, stressTests, customerSegments, brandIntegrityIssues,
    privateInquiries, leadConversations, messagingTemplates, seoRegistry, automationRules,
    aiModules, aiLogs, aiSuggestions, notifications, workflows, approvalRequests, auditRegistry,
    cart, wishlist, socialMetrics, vendors, affiliates, returns, activeCampaigns,
    vipClients, globalSettings, supportTickets, supportStats, integrations, apiLogs,
    indexingStatus, indexingLogs, appointments, invoices, transactions, isShowcaseMode, activeVip, activeVendor
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppStore must be used within AppProvider');
  return context;
}
