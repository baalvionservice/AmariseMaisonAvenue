
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

/**
 * MAISON DATA STORE (Intermediate Representation)
 */

interface AppContextType {
  // --- Global Infrastructure ---
  countryConfigs: CountryConfig[];
  brandConfigs: BrandConfig[];
  activeBrandId: string;
  currentUser: MaisonUser | null;
  adminJurisdiction: CountryCode | 'global';
  globalSyncHistory: GlobalSyncSession[];
  
  // Scoped Data Views (RBAC & Jurisdictional)
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
  
  // Core Registry Lists
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
  
  // CRM & Sales State
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
  
  // Global App State
  notifications: MaisonNotification[];
  workflows: WorkflowTask[];
  approvalRequests: ApprovalRequest[];
  analyticsData: AnalyticsMetric[];
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

  // Showcase & Audit Mode State
  isShowcaseMode: boolean;
  activeVip: VipClient | null;
  activeVendor: Vendor | null;
  
  // --- ACTIONS ---
  setCountryEnabled: (code: CountryCode, enabled: boolean) => void;
  updateCountryConfig: (config: CountryConfig) => void;
  setActiveBrand: (id: string) => void;
  setCurrentUser: (user: MaisonUser | null) => void;
  setAdminJurisdiction: (jurisdiction: CountryCode | 'global') => void;
  setGuideMode: (val: boolean) => void;
  setAdminViewMode: (val: AdminViewMode) => void;
  
  // Registry Actions
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
  
  // Global Orchestration
  executeSafeSync: (categories: SyncCategory[], targets: CountryCode[]) => void;
  rollbackGlobalSync: (sessionId: string) => void;

  // CRM Actions
  upsertPrivateInquiry: (inquiry: PrivateInquiry) => void;
  updateInquiryStatus: (id: string, status: PrivateInquiry['status']) => void;
  addLeadMessage: (inquiryId: string, text: string, sender: 'curator' | 'client') => void;
  
  // Operational Logic
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

  // Resilience & QA
  logMaisonError: (error: Omit<MaisonError, 'id' | 'timestamp' | 'resolved'>) => void;
  resolveMaisonError: (id: string) => void;
  runQATest: (id: string) => void;
  runAllQATests: () => void;
  runStressTest: (loadSize: number, type: StressTest['type']) => void;

  // AI Orchestration
  updateAIModule: (id: string, enabled: boolean, level: AIAutomationLevel) => void;
  addAILog: (log: AIActionLog) => void;
  upsertAISuggestion: (suggestion: AISuggestion) => void;
  updateSuggestionStatus: (id: string, status: AISuggestion['status']) => void;

  // Global Transactional Actions
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
  processPayment: (transactionId: string) => void;
  updateTransactionStatus: (id: string, status: TransactionStatus) => void;
  toggleLike: (articleId: string, country: string) => void;
  trackShare: (articleId: string, country: string) => void;
  upsertAppointment: (appointment: Appointment) => void;
  updateTicketStatus: (id: string, status: SupportTicket['status']) => void;
  addTicketMessage: (ticketId: string, text: string, sender: 'agent' | 'customer') => void;
  upsertCampaign: (campaign: Campaign) => void;
  toggleRule: (id: string) => void;
  upsertRule: (rule: AutomationRule) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // --- Infrastructure & Session ---
  const [countryConfigs, setCountryConfigs] = useState<CountryConfig[]>(COUNTRIES_CONFIG.map(c => ({
    ...c,
    taxType: c.code === 'us' ? 'Sales Tax' : c.code === 'uk' || c.code === 'ae' ? 'VAT' : 'GST',
    taxRate: c.code === 'uk' ? 20 : c.code === 'ae' ? 5 : c.code === 'in' ? 18 : c.code === 'sg' ? 9 : 8
  })));
  const [brandConfigs] = useState<BrandConfig[]>(BRANDS_CONFIG);
  const [activeBrandId, setActiveBrandId] = useState<string>(BRANDS_CONFIG[0].id);
  const [currentUser, setCurrentUser] = useState<MaisonUser | null>(MOCK_SESSION_USER);
  const [adminJurisdiction, setAdminJurisdiction] = useState<CountryCode | 'global'>('global');
  const [globalSyncHistory, setGlobalSyncHistory] = useState<GlobalSyncSession[]>([]);

  // --- Content Registries ---
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

  // --- CRM & Outreach ---
  const [privateInquiries, setPrivateInquiries] = useState<PrivateInquiry[]>(MOCK_INQUIRIES.map(i => ({ ...i, brandId: activeBrandId })));
  const [leadConversations, setLeadConversations] = useState<LeadConversation[]>(MOCK_CONVERSATIONS.map(c => ({ ...c, brandId: activeBrandId })));
  const [messagingTemplates, setMessagingTemplates] = useState<SalesScript[]>(ACQUISITION_SCRIPTS.map(s => ({ ...s, brandId: activeBrandId })));

  // --- SEO Authority ---
  const [seoRegistry, setSeoRegistry] = useState<SEOMetadata[]>([
    { id: 'home-us', path: '/us', title: 'AMARISÉ | The Heritage Registry (USA)', description: 'Elite acquisition hub.', keywords: 'luxury, heritage', h1: 'The Heritage Registry', brandId: activeBrandId, isGlobal: false },
    { id: 'home-ae', path: '/ae', title: 'AMARISÉ | The Heritage Registry (UAE)', description: 'Dubai Gold Collection.', keywords: 'luxury dubai, gold', h1: 'Dubai Ateliers', brandId: activeBrandId, isGlobal: false }
  ]);

  // --- AI Autopilot & Automation ---
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

  // --- Infrastructure Operational State ---
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
  const [auditRegistry, setAuditRegistry] = useState<AuditLogEntry[]>([
    { id: 'aud-1', actorId: 'adm-1', actorName: 'Maison CEO', actorRole: 'super_admin', country: 'global', action: 'Created AI Autopilot Cycle', entity: 'AI System', timestamp: new Date(Date.now() - 86400000).toISOString(), severity: 'low' }
  ]);
  const [qaTests, setQaTests] = useState<QATestCase[]>([
    { id: 'qa-1', name: 'AI Autopilot Job Execution', module: 'AI', status: 'pending', logs: [], country: 'global', brandId: activeBrandId },
    { id: 'qa-2', name: 'Vendor Registration Workflow', module: 'Onboarding', status: 'pending', logs: [], country: 'us', brandId: activeBrandId },
    { id: 'qa-3', name: 'Finance Transaction Retrieval', module: 'Finance', status: 'pending', logs: [], country: 'ae', brandId: activeBrandId },
    { id: 'qa-4', name: 'Audit Log Recording', module: 'Audit', status: 'pending', logs: [], country: 'in', brandId: activeBrandId },
    { id: 'qa-5', name: 'RBAC Permission Enforcement', module: 'Security', status: 'pending', logs: [], country: 'uk', brandId: activeBrandId }
  ]);
  const [stressTests, setStressTests] = useState<StressTest[]>([]);
  const [maisonErrors, setMaisonErrors] = useState<MaisonError[]>([
    { id: 'err-1', module: 'AI Autopilot', type: 'JobFailed', country: 'us', message: 'Predictive lead scoring cycle failed due to data drift.', stackTrace: 'ReferenceError: leadScore is not defined at analysis.ts:42', resolved: false, timestamp: new Date().toISOString(), severity: 'high', brandId: activeBrandId }
  ]);

  // --- General App State ---
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [socialMetrics, setSocialMetrics] = useState<Record<string, SocialMetrics>>({});
  const [vendors, setVendors] = useState<Vendor[]>(VENDORS.map(v => ({ ...v, brandId: activeBrandId })));
  const [affiliates] = useState<Affiliate[]>(AFFILIATES.map(a => ({ ...a, brandId: activeBrandId })));
  const [returns, setReturns] = useState<ReturnRequest[]>(RETURNS.map(r => ({ ...r, brandId: activeBrandId })));
  const [activeCampaigns, setCampaigns] = useState<Campaign[]>(CAMPAIGNS.map(c => ({ ...c, brandId: activeBrandId })));
  const [vipClients, setVipClients] = useState<VipClient[]>(VIP_CLIENTS.map(v => ({ ...v, brandId: activeBrandId, status: 'verified' })));
  const [customerSegments, setCustomerSegments] = useState<CustomerSegment[]>(CUSTOMER_SEGMENTS.map(s => ({ ...s, brandId: activeBrandId })));
  const [appointments, setAppointments] = useState<Appointment[]>(APPOINTMENTS.map(a => ({ ...a, brandId: activeBrandId })));
  const [invoices, setInvoices] = useState<Invoice[]>(INVOICES.map(i => ({ ...i, brandId: activeBrandId })));
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 'tx-1', country: 'us', type: 'Sale', clientName: 'Julian Vandervilt', amount: 45000, currency: 'USD', status: 'Settled', timestamp: new Date().toISOString(), brandId: activeBrandId, taxAmount: 3600, netAmount: 41400 },
    { id: 'tx-2', country: 'uk', type: 'Sale', clientName: 'Alexander Cross', amount: 12500, currency: 'GBP', status: 'Paid', timestamp: new Date().toISOString(), brandId: activeBrandId, taxAmount: 2500, netAmount: 10000 },
    { id: 'tx-3', country: 'ae', type: 'Sale', clientName: 'Hamdan Al Maktoum', amount: 85000, currency: 'AED', status: 'Processing', timestamp: new Date().toISOString(), brandId: activeBrandId, taxAmount: 4250, netAmount: 80750 },
    { id: 'tx-4', country: 'in', type: 'Sale', clientName: 'Aarav Sharma', amount: 750000, currency: 'INR', status: 'Settled', timestamp: new Date().toISOString(), brandId: activeBrandId, taxAmount: 135000, netAmount: 615000 }
  ]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(SUPPORT_TICKETS.map(t => ({ ...t, brandId: activeBrandId })));
  const [supportStats] = useState<SupportStats>(SUPPORT_STATS);
  const [integrations] = useState<MaisonIntegration[]>(INTEGRATIONS);
  const [apiLogs] = useState<ApiLog[]>(API_LOGS);
  const [indexingStatus, setIndexingStatus] = useState<IndexingStatus>(INDEXING_STATUS);
  const [indexingLogs] = useState<IndexingLog[]>(INDEXING_LOGS);

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

  // --- JURISDICTIONAL SCOPING ENGINE ---
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
    if (activeHub === 'global') return returns;
    return returns.filter(r => r.country === activeHub || r.brandId === activeBrandId);
  }, [returns, activeHub, activeBrandId]);

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
    if (activeHub === 'global') return stressTests;
    return stressTests.filter(t => t.country === activeHub || t.country === 'global');
  }, [stressTests, activeHub]);

  // --- ACTIONS ---
  
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

  const upsertProduct = (p: Product, changeSummary: string = 'Institutional registry update') => {
    setProducts(prev => {
      const idx = prev.findIndex(item => item.id === p.id);
      if (idx > -1) {
        const existing = prev[idx];
        const newVersion: ArtifactVersion = {
          id: `v-${Date.now()}`,
          version: existing.currentVersion + 1,
          data: JSON.parse(JSON.stringify(existing)),
          editedBy: currentUser?.name || 'System',
          timestamp: new Date().toISOString(),
          changeSummary
        };
        const updated: Product = {
          ...p,
          currentVersion: existing.currentVersion + 1,
          versionHistory: [newVersion, ...existing.versionHistory].slice(0, 50),
          lastSyncedAt: new Date().toISOString(),
          lastEditedRegion: (activeHub as any) || 'global'
        };
        logAction('Updated Artifact Registry', p.name, updated.lastEditedRegion);
        return prev.map(item => item.id === p.id ? updated : item);
      } else {
        const fresh: Product = { ...p, versionHistory: [], currentVersion: 1, lastEditedRegion: (activeHub as any) || 'global' };
        logAction('Registered New Artifact', p.name, fresh.lastEditedRegion);
        return [fresh, ...prev];
      }
    });
  };

  const executeSafeSync = (categories: SyncCategory[], targets: CountryCode[]) => {
    const snapshot: GlobalSyncSession['snapshotBefore'] = {
      products: JSON.parse(JSON.stringify(products)),
      seo: JSON.parse(JSON.stringify(seoRegistry)),
      config: JSON.parse(JSON.stringify(countryConfigs))
    };
    const sessionId = `sync-${Date.now()}`;
    const session: GlobalSyncSession = { id: sessionId, timestamp: new Date().toISOString(), categories, targets, snapshotBefore: snapshot, actorName: currentUser?.name || 'Super Admin', status: 'applied' };
    
    if (categories.includes('products')) {
      setProducts(prev => prev.map(p => p.scope === 'global' ? { ...p, regions: targets, lastSyncedAt: session.timestamp } : p));
    }
    setGlobalSyncHistory(prev => [session, ...prev]);
    logAction(`Executed Safe Global Sync (${categories.join(', ')})`, `Targets: ${targets.join(', ')}`, 'global', 'medium');
  };

  const rollbackGlobalSync = (sessionId: string) => {
    const session = globalSyncHistory.find(s => s.id === sessionId);
    if (!session || session.status === 'rolled_back') return;
    if (session.categories.includes('products')) setProducts(session.snapshotBefore.products);
    setGlobalSyncHistory(prev => prev.map(s => s.id === sessionId ? { ...s, status: 'rolled_back' } : s));
    logAction(`Rolled Back Global Sync`, sessionId, 'global', 'high');
  };

  const upsertCMSSection = (s: CMSSection) => setCmsSections(prev => prev.some(i => i.id === s.id) ? prev.map(i => i.id === s.id ? s : i) : [...prev, s]);
  const deleteProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));
  const toggleProductVipStatus = (productId: string) => setProducts(prev => prev.map(p => p.id === productId ? { ...p, isVip: !p.isVip } : p));
  const rollbackProductVersion = (productId: string, versionId: string) => setProducts(prev => prev.map(p => {
    if (p.id === productId) {
      const version = p.versionHistory.find(v => v.id === versionId);
      if (version) return { ...version.data, versionHistory: p.versionHistory, currentVersion: p.currentVersion, lastSyncedAt: new Date().toISOString() };
    }
    return p;
  }));
  const lockProductForEditing = (productId: string) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, editingLock: { userId: currentUser?.id || 'sys', userName: currentUser?.name || 'Sys', expiresAt: new Date(Date.now() + 15*60000).toISOString() } } : p));
    return true;
  };
  const unlockProduct = (productId: string) => setProducts(prev => prev.map(p => p.id === productId ? { ...p, editingLock: undefined } : p));
  const upsertCollection = (c: Collection) => console.log(c);
  const upsertEditorial = (editorial: Editorial) => setEditorials(prev => prev.some(i => i.id === editorial.id) ? prev.map(i => i.id === editorial.id ? editorial : i) : [editorial, ...prev]);
  const syncGlobalProducts = (regions: CountryCode[] = ['us','uk','ae','in','sg']) => setProducts(prev => prev.map(p => p.scope === 'global' ? { ...p, regions, lastSyncedAt: new Date().toISOString() } : p));
  const upsertPrivateInquiry = (inquiry: PrivateInquiry) => setPrivateInquiries(prev => [inquiry, ...prev]);
  const updateInquiryStatus = (id: string, s: PrivateInquiry['status']) => setPrivateInquiries(prev => prev.map(i => i.id === id ? { ...i, status: s } : i));
  const addLeadMessage = (id: string, t: string, s: 'curator'|'client') => setLeadConversations(prev => prev.map(c => c.inquiryId === id ? { ...c, messages: [...c.messages, { id: `m-${Date.now()}`, sender: s, text: t, timestamp: new Date().toISOString() }] } : c));
  const updateAIModule = (id: string, e: boolean, l: AIAutomationLevel) => setAiModules(prev => prev.map(m => m.id === id ? { ...m, enabled: e, level: l } : m));
  const addAILog = (l: AIActionLog) => setAiLogs(prev => [l, ...prev].slice(0, 50));
  const upsertAISuggestion = (suggestion: AISuggestion) => setAiSuggestions(prev => prev.some(i => i.id === suggestion.id) ? prev.map(i => i.id === suggestion.id ? suggestion : i) : [suggestion, ...prev]);
  const updateSuggestionStatus = (id: string, s: AISuggestion['status']) => setAiSuggestions(prev => prev.map(i => i.id === id ? { ...i, status: s } : i));
  const runQATest = (id: string) => { setQaTests(prev => prev.map(t => t.id === id ? { ...t, status: 'running' } : t)); setTimeout(() => setQaTests(prev => prev.map(t => t.id === id ? { ...t, status: 'passed', lastRun: new Date().toISOString() } : t)), 1500); };
  const runAllQATests = () => qaTests.forEach(t => runQATest(t.id));
  const runStressTest = (load: number, type: StressTest['type']) => {
    const id = `stress-${Date.now()}`;
    const test: StressTest = { id, name: `Stress: ${type}`, loadSize: load, type, status: 'running', metrics: { startTime: new Date().toISOString(), processedCount: 0, errorCount: 0, failureCount: 0 }, logs: [], country: activeHub };
    setStressTests(prev => [test, ...prev]);
    setTimeout(() => setStressTests(prev => prev.map(t => t.id === id ? { ...t, status: 'passed', metrics: { ...t.metrics, processedCount: load, durationMs: 1200 } } : t)), 2000);
  };
  const logMaisonError = (err: Omit<MaisonError, 'id' | 'timestamp' | 'resolved'>) => setMaisonErrors(prev => [{ ...err, id: `err-${Date.now()}`, timestamp: new Date().toISOString(), resolved: false }, ...prev]);
  const resolveMaisonError = (id: string) => setMaisonErrors(prev => prev.map(e => e.id === id ? { ...e, resolved: true } : e));
  const addToCart = (p: Product) => setCart(prev => prev.find(i => i.id === p.id) ? prev.map(i => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i) : [...prev, { ...p, quantity: 1 }]);
  const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i.id !== id));
  const toggleWishlist = (p: Product) => setWishlist(prev => prev.some(i => i.id === p.id) ? prev.filter(i => i.id !== p.id) : [...prev, p]);
  const clearCart = () => setCart([]);
  const upsertCampaign = (c: Campaign) => setCampaigns(prev => prev.some(i => i.id === c.id) ? prev.map(i => i.id === c.id ? c : i) : [c, ...prev]);
  const toggleRule = (id: string) => setAutomationRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  const upsertRule = (r: AutomationRule) => setAutomationRules(prev => prev.some(i => i.id === r.id) ? prev.map(i => i.id === r.id ? r : i) : [...prev, r]);
  const createInvoice = (i: Invoice) => setInvoices(prev => [i, ...prev]);
  const createTransaction = (t: Transaction) => setTransactions(prev => [t, ...prev]);
  const updateTransactionStatus = (id: string, s: TransactionStatus) => setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: s } : t));
  const updateTicketStatus = (id: string, s: SupportTicket['status']) => setSupportTickets(prev => prev.map(t => t.id === id ? { ...t, status: s } : t));
  const addTicketMessage = (id: string, t: string, s: 'agent'|'customer') => setSupportTickets(prev => prev.map(tk => tk.id === id ? { ...tk, messages: [...tk.messages, { id: `m-${Date.now()}`, sender: s, text: t, timestamp: new Date().toISOString() }] } : tk));
  const handleApprovalAction = (id: string, a: boolean) => setApprovalRequests(prev => prev.map(r => r.id === id ? { ...r, status: a ? 'approved' : 'rejected' } : r));

  const sendNotification = (to: string, msg: string, country = 'global', type: MaisonNotification['type'] = 'info') => setNotifications(prev => [{ id: `n-${Date.now()}`, toRole: to, country, message: msg, timestamp: new Date().toISOString(), read: false, type }, ...prev]);
  const markNotificationRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const scheduleWorkflow = (name: string, freq: WorkflowTask['frequency'], country = 'global') => setWorkflows(prev => [{ id: `w-${Date.now()}`, taskName: name, frequency: freq, country, status: 'pending', nextRun: new Date().toISOString() }, ...prev]);
  const runWorkflowTask = (id: string) => { setWorkflows(prev => prev.map(w => w.id === id ? { ...w, status: 'running' } : w)); setTimeout(() => setWorkflows(prev => prev.map(w => w.id === id ? { ...w, status: 'complete', lastRun: new Date().toISOString() } : w)), 1000); };
  const runWorkflowSequence = (name: string, country = 'global') => workflows.filter(w => w.country === country || w.country === 'global').forEach(w => runWorkflowTask(w.id));
  const submitApproval = (type: ApprovalRequest['contentType'], id: string, country = 'global') => setApprovalRequests(prev => [{ id: `a-${Date.now()}`, userId: currentUser?.id || 'sys', userName: currentUser?.name || 'Sys', contentType: type, contentId: id, country, status: 'pending', timestamp: new Date().toISOString() }, ...prev]);
  const toggleEmergencyMode = () => setGlobalSettings(prev => ({ ...prev, emergencyMode: !prev.emergencyMode }));
  const triggerReindex = (type: string) => toast({ title: "Indexing Initiated", description: `Maison ${type} registry is currently being synchronized.` });
  const setCountryEnabled = (code: CountryCode, val: boolean) => setCountryConfigs(prev => prev.map(c => c.code === code ? { ...c, enabled: val } : c));
  const updateCountryConfig = (config: CountryConfig) => setCountryConfigs(prev => prev.map(c => c.code === config.code ? config : c));
  const setActiveBrand = (id: string) => setActiveBrandId(id);
  const setGuideMode = (val: boolean) => setGlobalSettings(prev => ({ ...prev, isGuideMode: val }));
  const setAdminViewMode = (val: AdminViewMode) => setGlobalSettings(prev => ({ ...prev, adminViewMode: val }));
  const updateGlobalSettings = (s: GlobalSettings) => setGlobalSettings(s);
  const toggleLike = (id: string, c: string) => setSocialMetrics(prev => ({ ...prev, [id]: { likes: (prev[id]?.likes || 0) + 1, shares: prev[id]?.shares || 0, engagementRate: prev[id]?.engagementRate || 0 } }));
  const trackShare = (id: string, c: string) => setSocialMetrics(prev => ({ ...prev, [id]: { likes: prev[id]?.likes || 0, shares: (prev[id]?.shares || 0) + 1, engagementRate: prev[id]?.engagementRate || 0 } }));

  const value = useMemo(() => ({
    countryConfigs, brandConfigs, activeBrandId, currentUser, adminJurisdiction, globalSyncHistory,
    scopedProducts, scopedInquiries, scopedEditorials, scopedBuyingGuides, scopedReturns, scopedNotifications, scopedApprovals, scopedAuditLogs, scopedWorkflows, scopedTransactions, scopedQATests, scopedErrors, scopedStressTests,
    cmsSections, products, collections, categories, departments, cities, buyingGuides, editorials, qaTests, maisonErrors, stressTests,
    privateInquiries, leadConversations, messagingTemplates, seoRegistry, automationRules,
    aiModules, aiLogs, aiSuggestions,
    notifications, workflows, approvalRequests, auditRegistry,
    cart, wishlist, socialMetrics, admins: ADMIN_ACCOUNTS, vendors, affiliates, returns, activeCampaigns,
    vipClients, customerSegments, globalSettings, supportTickets, supportStats, integrations, apiLogs,
    indexingStatus, indexingLogs, appointments, invoices, transactions, isShowcaseMode, activeVip, activeVendor,
    setCountryEnabled, updateCountryConfig, setActiveBrand, setCurrentUser, setAdminJurisdiction, setGuideMode, setAdminViewMode,
    upsertCMSSection, upsertProduct, toggleProductVipStatus, rollbackProductVersion, lockProductForEditing, unlockProduct, deleteProduct, upsertCollection, upsertEditorial, syncGlobalProducts,
    executeSafeSync, rollbackGlobalSync,
    upsertPrivateInquiry, updateInquiryStatus, addLeadMessage,
    sendNotification, markNotificationRead, scheduleWorkflow, runWorkflowTask, runWorkflowSequence, submitApproval, handleApprovalAction,
    toggleEmergencyMode, triggerReindex, logAction, registerVendor: () => {}, approveVendor: () => {}, registerClient: () => {}, verifyClient: () => {},
    updateAIModule, addAILog, upsertAISuggestion, updateSuggestionStatus,
    runQATest, runAllQATests, runStressTest, logMaisonError, resolveMaisonError,
    addToCart, removeFromCart, toggleWishlist, clearCart, updateGlobalSettings,
    setShowcaseMode, setActiveVip, setActiveVendor, createInvoice, createTransaction, processPayment: () => {}, updateTransactionStatus, toggleLike, trackShare, upsertAppointment: () => {},
    updateTicketStatus, addTicketMessage, upsertCampaign, toggleRule, upsertRule,
    recordLog: () => {}, analyticsData: []
  }), [
    countryConfigs, brandConfigs, activeBrandId, currentUser, adminJurisdiction, globalSyncHistory,
    scopedProducts, scopedInquiries, scopedEditorials, scopedBuyingGuides, scopedReturns, scopedNotifications, scopedApprovals, scopedAuditLogs, scopedWorkflows, scopedTransactions, scopedQATests, scopedErrors, scopedStressTests,
    cmsSections, products, collections, categories, departments, cities, buyingGuides, editorials, qaTests, maisonErrors, stressTests,
    privateInquiries, leadConversations, messagingTemplates, seoRegistry, automationRules,
    aiModules, aiLogs, aiSuggestions,
    notifications, workflows, approvalRequests, auditRegistry,
    cart, wishlist, socialMetrics, vendors, affiliates, returns, activeCampaigns,
    vipClients, customerSegments, globalSettings, supportTickets, supportStats, integrations, apiLogs,
    indexingStatus, indexingLogs, appointments, invoices, transactions, isShowcaseMode, activeVip, activeVendor
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppStore must be used within AppProvider');
  return context;
}
