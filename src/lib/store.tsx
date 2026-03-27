'use client';

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { 
  CartItem, Product, Collection, SocialMetrics, Vendor, Affiliate, ReturnRequest, Campaign, VipClient, GlobalSettings, CustomerSegment, SupportTicket, SupportStats, MaisonIntegration, ApiLog, IndexingStatus, IndexingLog, Appointment, Invoice, Transaction, PrivateInquiry, LeadConversation, SEOMetadata, SalesScript, AutomationRule, CountryCode, LanguageCode, AIModuleStatus, AIActionLog, AISuggestion, AIAutomationLevel, MaisonNotification, WorkflowTask, ApprovalRequest, AuditLogEntry, QATestCase, MaisonError, GlobalSyncSession, SyncCategory, StressTest, AdminViewMode, BrandIntegrityIssue, WalletTransaction, LiveRequest, MaisonCertificate, TransactionStatus, PaymentPlan, Subscription, CountryConfig, BrandConfig, Editorial, BuyingGuide, SystemLog, MaisonMetric, MaisonAlert, SystemHealthScore, BackgroundJob, FXRate, TaxRule, FraudLog
} from './types';
import { PRODUCTS as INITIAL_PRODUCTS, COLLECTIONS as INITIAL_COLLECTIONS, CATEGORIES as INITIAL_CATEGORIES, DEPARTMENTS as INITIAL_DEPARTMENTS, CITIES as INITIAL_CITIES, BUYING_GUIDES as INITIAL_GUIDES, EDITOR_INITIAL, VENDORS, AFFILIATES, RETURNS, CAMPAIGNS, VIP_CLIENTS, CUSTOMER_SEGMENTS, SUPPORT_TICKETS, SUPPORT_STATS, INTEGRATIONS, API_LOGS, INDEXING_STATUS, INDEXING_LOGS, APPOINTMENTS, INVOICES, formatPrice } from './mock-data';
import { MOCK_INQUIRIES, MOCK_CONVERSATIONS } from './mock-sales';
import { ACQUISITION_SCRIPTS } from './mock-sales-system';
import { COUNTRIES_CONFIG, BRANDS_CONFIG } from './mock-global-config';
import { MOCK_SESSION_USER, MaisonUser } from './permissions/mock-users';
import { StockManager } from './inventory/stockManager';
import { logger } from './services/loggingService';
import { obsEngine } from './observability/engine';
import { workerEngine } from './reliability/worker-engine';
import { i18n } from './i18n/engine';
import { SupportedLanguage } from './i18n/config';
import { FXEngine } from './finance/fx-engine';
import { TaxEngine } from './finance/tax-engine';

interface AppContextType {
  countryConfigs: CountryConfig[];
  brandConfigs: BrandConfig[];
  activeBrandId: string;
  currentUser: MaisonUser | null;
  currentLanguage: SupportedLanguage;
  adminJurisdiction: CountryCode | 'global';
  globalSyncHistory: GlobalSyncSession[];
  paymentPlans: PaymentPlan[];
  fxRates: FXRate[];
  taxRules: TaxRule[];
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
  scopedAlerts: MaisonAlert[];
  scopedMetrics: MaisonMetric[];
  scopedJobs: BackgroundJob[];
  scopedFraudLogs: FraudLog[];
  systemLogs: SystemLog[];
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
  affiliates: Affiliate[];
  activeCampaigns: Campaign[];
  subscriptions: Subscription[];
  backgroundJobs: BackgroundJob[];
  fraudLogs: FraudLog[];
  isShowcaseMode: boolean;
  isCartOpen: boolean;
  activeVip: VipClient | null;
  activeVendor: Vendor | null;
  systemHealth: SystemHealthScore;
  setLanguage: (lang: SupportedLanguage) => void;
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
  setCartOpen: (val: boolean) => void;
  updateGlobalSettings: (settings: GlobalSettings) => void;
  setShowcaseMode: (val: boolean) => void;
  setActiveVip: (vip: VipClient | null) => void;
  setActiveVendor: (vendor: Vendor | null) => void;
  createInvoice: (invoice: Invoice) => void;
  createTransaction: (transaction: Transaction) => void;
  updateTransactionStatus: (id: string, status: TransactionStatus) => void;
  refundTransaction: (id: string, reason: string) => void;
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
  addAILog: (log: Omit<AIActionLog, 'id' | 'timestamp'>) => void;
  upsertAISuggestion: (suggestion: AISuggestion) => void;
  updateSuggestionStatus: (id: string, status: AISuggestion['status']) => void;
  resolveBrandIntegrity: (id: string) => void;
  runQATest: (id: string) => void;
  runAllQATests: () => void;
  runStressTest: (loadSize: number, type: StressTest['type']) => void;
  executeSafeSync: (categories: SyncCategory[], targets: CountryCode[]) => void;
  rollbackGlobalSync: (sessionId: string) => void;
  recordLog: (action: string, type: SystemLog['type'], country?: string, status?: 'success' | 'failure') => void;
  recordAudit: (params: Omit<AuditLogEntry, 'id' | 'timestamp' | 'actorId' | 'actorName' | 'actorRole' | 'brandId'>) => void;
  triggerReindex: (type: string) => void;
  toggleEmergencyMode: () => void;
  runWorkflowTask: (taskId: string) => void;
  runWorkflowSequence: (name: string, country?: string) => void;
  recordMetric: (params: Omit<MaisonMetric, 'id' | 'timestamp'>) => void;
  resolveAlert: (id: string) => void;
  enqueueBackgroundJob: (type: BackgroundJob['type'], payload: any, maxRetries?: number) => void;
  getLocalizedPrice: (amount: number, country?: CountryCode) => string;
  upsertSEOMetadata: (meta: SEOMetadata) => void;
  recordFraudLog: (params: Omit<FraudLog, 'id'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activeBrandId] = useState(BRANDS_CONFIG[0].id);
  const [currentUser, setCurrentUser] = useState<MaisonUser | null>(MOCK_SESSION_USER);
  const [currentLanguage, setLanguageState] = useState<SupportedLanguage>('en');
  const [adminJurisdiction, setAdminJurisdiction] = useState<CountryCode | 'global'>('global');
  const [isShowcaseMode, setShowcaseMode] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [globalSyncHistory, setGlobalSyncHistory] = useState<GlobalSyncSession[]>([]);
  const [fxRates, setFXRates] = useState<FXRate[]>([
    { currencyCode: 'USD', baseCurrency: 'USD', rate: 1, spread: 0, lastUpdated: new Date().toISOString(), source: 'Institutional Feed' },
    { currencyCode: 'GBP', baseCurrency: 'USD', rate: 0.79, spread: 0.015, lastUpdated: new Date().toISOString(), source: 'Institutional Feed' },
    { currencyCode: 'AED', baseCurrency: 'USD', rate: 3.67, spread: 0.02, lastUpdated: new Date().toISOString(), source: 'Institutional Feed' },
    { currencyCode: 'INR', baseCurrency: 'USD', rate: 83.2, spread: 0.03, lastUpdated: new Date().toISOString(), source: 'Institutional Feed' },
    { currencyCode: 'SGD', baseCurrency: 'USD', rate: 1.34, spread: 0.015, lastUpdated: new Date().toISOString(), source: 'Institutional Feed' }
  ]);
  const [taxRules] = useState<TaxRule[]>([
    { id: 'tr-1', country: 'in', taxType: 'GST', category: 'general', rate: 18, isInclusive: false, lastUpdated: new Date().toISOString() },
    { id: 'tr-2', country: 'ae', taxType: 'VAT', category: 'general', rate: 5, isInclusive: false, lastUpdated: new Date().toISOString() },
    { id: 'tr-3', country: 'us', taxType: 'SALES_TAX', category: 'general', rate: 8.875, isInclusive: false, lastUpdated: new Date().toISOString() },
    { id: 'tr-4', country: 'uk', taxType: 'VAT', category: 'general', rate: 20, isInclusive: true, lastUpdated: new Date().toISOString() },
    { id: 'tr-5', country: 'in', taxType: 'GST', category: 'hermes', rate: 28, isInclusive: false, lastUpdated: new Date().toISOString() }
  ]);
  const [countryConfigs] = useState<CountryConfig[]>(COUNTRIES_CONFIG.map(c => ({ ...c, taxType: c.code === 'us' ? 'Sales Tax' : 'VAT', taxRate: 15, name: c.code.toUpperCase() })));
  const [brandConfigs] = useState<BrandConfig[]>(BRANDS_CONFIG);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS.map(p => ({ ...p, brandId: activeBrandId, status: 'published', regions: ['us', 'uk', 'ae', 'in', 'sg'], currentVersion: 1, versionHistory: [] })));
  const [privateInquiries, setPrivateInquiries] = useState<PrivateInquiry[]>(MOCK_INQUIRIES.map(i => ({ ...i, brandId: activeBrandId })));
  const [leadConversations, setLeadConversations] = useState<LeadConversation[]>(MOCK_CONVERSATIONS.map(c => ({ ...c, brandId: activeBrandId })));
  const [notifications, setNotifications] = useState<MaisonNotification[]>([]);
  const [workflows, setWorkflows] = useState<WorkflowTask[]>([
    { id: 'wt-1', taskName: 'Cache Invalidation', status: 'idle', country: 'global' },
    { id: 'wt-2', taskName: 'Sitemap Generation', status: 'idle', country: 'global' },
    { id: 'wt-3', taskName: 'Lead Tier Recalibration', status: 'idle', country: 'global' }
  ]);
  const [approvalRequests] = useState<ApprovalRequest[]>([]);
  const [auditRegistry, setAuditRegistry] = useState<AuditLogEntry[]>([]);
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [socialMetrics, setSocialMetrics] = useState<Record<string, SocialMetrics>>({});
  const [vendors, setVendors] = useState<Vendor[]>(VENDORS.map(v => ({ ...v, brandId: activeBrandId })));
  const [vipClients, setVipClients] = useState<VipClient[]>(VIP_CLIENTS.map(v => ({ ...v, brandId: activeBrandId, status: 'verified', walletBalance: 12500.50, walletHistory: [], liveRequests: [], certificates: [{ id: 'cert-1', productId: 'prod-11', artifactName: 'Hermès Special Order Birkin 25', issueDate: '2024-03-10', nfcSealId: 'MA-1924-X-001', provenanceScore: 100, status: 'verified', imageUrl: 'https://madisonavenuecouture.com/cdn/shop/products/Hermes_Birkin_25_White_and_Etoupe_Clemence_Brushed_Gold_Hardware_1.jpg?v=1691512345&width=1000' }] })));
  const [paymentPlans] = useState<PaymentPlan[]>([{ id: 'silver', name: 'Maison Discovery', price: 250, currency: 'USD', interval: 'monthly', features: ['Global Concierge Access', 'Provenance Previews', 'Heritage Newsletter'], tier: 'Silver' }, { id: 'gold', name: 'Atelier Reserve', price: 1200, currency: 'USD', interval: 'yearly', features: ['Priority Sourcing', 'Private Salon Invitations', 'Standard Logistics', 'NFC Authentication'], tier: 'Gold', isPopular: true }, { id: 'diamond', name: 'Maison Privé', price: 5000, currency: 'USD', interval: 'yearly', features: ['Unlimited Live Ateliers', 'Bespoke Commissions', 'White-Glove Global Dispatch', 'Investment Advisory'], tier: 'Diamond' }]);
  const [subscriptions] = useState<Subscription[]>([{ id: 'sub-1', tenantId: activeBrandId, userId: 'u-client-1', planId: 'diamond', planName: 'Maison Privé', status: 'ACTIVE', currentPeriodEnd: '2025-03-10', cancelAtPeriodEnd: false, amount: 1500, currency: 'USD' }]);
  const [customerSegments] = useState<CustomerSegment[]>(CUSTOMER_SEGMENTS.map(s => ({ ...s, brandId: activeBrandId })));
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(SUPPORT_TICKETS.map(t => ({ ...t, brandId: activeBrandId })));
  const [supportStats] = useState<SupportStats>(SUPPORT_STATS);
  const [integrations] = useState<MaisonIntegration[]>(INTEGRATIONS);
  const [apiLogs] = useState<ApiLog[]>(API_LOGS);
  const [indexingStatus, setIndexingStatus] = useState<IndexingStatus>(INDEXING_STATUS);
  const [appointments] = useState<Appointment[]>(APPOINTMENTS);
  const [invoices, setInvoices] = useState<Invoice[]>(INVOICES);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [brandIntegrityIssues, setBrandIntegrityIssues] = useState<BrandIntegrityIssue[]>([]);
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([]);
  const [aiModules, setAiModules] = useState<AIModuleStatus[]>([{ id: 'ai-sales', name: 'AI Sales Agent', enabled: true, level: 'assisted' }, { id: 'ai-analytics', name: 'AI Analytics Engine', enabled: true, level: 'auto' }, { id: 'ai-content', name: 'AI Content Engine', enabled: true, level: 'assisted' }, { id: 'ai-seo', name: 'AI SEO Optimizer', enabled: true, level: 'auto' }]);
  const [aiLogs, setAiLogs] = useState<AIActionLog[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>([]);
  const [qaTests, setQaTests] = useState<QATestCase[]>([{ id: 'qa-1', name: 'Financial Sync', module: 'Finance', status: 'passed', logs: [], country: 'global', brandId: activeBrandId }, { id: 'qa-2', name: 'Content Audit', module: 'AI', status: 'idle', logs: [], country: 'global', brandId: activeBrandId }]);
  const [maisonErrors, setMaisonErrors] = useState<MaisonError[]>([]);
  const [stressTests, setStressTests] = useState<StressTest[]>([]);
  const [seoRegistry, setSeoRegistry] = useState<SEOMetadata[]>([
    { id: 'seo-1', path: '/', language: 'en', country: 'us', title: 'AMARISÉ MAISON | Global Luxury Discovery', description: 'The absolute standard of heritage curation since 1924.', keywords: 'luxury, heritage, couture', h1: 'Amarisé Maison', canonicalUrl: 'https://amarise-maison-avenue.com/us', updatedAt: new Date().toISOString(), hreflangs: [{ lang: 'en-US', url: '/us' }, { lang: 'en-GB', url: '/uk' }, { lang: 'ar-AE', url: '/ae' }] }
  ]);
  const [affiliates, setAffiliates] = useState<Affiliate[]>(AFFILIATES);
  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>(CAMPAIGNS);
  const [messagingTemplates] = useState<SalesScript[]>(ACQUISITION_SCRIPTS.map(s => ({ ...s, brandId: activeBrandId })));
  const [activeVip, setActiveVip] = useState<VipClient | null>(vipClients[0]);
  const [activeVendor, setActiveVendor] = useState<Vendor | null>(vendors[0]);
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>({ theme: { primary: '#000000', accent: '#D4AF37', fontFamily: 'Alegreya' }, seo: { defaultTitle: 'AMARISÉ MAISON', defaultDesc: 'Global Acquisition House', sitemapUrl: '/sitemap.xml' }, payments: { cards: true, wallets: true, crypto: false }, compliance: { gdprEnabled: true, ccpaEnabled: true, pciStatus: 'Optimal' }, performance: { cdnEnabled: true, cachingEnabled: true, autoScalingStatus: 'Ready' }, emergencyMode: false, isGuideMode: false, adminViewMode: 'advanced' });
  const [backgroundJobs, setBackgroundJobs] = useState<BackgroundJob[]>([]);
  const [fraudLogs, setFraudLogs] = useState<FraudLog[]>([]);

  // 📊 Observability State
  const [metrics, setMetrics] = useState<MaisonMetric[]>([]);
  const [alerts, setAlerts] = useState<MaisonAlert[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealthScore>(obsEngine.calculateHealth());

  const activeHub = useMemo(() => (!currentUser ? 'global' : currentUser.role === 'super_admin' ? adminJurisdiction : currentUser.country.toLowerCase() as CountryCode), [currentUser, adminJurisdiction]);

  // Scoped Data Logic
  const scopedProducts = useMemo(() => activeHub === 'global' ? products : products.filter(p => p.regions.includes(activeHub as any) || p.isGlobal), [products, activeHub]);
  const scopedInquiries = useMemo(() => activeHub === 'global' ? privateInquiries : privateInquiries.filter(i => i.country.toLowerCase() === activeHub.toLowerCase()), [privateInquiries, activeHub]);
  const scopedEditorials = useMemo(() => activeHub === 'global' ? EDITOR_INITIAL : EDITOR_INITIAL.filter(e => e.country === activeHub || e.isGlobal), [activeHub]);
  const scopedBuyingGuides = useMemo(() => activeHub === 'global' ? INITIAL_GUIDES : INITIAL_GUIDES.filter(g => g.country === activeHub || g.isGlobal), [activeHub]);
  const scopedReturns = useMemo(() => activeHub === 'global' ? RETURNS : RETURNS.filter(r => r.country === activeHub), [activeHub]);
  const scopedNotifications = useMemo(() => activeHub === 'global' ? notifications : notifications.filter(n => n.country === activeHub || n.country === 'global'), [notifications, activeHub]);
  const scopedApprovals = useMemo(() => activeHub === 'global' ? approvalRequests : approvalRequests.filter(a => a.country === activeHub), [approvalRequests, activeHub]);
  const scopedAuditLogs = useMemo(() => activeHub === 'global' ? auditRegistry : auditRegistry.filter(log => log.country === activeHub || log.country === 'global'), [auditRegistry, activeHub]);
  const scopedWorkflows = useMemo(() => activeHub === 'global' ? workflows : workflows.filter(w => w.country === activeHub || w.country === 'global'), [workflows, activeHub]);
  const scopedTransactions = useMemo(() => activeHub === 'global' ? transactions : transactions.filter(t => t.country.toLowerCase() === activeHub.toLowerCase()), [transactions, activeHub]);
  const scopedQATests = useMemo(() => activeHub === 'global' ? qaTests : qaTests.filter(t => t.country === activeHub || t.country === 'global'), [qaTests, activeHub]);
  const scopedErrors = useMemo(() => activeHub === 'global' ? maisonErrors : maisonErrors.filter(e => e.country === activeHub), [maisonErrors, activeHub]);
  const scopedStressTests = useMemo(() => activeHub === 'global' ? stressTests : stressTests.filter(s => s.country === activeHub), [stressTests, activeHub]);
  const scopedBrandIntegrity = useMemo(() => activeHub === 'global' ? brandIntegrityIssues : brandIntegrityIssues.filter(i => i.country === activeHub), [brandIntegrityIssues, activeHub]);
  const scopedLiveRequests = useMemo(() => activeHub === 'global' ? (activeVip?.liveRequests || []) : (activeVip?.liveRequests || []).filter(r => (r as any).country === activeHub), [activeVip, activeHub]);
  const scopedCertificates = useMemo(() => activeHub === 'global' ? (activeVip?.certificates || []) : (activeVip?.certificates || []).filter(c => c.country === activeHub), [activeVip, activeHub]);
  const scopedJobs = useMemo(() => activeHub === 'global' ? backgroundJobs : backgroundJobs.filter(j => j.country === activeHub || j.country === 'global'), [backgroundJobs, activeHub]);
  const scopedFraudLogs = useMemo(() => activeHub === 'global' ? fraudLogs : fraudLogs.filter(f => (f as any).country === activeHub), [fraudLogs, activeHub]);
  
  const scopedAlerts = useMemo(() => activeHub === 'global' ? alerts : alerts.filter(a => a.country === activeHub || a.country === 'global'), [alerts, activeHub]);
  const scopedMetrics = useMemo(() => activeHub === 'global' ? metrics : metrics.filter(m => m.country === activeHub || m.country === 'global'), [metrics, activeHub]);

  const setLanguage = (lang: SupportedLanguage) => {
    i18n.setLanguage(lang);
    setLanguageState(lang);
  };

  const getLocalizedPrice = (amount: number, countryCode?: CountryCode) => {
    return FXEngine.formatLocalizedCurrency(amount, countryCode || (activeHub as CountryCode), fxRates);
  };

  const recordLog = (action: string, type: SystemLog['type'], countryCodeStr = 'global', status: 'success' | 'failure' = 'success') => {
    const id = logger.log({ type, source: 'AppStore', action, country: countryCodeStr, status, userId: currentUser?.id });
    const registry = logger.getRegistry();
    setSystemLogs([...registry.system]);
  };

  const recordAudit = (params: Omit<AuditLogEntry, 'id' | 'timestamp' | 'actorId' | 'actorName' | 'actorRole' | 'brandId'>) => {
    if (!currentUser) return;
    const id = logger.audit({
      ...params,
      actorId: currentUser.id,
      actorName: currentUser.name,
      actorRole: currentUser.role,
      brandId: activeBrandId
    });
    const registry = logger.getRegistry();
    setAuditRegistry([...registry.audit]);
  };

  const recordMetric = (params: Omit<MaisonMetric, 'id' | 'timestamp'>) => {
    obsEngine.recordMetric(params);
    const registry = obsEngine.getRegistry();
    setMetrics([...registry.metrics]);
    setAlerts([...registry.alerts]);
    setSystemHealth(obsEngine.calculateHealth(activeHub));
  };

  const enqueueBackgroundJob = (type: BackgroundJob['type'], payload: any, maxRetries = 3) => {
    workerEngine.enqueue({ type, payload, country: activeHub, maxRetries });
    setBackgroundJobs([...workerEngine.getRegistry()]);
  };

  const recordFraudLog = (params: Omit<FraudLog, 'id'>) => {
    const id = `fraud-${Date.now()}`;
    const log = { ...params, id };
    setFraudLogs(prev => [log, ...prev]);
    
    if (log.riskLevel === 'high') {
      obsEngine.triggerAlert({
        type: 'fraud',
        severity: 'critical',
        message: `High-risk fraud detection: ${log.reason}`,
        country: activeHub
      });
    }
  };

  const value = useMemo(() => ({
    countryConfigs, brandConfigs, activeBrandId, currentUser, currentLanguage, adminJurisdiction, globalSyncHistory, paymentPlans, fxRates, taxRules, scopedProducts, scopedInquiries, scopedEditorials, scopedBuyingGuides, scopedReturns, scopedNotifications, scopedApprovals, scopedAuditLogs, scopedWorkflows, scopedTransactions, scopedQATests, scopedErrors, scopedStressTests, scopedBrandIntegrity, scopedLiveRequests, scopedCertificates, scopedJobs, scopedFraudLogs, products, privateInquiries, leadConversations, messagingTemplates, notifications, workflows, approvalRequests, auditRegistry, cart, wishlist, socialMetrics, vendors, vipClients, globalSettings, supportTickets, supportStats, integrations, apiLogs, indexingStatus, appointments, invoices, transactions, customerSegments, brandIntegrityIssues, automationRules, aiModules, aiLogs, aiSuggestions, qaTests, maisonErrors, stressTests, seoRegistry, affiliates, activeCampaigns, isShowcaseMode, isCartOpen, activeVip, activeVendor, subscriptions, systemLogs, systemHealth, scopedAlerts, scopedMetrics, backgroundJobs, fraudLogs,
    setLanguage, getLocalizedPrice, setCountryEnabled: () => {}, setCurrentUser, setAdminJurisdiction, setGuideMode: (v: boolean) => setGlobalSettings(p => ({...p, isGuideMode: v})), setAdminViewMode: (v: AdminViewMode) => setGlobalSettings(p => ({...p, adminViewMode: v})),
    upsertProduct: (p: Product, changeSummary = 'Modified Registry Entry') => {
      const before = products.find(i => i.id === p.id);
      setProducts(prev => prev.find(i => i.id === p.id) ? prev.map(i => i.id === p.id ? p : i) : [p, ...prev]);
      recordAudit({ action: 'Artifact Update', entity: 'Product', entityId: p.id, country: activeHub, severity: 'low', beforeState: before, afterState: p, reason: changeSummary });
    }, 
    deleteProduct: (id: string) => {
      const before = products.find(i => i.id === id);
      setProducts(p => p.filter(i => i.id !== id));
      recordAudit({ action: 'Artifact De-registration', entity: 'Product', entityId: id, country: activeHub, severity: 'medium', beforeState: before, reason: 'Manual archival' });
    }, 
    toggleProductVipStatus: (id: string) => setProducts(prev => prev.map(p => p.id === id ? {...p, isVip: !p.isVip} : p)), lockProductForEditing: () => true, upsertPrivateInquiry: (i: PrivateInquiry) => setPrivateInquiries(p => [i, ...p]), updateInquiryStatus: (id: string, s: any) => setPrivateInquiries(prev => prev.map(i => i.id === id ? {...i, status: s} : i)), addLeadMessage: (id: string, t: string, s: any) => setLeadConversations(prev => prev.map(c => c.inquiryId === id ? {...c, messages: [...c.messages, {id: `m-${Date.now()}`, sender: s, text: t, timestamp: new Date().toISOString()}]} : c)),
    sendNotification: (to: string, m: string, c = 'global', t: any = 'info') => setNotifications(prev => [{id: `n-${Date.now()}`, toRole: to, country: c, message: m, timestamp: new Date().toISOString(), read: false, type: t}, ...prev]), markNotificationRead: (id: string) => setNotifications(prev => prev.map(n => n.id === id ? {...n, read: true} : n)),
    topUpWallet: (amount: number) => { if (!activeVip) return; const newTx: WalletTransaction = { id: `wt-${Date.now()}`, type: 'Deposit', amount, description: 'Maison Treasury Deposit', timestamp: new Date().toISOString(), status: 'Settled' }; setVipClients(prev => prev.map(v => v.id === activeVip.id ? { ...v, walletBalance: v.walletBalance + amount, walletHistory: [newTx, ...v.walletHistory] } : v)); setActiveVip(prev => prev ? { ...prev, walletBalance: prev.walletBalance + amount, walletHistory: [newTx, ...prev.walletHistory] } : null); recordLog('Treasury Funding', 'payment', activeHub); },
    deductFromWallet: (amount: number, description: string) => { if (!activeVip || activeVip.walletBalance < amount) return false; const newTx: WalletTransaction = { id: `wt-${Date.now()}`, type: 'Service Fee', amount: -amount, description, timestamp: new Date().toISOString(), status: 'Settled' }; setVipClients(prev => prev.map(v => v.id === activeVip.id ? { ...v, walletBalance: v.walletBalance - amount, walletHistory: [newTx, ...v.walletHistory] } : v)); setActiveVip(prev => prev ? { ...prev, walletBalance: prev.walletBalance - amount, walletHistory: [newTx, ...prev.walletHistory] } : null); return true; },
    requestLiveSession: (productId: string, productName: string) => { const fee = 250; if (activeVip && activeVip.walletBalance >= fee) { const newTx: WalletTransaction = { id: `wt-${Date.now()}`, type: 'Service Fee', amount: -fee, description: `Live: ${productName}`, timestamp: new Date().toISOString(), status: 'Settled' }; setVipClients(prev => prev.map(v => v.id === activeVip.id ? { ...v, walletBalance: v.walletBalance - fee, walletHistory: [newTx, ...v.walletHistory], liveRequests: [...v.liveRequests, { id: `lr-${Date.now()}`, productId, productName, status: 'pending', requestedAt: new Date().toISOString(), fee }] } : v)); setActiveVip(prev => prev ? { ...prev, walletBalance: prev.walletBalance - fee, walletHistory: [newTx, ...prev.walletHistory], liveRequests: [...prev.liveRequests, { id: `lr-${Date.now()}`, productId, productName, status: 'pending', requestedAt: new Date().toISOString(), fee }] } : null); return true; } return false; },
    addToCart: (p: Product) => {
      const result = StockManager.reserveStock(p, currentUser?.id || 'guest', 1);
      if (result.success) {
        setProducts(prev => prev.map(item => item.id === p.id ? {...item, stock: result.remainingStock!} : item));
        setCart(prev => prev.find(i => i.id === p.id) ? prev.map(i => i.id === p.id ? {...i, quantity: i.quantity + 1} : i) : [...prev, {...p, quantity: 1}]);
        recordLog('Item Reserved', 'inventory', activeHub);
        recordMetric({ name: 'inventory_lock_count', value: 1, unit: 'count', source: 'Inventory', country: activeHub });
        // Enqueue Cleanup Job
        enqueueBackgroundJob('INVENTORY_TTL', { lockId: result.lockId, productId: p.id });
      } else {
        logger.error({ module: 'Inventory', type: 'STOCK_OUT', message: result.message, country: activeHub, severity: 'medium' });
        recordMetric({ name: 'stock_lock_fail_count', value: 1, unit: 'count', source: 'Inventory', country: activeHub });
      }
    }, 
    removeFromCart: (id: string) => {
      const item = cart.find(i => i.id === id);
      if (item) {
        StockManager.releaseStock(id, item.quantity);
        setProducts(prev => prev.map(p => p.id === id ? {...p, stock: p.stock + item.quantity} : p));
      }
      setCart(prev => prev.filter(i => i.id !== id));
    }, 
    toggleWishlist: (p: Product) => setWishlist(prev => prev.some(i => i.id === p.id) ? prev.filter(i => i.id !== p.id) : [...prev, p]), clearCart: () => setCart([]), setCartOpen, updateGlobalSettings: (s: GlobalSettings) => setGlobalSettings(s), setShowcaseMode, setActiveVip, setActiveVendor, createInvoice: (i: Invoice) => setInvoices(p => [i, ...p]), createTransaction: (t: Transaction) => setTransactions(p => [t, ...p]), updateTransactionStatus: (id: string, s: any) => setTransactions(prev => prev.map(t => t.id === id ? {...t, status: s} : t)), refundTransaction: (id: string, reason: string) => { setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'Refunded', refundReason: reason, refundedAt: new Date().toISOString() } : t)); recordAudit({ action: 'Refund Processed', entity: 'Transaction', entityId: id, country: activeHub, severity: 'medium', reason }); },
    toggleLike: (id: string) => setSocialMetrics(prev => ({...prev, [id]: {...(prev[id]||{likes:0,shares:0,engagementRate:0}), likes: (prev[id]?.likes||0)+1}})), trackShare: (id: string) => setSocialMetrics(prev => ({...prev, [id]: {...(prev[id]||{likes:0,shares:0,engagementRate:0}), shares: (prev[id]?.shares||0)+1}})), upsertAppointment: (a: Appointment) => setAppointments(p => [a, ...p]), updateTicketStatus: (id: string, s: any) => setSupportTickets(prev => prev.map(t => t.id === id ? {...t, status: s} : t)), addTicketMessage: (id: string, t: string, s: any) => setSupportTickets(prev => prev.map(tk => tk.id === id ? {...tk, messages: [...tk.messages, {id: `m-${Date.now()}`, sender: s, text: t, timestamp: new Date().toISOString()}]} : tk)),
    upsertCampaign: (c: Campaign) => {
      const before = activeCampaigns.find(i => i.id === c.id);
      setActiveCampaigns(prev => prev.find(i => i.id === c.id) ? prev.map(i => i.id === c.id ? c : i) : [c, ...prev]);
      recordAudit({ action: 'Campaign Setup', entity: 'Marketing', entityId: c.id, country: activeHub, severity: 'low', beforeState: before, afterState: c });
    }, 
    toggleRule: () => {}, upsertRule: () => {}, verifyClient: (id: string) => setVipClients(prev => prev.map(v => v.id === id ? {...v, status: 'verified'} : v)), approveVendor: (id: string) => setVendors(prev => prev.map(v => v.id === id ? {...v, status: 'active'} : v)),
    updateAIModule: (id: string, e: boolean, l: any) => {
      setAiModules(prev => prev.map(m => m.id === id ? {...m, enabled: e, level: l} : m));
      recordAudit({ action: 'AI Module Config', entity: 'System', entityId: id, country: 'global', severity: 'medium', reason: `Auto-level changed to ${l}` });
    }, 
    addAILog: (l: Omit<AIActionLog, 'id' | 'timestamp'>) => {
      const id = logger.ai(l);
      const registry = logger.getRegistry();
      setAiLogs([...registry.ai]);
    }, 
    upsertAISuggestion: (s: AISuggestion) => setAiSuggestions(prev => [s, ...prev]), updateSuggestionStatus: (id: string, s: any) => setAiSuggestions(prev => prev.map(i => i.id === id ? {...i, status: s} : i)), resolveBrandIntegrity: (id: string) => setBrandIntegrityIssues(prev => prev.map(i => i.id === id ? {...i, status: 'fixed'} : i)),
    runQATest: (id: string) => { 
      setQaTests(prev => prev.map(t => t.id === id ? { ...t, status: 'running' } : t)); 
      recordLog(`QA Test: ${id}`, 'system', 'global');
      setTimeout(() => { setQaTests(prev => prev.map(t => t.id === id ? { ...t, status: 'passed', lastRun: new Date().toISOString(), logs: [{ id: `l-${Date.now()}`, message: 'All integrity checks cleared.', timestamp: new Date().toISOString() }] } : t)); }, 2000); 
    },
    runAllQATests: () => { qaTests.forEach(t => { setQaTests(prev => prev.map(item => item.id === t.id ? { ...item, status: 'running' } : item)); setTimeout(() => { setQaTests(prev => prev.map(item => item.id === t.id ? { ...item, status: 'passed', lastRun: new Date().toISOString() } : item)); }, 2000); }); },
    runStressTest: (loadSize: number, type: StressTest['type']) => { const id = `stress-${Date.now()}`; setStressTests(prev => [{ id, name: `${type} High-Frequency Simulation`, loadSize, type, status: 'running', metrics: { processedCount: 0, errorCount: 0, failureCount: 0 }, logs: [], country: 'global' }, ...prev]); let processed = 0; const interval = setInterval(() => { processed += Math.floor(loadSize / 5); if (processed >= loadSize) { clearInterval(interval); setStressTests(prev => prev.map(t => t.id === id ? { ...t, status: 'passed', metrics: { ...t.metrics, processedCount: loadSize, durationMs: 1420 }, logs: [...t.logs, { message: 'Load simulation complete. System stable.', timestamp: new Date().toISOString() }] } : t)); } else { setStressTests(prev => prev.map(t => t.id === id ? { ...t, metrics: { ...t.metrics, processedCount: processed } } : t)); } }, 500); },
    executeSafeSync: (cats: SyncCategory[], targets: CountryCode[]) => { const sessionId = `sync-${Date.now()}`; recordAudit({ action: 'Global Sync Hub', entity: 'System', country: 'global', severity: 'medium', reason: `Sync Session: ${sessionId}` }); setTimeout(() => { setGlobalSyncHistory(prev => [{ id: sessionId, timestamp: new Date().toISOString(), categories: cats, targets, actorName: currentUser?.name || 'System', status: 'applied', snapshotBefore: { products: [], seo: [], config: [] } }, ...prev]); }, 2000); },
    rollbackGlobalSync: (sessionId: string) => setGlobalSyncHistory(prev => prev.map(s => s.id === sessionId ? {...s, status: 'rolled_back'} : s)),
    recordLog, recordAudit, triggerReindex: (type: string) => recordLog('Re-index Triggered', 'system', 'global'), toggleEmergencyMode: () => { recordAudit({ action: 'Emergency Toggle', entity: 'System', severity: 'high', reason: 'Manual fail-safe trigger' }); setGlobalSettings(p => ({...p, emergencyMode: !p.emergencyMode})); }, runWorkflowTask: (taskId: string) => { setWorkflows(prev => prev.map(w => w.id === taskId ? { ...w, status: 'running' } : w)); setTimeout(() => { setWorkflows(prev => prev.map(w => w.id === taskId ? { ...w, status: 'complete', lastRun: new Date().toISOString() } : w)); }, 1500); }, runWorkflowSequence: (name: string, c?: string) => { workflows.forEach(w => { setWorkflows(prev => prev.map(item => item.id === w.id ? { ...item, status: 'running' } : item)); setTimeout(() => { setWorkflows(prev => prev.map(item => item.id === w.id ? { ...item, status: 'complete', lastRun: new Date().toISOString() } : item)); }, 1500); }); },
    recordMetric, resolveAlert: (id: string) => setAlerts(prev => prev.map(a => a.id === id ? {...a, status: 'resolved'} : a)), enqueueBackgroundJob,
    upsertSEOMetadata: (meta: SEOMetadata) => setSeoRegistry(prev => prev.find(m => m.id === meta.id) ? prev.map(m => m.id === meta.id ? meta : m) : [meta, ...prev]),
    recordFraudLog
  }), [countryConfigs, brandConfigs, activeBrandId, currentUser, currentLanguage, adminJurisdiction, globalSyncHistory, paymentPlans, fxRates, taxRules, scopedProducts, scopedInquiries, scopedEditorials, scopedBuyingGuides, scopedReturns, scopedNotifications, scopedApprovals, scopedAuditLogs, scopedWorkflows, scopedTransactions, scopedQATests, scopedErrors, scopedStressTests, scopedBrandIntegrity, scopedLiveRequests, scopedCertificates, scopedJobs, scopedFraudLogs, products, privateInquiries, leadConversations, messagingTemplates, notifications, workflows, approvalRequests, auditRegistry, cart, wishlist, socialMetrics, vendors, vipClients, globalSettings, supportTickets, supportStats, integrations, apiLogs, indexingStatus, appointments, invoices, transactions, customerSegments, brandIntegrityIssues, automationRules, aiModules, aiLogs, aiSuggestions, qaTests, maisonErrors, stressTests, seoRegistry, affiliates, activeCampaigns, isShowcaseMode, isCartOpen, activeVip, activeVendor, subscriptions, systemLogs, systemHealth, scopedAlerts, scopedMetrics, backgroundJobs, fraudLogs]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppStore must be used within AppProvider');
  return context;
}
