
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
  AdminViewMode
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
  // --- Global Infrastructure ---
  countryConfigs: CountryConfig[];
  brandConfigs: BrandConfig[];
  activeBrandId: string;
  currentUser: MaisonUser | null;
  adminJurisdiction: CountryCode | 'global';
  globalSyncHistory: GlobalSyncSession[];
  
  // Scoped Data Views
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
  
  // Core Lists
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
  auditRegistry: AuditLogEntry[];
  
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
  transactions: Transaction[];

  // Showcase State
  isShowcaseMode: boolean;
  activeVip: VipClient | null;
  activeVendor: Vendor | null;
  
  // --- Actions ---
  setCountryEnabled: (code: CountryCode, enabled: boolean) => void;
  updateCountryConfig: (config: CountryConfig) => void;
  setActiveBrand: (id: string) => void;
  setCurrentUser: (user: MaisonUser | null) => void;
  setAdminJurisdiction: (jurisdiction: CountryCode | 'global') => void;
  setGuideMode: (val: boolean) => void;
  setAdminViewMode: (val: AdminViewMode) => void;
  
  // CMS Actions
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
  
  // Safe Global Sync Actions
  executeSafeSync: (categories: SyncCategory[], targets: CountryCode[]) => void;
  rollbackGlobalSync: (sessionId: string) => void;

  // Sales Actions
  upsertPrivateInquiry: (inquiry: PrivateInquiry) => void;
  updateInquiryStatus: (id: string, status: PrivateInquiry['status']) => void;
  addLeadMessage: (inquiryId: string, text: string, sender: 'curator' | 'client') => void;
  
  // Operational Actions
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

  // Error Actions
  logMaisonError: (error: Omit<MaisonError, 'id' | 'timestamp' | 'resolved'>) => void;
  resolveMaisonError: (id: string) => void;

  // Onboarding Actions
  registerVendor: (data: Partial<Vendor>) => void;
  approveVendor: (id: string) => void;
  registerClient: (data: Partial<VipClient>) => void;
  verifyClient: (id: string) => void;

  // AI Actions
  updateAIModule: (id: string, enabled: boolean, level: AIAutomationLevel) => void;
  addAILog: (log: AIActionLog) => void;
  upsertAISuggestion: (suggestion: AISuggestion) => void;
  updateSuggestionStatus: (id: string, status: AISuggestion['status']) => void;

  // QA Actions
  runQATest: (id: string) => void;
  runAllQATests: () => void;
  runStressTest: (loadSize: number, type: StressTest['type']) => void;

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
  createTransaction: (transaction: Transaction) => void;
  processPayment: (transactionId: string) => void;
  updateTransactionStatus: (id: string, status: TransactionStatus) => void;
  toggleLike: (articleId: string, country: string) => void;
  trackShare: (articleId: string, country: string) => void;
  upsertAppointment: (appointment: Appointment) => void;
  updateTicketStatus: (id: string, status: SupportTicket['status']) => void;
  addTicketMessage: (ticketId: string, text: string, sender: 'agent' | 'customer') => void;
  
  // Marketing Actions
  upsertCampaign: (campaign: Campaign) => void;
  
  // Automation Actions
  toggleRule: (id: string) => void;
  upsertRule: (rule: AutomationRule) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Global Infrastructure
  const [countryConfigs, setCountryConfigs] = useState<CountryConfig[]>(COUNTRIES_CONFIG.map(c => ({
    ...c,
    taxType: c.code === 'us' ? 'Sales Tax' : c.code === 'uk' || c.code === 'ae' ? 'VAT' : 'GST',
    taxRate: c.code === 'uk' ? 20 : c.code === 'ae' ? 5 : c.code === 'in' ? 18 : c.code === 'sg' ? 9 : 8
  })));
  const [brandConfigs, setBrandConfigs] = useState<BrandConfig[]>(BRANDS_CONFIG);
  const [activeBrandId, setActiveBrandId] = useState<string>(BRANDS_CONFIG[0].id);
  const [currentUser, setCurrentUser] = useState<MaisonUser | null>(MOCK_SESSION_USER);
  const [adminJurisdiction, setAdminJurisdiction] = useState<CountryCode | 'global'>('global');
  const [globalSyncHistory, setGlobalSyncHistory] = useState<GlobalSyncSession[]>([]);

  // Content state
  const [cmsSections, setCmsSections] = useState<CMSSection[]>([
    { id: 'hero', title: 'The Heritage Registry', visible: true, featured: true, brandId: activeBrandId },
    { id: 'private-salon', title: 'Private Acquisition Salon', visible: true, featured: true, brandId: activeBrandId }
  ]);
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
  const [collections] = useState<Collection[]>(INITIAL_COLLECTIONS.map(c => ({ ...c, brandId: activeBrandId, isGlobal: true })));
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES.map(c => ({ ...c, brandId: activeBrandId })));
  const [departments] = useState<Department[]>(INITIAL_DEPARTMENTS.map(d => ({ ...d, brandId: activeBrandId })));
  const [cities] = useState<City[]>(INITIAL_CITIES);
  const [buyingGuides, setBuyingGuides] = useState<BuyingGuide[]>(INITIAL_GUIDES.map(g => ({ ...g, brandId: activeBrandId, isGlobal: false })));
  const [editorials, setEditorials] = useState<Editorial[]>(EDITOR_INITIAL.map(e => ({ ...e, brandId: activeBrandId, isGlobal: false })));

  // CRM state
  const [privateInquiries, setPrivateInquiries] = useState<PrivateInquiry[]>(MOCK_INQUIRIES.map(i => ({ ...i, brandId: activeBrandId })));
  const [leadConversations, setLeadConversations] = useState<LeadConversation[]>(MOCK_CONVERSATIONS.map(c => ({ ...c, brandId: activeBrandId })));
  const [messagingTemplates, setMessagingTemplates] = useState<SalesScript[]>(ACQUISITION_SCRIPTS.map(s => ({ ...s, brandId: activeBrandId })));

  // SEO state
  const [seoRegistry, setSeoRegistry] = useState<SEOMetadata[]>([
    { id: 'home-us', path: '/us', title: 'AMARISÉ | The Heritage Registry (USA)', description: 'Elite acquisition hub.', keywords: 'luxury, heritage', h1: 'The Heritage Registry', brandId: activeBrandId, isGlobal: false },
    { id: 'home-ae', path: '/ae', title: 'AMARISÉ | The Heritage Registry (UAE)', description: 'Dubai Gold Collection.', keywords: 'luxury dubai, gold', h1: 'Dubai Ateliers', brandId: activeBrandId, isGlobal: false }
  ]);

  // AI & Automation state
  const [aiModules, setAiModules] = useState<AIModuleStatus[]>([
    { id: 'ai-sales', name: 'AI Sales Agent', enabled: true, level: 'assisted' },
    { id: 'ai-analytics', name: 'AI Analytics Engine', enabled: true, level: 'auto' },
    { id: 'ai-content', name: 'AI Content Engine', enabled: true, level: 'assisted' },
    { id: 'ai-seo', name: 'AI SEO Optimizer', enabled: true, level: 'auto' }
  ]);
  const [aiLogs, setAiLogs] = useState<AIActionLog[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>([]);
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([
    { id: 'r1', name: 'India Hub Yield Mitigation', trigger: 'revenue_drop', action: 'suggest_mitigation', enabled: true, brandId: activeBrandId, country: 'in' },
    { id: 'r2', name: 'T1 Lead Urgent Routing', trigger: 'lead_surge', action: 'notify_admin', enabled: true, brandId: activeBrandId }
  ]);

  // Operational state
  const [notifications, setNotifications] = useState<MaisonNotification[]>([
    { id: 'n1', toRole: 'country_admin', country: 'in', message: 'New T1 Inquiry from Mumbai Hub', timestamp: new Date().toISOString(), read: false, type: 'alert' },
    { id: 'n2', toRole: 'super_admin', country: 'global', message: 'Global AI Sentiment Analysis Complete', timestamp: new Date().toISOString(), read: false, type: 'success' }
  ]);
  const [workflows, setWorkflows] = useState<WorkflowTask[]>([
    { id: 'w1', taskName: 'Global AI Sentiment Loop', frequency: 'hourly', country: 'global', status: 'complete', lastRun: new Date().toISOString(), nextRun: new Date(Date.now() + 3600000).toISOString() },
    { id: 'w2', taskName: 'Catalog Search Index Sync', frequency: 'daily', country: 'us', status: 'pending', nextRun: new Date(Date.now() + 86400000).toISOString() },
    { id: 'w3', taskName: 'Daily Content Update', frequency: 'daily', country: 'us', status: 'pending', nextRun: new Date(Date.now() + 3600000).toISOString() },
    { id: 'w4', taskName: 'SEO Audit Cycle', frequency: 'daily', country: 'ae', status: 'pending', dependencyId: 'w3', nextRun: new Date(Date.now() + 10800000).toISOString() }
  ]);
  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>([
    { id: 'a1', userId: 'u-4', userName: 'Lumière Atelier', contentType: 'listing', contentId: 'prod-50', country: 'ae', status: 'pending', timestamp: new Date().toISOString() }
  ]);
  const [analyticsData] = useState<AnalyticsMetric[]>([
    { date: '2024-03-01', revenue: 120000, leads: 45, conversionRate: 4.2, aiScore: 88 },
    { date: '2024-03-08', revenue: 145000, leads: 52, conversionRate: 4.5, aiScore: 92 },
    { date: '2024-03-15', revenue: 180000, leads: 68, conversionRate: 5.1, aiScore: 95 }
  ]);
  const [auditRegistry, setAuditRegistry] = useState<AuditLogEntry[]>([
    { id: 'aud-1', actorId: 'adm-1', actorName: 'Maison CEO', actorRole: 'super_admin', country: 'global', action: 'Created AI Autopilot Cycle', entity: 'AI System', timestamp: new Date(Date.now() - 86400000).toISOString(), severity: 'low' },
    { id: 'aud-2', actorId: 'adm-2', actorName: 'Operations Lead', actorRole: 'country_admin', country: 'ae', action: 'Approved Vendor Listing', entity: 'Artifact prod-50', timestamp: new Date(Date.now() - 3600000).toISOString(), severity: 'medium' }
  ]);

  // QA Tests state
  const [qaTests, setQaTests] = useState<QATestCase[]>([
    { id: 'qa-1', name: 'AI Autopilot Job Execution', module: 'AI', status: 'pending', logs: [], country: 'global', brandId: activeBrandId },
    { id: 'qa-2', name: 'Vendor Registration Workflow', module: 'Onboarding', status: 'pending', logs: [], country: 'us', brandId: activeBrandId },
    { id: 'qa-3', name: 'Finance Transaction Retrieval', module: 'Finance', status: 'pending', logs: [], country: 'ae', brandId: activeBrandId },
    { id: 'qa-4', name: 'Audit Log Recording', module: 'Audit', status: 'pending', logs: [], country: 'in', brandId: activeBrandId },
    { id: 'qa-5', name: 'RBAC Permission Enforcement', module: 'Security', status: 'pending', logs: [], country: 'uk', brandId: activeBrandId }
  ]);

  const [stressTests, setStressTests] = useState<StressTest[]>([]);

  // Error Handling state
  const [maisonErrors, setMaisonErrors] = useState<MaisonError[]>([
    { id: 'err-1', module: 'AI Autopilot', type: 'JobFailed', country: 'us', message: 'Predictive lead scoring cycle failed due to data drift.', stackTrace: 'ReferenceError: leadScore is not defined at analysis.ts:42', resolved: false, timestamp: new Date().toISOString(), severity: 'high', brandId: activeBrandId },
    { id: 'err-2', module: 'Finance', type: 'PaymentError', country: 'uk', message: 'Mock transaction retrieval timed out.', resolved: false, timestamp: new Date().toISOString(), severity: 'medium', brandId: activeBrandId }
  ]);

  // Admin & Logistics state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [socialMetrics, setSocialMetrics] = useState<Record<string, SocialMetrics>>({});
  const [admins] = useState<AdminAccount[]>(ADMIN_ACCOUNTS);
  const [vendors, setVendors] = useState<Vendor[]>(VENDORS.map(v => ({ ...v, brandId: activeBrandId })));
  const [affiliates, setAffiliates] = useState<Affiliate[]>(AFFILIATES.map(a => ({ ...a, brandId: activeBrandId })));
  const [returns, setReturns] = useState<ReturnRequest[]>(RETURNS.map(r => ({ ...r, brandId: activeBrandId })));
  const [activeCampaigns, setCampaigns] = useState<Campaign[]>(CAMPAIGNS.map(c => ({ ...c, brandId: activeBrandId })));
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(AUDIT_LOGS);
  const [vipClients, setVipClients] = useState<VipClient[]>(VIP_CLIENTS.map(v => ({ ...v, brandId: activeBrandId, status: 'verified' })));
  const [customerSegments] = useState<CustomerSegment[]>(CUSTOMER_SEGMENTS.map(s => ({ ...s, brandId: activeBrandId })));
  const [appointments, setAppointments] = useState<Appointment[]>(APPOINTMENTS.map(a => ({ ...a, brandId: activeBrandId })));
  const [invoices, setInvoices] = useState<Invoice[]>(INVOICES.map(i => ({ ...i, brandId: activeBrandId })));
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 'tx-1', country: 'us', type: 'Sale', clientName: 'Julian Vandervilt', amount: 45000, currency: 'USD', status: 'Settled', timestamp: new Date().toISOString(), brandId: activeBrandId, taxAmount: 3600, netAmount: 41400 },
    { id: 'tx-2', country: 'uk', type: 'Sale', clientName: 'Alexander Cross', amount: 12500, currency: 'GBP', status: 'Paid', timestamp: new Date().toISOString(), brandId: activeBrandId, taxAmount: 2500, netAmount: 10000 },
    { id: 'tx-3', country: 'ae', type: 'Sale', clientName: 'Hamdan Al Maktoum', amount: 85000, currency: 'AED', status: 'Processing', timestamp: new Date().toISOString(), brandId: activeBrandId, taxAmount: 4250, netAmount: 80750 },
    { id: 'tx-4', country: 'in', type: 'Sale', clientName: 'Aarav Sharma', amount: 750000, currency: 'INR', status: 'Settled', timestamp: new Date().toISOString(), brandId: activeBrandId, taxAmount: 135000, netAmount: 615000 }
  ]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(SUPPORT_TICKETS.map(t => ({ ...t, brandId: activeBrandId })));
  
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
    emergencyMode: false,
    isGuideMode: false,
    adminViewMode: 'advanced'
  });

  const [isShowcaseMode, setShowcaseMode] = useState(false);
  const [activeVip, setActiveVip] = useState<VipClient | null>(null);
  const [activeVendor, setActiveVendor] = useState<Vendor | null>(vendors[0]);

  // --- Scoped View Resolution Logic ---
  const activeHub = useMemo(() => {
    if (!currentUser) return 'global';
    if (currentUser.role === 'super_admin') return adminJurisdiction;
    return currentUser.country as CountryCode;
  }, [currentUser, adminJurisdiction]);

  const scopedProducts = useMemo(() => {
    if (activeHub === 'global') return products;
    return products.filter(p => p.regions.includes(activeHub as any) || p.isGlobal);
  }, [products, activeHub]);

  const scopedInquiries = useMemo(() => {
    if (activeHub === 'global') return privateInquiries;
    return privateInquiries.filter(i => i.country.toLowerCase() === activeHub.toLowerCase());
  }, [privateInquiries, activeHub]);

  const scopedEditorials = useMemo(() => {
    if (activeHub === 'global') return editorials;
    return editorials.filter(e => e.country === activeHub || e.isGlobal);
  }, [editorials, activeHub]);

  const scopedBuyingGuides = useMemo(() => {
    if (activeHub === 'global') return buyingGuides;
    return buyingGuides.filter(g => g.country === activeHub || g.isGlobal);
  }, [buyingGuides, activeHub]);

  const scopedReturns = useMemo(() => {
    return returns.filter(r => r.brandId === activeBrandId);
  }, [returns, activeBrandId]);

  const scopedTransactions = useMemo(() => {
    if (activeHub === 'global') return transactions;
    if (currentUser?.role === 'vendor') return transactions.filter(t => t.vendorId === currentUser.id);
    return transactions.filter(t => t.country.toLowerCase() === activeHub.toLowerCase());
  }, [transactions, activeHub, currentUser]);
  
  const scopedNotifications = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.role === 'super_admin' && activeHub === 'global') return notifications;
    return notifications.filter(n => (n.country === activeHub || n.country === 'global'));
  }, [notifications, currentUser, activeHub]);
  
  const scopedApprovals = useMemo(() => {
    if (activeHub === 'global') return approvalRequests;
    return approvalRequests.filter(a => a.country === activeHub || a.country === 'global');
  }, [approvalRequests, activeHub]);

  const scopedAuditLogs = useMemo(() => {
    if (activeHub === 'global') return auditRegistry;
    return auditRegistry.filter(log => log.country === activeHub || log.country === 'global');
  }, [auditRegistry, activeHub]);

  const scopedWorkflows = useMemo(() => {
    if (activeHub === 'global') return workflows;
    return workflows.filter(w => w.country === activeHub || w.country === 'global');
  }, [workflows, activeHub]);

  const scopedQATests = useMemo(() => {
    if (activeHub === 'global') return qaTests;
    return qaTests.filter(t => t.country === activeHub || t.country === 'global');
  }, [qaTests, activeHub]);

  const scopedErrors = useMemo(() => {
    if (activeHub === 'global') return maisonErrors;
    return maisonErrors.filter(e => e.country === activeHub || e.country === 'global');
  }, [maisonErrors, activeHub]);

  const scopedStressTests = useMemo(() => {
    return stressTests;
  }, [stressTests]);

  // --- Actions ---
  const logAction = (action: string, entity: string, country = 'global', severity: AuditLogEntry['severity'] = 'low') => {
    if (!currentUser) return;
    const entry: AuditLogEntry = {
      id: `aud-${Date.now()}`,
      actorId: currentUser.id,
      actorName: currentUser.name,
      actorRole: currentUser.role,
      country,
      action,
      entity,
      timestamp: new Date().toISOString(),
      severity,
      brandId: activeBrandId
    };
    setAuditRegistry(prev => [entry, ...prev]);
  };

  const logMaisonError = (err: Omit<MaisonError, 'id' | 'timestamp' | 'resolved'>) => {
    const error: MaisonError = { ...err, id: `err-${Date.now()}`, timestamp: new Date().toISOString(), resolved: false };
    setMaisonErrors(prev => [error, ...prev]);
    logAction(`Logged System Error: ${err.type}`, err.module, err.country, 'high');
    sendNotification('super_admin', `Critical Error in ${err.module}: ${err.type}`, err.country, 'alert');
  };

  const resolveMaisonError = (id: string) => {
    setMaisonErrors(prev => prev.map(e => e.id === id ? { ...e, resolved: true } : e));
    const err = maisonErrors.find(e => e.id === id);
    if (err) logAction(`Resolved System Error: ${err.type}`, err.module, err.country, 'low');
  };

  const sendNotification = (toRole: string, message: string, country = 'global', type: MaisonNotification['type'] = 'info') => {
    const id = `n-${Date.now()}`;
    setNotifications(prev => [{ id, toRole, country, message, timestamp: new Date().toISOString(), read: false, type }, ...prev]);
  };

  const markNotificationRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  const scheduleWorkflow = (taskName: string, frequency: WorkflowTask['frequency'], country = 'global') => {
    setWorkflows(prev => [...prev, { id: `w-${Date.now()}`, taskName, frequency, country, status: 'pending', nextRun: new Date(Date.now() + 3600000).toISOString() }]);
  };

  const runWorkflowTask = (id: string) => {
    const task = workflows.find(w => w.id === id);
    if (!task) return;
    setWorkflows(prev => prev.map(w => w.id === id ? { ...w, status: 'running', lastRun: new Date().toISOString() } : w));
    setTimeout(() => {
      setWorkflows(prev => prev.map(w => w.id === id ? { ...w, status: 'complete', nextRun: new Date(Date.now() + 86400000).toISOString() } : w));
      logAction(`Completed AI Autopilot Job: ${task.taskName}`, 'Workflow System', task.country);
    }, 2000);
  };

  const runWorkflowSequence = (workflowName: string, country: string = 'global') => {
    const relevantTasks = workflows.filter(w => w.country === country || w.country === 'global');
    relevantTasks.forEach((task, idx) => {
      setTimeout(() => runWorkflowTask(task.id), idx * 1500);
    });
  };

  const syncGlobalProducts = (regions: CountryCode[] = ['us', 'uk', 'ae', 'in', 'sg']) => {
    setProducts(prev => prev.map(p => p.scope === 'global' ? { ...p, regions, lastSyncedAt: new Date().toISOString() } : p));
    logAction('Master Product Hub Sync', `${regions.length} Countries`);
  };

  const executeSafeSync = (categories: SyncCategory[], targets: CountryCode[]) => {
    const snapshot: GlobalSyncSession['snapshotBefore'] = {
      products: JSON.parse(JSON.stringify(products)),
      seo: JSON.parse(JSON.stringify(seoRegistry)),
      config: JSON.parse(JSON.stringify(countryConfigs))
    };

    const sessionId = `sync-${Date.now()}`;
    const session: GlobalSyncSession = {
      id: sessionId,
      timestamp: new Date().toISOString(),
      categories,
      targets,
      snapshotBefore: snapshot,
      actorName: currentUser?.name || 'Super Admin',
      status: 'applied'
    };

    if (categories.includes('products')) {
      setProducts(prev => prev.map(p => 
        p.scope === 'global' ? { ...p, regions: targets, lastSyncedAt: session.timestamp } : p
      ));
    }

    if (categories.includes('seo')) {
      setSeoRegistry(prev => prev.map(s => 
        s.isGlobal ? { ...s, lastSyncedAt: session.timestamp } : s
      ));
    }

    setGlobalSyncHistory(prev => [session, ...prev]);
    logAction(`Executed Safe Global Sync (${categories.join(', ')})`, `Targets: ${targets.join(', ')}`, 'global', 'medium');
  };

  const rollbackGlobalSync = (sessionId: string) => {
    const session = globalSyncHistory.find(s => s.id === sessionId);
    if (!session || session.status === 'rolled_back') return;

    if (session.categories.includes('products')) setProducts(session.snapshotBefore.products);
    if (session.categories.includes('seo')) setSeoRegistry(session.snapshotBefore.seo);
    if (session.categories.includes('config')) setCountryConfigs(session.snapshotBefore.config);

    setGlobalSyncHistory(prev => prev.map(s => s.id === sessionId ? { ...s, status: 'rolled_back' } : s));
    logAction(`Rolled Back Global Sync`, sessionId, 'global', 'high');
  };

  const upsertCMSSection = (s: CMSSection) => setCmsSections(prev => {
    const idx = prev.findIndex(item => item.id === s.id);
    return idx > -1 ? prev.map(item => item.id === s.id ? s : item) : [...prev, s];
  });

  const upsertProduct = (p: Product, changeSummary: string = 'Institutional registry update') => {
    setProducts(prev => {
      const idx = prev.findIndex(item => item.id === p.id);
      if (idx > -1) {
        const existing = prev[idx];
        if (existing.scope === 'global' && existing.conflictStrategy === 'global-priority' && activeHub !== 'global') {
          return prev;
        }

        const newVersion: ArtifactVersion = {
          id: `v-${Date.now()}`,
          version: existing.currentVersion + 1,
          data: JSON.parse(JSON.stringify(existing)),
          editedBy: currentUser?.name || 'System',
          timestamp: new Date().toISOString(),
          changeSummary
        };

        const updatedProduct: Product = {
          ...p,
          currentVersion: existing.currentVersion + 1,
          versionHistory: [newVersion, ...existing.versionHistory].slice(0, 50),
          lastSyncedAt: new Date().toISOString(),
          lastEditedRegion: (activeHub as any) || 'global'
        };

        logAction('Updated Artifact Registry', p.name, updatedProduct.lastEditedRegion);
        return prev.map(item => item.id === p.id ? updatedProduct : item);
      } else {
        const newProduct: Product = {
          ...p,
          versionHistory: [],
          currentVersion: 1,
          lastEditedRegion: (activeHub as any) || 'global'
        };
        logAction('Registered New Artifact', p.name, newProduct.lastEditedRegion);
        return [newProduct, ...prev];
      }
    });
  };

  const toggleProductVipStatus = (productId: string) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, isVip: !p.isVip } : p));
    const p = products.find(prod => prod.id === productId);
    logAction(`Toggled Acquisition Strategy: ${!p?.isVip ? 'Private' : 'Normal'}`, p?.name || productId);
  };

  const rollbackProductVersion = (productId: string, versionId: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const version = p.versionHistory.find(v => v.id === versionId);
        if (version) {
          logAction('Rollback Execution', p.name, activeHub);
          return {
            ...version.data,
            versionHistory: p.versionHistory,
            currentVersion: p.currentVersion,
            lastSyncedAt: new Date().toISOString()
          };
        }
      }
      return p;
    }));
  };

  const lockProductForEditing = (productId: string) => {
    const p = products.find(prod => prod.id === productId);
    if (p?.editingLock && p.editingLock.userId !== currentUser?.id && new Date(p.editingLock.expiresAt) > new Date()) {
      return false;
    }
    
    setProducts(prev => prev.map(prod => prod.id === productId ? {
      ...prod,
      editingLock: {
        userId: currentUser?.id || 'sys',
        userName: currentUser?.name || 'System',
        expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString()
      }
    } : prod));
    return true;
  };

  const unlockProduct = (productId: string) => {
    setProducts(prev => prev.map(prod => prod.id === productId ? { ...prod, editingLock: undefined } : prod));
  };

  const deleteProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));
  const upsertCollection = (c: Collection) => console.log('Update collection', c);
  const upsertEditorial = (e: Editorial) => console.log('Update editorial', e);

  const upsertPrivateInquiry = (inquiry: PrivateInquiry) => {
    const leadTier = inquiry.budgetRange === 'Tier 1' || inquiry.intent === 'Collector' ? 1 : 
                     inquiry.budgetRange === 'Tier 2' ? 2 : 3;
    const enrichedInquiry = { ...inquiry, leadTier };
    setPrivateInquiries(prev => [enrichedInquiry, ...prev]);
    setLeadConversations(prev => [...prev, { id: `conv-${inquiry.id}`, inquiryId: inquiry.id, messages: [], status: 'active', brandId: activeBrandId }]);
    if (leadTier === 1) sendNotification('country_admin', `HIGH PRIORITY Lead: ${inquiry.customerName}`, enrichedInquiry.country.toLowerCase(), 'alert');
  };
  
  const updateInquiryStatus = (id: string, status: PrivateInquiry['status']) => setPrivateInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  const addLeadMessage = (inquiryId: string, text: string, sender: 'curator' | 'client') => {
    setLeadConversations(prev => prev.map(c => c.inquiryId === inquiryId ? { ...c, messages: [...c.messages, { id: `msg-${Date.now()}`, sender, text, timestamp: new Date().toISOString() }] } : c));
  };

  const updateAIModule = (id: string, enabled: boolean, level: AIAutomationLevel) => {
    setAiModules(prev => prev.map(m => m.id === id ? { ...m, enabled, level } : m));
  };
  const addAILog = (log: AIActionLog) => setAiLogs(prev => [log, ...prev].slice(0, 50));
  const upsertAISuggestion = (s: AISuggestion) => setAiSuggestions(prev => {
    const idx = prev.findIndex(item => item.id === s.id);
    return idx > -1 ? prev.map(item => item.id === s.id ? s : item) : [s, ...prev];
  });
  const updateSuggestionStatus = (id: string, status: AISuggestion['status']) => setAiSuggestions(prev => prev.map(s => s.id === id ? { ...s, status } : s));

  const recordLog = (action: string, module: string, severity: AuditLog['severity'] = 'low') => setAuditLogs(prev => [{ id: `log-${Date.now()}`, adminId: 'adm-current', adminName: currentUser?.name || 'System', action, module, timestamp: new Date().toISOString(), ipAddress: 'Institutional Registry', severity, brandId: activeBrandId }, ...prev]);
  const addToCart = (product: Product) => setCart(prev => prev.find(item => item.id === product.id) ? prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...prev, { ...product, quantity: 1 }]);
  const removeFromCart = (productId: string) => setCart(prev => prev.filter(item => item.id !== productId));
  const toggleWishlist = (product: Product) => setWishlist(prev => prev.some(i => i.id === product.id) ? prev.filter(i => i.id !== product.id) : [...prev, product]);
  const clearCart = () => setCart([]);
  const updateGlobalSettings = (s: GlobalSettings) => setGlobalSettings(s);
  const setGuideMode = (val: boolean) => setGlobalSettings(prev => ({ ...prev, isGuideMode: val }));
  const setAdminViewMode = (val: AdminViewMode) => setGlobalSettings(prev => ({ ...prev, adminViewMode: val }));
  
  const createInvoice = (inv: Invoice) => {
    setInvoices(prev => [inv, ...prev]);
  };

  const createTransaction = (tx: Transaction) => {
    setTransactions(prev => [tx, ...prev]);
  };

  const processPayment = (transactionId: string) => {
    setTransactions(prev => prev.map(t => t.id === transactionId ? { ...t, status: 'Settled' } : t));
  };

  const updateTransactionStatus = (id: string, status: TransactionStatus) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    logAction(`Transaction Status Update: ${status}`, `Transaction ${id}`);
  };

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

  const setCountryEnabled = (code: CountryCode, enabled: boolean) => {
    setCountryConfigs(prev => prev.map(c => c.code === code ? { ...c, enabled } : c));
  };

  const updateCountryConfig = (config: CountryConfig) => {
    setCountryConfigs(prev => prev.map(c => c.code === config.code ? config : c));
  };

  const setActiveBrand = (id: string) => setActiveBrandId(id);

  const registerVendor = (data: Partial<Vendor>) => {
    const id = `vend-${Date.now()}`;
    const newVendor: Vendor = {
      id,
      name: data.name || 'New Atelier',
      category: data.category || 'General',
      performance: 100,
      productCount: 0,
      salesTotal: 0,
      status: 'pending',
      payoutSchedule: 'weekly',
      joinedDate: new Date().toISOString(),
      kpis: { returnRate: 0, fulfillmentSpeed: 'N/A', rating: 5.0 },
      brandId: activeBrandId
    };
    setVendors(prev => [newVendor, ...prev]);
    logAction('Registered New Partner Atelier', newVendor.name, 'global', 'low');
  };

  const approveVendor = (id: string) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, status: 'active' } : v));
    logAction('Approved Institutional Partner', id, 'global', 'low');
  };

  const registerClient = (data: Partial<VipClient>) => {
    const id = `vip-${Date.now()}`;
    const newClient: VipClient = {
      id,
      name: data.name || 'Anonymous Connoisseur',
      email: data.email || '',
      tier: 'Silver',
      loyaltyPoints: 0,
      totalSpend: 0,
      isSubscriber: false,
      brandId: activeBrandId,
      status: 'pending'
    };
    setVipClients(prev => [newClient, ...prev]);
    logAction('New Connoisseur Registered', newClient.name, 'global', 'low');
  };

  const verifyClient = (id: string) => {
    setVipClients(prev => prev.map(c => c.id === id ? { ...c, status: 'verified' } : c));
    logAction('Verified Elite Client', id, 'global', 'low');
  };

  const toggleEmergencyMode = () => {
    setGlobalSettings(prev => ({ ...prev, emergencyMode: !prev.emergencyMode }));
    logAction('Emergency Mode Toggled', globalSettings.emergencyMode ? 'OFF' : 'ON', 'global', 'high');
  };

  const triggerReindex = (type: string) => {
    setIndexingStatus(prev => ({ ...prev, searchEngineStatus: 'Syncing' }));
    setTimeout(() => setIndexingStatus(prev => ({ ...prev, searchEngineStatus: 'Optimal' })), 2000);
    logAction(`Triggered ${type} Re-index`, 'Search Engine');
  };

  const runQATest = (id: string) => {
    setQaTests(prev => prev.map(t => t.id === id ? { ...t, status: 'running' } : t));
    setTimeout(() => {
      setQaTests(prev => prev.map(t => t.id === id ? { 
        ...t, 
        status: 'passed', 
        lastRun: new Date().toISOString(),
        logs: [{ id: `l-${Date.now()}`, message: 'Integrity verified against Founding Charter.', timestamp: new Date().toISOString() }, ...t.logs]
      } : t));
    }, 1500);
  };

  const runAllQATests = () => {
    qaTests.forEach(t => runQATest(t.id));
  };

  const runStressTest = (loadSize: number, type: StressTest['type']) => {
    const testId = `stress-${Date.now()}`;
    const newTest: StressTest = {
      id: testId,
      name: `High-Load ${type} Matrix [${loadSize}]`,
      loadSize,
      type,
      status: 'running',
      metrics: {
        startTime: new Date().toISOString(),
        processedCount: 0,
        errorCount: 0,
        failureCount: 0
      },
      logs: [{ id: `l-${Date.now()}`, message: `Initiating ${loadSize} iteration cycle for ${type} subsystem...`, timestamp: new Date().toISOString() }],
      country: activeHub
    };

    setStressTests(prev => [newTest, ...prev]);

    let count = 0;
    const interval = setInterval(() => {
      const stepSize = Math.ceil(loadSize / 20);
      count += stepSize;
      
      if (count >= loadSize) {
        count = loadSize;
        clearInterval(interval);
        
        const duration = Math.random() * 2000 + 500;
        setStressTests(prev => prev.map(t => t.id === testId ? {
          ...t,
          status: 'passed',
          metrics: {
            ...t.metrics,
            endTime: new Date().toISOString(),
            durationMs: duration,
            processedCount: loadSize,
            errorCount: Math.floor(Math.random() * (loadSize / 1000)),
            failureCount: 0
          },
          logs: [
            ...t.logs,
            { id: `l-finish-${Date.now()}`, message: `Stress test complete. Subsystem maintained integrity.`, timestamp: new Date().toISOString() },
            { id: `l-perf-${Date.now()}`, message: `Average throughput: ${Math.floor(loadSize / (duration / 1000))} items/sec`, timestamp: new Date().toISOString() }
          ]
        } : t));
        logAction(`Completed Stress Test: ${newTest.name}`, 'QA Laboratory', newTest.country, 'medium');
      } else {
        setStressTests(prev => prev.map(t => t.id === testId ? {
          ...t,
          metrics: { ...t.metrics, processedCount: count }
        } : t));
      }
    }, 150);
  };

  const handleApprovalAction = (requestId: string, approve: boolean, comments?: string) => {
    setApprovalRequests(prev => prev.map(req => req.id === requestId ? { ...req, status: approve ? 'approved' : 'rejected', comments, approvedBy: currentUser?.name } : req));
    const req = approvalRequests.find(r => r.id === requestId);
    if (req && approve && req.contentType === 'listing') {
      setProducts(prev => prev.map(p => p.id === req.contentId ? { ...p, status: 'published' } : p));
    }
    logAction(`${approve ? 'Approved' : 'Rejected'} Content Request`, requestId, req?.country, 'medium');
  };

  const submitApproval = (contentType: ApprovalRequest['contentType'], contentId: string, country: string = 'global') => {
    const request: ApprovalRequest = {
      id: `a-${Date.now()}`,
      userId: currentUser?.id || 'sys',
      userName: currentUser?.name || 'System',
      contentType,
      contentId,
      country,
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    setApprovalRequests(prev => [request, ...prev]);
    logAction('Submitted Content for Audit', contentId, country, 'low');
  };

  const upsertCampaign = (c: Campaign) => {
    setCampaigns(prev => {
      const idx = prev.findIndex(item => item.id === c.id);
      if (idx > -1) {
        logAction('Updated Marketing Campaign', c.title, c.market);
        return prev.map(item => item.id === c.id ? c : item);
      } else {
        logAction('Initialized New Campaign', c.title, c.market);
        return [c, ...prev];
      }
    });
  };

  const toggleRule = (id: string) => setAutomationRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  const upsertRule = (r: AutomationRule) => setAutomationRules(prev => {
    const idx = prev.findIndex(item => item.id === r.id);
    return idx > -1 ? prev.map(item => item.id === r.id ? r : item) : [...prev, r];
  });

  const value = useMemo(() => ({
    countryConfigs, brandConfigs, activeBrandId, currentUser, adminJurisdiction, globalSyncHistory,
    scopedProducts, scopedInquiries, scopedEditorials, scopedBuyingGuides, scopedReturns, scopedNotifications, scopedApprovals, scopedAuditLogs, scopedWorkflows, scopedTransactions, scopedQATests, scopedErrors, scopedStressTests,
    cmsSections, products, collections, categories, departments, cities, buyingGuides, editorials, qaTests, maisonErrors, stressTests,
    privateInquiries, leadConversations, messagingTemplates, seoRegistry, automationRules,
    aiModules, aiLogs, aiSuggestions,
    notifications, workflows, approvalRequests, analyticsData, auditRegistry,
    cart, wishlist, socialMetrics, admins, vendors, affiliates, returns, activeCampaigns, auditLogs,
    vipClients, customerSegments, globalSettings, supportTickets, supportStats, integrations, apiLogs,
    indexingStatus, indexingLogs, appointments, invoices, transactions, isShowcaseMode, activeVip, activeVendor,
    setCountryEnabled, updateCountryConfig, setActiveBrand, setCurrentUser, setAdminJurisdiction, setGuideMode, setAdminViewMode,
    upsertCMSSection, upsertProduct, toggleProductVipStatus, rollbackProductVersion, lockProductForEditing, unlockProduct, deleteProduct, upsertCollection, upsertEditorial, syncGlobalProducts,
    executeSafeSync, rollbackGlobalSync,
    upsertPrivateInquiry, updateInquiryStatus, addLeadMessage,
    sendNotification, markNotificationRead, scheduleWorkflow, runWorkflowTask, runWorkflowSequence, submitApproval, handleApprovalAction,
    toggleEmergencyMode, triggerReindex, logAction, registerVendor, approveVendor, registerClient, verifyClient,
    updateAIModule, addAILog, upsertAISuggestion, updateSuggestionStatus,
    runQATest, runAllQATests, runStressTest, logMaisonError, resolveMaisonError,
    addToCart, removeFromCart, toggleWishlist, clearCart, updateGlobalSettings,
    setShowcaseMode, setActiveVip, setActiveVendor, recordLog, createInvoice, createTransaction, processPayment, updateTransactionStatus, toggleLike, trackShare, upsertAppointment,
    updateTicketStatus, addTicketMessage, upsertCampaign, toggleRule, upsertRule
  }), [
    countryConfigs, brandConfigs, activeBrandId, currentUser, adminJurisdiction, globalSyncHistory,
    scopedProducts, scopedInquiries, scopedEditorials, scopedBuyingGuides, scopedReturns, scopedNotifications, scopedApprovals, scopedAuditLogs, scopedWorkflows, scopedTransactions, scopedQATests, scopedErrors, scopedStressTests,
    cmsSections, products, collections, categories, departments, cities, buyingGuides, editorials, qaTests, maisonErrors, stressTests,
    privateInquiries, leadConversations, messagingTemplates, seoRegistry, automationRules,
    aiModules, aiLogs, aiSuggestions,
    notifications, workflows, approvalRequests, analyticsData, auditRegistry,
    cart, wishlist, socialMetrics, admins, vendors, affiliates, returns, activeCampaigns, auditLogs,
    vipClients, customerSegments, globalSettings, supportTickets, supportStats, integrations, apiLogs,
    indexingStatus, indexingLogs, appointments, invoices, transactions, isShowcaseMode, activeVip, activeVendor,
    setCountryEnabled, updateCountryConfig, setActiveBrand, setCurrentUser, setAdminJurisdiction,
    upsertCMSSection, upsertProduct, toggleProductVipStatus, rollbackProductVersion, lockProductForEditing, unlockProduct, deleteProduct, upsertCollection, upsertEditorial, syncGlobalProducts,
    executeSafeSync, rollbackGlobalSync,
    upsertPrivateInquiry, updateInquiryStatus, addLeadMessage,
    sendNotification, markNotificationRead, scheduleWorkflow, runWorkflowTask, runWorkflowSequence, submitApproval, handleApprovalAction,
    toggleEmergencyMode, triggerReindex, logAction, registerVendor, approveVendor, registerClient, verifyClient,
    updateAIModule, addAILog, upsertAISuggestion, updateSuggestionStatus,
    runQATest, runAllQATests, runStressTest, logMaisonError, resolveMaisonError,
    addToCart, removeFromCart, toggleWishlist, clearCart, updateGlobalSettings,
    setShowcaseMode, setActiveVip, setActiveVendor, recordLog, createInvoice, createTransaction, processPayment, updateTransactionStatus, toggleLike, trackShare, upsertAppointment,
    updateTicketStatus, addTicketMessage, upsertCampaign, toggleRule, upsertRule
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppStore must be used within AppProvider');
  return context;
}
